import { API } from '../constants.js'
import { SF_CACHE_BASE, parseAsync, serverCacheGet, serverCacheSet } from '../cache.js'
import { calcGameRating, stripDashes } from '../utils.js'

export const matchesMethods = {
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
}
