import { API, MY_CLUB, FULL_ATTR_KEYS, ATTR_KEYS_ENR, PLAYER_MERGE_ATTRS, FACILITY_UPGRADE_COST, FACILITY_MAINTENANCE_RATES, FACILITY_LEVEL_FACTS, FACILITY_MAX_LEVEL_CONFIRMED, FACILITY_MAX_LEVEL_UNCERTAIN } from '../constants.js'
import { serverCacheGet, serverCacheSet } from '../cache.js'

export const youthMethods = {
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
          let _raw = await serverCacheGet(CACHE_KEY);
          if (!_raw) _raw = localStorage.getItem(CACHE_KEY);
          const cached = _raw ? JSON.parse(_raw) : null;
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
        serverCacheSet(CACHE_KEY, JSON.stringify(newCache));
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
        const ATTR_KEYS = FULL_ATTR_KEYS;
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
          const MERGE = PLAYER_MERGE_ATTRS;
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
          serverCacheSet(CACHE_KEY, JSON.stringify(newCache));
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

    async loadYouthHistory(forceRefresh=false) {
      const HIST_CACHE_KEY = 'sf_youth_hist_v2';
      const HIST_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

      // Check server cache first, fall back to localStorage
      if (!forceRefresh) {
        try {
          let raw = await serverCacheGet(HIST_CACHE_KEY);
          if (!raw) raw = localStorage.getItem(HIST_CACHE_KEY);
          if (raw) {
            const {data, ts} = JSON.parse(raw);
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
        const ATTR_KEYS = FULL_ATTR_KEYS;
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
          const MERGE = PLAYER_MERGE_ATTRS;
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

        const payload = JSON.stringify({ data: {jobs: allJobs, clubInfo: clubInfoMap}, ts: Date.now() });
        try { localStorage.setItem(HIST_CACHE_KEY, payload); } catch(e) {}
        serverCacheSet(HIST_CACHE_KEY, payload).catch(()=>{});

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
    // Rebuilt 2026-07-31 from real, live-confirmed data (see FACILITY_LEVEL_FACTS/FACILITY_MAINTENANCE_RATES
    // in constants.js) — the old version asserted per-level XP/quality/academy bonuses that turned out to be
    // staff-driven, not facility-level-driven (a level-3 club with no coach hired shows the same 0% as level 1).
    // Returns null where a level's real value has never been observed (never a guessed number).
    _fmtK(v) {
      const k = v / 1000;
      return (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)) + 'k';
    },
    facRef(key, lv) {
      lv = Math.max(1, Math.min(5, lv || 1));
      if (key === 'stadium') {
        const cap = FACILITY_LEVEL_FACTS.stadium.capacity[lv];
        return cap ? cap.toLocaleString() + ' seats' : 'not yet observed';
      }
      if (key === 'training') {
        const r = FACILITY_MAINTENANCE_RATES.training[lv];
        return `£${this._fmtK(r[0])}→£${this._fmtK(r[r.length-1])}/player upkeep`;
      }
      if (key === 'academy') {
        const r = FACILITY_MAINTENANCE_RATES.academy[lv];
        return `£${this._fmtK(r[0])}→£${this._fmtK(r[r.length-1])}/player upkeep`;
      }
      if (key === 'scouting') {
        const slots = FACILITY_LEVEL_FACTS.scouting.maxActiveJobs[lv];
        const upkeep = FACILITY_MAINTENANCE_RATES.scouting[lv];
        return `${slots} job slot${slots===1?'':'s'} · £${this._fmtK(upkeep)}/wk`;
      }
      if (key === 'medical') {
        const inj = FACILITY_LEVEL_FACTS.medical.injuryMult[lv];
        const rec = FACILITY_LEVEL_FACTS.medical.recoveryMult[lv];
        if (inj == null) return 'not yet observed';
        return `${inj===1?'Base':'-'+Math.round((1-inj)*100)+'% inj'} / +${Math.round((rec-1)*100)}% rehab`;
      }
      if (key === 'analytics') {
        const fms = {1:'442 433 4231 532 343',2:'+352 541 4411',3:'+4321 451',4:'+4141 442D 3421',5:'+3241 4222 4132'};
        return fms[lv];
      }
      return '';
    },
    facUpgradeCost(key, toLevel) {
      return FACILITY_UPGRADE_COST[key]?.[toLevel] ?? null;
    },
    facMaxLevelUncertain(key) {
      return FACILITY_MAX_LEVEL_UNCERTAIN.has(key);
    },
    facScoutSlots(lv) {
      return FACILITY_LEVEL_FACTS.scouting.maxActiveJobs[Math.max(1, Math.min(5, lv || 1))];
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

    // ── Club tab — Finance ──
    // Real endpoints scraped from the live app bundle (not documented in API.md):
    //   /office/overview       — weekly wages/sponsorship/revenue/maintenance breakdown, stadium capacity/price/demand + next-fixture ticket preview
    //   /office/sponsors       — active shirt/stadium/kit sponsor deals (weekly value, term)
    //   /budgets/season-income — season-to-date income totals by category
    async loadClubFinance(forceRefresh=false) {
      this.financeLoading = true; this.financeMsg = 'Loading finance data…';
      try {
        const enc = encodeURIComponent(MY_CLUB);
        const CACHE_KEY = 'sf_club_finance_v1';
        const TTL = 20 * 60 * 1000; // 20 min
        if (!forceRefresh) {
          try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
            if (cached) {
              this.clubFinance = cached.overview;
              this.clubSponsors = cached.sponsors;
              this.clubSeasonIncome = cached.seasonIncome;
              this.financeLoaded = true; this.financeLoading = false; this.financeMsg = '';
              if (Date.now() - cached.savedAt > TTL) { setTimeout(() => this.loadClubFinance(true), 100); }
              return;
            }
          } catch(e) {}
        }
        const [overview, sponsors, seasonIncome] = await Promise.all([
          fetch(`${API}/office/overview?club=${enc}`).then(r=>r.json()).catch(()=>null),
          fetch(`${API}/office/sponsors?club=${enc}`).then(r=>r.json()).catch(()=>null),
          fetch(`${API}/budgets/season-income?club=${enc}`).then(r=>r.json()).catch(()=>null),
        ]);
        this.clubFinance = overview;
        this.clubSponsors = sponsors;
        this.clubSeasonIncome = seasonIncome;
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            savedAt: Date.now(), overview, sponsors, seasonIncome,
          }));
        } catch(e) {}
        this.financeLoaded = true; this.financeMsg = '';
      } catch(e) {
        this.financeMsg = 'Error: ' + e.message;
      } finally { this.financeLoading = false; }
    },
    toggleFinanceCard(key) {
      this.financeCollapsed = { ...this.financeCollapsed, [key]: !this.financeCollapsed[key] };
      try { localStorage.setItem('sf_finance_collapsed_v1', JSON.stringify(this.financeCollapsed)); } catch(e) {}
    },
    loadFinanceCollapsed() {
      try {
        const saved = JSON.parse(localStorage.getItem('sf_finance_collapsed_v1')||'null');
        if (saved) this.financeCollapsed = saved;
      } catch(e) {}
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
}
