# Refactor Migration Log — ARCHIVED

Migration complete as of 2026-05-01. Do not update this file.
Current architecture is documented in SESSION_CONTEXT.md and CLAUDE.md.

## Phase A — Extract utilities ✅
- [DONE] src/constants.js, src/utils.js, src/cache.js extracted from app.js
- app.js: 4461 → 4089 lines

## Phase B — Vite build + method splitting ✅
- [DONE] Vite 5 lib-mode build, CF Pages → dist/, vue.esm-browser.prod.js alias
- [DONE] src/methods/youth.js + matches.js — app.js 4089→2902
- [DONE] src/methods/espionage.js + clubs.js — app.js 2902→2000
- [DONE] src/methods/data.js + helpers.js — app.js 2000→1153
- [DONE] index.html split into src/index.html shell + 11 src/templates/*.html partials
- [DONE] scripts/assemble.js, prebuild/predev hooks

## Phase C — Computed extraction + cleanup ✅

- [DONE] C-6: Fix shadowed variable declarations in youth.js
- [DONE] C-3: Centralise ATTR_KEYS_ENR + PLAYER_MERGE_ATTRS in constants.js
- [DONE] C-4: Move fmtFormation, fmtSubStatus, fmtNegoDate, stripDashes to utils.js
- [DONE] C-5: Remove dead fmDiag state + runFmDiag method
- [DONE] C-1: Extract computed block into src/computed/ (7 files, 760 lines moved)
  - src/computed/matches.js (matchArchiveFiltered, tacticsAnalysis, subsDbStats, …)
  - src/computed/squad.js (mySquadPlayers, bestXIPlayers, lineupWithStats, …)
  - src/computed/espionage.js (espionageFiltered, auctionsByPlayer, nextAuctionClose, …)
  - src/computed/modal.js (selectedPlayerTraits, selectedPlayerBonds, mySquadChem, …)
  - src/computed/scout.js (filteredPlayers, sortedPlayers, topLists, mbMarketList, …)
  - src/computed/youth.js (youthAcademySorted, youthFilteredHistory, youthHistFiltered, …)
  - src/computed/clubs.js (selectedClubPlayers, selectedClubSubmissions, …)

## Cache overhaul (2026-05-01) ✅

- Stats TTL: 6h → 7 days (updates weekly on Mondays only)
- Espionage TTL: 30min → 6h (staff/facilities change weekly at most)
- Tactics: localStorage-only → also persisted to CF KV (survives browser clears, works across devices)
- Youth: also persisted to CF KV (read KV first, write KV after full fetch)
- CF cron squads run now also pre-caches sf_espionage_v3 + sf_youth_idx_v2 server-side (4×/day)
- Background prefetch: youth (3s) + espionage (7s) after main data loads
- Removed dead sf_tables_raw_v1 write from CF cron
- CF worker redeployed: version af71ab20

## Current state (as of 2026-05-01)

| File | Lines | Notes |
|------|-------|-------|
| app.js | ~433 | data() + watch + mounted + 2 core computeds + method spreads |
| src/computed/*.js | 45–175 | 7 files, all tested via build |
| src/methods/*.js | 200–653 | 6 files |
| src/templates/*.html | 56–669 | 11 partials |
| src/constants.js | 121 | clean |
| src/utils.js | 175 | clean |
| src/cache.js | 91 | clean |

## Refactor complete — all phases done
All method and computed logic is in focused ~200-line files.
Claude tasks now read only the files relevant to the work.
