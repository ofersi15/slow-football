# CLAUDE.md — Slow Football Analytics

Personal fantasy football analytics app for slowfootball.club. Owner: Ofer (ofersi15@gmail.com), non-developer — keep everything simple, commit and push after every change.

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

- **Any frontend change**: `git push origin main` → CF Pages auto-deploys in ~60s
- **Build command**: `npm run build` (runs assemble + Vite — do this before checking dist/)
- CF Pages serves from `dist/` (wrangler.jsonc)
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

- Chat UI in `src/templates/tab-assistant.html`, logic in `src/methods/assistant.js`
- **Two layouts, same chat state**: the Assistant tab (`tab-assistant.html`) renders the chat centered with `max-width:820px` so lines stay readable on wide/4K monitors. A 💬 button in the header (`src/index.html` tab-bar, always visible, disabled while already on the Assistant tab) opens the same chat as a 400px docked panel on the right (`assistant-dock.html`, `.assistant-dock` in `style.css`, `order:2` to always render rightmost regardless of DOM position) while browsing any other tab. Only one of the two is ever mounted at once (`assistantDockOpen && activeTab!=='assistant'`) — they'd otherwise collide on the shared `ref="chatScroll"`. Navigating to the Assistant tab auto-closes the dock (`closeAssistantDock()`); state persists to `localStorage` (`sf_assistant_dock_open`)
- Frontend POSTs `{messages, context}` to `POST {SF_WORKER_BASE}/_chat` — the `sf-cache` worker (`cf-worker/index.js`, `handleChat`) proxies to the Claude API server-side so the API key never reaches the browser
- Model: `claude-sonnet-5`, `output_config.effort: 'low'`, `max_tokens: 2500`, `thinking: {type: 'disabled'}` — `low` cut thinking-token spend by ~58% vs `medium` with no quality loss in testing (re-confirmed 2026-07-24: bumping to `medium` gave no measurable format-compliance improvement, only added cost, so stayed on `low`). **`thinking` must stay explicit**: `claude-sonnet-5` runs adaptive thinking by default when `thinking` is omitted (unlike `sonnet-4-6`, which defaulted to no thinking) — thinking output shares the `max_tokens` budget with the reply, so an omitted `thinking` param was silently consuming most of the 1500-token cap and truncating replies ~90% of the time (fixed 2026-07-24). `effort` alone does not disable thinking, only tunes its depth. `max_tokens` raised 1500→2500 the same day to give the structured lineup-advice format (below) headroom — replies were landing at ~1300-1400/1500 tokens.
- `buildChatContext()` in `assistant.js` summarizes the already-loaded squad, budget, and top-rated transfer targets (no extra API calls) and is sent as the system prompt context on every message. The squad line includes `p.fitnessPct` per player (same field Scout/Squad tabs and the player modal already show), so the assistant can factor in fitness when suggesting lineups — it previously had no fitness visibility at all
- **Player pricing in context**: the raw `Value` field is unreliable (low supply/high demand inflates real fees well above it), so `buildChatContext()` uses `trueVal(p)`/`trueValSrc(p)` (from `espionageMethods`, see Caching-adjacent player-value logic in `src/methods/espionage.js` `computeTrueValues()`) instead — last real transfer fee > active listing ask > recent negotiation signal > rating-scaled formula fallback. Context also includes a "recent real completed transfers" list (from `p._transferHistory`, real deals only) and the current transfer list with asking prices (`p._transferListed`/`p._listingAsk`), so the assistant has concrete comps instead of guessing
- **Lineup-suggestion signals in context**: the squad line in `buildChatContext()` includes 3 extra columns beyond fitness/TrueVal — `AltPosFit` (each player's `calcGameRating()` score at every other position in `SLOT_COMPAT[p.Position]`, so e.g. a converted DM whose FB rating is inflated by high Stamina shows its true CB score alongside it — same weighted-attribute formula as the main `Rating` column, just evaluated at a different position), `Ldr/Ment/Exp` (`Leadership`/`Mentality`/`Experience`, for captain suggestions — Leadership first since it should dominate the pick, not overall Rating), and `FK/Pen/Cor` (`Free kicks`/`Penalties`/`Corners` — real dedicated API attributes that existed on every player object but weren't used anywhere in the app before this). A guidance line after the squad table tells the assistant explicitly not to default to a player's listed Position/Rating alone for lineup calls, and that the game allows 5 subs (not 3) so it should propose using 3-5 of them with situational Plan/Timing combos rather than 1-2
- **Game mechanics reference in context**: `buildChatContext()` also includes a static block of fixed game rules — verified 2026-07-24 straight from the live submission form's JS bundle (`/submit-team-v2`, not from historical submission data, which carries stale option values from before game updates changed the dropdowns). Formation tiers by Analytics Dept level (see Clubs Tab section above); the 6 match-instruction dropdowns and their exact options (Mentality has 5 values incl. Very Attacking/Very Defensive; Pressing Intensity is only 4 options — High Press/Mid-Block/Low Block/Counter Press, despite older submissions containing now-retired values like Aggressive/Passive/Mixed); that penalty/free-kick "instructions" are just a taker assignment (only corners have real tuning — delivery/stay-back/zones for attacking, scheme/press/zones for defensive); and that there are 5 subs per match (not 3), each with a Plan (same 5 mentality values) and a Timing trigger (window × condition, where only the Half-time window offers "if losing" — the other 3 windows are winning/not-winning/any-situation only). The formation-unlock line also reports MY_CLUB's live Analytics Dept level via `this.clubFacData?.levels?.analytics` when available (populated by visiting the My Club/Youth tab this session — not pre-warmed like espionage data, so it may show as unloaded early in a session)
- **Structured lineup-vs-opponent replies**: when `this.espionageSubmissions` has data, `buildChatContext()` prepends a 6-section reply template (right after the club/budget header — deliberately the *first* substantive content in the prompt) for "how should I line up against X" questions: opponent breakdown (with a Thursday-plan/Friday-2pm-BST-deadline staleness check against `asOfWeek`) → a flat one-line-per-slot lineup with the captain marked inline as `(C)` → the 6 match instructions → exactly 5 subs split 3 "any situation" + 1 "if winning" + 1 "if not winning" → set-piece takers → a literal 4-line corner-tactics fill-in block (Delivery/Stay Back/Scheme/Press). A short checklist reminder is repeated as the very *last* line of the context (after match history), specifically calling out corner tactics and the flat-lineup format as the two things most likely to get dropped. **Position matters more than wording here**: an earlier version placed the identical instruction text in the middle of the context (after squad/targets/deals/transfer-list, before the opponent-tactics data table) and it failed 6/6 live tests — the model consistently merged/omitted the corner-tactics section and reverted to grouped prose for the lineup, regardless of how forcefully the instructions were worded, how much `max_tokens` headroom existed, or `effort: low` vs `medium`. Moving the *same* instructions to the start of the prompt (primacy) plus the tail reminder (recency) — a classic mitigation for the "lost in the middle" effect in long contexts — fixed it to 100% compliance across repeated tests. Trimmed `targets`/`recentDeals` slices (40→25, 30→20) at the same time to reduce competing content. Test via `select:WebFetch`-style direct `/_chat` POSTs (mock a minimal `this` with real fetched squad/submission data, call `assistantMethods.buildChatContext.call(mockThis)`, POST the result) — far more reliable than driving the actual browser, since local `vite preview` has no proxy for the `/sf-cache/*` relative-path calls `serverCacheGet`/`serverCacheSet` make (production CF Pages does), so opponent-tactics data never loads in a local headless test no matter how long you wait
- **Opponent tactics/lineups in context**: `buildChatContext()` also dumps every other club's most recent submission from `this.espionageSubmissions` (formation, mentality, style, XI) — this can be a not-yet-played gameweek's submitted plan, so it doubles as a "predicted XI" for an upcoming match, not just history. It's pre-warmed ~7s after player data loads regardless of active tab (`loadEspionage()` in `data.js`), so it's normally already in memory. Also includes the last 8 of MY_CLUB's results from `this.matchArchive` (opponent, score, both sides' formation/mentality) so tactical questions about recent form don't need a screenshot. There's no fixture/schedule endpoint anywhere in the app, so the assistant still can't be told who Arsenal plays *next* — only clubs' latest tactics and past results
- **Prompt caching**: the worker (`handleChat`) marks the system prompt and the second-to-last message with `cache_control: {type: "ephemeral"}` (5min TTL). `buildChatContext()` is deterministic, so the system prompt is byte-identical across messages in a session — cached reads cost ~10% of the uncached price. Verify hits via `usage.cache_read_input_tokens` (logged server-side, visible with `wrangler tail -c wrangler.toml` from `cf-worker/` — the plain `wrangler tail` without `-c` targets the wrong worker)
- **Attachments**: 📎 button attaches up to 3 files per message — images (always re-encoded to JPEG, downscaled to 1568px long edge via canvas), PDFs (sent as `document` blocks), or text/JSON/CSV files (inlined as a `text` block, capped at 20k chars). Message `content` is an array of Anthropic content blocks client-side; the worker (`sanitizeChatContent`/`sanitizeChatBlock`) revalidates every block server-side since `/_chat` has no auth. Attachments are stripped to a `[image attached]`/`[PDF attached]` placeholder before being written to `localStorage` to keep storage bounded — full attachment data only lives in memory for the current browser session
- **Multiple chat sessions**: `chatSessions` persist to `localStorage` (`sf_chat_sessions_v1`, `{sessions:[{id,title,messages,createdAt,updatedAt,aiTitled}], activeId}`, capped to last 20 sessions × last 30 messages each). Migrates the old single-thread `sf_chat_history_v1` key into a session on first load (marked `aiTitled:true` so it's never auto-renamed)
- **Chat sidebar**: a Claude-style collapsible rail on the left of the Assistant tab, `.assistant-sidebar`/`.assistant-sidebar.expanded` in `style.css` (44px ↔ 280px). `assistantSidebarExpanded` defaults to **expanded on wide screens** (`window.innerWidth >= 1300` at load) and collapsed otherwise — once the user explicitly toggles it via `toggleAssistantSidebar()`, that choice is persisted to `localStorage` (`sf_assistant_sidebar_expanded`) and wins over the width heuristic from then on. Expanded view lists sessions grouped by `chatSessionGroups()` (Today/Yesterday/Previous 7 days/Older, by `updatedAt`), each row hover-revealing rename (✎, `startRenameSession`/`commitRenameSession`) and delete (🗑) icons, with a native `:title` tooltip on the row so a truncated title is readable on hover. On mobile (`≤768px`) the expanded sidebar becomes a fixed-position drawer with a backdrop that closes it on tap. The session-list markup/CSS (`.chat-session-list`/`.chat-session-row`/`.chat-session-group-label`) is shared, not sidebar-exclusive — see the dock bullet below. The sidebar+chat pair is wrapped in a `max-width:1300px` block centered via the parent's `justify-content:center` (`tab-assistant.html`) — without it the sidebar sat pinned to the true left edge of the screen with the independently-centered chat column far off to the right on wide/ultrawide monitors
- **Dock has the same session-list features, as an overlay not a rail**: the 400px docked panel (`assistant-dock.html`) has no room for a persistent sidebar, so its header is a compact ☰ (toggles `assistantDockListOpen`) + "+ New" + ✕, and the ☰ opens `.assistant-dock-list` — an absolutely-positioned overlay that temporarily covers the message thread with the same grouped/rename/delete list as the tab sidebar, closing automatically on session switch. The overlay lives inside a `position:relative` wrapper around everything *below* the header, not the whole dock — it was originally a direct sibling of the header with `inset:0`, which visually covered the header too and made ☰ unclickable while open (the only way back to the chat was closing and reopening the whole dock). The overlay also has its own "✕ Close" row so closing doesn't depend on remembering what ☰ does
- **Assistant messages render as plain flowing text, not a boxed bubble** — only the user's own messages get the blue rounded bubble; assistant replies have no background/border, matching claude.ai's actual layout (was previously a bordered `#0d1117` box on both sides, which read as more "chat widget" than "assistant"). Chat column width is 900px (`tab-assistant.html`) vs 820px before
- **Stop / Regenerate**: `sendChatMessage()` and `regenerateLastResponse()` both funnel through `_requestAssistantReply(sessionId)`, which owns a per-request `AbortController` (`this._chatAbortController`). The Send button becomes a red "■ Stop" while `chatLoading` is true; `stopChatMessage()` aborts and sets `_chatStoppedByUser` so the abort doesn't surface as a "Failed to reach assistant" error. A "⟳ Regenerate" control appears under the last message whenever it's an assistant reply and nothing is loading — it splices that reply out of `chatMessages` and re-requests, reusing the same conversation history
- **`saveChatHistory(touchedId)`**: takes an optional session ID to bump — only that session's `updatedAt` changes and gets the fallback-title treatment. Renaming or deleting a *different* session must not reorder the list, so those call sites omit `touchedId`; only `sendChatMessage()` (the session whose messages actually changed) passes it. Passing the wrong ID (or defaulting to "whichever session is active") was a real bug caught in testing — renaming a background chat was bumping the *active* chat to the top
- **AI-generated titles**: after a session's very first assistant reply, `_maybeGenerateAiTitle()` fires once (gated by a per-session `aiTitled` flag, set immediately to avoid double-fires) and POSTs the first exchange to `{SF_WORKER_BASE}/_title` — a separate worker route (`handleTitle` in `cf-worker/index.js`) that calls `claude-haiku-4-5` (cheap/fast, no thinking, `max_tokens:16`). The prompt frames the exchange as inert data to *label*, not a message to respond to ("EXCHANGE (label this, do not respond to it)") — Haiku will otherwise sometimes answer the exchange in first person (esp. if the assistant's reply reads like a question), producing a sentence that gets cut off by `max_tokens` instead of a title. `handleTitle` also sanity-checks the result server-side (≤6 words, ≤50 chars, no mid-string sentence punctuation, doesn't start with "I"/"Sorry"/etc.) and returns an empty title rather than a bad one if it fails the check. Best-effort and fire-and-forget either way: on any failure or empty title the truncated first-message fallback (`_deriveChatTitle()`) stands. Manually renaming a chat also sets `aiTitled:true` so the AI title never overwrites a user's own rename
- **Markdown rendering**: assistant replies (not user messages, which stay plain `white-space:pre-wrap`) are rendered through `renderMarkdown()` (`src/utils.js`) via `v-html` with class `chat-md` — a small dependency-free parser (bold, `code`, headers, bulleted/numbered lists) rather than pulling in a markdown library. It HTML-escapes the raw text before reinserting markup, so it's safe to use with `v-html` even though `/_chat` has no auth. Styling lives in `style.css` under `.chat-md`
- **Setup required**: the worker needs an `ANTHROPIC_API_KEY` secret — get a key at console.anthropic.com (separate from a Claude Pro subscription, which doesn't include API access), then `cd cf-worker && npx wrangler secret put ANTHROPIC_API_KEY`
- No auth on the `/_chat` route itself (consistent with the worker's other admin routes) — relies on the worker URL not being published

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

- **Row/main closing tags live in the last content tab, not in the shell.** `src/index.html` opens `.main` and the flex row (`display:flex;flex:1;overflow:hidden`) but never closes them — the last tab partial in the include list must close both (see the trailing `</div><!-- end row -->` / `</div><!-- end .main -->` at the bottom of `tab-assistant.html`, mirroring modal.html's `<!-- end .layout -->`). This used to live in `tab-matches.html` when Matches was the last tab; when Assistant was added after it, those closing tags weren't moved, silently pushing every tab from Matches onward one+ DOM levels above the flex row (invisible for full-width tabs, but broke side-by-side layouts like the Assistant dock — fixed 2026-07-23). **If you reorder the tab includes in `src/index.html`, move these 2 closing divs to whichever partial is now last.**
- `xiPlayerInfo(name)` guards `typeof name !== 'string'` — stale cache can store objects as names
- `_normalizeSubs(s)` — called on both fresh fetch and localStorage load; fixes malformed subs entries
- Subs normalization handles JSON strings, stringified objects in the `name` field

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

After any meaningful change, update CLAUDE.md in the same or a follow-up commit.
