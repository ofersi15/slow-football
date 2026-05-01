# Session Context — Slow Football Analytics

> Read at the start of every session via `/start`. Keep this file updated after every session.

---

## What This Is

Personal fantasy football analytics app for **slowfootball.club**. Owner: Ofer (ofersi15@gmail.com), non-developer.

---

## Live URLs

| | URL |
|-|-----|
| **App** | https://sf.ofersi15.workers.dev |
| **Cache worker** | https://sf-cache.ofersi15.workers.dev |
| **GitHub repo** | https://github.com/ofersi15/slow-football |
| **Game API** | https://slowfootball.club/api |

---

## Architecture

**Stack**: Vue 3 (DOM template) + Vite build → Cloudflare Pages (`dist/`)

**Logic files** — all spread into the same Vue instance via `...xMethods`:

| File | Contents |
|------|----------|
| `app.js` | data(), computed (~800 lines), watch, mounted — ~1150 lines total |
| `src/methods/data.js` | loadData, fetchFreshData, enrichStats, openModal, charts |
| `src/methods/youth.js` | loadYouth, loadYouthHistory, bgAutoRefresh |
| `src/methods/matches.js` | buildMatchArchive, appendLatestGw, loadMatchArchive |
| `src/methods/espionage.js` | loadEspionage, negotiations, auctions |
| `src/methods/clubs.js` | pitchLayout, match helpers, submissions fetch |
| `src/methods/helpers.js` | sort helpers, staff recruitment |
| `src/constants.js` | MY_CLUB, API, FORMATIONS, all cache keys, etc. |
| `src/utils.js` | calcGameRating, fmtVal, computeTraits, computeBonds, etc. |
| `src/cache.js` | serverCacheGet/Set, parseAsync, authHeaders |

**Template files** — `index.html` is generated; edit partials in `src/templates/`:

| File | Lines |
|------|-------|
| `src/index.html` | Shell with `<!-- include:X -->` markers (57 lines) |
| `src/templates/sidebar.html` | Scout sidebar filters (180) |
| `src/templates/tab-scout.html` | (92) |
| `src/templates/tab-squad.html` | (238) |
| `src/templates/tab-moneyball.html` | (205) |
| `src/templates/tab-analysis.html` | (413) |
| `src/templates/tab-youth.html` | (352) |
| `src/templates/tab-club.html` | (348) |
| `src/templates/tab-clubs.html` | (669) |
| `src/templates/tab-espionage.html` | (300) |
| `src/templates/tab-matches.html` | (338) |
| `src/templates/modal.html` | Player modal (374) |

**Cache worker**: `cf-worker/index.js` — deployed separately via `cd cf-worker && npx wrangler deploy -c wrangler.toml`

---

## Deployment

**Template change**: edit `src/templates/<tab>.html` → `npm run assemble` → commit partial + `index.html` → push

**Logic change**: edit `src/methods/<file>.js` or `app.js` → `npm run build` → commit → push

**Style change**: edit `style.css` → commit → push

CF Pages auto-deploys in ~60s on push to main.

---

## Game API

- **Base**: `https://slowfootball.club/api`
- **Auth**: `Authorization: Bearer <token>`, `X-Club: Leverkusen`, `X-Role: manager`
- **My club**: `MY_CLUB = 'Leverkusen'`

Key endpoints:
| Endpoint | Returns |
|----------|---------|
| `GET /api/squads` | All clubs' squads |
| `GET /api/squads?club=X` | Single club squad |
| `GET /api/submissions?club=X&limit=50` | Club GW submissions |
| `GET /api/scouting/jobs?club=X` | Active scouting jobs |
| `GET /api/transfers/done` | Transfer history |
| `GET /api/agents/international-players` | International scouting pool |
| `GET /api/tables/from-fixtures` | League tables |
| `GET /api/managers` | All managers |
| `GET /api/facilities?club=X` | Club facilities |
| `GET /api/staff/effects?club=X` | Staff effects |
| `GET /api/academy?club=X` | Academy players |

---

## Tabs

| Tab | Label | Description |
|-----|-------|-------------|
| scout | 🔍 Scout | Filterable player table + sidebar |
| squad | 🛡 My Squad | Squad management + Best XI builder |
| moneyball | 📊 Moneyball | Value analysis, gems, overperformers |
| analysis | 🔬 Analysis | Tactical matchup stats (6 cards) |
| youth | 🌱 Youth | Scouting jobs, academy, facilities, staff |
| club | 🏟 My Club | Facilities, staff, training |
| clubs | 🏟 Clubs | All clubs — Latest XI pitch viz, Academy, History, Transfers |
| espionage | 💰 Transfers | Opponent scouting, negotiations, auctions |
| matches | 📺 Matches | Match archive, filters, rebuild/append |

---

## Clubs Tab — Pitch Viz Details

- SVG pitch with player nodes, run arrows, hover tooltips
- `pitchLayout(submission)` — in `src/methods/clubs.js`
- Run arrow coords (do not change): `runX = (run.x/90)*68` | slot1: `runY = (run.y-27.5)/95*105` | slot2: `runY = 105-(run.y/100)*105`
- Formations: `442, 4411, 4231, 433, 4321, 3421, 352, 343`
- Clicking the Clubs tab always resets to club list (clears `selectedClubName`)

---

## Caching

| Key | Content | TTL |
|-----|---------|-----|
| `sf_players_v6` | All players | 6h stale |
| `sf_stats_v1` | Player stats | 24h stale |
| `sf_espionage_v3` | Espionage data | 30min stale |
| `sf_negos_history_v1` | All-time nego history | permanent, never delete |
| `sf_match_archive_v3` | Archive index | permanent |
| `sf_match_archive_v3_gw_{N}` | Per-GW data | permanent |
| `SUBMISSIONS_CACHE_KEY` | Submissions by club | no TTL |

---

## Player Data

- `retiring` → 🚨, `homegrown` → 🏠, `slowIcon` → ⭐, `inAcademy` → 🎓
- 32 players have `_incompleteStats` (partial badge) — null-ID or custom-transfer players
- `FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision']`

---

## Game Rules

- **Veteran degradation**: outfield 33+, GK 36+ — weekly stat decrements; Veterans/Icons don't train
- **Fitness model**: weekly decay from minutes played; rest plan restores; Veterans/Icons exempt
- **Position flexibility**: FBs can play wing, CBs can play up top
- **Academy eligible**: >10 weeks from 21st birthday

---

## Competitions

- **Super Duper Cup (SDC)**: cross-league knockout, 12 groups (A–L), 4 teams, Saudi Arabia venue
- Leverkusen in Group E (Milan, Leeds, Bournemouth)
- SDC fixtures appear in match archive — filter accounts for this competition type

---

## Known Quirks

- 1 unclosed `<div>` in index.html — pre-existing, browsers handle it, do not touch
- `xiPlayerInfo(name)` guards `typeof name !== 'string'` — stale cache can store objects as names
- `_normalizeSubs(s)` — called on both fresh fetch and localStorage load; fixes malformed subs entries
- Subs normalization handles JSON strings, stringified objects in the `name` field

---

## Game Updates Log

| Date | Change |
|------|--------|
| 2026-04-29 | Formation 4321 (Christmas tree) added |
| 2026-04-27 | Traits + chemistry live; position flexibility (FB→wing, CB→up top); veteran degradation GK threshold 36 |
| 2026-04-19 | Fitness model overhauled (GW29) |
| 2026-03-23 | Player flags added (retiring, homegrown, slowIcon, inAcademy) |
| 2026-03-15 | Formation gating by Analytics Dept facility level |
| 2026-02-22 | Super Duper Cup launched |
