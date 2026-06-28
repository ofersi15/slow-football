import { MY_CLUB } from '../constants.js'
import { computeTraits, computeBonds, computeClubChem, computeDislikes } from '../utils.js'

export const modalComputed = {
  activeModalStats() {
    const d = this.selectedPlayerStats;
    if (!d) return null;
    if (this.selectedPlayerStatsTab === 'season') return d.seasonStats || null;
    if (this.selectedPlayerStatsTab === 'career') return d.career || d.seasonStats || null;
    return null;
  },
  selectedPlayerTraits() {
    return this.selectedPlayer ? computeTraits(this.selectedPlayer) : [];
  },
  selectedPlayerBonds() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const squad = this.allPlayers.filter(p => p.Club === this.selectedPlayer.Club);
    return computeBonds(this.selectedPlayer, squad, this.allDeals);
  },
  selectedPlayerDislikes() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const squad = this.allPlayers.filter(p => p.Club === this.selectedPlayer.Club);
    return computeDislikes(this.selectedPlayer, squad, this.allDeals);
  },
  mySquadChem() {
    const squad = this.allPlayers.filter(p => p.Club === MY_CLUB);
    return computeClubChem(squad, this.allDeals);
  },
  availableTraits() {
    const seen = new Set();
    this.allPlayers.forEach(p => computeTraits(p).forEach(t => seen.add(t.n)));
    return ['', ...Array.from(seen).sort()];
  },
  selectedPlayerBondSummary() {
    const bonds = this.selectedPlayerBonds;
    if (!bonds.length) return null;
    const longTerm  = bonds.filter(b => b.label === 'Long-term').length;
    const established = bonds.filter(b => b.label === 'Established').length;
    const building  = bonds.filter(b => b.label === 'Building').length;
    const parts = [];
    if (longTerm)   parts.push({label: `${longTerm} Long-term`,   color: '#3fb950'});
    if (established) parts.push({label: `${established} Established`, color: '#d29922'});
    if (building)   parts.push({label: `${building} Building`,    color: '#8b949e'});
    return parts;
  },
  selectedPlayerNegos() {
    if (!this.selectedPlayer) return [];
    const name = (this.selectedPlayer.Player||this.selectedPlayer.name||'').toLowerCase();
    if (!name) return [];
    return this.espionageNegos.filter(n => (n.playerName||'').toLowerCase() === name);
  },
  espionageNegoPage() {
    return this.espionageNegoFiltered.slice(0, this.negoDisplayCount);
  },
  selectedPlayerNegosVisible() {
    const all = this.selectedPlayerNegos;
    if (this.negoShowAllModal) return all;
    const cutoff = Date.now() - 30 * 24 * 3600 * 1000;
    const recent = all.filter(n => new Date(n.updatedAt||0).getTime() >= cutoff);
    return recent.length ? recent : all.slice(0, 5);
  },
};
