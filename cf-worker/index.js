// Cloudflare Worker — persistent cache for Slow Football app (v2)
// Mirrors the /sf-cache GET/POST/DELETE interface of server.py
// Setup: create a KV namespace named SF_CACHE and bind it to this worker
// Deploy URL: https://sf-cache.<account>.workers.dev
const MAX_BODY_BYTES = 20 * 1024 * 1024; // 20 MB (KV limit is 25 MB)

// Cache-Control TTLs per key prefix (in seconds).
// CF edge caches the response so repeated reads skip KV entirely.
const CACHE_MAX_AGE = {
  sf_players:       3600,   // player data — fresh enough at 1 hr
  sf_stats:         3600,
  sf_match_archive: 300,    // match archive — built infrequently, 5 min is fine
  sf_submissions:   600,    // submissions — 10 min
  sf_tactics:       3600,
  default:          120,    // everything else — 2 min
};

function cacheMaxAge(key) {
  for (const [prefix, ttl] of Object.entries(CACHE_MAX_AGE)) {
    if (prefix !== 'default' && key.startsWith(prefix)) return ttl;
  }
  return CACHE_MAX_AGE.default;
}

const GAME_API = 'https://slowfootball.club/api';
const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const CHAT_MODEL = 'claude-sonnet-5';
const TITLE_MODEL = 'claude-haiku-4-5'; // cheap/fast model — just for naming chat sessions
const MAX_CHAT_BODY_BYTES = 20 * 1024 * 1024; // safety margin under Anthropic's 32MB request limit
const ALLOWED_CHAT_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MAX_CHAT_TEXT_BLOCK_CHARS = 24000;  // covers an attached JSON/CSV/text file plus the user's own message
const MAX_CHAT_IMAGE_B64_CHARS = 6000000; // ~4.5MB raw
const MAX_CHAT_DOC_B64_CHARS = 14000000;  // ~10.5MB raw
const MAX_CHAT_BLOCKS_PER_MESSAGE = 4;

// Reconstructs a message content block from client JSON, dropping anything that doesn't match
// a known shape — the /_chat route has no auth, so treat all client input as untrusted.
function sanitizeChatBlock(b) {
  if (!b || typeof b !== 'object') return null;
  if (b.type === 'text' && typeof b.text === 'string' && b.text.length) {
    return { type: 'text', text: b.text.slice(0, MAX_CHAT_TEXT_BLOCK_CHARS) };
  }
  if (b.type === 'image' && b.source && b.source.type === 'base64'
      && ALLOWED_CHAT_IMAGE_TYPES.has(b.source.media_type) && typeof b.source.data === 'string'
      && b.source.data.length && b.source.data.length <= MAX_CHAT_IMAGE_B64_CHARS) {
    return { type: 'image', source: { type: 'base64', media_type: b.source.media_type, data: b.source.data } };
  }
  if (b.type === 'document' && b.source && b.source.type === 'base64'
      && b.source.media_type === 'application/pdf' && typeof b.source.data === 'string'
      && b.source.data.length && b.source.data.length <= MAX_CHAT_DOC_B64_CHARS) {
    return { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b.source.data } };
  }
  return null;
}

function sanitizeChatContent(content) {
  const blocks = typeof content === 'string' ? [{ type: 'text', text: content }]
    : Array.isArray(content) ? content : [];
  return blocks.map(sanitizeChatBlock).filter(Boolean).slice(0, MAX_CHAT_BLOCKS_PER_MESSAGE);
}

// JSON schema for "how should I line up against X" replies (see LINEUP_MODE below). Mechanical
// fields (timing, delivery, scheme...) are enums matching the game's actual dropdown options —
// scraped 2026-07-24 straight from the live submit-team-v2 JS bundle — so e.g. a sub timed
// "any situation" paired with "if winning" (both seen in real replies before this) is now
// structurally impossible, not just discouraged by prompt wording. The 5-mentality-value enum
// backs both "instructions.mentality" and each sub's "plan", matching the real game where sub
// plans are just the mentality scale, not a separate freeform field.
const MENTALITY_ENUM = ['Very Defensive', 'Defensive', 'Balanced', 'Attacking', 'Very Attacking'];
// Property order matters: two real tests showed the model filling everything correctly up to
// a point, then degrading to literal "placeholder" text for whatever came after — always
// starting right after the "instructions" object, regardless of remaining token budget. So (1)
// the properties the app actually depends on being mechanically correct — lineup, instructions,
// subs, set pieces, corner tactics — are all declared before any of the "nice to have" free-text
// reasoning fields, and (2) every reasoning/overview field is optional (not in its object's
// `required`), so a degraded generation can legitimately omit them instead of filling them with
// garbage that passes schema validation. The formatter below already treats them as optional.
const LINEUP_SCHEMA = {
  type: 'object',
  properties: {
    gw_status_note: { type: 'string', description: 'One sentence on whether the shown opponent submission is current/stale/future for this match, based on the GW status already computed in the context.' },
    formation: { type: 'string', minLength: 1, description: 'The recommended formation code, e.g. "4231".' },
    lineup: {
      // minItems/maxItems above 0/1 aren't supported by Claude's structured-outputs schema
      // subset ("complex array constraints") — the exact-11 count here is prompt-level guidance
      // only; what's schema-enforced is each item's shape, which is where the real bugs were.
      // minItems:1 alone IS supported and forbids an empty array outright.
      type: 'array',
      minItems: 1,
      description: 'Exactly 11 items — one per starting XI slot (GK, then 10 outfield slots for whichever formation is recommended).',
      items: {
        type: 'object',
        properties: {
          slot: { type: 'string', minLength: 1, description: 'e.g. GK, RB, CB, DM, RW, AM, CF' },
          player: { type: 'string', minLength: 1 },
          rating: { type: 'number', description: 'Their game-formula rating at this exact slot (own Rating if natural position, matching alt-position rating if not).' },
          fitness_pct: { type: 'number' },
          is_captain: { type: 'boolean' },
        },
        required: ['slot', 'player', 'rating', 'fitness_pct', 'is_captain'],
        additionalProperties: false,
      },
    },
    instructions: {
      type: 'object',
      properties: {
        mentality: { enum: MENTALITY_ENUM },
        style: { enum: ['Short', 'Mixed', 'Direct'] },
        structure: { enum: ['Fluid', 'Balanced', 'Rigid'] },
        defensive_line: { enum: ['Deep', 'Low', 'Medium', 'High'] },
        attacking_focus: { enum: ['Left', 'Right', 'Central', 'Mixed'] },
        pressing: { enum: ['High Press', 'Mid-Block', 'Low Block', 'Counter Press'] },
      },
      required: ['mentality', 'style', 'structure', 'defensive_line', 'attacking_focus', 'pressing'],
      additionalProperties: false,
    },
    subs: {
      type: 'array',
      // minItems:1 is the most this schema subset supports (comment above: anything above 0/1
      // is rejected as an unsupported "complex array constraint") — it can't enforce exactly 5,
      // but it does structurally forbid the empty-array failure mode seen in live testing (the
      // model returning subs:[] , which is schema-valid with no minItems set at all).
      minItems: 1,
      description: 'Exactly 5 items — one per sub slot. Use this split unless the matchup gives a genuinely strong reason not to: 3 subs timed "any situation" (spread across the 46-60\' / 61-75\' / 76\'- windows), 1 timed "if winning", 1 timed "if not winning". IMPORTANT: a sub\'s "plan" changes the team\'s overall mentality from that point on and persists until a later sub changes it again — it is not a description of that player. The 3 "any situation" subs should use the SAME plan as instructions.mentality (routine rotation shouldn\'t silently change the team\'s approach); only the "if winning" sub (step toward Defensive) and "if not winning" sub (step toward Attacking/Very Attacking) should actually change it.',
      items: {
        type: 'object',
        properties: {
          // Only the Half-time window offers "if losing" — the other 3 windows are winning /
          // not-winning / any-situation only. This mirrors $5e in the real submit-team-v2 bundle.
          timing: {
            anyOf: [
              {
                type: 'object',
                properties: { window: { const: 'Half-time' }, condition: { enum: ['any situation', 'if losing', 'if winning', 'if not winning'] } },
                required: ['window', 'condition'], additionalProperties: false,
              },
              {
                type: 'object',
                properties: { window: { enum: ["46-60'", "61-75'", "76'-"] }, condition: { enum: ['any situation', 'if winning', 'if not winning'] } },
                required: ['window', 'condition'], additionalProperties: false,
              },
            ],
          },
          plan: { enum: MENTALITY_ENUM },
          player_in: { type: 'string', minLength: 1 },
          player_out: { type: 'string', minLength: 1 },
        },
        required: ['timing', 'plan', 'player_in', 'player_out'],
        additionalProperties: false,
      },
    },
    set_pieces: {
      type: 'object',
      description: 'Pick each taker by comparing the Penalties / Free kicks / Corners attributes (from the squad table) independently across the whole XI — these are three different specialties and usually different players.',
      properties: {
        // minLength rejects the exact empty-string garbage seen in live testing — a plain
        // `type: 'string'` has no floor, so "" passed schema validation while being
        // functionally broken content. (Anthropic's schema subset rejects `minimum` on
        // number types outright — "not supported" — so the 0-rating case relies on the
        // isLineupReplyBroken() runtime check + retry below instead.)
        penalty: { type: 'string', minLength: 1 }, penalty_rating: { type: 'number', description: "That player's Penalties attribute." },
        freekick: { type: 'string', minLength: 1 }, freekick_rating: { type: 'number', description: "That player's Free kicks attribute." },
        corner: { type: 'string', minLength: 1 }, corner_rating: { type: 'number', description: "That player's Corners attribute." },
      },
      required: ['penalty', 'penalty_rating', 'freekick', 'freekick_rating', 'corner', 'corner_rating'], additionalProperties: false,
    },
    corner_tactics: {
      type: 'object',
      properties: {
        attacking_delivery: { enum: ['Inswinger', 'Outswinger', 'Driven', 'Short Corner'] },
        attacking_stay_back: { enum: [1, 2] },
        defensive_scheme: { enum: ['Zonal', 'Man-to-Man', 'Hybrid'] },
        defensive_press: { enum: ['Hold Shape', 'Press Taker'] },
      },
      required: ['attacking_delivery', 'attacking_stay_back', 'defensive_scheme', 'defensive_press'],
      additionalProperties: false,
    },
    // Everything below is free-text reasoning — optional (not in top-level `required`), the
    // part most likely to degrade under pressure, and least harmful to lose since the mechanical
    // decision it explains is already locked in above regardless.
    opponent_breakdown: { type: 'string', description: '2-4 sentences on how the opponent sets up and plays, including at least one specific personnel matchup (e.g. "my RW vs their LB") — not a generic strengths/weaknesses list.' },
    lineup_reasoning: { type: 'string', description: 'Plain-language paragraph on fitness/condition tradeoffs and any off-natural-position calls, citing both rating numbers for any such call. Never use the literal term "AltPosFit".' },
    instructions_reasoning: { type: 'string', description: 'One short paragraph covering the reasoning for all 6 instructions together, tied to the specific opponent matchup identified in the breakdown — not generic justification.' },
    subs_overview: { type: 'string', description: 'Brief note on the overall substitution strategy for this match — why this split of timings/plans.' },
    corner_reasoning: { type: 'string', description: 'Only if the opponent setup gives a clear signal to react to — otherwise omit this field entirely rather than writing a generic filler sentence.' },
  },
  required: ['gw_status_note', 'formation', 'lineup', 'instructions', 'subs', 'set_pieces', 'corner_tactics'],
  additionalProperties: false,
};

// Deterministic JSON -> the same 6-section markdown look the app already renders, so the
// schema's mechanical guarantees are invisible to the user — they just stop seeing malformed
// sub timing / dropped corner sections. Defensive against a field being missing/wrong-typed
// (a schema violation from the model is a 400 before this ever runs, but individual field
// oddities aren't schema-enforced, e.g. an empty string) — every interpolation has a fallback.
// A free-text reasoning field passing schema validation with literal filler content (seen in
// testing: "placeholder") is a real failure mode schema types alone don't catch — this is the
// last line of defense so it never reaches the user. Mechanical fields (enums, numbers) aren't
// checked here since an enum literally can't be "placeholder".
const PLACEHOLDER_RE = /^\s*(placeholder|tbd|n\/?a|todo|xxx?)\s*\.?\s*$/i;
const cleanText = (s) => (typeof s === 'string' && !PLACEHOLDER_RE.test(s)) ? s : '';

function formatLineupReply(d) {
  const lines = [];
  if (cleanText(d.gw_status_note)) lines.push(cleanText(d.gw_status_note), '');
  const breakdown = cleanText(d.opponent_breakdown);
  if (breakdown) lines.push('**Opponent breakdown**', breakdown, '');
  // Reasoning goes BEFORE the flat list, not after — matches the free-text template's rule and
  // was a real bug: this used to render after the list, the opposite of what was asked for.
  const lineupReasoning = cleanText(d.lineup_reasoning);
  lines.push(`**Recommended lineup — ${d.formation || '?'}**`);
  if (lineupReasoning) lines.push(lineupReasoning, '');
  (d.lineup || []).forEach(p => {
    const capt = p.is_captain ? ' (C)' : '';
    lines.push(`${p.slot || '?'}: ${p.player || '?'} (${p.rating ?? '?'}, ${p.fitness_pct ?? '?'}%)${capt}`);
  });
  const ins = d.instructions || {};
  lines.push('', '**Match instructions**');
  [['Mentality', 'mentality'], ['Style', 'style'], ['Structure', 'structure'], ['Defensive Line', 'defensive_line'], ['Attacking Focus', 'attacking_focus'], ['Pressing', 'pressing']].forEach(([label, key]) => {
    lines.push(`${label}: ${ins[key] || '?'}`);
  });
  const instrReasoning = cleanText(d.instructions_reasoning);
  if (instrReasoning) lines.push('', instrReasoning);
  lines.push('', '**Substitutions**');
  const subsOverview = cleanText(d.subs_overview);
  if (subsOverview) lines.push(subsOverview, '');
  (d.subs || []).forEach(s => {
    const t = s.timing || {};
    lines.push(`${t.window || '?'} (${t.condition || '?'}) — ${s.player_in || '?'} IN for ${s.player_out || '?'} (${s.plan || '?'})`);
  });
  const sp = d.set_pieces || {};
  lines.push('', '**Set pieces**');
  lines.push(
    `Penalty: ${cleanText(sp.penalty) || '?'} (${sp.penalty_rating ?? '?'} Pen)`,
    `Free-kick: ${cleanText(sp.freekick) || '?'} (${sp.freekick_rating ?? '?'} FK)`,
    `Corner: ${cleanText(sp.corner) || '?'} (${sp.corner_rating ?? '?'} Cor)`,
  );
  const ct = d.corner_tactics || {};
  lines.push('', '**Corner tactics**');
  lines.push(`Attacking corner — Delivery: ${ct.attacking_delivery || '?'}`);
  lines.push(`Attacking corner — Stay Back: ${ct.attacking_stay_back ?? '?'}`);
  lines.push(`Defensive corner — Scheme: ${ct.defensive_scheme || '?'}`);
  lines.push(`Defensive corner — Press: ${ct.defensive_press || '?'}`);
  const cornerReasoning = cleanText(d.corner_reasoning);
  if (cornerReasoning) lines.push(cornerReasoning);
  return lines.join('\n');
}

// Proxies chat messages to the Claude API server-side (keeps ANTHROPIC_API_KEY off the client).
async function handleChat(request, env, cors) {
  if (!env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'Assistant not configured — missing ANTHROPIC_API_KEY worker secret' }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  const raw = await request.text();
  if (raw.length > MAX_CHAT_BODY_BYTES) {
    return new Response(JSON.stringify({ error: 'Request too large' }), { status: 413, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  let body;
  try { body = JSON.parse(raw); } catch(e) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  const messages = Array.isArray(body.messages)
    ? body.messages.slice(-20)
        .filter(m => m && (m.role === 'user' || m.role === 'assistant'))
        .map(m => ({ role: m.role, content: sanitizeChatContent(m.content) }))
        .filter(m => m.content.length)
    : [];
  const context = typeof body.context === 'string' ? body.context.slice(0, 120000) : '';
  // Client-detected "how should I line up against X" question (see _isLineupVsOpponentQuestion
  // in assistant.js) — routes to JSON-schema-constrained output so mechanical fields (sub
  // timing, corner delivery, etc.) can't come back malformed, instead of just being asked to
  // format them correctly in free text. Every other question type is unaffected.
  const lineupMode = body.lineupMode === true;
  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  const systemText = `You are the personal fantasy-football assistant built into Ofer's Slow Football Analytics app for slowfootball.club. Ofer manages Arsenal. Give concise, direct, practical advice on transfers, tactics, squad building and youth scouting, grounded in the data provided below — don't pad with generic caveats. Use £ for money. If something isn't covered by the data, say so rather than guessing. The user may attach images or files (screenshots, exported data) — factor them into your analysis.\n\n${context}`;

  // Cache the system prompt (instructions + squad/budget/targets context): buildChatContext()
  // is deterministic, so this is byte-identical across messages within a chat session — after
  // the first turn, cached reads cost ~10% of the uncached price.
  const system = [{ type: 'text', text: systemText, cache_control: { type: 'ephemeral' } }];

  // Cache the growing conversation too: mark the last block of everything but the newest user
  // message so each new turn only pays full price for what's actually new.
  const cachedMessages = messages.map((m, i) => {
    if (i !== messages.length - 2 || !m.content.length) return m;
    const content = m.content.slice();
    content[content.length - 1] = { ...content[content.length - 1], cache_control: { type: 'ephemeral' } };
    return { role: m.role, content };
  });

  // 2026-07-25 live testing (5 real requests against a real squad/opponent): 3/5 came back
  // broken even with a schema-valid response — stop_reason was "end_turn" every time (well
  // under the 8500 token cap, so this was never max_tokens truncation), but the model twice
  // returned subs:[] (empty array — nothing in the schema forbade it before minItems:1 was
  // added above) and once returned genuinely corrupted trailing JSON (garbled text + a
  // trailing comma) that failed JSON.parse outright. Schema hardening (minItems/minLength —
  // Anthropic's schema subset rejects `minimum` on numbers outright, so a 0 rating can't be
  // blocked at the schema level) should make the empty-array/blank-string case impossible
  // going forward, but can't guarantee exactly 5 subs, catch a 0 rating, or rule out a
  // decoding hiccup producing invalid JSON — so this also retries the whole request once,
  // live, if the first attempt is detected as broken, rather than silently handing the user a
  // half-empty reply.
  function isLineupReplyBroken(parsed) {
    if (!parsed || typeof parsed !== 'object') return true;
    if (!Array.isArray(parsed.lineup) || parsed.lineup.length < 9) return true;
    if (!Array.isArray(parsed.subs) || parsed.subs.length < 3) return true;
    const sp = parsed.set_pieces;
    if (!sp || !sp.penalty || !sp.freekick || !sp.corner || !sp.penalty_rating || !sp.freekick_rating || !sp.corner_rating) return true;
    return false;
  }

  async function callAnthropic() {
    return fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        // lineupMode gets extra headroom for JSON's structural overhead (repeated keys, quotes)
        // on top of the same content a free-text reply would carry.
        max_tokens: lineupMode ? 8500 : 6500,
        system,
        messages: cachedMessages,
        // EXPERIMENT: the original per-field schema (6 instruction reasons + 5 sub reasons) at
        // effort 'low' produced schema-valid but garbage content in several required fields —
        // literal "placeholder" strings. Tried effort 'medium' next: thinking ballooned to ~7950
        // of the 8500 token budget, truncating the JSON entirely — too expensive to be the fix.
        // Testing whether the schema consolidation above (one instructions_reasoning paragraph,
        // one subs_plan.overview, instead of ~13 separate required prose fields) resolves the
        // placeholder problem on its own back at the cheaper 'low' effort.
        output_config: lineupMode
          ? { effort: 'low', format: { type: 'json_schema', schema: LINEUP_SCHEMA } }
          : { effort: 'low' },
        // Adaptive thinking, re-enabled 2026-07-24 — verified directly this fixes the precision
        // failures seen with thinking disabled (self-contradictory sub timing, visible "actually
        // check: ..." scratch-work leaking into the reply, incomplete attribute cross-checks):
        // without a thinking pass, verification-heavy work happened inline in the visible
        // response instead of off-stage. A real test run used ~2500 thinking tokens + ~1550
        // visible-reply tokens (~4000 total) for a full 6-section lineup reply — 6500 leaves
        // headroom without being wasteful. budget_tokens is removed on claude-sonnet-5 (400s
        // if sent) — adaptive is the only on-mode, depth is tuned via output_config.effort.
        // Structured outputs (lineupMode) are documented as compatible with thinking.
        thinking: { type: 'adaptive' },
      }),
    });
  }

  try {
    let data, text, parsed, reply;
    const maxAttempts = lineupMode ? 2 : 1;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const r = await callAnthropic();
      data = await r.json();
      if (!r.ok) {
        console.error('[chat] anthropic error:', r.status, JSON.stringify(data).slice(0, 300));
        return new Response(JSON.stringify({ error: data?.error?.message || `Anthropic API error ${r.status}` }),
          { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
      }
      if (data.usage) {
        console.log('[chat] usage (attempt', attempt, '):', JSON.stringify(data.usage), 'stop_reason:', data.stop_reason);
      }
      text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
      reply = text;
      if (!lineupMode) break;
      parsed = null;
      try { parsed = JSON.parse(text); } catch (e) { console.error('[chat] lineup JSON parse failed (attempt', attempt, '):', e.message); }
      if (parsed && !isLineupReplyBroken(parsed)) {
        reply = formatLineupReply(parsed);
        break;
      }
      if (attempt === maxAttempts) {
        // Out of retries — format whatever we've got (parsed) rather than erroring outright,
        // or fall back to the raw JSON text if it never parsed at all.
        console.error('[chat] lineup reply still broken after', attempt, 'attempt(s), returning best effort');
        if (parsed) reply = formatLineupReply(parsed);
      } else {
        console.error('[chat] lineup reply broken on attempt', attempt, '— retrying');
      }
    }
    return new Response(JSON.stringify({ reply, usage: data.usage || null }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch(e) {
    console.error('[chat] request failed:', e.message);
    return new Response(JSON.stringify({ error: 'Request failed: ' + e.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
}

// Generates a short chat-session title from the first exchange, using Haiku (cheap/fast — no
// thinking needed for a 5-word title). Best-effort: any failure just leaves the fallback title.
async function handleTitle(request, env, cors) {
  if (!env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'not configured' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  const raw = await request.text();
  if (raw.length > 20000) {
    return new Response(JSON.stringify({ error: 'Request too large' }), { status: 413, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  let body;
  try { body = JSON.parse(raw); } catch(e) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  const text = typeof body.text === 'string' ? body.text.slice(0, 4000) : '';
  if (!text.trim()) {
    return new Response(JSON.stringify({ error: 'No text provided' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
  try {
    const r = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: TITLE_MODEL,
        max_tokens: 16,
        // Explicitly framed as a labeling task on inert data, not a message to respond to —
        // Haiku will occasionally answer the exchange in first person otherwise (esp. when the
        // assistant's reply reads like a question back), producing a sentence that gets cut off
        // by max_tokens instead of a title. The word/format check below is the safety net for
        // whatever slips through anyway.
        system: 'You label chat logs with short titles. You will be given a labeled EXCHANGE — a snippet of a past conversation for you to name, not a message addressed to you. Do not respond to it, answer it, or continue it. Output ONLY a 3-5 word title naming its topic: no quotes, no ending punctuation, no preamble.',
        messages: [{ role: 'user', content: `EXCHANGE (label this, do not respond to it):\n${text}\n\nTITLE:` }],
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || `Anthropic API error ${r.status}` }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
    let title = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim()
      .replace(/^["']|["']$/g, '').replace(/^title:\s*/i, '').trim();
    // Sanity check: reject anything that isn't a short, single-line title — a model that ignored
    // the framing and started answering the exchange gets caught here instead of shown to the user.
    const wordCount = title.split(/\s+/).filter(Boolean).length;
    const looksLikeATitle = title && wordCount >= 1 && wordCount <= 6 && title.length <= 50
      && !/[.!?]\s+\S/.test(title) && !/^(i|i'm|i am|sorry|unfortunately|as an?)\b/i.test(title);
    return new Response(JSON.stringify({ title: looksLikeATitle ? title : '' }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch(e) {
    return new Response(JSON.stringify({ error: 'Request failed: ' + e.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
}

// Parse /api/budgets?format=full response and cache budgets.
// Response shape: { budgets:{club→{transfer,wage,...}}, committed, available:{obj}, updatedAt, source }
async function cacheBudget(env, data) {
  try {
    const allBudgets = data?.budgets || null;

    // Extract Arsenal's transfer budget from the per-club dict
    const levEntry = allBudgets?.['Arsenal'] || allBudgets?.['arsenal'] || null;
    const levBudget = levEntry == null ? null
      : typeof levEntry === 'number' ? levEntry
      : (levEntry.transfer ?? levEntry.transferBudget ?? levEntry.budget ?? levEntry.available ?? null);

    if (typeof levBudget === 'number') {
      await env.SF_CACHE.put('sf_arsenal_fin_v1', JSON.stringify({ budget: levBudget, ts: Date.now() }));
      console.log('[budget] Arsenal:', levBudget);
    } else {
      console.log('[budget] could not parse Arsenal budget; entry:', JSON.stringify(levEntry).slice(0, 200));
    }
    if (allBudgets) {
      await env.SF_CACHE.put('sf_all_budgets_v1', JSON.stringify({ data: allBudgets, ts: Date.now() }));
      console.log('[budget] all clubs cached:', Object.keys(allBudgets).length);
    }
  } catch(e) { console.error('[budget] parse error:', e); }
}

// Write a one-line summary to sf_worker_log (ring buffer, last 20 entries).
// Call sparingly — each call costs 1 KV read + 1 KV write.
async function appendLog(env, type, msg) {
  try {
    const raw = await env.SF_CACHE.get('sf_worker_log');
    const log = raw ? JSON.parse(raw) : [];
    log.unshift({ ts: Date.now(), type, msg });
    if (log.length > 20) log.length = 20;
    await env.SF_CACHE.put('sf_worker_log', JSON.stringify(log));
  } catch(e) { console.error('[log] failed:', e); }
}

async function gameLogin(env) {
  const r = await fetch(`${GAME_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
  });
  if (!r.ok) return null;
  const { token } = await r.json();
  return token || null;
}

async function refreshSquadsCache(env) {
  const token = await gameLogin(env);
  if (!token) { console.error('[squads] login failed'); return; }

  const headers = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };

  // Fetch all squads

  const squadsRes = await fetch(`${GAME_API}/squads`, { headers });
  if (!squadsRes.ok) { console.error('[squads] fetch failed:', squadsRes.status); return; }
  const squads = await squadsRes.json();
  const clubCount = Object.keys(squads).length;
  await env.SF_CACHE.put('sf_squads_raw_v1', JSON.stringify({ data: squads, ts: Date.now() }));

  // Budget (auth required)
  try {
    const budgetRes = await fetch(`${GAME_API}/budgets?format=full`, { headers });
    if (budgetRes.ok) await cacheBudget(env, await budgetRes.json());
  } catch(e) { console.error('[budget]', e); }

  // Auctions
  try {
    const auctionsRes = await fetch(`${GAME_API}/auctions`, { headers });
    if (auctionsRes.ok) {
      const auctionsData = await auctionsRes.json();
      await env.SF_CACHE.put('sf_auctions_v1', JSON.stringify({ data: auctionsData, ts: Date.now() }));
      const count = Array.isArray(auctionsData) ? auctionsData.length : (auctionsData.items?.length || 0);
      console.log('[auctions]', count, 'cached');
    }
  } catch(e) { console.error('[auctions]', e); }

  // Vacancies — /api/admin/profile/vacancies (auth required)
  try {
    const vacRes = await fetch(`${GAME_API}/admin/profile/vacancies`, { headers });
    if (vacRes.ok) {
      const vacData = await vacRes.json();
      const clubs = vacData.clubs || [];
      await env.SF_CACHE.put('sf_vacancies_v1', JSON.stringify({ clubs, ts: Date.now() }));
      console.log('[vacancies]', clubs.length, 'vacancies:', clubs.join(', '));
    }
  } catch(e) { console.error('[vacancies]', e); }

  // Espionage + youth — run concurrently after squads are ready
  await Promise.all([
    refreshEspionageCache(env, squads, token),
    refreshYouthCache(env, token),
  ]);

  // Single log entry for the whole squads run (1 KV read + 1 KV write)
  await appendLog(env, 'squads', `${clubCount} clubs · ${new Date().toISOString()}`);
  console.log('[squads] done:', clubCount, 'clubs');
}

async function refreshEspionageCache(env, squads, token) {
  try {
    const clubs = Object.keys(squads);
    const BATCH = 8;
    const results = [];
    const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };

    for (let i = 0; i < clubs.length; i += BATCH) {
      const batch = clubs.slice(i, i + BATCH);
      const batchRes = await Promise.all(batch.map(async club => {
        const enc = encodeURIComponent(club);
        try {
          const [staffRes, facRes] = await Promise.all([
            fetch(`${GAME_API}/staff?club=${enc}`, { headers: h }).then(r => r.json()).catch(() => ({})),
            fetch(`${GAME_API}/facilities?club=${enc}`).then(r => r.json()).catch(() => ({})),
          ]);
          return { club, current: staffRes.current || {}, ads: staffRes.openAds || [], levels: facRes.levels || {}, project: facRes.project || null };
        } catch(e) {
          return { club, current: {}, ads: [], levels: {}, project: null };
        }
      }));
      results.push(...batchRes);
    }

    const negosRaw = await env.SF_CACHE.get('sf_negos_history_v1');
    const negos = negosRaw ? JSON.parse(negosRaw) : [];
    await env.SF_CACHE.put('sf_espionage_v3', JSON.stringify({ savedAt: Date.now(), clubs: results, negos }));
    console.log('[espionage]', results.length, 'clubs cached');
  } catch(e) { console.error('[espionage]', e); }
}

async function refreshYouthCache(env, token) {
  try {
    const enc = encodeURIComponent('Arsenal');
    const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };

    const [sjRes, acRes, facRes, staffRes, rejRes] = await Promise.all([
      fetch(`${GAME_API}/scouting/jobs?club=${enc}`, { headers: h }).then(r => r.json()),
      fetch(`${GAME_API}/academy?club=${enc}`, { headers: h }).then(r => r.json()),
      fetch(`${GAME_API}/facilities?club=${enc}`).then(r => r.json()),
      fetch(`${GAME_API}/staff/effects?club=${enc}`).then(r => r.json()),
      fetch(`${GAME_API}/scouting/jobs?club=${enc}&status=rejected`, { headers: h }).then(r => r.json()),
    ]);

    const now = Date.now();
    await env.SF_CACHE.put('sf_youth_idx_v2', JSON.stringify({
      savedAt: now, histSavedAt: now, staticSavedAt: now,
      cap: sjRes.cap || {},
      scouts: sjRes.items || [],
      academy: acRes.items || [],
      facilities: facRes || {},
      staff: (staffRes.ok ? staffRes.effects : {}) || {},
      rejected: rejRes.items || [],
    }));
    console.log('[youth] scouts:', sjRes.items?.length, 'academy:', acRes.items?.length);
  } catch(e) { console.error('[youth]', e); }
}

// Returns true if current time is within 9am–11pm US Eastern
function isActiveHours() {
  const now = new Date();
  const utcMonth = now.getUTCMonth(); // 0=Jan
  // DST: 2nd Sun Mar → 1st Sun Nov — approximate as month 2–9
  const estOffset = (utcMonth >= 2 && utcMonth <= 9) ? -4 : -5;
  const estHour = (now.getUTCHours() + estOffset + 24) % 24;
  return estHour >= 9 && estHour < 23;
}

async function refreshNegosCache(env) {
  if (!isActiveHours()) return;  // silent skip — no KV read needed

  // Rate-limit: one KV read to check last pull time
  const lastPullRaw = await env.SF_CACHE.get('sf_negos_last_pull');
  const lastPull = lastPullRaw ? parseInt(lastPullRaw, 10) : 0;
  const elapsedMin = (Date.now() - lastPull) / 60000;

  if (elapsedMin < 5) return;  // too soon
  // 5–15 min window: pull with linearly increasing probability
  if (elapsedMin < 15 && Math.random() > (elapsedMin - 5) / 10) return;

  // Negos fetch
  const r = await fetch('https://slowfootball.club/api/negotiations');
  if (!r.ok) { console.error('[negos] fetch failed:', r.status); return; }
  const data = await r.json();
  const fresh = Array.isArray(data) ? data : (data.negotiations || data.items || []);

  // Merge with history (1 KV read)
  const histRaw = await env.SF_CACHE.get('sf_negos_history_v1');
  const historical = histRaw ? JSON.parse(histRaw) : [];
  const map = new Map(historical.map(n => [n.id, n]));
  fresh.forEach(n => map.set(n.id, n));
  const merged = [...map.values()].sort((a, b) => new Date(b.updatedAt||0) - new Date(a.updatedAt||0));

  // 2 KV writes for negos data
  await env.SF_CACHE.put('sf_negos_history_v1', JSON.stringify(merged));
  await env.SF_CACHE.put('sf_negos_last_pull', String(Date.now()));

  console.log('[negos]', fresh.length, 'fresh,', merged.length, 'total,', elapsedMin.toFixed(1), 'min since last');
}

export default {
  async scheduled(event, env, ctx) {
    if (event.cron === '* * * * *') {
      ctx.waitUntil(refreshNegosCache(env));
    } else {
      ctx.waitUntil(refreshSquadsCache(env));
    }
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    // ── Staff proxy routes (server-to-server, no browser Origin) ──
    if (url.pathname === '/_staff/toggle' && request.method === 'POST') {
      try {
        const { roles } = await request.json();
        const token = await gameLogin(env);
        if (!token) return new Response(JSON.stringify({ error: 'login failed' }), { status: 401, headers: cors });
        const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };
        const r = await fetch(`${GAME_API}/staff/ads`, {
          method: 'POST', headers: h,
          body: JSON.stringify({ club: 'Arsenal', roles }),
        });
        const data = await r.json();
        return new Response(JSON.stringify(data), { headers: { ...cors, 'Content-Type': 'application/json' } });
      } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors });
      }
    }
    if (url.pathname === '/_staff/generate' && request.method === 'POST') {
      try {
        const { week } = await request.json();
        const token = await gameLogin(env);
        if (!token) return new Response(JSON.stringify({ error: 'login failed' }), { status: 401, headers: cors });
        const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };
        const r = await fetch(`${GAME_API}/staff/generate`, {
          method: 'POST', headers: h,
          body: JSON.stringify({ club: 'Arsenal', week }),
        });
        const data = await r.json();
        return new Response(JSON.stringify(data), { headers: { ...cors, 'Content-Type': 'application/json' } });
      } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors });
      }
    }

    // ── AI assistant ──
    if (url.pathname === '/_chat' && request.method === 'POST') {
      return handleChat(request, env, cors);
    }
    if (url.pathname === '/_title' && request.method === 'POST') {
      return handleTitle(request, env, cors);
    }

    // ── Admin routes ──
    if (url.pathname === '/_pull') {
      ctx.waitUntil(refreshSquadsCache(env));
      return new Response('squads refresh queued', { headers: cors });
    }
    if (url.pathname === '/_budget') {
      ctx.waitUntil((async () => {
        console.log('[budget] manual pull triggered');
        // Budget can work without auth; auctions always needs a token — so login once and reuse it.
        let budgetDone = false;
        try {
          const r = await fetch(`${GAME_API}/budgets?format=full`);
          if (r.ok) { await cacheBudget(env, await r.json()); budgetDone = true; }
        } catch(e) {}
        try {
          const token = await gameLogin(env);
          if (!token) { console.error('[budget] login failed'); return; }
          const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Arsenal', 'X-Role': 'manager', 'Content-Type': 'application/json' };
          if (!budgetDone) {
            const br = await fetch(`${GAME_API}/budgets?format=full`, { headers: h });
            if (br.ok) await cacheBudget(env, await br.json());
            else console.error('[budget] fetch failed:', br.status);
          }
          // Auctions — refresh so new bids show up promptly instead of waiting for the next cron
          const auctionsRes = await fetch(`${GAME_API}/auctions`, { headers: h });
          if (auctionsRes.ok) {
            const auctionsData = await auctionsRes.json();
            await env.SF_CACHE.put('sf_auctions_v1', JSON.stringify({ data: auctionsData, ts: Date.now() }));
            const count = Array.isArray(auctionsData) ? auctionsData.length : (auctionsData.items?.length || 0);
            console.log('[auctions] manual pull:', count, 'cached');
          } else {
            console.error('[auctions] fetch failed:', auctionsRes.status);
          }
        } catch(e) { console.error('[budget/auctions] pull error:', e.message); }
      })());
      return new Response('budget pull queued', { headers: cors });
    }
    if (url.pathname === '/_debug/auction-sample') {
      const raw = await env.SF_CACHE.get('sf_auctions_v1');
      if (!raw) return new Response('no auctions data', { status: 404, headers: cors });
      const auctions = JSON.parse(raw);
      const items = (auctions.data || auctions).items || auctions.data || auctions;
      const sample = Array.isArray(items) ? items[0] : null;
      return new Response(JSON.stringify(sample, null, 2), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const key = url.pathname.replace(/^\/sf-cache\//, '').replace(/^\//, '');
    if (!key) return new Response('', { status: 404, headers: cors });

    if (request.method === 'GET') {
      const val = await env.SF_CACHE.get(key);
      if (val === null) return new Response('', { status: 404, headers: cors });
      const maxAge = cacheMaxAge(key);
      return new Response(val, {
        headers: {
          ...cors,
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 3}`,
        },
      });
    }

    if (request.method === 'POST') {
      const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
      if (contentLength > MAX_BODY_BYTES) {
        return new Response('Payload too large', { status: 413, headers: cors });
      }
      const body = await request.text();
      if (body.length > MAX_BODY_BYTES) {
        return new Response('Payload too large', { status: 413, headers: cors });
      }
      const permanent = url.searchParams.get('permanent') === '1';
      const opts = permanent ? {} : { expirationTtl: 7 * 24 * 3600 };
      await env.SF_CACHE.put(key, body, opts);
      try {
        const getUrl = `${url.origin}/sf-cache/${key}`;
        await caches.default.delete(new Request(getUrl));
      } catch(e) {}
      return new Response('ok', { headers: cors });
    }

    if (request.method === 'DELETE') {
      await env.SF_CACHE.delete(key);
      return new Response('ok', { headers: cors });
    }

    return new Response('Method not allowed', { status: 405, headers: cors });
  }
};
