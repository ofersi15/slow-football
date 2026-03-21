// sf-game-proxy — token vending machine for slowfootball.club
// GET /token  → returns { token } (cached in KV for 23h, auto-refreshes)
// Secrets: SF_USERNAME, SF_PASSWORD
// KV binding: SF_KV

const TARGET = 'https://slowfootball.club';
const KV_TOKEN_KEY = 'sf_jwt';

export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { ...cors, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    let token = await env.SF_KV.get(KV_TOKEN_KEY);
    if (!token) {
      token = await login(env);
      if (!token) {
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 401, headers: cors });
      }
      await env.SF_KV.put(KV_TOKEN_KEY, token, { expirationTtl: 23 * 3600 });
    }

    return new Response(JSON.stringify({ token }), { headers: cors });
  },
};

async function login(env) {
  try {
    const resp = await fetch(`${TARGET}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: env.SF_USERNAME, password: env.SF_PASSWORD }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.token || data.accessToken || data.jwt || null;
  } catch {
    return null;
  }
}
