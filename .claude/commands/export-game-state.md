---
description: Regenerate a timestamped game-state export from the live sf-cache KV store
---

Regenerate a game-state export in `./exports/` from the live `sf-cache`
Cloudflare KV store. The KV namespace is bound in `cf-worker/wrangler.toml`
(`SF_CACHE`) — use
`npx wrangler kv key get <key> --remote --namespace-id=<id> --config cf-worker/wrangler.toml`
to pull each key (⚠️ without `--remote`, wrangler reads an empty local
simulated store and silently returns "Value not found" — always pass it).

**File name**: `SLOW-Game-State-{date}-{time}.json`, e.g.
`SLOW-Game-State-2026-07-23-1545.json` — date as `YYYY-MM-DD`, time as 24h
`HHMM` (no colon, local time — `date +"%Y-%m-%d-%H%M"`). Each run writes a
new file; previous exports are left in place, not overwritten or deleted.

⚠️ Pull the 7 KV keys below (`sf_players_v6`, `sf_match_archive_v3`,
`sf_youth_idx_v2`, `sf_auctions_v1`, `sf_negos_history_v1`,
`sf_all_budgets_v1`, `sf_vacancies_v1`) **in parallel** — fire all 7
`wrangler kv key get` calls as backgrounded processes and wait on them
together, not one at a time. Each invocation is a cold `npx wrangler`
process plus a network round trip (`sf_players_v6` and
`sf_negos_history_v1` alone are 2.5MB/3.4MB), so serial fetching is the
single biggest chunk of this command's wall-clock time. Once all keys are
local, write one script (e.g. Python) that builds the full export in one
pass rather than iterating interactively — the field mappings below are
already resolved, so no further exploration of the raw shapes should be
needed.

Pull these keys and build sections:

- There is no `sf_squads_raw_v1` key (confirmed 404 as of 2026-07-24 — do not
  waste a round trip on it). Derive the **squad** section by filtering
  `sf_players_v6` → `.players` where `club`/`Club` == `"Arsenal"` (20
  players) — the per-player objects already carry full detail: attributes,
  form/morale/fitness, contract (`contractWeeks`, `weeklyWage`,
  `contractStatus` — has `wantsToLeave`/`reason`, richer than
  `intendsToLeave` alone), season stats, injury, discipline (`yellows`/
  `reds`/`banGamesLeft` plus the separate `disciplineProcessedYellows`/
  `disciplineProcessedReds`), and flags (`retiring`, `homegrown` — `slowIcon`
  and `inAcademy` exist as fields but are always false/absent in current
  data, include them anyway for forward-compat). Note: `Strength` is in the
  app's `FULL_ATTR_KEYS` constant but no player object actually has that key
  — omit it from the attributes block rather than emitting a null.
- `sf_players_v6` → `.players` (all ~1450 players, every club) →
  **allPlayers** section. For each player compute a rating at all 8
  positions using the same formula the app uses (`GAME_ATTRS` in
  `src/constants.js`): average of 4 position-specific attributes, rounded
  to 1 decimal, skipping zero/null attrs:
  - GK: Handling, Reflexes, Speed, Passing
  - FB: Passing, Tackling, Stamina, Marking
  - CB: Marking, Heading, Tackling, Speed
  - DM: Tackling, Passing, Vision, Marking
  - CM: Vision, Passing, Dribbling, Shooting
  - AM: Passing, Dribbling, Shooting, Vision
  - WF: Dribbling, Passing, Speed, Shooting
  - CF: Speed, Dribbling, Heading, Shooting

  Include `bestPosition`/`bestPositionRating` (max across the 8), plus name,
  club, age, nationality, archetype, value, TM value, `_estValue` (already
  computed in the raw data), wage, contract weeks left, notForSale,
  intendsToLeave.
- `sf_match_archive_v3` → most recent Arsenal match → **tactics** section
  (formation/mentality/style/squad ratings aren't in KV directly — pull them
  from the `home`/`away` side of Arsenal's latest match in the archive,
  keyed by highest `gameweek`)
- `sf_youth_idx_v2` → **scouting** section: active scout jobs (`status ==
  "active"`), a few recent rejected ones, academy players, facility
  levels/project, staff effects
- `sf_auctions_v1` + `sf_negos_history_v1` (filter to `status` in
  pending/counter/fee_agreed AND (`buyer`/`seller == "Arsenal"` OR
  `"Arsenal" in visibleTo`) — `visibleTo` is only populated on listing-based
  negotiations (~811 of 4543 records as of 2026-07-24), so checking
  buyer/seller alone is required to catch Arsenal's own direct negotiations
  too; combined filter yields ~10 rows. The full history is 4000+ rows of
  noise, don't dump it all) + `sf_all_budgets_v1` + `sf_vacancies_v1` →
  **transferMarket** section
- `GET https://slowfootball.club/api/transfers/done` (live API call, not a
  KV key — public, no auth needed) → `.deals` (the full list is 1600+
  league-wide deals going back to last September — don't dump it all) →
  two arrays inside the **transferMarket** section, both sorted most-recent
  first:
  - **arsenalTransfers**: all deals where `seller == "Arsenal"` or
    `buyer == "Arsenal"` (no time cap — this is only ~30 deals all-time)
  - **recentLeagueTransfers**: all deals from the last 14 days (by `ts`/
    `updatedAt`), regardless of club — gives league-wide market context
    without dumping the full history (~100-150 deals typically)
- `GET https://slowfootball.club/api/tables/from-fixtures` (live API call,
  not a KV key — public, no auth needed; ⚠️ the `sf_tables_raw_v1` KV key is
  a stale, orphaned cache nothing writes to anymore — do not use it) →
  **standings** section (skip empty groups like `world`/`conference`/
  `hipster` if they have zero rows that gameweek)

Drop internal/technical fields (raw ids, cache timestamps, duplicate field
variants like `Club`/`club`). Use readable field names. Write minified JSON
(no pretty-printing) to `./exports/SLOW-Game-State-{date}-{time}.json` — keep
it compact but don't drop anything useful for reasoning about squad,
transfers, scouting, or tactics. Report the file path and size when done.
