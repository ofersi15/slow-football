# CLAUDE.md — Slow Football Analytics

This file gives Claude Code full context about this project. Read it at the start of every session.

---

## What This Is

A personal fantasy football analytics web app. It's a **single-page Vue 3 app** (CDN, no build step) that:
- Fetches player stats from a Sleeper API proxy (via `allorigins.win`)
- Displays league standings, player stats, trade analyzer, espionage (opponent scouting), and auction draft tool
- Caches API responses to avoid re-fetching on every load
- Is hosted as a **static site on GitHub Pages** — no backend required for the hosted version

**Live site:** https://ofersi15.github.io/slow-football/
**GitHub repo:** https://github.com/ofersi15/slow-football

---

## File Structure

```
SlowFootball/
├── index.html        # All Vue template markup (~1800 lines)
├── app.js            # All Vue logic, data fetching, computed props (~1845 lines)
├── style.css         # Minimal styles (74 lines)
├── server.py         # Optional local Python server for persistent cache (stdlib only, no Flask)
├── CLAUDE.md         # This file
├── SETUP.md          # Deployment guide (GitHub Pages, HAOS add-on, Cloudflare, Tailscale)
├── auto-push.ps1     # PowerShell FileSystemWatcher — auto-commits and pushes on file change
├── install-auto-push.bat  # Registers auto-push.ps1 as a Windows Task Scheduler task
├── .nojekyll         # Tells GitHub Pages to skip Jekyll processing
└── haos-addon/       # Home Assistant OS add-on files
    ├── config.yaml
    ├── Dockerfile
    └── server.py
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
  <!-- other meta/head stuff -->
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

### Cache Strategy (Dual: Server + localStorage)
When running locally with `server.py`, cache is stored server-side (survives browser clears, shared across tabs). On GitHub Pages (no server), falls back to localStorage.

Helper functions at the top of `app.js`:
```javascript
const SF_CACHE_BASE = '/sf-cache';

async function serverCacheGet(key) {
  if (location.protocol === 'file:') return null;
  try {
    const r = await fetch(`${SF_CACHE_BASE}/${key}`, {signal: AbortSignal.timeout(3000)});
    if (!r.ok) return null;
    return await r.text();
  } catch(e) { return null; }
}

async function serverCacheSet(key, str) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: str,
      signal: AbortSignal.timeout(5000),
    });
  } catch(e) {}
}

async function serverCacheDelete(key) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}`, {method: 'DELETE', signal: AbortSignal.timeout(3000)});
  } catch(e) {}
}
```

All cache read/write points in `loadData()`, `enrichStats()`, `fetchFreshData()`, `loadEspionage()`, `clearPlayersCache()` use server-first with localStorage fallback.

---

## Development Workflow

### Running Locally
```bash
python server.py
# Opens at http://localhost:8000
# SF_PORT, SF_STATIC_DIR, SF_CACHE_DIR are configurable via env vars
```

### Deploying to GitHub Pages
The `auto-push.ps1` script watches for file changes and auto-commits/pushes. Run `install-auto-push.bat` once to register it as a startup task. After that, saving any `.html`, `.js`, or `.css` file auto-deploys within ~30 seconds.

Manual push:
```bash
git add index.html app.js style.css
git commit -m "your message"
git push origin main
```

### Git Setup (Windows — one-time per machine)
```bash
git config --global user.email "ofersi15@gmail.com"
git config --global user.name "Ofer"
# If you get "dubious ownership" error:
git config --global --add safe.directory C:/Users/ofer/OneDrive/Documents/SlowFootball
```

---

## Known Quirks & Past Bugs

- **`</script>` in app.js**: Was accidentally included during a file-split refactor. Always verify app.js does NOT end with `</script>`
- **Duplicate Vue CDN line**: Was accidentally added during refactor. index.html should have exactly ONE Vue CDN script tag
- **Missing `<body>` tag**: Was missing after a refactor. `<div id="app">` must be inside `<body>`
- **git "dubious ownership"**: Happens when `.git` was created by a different Windows user account. Fix with the `safe.directory` config above
- **AllOrigins proxy**: The app proxies Sleeper API calls through `allorigins.win` to avoid CORS. If stats stop loading, check if allorigins is down

---

## Key Constants (top of app.js)

```javascript
const LEAGUE_ID = '...';           // Sleeper league ID
const PLAYERS_CACHE_KEY = 'sf_players_v2';
const STATS_CACHE_KEY = 'sf_stats_v2';
// Espionage cache key defined inside loadEspionage()
```

---

## What Has Been Built (Feature List)

- **Standings tab** — league standings with win/loss, points
- **Player Stats tab** — filterable stats table with enriched data
- **Trade Analyzer tab** — compare players across rosters for trade evaluation
- **Espionage tab** — scout opponents; auto-loads on app start; cached
- **Auction Draft tool** — budget tracking for auction-style drafts
- **Negotiations tab** — (was cleaned up; check current state)
- **Clear Cache button** — clears both server cache and localStorage

---

## Hosting & Infrastructure

| Option | Status | Notes |
|--------|--------|-------|
| GitHub Pages | ✅ Live | https://ofersi15.github.io/slow-football/ |
| Local with server.py | ✅ Works | Run `python server.py` |
| HAOS Add-on (Raspberry Pi) | 🔧 Files ready | See haos-addon/ and SETUP.md |
| Google SSO via Cloudflare Access | 📋 Documented | See SETUP.md |

---

## User

- Ofer (ofersi15@gmail.com)
- Fantasy football enthusiast, non-developer, using this app for personal use
- Prefers minimal terminal interaction — automate wherever possible
