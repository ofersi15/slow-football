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
        // max_tokens history: 2500->6500 (adaptive thinking's own spend) ->8500->10000, each
        // raise chasing a stop_reason:"max_tokens" truncation as buildChatContext()'s reply
        // requirements grew (Role/Plan-B, footedness, fitness-aware subs, mirrored Plan B,
        // close-call analysis). 2026-07-29 (round 3): thinking alone hit 8250 then 9659 tokens
        // on two consecutive attempts against the 10000 cap, both stop_reason:"max_tokens" —
        // retrying didn't help since thinking's actual *need* had grown, not just its run-to-run
        // variance, so both attempts hit the same wall. Raised to 16000 for real headroom above
        // the highest thinking usage observed (9659) plus a full visible reply (~2000-2500
        // tokens historically). Re-check this if the reply-quality requirements below grow further.
        max_tokens: 16000,
        system,
        messages: cachedMessages,
        output_config: { effort: 'low' },
        // Adaptive thinking, re-enabled 2026-07-24 — verified directly this fixes the precision
        // failures seen with thinking disabled (self-contradictory sub timing, visible "actually
        // check: ..." scratch-work leaking into the reply, incomplete attribute cross-checks):
        // without a thinking pass, verification-heavy work happened inline in the visible
        // response instead of off-stage. budget_tokens is removed on claude-sonnet-5 (400s if
        // sent) — adaptive is the only on-mode, depth is tuned via output_config.effort.
        thinking: { type: 'adaptive' },
        // 2026-07-30: switched to streaming after live testing showed repeated `error code: 524`
        // (a Cloudflare edge-to-origin timeout — api.anthropic.com is itself Cloudflare-fronted)
        // even during a window status.claude.com showed no active incident for this model.
        // Root cause: a non-streaming call sends zero bytes back until the ENTIRE ~100-250s
        // generation (heavy adaptive thinking + up to 16,000 output tokens) finishes server-side
        // — any fixed idle/total timeout on an edge sitting between us and Anthropic's inference
        // backend kills a slow-but-healthy generation exactly like it would a real outage, same
        // error code either way. Streaming sends thinking/text deltas as they're produced, so the
        // connection has continuous bytes flowing almost immediately instead of one long silence
        // — this doesn't reduce actual generation time, but avoids the failure mode that looks
        // identical to a timeout when the model is simply still thinking. See
        // `readAnthropicStream()` below, which reconstructs the same {content, usage, stop_reason}
        // shape the non-streaming API returned so none of the parsing/retry logic below it needed
        // to change.
        stream: true,
      }),
    });
  }

  // Reconstructs the same {content, usage, stop_reason} shape the non-streaming Messages API
  // returns, from a `stream:true` SSE response — every existing content/usage/stop_reason
  // reader below this function needed zero changes as a result. Thinking-block deltas
  // (`thinking_delta`) are intentionally not accumulated — their text was never surfaced to the
  // reply even in the non-streaming response (only `type:'text'` blocks are read downstream) —
  // only `text_delta` is accumulated; `input_json_delta`/`partial_json` is also handled
  // defensively in case a future tool-use-style response streams that way instead.
  async function readAnthropicStream(r) {
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    const blocks = [];
    let usage = null;
    let stopReason = null;
    let streamError = null;

    const processEvent = (dataStr) => {
      let evt;
      try { evt = JSON.parse(dataStr); } catch (e) { return; }
      switch (evt.type) {
        case 'message_start':
          usage = evt.message?.usage || null;
          break;
        case 'content_block_start':
          blocks[evt.index] = { type: evt.content_block?.type, text: '' };
          break;
        case 'content_block_delta':
          if (blocks[evt.index] && evt.delta) {
            if (evt.delta.type === 'text_delta') blocks[evt.index].text += evt.delta.text || '';
            else if (evt.delta.type === 'input_json_delta') blocks[evt.index].text += evt.delta.partial_json || '';
          }
          break;
        case 'message_delta':
          if (evt.usage) usage = { ...(usage || {}), ...evt.usage };
          if (evt.delta?.stop_reason) stopReason = evt.delta.stop_reason;
          break;
        case 'error':
          streamError = evt.error || evt;
          break;
      }
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n\n')) !== -1) {
        const chunk = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data:')) processEvent(line.slice(5).trim());
        }
      }
    }
    if (streamError) throw new Error(streamError.message || JSON.stringify(streamError));
    return {
      content: blocks.filter(Boolean).map(b => ({ type: b.type, text: b.text })),
      usage,
      stop_reason: stopReason,
    };
  }

  try {
    let data, text, reply;
    // 2026-07-29: a live test (Arsenal away at Liverpool, a real submission carrying Player
    // Roles + a full Plan B set) hit a reply that came back completely empty — ok:true, zero
    // content — even after raising max_tokens above. Adaptive thinking's token usage varies run
    // to run for the identical prompt (3787-4966 seen in testing) and can, rarely, consume the
    // entire max_tokens budget before any visible text block starts. Retries on a truly empty
    // reply or a stop_reason:"max_tokens" mid-reply truncation only — never on a short-but-real
    // one (e.g. a one-line answer to a simple question).
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const r = await callAnthropic();
      if (!r.ok) {
        // A non-2xx response is either a real Anthropic API error (JSON body) or a gateway-level
        // failure (a Cloudflare 524 edge-timeout page, seen live, is plain text/HTML) — same
        // distinction the non-streaming code made, just read directly since there's no stream to
        // consume on an error status.
        const errText = await r.text();
        let errData;
        try { errData = JSON.parse(errText); } catch (e) { errData = null; }
        if (!errData) {
          console.error('[chat] non-JSON error response from Anthropic (attempt', attempt, '):', errText.slice(0, 200));
          if (attempt === maxAttempts) {
            return new Response(JSON.stringify({ error: 'Anthropic API returned an invalid response (likely a transient gateway timeout) — please try again' }),
              { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
          }
          continue;
        }
        console.error('[chat] anthropic error:', r.status, JSON.stringify(errData).slice(0, 300));
        return new Response(JSON.stringify({ error: errData?.error?.message || `Anthropic API error ${r.status}` }),
          { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
      }
      try {
        data = await readAnthropicStream(r);
      } catch (e) {
        // The stream started (200 OK) but errored or was cut off mid-flight — still possible
        // even with streaming, just less exposed than the old non-streaming call. Treat exactly
        // like the old non-JSON-body case: retry once, then give up.
        console.error('[chat] stream read failed (attempt', attempt, '):', e.message);
        if (attempt === maxAttempts) {
          return new Response(JSON.stringify({ error: 'Anthropic API returned an invalid response (likely a transient gateway timeout) — please try again' }),
            { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
        }
        continue;
      }
      if (data.usage) {
        console.log('[chat] usage (attempt', attempt, '):', JSON.stringify(data.usage), 'stop_reason:', data.stop_reason);
      }
      text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
      reply = text;
      // Checking stop_reason directly (not just text emptiness) catches partial
      // mid-reply truncation too — a real failure mode seen in testing.
      if (text.trim().length > 0 && data.stop_reason !== 'max_tokens') break;
      if (attempt === maxAttempts) {
        console.error('[chat] reply still incomplete after', attempt, 'attempt(s) (stop_reason:', data.stop_reason, '), returning best effort');
      } else {
        console.error('[chat] reply truncated/empty on attempt', attempt, '(stop_reason:', data.stop_reason, ') — retrying');
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
