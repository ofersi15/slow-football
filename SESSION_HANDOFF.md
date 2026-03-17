# Session Handoff — slow-football (March 17 2026)

## What This Project Is

Personal football manager analytics web app (Vue 3 CDN, no build step).
- **Live site:** https://ofersi15.github.io/slow-football/
- **Repo:** https://github.com/ofersi15/slow-football
- **Game:** slowfootball.club (a browser football manager game)
- **App purpose:** Manage your club — scouting, staff, youth academy, transfers, espionage

---

## What Was Built This Session

This session was entirely about adding game management features on top of the
existing Sleeper fantasy football app. A new "Club" tab was added for managing
your slowfootball.club club from inside the app.

### Features built and merged to main:
1. **Club tab** — scouting jobs, youth academy, staff management, facilities
2. **Scouting** — view/reject scout reports by club, auto-refresh, cached
3. **Youth academy** — view youth history with full job status enrichment
4. **Staff management** — generate applicants, post ads, view effects
5. **Espionage tab improvements** — sort, tab persistence, mobile fixes
6. **Week detection** — auto-detects current game week on startup
7. **Cache improvements** — Cloudflare KV worker (`sf.ofersi15.workers.dev`)

### Cloudflare Workers setup:
- **sf-cache worker** (`sf.ofersi15.workers.dev`) — KV cache for the app. Already live.
- **sf-game-proxy worker** (`sf-game-proxy.ofersi15.workers.dev`) — Authenticated proxy for slowfootball.club API. **Status: Code exists in repo (`cf-worker/`), deployed, but NOT yet wired into app.js**

---

## The Core Remaining Problem

### Authentication Issue
The slowfootball.club game API requires a JWT Bearer token for write operations
(generate applicants, post ads, reject scouts). Currently the app reads the
token from `localStorage.getItem('token')` — meaning you have to manually paste
your JWT into browser localStorage.

### What was done to fix it (this session):
A Cloudflare Worker (`sf-game-proxy`) was built that:
1. Reads `SF_USERNAME` and `SF_PASSWORD` from Cloudflare secrets
2. Auto-logins to `slowfootball.club/api/auth/login` on first use
3. Caches the resulting JWT in Cloudflare KV for 23 hours
4. Auto-refreshes on 401/403
5. Proxies any API call to slowfootball.club, injecting the token automatically

**The worker code lives at:** `cf-worker/index.js` in the repo (it was previously
named `cf-game-proxy/` in commits but the folder is `cf-worker/`).

### What still needs to happen:
The worker handles auth automatically, so **app.js no longer needs to read a
token from localStorage**. But app.js still does:
```javascript
const API = 'https://slowfootball.club/api';  // line 43
// ...
const token = localStorage.getItem('token') || '';  // lines 1860, 1908, 1936
```

**The fix needed:**
1. Change `const API` to point to the proxy: `https://sf-game-proxy.ofersi15.workers.dev/api`
2. Remove all `localStorage.getItem('token')` reads and the Bearer token injection
   from `generateApplicants()`, `postStaffAd()`, and `rejectScout()` (or wherever
   those 3 occurrences are)
3. The proxy handles auth — the app just calls the proxy URL, no token needed

### Why this wasn't done in the sandbox session:
The Claude Code web sandbox blocks outbound network requests to `*.workers.dev`
and `slowfootball.club`. So we couldn't test the proxy from inside the sandbox.
**On your local machine, there are no such restrictions.**

---

## Current State of cf-worker/index.js

Two workers exist. The `cf-worker/` folder contains the **cache worker**, not
the game proxy. Check git log for the game proxy code:

```
git show a62b0f1 -- cf-game-proxy/index.js
```

That commit has the full auto-auth proxy code. It was committed but the folder
name may have been cleaned up. Check what's actually deployed in Cloudflare.

---

## Things to Verify Locally

1. Is `sf-game-proxy.ofersi15.workers.dev` actually live and working?
   ```
   curl https://sf-game-proxy.ofersi15.workers.dev/api/game
   ```
   Should return game data (not a 403/401).

2. Does the proxy have `SF_USERNAME`, `SF_PASSWORD` secrets set in Cloudflare?
   (Dashboard → Workers → sf-game-proxy → Settings → Variables → Secrets)

3. Does it have the KV namespace `SF_KV` bound?

---

## Files That Matter

| File | Purpose |
|------|---------|
| `app.js` | All Vue logic — ~1845 lines |
| `index.html` | All Vue template — ~1800 lines |
| `style.css` | Minimal styles |
| `cf-worker/index.js` | Cache worker (already deployed) |

---

## Key Constants in app.js

```javascript
const API = 'https://slowfootball.club/api';   // line 43 — change to proxy URL
const SF_CACHE_BASE = ...                        // line 60 — cache worker, leave alone
```

---

## Git Setup

- Main branch: `main`
- Auto-merge action: `.github/` — Claude branches auto-merge to main on push
- To deploy: just push to main (GitHub Pages auto-deploys)
