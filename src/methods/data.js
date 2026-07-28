import { API, MY_CLUB, ALL_LEAGUES, AI_CLUBS, PLAYERS_CACHE_KEY, PLAYERS_CACHE_TTL, STATS_CACHE_KEY, STATS_CACHE_TTL, TACTICS_CACHE_KEY, TACTICS_CACHE_TTL, DEFAULT_MENTAL_ATTRS, FULL_ATTR_KEYS, OUTFIELD_POSITIONS } from '../constants.js'
import { parseAsync, stringifyAsync, serverCacheGet, serverCacheSet, serverCacheDelete } from '../cache.js'
import { calcGameRating, calcWeightedRating, calcEstValue, fmtVal } from '../utils.js'

export const dataMethods = {
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

    async loadData() {
      // Managers can change independent of the (up to 6h stale) players cache, so always
      // refresh this in the background regardless of which cache path below is taken.
      this.refreshManagerMap();
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
              if (p.Position !== 'GK') {
                let pos2 = null, pos2Rtg = -1;
                for (const pos of OUTFIELD_POSITIONS) {
                  if (pos === p.Position) continue;
                  const rtg = calcGameRating(p, pos);
                  if (rtg != null && rtg > pos2Rtg) { pos2 = pos; pos2Rtg = rtg; }
                }
                if (pos2Rtg > 0) { p._pos2 = pos2; p._pos2Rating = Math.round(pos2Rtg * 10) / 10; }
              }
              if (p._pos2Rating != null && p._pos2Rating > (p._gameRating||0)) {
                p._bestPos = p._pos2; p._bestPosRating = p._pos2Rating;
              } else {
                p._bestPos = p.Position; p._bestPosRating = p._gameRating;
              }
              // Recompute per-90 stats in case cache predates this feature
              if (p._g90 === undefined) {
                const mins=p.Minutes||0;
                p._g90=mins>=30?Math.round((p.Goals||0)/mins*90*100)/100:null;
                p._a90=mins>=30?Math.round((p.Assists||0)/mins*90*100)/100:null;
                p._xG90=mins>=30&&p.xG!=null?Math.round(p.xG/mins*90*100)/100:null;
                p._xA90=mins>=30&&p.xA!=null?Math.round(p.xA/mins*90*100)/100:null;
              }
              // Recompute goal-contribution stats in case cache predates this feature
              if (p._gc === undefined) {
                const mins=p.Minutes||0;
                p._gc=(p.Goals||0)+(p.Assists||0);
                p._gc90=mins>=30?Math.round(p._gc/mins*90*100)/100:null;
                p._gDiff=p.xG!=null?Math.round(((p.Goals||0)-p.xG)*100)/100:null;
                p._aDiff=p.xA!=null?Math.round(((p.Assists||0)-p.xA)*100)/100:null;
                p._gDiff90=mins>=30&&p.xG!=null?Math.round(((p.Goals||0)-p.xG)/mins*90*100)/100:null;
                p._aDiff90=mins>=30&&p.xA!=null?Math.round(((p.Assists||0)-p.xA)/mins*90*100)/100:null;
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
            // Pre-warm other tabs in background so they load instantly when opened
            setTimeout(() => { if (!this.youthLoaded && !this.youthLoading) this.loadYouth(); }, 3000);
            setTimeout(() => { if (!this.espionageLoaded && !this.espionageLoading) this.loadEspionage(); }, 7000);
            return;
          }
        }
      } catch(e) { console.warn('Cache read failed:', e); }
      // No cache — full foreground fetch
      await this.fetchFreshData(true);
    },

    async checkTacticsCache() {
      try {
        let cached = await serverCacheGet(TACTICS_CACHE_KEY);
        if (!cached) cached = localStorage.getItem(TACTICS_CACHE_KEY);
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
                const merged = {...p, ...s};
                // Stats cache may predate goal-contribution fields — recompute from the freshly merged Goals/Assists/xG/xA
                if (merged._gc === undefined) {
                  const mins = merged.Minutes||0;
                  merged._gc = (merged.Goals||0)+(merged.Assists||0);
                  merged._gc90 = mins>=30 ? Math.round(merged._gc/mins*90*100)/100 : null;
                  merged._gDiff = merged.xG!=null ? Math.round(((merged.Goals||0)-merged.xG)*100)/100 : null;
                  merged._aDiff = merged.xA!=null ? Math.round(((merged.Assists||0)-merged.xA)*100)/100 : null;
                  merged._gDiff90 = mins>=30 && merged.xG!=null ? Math.round(((merged.Goals||0)-merged.xG)/mins*90*100)/100 : null;
                  merged._aDiff90 = mins>=30 && merged.xA!=null ? Math.round(((merged.Assists||0)-merged.xA)/mins*90*100)/100 : null;
                }
                return Object.freeze(merged);
              });
              if (applied > 0) {
                await new Promise(r => requestAnimationFrame(r));
                this.allPlayers = newPlayers;
                this.statsEnriched = true;
                // Background refresh if >6h old — but use forceRefresh=true to skip cache
                const age = Date.now() - ts;
                if (age > STATS_CACHE_TTL) { setTimeout(() => this.enrichStats(true), 3000); }
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
              _gc: (s.goals||0)+(s.assists||0),
              _gc90: mins>=30 ? Math.round(((s.goals||0)+(s.assists||0))/mins*90*100)/100 : null,
              _gDiff: s.xG!=null ? Math.round(((s.goals||0)-s.xG)*100)/100 : null,
              _aDiff: s.xA!=null ? Math.round(((s.assists||0)-s.xA)*100)/100 : null,
              _gDiff90: mins>=30 && s.xG!=null ? Math.round(((s.goals||0)-s.xG)/mins*90*100)/100 : null,
              _aDiff90: mins>=30 && s.xA!=null ? Math.round(((s.assists||0)-s.xA)/mins*90*100)/100 : null,
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

    // Fetch /api/managers and rebuild managerMap + managedSet — cheap enough to call on every load
    async refreshManagerMap() {
      try {
        const managersRes = await fetch(`${API}/managers`).then(r=>r.json());
        const activeMgrs = (managersRes.managers||[]).filter(m=>m.club&&!m.username?.includes('~deleted~'));
        const managerMap = {};
        activeMgrs.forEach(m => { managerMap[m.club] = m.name || m.username || '?'; });
        this.managerMap = managerMap;
        this.managedSet = new Set(activeMgrs.map(m=>m.club));
      } catch(e) {}
    },

    async fetchFreshData(foreground=true) {
      try {
        if (foreground) { this.loadMsg='Fetching leagues & managers…'; this.progress=5; }
        const [tablesRes, , clubsRes] = await Promise.all([
          fetch(`${API}/tables/from-fixtures`).then(r=>r.json()),
          this.refreshManagerMap(),
          fetch(`${API}/admin/squads/public/clubs`).then(r=>r.json()),
        ]);
        this.leagueTables = tablesRes;
        this.asOfWeek = tablesRes.meta?.asOfWeek||'?';

        const leagueMap = {};
        ALL_LEAGUES.forEach(l=>(tablesRes[l]||[]).forEach(t=>{leagueMap[t.Team]=l;}));
        const managedClubs = this.managedSet;

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
            if (p.Position !== 'GK') {
              let pos2 = null, pos2Rtg = -1;
              for (const pos of OUTFIELD_POSITIONS) {
                if (pos === p.Position) continue;
                const rtg = calcGameRating(p, pos);
                if (rtg != null && rtg > pos2Rtg) { pos2 = pos; pos2Rtg = rtg; }
              }
              if (pos2Rtg > 0) { p._pos2 = pos2; p._pos2Rating = Math.round(pos2Rtg * 10) / 10; }
            }
            if (p._pos2Rating != null && p._pos2Rating > (p._gameRating||0)) {
              p._bestPos = p._pos2; p._bestPosRating = p._pos2Rating;
            } else {
              p._bestPos = p.Position; p._bestPosRating = p._gameRating;
            }
            const mins=p.Minutes||0;
            p._g90=mins>=30?Math.round((p.Goals||0)/mins*90*100)/100:null;
            p._a90=mins>=30?Math.round((p.Assists||0)/mins*90*100)/100:null;
            p._xG90=mins>=30&&p.xG!=null?Math.round(p.xG/mins*90*100)/100:null;
            p._xA90=mins>=30&&p.xA!=null?Math.round(p.xA/mins*90*100)/100:null;
            p._gc=(p.Goals||0)+(p.Assists||0);
            p._gc90=mins>=30?Math.round(p._gc/mins*90*100)/100:null;
            p._gDiff=p.xG!=null?Math.round(((p.Goals||0)-p.xG)*100)/100:null;
            p._aDiff=p.xA!=null?Math.round(((p.Assists||0)-p.xA)*100)/100:null;
            p._gDiff90=mins>=30&&p.xG!=null?Math.round(((p.Goals||0)-p.xG)/mins*90*100)/100:null;
            p._aDiff90=mins>=30&&p.xA!=null?Math.round(((p.Assists||0)-p.xA)/mins*90*100)/100:null;
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
        // Pre-warm other tabs in background so they load instantly when opened
        if (foreground) {
          setTimeout(() => { if (!this.youthLoaded && !this.youthLoading) this.loadYouth(); }, 3000);
          setTimeout(() => { if (!this.espionageLoaded && !this.espionageLoading) this.loadEspionage(); }, 7000);
        }

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
      // Try cache first (KV then localStorage fallback)
      if (!forceRefresh) {
        try {
          let cached = await serverCacheGet(TACTICS_CACHE_KEY);
          if (!cached) cached = localStorage.getItem(TACTICS_CACHE_KEY);
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
      const tacticsStr = JSON.stringify({data,ts});
      serverCacheSet(TACTICS_CACHE_KEY, tacticsStr);
      try { localStorage.setItem(TACTICS_CACHE_KEY, tacticsStr); } catch(e){}
      this.tacticsMsg='Done!'; this.tacticsProgress=100;
      this.tacticsLoading=false; this.tacticsLoaded=true;
    },
}
