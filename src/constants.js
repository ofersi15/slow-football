// ── API & App constants ───────────────────────────────────────────────────────
const API = 'https://slowfootball.club/api';
const MY_CLUB = 'Leverkusen';
const PROXY_TOKEN_URL = 'https://sf-game-proxy.ofersi15.workers.dev/token';

const ALL_LEAGUES = ['north','south','europa','world','conference','hipster'];
// AI-controlled clubs — excluded from scout/tables; never count as vacancies
const AI_CLUBS = new Set(['Barcelona','Bayern Munich','Juventus','Damac','Saudi All-Stars','Inter Miami']);
const ALL_POSITIONS = ['GK','FB','CB','DM','CM','AM','WF','CF'];
const OUTFIELD_POSITIONS = ['FB','CB','DM','CM','AM','WF','CF'];
const PAGE_SIZE = 100;

// ── Cache keys & TTLs ─────────────────────────────────────────────────────────
const TACTICS_CACHE_KEY = 'sf_tactics_v4';
const TACTICS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const PLAYERS_CACHE_KEY = 'sf_players_v6';
const STATS_CACHE_KEY = 'sf_stats_v1';
const PLAYERS_CACHE_TTL = 6 * 60 * 60 * 1000;
const SUBMISSIONS_CACHE_KEY = 'sf_submissions_all_v1';
const SUBMISSIONS_CACHE_TTL = 2 * 60 * 60 * 1000;
const SUBMISSIONS_LS_KEY = 'sf_subs_ls';

// ── Position attribute formulas ───────────────────────────────────────────────
// Game-validated: Rating ≈ avg of these 4 attrs per position
const GAME_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],
  FB: ['Passing','Tackling','Stamina','Marking'],
  CB: ['Marking','Heading','Tackling','Speed'],
  DM: ['Tackling','Passing','Vision','Marking'],
  CM: ['Vision','Passing','Dribbling','Shooting'],
  AM: ['Passing','Dribbling','Shooting','Vision'],
  WF: ['Dribbling','Passing','Speed','Shooting'],
  CF: ['Speed','Dribbling','Heading','Shooting'],
};
const GAME_ATTR_LABELS = {
  GK: 'Han, Ref, Spd, Pas',   FB: 'Pas, Tck, Sta, Mk',
  CB: 'Mk, Hdg, Tck, Spd',    DM: 'Tck, Pas, Vis, Mk',
  CM: 'Vis, Pas, Drb, Sh',    AM: 'Pas, Drb, Sh, Vis',
  WF: 'Drb, Pas, Spd, Sh',    CF: 'Spd, Drb, Hdg, Sh',
};

// Slot → compatible player positions (from game source)
const SLOT_COMPAT = {
  GK: ['GK'],
  CB: ['CB','FB','DM'],
  FB: ['FB','CB','DM'],
  DM: ['DM','FB','CB','AM'],
  CM: ['CM','DM','AM'],
  AM: ['AM','WF','CF','DM'],
  WM: ['FB','DM','AM','WF'],
  WF: ['WF','AM','CF'],
  CF: ['CF','WF','AM'],
};

// Slot-specific attrs for Best XI scoring (CM/WM are blended positions)
const SLOT_ATTRS = {
  GK: ['Handling','Reflexes','Speed','Passing'],
  CB: ['Marking','Heading','Tackling','Speed'],
  FB: ['Passing','Tackling','Stamina','Marking'],
  DM: ['Tackling','Marking','Passing','Vision'],
  CM: ['Passing','Vision','Tackling','Dribbling'],
  AM: ['Passing','Dribbling','Shooting','Vision'],
  WM: ['Stamina','Passing','Speed','Dribbling'],
  WF: ['Dribbling','Passing','Speed','Shooting'],
  CF: ['Speed','Dribbling','Heading','Shooting'],
};

const DEFAULT_MENTAL_ATTRS = ['Mentality','Experience','Work rate'];
const FULL_ATTR_KEYS = ['Speed','Passing','Marking','Heading','Tackling','Stamina','Dribbling','Shooting','Handling','Reflexes','Strength','Vision'];

// ── Formations ────────────────────────────────────────────────────────────────
const FORMATIONS = {
  '442':  ['GK','FB','CB','CB','FB','WM','CM','CM','WM','CF','CF'],
  '4411': ['GK','FB','CB','CB','FB','WM','CM','CM','WM','AM','CF'],
  '4231': ['GK','FB','CB','CB','FB','DM','DM','WF','AM','WF','CF'],
  '433':  ['GK','FB','CB','CB','FB','CM','CM','CM','WF','WF','CF'],
  '4321': ['GK','FB','CB','CB','FB','CM','CM','CM','AM','AM','CF'],
  '3421': ['GK','CB','CB','CB','WM','CM','CM','WM','AM','AM','CF'],
  '352':  ['GK','CB','CB','CB','WM','CM','CM','CM','WM','CF','CF'],
  '343':  ['GK','CB','CB','CB','WM','CM','CM','WM','WF','CF','WF'],
};

// SVG pitch coordinates per formation slot (x 0–68, y 0–105)
const FORMATION_SLOT_POS = {
  '442':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:55},{x:44,y:55},{x:24,y:55},{x:9,y:55},{x:44,y:20},{x:24,y:20}],
  '4411': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:59,y:57},{x:44,y:57},{x:24,y:57},{x:9,y:57},{x:34,y:35},{x:34,y:13}],
  '4231': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:45,y:63},{x:23,y:63},{x:58,y:40},{x:34,y:40},{x:10,y:40},{x:34,y:13}],
  '433':  [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:48,y:56},{x:34,y:56},{x:20,y:56},{x:58,y:28},{x:10,y:28},{x:34,y:13}],
  '3421': [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:60,y:59},{x:43,y:59},{x:25,y:59},{x:8,y:59},{x:44,y:35},{x:24,y:35},{x:34,y:13}],
  '352':  [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:61,y:58},{x:46,y:58},{x:34,y:58},{x:22,y:58},{x:7,y:58},{x:44,y:20},{x:24,y:20}],
  '343':  [{x:34,y:97},{x:51,y:78},{x:34,y:78},{x:17,y:78},{x:60,y:59},{x:43,y:59},{x:25,y:59},{x:8,y:59},{x:58,y:20},{x:34,y:13},{x:10,y:20}],
  '4321': [{x:34,y:97},{x:60,y:78},{x:45,y:78},{x:23,y:78},{x:8,y:78},{x:50,y:60},{x:34,y:60},{x:18,y:60},{x:44,y:37},{x:24,y:37},{x:34,y:13}],
};

// Key attribute to display per base position in club XI view
const MAIN_ATTR = {
  GK:'Reflexes', FB:'Speed', CB:'Marking', DM:'Tackling',
  CM:'Passing',  WM:'Dribbling', AM:'Vision', WF:'Dribbling', CF:'Shooting',
};

const POS_ORDER = {GK:0,CB:1,FB:2,DM:3,CM:4,WM:5,AM:6,WF:7,CF:8};

const POS_COLORS = {
  GK: {fill:'#2d4a1a',stroke:'#7ee787',text:'#7ee787'},
  FB: {fill:'#1a3a5e',stroke:'#79c0ff',text:'#79c0ff'},
  CB: {fill:'#1a3060',stroke:'#79c0ff',text:'#79c0ff'},
  DM: {fill:'#3a2a6b',stroke:'#d2a8ff',text:'#d2a8ff'},
  CM: {fill:'#3a2a1a',stroke:'#ffa657',text:'#ffa657'},
  WM: {fill:'#3a1a3a',stroke:'#d2a8ff',text:'#d2a8ff'},
  AM: {fill:'#4a3a10',stroke:'#ffa657',text:'#ffa657'},
  WF: {fill:'#3a1a1a',stroke:'#ff7b72',text:'#ff7b72'},
  CF: {fill:'#5a1010',stroke:'#ff7b72',text:'#ff7b72'},
};

// ── Chemistry constants ───────────────────────────────────────────────────────
const GAME_START = new Date("2025-08-23T00:00:00Z").getTime();
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
