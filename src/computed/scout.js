import { MY_CLUB, PAGE_SIZE } from '../constants.js'
import { calcGameRating, calcWeightedRating, computeTraits, computeDislikes } from '../utils.js'

export const scoutComputed = {
  playersWithDislikesSet() {
    const set = new Set();
    const byClub = {};
    for (const p of this.allPlayers) {
      if (!p.Club) continue;
      (byClub[p.Club] = byClub[p.Club] || []).push(p);
    }
    for (const squad of Object.values(byClub)) {
      for (const player of squad) {
        if (!set.has(player.Player) && computeDislikes(player, squad, this.allDeals).length > 0) {
          set.add(player.Player);
        }
      }
    }
    return set;
  },
  filteredPlayers() {
    const q = this.search.toLowerCase();
    return this.allPlayers.filter(p => {
      if (!this.leagueFilter.has(p._league)) return false;
      if (!this.posFilter.has(p.Position)) return false;
      const rtg = this.posRatingUseWeighted
        ? ((p._weightedRating || p._gameRating || p.Rating) || 0)
        : ((p._gameRating || p.Rating) || 0);
      const hasActivePosFilter = Object.values(this.posRatingFilters).some(v => v > 60);
      if (hasActivePosFilter) {
        const qualifies = Object.entries(this.posRatingFilters).some(([pos, thresh]) => {
          if (thresh <= 60) return false;
          const posRtg = this.posRatingUseWeighted
            ? calcWeightedRating(p, pos, this.mentalCfgAttrs, this.mentalWeightPct)
            : calcGameRating(p, pos);
          return posRtg != null && posRtg >= thresh;
        });
        if (!qualifies) return false;
      }
      if (this.posRatingMax < 99 && rtg > this.posRatingMax) return false;
      if (this.maxAge < 40 && (p.Age||99) > this.maxAge) return false;
      if (this.ageGroupFilter === 'u21' && !p._u21) return false;
      if (this.ageGroupFilter === 'u20' && !p._u20) return false;
      if (this.hideOwn && p.Club === MY_CLUB) return false;
      if (this.hideVacant && this.vacantClubs.has(p.Club)) return false;
      if (this.managedOnly && !p._managed) return false;
      if (this.forSaleOnly && (!p._managed || p.notForSale)) return false;
      if (this.transferListedOnly && !p._transferListed) return false;
      if (this.injuredOnly && !p.injured && !p.suspended) return false;
      if (this.dislikesOnly && !this.playersWithDislikesSet.has(p.Player)) return false;
      if (this.hideRetiring && p.retiring) return false;
      if (this.traitFilter) {
        const tNames = computeTraits(p).map(t => t.n);
        if (!tNames.includes(this.traitFilter)) return false;
      }
      for (const [attr, minVal] of Object.entries(this.attrFilters)) {
        if (minVal > 0 && (p[attr]||0) < minVal) return false;
      }
      if (q && !p.Player?.toLowerCase().includes(q) && !p.Club?.toLowerCase().includes(q) && !p.Nationality?.toLowerCase().includes(q)) return false;
      return true;
    });
  },
  sortedPlayers() {
    const col = this.sortCol, dir = this.sortDir;
    return [...this.filteredPlayers].sort((a,b) => {
      const av = a[col], bv = b[col];
      if (av==null) return 1; if (bv==null) return -1;
      return (typeof av==='number'?av-bv:String(av).localeCompare(String(bv)))*dir;
    });
  },
  pagedPlayers() { return this.sortedPlayers.slice(this.page*PAGE_SIZE,(this.page+1)*PAGE_SIZE); },
  totalPages() { return Math.ceil(this.filteredPlayers.length/PAGE_SIZE); },
  filteredClubs() { return new Set(this.filteredPlayers.map(p=>p.Club)).size; },
  topLists() {
    const withGames = this.filteredPlayers.filter(p=>p.Games>0);
    const byRating = [...this.filteredPlayers].sort((a,b)=>(b.Rating||0)-(a.Rating||0));
    return [
      {title:'⭐ Highest Rated',data:byRating.slice(0,15),key:'Rating',color:'#ffa657',dec:1},
      {title:'🎯 Position Specialists',data:[...this.filteredPlayers].sort((a,b)=>(b._weightedRating||0)-(a._weightedRating||0)).slice(0,15),key:'_weightedRating',color:'#d2a8ff',dec:1},
      {title:'⚽ Top Scorers',data:[...withGames].sort((a,b)=>(b.Goals||0)-(a.Goals||0)).slice(0,15),key:'Goals',color:'#7ee787',dec:0},
      {title:'🎩 Most Clinical (Goals/xG)',data:[...withGames].filter(p=>(p.xG||0)>=1).sort((a,b)=>((b.Goals||0)/(b.xG||1))-((a.Goals||0)/(a.xG||1))).slice(0,15),key:'Goals',color:'#7ee787',dec:0},
      {title:'🅰 Top Assisters',data:[...withGames].sort((a,b)=>(b.Assists||0)-(a.Assists||0)).slice(0,15),key:'Assists',color:'#79c0ff',dec:0},
      {title:'💰 True Market Value',data:[...this.filteredPlayers].filter(p=>this.trueVal(p)).sort((a,b)=>this.trueVal(b)-this.trueVal(a)).slice(0,15),key:'_estValue',color:'#ffa657',dec:0},
      {title:'🔥 Highest Form',data:[...withGames].sort((a,b)=>(b.Form||0)-(a.Form||0)).slice(0,15),key:'Form',color:'#ff7b72',dec:1},
      {title:'🏃 Top Workhorses',data:[...withGames].sort((a,b)=>(b.Steals||0)+(b['Tackle %']||0)-(a.Steals||0)-(a['Tackle %']||0)).slice(0,15),key:'Steals',color:'#79c0ff',dec:0},
    ];
  },
  activeChartList() {
    const fp = this.filteredPlayers.filter(p=>p.Games>0);
    if (this.mbChart==='value-rating') return [...this.filteredPlayers].sort((a,b)=>this.trueVal(b)-this.trueVal(a)).slice(0,20);
    if (this.mbChart==='goal-eff') return [...fp].filter(p=>p.xG>0).sort((a,b)=>((b.Goals||0)-(b.xG||0))-((a.Goals||0)-(a.xG||0))).slice(0,20);
    if (this.mbChart==='assist-eff') return [...fp].filter(p=>p.xA>0).sort((a,b)=>((b.Assists||0)-(b.xA||0))-((a.Assists||0)-(a.xA||0))).slice(0,20);
    if (this.mbChart==='age-gems') return [...this.filteredPlayers].filter(p=>p.Age<=26).sort((a,b)=>(b._weightedRating||0)-(a._weightedRating||0)).slice(0,20);
    return [];
  },
  mbMarketList() {
    return this.allPlayers
      .filter(p => p._transferListed && p._listingAsk)
      .map(p => {
        const tv = this.trueVal(p);
        const ratio = tv > 0 ? p._listingAsk / tv : 9;
        const activeNegos = this.espionageNegos.filter(n =>
          (n.playerName||'').toLowerCase() === (p.Player||'').toLowerCase() &&
          (n.status === 'pending' || n.status === 'counter' || n.status === 'countered')
        );
        const counterOffer = tv > 0
          ? Math.round(Math.min(p._listingAsk * 0.85, tv * 0.88) / 500000) * 500000 || Math.round(Math.min(p._listingAsk * 0.85, tv * 0.88) / 100000) * 100000
          : null;
        return { p, tv, ratio, activeNegos, counterOffer };
      })
      .sort((a, b) => a.ratio - b.ratio);
  },
  mbGemsList() {
    return this.allPlayers
      .filter(p => p.Age <= 27 && (p._gameRating || 0) >= 68 && p.Club !== MY_CLUB)
      .map(p => {
        const tv = this.trueVal(p);
        const ageMult = p.Age <= 22 ? 1.3 : p.Age <= 24 ? 1.15 : 1.0;
        const gem = tv > 0 ? (p._gameRating * p._gameRating * ageMult) / (tv / 1e6) : 0;
        const activeNegos = this.espionageNegos.filter(n =>
          (n.playerName||'').toLowerCase() === (p.Player||'').toLowerCase() &&
          (n.status === 'pending' || n.status === 'counter' || n.status === 'countered')
        );
        return { p, tv, gem, activeNegos };
      })
      .filter(x => x.gem > 0)
      .sort((a, b) => b.gem - a.gem)
      .slice(0, 60);
  },
  mbOverList() {
    const MIN_GAMES = 6;
    return this.allPlayers
      .filter(p => (p.Games || 0) >= MIN_GAMES && (p._g90 != null || p._a90 != null))
      .map(p => {
        const g90 = p._g90 || 0;
        const a90 = p._a90 || 0;
        const contrib90 = g90 * 3 + a90 * 2;
        const rtg = p._gameRating || 70;
        const overIndex = contrib90 / Math.max(0.05, (rtg - 58) / 25);
        const isGem = rtg < 79 && contrib90 >= 0.35;
        return { p, contrib90, overIndex, isGem };
      })
      .filter(x => x.contrib90 > 0)
      .sort((a, b) => b.overIndex - a.overIndex)
      .slice(0, 60);
  },
};
