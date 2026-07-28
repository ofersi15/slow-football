import { createApp, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { API, MY_CLUB, PROXY_TOKEN_URL, ALL_LEAGUES, AI_CLUBS, ALL_POSITIONS, OUTFIELD_POSITIONS, PAGE_SIZE, PLAYERS_CACHE_KEY, STATS_CACHE_KEY, PLAYERS_CACHE_TTL, SUBMISSIONS_CACHE_KEY, SUBMISSIONS_LS_KEY, GAME_ATTRS, GAME_ATTR_LABELS, FORMATIONS, FORMATION_SLOT_POS, POS_ORDER, POS_COLORS, SLOT_COMPAT, SLOT_ATTRS, DEFAULT_MENTAL_ATTRS, FULL_ATTR_KEYS, GAME_START, WEEK_MS } from './src/constants.js'
import { calcGameRating, calcWeightedRating, calcEstValue, fmtVal, fmtWage, fmtDiff, gameWeekNow, playerArrivalWeeks, computeTraits, computeBonds, computeClubChem, computeDislikes, renderMarkdown } from './src/utils.js'
import { parseAsync, stringifyAsync, getAuthToken, authHeaders, SF_CACHE_BASE, SF_WORKER_BASE, serverCacheGet, serverCacheSet, serverCacheDelete } from './src/cache.js'
import { youthMethods } from './src/methods/youth.js'
import { matchesMethods } from './src/methods/matches.js'
import { espionageMethods } from './src/methods/espionage.js'
import { clubsMethods } from './src/methods/clubs.js'
import { dataMethods } from './src/methods/data.js'
import { helperMethods } from './src/methods/helpers.js'
import { assistantMethods } from './src/methods/assistant.js'
import { matchesComputed } from './src/computed/matches.js'
import { squadComputed } from './src/computed/squad.js'
import { espionageComputed } from './src/computed/espionage.js'
import { modalComputed } from './src/computed/modal.js'
import { scoutComputed } from './src/computed/scout.js'
import { youthComputed } from './src/computed/youth.js'
import { clubsComputed } from './src/computed/clubs.js'

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
      transferListedOnly: false, injuredOnly: false, dislikesOnly: false, hideRetiring: true, traitFilter: '',
      allDeals: [],
      ageGroupFilter: 'all', // 'all' | 'u21' | 'u20'
      sortCol: '_gameRating', sortDir: -1, page: 0,
      // Per-position rating filters — each pos has its own min threshold
      posRatingFilters: {GK:60,FB:60,CB:60,DM:60,AM:60,WF:60,CF:60},
      posRatingMax: 99,            // global max rating cap
      posRatingUseWeighted: false, // filter by weighted rating instead of game rating
      posRatingsOpen: false,
      // Filters panel stacks above the table on mobile (not a side column), so default it
      // closed on narrow screens or it fills the whole viewport before the player table.
      scoutFiltersOpen: typeof window === 'undefined' || window.innerWidth > 768,
      // Stats enrichment state
      statsEnriching: false, statsProgress: 0, statsEnriched: false,
      activeTab: (() => {
        const hash = location.hash.slice(1);
        const validIds = ['scout','squad','moneyball','analysis','youth','club','clubs','espionage','matches','assistant'];
        if (hash && validIds.includes(hash)) return hash;
        return localStorage.getItem('sf_activeTab') || 'squad';
      })(),
      tabs: [{id:'scout',label:'🔍 Scout'},{id:'squad',label:'🛡 My Squad'},{id:'moneyball',label:'📊 Moneyball'},{id:'analysis',label:'🔬 Analysis'},{id:'youth',label:'🌱 Youth'},{id:'club',label:'🏟 My Club'},{id:'clubs',label:'🏟 Clubs'},{id:'espionage',label:'💰 Transfers'},{id:'matches',label:'📺 Matches'},{id:'assistant',label:'🤖 Assistant'}],
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
      // Youth tab state
      youthLoaded: false, youthLoading: false, youthMsg: '',
      youthCap: {}, youthScouts: [], youthAcademy: [], youthFacilities: {}, youthStaff: {},
      youthRejected: [], youthHistPos: '', youthHistSort: 'date', youthSubTab: 'scouts',
      // All-clubs history state
      youthHistLoading: false, youthHistLoaded: false, youthHistMsg: '', youthHistProgress: 0,
      youthHistCacheDate: null, youthAllHistoryJobs: [], youthClubInfoMap: {},
      youthHistSearch: '', youthHistClubFilter: '', youthHistStatusFilter: '', youthHistPage: 0,
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
      matchArchiveFmSrc: null,
      clubLineups: {}, clubLineupsLoaded: false,
      mySubmissions: [], mySubmissionLoading: false,
      submissionsCache: {},  // club → { gw: {formation, ...} }
      espionageSubmissions: {},  // club → latest submission object
      selectedClubName: null,
      selectedClubSubTab: 'xi',  // 'xi' | 'history' | 'transfers'
      selectedClubMatchXi: null, // fallback last-match XI when no submission
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
      // Assistant tab (AI chat)
      chatMessages: [], chatInput: '', chatLoading: false, chatError: '',
      chatAttachments: [], chatSessions: [], activeChatSessionId: null,
      renamingSessionId: null, renameDraft: '',
      assistantDockOpen: (() => { try { return localStorage.getItem('sf_assistant_dock_open') === '1'; } catch(e) { return false; } })(),
      // Defaults to expanded on wide screens (plenty of room), collapsed on narrow ones —
      // but once the user explicitly toggles it, that choice sticks regardless of width.
      assistantSidebarExpanded: (() => {
        try { const v = localStorage.getItem('sf_assistant_sidebar_expanded'); if (v !== null) return v === '1'; } catch(e) {}
        return typeof window !== 'undefined' && window.innerWidth >= 1300;
      })(),
      assistantDockListOpen: false,
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
        {key:'_bestPos',label:'Best',w:40,full:'Best Position — position (incl. alternates) where this player rates highest'},
        {key:'_bestPosRating',label:'BstRtg',w:52,full:'Rating at their Best Position'},
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
        {key:'_gc',label:'GC',w:32,full:'Goal Contributions (Goals + Assists)',group:'stats'},
        {key:'_gDiff',label:'G-xG',w:44,full:'Goals minus Expected Goals — finishing performance vs expectation',group:'stats'},
        {key:'_aDiff',label:'A-xA',w:44,full:'Assists minus Expected Assists — creativity performance vs expectation',group:'stats'},
        {key:'_g90',label:'G/90',w:38,full:'Goals per 90 minutes (min 30 mins played)',group:'per90'},
        {key:'_a90',label:'A/90',w:38,full:'Assists per 90 minutes (min 30 mins played)',group:'per90'},
        {key:'_xG90',label:'xG/90',w:44,full:'Expected Goals per 90 minutes',group:'per90'},
        {key:'_xA90',label:'xA/90',w:44,full:'Expected Assists per 90 minutes',group:'per90'},
        {key:'_gc90',label:'GC/90',w:44,full:'Goal Contributions per 90 minutes',group:'per90'},
        {key:'_gDiff90',label:'G-xG/90',w:52,full:'Goals minus Expected Goals, per 90 minutes',group:'per90'},
        {key:'_aDiff90',label:'A-xA/90',w:52,full:'Assists minus Expected Assists, per 90 minutes',group:'per90'},
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
    ...matchesComputed,
    ...squadComputed,
    ...espionageComputed,
    ...modalComputed,
    ...scoutComputed,
    ...youthComputed,
    ...clubsComputed,
  },

  watch: {
    filteredPlayers() { this.page = 0; },
    youthHistFiltered() { this.youthHistPage = 0; },
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
    assistantDockOpen: {
      immediate: true,
      handler(open) {
        // On mobile the dock becomes a full-screen fixed overlay (see .assistant-dock in the
        // 768px media query) — without this, the tab underneath still scrolls with it.
        document.body.style.overflow = (open && window.innerWidth <= 768) ? 'hidden' : '';
      },
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
    ...dataMethods,
    ...helperMethods,
    ...assistantMethods,
    fmtVal,fmtWage,fmtDiff,renderMarkdown,
    async clearSiteDataAndReload() {
      // Best-effort wipe of everything JS is allowed to touch for this origin —
      // mirrors what Chrome's "Clear cookies and site data" does, which fixes
      // the case where a full/corrupted storage quota makes localStorage writes fail silently.
      try { localStorage.clear(); } catch(e) {}
      try { sessionStorage.clear(); } catch(e) {}
      try {
        document.cookie.split(';').forEach(c => {
          const name = c.split('=')[0].trim();
          if (name) document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });
      } catch(e) {}
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        }
      } catch(e) {}
      try {
        if ('indexedDB' in window && indexedDB.databases) {
          const dbs = await indexedDB.databases();
          await Promise.all(dbs.map(db => db.name && new Promise(res => {
            const req = indexedDB.deleteDatabase(db.name);
            req.onsuccess = req.onerror = req.onblocked = res;
          })));
        }
      } catch(e) {}
      try {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map(r => r.unregister()));
        }
      } catch(e) {}
      location.reload();
    },
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
    playerBondCount(player) {
      if (!player?.Player || !player?.Club) return null;
      const squad = this.allPlayers.filter(p => p.Club === player.Club);
      return computeBonds(player, squad, this.allDeals).length;
    },
    bondColor(count) {
      if (count == null) return '#6e7681';
      if (count >= 5) return '#3fb950';
      if (count >= 2) return '#d29922';
      return '#8b949e';
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
    this.loadChatHistory();
    // Restore last viewed club only if the active tab is clubs
    try {
      const lastClub = localStorage.getItem('sf_last_club');
      if (lastClub && this.activeTab === 'clubs') {
        setTimeout(() => this.openClubDetail(lastClub).catch(() => {
          this.selectedClubName = null;
          try { localStorage.removeItem('sf_last_club'); } catch(e) {}
        }), 800);
      }
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
