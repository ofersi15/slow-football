// ── Slot / formation helpers ──────────────────────────────────────────────────
// Build slot key array for a formation: '433' → ['GK1','FB1','CB1','CB2','FB2',...]
export function buildSlotKeys(code) {
  const slots = FORMATIONS[code];
  if (!slots) return [];
  const counts = {};
  return slots.map(s => { counts[s] = (counts[s]||0)+1; return `${s}${counts[s]}`; });
}

// ── Rating calculations ───────────────────────────────────────────────────────
export function calcGameRating(p, pos) {
  const attrs = GAME_ATTRS[pos];
  if (!attrs) return null;
  const vals = attrs.map(a => p[a]).filter(v => v != null && v > 0);
  if (!vals.length) return null;
  return Math.round(vals.reduce((a,b) => a+b, 0) / vals.length * 10) / 10;
}

export function calcWeightedRating(p, pos, mentalAttrs, mentalWeightPct) {
  const gameRtg = calcGameRating(p, pos);
  if (gameRtg === null) return null;
  if (!mentalWeightPct || !mentalAttrs.length) return gameRtg;
  const mentalVals = mentalAttrs.map(a => p[a]).filter(v => v != null && v > 0);
  if (!mentalVals.length) return gameRtg;
  const mentalScore = mentalVals.reduce((a,b) => a+b, 0) / mentalVals.length;
  const w = mentalWeightPct / 100;
  return Math.round((gameRtg * (1 - w) + mentalScore * w) * 10) / 10;
}

// Estimated true transfer value — in-game values track Transfermarkt but transactions run 2-4× higher
export function calcEstValue(p) {
  if (!p.Value || !p.Rating) return null;
  const r = p.Rating;
  const age = p.Age || 26;
  const rMult = r >= 87 ? 4.0 : r >= 84 ? 3.0 : r >= 81 ? 2.2 : r >= 78 ? 1.7 : r >= 75 ? 1.3 : 1.0;
  const ageMult = age <= 22 ? 1.5 : age <= 25 ? 1.3 : age <= 28 ? 1.0 : age <= 31 ? 0.75 : 0.5;
  const est = p.Value * rMult * ageMult;
  return Math.round(est / 500000) * 500000 || Math.round(est / 100000) * 100000;
}

// ── Formatters ────────────────────────────────────────────────────────────────
export function fmtVal(v) { return v>=1e6?`£${(v/1e6).toFixed(1)}m`:v>=1e3?`£${(v/1e3).toFixed(0)}k`:v?`£${v}`:'—'; }
export function fmtWage(v) { return v?`£${(v/1000).toFixed(0)}k/w`:'—'; }

// ── Chemistry & Traits ────────────────────────────────────────────────────────
export function gameWeekNow() {
  return Math.max(0, Math.round((Date.now() - GAME_START) / WEEK_MS));
}

// Returns weeks the player has been at their current club (from done deals).
// Returns null if no arrival deal found (caller defaults to gameWeekNow() = "founder").
export function playerArrivalWeeks(playerName, club, deals) {
  const norm = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
  const pn = norm(playerName);
  const cl = norm(club);
  const arrivals = (deals||[])
    .filter(d => norm(d.playerName||d.player||d.name||'') === pn &&
                 norm(d.toClub||d.buyer||d.buyerClub||d.to||'') === cl)
    .map(d => {
      const ts = d.ts||d.updatedAt||d.createdAt||d.date;
      if (!ts) return null;
      const t = new Date(ts).getTime();
      if (!t || t < GAME_START) return 0;
      return Math.round((t - GAME_START) / WEEK_MS);
    })
    .filter(w => w !== null)
    .sort((a,b) => a-b);
  if (!arrivals.length) return null;
  return Math.max(0, gameWeekNow() - arrivals[0]);
}

// Compute trait badges for a player (ported from game source cG function)
export function computeTraits(player) {
  const pos = player.Position || '';
  const a = attr => Number(player[attr] || 0);
  const traits = [];
  if (pos === 'CF' || pos === 'WF') {
    if (a('Shooting') >= 80) traits.push({n:'Clinical Finisher', d:'Consistently puts away their chances.'});
    if (a('Speed') >= 82)    traits.push({n:'Pace Merchant',      d:"Explosive behind defensive lines."});
    if (a('Heading') >= 80 && pos === 'CF') traits.push({n:'Aerial Threat', d:'Dominant in the air from crosses and corners.'});
    if (a('Dribbling') >= 80) traits.push({n:'Close Control',     d:'Exceptional in tight areas, difficult to dispossess.'});
  }
  if (pos === 'CM' || pos === 'AM' || pos === 'DM') {
    if (a('Vision') >= 82)   traits.push({n:'Visionary',   d:'Sees passes others miss. Finds runners in behind.'});
    if (a('Passing') >= 82)  traits.push({n:'Metronome',   d:'High pass completion with the range to switch play.'});
    if (pos === 'DM' && a('Tackling') >= 80) traits.push({n:'Ball Winner', d:'Reads attacks early to break up play.'});
    if (a('Dribbling') >= 80) traits.push({n:'Carrier',    d:'Drives through midfield under pressure.'});
  }
  if (pos === 'CB' || pos === 'FB') {
    if (a('Tackling') >= 82)  traits.push({n:'Tackle Machine',    d:'Ferocious in the challenge.'});
    if (a('Heading') >= 82)   traits.push({n:'Aerial Dominator',  d:'Set piece threat at both ends of the pitch.'});
    if (a('Passing') >= 78)   traits.push({n:'Distribution',      d:'Comfortable on the ball, plays out from the back.'});
    if (pos === 'FB' && a('Speed') >= 80) traits.push({n:'Overlap Merchant', d:'Creates width and overloads in wide areas.'});
  }
  if (pos === 'GK') {
    if (a('Reflexes') >= 82)  traits.push({n:'Reaction Royalty', d:'Makes saves that look impossible.'});
    if (a('Handling') >= 80)  traits.push({n:'Safe Hands',       d:'Commanding under crosses.'});
    if (a('Speed') >= 72)     traits.push({n:'Sweeper Keeper',   d:'Comfortable with the ball at their feet.'});
  }
  const posAttrs = GAME_ATTRS[pos] || [];
  if (posAttrs.length) {
    const avg = posAttrs.reduce((s, attr) => s + a(attr), 0) / posAttrs.length;
    if (avg >= 83) {
      const archetype = player.Archetype || player.archetype || pos;
      traits.push({n:`Complete ${archetype}`, d:'Exceptionally well-rounded — no significant weaknesses.'});
    }
  }
  return traits.slice(0, 4);
}

// Compute chemistry bonds between a player and their squadmates (ported from game source lG function)
export function computeBonds(player, squadPlayers, deals) {
  if (!player || !player.Player || !player.Club) return [];
  const now = gameWeekNow();
  const playerWeeks = playerArrivalWeeks(player.Player, player.Club, deals) ?? now;
  const nat = player.Nationality || '';
  return (squadPlayers||[])
    .filter(m => m.Player !== player.Player && m.Position)
    .slice(0, 12)
    .map(m => {
      const mWeeks = playerArrivalWeeks(m.Player, player.Club, deals) ?? now;
      const shared = Math.min(playerWeeks, mWeeks);
      if (shared < 13) return null;
      const sameNat = !!(nat && nat === (m.Nationality || ''));
      const category = (shared >= 30 || (sameNat && shared >= 25)) ? 'great' : 'good';
      const label = shared >= 60 ? 'Long-term' : shared >= 30 ? 'Established' : 'Building';
      return { name: m.Player, pos: m.Position, weeks: shared, category, label, sameNat };
    })
    .filter(Boolean)
    .sort((a,b) => b.weeks - a.weeks);
}

// Compute overall team chemistry score 0–100
export function computeClubChem(clubPlayers, deals) {
  if (!clubPlayers || clubPlayers.length < 2) return null;
  const club = clubPlayers[0].Club;
  if (!club) return null;
  const now = gameWeekNow();
  const weeks = clubPlayers.map(p => playerArrivalWeeks(p.Player, club, deals) ?? now);
  let total = 0, pairs = 0;
  for (let i = 0; i < weeks.length; i++) {
    for (let j = i+1; j < weeks.length; j++) {
      total += Math.min(weeks[i], weeks[j]) / 60;
      pairs++;
    }
  }
  return pairs ? Math.min(100, Math.round(total / pairs * 100)) : null;
}
