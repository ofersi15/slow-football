# CLAUDE.md — Slow Football Analytics

Personal fantasy football analytics app for slowfootball.club. Owner: Ofer (ofersi15@gmail.com), non-developer — keep everything simple, commit and push after every change.

---

## Live URLs

| | URL |
|-|-----|
| **App** | https://sf.ofersi15.workers.dev |
| **Cache worker** | https://sf-cache.ofersi15.workers.dev |
| **GitHub repo** | https://github.com/ofersi15/slow-football |
| **Game API** | https://slowfootball.club/api |

---

## Build & Deploy

- **Any frontend change**: `git push origin main` → CF Pages auto-deploys in ~60s
- **Build command**: `npm run build` (runs assemble + Vite — do this before checking dist/)
- CF Pages serves from `dist/` (wrangler.jsonc)
- **Cache worker**: deployed separately via `cd cf-worker && npx wrangler deploy -c wrangler.toml`

---

## Template Editing — CRITICAL

`index.html` is **generated**. Never edit it directly. Always:
1. Edit the relevant `src/templates/<name>.html`
2. `npm run assemble` → regenerates `index.html`
3. Commit both the partial AND `index.html`

| UI area | File |
|---------|------|
| Scout | `src/templates/tab-scout.html` |
| Squad | `src/templates/tab-squad.html` |
| Moneyball | `src/templates/tab-moneyball.html` |
| Analysis | `src/templates/tab-analysis.html` |
| Youth | `src/templates/tab-youth.html` |
| My Club | `src/templates/tab-club.html` |
| Clubs | `src/templates/tab-clubs.html` |
| Transfers | `src/templates/tab-espionage.html` |
| Matches | `src/templates/tab-matches.html` |
| Player modal | `src/templates/modal.html` |
| Scout sidebar | `src/templates/sidebar.html` |
| Tab bar / shell | `src/index.html` |

`npm run build` and `npm run dev` run assemble automatically.

---

## Key File Map

| Need to change | File |
|----------------|------|
| Data loading, modal, charts | `src/methods/data.js` |
| Youth tab logic | `src/methods/youth.js` |
| Match archive | `src/methods/matches.js` |
| Espionage / negotiations | `src/methods/espionage.js` |
| Clubs tab / pitch / submissions | `src/methods/clubs.js` |
| Sort helpers, staff | `src/methods/helpers.js` |
| Constants, cache keys | `src/constants.js` |
| Utility functions | `src/utils.js` |
| Cache helpers | `src/cache.js` |
| data(), computed, watch, mounted | `app.js` |

**Computed files**: `src/computed/` — matches.js, squad.js, espionage.js, modal.js, scout.js, youth.js, clubs.js

---

## Architecture

**Stack**: Vue 3 (DOM template) + Vite build → Cloudflare Pages (`dist/`)

Logic files spread via `...xMethods`, computeds via `...xComputed` in `app.js`.

---

## Game API

- **Base**: `https://slowfootball.club/api`
- **Auth**: `Authorization: Bearer <token>`, `X-Club: Arsenal`, `X-Role: manager`
- **My club**: `MY_CLUB = 'Arsenal'`

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
| scout | Scout | Filterable player table + sidebar |
| squad | My Squad | Squad management + Best XI builder |
| moneyball | Moneyball | Value analysis, gems, overperformers |
| analysis | Analysis | Tactical matchup stats (6 cards) |
| youth | Youth | Scouting jobs, academy, facilities, staff |
| club | My Club | Facilities, staff, training |
| clubs | Clubs | All clubs — Latest XI pitch viz, Academy, History, Transfers |
| espionage | Transfers | Opponent scouting, negotiations, auctions |
| matches | Matches | Match archive, filters, rebuild/append |

---

## Clubs Tab — Pitch Viz

- SVG pitch with player nodes, run arrows, hover tooltips
- `pitchLayout(submission)` — in `src/methods/clubs.js`
- Run arrow coords (do not change): `runX = (run.x/90)*68` | slot1: `runY = (run.y-27.5)/95*105` | slot2: `runY = 105-(run.y/100)*105`
- Formations: `442, 4411, 4231, 433, 4321, 3421, 352, 343`
- Clicking the Clubs tab always resets to club list (clears `selectedClubName`)

---

## Caching

| Key | Content | TTL | Written by |
|-----|---------|-----|-----------|
| `sf_players_v6` | All players | 6h stale | Browser |
| `sf_stats_v1` | Player stats | 7 days stale | Browser |
| `sf_espionage_v3` | Staff + facilities (all clubs) + negos snapshot | 6h stale | CF cron 4×/day + browser |
| `sf_youth_idx_v2` | Scouts, academy, facilities, staff (Arsenal) | 10min live / 1h static | CF cron 4×/day + browser |
| `sf_tactics_v4` | Formation/style analysis | 7 days stale | Browser only |
| `sf_negos_history_v1` | All-time nego history | permanent, never delete | CF cron every 5–15min |
| `sf_auctions_v1` | Auction items | — | CF cron 4×/day |
| `sf_arsenal_fin_v1` | Arsenal budget | — | CF cron 4×/day |
| `sf_vacancies_v1` | Vacant clubs | — | CF cron 4×/day |
| `sf_match_archive_v3` | Archive index | permanent | Browser (manual) |
| `sf_match_archive_v3_gw_{N}` | Per-GW data | permanent | Browser (manual) |
| `sf_submissions_all_v1` | Submissions by club | 2h stale | Browser |

---

## Player Data

- `retiring` → retiring, `homegrown` → homegrown, `slowIcon` → icon, `inAcademy` → academy
- 32 players have `_incompleteStats` (partial badge) — null-ID or custom-transfer players
- `FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision']`
- Derived scoring fields (computed in `src/methods/data.js`, 3 spots — cache load, stats enrich, fresh fetch): `_gc` (Goals+Assists), `_gc90`, `_gDiff`/`_aDiff` (Goals-xG / Assists-xA), `_gDiff90`/`_aDiff90` — rendered via `fmtDiff()` in `src/utils.js`

---

## Manager Names

- `managerMap` (club → real manager name) is built in `fetchFreshData()` (`src/methods/data.js`) from `/api/managers`, which returns both `username` (login handle, e.g. `scotty.d`) and `name` (real name, e.g. `Scott Dalziel`) — always prefer `name`, fall back to `username` only if blank
- Not persisted to localStorage — rebuilt live on every load, so it always reflects the *current* manager per club
- Match archive used to bake per-match manager names into the permanent cache via a regex narrative parser (`extractManager`) — removed; manager display everywhere now looks up `managerMap[club]` live instead

---

## Game Rules

- **Veteran degradation**: outfield 33+, GK 36+ — weekly stat decrements; Veterans/Icons don't train
- **Fitness model**: weekly decay from minutes played; rest plan restores; Veterans/Icons exempt
- **Position flexibility**: FBs can play wing, CBs can play up top
- **Academy eligible**: >10 weeks from 21st birthday

---

## Competitions

- **Super Duper Cup (SDC)**: cross-league knockout, 12 groups (A–L), 4 teams, Saudi Arabia venue
- Arsenal in Group E (Milan, Leeds, Bournemouth) — update if group assignment changes
- SDC fixtures appear in match archive — filter accounts for this competition type

---

## Vue Quirks — Will Break the App

- `v-if` on SVG `<g>` children crashes Vue — use `:opacity` instead
- `<` operator in SVG `:bind` attributes crashes — use a helper method
- Never put `</script>` at end of `app.js`

---

## ⚠ Agent API — Never Call Without Explicit User Instruction

- `POST /api/agents/feed` and `POST /api/agents/claim` are irreversible
- Incident 2026-03-23: accidental call added an unwanted player to the squad

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

---

## MD File Rule

After any meaningful change, update CLAUDE.md in the same or a follow-up commit.
