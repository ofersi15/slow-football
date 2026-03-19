// Off-thread JSON parse AND stringify — keeps heavy serialisation off the main thread.
// parseAsync  : avoids a 200ms freeze when reading the 1940KB player cache on load.
// stringifyAsync: avoids the 2–5s freeze when WRITING the cache after a fresh squad fetch.
// Both fall back to synchronous equivalents if Workers aren't available.
function parseAsync(jsonStr) {
  if (typeof Worker === 'undefined') return Promise.resolve(JSON.parse(jsonStr));
  return new Promise((resolve, reject) => {
    const blob = new Blob(
      ['self.onmessage=e=>{try{postMessage({r:JSON.parse(e.data)})}catch(x){postMessage({e:String(x)})}}'],
      {type: 'text/javascript'}
    );
    const url = URL.createObjectURL(blob);
    const w = new Worker(url);
    w.onmessage = ({data}) => {
      w.terminate(); URL.revokeObjectURL(url);
      data.r !== undefined ? resolve(data.r) : reject(new Error(data.e));
    };
    w.onerror = err => { w.terminate(); URL.revokeObjectURL(url); reject(err); };
    w.postMessage(jsonStr);
  });
}
// stringifyAsync: posts the object to a Worker; Worker does JSON.stringify off-thread,
// posts back the resulting string.  structured-clone of plain objects is ~5ms vs
// 2–5s for synchronous JSON.stringify of 1940KB.
function stringifyAsync(data) {
  if (typeof Worker === 'undefined') return Promise.resolve(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    const blob = new Blob(
      ['self.onmessage=e=>{try{postMessage(JSON.stringify(e.data))}catch(x){postMessage({__e:String(x)})}}'],
      {type: 'text/javascript'}
    );
    const url = URL.createObjectURL(blob);
    const w = new Worker(url);
    w.onmessage = ({data}) => {
      w.terminate(); URL.revokeObjectURL(url);
      typeof data === 'string' ? resolve(data) : reject(new Error(data?.__e || 'stringify failed'));
    };
    w.onerror = err => { w.terminate(); URL.revokeObjectURL(url); reject(err); };
    w.postMessage(data);
  });
}

const API = 'https://slowfootball.club/api';
const MY_CLUB = 'Leverkusen';
const ALL_LEAGUES = ['north','south','europa','world','conference','hipster'];
const ALL_POSITIONS = ['GK','FB','CB','DM','CM','AM','WF','CF'];
const OUTFIELD_POSITIONS = ['FB','CB','DM','CM','AM','WF','CF'];
const PAGE_SIZE = 100;
const TACTICS_CACHE_KEY = 'sf_tactics_v4';
const TACTICS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
// Player data cache — loaded instantly on revisit; refreshed in background weekly
const PLAYERS_CACHE_KEY = 'sf_players_v6';
const STATS_CACHE_KEY = 'sf_stats_v1';
const PLAYERS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week
const SUBMISSIONS_CACHE_KEY = 'sf_submissions_all_v1';
const SUBMISSIONS_CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours (KV TTL check)
const SUBMISSIONS_LS_KEY = 'sf_subs_ls'; // localStorage key — no TTL, persists forever

// ── Server-side cache helpers ──────────────────────────────────────────────
// When running via server.py, these persist across browser cache clears and
// are shared across all devices on the same network / Tailscale VPN.
// All three fall back silently to localStorage if the server is unreachable.
const SF_CACHE_BASE = location.hostname === 'sf.ofersi15.workers.dev'
  ? 'https://sf-cache.ofersi15.workers.dev/sf-cache'
  : '/sf-cache';
async function serverCacheGet(key) {
  if (location.protocol === 'file:') return null;  // no server when opened from disk
  try {
    const r = await fetch(`${SF_CACHE_BASE}/${key}`, {signal: AbortSignal.timeout(3000)});
    if (!r.ok) return null;
    return await r.text();
  } catch(e) { return null; }
}
async function serverCacheSet(key, str) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: str,
      signal: AbortSignal.timeout(5000),
    });
  } catch(e) { /* server not running — localStorage is the fallback */ }
}
async function serverCacheDelete(key) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}`, {method: 'DELETE', signal: AbortSignal.timeout(3000)});
  } catch(e) {}
}
// ─────────────────────────────────────────────────────────────────────────

// Game-validated position attrs (empirically derived from live data — simple equal-weight average)
// For outfield positions (FB/CB/DM/AM/WF/CF): Rating ≈ avg of these 4 attrs (diff ~0.2)
// GK formula is more complex; Handling+Reflexes+Speed+Stamina is approximate
const GAME_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],           // confirmed by user: Passing not Stamina
  FB: ['Passing','Tackling','Stamina','Marking'],          // exact avg
  CB: ['Marking','Heading','Tackling','Speed'],            // exact avg
  DM: ['Tackling','Passing','Vision','Marking'],           // exact avg
  CM: ['Vision','Passing','Dribbling','Shooting'],         // from game source (q0 map)
  AM: ['Passing','Dribbling','Shooting','Vision'],         // exact avg
  WF: ['Dribbling','Passing','Speed','Shooting'],          // exact avg
  CF: ['Speed','Dribbling','Heading','Shooting'],          // confirmed: Speed+Drb+Hdg+Sh
};
const GAME_ATTR_LABELS = {
  GK: 'Han, Ref, Spd, Pas',   FB: 'Pas, Tck, Sta, Mk',
  CB: 'Mk, Hdg, Tck, Spd',    DM: 'Tck, Pas, Vis, Mk',
  CM: 'Vis, Pas, Drb, Sh',    AM: 'Pas, Drb, Sh, Vis',
  WF: 'Drb, Pas, Spd, Sh',    CF: 'Spd, Drb, Hdg, Sh',
};

// Formation slot arrays from game source (slowfootball.club/assets/index-Bx3fKXfu.js — Co object)
// WM = Wing Mid slot (filled by FB/DM/AM/WF players per SLOT_COMPAT)
const FORMATIONS = {
  '442':  ['GK','FB','CB','CB','FB','WM','CM','CM','WM','CF','CF'],
  '4411': ['GK','FB','CB','CB','FB','WM','CM','CM','WM','AM','CF'],
  '4231': ['GK','FB','CB','CB','FB','DM','DM','WF','AM','WF','CF'],
  '433':  ['GK','FB','CB','CB','FB','CM','CM','CM','WF','WF','CF'],
  '3421': ['GK','CB','CB','CB','WM','CM','CM','WM','AM','AM','CF'],
  '352':  ['GK','CB','CB','CB','WM','CM','CM','CM','WM','CF','CF'],
};
// Default slot positions per formation — pitch coordinates: x 0–68 (left→right), y 0–105 (attacking→GK end)
// API sends right-side players first, then left-side. x values are flipped (68-x) to match.
// Matches real football pitch dimensions (68m × 105m). Run x,y (0–100%) scale to same space.
const FORMATION_SLOT_POS = {
  // GK  RB           RCB          LCB          LB           RM           RCM          LCM          LM           RST          LST
  '442':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:55},{x:44,y:55},{x:24,y:55},{x:9,y:55},{x:44,y:20},{x:24,y:20}],
  // GK  RB           RCB          LCB          LB           RM           RCM          LCM          LM           SS           CF
  '4411': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:57},{x:44,y:57},{x:24,y:57},{x:9,y:57},{x:34,y:35},{x:34,y:13}],
  // GK  RB           RCB          LCB          LB           DMR          DML          RAM          CAM          LAM          CF
  '4231': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:45,y:63},{x:23,y:63},{x:58,y:40},{x:34,y:40},{x:10,y:40},{x:34,y:13}],
  // GK  RB           RCB          LCB          LB           RCM          CM           LCM          RW           LW           CF
  '433':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:48,y:56},{x:34,y:56},{x:20,y:56},{x:58,y:28},{x:10,y:28},{x:34,y:13}],
  // GK  RCB          CB           LCB          RWM          RCM          LCM          LWM          RAM          LAM          CF
  '3421': [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:60,y:59},{x:43,y:59},{x:25,y:59},{x:8,y:59},{x:44,y:35},{x:24,y:35},{x:34,y:13}],
  // GK  RCB          CB           LCB          RWM          RCM          CM           LCM          LWM          RST          LST
  '352':  [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:61,y:58},{x:46,y:58},{x:34,y:58},{x:22,y:58},{x:7,y:58},{x:44,y:20},{x:24,y:20}],
};

// Key attribute to display per base position in club XI view
const MAIN_ATTR = {
  GK:'Reflexes', FB:'Speed', CB:'Marking', DM:'Tackling',
  CM:'Passing',  WM:'Dribbling', AM:'Vision', WF:'Dribbling', CF:'Shooting',
};

// Display order for squad position grouping
const POS_ORDER = {GK:0,CB:1,FB:2,DM:3,CM:4,WM:5,AM:6,WF:7,CF:8};

// Position colors for SVG pitch (fill, stroke)
const POS_COLORS = {
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

// Slot → compatible player positions (Bfe function from game source)
const SLOT_COMPAT = {
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

// Slot-specific attribute formulas used for Best XI candidate scoring
// Different from GAME_ATTRS (which defines each position's own rating)
// CM slot blends DM (defensive) + AM (attacking), WM blends FB + WF
const SLOT_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],
  CB: ['Marking','Heading','Tackling','Speed'],
  FB: ['Passing','Tackling','Stamina','Marking'],
  DM: ['Tackling','Marking','Passing','Vision'],
  CM: ['Passing','Vision','Tackling','Dribbling'],  // DM+AM blend
  AM: ['Passing','Dribbling','Shooting','Vision'],
  WM: ['Stamina','Passing','Speed','Dribbling'],    // FB+WF blend
  WF: ['Dribbling','Passing','Speed','Shooting'],
  CF: ['Speed','Dribbling','Heading','Shooting'],
};

// Default mental attrs included in weighted rating calculation
const DEFAULT_MENTAL_ATTRS = ['Mentality','Experience','Work rate'];

// Attrs to check for "incomplete stats" detection (youth promotions / newly added players)
// If fewer than 5 of these 12 standard physical attrs are non-zero, player has limited data
const FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];

// Build slot key array for a formation code: '433' → ['GK1','FB1','CB1','CB2','FB2','CM1','CM2','CM3','WF1','WF2','CF1']
function buildSlotKeys(code) {
  const slots = FORMATIONS[code];
  if (!slots) return [];
  const counts = {};
  return slots.map(s => { counts[s] = (counts[s]||0)+1; return `${s}${counts[s]}`; });
}

function calcGameRating(p, pos) {
  const attrs = GAME_ATTRS[pos];
  if (!attrs) return null;
  const vals = attrs.map(a => p[a]).filter(v => v != null && v > 0);
  if (!vals.length) return null;
  return Math.round(vals.reduce((a,b) => a+b, 0) / vals.length * 10) / 10;
}

function calcWeightedRating(p, pos, mentalAttrs, mentalWeightPct) {
  const gameRtg = calcGameRating(p, pos);
  if (gameRtg === null) return null;
  if (!mentalWeightPct || !mentalAttrs.length) return gameRtg;
  const mentalVals = mentalAttrs.map(a => p[a]).filter(v => v != null && v > 0);
  if (!mentalVals.length) return gameRtg;
  const mentalScore = mentalVals.reduce((a,b) => a+b, 0) / mentalVals.length;
  const w = mentalWeightPct / 100;
  return Math.round((gameRtg * (1 - w) + mentalScore * w) * 10) / 10;
}

// Estimated true transfer value — based on in-game value adjusted for rating and age
// In-game values track real Transfermarkt values but actual game transactions are typically 2-4x higher
function calcEstValue(p) {
  if (!p.Value || !p.Rating) return null;
  const r = p.Rating;
  const age = p.Age || 26;
  const rMult = r >= 87 ? 4.0 : r >= 84 ? 3.0 : r >= 81 ? 2.2 : r >= 78 ? 1.7 : r >= 75 ? 1.3 : 1.0;
  const ageMult = age <= 22 ? 1.5 : age <= 25 ? 1.3 : age <= 28 ? 1.0 : age <= 31 ? 0.75 : 0.5;
  const est = p.Value * rMult * ageMult;
  return Math.round(est / 500000) * 500000 || Math.round(est / 100000) * 100000;
}

function fmtVal(v) { return v>=1e6?`£${(v/1e6).toFixed(1)}m`:v>=1e3?`£${(v/1e3).toFixed(0)}k`:v?`£${v}`:'—'; }
function fmtWage(v) { return v?`£${(v/1000).toFixed(0)}k/w`:'—'; }

const { createApp, nextTick } = Vue;

createApp({
  data() {
    return {
      loaded: false, corsError: false, progress: 0, loadMsg: 'Starting…',
      allPlayers: [], leagueTables: {}, managedSet: new Set(), asOfWeek: '?', totalClubs: 0,
      transferMap: {},
      myClub: MY_CLUB,
      leagueFilter: new Set(ALL_LEAGUES),
      posFilter: new Set(ALL_POSITIONS),
      maxAge: 40, search: '',
      hideOwn: false, hideVacant: true, managedOnly: false, forSaleOnly: false,
      transferListedOnly: false, injuredOnly: false,
      sortCol: '_gameRating', sortDir: -1, page: 0,
      // Per-position rating filters — each pos has its own min threshold
      posRatingFilters: {GK:60,FB:60,CB:60,DM:60,CM:60,AM:60,WF:60,CF:60},
      posRatingMax: 99,            // global max rating cap
      posRatingUseWeighted: false, // filter by weighted rating instead of game rating
      posRatingsOpen: false,
      // Stats enrichment state
      statsEnriching: false, statsProgress: 0, statsEnriched: false,
      activeTab: localStorage.getItem('sf_activeTab') || 'squad',
      tabs: [{id:'scout',label:'🔍 Scout'},{id:'squad',label:'🛡 My Squad'},{id:'moneyball',label:'📊 Moneyball'},{id:'tactics',label:'🧠 Tactics'},{id:'youth',label:'🌱 Youth'},{id:'club',label:'🏟 My Club'},{id:'clubs',label:'🏟 Clubs'},{id:'espionage',label:'💰 Transfers'},{id:'matches',label:'📺 Matches'}],
      mySquadFormation: '4231',
      formationKeys: Object.keys(FORMATIONS),
      attrFiltersOpen: false,
      attrFilters: {},  // e.g. { Speed: 70, Dribbling: 75 } — 0/null = inactive
      mbChart: 'top-lists',
      mbCharts: [
        {id:'top-lists',label:'Top Lists'},
        {id:'value-rating',label:'Value vs Rating'},
        {id:'goal-eff',label:'Goals vs xG'},
        {id:'assist-eff',label:'Assists vs xA'},
        {id:'age-gems',label:'Age vs Rating'},
      ],
      activeChartDef: {title:'',desc:'',listLabel:'',listFmt:()=>'',listColor:'#ffa657'},
      charts: {},
      tacticsLoaded: false, tacticsLoading: false, tacticsProgress: 0, tacticsMsg: '',
      tacticsData: null, tacticsCacheDate: null,
      // Youth tab state
      youthLoaded: false, youthLoading: false, youthMsg: '',
      youthCap: {}, youthScouts: [], youthAcademy: [], youthFacilities: {}, youthStaff: {},
      youthRejected: [], youthHistPos: '', youthHistSort: 'date', youthSubTab: 'scouts',
      // All-clubs history state
      youthHistLoading: false, youthHistLoaded: false, youthHistMsg: '', youthHistProgress: 0,
      youthHistCacheDate: null, youthAllHistoryJobs: [], youthClubInfoMap: {},
      youthHistSearch: '', youthHistClubFilter: '', youthHistStatusFilter: '',
      // Background refresh state
      youthBgInterval: null, youthBgLastRefresh: null,
      // Club tab state (Facilities + Staff)
      clubLoading: false, clubLoaded: false, clubMsg: '', clubSubTab: 'facilities',
      clubFacData: null, clubFacQuotes: {}, clubStaff: {}, clubStaffEffects: {},
      // Generate applicants
      staffGenLoading: false, staffGenMsg: '', staffGenResults: null, staffGenWeek: '',
      currentGameWeek: null,
      staffAdsLoading: false, staffAdsPosted: false, staffAdsMsg: '',
      tblSort: {}, negoSort: 'date_d',
      // Saved lineup
      savedLineup: null,
      // Matches archive tab
      matchArchive: null,         // null=not loaded, []=loaded
      matchArchiveBuilding: false, matchArchiveProgress: 0, matchArchiveMsg: '',
      matchArchiveCacheDate: null,
      matchView: null, matchDetailLoading: false,
      matchChunks: {}, matchArchiveChunkCount: 0, matchBuildLog: [],
      matchFilterClub: '', matchFilterManager: '', matchFilterComp: '',
      matchSort: 'gw_d', matchSubTab: 'list',
      clubLineups: {}, clubLineupsLoaded: false,
      mySubmissions: [], mySubmissionLoading: false,
      submissionsCache: {},  // club → { gw: {formation, ...} }
      espionageSubmissions: {},  // club → latest submission object
      selectedClubName: null,
      selectedClubSubTab: 'xi',  // 'xi' | 'history' | 'transfers'
      clubSquadSort: 'pos',
      hoveredPitchPlayer: null,
      allSubmissionsLoaded: false,
      clubTransferMap: {},
      // Espionage tab
      espionageLoading: false, espionageLoaded: false, espionageMsg: '', espionageProgress: 0,
      espionageClubs: [], espionageNegos: [], espionageCacheDate: null,
      espionageSubTab: 'negos', espionageSearch: '', espionageSort: 'club',
      espionageNegoSearch: '', negoExpandedId: null,
      selectedJobCtx: null,
      playersCacheDate: null, playersRefreshing: false, cacheWorking: true,
      bookmarkletHref: '',
      allLeagues: ALL_LEAGUES, allPositions: ALL_POSITIONS,
      selectedPlayer: null,
      highlightedPos: null,
      // Mental attr configuration for weighted position rating
      mentalCfgOpen: false,
      mentalCfgAttrs: ['Mentality','Experience','Work rate'],
      mentalWeightPct: 20,  // % contribution of mental to weighted rating
      physicalAttrs: [
        {k:'Speed',l:'Speed'},{k:'Stamina',l:'Stamina'},{k:'Dribbling',l:'Dribbling'},
        {k:'Passing',l:'Passing'},{k:'Shooting',l:'Shooting'},
        {k:'Tackling',l:'Tackling'},{k:'Marking',l:'Marking'},{k:'Heading',l:'Heading'},
        {k:'Vision',l:'Vision'},{k:'Handling',l:'Handling (GK)'},{k:'Reflexes',l:'Reflexes (GK)'},
      ],
      mentalAttrs: [
        {k:'Mentality',l:'Mentality'},{k:'Experience',l:'Experience'},
        {k:'Leadership',l:'Leadership'},{k:'Work rate',l:'Work Rate'},
        {k:'Adaptability',l:'Adaptability'},{k:'Free kicks',l:'Free Kicks'},
        {k:'Penalties',l:'Penalties'},{k:'Corners',l:'Corners'},
      ],
      tableCols: [
        {key:'Player',label:'Player',w:130,full:'Player Name'},
        {key:'Club',label:'Club',w:130,full:'Club (league tag + vacancy indicator)'},
        {key:'Position',label:'Pos',w:38,full:'Position'},
        {key:'Age',label:'Age',w:34,full:'Age'},
        {key:'_gameRating',label:'Rtg',w:44,full:'Game Rating — avg of the 4 key position attributes (same formula as the game\'s own Rating)'},
        {key:'_weightedRating',label:'WRtg',w:52,full:'Weighted Rating: overall rating blended with mental attrs (Mentality, Experience etc) — configure weight in sidebar'},
        {key:'Value',label:'Val',w:60,full:'In-game value (Transfermarkt baseline — actual transfers typically 2-4x higher)'},
        {key:'_estValue',label:'TrueVal',w:68,full:'True market value: last real transfer fee where known (excludes Saudi/Tamaguchi auto-deals); formula estimate otherwise'},
        {key:'Games',label:'G',w:28,full:'Games Played'},
        {key:'Minutes',label:'Mins',w:42,full:'Minutes Played'},
        {key:'Average Rating',label:'AvgRtg',w:52,full:'Average Match Rating'},
        {key:'Goals',label:'Gls',w:32,full:'Goals Scored'},
        {key:'xG',label:'xG',w:38,full:'Expected Goals'},
        {key:'Assists',label:'Ast',w:32,full:'Assists'},
        {key:'xA',label:'xA',w:38,full:'Expected Assists'},
        {key:'_g90',label:'G/90',w:38,full:'Goals per 90 minutes (min 30 mins played)'},
        {key:'_a90',label:'A/90',w:38,full:'Assists per 90 minutes (min 30 mins played)'},
        {key:'_xG90',label:'xG/90',w:44,full:'Expected Goals per 90 minutes'},
        {key:'_xA90',label:'xA/90',w:44,full:'Expected Assists per 90 minutes'},
        {key:'Yellow',label:'Yel',w:28,full:'Yellow Cards'},
        {key:'Red',label:'Red',w:28,full:'Red Cards'},
        {key:'Tackle %',label:'Tkl%',w:42,full:'Tackle Success %'},
        {key:'Pass %',label:'Pas%',w:42,full:'Pass Accuracy %'},
        {key:'Steals',label:'Stl',w:32,full:'Ball Steals'},
        {key:'Mistakes',label:'Err',w:32,full:'Errors Leading to Chance/Goal'},
        {key:'Form',label:'Form',w:40,full:'Current Form (recent match ratings avg)'},
        {key:'fitnessPct',label:'Fit%',w:38,full:'Fitness %'},
        {key:'injuryRiskLabel',label:'InjRisk',w:60,full:'Injury Risk Level'},
        {key:'injured',label:'Inj',w:28,full:'Currently Injured'},
        {key:'suspended',label:'Sus',w:28,full:'Currently Suspended'},
        {key:'Speed',label:'Spd',w:32,full:'Speed'},
        {key:'Stamina',label:'Sta',w:32,full:'Stamina'},
        {key:'Vision',label:'Vis',w:32,full:'Vision'},
        {key:'Dribbling',label:'Dri',w:32,full:'Dribbling'},
        {key:'Passing',label:'Pas',w:32,full:'Passing'},
        {key:'Shooting',label:'Sht',w:32,full:'Shooting'},
        {key:'Tackling',label:'Tck',w:32,full:'Tackling'},
        {key:'Marking',label:'Mrk',w:32,full:'Marking'},
        {key:'Heading',label:'Hd',w:32,full:'Heading'},
        {key:'Handling',label:'Hnd',w:32,full:'Handling (GK)'},
        {key:'Reflexes',label:'Rfx',w:32,full:'Reflexes (GK)'},
        {key:'Free kicks',label:'FK',w:32,full:'Free Kick Ability'},
        {key:'Penalties',label:'Pen',w:32,full:'Penalty Taking'},
        {key:'Corners',label:'Cor',w:32,full:'Corner Taking'},
        {key:'Mentality',label:'Men',w:32,full:'Mentality'},
        {key:'Leadership',label:'Lead',w:36,full:'Leadership'},
        {key:'Experience',label:'Exp',w:36,full:'Experience'},
        {key:'Confidence',label:'Conf',w:36,full:'Confidence'},
        {key:'Work rate',label:'WR',w:32,full:'Work Rate'},
        {key:'Morale',label:'Mor',w:32,full:'Morale'},
        {key:'Nationality',label:'Nat',w:60,full:'Nationality'},
        {key:'PreferredFoot',label:'Foot',w:36,full:'Preferred Foot'},
      ],
    };
  },

  computed: {
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
        items = items.filter(m => (m._homeManager||'').toLowerCase().includes(mg) || (m._awayManager||'').toLowerCase().includes(mg));
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
        if (m._homeManager) mgrs.add(m._homeManager);
        if (m._awayManager) mgrs.add(m._awayManager);
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
    espionageFiltered() {
      let list = [...this.espionageClubs];
      if (this.espionageSearch.trim()) {
        const q = this.espionageSearch.trim().toLowerCase();
        list = list.filter(c => c.club.toLowerCase().includes(q));
      }
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
      };
      list.sort(SORTS[this.espionageSort] || ((a,b) => a.club.localeCompare(b.club)));
      return list;
    },
    espionageNegoFiltered() {
      const q = (this.espionageNegoSearch||'').trim().toLowerCase();
      let list = q ? this.espionageNegos.filter(n =>
        (n.playerName||'').toLowerCase().includes(q) ||
        (n.buyer||'').toLowerCase().includes(q) ||
        (n.seller||'').toLowerCase().includes(q)
      ) : [...this.espionageNegos];
      const ns = this.negoSort;
      if (ns==='player_a') list.sort((a,b)=>(a.playerName||'').localeCompare(b.playerName||''));
      else if (ns==='player_d') list.sort((a,b)=>(b.playerName||'').localeCompare(a.playerName||''));
      else if (ns==='fee_d') list.sort((a,b)=>(b.fee||b.amount||0)-(a.fee||a.amount||0));
      else if (ns==='fee_a') list.sort((a,b)=>(a.fee||a.amount||0)-(b.fee||b.amount||0));
      else if (ns==='status_a') list.sort((a,b)=>(a.status||'').localeCompare(b.status||''));
      else if (ns==='date_a') list.sort((a,b)=>new Date(a.updatedAt||0)-new Date(b.updatedAt||0));
      else list.sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0)); // date_d default
      return list;
    },
    mySquadByPosition() {
      const order = ['GK','FB','CB','DM','CM','AM','WF','CF'];
      const groups = {};
      order.forEach(pos => { groups[pos] = []; });
      this.mySquadPlayers.forEach(p => {
        if (groups[p.Position]) groups[p.Position].push(p);
        // unknown positions just ignored
      });
      order.forEach(pos => groups[pos].sort((a,b) => (b._gameRating||0)-(a._gameRating||0)));
      return order.map(pos => ({ pos, players: groups[pos] })).filter(g => g.players.length);
    },
    bestXIPlayers() {
      const slots = FORMATIONS[this.mySquadFormation];
      if (!slots) return [];
      const squad = this.mySquadPlayers;
      const used = new Set();
      // Helper: rate a player for a given slot using SLOT_ATTRS formula
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
    filteredPlayers() {
      const q = this.search.toLowerCase();
      const now = new Date();
      return this.allPlayers.filter(p => {
        if (!this.leagueFilter.has(p._league)) return false;
        if (!this.posFilter.has(p.Position)) return false;
        // Per-position rating filter: use native position rating vs that position's threshold
        const posThresh = this.posRatingFilters[p.Position] || 60;
        const rtg = this.posRatingUseWeighted
          ? ((p._weightedRating || p._gameRating || p.Rating) || 0)
          : ((p._gameRating || p.Rating) || 0);
        if (rtg < posThresh) return false;
        if (this.posRatingMax < 99 && rtg > this.posRatingMax) return false;
        if (this.maxAge < 40 && (p.Age||99) > this.maxAge) return false;
        if (this.hideOwn && p.Club === MY_CLUB) return false;
        if (this.hideVacant && !p._managed) return false;
        if (this.managedOnly && !p._managed) return false;
        if (this.forSaleOnly && (!p._managed || p.notForSale)) return false;
        if (this.transferListedOnly && !p._transferListed) return false;
        if (this.injuredOnly && !p.injured && !p.suspended) return false;
        // Attribute filters
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
        {title:'💰 True Market Value',data:[...this.filteredPlayers].filter(p=>p._estValue).sort((a,b)=>(b._estValue||0)-(a._estValue||0)).slice(0,15),key:'_estValue',color:'#ffa657',dec:0},
        {title:'🔥 Highest Form',data:[...withGames].sort((a,b)=>(b.Form||0)-(a.Form||0)).slice(0,15),key:'Form',color:'#ff7b72',dec:1},
        {title:'🏃 Top Workhorses',data:[...withGames].sort((a,b)=>(b.Steals||0)+(b['Tackle %']||0)-(a.Steals||0)-(a['Tackle %']||0)).slice(0,15),key:'Steals',color:'#79c0ff',dec:0},
      ];
    },
    activeChartList() {
      const fp = this.filteredPlayers.filter(p=>p.Games>0);
      if (this.mbChart==='value-rating') return [...this.filteredPlayers].sort((a,b)=>(b._estValue||0)-(a._estValue||0)).slice(0,20);
      if (this.mbChart==='goal-eff') return [...fp].filter(p=>p.xG>0).sort((a,b)=>((b.Goals||0)-(b.xG||0))-((a.Goals||0)-(a.xG||0))).slice(0,20);
      if (this.mbChart==='assist-eff') return [...fp].filter(p=>p.xA>0).sort((a,b)=>((b.Assists||0)-(b.xA||0))-((a.Assists||0)-(a.xA||0))).slice(0,20);
      if (this.mbChart==='age-gems') return [...this.filteredPlayers].filter(p=>p.Age<=26).sort((a,b)=>(b._weightedRating||0)-(a._weightedRating||0)).slice(0,20);
      return [];
    },

    // ── Youth tab computed ──
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
      if (s==='bestattr_a') return [...items].sort((a,b)=>(a.player?.bestKey||'').localeCompare(b.player?.bestKey||''));
      if (s==='bestattr_d') return [...items].sort((a,b)=>(b.player?.bestKey||'').localeCompare(a.player?.bestKey||''));
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
    // All-clubs history computed
    youthHistClubs() {
      return [...new Set(this.youthAllHistoryJobs.map(j=>j._club))].filter(Boolean).sort();
    },
    youthHistAllPositions() {
      return [...new Set(this.youthAllHistoryJobs.map(j=>j.player?.position||j.player?.Position))].filter(Boolean).sort();
    },
    youthHistFiltered() {
      let items = this.youthAllHistoryJobs;
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
      if (s==='bestattr_a') return [...items].sort((a,b)=>(a.player?.bestKey||'').localeCompare(b.player?.bestKey||''));
      if (s==='bestattr_d') return [...items].sort((a,b)=>(b.player?.bestKey||'').localeCompare(a.player?.bestKey||''));
      return items;
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
      // Sort by submittedAt DESC so the most recently submitted (upcoming GW) is always first
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
  },

  watch: {
    filteredPlayers() { this.page = 0; },
    mentalCfgAttrs: { handler() {
      this.recomputeWeightedRatings();
      try { localStorage.setItem('sf_mental_cfg', JSON.stringify({attrs:this.mentalCfgAttrs,pct:this.mentalWeightPct})); } catch(e){}
    }, deep: true },
    mentalWeightPct() {
      this.recomputeWeightedRatings();
      try { localStorage.setItem('sf_mental_cfg', JSON.stringify({attrs:this.mentalCfgAttrs,pct:this.mentalWeightPct})); } catch(e){}
    },
    async mbChart(newVal) {
      if (newVal==='top-lists') return;
      await nextTick();
      this.drawMoneyballChart(newVal);
    },
    async tacticsLoaded(v) {
      if (!v) return;
      await nextTick();
      this.drawTacticsCharts();
    },
    activeTab: {
      immediate: true,
      handler(v) {
        localStorage.setItem('sf_activeTab', v);
        if (v === 'youth') {
          if (!this.youthLoaded && !this.youthLoading) this.loadYouth();
          if (!this.youthHistLoaded && !this.youthHistLoading) this.loadYouthHistory(false);
        }
        if (v === 'club') {
          if (!this.clubLoaded && !this.clubLoading) this.loadClub();
        }
        if (v === 'espionage' || v === 'clubs') {
          if (!this.espionageLoaded && !this.espionageLoading) this.loadEspionage(false);
        }
        if (v === 'squad') {
          this.loadSavedLineup();
        }
      },
      flush: 'sync',
    },
  },

  methods: {
    fmtVal,fmtWage,
    ratingClass(r) { if(!r) return 'c-gray'; return r>=84?'rating-high':r>=77?'rating-mid':'rating-low'; },
    attrBarColor(v) { return (v||0)>=80?'#7ee787':(v||0)>=65?'#ffa657':'#ff7b72'; },
    isKeyAttr(attrKey, position) { const pos=this.highlightedPos||position; const a=GAME_ATTRS[pos]; return a?a.includes(attrKey):false; },
    gameAttrsFor(pos) { return GAME_ATTRS[pos] || []; },
    recomputeWeightedRatings() {
      // Players are frozen — can't mutate directly; rebuild each with new _weightedRating
      const attrs = this.mentalCfgAttrs, w = this.mentalWeightPct;
      this.allPlayers = this.allPlayers.map(p => {
        const newW = calcWeightedRating(p, p.Position, attrs, w);
        if (newW === p._weightedRating) return p;  // skip if unchanged
        return Object.freeze({...p, _weightedRating: newW});
      });
    },
    posAttrNames(pos) { return GAME_ATTR_LABELS[pos] || ''; },
    allPosRatings(p) {
      // Returns game + weighted rating for every outfield position (for modal breakdown)
      return OUTFIELD_POSITIONS.map(pos => ({
        pos,
        attrs: GAME_ATTR_LABELS[pos] || '',
        game: calcGameRating(p, pos),
        weighted: calcWeightedRating(p, pos, this.mentalCfgAttrs, this.mentalWeightPct),
        isNative: p.Position === pos,
      }));
    },
    toggleMentalAttr(attr) {
      const idx = this.mentalCfgAttrs.indexOf(attr);
      if (idx >= 0) this.mentalCfgAttrs.splice(idx, 1);
      else this.mentalCfgAttrs.push(attr);
    },
    toggleLeague(l) { const s=new Set(this.leagueFilter); s.has(l)?s.delete(l):s.add(l); this.leagueFilter=s; },
    togglePos(p) {
      const allSelected = this.posFilter.size === ALL_POSITIONS.length;
      if (allSelected) {
        this.posFilter = new Set([p]);           // from "all": isolate to just this
      } else if (this.posFilter.size === 1 && this.posFilter.has(p)) {
        this.posFilter = new Set(ALL_POSITIONS); // last one: reset to all
      } else {
        const s = new Set(this.posFilter);       // partial: toggle this one
        s.has(p) ? s.delete(p) : s.add(p);
        this.posFilter = s;
      }
    },
    setAttrFilter(attr, val) {
      const n = parseInt(val) || 0;
      const f = {...this.attrFilters};
      if (n > 0) f[attr] = n; else delete f[attr];
      this.attrFilters = f;
    },
    toggleAttrFilter(attr, thresh) {
      const f = {...this.attrFilters};
      if ((f[attr]||0) === thresh) delete f[attr];  // click same = deselect
      else f[attr] = thresh;
      this.attrFilters = f;
    },
    clearAttrFilters() { this.attrFilters = {}; },
    sortBy(col) {
      if (this.sortCol===col) this.sortDir=-this.sortDir;
      else { this.sortCol=col; this.sortDir=-1; }
      this.page=0;
    },
    openModal(p, jobCtx=null) { this.selectedPlayer=p; this.highlightedPos=null; this.selectedJobCtx=jobCtx||null; },
    closeModal() { this.selectedPlayer=null; this.selectedJobCtx=null; },

    async loadData() {
      // Cache-first: show app instantly from server cache (falls back to localStorage)
      try {
        const _ls0 = performance.now();
        let cached = await serverCacheGet(PLAYERS_CACHE_KEY);
        const cacheSource = cached ? 'server' : 'localStorage';
        if (!cached) cached = localStorage.getItem(PLAYERS_CACHE_KEY);
        if (cached) {
          console.log(`[SF] ${cacheSource} read:`, Math.round(performance.now()-_ls0)+'ms,', Math.round(cached.length/1024)+'KB');
          const _pa0 = performance.now();
          const {players, meta, ts} = await parseAsync(cached);
          console.log('[SF] parseAsync players:', Math.round(performance.now()-_pa0)+'ms,', players?.length, 'players');
          if (players?.length) {
            this.leagueTables = meta.leagueTables||{};
            this.asOfWeek = meta.asOfWeek||'?';
            this.totalClubs = meta.totalClubs||0;
            this.managedSet = new Set(meta.managedClubs||[]);
            // Recompute derived fields with current config (config can differ from cache-time)
            players.forEach(p => {
              // Always recompute _gameRating — CF formula was corrected (Shooting not Stamina)
              p._gameRating = calcGameRating(p, p.Position);
              p._weightedRating = calcWeightedRating(p, p.Position, DEFAULT_MENTAL_ATTRS, 20);
              p._incompleteStats = FULL_ATTR_KEYS.filter(a=>p[a]!=null&&p[a]>0).length < 5;
              // Recompute per-90 stats in case cache predates this feature
              if (p._g90 === undefined) {
                const mins=p.Minutes||0;
                p._g90=mins>=30?Math.round((p.Goals||0)/mins*90*100)/100:null;
                p._a90=mins>=30?Math.round((p.Assists||0)/mins*90*100)/100:null;
                p._xG90=mins>=30&&p.xG!=null?Math.round(p.xG/mins*90*100)/100:null;
                p._xA90=mins>=30&&p.xA!=null?Math.round(p.xA/mins*90*100)/100:null;
              }
            });
            const _fr0 = performance.now();
            players.forEach(p => Object.freeze(p));  // skip Vue deep-proxy on 1400+ objects
            console.log('[SF] Object.freeze:', Math.round(performance.now()-_fr0)+'ms');
            const _vue0 = performance.now();
            this.allPlayers = players;
            console.log('[SF] Vue allPlayers set:', Math.round(performance.now()-_vue0)+'ms');
            this.playersCacheDate = new Date(ts).toLocaleDateString();
            this.progress = 100; this.loaded = true;
            this.buildBookmarklet();
            this.checkTacticsCache();
            const stale = (Date.now()-ts) > PLAYERS_CACHE_TTL;
            if (stale) {
              this.playersRefreshing = true;
              this.fetchFreshData(false);  // background refresh
            } else {
              // Even if player data is fresh, always refresh asOfWeek from live tables
              // so the current game week is accurate for staff generation
              fetch(`${API}/tables/from-fixtures`).then(r=>r.json()).then(d => {
                const w = d?.meta?.asOfWeek;
                if (w != null && w !== '?') this.asOfWeek = w;
              }).catch(()=>{});
              // Enrich stats in background
              setTimeout(() => this.enrichStats(), 500);
            }
            return;
          }
        }
      } catch(e) { console.warn('Cache read failed:', e); }
      // No cache — full foreground fetch
      await this.fetchFreshData(true);
    },

    checkTacticsCache() {
      try {
        const cached=localStorage.getItem(TACTICS_CACHE_KEY);
        if (cached) { const {ts}=JSON.parse(cached); this.tacticsCacheDate=new Date(ts).toLocaleDateString(); }
      } catch(e){}
    },

    clearPlayersCache() {
      serverCacheDelete(PLAYERS_CACHE_KEY);
      serverCacheDelete(STATS_CACHE_KEY);
      try { localStorage.removeItem(PLAYERS_CACHE_KEY); } catch(e){}
      try { localStorage.removeItem(STATS_CACHE_KEY); } catch(e){}
      // Also clear youth and club caches
      try { localStorage.removeItem('sf_youth_hist_v2'); } catch(e){}
      try { localStorage.removeItem('sf_youth_idx_v2'); } catch(e){}
      try { localStorage.removeItem('sf_club_v1'); } catch(e){}
      this.allPlayers=[]; this.loaded=false; this.playersCacheDate=null;
      this.statsEnriched=false; this.statsProgress=0;
      // Reset tab states so next visit re-fetches
      this.youthHistLoaded=false; this.youthHistCacheDate=null;
      this.youthLoaded=false;
      this.clubLoaded=false; this.clubLoading=false;
      this.fetchFreshData(true);
    },

    // Background stats enrichment — fetch full season stats per player from /api/player-stats
    async enrichStats() {
      if (this.statsEnriching || this.statsEnriched) return;
      // Try loading from stats cache first (server → localStorage fallback)
      try {
        let cached = await serverCacheGet(STATS_CACHE_KEY);
        if (!cached) cached = localStorage.getItem(STATS_CACHE_KEY);
        if (cached) {
          console.log('[SF] stats cache:', Math.round(cached.length/1024)+'KB');
          const _spa0 = performance.now();
          const {statsMap, ts} = await parseAsync(cached);
          console.log('[SF] parseAsync stats:', Math.round(performance.now()-_spa0)+'ms');
          const age = Date.now() - ts;
          if (age < 7*24*60*60*1000 && statsMap) {  // 7-day TTL — stats only update on weekends
            // Pre-compute the new array BEFORE touching Vue's reactive state,
            // then yield one frame so the browser isn't blocked mid-paint.
            let applied = 0;
            const newPlayers = this.allPlayers.map(p => {
              const s = statsMap[(p.Player||'').toLowerCase()];
              if (!s) return p;
              applied++;
              return Object.freeze({...p, ...s});
            });
            if (applied > 0) {
              // Yield to the browser so the current frame finishes rendering
              // before we trigger the reactive allPlayers update + re-render.
              await new Promise(r => requestAnimationFrame(r));
              this.allPlayers = newPlayers;
              this.statsEnriched = true;
              return;
            }
          }
        }
      } catch(e) {}

      // Fetch fresh stats in background
      this.statsEnriching = true;
      this.statsProgress = 0;
      const statsMap = {};
      const players = this.allPlayers;
      const BATCH = 3;  // concurrent requests per batch
      for (let i = 0; i < players.length; i += BATCH) {
        const batch = players.slice(i, i+BATCH);
        await Promise.all(batch.map(async p => {
          try {
            const name = encodeURIComponent(p.Player || '');
            if (!name) return;
            const d = await fetch(`${API}/player-stats?player=${name}`).then(r=>r.json());
            if (!d.ok) return;
            // Extract physical attributes from d.player if the API returns them
            const physAttrs = {};
            const PHYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision','Mentality','Experience','Leadership','Work rate','Adaptability','Form','Confidence'];
            if (d.player) PHYS.forEach(a => { if (d.player[a] != null) physAttrs[a] = d.player[a]; });
            if (!d.seasonStats && Object.keys(physAttrs).length === 0) return;
            const s = d.seasonStats || {};
            const mins = s.minutes || 0;
            const enriched = {
              ...physAttrs,
              Games: s.games || 0,
              Minutes: mins,
              Goals: s.goals || 0,
              Assists: s.assists || 0,
              xG: s.xG ?? null,
              xA: s.xA ?? null,
              Yellow: s.yellow || 0,
              Red: s.red || 0,
              Steals: s.steals || 0,
              Mistakes: s.mistakes || 0,
              POTM: s.potm || 0,
              'Pass %': s.passPct ?? null,
              'Tackle %': s.tacklePct ?? null,
              'Average Rating': s.averageRating ?? null,
              _g90: mins>=30 ? Math.round((s.goals||0)/mins*90*100)/100 : null,
              _a90: mins>=30 ? Math.round((s.assists||0)/mins*90*100)/100 : null,
              _xG90: mins>=30 && s.xG!=null ? Math.round(s.xG/mins*90*100)/100 : null,
              _xA90: mins>=30 && s.xA!=null ? Math.round(s.xA/mins*90*100)/100 : null,
            };
            statsMap[(p.Player||'').toLowerCase()] = enriched;
          } catch(e) { /* skip on error */ }
        }));
        this.statsProgress = Math.round((i+BATCH)/players.length*100);
        await new Promise(r=>setTimeout(r,50));  // small pause between batches
      }
      // Apply stats — create new frozen objects (players are frozen, can't mutate)
      this.allPlayers = this.allPlayers.map(p => {
        const s = statsMap[(p.Player||'').toLowerCase()];
        if (!s) return p;
        return Object.freeze({...p, ...s});
      });
      // Save stats cache (server + localStorage)
      stringifyAsync({statsMap, ts:Date.now()}).then(str => {
        serverCacheSet(STATS_CACHE_KEY, str);
        try { localStorage.setItem(STATS_CACHE_KEY, str); } catch(e) {}
      }).catch(() => {});
      this.statsEnriching = false;
      this.statsEnriched = true;
      this.statsProgress = 100;
    },

    async fetchFreshData(foreground=true) {
      try {
        if (foreground) { this.loadMsg='Fetching leagues & managers…'; this.progress=5; }
        const [tablesRes, managersRes, clubsRes] = await Promise.all([
          fetch(`${API}/tables/from-fixtures`).then(r=>r.json()),
          fetch(`${API}/managers`).then(r=>r.json()),
          fetch(`${API}/admin/squads/public/clubs`).then(r=>r.json()),
        ]);
        this.leagueTables = tablesRes;
        this.asOfWeek = tablesRes.meta?.asOfWeek||'?';

        const leagueMap = {};
        ALL_LEAGUES.forEach(l=>(tablesRes[l]||[]).forEach(t=>{leagueMap[t.Team]=l;}));
        const managedClubs = new Set((managersRes.managers||[]).filter(m=>m.club&&!m.username?.includes('~deleted~')).map(m=>m.club));
        this.managedSet = managedClubs;

        const clubs = clubsRes.clubs;
        this.totalClubs = clubs.length;
        const seen = new Set();
        const players = [];

        for (let i=0; i<clubs.length; i++) {
          if (foreground) { this.loadMsg=`Fetching squads… (${i+1}/${clubs.length})`; this.progress=10+Math.round(85*(i+1)/clubs.length); }
          try {
            const d = await fetch(`${API}/squads?club=${encodeURIComponent(clubs[i])}`).then(r=>r.json());
            (d.players||[]).forEach(p=>{
              const key=`${p.Player}|${p.Club||clubs[i]}`;
              if (seen.has(key)) return;
              seen.add(key);
              p.Club=p.Club||clubs[i];
              p._league=leagueMap[p.Club]||'other';
              p._managed=managedClubs.has(p.Club);
              p._gameRating=calcGameRating(p, p.Position);
              p._weightedRating=calcWeightedRating(p, p.Position, DEFAULT_MENTAL_ATTRS, 20);
              p._estValue=calcEstValue(p);
              p._incompleteStats = FULL_ATTR_KEYS.filter(a=>p[a]!=null&&p[a]>0).length < 5;
              const mins=p.Minutes||0;
              p._g90=mins>=30?Math.round((p.Goals||0)/mins*90*100)/100:null;
              p._a90=mins>=30?Math.round((p.Assists||0)/mins*90*100)/100:null;
              p._xG90=mins>=30&&p.xG!=null?Math.round(p.xG/mins*90*100)/100:null;
              p._xA90=mins>=30&&p.xA!=null?Math.round(p.xA/mins*90*100)/100:null;
              players.push(p);
            });
          } catch(e){ console.warn('Failed:',clubs[i]); }
          await new Promise(r=>setTimeout(r,80));
        }

        // Fetch transfer history + active transfer list in parallel
        if (foreground) { this.loadMsg='Fetching transfers…'; this.progress=97; }
        try {
          const [txRes, tlRes] = await Promise.all([
            fetch(`${API}/transfers/done`).then(r=>r.json()),
            fetch(`${API}/transfer-list`).then(r=>r.json()).catch(()=>({listings:[]})),
          ]);
          // Build transfer history map (real human-negotiated deals only for true value)
          const REAL_VIA = new Set(['negotiation','transfer','listing','auction','swap']);
          const allTxMap = {}, realTxMap = {};
          (txRes.deals||[]).forEach(d=>{
            const key=(d.playerName||'').toLowerCase();
            if (!key||!d.amount) return;
            const entry={amount:d.amount,buyer:d.buyer||d.toClub,seller:d.seller||d.fromClub,via:d.via,date:d.updatedAt||d.ts,isReal:REAL_VIA.has(d.via)};
            if (!allTxMap[key]) allTxMap[key]=[];
            allTxMap[key].push(entry);
            if (entry.isReal) {
              if (!realTxMap[key]) realTxMap[key]=[];
              realTxMap[key].push(entry);
            }
          });
          [allTxMap, realTxMap].forEach(m=>Object.values(m).forEach(arr=>arr.sort((a,b)=>new Date(b.date)-new Date(a.date))));
          this.transferMap=realTxMap;
          // Build club-keyed transfer map for the club detail view
          const cTxMap = {};
          (txRes.deals||[]).forEach(d => {
            const playerName = d.playerName || '';
            if (!playerName || !d.amount) return;
            const deal = { player: playerName, amount: d.amount, buyer: d.buyer||d.toClub, seller: d.seller||d.fromClub, via: d.via, date: d.updatedAt||d.ts };
            [deal.buyer, deal.seller].filter(Boolean).forEach(club => {
              if (!cTxMap[club]) cTxMap[club] = [];
              cTxMap[club].push(deal);
            });
          });
          Object.values(cTxMap).forEach(arr => arr.sort((a,b) => new Date(b.date)-new Date(a.date)));
          this.clubTransferMap = cTxMap;
          // Build active transfer list map (status===null means listed, 'sold' = done)
          const tlMap = {};
          (tlRes.listings||[]).filter(l=>l.status!=='sold').forEach(l=>{
            const key=(l.player||l.name||'').toLowerCase();
            tlMap[key] = { ask: l.ask||l.price, bids: l.bids?.length||0, highestBid: l.highestBid||0 };
          });
          players.forEach(p=>{
            const key=(p.Player||'').toLowerCase();
            // Transfer history (limit to last 5 entries to keep cache small)
            if (allTxMap[key]?.length) p._transferHistory=allTxMap[key].slice(0,5);
            const realTxs=realTxMap[key];
            if (realTxs?.length){
              p._lastTransfer=realTxs[0];
              const amt=realTxs[0].amount;
              p._estValue=Math.round(amt/500000)*500000||Math.round(amt/100000)*100000||amt;
            }
            // Active listing
            if (tlMap[key]) {
              p._transferListed = true;
              p._listingAsk = tlMap[key].ask;
              p._listingBids = tlMap[key].bids;
            }
          });
        } catch(e){ console.warn('Transfer data unavailable:',e); }

        // Save to cache async (stringifyAsync keeps 2–5s JSON.stringify OFF the main thread)
        // _weightedRating is included (it gets recomputed on load anyway) so no expensive .map() needed.
        stringifyAsync({
          players,
          meta:{leagueTables:tablesRes, asOfWeek:this.asOfWeek, totalClubs:clubs.length, managedClubs:[...managedClubs]},
          ts: Date.now()
        }).then(str => {
          serverCacheSet(PLAYERS_CACHE_KEY, str);  // persist on server (survives browser cache clears)
          try { localStorage.setItem(PLAYERS_CACHE_KEY, str); this.cacheWorking = true; }
          catch(e) { console.warn('Cache write failed:', e); this.cacheWorking = false; }
        }).catch(e => console.warn('stringifyAsync failed:', e));

        players.forEach(p => Object.freeze(p));  // skip Vue deep-proxy
        this.allPlayers=players;
        this.playersCacheDate=new Date().toLocaleDateString();
        this.playersRefreshing=false;
        if (foreground) { this.progress=100; this.loadMsg='Done!'; this.loaded=true; this.buildBookmarklet(); this.checkTacticsCache(); }
        // Refresh current game week now that asOfWeek is up to date
        this.fetchCurrentGameWeek();
        // Kick off stats enrichment after squads loaded
        setTimeout(() => this.enrichStats(), 800);

      } catch(e) {
        console.error(e);
        this.playersRefreshing=false;
        if (foreground && (e.message?.includes('Failed to fetch')||e.name==='TypeError')) {
          this.corsError=true; this.buildBookmarklet();
        }
      }
    },

    buildBookmarklet() {
      const code=`(function(){const s=document.createElement('iframe');s.src='${location.href}';s.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999';document.body.appendChild(s);})()`;
      this.bookmarkletHref='javascript:'+encodeURIComponent(code);
    },

    destroyChart(id) {
      if (this.charts[id]) { try { this.charts[id].destroy(); } catch(e){} delete this.charts[id]; }
    },

    drawMoneyballChart(id) {
      this.destroyChart(id);
      const ctx = document.getElementById('chart-'+id);
      if (!ctx) return;
      const players = this.filteredPlayers;

      if (id==='value-rating') {
        const data=players.filter(p=>p._estValue>0&&p.Rating>0).map(p=>({x:p._estValue/1e6,y:+p.Rating,label:p.Player+' ('+p.Club+')'}));
        this.activeChartDef={title:'True Market Value vs Rating',desc:'Top-right = most expensive and best. Outliers in top-left = overpriced; bottom-right = potential bargains.',listLabel:'Highest Value',listFmt:p=>fmtVal(p._estValue),listColor:'#ffa657'};
        this.charts[id]=new Chart(ctx,{type:'scatter',data:{datasets:[{data,backgroundColor:'#1f6feb80',pointRadius:4}]},
          options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:d=>d.raw.label+': £'+d.raw.x.toFixed(1)+'m | Rtg '+d.raw.y.toFixed(1)}}},
            scales:{x:{title:{display:true,text:'True Value (£m)'}},y:{title:{display:true,text:'Rating'}}}}});

      } else if (id==='goal-eff') {
        const data=players.filter(p=>p.Games>0&&p.xG!=null).map(p=>({x:+(p.xG||0),y:+(p.Goals||0),label:p.Player+' ('+p.Club+')'}));
        const max=Math.max(...data.map(d=>Math.max(d.x,d.y)),1);
        this.activeChartDef={title:'Goals Scored vs Expected Goals (xG)',desc:'Above diagonal = overperforming xG. Below = underperforming.',listLabel:'Best Over-performers',listFmt:p=>'+'+(((p.Goals||0)-(p.xG||0))>=0?'+':'')+((p.Goals||0)-(p.xG||0)).toFixed(2),listColor:'#7ee787'};
        this.charts[id]=new Chart(ctx,{type:'scatter',data:{datasets:[
          {label:'Players',data,backgroundColor:'#7ee78780',pointRadius:4},
          {label:'Expected line',data:[{x:0,y:0},{x:max,y:max}],type:'line',borderColor:'#30363d',borderDash:[4,4],pointRadius:0,borderWidth:1},
        ]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:d=>d.raw.label?d.raw.label+': xG '+d.raw.x.toFixed(2)+' | Gls '+d.raw.y:''}}},
          scales:{x:{title:{display:true,text:'xG'}},y:{title:{display:true,text:'Goals'}}}}});

      } else if (id==='assist-eff') {
        const data=players.filter(p=>p.Games>0&&p.xA!=null).map(p=>({x:+(p.xA||0),y:+(p.Assists||0),label:p.Player+' ('+p.Club+')'}));
        const max=Math.max(...data.map(d=>Math.max(d.x,d.y)),1);
        this.activeChartDef={title:'Assists vs Expected Assists (xA)',desc:'Above diagonal = overperforming xA. Below = underperforming.',listLabel:'Best Over-performers',listFmt:p=>'+'+(((p.Assists||0)-(p.xA||0))>=0?'+':'')+((p.Assists||0)-(p.xA||0)).toFixed(2),listColor:'#79c0ff'};
        this.charts[id]=new Chart(ctx,{type:'scatter',data:{datasets:[
          {label:'Players',data,backgroundColor:'#79c0ff80',pointRadius:4},
          {label:'Expected line',data:[{x:0,y:0},{x:max,y:max}],type:'line',borderColor:'#30363d',borderDash:[4,4],pointRadius:0,borderWidth:1},
        ]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:d=>d.raw.label?d.raw.label+': xA '+d.raw.x.toFixed(2)+' | Ast '+d.raw.y:''}}},
          scales:{x:{title:{display:true,text:'xA'}},y:{title:{display:true,text:'Assists'}}}}});

      } else if (id==='age-gems') {
        const leagueColors={north:'#79c0ff',south:'#7ee787',europa:'#d2a8ff',world:'#ffa657',conference:'#ff7b72',hipster:'#39d353',other:'#8b949e'};
        const datasets=ALL_LEAGUES.map(l=>({
          label:l,
          data:players.filter(p=>p._league===l&&p.Age!=null&&p._weightedRating!=null).map(p=>({x:+p.Age,y:+p._weightedRating,label:p.Player+' ('+p.Club+') '+p.Position})),
          backgroundColor:leagueColors[l]+'80',pointRadius:4,
        }));
        this.activeChartDef={title:'Age vs Weighted Position Rating — Young Gems',desc:'Top-left = young and highly rated for their position (incl. mental attributes).',listLabel:'Top Young Players (≤26)',listFmt:p=>p.Age+'y · '+p._weightedRating?.toFixed(1),listColor:'#d2a8ff'};
        this.charts[id]=new Chart(ctx,{type:'scatter',data:{datasets},
          options:{plugins:{legend:{labels:{color:'#8b949e',boxWidth:10}},tooltip:{callbacks:{label:d=>d.raw.label?d.raw.label+': Age '+d.raw.x+' | PosRtg '+d.raw.y:''}}},
            scales:{x:{title:{display:true,text:'Age'},min:16,max:38},y:{title:{display:true,text:'Position Rating'}}}}});
      }
    },

    async loadTactics(forceRefresh=false) {
      // Try cache first
      if (!forceRefresh) {
        try {
          const cached=localStorage.getItem(TACTICS_CACHE_KEY);
          if (cached) {
            const {data,ts}=JSON.parse(cached);
            if (Date.now()-ts < TACTICS_CACHE_TTL) {
              this.tacticsData=data;
              this.tacticsCacheDate=new Date(ts).toLocaleDateString();
              this.tacticsLoaded=true; return;
            }
          }
        } catch(e){}
      }

      this.tacticsLoading=true; this.tacticsLoaded=false;

      // Step 1: collect fixture IDs
      this.tacticsMsg='Collecting fixture IDs…'; this.tacticsProgress=2;
      const clubsRes=await fetch(`${API}/admin/squads/public/clubs`).then(r=>r.json());
      const clubs=clubsRes.clubs;
      const fixtureIds=new Set();

      for (let i=0; i<clubs.length; i++) {
        this.tacticsMsg=`Collecting fixtures… ${i+1}/${clubs.length}`;
        this.tacticsProgress=Math.round(10*(i+1)/clubs.length);
        try {
          const d=await fetch(`${API}/matches?club=${encodeURIComponent(clubs[i])}&limit=8`).then(r=>r.json());
          (d.matches||[]).forEach(m=>fixtureIds.add(m.fixtureId));
        } catch(e){}
        await new Promise(r=>setTimeout(r,60));
      }

      // Step 2: fetch each individual match report
      const ids=[...fixtureIds];
      const fmRe=/\b(\d-\d[-\d]*)\b/;
      const byFormation={}, byStyle={};
      const myClubForms={}, myClubStyles={}, myClubRecord={W:0,D:0,L:0,n:0,gf:0,ga:0};
      let withFormation=0, totalMatches=0;

      // Normalise a raw style keyword to a game-canonical label
      const normaliseStyle = raw => {
        const r = raw.toLowerCase();
        if (r.includes('tiki')) return 'Tiki-taka';
        if (r.includes('counter')) return 'Counter';
        if (r.includes('relentless') || r.includes('press')) return 'Pressing';
        if (r.includes('direct')) return 'Direct';
        if (r.includes('attack')) return 'Attacking';
        if (r.includes('defen')) return 'Defensive';
        if (r.includes('fluid')) return 'Fluid';
        if (r.includes('rigid')) return 'Rigid';
        return r.charAt(0).toUpperCase() + r.slice(1);
      };

      for (let i=0; i<ids.length; i++) {
        this.tacticsProgress=10+Math.round(88*(i+1)/ids.length);
        this.tacticsMsg=`Analysing match reports… ${i+1}/${ids.length}`;
        try {
          const d=await fetch(`${API}/matches/${ids[i]}`).then(r=>r.json());
          const m=d.match; if (!m) continue;
          totalMatches++;
          const events=m.events||[];
          const homeClub=m.home?.club, awayClub=m.away?.club;

          [{side:'home',club:homeClub},{side:'away',club:awayClub}].forEach(({side,club})=>{
            if (!club) return;
            const preEvents=events.filter(e=>e.minute===0&&e.type==='other'&&e.team===club);
            let formation=null, style=null;
            const narrative=(m.reportNarrative||[]).slice(0,3).join(' ');

            for (const e of preEvents) {
              const desc=e.description||'';
              // Match game's actual tactic labels + common narrative equivalents
              const sm=desc.match(/tiki[- ]?taka|counter[- ]?attack|\b(attacking|defensive|balanced|fluid|rigid|direct|pressing|relentless|compact|aggressive)\b/i);
              if (sm) style=normaliseStyle(sm[0]);
              if (desc.toLowerCase().includes(' in ')) {
                const fm=desc.match(fmRe);
                if (fm) {
                  const parts=fm[1].split('-').map(Number);
                  if (parts.length>=2&&parts.reduce((a,b)=>a+b,0)>=9) { formation=fm[1]; break; }
                }
              }
            }

            if (!formation) {
              const narClub=narrative.toLowerCase();
              if (narClub.includes(club.toLowerCase())) {
                const nm=narrative.match(/lined up[^.]*?(\d-\d[-\d]*)/i)||narrative.match(/in (?:an? )?[\w ]+?(\d-\d[-\d]*)/i);
                if (nm) { const parts=nm[1].split('-').map(Number); if (parts.reduce((a,b)=>a+b,0)>=9) formation=nm[1]; }
              }
            }

            if (!formation) return;
            withFormation++;
            const isHome=side==='home';
            const gf=isHome?(m.score?.home||0):(m.score?.away||0);
            const ga=isHome?(m.score?.away||0):(m.score?.home||0);
            const result=gf>ga?'W':gf<ga?'L':'D';

            // Formation stats
            if (!byFormation[formation]) byFormation[formation]={formation,W:0,D:0,L:0,gf:0,ga:0,n:0,styles:{}};
            byFormation[formation][result]++;
            byFormation[formation].gf+=gf; byFormation[formation].ga+=ga; byFormation[formation].n++;
            if (style) byFormation[formation].styles[style]=(byFormation[formation].styles[style]||0)+1;

            // Style stats (independent of formation)
            if (style) {
              if (!byStyle[style]) byStyle[style]={style,W:0,D:0,L:0,gf:0,ga:0,n:0};
              byStyle[style][result]++; byStyle[style].gf+=gf; byStyle[style].ga+=ga; byStyle[style].n++;
            }

            // My club's own data
            if (club===MY_CLUB) {
              if (!myClubForms[formation]) myClubForms[formation]={W:0,D:0,L:0,gf:0,ga:0,n:0};
              myClubForms[formation][result]++; myClubForms[formation].gf+=gf; myClubForms[formation].ga+=ga; myClubForms[formation].n++;
              myClubRecord[result]++; myClubRecord.gf+=gf; myClubRecord.ga+=ga; myClubRecord.n++;
              if (style) myClubStyles[style]=(myClubStyles[style]||0)+1;
            }
          });
        } catch(e){}
        await new Promise(r=>setTimeout(r,60));
      }

      const formations=Object.values(byFormation)
        .filter(f=>f.n>=2)
        .map(f=>{
          const topStyle=Object.entries(f.styles).sort((a,b)=>b[1]-a[1])[0]?.[0]||'';
          return {...f,topStyle,winPct:Math.round(100*f.W/f.n),ppg:((f.W*3+f.D)/f.n).toFixed(2),avgGF:(f.gf/f.n).toFixed(2),avgGA:(f.ga/f.n).toFixed(2)};
        })
        .sort((a,b)=>b.n-a.n);

      const styles=Object.values(byStyle)
        .filter(s=>s.n>=3)
        .map(s=>({...s,winPct:Math.round(100*s.W/s.n),ppg:((s.W*3+s.D)/s.n).toFixed(2),avgGF:(s.gf/s.n).toFixed(2),avgGA:(s.ga/s.n).toFixed(2)}))
        .sort((a,b)=>b.n-a.n);

      const myClubData = myClubRecord.n > 0 ? {
        record: myClubRecord,
        forms: Object.entries(myClubForms).sort((a,b)=>b[1].n-a[1].n).map(([f,v])=>({formation:f,...v,winPct:Math.round(100*v.W/v.n)})),
        topStyle: Object.entries(myClubStyles).sort((a,b)=>b[1]-a[1])[0]?.[0] || null,
        styleBreakdown: myClubStyles,
      } : null;

      const data={totalMatches,fixturesAnalysed:ids.length,withFormation,formations,styles,myClubData};
      this.tacticsData=data;
      const ts=Date.now();
      this.tacticsCacheDate=new Date(ts).toLocaleDateString();
      try { localStorage.setItem(TACTICS_CACHE_KEY,JSON.stringify({data,ts})); } catch(e){}
      this.tacticsMsg='Done!'; this.tacticsProgress=100;
      this.tacticsLoading=false; this.tacticsLoaded=true;
    },

    // ── Youth tab methods ──
    getYouthAttr(p, attr) {
      if (p[attr] != null && p[attr] > 0) return p[attr];
      if (p.stats && p.stats[attr] != null && p.stats[attr] > 0) return p.stats[attr];
      return null;
    },

    async loadYouth(forceRefresh = false) {
      const CACHE_KEY  = 'sf_youth_idx_v2';
      const LIVE_TTL   = 10 * 60 * 1000;   // 10 min: scouts + academy
      const HIST_TTL   = 60 * 60 * 1000;   // 1 h:  rejected history
      const STATIC_TTL = 60 * 60 * 1000;   // 1 h:  facilities + staff

      if (this.youthLoading) return;
      this.youthLoading = true;
      this.youthLoaded  = false;

      const applyCache = (c, rejItems) => {
        this.youthCap       = c.cap || {};
        this.youthScouts    = (c.scouts  || []).map(j=>({...j,_refreshed:false,_refreshing:false,_refreshFailed:false}));
        this.youthAcademy   = c.academy  || [];
        this.youthFacilities= c.facilities || {};
        this.youthStaff     = c.staff    || {};
        this.youthRejected  = (rejItems  || c.rejected || []).map(j=>({...j,_refreshed:false,_refreshing:false,_refreshFailed:false}));
        this.youthLoaded = true; this.youthMsg = '';
        if (this.youthScouts.length)       this.youthSubTab = 'scouts';
        else if (this.youthAcademy.length) this.youthSubTab = 'academy';
        else                               this.youthSubTab = 'history';
      };

      const buildAcademy = items => (items||[]).map(p => {
        const fullCount = ['Speed','Passing','Stamina','Heading','Tackling','Marking','Handling','Reflexes','Vision','Dribbling','Shooting'].filter(a=>this.getYouthAttr(p,a)>0).length;
        return {...p, _partial: fullCount < 5};
      });

      // ── Try cache ──────────────────────────────────────────────────────────
      if (!forceRefresh) {
        try {
          const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
          if (cached) {
            const now        = Date.now();
            const liveAge    = now - (cached.savedAt       || 0);
            const histAge    = now - (cached.histSavedAt   || 0);
            const staticAge  = now - (cached.staticSavedAt || 0);
            const enc        = encodeURIComponent(MY_CLUB);

            if (liveAge < LIVE_TTL && histAge < HIST_TTL && staticAge < STATIC_TTL) {
              // Fully fresh → serve from cache immediately
              applyCache(cached);
              this.youthLoading = false;
              return;
            }

            if (histAge < HIST_TTL) {
              // History fresh, but live/static may be stale → incremental refresh
              this.youthMsg = 'Refreshing scouting data…';
              const fetchLive = liveAge >= LIVE_TTL;
              const fetchStatic = staticAge >= STATIC_TTL;

              const [sjRes, acRes, facRes, staffRes] = await Promise.all([
                fetchLive   ? fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json())     : Promise.resolve(null),
                fetchLive   ? fetch(`${API}/academy?club=${enc}`).then(r=>r.json())           : Promise.resolve(null),
                fetchStatic ? fetch(`${API}/facilities?club=${enc}`).then(r=>r.json())        : Promise.resolve(null),
                fetchStatic ? fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json())     : Promise.resolve(null),
              ]);

              const newCache = {
                ...cached,
                savedAt      : fetchLive   ? now : cached.savedAt,
                staticSavedAt: fetchStatic ? now : cached.staticSavedAt,
                ...(fetchLive   ? { cap: sjRes.cap||{}, scouts: sjRes.items||[], academy: buildAcademy(acRes.items) } : {}),
                ...(fetchStatic ? { facilities: facRes||{}, staff: (staffRes&&staffRes.ok ? staffRes.effects : {})||{} } : {}),
              };
              try { localStorage.setItem(CACHE_KEY, JSON.stringify(newCache)); } catch(e) {}
              applyCache(newCache);
              this.youthLoading = false;
              return;
            }
          }
        } catch(e) { /* ignore cache errors, fall through to full fetch */ }
      }

      // ── Full fetch ─────────────────────────────────────────────────────────
      this.youthMsg = 'Fetching scouting data…';
      try {
        const enc = encodeURIComponent(MY_CLUB);
        const [sjRes, acRes, facRes, staffRes] = await Promise.all([
          fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/academy?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/facilities?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json()),
        ]);
        this.youthMsg = 'Fetching scout history…';
        const rejRes = await fetch(`${API}/scouting/jobs?club=${enc}&status=rejected`).then(r=>r.json());

        const academy = buildAcademy(acRes.items);
        const staff   = (staffRes.ok ? staffRes.effects : {}) || {};
        const now     = Date.now();

        const newCache = {
          savedAt: now, histSavedAt: now, staticSavedAt: now,
          cap: sjRes.cap||{}, scouts: sjRes.items||[], academy,
          facilities: facRes||{}, staff, rejected: rejRes.items||[],
        };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(newCache)); } catch(e) {}

        applyCache(newCache, rejRes.items);

        // Enrich players with missing attributes from scouting job data
        for (const job of [...(sjRes.items||[]), ...(rejRes.items||[])]) {
          const jpStats = job.player?.stats;
          if (!jpStats || !Object.keys(jpStats).length) continue;
          const playerName = (job.player.name || job.player.Player || '').toLowerCase();
          if (!playerName) continue;
          const found = this.players.find(p => (p.Name||p.name||'').toLowerCase() === playerName);
          if (found && found._incompleteStats) {
            Object.assign(found, jpStats);
            found._incompleteStats = FULL_ATTR_KEYS.filter(a=>found[a]!=null&&found[a]>0).length < 5;
          }
        }

        // Enrich active scout job.player objects with missing attributes from club squads
        const ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];
        const hasFullAttrs = p => p && (ATTR_KEYS.filter(a=>p[a]!=null&&p[a]>0).length >= 5 || (p.stats && ATTR_KEYS.filter(a=>p.stats[a]!=null&&p.stats[a]>0).length >= 5));
        const activeScouts = (sjRes.items||[]).filter(j => j.player && !hasFullAttrs(j.player));
        if (activeScouts.length) {
          const uniqueClubs = [...new Set(activeScouts.map(j=>j.player?.club||j.player?.Club).filter(Boolean))];
          const squadCache = {};
          await Promise.all(uniqueClubs.map(async club => {
            try {
              const d = await fetch(`${API}/squads?club=${encodeURIComponent(club)}`).then(r=>r.json());
              squadCache[club.toLowerCase()] = d.players||[];
            } catch(e) {}
          }));
          const MERGE = ['Speed','Stamina','Dribbling','Passing','Shooting','Tackling','Marking','Heading','Vision','Handling','Reflexes','Strength','Mentality','Experience','Leadership','Work rate','Adaptability','Form','Confidence'];
          for (const job of activeScouts) {
            const club = (job.player?.club||job.player?.Club||'').toLowerCase();
            const squad = squadCache[club]||[];
            const pName = (job.player?.name||job.player?.Player||'').toLowerCase();
            const found = squad.find(p=>(p.Player||'').toLowerCase()===pName);
            if (found) {
              MERGE.forEach(a=>{ if (found[a]!=null) job.player[a]=found[a]; });
              if (found.Rating) job.player.rating = found.Rating;
              if (found.Value) job.player.value = found.Value;
              if (found.Age) job.player.age = found.Age;
            }
          }
          // Update the cache with enriched data
          newCache.scouts = sjRes.items||[];
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(newCache)); } catch(e) {}
          // Re-apply so youthScouts gets the enriched player objects
          applyCache(newCache, rejRes.items);
        }
      } catch(e) {
        this.youthMsg = 'Load failed: ' + (e.message || String(e));
      }
      this.youthLoading = false;
    },

    async refreshYouthJob(job) {
      if (job._refreshing) return;
      job._refreshing = true; job._refreshed = false; job._refreshFailed = false;
      try {
        const clubName = job.player.club || job.player.Club || '';
        const data = await fetch(`${API}/squads?club=${encodeURIComponent(clubName)}`).then(r=>r.json());
        const squad = data.players || [];
        const name = (job.player.name || job.player.Player || '').toLowerCase();
        const found = squad.find(p=>(p.Player||'').toLowerCase()===name);
        if (found) {
          const MERGE_ATTRS = ['Speed','Stamina','Dribbling','Passing','Shooting','Tackling','Marking','Heading','Vision','Handling','Reflexes','Strength','Mentality','Experience','Leadership','Work rate','Adaptability','Form','Confidence'];
          const updated = {};
          MERGE_ATTRS.forEach(attr=>{ if (found[attr]!=null) updated[attr]=found[attr]; });
          Object.assign(job.player, updated, {
            _refreshedAt: new Date().toLocaleString(),
            rating: found.Rating || found._gameRating || job.player.rating,
            value: found.Value || job.player.value,
            age: found.Age || job.player.age,
          });
          job._refreshed = true;
          // Re-sync modal player if it's this player
          if (this.selectedPlayer) {
            const selName = (this.selectedPlayer.Player||this.selectedPlayer.name||'').toLowerCase();
            if (selName && selName === name) this.selectedPlayer = {...this.selectedPlayer, ...updated};
          }
        } else {
          job._refreshFailed = true;
        }
      } catch(e) { job._refreshFailed = true; }
      job._refreshing = false;
    },

    // ── All-clubs history methods ──
    youthClubMaxRating(club) {
      const jobs = this.youthAllHistoryJobs.filter(j=>j._club===club);
      if (!jobs.length) return 0;
      return Math.max(...jobs.map(j=>j.player?.rating||0));
    },
    youthClubAvgRating(club) {
      const jobs = this.youthAllHistoryJobs.filter(j=>j._club===club&&j.player?.rating);
      if (!jobs.length) return 0;
      return jobs.reduce((s,j)=>s+(j.player.rating||0),0)/jobs.length;
    },

    async loadYouthHistory(forceRefresh=false) {
      const HIST_CACHE_KEY = 'sf_youth_hist_v2';
      const HIST_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

      // Check cache first
      if (!forceRefresh) {
        try {
          const cached = localStorage.getItem(HIST_CACHE_KEY);
          if (cached) {
            const {data, ts} = JSON.parse(cached);
            if (Date.now()-ts < HIST_CACHE_TTL) {
              this.youthAllHistoryJobs = (data.jobs||[]).map(j=>({...j,_refreshed:false,_refreshing:false,_refreshFailed:false}));
              this.youthClubInfoMap = data.clubInfo||{};
              this.youthHistLoaded = true;
              this.youthHistCacheDate = new Date(ts).toLocaleString();
              return;
            }
          }
        } catch(e) {}
      }

      this.youthHistLoading = true;
      this.youthHistLoaded = false;
      this.youthHistMsg = 'Fetching club list…';
      this.youthHistProgress = 0;

      try {
        const [mgrRes, clubsRes] = await Promise.all([
          fetch(`${API}/managers`).then(r=>r.json()),
          fetch(`${API}/admin/squads/public/clubs`).then(r=>r.json()),
        ]);
        const managedSet = new Set(
          (mgrRes.managers||[]).filter(m=>m.club&&!m.username?.includes('~deleted~')).map(m=>m.club)
        );
        const clubs = (clubsRes.clubs||[]).filter(c=>managedSet.has(c));

        const allJobs = [];
        const clubInfoMap = {};
        const BATCH = 5;

        for (let i=0; i<clubs.length; i+=BATCH) {
          const batch = clubs.slice(i, i+BATCH);
          this.youthHistMsg = `Scanning clubs ${Math.min(i+BATCH,clubs.length)}/${clubs.length}…`;
          this.youthHistProgress = Math.round(Math.min(i+BATCH,clubs.length)/clubs.length*100);

          await Promise.all(batch.map(async c => {
            const enc = encodeURIComponent(c);
            try {
              const [rejRes, activeRes, accRes] = await Promise.all([
                fetch(`${API}/scouting/jobs?club=${enc}&status=rejected`).then(r=>r.json()),
                fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json()),
                fetch(`${API}/scouting/jobs?club=${enc}&status=accepted`).then(r=>r.json()),
              ]);
              const rejJobs = (rejRes.items||[]).map(j=>({...j, _jobStatus: j.status||'rejected'}));
              const activeJobs = (activeRes.items||[]).map(j=>({...j, _jobStatus: j.status||'active'}));
              const accJobs = (accRes.items||[]).map(j=>({...j, _jobStatus: 'accepted'}));
              const jobs = [...activeJobs, ...rejJobs, ...accJobs];
              if (jobs.length > 0) {
                const [facRes, staffRes] = await Promise.all([
                  fetch(`${API}/facilities?club=${enc}`).then(r=>r.json()).catch(()=>({})),
                  fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json()).catch(()=>({})),
                ]);
                jobs.forEach(j => allJobs.push({...j, _club: c}));
                clubInfoMap[c] = {
                  facilities: facRes||{},
                  staff: (staffRes.ok ? staffRes.effects : {})||{},
                };
              }
            } catch(e) { /* skip failed clubs */ }
          }));
          await new Promise(r=>setTimeout(r,80)); // small throttle between batches
        }

        // Auto-enrich players with incomplete attributes from their club squads
        const ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];
        const hasFullAttrs = p => p && (ATTR_KEYS.filter(a=>p[a]!=null&&p[a]>0).length >= 5 || (p.stats && ATTR_KEYS.filter(a=>p.stats[a]!=null&&p.stats[a]>0).length >= 5));
        const needsEnrich = allJobs.filter(j => j.player && !hasFullAttrs(j.player));
        if (needsEnrich.length) {
          this.youthHistMsg = `Enriching attributes for ${needsEnrich.length} players…`;
          const uniqueClubs = [...new Set(needsEnrich.map(j=>j.player?.club||j.player?.Club).filter(Boolean))];
          const squadCache = {};
          const ENRICH_BATCH = 4;
          for (let i=0; i<uniqueClubs.length; i+=ENRICH_BATCH) {
            await Promise.all(uniqueClubs.slice(i,i+ENRICH_BATCH).map(async club => {
              try {
                const d = await fetch(`${API}/squads?club=${encodeURIComponent(club)}`).then(r=>r.json());
                squadCache[club.toLowerCase()] = d.players||[];
              } catch(e) {}
            }));
          }
          const MERGE = ['Speed','Stamina','Dribbling','Passing','Shooting','Tackling','Marking','Heading','Vision','Handling','Reflexes','Strength','Mentality','Experience','Leadership','Work rate','Adaptability','Form','Confidence'];
          for (const j of needsEnrich) {
            const club = (j.player?.club||j.player?.Club||'').toLowerCase();
            const squad = squadCache[club]||[];
            const pName = (j.player?.name||j.player?.Player||'').toLowerCase();
            const found = squad.find(p=>(p.Player||'').toLowerCase()===pName);
            if (found) {
              MERGE.forEach(a=>{ if (found[a]!=null) j.player[a]=found[a]; });
              if (found.Rating) j.player.rating = found.Rating;
              if (found.Value) j.player.value = found.Value;
              if (found.Age) j.player.age = found.Age;
            }
          }
        }

        try {
          localStorage.setItem(HIST_CACHE_KEY, JSON.stringify({
            data: {jobs: allJobs, clubInfo: clubInfoMap},
            ts: Date.now()
          }));
        } catch(e) {}

        // Enrich _incompleteStats squad players using accepted scouting job data
        const acceptedJobs = allJobs.filter(j => j._jobStatus === 'accepted' && j.player?.stats && Object.keys(j.player.stats).length >= 11);
        if (acceptedJobs.length && this.allPlayers?.length) {
          const enrichCount = { n: 0 };
          this.allPlayers = this.allPlayers.map(p => {
            if (!p._incompleteStats) return p;
            const pname = (p.Player||'').toLowerCase();
            const match = acceptedJobs.find(j => (j.player.name||'').toLowerCase() === pname);
            if (!match) return p;
            enrichCount.n++;
            const enriched = {...p, ...match.player.stats};
            enriched._incompleteStats = FULL_ATTR_KEYS.filter(a=>enriched[a]!=null&&enriched[a]>0).length < 5;
            return enriched;
          });
          if (enrichCount.n) console.log(`[SF] enriched ${enrichCount.n} incomplete players from accepted scouting jobs`);
        }

        this.youthAllHistoryJobs = allJobs.map(j=>({...j,_refreshed:false,_refreshing:false,_refreshFailed:false}));
        this.youthClubInfoMap = clubInfoMap;
        this.youthHistLoaded = true;
        this.youthHistCacheDate = new Date().toLocaleString();
        this.youthHistMsg = '';
      } catch(e) {
        this.youthHistMsg = 'Load failed: ' + (e.message||String(e));
      }
      this.youthHistLoading = false;
    },

    // ── Club tab helpers ──
    facDescription(key, level) {
      const lv = Math.max(1, Math.min(5, level || 1));
      const jk = {
        stadium:  {1:"30,000 seats, but not a decent pie in sight.",2:"Capacity of 40,000. Still has library tendencies.",3:"One of the biggest grounds in the land, but needs a lick of paint.",4:"60,000 seats and almost as many food options.",5:"Iconic venue. A fortress and a cash machine."},
        training: {1:"You train on a primary school's playing field. Degrading.",2:"Local leisure centre. Functional, but sharing with OAP tai-chi on Wednesdays.",3:"A plot of land the plastic fan local MP awarded the club after a back-hander.",4:"Club-controlled site with good surfaces and gym.",5:"High-performance centre with dedicated staff and kit."},
        scouting: {1:"A dusty old fella in a rain mac who taps his nose a lot.",2:"A couple of part-timers with long lenses.",3:"Regional contacts and semi-regular reports.",4:"Co-ordinated coverage across key markets.",5:"Global reach, data-driven targets."},
        analytics:{1:"The owner's son is a whizz on socials.",2:"One intern with a spreadsheet and a dream.",3:"Basic event data and templated reports.",4:"Video and event pipelines with tagging.",5:"Integrated modelling and pre/post-match packs."},
        academy:  {1:"Your kid and a couple of his mates, if you're lucky.",2:"Community sessions with cones and bibs.",3:"Age-group teams and part-time coaches.",4:"Structured pathway with specialist coaches.",5:"Category-standard academy with links to first team."},
        medical:  {1:"A magic sponge. Better be pretty bloody magical...",2:"Tape, ice, and a rolly table in a cupboard.",3:"Dedicated room with ultrasound and rehab kit.",4:"Sports science staff and protocols.",5:"Full sports medicine suite and monitoring."},
      };
      return jk[key]?.[lv] || '';
    },
    facBonus(key, level) {
      const lv = Math.max(1, Math.min(5, level || 1));
      if (key === 'training') {
        const xpCap = Math.round((1 + 0.2*(lv-1) - 1)*100);
        const capStr = xpCap === 0 ? 'No XP cap bonus' : `Up to +${xpCap}% XP cap`;
        return `${capStr} · live XP & fatigue recovery rates shown below`;
      }
      if (key === 'scouting') {
        const slots = 3 + (lv >= 5 ? 2 : lv >= 4 ? 1 : 0);
        const qualityBump = lv >= 5 ? 2 : lv >= 3 ? 1 : 0;
        const speedPct = lv * 5;
        return `${slots} active scout slots · +${qualityBump} quality boost · +${speedPct}% scouting speed`;
      }
      if (key === 'academy') {
        const o = lv - 1;
        const i = 0.03 + 0.01*o, a = 0.12 + 0.02*o, r = 0.30, n = 0.55;
        const total = n + r + a + i;
        const bigJump = ((a + i) / total * 100).toFixed(1);
        const expected = (2*n/total + 3*r/total + 4*a/total + 5*i/total).toFixed(2);
        return `${bigJump}% big-jump chance · ${expected} avg training score`;
      }
      if (key === 'stadium') {
        const caps = {1:'30,000',2:'40,000',3:'50,000',4:'60,000',5:'80,000'};
        return `${caps[lv]} seat capacity → matchday income · CEO quality via staff`;
      }
      if (key === 'medical') {
        const det = {1:'No bonus',2:'-3% weekly injury chance · +4% rehab speed',3:'-6% weekly injury chance · +8% rehab speed',4:'-10% weekly injury chance · +12% rehab speed',5:'-14% weekly injury chance · +16% rehab speed'};
        return det[lv] + ' · Physio staff drives actual effect';
      }
      if (key === 'analytics') {
        const fms = {1:'442 · 433 · 4231 · 532 · 343',2:'+352 · 541 · 4411',3:'+4321 · 451',4:'+4141 · 442 D · 3421',5:'+3241 · 4222 · 4132'};
        return `Formations unlocked: ${fms[lv]} · automation via Responsibilities tab`;
      }
      return 'Effects from staff quality';
    },
    facRef(key, lv) {
      lv = Math.max(1, Math.min(5, lv || 1));
      if (key === 'training') return lv === 1 ? 'Base (no XP cap bonus)' : `+${(lv-1)*20}% XP cap`;
      if (key === 'scouting') {
        const slots = 3 + (lv >= 5 ? 2 : lv >= 4 ? 1 : 0);
        const qual = lv >= 5 ? 2 : lv >= 3 ? 1 : 0;
        const speed = lv * 5;
        return slots + ' slots' + (qual ? ` · +${qual} rtg` : '') + ` · +${speed}% spd`;
      }
      if (key === 'academy') return ['15.0','17.5','19.8','22.0','24.1'][lv-1] + '% big-jump';
      if (key === 'medical') {
        const med = {1:'Base',2:'-3% inj / +4% rehab',3:'-6% inj / +8% rehab',4:'-10% inj / +12% rehab',5:'-14% inj / +16% rehab'};
        return med[lv];
      }
      if (key === 'analytics') {
        const fms = {1:'442 433 4231 532 343',2:'+352 541 4411',3:'+4321 451',4:'+4141 442D 3421',5:'+3241 4222 4132'};
        return fms[lv];
      }
      if (key === 'stadium') return ['30k','40k','50k','60k','80k'][lv-1] + ' seats';
      return '';
    },
    facCurLv(key) {
      return this.clubFacData?.levels?.[key] || 0;
    },
    facEmoji(key) {
      return {stadium:'🏟',training:'⚽',scouting:'🔭',analytics:'📊',academy:'🌱',medical:'🏥'}[key]||'🏗';
    },
    facTitle(key) {
      return {stadium:'Stadium',training:'Training Ground',scouting:'Scouting Network',analytics:'Analytics Dept',academy:'Academy',medical:'Medical Centre'}[key]||key;
    },
    async loadClub(forceRefresh=false) {
      this.clubLoading = true; this.clubMsg = 'Loading club data…';
      try {
        const enc = encodeURIComponent(MY_CLUB);
        const CACHE_KEY = 'sf_club_v1';
        const TTL = 30 * 60 * 1000; // 30 min
        if (!forceRefresh) {
          try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
            if (cached && (Date.now() - cached.savedAt) < TTL) {
              this.clubFacData = cached.facilities;
              this.clubFacQuotes = cached.quotes||{};
              this.clubStaff = cached.staff||{};
              this.clubStaffEffects = cached.effects||{};
              this.clubLoaded = true; this.clubLoading = false; this.clubMsg = ''; return;
            }
          } catch(e) {}
        }
        const facTypes = ['stadium','training','academy','scouting','medical','analytics'];
        const [facRes, staffRes, staffEffectsRes, ...quotesArr] = await Promise.all([
          fetch(`${API}/facilities?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/staff?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          ...facTypes.map(k =>
            fetch(`${API}/facilities/quote?club=${enc}&key=${k}`)
              .then(r=>r.json()).then(d=>({key:k,...d})).catch(()=>({key:k,ok:false}))
          ),
        ]);
        this.clubFacData = facRes;
        this.clubStaff = staffRes||{};
        this.clubStaffEffects = (staffEffectsRes.ok !== false ? staffEffectsRes.effects : {})||{};
        this.clubFacQuotes = Object.fromEntries(quotesArr.map(q=>[q.key, q]));
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            savedAt: Date.now(),
            facilities: facRes, quotes: this.clubFacQuotes,
            staff: staffRes||{}, effects: this.clubStaffEffects,
          }));
        } catch(e) {}
        this.clubLoaded = true; this.clubMsg = '';
      } catch(e) {
        this.clubMsg = 'Error: ' + e.message;
      } finally { this.clubLoading = false; }
    },

    // ── Background auto-refresh (9am–11pm EST, incremental) ──
    // Refreshes scouts/academy/facilities/staff silently without showing a loading spinner.
    // History (all-clubs) is 24h TTL and is never auto-refreshed (too expensive).
    bgAutoRefresh() {
      // EST: UTC-5 standard / UTC-4 daylight saving. Use UTC-5 as conservative default.
      const nowUtc = new Date();
      const estHour = (nowUtc.getUTCHours() + 19) % 24; // UTC-5 → add 19 mod 24
      if (estHour < 9 || estHour >= 23) return; // outside 9am–11pm EST

      const CACHE_KEY   = 'sf_youth_idx_v2';
      const LIVE_TTL    = 8 * 60 * 1000;   // bg: refresh scouts/academy every 8 min
      const STATIC_TTL  = 60 * 60 * 1000;  // bg: refresh facilities/staff every 60 min

      (async () => {
        try {
          const enc = encodeURIComponent(MY_CLUB);
          const now = Date.now();

          // Determine what's stale (based on cached timestamps)
          let cached = null;
          try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)||'null'); } catch(e) {}
          const liveAge   = now - (cached?.savedAt       || 0);
          const staticAge = now - (cached?.staticSavedAt || 0);

          const fetchLive   = liveAge   >= LIVE_TTL;
          const fetchStatic = staticAge >= STATIC_TTL;
          if (!fetchLive && !fetchStatic) return; // nothing stale

          const [sjRes, acRes, facRes, staffRes] = await Promise.all([
            fetchLive   ? fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json())    : Promise.resolve(null),
            fetchLive   ? fetch(`${API}/academy?club=${enc}`).then(r=>r.json())          : Promise.resolve(null),
            fetchStatic ? fetch(`${API}/facilities?club=${enc}`).then(r=>r.json())       : Promise.resolve(null),
            fetchStatic ? fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json())    : Promise.resolve(null),
          ]);

          // Apply live data (scouts + academy)
          if (fetchLive && sjRes) {
            this.youthCap    = sjRes.cap || this.youthCap;
            this.youthScouts = (sjRes.items||[]).map(j=>({...j,_refreshed:false,_refreshing:false,_refreshFailed:false}));
          }
          if (fetchLive && acRes) {
            const fullKeys = ['Speed','Passing','Stamina','Heading','Tackling','Marking','Handling','Reflexes','Vision','Dribbling','Shooting'];
            this.youthAcademy = (acRes.items||[]).map(p => {
              const fullCount = fullKeys.filter(a=>this.getYouthAttr(p,a)>0).length;
              return {...p, _partial: fullCount<5};
            });
          }
          // Apply static data (facilities + staff)
          if (fetchStatic && facRes)   this.youthFacilities = facRes||{};
          if (fetchStatic && staffRes) this.youthStaff      = (staffRes.ok ? staffRes.effects : {})||{};

          this.youthBgLastRefresh = new Date().toLocaleTimeString();

          // Update cache
          try {
            const newCache = {
              ...(cached||{}),
              ...(fetchLive   ? {savedAt: now, cap: sjRes?.cap||{}, scouts: sjRes?.items||[], academy: this.youthAcademy} : {}),
              ...(fetchStatic ? {staticSavedAt: now, facilities: facRes||{}, staff: this.youthStaff} : {}),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
          } catch(e) {}
        } catch(e) { /* silent fail */ }
      })();
    },

    // ── Saved lineup ──────────────────────────────────────────────────────────
    loadSavedLineup() {
      try {
        const raw = localStorage.getItem(`st2:last:${MY_CLUB}`);
        if (raw) {
          const d = JSON.parse(raw);
          d.runs = localStorage.getItem(`st2:runs:${MY_CLUB}`) || 'on';
          this.savedLineup = d;
        } else {
          this.savedLineup = null;
        }
      } catch(e) { this.savedLineup = null; }
    },

    // ── Generic table sort helpers ────────────────────────────────────────────
    tblSortBy(tbl, col) {
      const cur = this.tblSort[tbl];
      this.tblSort = { ...this.tblSort, [tbl]: { col, dir: cur?.col === col && cur.dir === 'desc' ? 'asc' : 'desc' } };
    },
    tblSortIcon(tbl, col) {
      const s = this.tblSort[tbl];
      if (!s || s.col !== col) return '';
      return s.dir === 'asc' ? ' ▲' : ' ▼';
    },
    tblSorted(arr, tbl) {
      if (!arr) return [];
      const s = this.tblSort[tbl];
      if (!s || !s.col) return arr;
      const { col, dir } = s;
      const sign = dir === 'asc' ? 1 : -1;
      const get = (item) => col.split('.').reduce((o, k) => o?.[k], item);
      return [...arr].sort((a, b) => {
        let av = get(a), bv = get(b);
        if (av == null) return 1; if (bv == null) return -1;
        const r = typeof av === 'string' ? av.localeCompare(bv) : Number(av) - Number(bv);
        return sign * r;
      });
    },
    // ── Youth table sort helpers ──────────────────────────────────────────────
    youthSortBy(col) {
      const keyMap = { name:'name_a', pos:'pos_a', age:'age_a', rating:'rating_d', value:'value_d', buyNow:'buynow_d', date:'date', status:'status_a', sclub:'sclub_a', bestattr:'bestattr_a' };
      const togMap = { name_a:'name_d', name_d:'name_a', pos_a:'pos_d', pos_d:'pos_a', age_a:'age_d', age_d:'age_a', rating_d:'rating_a', rating_a:'rating_d', value_d:'value_a', value_a:'value_d', buynow_d:'buynow_a', buynow_a:'buynow_d', date:'date_a', date_a:'date', status_a:'status_d', status_d:'status_a', sclub_a:'sclub_d', sclub_d:'sclub_a', bestattr_a:'bestattr_d', bestattr_d:'bestattr_a' };
      const target = keyMap[col]; if (!target) return;
      this.youthHistSort = this.youthHistSort === target ? (togMap[target] || target) : target;
    },
    youthSortIcon(col) {
      const s = this.youthHistSort;
      const asc = { name:'name_a', pos:'pos_a', age:'age_a', rating:'rating_a', value:'value_a', buyNow:'buynow_a', date:'date_a', status:'status_a', sclub:'sclub_a', bestattr:'bestattr_a' };
      const desc = { name:'name_d', pos:'pos_d', age:'age_d', rating:'rating_d', value:'value_d', buyNow:'buynow_d', date:'date', status:'status_d', sclub:'sclub_d', bestattr:'bestattr_d' };
      if (s === asc[col]) return ' ▲';
      if (s === desc[col]) return ' ▼';
      return '';
    },
    // ── Espionage table sort helpers ──────────────────────────────────────────
    espSortBy(col) {
      const keyMap = { club:'club', ceo:'ceo_d', td:'td_d', asst:'asst_d', physio:'physio_d', training:'training_d', scouting:'scouting_d', academy:'academy_d', medical:'medical_d', analytics:'analytics_d', stadium:'stadium_d', ads:'ads_d' };
      const togMap = { club:'club_d', club_d:'club', ceo_d:'ceo_a', ceo_a:'ceo_d', td_d:'td_a', td_a:'td_d', asst_d:'asst_a', asst_a:'asst_d', physio_d:'physio_a', physio_a:'physio_d', training_d:'training_a', training_a:'training_d', scouting_d:'scouting_a', scouting_a:'scouting_d', academy_d:'academy_a', academy_a:'academy_d', medical_d:'medical_a', medical_a:'medical_d', analytics_d:'analytics_a', analytics_a:'analytics_d', stadium_d:'stadium_a', stadium_a:'stadium_d', ads_d:'ads_a', ads_a:'ads_d' };
      const target = keyMap[col]; if (!target) return;
      this.espionageSort = this.espionageSort === target ? (togMap[target] || target) : target;
    },
    espSortIcon(col) {
      const s = this.espionageSort;
      const aKeys = { club:'club', ceo:'ceo_a', td:'td_a', asst:'asst_a', physio:'physio_a', training:'training_a', scouting:'scouting_a', academy:'academy_a', medical:'medical_a', analytics:'analytics_a', stadium:'stadium_a', ads:'ads_a' };
      const dKeys = { club:'club_d', ceo:'ceo_d', td:'td_d', asst:'asst_d', physio:'physio_d', training:'training_d', scouting:'scouting_d', academy:'academy_d', medical:'medical_d', analytics:'analytics_d', stadium:'stadium_d', ads:'ads_d' };
      if (s === aKeys[col]) return ' ▲';
      if (s === dKeys[col]) return ' ▼';
      return '';
    },
    // ── Negotiations sort helpers ─────────────────────────────────────────────
    negoSortBy(col) {
      const keyMap = { player:'player_d', parties:'parties_d', fee:'fee_d', status:'status_a', date:'date_d' };
      const togMap = { player_d:'player_a', player_a:'player_d', parties_d:'parties_a', parties_a:'parties_d', fee_d:'fee_a', fee_a:'fee_d', status_a:'status_d', status_d:'status_a', date_d:'date_a', date_a:'date_d' };
      const target = keyMap[col]; if (!target) return;
      this.negoSort = this.negoSort === target ? (togMap[target] || target) : target;
    },
    negoSortIcon(col) {
      const s = this.negoSort;
      const aKeys = { player:'player_a', parties:'parties_a', fee:'fee_a', status:'status_a', date:'date_a' };
      const dKeys = { player:'player_d', parties:'parties_d', fee:'fee_d', status:'status_d', date:'date_d' };
      if (s === aKeys[col]) return ' ▲';
      if (s === dKeys[col]) return ' ▼';
      return '';
    },

    // ── Detect current game week ──────────────────────────────────────────────
    async fetchCurrentGameWeek() {
      // Try /game first
      try {
        const gameRes = await fetch(`${API}/game`, {signal: AbortSignal.timeout(4000)}).then(r=>r.json());
        const w = Number(gameRes?.week ?? gameRes?.currentWeek ?? gameRes?.gameWeek ?? gameRes?.currentGameWeek ?? gameRes?.weekNumber);
        if (w > 0 && !isNaN(w)) {
          // If /game returns same week as tables (asOfWeek), it's also reporting last completed week — use +1
          const asOf = Number(this.asOfWeek);
          this.currentGameWeek = (asOf > 0 && w <= asOf) ? w + 1 : w;
          return;
        }
        console.log('[SF] /game response (no week field found):', JSON.stringify(gameRes).slice(0,300));
      } catch(e) { console.log('[SF] /game failed:', e.message); }
      // Try /matches — infer from latest match week
      try {
        const mRes = await fetch(`${API}/matches?club=${encodeURIComponent(MY_CLUB)}&limit=3`, {signal: AbortSignal.timeout(4000)}).then(r=>r.json());
        const weeks = (mRes.matches||[]).map(m => Number(m.gameweek ?? m.week ?? m.gameWeek ?? m.round ?? m.weekNumber)).filter(w => w > 0 && !isNaN(w));
        if (weeks.length) { this.currentGameWeek = Math.max(...weeks) + 1; return; }
        console.log('[SF] /matches response sample:', JSON.stringify((mRes.matches||[])[0]).slice(0,300));
      } catch(e) {}
      // Final fallback: asOfWeek + 1 (tables = last completed week)
      const w = Number(this.asOfWeek);
      if (w > 0 && !isNaN(w)) this.currentGameWeek = w + 1;
    },

    // ── Generate applicants ───────────────────────────────────────────────────
    async generateApplicants() {
      this.staffGenLoading = true;
      this.staffGenResults = null;
      try {
        let week = this.staffGenWeek || this.currentGameWeek;
        if (!week) {
          // currentGameWeek not yet loaded — fetch it now
          await this.fetchCurrentGameWeek();
          week = this.currentGameWeek || this.asOfWeek;
        }
        const authHeaders = { 'Content-Type': 'application/json' };
        const ROLES = ['CEO', 'Technical Director', 'Assistant', 'Physio'];
        this.staffGenMsg = `Week ${week} — posting ads…`;
        for (const role of ROLES) {
          await fetch(`${API}/staff/ads`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({ club: MY_CLUB, role }),
          }).catch(() => {});
        }
        this.staffGenMsg = 'Generating candidates…';
        const genRes = await fetch(`${API}/staff/generate`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({ club: MY_CLUB, week }),
        });
        if (!genRes.ok) {
          const txt = await genRes.text();
          throw new Error(`${genRes.status} ${genRes.statusText} — ${txt.slice(0,120)}`);
        }
        const gen = await genRes.json();
        const rejectedNames = new Set(JSON.parse(localStorage.getItem('sf_staff_rejected_v1')||'[]'));
        const candidates = (Array.isArray(gen) ? gen : (gen.applicants || []))
          .filter(c => !rejectedNames.has((c.name||c.Name||'').toLowerCase()));
        const byRole = {};
        for (const c of candidates) {
          const role = c.role || c.Role || 'Unknown';
          if (!byRole[role]) byRole[role] = [];
          byRole[role].push(c);
        }
        for (const role of Object.keys(byRole)) {
          byRole[role].sort((a, b) => (b.rating || b.r || 0) - (a.rating || a.r || 0));
        }
        this.staffGenResults = { week, byRole };
        this.staffGenMsg = '';
      } catch(e) {
        this.staffGenMsg = '⚠ Error: ' + e.message;
      } finally {
        this.staffGenLoading = false;
      }
    },

    async postAdsOnly() {
      this.staffAdsLoading = true;
      this.staffAdsMsg = '';
      this.staffAdsPosted = false;
      try {
        const authHeaders = { 'Content-Type': 'application/json' };
        const ROLES = ['CEO', 'Technical Director', 'Assistant', 'Physio'];
        for (const role of ROLES) {
          await fetch(`${API}/staff/ads`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({ club: MY_CLUB, role }),
          }).catch(() => {});
        }
        this.staffAdsPosted = true;
        this.staffAdsMsg = '✓ Ads posted for all 4 roles';
      } catch(e) {
        this.staffAdsMsg = '⚠ ' + e.message;
      } finally {
        this.staffAdsLoading = false;
      }
    },
    persistRejectedStaff(candidates) {
      try {
        const key = 'sf_staff_rejected_v1';
        const existing = JSON.parse(localStorage.getItem(key)||'[]');
        const names = candidates.map(c => (c.name||c.Name||'').toLowerCase()).filter(Boolean);
        const merged = [...new Set([...existing, ...names])];
        localStorage.setItem(key, JSON.stringify(merged.slice(-200)));
      } catch(e) {}
    },
    async apiRejectCandidate(c) {
      const headers = { 'Content-Type': 'application/json' };
      try {
        await fetch(`${API}/staff/applicants/reject`, {
          method: 'POST', headers,
          body: JSON.stringify({ club: MY_CLUB, name: c.name||c.Name, role: c.role||c.Role, week: this.staffGenResults?.week }),
        });
      } catch(e) {}
    },
    rejectCandidate(role, idx) {
      if (!this.staffGenResults) return;
      const candidate = this.staffGenResults.byRole[role][idx];
      if (candidate) {
        this.persistRejectedStaff([candidate]);
        this.apiRejectCandidate(candidate);
      }
      const byRole = { ...this.staffGenResults.byRole };
      byRole[role] = byRole[role].filter((_, i) => i !== idx);
      this.staffGenResults = { ...this.staffGenResults, byRole };
    },
    rejectAllCandidates(role) {
      if (!this.staffGenResults) return;
      const all = this.staffGenResults.byRole[role] || [];
      if (all.length) {
        this.persistRejectedStaff(all);
        all.forEach(c => this.apiRejectCandidate(c));
      }
      const byRole = { ...this.staffGenResults.byRole };
      byRole[role] = [];
      this.staffGenResults = { ...this.staffGenResults, byRole };
    },

    // ── Espionage ─────────────────────────────────────────────────────────────
    espRatingClass(r) { if (!r) return 'c-gray'; return r >= 85 ? 'c-green' : r >= 75 ? 'c-orange' : 'c-gray'; },
    espFacClass(lv) { return lv >= 5 ? 'c-green' : lv >= 4 ? 'c-orange' : lv >= 3 ? 'c-blue' : 'c-gray'; },
    negoStatusStyle(status) {
      const map = {
        active:   {background:'#1a4a2e', color:'#7ee787'},
        offered:  {background:'#3a2a6b', color:'#d2a8ff'},
        countered:{background:'#4a3a10', color:'#ffa657'},
        counter:  {background:'#4a3a10', color:'#ffa657'},
        pending:  {background:'#1f3a5a', color:'#79c0ff'},
        accepted: {background:'#1a4a2e', color:'#7ee787'},
        rejected: {background:'#3a1212', color:'#ff7b72'},
        withdrawn:{background:'#21262d', color:'#8b949e'},
      };
      const s = map[status] || {background:'#21262d', color:'#8b949e'};
      return {...s, borderRadius:'8px', padding:'1px 7px', fontSize:'10px', fontWeight:'700'};
    },
    negoSubStatusStyle(sub) {
      if (!sub) return {color:'#8b949e'};
      if (['agreed','finalised','won'].includes(sub)) return {color:'#7ee787', fontWeight:'600'};
      if (['declined','withdrawn','counter_rejected','moved_elsewhere','outbid','insufficient_funds'].includes(sub)) return {color:'#ff7b72'};
      if (['offer','finalising','adjusted','auction-bid'].includes(sub)) return {color:'#ffa657'};
      return {color:'#8b949e'};
    },
    fmtSubStatus(sub) {
      if (!sub) return '—';
      const map = {
        withdrawn: '↩ Withdrawn', declined: '✗ Declined', agreed: '✓ Agreed',
        offer: 'Offer out', finalised: '✓ Done', moved_elsewhere: 'Went elsewhere',
        adjusted: 'Adjusted', closed: 'Closed', finalising: 'Finalising…',
        outbid: 'Outbid', counter_rejected: 'Counter rejected', won: '✓ Won',
        insufficient_funds: '$ Insufficient', 'auction-bid': 'Auction bid',
      };
      return map[sub] || sub;
    },
    fmtNegoDate(ts) {
      if (!ts) return '—';
      const d = new Date(ts);
      if (isNaN(d.getTime())) return '—';
      const diff = Date.now() - d.getTime();
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return Math.floor(diff/60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago';
      if (diff < 7*86400000) return Math.floor(diff/86400000) + 'd ago';
      return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short'});
    },
    openPlayerByName(name) {
      if (!name) return;
      const lc = name.toLowerCase();
      const p = this.allPlayers.find(pl => (pl.Player||'').toLowerCase() === lc);
      if (p) this.openModal(p);
    },

    async loadEspionage(forceRefresh = false) {
      this.espionageLoading = true;
      this.espionageMsg = 'Loading…';
      this.espionageProgress = 0;
      const CACHE_KEY = 'sf_espionage_v3';
      const TTL = 30 * 60 * 1000;
      if (!forceRefresh) {
        try {
          let rawCached = await serverCacheGet(CACHE_KEY);
          if (!rawCached) rawCached = localStorage.getItem(CACHE_KEY);
          const cached = rawCached ? await parseAsync(rawCached) : null;
          if (cached && (Date.now() - cached.savedAt) < TTL) {
            this.espionageClubs = cached.clubs || [];
            this.espionageNegos = cached.negos || [];
            this.espionageCacheDate = new Date(cached.savedAt).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
            this.espionageLoaded = true;
            this.espionageLoading = false;
            this.loadEspionageSubmissions();
            return;
          }
        } catch(e) {}
      }
      try {
        // Get unique clubs from player data
        const clubSet = new Set(this.allPlayers.map(p => p.Club).filter(Boolean));
        const clubs = [...clubSet].sort();
        const total = clubs.length;

        // Fetch negotiations
        let negos = [];
        try {
          const r = await fetch(`${API}/negotiations`).then(r => r.json());
          const all = Array.isArray(r) ? r : (r.negotiations || r.items || []);
          const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
          negos = all
            .filter(n => {
              const d = n.updatedAt ? new Date(n.updatedAt).getTime() : (n.ts || 0);
              return d > twoWeeksAgo;
            })
            .map(n => ({
              id: n.id,
              playerName: n.playerName,
              buyer: n.buyer || n.toClub,
              seller: n.seller || n.fromClub,
              amount: n.amount,
              status: n.status,
              subStatus: n.subStatus,
              via: n.via,
              lastActionBy: n.lastActionBy,
              history: n.history || [],
              createdAt: n.createdAt,
              updatedAt: n.updatedAt || n.ts,
            }))
            .sort((a,b) => new Date(b.updatedAt||0) - new Date(a.updatedAt||0));
        } catch(e) {}

        // Batch fetch staff + facilities for all clubs
        const results = [];
        const BATCH = 8;
        for (let i = 0; i < clubs.length; i += BATCH) {
          const batch = clubs.slice(i, i + BATCH);
          const batchRes = await Promise.all(batch.map(async club => {
            const enc = encodeURIComponent(club);
            try {
              const [staffRes, facRes] = await Promise.all([
                fetch(`${API}/staff?club=${enc}`).then(r => r.json()).catch(() => ({})),
                fetch(`${API}/facilities?club=${enc}`).then(r => r.json()).catch(() => ({})),
              ]);
              return {
                club,
                current: staffRes.current || {},
                ads: staffRes.openAds || [],
                levels: facRes.levels || {},
                project: facRes.project || null,
              };
            } catch(e) {
              return { club, current: {}, ads: [], levels: {}, project: null };
            }
          }));
          results.push(...batchRes);
          this.espionageProgress = Math.min(99, Math.round((i + BATCH) / total * 100));
          await new Promise(r => setTimeout(r, 0)); // yield to UI
        }

        this.espionageClubs = results;
        this.espionageNegos = negos;
        this.espionageCacheDate = new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        const espionageCacheStr = JSON.stringify({ savedAt: Date.now(), clubs: results, negos });
        serverCacheSet(CACHE_KEY, espionageCacheStr);  // server-side persistence
        try { localStorage.setItem(CACHE_KEY, espionageCacheStr); } catch(e) {}
        this.espionageLoaded = true;
        this.espionageProgress = 100;
        this.loadEspionageSubmissions();
      } catch(e) {
        this.espionageMsg = '⚠ ' + e.message;
      } finally {
        this.espionageLoading = false;
      }
    },

    drawTacticsCharts() {
      this.destroyChart('formations'); this.destroyChart('form-pop');
      const ctx1=document.getElementById('chart-formations');
      if (ctx1&&this.tacticsData) {
        const sorted=[...this.tacticsData.formations].sort((a,b)=>b.winPct-a.winPct).slice(0,12);
        this.charts['formations']=new Chart(ctx1,{type:'bar',
          data:{labels:sorted.map(f=>f.formation),datasets:[
            {label:'Win %',data:sorted.map(f=>f.winPct),backgroundColor:'#238636',borderRadius:4},
            {label:'Draw %',data:sorted.map(f=>Math.round(100*f.D/f.n)),backgroundColor:'#d2982280',borderRadius:4},
          ]},
          options:{plugins:{legend:{labels:{color:'#8b949e'}}},scales:{x:{stacked:false,ticks:{color:'#8b949e'}},y:{max:80,ticks:{color:'#8b949e'}}}}});
      }
      const ctx2=document.getElementById('chart-form-pop');
      if (ctx2&&this.tacticsData) {
        const top=this.tacticsData.formations.slice(0,12);
        this.charts['form-pop']=new Chart(ctx2,{type:'bar',
          data:{labels:top.map(f=>f.formation),datasets:[{label:'Times used',data:top.map(f=>f.n),backgroundColor:'#1f6feb',borderRadius:4}]},
          options:{indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e'}},y:{ticks:{color:'#e6edf3',font:{weight:'bold'}}}}}});
      }
    },

  // ── Match Archive ─────────────────────────────────────────────────────────
    // ── Match processing helpers (all from stored data, no API calls) ────────

    // Extract formation string from narrative text, looking near club name
    extractFormation(narrativeArr, club) {
      if (!club) return null;
      // Join ALL Pre-match paragraphs (not just the first one)
      const paras = Array.isArray(narrativeArr) ? narrativeArr : [narrativeArr || ''];
      const text = paras.filter(p => typeof p === 'string' && p.startsWith('Pre-match')).join(' ')
                   || paras.join(' ');
      const esc = club.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const fmt = '(\\d-\\d(?:-\\d){0,2})';
      let m = text.match(new RegExp(`${esc}.{0,150}${fmt}`));
      if (m) return m[1];
      m = text.match(new RegExp(`${fmt}.{0,150}${esc}`));
      if (m) return m[1];
      return null;
    },

    // Derive formation from starters' position counts (fallback when not in narrative)
    deriveFormation(ratings) {
      if (!ratings?.length) return null;
      const starters = ratings.filter(p => p.minutes > 0 && !p.subbedOnAt);
      if (starters.length < 9) return null;
      const c = {};
      for (const p of starters) { const bp = this.basePos(p.position); c[bp] = (c[bp] || 0) + 1; }
      const def = (c.CB || 0) + (c.FB || 0);
      const dm = c.DM || 0;
      const cm = (c.CM || 0) + (c.WM || 0);
      const am = c.AM || 0;
      const att = (c.WF || 0) + (c.CF || 0);
      const parts = [def];
      if (dm) parts.push(dm);
      if (cm) parts.push(cm);
      if (am) parts.push(am);
      parts.push(att);
      return parts.join('-');
    },

    // L/R/C position label given position code, index within that position, total count
    posLabel(pos, idx, total) {
      if (total <= 1 || pos === 'GK') return pos;
      const sides2 = { FB:['LB','RB'], CB:['LCB','RCB'], DM:['LDM','RDM'], CM:['LCM','RCM'],
                       WM:['LWM','RWM'], AM:['LAM','RAM'], WF:['LW','RW'], CF:['LCF','RCF'] };
      const sides3 = { CB:['LCB','CB','RCB'], DM:['LDM','DM','RDM'], CM:['LCM','CM','RCM'],
                       AM:['LAM','AM','RAM'] };
      const labels = total >= 3 && sides3[pos] ? sides3[pos] : sides2[pos];
      return labels?.[idx] ?? pos;
    },

    // Strip L/R/C side prefix from API position codes → base game position
    basePos(pos) {
      if (!pos) return pos;
      const map = {
        LB:'FB', RB:'FB',
        LCB:'CB', RCB:'CB',
        LDM:'DM', RDM:'DM',
        LCM:'CM', RCM:'CM',
        LM:'WM', RM:'WM', LWM:'WM', RWM:'WM',
        LAM:'AM', RAM:'AM',
        LW:'WF', RW:'WF', LWF:'WF', RWF:'WF',
        LCF:'CF', RCF:'CF',
      };
      return map[pos] || pos;
    },

    // Look up player data from allPlayers by name (case-insensitive)
    xiPlayerInfo(name) {
      if (!name) return null;
      const lc = name.toLowerCase();
      return this.allPlayers.find(p => (p.Player||'').toLowerCase() === lc) || null;
    },

    // Build layout array for pitch visualization: maps each xi player to their slot position + run target
    pitchLayout(submission) {
      if (!submission?.xi?.length) return [];
      const code = String(submission.formation||'').replace(/-/g,'');
      const positions = FORMATION_SLOT_POS[code];
      if (!positions) return [];

      // Pass 1: assign positions and collect slot groups
      const players = submission.xi.map((player, i) => {
        const pos = positions[i] || {x:50,y:50};
        const slotType = player.slot || (FORMATIONS[code]||[])[i] || 'CM';
        const bp = this.basePos(player.position || slotType || 'CM');
        const colors = POS_COLORS[bp] || POS_COLORS.CM;
        return { name: player.name, position: player.position || slotType,
                 bp, slotType, x: pos.x, y: pos.y,
                 fill: colors.fill, stroke: colors.stroke, textColor: colors.text };
      });

      // Pass 2: number slots in xi array order (WM1=first WM in xi, WM2=second, etc.)
      // This matches the API runs object key convention
      const slotCount = {};
      const slotKeys = players.map((p) => {
        const t = p.slotType;
        slotCount[t] = (slotCount[t] || 0) + 1;
        return `${t}${slotCount[t]}`;
      });

      // Pass 3: attach run targets
      // Coordinate system: slot1 (right-side) uses top-left origin (no flip needed).
      // slot2 (left-side) uses y-flipped origin → flip y only. No x-flip for either.
      return players.map((p, i) => {
        const slotKey = slotKeys[i];
        const runPts = submission.runs?.[slotKey] || [];
        const run = runPts[0] || null;
        const slotNum = parseInt(slotKey.replace(/\D/g, '')) || 1;
        const isLeft = slotNum % 2 === 0; // slot2 = left-side players
        // Game uses 150-unit coord space; pitch occupies y=[27.5,122.5] (95 units = 105m)
        // slot1 (right-side): y=27.5→attacking goal, y=122.5→GK → SVG_y=(raw_y-27.5)/95*105
        // slot2 (left-side): flipped, y=0→GK, y=100→attacking → SVG_y=105-(raw_y/100)*105
        // x: pitch spans 0–90 units across 68m → SVG_x=(raw_x/90)*68
        return { ...p, slotKey,
          runX: run !== null ? (run.x / 90) * 68 : null,
          runY: run !== null ? (isLeft
            ? 105 - (run.y / 100) * 105
            : (run.y - 27.5) / 95 * 105) : null,
        };
      });
    },

    // Return starters in raw API order with position label, plus subs sorted by time on
    lineupDisplay(ratings) {
      if (!ratings?.length) return { starters: [], subs: [] };
      const starters = ratings.filter(p => p.minutes > 0 && !p.subbedOnAt);
      const subs = ratings
        .filter(p => p.minutes > 0 && p.subbedOnAt)
        .sort((a, b) => (a.subbedOnAt ?? 0) - (b.subbedOnAt ?? 0));
      const label = (p) => ({ ...p, _posLabel: p.position });
      return { starters: starters.map(label), subs: subs.map(label) };
    },

    // Scan all loaded GW chunks and return the last known starting XI per club
    buildClubLineups() {
      const lineups = {};
      for (const gw of Object.keys(this.matchChunks)) {
        for (const m of (this.matchChunks[gw] || [])) {
          if (!m.kickoff || !m.ratings) continue;
          for (const side of ['home', 'away']) {
            const club = m[side]?.club;
            if (!club) continue;
            if (!lineups[club] || m.kickoff > lineups[club].kickoff) {
              const { starters } = this.lineupDisplay(m.ratings[side]);
              lineups[club] = {
                club, kickoff: m.kickoff, gameweek: m.gameweek,
                manager: side === 'home' ? m._homeManager : m._awayManager,
                formation: this.extractFormation(m.reportNarrative, club)
                           || this.deriveFormation(m.ratings[side]),
                starters,
              };
            }
          }
        }
      }
      this.clubLineups = lineups;
      this.clubLineupsLoaded = true;
    },

    // Format a formation code like "4231" → "4-2-3-1"
    fmtFormation(code) {
      if (!code) return null;
      return String(code).split('').join('-');
    },

    // Extract tactical settings for a club from Pre-match narrative paragraphs
    // Maps free-form narrative language to actual game API instruction values
    extractTactics(narrativeArr, club) {
      if (!club || !narrativeArr) return null;
      const paras = Array.isArray(narrativeArr) ? narrativeArr : [narrativeArr];
      const pre = paras.filter(p => typeof p === 'string' && p.startsWith('Pre-match')).join(' ');
      if (!pre) return null;
      const esc = club.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Find sentences mentioning this club; fall back to all pre-match text
      const sentences = pre.split(/(?<=[.!?])\s+/);
      const relevant = sentences.filter(s => new RegExp(esc, 'i').test(s)).join(' ') || pre;
      const lc = relevant.toLowerCase();
      const t = {};
      // mentality: Attacking / Balanced / Defensive
      if (/\battacking\b/.test(lc)) t.mentality = 'Attacking';
      else if (/\bdefensive\b/.test(lc)) t.mentality = 'Defensive';
      else if (/\bbalanced\b/.test(lc)) t.mentality = 'Balanced';
      // style: Short / Direct / Mixed
      if (/short[- ]pass|tiki/.test(lc)) t.style = 'Short';
      else if (/\bdirect\b/.test(lc)) t.style = 'Direct';
      // structure: Fluid / Rigid / Balanced
      if (/\bfluid\b/.test(lc)) t.structure = 'Fluid';
      else if (/\brigid\b/.test(lc)) t.structure = 'Rigid';
      // pressing: Aggressive / Passive / Mixed
      if (/aggressive press|relentless press|high press/.test(lc)) t.pressing = 'Aggressive';
      else if (/\bpassive\b/.test(lc)) t.pressing = 'Passive';
      // defensive line: High / Medium / Low / Deep
      if (/high line/.test(lc)) t.defLine = 'High';
      else if (/sitting low|deep block|low block|sit(?:ting)? deep/.test(lc)) t.defLine = 'Low';
      // transition: Fast / Slow / Moderate
      if (/fast (?:break|counter|transition)|spring fast|quick (?:counter|break)/.test(lc)) t.transition = 'Fast';
      else if (/slow build|patient build|deliberate/.test(lc)) t.transition = 'Slow';
      // attacking focus: Wide / Central / Mixed
      if (/\bwide\b/.test(lc)) t.focus = 'Wide';
      else if (/through the (?:center|centre|middle)|central focus/.test(lc)) t.focus = 'Central';
      return Object.keys(t).length ? t : null;
    },

    // ── Shared submissions fetch helper ──────────────────────────────────────
    // Fetches all submissions for a club from the API and populates submissionsCache.
    // All callers (getClubFormation, loadEspionageSubmissions, openClubDetail, fetchMySubmission)
    // go through this single method so there's no duplicated fetch/normalize logic.
    async _fetchClubSubmissions(club) {
      if (!club || this.submissionsCache[club] !== undefined) return;
      try {
        // limit=50 ensures we get upcoming GW submissions, not just past ones
        const d = await fetch(`${API}/submissions?club=${encodeURIComponent(club)}&limit=50`).then(r => r.json());
        const byGw = {};
        for (const s of (d?.items || [])) {
          // Use gameweek as key; null/missing gameweek → 'upcoming'
          const key = s.gameweek ?? 'upcoming';
          if (!byGw[key] || s.createdAt > byGw[key].createdAt) byGw[key] = s;
        }
        this.submissionsCache[club] = byGw;
      } catch(e) { this.submissionsCache[club] = {}; }
    },

    async loadCachedSubmissions() {
      // 1. localStorage first (no TTL — persists forever across sessions)
      try {
        const lsRaw = localStorage.getItem(SUBMISSIONS_LS_KEY);
        if (lsRaw) {
          const lsData = JSON.parse(lsRaw);
          for (const [club, byGw] of Object.entries(lsData?.clubs || {})) {
            if (!this.submissionsCache[club]) this.submissionsCache[club] = byGw;
          }
          if (Object.keys(this.submissionsCache).length > 0) this.allSubmissionsLoaded = true;
        }
      } catch(e) {}
      // 2. KV as fallback (with TTL check to avoid stale KV data overwriting fresh LS data)
      try {
        const raw = await serverCacheGet(SUBMISSIONS_CACHE_KEY);
        if (!raw) return;
        const data = await parseAsync(raw);
        if (data?.clubs && (Date.now() - data.builtAt) < SUBMISSIONS_CACHE_TTL) {
          for (const [club, byGw] of Object.entries(data.clubs)) {
            if (!this.submissionsCache[club]) this.submissionsCache[club] = byGw;
          }
          if (Object.keys(this.submissionsCache).length > 0) this.allSubmissionsLoaded = true;
        }
      } catch(e) {}
    },

    // Load latest submission for every club in espionageClubs (parallel, non-blocking)
    async loadEspionageSubmissions() {
      const clubs = (this.espionageClubs || []).map(c => c.club).filter(Boolean);
      if (!clubs.length) return;
      await Promise.all(clubs.map(club => this._fetchClubSubmissions(club)));
      const result = {};
      for (const club of clubs) {
        const allSubs = Object.values(this.submissionsCache[club] || {});
        const latest = allSubs.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0))[0];
        if (latest) result[club] = latest;
      }
      this.espionageSubmissions = result;
      this.allSubmissionsLoaded = true;
      // Persist to localStorage (forever) and KV
      const payload = { builtAt: Date.now(), clubs: this.submissionsCache };
      try { localStorage.setItem(SUBMISSIONS_LS_KEY, JSON.stringify(payload)); } catch(e) {}
      stringifyAsync(payload)
        .then(str => serverCacheSet(SUBMISSIONS_CACHE_KEY, str))
        .catch(() => {});
    },

    async openClubDetail(clubName) {
      this.activeTab = 'clubs';
      this.selectedClubName = clubName;
      this.selectedClubSubTab = 'xi';
      // Persist last visited club so page refresh restores it
      try { localStorage.setItem('sf_last_club', clubName); } catch(e) {}
      // Always fetch fresh — bypasses bulk cache so we get the latest upcoming GW submission
      delete this.submissionsCache[clubName];
      await this._fetchClubSubmissions(clubName);
      // Update localStorage with fresh data for this club
      try {
        const lsRaw = localStorage.getItem(SUBMISSIONS_LS_KEY);
        const lsData = lsRaw ? JSON.parse(lsRaw) : { clubs: {} };
        lsData.clubs[clubName] = this.submissionsCache[clubName] || {};
        localStorage.setItem(SUBMISSIONS_LS_KEY, JSON.stringify(lsData));
      } catch(e) {}
    },

    async fetchMySubmission() {
      if (this.mySubmissionLoading) return;
      this.mySubmissionLoading = true;
      await this._fetchClubSubmissions(MY_CLUB);
      const byGw = this.submissionsCache[MY_CLUB] || {};
      const recentGws = Object.keys(byGw).map(Number).sort((a,b)=>b-a).slice(0,3);
      this.mySubmissions = recentGws.map(gw => byGw[gw]);
      this.mySubmissionLoading = false;
    },

    extractManager(narrativeArr, club) {
      // Only search Pre-match paragraphs — they're structured and contain manager names
      const paras = Array.isArray(narrativeArr) ? narrativeArr : [narrativeArr || ''];
      const text = paras.filter(p => typeof p === 'string' && p.startsWith('Pre-match')).join(' ');
      if (!text) return null;
      const esc = club.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const W = `[A-Z\u00C0-\u00D6\u00D8-\u00DD][\\w\u00C0-\u00FF]*`;
      const name = `(${W}(?:[ -]${W})*)`;
      // "Name's Club" (possessive, straight or curly apostrophe) — most reliable
      let m = text.match(new RegExp(`${name}[\u2019']s ${esc}\\b`));
      if (m) return m[1];
      // "Name [optional interruption ≤40 chars] Club" within same sentence
      // Exclude paragraph-starter words (Pre, Half, Full, The, A, From, In, At...)
      const EXCLUDE = /^(?:Pre|Half|Full|The|An?|From|In|At|By|It|As|But|And|Or)\b/;
      m = text.match(new RegExp(`${name}[^.]{2,40}?\\b${esc}\\b`));
      if (m && !EXCLUDE.test(m[1])) return m[1];
      return null;
    },

    matchResultFor(match, club) {
      const isHome = match.home?.club === club;
      const hs = match.score?.home ?? 0, as = match.score?.away ?? 0;
      const gs = isHome ? hs : as, gc = isHome ? as : hs;
      return gs > gc ? 'W' : gs < gc ? 'L' : 'D';
    },

    async buildMatchArchive() {
      if (this.matchArchiveBuilding) return;
      this.matchArchiveBuilding = true;
      this.matchArchiveProgress = 0;
      this.matchArchiveMsg = 'Starting…';
      this.matchBuildLog = [];
      const log = (msg) => { this.matchBuildLog.push(`${new Date().toLocaleTimeString('en-GB')} ${msg}`); };
      const delay = ms => new Promise(r => setTimeout(r, ms));

      // ── Write test: fail before fetching if cache is broken ───────────────
      log(`Host: ${location.hostname} | Cache: ${SF_CACHE_BASE}`);
      const writeTestUrl = `${SF_CACHE_BASE}/__write_test__`;
      const writeTest = await fetch(writeTestUrl, { method: 'POST', body: '1', signal: AbortSignal.timeout(8000) })
        .then(r => `HTTP ${r.status}`)
        .catch(e => `FAIL: ${e.name}: ${e.message}`);
      log(`Cache write test: ${writeTest}`);
      fetch(writeTestUrl, { method: 'DELETE' }).catch(() => {}); // clean up test key
      if (!writeTest.startsWith('HTTP 2')) {
        throw new Error(`Cache write failed before fetch: ${writeTest}`);
      }
      // ──────────────────────────────────────────────────────────────────────

      // Retry a save up to 3 times with exponential backoff
      const saveWithRetry = async (url, body) => {
        let lastErr;
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await delay(1000 * attempt);
          try {
            const r = await fetch(url, { method: 'POST', body, signal: AbortSignal.timeout(15000) });
            if (r.ok) return true;
            lastErr = `HTTP ${r.status}: ${await r.text().catch(()=>'')}`;
          } catch(e) { lastErr = `${e.name}: ${e.message}`; }
        }
        return lastErr;
      };

      try {
        // Pass 1: collect unique fixture IDs by club (API doesn't support ?gameweek filter)
        const fixtureMap = new Map();
        const clubList = [...new Set(this.allPlayers.map(p => p.Club).filter(Boolean))].sort();
        log(`${clubList.length} clubs to scan`);
        for (let i = 0; i < clubList.length; i += 6) {
          const batch = clubList.slice(i, i + 6);
          this.matchArchiveProgress = Math.round((i / clubList.length) * 20);
          this.matchArchiveMsg = `Pass 1: ${Math.min(i+6, clubList.length)}/${clubList.length} clubs · ${fixtureMap.size} fixtures`;
          await Promise.all(batch.map(async club => {
            try {
              const d = await fetch(`${API}/matches?club=${encodeURIComponent(club)}&limit=200`).then(r=>r.json());
              let added = 0;
              for (const m of (d?.matches || [])) {
                if (m.fixtureId && !fixtureMap.has(m.fixtureId)) { fixtureMap.set(m.fixtureId, m); added++; }
              }
              if (added) log(`${club}: +${added} (${fixtureMap.size} total)`);
            } catch(e) { log(`ERROR ${club}: ${e.message}`); }
          }));
          await delay(100);
        }
        log(`Pass 1 done: ${fixtureMap.size} unique fixtures`);

        // Pass 2: fetch full match detail (10 at a time)
        const fixtureIds = Array.from(fixtureMap.keys());
        const fullMatches = [];
        let fetchErrors = 0;
        for (let i = 0; i < fixtureIds.length; i += 10) {
          const batch = fixtureIds.slice(i, i + 10);
          this.matchArchiveProgress = 20 + Math.round((i / fixtureIds.length) * 40);
          this.matchArchiveMsg = `Pass 2: ${Math.min(i+10, fixtureIds.length)}/${fixtureIds.length} fixtures · ${fetchErrors} errors`;
          await Promise.all(batch.map(async id => {
            try {
              const d = await fetch(`${API}/matches/${id}`).then(r=>r.json());
              if (d?.match) {
                const m = d.match;
                m._homeManager = this.extractManager(m.reportNarrative, m.home?.club || '');
                m._awayManager = this.extractManager(m.reportNarrative, m.away?.club || '');
                fullMatches.push(m);
              } else {
                fetchErrors++;
                log(`No data for ${id}: ${JSON.stringify(d).slice(0,60)}`);
              }
            } catch(e) { fetchErrors++; log(`ERROR fixture ${id}: ${e.message}`); }
          }));
          await delay(80);
        }
        fullMatches.sort((a,b) => (b.kickoff||'').localeCompare(a.kickoff||''));
        log(`Pass 2 done: ${fullMatches.length} matches, ${fetchErrors} errors`);

        // Pass 3: fetch all submissions for every club (formation + instructions + roles)
        const subsByClub = {}; // club → { gw → submission }
        let subErrors = 0;
        log(`Pass 3: fetching submissions for ${clubList.length} clubs`);
        for (let i = 0; i < clubList.length; i += 6) {
          const batch = clubList.slice(i, i + 6);
          this.matchArchiveProgress = 60 + Math.round((i / clubList.length) * 24);
          this.matchArchiveMsg = `Pass 3: ${Math.min(i+6, clubList.length)}/${clubList.length} clubs · submissions`;
          await Promise.all(batch.map(async club => {
            try {
              const d = await fetch(`${API}/submissions?club=${encodeURIComponent(club)}&limit=200`).then(r => r.json());
              const byGw = {};
              for (const s of (d?.items || [])) {
                const key = s.gameweek ?? 'upcoming';
                if (!byGw[key] || s.createdAt > byGw[key].createdAt) byGw[key] = s;
              }
              subsByClub[club] = byGw;
            } catch(e) { subErrors++; log(`SUB ERROR ${club}: ${e.message}`); }
          }));
          await delay(80);
        }
        log(`Pass 3 done: ${Object.keys(subsByClub).length} clubs, ${subErrors} errors`);

        // Augment full matches with submission data for both clubs
        for (const m of fullMatches) {
          const gw = m.gameweek;
          const homeSub = gw != null ? subsByClub[m.home?.club]?.[gw] : null;
          const awaySub = gw != null ? subsByClub[m.away?.club]?.[gw] : null;
          if (homeSub) m.home.sub = { formation: homeSub.formation, instructions: homeSub.instructions, roles: homeSub.roles, xi: homeSub.xi, runs: homeSub.runs };
          if (awaySub) m.away.sub = { formation: awaySub.formation, instructions: awaySub.instructions, roles: awaySub.roles, xi: awaySub.xi, runs: awaySub.runs };
        }

        // Group full matches by gameweek for chunk storage
        const gwMap = new Map(); // gw → [matches]
        for (const m of fullMatches) {
          const gw = m.gameweek ?? 0;
          if (!gwMap.has(gw)) gwMap.set(gw, []);
          gwMap.get(gw).push(m);
        }
        const sortedGws = [...gwMap.keys()].sort((a,b) => a - b);
        log(`Gameweeks: ${sortedGws.length} (GW${sortedGws[0]}–GW${sortedGws[sortedGws.length-1]})`);

        // Helper: compute section ratings (def/mid/att/overall) from submission xi + allPlayers attributes
        // Slot → section mapping (GK excluded from overall section breakdown)
        const SLOT_SECTION = { CB:'def', FB:'def', DM:'mid', CM:'mid', WM:'mid', AM:'att', WF:'att', CF:'att' };
        const playerByName = new Map(this.allPlayers.map(p => [(p.Player||'').toLowerCase().trim(), p]));
        const avgArr = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length*10)/10 : null;
        const computeSquadRatings = (sub) => {
          if (!sub?.xi?.length) return null;
          const secs = { def:[], mid:[], att:[] };
          const all = [];
          for (const slot of sub.xi) {
            const name = (slot.name || slot.player || '').toLowerCase().trim();
            const p = playerByName.get(name);
            if (!p) continue;
            const slotBase = (slot.slot || '').replace(/\d+$/, '') || p.Position || 'CM';
            const pos = p.Position || slotBase;
            const r = calcGameRating(p, pos);
            if (!r) continue;
            all.push(r);
            if (SLOT_SECTION[slotBase]) secs[SLOT_SECTION[slotBase]].push(r);
          }
          return { overall: avgArr(all), def: avgArr(secs.def), mid: avgArr(secs.mid), att: avgArr(secs.att) };
        };

        // Build compact index — _gw field points to the gameweek chunk
        const compactMatches = fullMatches.map(m => ({
          fixtureId: m.fixtureId, kickoff: m.kickoff, gameweek: m.gameweek,
          competition: m.competition,
          home: { club: m.home?.club, formation: m.home?.sub?.formation || null, mentality: m.home?.sub?.instructions?.mentality || null, style: m.home?.sub?.instructions?.style || null, sqRtg: computeSquadRatings(m.home?.sub) },
          away: { club: m.away?.club, formation: m.away?.sub?.formation || null, mentality: m.away?.sub?.instructions?.mentality || null, style: m.away?.sub?.instructions?.style || null, sqRtg: computeSquadRatings(m.away?.sub) },
          score: m.score, headline: m.headline,
          // Key match stats for formation/style analysis (inline to avoid loading every chunk)
          stats: m.stats ? {
            xg: m.stats.xg,
            shots: m.stats.shots ? { home: m.stats.shots.home?.total ?? null, away: m.stats.shots.away?.total ?? null } : null,
            possession: m.stats.possession,
          } : null,
          _homeManager: m._homeManager, _awayManager: m._awayManager,
          _gw: m.gameweek ?? 0,
        }));
        const indexData = { builtAt: Date.now(), matchCount: fullMatches.length, gwCount: sortedGws.length, gameweeks: sortedGws, matches: compactMatches };
        const indexStr = JSON.stringify(indexData);

        // Save index (with retry)
        this.matchArchiveProgress = 84;
        this.matchArchiveMsg = `Saving index (${(indexStr.length/1024).toFixed(0)}KB)…`;
        log(`Saving index: ${(indexStr.length/1024).toFixed(0)}KB`);
        const idxErr = await saveWithRetry(`${SF_CACHE_BASE}/sf_match_archive_v3?permanent=1`, indexStr);
        if (idxErr !== true) throw new Error(`Index save failed: ${idxErr}`);
        log('Index saved OK');

        // Save one chunk per gameweek — continue even if some fail
        let chunksFailed = 0;
        for (let gi = 0; gi < sortedGws.length; gi++) {
          const gw = sortedGws[gi];
          const gwMatches = gwMap.get(gw);
          const chunkStr = JSON.stringify({ gw, matches: gwMatches });
          this.matchArchiveProgress = 84 + Math.round(((gi + 1) / sortedGws.length) * 16);
          this.matchArchiveMsg = `Saving GW${gw} (${gwMatches.length} matches, ${(chunkStr.length/1024).toFixed(0)}KB)…`;
          const err = await saveWithRetry(`${SF_CACHE_BASE}/sf_match_archive_v3_gw_${gw}?permanent=1`, chunkStr);
          if (err === true) {
            log(`GW${gw}: ${gwMatches.length} matches saved OK (${(chunkStr.length/1024).toFixed(0)}KB)`);
          } else {
            chunksFailed++;
            log(`ERROR GW${gw}: ${err}`);
          }
          await delay(150);
        }

        this.matchArchive = compactMatches;
        this.matchArchiveChunkCount = sortedGws.length;
        this.matchArchiveCacheDate = new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        this.matchArchiveProgress = 100;
        if (chunksFailed > 0) {
          this.matchArchiveMsg = `Done (${chunksFailed} GW save errors) — ${fullMatches.length} matches`;
          log(`Build complete: ${fullMatches.length} matches, ${chunksFailed} GW(s) failed`);
        } else {
          this.matchArchiveMsg = `Done — ${fullMatches.length} matches across ${sortedGws.length} gameweeks`;
          log(`Build complete: ${fullMatches.length} matches, ${sortedGws.length} GW chunks`);
        }
      } catch(e) {
        this.matchArchiveMsg = 'Error: ' + (e.message || e);
        log(`FATAL: ${e.message || e}`);
      }
      this.matchArchiveBuilding = false;
    },

    async loadMatchArchive() {
      try {
        const raw = await serverCacheGet('sf_match_archive_v3');
        if (!raw) return;
        const data = await parseAsync(raw);
        if (data?.matches?.length) {
          this.matchArchive = data.matches;
          this.matchArchiveChunkCount = data.gwCount || 0;
          this.matchArchiveCacheDate = new Date(data.builtAt).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        }
      } catch(e) {}
    },

    async loadMatchChunk(gw) {
      if (this.matchChunks[gw]) return;
      try {
        const raw = await serverCacheGet(`sf_match_archive_v3_gw_${gw}`);
        if (raw) {
          const matches = (await parseAsync(raw)).matches || [];
          // Re-extract managers on load so old builds with broken regex are fixed
          for (const m of matches) {
            m._homeManager = this.extractManager(m.reportNarrative, m.home?.club || '');
            m._awayManager = this.extractManager(m.reportNarrative, m.away?.club || '');
          }
          this.matchChunks[gw] = matches;
          // Back-fill the compact index so the match list shows correct managers
          if (this.matchArchive) {
            const byId = new Map(matches.map(m => [m.fixtureId, m]));
            for (const e of this.matchArchive) {
              const full = byId.get(e.fixtureId);
              if (full) { e._homeManager = full._homeManager; e._awayManager = full._awayManager; }
            }
          }
        }
      } catch(e) {}
    },

    // Return formatted formation for a club/gameweek from submissions (fetches if not cached)
    async getClubFormation(club, gameweek) {
      if (!club || !gameweek) return null;
      await this._fetchClubSubmissions(club);
      const sub = this.submissionsCache[club]?.[gameweek];
      return sub?.formation ? this.fmtFormation(sub.formation) : null;
    },

    async openMatch(summary) {
      this.matchView = summary;
      this.matchDetailLoading = true;
      const gw = summary._gw ?? summary.gameweek ?? 0;
      if (!this.matchChunks[gw]) await this.loadMatchChunk(gw);
      const full = this.matchChunks[gw]?.find(m => m.fixtureId === summary.fixtureId);
      if (full) this.matchView = full;
      const mv = this.matchView;
      mv._homeManager = this.extractManager(mv.reportNarrative, mv.home?.club || '');
      mv._awayManager = this.extractManager(mv.reportNarrative, mv.away?.club || '');
      // Formations: sub data from chunk first, then on-demand fetch, then narrative/derived fallback
      const homeFmtFromSub = mv.home?.sub?.formation ? this.fmtFormation(mv.home.sub.formation) : null;
      const awayFmtFromSub = mv.away?.sub?.formation ? this.fmtFormation(mv.away.sub.formation) : null;
      const [homeFmt, awayFmt] = await Promise.all([
        homeFmtFromSub ? Promise.resolve(homeFmtFromSub) : this.getClubFormation(mv.home?.club, gw),
        awayFmtFromSub ? Promise.resolve(awayFmtFromSub) : this.getClubFormation(mv.away?.club, gw),
      ]);
      mv._homeFormation = homeFmt
                          || this.extractFormation(mv.reportNarrative, mv.home?.club)
                          || (mv.ratings && this.deriveFormation(mv.ratings.home));
      mv._awayFormation = awayFmt
                          || this.extractFormation(mv.reportNarrative, mv.away?.club)
                          || (mv.ratings && this.deriveFormation(mv.ratings.away));
      this.matchDetailLoading = false;
    },
  },

  beforeUnmount() {
    if (this.youthBgInterval) clearInterval(this.youthBgInterval);
  },

  mounted() {
    Chart.defaults.font.family="'Segoe UI',system-ui,sans-serif";
    Chart.defaults.color='#8b949e';
    // Quick localStorage availability check
    try {
      localStorage.setItem('_sf_test', '1');
      if (localStorage.getItem('_sf_test') === '1') { localStorage.removeItem('_sf_test'); this.cacheWorking = true; }
      else this.cacheWorking = false;
    } catch(e) { this.cacheWorking = false; }
    // Restore saved mental config
    try {
      const saved = localStorage.getItem('sf_mental_cfg');
      if (saved) {
        const cfg = JSON.parse(saved);
        if (Array.isArray(cfg.attrs) && cfg.attrs.length) this.mentalCfgAttrs = cfg.attrs;
        if (cfg.pct != null) this.mentalWeightPct = cfg.pct;
      }
    } catch(e) {}
    // Defer loadData to AFTER the browser's first paint — prevents the 1940KB JSON.parse
    // from blocking the initial render and making the page appear frozen on slower machines.
    // Double-RAF: first fires before paint, second fires after paint.
    requestAnimationFrame(() => requestAnimationFrame(() => this.loadData()));
    this.loadCachedSubmissions();
    this.loadMatchArchive();
    // Restore last viewed club (after a brief delay to let espionage data load)
    try {
      const lastClub = localStorage.getItem('sf_last_club');
      if (lastClub) setTimeout(() => this.openClubDetail(lastClub), 800);
    } catch(e) {}
    // Fetch current game week proactively so the staff recruitment input shows the right week
    this.fetchCurrentGameWeek();
    // Background auto-refresh: check every 8 min (9am–11pm EST), incremental
    this.youthBgInterval = setInterval(() => { this.bgAutoRefresh(); }, 8 * 60 * 1000);
  }
}).mount('#app');
