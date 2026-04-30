# Refactor Migration Log

This file tracks progress of the token-efficiency refactor.
Read this first when resuming a session. Each step is committed separately.
See /home/codespace/.claude/plans/breezy-juggling-pine.md for full plan.

## Phase A — Extract utilities (no build step)
- [DONE] A-1: Created MIGRATION_LOG.md
- [DONE] A-2: Created src/constants.js, removed from app.js
- [DONE] A-3: Created src/utils.js, removed from app.js
- [DONE] A-4: Created src/cache.js, removed from app.js
- [TODO] A-5: Verified app.js line count, pushed, verified live

## Phase B — Introduce Vite + migrate 3 simple tabs
- [TODO] B-1: Add Vite + plugin-vue to package.json, create vite.config.js
- [TODO] B-2: Create src/main.js entry, update wrangler.jsonc, update CF Pages dashboard
- [TODO] B-3: Extract TabScout.vue
- [TODO] B-4: Extract TabSquad.vue
- [TODO] B-5: Extract TabMoneyball.vue
- [TODO] B-6: Verify npm run dev, npm run build, live deployment

## Phase C — Migrate remaining tabs + modal
- [TODO] C-1: Extract TabClub.vue
- [TODO] C-2: Extract TabEspionage.vue
- [TODO] C-3: Extract TabYouth.vue
- [TODO] C-4: Extract PlayerModal.vue
- [TODO] C-5: Extract TabAnalysis.vue
- [TODO] C-6: Extract TabClubs.vue
- [TODO] C-7: Extract TabMatches.vue
- [TODO] C-8: Delete app.js (all tabs migrated)
- [TODO] C-9: Shared state audit — consider src/store.js if App.vue > 400 lines
