# CLAUDE.md — Slow Football Analytics

Personal fantasy football analytics app for slowfootball.club. Owner: Ofer (ofersi15@gmail.com), non-developer — keep everything simple, commit and push after every change.

**Live app**: https://sf.ofersi15.workers.dev | **Repo**: https://github.com/ofersi15/slow-football

---

## Build & Deploy

- **Any frontend change**: `git push origin main` → CF Pages auto-deploys in ~60s
- **Build command**: `npm run build` (runs assemble + Vite — do this before checking dist/)
- CF Pages serves from `dist/` (wrangler.jsonc)

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

## Vue Quirks — Will Break the App

- `v-if` on SVG `<g>` children crashes Vue — use `:opacity` instead
- `<` operator in SVG `:bind` attributes crashes — use a helper method
- Never put `</script>` at end of `app.js`

## ⚠ Agent API — Never Call Without Explicit User Instruction

- `POST /api/agents/feed` and `POST /api/agents/claim` are irreversible
- Incident 2026-03-23: accidental call added an unwanted player to the squad

## MD File Rule

After any meaningful change, update CLAUDE.md and SESSION_CONTEXT.md in the same or a follow-up commit.
