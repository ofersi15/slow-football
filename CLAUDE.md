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
- Model: `claude-sonnet-5`, `output_config.effort: 'low'`, `max_tokens: 6500`, `thinking: {type: 'adaptive'}`. History here (all 2026-07-24, same day): started at `thinking: {type: 'disabled'}` + `max_tokens: 1500` because an *omitted* `thinking` param runs adaptive by default on `claude-sonnet-5` (unlike `sonnet-4-6`, which defaulted to no thinking) and was silently eating most of the 1500-token cap, truncating replies ~90% of the time — disabling it explicitly fixed that and `max_tokens` was raised to 2500 for headroom. But once the lineup-advice template (below) got precision-heavy — cross-checking three attribute columns for set-piece takers, comparing fitness numbers, computing GW staleness — thinking-disabled started producing a *different* failure mode: self-contradictory sub-timing values and visible "actually check: Saka 70/80/85, Eze..." scratch-work leaking into the reply, because the verification work had nowhere to happen except inline in the visible text. **Re-enabling adaptive thinking fixed this**, verified directly: same prompt, thinking off → wrong/inconsistent set-piece picks and leaked reasoning; thinking on → correct picks every time ("highest Cor attribute in the XI at 88"), clean output, no leakage. `budget_tokens` is fully removed on `claude-sonnet-5` (400s) — `{type: 'adaptive'}` is the only on-mode; depth is tuned via `effort`, not a token budget. `effort: 'medium'` was tested too (with thinking still disabled, before this fix) and gave no measurable improvement over `low`, so `low` stayed — that test is why thinking was suspected as the actual variable once precision issues persisted at `medium`. `max_tokens` raised 2500→6500 for adaptive thinking's own token spend: a real test used ~2200-2500 thinking tokens + ~1550-1800 visible-reply tokens (~4000 total) for a full 6-section reply — 6500 leaves margin without being wasteful. This does raise real per-message cost (thinking tokens are billed); re-test `max_tokens`/whether thinking is still needed if `buildChatContext()` changes significantly.
- **Structured outputs for lineup-vs-opponent replies** (2026-07-24): even with adaptive thinking, the free-text 6-section template kept producing small mechanical errors — self-contradictory sub timing, occasionally the corner-tactics section still missing. Rather than continuing to prompt-engineer free text, "how should I line up against X" questions now get JSON-schema-constrained output instead. `_isLineupVsOpponentQuestion(text)` in `assistant.js` is a **cheap client-side regex heuristic** (lineup-intent phrase + "against"/"vs" + a real club name from `allPlayers`) — not an LLM call — that sets `lineupMode: true` on the `/_chat` POST only for this specific question type; every other question (transfers, scouting, general squad talk) is unaffected. `cf-worker/index.js` then adds `output_config.format: {type:'json_schema', schema: LINEUP_SCHEMA}` to the Anthropic request, so e.g. a sub's timing field is a real `anyOf` union matching the game's actual window/condition combos (scraped from `submit-team-v2`'s own JS — only the Half-time window offers "if losing") — a malformed pairing is now structurally impossible to generate, not just discouraged by wording. **The frontend needed zero changes**: `formatLineupReply()` in the worker converts the parsed JSON into the exact same markdown look a free-text reply would have produced, before it's ever returned as `{reply: "..."}` — same response contract as always. Real pitfalls hit building this, in order: (1) `minItems`/`maxItems` above 0/1 are rejected by Claude's structured-outputs schema subset ("complex array constraints not supported") — the "exactly 11 lineup slots / exactly 5 subs" counts are prompt-level `description` text now, not schema-enforced, since item *shape* (where the real bugs were) doesn't need it; (2) the original schema required ~13 separate free-text reasoning fields (one per instruction, one per sub) and at `effort:'low'` several came back as the literal string `"placeholder"` — schema-valid, content-garbage; (3) tried `effort:'medium'` to fix it — thinking ballooned to ~7950 of an 8500-token budget and truncated the JSON entirely, too expensive to be the fix; (4) consolidating to one reasoning paragraph per section fixed it on the first test, then it recurred on the second — the failure is genuinely probabilistic, not deterministic, and always starts at the same point in property-declaration order regardless of remaining token budget (fields before that point are reliably real content, fields after are placeholder). Final fix, verified clean across 3 consecutive live tests: reordered schema properties so every mechanically-important field (lineup, instructions enums, subs, set pieces, corner enums) is declared *before* any free-text reasoning field, made every reasoning/overview field optional (omitted from its object's `required`, so a degraded generation can legitimately skip it instead of filling it with filler that still passes validation), and added `cleanText()` in the worker as a last-line-of-defense regex scrub (`/^\s*(placeholder|tbd|n\/?a|todo|xxx?)\s*\.?\s*$/i`) that blanks any field matching common LLM filler-text patterns before formatting — belt-and-suspenders in case a future schema change reintroduces the failure mode. Test via the pattern in the bullet below (mock `this`, call `buildChatContext()`), but also pass `lineupMode: true`/`false` in the POST body and, for the true case, grep the reply for stray `placeholder`/`?` occurrences and count lineup slots (`grep -cE '^(GK|RB|CB|LB|DM|RW|AM|LW|CF):'`) and sub lines (`grep -c "IN for"`) to confirm exactly 11/5 — run at least 2-3 times given the probabilistic failure mode, a single clean run doesn't prove the fix
- `buildChatContext()` in `assistant.js` summarizes the already-loaded squad, budget, and top-rated transfer targets (no extra API calls) and is sent as the system prompt context on every message. The squad line includes `p.fitnessPct` per player (same field Scout/Squad tabs and the player modal already show), so the assistant can factor in fitness when suggesting lineups — it previously had no fitness visibility at all
- **Player pricing in context**: the raw `Value` field is unreliable (low supply/high demand inflates real fees well above it), so `buildChatContext()` uses `trueVal(p)`/`trueValSrc(p)` (from `espionageMethods`, see Caching-adjacent player-value logic in `src/methods/espionage.js` `computeTrueValues()`) instead — last real transfer fee > active listing ask > recent negotiation signal > rating-scaled formula fallback. Context also includes a "recent real completed transfers" list (from `p._transferHistory`, real deals only) and the current transfer list with asking prices (`p._transferListed`/`p._listingAsk`), so the assistant has concrete comps instead of guessing
- **Lineup-suggestion signals in context**: the squad line in `buildChatContext()` includes 3 extra columns beyond fitness/TrueVal — `AltPosFit` (each player's `calcGameRating()` score at every other position in `SLOT_COMPAT[p.Position]`, so e.g. a converted DM whose FB rating is inflated by high Stamina shows its true CB score alongside it — same weighted-attribute formula as the main `Rating` column, just evaluated at a different position), `Ldr/Ment/Exp` (`Leadership`/`Mentality`/`Experience`, for captain suggestions — Leadership first since it should dominate the pick, not overall Rating), and `FK/Pen/Cor` (`Free kicks`/`Penalties`/`Corners` — real dedicated API attributes that existed on every player object but weren't used anywhere in the app before this). A guidance line after the squad table tells the assistant explicitly not to default to a player's listed Position/Rating alone for lineup calls, and that the game allows 5 subs (not 3) so it should propose using 3-5 of them with situational Plan/Timing combos rather than 1-2
- **Game mechanics reference in context**: `buildChatContext()` also includes a static block of fixed game rules — verified 2026-07-24 straight from the live submission form's JS bundle (`/submit-team-v2`, not from historical submission data, which carries stale option values from before game updates changed the dropdowns). Formation tiers by Analytics Dept level (see Clubs Tab section above); the 6 match-instruction dropdowns and their exact options (Mentality has 5 values incl. Very Attacking/Very Defensive; Pressing Intensity is only 4 options — High Press/Mid-Block/Low Block/Counter Press, despite older submissions containing now-retired values like Aggressive/Passive/Mixed); that penalty/free-kick "instructions" are just a taker assignment (only corners have real tuning — delivery/stay-back/zones for attacking, scheme/press/zones for defensive); and that there are 5 subs per match (not 3), each with a Plan (same 5 mentality values) and a Timing trigger (window × condition, where only the Half-time window offers "if losing" — the other 3 windows are winning/not-winning/any-situation only). The formation-unlock line also reports MY_CLUB's live Analytics Dept level via `this.clubFacData?.levels?.analytics` when available (populated by visiting the My Club/Youth tab this session — not pre-warmed like espionage data, so it may show as unloaded early in a session)
- **A sub's Plan is a mentality override, not a player description — verified straight from the game's own JS**: `/submit-team-v2`'s form literally labels the field "Instruction" (not "Plan"), using the same 5-value mentality scale as the top-level Mentality setting. Per the owner (who observes actual match outcomes, which the client-side JS can't reveal): the value takes effect from that substitution onward and **persists as the new baseline mentality** until a later sub sets a different one — it isn't a per-player label. A real reply had all 3 "any situation" subs default to "Balanced" while the match started on "Attacking" — since only the first of those three subs was actually a change (the other two were just re-stating what was already in effect), the net effect was a silent, unintended downgrade to Balanced for most of the second half. Fixed in both `buildChatContext()`'s game-mechanics reference and the Section 4 template, plus the `subs` array's schema `description` in `cf-worker/index.js` (LINEUP_SCHEMA) for the structured path: the 3 "any situation" subs should carry the SAME Plan as the match's starting Mentality by default, and only the "if winning" (toward Defensive) / "if not winning" (toward Attacking/Very Attacking) subs should actually change it, since those are where a deliberate mentality shift is the point
- **CB/FB/DM candidate comparison was unreliable — a real reply moved Schouten (DM) to CB at a rating of 78.5, *lower* than his own DM rating of 82.0**: a straight downgrade with no offsetting benefit, confirmed against live squad data. Root cause looked like sequential, non-holistic decision-making — the model settled on a flexible player for one slot (e.g. Mukiele at LB) without re-checking whether that left a genuinely worse combination elsewhere, then filled the remaining CB slot with whoever was left over rather than reconsidering the earlier choice. Same reply also started two lower-rated fit DMs over a higher-rated one (Zubimendi, 81.0 own rating) with no stated reason — defensible if it's about his lower fitness (79% vs 100%), but that reasoning never appeared in the reply, so there's no way to tell a deliberate call from an oversight. Section 2's guidance now explicitly requires listing every viable candidate (natural + flexible) for each contested CB/FB/DM slot before finalizing, forbids repositioning a player to a slot rated *lower* than their own natural position (never a real trade), and requires a stated reason whenever a higher-rated fit natural candidate is left unused. Verified clean across 2 live tests: Schouten stayed at DM, Hincapie/Mukiele were the CB pair both times, no natural-position-downgrade swaps
- **Structured lineup-vs-opponent replies**: when there's opponent submission data (see `submissionsCache` note above), `buildChatContext()` prepends a 6-section reply template (right after the club/budget header — deliberately the *first* substantive content in the prompt) for "how should I line up against X" questions: opponent breakdown (with a Thursday-plan/Friday-2pm-BST-deadline staleness check against `asOfWeek`) → a flat one-line-per-slot lineup with the captain marked inline as `(C)` → the 6 match instructions → exactly 5 subs split 3 "any situation" + 1 "if winning" + 1 "if not winning" → set-piece takers → a literal 4-line corner-tactics fill-in block (Delivery/Stay Back/Scheme/Press). A short checklist reminder is repeated as the very *last* line of the context (after match history), specifically calling out corner tactics and the flat-lineup format as the two things most likely to get dropped. **Position matters more than wording here**: an earlier version placed the identical instruction text in the middle of the context (after squad/targets/deals/transfer-list, before the opponent-tactics data table) and it failed 6/6 live tests — the model consistently merged/omitted the corner-tactics section and reverted to grouped prose for the lineup, regardless of how forcefully the instructions were worded, how much `max_tokens` headroom existed, or `effort: low` vs `medium`. Moving the *same* instructions to the start of the prompt (primacy) plus the tail reminder (recency) — a classic mitigation for the "lost in the middle" effect in long contexts — fixed it to 100% compliance across repeated tests. Trimmed `targets`/`recentDeals` slices (40→25, 30→20) at the same time to reduce competing content. Test via `select:WebFetch`-style direct `/_chat` POSTs (mock a minimal `this` with real fetched squad/submission data, call `assistantMethods.buildChatContext.call(mockThis)`, POST the result) — far more reliable than driving the actual browser, since local `vite preview` has no proxy for the `/sf-cache/*` relative-path calls `serverCacheGet`/`serverCacheSet` make (production CF Pages does), so opponent-tactics data never loads in a local headless test no matter how long you wait
- **Matchup-driven reasoning, not generic prose**: the template above got tightened further (2026-07-24) after real testing showed the model drifting into generic tactical filler and, worse, once nonsensically swapping two players' positions (a CB and an FB into each other's slots) with no stated reason. Fixes, all verified against a live reply: (1) a primer line before Section 1 tells the model to work out concrete personnel matchups (e.g. "my RW vs their LB", "my RB+RW combo vs their LB+LW") and let that drive the whole reply, not just the opening paragraph; (2) Section 1 now explicitly requires naming at least one specific matchup rather than team-level strengths/weaknesses; (3) Section 2's lineup lines are `SLOT: Player Name (rating)` — the rating at whichever slot they're actually playing, i.e. their own `Rating` or the matching `AltPosFit` number — and repositioning a player off their natural position now requires citing both numbers in the reasoning paragraph, which is what stops the unexplained-swap failure mode; (4) Sections 3 and 4 (instructions, subs) each require a short reason tied to the specific matchup, not boilerplate; (5) the game mechanics reference gained a fact the live submit-team-v2 JS already encodes: corner Delivery has a fixed target zone baked in (Inswinger→far post, Outswinger→near post, Driven→penalty spot, Short Corner→pulls a defender wide) — you don't pick delivery and target independently — and Section 6 now reasons from that instead of treating Delivery as a free cosmetic choice. The end-of-context checklist was extended to match (verify the Attacking Focus picked actually matches the personnel in Section 2, no unexplained swaps, a named matchup in Section 1)
- **Further real-usage fixes (2026-07-24, same day)**: (1) **GW staleness is now computed deterministically, not left to the model** — `submissionGwStatus()` in `buildChatContext()` compares a submission's real timestamp against the current real-world Saturday-Friday calendar week and tags each opponent-tactics row "current"/"stale, Nd before"/"future, Nd after". First attempt computed the window as `GAME_START + asOfWeek * WEEK_MS`, mirroring the formula `estCurrentWeek()` uses in `utils.js` — wrong, caught by testing: gameweeks here don't tick a strict real-time 7-day cadence from that fixed epoch (this is a manually-paced league), so a submission made in the literal same instant as the request got flagged "14 days in the future." Rewritten to anchor on `new Date()` directly (most recent real Saturday 00:00 UTC through the next), matching the owner's actual rule: a submission is current if it falls in this calendar week, full stop, independent of any GW number. (2) **Section 2's reasoning paragraph now comes BEFORE the flat lineup list**, not after, and must describe any off-listed-position call in plain language with both rating numbers — the literal string "AltPosFit" (this app's internal column name) is banned from ever appearing in a reply. (3) Lineup lines now also carry fitness (`SLOT: Name (rating, fitness%)`). (4) Added holistic-assignment guidance for multiple flexible forwards, since a real test had the model move one player to a worse slot to accommodate another without checking whether the group's *total* rating actually improved — e.g. it took Keegan (own CF 81.0, but AM alt 81.8) and Eze (own AM 81.0, but WF alt 81.8) and put Eze at AM/Keegan at CF, the lower-scoring pairing, rather than swapping them to each play their own better slot. (5) Section 5 (set-piece takers) now requires checking Penalties/Free kicks/Corners independently per player in the XI — a real test had it hand all three to one player (Yılmaz) who wasn't actually the squad's best at any of them; verified directly against squad data (Ødegaard FK 85 / Saka Pen 80 / Ødegaard Cor 88 all beat Yılmaz's 69/69/79). Post-fix testing showed the model visibly self-correcting mid-reply ("actually check: Saka 70/80/85, Eze 78/76/74, Ødegaard 85/75/88 — Ødegaard has the highest FK") — real improvement, though not yet perfect (it caught the free-kick error but still missed that Ødegaard's Corners number also beat Saka's in that same reply). **Known remaining gap**: the exact rating number shown next to a repositioned player isn't always precisely the right one — same player, same number, shown for two different slots across two separate test runs where the true per-slot numbers differ by ~0.75. The structural ask (show *a* rating, reason in plain language) is being followed reliably; exact numeric lookup accuracy isn't fully solved and would need further verification if it matters for a specific case
- **Fitness/rotation judgment**: a real test had the model start a fatigued, lower-value pick (Saka, 82 rating, 63% fit) over a fresher, *higher*-rated bench option (Yılmaz, 82.25 rating, 100% fit) — i.e. it wasn't even a real rating-vs-freshness tradeoff, the numbers pointed the same direction and it still picked the tired name, apparently on reputation. Section 2's guidance now says explicitly: if a fresher alternative's rating is equal to or higher than a fatigued starter's, start the fresher player, and a small rating edge for the tired player alone isn't worth the fitness risk — only keep them in for a stated reason beyond raw rating (a specific matchup skill, set-piece duties, captaincy). Verified directly: the fixed version now benches both Saka (63%) and Ødegaard (59%) in favor of fresher options and explicitly reasons about it ("their ratings don't clear the bar to justify starting over fresher, comparable options"), and separately preferred a fresher, marginally *lower*-rated Gravenberch (79.5, 100%) over a more tired, marginally higher-rated Merino (80, 72%) — the fitness-over-small-rating-edge principle generalizing correctly, not just pattern-matching the one example tested
- **Holistic-assignment guidance for multiple flexible forwards, since a real test had the model move one player to a worse slot to accommodate another without checking whether the group's *total* rating actually improved** — extended 2026-07-24 to also cover the CB/FB/DM cluster, per direct owner feedback: a real reply moved Zubimendi (DM, one of the stronger rotation options there) out to LB purely because his formula rating there (82.5) narrowly beat Calafiori's own FB rating (80), without weighing that Arsenal's DM pairing is thinner without him. The owner's framing, generalized rather than hardcoded to specific players (so it still holds after squad changes): "would I actually play this player out of position, or only in an emergency?" usually comes down to whether they're a genuine contributor at their natural spot or just depth there — Lerma at FB is fine because Arsenal isn't giving up much at DM to get him there, Zubimendi at FB isn't, because he is one of the stronger DM options. Section 2's guidance and the end-of-context checklist now both say explicitly: weigh what a reposition costs the position being *left*, not just the rating gained in the new slot — a player who's genuine squad depth at their natural spot can move fairly freely if the numbers favor it, one of the stronger options there generally shouldn't unless the alternate-slot edge is substantial, there's other strong cover left behind, or it's a genuine personnel emergency. Verified directly across 2 live tests: the model now avoids moving Zubimendi at all, instead identifying **Gravenberch** — DM rating 79.5, explicitly described in the reply as "pure squad depth behind Schouten/Zubimendi/Lerma/Merino at DM" — as the one to shift to FB instead, "costing us little at DM given the depth there." Same underlying idea (move the replaceable one, not the valuable one), correctly generalized to different personnel without being told the specific names
- **Opponent tactics/lineups in context**: `buildChatContext()` also dumps every other club's most recent submission (formation, mentality, style, XI) — this can be a not-yet-played gameweek's submitted plan, so it doubles as a "predicted XI" for an upcoming match, not just history. It's pre-warmed ~7s after player data loads regardless of active tab (`loadEspionage()` in `data.js`), so it's normally already in memory. **Reads `this.submissionsCache` directly, not `this.espionageSubmissions`** (fixed 2026-07-24) — `espionageSubmissions` is a snapshot only (re)computed once by `loadEspionageSubmissions()` during the bulk prewarm, whereas `submissionsCache` is the shared cache every fetch path writes into, including a single club's Clubs-tab detail page (`openClubDetail()` → one reliable, non-concurrent fetch). Reading the snapshot meant a club could be sitting right there in `submissionsCache` (e.g. from the user just having browsed to that club's page) and the Assistant would still say "no data" because the snapshot was never refreshed to include it. `espionageSubmissions` itself is unchanged and still powers the quick formation/mentality/corner badges on the Clubs-tab list view (`tab-clubs.html`) — this fix only changes what the Assistant reads. Also includes the last 8 of MY_CLUB's results from `this.matchArchive` (opponent, score, both sides' formation/mentality) so tactical questions about recent form don't need a screenshot. There's no fixture/schedule endpoint anywhere in the app, so the assistant still can't be told who Arsenal plays *next* — only clubs' latest tactics and past results
- **Context truncation — was a live bug**: `handleChat` truncates `body.context` (`context.slice(0, N)` in `cf-worker/index.js`) before it ever reaches the model — this cap is separate from `MAX_CHAT_BODY_BYTES` (20MB, the whole-request safety limit) and was silently discarding data. At full realistic scale — real squad + full ~48-club opponent-tactics table + transfer targets/deals/listings — `buildChatContext()` produces ~27-28k characters. The cap was 16,000 (fixed 2026-07-24, raised to 120,000): the trailing ~40% of the prompt, including the entire "Opponent tactics" table, was silently cut off every time, so lineup-vs-opponent questions got "I don't have scouting data on X" even with the data fully loaded client-side. This was likely borderline-broken even before the 2026-07-24 Assistant additions (game mechanics reference, extra squad columns, 6-section template) — those added ~7-8k characters that pushed an already-marginal ~20k-char context solidly over the old 16k cap, turning an occasional failure into a reliable one. **If `buildChatContext()` grows further, re-verify context size against this cap** — test via a direct `/_chat` POST with a large mocked context (see the lineup-vs-opponent bullet above for the harness pattern) rather than trusting the browser, since truncation is silent (no error, just a shorter prompt) and easy to miss
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
- **Phase 9 fixes (2026-07-25), from real live-reply feedback**: five issues reported against a live Aston Villa lineup reply, all fixed and live-verified. (1) **GW window is now 9pm-BST-anchored, not midnight-UTC-anchored** — per explicit correction ("we can extend the gw, say from saturday 9pm bst to saturday 9pm bst"), `buildChatContext()`'s window computation now derives London's real UTC offset via `Intl`/`toLocaleString` diffing (so it tracks BST/GMT automatically) and anchors the Sat-Fri window to 9pm London-wall time on the most recent Saturday, not midnight. (2) **Reasoning-before-list bug in structured output**: `formatLineupReply()` (`cf-worker/index.js`) was rendering `lineup_reasoning` AFTER the flat lineup list — the opposite of the established free-text rule, and a regression introduced when the structured-output formatter was first built and never re-checked against this specific earlier requirement. Fixed by moving it before the list. (3) **Set-piece ratings missing from structured output**: the free-text template always showed e.g. "(80 Pen)" next to a taker's name, but `LINEUP_SCHEMA`'s `set_pieces` object only had name fields, no numbers — a real regression versus free-text mode. Fixed by adding `penalty_rating`/`freekick_rating`/`corner_rating` number fields to the schema and formatter. (4) **Fitness-comparison reasoning citing irrelevant players**: a live reply justified keeping a fatigued starter in by citing a different, unrelated player's numbers rather than the real alternative for that slot — padding that doesn't actually establish anything. Fixed with an explicit rule that any fitness/rotation comparison must be between the fatigued starter and the real candidate(s) for that specific slot, or state plainly that no realistic fresher alternative exists. (5) **Zubimendi-to-FB opportunity-cost loophole, recurring a third time**: Phase 8 added an opportunity-cost principle (a first-choice DM shouldn't move to FB just because the alt-position rating is marginally higher) but live testing found the model treating "the position has other strong fit cover" (DM depth) as alone sufficient justification to make the move — the guidance had listed substantial-edge / strong-cover / emergency as three OR'd conditions, so satisfying any one was enough, and "we have other good DMs" alone kept satisfying it. Root-caused directly from a live reply's own words: *"with Schouten, Gravenberch and Lerma all fit and strong at DM, moving him out there costs us little cover."* Fixed by rewriting the rule so squad depth and rating edge are two SEPARATE requirements that must both hold, not either/or — depth elsewhere makes a move survivable, not automatically worthwhile — plus an explicit note that a specialist holding/destroyer-type DM's real defensive-midfield value is often undersold by the formula while a flattering alternate-position number can come from just one or two shared physical attributes, so treat a large edge for this specific player type with extra skepticism versus a generic squad player. Verified 3/3 clean live runs post-fix (previously 1/3 failed with the OR-based wording): Zubimendi stayed at DM every time, and one run showed the fix generalizing correctly rather than just avoiding the literal named case — it moved Gravenberch to FB instead, explicitly reasoning "Zubimendi and Schouten hold that pivot" (i.e. correctly identifying Gravenberch, not Zubimendi, as the one who was squad depth). Test harness: mocked `this` from real fetched Arsenal/Aston Villa squad + submissions data (`/api/submissions?club=X` returns `{items:[...]}`, not a bare array or `{submissions:[...]}, and has no `gameweek` field — key by `submissionId` instead), called `buildChatContext.call(mockThis)`, POSTed to the deployed worker with `lineupMode:true`, repeated 3x.
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

- **The game API can't handle ~55 fully-concurrent requests from one client — batch club-list fetches.** `loadEspionageSubmissions()` (`src/methods/clubs.js`) used to fetch every club's submissions via a single `Promise.all()` over all ~55 clubs at once; verified directly (2026-07-24) that this causes roughly half the requests to time out or get connection-reset by `slowfootball.club`. Worse, `_fetchClubSubmissions()`'s catch block used to cache the failure as `{}`, and its guard (`submissionsCache[club] !== undefined`) treats any cached value — including that empty one — as "already fetched, don't retry," so a club that got caught in the overload was silently blacklisted from ever loading real data for the rest of the session. Fixed by (1) batching the fetches 8-at-a-time — matches the pattern `loadEspionage()`'s own staff/facilities fetch already uses — which alone cut the failure rate from ~54% to ~7% in testing, (2) leaving `submissionsCache[club]` unset (not `{}`) on failure so it stays retryable, and (3) a second batched retry pass over whatever's still missing after the first pass. Symptom when this was broken: the AI Assistant confidently saying "I don't have scouting data on [opponent]" even though the club clearly had submissions and other clubs' data loaded fine — any code that depends on `this.espionageSubmissions`/`submissionsCache` having a specific club is exposed to this if it's ever changed back to a single unbounded `Promise.all()`
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
