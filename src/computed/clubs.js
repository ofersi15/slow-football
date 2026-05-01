import { POS_ORDER } from '../constants.js'

export const clubsComputed = {
  selectedClubPlayers() {
    if (!this.selectedClubName) return [];
    const sort = this.clubSquadSort || 'pos';
    return this.allPlayers
      .filter(p => p.Club === this.selectedClubName)
      .sort((a,b) => {
        if (sort === 'pos') {
          const po = (POS_ORDER[a.Position]??9) - (POS_ORDER[b.Position]??9);
          if (po !== 0) return po;
          return (b._gameRating||b.Rating||0) - (a._gameRating||a.Rating||0);
        }
        if (sort === 'rating') return (b._gameRating||b.Rating||0) - (a._gameRating||a.Rating||0);
        if (sort === 'value') return (b.Value||0) - (a.Value||0);
        if (sort === 'age') return (a.Age||0) - (b.Age||0);
        return (a.Player||'').localeCompare(b.Player||'');
      });
  },
  selectedClubSubmissions() {
    if (!this.selectedClubName) return [];
    const byGw = this.submissionsCache[this.selectedClubName] || {};
    return Object.values(byGw).sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  },
  selectedClubTransfers() {
    if (!this.selectedClubName) return [];
    return (this.clubTransferMap[this.selectedClubName] || []).slice(0, 20);
  },
  selectedClubEspData() {
    if (!this.selectedClubName) return null;
    return this.espionageClubs.find(c => c.club === this.selectedClubName) || null;
  },
};
