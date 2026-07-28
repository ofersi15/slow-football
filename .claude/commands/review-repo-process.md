---
description: Review GitHub repo hygiene and dev process — auto-fix low-risk findings and commit
---

You are reviewing this repo's GitHub setup and development process, for its
sole user/owner (Ofer, non-developer, relies on Claude Code for all changes).
Optimize for **simple and low-maintenance**, not textbook-correct — don't
recommend heavy CI/test infrastructure just because a "real" team would have
it. Only recommend process weight that clearly pays for itself here.

**Before you start:** this list was authored 2026-07-28. Briefly sanity-check
whether recommended practice for a solo-maintained GitHub + Cloudflare Pages
project has meaningfully shifted since then. If so, adapt the checklist below
rather than following it rigidly, and note what you changed and why at the
top of your report.

Check at minimum:
- `.github/workflows/auto-merge-claude.yml` — merges any `claude/*` branch
  straight into `main` on push, with no review or build/CI gate. Given the
  sole-user, auto-commit-everything context, is that actually fine, or is
  there a cheap safety net worth adding (e.g. a build step that must pass
  before merge) without adding real friction?
- `.github/workflows/deploy-cf-worker.yml` — confirm the cache-worker deploy
  path is still correct and doesn't silently no-op.
- Whether any lint/typecheck/build-check runs before merge (currently: none).
  Recommend the smallest thing that would catch a broken `npm run build`
  before it reaches `main`, if worth it — otherwise say so explicitly.
- Stale branches — list any `claude/*` branches already merged into `main`
  that are just sitting there; clean up ones that are fully merged.
- `.gitignore` — confirm build output, `node_modules`, secrets, and the
  `exports/` directory (game-state snapshots) are correctly excluded.
- Doc sprawl: `CLAUDE.md`, `CHANGELOG.md`, `AI-ASSISTANT-CHANGELOG.md`,
  `MIGRATION_LOG.md`, `API.md`, `start.md` — flag anything stale, duplicated
  across files, or that should be merged/deleted. CLAUDE.md's own rule is
  that it stays current-state-only and detailed history goes in the
  changelogs — check that's actually being followed.
- Commit message quality/consistency over recent history (`git log`).

For each finding: if it's a small, clearly-scoped fix (deleting a merged
branch, tightening `.gitignore`, trimming stale docs, fixing a broken
workflow step), **implement it and commit**, per CLAUDE.md's "commit and push
after every change" rule. If a fix changes how deploys or merges actually
behave (editing workflow permissions/triggers), you can implement it, but
explain the behavior change clearly in both the commit message and your final
report, since it changes the pipeline itself.

CLAUDE.md must stay thin (it's auto-loaded every session — every line costs
tokens, so this applies with extra force to a *process* review, which
otherwise tends to generate a lot of "here's what we checked" prose). Only
touch it if a current-state fact actually changed; state the new fact in
place of the old one, don't append a log line. The review's findings — what
was checked, what was fixed, what's left — belong in the commit messages and
your final report, never inlined into CLAUDE.md itself.

End with a short markdown summary: what you found, what you fixed (with
commit refs), and anything left for Ofer to decide.
