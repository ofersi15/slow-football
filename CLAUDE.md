# CLAUDE.md — Slow Football Analytics

This file gives Claude Code full context about this project. Read it at the start of every session.

---

## What This Is

A personal fantasy football analytics web app. It's a **single-page Vue 3 app** (CDN, no build step) that:
- Fetches player/squad data from the slowfootball.club game API
- Displays league standings, player stats, trade analyzer, espionage (opponent scouting), youth scouting, and auction draft tool
- Caches API responses in a Cloudflare KV-backed cache worker to avoid re-fetching on every load

**Live site:** https://sf.ofersi15.workers.dev
**GitHub repo:** https://github.com/ofersi15/slow-football

---

## Hosting & Infrastructure

| Component | Details |
|-----------|---------|
| **App** | Cloudflare Pages — auto-deploys from `main` branch of the GitHub repo |
| **Cache Worker** | `https://sf-cache.ofersi15.workers.dev` — KV-backed persistent cache (replaces server.py) |
| **Proxy Worker** | `sf-game-proxy.ofersi15.workers.dev` — token vending machine (not currently needed) |
| GitHub Pages | **Inactive** — do not reference or use |

**Deployment workflow:** Edit files locally → `git commit` → `git push origin main` → CF Pages auto-deploys within ~60s. Always push after every change.

---

## File Structure

```
slow-football/
├── index.html        # All Vue template markup
├── app.js            # All Vue logic, data fetching, computed props
├── style.css         # Styles
├── CLAUDE.md         # This file
└── cf-worker/
    ├── index.js              # Cache worker (sf-cache.ofersi15.workers.dev)
    ├── proxy.js              # Token proxy worker (sf-game-proxy, not needed)
    └── wrangler-proxy.toml   # Wrangler config for proxy worker
```

---

## Critical Architecture Notes

### Vue 3 CDN Runtime — No Build Step
The app uses Vue 3 via unpkg CDN with the **runtime-only** build. The template lives in `index.html` as a real DOM template (not a string template or render function). This means:
- `index.html` and `app.js` are separate files — Vue mounts from the DOM
- **Never put `</script>` at the end of app.js** — it will break the HTML parser
- `app.js` must NOT be wrapped in `<script>` tags; `index.html` includes it via `<script src="app.js">`

### index.html Structure
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <!-- ALL Vue template markup here -->
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

### Cache Strategy (CF Worker KV)
The app routes cache reads/writes through `sf-cache.ofersi15.workers.dev` when running on `sf.ofersi15.workers.dev`. Falls back to `localStorage` and then `/sf-cache` (local server.py) on other hostnames.

```javascript
const SF_CACHE_BASE = location.hostname === 'sf.ofersi15.workers.dev'
  ? 'https://sf-cache.ofersi15.workers.dev/sf-cache'
  : '/sf-cache';
```

Cache worker (cf-worker/index.js) exposes GET/POST/DELETE on `/sf-cache/<key>`, backed by a KV namespace bound as `SF_CACHE`.

All cache read/write points in `loadData()`, `enrichStats()`, `fetchFreshData()`, `loadEspionage()`, `clearPlayersCache()` use server-first with localStorage fallback.

---

## Game API

```javascript
const API = 'https://slowfootball.club/api';
const MY_CLUB = 'Leverkusen';
```

Auth: `Authorization: Bearer <token>`, `X-Club: Leverkusen`, `X-Role: manager`. Token obtained from `POST /api/auth/login` — vended by the proxy worker using secrets `SF_USERNAME` / `SF_PASSWORD`.

Key endpoints:
- `GET /api/squads` — all clubs' squads (dict keyed by club name)
- `GET /api/squads?club=<name>` — single club squad `{club, players}`
- `GET /api/scouting/jobs?club=<name>` — active scouting jobs `{items, cap}`
- `GET /api/scouting/jobs?club=<name>&status=rejected|accepted` — history
- `GET /api/transfers/done` — transfer history `{deals}`
- `GET /api/agents/international-players` — international scouting pool (108 players)
- `GET /api/managers`, `GET /api/admin/squads/public/clubs`, `GET /api/clubs`

---

## Key Constants (top of app.js)

```javascript
const LEAGUE_ID = '...';
const PLAYERS_CACHE_KEY = 'sf_players_v2';
const STATS_CACHE_KEY = 'sf_stats_v2';
const FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];
```

---

## Known Quirks & Past Bugs

- **`</script>` in app.js**: Was accidentally included during a file-split refactor. Always verify app.js does NOT end with `</script>`
- **Duplicate Vue CDN line**: Was accidentally added during refactor. index.html should have exactly ONE Vue CDN script tag
- **Missing `<body>` tag**: Was missing after a refactor. `<div id="app">` must be inside `<body>`
- **Incomplete player stats**: 32 players across squads have fewer than 11 stats. null-ID real-world players (Musiala, Rashford, etc.) and custom-ID transfers (jaap-martin-cb, mason-mount-am, etc.) only have 4 position-key stats — no more data exists on the server. Exception: Ernesto Gentile (Monaco) has full stats in Monaco's accepted scouting job records. These players are flagged with `_incompleteStats` and show an orange "partial" badge in the player table.

---

## What Has Been Built (Feature List)

- **Standings tab** — league standings with win/loss, points
- **Player Stats tab** — filterable stats table with enriched data; "partial" badge for incomplete players
- **Trade Analyzer tab** — compare players across rosters for trade evaluation
- **Espionage tab** — scout opponents; auto-loads on app start; cached
- **Youth tab** — own club scouting jobs, academy, facilities, staff; history scan across all managed clubs (active + rejected + accepted)
- **Auction Draft tool** — budget tracking for auction-style drafts

---

## User

- Ofer (ofersi15@gmail.com)
- Fantasy football enthusiast, non-developer, using this app for personal use
- Prefers minimal terminal interaction — always commit and push after every change
