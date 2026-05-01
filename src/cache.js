import { PROXY_TOKEN_URL, MY_CLUB } from './constants.js'

// ── Off-thread JSON helpers ───────────────────────────────────────────────────
// parseAsync: avoids a 200ms freeze when reading the 1940KB player cache on load.
// stringifyAsync: avoids the 2–5s freeze when writing the cache after a fresh squad fetch.
// Both fall back to synchronous equivalents if Workers aren't available.
export function parseAsync(jsonStr) {
  if (typeof Worker === 'undefined') return Promise.resolve(JSON.parse(jsonStr));
  return new Promise((resolve, reject) => {
    const blob = new Blob(
      ['self.onmessage=e=>{try{postMessage({r:JSON.parse(e.data)})}catch(x){postMessage({e:String(x)})}}'],
      {type: 'text/javascript'}
    );
    const url = URL.createObjectURL(blob);
    const w = new Worker(url);
    w.onmessage = ({data}) => {
      w.terminate(); URL.revokeObjectURL(url);
      data.r !== undefined ? resolve(data.r) : reject(new Error(data.e));
    };
    w.onerror = err => { w.terminate(); URL.revokeObjectURL(url); reject(err); };
    w.postMessage(jsonStr);
  });
}

export function stringifyAsync(data) {
  if (typeof Worker === 'undefined') return Promise.resolve(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    const blob = new Blob(
      ['self.onmessage=e=>{try{postMessage(JSON.stringify(e.data))}catch(x){postMessage({__e:String(x)})}}'],
      {type: 'text/javascript'}
    );
    const url = URL.createObjectURL(blob);
    const w = new Worker(url);
    w.onmessage = ({data}) => {
      w.terminate(); URL.revokeObjectURL(url);
      typeof data === 'string' ? resolve(data) : reject(new Error(data?.__e || 'stringify failed'));
    };
    w.onerror = err => { w.terminate(); URL.revokeObjectURL(url); reject(err); };
    w.postMessage(data);
  });
}

// ── Auth ──────────────────────────────────────────────────────────────────────
let _cachedToken = null;
export async function getAuthToken() {
  if (_cachedToken) return _cachedToken;
  const data = await fetch(PROXY_TOKEN_URL).then(r => r.json());
  _cachedToken = data.token || null;
  return _cachedToken;
}
export function authHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (_cachedToken) { h['Authorization'] = `Bearer ${_cachedToken}`; h['X-Club'] = MY_CLUB; h['X-Role'] = 'manager'; }
  return h;
}

// ── Server-side cache helpers ─────────────────────────────────────────────────
export const SF_CACHE_BASE = location.hostname === 'sf.ofersi15.workers.dev'
  ? 'https://sf-cache.ofersi15.workers.dev/sf-cache'
  : '/sf-cache';
export const SF_WORKER_BASE = 'https://sf-cache.ofersi15.workers.dev';

export async function serverCacheGet(key, noStore = false) {
  if (location.protocol === 'file:') return null;
  try {
    const opts = {signal: AbortSignal.timeout(3000)};
    if (noStore) opts.cache = 'no-store';
    const r = await fetch(`${SF_CACHE_BASE}/${key}`, opts);
    if (!r.ok) return null;
    return await r.text();
  } catch(e) { return null; }
}

export async function serverCacheSet(key, str) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}?permanent=1`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: str,
      signal: AbortSignal.timeout(5000),
    });
  } catch(e) {}
}

export async function serverCacheDelete(key) {
  if (location.protocol === 'file:') return;
  try {
    await fetch(`${SF_CACHE_BASE}/${key}`, {method: 'DELETE', signal: AbortSignal.timeout(3000)});
  } catch(e) {}
}
