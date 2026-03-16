// Cloudflare Worker — authenticated proxy for slowfootball.club/api
// Forwards any request to the game API, injecting the Bearer token from env.
// Setup:
//   1. Create worker named "sf-game-proxy" in Cloudflare dashboard
//   2. Add secret: SF_TOKEN = your JWT from localStorage.token
//   3. Deploy this code
// URL: https://sf-game-proxy.ofersi15.workers.dev
//
// Usage (any path is forwarded to slowfootball.club):
//   GET  /api/game
//   GET  /api/scouting/jobs?club=Leverkusen
//   GET  /development
//   etc.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const gameUrl = 'https://slowfootball.club' + url.pathname + url.search;

    const upstream = await fetch(gameUrl, {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${env.SF_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    });

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
