import { API } from '../constants.js'
import { serverCacheGet, serverCacheSet, parseAsync } from '../cache.js'
import { fmtSubStatus, fmtNegoDate } from '../utils.js'

export const espionageMethods = {
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
    // Key attributes to show for each zone assignment (no Strength in this game)
    playerFitPct(name) {
      const p = this.xiPlayerInfo(name);
      if (!p) return null;
      if (p.fitnessPct != null) return p.fitnessPct;
      if (p.Fitness != null) return p.Fitness;
      return null;
    },
    fitColor(pct) {
      return pct == null ? '#8b949e' : pct >= 85 ? '#7ee787' : pct >= 70 ? '#ffa657' : '#ff7b72';
    },
    roleAttrs(role) {
      const map = {
        captain:  ['Mentality','Leadership'],
        penalty:  ['Shooting','Mentality'],
        freekick: ['Passing','Vision'],
        corner:   ['Passing','Vision'],
      };
      return map[(role||'').toLowerCase()] || [];
    },
    spZoneAttrs(side, zoneKey) {
      if (side === 'taker') return ['Passing', 'Vision'];
      const map = {
        atk: {
          nearPost:    ['Heading', 'Speed'],
          farPost:     ['Heading', 'Stamina'],
          penaltySpot: ['Heading', 'Shooting'],
          blockade:    ['Heading', 'Tackling'],
          edgeOfBox:   ['Shooting', 'Vision'],
          shortCorner: ['Passing', 'Dribbling'],
          holdBack:    ['Speed', 'Tackling'],
        },
        def: {
          nearPost:      ['Heading', 'Speed'],
          farPost:       ['Heading', 'Marking'],
          sixYardAnchor: ['Heading', 'Marking'],
          penaltySpot:   ['Heading', 'Marking'],
          edgeOfBox:     ['Speed', 'Marking'],
          counterRunner: ['Speed', 'Stamina'],
        },
      };
      return map[side]?.[zoneKey] || ['Heading'];
    },
    // Returns true if this zone should be highlighted for the given delivery type
    spDeliveryHighlight(delivery, zoneKey) {
      const map = {
        'Inswinger':    'farPost',
        'Outswinger':   'nearPost',
        'Driven':       'penaltySpot',
        'Short Corner': 'shortCorner',
      };
      return map[delivery] === zoneKey;
    },
    // Color an attribute value: green ≥80, orange ≥70, white otherwise
    spAttrColor(v) {
      const n = parseInt(v, 10);
      return !n ? '#8b949e' : n >= 80 ? '#3fb950' : n >= 70 ? '#ffa657' : '#e6edf3';
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
    fmtSubStatus,
    fmtNegoDate,
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
}
