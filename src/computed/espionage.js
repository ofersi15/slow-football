export const espionageComputed = {
  espionageFiltered() {
    let list = [...this.espionageClubs];
    if (this.espionageSearch.trim()) {
      const q = this.espionageSearch.trim().toLowerCase();
      list = list.filter(c => c.club.toLowerCase().includes(q) || (this.managerMap[c.club]||'').toLowerCase().includes(q));
    }
    if (this.espShowVacantOnly) list = list.filter(c => !this.managedSet.has(c.club));
    const r = (c, role) => c.current?.[role]?.rating || 0;
    const lv = (c, key) => c.levels?.[key] || 0;
    const SORTS = {
      ceo_d:      (a,b) => r(b,'CEO')-r(a,'CEO'),
      ceo_a:      (a,b) => r(a,'CEO')-r(b,'CEO'),
      td_d:       (a,b) => r(b,'Technical Director')-r(a,'Technical Director'),
      td_a:       (a,b) => r(a,'Technical Director')-r(b,'Technical Director'),
      asst_d:     (a,b) => r(b,'Assistant')-r(a,'Assistant'),
      asst_a:     (a,b) => r(a,'Assistant')-r(b,'Assistant'),
      physio_d:   (a,b) => r(b,'Physio')-r(a,'Physio'),
      physio_a:   (a,b) => r(a,'Physio')-r(b,'Physio'),
      training_d: (a,b) => lv(b,'training')-lv(a,'training'),
      training_a: (a,b) => lv(a,'training')-lv(b,'training'),
      scouting_d: (a,b) => lv(b,'scouting')-lv(a,'scouting'),
      scouting_a: (a,b) => lv(a,'scouting')-lv(b,'scouting'),
      academy_d:  (a,b) => lv(b,'academy')-lv(a,'academy'),
      academy_a:  (a,b) => lv(a,'academy')-lv(b,'academy'),
      medical_d:  (a,b) => lv(b,'medical')-lv(a,'medical'),
      medical_a:  (a,b) => lv(a,'medical')-lv(b,'medical'),
      analytics_d:(a,b) => lv(b,'analytics')-lv(a,'analytics'),
      analytics_a:(a,b) => lv(a,'analytics')-lv(b,'analytics'),
      stadium_d:  (a,b) => lv(b,'stadium')-lv(a,'stadium'),
      stadium_a:  (a,b) => lv(a,'stadium')-lv(b,'stadium'),
      ads_d:      (a,b) => (b.openAds?.length||0)-(a.openAds?.length||0),
      ads_a:      (a,b) => (a.openAds?.length||0)-(b.openAds?.length||0),
      club_d:     (a,b) => b.club.localeCompare(a.club),
      mgr_d:      (a,b) => (this.managerMap[b.club]||'').localeCompare(this.managerMap[a.club]||''),
      mgr_a:      (a,b) => { const av=this.managedSet.has(a.club)?1:0, bv=this.managedSet.has(b.club)?1:0; if(av!==bv) return av-bv; return (this.managerMap[a.club]||'').localeCompare(this.managerMap[b.club]||''); },
    };
    list.sort(SORTS[this.espionageSort] || ((a,b) => a.club.localeCompare(b.club)));
    return list;
  },
  espionageNegoFiltered() {
    const q = (this.espionageNegoSearch||'').trim().toLowerCase();
    const cutoff = Date.now() - 14 * 24 * 3600 * 1000;
    let list = this.espionageNegos.filter(n => {
      if (n.via === 'auction') return false;
      if (!this.negoShowAll && !q && new Date(n.updatedAt||0).getTime() < cutoff) return false;
      if (!q) return true;
      return (n.playerName||'').toLowerCase().includes(q) ||
             (n.buyer||'').toLowerCase().includes(q) ||
             (n.seller||'').toLowerCase().includes(q);
    });
    const ns = this.negoSort;
    if (ns==='player_a') list.sort((a,b)=>(a.playerName||'').localeCompare(b.playerName||''));
    else if (ns==='player_d') list.sort((a,b)=>(b.playerName||'').localeCompare(a.playerName||''));
    else if (ns==='fee_d') list.sort((a,b)=>(b.fee||b.amount||0)-(a.fee||a.amount||0));
    else if (ns==='fee_a') list.sort((a,b)=>(a.fee||a.amount||0)-(b.fee||b.amount||0));
    else if (ns==='status_a') list.sort((a,b)=>(a.status||'').localeCompare(b.status||''));
    else if (ns==='date_a') list.sort((a,b)=>new Date(a.updatedAt||0)-new Date(b.updatedAt||0));
    else list.sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0));
    return list;
  },
  negoPlayerMap() {
    const map = {};
    for (const n of this.espionageNegos) {
      const k = (n.playerName||'').toLowerCase();
      if (!k || map[k]) continue;
      const pi = n.player || n.playerInfo || {};
      const pos = n.playerPosition || n.playerPos || pi.position || pi.pos || n.position || null;
      const age = n.playerAge ?? n.playerDOB ?? pi.age ?? pi.dob ?? n.age ?? null;
      const rtg = n.playerRating ?? n.playerOverall ?? pi.rating ?? pi.overall ?? n.rating ?? null;
      const club = n.playerClub || pi.club || pi.clubName || n.seller || null;
      map[k] = { Player: n.playerName, Position: pos||null, Age: age, _gameRating: rtg, Club: club };
    }
    return map;
  },
  effectiveBudget() {
    return this.clubBudget ?? this.budgetOverride;
  },
  clubBudgetFor() {
    return (name) => {
      if (!name) return null;
      const entry = this.allBudgets[name] || this.allBudgets[name.toLowerCase()] || null;
      if (!entry) return name === this.myClub ? this.effectiveBudget : null;
      return typeof entry === 'number' ? entry
           : (entry.transfer ?? entry.transferBudget ?? entry.available ?? entry.budget ?? null);
    };
  },
  auctionsByPlayer() {
    const now = this._nowMs;
    if (this.auctionItems.length) {
      const active = [], past = [];
      for (const item of this.auctionItems) {
        const closesMs = new Date(item.endsAt || 0).getTime();
        const isActive = closesMs > now;
        const highestBidder = item.highest?.bidder || null;
        const bids = [...(item.bids || [])]
          .sort((a, b) => (b.amount || 0) - (a.amount || 0))
          .map(b => ({
            id: `${item.id}-${b.bidder}`,
            buyer: b.bidder,
            amount: b.amount,
            updatedAt: b.at,
            via: 'auction',
            status: isActive ? 'pending' : (b.bidder === highestBidder ? 'accepted' : 'rejected'),
            subStatus: isActive ? null : (b.bidder === highestBidder ? null : 'outbid'),
          }));
        let effectiveWinner = bids[0]?.buyer || null;
        for (const bid of bids) {
          const bgt = this.clubBudgetFor(bid.buyer);
          if (bgt == null || bgt >= bid.amount) { effectiveWinner = bid.buyer; break; }
        }
        const entry = { playerName: item.player, seller: item.club, bids, endsAt: item.endsAt, effectiveWinner };
        if (isActive) active.push(entry);
        else past.push(entry);
      }
      active.sort((a, b) => (a.playerName || '').localeCompare(b.playerName || ''));
      past.sort((a, b) => new Date(b.endsAt || 0) - new Date(a.endsAt || 0));
      return { active, past };
    }
    const prevCloseMs = this.nextAuctionClose.getTime() - 7 * 24 * 3600 * 1000;
    const byPlayer = new Map();
    for (const n of this.espionageNegos) {
      if (n.via !== 'auction') continue;
      const key = (n.playerName || '?').toLowerCase();
      if (!byPlayer.has(key)) byPlayer.set(key, { playerName: n.playerName, seller: n.seller, bids: [] });
      byPlayer.get(key).bids.push(n);
    }
    for (const entry of byPlayer.values()) {
      entry.bids.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    }
    const active = [], past = [];
    for (const entry of byPlayer.values()) {
      const hasCurrentPending = entry.bids.some(b =>
        b.status === 'pending' && new Date(b.updatedAt || b.createdAt || 0).getTime() > prevCloseMs
      );
      if (hasCurrentPending) active.push(entry);
      else past.push(entry);
    }
    active.sort((a, b) => (a.playerName || '').localeCompare(b.playerName || ''));
    past.sort((a, b) => {
      const ad = Math.max(...a.bids.map(b => new Date(b.updatedAt || 0).getTime()));
      const bd = Math.max(...b.bids.map(b => new Date(b.updatedAt || 0).getTime()));
      return bd - ad;
    });
    return { active, past };
  },
  nextAuctionClose() {
    const now = new Date(this._nowMs);
    const mo = now.getUTCMonth();
    const isBST = mo >= 2 && mo <= 9;
    const closeUTC = isBST ? 20 : 21;
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), closeUTC, 0, 0));
    const dow = d.getUTCDay();
    d.setUTCDate(d.getUTCDate() + ((3 - dow + 7) % 7));
    if (d.getTime() <= this._nowMs) d.setUTCDate(d.getUTCDate() + 7);
    return d;
  },
  auctionCountdown() {
    const diff = this.nextAuctionClose.getTime() - this._nowMs;
    if (diff <= 0) return 'closing…';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (h >= 48) return `${Math.floor(h/24)}d ${h%24}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  },
};
