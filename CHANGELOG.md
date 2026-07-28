# General Changelog

Detailed history of non-trivial bugs/fixes outside the AI Assistant feature (see `AI-ASSISTANT-CHANGELOG.md` for that). Not auto-loaded into every Claude Code session; see `CLAUDE.md`'s "Known Quirks" section for the condensed, current-state version of each of these.

---

## UI/UX review fixes (2026-07-28)

Manual walkthrough of every tab at desktop (1440px) and mobile (768px), driven via Playwright with real game data seeded into localStorage (browser→game-API calls were blocked by this sandbox's TLS proxy, so data was fetched via curl and injected). Found and fixed:

- **Moneyball scatter charts all silently broken**: `drawMoneyballChart()` in `data.js` calls `new Chart(...)` but the file never imports Chart.js — it relied on `app.js`'s `import Chart from 'chart.js/auto'`, which is module-scoped and doesn't leak across files. Threw `ReferenceError: Chart is not defined` in the console with a blank canvas, easy to miss without opening devtools. Fixed by adding the import to `data.js` directly.
- **Moneyball sub-views all rendering at once**: the Market/Gems/Overperformers/Top-Lists/scatter-chart blocks in `tab-moneyball.html` were independent sibling `v-if`s instead of a `v-else-if` chain, so the (empty) scatter-chart section rendered underneath every other view regardless of which tab was selected. Fixed by chaining them.
- **Scout table columns unreachable on mobile**: at the 768px breakpoint, `.content{overflow:visible}` (needed so tall tabs flow into page-level scroll instead of double-scrolling) makes `.content` a flex item whose automatic min-width defaults to its widest descendant — Scout's bare `<table>` (no wrapper) dragged `.content` open to ~2455px with no scrollbar anywhere, clipped by `.main`'s row `overflow:hidden`. Verified via `getBoundingClientRect`/`scrollWidth` in a headless probe, not just visually. Fixed with **both** `min-width:0` on `.content` at 768px *and* a local `overflow-x:auto` wrapper around the table — confirmed neither alone was sufficient.
- **Assistant dock leaking background scroll on mobile**: the dock becomes a `position:fixed` full-screen overlay at 768px, but nothing locked the page behind it — scrolling while the dock was open silently scrolled the hidden tab underneath (confirmed via `window.scrollY` before/after a wheel event). Fixed with a `watch` on `assistantDockOpen` in `app.js` toggling `document.body.style.overflow` on mobile only; desktop (inline dock, not an overlay) is unaffected.
- **Analysis tab's dead-end empty state**: read "Loading match archive…" forever when no archive existed yet (the branch only renders once loading has already finished with nothing found) — reworded to point at Matches → "⚡ Build Archive".

## Removed dead code, incl. the old "Tactics" formation/style analysis feature (2026-07-28)

Code-quality review found ~21 methods/computed props with zero callers anywhere in the app (confirmed via repo-wide grep before and after each removal) — mostly small superseded helpers, but one full subsystem:

- **Tactics analysis** (`loadTactics()`, `drawTacticsCharts()`, `checkTacticsCache()` in `src/methods/data.js`/`espionage.js`, the `tacticsData`/`tacticsLoaded`/etc. state in `app.js`, the `sf_tactics_v4` KV cache key): scraped every club's recent match reports client-side to build formation/style win-rate stats, with its own chart canvases (`chart-formations`, `chart-form-pop`). No template ever called `loadTactics()` or rendered those canvases — the feature was fully superseded by the newer `loadAnalysisChunks()` / `analysisMatches` system that now powers the Analysis tab (`tab-analysis.html`), but the old code was never deleted when that happened. Removed entirely, including the cache key from CLAUDE.md's caching table.
- **"Subs DB" feature** (`loadSubsDb()`/`buildSubsDb()` in `matches.js`, `subsDbStats` computed, 6 related data props): same shape — a whole never-wired-up subsystem with no button or display anywhere.
- Assorted single dead functions: `fmtSubStatus`/`negoStatusStyle`/`negoSubStatusStyle`/`roleAttrs`/`auctionHighestBid`/`espSortBy`/`espSortIcon` (espionage — superseded by `negoStatusInfo()`, or tied to a sort feature since replaced by a dropdown), `facBonus` (youth — superseded by `facRef`), `playerStatsForTab` (superseded by the equivalent computed in `computed/modal.js`), `matchResultFor`/`posLabel` (clubs), `selectedClubEspData`, `buildSlotKeys`/`MAIN_ATTR`/`SUBMISSIONS_CACHE_TTL`, and 6 youth-history rating computeds duplicating logic already covered by `youthFilteredHistory`/`youthHistFiltered`.

Net: ~300 lines removed, `dist/app.js` down from 767.5KB to 748.2KB uncompressed (220.2KB → 215.0KB gzip).

## Game API concurrent-request limit (2026-07-24)

`loadEspionageSubmissions()` (`src/methods/clubs.js`) used to fetch every club's submissions via a single `Promise.all()` over all ~55 clubs at once. Verified directly that this causes roughly half the requests to time out or get connection-reset by `slowfootball.club` — the game API can't handle that much fully-concurrent load from one client. Worse, `_fetchClubSubmissions()`'s catch block used to cache the failure as `{}`, and its guard (`submissionsCache[club] !== undefined`) treats any cached value — including that empty one — as "already fetched, don't retry," so a club caught in the overload was silently blacklisted from ever loading real data for the rest of the session.

Fixed by (1) batching the fetches 8-at-a-time — matches the pattern `loadEspionage()`'s own staff/facilities fetch already uses — which alone cut the failure rate from ~54% to ~7% in testing, (2) leaving `submissionsCache[club]` unset (not `{}`) on failure so it stays retryable, and (3) a second batched retry pass over whatever's still missing after the first pass.

Symptom when this was broken: the AI Assistant confidently saying "I don't have scouting data on [opponent]" even though the club clearly had submissions and other clubs' data loaded fine.

## Row/main closing-tags landmine (fixed 2026-07-23)

`src/index.html` opens `.main` and the flex row (`display:flex;flex:1;overflow:hidden`) but never closes them — the last tab partial in the include list has to close both. This used to live in `tab-matches.html` when Matches was the last tab; when the Assistant tab was added after it, those closing tags weren't moved, silently pushing every tab from Matches onward one+ DOM levels above the flex row. Invisible for full-width tabs, but broke side-by-side layouts like the Assistant dock. Fixed by moving the closing `</div><!-- end row -->` / `</div><!-- end .main -->` to the bottom of `tab-assistant.html` (mirroring `modal.html`'s `<!-- end .layout -->`).
