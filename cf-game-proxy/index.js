// Cloudflare Worker — authenticated proxy for slowfootball.club/api
// Auto-logins with credentials and caches the token in KV.
//
// Setup:
//   1. Create worker named "sf-game-proxy" in Cloudflare dashboard
//   2. Bind a KV namespace named SF_KV to this worker
//   3. Add secrets: SF_USERNAME and SF_PASSWORD
//   4. Deploy this code
//
// Usage (any path is forwarded to slowfootball.club):
//   https://sf-game-proxy.ofersi15.workers.dev/api/game
//   https://sf-game-proxy.ofersi15.workers.dev/api/scouting/jobs?club=Leverkusen

const GAME_BASE = 'https://slowfootball.club';
const TOKEN_KV_KEY = 'sf_auth_token';

async function login(env) {
  const res = await fetch(`${GAME_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  // token is in data.token or data.accessToken — handle both
  const token = data.token || data.accessToken || data.access_token;
  if (!token) throw new Error('No token in login response: ' + JSON.stringify(data));
  // Cache for 23 hours (tokens typically last 24h)
  await env.SF_KV.put(TOKEN_KV_KEY, token, { expirationTtl: 23 * 3600 });
  return token;
}

async function getToken(env) {
  const cached = await env.SF_KV.get(TOKEN_KV_KEY);
  if (cached) return cached;
  return await login(env);
}

async function proxyRequest(request, env, token) {
  const url = new URL(request.url);
  const gameUrl = GAME_BASE + url.pathname + url.search;
  return await fetch(gameUrl, {
    method: request.method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });
}

export default {
  async fetch(request, env) {
    let token = await getToken(env);
    let upstream = await proxyRequest(request, env, token);

    // If token expired mid-session, re-login once and retry
    if (upstream.status === 401 || upstream.status === 403) {
      await env.SF_KV.delete(TOKEN_KV_KEY);
      token = await login(env);
      upstream = await proxyRequest(request, env, token);
    }

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
