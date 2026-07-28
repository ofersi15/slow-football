---
description: UI/UX review of the running app across all tabs, desktop + mobile — auto-fix low-risk findings and commit
---

You are doing a UI/UX review of the running app, for its sole end user
(Ofer, non-developer). You need to actually see the app, not just read the
code — start the dev server (check for a project skill that already covers
launching it first; otherwise `npm run dev`) and drive it in a browser
(Playwright is already a devDependency and Chromium is pre-installed —
`executablePath: '/opt/pw-browsers/chromium'`, don't run `playwright
install`).

**Before you start:** this list was authored 2026-07-28. Briefly sanity-check
whether accessibility/mobile-UX best practice has meaningfully shifted since
then. If so, adapt the checklist below rather than following it rigidly, and
note what you changed and why at the top of your report.

Walk every tab — Scout, My Squad, Moneyball, Analysis, Youth, My Club, Clubs,
Transfers, Matches, Assistant (both the full-tab chat and the 💬 docked
panel opened from another tab) — at:
- A normal desktop width (e.g. 1440px)
- The app's one mobile breakpoint, 768px (CLAUDE.md: this is the *only*
  breakpoint in `style.css` — match it rather than proposing a new one)

For each tab/width, check and screenshot:
- Anything visually broken, overlapping, or clipped — CLAUDE.md flags a
  known pattern: a `.card` wrapping a `<table>` with no inner
  `overflow-x:auto`/scroll div silently clips columns on mobile with no way
  to reach them. Look for other instances of this same mistake.
- A fixed-width flex child next to a `flex:1;min-width:0` sibling that
  should stack on mobile but doesn't (same root cause as the
  `.club-squad-panels-row`/`.stack-mobile-grid` cases already fixed).
- Loading states, empty states, and the sidebar's "Cache not saving"
  warning path — do they read clearly to a non-technical user?
- Consistency: similar controls (filters, sort headers, modals) behaving or
  looking differently across tabs for no reason.
- Basic accessibility: contrast, focus states, tap-target size on mobile,
  anything keyboard-unusable that should be usable.

For each finding: if it's a small, clearly-scoped, low-risk fix (add a
missing `overflow-x:auto`, add the 768px stacking override, fix an obvious
visual bug) **implement it and commit**, per CLAUDE.md's "commit and push
after every change" rule — remember the Template Editing rule: edit
`src/templates/*.html` or `style.css`, run `npm run assemble` if you touched
a template, commit the partial + regenerated `index.html` together. Re-check
the fixed screen in the browser before moving on. For anything that's a
matter of taste or a bigger redesign (not a bug, just "could be nicer"),
don't pick a direction unilaterally — describe 1-2 concrete options in your
report instead.

CLAUDE.md must stay thin (it's auto-loaded every session — every line costs
tokens). Only touch it if a current-state fact actually changed (e.g. a new
mobile-layout pattern to watch for); state the new fact in place of the old
one, don't log the fix itself there — that belongs in the commit message and,
if it has real debugging value, `CHANGELOG.md`.

End with a short markdown summary organized by tab: what you found, what you
fixed (with commit refs and before/after screenshots if easy), and anything
left for Ofer to decide.
