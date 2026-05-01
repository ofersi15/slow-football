import { API, MY_CLUB, FORMATIONS, SUBMISSIONS_CACHE_KEY, SUBMISSIONS_LS_KEY } from '../constants.js'
import { serverCacheGet, serverCacheSet, parseAsync, stringifyAsync } from '../cache.js'

export const clubsMethods = {
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
      if (!name || typeof name !== 'string') return null;
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
        for (const s of Object.values(byGw)) this._normalizeSubs(s);
        this.submissionsCache[club] = byGw;
      } catch(e) { this.submissionsCache[club] = {}; }
    },

    _normalizeSubs(s) {
      if (!Array.isArray(s.subs)) return;
      s.subs = s.subs.map(sub => {
        if (typeof sub === 'string') { try { sub = JSON.parse(sub); } catch(e) {} }
        if (typeof sub?.name === 'string' && sub.name.trimStart().startsWith('{')) {
          try { const parsed = JSON.parse(sub.name); sub = { ...parsed, name: parsed.name || '' }; } catch(e) {}
        }
        return sub;
      }).filter(sub => typeof sub === 'object' && sub !== null && (sub.name || sub.off));
      const bestByOff = new Map();
      for (const sub of s.subs) {
        if (!sub.off) continue;
        const prev = bestByOff.get(sub.off);
        if (!prev || (!prev.name && sub.name)) bestByOff.set(sub.off, sub);
      }
      s.subs = s.subs.filter(sub => !sub.off || bestByOff.get(sub.off) === sub);
    },
    async loadCachedSubmissions() {
      // 1. localStorage first (no TTL — persists forever across sessions)
      try {
        const lsRaw = localStorage.getItem(SUBMISSIONS_LS_KEY);
        if (lsRaw) {
          const lsData = JSON.parse(lsRaw);
          for (const [club, byGw] of Object.entries(lsData?.clubs || {})) {
            if (!this.submissionsCache[club]) {
              for (const s of Object.values(byGw)) this._normalizeSubs(s);
              this.submissionsCache[club] = byGw;
            }
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
      this.showRawSub = false;
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
}
