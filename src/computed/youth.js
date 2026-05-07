const HIST_PAGE_SIZE = 50;

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

  // Per-club active/total counts, derived from enriched jobs (no template-level .filter calls)
  youthClubStatsMap() {
    const map = {};
    for (const job of this.youthHistJobsEnriched) {
      const c = job._club;
      if (!c) continue;
      if (!map[c]) map[c] = { active: 0, total: 0 };
      map[c].total++;
      if ((job._jobStatus || job.status) === 'active') map[c].active++;
    }
    return map;
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
  youthHistPositions() {
    return [...new Set(this.youthRejected.map(j=>j.player.position||j.player.Position))].filter(Boolean).sort();
  },
  youthFilteredHistory() {
    let items = this.youthRejected;
    if (this.youthHistPos) items = items.filter(j=>(j.player.position||j.player.Position)===this.youthHistPos);
    const s = this.youthHistSort;
    if (s==='date') return [...items].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    if (s==='date_a') return [...items].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    if (s==='rating_d') return [...items].sort((a,b)=>(b.player.rating||b.player.Rating||0)-(a.player.rating||a.player.Rating||0));
    if (s==='rating_a') return [...items].sort((a,b)=>(a.player.rating||a.player.Rating||0)-(b.player.rating||b.player.Rating||0));
    if (s==='age_a') return [...items].sort((a,b)=>(a.player.age||a.player.Age||0)-(b.player.age||b.player.Age||0));
    if (s==='age_d') return [...items].sort((a,b)=>(b.player.age||b.player.Age||0)-(a.player.age||a.player.Age||0));
    if (s==='value_d') return [...items].sort((a,b)=>(b.player.value||b.player.Value||0)-(a.player.value||a.player.Value||0));
    if (s==='value_a') return [...items].sort((a,b)=>(a.player.value||a.player.Value||0)-(b.player.value||b.player.Value||0));
    if (s==='name_a') return [...items].sort((a,b)=>(a.player.name||a.player.Player||'').localeCompare(b.player.name||b.player.Player||''));
    if (s==='name_d') return [...items].sort((a,b)=>(b.player.name||b.player.Player||'').localeCompare(a.player.name||a.player.Player||''));
    if (s==='pos_a') return [...items].sort((a,b)=>(a.player.position||a.player.Position||'').localeCompare(b.player.position||b.player.Position||''));
    if (s==='pos_d') return [...items].sort((a,b)=>(b.player.position||b.player.Position||'').localeCompare(a.player.position||a.player.Position||''));
    if (s==='buynow_d') return [...items].sort((a,b)=>(b.buyNow||0)-(a.buyNow||0));
    if (s==='buynow_a') return [...items].sort((a,b)=>(a.buyNow||0)-(b.buyNow||0));
    if (s==='status_a') return [...items].sort((a,b)=>(a._jobStatus||a.status||'').localeCompare(b._jobStatus||b.status||''));
    if (s==='status_d') return [...items].sort((a,b)=>(b._jobStatus||b.status||'').localeCompare(a._jobStatus||a.status||''));
    if (s==='bestpos_d') return [...items].sort((a,b)=>(this.scoutBestPos(b.player)?.rating||0)-(this.scoutBestPos(a.player)?.rating||0));
    if (s==='bestpos_a') return [...items].sort((a,b)=>(this.scoutBestPos(a.player)?.rating||0)-(this.scoutBestPos(b.player)?.rating||0));
    if (s==='men_d') return [...items].sort((a,b)=>(this.getYouthAttr(b.player,'Mentality')||0)-(this.getYouthAttr(a.player,'Mentality')||0));
    if (s==='men_a') return [...items].sort((a,b)=>(this.getYouthAttr(a.player,'Mentality')||0)-(this.getYouthAttr(b.player,'Mentality')||0));
    if (s==='wr_d') return [...items].sort((a,b)=>(this.getYouthAttr(b.player,'Work rate')||0)-(this.getYouthAttr(a.player,'Work rate')||0));
    if (s==='wr_a') return [...items].sort((a,b)=>(this.getYouthAttr(a.player,'Work rate')||0)-(this.getYouthAttr(b.player,'Work rate')||0));
    if (s==='potential_d') { const m={'high':3,'medium':2,'low':1}; return [...items].sort((a,b)=>(m[b.player?.potential]||0)-(m[a.player?.potential]||0)); }
    if (s==='potential_a') { const m={'high':3,'medium':2,'low':1}; return [...items].sort((a,b)=>(m[a.player?.potential]||0)-(m[b.player?.potential]||0)); }
    return items;
  },
  youthHistMaxRating() {
    if (!this.youthRejected.length) return 0;
    return Math.max(...this.youthRejected.map(j=>j.player.rating||j.player.Rating||0));
  },
  youthHistAvgRating() {
    if (!this.youthRejected.length) return 0;
    return this.youthRejected.reduce((s,j)=>s+(j.player.rating||j.player.Rating||0),0)/this.youthRejected.length;
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
    const s = this.youthHistSort;
    if (s==='date')     return [...items].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    if (s==='date_a')   return [...items].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    if (s==='rating_d') return [...items].sort((a,b)=>(b.player?.rating||0)-(a.player?.rating||0));
    if (s==='rating_a') return [...items].sort((a,b)=>(a.player?.rating||0)-(b.player?.rating||0));
    if (s==='age_a')    return [...items].sort((a,b)=>(a.player?.age||0)-(b.player?.age||0));
    if (s==='age_d')    return [...items].sort((a,b)=>(b.player?.age||0)-(a.player?.age||0));
    if (s==='value_d')  return [...items].sort((a,b)=>(b.player?.value||0)-(a.player?.value||0));
    if (s==='value_a')  return [...items].sort((a,b)=>(a.player?.value||0)-(b.player?.value||0));
    if (s==='name_a')   return [...items].sort((a,b)=>(a.player?.name||'').localeCompare(b.player?.name||''));
    if (s==='name_d')   return [...items].sort((a,b)=>(b.player?.name||'').localeCompare(a.player?.name||''));
    if (s==='pos_a')    return [...items].sort((a,b)=>(a.player?.position||'').localeCompare(b.player?.position||''));
    if (s==='pos_d')    return [...items].sort((a,b)=>(b.player?.position||'').localeCompare(a.player?.position||''));
    if (s==='buynow_d') return [...items].sort((a,b)=>(b.buyNow||0)-(a.buyNow||0));
    if (s==='buynow_a') return [...items].sort((a,b)=>(a.buyNow||0)-(b.buyNow||0));
    if (s==='status_a') return [...items].sort((a,b)=>(a._jobStatus||a.status||'').localeCompare(b._jobStatus||b.status||''));
    if (s==='status_d') return [...items].sort((a,b)=>(b._jobStatus||b.status||'').localeCompare(a._jobStatus||a.status||''));
    if (s==='sclub_a')  return [...items].sort((a,b)=>(a._club||'').localeCompare(b._club||''));
    if (s==='sclub_d')  return [...items].sort((a,b)=>(b._club||'').localeCompare(a._club||''));
    if (s==='bestpos_d') return [...items].sort((a,b)=>(b._bestPosRating||0)-(a._bestPosRating||0));
    if (s==='bestpos_a') return [...items].sort((a,b)=>(a._bestPosRating||0)-(b._bestPosRating||0));
    if (s==='men_d') return [...items].sort((a,b)=>(b._mentality||0)-(a._mentality||0));
    if (s==='men_a') return [...items].sort((a,b)=>(a._mentality||0)-(b._mentality||0));
    if (s==='wr_d') return [...items].sort((a,b)=>(b._workRate||0)-(a._workRate||0));
    if (s==='wr_a') return [...items].sort((a,b)=>(a._workRate||0)-(b._workRate||0));
    if (s==='potential_d') { const m={'high':3,'medium':2,'low':1}; return [...items].sort((a,b)=>(m[b.player?.potential]||0)-(m[a.player?.potential]||0)); }
    if (s==='potential_a') { const m={'high':3,'medium':2,'low':1}; return [...items].sort((a,b)=>(m[a.player?.potential]||0)-(m[b.player?.potential]||0)); }
    return items;
  },
  youthHistPaged() {
    const start = this.youthHistPage * HIST_PAGE_SIZE;
    return this.youthHistFiltered.slice(start, start + HIST_PAGE_SIZE);
  },
  youthHistTotalPages() {
    return Math.max(1, Math.ceil(this.youthHistFiltered.length / HIST_PAGE_SIZE));
  },
  youthDaysUntilUpgrade() {
    if (!this.youthFacilities.project) return null;
    const ms = new Date(this.youthFacilities.project.completeAt) - new Date();
    return Math.max(0, Math.round(ms/86400000));
  },
  youthUpgradeProgress() {
    if (!this.youthFacilities.project) return 0;
    const start = new Date(this.youthFacilities.project.startedAt);
    const end = new Date(this.youthFacilities.project.completeAt);
    const now = new Date();
    return Math.min(100, Math.max(0, (now-start)/(end-start)*100));
  },
};
