# CLAUDE.md — Slow Football Analytics

Personal fantasy football analytics app for slowfootball.club. Owner: Ofer (ofersi15@gmail.com), non-developer — keep everything simple, commit and push after every change.

This file is auto-loaded into every Claude Code session — keep it to durable, current-state facts only. Detailed narrative history (root causes, abandoned approaches, live-test verification) belongs in `AI-ASSISTANT-CHANGELOG.md` (Assistant-specific) or `CHANGELOG.md` (everything else), neither of which is auto-loaded — link to them from here rather than inlining the story.

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

- Chat UI: `src/templates/tab-assistant.html` (full tab, centered, 900px) + `assistant-dock.html` (400px right-docked panel, opened via 💬 in the header from any other tab). Only one is ever mounted at once — they share `ref="chatScroll"`. Logic in `src/methods/assistant.js`.
- Frontend POSTs `{messages, context}` to `POST {SF_WORKER_BASE}/_chat` — `cf-worker/index.js` `handleChat` proxies to the Claude API server-side so the key never reaches the browser. No auth on the route (consistent with the worker's other admin routes) — relies on the URL not being published.
- Model: `claude-sonnet-5`, `thinking: {type:'adaptive'}` (must stay on — thinking-disabled causes leaked scratch-work/precision errors on precision-heavy replies), `output_config.effort:'low'`, `max_tokens: 6500` (free text) / `8500` (lineup mode).
- **Structured output for "how should I line up against X" questions**: `_isLineupVsOpponentQuestion(text)` in `assistant.js` (cheap regex, no LLM call) sets `lineupMode:true`, which makes the worker add `output_config.format:{type:'json_schema', schema:LINEUP_SCHEMA}`. `formatLineupReply()` converts the parsed JSON to the same markdown a free-text reply would produce — frontend needs no changes either way.
  - Schema subset limits: `minItems`/`maxItems` on arrays only support 0 or 1, not exact counts (so "exactly 11 slots / 5 subs" is prompt guidance, not schema-enforced). `minimum` on number types is rejected by the API outright. `minLength` on strings works and is used to forbid blank names.
  - `isLineupReplyBroken()` in `handleChat` detects a malformed/undersized response (the model can still return schema-valid-but-empty content) and retries the whole Anthropic call once before falling back to best-effort.
  - Client-side timeout: 240s (`lineupMode`, covers a possible server retry) / 90s (otherwise).
- `buildChatContext()` builds the deterministic system-prompt context each message: squad (rating, fitness, TrueVal, alt-position ratings via `AltPosFit`, `Ldr/Ment/Exp`, `FK/Pen/Cor`), transfer targets (top 25 by rating, now also with `AltPosFit`), recent real deals, transfer list, opponent tactics (read from `this.submissionsCache` — NOT the stale `this.espionageSubmissions` snapshot), MY_CLUB's last 8 match results, and a static game-mechanics reference (formation tiers by Analytics Dept level, the 6 instruction dropdowns' exact option values, sub Plan/Timing rules — scraped from the live `/submit-team-v2` JS, not historical submissions which can carry retired option values).
- **Negotiation/trade support**: for trade questions, the top-25-by-rating targets list often misses the squad-depth pieces that actually show up in real offers. `buildChatContext()` scans the user's own chat messages (via a shared `_altFitStr(p)` helper) for club names and player surnames and adds full detail (rating, TrueVal, `AltPosFit`) for any match — a club dump (up to 5 clubs, 30 players each) when a club is named, plus an individual lookup (up to 30 players) for names mentioned without their club. Keeps a trade discussion grounded in real numbers without dumping the whole league into every request.
- Player pricing uses `trueVal(p)`/`trueValSrc(p)` (`espionageMethods`, `computeTrueValues()` in `espionage.js`), never the raw `Value` field, which is unreliable (scarce supply inflates real fees above it).
- GW/staleness window = Saturday 9pm through the next Saturday 9pm, **London wall-clock time** (DST-aware via `Intl` offset diffing, not a fixed UTC offset) — independent of any GW number.
- A sub's "Plan" is a mentality override that persists as the new baseline until a later sub changes it, not a per-player label — the 3 "any situation" subs should match the match's starting Mentality; only "if winning"/"if not winning" subs should actually shift it.
- Context is capped at 120,000 chars server-side (`handleChat`) before it reaches the model — silent truncation, no error. Re-verify against this cap if `buildChatContext()` grows a lot (a full real-scale context runs ~24-28k chars currently).
- Prompt caching: system prompt + second-to-last message marked `cache_control:{type:'ephemeral'}` (5min TTL) — `buildChatContext()` is deterministic so cache hits are near-100% within a session. Verify via `usage.cache_read_input_tokens`, visible with `wrangler tail -c wrangler.toml` from `cf-worker/`.
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
- Formations: 16 total, gated by Analytics Dept facility level (cumulative) — Lv1 `442 433 4231 532 343`, Lv2 adds `352 541 4411`, Lv3 adds `4321 451`, Lv4 adds `4141 442D 3421`, Lv5 adds `3241 4222 4132`. Same tier table lives in `facRef()`/`facExplain()` in `src/methods/youth.js` (`analytics` key) and is now also in the Assistant's `buildChatContext()` — see AI Assistant section below
- Clicking the Clubs tab always resets to club list (clears `selectedClubName`)

---

## Caching

| Key | Content | TTL | Written by |
|-----|---------|-----|-----------|
| `sf_players_v6` | All players | 6h stale | Browser |
| `sf_stats_v1` | Player stats | 7 days stale | Browser |
| `sf_espionage_v3` | Staff + facilities (all clubs) + negos snapshot | 6h stale | CF cron 4×/day + browser |
| `sf_youth_idx_v2` | Scouts, academy, facilities, staff (Arsenal) | 10min live / 1h static | CF cron 4×/day + browser |
| `sf_tactics_v4` | Formation/style analysis | 7 days stale | Browser only |
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

After any meaningful change, update CLAUDE.md in the same or a follow-up commit — but keep additions short and current-state-only (a fact, not a story). If the change has real debugging history worth preserving (root cause, what was tried and rejected, live-test verification), put that in `AI-ASSISTANT-CHANGELOG.md` or `CHANGELOG.md` instead and link to it, rather than inlining it here.
