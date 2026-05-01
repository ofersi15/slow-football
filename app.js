import { createApp, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { API, MY_CLUB, PROXY_TOKEN_URL, ALL_LEAGUES, AI_CLUBS, ALL_POSITIONS, OUTFIELD_POSITIONS, PAGE_SIZE, TACTICS_CACHE_KEY, TACTICS_CACHE_TTL, PLAYERS_CACHE_KEY, STATS_CACHE_KEY, PLAYERS_CACHE_TTL, SUBMISSIONS_CACHE_KEY, SUBMISSIONS_CACHE_TTL, SUBMISSIONS_LS_KEY, GAME_ATTRS, GAME_ATTR_LABELS, FORMATIONS, FORMATION_SLOT_POS, MAIN_ATTR, POS_ORDER, POS_COLORS, SLOT_COMPAT, SLOT_ATTRS, DEFAULT_MENTAL_ATTRS, FULL_ATTR_KEYS, GAME_START, WEEK_MS } from './src/constants.js'
import { buildSlotKeys, calcGameRating, calcWeightedRating, calcEstValue, fmtVal, fmtWage, gameWeekNow, playerArrivalWeeks, computeTraits, computeBonds, computeClubChem } from './src/utils.js'
import { parseAsync, stringifyAsync, getAuthToken, authHeaders, SF_CACHE_BASE, SF_WORKER_BASE, serverCacheGet, serverCacheSet, serverCacheDelete } from './src/cache.js'
import { youthMethods } from './src/methods/youth.js'
import { matchesMethods } from './src/methods/matches.js'
import { espionageMethods } from './src/methods/espionage.js'
import { clubsMethods } from './src/methods/clubs.js'

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
      transferListedOnly: false, injuredOnly: false, hideRetiring: true, traitFilter: '',
      allDeals: [],
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
      showRawSub: false,
      clubSquadSort: 'pos',
      hoveredPitchPlayer: null,
      spHoveredPlayer: null,   // { name, side, zoneKey } for set-piece zone hover
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
      selectedPlayer: null, selectedPlayerStats: null, selectedPlayerStatsTab: 'career', selectedPlayerStatsLoading: false, playerModalTab: 'overview',
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
    selectedPlayerTraits() {
      return this.selectedPlayer ? computeTraits(this.selectedPlayer) : [];
    },
    selectedPlayerBonds() {
      if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
      const squad = this.allPlayers.filter(p => p.Club === this.selectedPlayer.Club);
      return computeBonds(this.selectedPlayer, squad, this.allDeals);
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
        // Trait filter
        if (this.traitFilter) {
          const tNames = computeTraits(p).map(t => t.n);
          if (!tNames.includes(this.traitFilter)) return false;
        }
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
    ...youthMethods,
    ...matchesMethods,
    ...espionageMethods,
    ...clubsMethods,
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
    clubChemScore(clubName) {
      const squad = this.allPlayers.filter(p => p.Club === clubName);
      return computeClubChem(squad, this.allDeals);
    },
    chemColor(score) {
      if (score === null || score === undefined) return '#6e7681';
      if (score >= 70) return '#3fb950';
      if (score >= 40) return '#d29922';
      return '#f85149';
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
      this.selectedPlayerStats=null; this.selectedPlayerStatsTab='career'; this.selectedPlayerStatsLoading=true; this.playerModalTab='overview';
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
      serverCacheDelete('sf_squads_raw_v1');  // force live per-club fetch, not stale cron cache
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
          this.allDeals = txRes.deals || [];
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
