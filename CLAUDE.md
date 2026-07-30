# CLAUDE.md — Slow Football Analytics

Personal fantasy football analytics app for slowfootball.club. Owner: Ofer (ofersi15@gmail.com), non-developer — keep everything simple, commit and push after every change.

This file is auto-loaded into every Claude Code session — every line here costs tokens on every single session, so keep it **thin**: only durable, current-state facts actually needed for ongoing work, not a record of what changed. Detailed narrative history (root causes, abandoned approaches, live-test verification, "fixed X on date Y") belongs in `AI-ASSISTANT-CHANGELOG.md` (Assistant-specific) or `CHANGELOG.md` (everything else), neither of which is auto-loaded — link to them from here rather than inlining the story. That applies to every skill/command that edits this repo, not just manual edits.

---

## Live URLs

| | URL |
|-|-----|
| **App** | https://sf.ofersi15.workers.dev |
| **Cache worker** | https://sf-cache.ofersi15.workers.dev |
| **GitHub repo** | https://github.com/ofersi15/slow-football |
| **Game API** | https://slowfootball.club/api |

---

## Build & Deploy

- **Any frontend change**: `git push origin main` → Cloudflare Worker "sf" project rebuilds and deploys itself (Build command `npm run build`, Deploy command `npx wrangler deploy`, configured in the CF dashboard's Git integration) — `dist/` is gitignored, not committed, since CF builds it fresh every time
- **Build command**: `npm run build` (runs assemble + Vite)
- **Cache worker**: deployed separately via `cd cf-worker && npx wrangler deploy -c wrangler.toml`

---

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
| Assistant (AI chat) | `src/templates/tab-assistant.html` |
| Player modal | `src/templates/modal.html` |
| Scout sidebar | `src/templates/sidebar.html` |
| Tab bar / shell | `src/index.html` |

`npm run build` and `npm run dev` run assemble automatically.

---

## Key File Map

| Need to change | File |
|----------------|------|
| Data loading, modal, charts | `src/methods/data.js` |
| Youth tab logic | `src/methods/youth.js` |
| Match archive | `src/methods/matches.js` |
| Espionage / negotiations | `src/methods/espionage.js` |
| Clubs tab / pitch / submissions | `src/methods/clubs.js` |
| Sort helpers, staff | `src/methods/helpers.js` |
| AI Assistant chat + context builder | `src/methods/assistant.js` |
| Constants, cache keys | `src/constants.js` |
| Utility functions | `src/utils.js` |
| Cache helpers | `src/cache.js` |
| data(), computed, watch, mounted | `app.js` |

**Computed files**: `src/computed/` — matches.js, squad.js, espionage.js, modal.js, scout.js, youth.js, clubs.js

---

## Architecture

**Stack**: Vue 3 (DOM template) + Vite build → Cloudflare Pages (`dist/`)

Logic files spread via `...xMethods`, computeds via `...xComputed` in `app.js`.

---

## Game API

- **Base**: `https://slowfootball.club/api`
- **Auth**: `Authorization: Bearer <token>`, `X-Club: Arsenal`, `X-Role: manager`
- **My club**: `MY_CLUB = 'Arsenal'`

| Endpoint | Returns |
|----------|---------|
| `GET /api/squads` | All clubs' squads |
| `GET /api/squads?club=X` | Single club squad |
| `GET /api/submissions?club=X&limit=50` | Club GW submissions |
| `GET /api/scouting/jobs?club=X` | Active scouting jobs |
| `GET /api/transfers/done` | Transfer history |
| `GET /api/agents/international-players` | International scouting pool |
| `GET /api/tables/from-fixtures` | League tables |
| `GET /api/managers` | All managers |
| `GET /api/facilities?club=X` | Club facilities |
| `GET /api/staff/effects?club=X` | Staff effects |
| `GET /api/academy?club=X` | Academy players |

---

## Tabs

| Tab | Label | Description |
|-----|-------|-------------|
| scout | Scout | Filterable player table + sidebar |
| squad | My Squad | Squad management + Best XI builder |
| moneyball | Moneyball | Value analysis, gems, overperformers |
| analysis | Analysis | Tactical matchup stats (6 cards) |
| youth | Youth | Scouting jobs, academy, facilities, staff |
| club | My Club | Facilities, staff, training |
| clubs | Clubs | All clubs — Latest XI pitch viz, Academy, History, Transfers |
| espionage | Transfers | Opponent scouting, negotiations, auctions |
| matches | Matches | Match archive, filters, rebuild/append |
| assistant | Assistant | AI chat — ask about transfers/tactics/squad |

---

## AI Assistant

Full history/root-causes/verification detail: **`AI-ASSISTANT-CHANGELOG.md`** (not auto-loaded — read it when you need the *why* behind something below).

The game mechanics reference (in `buildChatContext()`) now also covers Player Roles and Plan B (see the Clubs Tab section above) — both folded into the existing 6-section lineup-vs-opponent template rather than added as new sections (Role on each Section 2 lineup line, Plan B as a short block at the end of Section 4) per the "lost in the middle" lesson below. A sub's Instruction is still the 5-value Mentality scale (Very Defensive → Very Attacking), same Player On/Player Off/Window shape as documented below — unchanged. Plan B's named-Plan vocabulary (`PLAN_B_NAMED_PLANS` in `src/constants.js` — Shut Up Shop/Sit Deeper/Hold Shape/Keep The Ball/Go Direct/Push On/Chase The Game) is confirmed directly off a real live opponent submission, so the assistant recommends a SPECIFIC named Plan per scenario it addresses (2-4 scenarios, not necessarily all 6); what's still unconfirmed is only the exact underlying Mentality/Style/etc. value each named Plan triggers (see `CHANGELOG.md`'s "Clubs tab: Player Roles + Plan B" entry), so the assistant names the Plan without asserting what it numerically does. Section 1 (opponent breakdown) opens with a standalone scouting read on the opponent — their own strengths/weaknesses/threat profile, including their Plan B awareness ("N/6 configured", shown per club in the opponent-tactics table) — before tying it into the specific matchup.

- Chat UI: `src/templates/tab-assistant.html` (full tab, centered, 900px) + `assistant-dock.html` (400px right-docked panel, opened via 💬 in the header from any other tab). Only one is ever mounted at once — they share `ref="chatScroll"`. Logic in `src/methods/assistant.js`.
- Frontend POSTs `{messages, context}` to `POST {SF_WORKER_BASE}/_chat` — `cf-worker/index.js` `handleChat` proxies to the Claude API server-side so the key never reaches the browser. No auth on the route (consistent with the worker's other admin routes) — relies on the URL not being published.
- Model: `claude-sonnet-5`, `thinking: {type:'adaptive'}` (must stay on — thinking-disabled causes leaked scratch-work/precision errors on precision-heavy replies), `output_config.effort:'low'`, `max_tokens: 16000` — raised several times after real-matchup testing repeatedly showed the growing reasoning depth (Role/Plan-B, footedness, fitness-aware subs, mirrored Plan B, close-call analysis) pushing thinking-token usage past each prior cap — thinking alone hit ~9700 tokens in the worst case seen. Re-check this if `buildChatContext()`'s reply-quality requirements grow further; the retry-on-truncation logic in `handleChat` doesn't help when thinking's actual *need* (not just its variance) exceeds the cap, since both attempts hit the same wall.
- **All replies are free-text, one response mode** — there is no separate structured-output/JSON-schema mode for lineup-vs-opponent questions. That mode (`lineupMode`, `LINEUP_SCHEMA`, `_isLineupVsOpponentQuestion()`, `formatLineupReply()`, `isLineupReplyBroken()`) existed 2026-07-24 through 2026-07-30 and was removed at the owner's request after direct comparison: its JSON-schema-constrained decoding degraded (truncated/ghost lineup entries) more often than free-text under real testing, for no compensating benefit (the schema's array-count limits meant it could never actually guarantee "exactly 11 lineup slots" either — see `AI-ASSISTANT-CHANGELOG.md`'s "Player Roles + Plan B" and later entries for the full history). `handleChat` retries once, server-side, on a completely empty reply or `stop_reason:"max_tokens"` (mid-reply truncation) — both real failure modes hit in testing.
  - Client-side timeout: 240s.
- The system-prompt context is built by two separate methods, split for prompt-cache reasons (see the caching bullet below): `buildStaticMechanicsContext()` returns a pure function of `constants.js` — the game-mechanics reference (formation tiers by Analytics Dept level, the 6 instruction dropdowns' exact option values, sub Plan/Timing rules — scraped from the live `/submit-team-v2` JS, not historical submissions which can carry retired option values; Player Roles per base position tagged with the attributes each one rewards via `ROLE_ATTR_HINTS` in `constants.js` — a football-literacy heuristic, not scraped game data, unlike the rest of this reference — and Plan B scenarios, rendered dynamically from `PLAYER_ROLES`/`PLAN_B_SCENARIOS`). `buildDynamicChatContext()` returns everything that depends on live/session data: squad (rating, fitness, foot, TrueVal, alt-position ratings via `AltPosFit`, `Ldr/Ment/Exp`, `FK/Pen/Cor`, and a full 12-attribute `Attrs` column — `FULL_ATTR_KEYS` from `constants.js` — used for Role-fit checks), transfer targets (top 25 by rating, now also with `AltPosFit`), recent real deals, transfer list, opponent tactics (read from `this.submissionsCache` — NOT the stale `this.espionageSubmissions` snapshot — each opponent XI player shown with their own Player Role in parens, and a Plan B "N/6 configured" column), MY_CLUB's last 8 match results, and MY_CLUB's live Analytics Dept level (the one dynamic fact `buildStaticMechanicsContext()` used to embed inline, moved out so that block can be a pure function of constants and cache across sessions — see `FORMATION_TIERS`, now module-level in `assistant.js`, shared by both). A club named in the conversation (see negotiation/trade support below) also gets its real corner-setup detail added — their attacking/defensive corner zone assignments by player name, from the same submission — so the assistant can name specific opposing aerial threats/weaknesses instead of staying generic. A substitute always plays their own base position in-game (no field exists to assign them a different one) — Section 3/`subs` guidance requires matching the incoming player's position family to the outgoing player's slot unless a formation change is explicitly stated, and forbids subbing off a player who only just came on the previous window.
- **Negotiation/trade support**: for trade questions, the top-25-by-rating targets list often misses the squad-depth pieces that actually show up in real offers. `buildDynamicChatContext()` scans the user's own chat messages (via a shared `_altFitStr(p)` helper) for club names and player surnames and adds full detail (rating, TrueVal, `AltPosFit`) for any match — a club dump (up to 5 clubs, 30 players each) when a club is named, plus an individual lookup (up to 30 players) for names mentioned without their club. Keeps a trade discussion grounded in real numbers without dumping the whole league into every request.
- Player pricing uses `trueVal(p)`/`trueValSrc(p)` (`espionageMethods`, `computeTrueValues()` in `espionage.js`), never the raw `Value` field, which is unreliable (scarce supply inflates real fees above it).
- GW/staleness window = Saturday 9pm through the next Saturday 9pm, **London wall-clock time** (DST-aware via `Intl` offset diffing, not a fixed UTC offset) — independent of any GW number.
- A sub's "Plan" is a mentality override that persists as the new baseline until a later sub changes it, not a per-player label — the 3 "any situation" subs should match the match's starting Mentality; only "if winning"/"if not winning" subs should actually shift it.
- The frontend POSTs `staticContext`/`dynamicContext` as two separate fields (not one combined `context` string). `handleChat` caps each separately before they reach the model — silent truncation, no error: `staticContext` (the mechanics reference — never needs more than a few KB) at 20,000 chars, `dynamicContext` at 120,000 chars. Re-verify the `dynamicContext` cap if it grows a lot (a full real-scale dynamic context with an opponent named in conversation runs ~55-60k chars currently).
- **Prompt caching — two breakpoints, 1-hour TTL.** `system` is two blocks: [fixed instructions + `buildStaticMechanicsContext()`] then [`buildDynamicChatContext()`], each `cache_control:{type:'ephemeral', ttl:'1h'}` (previously one block, default 5min TTL). The last-message breakpoint is also `ttl:'1h'`. Splitting lets the first (truly static, byte-identical across every session) block's cache entry survive independently of the second (per-session, changes as live game data changes) — live-verified: a request with a changed `dynamicContext` after a ~4min gap showed `cache_read_input_tokens` matching exactly the static block's token count alongside nonzero `cache_creation_input_tokens` for the changed dynamic block, confirming breakpoint 1 hits even when breakpoint 2 misses. The 1h TTL (vs the old 5min default) matters because this app is used in short bursts with gaps often over 5 minutes — read cost stays ~0.1x, write cost is 2x base instead of 1.25x. Verify via `usage.cache_read_input_tokens`/`cache_creation_input_tokens`, visible with `wrangler tail -c wrangler.toml` from `cf-worker/` or in the `/_chat` response's own `usage` field.
- Attachments: up to 3 per message — images (re-encoded to JPEG, downscaled to 1568px), PDFs (`document` blocks), text/JSON/CSV (inlined, ≤20k chars). Server (`sanitizeChatContent`/`sanitizeChatBlock`) revalidates every block since `/_chat` has no auth. Stripped to placeholders before `localStorage` persistence.
- Chat sessions persist to `localStorage` (`sf_chat_sessions_v1`, capped 20 sessions × 30 messages). Sidebar (tab, collapsible rail) and dock (overlay, since there's no room for a persistent rail) share the same grouped/rename/delete session-list markup. AI-generated titles via `claude-haiku-4-5` (`/_title` route, `handleTitle`), best-effort with a truncated-first-message fallback.
- `saveChatHistory(touchedId)` — pass the session ID whose messages actually changed (bumps it to the top of the list); omit it for rename/delete of a *different* session, or the list reorders unexpectedly.
- Markdown rendered via `renderMarkdown()` (`src/utils.js`, dependency-free, HTML-escapes before `v-html`) — assistant replies render as plain flowing text (no bubble); only user messages get the bubble.
- Setup: needs an `ANTHROPIC_API_KEY` worker secret (`cd cf-worker && npx wrangler secret put ANTHROPIC_API_KEY`) — separate from a Claude Pro subscription, which doesn't include API access.

---

## Clubs Tab — Pitch Viz

- SVG pitch with player nodes, run arrows, hover tooltips
- `pitchLayout(submission)` — in `src/methods/clubs.js`
- Run arrow coords (do not change): `runX = (run.x/90)*68` | slot1: `runY = (run.y-27.5)/95*105` | slot2: `runY = 105-(run.y/100)*105`
- Formations: 16 total, gated by Analytics Dept facility level (cumulative) — Lv1 `442 433 4231 532 343`, Lv2 adds `352 541 4411`, Lv3 adds `4321 451`, Lv4 adds `4141 442D 3421`, Lv5 adds `3241 4222 4132`. Same tier table lives in `facRef()`/`facExplain()` in `src/methods/youth.js` (`analytics` key) and is now also in the Assistant's `buildChatContext()` — see AI Assistant section below. **`FORMATION_SLOT_POS`/`FORMATIONS` in `constants.js` only cover 8 of the 16** (442/4411/4231/433/4321/3421/352/343) — `pitchLayout()` silently returns `[]` for the other 8, a pre-existing gap, not addressed by the Player Roles/Plan B work below.
- Clicking the Clubs tab always resets to club list (clears `selectedClubName`)
- **Player Roles**: each `xi[]` entry can carry a `role` string (FM-style tactical role, e.g. "Overlapper", "Poacher" — gated by base position, full list in `PLAYER_ROLES`/`ROLE_ABBR` in `constants.js`). `pitchLayout()` passes it through; shown as a small abbreviated label under each pitch node, full name in the hover tooltip and in the "Player Roles" side panel. Empty/absent on submissions made before the game added this.
- **Plan B**: a submission's top-level `planBs` array holds `{priority, scenario, plan}` for each *enabled* scenario only (6 fixed scenario keys in `PLAN_B_SCENARIOS`, e.g. "losing_by_two_or_more" → a named Plan like "Chase The Game" — fires at most once per match, no personnel changes). Rendered via `planBList(submission)`/`planBLabel(key)` (`clubs.js`) in a "Plan B" side panel, and as a "🅱 N" chip (hover for detail) on the All-Clubs grid card.
- The pre-existing "Roles" object (`submission.roles` — captain/penalty/freekick/corner set-piece takers) is now labeled "Set-Piece Roles" in the UI to disambiguate from the new per-player "Player Roles" above — same underlying field, no data-shape change.
- A sub's `plan` field (`subs[].plan`) is still the 5-value Mentality scale per the owner (confirmed live) — **do not** treat it as the alternate `Fresh legs`/`Plan B`/`Shut up shop`/`Waste time`/`Chase the game` vocabulary found in a second, unconfirmed component in the live JS bundle (see `CHANGELOG.md` for the ambiguity, flagged for the game admin). The Clubs tab needed no change either way since it already renders `plan` as a bare string with no assumed vocabulary.
- Plan B / sub-Instruction precedence, per the game's own on-page copy: "A later sub instruction overrides an earlier Plan B, and vice versa: the most recent call wins."

---

## Caching

| Key | Content | TTL | Written by |
|-----|---------|-----|-----------|
| `sf_players_v6` | All players | 6h stale | Browser |
| `sf_stats_v1` | Player stats | 7 days stale | Browser |
| `sf_espionage_v3` | Staff + facilities (all clubs) + negos snapshot | 6h stale | CF cron 4×/day + browser |
| `sf_youth_idx_v2` | Scouts, academy, facilities, staff (Arsenal) | 10min live / 1h static | CF cron 4×/day + browser |
| `sf_negos_history_v1` | All-time nego history | permanent, never delete | CF cron every 5–15min |
| `sf_auctions_v1` | Auction items | — | CF cron 4×/day + `⟳ Refresh` button in Transfers tab (worker `/_budget` route also re-fetches auctions now, not just budget) |
| `sf_arsenal_fin_v1` | Arsenal budget | — | CF cron 4×/day |
| `sf_vacancies_v1` | Vacant clubs | — | CF cron 4×/day |
| `sf_match_archive_v3` | Archive index | permanent | Browser (manual) |
| `sf_match_archive_v3_gw_{N}` | Per-GW data | permanent | Browser (manual) |
| `sf_submissions_all_v1` | Submissions by club | 2h stale | Browser |

`/export-game-state` snapshots these KV keys + a couple of live API calls into a timestamped JSON in `./exports/` — see `.claude/commands/export-game-state.md` for exact field mapping.

---

## Player Data

- `retiring` → retiring, `homegrown` → homegrown, `slowIcon` → icon, `inAcademy` → academy
- 32 players have `_incompleteStats` (partial badge) — null-ID or custom-transfer players
- **Real player positions**: `GK, FB, CB, DM, AM, WF, CF` — confirmed against a full game-state export (1449 players), no player ever has position `CM`. `CM` only exists as a central-mid slot in tactic-screen `FORMATIONS` (filled by real DM/AM-position players via `SLOT_COMPAT`) — kept there, but removed from `ALL_POSITIONS`/`OUTFIELD_POSITIONS`/`GAME_ATTRS`/`GAME_ATTR_LABELS` so it can't appear as a player's own position (Scout filter, alt-position calc, Squad-by-position grouping)
- `FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision']`
- Derived scoring fields (computed in `src/methods/data.js`, 3 spots — cache load, stats enrich, fresh fetch): `_gc` (Goals+Assists), `_gc90`, `_gDiff`/`_aDiff` (Goals-xG / Assists-xA), `_gDiff90`/`_aDiff90` — rendered via `fmtDiff()` in `src/utils.js`

---

## Manager Names

- `managerMap` (club → real manager name) is built in `fetchFreshData()` (`src/methods/data.js`) from `/api/managers`, which returns both `username` (login handle, e.g. `scotty.d`) and `name` (real name, e.g. `Scott Dalziel`) — always prefer `name`, fall back to `username` only if blank
- Not persisted to localStorage — rebuilt live on every load, so it always reflects the *current* manager per club
- Match archive used to bake per-match manager names into the permanent cache via a regex narrative parser (`extractManager`) — removed; manager display everywhere now looks up `managerMap[club]` live instead

---

## Game Rules

- **Veteran degradation**: outfield 33+, GK 36+ — weekly stat decrements; Veterans/Icons don't train
- **Fitness model**: weekly decay from minutes played; rest plan restores; Veterans/Icons exempt
- **Position flexibility**: FBs can play wing, CBs can play up top
- **Academy eligible**: >10 weeks from 21st birthday

---

## Competitions

- **Super Duper Cup (SDC)**: cross-league knockout, 12 groups (A–L), 4 teams, Saudi Arabia venue
- Arsenal in Group E (Milan, Leeds, Bournemouth) — update if group assignment changes
- SDC fixtures appear in match archive — filter accounts for this competition type

---

## Vue Quirks — Will Break the App

- `v-if` on SVG `<g>` children crashes Vue — use `:opacity` instead
- `<` operator in SVG `:bind` attributes crashes — use a helper method
- Never put `</script>` at end of `app.js`

---

## ⚠ Agent API — Never Call Without Explicit User Instruction

- `POST /api/agents/feed` and `POST /api/agents/claim` are irreversible
- Incident 2026-03-23: accidental call added an unwanted player to the squad

---

## Known Quirks

Full history: **`CHANGELOG.md`** (not auto-loaded).

- **The game API can't handle ~55 fully-concurrent requests from one client.** Batch club-list fetches 8-at-a-time with a retry pass over failures (see `loadEspionageSubmissions()` in `src/methods/clubs.js`) — a single unbounded `Promise.all()` over all clubs causes ~54% failure. Also: never cache a failed per-club fetch as `{}` — the retry guard treats any cached value as "already fetched," permanently blacklisting that club.
- **Row/main closing tags live in the last content tab, not in the shell.** `src/index.html` opens `.main` and the flex row but never closes them — the last tab partial in the include list must close both (currently the trailing `</div><!-- end row -->` / `</div><!-- end .main -->` at the bottom of `tab-assistant.html`). **If you reorder the tab includes in `src/index.html`, move these 2 closing divs to whichever partial is now last** — otherwise every tab after the old last one silently sits one+ DOM levels above the flex row.
- **Sidebar "Cache not saving" warning** (`cacheWorking` in `app.js` mounted hook): fires when a `localStorage.setItem`/`getItem` roundtrip test fails, usually a full/blocked storage quota — squads then re-fetch from the API on every load instead of using cache. The box has a "🧹 Clear site data & reload" button (`clearSiteDataAndReload()` in `app.js`) that best-effort wipes localStorage/sessionStorage/cookies/Cache Storage/IndexedDB/service workers for the origin, then reloads — same effect as manually clearing site data in browser settings, which is the known fix.
- `xiPlayerInfo(name)` guards `typeof name !== 'string'` — stale cache can store objects as names
- `_normalizeSubs(s)` — called on both fresh fetch and localStorage load; fixes malformed subs entries
- Subs normalization handles JSON strings, stringified objects in the `name` field
- **Mobile**: `@media(max-width:768px)` in `style.css` is the one breakpoint for the whole app — match it rather than adding new ones. A `class="card" style="padding:0;overflow:hidden"` directly wrapping a `<table>` (no inner scroll div) silently clips columns on narrow screens with no way to scroll to them — always use `overflow-x:auto` (or add an inner `<div style="overflow:auto;max-height:...">`, see the espionage negos table) for any card/table pairing. A fixed-pixel-width flex child (`width:280px` etc.) sitting next to a `flex:1;min-width:0` sibling needs both a class (inline `grid-template-columns`/`width` beats a media-query override, so pull it into a CSS class instead) and a `flex-direction:column`/`width:100%` override in the 768px block, or it silently squeezes the sibling instead of stacking — see `.club-squad-panels-row`/`.club-setpieces-panel` and the generic `.stack-mobile-grid` (used for saved-lineup and modal 2-col panes).
- Any bare `<table>` in a tab needs an `overflow-x:auto` wrapper *and* `min-width:0` on `.content`, or mobile clips columns with no scrollbar (fixed for Scout; see `CHANGELOG.md` for the flexbox root cause).
- Mobile-overlay elements (e.g. Assistant dock) must lock `document.body.style.overflow` while open, or the hidden page behind them still scrolls.
- `data.js` needs its own `import Chart from 'chart.js/auto'` — doesn't inherit `app.js`'s import.
- Sibling `v-if`s meant to be mutually exclusive must chain as `v-else-if`, not repeat `v-if` — else all branches render at once (see Moneyball fix, `CHANGELOG.md`).

---

## Game Updates Log

| Date | Change |
|------|--------|
| 2026-04-29 | Formation 4321 (Christmas tree) added |
| 2026-04-27 | Traits + chemistry live; position flexibility (FB→wing, CB→up top); veteran degradation GK threshold 36 |
| 2026-04-19 | Fitness model overhauled (GW29) |
| 2026-03-23 | Player flags added (retiring, homegrown, slowIcon, inAcademy) |
| 2026-03-15 | Formation gating by Analytics Dept facility level |
| 2026-02-22 | Super Duper Cup launched |

---

## MD File Rule

After any meaningful change, update CLAUDE.md in the same or a follow-up commit **only if the current-state facts above actually changed** (e.g. a file moved, a rule changed, a new tab/endpoint/cache key exists) — state the new fact in place of the old one, don't append a dated log line. The change itself — what was fixed, why, what was tried — always gets logged, but in `AI-ASSISTANT-CHANGELOG.md` or `CHANGELOG.md`, never in CLAUDE.md, even briefly. If nothing durable changed (a pure bugfix that restores documented behavior), CLAUDE.md may need no edit at all.
