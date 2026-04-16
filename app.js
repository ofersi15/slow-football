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
const PROXY_TOKEN_URL = 'https://sf-game-proxy.ofersi15.workers.dev/token';
let _cachedToken = null;
async function getAuthToken() {
  if (_cachedToken) return _cachedToken;
  const data = await fetch(PROXY_TOKEN_URL).then(r => r.json());
  _cachedToken = data.token || null;
  return _cachedToken;
}
function authHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (_cachedToken) { h['Authorization'] = `Bearer ${_cachedToken}`; h['X-Club'] = MY_CLUB; h['X-Role'] = 'manager'; }
  return h;
}
const ALL_LEAGUES = ['north','south','europa','world','conference','hipster'];
// AI-controlled clubs — excluded from scout/tables; never count as vacancies
const AI_CLUBS = new Set(['Barcelona','Bayern Munich','Juventus','Damac','Saudi All-Stars','Inter Miami']);
const ALL_POSITIONS = ['GK','FB','CB','DM','CM','AM','WF','CF'];
const OUTFIELD_POSITIONS = ['FB','CB','DM','CM','AM','WF','CF'];
const PAGE_SIZE = 100;
const TACTICS_CACHE_KEY = 'sf_tactics_v4';
const TACTICS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
// Player data cache — loaded instantly on revisit; refreshed in background weekly
const PLAYERS_CACHE_KEY = 'sf_players_v6';
const STATS_CACHE_KEY = 'sf_stats_v1';
const PLAYERS_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours — CF cron pre-fetches 4x/day
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
const SF_WORKER_BASE = 'https://sf-cache.ofersi15.workers.dev';
async function serverCacheGet(key, noStore = false) {
  if (location.protocol === 'file:') return null;  // no server when opened from disk
  try {
    const opts = {signal: AbortSignal.timeout(3000)};
    if (noStore) opts.cache = 'no-store';
    const r = await fetch(`${SF_CACHE_BASE}/${key}`, opts);
    if (!r.ok) return null;
    return await r.text();
  } catch(e) { return null; }
}
async function serverCacheSet(key, str) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}?permanent=1`, {
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
      allPlayers: [], leagueTables: {}, managedSet: new Set(), managerMap: {}, vacantClubs: new Set(), asOfWeek: '?', totalClubs: 0,
      transferMap: {},
      myClub: MY_CLUB,
      leagueFilter: new Set(ALL_LEAGUES),
      posFilter: new Set(ALL_POSITIONS),
      maxAge: 40, search: '',
      hideOwn: false, hideVacant: true, managedOnly: false, forSaleOnly: false,
      transferListedOnly: false, injuredOnly: false, hideRetiring: true,
      ageGroupFilter: 'all', // 'all' | 'u21' | 'u20'
      sortCol: '_gameRating', sortDir: -1, page: 0,
      // Per-position rating filters — each pos has its own min threshold
      posRatingFilters: {GK:60,FB:60,CB:60,DM:60,CM:60,AM:60,WF:60,CF:60},
      posRatingMax: 99,            // global max rating cap
      posRatingUseWeighted: false, // filter by weighted rating instead of game rating
      posRatingsOpen: false,
      // Stats enrichment state
      statsEnriching: false, statsProgress: 0, statsEnriched: false,
      activeTab: (() => {
        const hash = location.hash.slice(1);
        const validIds = ['scout','squad','moneyball','analysis','youth','club','clubs','espionage','matches'];
        if (hash && validIds.includes(hash)) return hash;
        return localStorage.getItem('sf_activeTab') || 'squad';
      })(),
      tabs: [{id:'scout',label:'🔍 Scout'},{id:'squad',label:'🛡 My Squad'},{id:'moneyball',label:'📊 Moneyball'},{id:'analysis',label:'🔬 Analysis'},{id:'youth',label:'🌱 Youth'},{id:'club',label:'🏟 My Club'},{id:'clubs',label:'🏟 Clubs'},{id:'espionage',label:'💰 Transfers'},{id:'matches',label:'📺 Matches'}],
      mySquadFormation: '4231',
      formationKeys: Object.keys(FORMATIONS),
      attrFiltersOpen: false,
      attrFilters: {},  // e.g. { Speed: 70, Dribbling: 75 } — 0/null = inactive
      mbChart: 'market',
      mbCharts: [
        {id:'market',label:'🛒 Market'},
        {id:'gems',label:'💎 Gems'},
        {id:'overperformers',label:'⚡ Gets It Done'},
        {id:'top-lists',label:'📋 Top Lists'},
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
      // Staff recruitment
      staffApplicants: null, staffApplicantsLoading: false, staffApplicantsMsg: '',
      staffWeek: null,
      staffGenLoading: false, staffGenMsg: '',
      staffAdsUpdating: false,
      tblSort: {}, negoSort: 'date_d',
      // Saved lineup
      savedLineup: null,
      // Matches archive tab
      matchArchive: null,         // null=not loaded, []=loaded
      matchArchiveBuilding: false, matchArchiveProgress: 0, matchArchiveMsg: '',
      appendGwBuilding: false, appendGwMsg: '', appendGwProgress: 0,
      matchArchiveCacheDate: null,
      matchView: null, matchDetailLoading: false,
      matchChunks: {}, matchArchiveChunkCount: 0, matchBuildLog: [],
      matchFilterClub: '', matchFilterManager: '', matchFilterComp: '',
      matchSort: 'gw_d', matchSubTab: 'list',
      analysisLoading: false, analysisLoaded: false, analysisMsg: '', analysisProgress: 0,
      analysisMatches: [], analysisFilterFormation: '', analysisFilterOpp: '',
      analysisFilterMentality: '', analysisFilterMentalityOpp: '',
      analysisFilterPressing: '', analysisFilterPressingOpp: '',
      analysisFilterLine: '', analysisFilterLineOpp: '',
      analysisFilterStyle: '', analysisFilterStyleOpp: '',
      analysisFilterTrans: '', analysisFilterTransOpp: '',
      fmDrillDown: null,
      subsDbLoading: false, subsDbLoaded: false, subsDbMsg: '', subsDbProgress: 0, subsDb: null,
      matchArchiveFmSrc: null,
      fmDiag: null, fmDiagRunning: false,
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
      espionageClubs: [], espionageNegos: [], espionageCacheDate: null, negosLastPull: null,
      espionageSubTab: 'negos', espionageSearch: '', espionageSort: 'club', espShowVacantOnly: false,
      espionageNegoSearch: '', negoExpandedId: null, negoShowAll: false, negoShowAllModal: false,
      negoDisplayCount: 50,
      workerLog: null, workerLogOpen: false,
      trueValueMap: {},
      negosPollingInterval: null, _nowMs: Date.now(), _clockInterval: null,
      clubBudget: null, clubWageBudget: null,
      budgetOverride: (() => { try { const v = localStorage.getItem('sf_budget_override'); return v ? parseInt(v, 10) : null; } catch(e) { return null; } })(),
      budgetEditing: false, budgetEditVal: '', pullingBudget: false,
      auctionProfiles: {},  // playerName.toLowerCase() → full snapshot from /api/auctions
      auctionItems: [],    // raw items from /api/auctions (has all bids + snapshots)
      allBudgets: {},      // club name → {transfer, ...} from /api/budgets?format=full
      clubInfoCache: {},   // club name → { facilities, staff, academy, scouts, loading }
      pastAuctionsOpen: false,
      auctionExpandedPlayers: {},
      selectedJobCtx: null,
      playersCacheDate: null, playersRefreshing: false, cacheWorking: true,
      bookmarkletHref: '',
      allLeagues: ALL_LEAGUES, allPositions: ALL_POSITIONS,
      selectedPlayer: null, selectedPlayerStats: null, selectedPlayerStatsTab: 'career', selectedPlayerStatsLoading: false,
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
        {key:'Games',label:'G',w:28,full:'Games Played',group:'stats'},
        {key:'Minutes',label:'Mins',w:42,full:'Minutes Played',group:'stats'},
        {key:'Average Rating',label:'AvgRtg',w:52,full:'Average Match Rating',group:'stats'},
        {key:'Goals',label:'Gls',w:32,full:'Goals Scored',group:'stats'},
        {key:'xG',label:'xG',w:38,full:'Expected Goals',group:'stats'},
        {key:'Assists',label:'Ast',w:32,full:'Assists',group:'stats'},
        {key:'xA',label:'xA',w:38,full:'Expected Assists',group:'stats'},
        {key:'_g90',label:'G/90',w:38,full:'Goals per 90 minutes (min 30 mins played)',group:'per90'},
        {key:'_a90',label:'A/90',w:38,full:'Assists per 90 minutes (min 30 mins played)',group:'per90'},
        {key:'_xG90',label:'xG/90',w:44,full:'Expected Goals per 90 minutes',group:'per90'},
        {key:'_xA90',label:'xA/90',w:44,full:'Expected Assists per 90 minutes',group:'per90'},
        {key:'Yellow',label:'Yel',w:28,full:'Yellow Cards',group:'stats'},
        {key:'Red',label:'Red',w:28,full:'Red Cards',group:'stats'},
        {key:'Tackle %',label:'Tkl%',w:42,full:'Tackle Success %',group:'stats'},
        {key:'Pass %',label:'Pas%',w:42,full:'Pass Accuracy %',group:'stats'},
        {key:'Steals',label:'Stl',w:32,full:'Ball Steals',group:'stats'},
        {key:'Mistakes',label:'Err',w:32,full:'Errors Leading to Chance/Goal',group:'stats'},
        {key:'Form',label:'Form',w:40,full:'Current Form (recent match ratings avg)',group:'stats'},
        {key:'fitnessPct',label:'Fit%',w:38,full:'Fitness %',group:'fitness'},
        {key:'injuryRiskLabel',label:'InjRisk',w:60,full:'Injury Risk Level',group:'fitness'},
        {key:'injured',label:'Inj',w:28,full:'Currently Injured',group:'fitness'},
        {key:'suspended',label:'Sus',w:28,full:'Currently Suspended',group:'fitness'},
        {key:'Speed',label:'Spd',w:32,full:'Speed',group:'attrs'},
        {key:'Stamina',label:'Sta',w:32,full:'Stamina',group:'attrs'},
        {key:'Vision',label:'Vis',w:32,full:'Vision',group:'attrs'},
        {key:'Dribbling',label:'Dri',w:32,full:'Dribbling',group:'attrs'},
        {key:'Passing',label:'Pas',w:32,full:'Passing',group:'attrs'},
        {key:'Shooting',label:'Sht',w:32,full:'Shooting',group:'attrs'},
        {key:'Tackling',label:'Tck',w:32,full:'Tackling',group:'attrs'},
        {key:'Marking',label:'Mrk',w:32,full:'Marking',group:'attrs'},
        {key:'Heading',label:'Hd',w:32,full:'Heading',group:'attrs'},
        {key:'Handling',label:'Hnd',w:32,full:'Handling (GK)',group:'attrs'},
        {key:'Reflexes',label:'Rfx',w:32,full:'Reflexes (GK)',group:'attrs'},
        {key:'Free kicks',label:'FK',w:32,full:'Free Kick Ability',group:'attrs'},
        {key:'Penalties',label:'Pen',w:32,full:'Penalty Taking',group:'attrs'},
        {key:'Corners',label:'Cor',w:32,full:'Corner Taking',group:'attrs'},
        {key:'Mentality',label:'Men',w:32,full:'Mentality',group:'mental'},
        {key:'Leadership',label:'Lead',w:36,full:'Leadership',group:'mental'},
        {key:'Experience',label:'Exp',w:36,full:'Experience',group:'mental'},
        {key:'Confidence',label:'Conf',w:36,full:'Confidence',group:'mental'},
        {key:'Work rate',label:'WR',w:32,full:'Work Rate',group:'mental'},
        {key:'Morale',label:'Mor',w:32,full:'Morale',group:'mental'},
        {key:'Nationality',label:'Nat',w:60,full:'Nationality',group:'bio'},
        {key:'PreferredFoot',label:'Foot',w:36,full:'Preferred Foot',group:'bio'},
      ],
      colGroups: { stats: true, per90: true, fitness: true, attrs: false, mental: true, bio: false },
    };
  },

  computed: {
    visibleTableCols() {
      return this.tableCols.filter(c => !c.group || this.colGroups[c.group]);
    },
    staffApplicantsByRole() {
      const ROLE_ORDER = ['CEO', 'Technical Director', 'Assistant', 'Physio'];
      const grouped = {};
      for (const a of (this.staffApplicants || [])) {
        if (!grouped[a.role]) grouped[a.role] = [];
        grouped[a.role].push(a);
      }
      const liveAds = this.clubStaff?.openAds || [];
      const current = this.clubStaff?.current || {};
      return ROLE_ORDER.map(role => ({
        role,
        applicants: (grouped[role] || []).sort((a, b) => (b.rating || 0) - (a.rating || 0)),
        isLive: liveAds.includes(role),
        currentRating: current[role]?.rating ?? null,
      }));
    },
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
      // Coverage stats
      const total = this.matchArchive.length;
      const bothFormations = this.matchArchive.filter(m => m.home?.formation && m.away?.formation).length;
      const bothMentality = this.matchArchive.filter(m => m.home?.mentality && m.away?.mentality).length;
      const withInstr = this.analysisMatches.length; // both sides have instructions
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
        // pressing/line/trans: count each side separately (one side having it is still useful)
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
      const cutoff = Date.now() - 14 * 24 * 3600 * 1000; // 2 weeks
      let list = this.espionageNegos.filter(n => {
        if (n.via === 'auction') return false; // shown in auction board above
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
      else list.sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0)); // date_d default
      return list;
    },
    activeModalStats() {
      const d = this.selectedPlayerStats;
      if (!d) return null;
      if (this.selectedPlayerStatsTab === 'season') return d.seasonStats || null;
      if (this.selectedPlayerStatsTab === 'career') return d.career || d.seasonStats || null;
      return null;
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
      const cutoff = Date.now() - 30 * 24 * 3600 * 1000; // 1 month
      const recent = all.filter(n => new Date(n.updatedAt||0).getTime() >= cutoff);
      return recent.length ? recent : all.slice(0, 5); // always show at least 5
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
        // Per-position rating filter — if any position has a threshold > 60,
        // only show those specific positions (at their thresholds); otherwise all pass.
        const rtg = this.posRatingUseWeighted
          ? ((p._weightedRating || p._gameRating || p.Rating) || 0)
          : ((p._gameRating || p.Rating) || 0);
        const hasActivePosFilter = Object.values(this.posRatingFilters).some(v => v > 60);
        if (hasActivePosFilter) {
          // Include any player who meets the threshold when rated AT any of the active positions.
          // e.g. FB=80 shows primary FBs AND other positions whose FB rating is 80+
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
        // hideVacant hides clubs with open job applications (vacantClubs from /api/admin/profile/vacancies)
        if (this.hideVacant && this.vacantClubs.has(p.Club)) return false;
        // managedOnly hides ALL clubs without a manager
        if (this.managedOnly && !p._managed) return false;
        if (this.forSaleOnly && (!p._managed || p.notForSale)) return false;
        if (this.transferListedOnly && !p._transferListed) return false;
        if (this.injuredOnly && !p.injured && !p.suspended) return false;
        if (this.hideRetiring && p.retiring) return false;
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
          // gem score: rating² per £M of value — higher = more quality per £ spent
          // age bonus: under-23s get a 30% boost
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
      // Players whose on-pitch output exceeds what their attribute rating would suggest
      const MIN_GAMES = 6;
      return this.allPlayers
        .filter(p => (p.Games || 0) >= MIN_GAMES && (p._g90 != null || p._a90 != null))
        .map(p => {
          const g90 = p._g90 || 0;
          const a90 = p._a90 || 0;
          const contrib90 = g90 * 3 + a90 * 2;
          const rtg = p._gameRating || 70;
          // overIndex: contribution per unit of rating above 60
          // players with low rating but high output score very high here
          const overIndex = contrib90 / Math.max(0.05, (rtg - 58) / 25);
          const isGem = rtg < 79 && contrib90 >= 0.35;
          return { p, contrib90, overIndex, isGem };
        })
        .filter(x => x.contrib90 > 0)
        .sort((a, b) => b.overIndex - a.overIndex)
        .slice(0, 60);
    },

    negoPlayerMap() {
      // Build a lookup of player info from raw nego objects (covers unknown players like Irwin, Davids)
      // Try every plausible field name the API might use; always create an entry so playerByName works
      const map = {};
      for (const n of this.espionageNegos) {
        const k = (n.playerName||'').toLowerCase();
        if (!k || map[k]) continue;
        const pi = n.player || n.playerInfo || {};
        const pos = n.playerPosition || n.playerPos || pi.position || pi.pos || n.position || null;
        const age = n.playerAge ?? n.playerDOB ?? pi.age ?? pi.dob ?? n.age ?? null;
        const rtg = n.playerRating ?? n.playerOverall ?? pi.rating ?? pi.overall ?? n.rating ?? null;
        const club = n.playerClub || pi.club || pi.clubName || n.seller || null;
        // Always create entry — at minimum the seller club is useful context
        map[k] = { Player: n.playerName, Position: pos||null, Age: age, _gameRating: rtg, Club: club };
      }
      return map;
    },
    effectiveBudget() {
      return this.clubBudget ?? this.budgetOverride;
    },
    clubBudgetFor() {
      // Returns a function: clubBudgetFor(name) → transfer budget number or null
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

      // ── Primary: data from /api/auctions (has ALL bids + player snapshots) ──
      if (this.auctionItems.length) {
        const active = [], past = [];
        for (const item of this.auctionItems) {
          const closesMs = new Date(item.endsAt || 0).getTime();
          const isActive = closesMs > now;
          const highestBidder = item.highest?.bidder || null;
          // Normalise bids to the shape the template expects; sort by amount desc
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
          // Find first bidder who can actually afford their bid (budget >= amount)
          // null budget = unknown = assume they can pay
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

      // ── Fallback: derive from negotiations data ──
      // A 'pending' bid from before the previous auction close is stale
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
    // ── Auction computed ──
    nextAuctionClose() {
      const now = new Date(this._nowMs);
      // BST = UTC+1 (approx March–October)
      const mo = now.getUTCMonth();
      const isBST = mo >= 2 && mo <= 9;
      const closeUTC = isBST ? 20 : 21; // 9pm BST
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), closeUTC, 0, 0));
      const dow = d.getUTCDay(); // 0=Sun 3=Wed
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
    espionageNegoFiltered() { this.negoDisplayCount = 50; },
    espionageNegos(v) { if (v.length) this.computeTrueValues(); },
    allPlayers(v) { if (v.length && this.espionageNegos.length) this.computeTrueValues(); },
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
        history.replaceState(null, '', '#' + v);
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
        if (v === 'espionage') { this.startNegosPolling(); }
        else { this.stopNegosPolling(); }
        if (v === 'squad') {
          this.loadSavedLineup();
        }
        if (v === 'analysis') this.loadAnalysisChunks();
      },
      flush: 'sync',
    },
    matchArchive(v) {
      if (v && this.activeTab === 'analysis') this.loadAnalysisChunks();
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
    async openModal(p, jobCtx=null) {
      this.selectedPlayer=p; this.highlightedPos=null; this.selectedJobCtx=jobCtx||null; this.negoShowAllModal=false;
      this.selectedPlayerStats=null; this.selectedPlayerStatsTab='career'; this.selectedPlayerStatsLoading=true;
      // Load negos history if not already populated
      if (this.espionageNegos.length === 0) {
        try {
          const raw = await serverCacheGet('sf_negos_history_v1');
          if (raw) this.espionageNegos = JSON.parse(raw);
        } catch(e) {}
      }
      // Lazy-fetch career + season stats
      try {
        const name = encodeURIComponent(p.Player||'');
        if (name) {
          const d = await fetch(`${API}/player-stats?player=${name}&history=true`).then(r=>r.json());
          if (d.ok) this.selectedPlayerStats = d;
        }
      } catch(e) {}
      this.selectedPlayerStatsLoading = false;
    },
    closeModal() { this.selectedPlayer=null; this.selectedJobCtx=null; this.selectedPlayerStats=null; },

    // Return stats object for the selected tab in the player modal
    playerStatsForTab(tab) {
      const d = this.selectedPlayerStats;
      if (!d) return null;
      if (tab === 'season') return d.seasonStats || null;
      if (tab === 'career') return d.career || d.seasonStats || null;
      return null; // 'form' handled separately
    },

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
            // Load vacancy list from KV (updated by cron 4x/day)
            serverCacheGet('sf_vacancies_v1').then(raw => {
              if (raw) { try { const {clubs}=JSON.parse(raw); this.vacantClubs=new Set(clubs||[]); } catch(e){} }
            }).catch(()=>{});
            // Recompute derived fields with current config (config can differ from cache-time)
            const cachedLeagueMap = {};
            ALL_LEAGUES.forEach(l=>(this.leagueTables[l]||[]).forEach(t=>{cachedLeagueMap[t.Team]=l;}));
            players.forEach(p => {
              // Recompute _league — AI_CLUBS set and fallback logic may have changed
              p._league = AI_CLUBS.has(p.Club) ? 'other' : (cachedLeagueMap[p.Club] || p._league || 'world');
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
              // Recompute age group flags (DOB may now be in cache)
              if (p.DOB) {
                const dob = new Date(p.DOB);
                const now = new Date();
                const exactAge = (now - dob) / (365.25 * 24 * 3600 * 1000);
                p._u21 = exactAge < 21;
                p._u20 = exactAge < 20;
                if (exactAge >= 20 && exactAge < 21) {
                  const bday21 = new Date(dob.getFullYear() + 21, dob.getMonth(), dob.getDate());
                  p._weeksTo21 = Math.ceil((bday21 - now) / (7 * 24 * 3600 * 1000));
                } else { p._weeksTo21 = null; }
              } else {
                p._u21 = (p.Age||99) < 21;
                p._u20 = (p.Age||99) < 20;
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
      // Only clear squads cache — stats are independent season data, keep them
      // so stats re-apply instantly from cache once fresh squads land
      serverCacheDelete(PLAYERS_CACHE_KEY);
      try { localStorage.removeItem(PLAYERS_CACHE_KEY); } catch(e){}
      try { localStorage.removeItem('sf_youth_hist_v2'); } catch(e){}
      try { localStorage.removeItem('sf_youth_idx_v2'); } catch(e){}
      try { localStorage.removeItem('sf_club_v1'); } catch(e){}
      // Keep UI visible — refresh in background without clearing allPlayers or stats
      this.youthHistLoaded=false; this.youthHistCacheDate=null;
      this.youthLoaded=false;
      this.clubLoaded=false; this.clubLoading=false;
      this.playersRefreshing=true;
      this.fetchFreshData(false);  // background — existing UI stays visible
    },

    // Background stats enrichment — fetch full season stats per player from /api/player-stats
    async enrichStats(forceRefresh = false) {
      if (this.statsEnriching || (this.statsEnriched && !forceRefresh)) return;
      this.statsEnriched = false;
      // Try loading from stats cache first — but SKIP cache when force-refreshing
      // (forceRefresh=true is triggered by the background stale-refresh; reading cache again
      // would create an infinite loop instead of ever hitting the API)
      if (!forceRefresh) {
        try {
          let cached = await serverCacheGet(STATS_CACHE_KEY);
          if (!cached) cached = localStorage.getItem(STATS_CACHE_KEY);
          if (cached) {
            console.log('[SF] stats cache:', Math.round(cached.length/1024)+'KB');
            const _spa0 = performance.now();
            const {statsMap, ts} = await parseAsync(cached);
            console.log('[SF] parseAsync stats:', Math.round(performance.now()-_spa0)+'ms');
            if (statsMap) {
              let applied = 0;
              const newPlayers = this.allPlayers.map(p => {
                const s = statsMap[(p.Player||'').toLowerCase()];
                if (!s) return p;
                applied++;
                return Object.freeze({...p, ...s});
              });
              if (applied > 0) {
                await new Promise(r => requestAnimationFrame(r));
                this.allPlayers = newPlayers;
                this.statsEnriched = true;
                // Background refresh if >6h old — but use forceRefresh=true to skip cache
                const age = Date.now() - ts;
                if (age > 6*60*60*1000) { setTimeout(() => this.enrichStats(true), 3000); }
                return;
              }
            }
          }
        } catch(e) {}
      }

      // Fetch fresh stats from API
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
            const stats = d.career || d.seasonStats;
            if (!stats && Object.keys(physAttrs).length === 0) return;
            const s = stats || {};
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
        const activeMgrs = (managersRes.managers||[]).filter(m=>m.club&&!m.username?.includes('~deleted~'));
        const managedClubs = new Set(activeMgrs.map(m=>m.club));
        const managerMap = {};
        activeMgrs.forEach(m => { managerMap[m.club] = m.username || m.name || '?'; });
        this.managedSet = managedClubs;
        this.managerMap = managerMap;

        // Load vacancies from KV (populated by cron every 6h) — fall back to managed diff
        try {
          const vacRaw = await serverCacheGet('sf_vacancies_v1');
          if (vacRaw) {
            const { clubs } = JSON.parse(vacRaw);
            this.vacantClubs = new Set(clubs || []);
          } else {
            // Fallback: clubs in public list that have no manager (excluding AI-only clubs)
            this.vacantClubs = new Set([...clubsRes.clubs].filter(c => !managedClubs.has(c) && !AI_CLUBS.has(c)));
          }
        } catch(e) { this.vacantClubs = new Set(); }

        const clubs = clubsRes.clubs;
        this.totalClubs = clubs.length;
        const seen = new Set();
        const players = [];

        // Try pre-fetched squads cache (populated by CF cron 4x/day)
        let preSquads = null;
        try {
          const cached = await serverCacheGet('sf_squads_raw_v1');
          if (cached) {
            const { data, ts } = JSON.parse(cached);
            const ageH = (Date.now() - ts) / 3600000;
            // Accept cache up to 24h — cron refreshes every 6h so this is always fresh enough
            if (ageH < 24) { preSquads = data; console.log(`[SF] using pre-fetched squads cache (${ageH.toFixed(1)}h old)`); }
          }
        } catch(e) {}

        const processPlayers = (clubName, playerList) => {
          (playerList||[]).forEach(p => {
            const key=`${p.Player}|${p.Club||clubName}`;
            if (seen.has(key)) return;
            seen.add(key);
            p.Club=p.Club||clubName;
            // AI clubs are always hidden; all other clubs get their division from the tables
            // or fall back to 'world' (catches unmanaged real clubs not yet in the tables).
            p._league=AI_CLUBS.has(p.Club)?'other':(leagueMap[p.Club]||'world');
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
            // Age group & academy eligibility from DOB
            if (p.DOB) {
              const dob = new Date(p.DOB);
              const now = new Date();
              const exactAge = (now - dob) / (365.25 * 24 * 3600 * 1000);
              p._u21 = exactAge < 21;
              p._u20 = exactAge < 20;
              if (exactAge >= 20 && exactAge < 21) {
                const bday21 = new Date(dob.getFullYear() + 21, dob.getMonth(), dob.getDate());
                p._weeksTo21 = Math.ceil((bday21 - now) / (7 * 24 * 3600 * 1000));
              }
            } else {
              p._u21 = (p.Age||99) < 21;
              p._u20 = (p.Age||99) < 20;
            }
            players.push(p);
          });
        };

        if (preSquads) {
          // Use pre-fetched bulk squads — no per-club API calls needed
          if (foreground) { this.loadMsg='Loading squads from cache…'; this.progress=50; }
          clubs.forEach(club => processPlayers(club, preSquads[club]?.players || preSquads[club] || []));
        } else {
          // Fall back to per-club fetch
          for (let i=0; i<clubs.length; i++) {
            if (foreground) { this.loadMsg=`Fetching squads… (${i+1}/${clubs.length})`; this.progress=10+Math.round(85*(i+1)/clubs.length); }
            try {
              const d = await fetch(`${API}/squads?club=${encodeURIComponent(clubs[i])}`).then(r=>r.json());
              processPlayers(clubs[i], d.players);
            } catch(e){ console.warn('Failed:',clubs[i]); }
            await new Promise(r=>setTimeout(r,20));
          }
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
            // Transfer history — keep all entries (no limit)
            if (allTxMap[key]?.length) p._transferHistory=allTxMap[key];
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

            // Always show cached data immediately
            applyCache(cached);
            this.youthLoading = false;

            const needsRefresh = liveAge >= LIVE_TTL || histAge >= HIST_TTL || staticAge >= STATIC_TTL;
            if (!needsRefresh) return;

            if (histAge < HIST_TTL) {
              // History fresh — background refresh of live/static only
              setTimeout(async () => {
              const fetchLive = liveAge >= LIVE_TTL;
              const fetchStatic = staticAge >= STATIC_TTL;

                try {
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
                } catch(e) {}
              }, 100);
              return;
            }
          }
        } catch(e) { /* ignore cache errors, fall through to full fetch */ }
      }

      // ── Full fetch (only reaches here if no cache at all, or forceRefresh) ──
      this.youthMsg = this.youthLoaded ? '' : 'Fetching scouting data…';
      try {
        const enc = encodeURIComponent(MY_CLUB);
        const [sjRes, acRes, facRes, staffRes] = await Promise.all([
          fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/academy?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/facilities?club=${enc}`).then(r=>r.json()),
          fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json()),
        ]);
        this.youthMsg = 'Fetching scout history…';
        const [rejRes, accRes] = await Promise.all([
          fetch(`${API}/scouting/jobs?club=${enc}&status=rejected`).then(r=>r.json()),
          fetch(`${API}/scouting/jobs?club=${enc}&status=accepted`).then(r=>r.json()).catch(()=>({})),
        ]);

        // Build academy list and enrich with accepted-job stats (which have full attrs)
        const acItems = acRes.items || [];
        const accMap = {};
        for (const job of (accRes.items || [])) {
          const pname = (job.player?.name || job.player?.Player || '').toLowerCase();
          if (pname) accMap[pname] = job.player;
        }
        const ATTR_KEYS_ENR = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision','Mentality','Experience','Leadership','Work rate'];
        for (const p of acItems) {
          const pname = (p.name || p.Player || '').toLowerCase();
          const jobPlayer = accMap[pname];
          if (jobPlayer) {
            ATTR_KEYS_ENR.forEach(a => { if (jobPlayer[a] != null && p[a] == null) p[a] = jobPlayer[a]; });
            if (jobPlayer.stats) ATTR_KEYS_ENR.forEach(a => { if (jobPlayer.stats[a] != null && p[a] == null) p[a] = jobPlayer.stats[a]; });
          }
        }
        const academy = buildAcademy(acItems);
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
            if (cached) {
              this.clubFacData = cached.facilities;
              this.clubFacQuotes = cached.quotes||{};
              this.clubStaff = cached.staff||{};
              this.clubStaffEffects = cached.effects||{};
              this.clubLoaded = true; this.clubLoading = false; this.clubMsg = '';
              if (Date.now() - cached.savedAt > TTL) { setTimeout(() => this.loadClub(true), 100); }
              return;
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
      const keyMap = { club:'club', mgr:'mgr_a', ceo:'ceo_d', td:'td_d', asst:'asst_d', physio:'physio_d', training:'training_d', scouting:'scouting_d', academy:'academy_d', medical:'medical_d', analytics:'analytics_d', stadium:'stadium_d', ads:'ads_d' };
      const togMap = { club:'club_d', club_d:'club', mgr_a:'mgr_d', mgr_d:'mgr_a', ceo_d:'ceo_a', ceo_a:'ceo_d', td_d:'td_a', td_a:'td_d', asst_d:'asst_a', asst_a:'asst_d', physio_d:'physio_a', physio_a:'physio_d', training_d:'training_a', training_a:'training_d', scouting_d:'scouting_a', scouting_a:'scouting_d', academy_d:'academy_a', academy_a:'academy_d', medical_d:'medical_a', medical_a:'medical_d', analytics_d:'analytics_a', analytics_a:'analytics_d', stadium_d:'stadium_a', stadium_a:'stadium_d', ads_d:'ads_a', ads_a:'ads_d' };
      const target = keyMap[col]; if (!target) return;
      this.espionageSort = this.espionageSort === target ? (togMap[target] || target) : target;
    },
    espSortIcon(col) {
      const s = this.espionageSort;
      const aKeys = { club:'club', mgr:'mgr_a', ceo:'ceo_a', td:'td_a', asst:'asst_a', physio:'physio_a', training:'training_a', scouting:'scouting_a', academy:'academy_a', medical:'medical_a', analytics:'analytics_a', stadium:'stadium_a', ads:'ads_a' };
      const dKeys = { club:'club_d', mgr:'mgr_d', ceo:'ceo_d', td:'td_d', asst:'asst_d', physio:'physio_d', training:'training_d', scouting:'scouting_d', academy:'academy_d', medical:'medical_d', analytics:'analytics_d', stadium:'stadium_d', ads:'ads_d' };
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

    // ── Staff recruitment ─────────────────────────────────────────────────────
    async loadApplicants() {
      this.staffApplicantsLoading = true;
      this.staffApplicantsMsg = '';
      try {
        const enc = encodeURIComponent(MY_CLUB);
        const [appRes, staffRes] = await Promise.all([
          fetch(`${API}/staff/applicants?club=${enc}`).then(r => r.json()),
          fetch(`${API}/staff?club=${enc}`).then(r => r.json()).catch(() => ({})),
        ]);
        this.staffApplicants = appRes.applicants || [];
        // Store week from applicants, or fall back to fixtures/week API (currentWeek - 1)
        const firstWeek = this.staffApplicants[0]?.introducedWeek;
        if (firstWeek > 0) {
          this.staffWeek = firstWeek;
        } else {
          const weekRes = await fetch(`${API}/fixtures/week`).then(r => r.json()).catch(() => ({}));
          if (weekRes.currentWeek > 0) this.staffWeek = weekRes.currentWeek - 1;
        }
        // Sync openAds + current staff into clubStaff
        if (staffRes.openAds) this.clubStaff = { ...this.clubStaff, openAds: staffRes.openAds };
        if (staffRes.current) this.clubStaff = { ...this.clubStaff, current: staffRes.current };
      } catch(e) {
        this.staffApplicantsMsg = '⚠ ' + e.message;
      } finally {
        this.staffApplicantsLoading = false;
      }
    },
    staffApplicantRatingClass(applicant) {
      const current = this.clubStaff?.current?.[applicant.role];
      const curRtg = current?.rating;
      if (!curRtg) return this.ratingClass(applicant.rating);
      if (applicant.rating > curRtg) return 'c-green';
      if (applicant.rating === curRtg) return 'c-orange';
      return 'c-red';
    },
    async rejectApplicant(applicant) {
      // Optimistically remove from list
      this.staffApplicants = (this.staffApplicants || []).filter(a => a.id !== applicant.id);
      const token = await getAuthToken().catch(() => null);
      await fetch(`${API}/staff/applicants/reject`, {
        method: 'POST',
        headers: token
          ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'X-Club': MY_CLUB, 'X-Role': 'manager' }
          : { 'Content-Type': 'application/json' },
        body: JSON.stringify({ club: MY_CLUB, id: applicant.id }),
      }).catch(() => {});
    },
    async toggleAd(role) {
      const current = this.clubStaff?.openAds || [];
      const isLive = current.includes(role);
      const newRoles = isLive ? current.filter(r => r !== role) : [...current, role];
      this.staffAdsUpdating = true;
      try {
        const token = await getAuthToken();
        const h = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'X-Club': MY_CLUB, 'X-Role': 'manager' };
        const res = await fetch(`${API}/staff/ads`, {
          method: 'POST', headers: h,
          body: JSON.stringify({ club: MY_CLUB, roles: newRoles }),
        });
        const data = await res.json();
        this.clubStaff = { ...this.clubStaff, openAds: data.openAds || newRoles };
      } catch(e) {
        // no-op — UI reverts on next load
      } finally {
        this.staffAdsUpdating = false;
      }
    },
    async generateApplicants() {
      this.staffGenLoading = true;
      this.staffApplicants = null;
      this.staffGenMsg = '';
      try {
        // Get auth token and current week in parallel
        this.staffGenMsg = 'Authenticating…';
        const [token, weekRes] = await Promise.all([
          getAuthToken(),
          fetch(`${API}/fixtures/week`).then(r => r.json()),
        ]);
        const week = weekRes.currentWeek - 1;
        if (!(week > 0)) throw new Error(`Bad week from /fixtures/week: ${JSON.stringify(weekRes)}`);
        const ch = { 'Content-Type': 'application/json' };
        // Toggle TD off then on via CF worker (server-to-server — no browser Origin header)
        this.staffGenMsg = `Week ${week} — toggling ads…`;
        await fetch(`${SF_WORKER_BASE}/_staff/toggle`, {
          method: 'POST', headers: ch,
          body: JSON.stringify({ roles: ['CEO', 'Assistant', 'Physio'] }),
        });
        await fetch(`${SF_WORKER_BASE}/_staff/toggle`, {
          method: 'POST', headers: ch,
          body: JSON.stringify({ roles: ['CEO', 'Assistant', 'Physio', 'Technical Director'] }),
        });
        this.staffGenMsg = `Week ${week} — generating…`;
        const genRes = await fetch(`${SF_WORKER_BASE}/_staff/generate`, {
          method: 'POST', headers: ch,
          body: JSON.stringify({ week }),
        });
        if (!genRes.ok) {
          const txt = await genRes.text();
          throw new Error(`${genRes.status} — ${txt.slice(0, 120)}`);
        }
        // Load the resulting live applicants
        this.staffGenMsg = 'Loading applicants…';
        await this.loadApplicants();
        this.staffGenMsg = '';
      } catch(e) {
        this.staffGenMsg = '⚠ Error: ' + e.message;
      } finally {
        this.staffGenLoading = false;
      }
    },

    // ── Espionage ─────────────────────────────────────────────────────────────
    espRatingClass(r) { if (!r) return 'c-gray'; return r >= 85 ? 'c-green' : r >= 75 ? 'c-orange' : 'c-gray'; },
    espFacClass(lv) { return lv >= 5 ? 'c-green' : lv >= 4 ? 'c-orange' : lv >= 3 ? 'c-blue' : 'c-gray'; },
    setPieceDesc(type, value) {
      const DESCS = {
        delivery: {
          'Inswinger':    'Curves toward goal — rewards far-post runners.',
          'Outswinger':   'Curves away — near-post flick-on.',
          'Driven':       'Flat and hard — penalty spot as target.',
          'Short Corner': 'Short lay-off to pull defenders wide.',
        },
        scheme: {
          'Zonal':      'Players hold areas of space — attack the ball when it enters their zone.',
          'Man-to-Man': 'Each defender tracks a specific attacker through their run.',
          'Hybrid':     'Zonal around the posts, man-marking on the most dangerous runners.',
        },
        press: {
          'Hold Shape':   'Maintain structure — wait for delivery before engaging.',
          'Press Taker':  'Rush the taker immediately to force a hurried or short delivery.',
        },
        // Attacking corner zone roles
        atkZone: {
          nearPost:    'Near Post — first to the ball on inswinging deliveries',
          farPost:     'Far Post — ideal for outswinging deliveries',
          penaltySpot: 'Penalty Spot — volleys, flick-ons, or second balls',
          blockade:    'Blockade — screens the keeper, minimises overlap',
          edgeOfBox:   'Edge of Box — recycles clearances or shoots from range',
          shortCorner: 'Short Corner — pulls a defender wide to open space inside',
          holdBack:    'Hold Back — counter cover, stays outside the box',
        },
        // Defensive corner zone roles
        defZone: {
          nearPost:      'Near Post — attacks the ball first on short deliveries',
          farPost:       'Far Post — last aerial line of defence',
          sixYardAnchor: '6-Yard Box — commands the box, best aerial defender',
          penaltySpot:   'Penalty Spot — blocks shots and first balls',
          edgeOfBox:     'Edge of Box — picks up second balls, drives forward',
          counterRunner: 'Counter Runner — fastest player, lurks for the breakaway',
        },
      };
      return DESCS[type]?.[value] || '';
    },
    setPieceZoneLabel(side, key) {
      const labels = {
        atk: { nearPost:'Near Post', farPost:'Far Post', penaltySpot:'Penalty Spot', blockade:'Blockade', edgeOfBox:'Edge of Box', shortCorner:'Short Corner', holdBack:'Hold Back' },
        def: { nearPost:'Near Post', farPost:'Far Post', sixYardAnchor:'6-Yard Box', penaltySpot:'Penalty Spot', edgeOfBox:'Edge of Box', counterRunner:'Counter Runner' },
      };
      return labels[side]?.[key] || key;
    },
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
    computeTrueValues() {
      if (!this.allPlayers.length) return;
      const now = Date.now();
      const twoMo = 60 * 24 * 3600 * 1000;
      const sixMo = 180 * 24 * 3600 * 1000;

      // Index negos by lower-case player name
      const negoIdx = {};
      for (const n of this.espionageNegos) {
        const k = (n.playerName||'').toLowerCase();
        if (!k) continue;
        if (!negoIdx[k]) negoIdx[k] = [];
        negoIdx[k].push(n);
      }

      const map = {};
      for (const p of this.allPlayers) {
        const k = (p.Player||'').toLowerCase();
        const negos = negoIdx[k] || [];

        // Baseline: game value × rating multiplier
        const gv = p.Value || 0;
        const rtg = p._gameRating || 0;
        const mult = rtg >= 85 ? 4.0 : rtg >= 82 ? 3.0 : rtg >= 79 ? 2.2 : rtg >= 76 ? 1.7 : rtg >= 72 ? 1.3 : 1.0;
        let best = gv * mult;
        let src = 'formula';
        const pick = (v, s) => { if (v > best) { best = v; src = s; } };

        // Last real transfer
        if (p._transferHistory?.length) {
          const real = p._transferHistory.filter(t => t.isReal).sort((a,b) => new Date(b.date)-new Date(a.date));
          if (real[0]) {
            const age = now - new Date(real[0].date).getTime();
            pick(real[0].amount * (age < twoMo ? 1.0 : age < sixMo ? 0.9 : 0.8), 'transfer');
          }
        }
        // Active listing ask
        if (p._listingAsk) pick(p._listingAsk, 'listing');

        // Nego signals
        for (const n of negos) {
          if (!n.amount || n.amount < 50000) continue;
          const age = now - new Date(n.updatedAt||0).getTime();
          const rec = age < twoMo ? 1.0 : age < sixMo ? 0.85 : 0.7;
          if (n.status === 'accepted') pick(n.amount * rec, 'deal');
          else if (n.status === 'rejected') pick(n.amount * 1.15 * rec, 'rejected+15%');
          if (n.history) {
            for (const h of n.history) {
              if (h.amount >= 50000) pick(h.amount * 0.9 * rec, 'bid round');
            }
          }
        }

        if (best > 0) {
          const v = Math.round(best/500000)*500000 || Math.round(best/100000)*100000 || Math.round(best);
          map[k] = { v, src };
        }
      }
      this.trueValueMap = map;
    },
    trueVal(p) {
      return this.trueValueMap[(p.Player||'').toLowerCase()]?.v || p._estValue || 0;
    },
    trueValSrc(p) {
      return this.trueValueMap[(p.Player||'').toLowerCase()]?.src || 'formula';
    },
    onNegoScroll(e) {
      const el = e.target;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 250) {
        if (this.negoDisplayCount < this.espionageNegoFiltered.length) {
          this.negoDisplayCount = Math.min(this.negoDisplayCount + 50, this.espionageNegoFiltered.length);
        }
      }
    },
    startNegosPolling() {
      if (this.negosPollingInterval) return;
      this.negosPollingInterval = setInterval(() => this.pollNegosUpdate(), 300000); // 5 min
    },
    stopNegosPolling() {
      if (this.negosPollingInterval) { clearInterval(this.negosPollingInterval); this.negosPollingInterval = null; }
    },
    async pollNegosUpdate() {
      try {
        const tsRaw = await serverCacheGet('sf_negos_last_pull');
        if (!tsRaw) return;
        const newPull = parseInt(tsRaw, 10);
        if (!this.negosLastPull || newPull > this.negosLastPull) {
          const raw = await serverCacheGet('sf_negos_history_v1');
          if (raw) {
            this.espionageNegos = JSON.parse(raw);
            this.negosLastPull = newPull;
          }
        }
      } catch(e) {}
    },
    negoStatusInfo(n) {
      if (!n) return { icon:'', label:'—', detail:'', color:'#8b949e', bg:'#21262d' };
      const { status, subStatus, via, lastActionBy } = n;
      const isAuction = via === 'auction';
      const isListing = via === 'listing';
      const rejReasons = {
        declined:'not interested', counter_rejected:'counter rejected',
        moved_elsewhere:'went elsewhere', outbid:'outbid',
        insufficient_funds:'insufficient funds', withdrawn:'withdrawn',
        closed:'closed',
      };
      if (status === 'pending') {
        if (isAuction) return { icon:'🏛', label:'Auction bid', detail:`closes ${this.auctionCountdown}`, color:'#d2a8ff', bg:'#2d1a3a' };
        if (isListing) return { icon:'📋', label:'Listing offer', detail:'', color:'#79c0ff', bg:'#1f3a5a' };
        return { icon:'📨', label:'Direct offer', detail:'', color:'#79c0ff', bg:'#1f3a5a' };
      }
      if (status === 'counter' || status === 'countered') {
        // Determine perspective: are we the buyer or seller in this nego?
        const iAmBuyer = n.buyer === this.myClub;
        const buyerActed = lastActionBy === 'buyer';
        const weActed = iAmBuyer ? buyerActed : !buyerActed;
        const other = iAmBuyer ? 'Seller' : 'Buyer';
        const who = weActed ? 'We' : other;
        return { icon:'🔄', label:`${who} countered`, detail:'', color:'#ffa657', bg:'#4a3a10' };
      }
      if (status === 'accepted') {
        return { icon:'✓', label: isAuction ? 'Won auction' : 'Accepted', detail:'', color:'#7ee787', bg:'#1a4a2e' };
      }
      if (status === 'rejected') {
        const labels = {
          declined:'✗ Rejected', counter_rejected:'✗ Counter rejected',
          moved_elsewhere:'✗ Went elsewhere', outbid:'✗ Outbid',
          insufficient_funds:'⚠ Funds issue', withdrawn:'↩ Withdrawn', closed:'✗ Closed',
        };
        const label = labels[subStatus] || '✗ Rejected';
        const note = subStatus==='insufficient_funds' ? 'next bidder wins' : subStatus==='outbid' ? '' : '';
        return { icon:'', label, detail:note, color:label.startsWith('↩')?'#8b949e':'#ff7b72', bg:label.startsWith('↩')?'#21262d':'#3a1212' };
      }
      if (status === 'withdrawn') return { icon:'↩', label:'Withdrawn', detail:'', color:'#8b949e', bg:'#21262d' };
      if (subStatus === 'outbid') return { icon:'', label:'✗ Outbid', detail:'', color:'#ff7b72', bg:'#3a1212' };
      if (subStatus === 'insufficient_funds') return { icon:'', label:'⚠ Funds issue', detail:'next bidder wins', color:'#ffa657', bg:'#3a2810' };
      if (subStatus === 'won') return { icon:'✓', label:'Won', detail:'', color:'#7ee787', bg:'#1a4a2e' };
      return { icon:'', label:status||'—', detail:subStatus||'', color:'#8b949e', bg:'#21262d' };
    },
    // Highest bid amount visible for an auction nego
    auctionHighestBid(n) {
      if (!n.history?.length) return n.amount;
      return Math.max(n.amount || 0, ...n.history.map(h => h.amount || 0));
    },
    async pullBudgetNow() {
      if (this.pullingBudget) return;
      this.pullingBudget = true;
      // Use dedicated /_budget route — logs immediately so we can confirm it's hit
      const WORKER = 'https://sf-cache.ofersi15.workers.dev';
      try {
        await fetch(`${WORKER}/_budget`, { method: 'POST', signal: AbortSignal.timeout(8000) });
        // Poll KV every 3s for up to 18s waiting for the background job
        for (let i = 0; i < 6; i++) {
          await new Promise(r => setTimeout(r, 3000));
          const [budgetRaw, auctionsRaw] = await Promise.all([
            serverCacheGet('sf_leverkusen_fin_v1', true),
            serverCacheGet('sf_auctions_v1', true),
          ]);
          if (budgetRaw) { const f = JSON.parse(budgetRaw); if (f.budget) this.clubBudget = f.budget; }
          if (auctionsRaw) this._applyAuctionData(JSON.parse(auctionsRaw));
          const allBudRaw = await serverCacheGet('sf_all_budgets_v1', true);
          if (allBudRaw) { const b = JSON.parse(allBudRaw); this.allBudgets = b.data || b; }
          if (budgetRaw) break;
        }
      } catch(e) {}
      this.pullingBudget = false;
    },
    saveBudget() {
      const v = parseInt((this.budgetEditVal||'').replace(/[^0-9]/g, ''), 10);
      if (!isNaN(v) && v > 0) {
        this.budgetOverride = v;
        try { localStorage.setItem('sf_budget_override', String(v)); } catch(e) {}
        // Also write to KV so it persists across devices
        serverCacheSet('sf_leverkusen_fin_v1', JSON.stringify({ budget: v, ts: Date.now() }));
      }
      this.budgetEditing = false;
    },
    _applyAuctionData(data) {
      // data = parsed sf_auctions_v1 value (may be {data:{items:[...]},ts:...} or {items:[...]} or [...])
      const raw = data.data || data;
      const items = Array.isArray(raw) ? raw : (raw.items || []);
      this.auctionItems = items;
      // Build profile map from snapshots — full player objects usable in the modal
      const profiles = {};
      for (const item of items) {
        if (!item.player) continue;
        const k = item.player.toLowerCase();
        const snap = item.snapshot || {};
        profiles[k] = {
          ...snap,  // all attributes (Speed, Tackling, etc.) for the modal
          Player: item.player,
          Position: item.position || item.pos || snap.Position || snap.position || snap.pos || null,
          Age: snap.Age ?? snap.age ?? item.age ?? null,
          _gameRating: item.rating ?? item.Rating ?? snap.Rating ?? snap.rating ?? null,
          Club: item.club || snap.Club || snap.club || null,
        };
      }
      this.auctionProfiles = profiles;
    },
    async loadAuctionData() {
      try {
        const [aRaw, bRaw] = await Promise.all([
          serverCacheGet('sf_auctions_v1'),
          serverCacheGet('sf_all_budgets_v1'),
        ]);
        if (aRaw) this._applyAuctionData(JSON.parse(aRaw));
        if (bRaw) { const b = JSON.parse(bRaw); this.allBudgets = b.data || b; }
      } catch(e) {}
    },
    async loadWorkerLog() {
      this.workerLogOpen = true;
      try {
        const raw = await serverCacheGet('sf_worker_log');
        this.workerLog = raw ? JSON.parse(raw) : [];
      } catch(e) { this.workerLog = []; }
    },
    playerByName(name) {
      if (!name) return null;
      const lc = name.toLowerCase();
      return this.allPlayers.find(p => (p.Player||'').toLowerCase() === lc)
          || this.youthAcademy.find(p => (p.Player||p.name||'').toLowerCase() === lc)
          || this.auctionProfiles[lc]
          || this.negoPlayerMap[lc]
          || null;
    },
    openPlayerByName(name) {
      if (!name) return;
      const p = this.playerByName(name);
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
          if (cached) {
            this.espionageClubs = cached.clubs || [];
            // Always merge with sf_negos_history_v1 so CF-worker updates show up immediately
            let negos = cached.negos || [];
            try {
              const hRaw = await serverCacheGet('sf_negos_history_v1');
              if (hRaw) {
                const hist = JSON.parse(hRaw);
                const m = new Map(negos.map(n => [n.id, n]));
                hist.forEach(n => m.set(n.id, n));
                negos = [...m.values()].sort((a,b) => new Date(b.updatedAt||0) - new Date(a.updatedAt||0));
              }
            } catch(e) {}
            this.espionageNegos = negos;
            this.espionageCacheDate = new Date(cached.savedAt).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
            // Show when negos were last pulled by CF worker
            serverCacheGet('sf_negos_last_pull').then(t => { if (t) this.negosLastPull = parseInt(t,10); }).catch(()=>{});
            // Load club budget if cached
            serverCacheGet('sf_leverkusen_fin_v1').then(r => { if (r) { const f=JSON.parse(r); if (typeof f.budget==='number') this.clubBudget=f.budget; if (typeof f.wage==='number') this.clubWageBudget=f.wage; } }).catch(()=>{});
            this.loadAuctionData();
            this.espionageLoaded = true;
            this.espionageLoading = false;
            this.loadEspionageSubmissions();
            // Background refresh if stale
            if (Date.now() - cached.savedAt > TTL) {
              setTimeout(() => this.loadEspionage(true), 100);
            }
            return;
          }
        } catch(e) {}
      }
      try {
        // Get unique clubs from player data
        const clubSet = new Set(this.allPlayers.map(p => p.Club).filter(Boolean));
        const clubs = [...clubSet].sort();
        const total = clubs.length;

        // Load negotiations — prefer CF worker's KV history (updated every 5–15 min), API as fallback
        let negos = [];
        try {
          const hRaw = await serverCacheGet('sf_negos_history_v1');
          if (hRaw) {
            negos = JSON.parse(hRaw);
          } else {
            // First-time fallback: hit the API directly
            const r = await fetch(`${API}/negotiations`).then(r => r.json());
            const all = Array.isArray(r) ? r : (r.negotiations || r.items || []);
            negos = all.map(n => ({
              id: n.id, playerName: n.playerName,
              buyer: n.buyer || n.toClub, seller: n.seller || n.fromClub,
              amount: n.amount, status: n.status, subStatus: n.subStatus,
              via: n.via, lastActionBy: n.lastActionBy,
              history: n.history || [], createdAt: n.createdAt, updatedAt: n.updatedAt || n.ts,
            })).sort((a,b) => new Date(b.updatedAt||0) - new Date(a.updatedAt||0));
            serverCacheSet('sf_negos_history_v1', JSON.stringify(negos));
          }
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
        serverCacheGet('sf_negos_last_pull').then(t => { if (t) this.negosLastPull = parseInt(t,10); }).catch(()=>{});
        serverCacheGet('sf_leverkusen_fin_v1').then(r => { if (r) { const f=JSON.parse(r); this.clubBudget=f.budget; this.clubWageBudget=f.wage; } }).catch(()=>{});
        this.loadAuctionData();
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
      const fmt = '([345]-\\d(?:-\\d){1,2})';
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
      const mid = (c.DM || 0) + (c.CM || 0) + (c.WM || 0); // DM+CM+RM/LM all one mid layer
      const wf = c.WF || 0;  // RW/LW
      const am = c.AM || 0;
      const cf = c.CF || 0;
      const parts = [def];
      if (mid) parts.push(mid);
      // RW/LW group with AM when AM exists (4-2-3-1), otherwise group with CF (4-3-3)
      if (am && wf) {
        parts.push(am + wf);
        if (cf) parts.push(cf);
      } else {
        if (am) parts.push(am);
        if (wf + cf) parts.push(wf + cf);
      }
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
      const p = pos.split('/')[0]; // handle compound labels like LW/SS
      const map = {
        LB:'FB', RB:'FB',
        LCB:'CB', RCB:'CB',
        LDM:'DM', RDM:'DM',
        LCM:'CM', RCM:'CM',
        LM:'WM', RM:'WM', LWM:'WM', RWM:'WM',
        LAM:'AM', RAM:'AM',
        LW:'WF', RW:'WF', LWF:'WF', RWF:'WF',
        ST:'CF', SS:'CF', LCF:'CF', RCF:'CF',
      };
      return map[p] || p;
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
        if (data?.clubs) {
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
      try { localStorage.setItem('sf_last_club', clubName); } catch(e) {}
      delete this.submissionsCache[clubName];
      await this._fetchClubSubmissions(clubName);
      try {
        const lsRaw = localStorage.getItem(SUBMISSIONS_LS_KEY);
        const lsData = lsRaw ? JSON.parse(lsRaw) : { clubs: {} };
        lsData.clubs[clubName] = this.submissionsCache[clubName] || {};
        localStorage.setItem(SUBMISSIONS_LS_KEY, JSON.stringify(lsData));
      } catch(e) {}
      // Preload club info (facilities/staff/academy/scouts) in background
      this._fetchClubInfo(clubName);
    },

    async _fetchClubInfo(clubName) {
      if (this.clubInfoCache[clubName]?.loaded) return;
      this.clubInfoCache = { ...this.clubInfoCache, [clubName]: { loading: true } };
      try {
        const enc = encodeURIComponent(clubName);
        const [facRes, staffRes, acRes, sjRes, accRes] = await Promise.all([
          fetch(`${API}/facilities?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          fetch(`${API}/staff/effects?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          fetch(`${API}/academy?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          fetch(`${API}/scouting/jobs?club=${enc}`).then(r=>r.json()).catch(()=>({})),
          fetch(`${API}/scouting/jobs?club=${enc}&status=accepted`).then(r=>r.json()).catch(()=>({})),
        ]);
        // Enrich academy players with accepted-job attrs
        const acItems = acRes.items || [];
        const accMap = {};
        for (const job of (accRes.items || [])) {
          const k = (job.player?.name || job.player?.Player || '').toLowerCase();
          if (k) accMap[k] = job.player;
        }
        const ENRICH = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision','Mentality','Experience'];
        for (const p of acItems) {
          const jp = accMap[(p.name||p.Player||'').toLowerCase()];
          if (jp) ENRICH.forEach(a => { if (jp[a] != null && p[a] == null) p[a] = jp[a]; if (jp.stats?.[a] != null && p[a] == null) p[a] = jp.stats[a]; });
        }
        this.clubInfoCache = { ...this.clubInfoCache, [clubName]: {
          loaded: true, loading: false,
          facilities: facRes?.levels || facRes || {},
          facilityProject: facRes?.project || null,
          staff: (staffRes?.ok ? staffRes.effects : staffRes) || {},
          academy: acItems,
          scouts: sjRes?.items || [],
          scoutCap: sjRes?.cap || {},
        }};
      } catch(e) {
        this.clubInfoCache = { ...this.clubInfoCache, [clubName]: { loaded: true, loading: false, error: true }};
      }
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
        // Pre-load all existing GW chunks so Pass 2 can reuse them instead of re-fetching
        if (this.matchArchive?.length) {
          const existingGws = [...new Set(this.matchArchive.map(m => m._gw))].filter(Boolean);
          this.matchArchiveMsg = `Loading ${existingGws.length} cached chunks…`;
          log(`Pre-loading ${existingGws.length} GW chunks from KV`);
          await Promise.all(existingGws.map(gw => this.loadMatchChunk(gw)));
          log(`Chunks loaded: ${Object.keys(this.matchChunks).length} GWs in memory`);
        }

        // Pass 1: collect unique fixture IDs by club (API doesn't support ?gameweek filter)
        const fixtureMap = new Map();
        const clubList = [...new Set(this.allPlayers.map(p => p.Club).filter(Boolean))].sort();
        log(`${clubList.length} clubs to scan`);
        for (let i = 0; i < clubList.length; i += 10) {
          const batch = clubList.slice(i, i + 10);
          this.matchArchiveProgress = Math.round((i / clubList.length) * 20);
          this.matchArchiveMsg = `Pass 1: ${Math.min(i+10, clubList.length)}/${clubList.length} clubs · ${fixtureMap.size} fixtures`;
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
          await delay(50);
        }
        log(`Pass 1 done: ${fixtureMap.size} unique fixtures`);

        // Pass 2: fetch full match detail — reuse cached chunks, only fetch new fixtures
        const fixtureIds = Array.from(fixtureMap.keys());
        // Build a map of already-loaded full match data from chunks
        const cachedFull = new Map();
        for (const gw of Object.keys(this.matchChunks)) {
          for (const m of (this.matchChunks[gw] || [])) cachedFull.set(m.fixtureId, m);
        }
        const toFetch = fixtureIds.filter(id => !cachedFull.has(id));
        const fullMatches = fixtureIds.filter(id => cachedFull.has(id)).map(id => cachedFull.get(id));
        log(`Pass 2: ${toFetch.length} new fixtures to fetch, ${fullMatches.length} reused from cache`);
        let fetchErrors = 0;
        for (let i = 0; i < toFetch.length; i += 25) {
          const batch = toFetch.slice(i, i + 25);
          this.matchArchiveProgress = 20 + Math.round((i / Math.max(toFetch.length, 1)) * 40);
          this.matchArchiveMsg = `Pass 2: ${Math.min(i+25, toFetch.length)}/${toFetch.length} new fixtures · ${fetchErrors} errors`;
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
          await delay(30);
        }
        fullMatches.sort((a,b) => (b.kickoff||'').localeCompare(a.kickoff||''));
        log(`Pass 2 done: ${fullMatches.length} matches, ${fetchErrors} errors`);

        // Pass 3: fetch all submissions for every club (formation + instructions + roles)
        const subsByClub = {}; // club → { gw → submission }
        let subErrors = 0;
        log(`Pass 3: fetching submissions for ${clubList.length} clubs`);
        for (let i = 0; i < clubList.length; i += 10) {
          const batch = clubList.slice(i, i + 10);
          this.matchArchiveProgress = 60 + Math.round((i / clubList.length) * 24);
          this.matchArchiveMsg = `Pass 3: ${Math.min(i+10, clubList.length)}/${clubList.length} clubs · submissions`;
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
          await delay(50);
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
        // Formation fallback chain: submission → extracted from narrative → derived from ratings
        const stripDashes = s => s ? String(s).replace(/-/g, '') : null;
        const fmSrc = { sub:0, narr:0, derived:0, none:0 };
        const getFm = (sub, narrative, club, ratingsArr) => {
          if (sub?.formation) { fmSrc.sub++; return sub.formation; }
          const fromNarr = stripDashes(this.extractFormation(narrative, club));
          if (fromNarr) { fmSrc.narr++; return fromNarr; }
          const fromRatings = stripDashes(this.deriveFormation(ratingsArr));
          if (fromRatings) { fmSrc.derived++; return fromRatings; }
          fmSrc.none++; return null;
        };
        const compactMatches = fullMatches.map(m => {
          const hNarInstr = this.extractTactics(m.reportNarrative, m.home?.club);
          const aNarInstr = this.extractTactics(m.reportNarrative, m.away?.club);
          return {
          fixtureId: m.fixtureId, kickoff: m.kickoff, gameweek: m.gameweek,
          competition: m.competition,
          home: { club: m.home?.club,
            formation: getFm(m.home?.sub, m.reportNarrative, m.home?.club, m.ratings?.home),
            mentality: m.home?.sub?.instructions?.mentality || hNarInstr?.mentality || null,
            style: m.home?.sub?.instructions?.style || hNarInstr?.style || null,
            sqRtg: computeSquadRatings(m.home?.sub) },
          away: { club: m.away?.club,
            formation: getFm(m.away?.sub, m.reportNarrative, m.away?.club, m.ratings?.away),
            mentality: m.away?.sub?.instructions?.mentality || aNarInstr?.mentality || null,
            style: m.away?.sub?.instructions?.style || aNarInstr?.style || null,
            sqRtg: computeSquadRatings(m.away?.sub) },
          score: m.score, headline: m.headline,
          // Key match stats for formation/style analysis (inline to avoid loading every chunk)
          stats: m.stats ? {
            xg: m.stats.xg,
            shots: m.stats.shots ? { home: m.stats.shots.home?.total ?? null, away: m.stats.shots.away?.total ?? null } : null,
            possession: m.stats.possession,
          } : null,
          _homeManager: m._homeManager, _awayManager: m._awayManager,
          _gw: m.gameweek ?? 0,
          }; // close return object
        }); // close fullMatches.map
        log(`Formation sources: sub=${fmSrc.sub} narr=${fmSrc.narr} derived=${fmSrc.derived} none=${fmSrc.none} (of ${fullMatches.length*2} sides)`);
        const indexData = { builtAt: Date.now(), matchCount: fullMatches.length, gwCount: sortedGws.length, gameweeks: sortedGws, fmSrc, matches: compactMatches };
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
          await delay(30);
        }

        this.matchArchive = compactMatches;
        this.matchArchiveChunkCount = sortedGws.length;
        this.matchArchiveCacheDate = new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        this.matchArchiveFmSrc = fmSrc;
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

    async appendLatestGw() {
      if (this.appendGwBuilding || this.matchArchiveBuilding) return;
      if (!this.matchArchive?.length) { alert('Load the archive first'); return; }
      this.appendGwBuilding = true;
      this.appendGwProgress = 0;
      this.appendGwMsg = 'Starting…';
      const log = m => { this.matchBuildLog.push(m); console.log('[AppendGW]', m); };
      const delay = ms => new Promise(r => setTimeout(r, ms));
      const saveWithRetry = async (url, body, tries=3) => {
        for (let t = 0; t < tries; t++) {
          try { const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body }); if (r.ok) return true; } catch(e) {}
          await delay(500);
        }
        return 'save failed';
      };
      try {
        // Identify fixture IDs already in archive
        const knownIds = new Set(this.matchArchive.map(m => m.fixtureId));
        const maxGw = Math.max(...this.matchArchive.map(m => m._gw || 0).filter(g => g > 0));
        log(`Archive has ${knownIds.size} fixtures up to GW${maxGw}`);

        // Pass 1: scan all clubs for new fixture IDs
        this.appendGwMsg = 'Scanning clubs for new fixtures…';
        const clubList = [...new Set(this.allPlayers.map(p => p.Club).filter(Boolean))].sort();
        const newFixtureMap = new Map();
        for (let i = 0; i < clubList.length; i += 10) {
          const batch = clubList.slice(i, i + 10);
          this.appendGwProgress = Math.round((i / clubList.length) * 30);
          this.appendGwMsg = `Scanning ${Math.min(i+10, clubList.length)}/${clubList.length} clubs… ${newFixtureMap.size} new`;
          await Promise.all(batch.map(async club => {
            try {
              const d = await fetch(`${API}/matches?club=${encodeURIComponent(club)}&limit=50`).then(r => r.json());
              for (const m of (d?.matches || [])) {
                if (m.fixtureId && !knownIds.has(m.fixtureId) && !newFixtureMap.has(m.fixtureId)) {
                  newFixtureMap.set(m.fixtureId, m);
                }
              }
            } catch(e) { log(`ERROR ${club}: ${e.message}`); }
          }));
          await delay(50);
        }
        log(`Found ${newFixtureMap.size} new fixtures`);
        if (newFixtureMap.size === 0) { this.appendGwMsg = 'No new fixtures found.'; this.appendGwBuilding = false; return; }

        // Pass 2: fetch full match detail for new fixtures only
        const toFetch = Array.from(newFixtureMap.keys());
        const fullNew = [];
        let fetchErrors = 0;
        for (let i = 0; i < toFetch.length; i += 25) {
          const batch = toFetch.slice(i, i + 25);
          this.appendGwProgress = 30 + Math.round((i / toFetch.length) * 30);
          this.appendGwMsg = `Fetching ${Math.min(i+25, toFetch.length)}/${toFetch.length} match details…`;
          await Promise.all(batch.map(async id => {
            try {
              const d = await fetch(`${API}/matches/${id}`).then(r => r.json());
              if (d?.match) {
                const m = d.match;
                m._homeManager = this.extractManager(m.reportNarrative, m.home?.club || '');
                m._awayManager = this.extractManager(m.reportNarrative, m.away?.club || '');
                fullNew.push(m);
              } else { fetchErrors++; }
            } catch(e) { fetchErrors++; log(`ERROR fixture ${id}: ${e.message}`); }
          }));
          await delay(30);
        }
        log(`Fetched ${fullNew.length} full matches, ${fetchErrors} errors`);

        // Identify new GWs
        const newGws = [...new Set(fullNew.map(m => m.gameweek).filter(g => g != null))];
        log(`New GWs: ${newGws.join(', ')}`);

        // Pass 3: fetch submissions only for clubs involved in new GWs
        this.appendGwMsg = `Fetching submissions for new GWs…`;
        const involvedClubs = [...new Set(fullNew.flatMap(m => [m.home?.club, m.away?.club]).filter(Boolean))];
        const subsByClub = {};
        for (let i = 0; i < involvedClubs.length; i += 10) {
          const batch = involvedClubs.slice(i, i + 10);
          this.appendGwProgress = 60 + Math.round((i / involvedClubs.length) * 20);
          this.appendGwMsg = `Submissions: ${Math.min(i+10, involvedClubs.length)}/${involvedClubs.length} clubs…`;
          await Promise.all(batch.map(async club => {
            try {
              const d = await fetch(`${API}/submissions?club=${encodeURIComponent(club)}&limit=50`).then(r => r.json());
              const byGw = {};
              for (const s of (d?.items || [])) {
                const key = s.gameweek ?? 'upcoming';
                if (!byGw[key] || s.createdAt > byGw[key].createdAt) byGw[key] = s;
              }
              subsByClub[club] = byGw;
            } catch(e) { log(`SUB ERROR ${club}: ${e.message}`); }
          }));
          await delay(50);
        }

        // Augment new matches with submission data
        for (const m of fullNew) {
          const gw = m.gameweek;
          const homeSub = gw != null ? subsByClub[m.home?.club]?.[gw] : null;
          const awaySub = gw != null ? subsByClub[m.away?.club]?.[gw] : null;
          if (homeSub) m.home.sub = { formation: homeSub.formation, instructions: homeSub.instructions, roles: homeSub.roles, xi: homeSub.xi, runs: homeSub.runs };
          if (awaySub) m.away.sub = { formation: awaySub.formation, instructions: awaySub.instructions, roles: awaySub.roles, xi: awaySub.xi, runs: awaySub.runs };
        }

        // Build compact entries for new matches
        const stripDashes = s => s ? String(s).replace(/-/g, '') : null;
        const playerByName = new Map(this.allPlayers.map(p => [(p.Player||'').toLowerCase().trim(), p]));
        const avgArr = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length*10)/10 : null;
        const SLOT_SECTION = { CB:'def', FB:'def', DM:'mid', CM:'mid', WM:'mid', AM:'att', WF:'att', CF:'att' };
        const computeSquadRatings = (sub) => {
          if (!sub?.xi?.length) return null;
          const secs = { def:[], mid:[], att:[] }; const all = [];
          for (const slot of sub.xi) {
            const name = (slot.name || slot.player || '').toLowerCase().trim();
            const p = playerByName.get(name); if (!p) continue;
            const slotBase = (slot.slot || '').replace(/\d+$/, '') || p.Position || 'CM';
            const r = calcGameRating(p, p.Position || slotBase); if (!r) continue;
            all.push(r); if (SLOT_SECTION[slotBase]) secs[SLOT_SECTION[slotBase]].push(r);
          }
          return { overall: avgArr(all), def: avgArr(secs.def), mid: avgArr(secs.mid), att: avgArr(secs.att) };
        };
        const newCompact = fullNew.map(m => {
          const hNarInstr = this.extractTactics(m.reportNarrative, m.home?.club);
          const aNarInstr = this.extractTactics(m.reportNarrative, m.away?.club);
          const getFm = (sub, club, ratingsArr) => {
            if (sub?.formation) return stripDashes(sub.formation);
            const fromNarr = stripDashes(this.extractFormation(m.reportNarrative, club));
            if (fromNarr) return fromNarr;
            return stripDashes(this.deriveFormation(ratingsArr)) || null;
          };
          return {
            fixtureId: m.fixtureId, kickoff: m.kickoff, gameweek: m.gameweek,
            competition: m.competition,
            home: { club: m.home?.club, formation: getFm(m.home?.sub, m.home?.club, m.ratings?.home), mentality: m.home?.sub?.instructions?.mentality || hNarInstr?.mentality || null, style: m.home?.sub?.instructions?.style || hNarInstr?.style || null, sqRtg: computeSquadRatings(m.home?.sub) },
            away: { club: m.away?.club, formation: getFm(m.away?.sub, m.away?.club, m.ratings?.away), mentality: m.away?.sub?.instructions?.mentality || aNarInstr?.mentality || null, style: m.away?.sub?.instructions?.style || aNarInstr?.style || null, sqRtg: computeSquadRatings(m.away?.sub) },
            score: m.score, headline: m.headline,
            stats: m.stats ? { xg: m.stats.xg, shots: m.stats.shots ? { home: m.stats.shots.home?.total ?? null, away: m.stats.shots.away?.total ?? null } : null, possession: m.stats.possession } : null,
            _homeManager: m._homeManager, _awayManager: m._awayManager,
            _gw: m.gameweek ?? 0,
          };
        });

        // Group new matches by GW and save chunks (load existing chunk first to merge)
        this.appendGwProgress = 80;
        const gwMap = new Map();
        for (const m of fullNew) {
          const gw = m.gameweek ?? 0;
          if (!gwMap.has(gw)) gwMap.set(gw, []);
          gwMap.get(gw).push(m);
        }
        for (const [gw, matches] of gwMap) {
          // Merge with any existing chunk data for this GW
          let existing = [];
          if (this.matchChunks[gw]) existing = this.matchChunks[gw];
          else {
            try { const raw = await serverCacheGet(`sf_match_archive_v3_gw_${gw}`); if (raw) existing = JSON.parse(raw).matches || []; } catch(e) {}
          }
          const existingIds = new Set(existing.map(m => m.fixtureId));
          const merged = [...existing, ...matches.filter(m => !existingIds.has(m.fixtureId))];
          this.matchChunks[gw] = merged;
          const chunkStr = JSON.stringify({ gw, matches: merged });
          this.appendGwMsg = `Saving GW${gw} chunk (${merged.length} matches)…`;
          await saveWithRetry(`${SF_CACHE_BASE}/sf_match_archive_v3_gw_${gw}?permanent=1`, chunkStr);
          log(`GW${gw} chunk saved: ${merged.length} matches`);
        }

        // Update archive index: merge new compact matches + update gameweeks list
        this.appendGwProgress = 92;
        this.appendGwMsg = 'Updating archive index…';
        const updatedMatches = [...this.matchArchive, ...newCompact];
        const allGws = [...new Set(updatedMatches.map(m => m._gw).filter(g => g > 0))].sort((a,b) => a-b);
        const indexData = {
          builtAt: Date.now(),
          matchCount: updatedMatches.length,
          gwCount: allGws.length,
          gameweeks: allGws,
          fmSrc: this.matchArchiveFmSrc || {},
          matches: updatedMatches,
        };
        const idxErr = await saveWithRetry(`${SF_CACHE_BASE}/sf_match_archive_v3?permanent=1`, JSON.stringify(indexData));
        if (idxErr !== true) throw new Error('Index save failed');

        // Update in-memory state
        this.matchArchive = updatedMatches;
        this.matchArchiveChunkCount = allGws.length;
        this.matchArchiveCacheDate = new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        this.analysisLoaded = false; // invalidate analysis so it reloads
        this.appendGwProgress = 100;
        this.appendGwMsg = `Done — added ${newCompact.length} matches (GW${newGws.join(', GW')})`;
        log(`Append complete: +${newCompact.length} matches across GW${newGws.join(', GW')}`);
      } catch(e) {
        this.appendGwMsg = 'Error: ' + (e.message || e);
        log(`FATAL: ${e.message || e}`);
      }
      this.appendGwBuilding = false;
    },

    async loadMatchArchive() {
      try {
        const raw = await serverCacheGet('sf_match_archive_v3', true);
        if (!raw) return;
        const data = await parseAsync(raw);
        if (data?.matches?.length) {
          this.matchArchive = data.matches;
          this.matchArchiveChunkCount = data.gwCount || 0;
          this.matchArchiveCacheDate = new Date(data.builtAt).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
          if (data.fmSrc) this.matchArchiveFmSrc = data.fmSrc;
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

    async loadAnalysisChunks() {
      if (this.analysisLoading || this.analysisLoaded) return;
      if (!this.matchArchive) return;
      this.analysisLoading = true;
      const gws = [...new Set(this.matchArchive.map(m => m._gw))].sort((a,b)=>a-b);
      const results = [];
      for (let i = 0; i < gws.length; i++) {
        this.analysisProgress = Math.round((i / gws.length) * 100);
        this.analysisMsg = `Loading GW${gws[i]}… ${i+1}/${gws.length}`;
        const gw = gws[i];
        if (!this.matchChunks[gw]) await this.loadMatchChunk(gw);
        for (const m of (this.matchChunks[gw] || [])) {
          if (m.home?.sub?.instructions && m.away?.sub?.instructions) {
            results.push(m);
          }
        }
        await new Promise(r => setTimeout(r, 20));
      }
      this.analysisMatches = results;

      // Backfill formations + mentalities into compact index from chunk data
      // so Formation/Mentality cards work without a rebuild
      const stripDashes = s => s ? String(s).replace(/-/g, '') : null;
      const chunkById = new Map();
      for (const gw of Object.keys(this.matchChunks)) {
        for (const m of (this.matchChunks[gw] || [])) chunkById.set(m.fixtureId, m);
      }
      let backfilled = 0;
      for (const cm of (this.matchArchive || [])) {
        const full = chunkById.get(cm.fixtureId);
        if (!full) continue;
        for (const side of ['home', 'away']) {
          if (!cm[side]) continue;
          if (!cm[side].formation) {
            let fm = full[side]?.sub?.formation || null;
            if (!fm) fm = stripDashes(this.extractFormation(full.reportNarrative, full[side]?.club));
            if (!fm) fm = stripDashes(this.deriveFormation(full.ratings?.[side]));
            if (fm) { cm[side].formation = fm; backfilled++; }
          }
          if (!cm[side].mentality && full[side]?.sub?.instructions?.mentality) {
            cm[side].mentality = full[side].sub.instructions.mentality;
          }
        }
      }
      this.analysisLoaded = true;
      this.analysisLoading = false;
      this.analysisMsg = `${results.length} matches with full tactical data · ${backfilled} formations backfilled`;
    },

    // Runs formation derivation on all loaded chunks — no API calls, no rebuild
    async runFmDiag() {
      if (this.fmDiagRunning) return;
      this.fmDiagRunning = true;
      // Load any missing chunks first
      if (this.matchArchive) {
        const gws = [...new Set(this.matchArchive.map(m => m._gw))].sort((a,b)=>a-b);
        for (let i = 0; i < gws.length; i++) {
          if (!this.matchChunks[gws[i]]) await this.loadMatchChunk(gws[i]);
          if (i % 5 === 0) await new Promise(r => setTimeout(r, 10));
        }
      }
      const src = { sub:0, narr:0, derived:0, none:0, noRatings:0 };
      const stripDashes = s => s ? String(s).replace(/-/g,'') : null;
      for (const gw of Object.keys(this.matchChunks)) {
        for (const m of (this.matchChunks[gw] || [])) {
          for (const side of ['home','away']) {
            const s = m[side];
            if (s?.sub?.formation) { src.sub++; continue; }
            const fromNarr = stripDashes(this.extractFormation(m.reportNarrative, s?.club));
            if (fromNarr) { src.narr++; continue; }
            if (!m.ratings?.[side]) { src.noRatings++; continue; }
            const fromRatings = stripDashes(this.deriveFormation(m.ratings[side]));
            if (fromRatings) { src.derived++; } else { src.none++; }
          }
        }
      }
      this.fmDiag = src;
      this.fmDiagRunning = false;
    },

    async loadSubsDb() {
      if (this.subsDbLoading) return;
      this.subsDbLoading = true;
      this.subsDbMsg = 'Checking cache…';
      const raw = await serverCacheGet('sf_submissions_db_v1');
      if (raw) {
        this.subsDb = await parseAsync(raw);
        this.subsDbLoaded = true;
        this.subsDbLoading = false;
        const d = this.subsDb.builtAt ? new Date(this.subsDb.builtAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '';
        this.subsDbMsg = `Loaded from cache · ${d}`;
        return;
      }
      await this.buildSubsDb();
    },

    async buildSubsDb() {
      this.subsDbLoading = true;
      this.subsDbLoaded = false;
      const clubList = [...new Set((this.allPlayers || []).map(p => p.Club).filter(Boolean))].sort();
      const db = {};
      for (let i = 0; i < clubList.length; i++) {
        const club = clubList[i];
        this.subsDbProgress = Math.round(i / clubList.length * 100);
        this.subsDbMsg = `${i+1}/${clubList.length} · ${club}`;
        try {
          const d = await fetch(`${API}/submissions?club=${encodeURIComponent(club)}&limit=200`).then(r => r.json());
          const byGw = {};
          for (const s of (d?.items || [])) {
            const key = s.gameweek ?? 'upcoming';
            if (!byGw[key] || s.createdAt > byGw[key].createdAt) byGw[key] = s;
          }
          db[club] = byGw;
        } catch(e) { db[club] = {}; }
        if (i % 8 === 0) await new Promise(r => setTimeout(r, 20));
      }
      const result = { clubs: db, builtAt: new Date().toISOString() };
      await serverCacheSet('sf_submissions_db_v1', JSON.stringify(result));
      this.subsDb = result;
      this.subsDbLoaded = true;
      this.subsDbLoading = false;
      this.subsDbMsg = `Built · ${clubList.length} clubs`;
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
    this.stopNegosPolling();
    if (this._clockInterval) clearInterval(this._clockInterval);
    if (this._hashHandler) window.removeEventListener('hashchange', this._hashHandler);
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
    // Restore last viewed club only if the active tab is clubs
    try {
      const lastClub = localStorage.getItem('sf_last_club');
      if (lastClub && this.activeTab === 'clubs') setTimeout(() => this.openClubDetail(lastClub), 800);
    } catch(e) {}
    // Background auto-refresh: check every 8 min (9am–11pm EST), incremental
    this.youthBgInterval = setInterval(() => { this.bgAutoRefresh(); }, 8 * 60 * 1000);
    // Clock tick for auction countdown
    this._clockInterval = setInterval(() => { this._nowMs = Date.now(); }, 60000);
    // Start polling if already on espionage tab
    if (this.activeTab === 'espionage') this.startNegosPolling();
    // Sync activeTab when user pastes a hash URL or navigates via browser
    this._hashHandler = () => {
      const h = location.hash.slice(1);
      if (h && this.tabs.some(t => t.id === h)) this.activeTab = h;
    };
    window.addEventListener('hashchange', this._hashHandler);
  }
}).mount('#app');
