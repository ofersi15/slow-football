// Cloudflare Worker — persistent cache for Slow Football app
// Mirrors the /sf-cache GET/POST/DELETE interface of server.py
// Setup: create a KV namespace named SF_CACHE and bind it to this worker
// Deploy URL: https://sf-cache.<account>.workers.dev
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\/sf-cache\//, '').replace(/^\//, '');
    const cors = {
      'Access-Control-Allow-Origin': request.headers.get('Origin')?.includes('ofersi15') ? request.headers.get('Origin') : 'https://sf.ofersi15.workers.dev',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (!key) return new Response('', { status: 404, headers: cors });
    if (request.method === 'GET') {
      const val = await env.SF_CACHE.get(key);
      if (val === null) return new Response('', { status: 404, headers: cors });
      return new Response(val, { headers: { ...cors, 'Content-Type': 'application/json' } });
    }
    if (request.method === 'POST') {
      await env.SF_CACHE.put(key, await request.text(), { expirationTtl: 7 * 24 * 3600 });
      return new Response('ok', { headers: cors });
    }
    if (request.method === 'DELETE') {
      await env.SF_CACHE.delete(key);
      return new Response('ok', { headers: cors });
    }
    return new Response('Method not allowed', { status: 405, headers: cors });
  }
};
