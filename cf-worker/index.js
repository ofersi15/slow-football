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

// Parse /api/budgets?format=full response and cache budgets.
// Response shape: { budgets:{club→{transfer,wage,...}}, committed, available:{obj}, updatedAt, source }
async function cacheBudget(env, data) {
  try {
    const allBudgets = data?.budgets || null;

    // Extract Leverkusen's transfer budget from the per-club dict
    const levEntry = allBudgets?.['Leverkusen'] || allBudgets?.['leverkusen'] || null;
    const levBudget = levEntry == null ? null
      : typeof levEntry === 'number' ? levEntry
      : (levEntry.transfer ?? levEntry.transferBudget ?? levEntry.budget ?? levEntry.available ?? null);

    if (typeof levBudget === 'number') {
      await env.SF_CACHE.put('sf_leverkusen_fin_v1', JSON.stringify({ budget: levBudget, ts: Date.now() }));
      console.log('[budget] Leverkusen:', levBudget);
    } else {
      console.log('[budget] could not parse lev budget; entry:', JSON.stringify(levEntry).slice(0, 200));
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

async function refreshSquadsCache(env) {
  // Login to get fresh token
  const loginRes = await fetch(`${GAME_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
  });
  if (!loginRes.ok) {
    console.error('[squads] login failed:', loginRes.status);
    return;
  }
  const { token } = await loginRes.json();
  if (!token) { console.error('[squads] no token'); return; }

  const headers = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Leverkusen', 'X-Role': 'manager', 'Content-Type': 'application/json' };

  // Fetch all squads
  const squadsRes = await fetch(`${GAME_API}/squads`, { headers });
  if (!squadsRes.ok) { console.error('[squads] fetch failed:', squadsRes.status); return; }
  const squads = await squadsRes.json();
  const clubCount = Object.keys(squads).length;
  await env.SF_CACHE.put('sf_squads_raw_v1', JSON.stringify({ data: squads, ts: Date.now() }));

  // Tables
  const tablesRes = await fetch(`${GAME_API}/tables/from-fixtures`, { headers });
  if (tablesRes.ok) {
    await env.SF_CACHE.put('sf_tables_raw_v1', JSON.stringify({ data: await tablesRes.json(), ts: Date.now() }));
  }

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

  // Single log entry for the whole squads run (1 KV read + 1 KV write)
  await appendLog(env, 'squads', `${clubCount} clubs · ${new Date().toISOString()}`);
  console.log('[squads] done:', clubCount, 'clubs');
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

  // Budget (public endpoint — no auth needed for negos pull)
  try {
    const budgetRes = await fetch(`${GAME_API}/budgets?format=full`);
    if (budgetRes.ok) await cacheBudget(env, await budgetRes.json());
  } catch(e) {}

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

    // ── Admin routes ──
    if (url.pathname === '/_pull') {
      ctx.waitUntil(refreshSquadsCache(env));
      return new Response('squads refresh queued', { headers: cors });
    }
    if (url.pathname === '/_budget') {
      ctx.waitUntil((async () => {
        console.log('[budget] manual pull triggered');
        // Try without auth first
        try {
          const r = await fetch(`${GAME_API}/budgets?format=full`);
          if (r.ok) { await cacheBudget(env, await r.json()); return; }
        } catch(e) {}
        // Auth required — login and fetch
        try {
          const loginRes = await fetch(`${GAME_API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
          });
          if (!loginRes.ok) { console.error('[budget] login failed:', loginRes.status); return; }
          const { token } = await loginRes.json();
          const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Leverkusen', 'X-Role': 'manager', 'Content-Type': 'application/json' };
          const br = await fetch(`${GAME_API}/budgets?format=full`, { headers: h });
          if (br.ok) await cacheBudget(env, await br.json());
          else console.error('[budget] fetch failed:', br.status);
        } catch(e) { console.error('[budget] pull error:', e.message); }
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
