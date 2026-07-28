---
description: Security review of the app, cf-worker, and repo — auto-fix low-risk findings and commit
---

You are doing a security review of this repo for its sole user/owner (Ofer,
non-developer). This is a **personal, single-user app** — don't spend effort
on multi-tenant auth/access-control concerns that don't apply. Focus on: (a)
things that could leak the `ANTHROPIC_API_KEY` or other secrets, (b) things
that could cause irreversible damage to the live game state, (c) things that
expose data to anyone who finds the (unpublished, but not secret) worker URLs.

**Before you start:** this list was authored 2026-07-28. Briefly sanity-check
whether security practice for a Cloudflare Pages + Workers + Vue app has
meaningfully shifted since then (new known vulnerability classes, new
Wrangler/CF security defaults, etc.). If so, adapt the checklist below rather
than following it rigidly, and note what you changed and why at the top of
your report.

Check at minimum:
- `cf-worker/index.js` — the `/_chat` and `/_budget` routes have no auth
  (documented in CLAUDE.md as relying on "URL not published"). Confirm
  `sanitizeChatContent`/`sanitizeChatBlock` actually block anything dangerous
  reaching the Anthropic API or being reflected back, and that no route lets
  a caller read/exfiltrate the API key or other secrets.
- How `ANTHROPIC_API_KEY` (and any other `wrangler secret`) is referenced —
  confirm it never ends up logged, echoed in a response, or committed.
- `/api/agents/feed` and `/api/agents/claim` — CLAUDE.md flags these as
  irreversible after a 2026-03-23 accidental-call incident. Check nothing in
  the current codebase can trigger them without explicit user action.
- `git log -p` / `git grep` across history for accidentally committed
  secrets, tokens, or API keys.
- `npm audit` (root, `cf-worker/`, `tools/`) for known-vulnerable
  dependencies worth bumping.
- `localStorage` usage (chat sessions, cache) — confirm nothing sensitive
  persists longer than intended; CLAUDE.md notes attachments are stripped to
  placeholders before persistence — verify that's still true.
- `.github/workflows/auto-merge-claude.yml` — runs with
  `contents: write, pages: write` and merges any `claude/*` branch straight
  to `main` on push. Confirm the token scope is no broader than it needs to
  be.

For each finding: if it's a small, clearly-scoped, low-risk fix, **implement
it and commit** (small focused commits, clear messages, push per CLAUDE.md's
"commit and push after every change" rule). If a fix would change how the
Agent API, the auto-merge workflow, or any secret is handled in a way that's
ambiguous or hard to reverse, **don't change it** — describe the risk and the
options in your final report instead and let Ofer decide.

CLAUDE.md must stay thin (it's auto-loaded every session — every line costs
tokens). Only touch it if a current-state fact actually changed; state the
new fact in place of the old one. The "what was found/fixed and why" always
goes in the commit message and, if it has real debugging value, `CHANGELOG.md`
— never as a logged entry in CLAUDE.md.

End with a short markdown summary: what you found, what you fixed (with
commit refs), and what still needs a decision, ranked by severity.
