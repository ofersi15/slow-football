# CLAUDE.md — Slow Football Analytics

This file gives Claude Code full context about this project. Read it at the start of every session.

---

## What This Is

A personal fantasy football analytics web app for the **slowfootball.club** game.
Built and maintained by Ofer (ofersi15@gmail.com) — non-developer, so keep everything simple and push after every change.

---

## Live URLs

| Thing | URL |
|-------|-----|
| **App** | https://sf.ofersi15.workers.dev |
| **Cache worker** | https://sf-cache.ofersi15.workers.dev |
| **Proxy worker** | https://sf-game-proxy.ofersi15.workers.dev (not currently needed) |
| **GitHub repo** | https://github.com/ofersi15/slow-football |
| **Game API** | https://slowfootball.club/api |

---

## Full Architecture

### Frontend
- **Vue 3 + Vite build** — `npm run build` → `dist/` served by Cloudflare Pages
- DOM template in `index.html` (assembled from partials — see below), all logic split across `app.js` + `src/methods/*.js`, styles in `style.css`
- Chart.js via npm (chart.js/auto)
- **Never put `</script>` at end of app.js** — breaks the HTML parser
- **`v-if` on SVG child elements inside `<g>` crashes Vue CDN build** — avoid entirely; use `:opacity` or just omit
- **`<` operator inside SVG attribute bindings** (e.g. `:fill="x<70?..."`) also crashes — use helper methods

### Template editing workflow — IMPORTANT
`index.html` is **generated** — do not edit it directly. Edit the source partials:

| Want to change | Edit this file |
|----------------|----------------|
| Scout tab | `src/templates/tab-scout.html` |
| Squad tab | `src/templates/tab-squad.html` |
| Moneyball tab | `src/templates/tab-moneyball.html` |
| Analysis tab | `src/templates/tab-analysis.html` |
| Youth tab | `src/templates/tab-youth.html` |
| My Club tab | `src/templates/tab-club.html` |
| Clubs tab | `src/templates/tab-clubs.html` |
| Transfers tab | `src/templates/tab-espionage.html` |
| Matches tab | `src/templates/tab-matches.html` |
| Player modal | `src/templates/modal.html` |
| Scout sidebar filters | `src/templates/sidebar.html` |
| Tab bar / loading / layout | `src/index.html` (the shell) |

After editing any template file, run `npm run assemble` to regenerate `index.html`. Then commit both the partial AND `index.html`.

`npm run build` and `npm run dev` run assemble automatically (via prebuild/predev hooks).

### Hosting: Cloudflare Pages
- Auto-deploys from `main` branch of GitHub repo within ~60s
- No manual deploy needed for frontend changes — just `git push origin main`
- GitHub Actions workflow: `.github/workflows/auto-merge-claude.yml`

### Cache Worker: `sf-cache` (Cloudflare Worker + KV)
- **URL**: `https://sf-cache.ofersi15.workers.dev`
- **Code**: `cf-worker/index.js`
- **Config**: `cf-worker/wrangler.toml`
- **KV namespace**: `SF_CACHE` (bound in wrangler.toml)
- Exposes: `GET/POST/DELETE /sf-cache/<key>`
- POST with `?permanent=1` = no TTL (lives forever until replaced)
- **Deploy**: `cd cf-worker && npx wrangler deploy -c wrangler.toml`
- **Cron**: runs 4×/day (`0 0,6,12,18 * * *`) — fetches all squads + league tables, stores as `sf_squads_raw_v1` and `sf_tables_raw_v1`
- **Secrets** (set via `wrangler secret put`): `SF_USERNAME`, `SF_PASSWORD`

### Proxy Worker: `sf-game-proxy` (not currently needed)
- **Code**: `cf-worker/proxy.js`, **Config**: `cf-worker/wrangler-proxy.toml`
- Token vending machine — vends Bearer tokens using stored credentials

### Cache routing in app.js
```javascript
const SF_CACHE_BASE = location.hostname === 'sf.ofersi15.workers.dev'
  ? 'https://sf-cache.ofersi15.workers.dev/sf-cache'
  : '/sf-cache';
```
Falls back to `localStorage` then local `/sf-cache` (old server.py) on other hostnames.

---

## File Structure

```
slow-football/
├── index.html              # GENERATED — assembled from src/index.html + src/templates/
├── app.js                  # Vue app shell: data(), computed, watch, mounted (~1150 lines)
├── style.css               # Styles
├── CLAUDE.md               # This file
├── SESSION_CONTEXT.md      # Session context for Claude Chat reviews
├── wrangler.jsonc          # CF Pages config (assets.directory: "dist")
├── package.json            # npm scripts: assemble, dev, build
├── vite.config.js          # Vite lib-mode build
├── scripts/
│   └── assemble.js         # Assembles index.html from src/index.html + src/templates/
├── src/
│   ├── index.html          # HTML shell with <!-- include:X --> markers
│   ├── constants.js        # All constants (MY_CLUB, API, FORMATIONS, etc.)
│   ├── utils.js            # Pure helpers (calcGameRating, fmtVal, computeTraits, etc.)
│   ├── cache.js            # Cache helpers (serverCacheGet/Set, parseAsync, authHeaders)
│   ├── templates/          # One file per tab/section — EDIT THESE for template changes
│   │   ├── sidebar.html    # Scout sidebar filters
│   │   ├── tab-scout.html
│   │   ├── tab-squad.html
│   │   ├── tab-moneyball.html
│   │   ├── tab-analysis.html
│   │   ├── tab-youth.html
│   │   ├── tab-club.html
│   │   ├── tab-clubs.html
│   │   ├── tab-espionage.html
│   │   ├── tab-matches.html
│   │   └── modal.html      # Player profile modal
│   └── methods/            # Vue methods split by topic — EDIT THESE for logic changes
│       ├── data.js         # loadData, fetchFreshData, enrichStats, openModal, charts
│       ├── youth.js        # loadYouth, loadYouthHistory, bgAutoRefresh
│       ├── matches.js      # buildMatchArchive, appendLatestGw, loadMatchArchive
│       ├── espionage.js    # loadEspionage, negotiations, auctions
│       ├── clubs.js        # pitchLayout, match helpers, submissions fetch
│       └── helpers.js      # Sort helpers, staff recruitment
├── .github/workflows/
│   ├── auto-merge-claude.yml
│   └── deploy-cf-worker.yml
└── cf-worker/
    ├── index.js            # Cache worker (sf-cache)
    ├── proxy.js            # Token proxy (not needed)
    ├── wrangler.toml       # Cache worker config
    └── wrangler-proxy.toml # Proxy worker config
```

---

## Game API

- **Base**: `https://slowfootball.club/api`
- **Auth**: `Authorization: Bearer <token>`, `X-Club: Leverkusen`, `X-Role: manager`
- **My club**: `MY_CLUB = 'Leverkusen'`
- Token from `POST /api/auth/login`

Key endpoints:
| Endpoint | Returns |
|----------|---------|
| `GET /api/squads` | All clubs' squads (dict by club name) |
| `GET /api/squads?club=X` | Single club `{club, players}` |
| `GET /api/submissions?club=X&limit=50` | Club's GW submissions |
| `GET /api/scouting/jobs?club=X` | Active scouting jobs |
| `GET /api/scouting/jobs?club=X&status=accepted\|rejected` | History |
| `GET /api/transfers/done` | Transfer history `{deals}` |
| `GET /api/agents/international-players` | International scouting pool |
| `GET /api/tables/from-fixtures` | League tables |
| `GET /api/managers` | All managers |
| `GET /api/admin/squads/public/clubs` | All club names |
| `GET /api/facilities?club=X` | Club facilities |
| `GET /api/staff/effects?club=X` | Staff effects |
| `GET /api/academy?club=X` | Academy players |

---

## Key Constants (top of app.js)

```javascript
const MY_CLUB = 'Leverkusen';
const PLAYERS_CACHE_KEY = 'sf_players_v6';
const STATS_CACHE_KEY = 'sf_stats_v1';
const FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina',
                        'Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];
```

---

## Tabs

| Tab | Label | Description |
|-----|-------|-------------|
| scout | 🔍 Scout | Filterable player table with sidebar (search, position, ratings, age, flags, attrs, weighted rating) |
| squad | 🛡 My Squad | Leverkusen squad management + Best XI builder |
| moneyball | 📊 Moneyball | Value analysis, gems, overperformers, top lists |
| analysis | 🔬 Analysis | Tactical matchup stats across all historical GWs |
| youth | 🌱 Youth | Scouting jobs, academy, facilities, staff, history scan |
| club | 🏟 My Club | My club's facilities, staff, training |
| clubs | 🏟 Clubs | All clubs — Latest XI (pitch viz), Academy, History, Transfers sub-tabs |
| espionage | 💰 Transfers | Opponent scouting, negotiations, submissions |
| matches | 📺 Matches | Match archive with detail view, filters, rebuild/append tools |

---

## Clubs Tab — Latest XI Detail

### What it shows (per submission)
- **Pitch visualization**: SVG pitch with player nodes, run arrows, hover tooltips
- **Subs panel**: sub name + fitness %, swap target, plan, time condition
- **Roles panel**: captain/penalty/freekick/corner with key attributes inline
- **Set Pieces panel**: attacking + defensive corner config, zone assignments with player attrs
- **Full Squad table**: all club players sortable by pos/rating/value/age
- **`{ } Raw` button**: toggles full JSON of the submission at the bottom (for debugging incomplete data)

### Formations supported (FORMATIONS + FORMATION_SLOT_POS)
`442, 4411, 4231, 433, 4321, 3421, 352, 343`
- **4321 added 2026-04-29** (Christmas tree: 4 def, 3 CM, 2 AM, 1 CF)

### Run arrow coordinate system (hard-won — do not change)
```javascript
runX = (run.x / 90) * 68
// slot1 (right-side): runY = (run.y - 27.5) / 95 * 105
// slot2 (left-side):  runY = 105 - (run.y / 100) * 105
```

### Key methods
- `pitchLayout(submission)` — maps xi players to SVG coordinates + run targets
- `xiPlayerInfo(name)` — looks up player by name in allPlayers (guards `typeof name !== 'string'`)
- `playerFitPct(name)` — returns fitnessPct or Fitness field, null if missing
- `fitColor(pct)` — color for fitness % (green ≥85, orange ≥70, red below)
- `roleAttrs(role)` — key attrs per role (captain→Mentality/Leadership, penalty→Shooting/Mentality, etc.)
- `spZoneAttrs(side, zoneKey)` — attrs for set piece zone players
- `openClubDetail(clubName)` — always force-refetches submissions (clears cache entry first)
- `_normalizeSubs(submission)` — fixes stale/malformed sub entries from API or localStorage cache

---

## Caching Architecture

### Philosophy: Stale-While-Revalidate
- Cache exists → show immediately, refresh in background if stale
- Block UI only when no cache at all
- All KV writes permanent (no expiry) — replaced not deleted

### Cache keys
| Key | Content | Strategy |
|-----|---------|----------|
| `sf_players_v6` | Processed players + meta | 6h stale bg-refresh |
| `sf_stats_v1` | Player stats (attrs, career) | show always, bg-refresh if >24h |
| `sf_squads_raw_v1` | Raw bulk squads (cron) | permanent, cron replaces |
| `sf_tables_raw_v1` | League tables (cron) | permanent, cron replaces |
| `sf_espionage_v3` | Espionage clubs + negos | show always, bg-refresh if >30min |
| `sf_negos_history_v1` | All-time nego history | permanent, merges forever (never delete) |
| `sf_youth_idx_v2` | Youth data | localStorage only |
| `sf_club_v1` | My Club data | localStorage only, bg-refresh >30min |
| `sf_match_archive_v3` | Match archive index | permanent |
| `sf_match_archive_v3_gw_{N}` | Per-GW match data | permanent |
| `SUBMISSIONS_CACHE_KEY` | Submissions by club | no TTL — always use cached |
| `sf_vacancies_v1` | Vacant clubs list | cron-populated |

---

## Match Archive

- **Rebuild** 🔄: full rebuild, reuses cached GW chunks
- **Append GW** ➕: incremental — only new fixtures, only involved clubs' submissions
- `extractTactics(narrativeArr, club)` — parses narrative tactics (NOT `parseInstructions`)
- `extractFormation(narrativeArr, club)` — extracts formation string from narrative
- `deriveFormation(ratingsArr)` — derives formation from player position counts (fallback)

---

## Analysis Tab

6 tactical matchup cards with dual dropdowns + drill-down table:
1. Formation Matchups
2. Mentality Matchups
3. Pressing Matchups
4. Passing Style vs Pressing
5. Defensive Line Matchups
6. Transition Speed vs Defensive Line

---

## Player Data

### Flags (added game update 2026-03-23)
- `retiring` → 🚨 red badge, "hide retiring" filter (default ON)
- `homegrown` → 🏠 green badge
- `slowIcon`/`isSlowIcon`/`icon` → ⭐ gold badge
- `inAcademy` → 🎓 blue badge

### Incomplete stats
- 32 players have `_incompleteStats` — only 4 position-key attrs, no full data
- Shown with orange "partial" badge in scout table
- Null-ID real-world players (Musiala, Rashford etc.) + custom-ID transfers

---

## Submissions / Subs Normalization

The submissions API sometimes returns malformed `subs` entries:
- Some entries are JSON strings instead of objects
- Some have `name` field containing a stringified JSON object
- Stale localStorage cache may have these

`_normalizeSubs(s)` handles all of this and is called:
1. In `_fetchClubSubmissions` (fresh API fetch)
2. In `loadCachedSubmissions` (localStorage load on startup)

---

## Agent / Tamagotchi Feature

- `GET /api/agents/status?club=Leverkusen` — streak, fedToday, activeOffer, giftsCount
- `GET /api/agents/gifts?club=Leverkusen` — pending gifts
- `POST /api/agents/feed?club=Leverkusen` — feeds (once/day). **DO NOT call without explicit user intent.**
- `POST /api/agents/claim?club=Leverkusen` `{id}` — claims gift. **Irreversible.**
- **Incident 2026-03-23**: accidental feed + claim → Wataru Endo (DM 75.5) added to Leverkusen squad

---

## Known Bugs / Quirks

- `v-if` on SVG `<text>` inside `<g>` in Vue 3 CDN runtime crashes entire app — do not use
- `<` operator inside SVG `:bind` attributes crashes Vue CDN parser — use helper methods (fitColor, etc.)
- `xiPlayerInfo(name)` must guard `typeof name !== 'string'` — stale cache can have object values as name
- `mounted()` restores last club: `setTimeout(() => this.openClubDetail(lastClub), 800)`
- 1 unclosed `<div>` exists in index.html (pre-existing, browsers handle it fine)

---

## Deployment Checklist

**Template changes** (HTML/UI):
1. Edit the relevant `src/templates/*.html` file (see table in Frontend section above)
2. `npm run assemble` — regenerates `index.html` from partials
3. `git add src/templates/<file>.html index.html && git commit -m "..." && git push origin main`

**Logic changes** (JS):
1. Edit `src/methods/<file>.js` or `app.js` or `src/constants.js` / `src/utils.js` / `src/cache.js`
2. `npm run build` — runs assemble + Vite build automatically
3. `git add <files> && git commit -m "..." && git push origin main`

**Style changes**: edit `style.css`, commit + push.

CF Pages auto-deploys in ~60s after push. If cache worker changed: `cd cf-worker && npx wrangler deploy -c wrangler.toml`

---

## User

- Ofer (ofersi15@gmail.com)
- Fantasy football enthusiast, non-developer, using this app for personal use
- Prefers minimal terminal interaction — always commit and push after every change
