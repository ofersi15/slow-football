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

Pull these keys and build sections:

- `sf_squads_raw_v1` → `.data.Arsenal` → **squad** section (full detail:
  attributes, form/morale/fitness, contract, season stats, injury,
  discipline, flags)
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
  pending/counter/fee_agreed AND `"Arsenal" in visibleTo` — the full history
  is 4000+ rows of noise, don't dump it all) + `sf_all_budgets_v1` +
  `sf_vacancies_v1` → **transferMarket** section
- `GET https://slowfootball.club/api/transfers/done` (live API call, not a
  KV key — public, no auth needed) → `.deals`, filtered to deals where
  `seller == "Arsenal"` or `buyer == "Arsenal"` (the full list is 1600+
  league-wide deals — don't dump it all), sorted most-recent first →
  **completedTransfers** array inside the **transferMarket** section
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
