import { SF_WORKER_BASE } from '../cache.js'
import { MY_CLUB, SLOT_COMPAT, WEEK_MS, PLAYER_ROLES, PLAN_B_SCENARIOS, PLAN_B_NAMED_PLANS } from '../constants.js'
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
  // Shared by every context section that lists a player's ratings at other compatible
  // positions (squad, transfer targets, negotiation lookups) — one formula, one format.
  _altFitStr(p) {
    const altPositions = (SLOT_COMPAT[p.Position] || []).filter(pos => pos !== p.Position && pos !== 'GK');
    return altPositions.map(pos => `${pos}:${calcGameRating(p, pos) ?? '?'}`).join(',') || '-';
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

    // Read directly from submissionsCache (not the separately-maintained espionageSubmissions
    // snapshot, which is only recomputed once during the bulk prewarm) so any club fetched via
    // any path this session — prewarm, retry pass, or just browsing its Clubs-tab detail page,
    // which does one single reliable fetch via openClubDetail() — shows up here immediately,
    // without needing the full ~55-club prewarm to have succeeded.
    const tactics = Object.entries(this.submissionsCache || {})
      .filter(([club]) => club !== MY_CLUB)
      .map(([club, byGw]) => {
        const latest = Object.values(byGw || {}).sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0))[0];
        return latest ? [club, latest] : null;
      })
      .filter(Boolean)
      .sort(([a], [b]) => a.localeCompare(b));

    // Whether a submission's actual timestamp falls in the current real-world Sat-Fri window —
    // computed deterministically off today's actual date, not GAME_START + asOfWeek * WEEK_MS
    // (verified this drifts — the game's gameweeks don't tick in a strict real-time 7-day
    // cadence from a fixed epoch, so that formula misclassifies submissions made "right now" as
    // weeks off). Per the owner, the window is Saturday 9pm through the next Saturday 9pm,
    // London-time (so it tracks BST/GMT automatically rather than a fixed UTC offset) — not a
    // GW number, and not midnight-anchored.
    const now = new Date();
    // London's real UTC offset for "now", derived from Intl rather than hardcoded, since it's
    // +1h (BST) roughly late March-late October and +0h (GMT) otherwise.
    const londonOffsetMin = Math.round(
      (new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })) -
       new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000
    );
    const nowLondonWall = new Date(now.getTime() + londonOffsetMin * 60000);
    const daysSinceSat = (nowLondonWall.getUTCDay() - 6 + 7) % 7; // 0 if today is Saturday (London-wall)
    // 9pm London-wall on the most recent Saturday, converted back to a real UTC instant.
    const weekStart = Date.UTC(
      nowLondonWall.getUTCFullYear(), nowLondonWall.getUTCMonth(), nowLondonWall.getUTCDate() - daysSinceSat, 21, 0, 0, 0
    ) - londonOffsetMin * 60000;
    const weekEnd = weekStart + WEEK_MS;
    const submissionGwStatus = (s) => {
      const ts = s?.submittedAt || (s?.createdAt ? new Date(s.createdAt).getTime() : null);
      if (!ts) return 'unknown';
      if (ts >= weekStart && ts < weekEnd) return 'current';
      const daysOff = Math.round((weekStart - ts) / 86400000);
      return daysOff > 0 ? `stale, ${daysOff}d before this week` : `future, ${-daysOff}d after this week`;
    };

    if (tactics.length) {
      lines.push(`\nResponse format for "how should I line up against X" questions: follow this template exactly, all 6 sections, every time, IN THIS ORDER — Opponent breakdown, Recommended lineup, Substitutions, Match instructions, Set pieces, Corner tactics. Note Substitutions now comes right after the lineup and BEFORE match instructions — never skip a section, and never invent extra headers or sub-groupings of your own.

Before writing anything, work out the specific personnel matchups this game actually turns on — my RW vs their LB 1v1, my RB+RW combo against their LB+LW pairing, who wins the double-pivot battle, etc. — and let a coherent approach built around MY actual personnel (not a generic template) drive the whole reply: the breakdown, the instructions, the focus, even the subs. This matchup-driven reasoning must show up consistently in every reply, not just occasionally. Critically, the starting XI and the substitution plan are ONE decision, not two separate steps — think about the shape of the full 90 minutes as a package before finalizing either: sometimes the right answer is "start the fresher/more explosive option and bring the highest-rated player on as an impact sub against tiring opposition" rather than always starting whoever rates highest and using the alternative as a like-for-like replacement. Reason about this explicitly when it's a close call, don't default to rating order out of habit.

SECTION 1 — Opponent breakdown: open this section like a real assistant manager giving a scouting brief, not like someone who's already jumped to our own game plan. Two clear parts, in this order:
(a) THE LAY OF THE LAND (2-3 sentences, about THEM, not us yet): their formation and approach in and out of possession, their genuine strengths (individual quality, a settled system, whatever's real), their genuine weaknesses and where anyone — not just us specifically — could exploit them, and the general kind of threat their setup poses. This is a standalone scouting read, not yet filtered through our own squad.
(b) THE MATCHUP (2-3 sentences, now bringing US in): given everything in (a), where THEY will specifically try to hurt US given our personnel, and where WE can specifically hurt THEM given theirs. Name at least one concrete personnel matchup (e.g. "their LB pushes on and leaves space in behind — our RW should isolate him repeatedly on the counter") rather than staying abstract.
If the opponent's Plan B column in the tactics table further below shows most/all 6 scenarios configured, don't just note it as "they're well-drilled" and move on — actually answer the follow-up question a real assistant manager would ask next: does their being scripted/reactive across all 6 scenarios hand US anything? The useful angle is NOT "we can engineer scoring early" (you can't choose a scoreline into existence) — it's that we already know their exact reaction to a given match state before it happens, so WE can have our own prepared response ready the instant it does. Flag the observation here; the concrete response belongs in Section 3's Plan B block, which should reference it directly. Only make this point when there's a genuine angle for THIS opponent's specific configuration — don't force it if there isn't one. Each row in the opponent-tactics table further below already carries a computed status — "current" (its timestamp falls inside this gameweek's Sat-Fri submission window, so treat it as their real plan even if it has no GW number attached), or "stale"/"future" (it's from a different window — say so explicitly and treat it as their general tendency, not a locked-in plan for the match being planned). Trust that computed status, don't re-derive it yourself from a GW number — a missing or non-matching GW number does NOT by itself mean the submission is stale.

SECTION 2 — Recommended lineup: first, in a short paragraph BEFORE the list, explain your personnel calls — fitness/condition tradeoffs, and any position calls where you're not playing someone in their listed position. Describe those in plain language with both numbers, e.g. "his rating at centre-back (81.8) is actually higher than his rating at right-back (80.5), so he starts at CB instead" — never say the literal term "AltPosFit" out loud, that's just this app's internal column name, not something to put in a reply. This paragraph must also explicitly name and explain every notable player who is NOT starting — not just the players you did pick. If a recognizable, highly-rated player at a position (not only CB/FB/DM — this applies everywhere: GK, DM, AM, WF, CF) is left out, say so by name with the actual reason (fitness%, a fresher/better-rated alternative, rotation) rather than leaving the reader to infer it from who you did choose; a reply that only justifies its picks and silently drops a recognizable name is incomplete, not just terse. When considering who fills AM/WF/CF, check EVERY attacking player's rating at that slot, not just the players whose listed Position already matches it — a player whose own nominal position is elsewhere (e.g. an AM with a strong alternate WF rating) can genuinely belong in the conversation and must not be silently excluded just because they're not the "obvious" candidate for that slot; check the full group together and assign it to whichever arrangement maximizes the total, don't move one player to a weaker slot just to make room for another unless that other player is actually better in the first player's original slot too — a player's own best slot (even if it's just their plain listed Position) usually belongs to them unless the numbers say otherwise for the group as a whole. The same holistic check applies to the CB/FB/DM cluster, but weigh opportunity cost too, not just the raw rating at the new slot: moving a player off their natural position costs you there as well as gaining you here, and that cost is bigger the more that position actually needs them. A player who is merely squad depth at their natural spot (a fringe DM with no other clear role, say) can be moved to an alternate slot fairly freely if the numbers favor it. A player who is one of your best options at their natural position — especially one where you don't have comparable healthy cover, like a first-choice defensive midfielder — should stay there even if their rating at some other slot is marginally higher; moving a player like that requires the alternate-slot edge to be substantial ON ITS OWN — having other strong fit cover back at their old position makes the move less costly, but does NOT by itself make a marginal edge worth taking, and is not a substitute for that edge being large. Treat "we have plenty of other good DMs" and "his FB number is meaningfully better than his DM number" as two SEPARATE requirements that both have to hold, not one-or-the-other — depth elsewhere tells you the move is survivable, not that it's a good idea; the case for actually making it still has to be won on the rating gap itself. Be extra skeptical of a large edge for a specialist holding/destroyer-type DM specifically: their natural-position rating often undersells their real defensive-midfield value (positioning, distribution under pressure) in a way the formula can't see, while a big alternate-position number can come from just one or two shared physical attributes (Stamina, Speed) — so for this specific player type, don't take a flattering FB/CB number at face value the way you would for a squad player with no clear specialist role. A genuine personnel emergency (no fit natural options left anywhere for that slot) is the one case that overrides all of this. This is exactly why a fringe DM can profitably play FB while your best DM generally shouldn't, even if both show a similar-looking rating edge out wide. This caution does NOT go away just because a strong DM isn't starting at DM for some other reason (rotation, fitness) — if you've already decided not to start them at their own position, the next question is whether playing them out of position elsewhere is genuinely better than simply using the incumbent natural option there, not whether it beats the bench. Being rested from DM doesn't make using that same player at fullback free; it's the same trade-off as moving him there directly and needs the same substantial edge or genuine necessity — a marginal rating edge over the incumbent, especially paired with similar (not clearly better) fitness, isn't enough. **Before finalizing the back four and double pivot specifically**, explicitly list every viable candidate for each contested slot — both the players who naturally play there and any flexible candidates from other positions — with their rating and fitness, and pick from that full list, not from whoever's left over after other decisions. Two failure modes to check for directly: (1) a player being moved to a slot where their rating THERE is actually lower than their own rating at their natural position — that is never a real trade, it's a straight downgrade with no offsetting benefit, don't do it; (2) a higher-rated, fit natural candidate for a slot (e.g. a specific DM) sitting unused on the bench with no stated reason while lower-rated options start there instead — if that's really the right call (a tactical reason, not just an oversight), say why in the reasoning paragraph; if there's no reason, it's a mistake, not a choice. Fitness is not a minor footnote — weigh it as heavily as rating: if a fresher alternative's rating is equal to or higher than a fatigued starter's (a rough guide, not a hard cutoff: fatigued means well under 100%, and the gap matters more as fitness drops further), start the fresher player. Don't default to the more recognizable name over what the numbers actually say — that's the single most common mistake to avoid here. A small rating edge for the tired player is not, by itself, worth the fitness risk; only keep a fatigued starter in over a fresher, comparable option if there's a stated reason beyond raw rating (a specific matchup skill, set-piece duties, captaincy) — and if you DO start a notably fatigued player for that reason, Section 3 must give them an actual, specific substitution plan, not just a passing mention here. Whenever you justify a fitness/rotation call by comparing two players, the comparison must be between the actual candidates for that specific slot — the fatigued starter and the real alternative(s) on the squad who could actually play there instead. Don't cite a different player's fitness or rating as if it supports the decision unless that player is genuinely one of the options being weighed for this slot; an unrelated number doesn't establish anything and just looks like padding. If there's no realistic fresher alternative for that exact slot, say so plainly instead of reaching for a comparison that doesn't really apply.

Then output ONLY a flat list, exactly one line per starting XI slot, nothing else — no "Back 4:" or "Midfield:" style group headers, no nested bullets, no reasoning inline. Format every line identically as "SLOT: Player Name (rating, fitness%) — Role: Role Name" — rating is their game-formula rating AT THE SLOT THEY'RE ACTUALLY PLAYING (their own Rating if it's their listed Position, or the matching alternate-position rating if playing them out of position), fitness is their condition percentage from the squad table, Role is a tactical role chosen from the Player Roles list for that player's own BASE position in the game mechanics reference further below (never a role listed under a different base position) — e.g. for a 4231:
GK: Player Name (82, 95%) — Role: Sweeper Keeper
RB: Player Name (81.4, 100%) — Role: Overlapper
CB: Player Name (80.1, 68%) — Role: No-Nonsense CB
CB: Player Name (82.3, 66%) — Role: Ball Player
LB: Player Name (78.9, 78%) — Role: Defensive Full Back
DM: Player Name (81, 79%) — Role: Anchor
DM: Player Name (82, 100%) — Role: Deep-Lying Playmaker
RW: Player Name (82.3, 63%) — Role: Inside Forward
AM: Player Name (81.3, 59%) (C) — Role: Advanced Playmaker
LW: Player Name (81.4, 100%) — Role: Traditional Winger
CF: Player Name (81.4, 100%) — Role: Poacher
Swap the slot labels for whichever formation you actually recommend, but keep it one slot per line, always. Mark the captain inline with "(C)" right there on their line — the captain is decided here and nowhere else in the reply. Never shuffle two players into each other's positions without the kind of numeric justification you gave in the paragraph above — a CB and an FB simply swapping slots with no stated rating benefit is not a real tactical choice, it's a mistake.

SECTION 3 — Substitutions: exactly 5 lines, one per sub slot, nothing else on the line — no grouping, no dropped fields. Format every single line IDENTICALLY as "Window (Condition) — Player IN for Player OUT (Plan) — short reason", with all 5 parts present on every line, no exceptions: the literal window label, the condition in parentheses, both player names with "IN for", the Plan in parentheses, then the reason. Use exactly this split unless the matchup gives a genuinely strong reason not to: 3 subs on "any situation" timing (fresh legs / rotation / like-for-like cover, spread across the 46-60' / 61-75' / 76'- windows), 1 sub timed "if winning" (game management, e.g. a Defensive plan), 1 sub timed "if not winning" (chase the game, e.g. an Attacking plan). Use the exact literal window labels from the game mechanics reference further below — Half-time, 46-60', 61-75', 76'- — never an invented shorthand like "76'+", and never omit the window/condition even when it feels repetitive across lines. A sub's Plan changes the team's overall mentality from that point on and persists until a later sub changes it again (see the game mechanics reference below) — the 3 "any situation" subs should carry the SAME Plan as the match's starting Mentality, so routine rotation doesn't silently drift the team's approach; save an actual Plan change for the "if winning" sub (toward Defensive) and the "if not winning" sub (toward Attacking/Very Attacking), where a real shift is the point. Two requirements specific to this section: (1) any starter you sent out at meaningfully reduced fitness (a rough guide: under ~70%) needs an ACTUAL sub addressing them by name in this list — don't start a tired player in Section 2 and then never bring them off; if there's a genuine reason not to (no fit like-for-like cover, their skill set is worth the risk to the final whistle), say so explicitly instead of just letting it go unaddressed. (2) A sub described as bringing on "fresh legs" must actually BE fresher than the player they're replacing — check the incoming player's own fitness% before calling them fresh; a bench option at low fitness themselves isn't a fresh-legs sub, it's just a different tired player, and shouldn't be framed as one.

After the 5 sub lines, add a short "Plan B" block: pick 2-4 scenarios that are genuinely realistic for this specific match — you don't need to cover all 6, but be deliberate about which ones you skip, not just lazy. Check the opponent's own Plan B column in the tactics table further below first: if they've configured most/all 6 scenarios, be more thorough yourself rather than defaulting to only 1-2, since you're facing a side ready to react across more match states than you are. Each line is formatted "Scenario name: Named Plan — short reason", using only the scenario names from the Plan B list in the game mechanics reference further below, and a SPECIFIC named Plan from that same reference's fixed 7-option vocabulary (Shut Up Shop / Sit Deeper / Hold Shape / Keep The Ball / Go Direct / Push On / Chase The Game) — never a vague description in place of a real name, and never a name outside that list. Pick the Plan using football logic tied to the scenario. Critically, the SAME real-world event triggers a scenario for both teams at once, just from opposite sides — our "conceding early" is simultaneously THEIR "scoring early", our "losing by 2+" is simultaneously THEIR "winning by 2+", and so on. If the opponent's own Plan B detail is available in context (their real scenario→Plan pairs), cross-reference the MIRRORED scenario when picking ours: e.g. if their reaction to scoring early (their "score_in_first_ten") is a specific named Plan, factor that directly into what OUR reaction to conceding early should counter, rather than picking our own scenario's Plan in isolation — name their mirrored reaction explicitly in the reason when you use this (e.g. "Concede early: Hold Shape — they'll go direct in response the moment we concede, so we stay compact rather than get dragged into an end-to-end game"). Remember Plan B fires at most once per match with no personnel changes (that's what this section's own subs are for).

SECTION 4 — Match instructions: Mentality / Style / Structure / Defensive Line / Attacking Focus / Pressing, one line each, explicitly naming the field and the exact option value chosen (from the fixed lists in the game mechanics reference further below), each followed by a short reason tied to the specific matchup identified in Section 1 — not a generic justification that could apply to any opponent. EVERY line needs its own real reason, not just the extreme-sounding ones — "Balanced", "Mixed", or "Medium" are just as much an active choice as "Very Attacking" or "High Press", and picking a middle option without explaining why it's the right middle ground (rather than leaning either direction) is not acceptable; don't let a field go unexplained just because its value sounds self-evident. Keep Attacking Focus consistent with the actual lineup above: if you're directing focus to a flank, make sure that flank's personnel is genuinely who you'd want spearheading it, not a weaker or miscast player.

SECTION 5 — Set pieces: state the takers — Penalty: Player Name / Free-kick: Player Name / Corner: Player Name (the captain is already marked in Section 2, don't repeat it). Check the Penalties, Free kicks, and Corners attributes INDEPENDENTLY for every player in the Section 2 XI — these are three different specialties and usually belong to three different players, not whoever's the most famous or highest-rated attacker overall. Don't default to giving all three to the same player unless the numbers genuinely back that for all three; it usually means you didn't actually check.

SECTION 6 — Corner tactics: this is a REQUIRED section, always present, no exceptions — it is the single most commonly forgotten part of this reply, so treat it as mandatory. Delivery is a FIXED target zone, not an independent choice — see the corner-delivery mapping in the game mechanics reference further below — so pick Delivery based on which zone you actually want to attack/defend against, not as a separate cosmetic choice. If the opponent's own corner setup is shown further below (their real zone assignments — who THEY put where, both attacking and defending), USE it specifically, by player name, not just their formation/mentality: for OUR Defensive corner, name their specific dangerous attacking-corner threats (e.g. whoever they put at the penalty spot / far post — real aerial targets) and set Scheme/Press to specifically account for them; for OUR Attacking corner, look at THEIR defensive-corner zone assignments for a genuine weakness (a weaker or smaller defender given a central/dangerous zone, or an oddly light zone) and target that specific zone with Delivery/Stay Back, naming who you're attacking against. If their corner setup isn't available in context (not every opponent will have it), fall back to a sound generic default instead of inventing specifics you don't have. Fill in this exact 4-line block, literally, with one chosen value on each line (add a short reason in parentheses after each value — naming specific opposing players where their corner data is available, otherwise a sound generic default):
Attacking corner — Delivery: [Inswinger/Outswinger/Driven/Short Corner]
Attacking corner — Stay Back: [1/2]
Defensive corner — Scheme: [Zonal/Man-to-Man/Hybrid]
Defensive corner — Press: [Hold Shape/Press Taker]`);
    }

    lines.push(`\nPricing note: the raw "Value" field from the game API is NOT a reliable market price — quality players are scarce and in high demand, so real fees run well above it. Use "TrueVal" instead (shown below as value/source) — it's the last real transfer fee, the live transfer-list asking price, or recent negotiation activity where known, else a rating-scaled estimate off Value (marked "formula"). Ground any pricing discussion in TrueVal plus the recent transfers and transfer-list sections below, not the raw Value field.`);

    lines.push(`\nTrade/negotiation guidance: when discussing a specific trade offer (my players vs. another club's players), weigh both sides on TrueVal and on "AltPosFit" — a player's rating at a different compatible position, using the same formula as their listed-position "Rating". A player can be a hidden bargain or a hidden overpay: e.g. a nominal fullback with an unusually high alternate-position rating elsewhere is worth more than their listed rating suggests, and vice versa. Call this out in plain language (what the numbers show), never by the literal column name "AltPosFit". If a player central to the discussion isn't showing up with full detail (Club/Age/Rating/TrueVal/AltPosFit) in the sections below, say so plainly instead of guessing at their attributes — don't invent numbers for a player you don't have data on.`);

    const FORMATION_TIERS = { 1: ['442', '433', '4231', '532', '343'], 2: ['352', '541', '4411'], 3: ['4321', '451'], 4: ['4141', '442 D', '3421'], 5: ['3241', '4222', '4132'] };
    const analyticsLv = this.clubFacData?.levels?.analytics;
    const unlockedFormations = analyticsLv
      ? Object.keys(FORMATION_TIERS).filter(l => +l <= analyticsLv).flatMap(l => FORMATION_TIERS[l]).join(', ')
      : null;
    const roleRef = Object.entries(PLAYER_ROLES).map(([pos, roles]) => `${pos}: ${roles.join(' / ')}`).join('; ');
    const planBRef = PLAN_B_SCENARIOS.map(s => s.label).join(', ');
    const planBNamedRef = PLAN_B_NAMED_PLANS.join(' / ');
    lines.push(`\nGame mechanics reference (fixed game rules — these are the actual dropdown options in the live submission form, not opponent-specific data):
- Formations are gated by Analytics Dept facility level, cumulative: Lv1 unlocks 442/433/4231/532/343, Lv2 adds 352/541/4411, Lv3 adds 4321/451, Lv4 adds 4141/442 D/3421, Lv5 adds 3241/4222/4132.${analyticsLv ? ` My club's Analytics Dept is level ${analyticsLv} → currently unlocked: ${unlockedFormations}.` : ' (My club\'s current Analytics Dept level isn\'t loaded this session — check the My Club tab.)'}
- Match instructions (6 dropdowns): Mentality (Very Defensive / Defensive / Balanced / Attacking / Very Attacking), Style (Short / Mixed / Direct), Structure (Fluid / Balanced / Rigid), Defensive Line (Deep / Low / Medium / High), Attacking Focus (Left / Right / Central / Mixed), Pressing Intensity (High Press / Mid-Block / Low Block / Counter Press).
- Set-piece takers (Captain, Penalty, Free-kick, Corner) are just player assignments — no extra tuning for penalties or free-kicks. Corners alone have dedicated instructions: Attacking corner — Delivery (Inswinger / Outswinger / Driven / Short Corner), Stay Back (1 or 2 players forward), 7 zone roles (Near Post, Far Post, Penalty Spot, Blockade, Edge of Box, Short Corner, Hold Back). Defensive corner — Scheme (Zonal / Man-to-Man / Hybrid), Press (Hold Shape / Press Taker), 6 zone roles (Near Post, Far Post, 6-Yard Box, Penalty Spot, Edge of Box, Counter Runner).
- Corner Delivery has a FIXED target zone baked into the game engine — you don't choose delivery and target separately, picking the delivery type IS picking the target: Inswinger curves toward goal and rewards far-post runners, Outswinger curves away and sets up a near-post flick-on, Driven is flat and hard with the penalty spot as the target, Short Corner is a short lay-off that pulls a defender out wide. Reason about which zone you actually want the ball delivered to, then pick the Delivery that produces it.
- Substitutions: 5 subs per match. Each sub has a Plan (the game's own field label is "Instruction" — same 5 mentality values above) and a Timing trigger = a window (Half-time / 46-60' / 61-75' / 76'-) plus a condition. Only the Half-time window offers "if losing" as a condition; the other three windows only offer "if winning" / "if not winning" / "any situation". **Critically, a sub's Plan is not a description of that player — it changes the team's overall mentality from the moment that sub comes on, and that change persists (it becomes the new baseline) until a later sub sets a different one.** So picking "Balanced" for an early any-situation sub when the match started on "Attacking" is a real, active downgrade to a more conservative approach for the rest of the match, not a neutral label — and if the next two subs are also "Balanced", only the first one is actually doing anything; the other two are just re-stating what's already in effect. Default any-situation subs to the SAME Plan as the match's starting Mentality, so freshening legs doesn't silently drift the team's approach — save deliberate Plan changes for the "if winning" (step toward Defensive, to protect a lead) and "if not winning" (step toward Attacking/Very Attacking, to chase the game) subs, where a real mentality shift is exactly the point.
- Player Roles: each starting XI player can also be given a tactical Role, gated by that player's own BASE position (not whichever slot they're filling if playing out of position) — the options are: ${roleRef}. Only pick a role from the list for that player's own base position; never invent a role or borrow one from a different position's list.
- Plan B: up to 6 scenario-triggered whole-team plan shifts, each firing at MOST ONCE per match and involving NO personnel changes (personnel changes are what the 5 subs above are for) — the fixed scenarios are: ${planBRef}. Each scenario a manager configures gets assigned ONE named Plan from a fixed, real vocabulary confirmed straight off a real live opponent submission — ${planBNamedRef} — so recommend a SPECIFIC named Plan per scenario you address (e.g. "Losing by 2+ → Chase The Game", "Winning by 2+ → Shut Up Shop or Hold Shape"), never a vague description instead of a real name. What's NOT confirmed is the exact underlying Mentality/Style/etc. value each named Plan triggers under the hood — so name the Plan, don't invent what it numerically does. Precedence, per the game's own on-page copy: a later sub's Instruction overrides an earlier Plan B, and vice versa — whichever one fires most recently wins and sets the team's approach from that point on.`);

    const squad = (this.allPlayers || []).filter(p => p.Club === MY_CLUB);
    if (squad.length) {
      lines.push(`\nMy squad (${squad.length} players) — Name | Pos | Age | Rating | Fitness | Foot | TrueVal (source) | AltPosFit | Ldr/Ment/Exp | FK/Pen/Cor:`);
      squad.slice().sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).forEach(p => {
        const fit = p.fitnessPct != null ? `${p.fitnessPct}%` : '?';
        const altFit = this._altFitStr(p);
        const capt = `${p.Leadership ?? '?'}/${p.Mentality ?? '?'}/${p.Experience ?? '?'}`;
        const setPiece = `${p['Free kicks'] ?? '?'}/${p.Penalties ?? '?'}/${p.Corners ?? '?'}`;
        lines.push(`${p.Player} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fit} | ${p.PreferredFoot || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)}) | ${altFit} | ${capt} | ${setPiece}${p.injured ? ' [INJURED]' : ''}${p.suspended ? ' [SUSPENDED]' : ''}`);
      });
      lines.push(`Lineup-suggestion guidance: "AltPosFit" is each player's game-formula rating (same weighted-attribute formula as "Rating") if played at a different compatible position instead of their listed one. Some players inflate their nominal position's rating via one shared attribute (e.g. a converted DM's high Stamina alone can push their FB rating above a true fullback's) — always cross-check AltPosFit and recommend whichever position the numbers actually favor, not just the listed Position. For captain, weigh Leadership ("Ldr/Ment/Exp", first number) most heavily, with Mentality and Experience as secondary factors — do not just default to the highest-rated or best-known player. For set-piece takers, use the dedicated Free kicks / Penalties / Corners attributes ("FK/Pen/Cor") for the free-kick / penalty / corner taker respectively — these are literal in-game attributes, not proxies. For substitutions, the game allows 5 subs per match (not 3) — actively plan to use 3-5 of them with sensible Plan + Timing combinations suited to the match state (e.g. fresh legs / attacking sub late if chasing the game, a defensive sub to protect a lead), rather than defaulting to only 1-2 subs or leaving slots blank. For wide forwards (WF, left or right), check "Foot" against the Role you're giving them before picking which side they play: an "Inside Forward" cuts inside onto their STRONGER foot to shoot/create centrally, so a LEFT-footed inside forward belongs on the RIGHT wing and a RIGHT-footed one on the LEFT wing (the reverse of what you'd naively assume); a "Traditional Winger" instead hugs the touchline and crosses with the outside foot, so they usually suit the wing matching their OWN strong foot instead (opposite convention from Inside Forward) — a "Wide Playmaker" is closer to the Inside Forward convention. Check each wide forward's foot individually; two wide forwards given the same role does not mean they belong on the same-logic side.`);
    }

    const targets = (this.allPlayers || [])
      .filter(p => p.Club && p.Club !== MY_CLUB && !this.vacantClubs?.has(p.Club) && (p._gameRating || 0) >= 78)
      .sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0))
      .slice(0, 25);
    if (targets.length) {
      lines.push(`\nTop-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | TrueVal (source) | AltPosFit:`);
      targets.forEach(p => {
        lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)}) | ${this._altFitStr(p)}`);
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

    // Negotiation support: when discussing a trade, the model needs full-position ratings and
    // TrueVal for whichever specific players/clubs the conversation actually names — not just
    // the top-25-by-rating pool above, which misses squad-depth pieces that routinely show up in
    // real trade offers (e.g. a 77-rated throw-in). Scanning the user's own messages for club and
    // player names keeps this targeted instead of dumping the whole league into every request.
    const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const convoText = this.chatMessages
      .filter(m => m.role === 'user')
      .flatMap(m => blocksOf(m.content).filter(b => b.type === 'text' && b.text).map(b => b.text))
      .join('\n');
    const alreadyShown = new Set([...squad, ...targets, ...listed].map(p => p.Player));

    if (convoText) {
      const otherClubs = [...new Set((this.allPlayers || []).map(p => p.Club).filter(c => c && c !== MY_CLUB))];
      const mentionedClubs = otherClubs.filter(c => new RegExp(`\\b${escapeRe(c)}\\b`, 'i').test(convoText)).slice(0, 5);
      mentionedClubs.forEach(club => {
        const roster = (this.allPlayers || []).filter(p => p.Club === club).sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).slice(0, 30);
        if (!roster.length) return;
        lines.push(`\n${club} squad (club named in this conversation) — Name | Pos | Age | Rating | TrueVal (source) | AltPosFit:`);
        roster.forEach(p => {
          alreadyShown.add(p.Player);
          lines.push(`${p.Player} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)}) | ${this._altFitStr(p)}`);
        });
        // Their own real corner setup (from the same submission the tactics table above reads) —
        // who they actually put where. Only added for a club actually named in the conversation
        // (not the full opponent-tactics table, to keep that table's per-club cost small).
        const [, sub] = tactics.find(([c]) => c === club) || [];
        const ac = sub?.setPieces?.attackingCorner;
        const dc = sub?.setPieces?.defensiveCorner;
        if (ac || dc) {
          lines.push(`${club}'s own corner setup (from their current submission):`);
          if (ac) {
            const zones = Object.entries(ac.zones || {}).filter(([, name]) => name).map(([zone, name]) => `${zone}: ${name}`).join(', ');
            lines.push(`- Attacking corner — Delivery: ${ac.delivery || '?'}, Stay back: ${ac.stayBack ?? '?'}. Zone assignments (who THEY put where when THEY attack a corner): ${zones || '?'}.`);
          }
          if (dc) {
            const zones = Object.entries(dc.zones || {}).filter(([, name]) => name).map(([zone, name]) => `${zone}: ${name}`).join(', ');
            lines.push(`- Defensive corner — Scheme: ${dc.scheme || '?'}, Press: ${dc.press || '?'}. Zone assignments (who THEY put where when THEY defend a corner): ${zones || '?'}.`);
          }
        }
        // Their own real Plan B scenario→Plan pairs — the tactics table above only shows a
        // configured-count ("X/6"), never the actual pairings, so this is the only place the
        // model can ground a claim about what a SPECIFIC named Plan they'll react with actually
        // is (needed for the mirrored-scenario cross-referencing asked for in Section 3 below —
        // without this, that guidance would just invite a plausible-sounding guess).
        if (Array.isArray(sub?.planBs) && sub.planBs.length) {
          const pbPairs = sub.planBs.map(pb => `${PLAN_B_SCENARIOS.find(s => s.key === pb.scenario)?.label || pb.scenario}: ${pb.plan}`).join(', ');
          lines.push(`${club}'s own Plan B (their real scenario → named Plan pairs, from this submission): ${pbPairs}.`);
        }
      });

      const mentionedPlayers = (this.allPlayers || [])
        .filter(p => p.Player && p.Club && p.Club !== MY_CLUB && !alreadyShown.has(p.Player))
        .filter(p => {
          const surname = p.Player.trim().split(/\s+/).slice(-1)[0];
          return surname && surname.length >= 3 && new RegExp(`\\b${escapeRe(surname)}\\b`, 'i').test(convoText);
        })
        .sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0))
        .slice(0, 30);
      if (mentionedPlayers.length) {
        lines.push(`\nOther players named in this conversation — Name | Club | Pos | Age | Rating | TrueVal (source) | AltPosFit:`);
        mentionedPlayers.forEach(p => {
          lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(this.trueVal(p))} (${this.trueValSrc(p)}) | ${this._altFitStr(p)}`);
        });
      }
    }

    if (tactics.length) {
      lines.push(`\nOpponent tactics — each club's most recently submitted lineup (this can be their plan for an upcoming, not-yet-played gameweek, so treat it as their likely XI/setup) — Club | Formation | Mentality | Style | GW status | Plan B configured | XI (with each player's own tactical Role in parens, where set):`);
      tactics.forEach(([club, s]) => {
        const xi = (s.xi || []).map(p => p.name ? (p.role ? `${p.name} (${p.role})` : p.name) : null).filter(Boolean).join(', ');
        const planBCount = Array.isArray(s.planBs) ? s.planBs.length : 0;
        lines.push(`${club} | ${fmtFormation(s.formation) || '?'} | ${s.instructions?.mentality || '?'} | ${s.instructions?.style || '?'} | ${submissionGwStatus(s)} | ${planBCount}/6 | ${xi || '?'}`);
      });
      lines.push(`Reading opponent Roles: each XI player's Role (shown in parens above) is their REAL individual tactical instruction and overrides any generic assumption you'd make from mentality/formation alone — e.g. an "Overlapper" genuinely bombs forward and can be isolated in behind, but a "Two-Way Full Back" or "Defensive Full Back" at the same slot is far more conservative and won't leave the same space even under an Attacking mentality; a "Box-to-Box Midfielder" actually roams forward and can vacate defensive space, unlike a true "Anchor"/"Destroyer" who holds position. Don't say "both full-backs push on" or "they have a holding midfielder" unless each specific player's own Role actually supports it — check them individually, since a side can easily have one attacking full-back and one conservative one, or no true defensive midfielder at all despite looking solid on paper.`);
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
      lines.push(`\nBefore you send a reply to a "how should I line up against X" question, check it against this list — if any item is missing or wrong, fix it now, don't send an incomplete or inconsistent reply. Section order is: 1 Opponent breakdown, 2 Recommended lineup, 3 Substitutions (incl. Plan B), 4 Match instructions, 5 Set pieces, 6 Corner tactics.
- Section 2 has a reasoning paragraph BEFORE the flat lineup list (not after), in plain language — the word "AltPosFit" never appears anywhere in the reply. The list itself is one-slot-per-line (SLOT: Player Name (rating, fitness%) — Role: Role Name), not grouped into "Back 4:"/"Midfield:" style headers, with "(C)" on the captain's line, a real rating AND fitness number on every line, and a Role valid for that player's own base position (see the Player Roles list in the game mechanics reference) — never a role from a different position's list.
- Every player in Section 2 is at their natural/listed position UNLESS the paragraph above the list explicitly justified the move with both rating numbers — no unexplained position swaps, especially not two players trading places with each other. For AM/WF/CF, double check you checked EVERY attacking player's rating at the slot in question, not just whoever's listed Position already matches it — don't silently drop a flexible player just because they're not the obvious candidate. Same for the CB/FB/DM cluster — if you moved a player off their natural position there, check you weighed what it costs the position they're leaving, not just the rating they gain in the new one; that cost is real if they're one of the stronger options at their natural spot, and close to nothing if they're just squad depth there. Also verify: no CB/FB/DM player is playing a slot where their rating is actually lower than their own natural-position rating, and no higher-rated fit natural candidate for a slot is sitting unused without a stated reason.
- Section 2's reasoning paragraph explicitly named every notable player NOT starting and why (not just who was picked), and every wide forward's wing assignment matches their Foot for the Role they were given (Inside Forward: stronger foot on the inside cutting in; Traditional Winger: stronger foot on the outside hugging the line).
- Every "any situation" sub's Plan matches the match's starting Mentality (routine rotation shouldn't silently change team approach); only the "if winning" and "if not winning" subs actually change the Plan, since a sub's Plan overrides team mentality from that point on and persists until changed again.
- Every Section 2 starter sent out at meaningfully reduced fitness (roughly under 70%) has an actual, named sub addressing them in Section 3 — re-check this specifically, it's an easy thing to silently skip. Every sub billed as "fresh legs" is actually fresher (higher fitness%) than the player they're replacing — a low-fitness bench option isn't a fresh-legs sub.
- Section 3 ends with a short Plan B block (2-4 scenarios from the fixed list, more if the opponent's own Plan B column shows them well-covered) — each line names a SPECIFIC named Plan from the fixed 7-option vocabulary, never a vague description or an invented name, and where the opponent's own Plan B detail is available, at least one line cross-references their mirrored-scenario reaction by name (our conceding-early response should account for their known scoring-early reaction, and so on) rather than reasoning about our own scenario in isolation.
- Section 1 opens with a standalone scouting read on the opponent (their own strengths/weaknesses/threat profile) BEFORE tying it into our specific matchup — not straight into personnel matchups with no general picture first. It also read the opponent's actual per-player Roles (not generic mentality-based assumptions) and, if their Plan B is heavily configured, said so as an observation (never claimed we can "engineer" a scoreline into existence — the actionable version of that point belongs in Section 3, not here).
- Section 4's Attacking Focus actually matches the personnel you picked in Section 2 — don't focus the attack down a side you just staffed with a weaker or repositioned player. ALL SIX of Section 4's lines have their own real reason, including "Balanced"/"Mixed"/"Medium" choices — not just the extreme-sounding ones. Sections 3 and 4 each carry a short specific reason, not a generic one that could apply to any opponent.
- Every one of Section 3's 5 sub lines has all 5 parts: literal window, condition in parens, both player names with "IN for", the Plan in parens, and a reason — none dropped, none merged into a summary.
- Section 5's three set-piece takers were checked independently against the Penalties/Free kicks/Corners attributes — re-verify you didn't just hand all three to the same attacking player without actually comparing numbers.
- Section 6 (Corner tactics) exists as its own section with the literal 4-line Delivery/Stay Back/Scheme/Press block, and Delivery reflects the fixed target zone it produces (see the corner-delivery mapping in the game mechanics reference). If the opponent's own corner zone assignments are available in context, Section 6 names specific opposing players (a real threat to mark, a real weakness to target) rather than staying generic. This is the single most commonly forgotten section of this reply — verify it's actually there before sending.
- Section 1 named a specific personnel matchup (a player vs their direct opponent, or a combo like RB+RW vs their LB+LW), not just abstract team-level strengths/weaknesses, and its staleness read used the opponent-tactics table's computed GW status rather than eyeballing a raw GW number.`);
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
  // Heuristic, not an LLM call: cheap client-side check for "how should I line up against X"
  // style questions, so the worker can request JSON-schema-constrained output (guaranteed-valid
  // sub timing, corner fields, etc.) only for this question type — every other kind of question
  // (transfers, scouting, general squad talk) keeps the normal free-form reply.
  _isLineupVsOpponentQuestion(text) {
    const t = (text || '').toLowerCase();
    if (!/\b(line[\s-]?up|starting xi|predicted xi|team news)\b/.test(t)) return false;
    if (!/\b(against|vs\.?|versus)\b/.test(t)) return false;
    const clubs = new Set((this.allPlayers || []).map(p => p.Club).filter(Boolean));
    return [...clubs].some(c => c && c !== MY_CLUB && t.includes(c.toLowerCase()));
  },
  async _requestAssistantReply(sessionId) {
    this.chatError = '';
    this.chatLoading = true;
    this.saveChatHistory(sessionId);
    this.$nextTick(() => this.scrollChatToBottom());

    const controller = new AbortController();
    this._chatAbortController = controller;
    const lastUserMsg = [...this.chatMessages].reverse().find(m => m.role === 'user');
    const lastUserText = lastUserMsg
      ? blocksOf(lastUserMsg.content).filter(b => b.type === 'text').map(b => b.text).join(' ')
      : '';
    const lineupMode = this._isLineupVsOpponentQuestion(lastUserText);
    // Adaptive thinking (re-enabled 2026-07-24) means every reply now does a real reasoning
    // pass before answering, not just lineupMode ones — 45s was tuned for the old
    // thinking-disabled config and was cutting off in-progress replies well before they
    // finished. Real testing this session regularly saw 60-90s for lineupMode (thinking +
    // JSON schema generation), occasionally more. 2026-07-25: the worker now retries the whole
    // Anthropic call once, server-side, if the first structured-output attempt comes back
    // broken (see the isLineupReplyBroken/maxAttempts logic in cf-worker/index.js) — a live
    // test hit 101s on a single successful attempt, so two sequential attempts can plausibly
    // approach 200s+. 240s leaves real margin for that worst case without waiting forever on a
    // genuinely stuck request. 2026-07-29: free-text messages now retry server-side too (on a
    // completely empty reply — see cf-worker/index.js), which a real test against a complex
    // matchup (Arsenal away at Liverpool) actually hit, so they get the same generous timeout
    // rather than the old tighter one, which could plausibly abort mid-retry.
    const timeoutMs = 240000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const payload = {
        context: this.buildChatContext(),
        lineupMode,
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
