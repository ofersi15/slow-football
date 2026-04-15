#!/usr/bin/env node
// browse-game.js — authenticated headless browser for slowfootball.club
// Usage: node browse-game.js <url> [selector-to-wait-for]
// Example: node browse-game.js "https://slowfootball.club/profile?tab=Career"
//
// Reads credentials from ../.game-creds.json
// Caches session cookies in .session.json so it only logs in once

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDS_FILE = path.join(__dirname, '..', '.game-creds.json');
const SESSION_FILE = path.join(__dirname, '.session.json');
const BASE = 'https://slowfootball.club';

function loadCreds() {
  if (!existsSync(CREDS_FILE)) {
    console.error('ERROR: .game-creds.json not found at', CREDS_FILE);
    process.exit(1);
  }
  return JSON.parse(readFileSync(CREDS_FILE, 'utf8'));
}

function loadSession() {
  if (!existsSync(SESSION_FILE)) return null;
  try {
    const s = JSON.parse(readFileSync(SESSION_FILE, 'utf8'));
    if (s.expires && Date.now() > s.expires) return null; // expired
    return s.cookies;
  } catch { return null; }
}

function saveSession(cookies) {
  writeFileSync(SESSION_FILE, JSON.stringify({
    cookies,
    expires: Date.now() + 23 * 60 * 60 * 1000, // 23 hours
  }));
}

async function login(page, creds) {
  console.log('[browse] logging in…');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[name="username"]', creds.username);
  await page.fill('input[type="password"]', creds.password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);
  const finalUrl = page.url();
  if (finalUrl.includes('/login')) {
    console.error('[browse] login failed — still on login page. Check credentials.');
    process.exit(1);
  }
  const cookies = await page.context().cookies();
  saveSession(cookies);
  console.log('[browse] logged in →', finalUrl);
  return cookies;
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node browse-game.js <url> [wait-selector]');
    process.exit(1);
  }
  const waitSelector = process.argv[3] || null;

  const creds = loadCreds();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
  });
  const page = await context.newPage();

  // Try cached session first
  const savedCookies = loadSession();
  if (savedCookies) {
    console.log('[browse] using cached session');
    await context.addCookies(savedCookies);
  }

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // Check if we got redirected to login
  if (page.url().includes('/login')) {
    await login(page, creds);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  }

  // Wait for optional selector
  if (waitSelector) {
    await page.waitForSelector(waitSelector, { timeout: 10000 }).catch(() => {
      console.warn('[browse] selector not found:', waitSelector);
    });
  }

  // Dump page text content
  const title = await page.title();
  const text = await page.evaluate(() => document.body.innerText);

  console.log('=== PAGE:', url);
  console.log('=== TITLE:', title);
  console.log('=== CONTENT:');
  console.log(text);

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
