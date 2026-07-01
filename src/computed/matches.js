export const matchesComputed = {
  matchArchiveFiltered() {
    if (!this.matchArchive) return [];
    let items = this.matchArchive;
    if (this.matchFilterComp) items = items.filter(m => m.competition?.code === this.matchFilterComp);
    if (this.matchFilterClub) {
      const c = this.matchFilterClub;
      items = items.filter(m => m.home?.club === c || m.away?.club === c);
    }
    if (this.matchFilterManager) {
      const mg = this.matchFilterManager.toLowerCase();
      items = items.filter(m => (this.managerMap[m.home?.club]||'').toLowerCase().includes(mg) || (this.managerMap[m.away?.club]||'').toLowerCase().includes(mg));
    }
    const s = this.matchSort;
    if (s === 'gw_d') return [...items].sort((a,b) => (b.gameweek||0)-(a.gameweek||0));
    if (s === 'gw_a') return [...items].sort((a,b) => (a.gameweek||0)-(b.gameweek||0));
    if (s === 'date_d') return [...items].sort((a,b) => (b.kickoff||'').localeCompare(a.kickoff||''));
    if (s === 'date_a') return [...items].sort((a,b) => (a.kickoff||'').localeCompare(b.kickoff||''));
    if (s === 'home_a') return [...items].sort((a,b) => (a.home?.club||'').localeCompare(b.home?.club||''));
    if (s === 'away_a') return [...items].sort((a,b) => (a.away?.club||'').localeCompare(b.away?.club||''));
    if (s === 'comp_a') return [...items].sort((a,b) => (a.competition?.name||'').localeCompare(b.competition?.name||''));
    return items;
  },
  matchArchiveManagers() {
    if (!this.matchArchive) return [];
    const mgrs = new Set();
    this.matchArchive.forEach(m => {
      const hm = this.managerMap[m.home?.club], am = this.managerMap[m.away?.club];
      if (hm) mgrs.add(hm);
      if (am) mgrs.add(am);
    });
    return Array.from(mgrs).sort();
  },
  matchArchiveClubs() {
    if (!this.matchArchive) return [];
    const clubs = new Set();
    this.matchArchive.forEach(m => {
      if (m.home?.club) clubs.add(m.home.club);
      if (m.away?.club) clubs.add(m.away.club);
    });
    return Array.from(clubs).sort();
  },
  matchArchiveComps() {
    if (!this.matchArchive) return [];
    const comps = new Map();
    this.matchArchive.forEach(m => { if (m.competition?.code) comps.set(m.competition.code, m.competition.name); });
    return Array.from(comps.entries()).map(([code,name])=>({code,name})).sort((a,b)=>a.name.localeCompare(b.name));
  },
  tacticsAnalysis() {
    if (!this.matchArchive) return null;
    const acc = (map, key, result, gf, ga, xgF, xgA, sqDiff) => {
      if (!key) return;
      if (!map[key]) map[key] = { n:0, W:0, D:0, L:0, gf:0, ga:0, xgF:0, xgA:0, sqDiff:0 };
      const r = map[key]; r.n++; r[result]++; r.gf+=gf; r.ga+=ga; r.xgF+=xgF||0; r.xgA+=xgA||0; r.sqDiff+=sqDiff||0;
    };
    const summarise = (map) => {
      return Object.entries(map).map(([key, r]) => ({
        key, n: r.n, W: r.W, D: r.D, L: r.L,
        winPct: r.n ? Math.round(r.W / r.n * 100) : 0,
        ppg: r.n ? Math.round((r.W*3 + r.D) / r.n * 100) / 100 : 0,
        avgGF: r.n ? Math.round(r.gf / r.n * 10) / 10 : 0,
        avgGA: r.n ? Math.round(r.ga / r.n * 10) / 10 : 0,
        avgXgF: r.n ? Math.round(r.xgF / r.n * 10) / 10 : 0,
        avgXgA: r.n ? Math.round(r.xgA / r.n * 10) / 10 : 0,
        avgXgDiff: r.n ? Math.round((r.xgF - r.xgA) / r.n * 10) / 10 : 0,
        avgSqDiff: r.n ? Math.round(r.sqDiff / r.n * 10) / 10 : 0,
      })).filter(r => r.n >= 3).sort((a,b) => b.winPct - a.winPct);
    };
    const fmVfm = {}, menVmen = {};
    for (const m of this.matchArchive) {
      const hs = m.score?.home ?? 0, as_ = m.score?.away ?? 0;
      const hRes = hs > as_ ? 'W' : hs < as_ ? 'L' : 'D';
      const aRes = as_ > hs ? 'W' : as_ < hs ? 'L' : 'D';
      const hXg = m.stats?.xg?.home || 0, aXg = m.stats?.xg?.away || 0;
      const sqD = (m.home?.sqRtg?.overall || 0) - (m.away?.sqRtg?.overall || 0);
      const hFm = this.fmtFormation(m.home?.formation), aFm = this.fmtFormation(m.away?.formation);
      const hMen = m.home?.mentality, aMen = m.away?.mentality;
      acc(fmVfm, hFm && aFm ? `${hFm} vs ${aFm}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(fmVfm, hFm && aFm ? `${aFm} vs ${hFm}` : null, aRes, as_, hs, aXg, hXg, -sqD);
      acc(menVmen, hMen && aMen ? `${hMen} vs ${aMen}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(menVmen, hMen && aMen ? `${aMen} vs ${hMen}` : null, aRes, as_, hs, aXg, hXg, -sqD);
    }
    const preVsty = {}, styVpre = {}, lineVtrans = {}, transVline = {};
    for (const m of this.analysisMatches) {
      const hs = m.score?.home ?? 0, as_ = m.score?.away ?? 0;
      const hRes = hs > as_ ? 'W' : hs < as_ ? 'L' : 'D';
      const aRes = as_ > hs ? 'W' : as_ < hs ? 'L' : 'D';
      const hXg = m.stats?.xg?.home || 0, aXg = m.stats?.xg?.away || 0;
      const sqD = (m.home?.sqRtg?.overall || 0) - (m.away?.sqRtg?.overall || 0);
      const hInstr = m.home?.sub?.instructions || {}, aInstr = m.away?.sub?.instructions || {};
      const hPress = hInstr.pressing_intensity, aPress = aInstr.pressing_intensity;
      const hStyle = hInstr.style, aStyle = aInstr.style;
      const hLine = hInstr.defensive_line, aLine = aInstr.defensive_line;
      const hTrans = hInstr.transition_speed, aTrans = aInstr.transition_speed;
      acc(preVsty,   hPress && aStyle ? `${hPress} vs ${aStyle}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(preVsty,   aPress && hStyle ? `${aPress} vs ${hStyle}` : null, aRes, as_, hs, aXg, hXg, -sqD);
      acc(styVpre,   hStyle && aPress ? `${hStyle} vs ${aPress}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(styVpre,   aStyle && hPress ? `${aStyle} vs ${hPress}` : null, aRes, as_, hs, aXg, hXg, -sqD);
      acc(lineVtrans, hLine && aTrans ? `${hLine} vs ${aTrans}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(lineVtrans, aLine && hTrans ? `${aLine} vs ${hTrans}` : null, aRes, as_, hs, aXg, hXg, -sqD);
      acc(transVline, hTrans && aLine ? `${hTrans} vs ${aLine}` : null, hRes, hs, as_, hXg, aXg, sqD);
      acc(transVline, aTrans && hLine ? `${aTrans} vs ${hLine}` : null, aRes, as_, hs, aXg, hXg, -sqD);
    }
    const total = this.matchArchive.length;
    const bothFormations = this.matchArchive.filter(m => m.home?.formation && m.away?.formation).length;
    const bothMentality = this.matchArchive.filter(m => m.home?.mentality && m.away?.mentality).length;
    const withInstr = this.analysisMatches.length;
    const withPress = this.analysisMatches.filter(m => m.home?.sub?.instructions?.pressing_intensity || m.away?.sub?.instructions?.pressing_intensity).length;
    const withDefLine = this.analysisMatches.filter(m => m.home?.sub?.instructions?.defensive_line || m.away?.sub?.instructions?.defensive_line).length;
    const withTrans = this.analysisMatches.filter(m => m.home?.sub?.instructions?.transition_speed || m.away?.sub?.instructions?.transition_speed).length;
    return {
      formations: summarise(fmVfm),
      mentalities: summarise(menVmen),
      pressing: summarise(preVsty),
      styleVpress: summarise(styVpre),
      defLine: summarise(lineVtrans),
      transVline: summarise(transVline),
      coverage: { total, bothFormations, bothMentality, withInstr, withPress, withDefLine, withTrans },
    };
  },
  subsDbStats() {
    if (!this.subsDb || !this.matchArchive) return null;
    const clubs = this.subsDb.clubs || {};
    const byGw = {};
    for (const m of this.matchArchive) {
      const gw = m._gw;
      if (gw == null) continue;
      const hSub = clubs[m.home?.club]?.[gw];
      const aSub = clubs[m.away?.club]?.[gw];
      if (!byGw[gw]) byGw[gw] = { gw, n:0, hSub:0, aSub:0, bothSub:0, bothFm:0, bothMen:0, press:0, line:0, trans:0, sides:0 };
      const row = byGw[gw];
      row.n++;
      if (hSub) row.hSub++;
      if (aSub) row.aSub++;
      if (hSub && aSub) row.bothSub++;
      if (hSub?.formation && aSub?.formation) row.bothFm++;
      if (hSub?.instructions?.mentality && aSub?.instructions?.mentality) row.bothMen++;
      for (const sub of [hSub, aSub]) {
        if (!sub) continue;
        row.sides++;
        if (sub.instructions?.pressing_intensity) row.press++;
        if (sub.instructions?.defensive_line) row.line++;
        if (sub.instructions?.transition_speed) row.trans++;
      }
    }
    const rows = Object.values(byGw).sort((a,b) => b.gw - a.gw);
    const total = this.matchArchive.length;
    const totals = rows.reduce((acc, r) => {
      acc.bothSub += r.bothSub; acc.bothFm += r.bothFm; acc.bothMen += r.bothMen;
      acc.sides += r.sides; acc.press += r.press; acc.line += r.line; acc.trans += r.trans;
      return acc;
    }, { bothSub:0, bothFm:0, bothMen:0, sides:0, press:0, line:0, trans:0 });
    return { rows, total, totals };
  },
};
