import { SF_WORKER_BASE } from '../cache.js'
import { MY_CLUB } from '../constants.js'
import { fmtVal, fmtFormation } from '../utils.js'

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
  saveChatHistory() {
    try {
      const session = this.chatSessions.find(s => s.id === this.activeChatSessionId);
      if (session) {
        session.updatedAt = Date.now();
        if (!session.title || session.title === 'New chat') session.title = this._deriveChatTitle(session.messages);
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
  newChatSession() {
    const session = { id: this._newChatSessionId(), title: 'New chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() };
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
  },
  closeAssistantDock() {
    this.assistantDockOpen = false;
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

    lines.push(`\nPricing note: the raw "Value" field from the game API is NOT a reliable market price — quality players are scarce and in high demand, so real fees run well above it. Use "TrueVal" instead (shown below as value/source) — it's the last real transfer fee, the live transfer-list asking price, or recent negotiation activity where known, else a rating-scaled estimate off Value (marked "formula"). Ground any pricing discussion in TrueVal plus the recent transfers and transfer-list sections below, not the raw Value field.`);

    const squad = (this.allPlayers || []).filter(p => p.Club === MY_CLUB);
    if (squad.length) {
      lines.push(`\nMy squad (${squad.length} players) — Name | Pos | Age | Rating | TrueVal (source):`);
      squad.slice().sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).forEach(p => {
        lines.push(`${p.Player} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)})${p.injured ? ' [INJURED]' : ''}${p.suspended ? ' [SUSPENDED]' : ''}`);
      });
    }

    const targets = (this.allPlayers || [])
      .filter(p => p.Club && p.Club !== MY_CLUB && !this.vacantClubs?.has(p.Club) && (p._gameRating || 0) >= 78)
      .sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0))
      .slice(0, 40);
    if (targets.length) {
      lines.push(`\nTop-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | TrueVal (source):`);
      targets.forEach(p => {
        lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)})`);
      });
    }

    const recentDeals = (this.allPlayers || [])
      .flatMap(p => (p._transferHistory || []).filter(t => t.isReal).map(t => ({ name: p.Player, ...t })))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 30);
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

    const tactics = Object.entries(this.espionageSubmissions || {})
      .filter(([club]) => club !== MY_CLUB)
      .sort(([a], [b]) => a.localeCompare(b));
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

    return lines.join('\n');
  },
  async sendChatMessage() {
    const text = (this.chatInput || '').trim();
    if ((!text && !this.chatAttachments.length) || this.chatLoading) return;
    const content = [];
    if (text) content.push({ type: 'text', text });
    this.chatAttachments.forEach(a => content.push(this.attachmentToBlock(a)));
    this.chatMessages.push({ role: 'user', content, ts: Date.now() });
    this.chatInput = '';
    this.chatAttachments = [];
    this.chatError = '';
    this.chatLoading = true;
    this.saveChatHistory();
    this.$nextTick(() => this.scrollChatToBottom());

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
        signal: AbortSignal.timeout(45000),
      });
      const data = await r.json();
      if (!r.ok || data.error) throw new Error(data.error || `Request failed (${r.status})`);
      this.chatMessages.push({ role: 'assistant', content: data.reply || '(no response)', ts: Date.now() });
    } catch(e) {
      this.chatError = e.message || 'Failed to reach assistant';
    } finally {
      this.chatLoading = false;
      this.saveChatHistory();
      this.$nextTick(() => this.scrollChatToBottom());
    }
  },
};
