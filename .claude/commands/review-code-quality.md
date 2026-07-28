---
description: Code quality / architecture / efficiency review — auto-fix low-risk findings and commit
---

You are reviewing code quality, architecture, and efficiency in this repo,
for its sole user/owner (Ofer, non-developer, relies on Claude Code for all
changes — keep things simple, avoid clever abstractions).

**Before you start:** this list was authored 2026-07-28 against Vue 3.5 /
Vite 5. Briefly sanity-check whether recommended practice for a Vue 3 DOM-
template + Vite app has meaningfully shifted since then. If so, adapt the
checklist below rather than following it rigidly, and note what you changed
and why at the top of your report.

Check at minimum:
- Organization and duplication across `app.js`, `src/methods/*.js`,
  `src/computed/*.js`, `src/templates/*.html` — anything that should be one
  place but is spread across several, or copy-pasted instead of shared.
- Dead code: unused exports, methods never called from a template, leftover
  code from removed features (e.g. check nothing still references the
  removed `extractManager`/manager-name-baking logic noted in CLAUDE.md).
- The derived-scoring-fields pattern (`_gc`, `_gc90`, `_gDiff`, `_aDiff`,
  etc. in `src/methods/data.js`) is intentionally computed in 3 separate
  spots per CLAUDE.md (cache load, stats enrich, fresh fetch) — confirm all
  3 are still in sync, and flag (don't silently "fix") if consolidating them
  is actually safe given Vue's reactivity model, since CLAUDE.md implies this
  was a deliberate choice.
- Caching/batching patterns already documented as fragile in CLAUDE.md (the
  8-at-a-time club-fetch batching in `loadEspionageSubmissions()`, the
  never-cache-a-failed-fetch-as-`{}` rule) — confirm current code still
  honors these and isn't quietly regressing.
- AI Assistant cost/efficiency: `buildChatContext()` in
  `src/methods/assistant.js` — is it still comfortably under the 120,000-char
  server-side cap, and is prompt caching (`cache_control`) still applied to
  the right messages for a high cache-hit rate?
- Build output sanity — run `npm run build` and check `dist/` size /
  `index.html` size (currently ~300KB generated) isn't ballooning
  unnecessarily.

**Hard constraints you must follow when fixing anything:**
- `index.html` is generated — never hand-edit it. Edit the relevant
  `src/templates/*.html`, run `npm run assemble`, and commit both the
  partial and the regenerated `index.html` together.
- The last tab partial in `src/index.html`'s include list closes 2 shell
  `<div>`s at the very bottom (currently `tab-assistant.html`) — don't move
  or reorder tab includes without moving those closing tags too.
- Never put `</script>` at the end of `app.js`.

For each finding: if it's a small, clearly-scoped, low-risk cleanup (dead
code removal, deduplication, obvious simplification), **implement it and
commit** — small focused commits, not one giant diff, per CLAUDE.md's
"commit and push after every change" rule. Run `npm run build` after each
change to confirm nothing broke. For anything that's a real architectural
change (restructuring how methods/computed are wired, touching the
derived-fields-in-3-places pattern), don't execute it — describe the tradeoff
in your report and let Ofer decide.

CLAUDE.md must stay thin (it's auto-loaded every session — every line costs
tokens). Only touch it if a current-state fact actually changed (a file
moved, a pattern was consolidated); state the new fact in place of the old
one. The cleanup itself — what was removed/simplified and why — goes in the
commit message and, if it has real debugging value, `CHANGELOG.md`, never as
a logged entry in CLAUDE.md.

End with a short markdown summary: what you found, what you fixed (with
commit refs), and anything left for Ofer to decide.
