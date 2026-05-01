import { MY_CLUB, FORMATIONS, SLOT_ATTRS, SLOT_COMPAT } from '../constants.js'

export const squadComputed = {
  filterableAttrs() {
    return [
      {k:'Speed',l:'Speed'},{k:'Stamina',l:'Stamina'},{k:'Dribbling',l:'Drib'},
      {k:'Passing',l:'Pass'},{k:'Shooting',l:'Shoot'},{k:'Tackling',l:'Tckl'},
      {k:'Marking',l:'Mark'},{k:'Heading',l:'Head'},{k:'Vision',l:'Vision'},
      {k:'Handling',l:'Handl'},{k:'Reflexes',l:'Reflex'},
      {k:'Mentality',l:'Mental'},{k:'Experience',l:'Exp'},{k:'Work rate',l:'Wk.Rate'},
      {k:'Leadership',l:'Leader'},{k:'Adaptability',l:'Adapt'},
    ];
  },
  activeAttrFilterCount() {
    return Object.values(this.attrFilters).filter(v => v > 0).length;
  },
  mySquadPlayers() {
    return this.allPlayers.filter(p => p.Club === MY_CLUB);
  },
  lineupPlayerMap() {
    const map = {};
    for (const p of this.allPlayers) {
      if (p.Player) map[p.Player.toLowerCase()] = p;
    }
    return map;
  },
  lineupWithStats() {
    if (!this.savedLineup) return null;
    const map = this.lineupPlayerMap;
    const enrich = name => (name ? map[name.toLowerCase()] : null) || null;
    return {
      ...this.savedLineup,
      xi: (this.savedLineup.xi || []).map(slot => ({ ...slot, player: enrich(slot.name) })),
      subs: (this.savedLineup.subs || []).map(sub => ({ ...sub, player: enrich(sub.name) })),
    };
  },
  mySquadByPosition() {
    const order = ['GK','FB','CB','DM','CM','AM','WF','CF'];
    const groups = {};
    order.forEach(pos => { groups[pos] = []; });
    this.mySquadPlayers.forEach(p => {
      if (groups[p.Position]) groups[p.Position].push(p);
    });
    order.forEach(pos => groups[pos].sort((a,b) => (b._gameRating||0)-(a._gameRating||0)));
    return order.map(pos => ({ pos, players: groups[pos] })).filter(g => g.players.length);
  },
  bestXIPlayers() {
    const slots = FORMATIONS[this.mySquadFormation];
    if (!slots) return [];
    const squad = this.mySquadPlayers;
    const used = new Set();
    const slotRtgFor = (p, slot) => {
      const attrs = SLOT_ATTRS[slot] || [];
      const vals = attrs.map(a => p[a]).filter(v => v != null && v > 0);
      return vals.length ? vals.reduce((a,b) => a+b, 0) / vals.length : 0;
    };
    return slots.map((slot, idx) => {
      const compat = SLOT_COMPAT[slot] || [slot];
      let best = null, bestSlotRtg = -1;
      for (const p of squad) {
        if (used.has(p.Player)) continue;
        if (!compat.includes(p.Position)) continue;
        const slotRtg = slotRtgFor(p, slot);
        if (slotRtg > bestSlotRtg) { best = p; bestSlotRtg = slotRtg; }
      }
      if (best) used.add(best.Player);
      const slotRating = best ? Math.round(slotRtgFor(best, slot) * 10) / 10 : null;
      return { slot, player: best, idx, slotRating };
    });
  },
  mySquadSetPieces() {
    const sq = this.mySquadPlayers;
    const top = (key, n=5) => [...sq].filter(p => p[key] != null && p[key] > 0).sort((a,b) => (b[key]||0)-(a[key]||0)).slice(0,n);
    return [
      { title: '🎯 Free Kicks', key: 'Free kicks', players: top('Free kicks') },
      { title: '⚽ Penalties', key: 'Penalties', players: top('Penalties') },
      { title: '🔵 Corners', key: 'Corners', players: top('Corners') },
    ];
  },
  mySquadCaptainList() {
    return [...this.mySquadPlayers]
      .filter(p => p.Leadership != null)
      .sort((a,b) => (b.Leadership||0) - (a.Leadership||0))
      .slice(0, 8);
  },
};
