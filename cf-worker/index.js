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

// Parse /api/budgets?format=full response and cache Leverkusen's budget
async function cacheBudget(env, data) {
  try {
    // Response may be keyed by club name or have a specific shape — try common structures
    const lev = data['Leverkusen'] || data['leverkusen']
              || (Array.isArray(data) ? data.find(b => (b.club||b.name||'').toLowerCase().includes('leverkusen')) : null)
              || data;
    const budget = lev?.budget ?? lev?.transferBudget ?? lev?.transfer_budget ?? null;
    if (budget != null) {
      await env.SF_CACHE.put('sf_leverkusen_fin_v1', JSON.stringify({ budget, ts: Date.now() }));
      await appendLog(env, 'budget', `Leverkusen budget: ${budget}`);
      console.log('[budget] cached:', budget);
    } else {
      // Log keys to help debug the response shape
      const sample = Array.isArray(data) ? data[0] : data;
      await appendLog(env, 'debug', `budget-keys: ${Object.keys(sample||{}).join(',')}`);
    }
  } catch(e) { console.error('[budget] parse error:', e); }
}

// Append an entry to the KV-based worker log (last 50 entries, ring buffer)
async function appendLog(env, type, msg) {
  try {
    const raw = await env.SF_CACHE.get('sf_worker_log');
    const log = raw ? JSON.parse(raw) : [];
    log.unshift({ ts: Date.now(), type, msg });
    if (log.length > 50) log.length = 50;
    await env.SF_CACHE.put('sf_worker_log', JSON.stringify(log));
  } catch(e) { console.error('[log] failed to write log:', e); }
}

async function refreshSquadsCache(env) {
  // Login to get fresh token
  const loginRes = await fetch(`${GAME_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
  });
  if (!loginRes.ok) {
    const msg = `login failed: ${loginRes.status}`;
    console.error('[squads]', msg);
    await appendLog(env, 'error', `squads: ${msg}`);
    return;
  }
  const { token } = await loginRes.json();
  if (!token) {
    await appendLog(env, 'error', 'squads: no token in login response');
    return;
  }

  const headers = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Leverkusen', 'X-Role': 'manager', 'Content-Type': 'application/json' };

  // Fetch all squads (bulk endpoint returns dict keyed by club name)
  const squadsRes = await fetch(`${GAME_API}/squads`, { headers });
  if (!squadsRes.ok) {
    const msg = `squads fetch failed: ${squadsRes.status}`;
    console.error('[squads]', msg);
    await appendLog(env, 'error', msg);
    return;
  }
  const squads = await squadsRes.json();
  const clubCount = Object.keys(squads).length;

  await env.SF_CACHE.put('sf_squads_raw_v1', JSON.stringify({ data: squads, ts: Date.now() }));
  console.log(`[squads] refreshed: ${clubCount} clubs`);

  // Also fetch tables (lightweight) and cache separately
  const tablesRes = await fetch(`${GAME_API}/tables/from-fixtures`, { headers });
  if (tablesRes.ok) {
    const tables = await tablesRes.json();
    await env.SF_CACHE.put('sf_tables_raw_v1', JSON.stringify({ data: tables, ts: Date.now() }));
  }

  // Fetch budget from the dedicated endpoint (auth required)
  try {
    const budgetRes = await fetch(`${GAME_API}/budgets?format=full`, { headers });
    if (budgetRes.ok) {
      await cacheBudget(env, await budgetRes.json());
    }
  } catch(e) { console.error('[budget]', e); }

  // Fetch active auctions — has all bids + player snapshots
  try {
    const auctionsRes = await fetch(`${GAME_API}/auctions`, { headers });
    if (auctionsRes.ok) {
      const auctionsData = await auctionsRes.json();
      await env.SF_CACHE.put('sf_auctions_v1', JSON.stringify({ data: auctionsData, ts: Date.now() }));
      const count = Array.isArray(auctionsData) ? auctionsData.length : (auctionsData.items?.length || 0);
      await appendLog(env, 'auctions', `${count} auctions cached`);
    }
  } catch(e) { console.error('[auctions]', e); }

  await appendLog(env, 'squads', `${clubCount} clubs refreshed`);
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
  if (!isActiveHours()) { return; }  // silent skip outside hours

  // Check last pull time — enforce 5-min minimum, randomise up to 15 min
  const lastPullRaw = await env.SF_CACHE.get('sf_negos_last_pull');
  const lastPull = lastPullRaw ? parseInt(lastPullRaw, 10) : 0;
  const elapsedMin = (Date.now() - lastPull) / 60000;

  if (elapsedMin < 5) { return; }  // silent skip — too soon
  // Between 5–15 min: pull with linearly increasing probability
  if (elapsedMin < 15 && Math.random() > (elapsedMin - 5) / 10) { return; }  // random skip

  // Try budget without auth — if the endpoint is public this keeps budget fresh alongside negos
  try {
    const budgetRes = await fetch(`${GAME_API}/budgets?format=full`);
    if (budgetRes.ok) await cacheBudget(env, await budgetRes.json());
    // If 401/403, silently skip — refreshSquadsCache handles the authed version
  } catch(e) {}

  const r = await fetch('https://slowfootball.club/api/negotiations');
  if (!r.ok) {
    const msg = `negos fetch failed: ${r.status}`;
    console.error('[negos]', msg);
    await appendLog(env, 'error', msg);
    return;
  }
  const data = await r.json();
  const fresh = Array.isArray(data) ? data : (data.negotiations || data.items || []);

  // Merge with accumulated history
  const histRaw = await env.SF_CACHE.get('sf_negos_history_v1');
  const historical = histRaw ? JSON.parse(histRaw) : [];
  const map = new Map(historical.map(n => [n.id, n]));
  fresh.forEach(n => map.set(n.id, n));
  const merged = [...map.values()].sort((a, b) => new Date(b.updatedAt||0) - new Date(a.updatedAt||0));

  await env.SF_CACHE.put('sf_negos_history_v1', JSON.stringify(merged));
  await env.SF_CACHE.put('sf_negos_last_pull', String(Date.now()));

  const msg = `${fresh.length} fresh, ${merged.length} total (${elapsedMin.toFixed(1)}m since last)`;
  console.log('[negos]', msg);
  await appendLog(env, 'negos', msg);
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
        await appendLog(env, 'budget-pull', 'manual trigger');
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
          if (!loginRes.ok) { await appendLog(env, 'error', `budget login failed: ${loginRes.status}`); return; }
          const { token } = await loginRes.json();
          const h = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Leverkusen', 'X-Role': 'manager', 'Content-Type': 'application/json' };
          const br = await fetch(`${GAME_API}/budgets?format=full`, { headers: h });
          if (br.ok) await cacheBudget(env, await br.json());
          else await appendLog(env, 'error', `budget fetch failed: ${br.status}`);
        } catch(e) { await appendLog(env, 'error', `budget pull error: ${e.message}`); }
      })());
      return new Response('budget pull queued', { headers: cors });
    }
    if (url.pathname === '/_debug/auction-sample') {
      const raw = await env.SF_CACHE.get('sf_negos_history_v1');
      if (!raw) return new Response('no negos data', { status: 404, headers: cors });
      const negos = JSON.parse(raw);
      const sample = negos.find(n => n.via === 'auction') || negos[0] || null;
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
      // Purge CF edge cache so the next GET reads fresh KV data
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
