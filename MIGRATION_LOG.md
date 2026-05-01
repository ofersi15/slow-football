# Refactor Migration Log

This file tracks progress of the token-efficiency refactor.
Read this first when resuming a session.

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

## Phase C — Computed extraction + cleanup (next)

### C-1: Extract computed properties from app.js (~759 lines → ~200)
Split into src/computed/ files, same spread pattern as methods:
- `src/computed/scout.js` — filteredPlayers, sortedPlayers, pagedPlayers, topLists, chart lists (~200 lines)
- `src/computed/youth.js` — 12 youth computeds (~150 lines)
- `src/computed/espionage.js` — espionageFiltered, negosFiltered, auctions, budget (~150 lines)
- `src/computed/clubs.js` — selectedClub*, match archive filters, tacticsAnalysis (~150 lines)
- Leaves app.js ~400 lines (data() + watch + mounted + core computed)

### C-2: Fix unused imports (quick wins, low risk)
- espionage.js: remove `serverCacheSet` (unused)
- helpers.js: remove `API` (unused)
- clubs.js: remove `parseAsync`, `stringifyAsync` (unused)

### C-3: Centralise attribute arrays in constants.js
- `ATTR_KEYS_ENR` (16 attrs), `ATTR_KEYS` (12 attrs), `MERGE` (19 attrs) defined 5× across youth.js + matches.js
- Add named exports to constants.js, import from there

### C-4: Move formatters to utils.js
- `fmtFormation` (clubs.js), `fmtNegoDate`, `fmtSubStatus` (espionage.js) → utils.js
- `stripDashes` used 4× in matches.js → utils.js

### C-5: Remove dead code
- `activeModalStats` computed — defined, never referenced in template
- `getYouthAttr` helper — never called
- `selectedPlayerStatsLoading` state — set but never checked in template
- `fmDiag` / `runFmDiag()` — debug-only, no UI

### C-6: Fix duplicate variable declarations in youth.js
- Lines ~52–58: `fetchLive` and `fetchStatic` declared twice (likely copy-paste bug)

## Current state (as of 2026-05-01)

| File | Lines | Status |
|------|-------|--------|
| app.js | 1158 | computed block still 759 lines — main remaining target |
| src/methods/*.js | 200–653 | 6 files, all working, minor unused imports |
| src/templates/*.html | 56–669 | 11 partials, heavy inline styles in tab-clubs.html |
| src/constants.js | 117 | missing ATTR_KEYS_ENR, ATTR_KEYS, MERGE exports |
| src/utils.js | 150 | missing fmtFormation, fmtNegoDate, stripDashes |
| src/cache.js | 91 | clean |
