# Refactor Migration Log

This file tracks progress of the token-efficiency refactor.
Read this first when resuming a session. Each step is committed separately.
See /home/codespace/.claude/plans/breezy-juggling-pine.md for full plan.

## Phase A — Extract utilities (no build step)
- [DONE] A-1: Created MIGRATION_LOG.md
- [DONE] A-2: Created src/constants.js, removed from app.js
- [DONE] A-3: Created src/utils.js, removed from app.js
- [DONE] A-4: Created src/cache.js, removed from app.js
- [DONE] A-5: Verified app.js line count (4089, was 4461), pushed, verified live

## Phase B — Introduce Vite + method-file splitting (pivot from Vue SFCs)
- [DONE] B-1: Add Vite + vue + chart.js to package.json, create vite.config.js
- [DONE] B-2: ES module imports in app.js, vite.config.js (lib mode), wrangler.jsonc → dist, fixed index.html (closed root div). CF Pages dashboard update is a manual user step.
- [DONE] B-3: Pivot decision — Vue SFCs too risky (30+ cross-tab dependencies in computed). Split methods into per-topic JS files instead. Same token savings, zero refactor risk.
- [DONE] B-4: Extract src/methods/youth.js + matches.js — app.js 4092→2902 lines
- [DONE] B-5: Extract src/methods/espionage.js + clubs.js — app.js 2902→2000 lines
- [DONE] B-6: Extract src/methods/data.js + helpers.js — app.js 2000→1153 lines
- [DONE] B-7: Verified npm run build clean on each step, pushed live

## Phase C — Further splitting (if needed)
- app.js is now 1153 lines (data + computed + watch + small utility methods + mounted)
- index.html is 3555 lines (templates — unchanged)
- All method logic now in 6 src/methods/*.js files (117–653 lines each)
- Further splitting: could extract computed properties or index.html templates, but current state is already a ~4× improvement in per-task context usage
