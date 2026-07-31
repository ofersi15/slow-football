// ── API & App constants ───────────────────────────────────────────────────────
export const API = 'https://slowfootball.club/api';
export const MY_CLUB = 'Arsenal';
export const PROXY_TOKEN_URL = 'https://sf-game-proxy.ofersi15.workers.dev/token';

export const ALL_LEAGUES = ['north','south','europa','world','conference','hipster'];
// AI-controlled clubs — excluded from scout/tables; never count as vacancies
export const AI_CLUBS = new Set(['Barcelona','Bayern Munich','Juventus','Damac','Saudi All-Stars','Inter Miami']);
export const ALL_POSITIONS = ['GK','FB','CB','DM','AM','WF','CF'];
export const OUTFIELD_POSITIONS = ['FB','CB','DM','AM','WF','CF'];
export const PAGE_SIZE = 50;  // Scout table only — measured render cost scales with rows×columns; 100 caused a visible hang on tab switch

// ── Cache keys & TTLs ─────────────────────────────────────────────────────────
export const PLAYERS_CACHE_KEY = 'sf_players_v6';
export const STATS_CACHE_KEY = 'sf_stats_v1';
export const PLAYERS_CACHE_TTL = 6 * 60 * 60 * 1000;
export const STATS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
export const ESPIONAGE_CACHE_TTL = 6 * 60 * 60 * 1000;
export const SUBMISSIONS_CACHE_KEY = 'sf_submissions_all_v1';
export const SUBMISSIONS_LS_KEY = 'sf_subs_ls';

// ── Position attribute formulas ───────────────────────────────────────────────
// Game-validated: Rating ≈ avg of these 4 attrs per position
export const GAME_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],
  FB: ['Passing','Tackling','Stamina','Marking'],
  CB: ['Marking','Heading','Tackling','Speed'],
  DM: ['Tackling','Passing','Vision','Marking'],
  AM: ['Passing','Dribbling','Shooting','Vision'],
  WF: ['Dribbling','Passing','Speed','Shooting'],
  CF: ['Speed','Dribbling','Heading','Shooting'],
};
export const GAME_ATTR_LABELS = {
  GK: 'Han, Ref, Spd, Pas',   FB: 'Pas, Tck, Sta, Mk',
  CB: 'Mk, Hdg, Tck, Spd',    DM: 'Tck, Pas, Vis, Mk',
  AM: 'Pas, Drb, Sh, Vis',
  WF: 'Drb, Pas, Spd, Sh',    CF: 'Spd, Drb, Hdg, Sh',
};

// Slot → compatible player positions (from game source)
export const SLOT_COMPAT = {
  GK: ['GK'],
  CB: ['CB','FB','DM'],
  FB: ['FB','CB','DM'],
  DM: ['DM','FB','CB','AM'],
  CM: ['CM','DM','AM'],
  AM: ['AM','WF','CF','DM'],
  WM: ['FB','DM','AM','WF'],
  WF: ['WF','AM','CF'],
  CF: ['CF','WF','AM'],
};

// Slot-specific attrs for Best XI scoring (CM/WM are blended positions)
export const SLOT_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],
  CB: ['Marking','Heading','Tackling','Speed'],
  FB: ['Passing','Tackling','Stamina','Marking'],
  DM: ['Tackling','Marking','Passing','Vision'],
  CM: ['Passing','Vision','Tackling','Dribbling'],
  AM: ['Passing','Dribbling','Shooting','Vision'],
  WM: ['Stamina','Passing','Speed','Dribbling'],
  WF: ['Dribbling','Passing','Speed','Shooting'],
  CF: ['Speed','Dribbling','Heading','Shooting'],
};

export const DEFAULT_MENTAL_ATTRS = ['Mentality','Experience','Work rate'];
export const FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];
// Extended attr sets used for player enrichment in youth/scouting logic
export const ATTR_KEYS_ENR = [...FULL_ATTR_KEYS, 'Mentality','Experience','Leadership','Work rate'];
export const PLAYER_MERGE_ATTRS = [...ATTR_KEYS_ENR, 'Adaptability','Form','Confidence'];

// ── Formations ────────────────────────────────────────────────────────────────
export const FORMATIONS = {
  '442':  ['GK','FB','CB','CB','FB','WM','CM','CM','WM','CF','CF'],
  '4411': ['GK','FB','CB','CB','FB','WM','CM','CM','WM','AM','CF'],
  '4231': ['GK','FB','CB','CB','FB','DM','DM','WF','AM','WF','CF'],
  '433':  ['GK','FB','CB','CB','FB','CM','CM','CM','WF','WF','CF'],
  '4321': ['GK','FB','CB','CB','FB','CM','CM','CM','AM','AM','CF'],
  '3421': ['GK','CB','CB','CB','WM','CM','CM','WM','AM','AM','CF'],
  '352':  ['GK','CB','CB','CB','WM','CM','CM','CM','WM','CF','CF'],
  '343':  ['GK','CB','CB','CB','WM','CM','CM','WM','WF','CF','WF'],
};

// SVG pitch coordinates per formation slot (x 0–68, y 0–105)
export const FORMATION_SLOT_POS = {
  '442':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:55},{x:44,y:55},{x:24,y:55},{x:9,y:55},{x:44,y:20},{x:24,y:20}],
  '4411': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:57},{x:44,y:57},{x:24,y:57},{x:9,y:57},{x:34,y:35},{x:34,y:13}],
  '4231': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:45,y:63},{x:23,y:63},{x:58,y:40},{x:34,y:40},{x:10,y:40},{x:34,y:13}],
  '433':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:48,y:56},{x:34,y:56},{x:20,y:56},{x:58,y:28},{x:10,y:28},{x:34,y:13}],
  '3421': [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:60,y:59},{x:43,y:59},{x:25,y:59},{x:8,y:59},{x:44,y:35},{x:24,y:35},{x:34,y:13}],
  '352':  [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:61,y:58},{x:46,y:58},{x:34,y:58},{x:22,y:58},{x:7,y:58},{x:44,y:20},{x:24,y:20}],
  '343':  [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:60,y:59},{x:43,y:59},{x:25,y:59},{x:8,y:59},{x:58,y:20},{x:34,y:13},{x:10,y:20}],
  '4321': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:50,y:60},{x:34,y:60},{x:18,y:60},{x:44,y:37},{x:24,y:37},{x:34,y:13}],
};

export const POS_ORDER = {GK:0,CB:1,FB:2,DM:3,CM:4,WM:5,AM:6,WF:7,CF:8};

export const POS_COLORS = {
  GK: {fill:'#2d4a1a',stroke:'#7ee787',text:'#7ee787'},
  FB: {fill:'#1a3a5e',stroke:'#79c0ff',text:'#79c0ff'},
  CB: {fill:'#1a3060',stroke:'#79c0ff',text:'#79c0ff'},
  DM: {fill:'#3a2a6b',stroke:'#d2a8ff',text:'#d2a8ff'},
  CM: {fill:'#3a2a1a',stroke:'#ffa657',text:'#ffa657'},
  WM: {fill:'#3a1a3a',stroke:'#d2a8ff',text:'#d2a8ff'},
  AM: {fill:'#4a3a10',stroke:'#ffa657',text:'#ffa657'},
  WF: {fill:'#3a1a1a',stroke:'#ff7b72',text:'#ff7b72'},
  CF: {fill:'#5a1010',stroke:'#ff7b72',text:'#ff7b72'},
};

// ── Player Roles (tactical role per XI slot, added to submissions alongside Plan B) ──────────
// Options are gated by base position — same list the live /submit-team-v2 form offers.
export const PLAYER_ROLES = {
  GK: ['Shot Stopper','Sweeper Keeper','Box Commander'],
  FB: ['Defensive Full Back','Inverted Full Back','Overlapper','Two-Way Full Back'],
  CB: ['No-Nonsense CB','Ball Player','Man Marker'],
  DM: ['Deep-Lying Playmaker','Destroyer','Anchor','Box-to-Box Midfielder'],
  AM: ['Advanced Playmaker','Shadow Striker','Trickster'],
  WF: ['Traditional Winger','Inside Forward','Wide Playmaker'],
  CF: ['Target Man','Poacher','False 9','Complete Forward'],
};
// Short codes for the tight space on pitch nodes — full name still shown in the hover tooltip.
export const ROLE_ABBR = {
  'Shot Stopper':'SHS', 'Sweeper Keeper':'SWK', 'Box Commander':'BXC',
  'Defensive Full Back':'DFB', 'Inverted Full Back':'IFB', 'Overlapper':'OVL', 'Two-Way Full Back':'TWF',
  'No-Nonsense CB':'NNC', 'Ball Player':'BPL', 'Man Marker':'MAN',
  'Deep-Lying Playmaker':'DLP', 'Destroyer':'DES', 'Anchor':'ANC', 'Box-to-Box Midfielder':'B2B',
  'Advanced Playmaker':'APM', 'Shadow Striker':'SST', 'Trickster':'TRK',
  'Traditional Winger':'TRW', 'Inside Forward':'INF', 'Wide Playmaker':'WPM',
  'Target Man':'TGM', 'Poacher':'POA', 'False 9':'F9', 'Complete Forward':'CPF',
};
// Football-literacy heuristic (NOT scraped game data, unlike PLAYER_ROLES/ROLE_ABBR above) — the
// real attributes that make a Role a good fit for a given player, so the Assistant can check a
// Role choice against actual attribute numbers instead of only "legal for this position". Used to
// render a Role→attributes reference into the Assistant's context (buildStaticMechanicsContext in
// src/methods/assistant.js) and isn't tied to any confirmed in-game formula.
export const ROLE_ATTR_HINTS = {
  'Shot Stopper': ['Reflexes', 'Handling'],
  'Sweeper Keeper': ['Speed', 'Passing', 'Vision'],
  'Box Commander': ['Strength', 'Handling', 'Heading'],
  'Defensive Full Back': ['Tackling', 'Marking', 'Strength'],
  'Inverted Full Back': ['Passing', 'Vision', 'Tackling'],
  'Overlapper': ['Speed', 'Stamina', 'Dribbling'],
  'Two-Way Full Back': ['Stamina', 'Tackling', 'Speed'],
  'No-Nonsense CB': ['Tackling', 'Strength', 'Heading'],
  'Ball Player': ['Passing', 'Vision', 'Dribbling'],
  'Man Marker': ['Marking', 'Tackling', 'Speed'],
  'Deep-Lying Playmaker': ['Passing', 'Vision'],
  'Destroyer': ['Tackling', 'Strength', 'Marking'],
  'Anchor': ['Marking', 'Tackling', 'Stamina'],
  'Box-to-Box Midfielder': ['Stamina', 'Speed', 'Tackling', 'Passing'],
  'Advanced Playmaker': ['Passing', 'Vision', 'Dribbling'],
  'Shadow Striker': ['Shooting', 'Speed', 'Dribbling'],
  'Trickster': ['Dribbling', 'Speed', 'Vision'],
  'Traditional Winger': ['Speed', 'Dribbling', 'Passing'],
  'Inside Forward': ['Shooting', 'Dribbling', 'Speed'],
  'Wide Playmaker': ['Passing', 'Vision', 'Dribbling'],
  'Target Man': ['Strength', 'Heading', 'Shooting'],
  'Poacher': ['Shooting', 'Speed'],
  'False 9': ['Passing', 'Vision', 'Dribbling'],
  'Complete Forward': ['Shooting', 'Dribbling', 'Passing', 'Heading'],
};

// ── Plan B (scenario-triggered whole-team tactical shift, fires at most once per match) ──────
export const PLAN_B_SCENARIOS = [
  { key: 'down_to_ten_men',          label: 'Down to 10' },
  { key: 'opponent_down_to_ten_men', label: 'Opp down to 10' },
  { key: 'losing_by_two_or_more',    label: 'Losing by 2+' },
  { key: 'winning_by_two_or_more',   label: 'Winning by 2+' },
  { key: 'concede_in_first_ten',     label: 'Concede early' },
  { key: 'score_in_first_ten',       label: 'Score early' },
];
// The fixed vocabulary of named Plans a manager assigns to each Plan B scenario — confirmed
// directly from a real live submission (Liverpool, 2026-07-29), not a guess: their planBs array
// used exactly these 6 of these 7 values. What's still NOT confirmed is the exact underlying
// Mentality/Style/etc. change each named Plan triggers under the hood — so the assistant should
// recommend one of these real names per scenario, but never invent what it numerically does.
export const PLAN_B_NAMED_PLANS = ['Shut Up Shop', 'Sit Deeper', 'Hold Shape', 'Keep The Ball', 'Go Direct', 'Push On', 'Chase The Game'];

// ── Chemistry constants ───────────────────────────────────────────────────────
export const GAME_START = new Date("2025-08-23T00:00:00Z").getTime();
export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// ── Facility upgrade costs (My Club tab) ──────────────────────────────────────
// Confirmed live via GET /api/facilities/quote?club=X&key=Y, sampled across all ~65 clubs in the
// game (2026-07-31) — NOT hardcoded guesses. Each facility's baseCost-per-target-level is a clean
// linear formula (fits every sampled from→to transition exactly), captured here as literal costs
// rather than a formula so nothing beyond what was actually observed is asserted.
// The final cost a club pays is baseCost * (1 - clubDiscount) — clubDiscount comes from
// staff/effects.finances.facilityDiscount (a CEO effect), always fetched live per-club.
// Max level: training/academy/scouting/analytics confirmed capped at 5 (the live quote endpoint
// returns a same-level, £0 result for a level-5 club — i.e. there is no level 6 to buy).
// medical/stadium: no club in the sample had reached level 5, so the 4→5 cost below IS confirmed,
// but whether a level 6+ exists is NOT — stadium's maintenance rate table (see
// FACILITY_MAINTENANCE_RATES below) lists rates up to level 8, which hints levels above 5 exist
// for stadium specifically, but no upgrade cost for them has ever been observed.
export const FACILITY_UPGRADE_COST = {
  training:  { 2: 8000000,  3: 12000000, 4: 16000000, 5: 20000000 },
  academy:   { 2: 6000000,  3: 9000000,  4: 12000000, 5: 15000000 },
  scouting:  { 2: 4000000,  3: 6000000,  4: 8000000,  5: 10000000 },
  medical:   { 2: 5000000,  3: 7500000,  4: 10000000, 5: 12500000 },
  analytics: { 2: 3000000,  3: 4500000,  4: 6000000,  5: 7500000 },
  stadium:   { 2: 25000000, 3: 40000000, 4: 55000000, 5: 70000000 },
};
export const FACILITY_MAX_LEVEL_CONFIRMED = { training: 5, academy: 5, scouting: 5, analytics: 5, medical: 5, stadium: 5 };
export const FACILITY_MAX_LEVEL_UNCERTAIN = new Set(['medical', 'stadium']); // level 5 reached, but never confirmed as the true ceiling

// Weekly running cost by level — confirmed via GET /api/maintenance/{key}/preview and
// GET /api/academy/maintenance/preview (2026-07-31). training/academy scale with squad/academy
// headcount (banded rates below are £/player at each band, not a flat total); scouting/stadium
// are flat £/week by level. medical and analytics have NO weekly running cost (confirmed absent
// from every /office/overview maintenance breakdown sampled).
export const FACILITY_MAINTENANCE_RATES = {
  stadium:  { 1: 20000, 2: 35000, 3: 60000, 4: 90000, 5: 130000, 6: 180000, 7: 240000, 8: 310000 },
  scouting: { 1: 7500, 2: 20000, 3: 40000, 4: 65000, 5: 100000 },
  // training bands: £/player for the 1st 10 players, then 11-20th, etc. (5 bands per level)
  training: { 1: [1200, 2500, 3500, 5000, 7000], 2: [2500, 3500, 6000, 8500, 12000], 3: [3500, 6000, 9000, 12000, 18000], 4: [5000, 8500, 12000, 18000, 27000], 5: [7000, 12000, 18000, 27000, 40000] },
  // academy bands: £/player for the 1st 4 academy players, then 5-8th, etc. (6 bands per level)
  academy:  { 1: [5000, 10000, 20000, 35000, 50000, 75000], 2: [10000, 20000, 30000, 45000, 65000, 80000], 3: [15000, 25000, 40000, 55000, 75000, 100000], 4: [20000, 30000, 45000, 65000, 90000, 120000], 5: [25000, 40000, 60000, 90000, 125000, 150000] },
};

// What each facility level reliably delivers, confirmed by cross-referencing live data at that
// exact level across multiple clubs (2026-07-31) — NOT the old per-level formulas (removed; those
// asserted things like "+20% XP per level" that turned out to be flatly wrong, since training XP
// bonus / scouting quality bump / academy youth development are actually STAFF-quality-driven, not
// facility-level-driven — a level-3 club with no coach shows the same 0% bonus as a level-1 club).
// Only genuinely level-driven facts are listed here.
export const FACILITY_LEVEL_FACTS = {
  // Stadium capacity — confirmed for levels 1-4 via live /office/overview across 4 clubs at each
  // level. Level 5 capacity has never been observed (no level-5 stadium in the sampled clubs).
  stadium: { capacity: { 1: 30000, 2: 40000, 3: 50000, 4: 60000 } },
  // Medical Centre component of injury/recovery multipliers (the OTHER component comes from your
  // physio's rating, not level) — confirmed for levels 1-4 across 4 clubs at each level.
  medical: {
    injuryMult:    { 1: 1.00, 2: 0.97, 3: 0.94, 4: 0.90 },   // lower is better (multiplies base injury risk)
    recoveryMult:  { 1: 1.00, 2: 1.04, 3: 1.08, 4: 1.12 },   // higher is better (multiplies recovery speed)
  },
  // Active scouting job slots — confirmed across all 5 levels. Flat at 1 slot until level 5, which
  // unlocks a 2nd. (The old reference claiming "3 base slots +1/+2 at high levels" was wrong.)
  scouting: { maxActiveJobs: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2 } },
  // Formations unlocked by Analytics Dept level — this one WAS already accurate (scraped from the
  // live /submit-team-v2 JS, see FORMATION_TIERS in assistant.js), kept here only as a pointer.
  analytics: { formationTiersRef: 'FORMATION_TIERS in src/methods/assistant.js' },
};

// Scouted prospect quality by Scouting Network level — confirmed via GET /api/scouting/jobs,
// sampled across 30 active jobs from clubs at every level (2026-07-31). qualityBoostPct is an
// exact formula (level × 5%) that matched all 30 samples with zero exceptions. ratingBand is NOT
// a fixed function of level — it varies job-to-job by prospect/position — so only the observed
// range and most-common ("typical") band across the sample are stored, never a guaranteed number.
export const SCOUTING_QUALITY_BY_LEVEL = {
  1: { qualityBoostPct: 5,  sampleSize: 4,  observedMin: 55, observedMax: 65, typicalBand: [60, 65] },
  2: { qualityBoostPct: 10, sampleSize: 5,  observedMin: 60, observedMax: 70, typicalBand: [65, 70] },
  3: { qualityBoostPct: 15, sampleSize: 3,  observedMin: 60, observedMax: 70, typicalBand: [65, 70] },
  4: { qualityBoostPct: 20, sampleSize: 6,  observedMin: 60, observedMax: 70, typicalBand: [65, 70] },
  5: { qualityBoostPct: 25, sampleSize: 12, observedMin: 60, observedMax: 75, typicalBand: [70, 75] },
};
// Academy facility level, by contrast, has NO confirmed effect on youth development quality:
// cross-referencing staff/effects.youthDevelopment (ceiling/meanMult) against academy level across
// 5 clubs (2026-07-31) showed no monotonic trend at all — a level-4 club scored WORSE than a
// level-1 club. That stat is staff (youth coach) driven, not facility-level driven. Academy level's
// only confirmed effects are the upgrade cost and the weekly per-player upkeep band.
