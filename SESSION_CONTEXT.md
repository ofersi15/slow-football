# Session Context — Slow Football Analytics

> Use this file at the start of a new Claude Code session to get up to speed instantly.
> **Keep this file updated after every session.**

---

## Project Summary

Single-page Vue 3 app (CDN, no build) for fantasy football analytics at **https://sf.ofersi15.workers.dev**
Repo: **https://github.com/ofersi15/slow-football**
Auto-deploys from `main` branch via Cloudflare Pages (~60s).
Always commit + push after every change.
CF cache worker (`sf-cache`) must be separately deployed: `cd cf-worker && npx wrangler deploy -c wrangler.toml`

Files: `index.html` (template), `app.js` (all logic), `style.css`, `cf-worker/index.js` (KV cache worker)

---

## Tabs Built

- **Scout** — filterable player table with sidebar filters (search, position, ratings, age, flags)
- **My Squad** — Leverkusen squad management
- **Moneyball** — value analysis
- **Analysis** — tactical matchup stats across all historical GWs
- **Youth** — scouting jobs, academy, history scan
- **My Club** — facilities, staff, training
- **Clubs** — all clubs, includes "Latest XI" sub-tab with interactive pitch visualization
- **Espionage** (labelled "Transfers") — opponent scouting, negotiations, submissions
- **Matches** — match archive with detail view, filters, rebuild/append tools

---

## Scout Tab Layout

Sidebar filters sit UNDER the tab bar (inside `.main`, wrapped in a flex row with `.content`). Tabs span full width.

```
.layout (flex-col, full height)
  .main (flex-col, flex:1)
    .header (tabs row — full width)
    div (display:flex, flex:1, overflow:hidden)
      .sidebar (v-show="activeTab==='scout'", 245px)
      .content (flex:1)
```

**Sidebar filters**: search, position toggle, min rating per position, max age, checkboxes (hide own/vacant/managed/for-sale/transfer-listed/injured/retiring), attr filters, weighted rating config.

---

## Caching Architecture

### Philosophy: Stale-While-Revalidate everywhere
- If cache exists → show immediately, refresh in background if stale
- Only block UI when absolutely no cache exists
- All KV writes are **permanent** (no expiry) — data lives forever until replaced

### `serverCacheSet(key, str)` always appends `?permanent=1`

### CF Cron (sf-cache worker, `cf-worker/wrangler.toml`)
- Runs 4x/day: `0 0,6,12,18 * * *` (midnight, 6am, 12pm, 6pm UTC)
- Fetches all squads + league tables from game API
- Stores as `sf_squads_raw_v1` and `sf_tables_raw_v1` in KV (permanent)
- Requires secrets: `SF_USERNAME`, `SF_PASSWORD` (set via `wrangler secret put`)
- App reads `sf_squads_raw_v1` first in `fetchFreshData()` — skips per-club API calls if <8h old

### Cache keys
| Key | Content | TTL/Strategy |
|-----|---------|------|
| `sf_players_v6` | Processed players + meta | 6h — bg refresh if stale |
| `sf_stats_v1` | Player stats | show cached always, bg refresh if >24h |
| `sf_squads_raw_v1` | Raw bulk squads (cron-populated) | permanent, replaced each cron |
| `sf_tables_raw_v1` | League tables (cron-populated) | permanent |
| `sf_espionage_v3` | Espionage clubs + negos | show cached always, bg refresh if >30min |
| `sf_negos_history_v1` | **Accumulated all-time nego history** | permanent, merges forever |
| `sf_youth_idx_v2` | Youth data (localStorage only) | show cached always, bg refresh if stale |
| `sf_club_v1` | My Club data (localStorage only) | show cached always, bg refresh if >30min |
| `sf_match_archive_v3` | Match archive index | permanent |
| `sf_match_archive_v3_gw_{N}` | Per-GW match chunks | permanent |
| `SUBMISSIONS_CACHE_KEY` | Submissions by club | no TTL — always use cached |

### Negotiations / Transfer history
- **Never delete old records** — accumulated in `sf_negos_history_v1` forever
- On each espionage refresh: fetch fresh negos, merge with `sf_negos_history_v1` by ID (fresh data wins for same ID)
- 14-day filter removed — all historical deals preserved

---

## Player Flags (game update 2026-03-23)
New fields from game API — badges shown automatically when present:
- `retiring` → 🚨 retiring badge (red), "hide retiring" filter in sidebar (default ON)
- `homegrown` → 🏠 HG badge (green)
- `slowIcon` / `isSlowIcon` / `icon` → ⭐ icon badge (gold)
- `inAcademy` → 🎓 acad badge (blue)

Badges shown in: scout table (player name cell) + player detail panel header.

---

## Analysis Tab

6 matchup cards, each with dual dropdowns + drill-down table:
1. Formation Matchups
2. Mentality Matchups
3. Pressing Matchups
4. Passing Style vs Pressing
5. Defensive Line Matchups
6. Transition Speed vs Defensive Line

Data loaded from GW chunks in match archive. Invalidates and reloads after Append GW.

---

## Match Archive

- **Cache key**: `sf_match_archive_v3` (compact index), `sf_match_archive_v3_gw_{N}` (one chunk per GW)
- **🔄 Rebuild** button: full rebuild (reuses cached chunks for speed)
- **➕ Append GW** button: lightweight incremental update — only fetches new fixtures, only fetches submissions for involved clubs, patches index in place. Use after each new gameweek.
- `extractTactics(narrativeArr, club)` — correct method for parsing narrative tactics (NOT `parseInstructions`)

---

## Clubs Tab / Latest XI

### Run Arrow Coordinate System (HARD-WON — do not change without reason)

```javascript
runX = (run.x / 90) * 68
// slot1 (right-side): runY = (run.y - 27.5) / 95 * 105
// slot2 (left-side):  runY = 105 - (run.y / 100) * 105
```

`'442': [GK(34,97), RFB(60,78), RCB(45,78), LCB(23,78), LFB(8,78), RWM(59,55), RCM(44,55), LCM(24,55), LWM(9,55), RCF(44,20), LCF(24,20)]`

---

## Agent / Tamagotchi Feature

- `GET /api/agents/status?club=Leverkusen` — streak, fedToday, activeOffer, giftsCount
- `GET /api/agents/gifts?club=Leverkusen` — pending gifts
- `POST /api/agents/feed?club=Leverkusen` — feeds (one per day). **DO NOT call without user intent.**
- `POST /api/agents/claim?club=Leverkusen` body `{id: giftId}` — claims gift. **Irreversible.**
- Feed 7 days → gift player on day 7 (random). No reroll possible.
- **Incident (2026-03-23)**: accidental feed + claim → Wataru Endo (DM 75.5) added to Leverkusen

---

## Key Architecture Notes

- **No build step** — Vue 3 runtime-only via CDN. Template in `index.html`, logic in `app.js`.
- **Never put `</script>` at end of app.js** — breaks HTML parser.
- **Cache base**: `sf-cache.ofersi15.workers.dev` on prod, `/sf-cache` locally
- **My club**: `MY_CLUB = 'Leverkusen'`
- **Auth**: `Authorization: Bearer <token>`, `X-Club: Leverkusen`, `X-Role: manager`

---

## Known Quirks

- 32 players have `_incompleteStats` (only 4 position-key attrs) — shown with orange "partial" badge
- `mounted()` restores last club with `setTimeout(() => this.openClubDetail(lastClub), 800)`

---

## User

- Ofer (ofersi15@gmail.com) — fantasy football enthusiast, non-developer
- Always commit + push after every change
- Prefers minimal terminal interaction
