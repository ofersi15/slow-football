// Cloudflare Worker — persistent cache for Slow Football app
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

export default {
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
      return new Response('ok', { headers: cors });
    }

    if (request.method === 'DELETE') {
      await env.SF_CACHE.delete(key);
      return new Response('ok', { headers: cors });
    }

    return new Response('Method not allowed', { status: 405, headers: cors });
  }
};
