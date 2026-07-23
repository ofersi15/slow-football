import { SF_WORKER_BASE } from '../cache.js'
import { MY_CLUB } from '../constants.js'
import { fmtVal } from '../utils.js'

const CHAT_LS_KEY = 'sf_chat_history_v1';
const MAX_HISTORY = 30;

export const assistantMethods = {
  loadChatHistory() {
    try {
      const raw = localStorage.getItem(CHAT_LS_KEY);
      if (raw) this.chatMessages = JSON.parse(raw);
    } catch(e) {}
  },
  saveChatHistory() {
    try { localStorage.setItem(CHAT_LS_KEY, JSON.stringify(this.chatMessages.slice(-MAX_HISTORY))); } catch(e) {}
  },
  clearChat() {
    this.chatMessages = [];
    this.chatError = '';
    try { localStorage.removeItem(CHAT_LS_KEY); } catch(e) {}
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

    const squad = (this.allPlayers || []).filter(p => p.Club === MY_CLUB);
    if (squad.length) {
      lines.push(`\nMy squad (${squad.length} players) — Name | Pos | Age | Rating | Value:`);
      squad.slice().sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0)).forEach(p => {
        lines.push(`${p.Player} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(p.Value)}${p.injured ? ' [INJURED]' : ''}${p.suspended ? ' [SUSPENDED]' : ''}`);
      });
    }

    const targets = (this.allPlayers || [])
      .filter(p => p.Club && p.Club !== MY_CLUB && !this.vacantClubs?.has(p.Club) && (p._gameRating || 0) >= 78)
      .sort((a, b) => (b._gameRating || 0) - (a._gameRating || 0))
      .slice(0, 40);
    if (targets.length) {
      lines.push(`\nTop-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | Value:`);
      targets.forEach(p => {
        lines.push(`${p.Player} | ${p.Club} | ${p.Position} | ${p.Age} | ${p._gameRating || '?'} | ${fmtVal(p.Value)}`);
      });
    }

    return lines.join('\n');
  },
  async sendChatMessage() {
    const text = (this.chatInput || '').trim();
    if (!text || this.chatLoading) return;
    this.chatMessages.push({ role: 'user', content: text, ts: Date.now() });
    this.chatInput = '';
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
