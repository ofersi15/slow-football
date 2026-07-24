import { SF_WORKER_BASE } from '../cache.js'
import { MY_CLUB, SLOT_COMPAT } from '../constants.js'
import { fmtVal, fmtFormation, calcGameRating } from '../utils.js'

const CHAT_SESSIONS_KEY = 'sf_chat_sessions_v1';
const LEGACY_CHAT_KEY = 'sf_chat_history_v1';
const MAX_SESSIONS = 20;     // sessions kept in storage
const MAX_HISTORY = 30;      // messages kept per session in storage
const MAX_ATTACHMENTS = 3;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_TEXT_FILE_CHARS = 20000;
const TEXT_FILE_EXTS = /\.(json|csv|txt|md)$/i;
const IMAGE_MAX_DIM = 1568;

function blocksOf(content) {
  if (typeof content === 'string') return [{ type: 'text', text: content }];
  return Array.isArray(content) ? content : [];
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error(`Could not read ${file.name}`));
    r.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error(`Could not read ${file.name}`));
    r.readAsText(file);
  });
}

function loadImageEl(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not decode image'));
    img.src = src;
  });
}

// Always re-encodes as JPEG (normalizes odd formats like HEIC/BMP to something the API
// accepts) and downscales to IMAGE_MAX_DIM on the long edge to bound cost.
async function prepareImageAttachment(file) {
  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImageEl(dataUrl);
  const scale = Math.min(1, IMAGE_MAX_DIM / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  const out = canvas.toDataURL('image/jpeg', 0.85);
  const m = /^data:(.+?);base64,(.*)$/.exec(out);
  if (!m) throw new Error(`Could not process ${file.name}`);
  return { mediaType: m[1], base64: m[2] };
}

export const assistantMethods = {
  _newChatSessionId() {
    return 'cs_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  },
  _deriveChatTitle(messages) {
    const firstUser = (messages || []).find(m => m.role === 'user');
    if (!firstUser) return 'New chat';
    const textBlock = blocksOf(firstUser.content).find(b => b.type === 'text' && b.text);
    const text = textBlock ? textBlock.text : '';
    return text ? (text.length > 40 ? text.slice(0, 40) + '…' : text) : 'New chat';
  },
  _stripForStorage(m) {
    if (typeof m.content === 'string') return m;
    const content = blocksOf(m.content).map(b => {
      if (b.type === 'image') return { type: 'text', text: '[image attached]' };
      if (b.type === 'document') return { type: 'text', text: '[PDF attached]' };
      if (b.type === 'text') return { type: 'text', text: b.text.length > 4000 ? b.text.slice(0, 4000) + '…' : b.text };
      return b;
    });
    return { role: m.role, content, ts: m.ts };
  },
  chatBlocks(content) {
    return blocksOf(content);
  },
  attachmentsFull() {
    return this.chatAttachments.length >= MAX_ATTACHMENTS;
  },
  attachmentToBlock(a) {
    if (a.kind === 'image') return { type: 'image', source: { type: 'base64', media_type: a.mediaType, data: a.base64 } };
    if (a.kind === 'document') return { type: 'document', source: { type: 'base64', media_type: a.mediaType, data: a.base64 } };
    return { type: 'text', text: `--- file: ${a.name} ---\n${a.text}\n--- end file ---` };
  },
  async onChatFileSelected(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // allow re-selecting the same file later
    this.chatError = '';
    for (const file of files) {
      if (this.attachmentsFull()) {
        this.chatError = `Up to ${MAX_ATTACHMENTS} attachments per message.`;
        break;
      }
      try {
        if (file.type.startsWith('image/')) {
          if (file.size > MAX_IMAGE_BYTES) throw new Error(`${file.name} is too large (max 8MB)`);
          const { mediaType, base64 } = await prepareImageAttachment(file);
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: 'image', name: file.name, mediaType, base64 });
        } else if (file.type === 'application/pdf') {
          if (file.size > MAX_PDF_BYTES) throw new Error(`${file.name} is too large (max 10MB)`);
          const dataUrl = await readFileAsDataURL(file);
          const m = /^data:(.+?);base64,(.*)$/.exec(dataUrl);
          if (!m) throw new Error(`Could not read ${file.name}`);
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: 'document', name: file.name, mediaType: 'application/pdf', base64: m[2] });
        } else if (file.type.startsWith('text/') || file.type === 'application/json' || TEXT_FILE_EXTS.test(file.name)) {
          const text = await readFileAsText(file);
          const truncated = text.length > MAX_TEXT_FILE_CHARS ? text.slice(0, MAX_TEXT_FILE_CHARS) + '\n…[truncated]' : text;
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: 'text', name: file.name, text: truncated });
        } else {
          throw new Error(`Unsupported file type: ${file.name}`);
        }
      } catch (err) {
        this.chatError = err.message || 'Could not attach file';
      }
    }
  },
  removeChatAttachment(i) {
    this.chatAttachments.splice(i, 1);
  },
  loadChatHistory() {
    try {
      const raw = localStorage.getItem(CHAT_SESSIONS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.chatSessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
        this.activeChatSessionId = parsed.activeId || null;
      } else {
        // Migrate the old single-thread history, if any, into the first session.
        const legacyRaw = localStorage.getItem(LEGACY_CHAT_KEY);
        const legacyMessages = legacyRaw ? JSON.parse(legacyRaw) : [];
        const session = {
          id: this._newChatSessionId(),
          title: this._deriveChatTitle(legacyMessages),
          messages: legacyMessages, createdAt: Date.now(), updatedAt: Date.now(),
          aiTitled: true, // don't auto-rename pre-existing history on migration
        };
        this.chatSessions = [session];
        this.activeChatSessionId = session.id;
        localStorage.removeItem(LEGACY_CHAT_KEY);
      }
    } catch (e) {
      this.chatSessions = [];
      this.activeChatSessionId = null;
    }
    if (!this.chatSessions.length) {
      this.newChatSession();
      return;
    }
    const active = this.chatSessions.find(s => s.id === this.activeChatSessionId) || this.chatSessions[0];
    this.activeChatSessionId = active.id;
    this.chatMessages = active.messages;
  },
  // touchedId: pass the session whose content actually changed (bumps its updatedAt for
  // sort order + applies the fallback title). Omit for saves that don't represent new
  // activity — renaming, deleting — so they don't reorder the list.
  saveChatHistory(touchedId) {
    try {
      if (touchedId) {
        const session = this.chatSessions.find(s => s.id === touchedId);
        if (session) {
          session.updatedAt = Date.now();
          if (!session.title || session.title === 'New chat') session.title = this._deriveChatTitle(session.messages);
        }
      }
      const sessions = this.chatSessions
        .slice()
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
        .slice(0, MAX_SESSIONS)
        .map(s => ({ ...s, messages: s.messages.slice(-MAX_HISTORY).map(m => this._stripForStorage(m)) }));
      localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify({ sessions, activeId: this.activeChatSessionId }));
    } catch (e) {}
  },
  sortedChatSessions() {
    return this.chatSessions.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  },
  // Groups sortedChatSessions() into Claude-style date buckets for the sidebar list.
  chatSessionGroups() {
    const startOfDay = ts => { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); };
    const today = startOfDay(Date.now());
    const yesterday = today - 86400000;
    const weekAgo = today - 7 * 86400000;
    const groups = [
      { label: 'Today', sessions: [] },
      { label: 'Yesterday', sessions: [] },
      { label: 'Previous 7 days', sessions: [] },
      { label: 'Older', sessions: [] },
    ];
    this.sortedChatSessions().forEach(s => {
      const t = s.updatedAt || s.createdAt || 0;
      if (t >= today) groups[0].sessions.push(s);
      else if (t >= yesterday) groups[1].sessions.push(s);
      else if (t >= weekAgo) groups[2].sessions.push(s);
      else groups[3].sessions.push(s);
    });
    return groups.filter(g => g.sessions.length);
  },
  toggleAssistantSidebar() {
    this.assistantSidebarExpanded = !this.assistantSidebarExpanded;
    try { localStorage.setItem('sf_assistant_sidebar_expanded', this.assistantSidebarExpanded ? '1' : '0'); } catch (e) {}
  },
  startRenameSession(id, e) {
    if (e) e.stopPropagation();
    const session = this.chatSessions.find(s => s.id === id);
    if (!session) return;
    this.renamingSessionId = id;
    this.renameDraft = session.title;
    this.$nextTick(() => {
      const el = this.$refs['renameInput_' + id];
      const input = Array.isArray(el) ? el[0] : el;
      if (input) { input.focus(); input.select(); }
    });
  },
  commitRenameSession() {
    const session = this.chatSessions.find(s => s.id === this.renamingSessionId);
    if (session) {
      const trimmed = (this.renameDraft || '').trim();
      if (trimmed) session.title = trimmed.length > 60 ? trimmed.slice(0, 60) + '…' : trimmed;
      session.aiTitled = true; // manual rename wins — don't let auto-titling overwrite it
      this.saveChatHistory();
    }
    this.renamingSessionId = null;
    this.renameDraft = '';
  },
  cancelRenameSession() {
    this.renamingSessionId = null;
    this.renameDraft = '';
  },
  // Fires once per session, right after the first assistant reply — replaces the truncated
  // first-message title with a real AI-generated one. Best-effort: failures just keep the fallback.
  async _maybeGenerateAiTitle(sessionId) {
    const session = this.chatSessions.find(s => s.id === sessionId);
    if (!session || session.aiTitled) return;
    const userMsgs = session.messages.filter(m => m.role === 'user');
    const assistantMsgs = session.messages.filter(m => m.role === 'assistant');
    if (userMsgs.length !== 1 || assistantMsgs.length !== 1) return;
    session.aiTitled = true; // mark immediately so a slow/failed request can't refire
    const textOf = m => blocksOf(m.content).filter(b => b.type === 'text' && b.text).map(b => b.text).join(' ');
    const snippet = `User: ${textOf(userMsgs[0])}\nAssistant: ${textOf(assistantMsgs[0])}`.trim().slice(0, 2000);
    if (!snippet) return;
    try {
      const r = await fetch(`${SF_WORKER_BASE}/_title`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: snippet }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await r.json();
      if (r.ok && data.title) {
        const s = this.chatSessions.find(s => s.id === sessionId);
        if (s) { s.title = data.title; this.saveChatHistory(); }
      }
    } catch (e) {}
  },
  newChatSession() {
    const session = { id: this._newChatSessionId(), title: 'New chat', messages: [], createdAt: Date.now(), updatedAt: Date.now(), aiTitled: false };
    this.chatSessions.unshift(session);
    this.activeChatSessionId = session.id;
    this.chatMessages = session.messages;
    this.chatAttachments = [];
    this.chatError = '';
    this.saveChatHistory();
  },
  switchChatSession(id) {
    const session = this.chatSessions.find(s => s.id === id);
    if (!session) return;
    this.activeChatSessionId = session.id;
    this.chatMessages = session.messages;
    this.chatAttachments = [];
    this.chatError = '';
    this.renamingSessionId = null;
    this.$nextTick(() => this.scrollChatToBottom());
  },
  deleteChatSession(id) {
    const idx = this.chatSessions.findIndex(s => s.id === id);
    if (idx === -1) return;
    if (!confirm('Delete this chat?')) return;
    this.chatSessions.splice(idx, 1);
    if (!this.chatSessions.length) {
      this.newChatSession();
    } else {
      this.activeChatSessionId = this.chatSessions[0].id;
      this.chatMessages = this.chatSessions[0].messages;
    }
    this.saveChatHistory();
  },
  toggleAssistantDock() {
    if (this.activeTab === 'assistant') return; // already fully visible as the tab
    this.assistantDockOpen = !this.assistantDockOpen;
    try { localStorage.setItem('sf_assistant_dock_open', this.assistantDockOpen ? '1' : '0'); } catch (e) {}
    if (this.assistantDockOpen) this.$nextTick(() => this.scrollChatToBottom());
    else this.assistantDockListOpen = false;
  },
  closeAssistantDock() {
    this.assistantDockOpen = false;
    this.assistantDockListOpen = false;
    try { localStorage.setItem('sf_assistant_dock_open', '0'); } catch (e) {}
  },
  scrollChatToBottom() {
    const el = this.$refs.chatScroll;
    if (el) el.scrollTop = el.scrollHeight;
  },
  onChatKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendChatMessage();
    }
  },
  // Summarizes squad, budget and top transfer targets from already-loaded data — no extra API calls.
  buildChatContext() {
    const lines = [`My club: ${MY_CLUB}. Current game week: ~${this.asOfWeek || '?'}.`];

    if (this.clubBudget != null) {
      lines.push(`Transfer budget: ${fmtVal(this.clubBudget)}${this.clubWageBudget != null ? `, wage budget: ${fmtVal(this.clubWageBudget)}/wk` : ''}.`);
    }

    const tactics = Object.entries(this.espionageSubmissions || {})
      .filter(([club]) => club !== MY_CLUB)
      .sort(([a], [b]) => a.localeCompare(b));

    if (tactics.length) {
      lines.push(`\nResponse format for "how should I line up against X" questions: follow this template exactly, all 6 sections, every time, in this order — never skip a section, and never invent extra headers or sub-groupings of your own:

SECTION 1 — Opponent breakdown: 2-4 sentences on their formation/mentality/style from the opponent-tactics table further below, plus their key strengths/weaknesses. Check the submission's GW against "Current game week" at the top of this context. I usually plan lineups on a Thursday, and the submission deadline is Friday 2pm BST while I'm asleep — so an opponent's shown submission is sometimes still last week's already-played lineup because they haven't submitted their upcoming one yet. If the GW doesn't match the current one, say so explicitly and treat the shown setup as their general tendency, not a locked-in plan for the match being planned.

SECTION 2 — Recommended lineup: output ONLY a flat list, exactly one line per starting XI slot, nothing else — no "Back 4:" or "Midfield:" style group headers, no nested bullets, no parenthetical reasoning on the line. Format every line identically as "SLOT: Player Name", e.g. for a 4231:
GK: Player Name
RB: Player Name
CB: Player Name
CB: Player Name
LB: Player Name
DM: Player Name
DM: Player Name
RW: Player Name
AM: Player Name (C)
LW: Player Name
CF: Player Name
Swap the slot labels for whichever formation you actually recommend, but keep it one slot per line, always. Weigh each player's Fitness (condition) before picking them over a fitter alternative. Mark the captain inline with "(C)" right there on their line — the captain is decided here and nowhere else in the reply. Put any reasoning/fitness caveats in a short paragraph AFTER this list, not inside it.

SECTION 3 — Match instructions: Mentality / Style / Structure / Defensive Line / Attacking Focus / Pressing, one line each, explicitly naming the field and the exact option value chosen (from the fixed lists in the game mechanics reference further below).

SECTION 4 — Substitutions: exactly 5 lines, one per sub slot, each formatted "Timing — Player IN for Player OUT (Plan)". Use exactly this split unless the matchup gives a genuinely strong reason not to: 3 subs on "any situation" timing (fresh legs / rotation / like-for-like cover, spread across the 46-60' / 61-75' / 76'- windows), 1 sub timed "if winning" (game management, e.g. a Defensive plan), 1 sub timed "if not winning" (chase the game, e.g. an Attacking plan). Use the exact literal window labels from the game mechanics reference further below — Half-time, 46-60', 61-75', 76'- — never an invented shorthand like "76'+".

SECTION 5 — Set pieces: state the takers — Penalty: Player Name / Free-kick: Player Name / Corner: Player Name (the captain is already marked in Section 2, don't repeat it).

SECTION 6 — Corner tactics: this is a REQUIRED section, always present, no exceptions — it is the single most commonly forgotten part of this reply, so treat it as mandatory. Fill in this exact 4-line block, literally, with one chosen value on each line (add a short reason in parentheses after each value if the opponent's setup gives you one, otherwise leave it as a sound generic default):
Attacking corner — Delivery: [Inswinger/Outswinger/Driven/Short Corner]
Attacking corner — Stay Back: [1/2]
Defensive corner — Scheme: [Zonal/Man-to-Man/Hybrid]
Defensive corner — Press: [Hold Shape/Press Taker]`);
    }

    lines.push(`\nPricing note: the raw "Value" field from the game API is NOT a reliable market price — quality players are scarce and in high demand, so real fees run well above it. Use "TrueVal" instead (shown below as value/source) — it's the last real transfer fee, the live transfer-list asking price, or recent negotiation activity where known, else a rating-scaled estimate off Value (marked "formula"). Ground any pricing discussion in TrueVal plus the recent transfers and transfer-list sections below, not the raw Value field.`);

    const FORMATION_TIERS = { 1: ['442', '433', '4231', '532', '343'], 2: ['352', '541', '4411'], 3: ['4321', '451'], 4: ['4141', '442 D', '3421'], 5: ['3241', '4222', '4132'] };
    const analyticsLv = this.clubFacData?.levels?.analytics;
    const unlockedFormations = analyticsLv
      ? Object.keys(FORMATION_TIERS).filter(l => +l <= analyticsLv).flatMap(l => FORMATION_TIERS[l]).join(', ')
      : null;
    lines.push(`\nGame mechanics reference (fixed game rules — these are the actual dropdown options in the live submission form, not opponent-specific data):
- Formations are gated by Analytics Dept facility level, cumulative: Lv1 unlocks 442/433/4231/532/343, Lv2 adds 352/541/4411, Lv3 adds 4321/451, Lv4 adds 4141/442 D/3421, Lv5 adds 3241/4222/4132.${analyticsLv ? ` My club's Analytics Dept is level ${analyticsLv} → currently unlocked: ${unlockedFormations}.` : ' (My club\'s current Analytics Dept level isn\'t loaded this session — check the My Club tab.)'}
- Match instructions (6 dropdowns): Mentality (Very Defensive / Defensive / Balanced / Attacking / Very Attacking), Style (Short / Mixed / Direct), Structure (Fluid / Balanced / Rigid), Defensive Line (Deep / Low / Medium / High), Attacking Focus (Left / Right / Central / Mixed), Pressing Intensity (High Press / Mid-Block / Low Block / Counter Press).
- Set-piece takers (Captain, Penalty, Free-kick, Corner) are just player assignments — no extra tuning for penalties or free-kicks. Corners alone have dedicated instructions: Attacking corner — Delivery (Inswinger / Outswinger / Driven / Short Corner), Stay Back (1 or 2 players forward), 7 zone roles (Near Post, Far Post, Penalty Spot, Blockade, Edge of Box, Short Corner, Hold Back). Defensive corner — Scheme (Zonal / Man-to-Man / Hybrid), Press (Hold Shape / Press Taker), 6 zone roles (Near Post, Far Post, 6-Yard Box, Penalty Spot, Edge of Box, Counter Runner).
- Substitutions: 5 subs per match. Each sub has a Plan (same 5 mentality values above) and a Timing trigger = a window (Half-time / 46-60' / 61-75' / 76'-) plus a condition. Only the Half-time window offers "if losing" as a condition; the other three windows only offer "if winning" / "if not winning" / "any situation".`);

    const squad = (this.allPlayers || []).filter(p => p.Club === MY_CLUB);
    if (squad.length) {
      lines.push(`\nMy squad (${squad.length} players) — Name | Pos | Age | Rating | Fitness | TrueVal (source) | AltPosFit | Ldr/Ment/Exp | FK/Pen/Cor:`);
      squad.slice().sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).forEach(p => {
        const fit = p.fitnessPct != null ? `${p.fitnessPct}%` : '?';
        const altPositions = (SLOT_COMPAT[p.Position] || []).filter(pos => pos !== p.Position && pos !== 'GK');
        const altFit = altPositions.map(pos => `${pos}:${calcGameRating(p, pos) ?? '?'}`).join(',') || '-';
        const capt = `${p.Leadership ?? '?'}/${p.Mentality ?? '?'}/${p.Experience ?? '?'}`;
        const setPiece = `${p['Free kicks'] ?? '?'}/${p.Penalties ?? '?'}/${p.Corners ?? '?'}`;
        lines.push(`${p.Player} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fit} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)}) | ${altFit} | ${capt} | ${setPiece}${p.injured ? ' [INJURED]' : ''}${p.suspended ? ' [SUSPENDED]' : ''}`);
      });
      lines.push(`Lineup-suggestion guidance: "AltPosFit" is each player's game-formula rating (same weighted-attribute formula as "Rating") if played at a different compatible position instead of their listed one. Some players inflate their nominal position's rating via one shared attribute (e.g. a converted DM's high Stamina alone can push their FB rating above a true fullback's) — always cross-check AltPosFit and recommend whichever position the numbers actually favor, not just the listed Position. For captain, weigh Leadership ("Ldr/Ment/Exp", first number) most heavily, with Mentality and Experience as secondary factors — do not just default to the highest-rated or best-known player. For set-piece takers, use the dedicated Free kicks / Penalties / Corners attributes ("FK/Pen/Cor") for the free-kick / penalty / corner taker respectively — these are literal in-game attributes, not proxies. For substitutions, the game allows 5 subs per match (not 3) — actively plan to use 3-5 of them with sensible Plan + Timing combinations suited to the match state (e.g. fresh legs / attacking sub late if chasing the game, a defensive sub to protect a lead), rather than defaulting to only 1-2 subs or leaving slots blank.`);
    }

    const targets = (this.allPlayers || [])
      .filter(p => p.Club && p.Club !== MY_CLUB && !this.vacantClubs?.has(p.Club) && (p._gameRating || 0) >= 78)
      .sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0))
      .slice(0, 25);
    if (targets.length) {
      lines.push(`\nTop-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | TrueVal (source):`);
      targets.forEach(p => {
        lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)})`);
      });
    }

    const recentDeals = (this.allPlayers || [])
      .flatMap(p => (p._transferHistory || []).filter(t => t.isReal).map(t => ({ name: p.Player, ...t })))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20);
    if (recentDeals.length) {
      lines.push(`\nRecent real completed transfers league-wide (most recent first) — Player | Fee | Seller → Buyer | Date:`);
      recentDeals.forEach(d => {
        lines.push(`${d.name} | ${fmtVal(d.amount)} | ${d.seller || '?'} → ${d.buyer || '?'} | ${d.date ? new Date(d.date).toLocaleDateString('en-GB') : '?'}`);
      });
    }

    const listed = (this.allPlayers || []).filter(p => p._transferListed && p._listingAsk);
    if (listed.length) {
      lines.push(`\nPlayers currently on the transfer list — Name | Club | Pos | Age | Rating | Asking price | Bids:`);
      listed.slice().sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).forEach(p => {
        lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(p._listingAsk)} | ${p._listingBids || 0}`);
      });
    }

    if (tactics.length) {
      lines.push(`\nOpponent tactics — each club's most recently submitted lineup (this can be their plan for an upcoming, not-yet-played gameweek, so treat it as their likely XI/setup) — Club | Formation | Mentality | Style | GW | XI:`);
      tactics.forEach(([club, s]) => {
        const xi = (s.xi || []).map(p => p.name).filter(Boolean).join(', ');
        lines.push(`${club} | ${fmtFormation(s.formation) || '?'} | ${s.instructions?.mentality || '?'} | ${s.instructions?.style || '?'} | ${s._gw ?? s.gameweek ?? '?'} | ${xi || '?'}`);
      });
    }

    const myMatches = (this.matchArchive || [])
      .filter(m => m.home?.club === MY_CLUB || m.away?.club === MY_CLUB)
      .sort((a, b) => (b.gameweek || 0) - (a.gameweek || 0))
      .slice(0, 8);
    if (myMatches.length) {
      lines.push(`\nMy club's recent match results (most recent first; no fixture list is available so I don't know future opponents) — GW | Opponent (H/A) | Score | My formation/mentality | Opponent formation/mentality:`);
      myMatches.forEach(m => {
        const isHome = m.home?.club === MY_CLUB;
        const mine = isHome ? m.home : m.away;
        const opp = isHome ? m.away : m.home;
        const score = m.score ? `${m.score.home ?? '?'}-${m.score.away ?? '?'}` : '?';
        lines.push(`GW${m.gameweek ?? '?'} | ${opp?.club || '?'} (${isHome ? 'H' : 'A'}) | ${score} | ${fmtFormation(mine?.formation) || '?'}/${mine?.mentality || '?'} | ${fmtFormation(opp?.formation) || '?'}/${opp?.mentality || '?'}`);
      });
    }

    if (tactics.length) {
      lines.push(`\nBefore you send a reply to a "how should I line up against X" question, check it against this list — if any item is missing, add it now, don't send an incomplete reply:
- Section 2 lineup is a flat one-slot-per-line list (SLOT: Player Name), not grouped into "Back 4:"/"Midfield:" style headers, with "(C)" on the captain's line.
- Section 6 (Corner tactics) exists as its own section with the literal 4-line Delivery/Stay Back/Scheme/Press block. This is the single most commonly forgotten section of this reply — verify it's actually there before sending.`);
    }

    return lines.join('\n');
  },
  async sendChatMessage() {
    const text = (this.chatInput || '').trim();
    if ((!text && !this.chatAttachments.length) || this.chatLoading) return;
    const sessionId = this.activeChatSessionId;
    const content = [];
    if (text) content.push({ type: 'text', text });
    this.chatAttachments.forEach(a => content.push(this.attachmentToBlock(a)));
    this.chatMessages.push({ role: 'user', content, ts: Date.now() });
    this.chatInput = '';
    this.chatAttachments = [];
    await this._requestAssistantReply(sessionId);
  },
  // Pops the last assistant reply and re-requests one for the same conversation so far.
  async regenerateLastResponse() {
    if (this.chatLoading) return;
    const sessionId = this.activeChatSessionId;
    let idx = -1;
    for (let i = this.chatMessages.length - 1; i >= 0; i--) {
      if (this.chatMessages[i].role === 'assistant') { idx = i; break; }
    }
    if (idx === -1) return;
    this.chatMessages.splice(idx, 1);
    await this._requestAssistantReply(sessionId);
  },
  stopChatMessage() {
    if (this._chatAbortController) {
      this._chatStoppedByUser = true;
      this._chatAbortController.abort();
    }
  },
  // Shared by sendChatMessage (after the new user turn) and regenerateLastResponse (after
  // popping the old reply) — both just need "ask for the next assistant message and handle it".
  async _requestAssistantReply(sessionId) {
    this.chatError = '';
    this.chatLoading = true;
    this.saveChatHistory(sessionId);
    this.$nextTick(() => this.scrollChatToBottom());

    const controller = new AbortController();
    this._chatAbortController = controller;
    const timeoutId = setTimeout(() => controller.abort(), 45000);
    try {
      const payload = {
        context: this.buildChatContext(),
        messages: this.chatMessages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({ role: m.role, content: m.content })),
      };
      const r = await fetch(`${SF_WORKER_BASE}/_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await r.json();
      if (!r.ok || data.error) throw new Error(data.error || `Request failed (${r.status})`);
      this.chatMessages.push({ role: 'assistant', content: data.reply || '(no response)', ts: Date.now() });
      this._maybeGenerateAiTitle(sessionId); // fire-and-forget — replaces the truncated fallback title
    } catch(e) {
      if (e.name === 'AbortError') {
        if (!this._chatStoppedByUser) this.chatError = 'Request timed out';
      } else {
        this.chatError = e.message || 'Failed to reach assistant';
      }
    } finally {
      clearTimeout(timeoutId);
      this._chatAbortController = null;
      this._chatStoppedByUser = false;
      this.chatLoading = false;
      this.saveChatHistory(sessionId);
      this.$nextTick(() => this.scrollChatToBottom());
    }
  },
};
