# Cold Outreach Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a CLI tool that discovers businesses with bad websites, generates custom demo sites via Claude, records scroll videos, and runs a 4-touch email+WhatsApp outreach sequence — managed through a local dashboard.

**Architecture:** Standalone Node.js/TypeScript CLI at `~/outreach/` with SQLite for persistence, Express for a local dashboard, Claude API for demo generation and email composition, Playwright for screenshots and video recording, FFmpeg for video stitching and GIF extraction, and Cloudflare R2 for hosting.

**Tech Stack:** TypeScript, Node.js, commander.js, better-sqlite3, Express, Playwright, FFmpeg, Nodemailer, Anthropic SDK, AWS S3 SDK (for R2), nanoid

**Spec:** `docs/superpowers/specs/2026-03-30-outreach-pipeline-design.md`

---

## File Map

```
~/outreach/
├── src/
│   ├── index.ts              — CLI entry point (commander.js commands)
│   ├── config.ts             — Load and validate config.json + .env
│   ├── db.ts                 — SQLite schema, migrations, query helpers
│   ├── discover.ts           — Outscraper API: find businesses + extract competitors
│   ├── analyze.ts            — PageSpeed API + Playwright: score websites, take screenshots
│   ├── score.ts              — Priority scoring and queue filtering
│   ├── generate-demo.ts      — Claude API: generate single-page HTML demos
│   ├── validate-demo.ts      — HTML validation (business name, placeholders, structure)
│   ├── record-video.ts       — Playwright: desktop+mobile scroll recording + FFmpeg stitch
│   ├── generate-gif.ts       — FFmpeg: extract animated GIF teaser from video
│   ├── deploy-demo.ts        — Upload HTML/video/GIF/preview to Cloudflare R2
│   ├── compose-email.ts      — Claude API: generate 4-touch email sequence
│   ├── send.ts               — Nodemailer: send Day 0/3/10 emails with GIF embedding
│   ├── sequence.ts           — Query due sequence actions, advance steps
│   ├── prepare.ts            — Orchestrator: chains score→analyze→demo→video→gif→deploy→compose
│   ├── cleanup.ts            — Delete expired demos from R2 + local files
│   ├── r2.ts                 — Cloudflare R2 upload/delete helpers (S3-compatible)
│   ├── dashboard/
│   │   ├── server.ts         — Express app setup + static file serving
│   │   ├── routes.ts         — All API routes (/api/stats, /api/batch, etc.)
│   │   └── public/
│   │       ├── index.html    — Overview dashboard page
│   │       ├── batch.html    — Today's batch review page
│   │       ├── sequences.html — Sequence manager page
│   │       ├── deals.html    — Deal pipeline kanban page
│   │       ├── prospects.html — Prospect database page
│   │       ├── log.html      — Outreach log page
│   │       ├── settings.html — Settings page
│   │       ├── app.css       — Shared styles
│   │       └── app.js        — Shared client-side JS (fetch helpers, components)
│   └── types.ts              — Shared TypeScript types (Prospect, Config, etc.)
├── data/                     — Created at runtime, gitignored
├── config.json               — Target industries, cities, limits
├── .env.example              — Template for API keys
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Phase 1: Foundation (Tasks 1-3)

### Task 1: Project Scaffold

**Files:**
- Create: `~/outreach/package.json`
- Create: `~/outreach/tsconfig.json`
- Create: `~/outreach/.gitignore`
- Create: `~/outreach/.env.example`
- Create: `~/outreach/config.json`

- [ ] **Step 1: Create project directory and init**

```bash
mkdir -p ~/outreach && cd ~/outreach
npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install typescript @types/node commander better-sqlite3 @types/better-sqlite3 express @types/express nodemailer @types/nodemailer @anthropic-ai/sdk @aws-sdk/client-s3 nanoid@3 dotenv playwright
npm install -D tsx
```

Note: `nanoid@3` because v4+ is ESM-only. Playwright will also need browsers installed:
```bash
npx playwright install chromium
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "data"]
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
data/
.env
*.db
```

- [ ] **Step 5: Create .env.example**

```
OUTSCRAPER_API_KEY=
GOOGLE_PAGESPEED_API_KEY=
ANTHROPIC_API_KEY=
GMAIL_APP_PASSWORD=
GMAIL_USER=contact@onurhaniffa.com
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
```

- [ ] **Step 6: Create config.json**

```json
{
  "targets": [
    { "query": "plumbers London", "industry": "trades", "city": "London", "country": "UK" },
    { "query": "dental clinics Manchester", "industry": "dental", "city": "Manchester", "country": "UK" },
    { "query": "hair salons Birmingham", "industry": "salon", "city": "Birmingham", "country": "UK" },
    { "query": "restaurants Leeds", "industry": "restaurant", "city": "Leeds", "country": "UK" },
    { "query": "electricians Dublin", "industry": "trades", "city": "Dublin", "country": "IE" },
    { "query": "dentists Sydney", "industry": "dental", "city": "Sydney", "country": "AU" }
  ],
  "dailyLimit": 5,
  "sequence": {
    "day0": "email",
    "day3": "followup_email",
    "day6": "whatsapp",
    "day10": "breakup_email"
  },
  "demoExpiryDays": 30,
  "scoring": {
    "noWebsite": 100,
    "pagespeedBelow30": 90,
    "pagespeedBelow50": 70,
    "noSSL": 60,
    "notMobileResponsive": 80
  },
  "sender": {
    "name": "Onur Haniffa",
    "email": "contact@onurhaniffa.com",
    "signature": "Onur Haniffa\nWeb Designer — onurhaniffa.com"
  },
  "cloudflare": {
    "r2Bucket": "outreach-demos",
    "publicDomain": "demos.onurhaniffa.com"
  }
}
```

- [ ] **Step 7: Add npm scripts to package.json**

Add to `package.json` scripts:
```json
{
  "scripts": {
    "outreach": "tsx src/index.ts"
  }
}
```

- [ ] **Step 8: Create data directories**

```bash
mkdir -p ~/outreach/data/{screenshots,demos,videos,gifs}
```

- [ ] **Step 9: Commit**

```bash
cd ~/outreach && git init
git add -A
git commit -m "chore: scaffold outreach pipeline project"
```

---

### Task 2: Types + Config + Database

**Files:**
- Create: `~/outreach/src/types.ts`
- Create: `~/outreach/src/config.ts`
- Create: `~/outreach/src/db.ts`

- [ ] **Step 1: Create src/types.ts**

```typescript
export interface Target {
  query: string;
  industry: string;
  city: string;
  country: string;
}

export interface Config {
  targets: Target[];
  dailyLimit: number;
  sequence: {
    day0: string;
    day3: string;
    day6: string;
    day10: string;
  };
  demoExpiryDays: number;
  scoring: {
    noWebsite: number;
    pagespeedBelow30: number;
    pagespeedBelow50: number;
    noSSL: number;
    notMobileResponsive: number;
  };
  sender: {
    name: string;
    email: string;
    signature: string;
  };
  cloudflare: {
    r2Bucket: string;
    publicDomain: string;
  };
}

export interface Prospect {
  id: number;
  business_name: string;
  industry: string;
  city: string;
  country: string;
  website_url: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  google_rating: number | null;
  google_reviews: number | null;
  has_website: boolean;
  pagespeed_score: number | null;
  is_mobile_friendly: boolean | null;
  has_ssl: boolean | null;
  screenshot_path: string | null;
  priority_score: number;
  competitor1: string | null;
  competitor2: string | null;
  status: string;
  discovered_at: string;
  demo_url: string | null;
  demo_token: string | null;
  video_url: string | null;
  gif_url: string | null;
  gif_local_path: string | null;
  sequence_step: number;
  day0_message_id: string | null;
  day0_subject: string | null;
  day0_body: string | null;
  day3_body: string | null;
  day10_body: string | null;
  whatsapp_message: string | null;
  day0_sent_at: string | null;
  day3_sent_at: string | null;
  day6_whatsapp_sent: boolean;
  day6_whatsapp_sent_at: string | null;
  day10_sent_at: string | null;
  opted_out: boolean;
  replied: boolean;
  reply_channel: string | null;
  reply_sentiment: string | null;
  reply_notes: string | null;
  replied_at: string | null;
  deal_stage: string | null;
  deal_value: number | null;
  deal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutreachLogEntry {
  id: number;
  prospect_id: number;
  action: string;
  details: string | null;
  created_at: string;
}

export interface ScrapeHistory {
  id: number;
  query: string;
  results_count: number | null;
  queued_count: number | null;
  scraped_at: string;
}
```

- [ ] **Step 2: Create src/config.ts**

```typescript
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';
import type { Config } from './types';

const ROOT = resolve(__dirname, '..');

dotenvConfig({ path: resolve(ROOT, '.env') });

export function loadConfig(): Config {
  const raw = readFileSync(resolve(ROOT, 'config.json'), 'utf-8');
  const config: Config = JSON.parse(raw);

  // Validate required fields
  if (!config.targets?.length) throw new Error('config.json: targets array is empty');
  if (!config.sender?.email) throw new Error('config.json: sender.email is required');
  if (!config.cloudflare?.r2Bucket) throw new Error('config.json: cloudflare.r2Bucket is required');

  return config;
}

export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}. Check your .env file.`);
  return val;
}

export const DATA_DIR = resolve(ROOT, 'data');
export const SCREENSHOTS_DIR = resolve(DATA_DIR, 'screenshots');
export const DEMOS_DIR = resolve(DATA_DIR, 'demos');
export const VIDEOS_DIR = resolve(DATA_DIR, 'videos');
export const GIFS_DIR = resolve(DATA_DIR, 'gifs');
export const DB_PATH = resolve(DATA_DIR, 'outreach.db');
```

- [ ] **Step 3: Create src/db.ts**

```typescript
import Database from 'better-sqlite3';
import { DB_PATH } from './config';
import type { Prospect, OutreachLogEntry } from './types';

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS prospects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_name TEXT NOT NULL,
      industry TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      website_url TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      google_rating REAL,
      google_reviews INTEGER,
      has_website BOOLEAN DEFAULT 1,
      pagespeed_score INTEGER,
      is_mobile_friendly BOOLEAN,
      has_ssl BOOLEAN,
      screenshot_path TEXT,
      priority_score INTEGER DEFAULT 0,
      competitor1 TEXT,
      competitor2 TEXT,
      status TEXT DEFAULT 'discovered',
      discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      demo_url TEXT,
      demo_token TEXT,
      video_url TEXT,
      gif_url TEXT,
      gif_local_path TEXT,
      sequence_step INTEGER DEFAULT 0,
      day0_message_id TEXT,
      day0_subject TEXT,
      day0_body TEXT,
      day3_body TEXT,
      day10_body TEXT,
      whatsapp_message TEXT,
      day0_sent_at DATETIME,
      day3_sent_at DATETIME,
      day6_whatsapp_sent BOOLEAN DEFAULT 0,
      day6_whatsapp_sent_at DATETIME,
      day10_sent_at DATETIME,
      opted_out BOOLEAN DEFAULT 0,
      replied BOOLEAN DEFAULT 0,
      reply_channel TEXT,
      reply_sentiment TEXT,
      reply_notes TEXT,
      replied_at DATETIME,
      deal_stage TEXT,
      deal_value REAL,
      deal_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(email, business_name)
    );

    CREATE TABLE IF NOT EXISTS outreach_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prospect_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (prospect_id) REFERENCES prospects(id)
    );

    CREATE TABLE IF NOT EXISTS scrape_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      results_count INTEGER,
      queued_count INTEGER,
      scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_prospects_sequence ON prospects(sequence_step, day0_sent_at, replied, opted_out);
    CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
  `);
}

export function insertProspect(data: Partial<Prospect>): number | null {
  const db = getDb();
  try {
    const stmt = db.prepare(`
      INSERT INTO prospects (business_name, industry, city, country, website_url, email, phone, address, google_rating, google_reviews, has_website, competitor1, competitor2)
      VALUES (@business_name, @industry, @city, @country, @website_url, @email, @phone, @address, @google_rating, @google_reviews, @has_website, @competitor1, @competitor2)
    `);
    const result = stmt.run(data);
    return result.lastInsertRowid as number;
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') return null; // duplicate
    throw err;
  }
}

export function updateProspect(id: number, fields: Record<string, any>): void {
  const db = getDb();
  const sets = Object.keys(fields).map(k => `${k} = @${k}`).join(', ');
  const stmt = db.prepare(`UPDATE prospects SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = @id`);
  stmt.run({ ...fields, id });
}

export function getProspectsByStatus(status: string, limit?: number): Prospect[] {
  const db = getDb();
  const sql = limit
    ? `SELECT * FROM prospects WHERE status = ? ORDER BY priority_score DESC LIMIT ?`
    : `SELECT * FROM prospects WHERE status = ? ORDER BY priority_score DESC`;
  return limit ? db.prepare(sql).all(status, limit) as Prospect[] : db.prepare(sql).all(status) as Prospect[];
}

export function getProspectById(id: number): Prospect | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM prospects WHERE id = ?').get(id) as Prospect | undefined;
}

export function logAction(prospectId: number, action: string, details?: string): void {
  const db = getDb();
  db.prepare('INSERT INTO outreach_log (prospect_id, action, details) VALUES (?, ?, ?)').run(prospectId, action, details ?? null);
}

export function logScrape(query: string, resultsCount: number, queuedCount: number): void {
  const db = getDb();
  db.prepare('INSERT INTO scrape_history (query, results_count, queued_count) VALUES (?, ?, ?)').run(query, resultsCount, queuedCount);
}

export function getDueDay3(): Prospect[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM prospects
    WHERE sequence_step = 1
      AND day0_sent_at <= datetime('now', '-3 days')
      AND replied = 0
      AND opted_out = 0
  `).all() as Prospect[];
}

export function getDueDay10(): Prospect[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM prospects
    WHERE sequence_step >= 2
      AND day0_sent_at <= datetime('now', '-10 days')
      AND day10_sent_at IS NULL
      AND replied = 0
      AND opted_out = 0
  `).all() as Prospect[];
}

export function getDueWhatsApp(): Prospect[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM prospects
    WHERE sequence_step = 2
      AND day3_sent_at <= datetime('now', '-3 days')
      AND day6_whatsapp_sent = 0
      AND replied = 0
      AND opted_out = 0
  `).all() as Prospect[];
}
```

- [ ] **Step 4: Verify DB initialises correctly**

```bash
cd ~/outreach && npx tsx -e "const { getDb } = require('./src/db'); const db = getDb(); console.log('Tables:', db.prepare(\"SELECT name FROM sqlite_master WHERE type='table'\").all());"
```

Expected: prints 3 tables (prospects, outreach_log, scrape_history)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add types, config loader, and database layer"
```

---

### Task 3: CLI Skeleton

**Files:**
- Create: `~/outreach/src/index.ts`

- [ ] **Step 1: Create src/index.ts with all command stubs**

```typescript
import { Command } from 'commander';

const program = new Command();

program
  .name('outreach')
  .description('Cold outreach pipeline — find businesses, build demos, send personalised emails')
  .version('1.0.0');

program
  .command('discover')
  .description('Scrape businesses from Google Maps via Outscraper')
  .option('-q, --query <query>', 'Specific search query (overrides config rotation)')
  .action(async (opts) => {
    const { runDiscover } = await import('./discover');
    await runDiscover(opts.query);
  });

program
  .command('prepare')
  .description('Generate demos, videos, GIFs, and emails for today\'s batch')
  .option('-n, --count <n>', 'Number of prospects to prepare', '5')
  .action(async (opts) => {
    const { runPrepare } = await import('./prepare');
    await runPrepare(parseInt(opts.count, 10));
  });

program
  .command('dashboard')
  .description('Start local dashboard at localhost:3333')
  .option('-p, --port <port>', 'Port number', '3333')
  .action(async (opts) => {
    const { startDashboard } = await import('./dashboard/server');
    await startDashboard(parseInt(opts.port, 10));
  });

program
  .command('send')
  .description('Send Day 0 emails + due Day 3 follow-ups + due Day 10 breakups')
  .action(async () => {
    const { runSend } = await import('./send');
    await runSend();
  });

program
  .command('whatsapp')
  .description('Show Day 6 WhatsApp messages due today')
  .action(async () => {
    const { showDueWhatsApp } = await import('./sequence');
    await showDueWhatsApp();
  });

program
  .command('cleanup')
  .description('Delete expired demos older than 30 days')
  .action(async () => {
    const { runCleanup } = await import('./cleanup');
    await runCleanup();
  });

program
  .command('status')
  .description('Show pipeline overview')
  .action(async () => {
    const { showStatus } = await import('./sequence');
    await showStatus();
  });

program.parse();
```

- [ ] **Step 2: Verify CLI runs**

```bash
cd ~/outreach && npm run outreach -- --help
```

Expected: Shows all 7 commands with descriptions.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: add CLI skeleton with all command stubs"
```

---

## Phase 2: Discovery & Scoring (Tasks 4-6)

### Task 4: Discovery — Outscraper Integration

**Files:**
- Create: `~/outreach/src/discover.ts`

- [ ] **Step 1: Create src/discover.ts**

```typescript
import { loadConfig, requireEnv } from './config';
import { insertProspect, logScrape, getDb } from './db';

interface OutscraperResult {
  name?: string;
  site?: string;
  phone?: string;
  full_address?: string;
  rating?: number;
  reviews?: number;
  email?: string;
}

async function fetchBusinesses(query: string, apiKey: string): Promise<OutscraperResult[]> {
  const url = new URL('https://api.app.outscraper.com/maps/search-v3');
  url.searchParams.set('query', query);
  url.searchParams.set('limit', '40');
  url.searchParams.set('async', 'false');

  const res = await fetch(url.toString(), {
    headers: { 'X-API-KEY': apiKey }
  });

  if (!res.ok) throw new Error(`Outscraper API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  // Outscraper returns array of arrays — first element is results
  return (data?.data?.[0] ?? data?.[0] ?? []) as OutscraperResult[];
}

async function fetchEmail(websiteUrl: string, apiKey: string): Promise<string | null> {
  const url = new URL('https://api.app.outscraper.com/emails-and-contacts');
  url.searchParams.set('query', websiteUrl);
  url.searchParams.set('async', 'false');

  const res = await fetch(url.toString(), {
    headers: { 'X-API-KEY': apiKey }
  });

  if (!res.ok) return null;
  const data = await res.json();
  const emails = data?.data?.[0]?.emails ?? data?.[0]?.emails ?? [];
  return emails[0] ?? null;
}

function extractCompetitors(results: OutscraperResult[]): string[] {
  return results
    .filter(r => r.site && r.rating && r.rating >= 4.0)
    .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 3)
    .map(r => r.name ?? 'Unknown')
    .filter(Boolean);
}

export async function runDiscover(queryOverride?: string): Promise<void> {
  const config = loadConfig();
  const apiKey = requireEnv('OUTSCRAPER_API_KEY');

  // Pick the target: override or rotate through config targets
  let query: string;
  if (queryOverride) {
    query = queryOverride;
  } else {
    // Simple rotation: pick next target based on scrape_history count
    const db = getDb();
    const counts = db.prepare(
      'SELECT query, COUNT(*) as cnt FROM scrape_history GROUP BY query'
    ).all() as { query: string; cnt: number }[];
    const countMap = new Map(counts.map(c => [c.query, c.cnt]));
    // Find target with fewest scrapes
    const sorted = [...config.targets].sort(
      (a, b) => (countMap.get(a.query) ?? 0) - (countMap.get(b.query) ?? 0)
    );
    query = sorted[0].query;
  }

  // Find matching target config for industry/city/country
  const target = config.targets.find(t => t.query === query) ?? {
    query,
    industry: 'general',
    city: query.split(' ').slice(-1)[0],
    country: 'UK'
  };

  console.log(`🔍 Discovering: "${query}"`);

  const results = await fetchBusinesses(query, apiKey);
  console.log(`   Found ${results.length} results`);

  const competitors = extractCompetitors(results);
  let queued = 0;

  for (const biz of results) {
    if (!biz.name) continue;

    // Get email — from Outscraper result or by scraping their website
    let email = biz.email ?? null;
    if (!email && biz.site) {
      email = await fetchEmail(biz.site, apiKey);
    }

    // Skip if no email or no phone
    if (!email || !biz.phone) continue;

    // Assign competitors (businesses in same query that have websites)
    const comp = competitors.filter(c => c !== biz.name);

    const inserted = insertProspect({
      business_name: biz.name,
      industry: target.industry,
      city: target.city,
      country: target.country,
      website_url: biz.site ?? null,
      email,
      phone: biz.phone,
      address: biz.full_address ?? null,
      google_rating: biz.rating ?? null,
      google_reviews: biz.reviews ?? null,
      has_website: !!biz.site,
      competitor1: comp[0] ?? null,
      competitor2: comp[1] ?? null,
    } as any);

    if (inserted) queued++;
  }

  logScrape(query, results.length, queued);
  console.log(`✅ Queued ${queued} new prospects (${results.length - queued} skipped — duplicates or missing email/phone)`);
}
```

- [ ] **Step 2: Test with a dry run** (requires OUTSCRAPER_API_KEY in .env)

```bash
cd ~/outreach && npm run outreach -- discover --query "plumbers London"
```

Expected: Prints discovery results and queued count.

- [ ] **Step 3: Commit**

```bash
git add src/discover.ts
git commit -m "feat: add business discovery via Outscraper API"
```

---

### Task 5: Analysis — PageSpeed + Playwright Screenshots

**Files:**
- Create: `~/outreach/src/analyze.ts`

- [ ] **Step 1: Create src/analyze.ts**

```typescript
import { chromium } from 'playwright';
import { resolve } from 'path';
import { mkdirSync } from 'fs';
import { requireEnv, SCREENSHOTS_DIR } from './config';
import { updateProspect } from './db';
import type { Prospect } from './types';

interface PageSpeedResult {
  score: number;
  lcp: number;
  cls: number;
  fcp: number;
}

async function runPageSpeed(url: string): Promise<PageSpeedResult | null> {
  const apiKey = requireEnv('GOOGLE_PAGESPEED_API_KEY');
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('strategy', 'mobile');
  apiUrl.searchParams.set('category', 'performance');
  apiUrl.searchParams.set('key', apiKey);

  try {
    const res = await fetch(apiUrl.toString());
    if (!res.ok) return null;
    const data = await res.json();
    const lh = data.lighthouseResult;
    return {
      score: Math.round((lh?.categories?.performance?.score ?? 0) * 100),
      lcp: lh?.audits?.['largest-contentful-paint']?.numericValue ?? 0,
      cls: lh?.audits?.['cumulative-layout-shift']?.numericValue ?? 0,
      fcp: lh?.audits?.['first-contentful-paint']?.numericValue ?? 0,
    };
  } catch {
    return null;
  }
}

async function checkSslAndMobile(url: string): Promise<{ hasSsl: boolean; isMobileFriendly: boolean; screenshotPath: string | null }> {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const finalUrl = page.url();
    const hasSsl = finalUrl.startsWith('https://');

    const hasViewport = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return !!meta;
    });

    return { hasSsl, isMobileFriendly: hasViewport, screenshotPath: null };
  } catch {
    return { hasSsl: false, isMobileFriendly: false, screenshotPath: null };
  } finally {
    await browser.close();
  }
}

async function takeScreenshot(url: string, prospectId: number): Promise<string | null> {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const screenshotPath = resolve(SCREENSHOTS_DIR, `${prospectId}.png`);

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  } catch {
    return null;
  } finally {
    await browser.close();
  }
}

export async function analyzeProspect(prospect: Prospect): Promise<void> {
  console.log(`   Analyzing: ${prospect.business_name}`);

  if (!prospect.website_url || !prospect.has_website) {
    updateProspect(prospect.id, {
      pagespeed_score: 0,
      is_mobile_friendly: 0,
      has_ssl: 0,
      has_website: 0,
    });
    return;
  }

  // Run PageSpeed and SSL/mobile checks in parallel
  const [pagespeed, checks] = await Promise.all([
    runPageSpeed(prospect.website_url),
    checkSslAndMobile(prospect.website_url),
  ]);

  // Take screenshot separately (full page, desktop)
  const screenshotPath = await takeScreenshot(prospect.website_url, prospect.id);

  updateProspect(prospect.id, {
    pagespeed_score: pagespeed?.score ?? null,
    is_mobile_friendly: checks.isMobileFriendly ? 1 : 0,
    has_ssl: checks.hasSsl ? 1 : 0,
    screenshot_path: screenshotPath,
  });

  console.log(`   → PageSpeed: ${pagespeed?.score ?? 'N/A'}/100, SSL: ${checks.hasSsl}, Mobile: ${checks.isMobileFriendly}`);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/analyze.ts
git commit -m "feat: add website analysis (PageSpeed + Playwright screenshots)"
```

---

### Task 6: Scoring

**Files:**
- Create: `~/outreach/src/score.ts`

- [ ] **Step 1: Create src/score.ts**

```typescript
import { loadConfig } from './config';
import { getDb, updateProspect } from './db';
import type { Prospect } from './types';

const EXCLUDED_COUNTRIES = ['AE', 'DE']; // UAE and Germany — strict consent laws

export function scoreAndQueueProspects(): number {
  const config = loadConfig();
  const db = getDb();
  const scoring = config.scoring;

  // Get all discovered prospects that haven't been scored yet
  const prospects = db.prepare(`
    SELECT * FROM prospects
    WHERE status = 'discovered'
      AND (pagespeed_score IS NOT NULL OR has_website = 0)
  `).all() as Prospect[];

  let queued = 0;

  for (const p of prospects) {
    // Filter out excluded countries
    if (EXCLUDED_COUNTRIES.includes(p.country)) continue;

    // Must have email and phone
    if (!p.email || !p.phone) continue;

    // Must not be opted out
    if (p.opted_out) continue;

    // Calculate priority score
    let score = 0;
    if (!p.has_website) score += scoring.noWebsite;
    if (p.pagespeed_score !== null && p.pagespeed_score < 30) score += scoring.pagespeedBelow30;
    else if (p.pagespeed_score !== null && p.pagespeed_score < 50) score += scoring.pagespeedBelow50;
    if (p.is_mobile_friendly === false || p.is_mobile_friendly === 0) score += scoring.notMobileResponsive;
    if (p.has_ssl === false || p.has_ssl === 0) score += scoring.noSSL;

    // Bonus for high Google ratings (they're good businesses with bad websites — ideal)
    if (p.google_rating && p.google_rating >= 4.5) score += 20;
    if (p.google_reviews && p.google_reviews >= 50) score += 10;

    updateProspect(p.id, {
      priority_score: score,
      status: 'queued',
    });
    queued++;
  }

  console.log(`📊 Scored ${prospects.length} prospects, queued ${queued}`);
  return queued;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/score.ts
git commit -m "feat: add prospect scoring and queue filtering"
```

---

## Phase 3: Demo Generation & Media (Tasks 7-10)

### Task 7: Demo Generation — Claude API

**Files:**
- Create: `~/outreach/src/generate-demo.ts`
- Create: `~/outreach/src/validate-demo.ts`

- [ ] **Step 1: Create src/validate-demo.ts**

```typescript
const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /your business/i,
  /company name/i,
  /123[- ]456/,
  /555-/,
  /example\.com/i,
  /john doe/i,
  /\[placeholder\]/i,
  /acme/i,
  /sample text/i,
  /your name here/i,
  /www\.yoursite/i,
  /info@example/i,
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateDemo(html: string, businessName: string, phone: string | null): ValidationResult {
  const errors: string[] = [];

  // Check business name appears
  if (!html.includes(businessName)) {
    errors.push(`Business name "${businessName}" not found in HTML`);
  }

  // Check phone appears (if provided)
  if (phone) {
    const normalizedPhone = phone.replace(/[\s\-()]/g, '');
    const htmlNormalized = html.replace(/[\s\-()]/g, '');
    if (!htmlNormalized.includes(normalizedPhone) && !html.includes(phone)) {
      errors.push(`Phone number "${phone}" not found in HTML`);
    }
  }

  // Check for placeholder text
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(html)) {
      errors.push(`Placeholder text detected: ${pattern.source}`);
    }
  }

  // Check basic HTML structure
  if (!html.includes('<html')) errors.push('Missing <html> tag');
  if (!html.includes('<head')) errors.push('Missing <head> tag');
  if (!html.includes('<body')) errors.push('Missing <body> tag');

  // Check viewport meta
  if (!html.includes('viewport')) errors.push('Missing viewport meta tag');

  // Check file size (rough: string length in bytes)
  const sizeKB = Buffer.byteLength(html, 'utf-8') / 1024;
  if (sizeKB < 5) errors.push(`HTML too small (${sizeKB.toFixed(0)}KB — likely empty)`);
  if (sizeKB > 500) errors.push(`HTML too large (${sizeKB.toFixed(0)}KB — likely bloated)`);

  // Check watermark
  if (!html.includes('Onur Haniffa')) errors.push('Missing Onur Haniffa watermark in footer');

  return { valid: errors.length === 0, errors };
}
```

- [ ] **Step 2: Create src/generate-demo.ts**

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { nanoid } from 'nanoid';
import { requireEnv, DEMOS_DIR } from './config';
import { updateProspect } from './db';
import { validateDemo } from './validate-demo';
import type { Prospect } from './types';

const DEMO_PROMPT = `You are generating a demo website for a real business. This will be shown to the business owner as a concept of what their website could look like.

BUSINESS DETAILS:
- Name: {business_name}
- Industry: {industry}
- City: {city}
- Phone: {phone}
- Address: {address}
- Google Rating: {rating}★ ({reviews} reviews)

{website_context}

REQUIREMENTS:
- Generate a complete, single-page HTML file with ALL CSS inline in a <style> tag (no external dependencies, no CDN links, no external fonts)
- Use the business's REAL name, phone number, and address throughout — do NOT use any placeholder text anywhere
- Sections: hero with a strong CTA (e.g., "Call us today" with their real phone number), services/what we do (use realistic services for their industry), about/why choose us, testimonials area (use "Your {rating}★ Google reviews speak for themselves" — do NOT invent fake testimonial quotes), contact section with real address and phone
- Mobile responsive (must look great at 375px width — use a single-column layout on mobile)
- Modern design: clean typography (use system font stack), generous whitespace, subtle CSS-only animations (fade-in on scroll or hover effects), professional colour palette appropriate for the industry
- DO NOT use placeholder images — use solid colour blocks, CSS gradients, or simple inline SVG icons instead
- DO NOT include any generic placeholder text — every word must be specific to this business and its industry
- Footer must include: "Demo concept by Onur Haniffa — onurhaniffa.com" in subtle, small, low-opacity text
- Make it look like a real, custom-built website, not a template
- IMPORTANT: Vary your design approach. Do not use the same layout, colour scheme, or section order as your previous outputs. Each demo should feel unique.
- Return ONLY the HTML — no markdown, no explanation, just the complete HTML document starting with <!DOCTYPE html>`;

function buildPrompt(prospect: Prospect): string {
  const websiteContext = prospect.has_website
    ? `Their current website scores ${prospect.pagespeed_score ?? 'unknown'}/100 on Google PageSpeed. ${!prospect.is_mobile_friendly ? 'It is NOT mobile-friendly.' : ''} ${!prospect.has_ssl ? 'It does NOT have SSL.' : ''} Create something that is clearly a significant upgrade — modern, fast, clean.`
    : 'They currently have no website at all. Create something that shows them what they\'re missing.';

  return DEMO_PROMPT
    .replace('{business_name}', prospect.business_name)
    .replace('{industry}', prospect.industry)
    .replace('{city}', prospect.city)
    .replace('{phone}', prospect.phone ?? 'N/A')
    .replace('{address}', prospect.address ?? prospect.city)
    .replace('{rating}', String(prospect.google_rating ?? 'N/A'))
    .replace(/\{rating\}/g, String(prospect.google_rating ?? 'N/A'))
    .replace('{reviews}', String(prospect.google_reviews ?? 0))
    .replace('{website_context}', websiteContext);
}

export async function generateDemo(prospect: Prospect): Promise<{ html: string; token: string } | null> {
  const client = new Anthropic({ apiKey: requireEnv('ANTHROPIC_API_KEY') });
  const prompt = buildPrompt(prospect);

  console.log(`   Generating demo for: ${prospect.business_name}`);

  // Build messages — include screenshot if available
  const content: Anthropic.ContentBlockParam[] = [{ type: 'text', text: prompt }];

  if (prospect.screenshot_path) {
    try {
      const imgData = readFileSync(prospect.screenshot_path);
      content.unshift({
        type: 'image',
        source: {
          type: 'base64',
          media_type: 'image/png',
          data: imgData.toString('base64'),
        },
      });
      content.unshift({ type: 'text', text: 'Here is a screenshot of their current website:' });
    } catch {
      // Screenshot not found, proceed without it
    }
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content }],
    });

    const html = (response.content[0] as Anthropic.TextBlock).text.trim();

    const validation = validateDemo(html, prospect.business_name, prospect.phone);

    if (validation.valid) {
      const token = nanoid(12);
      const demoDir = resolve(DEMOS_DIR, String(prospect.id));
      mkdirSync(demoDir, { recursive: true });
      writeFileSync(resolve(demoDir, 'index.html'), html, 'utf-8');

      updateProspect(prospect.id, { demo_token: token });
      console.log(`   ✅ Demo generated (token: ${token})`);
      return { html, token };
    }

    console.log(`   ⚠️ Validation failed (attempt ${attempt + 1}): ${validation.errors.join(', ')}`);

    if (attempt === 0) {
      // Retry with feedback
      content.push({
        type: 'text',
        text: `The HTML you generated had these issues: ${validation.errors.join('; ')}. Please fix them and regenerate. Return ONLY the corrected HTML.`,
      });
    }
  }

  console.log(`   ❌ Demo generation failed after 2 attempts, skipping`);
  return null;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/generate-demo.ts src/validate-demo.ts
git commit -m "feat: add Claude demo generation with validation"
```

---

### Task 8: Video Recording — Playwright + FFmpeg

**Files:**
- Create: `~/outreach/src/record-video.ts`

- [ ] **Step 1: Verify FFmpeg is installed**

```bash
which ffmpeg && ffmpeg -version | head -1
```

If not installed: `brew install ffmpeg`

- [ ] **Step 2: Create src/record-video.ts**

```typescript
import { chromium } from 'playwright';
import { resolve } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { VIDEOS_DIR, DATA_DIR } from './config';
import { DEMOS_DIR } from './config';

export async function recordVideo(prospectId: number, demoToken: string): Promise<string | null> {
  mkdirSync(VIDEOS_DIR, { recursive: true });

  const demoPath = resolve(DEMOS_DIR, String(prospectId), 'index.html');
  if (!existsSync(demoPath)) {
    console.log(`   ❌ Demo HTML not found: ${demoPath}`);
    return null;
  }

  const rawVideoPath = resolve(VIDEOS_DIR, `${prospectId}-raw.webm`);
  const introPath = resolve(DATA_DIR, 'intro.mp4');
  const outputPath = resolve(VIDEOS_DIR, `${prospectId}.mp4`);

  console.log(`   Recording video for prospect ${prospectId}...`);

  const browser = await chromium.launch({ headless: true });
  try {
    // Start with desktop viewport + video recording
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 1920, height: 1080 } },
    });
    const page = await context.newPage();

    await page.goto(`file://${demoPath}`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2000); // Let CSS animations settle

    // Desktop scroll — smooth 15 seconds
    await page.evaluate(async () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const duration = 15000;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        function step() {
          const elapsed = performance.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-in-out
          const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
          window.scrollTo(0, totalHeight * ease);
          if (progress < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    });

    await page.waitForTimeout(1000); // Pause at bottom

    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Mobile scroll — smooth 10 seconds
    await page.evaluate(async () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const duration = 10000;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        function step() {
          const elapsed = performance.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
          window.scrollTo(0, totalHeight * ease);
          if (progress < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    });

    await page.waitForTimeout(500);

    // Close context to save video
    await context.close();

    // Get the recorded video path (Playwright auto-names it)
    const video = page.video();
    if (!video) {
      console.log('   ❌ No video recorded');
      return null;
    }
    const recordedPath = await video.path();

    // FFmpeg: stitch intro + recording, convert to H.264 MP4
    if (existsSync(introPath)) {
      // Create concat file
      const concatPath = resolve(VIDEOS_DIR, `${prospectId}-concat.txt`);
      const { writeFileSync } = await import('fs');
      writeFileSync(concatPath, `file '${introPath}'\nfile '${recordedPath}'`);

      execSync(
        `ffmpeg -y -f concat -safe 0 -i "${concatPath}" -c:v libx264 -preset fast -crf 23 -r 30 -pix_fmt yuv420p -an "${outputPath}"`,
        { stdio: 'pipe', timeout: 120000 }
      );

      // Clean up temp files
      try {
        const { unlinkSync } = await import('fs');
        unlinkSync(concatPath);
        unlinkSync(recordedPath);
      } catch {}
    } else {
      // No intro clip — just convert the recording
      execSync(
        `ffmpeg -y -i "${recordedPath}" -c:v libx264 -preset fast -crf 23 -r 30 -pix_fmt yuv420p -an "${outputPath}"`,
        { stdio: 'pipe', timeout: 120000 }
      );
    }

    console.log(`   ✅ Video recorded: ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.log(`   ❌ Video recording failed: ${(err as Error).message}`);
    return null;
  } finally {
    await browser.close();
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/record-video.ts
git commit -m "feat: add desktop+mobile scroll video recording"
```

---

### Task 9: GIF Generation

**Files:**
- Create: `~/outreach/src/generate-gif.ts`

- [ ] **Step 1: Create src/generate-gif.ts**

```typescript
import { execSync } from 'child_process';
import { resolve } from 'path';
import { mkdirSync, statSync } from 'fs';
import { GIFS_DIR } from './config';

interface GifConfig {
  fps: number;
  width: number;
  duration: number;
  startOffset: number;
}

function runFfmpeg(inputPath: string, outputPath: string, cfg: GifConfig): void {
  const filter = `fps=${cfg.fps},scale=${cfg.width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;
  execSync(
    `ffmpeg -y -i "${inputPath}" -ss ${cfg.startOffset} -t ${cfg.duration} -vf "${filter}" -loop 0 "${outputPath}"`,
    { stdio: 'pipe', timeout: 60000 }
  );
}

export function generateGif(prospectId: number, videoPath: string): string | null {
  mkdirSync(GIFS_DIR, { recursive: true });
  const outputPath = resolve(GIFS_DIR, `${prospectId}.gif`);

  console.log(`   Generating GIF for prospect ${prospectId}...`);

  // Attempt 1: 12fps, 600px, 4 seconds, starting at 6s (after intro)
  const configs: GifConfig[] = [
    { fps: 12, width: 600, duration: 4, startOffset: 6 },
    { fps: 8, width: 480, duration: 4, startOffset: 6 },
    { fps: 6, width: 400, duration: 3, startOffset: 6 },
  ];

  for (const cfg of configs) {
    try {
      runFfmpeg(videoPath, outputPath, cfg);

      const sizeBytes = statSync(outputPath).size;
      const sizeMB = sizeBytes / (1024 * 1024);

      if (sizeMB <= 2) {
        console.log(`   ✅ GIF generated: ${sizeMB.toFixed(1)}MB (${cfg.fps}fps, ${cfg.width}px)`);
        return outputPath;
      }

      console.log(`   ⚠️ GIF too large (${sizeMB.toFixed(1)}MB), retrying with lower quality...`);
    } catch (err) {
      console.log(`   ⚠️ FFmpeg failed at ${cfg.fps}fps/${cfg.width}px: ${(err as Error).message}`);
    }
  }

  console.log(`   ❌ Could not generate GIF under 2MB, skipping`);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/generate-gif.ts
git commit -m "feat: add animated GIF extraction from video"
```

---

### Task 10: R2 Upload + Demo Deployment

**Files:**
- Create: `~/outreach/src/r2.ts`
- Create: `~/outreach/src/deploy-demo.ts`

- [ ] **Step 1: Create src/r2.ts**

```typescript
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import { requireEnv, loadConfig } from './config';

let _client: S3Client | null = null;

function getClient(): S3Client {
  if (!_client) {
    _client = new S3Client({
      region: 'auto',
      endpoint: `https://${requireEnv('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requireEnv('CLOUDFLARE_R2_ACCESS_KEY'),
        secretAccessKey: requireEnv('CLOUDFLARE_R2_SECRET_KEY'),
      },
    });
  }
  return _client;
}

function getBucket(): string {
  return loadConfig().cloudflare.r2Bucket;
}

export async function uploadFile(key: string, filePath: string, contentType: string): Promise<string> {
  const client = getClient();
  const body = readFileSync(filePath);
  const bucket = getBucket();

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  const domain = loadConfig().cloudflare.publicDomain;
  return `https://${domain}/${key}`;
}

export async function uploadString(key: string, content: string, contentType: string): Promise<string> {
  const client = getClient();
  const bucket = getBucket();

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: Buffer.from(content, 'utf-8'),
    ContentType: contentType,
  }));

  const domain = loadConfig().cloudflare.publicDomain;
  return `https://${domain}/${key}`;
}

export async function deletePrefix(prefix: string): Promise<void> {
  const client = getClient();
  const bucket = getBucket();

  const listed = await client.send(new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  }));

  if (listed.Contents) {
    for (const obj of listed.Contents) {
      if (obj.Key) {
        await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: obj.Key }));
      }
    }
  }
}
```

- [ ] **Step 2: Create src/deploy-demo.ts**

```typescript
import { resolve } from 'path';
import { existsSync } from 'fs';
import { uploadFile, uploadString } from './r2';
import { updateProspect } from './db';
import { DEMOS_DIR } from './config';
import type { Prospect } from './types';

const PREVIEW_HTML = (businessName: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Concept for ${businessName}</title>
  <style>
    body { margin: 0; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    video { max-width: 100%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    p { margin-top: 24px; opacity: 0.7; font-size: 14px; text-align: center; }
    a { color: #60a5fa; }
  </style>
</head>
<body>
  <video controls autoplay muted playsinline>
    <source src="video.mp4" type="video/mp4">
  </video>
  <p>Like what you see? Reply to my email and let's make it happen.</p>
  <p>You can also explore the live demo: <a href="index.html">View full demo</a></p>
  <p style="opacity:0.4; font-size:12px;">Demo concept by Onur Haniffa — onurhaniffa.com</p>
</body>
</html>`;

export async function deployDemo(prospect: Prospect, videoPath: string | null, gifPath: string | null): Promise<{ demoUrl: string; videoUrl: string | null; gifUrl: string | null }> {
  const token = prospect.demo_token!;
  console.log(`   Deploying to R2: ${token}/`);

  // Upload HTML
  const htmlPath = resolve(DEMOS_DIR, String(prospect.id), 'index.html');
  const demoUrl = await uploadFile(`${token}/index.html`, htmlPath, 'text/html');

  // Upload video
  let videoUrl: string | null = null;
  if (videoPath && existsSync(videoPath)) {
    videoUrl = await uploadFile(`${token}/video.mp4`, videoPath, 'video/mp4');
  }

  // Upload GIF
  let gifUrl: string | null = null;
  if (gifPath && existsSync(gifPath)) {
    gifUrl = await uploadFile(`${token}/preview.gif`, gifPath, 'image/gif');
  }

  // Upload preview page
  await uploadString(`${token}/preview.html`, PREVIEW_HTML(prospect.business_name), 'text/html');

  // Update DB
  updateProspect(prospect.id, {
    demo_url: demoUrl,
    video_url: videoUrl,
    gif_url: gifUrl,
    gif_local_path: gifPath,
  });

  console.log(`   ✅ Deployed: ${demoUrl}`);
  return { demoUrl, videoUrl, gifUrl };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/r2.ts src/deploy-demo.ts
git commit -m "feat: add R2 upload and demo deployment"
```

---

## Phase 4: Email & Sequence (Tasks 11-14)

### Task 11: Email Composition — Claude API

**Files:**
- Create: `~/outreach/src/compose-email.ts`

- [ ] **Step 1: Create src/compose-email.ts**

The full Claude prompt from the spec is embedded here. This generates all 4 touches in a single API call.

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { requireEnv, loadConfig } from './config';
import { updateProspect } from './db';
import type { Prospect } from './types';

interface EmailSequence {
  day0_subject: string;
  day0_body: string;
  day3_body: string;
  whatsapp_message: string;
  day10_body: string;
}

const BANNED_PHRASES = [
  'i came across', 'i stumbled upon', 'i noticed', "i'd love to",
  'quick question', 'just following up', 'i hope this email finds you well',
  'touching base', 'circle back', 'reach out', 'no-brainer',
  'low-hanging fruit', 'game changer', 'win-win', 'synergy',
  'leverage', 'take it to the next level',
];

function checkBannedPhrases(seq: EmailSequence): string[] {
  const allText = [seq.day0_body, seq.day3_body, seq.whatsapp_message, seq.day10_body, seq.day0_subject].join(' ').toLowerCase();
  return BANNED_PHRASES.filter(phrase => allText.includes(phrase));
}

function buildEmailPrompt(prospect: Prospect): string {
  const issues: string[] = [];
  if (!prospect.has_website) issues.push('no website');
  else {
    if (prospect.pagespeed_score !== null) issues.push(`${prospect.pagespeed_score}/100 PageSpeed`);
    if (!prospect.is_mobile_friendly) issues.push('not mobile-friendly');
    if (!prospect.has_ssl) issues.push('no SSL');
  }

  return `You are writing a 4-touch outreach sequence for a web designer named Onur Haniffa. He has genuinely built a demo website for this business and wants to show it to them.

BUSINESS DETAILS:
- Name: ${prospect.business_name}
- Industry: ${prospect.industry}
- City: ${prospect.city}
- Google Rating: ${prospect.google_rating ?? 'N/A'}★ (${prospect.google_reviews ?? 0} reviews)
- Has website: ${prospect.has_website ? 'yes' : 'no'}
- Current website issues: ${issues.join(', ') || 'none'}
- Competitors with good websites: ${prospect.competitor1 ?? 'N/A'}, ${prospect.competitor2 ?? 'N/A'}

CONTEXT:
A GIF preview of the demo will be embedded inline in the Day 0 email — you don't need to describe the GIF, just place the marker where it should appear. A full 30-second video walkthrough link will go where you place the video marker.

VOICE & TONE:
- Write like a real human who genuinely put effort into building something for this business
- Warm, honest, slightly casual — this should read like a message from a real person
- Acknowledge honestly that this is unsolicited
- Emphasise the genuine effort
- Be respectful of their time and never pushy
- Do NOT lead with "I'm a web designer" — lead with value and their business. "Web Designer" appears in the signature.
- Include a line near the end that honestly acknowledges this is a cold email
- BANNED PHRASES (never use these): "I came across", "I stumbled upon", "I noticed", "I'd love to", "quick question", "just following up", "I hope this email finds you well", "touching base", "circle back", "reach out", "no-brainer", "low-hanging fruit", "game changer", "win-win", "synergy", "leverage", "take it to the next level"
- Each of the 4 touches must use a DIFFERENT opening and angle

OUTPUT FORMAT — return ONLY valid JSON, no markdown:
{"day0_subject":"...","day0_body":"... {GIF_PLACEHOLDER} ... {VIDEO_LINK} ...","day3_body":"... {VIDEO_LINK} ...","whatsapp_message":"... {VIDEO_LINK} ...","day10_body":"... {VIDEO_LINK} ..."}

Day 0: Subject + 4-6 sentences before {GIF_PLACEHOLDER}, then 1 sentence with {VIDEO_LINK}, sign off as "Onur Haniffa / Web Designer — onurhaniffa.com", end with "(If this isn't for you, just let me know and I won't email again.)"
Day 3: "Re: {day0_subject}" thread, 3-4 sentences, different angle, include {VIDEO_LINK}, sign as "Onur"
Day 6 WhatsApp: 3-4 lines, casual, include {VIDEO_LINK}, mention you sent an email earlier
Day 10: "Re: {day0_subject}" thread, 2-3 sentences, graceful goodbye, include {VIDEO_LINK}, sign as "Onur"`;
}

export async function composeEmail(prospect: Prospect): Promise<boolean> {
  const client = new Anthropic({ apiKey: requireEnv('ANTHROPIC_API_KEY') });

  console.log(`   Composing email sequence for: ${prospect.business_name}`);

  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [{ role: 'user', content: buildEmailPrompt(prospect) }],
    });

    const text = (response.content[0] as Anthropic.TextBlock).text.trim();

    try {
      // Extract JSON from response (Claude sometimes wraps in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');

      const seq: EmailSequence = JSON.parse(jsonMatch[0]);

      // Validate all fields present
      if (!seq.day0_subject || !seq.day0_body || !seq.day3_body || !seq.whatsapp_message || !seq.day10_body) {
        throw new Error('Missing required fields in email sequence');
      }

      // Check banned phrases
      const banned = checkBannedPhrases(seq);
      if (banned.length > 0 && attempt === 0) {
        console.log(`   ⚠️ Banned phrases found: ${banned.join(', ')}. Regenerating...`);
        continue;
      }

      // Store in DB
      updateProspect(prospect.id, {
        day0_subject: seq.day0_subject,
        day0_body: seq.day0_body,
        day3_body: seq.day3_body,
        whatsapp_message: seq.whatsapp_message,
        day10_body: seq.day10_body,
        status: 'demo_generated',
      });

      console.log(`   ✅ Email sequence composed`);
      return true;
    } catch (err) {
      console.log(`   ⚠️ Failed to parse email (attempt ${attempt + 1}): ${(err as Error).message}`);
    }
  }

  console.log(`   ❌ Email composition failed after 2 attempts`);
  return false;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/compose-email.ts
git commit -m "feat: add Claude email sequence composition"
```

---

### Task 12: Email Sending — Nodemailer

**Files:**
- Create: `~/outreach/src/send.ts`

- [ ] **Step 1: Create src/send.ts**

```typescript
import { createTransport } from 'nodemailer';
import { readFileSync, existsSync } from 'fs';
import { requireEnv, loadConfig } from './config';
import { getProspectsByStatus, updateProspect, logAction, getDueDay3, getDueDay10 } from './db';
import type { Prospect } from './types';

function getTransport() {
  return createTransport({
    service: 'gmail',
    auth: {
      user: requireEnv('GMAIL_USER'),
      pass: requireEnv('GMAIL_APP_PASSWORD'),
    },
  });
}

function buildDay0Html(body: string, gifUrl: string | null, gifLocalPath: string | null, videoUrl: string): string {
  let html = body.replace('{VIDEO_LINK}', videoUrl);

  if (gifLocalPath && existsSync(gifLocalPath)) {
    html = html.replace(
      '{GIF_PLACEHOLDER}',
      '<img src="cid:demo-gif" alt="Website demo preview" style="max-width:600px; width:100%; border-radius:8px;">'
    );
  } else {
    html = html.replace('{GIF_PLACEHOLDER}', '');
  }

  // Convert newlines to <br> for HTML
  return html.split('\n').join('<br>\n');
}

function buildPlainText(body: string, videoUrl: string): string {
  return body
    .replace('{GIF_PLACEHOLDER}', '')
    .replace('{VIDEO_LINK}', videoUrl);
}

async function sendDay0(prospect: Prospect, transport: any): Promise<string | null> {
  const config = loadConfig();
  const videoUrl = prospect.video_url
    ? `https://${config.cloudflare.publicDomain}/${prospect.demo_token}/preview.html`
    : prospect.demo_url ?? '';

  const plainText = buildPlainText(prospect.day0_body!, videoUrl);
  const html = buildDay0Html(prospect.day0_body!, prospect.gif_url, prospect.gif_local_path, videoUrl);

  const mailOptions: any = {
    from: `${config.sender.name} <${config.sender.email}>`,
    to: prospect.email!,
    subject: prospect.day0_subject!,
    text: plainText,
    html: html,
  };

  // Attach GIF inline if available
  if (prospect.gif_local_path && existsSync(prospect.gif_local_path)) {
    mailOptions.attachments = [{
      filename: 'preview.gif',
      path: prospect.gif_local_path,
      cid: 'demo-gif',
      contentDisposition: 'inline',
    }];
  }

  const info = await transport.sendMail(mailOptions);
  return info.messageId ?? null;
}

async function sendFollowUp(prospect: Prospect, body: string, transport: any): Promise<void> {
  const config = loadConfig();
  const videoUrl = `https://${config.cloudflare.publicDomain}/${prospect.demo_token}/preview.html`;
  const text = body.replace(/\{VIDEO_LINK\}/g, videoUrl);

  await transport.sendMail({
    from: `${config.sender.name} <${config.sender.email}>`,
    to: prospect.email!,
    subject: `Re: ${prospect.day0_subject}`,
    text,
    inReplyTo: prospect.day0_message_id,
    references: prospect.day0_message_id,
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runSend(): Promise<void> {
  const config = loadConfig();
  const transport = getTransport();

  // Day 0: Send new emails
  const approved = getProspectsByStatus('approved', config.dailyLimit);
  console.log(`📧 Day 0: ${approved.length} emails to send`);

  for (const prospect of approved) {
    try {
      const messageId = await sendDay0(prospect, transport);
      updateProspect(prospect.id, {
        day0_message_id: messageId,
        day0_sent_at: new Date().toISOString(),
        sequence_step: 1,
        status: 'sequence_active',
      });
      logAction(prospect.id, 'day0_email_sent');
      console.log(`   ✅ Sent to ${prospect.business_name} (${prospect.email})`);
      await sleep(30000); // 30 seconds between sends
    } catch (err) {
      console.log(`   ❌ Failed: ${prospect.business_name} — ${(err as Error).message}`);
      logAction(prospect.id, 'day0_email_sent', `FAILED: ${(err as Error).message}`);
    }
  }

  // Day 3: Send follow-ups
  const day3 = getDueDay3();
  console.log(`📧 Day 3: ${day3.length} follow-ups to send`);

  for (const prospect of day3) {
    if (!prospect.day3_body) continue;
    try {
      await sendFollowUp(prospect, prospect.day3_body, transport);
      updateProspect(prospect.id, {
        day3_sent_at: new Date().toISOString(),
        sequence_step: 2,
      });
      logAction(prospect.id, 'day3_followup_sent');
      console.log(`   ✅ Follow-up sent to ${prospect.business_name}`);
      await sleep(30000);
    } catch (err) {
      console.log(`   ❌ Failed: ${prospect.business_name} — ${(err as Error).message}`);
    }
  }

  // Day 10: Send breakups
  const day10 = getDueDay10();
  console.log(`📧 Day 10: ${day10.length} breakup emails to send`);

  for (const prospect of day10) {
    if (!prospect.day10_body) continue;
    try {
      await sendFollowUp(prospect, prospect.day10_body, transport);
      updateProspect(prospect.id, {
        day10_sent_at: new Date().toISOString(),
        sequence_step: 4,
      });
      logAction(prospect.id, 'day10_breakup_sent');
      console.log(`   ✅ Breakup sent to ${prospect.business_name}`);
      await sleep(30000);
    } catch (err) {
      console.log(`   ❌ Failed: ${prospect.business_name} — ${(err as Error).message}`);
    }
  }

  console.log('✅ Sending complete');
}
```

- [ ] **Step 2: Commit**

```bash
git add src/send.ts
git commit -m "feat: add email sending with GIF embedding and threading"
```

---

### Task 13: Sequence Manager + Status

**Files:**
- Create: `~/outreach/src/sequence.ts`

- [ ] **Step 1: Create src/sequence.ts**

```typescript
import { loadConfig } from './config';
import { getDb, getDueWhatsApp, getProspectsByStatus, getDueDay3, getDueDay10 } from './db';
import type { Prospect } from './types';

export async function showDueWhatsApp(): Promise<void> {
  const config = loadConfig();
  const due = getDueWhatsApp();

  if (due.length === 0) {
    console.log('📱 No WhatsApp messages due today');
    return;
  }

  console.log(`📱 ${due.length} WhatsApp messages due:\n`);

  for (const p of due) {
    const videoUrl = `https://${config.cloudflare.publicDomain}/${p.demo_token}/preview.html`;
    const message = (p.whatsapp_message ?? '').replace(/\{VIDEO_LINK\}/g, videoUrl);

    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Business: ${p.business_name} (${p.city})`);
    console.log(`Phone:    ${p.phone}`);
    console.log(`WhatsApp: https://wa.me/${p.phone?.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(message)}`);
    console.log(`\nMessage:\n${message}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  }

  console.log(`\nMark as sent in the dashboard after sending.`);
}

export async function showStatus(): Promise<void> {
  const db = getDb();

  const total = db.prepare('SELECT COUNT(*) as cnt FROM prospects').get() as { cnt: number };
  const queued = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'queued'").get() as { cnt: number };
  const demoGenerated = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'demo_generated'").get() as { cnt: number };
  const approved = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'approved'").get() as { cnt: number };
  const active = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'sequence_active'").get() as { cnt: number };
  const replied = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE replied = 1").get() as { cnt: number };
  const converted = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE deal_stage = 'won'").get() as { cnt: number };
  const optedOut = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE opted_out = 1").get() as { cnt: number };

  const day3Due = getDueDay3();
  const day6Due = getDueWhatsApp();
  const day10Due = getDueDay10();

  const totalEmailed = db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE day0_sent_at IS NOT NULL").get() as { cnt: number };
  const replyRate = totalEmailed.cnt > 0 ? ((replied.cnt / totalEmailed.cnt) * 100).toFixed(1) : '0.0';

  console.log(`
┌─────────────────────────────────────┐
│       OUTREACH PIPELINE STATUS      │
├─────────────────────────────────────┤
│ Total prospects:     ${String(total.cnt).padStart(6)}        │
│ In queue:            ${String(queued.cnt).padStart(6)}        │
│ Demos ready:         ${String(demoGenerated.cnt).padStart(6)}        │
│ Approved (unsent):   ${String(approved.cnt).padStart(6)}        │
│ Active sequences:    ${String(active.cnt).padStart(6)}        │
│ Replied:             ${String(replied.cnt).padStart(6)}        │
│ Converted:           ${String(converted.cnt).padStart(6)}        │
│ Opted out:           ${String(optedOut.cnt).padStart(6)}        │
├─────────────────────────────────────┤
│ Reply rate:          ${replyRate.padStart(5)}%        │
├─────────────────────────────────────┤
│ TODAY'S ACTIONS:                    │
│ Day 3 follow-ups:    ${String(day3Due.length).padStart(6)}        │
│ Day 6 WhatsApp:      ${String(day6Due.length).padStart(6)}        │
│ Day 10 breakups:     ${String(day10Due.length).padStart(6)}        │
└─────────────────────────────────────┘
  `);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sequence.ts
git commit -m "feat: add sequence manager and status display"
```

---

### Task 14: Prepare Orchestrator + Cleanup

**Files:**
- Create: `~/outreach/src/prepare.ts`
- Create: `~/outreach/src/cleanup.ts`

- [ ] **Step 1: Create src/prepare.ts**

```typescript
import { scoreAndQueueProspects } from './score';
import { getProspectsByStatus, updateProspect, logAction, getProspectById } from './db';
import { analyzeProspect } from './analyze';
import { generateDemo } from './generate-demo';
import { recordVideo } from './record-video';
import { generateGif } from './generate-gif';
import { deployDemo } from './deploy-demo';
import { composeEmail } from './compose-email';

export async function runPrepare(count: number = 5): Promise<void> {
  console.log(`\n🚀 Preparing ${count} prospects...\n`);

  // Step 1: Score unscored prospects
  scoreAndQueueProspects();

  // Step 2: Pick top N from queue
  const prospects = getProspectsByStatus('queued', count);
  if (prospects.length === 0) {
    console.log('⚠️  No prospects in queue. Run "npm run outreach discover" first.');
    return;
  }

  console.log(`📋 Processing ${prospects.length} prospects:\n`);
  let success = 0;

  for (const prospect of prospects) {
    console.log(`\n── ${prospect.business_name} (${prospect.city}) ──`);

    try {
      // 3a: Analyze if not already done
      if (prospect.pagespeed_score === null && prospect.has_website) {
        await analyzeProspect(prospect);
      }

      // Reload prospect after analysis
      const updated = getProspectById(prospect.id)!;

      // 3b: Generate HTML demo
      const demo = await generateDemo(updated);
      if (!demo) {
        logAction(prospect.id, 'status_changed', 'generation_failed');
        updateProspect(prospect.id, { status: 'rejected' });
        continue;
      }

      // 3c: Record video
      const videoPath = await recordVideo(prospect.id, demo.token);

      // 3d: Generate GIF
      let gifPath: string | null = null;
      if (videoPath) {
        gifPath = generateGif(prospect.id, videoPath);
      }

      // 3e: Deploy to R2
      const reloaded = getProspectById(prospect.id)!;
      await deployDemo(reloaded, videoPath, gifPath);

      // 3f: Compose email sequence
      const reloaded2 = getProspectById(prospect.id)!;
      const emailOk = await composeEmail(reloaded2);
      if (!emailOk) {
        updateProspect(prospect.id, { status: 'rejected' });
        continue;
      }

      success++;
      logAction(prospect.id, 'status_changed', 'demo_generated');
    } catch (err) {
      console.log(`   ❌ Error: ${(err as Error).message}`);
      logAction(prospect.id, 'status_changed', `error: ${(err as Error).message}`);
      updateProspect(prospect.id, { status: 'rejected' });
    }
  }

  console.log(`\n✅ ${success}/${prospects.length} demos ready for review.`);
  if (success > 0) {
    console.log(`Run "npm run outreach dashboard" to review and approve.\n`);
  }
}
```

- [ ] **Step 2: Create src/cleanup.ts**

```typescript
import { getDb, logAction, updateProspect } from './db';
import { loadConfig } from './config';
import { deletePrefix } from './r2';
import { resolve } from 'path';
import { existsSync, unlinkSync, rmdirSync } from 'fs';
import { DEMOS_DIR, VIDEOS_DIR, GIFS_DIR, SCREENSHOTS_DIR } from './config';
import type { Prospect } from './types';

export async function runCleanup(): Promise<void> {
  const config = loadConfig();
  const db = getDb();

  const expired = db.prepare(`
    SELECT * FROM prospects
    WHERE demo_url IS NOT NULL
      AND day0_sent_at <= datetime('now', '-${config.demoExpiryDays} days')
      AND status NOT IN ('converted', 'in_conversation', 'quoted')
      AND deal_stage IS NULL OR deal_stage NOT IN ('won', 'in_conversation', 'quoted')
  `).all() as Prospect[];

  console.log(`🧹 Found ${expired.length} expired demos to clean up`);

  for (const prospect of expired) {
    const token = prospect.demo_token;
    if (token) {
      try {
        await deletePrefix(`${token}/`);
        console.log(`   Deleted R2: ${token}/`);
      } catch (err) {
        console.log(`   ⚠️ R2 delete failed for ${token}: ${(err as Error).message}`);
      }
    }

    // Delete local files
    const localPaths = [
      resolve(DEMOS_DIR, String(prospect.id)),
      resolve(VIDEOS_DIR, `${prospect.id}.mp4`),
      resolve(VIDEOS_DIR, `${prospect.id}-raw.webm`),
      resolve(GIFS_DIR, `${prospect.id}.gif`),
      resolve(SCREENSHOTS_DIR, `${prospect.id}.png`),
    ];

    for (const p of localPaths) {
      try {
        if (existsSync(p)) {
          const stat = require('fs').statSync(p);
          if (stat.isDirectory()) rmdirSync(p, { recursive: true });
          else unlinkSync(p);
        }
      } catch {}
    }

    updateProspect(prospect.id, {
      demo_url: null,
      video_url: null,
      gif_url: null,
      gif_local_path: null,
      status: 'expired',
    });
    logAction(prospect.id, 'demo_deleted');
  }

  console.log(`✅ Cleanup complete`);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/prepare.ts src/cleanup.ts
git commit -m "feat: add prepare orchestrator and cleanup command"
```

---

## Phase 5: Dashboard (Tasks 15-17)

### Task 15: Dashboard Server + API Routes

**Files:**
- Create: `~/outreach/src/dashboard/server.ts`
- Create: `~/outreach/src/dashboard/routes.ts`

- [ ] **Step 1: Create src/dashboard/server.ts**

```typescript
import express from 'express';
import { resolve } from 'path';
import { setupRoutes } from './routes';

export async function startDashboard(port: number = 3333): Promise<void> {
  const app = express();

  app.use(express.json());
  app.use(express.static(resolve(__dirname, 'public')));

  setupRoutes(app);

  // SPA fallback — serve index.html for non-API routes
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      res.status(404).json({ error: 'Not found' });
    } else {
      const page = req.path.replace(/^\//, '') || 'index';
      const filePath = resolve(__dirname, 'public', `${page}.html`);
      try {
        res.sendFile(filePath);
      } catch {
        res.sendFile(resolve(__dirname, 'public', 'index.html'));
      }
    }
  });

  app.listen(port, () => {
    console.log(`\n🖥️  Dashboard running at http://localhost:${port}\n`);
    console.log(`   Overview:    http://localhost:${port}/`);
    console.log(`   Batch:       http://localhost:${port}/batch`);
    console.log(`   Sequences:   http://localhost:${port}/sequences`);
    console.log(`   Deals:       http://localhost:${port}/deals`);
    console.log(`   Prospects:   http://localhost:${port}/prospects`);
    console.log(`   Log:         http://localhost:${port}/log`);
    console.log(`   Settings:    http://localhost:${port}/settings\n`);
  });
}
```

- [ ] **Step 2: Create src/dashboard/routes.ts**

```typescript
import type { Express, Request, Response } from 'express';
import { getDb, getProspectsByStatus, getProspectById, updateProspect, logAction, getDueDay3, getDueDay10, getDueWhatsApp } from '../db';
import { loadConfig } from '../config';
import type { Prospect } from '../types';

export function setupRoutes(app: Express): void {

  // Stats
  app.get('/api/stats', (req: Request, res: Response) => {
    const db = getDb();
    const stats = {
      total: (db.prepare('SELECT COUNT(*) as cnt FROM prospects').get() as any).cnt,
      queued: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'queued'").get() as any).cnt,
      demoGenerated: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'demo_generated'").get() as any).cnt,
      approved: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'approved'").get() as any).cnt,
      sequenceActive: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE status = 'sequence_active'").get() as any).cnt,
      replied: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE replied = 1").get() as any).cnt,
      converted: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE deal_stage = 'won'").get() as any).cnt,
      optedOut: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE opted_out = 1").get() as any).cnt,
      totalEmailed: (db.prepare("SELECT COUNT(*) as cnt FROM prospects WHERE day0_sent_at IS NOT NULL").get() as any).cnt,
      day3Due: getDueDay3().length,
      day6Due: getDueWhatsApp().length,
      day10Due: getDueDay10().length,
      revenue: (db.prepare("SELECT COALESCE(SUM(deal_value), 0) as total FROM prospects WHERE deal_stage = 'won'").get() as any).total,
      pipeline: (db.prepare("SELECT COALESCE(SUM(deal_value), 0) as total FROM prospects WHERE deal_stage IN ('quoted', 'in_conversation')").get() as any).total,
    };
    res.json(stats);
  });

  // Batch — today's demos for review
  app.get('/api/batch', (req: Request, res: Response) => {
    const prospects = getProspectsByStatus('demo_generated');
    res.json(prospects);
  });

  // Approve
  app.post('/api/batch/:id/approve', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    updateProspect(id, { status: 'approved' });
    logAction(id, 'status_changed', 'approved');
    res.json({ ok: true });
  });

  // Reject
  app.post('/api/batch/:id/reject', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    updateProspect(id, { status: 'rejected' });
    logAction(id, 'status_changed', 'rejected');
    res.json({ ok: true });
  });

  // Edit email copy
  app.post('/api/batch/:id/edit', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { day0_subject, day0_body, day3_body, whatsapp_message, day10_body } = req.body;
    const fields: Record<string, any> = {};
    if (day0_subject !== undefined) fields.day0_subject = day0_subject;
    if (day0_body !== undefined) fields.day0_body = day0_body;
    if (day3_body !== undefined) fields.day3_body = day3_body;
    if (whatsapp_message !== undefined) fields.whatsapp_message = whatsapp_message;
    if (day10_body !== undefined) fields.day10_body = day10_body;
    if (Object.keys(fields).length) updateProspect(id, fields);
    res.json({ ok: true });
  });

  // Sequences
  app.get('/api/sequences', (req: Request, res: Response) => {
    const db = getDb();
    const sequences = db.prepare("SELECT * FROM prospects WHERE status = 'sequence_active' ORDER BY day0_sent_at DESC").all();
    res.json(sequences);
  });

  app.get('/api/sequences/today', (req: Request, res: Response) => {
    res.json({
      day3: getDueDay3(),
      day6: getDueWhatsApp(),
      day10: getDueDay10(),
    });
  });

  app.post('/api/sequences/:id/whatsapp-sent', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    updateProspect(id, {
      day6_whatsapp_sent: 1,
      day6_whatsapp_sent_at: new Date().toISOString(),
      sequence_step: 3,
    });
    logAction(id, 'day6_whatsapp_sent');
    res.json({ ok: true });
  });

  // Prospects
  app.get('/api/prospects', (req: Request, res: Response) => {
    const db = getDb();
    const { status, industry, city, page = '1', limit = '50' } = req.query;
    let sql = 'SELECT * FROM prospects WHERE 1=1';
    const params: any[] = [];

    if (status) { sql += ' AND status = ?'; params.push(status); }
    if (industry) { sql += ' AND industry = ?'; params.push(industry); }
    if (city) { sql += ' AND city = ?'; params.push(city); }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const lim = parseInt(limit as string, 10);
    const offset = (parseInt(page as string, 10) - 1) * lim;
    params.push(lim, offset);

    const prospects = db.prepare(sql).all(...params);
    const total = db.prepare(sql.replace(/SELECT \*/, 'SELECT COUNT(*) as cnt').replace(/ORDER BY.*$/, '')).get(...params.slice(0, -2)) as any;
    res.json({ prospects, total: total.cnt, page: parseInt(page as string, 10), limit: lim });
  });

  app.get('/api/prospects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const prospect = getProspectById(id);
    if (!prospect) return res.status(404).json({ error: 'Not found' });

    const db = getDb();
    const log = db.prepare('SELECT * FROM outreach_log WHERE prospect_id = ? ORDER BY created_at DESC').all(id);
    res.json({ prospect, log });
  });

  // Reply
  app.post('/api/prospects/:id/reply', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { channel, sentiment, notes } = req.body;
    updateProspect(id, {
      replied: 1,
      reply_channel: channel,
      reply_sentiment: sentiment,
      reply_notes: notes,
      replied_at: new Date().toISOString(),
      status: 'replied',
      deal_stage: 'replied',
    });
    logAction(id, 'reply_received', `${channel}: ${sentiment}`);
    res.json({ ok: true });
  });

  // Opt out
  app.post('/api/prospects/:id/opt-out', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    updateProspect(id, { opted_out: 1, status: 'opted_out' });
    logAction(id, 'opted_out');
    res.json({ ok: true });
  });

  // Deal management
  app.post('/api/prospects/:id/deal', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { deal_stage, deal_value, deal_notes } = req.body;
    const fields: Record<string, any> = {};
    if (deal_stage !== undefined) fields.deal_stage = deal_stage;
    if (deal_value !== undefined) fields.deal_value = deal_value;
    if (deal_notes !== undefined) fields.deal_notes = deal_notes;
    updateProspect(id, fields);
    logAction(id, 'deal_stage_changed', deal_stage);
    res.json({ ok: true });
  });

  app.get('/api/deals', (req: Request, res: Response) => {
    const db = getDb();
    const deals = db.prepare("SELECT * FROM prospects WHERE deal_stage IS NOT NULL ORDER BY replied_at DESC").all();
    res.json(deals);
  });

  // Log
  app.get('/api/log', (req: Request, res: Response) => {
    const db = getDb();
    const { action, limit = '100' } = req.query;
    let sql = `SELECT l.*, p.business_name FROM outreach_log l JOIN prospects p ON l.prospect_id = p.id WHERE 1=1`;
    const params: any[] = [];
    if (action) { sql += ' AND l.action = ?'; params.push(action); }
    sql += ' ORDER BY l.created_at DESC LIMIT ?';
    params.push(parseInt(limit as string, 10));
    res.json(db.prepare(sql).all(...params));
  });

  // Config
  app.get('/api/config', (req: Request, res: Response) => {
    res.json(loadConfig());
  });

  app.post('/api/config', (req: Request, res: Response) => {
    const { writeFileSync } = require('fs');
    const { resolve } = require('path');
    writeFileSync(resolve(__dirname, '../../config.json'), JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/dashboard/server.ts src/dashboard/routes.ts
git commit -m "feat: add dashboard Express server with all API routes"
```

---

### Task 16: Dashboard Frontend — Overview + Batch Pages

**Files:**
- Create: `~/outreach/src/dashboard/public/app.css`
- Create: `~/outreach/src/dashboard/public/app.js`
- Create: `~/outreach/src/dashboard/public/index.html`
- Create: `~/outreach/src/dashboard/public/batch.html`

These are vanilla HTML/CSS/JS pages. The implementation should create clean, functional dashboard pages that call the API routes defined in Task 15. Each page fetches data from `/api/*` endpoints and renders it.

- [ ] **Step 1: Create shared CSS (app.css)**

Minimal dark theme CSS: dark background (#0a0a0a), light text (#e5e5e5), card components with border-radius:12px and subtle borders, system font stack. Responsive grid layout. Status badges with colour coding (green=active, yellow=pending, red=failed, blue=queued).

- [ ] **Step 2: Create shared JS (app.js)**

Helper functions: `api(path)` fetches from `/api/...` and returns JSON. `formatDate(iso)` formats dates. `badge(status)` returns coloured status badge HTML.

- [ ] **Step 3: Create index.html (Overview)**

Fetches `/api/stats`. Displays stat cards in a grid: total prospects, queue size, active sequences, emails sent, reply rate, revenue, pipeline value. Shows today's due actions (Day 3/6/10 counts).

- [ ] **Step 4: Create batch.html (Today's Batch)**

Fetches `/api/batch`. For each prospect: shows business name/city/rating, iframe preview of demo, video player, GIF preview, editable text areas for all 4 email touches. Approve/Reject buttons that POST to `/api/batch/:id/approve` or `/api/batch/:id/reject`. Edit saves via POST to `/api/batch/:id/edit`. Bulk approve button.

- [ ] **Step 5: Commit**

```bash
git add src/dashboard/public/
git commit -m "feat: add dashboard overview and batch review pages"
```

---

### Task 17: Dashboard Frontend — Sequences, Deals, Prospects, Log, Settings

**Files:**
- Create: `~/outreach/src/dashboard/public/sequences.html`
- Create: `~/outreach/src/dashboard/public/deals.html`
- Create: `~/outreach/src/dashboard/public/prospects.html`
- Create: `~/outreach/src/dashboard/public/log.html`
- Create: `~/outreach/src/dashboard/public/settings.html`

- [ ] **Step 1: Create sequences.html**

Fetches `/api/sequences/today` and `/api/sequences`. Shows today's due actions at top (Day 3 follow-ups, Day 6 WhatsApp with copy+send buttons, Day 10 breakups). Below: table of all active sequences with timeline visualisation. "Mark replied" and "Mark opted out" buttons.

- [ ] **Step 2: Create deals.html**

Fetches `/api/deals`. Kanban-style layout with columns: Replied, In Conversation, Quoted, Won, Lost. Each card shows business name, city, reply date, deal value. Buttons to move between stages. Revenue totals per column.

- [ ] **Step 3: Create prospects.html**

Fetches `/api/prospects` with pagination. Filterable table: status, industry, city dropdown filters. Sortable columns. Click row to expand full details (all email copy, demo link, outreach timeline).

- [ ] **Step 4: Create log.html**

Fetches `/api/log`. Chronological feed filtered by action type. Shows timestamp, business name, action, details.

- [ ] **Step 5: Create settings.html**

Fetches `/api/config`. Editable form for config.json values: targets list (add/remove), daily limit slider, sender info. Save button POSTs to `/api/config`.

- [ ] **Step 6: Commit**

```bash
git add src/dashboard/public/
git commit -m "feat: add sequences, deals, prospects, log, and settings pages"
```

---

## Phase 6: Integration & Testing (Task 18)

### Task 18: End-to-End Smoke Test

- [ ] **Step 1: Create .env with real API keys**

Copy `.env.example` to `.env` and fill in all keys. You'll need:
- `OUTSCRAPER_API_KEY` from app.outscraper.com
- `GOOGLE_PAGESPEED_API_KEY` from Google Cloud Console
- `ANTHROPIC_API_KEY` from console.anthropic.com
- `GMAIL_APP_PASSWORD` from Google Account > Security > App Passwords
- Cloudflare R2 credentials from Cloudflare dashboard

- [ ] **Step 2: Test discover command**

```bash
cd ~/outreach && npm run outreach -- discover --query "plumbers London"
```

Expected: Outputs discovered prospects count.

- [ ] **Step 3: Test prepare command with 1 prospect**

```bash
npm run outreach -- prepare -n 1
```

Expected: Scores, analyzes, generates demo, records video, makes GIF, deploys, composes email for 1 prospect. Should print "1/1 demos ready for review."

- [ ] **Step 4: Test dashboard**

```bash
npm run outreach -- dashboard
```

Open http://localhost:3333 — verify overview stats and batch page show the prepared prospect.

- [ ] **Step 5: Approve in dashboard and test send (dry run)**

Approve the prospect in the dashboard. Then review the email in the DB before actually sending:

```bash
npm run outreach -- status
```

Verify it shows 1 approved prospect. When ready to test real sending, run `npm run outreach -- send`.

- [ ] **Step 6: Record intro.mp4**

Record a 5-second personal intro clip and save to `~/outreach/data/intro.mp4`. This is your face saying something like "Hey, I built this for you" — it goes at the start of every demo video.

- [ ] **Step 7: Commit everything**

```bash
git add -A
git commit -m "feat: complete outreach pipeline — ready for production use"
```

---

## Execution Order Summary

| Phase | Tasks | What it delivers |
|-------|-------|-----------------|
| 1. Foundation | 1-3 | Project scaffold, DB, CLI skeleton |
| 2. Discovery | 4-6 | Find businesses, analyze websites, score and queue |
| 3. Demo & Media | 7-10 | Generate HTML demos, record videos, extract GIFs, deploy to R2 |
| 4. Email & Sequence | 11-14 | Compose emails, send with GIF, manage 4-touch sequence, orchestrator |
| 5. Dashboard | 15-17 | Express server, API routes, all 7 dashboard pages |
| 6. Integration | 18 | End-to-end smoke test with real APIs |

Each phase produces working, testable software. Phase 1-4 gives you a fully functional CLI pipeline. Phase 5 adds the dashboard. Phase 6 validates everything works together.
