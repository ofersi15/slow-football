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

async function refreshSquadsCache(env) {
  // Login to get fresh token
  const loginRes = await fetch(`${GAME_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
  });
  if (!loginRes.ok) { console.error('[cron] login failed:', loginRes.status); return; }
  const { token } = await loginRes.json();
  if (!token) { console.error('[cron] no token in login response'); return; }

  const headers = { 'Authorization': `Bearer ${token}`, 'X-Club': 'Leverkusen', 'X-Role': 'manager', 'Content-Type': 'application/json' };

  // Fetch all squads (bulk endpoint returns dict keyed by club name)
  const squadsRes = await fetch(`${GAME_API}/squads`, { headers });
  if (!squadsRes.ok) { console.error('[cron] squads failed:', squadsRes.status); return; }
  const squads = await squadsRes.json();
  const clubCount = Object.keys(squads).length;

  await env.SF_CACHE.put('sf_squads_raw_v1', JSON.stringify({ data: squads, ts: Date.now() }));
  console.log(`[cron] squads refreshed: ${clubCount} clubs`);

  // Also fetch tables (lightweight) and cache separately
  const tablesRes = await fetch(`${GAME_API}/tables/from-fixtures`, { headers });
  if (tablesRes.ok) {
    const tables = await tablesRes.json();
    await env.SF_CACHE.put('sf_tables_raw_v1', JSON.stringify({ data: tables, ts: Date.now() }));
    console.log('[cron] tables refreshed');
  }
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(refreshSquadsCache(env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\/sf-cache\//, '').replace(/^\//, '');
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
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
