# Session Context — Slow Football Analytics

> Use this file at the start of a new Claude Code session to get up to speed instantly.

---

## Project Summary

Single-page Vue 3 app (CDN, no build) for fantasy football analytics at **https://sf.ofersi15.workers.dev**
Repo: **https://github.com/ofersi15/slow-football**
Auto-deploys from `main` branch via Cloudflare Pages (~60s).
Always commit + push after every change.

Files: `index.html` (template), `app.js` (all logic), `style.css`, `cf-worker/index.js` (KV cache worker)

---

## Tabs Built

- **Standings** — league table
- **Player Stats** — filterable stats table, partial-badge for incomplete players
- **Trade Analyzer** — compare rosters
- **Espionage** — opponent scouting, auto-loads on start
- **Youth** — scouting jobs, academy, history scan
- **Auction Draft** — budget tracker
- **Clubs tab** — includes "Latest XI" sub-tab with interactive pitch visualization

---

## Clubs Tab / Latest XI — Current State

### What's built
- Pitch SVG (`viewBox="-3 -3 74 111"`, max-width 480px, max-height 78vh)
- Players shown as colored circles with position/name/rating labels
- **Run arrows** (dashed lines with arrowheads) from each player toward their run target
- Hover tooltip: all 12 attrs + fitness/form/morale
- Subs panel (right sidebar)
- Roles panel (captain/penalty/freekick/corner)
- "↺ Reload" button to force-refresh submission
- **Last club persistence**: saves `sf_last_club` to localStorage, restores on page load (800ms delay)
- "View XI" button in clubs table
- Full squad table below pitch (sortable)

### Run Arrow Coordinate System (HARD-WON — do not change without reason)

The game API stores runs in `submission.runs` keyed by slot (WM1, WM2, CM1, CM2, FB2, etc.).

**xi array order**: right-side players first → [GK, RFB, RCB, LCB, LFB, RWM, RCM, LCM, LWM, RCF, LCF]
**Slot numbering**: slot1 = right-side (first of each type), slot2 = left-side (second of each type)

**Coordinate formulas** (in `pitchLayout()` in app.js):

```javascript
// x: game uses 0–90 unit width spanning 68m pitch
runX = (run.x / 90) * 68

// slot1 (right-side: WM1, CM1, FB1...):
// Game uses 150-unit coord space; pitch = y[27.5, 122.5] (95 units = 105m SVG)
runY = (run.y - 27.5) / 95 * 105

// slot2 (left-side: WM2, CM2, FB2...):
// Flipped: y=0→GK end, y=100→attacking end
runY = 105 - (run.y / 100) * 105
```

**Verified against game screenshot** with Leverkusen 442 formation:
| Player | Slot | Expected direction | Result |
|--------|------|--------------------|--------|
| Martinelli | WM1 | Straight up, past CF | ✓ x≈60, y≈12 |
| Palacios | CM1 | Down-left toward DM | ✓ x≈38, y≈68 |
| Maza | CM2 | Up-right toward CF | ✓ x≈37, y≈36 |
| Tella | WM2 | Up-right toward center | ✓ x≈22, y≈36 |
| Grimaldo | FB2 | Up left flank | ✓ x≈12, y≈32 |

### FORMATION_SLOT_POS

SVG coords: x 0–68 (left→right), y 0–105 (attacking→GK). API sends right-side first, so x-values in the positions array are manually placed correctly (right players at higher x).

```javascript
'442': [GK(34,97), RFB(60,78), RCB(45,78), LCB(23,78), LFB(8,78),
        RWM(59,55), RCM(44,55), LCM(24,55), LWM(9,55), RCF(44,20), LCF(24,20)]
```

---

## Key Architecture Notes

- **No build step** — Vue 3 runtime-only via CDN. Template in `index.html`, logic in `app.js`.
- **Never put `</script>` at end of app.js** — breaks HTML parser.
- **Cache**: `SF_CACHE_BASE` points to `sf-cache.ofersi15.workers.dev` on prod, `/sf-cache` locally.
- **My club**: `MY_CLUB = 'Leverkusen'`
- **Cache keys**: `sf_players_v6`, `sf_stats_v1`, `sf_tactics_v4`, `sf_submissions_all_v1`

---

## Known Quirks

- 32 players have `_incompleteStats` (only 4 position-key attrs) — shown with orange "partial" badge
- Submission fetch: `openClubDetail(clubName)` — force-fetches fresh data, caches it
- `mounted()` restores last club with `setTimeout(() => this.openClubDetail(lastClub), 800)`

---

## Possible Next Tasks (not yet built)

- Run arrow accuracy fine-tuning for other formations (currently only validated on 442)
- Player click → full profile view from the pitch
- Any other features Ofer requests
