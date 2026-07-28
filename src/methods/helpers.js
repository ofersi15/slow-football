import { API, MY_CLUB, GAME_ATTRS } from '../constants.js'
import { SF_WORKER_BASE, getAuthToken } from '../cache.js'

export const helperMethods = {
    getYouthAttr(p, attr) {
      if (p[attr] != null && p[attr] > 0) return p[attr];
      if (p.stats && p.stats[attr] != null && p.stats[attr] > 0) return p.stats[attr];
      return null;
    },

    scoutPosRating(player, pos) {
      const attrs = GAME_ATTRS[pos];
      if (!attrs) return null;
      const vals = attrs.map(a => this.getYouthAttr(player, a)).filter(v => v != null);
      if (!vals.length) return null;
      return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length * 10) / 10;
    },

    scoutBestPos(player) {
      let best = null, bestRtg = -1;
      for (const pos of Object.keys(GAME_ATTRS)) {
        const rtg = this.scoutPosRating(player, pos);
        if (rtg != null && rtg > bestRtg) { bestRtg = rtg; best = pos; }
      }
      return best ? { pos: best, rating: bestRtg } : null;
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
      const keyMap = { name:'name_a', pos:'pos_a', age:'age_a', value:'value_d', buyNow:'buynow_d', date:'date', status:'status_a', sclub:'sclub_a', bestpos:'bestpos_d', men:'men_d', wr:'wr_d', potential:'potential_d' };
      const togMap = { name_a:'name_d', name_d:'name_a', pos_a:'pos_d', pos_d:'pos_a', age_a:'age_d', age_d:'age_a', value_d:'value_a', value_a:'value_d', buynow_d:'buynow_a', buynow_a:'buynow_d', date:'date_a', date_a:'date', status_a:'status_d', status_d:'status_a', sclub_a:'sclub_d', sclub_d:'sclub_a', bestpos_d:'bestpos_a', bestpos_a:'bestpos_d', men_d:'men_a', men_a:'men_d', wr_d:'wr_a', wr_a:'wr_d', potential_d:'potential_a', potential_a:'potential_d' };
      const target = keyMap[col]; if (!target) return;
      this.youthHistSort = this.youthHistSort === target ? (togMap[target] || target) : target;
    },
    youthSortIcon(col) {
      const s = this.youthHistSort;
      const asc = { name:'name_a', pos:'pos_a', age:'age_a', value:'value_a', buyNow:'buynow_a', date:'date_a', status:'status_a', sclub:'sclub_a', bestpos:'bestpos_a', men:'men_a', wr:'wr_a', potential:'potential_a' };
      const desc = { name:'name_d', pos:'pos_d', age:'age_d', value:'value_d', buyNow:'buynow_d', date:'date', status:'status_d', sclub:'sclub_d', bestpos:'bestpos_d', men:'men_d', wr:'wr_d', potential:'potential_d' };
      if (s === asc[col]) return ' ▲';
      if (s === desc[col]) return ' ▼';
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
}
