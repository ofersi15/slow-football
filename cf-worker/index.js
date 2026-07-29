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
// Player Roles (PLAYER_ROLES in src/constants.js, duplicated here since the worker doesn't share
// a build with the frontend) — flattened into one enum so the model can only pick a real role
// name; which of these 24 is valid for a given player's own base position is prompt guidance
// only (the schema has no way to make that conditional on a sibling field's value).
const ROLE_ENUM = [
  'Shot Stopper', 'Sweeper Keeper', 'Box Commander',
  'Defensive Full Back', 'Inverted Full Back', 'Overlapper', 'Two-Way Full Back',
  'No-Nonsense CB', 'Ball Player', 'Man Marker',
  'Deep-Lying Playmaker', 'Destroyer', 'Anchor', 'Box-to-Box Midfielder',
  'Advanced Playmaker', 'Shadow Striker', 'Trickster',
  'Traditional Winger', 'Inside Forward', 'Wide Playmaker',
  'Target Man', 'Poacher', 'False 9', 'Complete Forward',
];
// Plan B scenarios (PLAN_B_SCENARIOS in src/constants.js) — fires at most once per match, no
// personnel changes.
const PLAN_B_SCENARIO_ENUM = ['Down to 10', 'Opp down to 10', 'Losing by 2+', 'Winning by 2+', 'Concede early', 'Score early'];
// 2026-07-29: the named-Plan vocabulary a manager assigns per scenario (PLAN_B_NAMED_PLANS in
// src/constants.js) is confirmed directly off a real live opponent submission (Liverpool) — not
// a guess — so the model names a SPECIFIC plan per scenario now, not a vague free-text
// direction as originally shipped. What's still NOT confirmed is the exact underlying
// Mentality/Style/etc. value each named Plan triggers under the hood (see CHANGELOG.md's "Clubs
// tab: Player Roles + Plan B" entry) — so the schema only ever asserts the Plan's name.
const PLAN_B_NAMED_PLAN_ENUM = ['Shut Up Shop', 'Sit Deeper', 'Hold Shape', 'Keep The Ball', 'Go Direct', 'Push On', 'Chase The Game'];
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
          role: { enum: ROLE_ENUM, description: "Tactical role for this player, valid ONLY for their own base position (not whichever slot they're filling if playing out of position) — see the Player Roles list in the context's game mechanics reference." },
        },
        required: ['slot', 'player', 'rating', 'fitness_pct', 'is_captain', 'role'],
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
    // Optional — short Plan B block appended at the end of the Substitutions section (not a new
    // section of its own, matching the free-text template). Not in top-level `required` since
    // it's fine for the model to cover fewer scenarios when fewer are realistic for this match.
    plan_b: {
      type: 'array',
      description: '2-4 scenarios genuinely realistic for THIS matchup (not necessarily all 6, but check the opponent\'s own Plan B awareness in context — if they\'ve configured most/all 6, be more thorough here rather than defaulting to 1-2). Each names the scenario plus ONE specific named Plan from the fixed 7-option list and a short reason tied to this match. Never invent a Plan name outside that list, and never substitute a vague direction for a real name.',
      items: {
        type: 'object',
        properties: {
          scenario: { enum: PLAN_B_SCENARIO_ENUM },
          plan: { enum: PLAN_B_NAMED_PLAN_ENUM },
          reason: { type: 'string', minLength: 1, description: 'Short, match-specific reason this Plan suits this scenario.' },
        },
        required: ['scenario', 'plan', 'reason'],
        additionalProperties: false,
      },
    },
    // Everything below is free-text reasoning — optional (not in top-level `required`), the
    // part most likely to degrade under pressure, and least harmful to lose since the mechanical
    // decision it explains is already locked in above regardless.
    opponent_breakdown: { type: 'string', description: 'Open like a real assistant manager\'s scouting brief, in two parts: (a) 2-3 sentences on the opponent themselves — their setup, genuine strengths, genuine weaknesses, and general threat profile, independent of our own squad; (b) 2-3 sentences tying that into OUR specific matchup — where they hurt us, where we hurt them, naming at least one concrete personnel matchup (e.g. "my RW vs their LB"). If their Plan B awareness (in context) shows most/all 6 scenarios configured, mention that as part of (a) — it signals a well-drilled, reactive side.' },
    lineup_reasoning: { type: 'string', description: 'Plain-language paragraph on fitness/condition tradeoffs and any off-natural-position calls, citing both rating numbers for any such call. Never use the literal term "AltPosFit". Must also explicitly name and explain every notable player who is NOT starting (any position, not just defense) — not just justify who was picked. For wide forwards, note each one\'s Foot (from the squad context) against their Role: an Inside Forward wants their stronger foot on the inside (cutting in), a Traditional Winger wants it on the outside (hugging the line) — check this per player, don\'t assume symmetric assignment.' },
    instructions_reasoning: { type: 'string', description: 'One short paragraph, but it must touch EVERY ONE of the 6 instructions individually (mentality, style, structure, defensive_line, attacking_focus, pressing) with a real reason each, tied to the specific opponent matchup identified in the breakdown. A moderate-sounding value ("Balanced", "Mixed", "Medium") needs its own real reason just as much as an extreme one ("Very Attacking", "High Press") — do not skip explaining a field just because its value sounds self-evident, and do not give a generic justification that could apply to any opponent.' },
    subs_overview: { type: 'string', description: 'Brief note on the overall substitution strategy for this match — why this split of timings/plans.' },
    corner_reasoning: { type: 'string', description: 'If the opponent\'s own real corner zone assignments are available in context, name specific opposing players — a real aerial threat to mark on our defensive corner, a real weakness in their defensive-corner zones to target on our attacking corner. Otherwise omit this field entirely rather than writing a generic filler sentence.' },
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
// 2026-07-29 (round 2): under visibly heavy Anthropic API load that same session, a real reply
// had several reasoning fields come back containing the literal bare word "reason" (the schema's
// own JSON Schema property name for that exact field, leaking out as if it were the content) —
// a distinct filler pattern the original list didn't cover.
const PLACEHOLDER_RE = /^\s*(placeholder|tbd|n\/?a|todo|xxx?|reason|reasoning|description|summary)\s*\.?\s*$/i;
const cleanText = (s) => (typeof s === 'string' && !PLACEHOLDER_RE.test(s)) ? s : '';
// Belt-and-suspenders for the best-effort fallback path (still-broken reply rendered anyway once
// retries run out): truncates a reasoning-type field that's implausibly long for what it's meant
// to hold (a real corruption seen in testing — see isLineupReplyBroken's isOverlong comment above
// — was ~1900 garbled/duplicated characters in a field meant to be one short clause). The retry
// above should catch this first; this is only a backstop if it still slips through.
const cleanAndCap = (s, cap) => { const c = cleanText(s); return c && c.length > cap ? c.slice(0, cap) + '…' : c; };

function formatLineupReply(d) {
  const lines = [];
  if (cleanText(d.gw_status_note)) lines.push(cleanText(d.gw_status_note), '');
  const breakdown = cleanAndCap(d.opponent_breakdown, 1500);
  if (breakdown) lines.push('**Opponent breakdown**', breakdown, '');
  // Reasoning goes BEFORE the flat list, not after — matches the free-text template's rule and
  // was a real bug: this used to render after the list, the opposite of what was asked for.
  const lineupReasoning = cleanAndCap(d.lineup_reasoning, 1500);
  lines.push(`**Recommended lineup — ${d.formation || '?'}**`);
  if (lineupReasoning) lines.push(lineupReasoning, '');
  // Filter out the exact garbage shape isLineupReplyBroken() checks for — belt-and-suspenders
  // for the best-effort fallback path, where a still-broken reply gets rendered anyway after
  // retries run out rather than erroring outright.
  (d.lineup || []).filter(p => p && p.player && p.player !== '?' && p.slot && p.slot !== '?' && p.slot.length <= 4 && p.player.length <= 60 && !PLACEHOLDER_RE.test(p.player)).forEach(p => {
    const capt = p.is_captain ? ' (C)' : '';
    const role = cleanText(p.role) ? ` — Role: ${p.role}` : '';
    lines.push(`${p.slot || '?'}: ${p.player || '?'} (${p.rating ?? '?'}, ${p.fitness_pct ?? '?'}%)${capt}${role}`);
  });
  const ins = d.instructions || {};
  lines.push('', '**Match instructions**');
  [['Mentality', 'mentality'], ['Style', 'style'], ['Structure', 'structure'], ['Defensive Line', 'defensive_line'], ['Attacking Focus', 'attacking_focus'], ['Pressing', 'pressing']].forEach(([label, key]) => {
    lines.push(`${label}: ${ins[key] || '?'}`);
  });
  const instrReasoning = cleanAndCap(d.instructions_reasoning, 900);
  if (instrReasoning) lines.push('', instrReasoning);
  lines.push('', '**Substitutions**');
  const subsOverview = cleanAndCap(d.subs_overview, 600);
  if (subsOverview) lines.push(subsOverview, '');
  (d.subs || []).forEach(s => {
    const t = s.timing || {};
    lines.push(`${t.window || '?'} (${t.condition || '?'}) — ${s.player_in || '?'} IN for ${s.player_out || '?'} (${s.plan || '?'})`);
  });
  const planB = (Array.isArray(d.plan_b) ? d.plan_b : [])
    .map(pb => pb && cleanText(pb.scenario) && pb.plan ? { ...pb, reason: cleanAndCap(pb.reason, 350) } : null)
    .filter(pb => pb && pb.reason);
  if (planB.length) {
    lines.push('', '**Plan B**');
    planB.forEach(pb => lines.push(`${pb.scenario}: ${pb.plan} — ${pb.reason}`));
  }
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
  const cornerReasoning = cleanAndCap(d.corner_reasoning, 600);
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
  // 2026-07-29: a live test against a real matchup (Arsenal away at Liverpool) produced a
  // schema-valid but broken lineup array — 11 real starters plus a 12th "ghost" entry
  // ({slot:"?", player:"?", rating:0, fitness_pct:0, role:"Poacher"}) that this check didn't
  // catch since it only guarded against too FEW items, not a garbage extra one (nothing in the
  // schema forbids more than 11 — minItems/maxItems above 0/1 aren't supported, see LINEUP_SCHEMA
  // comments above). Tightened from "at least 9" to "exactly 11", plus a per-item check for the
  // exact garbage shape observed (empty/placeholder-like player or slot, or a 0 rating/fitness —
  // no real player in this game has either).
  // 2026-07-29 (round 2): a live test — while the Anthropic API was visibly under heavy load
  // (repeated transient "Overloaded"/Cloudflare 524 errors on other attempts that same session)
  // — returned schema-valid JSON where `plan_b[0].reason` (meant to be one short clause) instead
  // held ~1900 garbled, duplicated characters: what looked like a second near-complete copy of
  // the entire reply (reasoning, lineup, subs, corner tactics) mashed together with corrupted
  // text. Still parsed fine as JSON and passed every existing check, since none of them look at
  // free-text field *length*. A short-reason field a real reply would never legitimately fill
  // with thousands of characters is itself a corruption signal — capped every optional
  // reasoning-type field generously above its realistic legitimate length and treat any overrun
  // as broken (triggers the existing retry).
  const isOverlong = (s, cap) => typeof s === 'string' && s.length > cap;
  function isLineupReplyBroken(parsed) {
    if (!parsed || typeof parsed !== 'object') return true;
    if (!Array.isArray(parsed.lineup) || parsed.lineup.length !== 11) return true;
    // 2026-07-29 (round 2): a corrupted reply under heavy API load had a `slot` field containing
    // a whole run-on sentence of stray reasoning text instead of a real slot code (GK/RB/CB/...)
    // — valid non-empty strings, so the placeholder-style checks above didn't catch them. Real
    // slot codes and player names are always short; a wildly oversized one is corruption.
    // 2026-07-29 (round 3): a *different* ghost 12th item ({slot:"CF-fix", player:"placeholder",
    // rating:0, fitness_pct:0}) slipped past this same check — "CF-fix" is 6 chars, exactly at
    // the old ">6" cutoff (off-by-one), and "placeholder" as a player NAME wasn't checked against
    // PLACEHOLDER_RE at all (that regex was only ever applied to free-text reasoning fields).
    // Real slot codes are always exactly 2 chars (GK/RB/CB/DM/CM/WM/AM/WF/CF/LB) — tightened the
    // cap accordingly, and reused PLACEHOLDER_RE against the player name too.
    if (parsed.lineup.some(p => !p || !p.player || !p.slot || p.player === '?' || p.slot === '?' || !p.rating || !p.fitness_pct || p.slot.length > 4 || p.player.length > 60 || PLACEHOLDER_RE.test(p.player))) return true;
    if (!Array.isArray(parsed.subs) || parsed.subs.length < 3) return true;
    const sp = parsed.set_pieces;
    if (!sp || !sp.penalty || !sp.freekick || !sp.corner || !sp.penalty_rating || !sp.freekick_rating || !sp.corner_rating) return true;
    if (isOverlong(parsed.opponent_breakdown, 1500) || isOverlong(parsed.lineup_reasoning, 1500)
        || isOverlong(parsed.instructions_reasoning, 900) || isOverlong(parsed.subs_overview, 600)
        || isOverlong(parsed.corner_reasoning, 600)) return true;
    if (Array.isArray(parsed.plan_b) && parsed.plan_b.some(pb => isOverlong(pb?.reason, 350))) return true;
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
        // 2026-07-29: free-text mode raised 6500->8500 (now matching lineupMode) after live
        // testing against a real matchup (Arsenal away at Liverpool, a real submission with
        // Player Roles + a full Plan B set) hit stop_reason:"max_tokens" 3/5 times, cutting the
        // reply off mid-Section-4 with Plan B/Set pieces/Corner tactics never generated.
        // wrangler tail showed thinking alone varying 3787-4870 tokens run to run for the exact
        // same prompt — the extra per-line Role tag and the Plan B block (new content this
        // session) pushed adaptive thinking's variance past the old 6500 cap often enough to be
        // a real failure mode, not just a rare fluke. lineupMode already carried headroom for
        // JSON's structural overhead on top of the same content, so the two modes now share the
        // same budget rather than free-text staying tighter. Raised again 8500->10000 the same
        // day after owner feedback made Section 1 two-part (a standalone opponent scouting read
        // plus the matchup tie-in) and Plan B up to 4 lines with named plans + reasons — both
        // add real visible-text length on top of the same thinking-token variance, and a live
        // test still truncated mid-Section-6 at 8500. The stop_reason:"max_tokens" retry check
        // just above is the real backstop; this raise just makes that retry less often necessary.
        max_tokens: 10000,
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
    // 2026-07-29: a live test (Arsenal away at Liverpool, a real submission carrying Player
    // Roles + a full Plan B set) hit a free-text reply that came back completely empty —
    // ok:true, zero content — even after raising max_tokens above. Adaptive thinking's token
    // usage varies run to run for the identical prompt (3787-4966 seen in testing) and can,
    // rarely, consume the entire max_tokens budget before any visible text block starts. That
    // failure mode isn't unique to lineupMode's JSON-schema path, so both modes now get a retry
    // — free text only retries on a truly empty reply (never on a short-but-real one, e.g. a
    // one-line answer to a simple question), lineupMode keeps its existing broken-schema check.
    const maxAttempts = 2;
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
      if (!lineupMode) {
        // 2026-07-29 (round 2): raising max_tokens alone didn't fully fix it — a live test with
        // the richer two-part Section 1 + up-to-4-line Plan B block (added this round per owner
        // feedback) still truncated mid-Section-6, cut off mid-word, even at the 8500 cap raised
        // above earlier the same day. Checking stop_reason directly catches partial truncation
        // that a text-emptiness check alone misses.
        if (text.trim().length > 0 && data.stop_reason !== 'max_tokens') break;
        if (attempt === maxAttempts) {
          console.error('[chat] free-text reply still incomplete after', attempt, 'attempt(s) (stop_reason:', data.stop_reason, '), returning best effort');
        } else {
          console.error('[chat] free-text reply truncated/empty on attempt', attempt, '(stop_reason:', data.stop_reason, ') — retrying');
        }
        continue;
      }
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
