import { FACILITY_UPGRADE_COST, FACILITY_MAINTENANCE_RATES, FACILITY_LEVEL_FACTS, FACILITY_MAX_LEVEL_CONFIRMED } from '../constants.js'

const HIST_PAGE_SIZE = 50;
// Facilities with a confirmed flat (non-banded) weekly upkeep, safe to diff level-to-level.
// Training/Academy upkeep is banded by squad/academy headcount plus an unconfirmed flat "lump"
// component (seen once, £15k, never isolated from level) — not modeled here to avoid guessing.
const FLAT_UPKEEP_KEYS = new Set(['stadium', 'scouting', 'medical', 'analytics']);

// Shared sort ladder for the youth-history views. `youthFilteredHistory` (compact, sorts raw
// job rows) and `youthHistFiltered` (full, sorts youthHistJobsEnriched rows) both drive off the
// same `youthHistSort` state and column set, differing only in which rows already carry
// precomputed bestpos/men/wr fields — the `??` fallback below calls the live scout methods for
// whichever view doesn't have them, matching what each view's original ladder did.
function youthHistSortValue(item, key, ctx) {
  switch (key) {
    case 'date':      return new Date(item.createdAt).getTime() || 0;
    case 'rating':    return item.player?.rating ?? item.player?.Rating ?? 0;
    case 'age':       return item.player?.age ?? item.player?.Age ?? 0;
    case 'value':     return item.player?.value ?? item.player?.Value ?? 0;
    case 'name':      return item.player?.name ?? item.player?.Player ?? '';
    case 'pos':       return item.player?.position ?? item.player?.Position ?? '';
    case 'buynow':    return item.buyNow || 0;
    case 'status':    return item._jobStatus ?? item.status ?? '';
    case 'sclub':     return item._club ?? '';
    case 'bestpos':   return item._bestPosRating ?? ctx.scoutBestPos(item.player)?.rating ?? 0;
    case 'men':       return item._mentality ?? ctx.getYouthAttr(item.player, 'Mentality') ?? 0;
    case 'wr':        return item._workRate ?? ctx.getYouthAttr(item.player, 'Work rate') ?? 0;
    case 'potential': { const m = {high:3, medium:2, low:1}; return [m[item.player?.potential]||0, item.player?.potentialCap||0]; }
    default:          return 0;
  }
}
function sortYouthHist(items, sortKey, ctx) {
  if (!sortKey) return items;
  const asc = sortKey.endsWith('_a');
  const key = (asc || sortKey.endsWith('_d')) ? sortKey.slice(0, -2) : sortKey;
  const val = item => youthHistSortValue(item, key, ctx);
  const cmpScalar = (x, y) => typeof x === 'string' ? x.localeCompare(y) : x - y;
  return [...items].sort((a, b) => {
    const av = val(a), bv = val(b);
    let c = Array.isArray(av) ? (cmpScalar(av[0], bv[0]) || cmpScalar(av[1], bv[1])) : cmpScalar(av, bv);
    return asc ? c : -c;
  });
}

export const youthComputed = {
  // Pre-compute all expensive per-row derived values once, cached by Vue
  youthHistJobsEnriched() {
    return this.youthAllHistoryJobs.map(job => {
      const p = job.player || {};
      const pos = p.position || p.Position;
      const posRtg = this.scoutPosRating(p, pos);
      const best = this.scoutBestPos(p);
      const dateStr = job.createdAt
        ? new Date(job.createdAt).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'2-digit'})
        : '—';
      return {
        ...job,
        _posRating: posRtg,
        _bestPos: best?.pos || null,
        _bestPosRating: best?.rating || null,
        _dateStr: dateStr,
        _mentality: this.getYouthAttr(p, 'Mentality'),
        _workRate: this.getYouthAttr(p, 'Work rate'),
      };
    });
  },

  youthAcademySorted() {
    return [...this.youthAcademy].sort((a,b)=>(b.Rating||b.rating||0)-(a.Rating||a.rating||0));
  },
  youthAcademyAvgRating() {
    const pl = this.youthAcademy.filter(p=>p.Rating||p.rating);
    if (!pl.length) return 0;
    return pl.reduce((s,p)=>s+(p.Rating||p.rating),0)/pl.length;
  },
  youthAcademyTopRating() {
    if (!this.youthAcademy.length) return 0;
    return Math.max(...this.youthAcademy.map(p=>p.Rating||p.rating||0));
  },
  youthFilteredHistory() {
    let items = this.youthRejected;
    if (this.youthHistPos) items = items.filter(j=>(j.player.position||j.player.Position)===this.youthHistPos);
    return sortYouthHist(items, this.youthHistSort, this);
  },
  youthHistClubs() {
    return [...new Set(this.youthAllHistoryJobs.map(j=>j._club))].filter(Boolean).sort();
  },
  youthHistAllPositions() {
    return [...new Set(this.youthAllHistoryJobs.map(j=>j.player?.position||j.player?.Position))].filter(Boolean).sort();
  },
  youthHistFiltered() {
    let items = this.youthHistJobsEnriched;
    const q = (this.youthHistSearch||'').toLowerCase();
    if (q) items = items.filter(j=>(j.player?.name||'').toLowerCase().includes(q)||(j.player?.club||'').toLowerCase().includes(q)||(j._club||'').toLowerCase().includes(q));
    if (this.youthHistPos) items = items.filter(j=>(j.player?.position||j.player?.Position)===this.youthHistPos);
    if (this.youthHistClubFilter) items = items.filter(j=>j._club===this.youthHistClubFilter);
    if (this.youthHistStatusFilter) items = items.filter(j=>(j._jobStatus||j.status)===this.youthHistStatusFilter);
    return sortYouthHist(items, this.youthHistSort, this);
  },
  youthHistPaged() {
    const start = this.youthHistPage * HIST_PAGE_SIZE;
    return this.youthHistFiltered.slice(start, start + HIST_PAGE_SIZE);
  },
  youthHistTotalPages() {
    return Math.max(1, Math.ceil(this.youthHistFiltered.length / HIST_PAGE_SIZE));
  },

  // ── Club tab — Scenario Planner ──
  clubScenarioCurLevel() {
    return this.facCurLv(this.scenarioFacility);
  },
  clubScenarioLevels() {
    const cur = this.clubScenarioCurLevel;
    const max = FACILITY_MAX_LEVEL_CONFIRMED[this.scenarioFacility] || 5;
    const arr = [];
    for (let l = cur + 1; l <= max; l++) arr.push(l);
    return arr;
  },
  // get/set computed so the <select> always shows a valid option, defaulting to "current+1"
  // whenever scenarioTargetLevel is unset or stale (e.g. right after switching facility).
  scenarioTargetLevelModel: {
    get() {
      const levels = this.clubScenarioLevels;
      if (this.scenarioTargetLevel && levels.includes(this.scenarioTargetLevel)) return this.scenarioTargetLevel;
      return levels[0] ?? null;
    },
    set(v) { this.scenarioTargetLevel = v; },
  },
  clubScenario() {
    const key = this.scenarioFacility;
    const cur = this.clubScenarioCurLevel;
    const target = this.scenarioTargetLevelModel;
    if (!target || target <= cur) return null;

    const discount = this.clubStaffEffects?.finances?.facilityDiscount || 0;
    let totalCost = 0, missingCost = false;
    for (let l = cur + 1; l <= target; l++) {
      const base = FACILITY_UPGRADE_COST[key]?.[l];
      if (base == null) { missingCost = true; break; }
      totalCost += base * (1 - discount);
    }

    const out = { key, cur, target, totalCost, missingCost, discount, flatUpkeep: FLAT_UPKEEP_KEYS.has(key) };
    if (FLAT_UPKEEP_KEYS.has(key)) {
      const rates = FACILITY_MAINTENANCE_RATES[key] || {};
      out.oldUpkeep = rates[cur] || 0;
      out.newUpkeep = rates[target] || 0;
      out.upkeepDelta = out.newUpkeep - out.oldUpkeep;
    }

    if (key === 'stadium') {
      const oldCap = FACILITY_LEVEL_FACTS.stadium.capacity[cur] || 0;
      const newCap = FACILITY_LEVEL_FACTS.stadium.capacity[target];
      if (newCap != null) {
        const ticketPrice = this.clubFinance?.stadium?.ticketPrice || 0;
        const capGain = newCap - oldCap;
        out.capGain = capGain;
        out.revenuePerHomeGame = capGain * ticketPrice;
        // Rough model per the owner: revenue ≈ ticket price × capacity, ignoring demand/form/morale.
        // Weekly figure assumes ~half of fixtures are home games (standard round-robin scheduling).
        const avgWeeklyRevenue = out.revenuePerHomeGame * 0.5;
        out.netWeekly = avgWeeklyRevenue - (out.upkeepDelta || 0);
        out.paybackWeeks = out.netWeekly > 0 ? totalCost / out.netWeekly : null;
      } else {
        out.capacityUnknown = true;
      }
    }
    return out;
  },
};
