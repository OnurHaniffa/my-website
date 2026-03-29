# Cold Outreach Pipeline — Design Spec

## Goal

Build an automated pipeline that discovers businesses with bad/no websites, generates custom demo websites for them using Claude, records preview videos, and sends personalized cold emails — all tracked through a local web dashboard.

## Architecture

A standalone Node.js/TypeScript CLI tool at `~/outreach/` with a local dashboard served via Express. The pipeline runs as CLI commands, the dashboard runs as a local web server for review and tracking.

```
~/outreach/
├── src/
│   ├── discover.ts        — Outscraper API: find businesses
│   ├── analyze.ts         — PageSpeed API + Playwright: score websites
│   ├── score.ts           — Filter and rank prospects
│   ├── generate-demo.ts   — Claude API: create HTML demo pages
│   ├── record-video.ts    — Playwright: scroll-capture + FFmpeg stitch
│   ├── deploy-demo.ts     — Deploy demo to Cloudflare Pages
│   ├── compose-email.ts   — Generate personalized email copy
│   ├── send.ts            — Nodemailer: send via Gmail SMTP
│   ├── followup.ts        — Check for day-4 follow-ups, send them
│   ├── cleanup.ts         — Delete demos/videos older than 30 days
│   ├── db.ts              — SQLite schema and queries
│   ├── config.ts          — Load and validate config
│   ├── dashboard/         — Express app + HTML/CSS/JS dashboard
│   │   ├── server.ts      — Express server
│   │   ├── routes.ts      — API routes for dashboard
│   │   └── public/        — Static HTML/CSS/JS for the UI
│   └── index.ts           — CLI entry point (commander.js)
├── data/
│   ├── outreach.db        — SQLite database
│   ├── intro.mp4          — Your pre-recorded 10-second intro clip
│   └── videos/            — Generated preview videos (auto-cleaned)
├── config.json            — Target industries, cities, limits
├── .env                   — API keys, email credentials
├── package.json
└── tsconfig.json
```

## Tech Stack

- **TypeScript + Node.js** (runtime)
- **commander.js** (CLI interface)
- **Outscraper API** (business discovery)
- **Google PageSpeed Insights API** (website scoring, free)
- **Anthropic Claude API** (Sonnet — HTML demo generation)
- **Playwright** (screenshots, video recording, additional analysis)
- **FFmpeg** (video stitching — intro + demo scroll)
- **Nodemailer** (email sending via Gmail SMTP)
- **better-sqlite3** (local database)
- **Express** (local dashboard server)
- **Cloudflare Pages** (demo hosting, free)
- **Cloudflare R2** (video hosting, free tier)

## Configuration

### config.json
```json
{
  "targets": [
    { "query": "dental clinics London", "industry": "dental", "city": "London", "country": "UK" },
    { "query": "restaurants Amsterdam", "industry": "restaurant", "city": "Amsterdam", "country": "NL" },
    { "query": "law firms Madrid", "industry": "legal", "city": "Madrid", "country": "ES" }
  ],
  "dailyLimit": 5,
  "followUpDays": 4,
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
    "signature": "Web Designer — onurhaniffa.com\nIstanbul, Turkey"
  },
  "portfolio": {
    "dental": {
      "casestudy": "Pearl Dental — 65% of appointments now come through the website",
      "url": "https://onurhaniffa.com/tr/work/"
    },
    "restaurant": {
      "casestudy": "Designed restaurant sites with online ordering that increased revenue by 40%",
      "url": "https://onurhaniffa.com/tr/work/"
    },
    "default": {
      "casestudy": "50+ projects delivered with an average 3x improvement in page speed",
      "url": "https://onurhaniffa.com/tr/work/"
    }
  },
  "cloudflare": {
    "pagesProject": "outreach-demos",
    "r2Bucket": "outreach-videos"
  }
}
```

### .env
```
OUTSCRAPER_API_KEY=xxx
GOOGLE_PAGESPEED_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
GMAIL_APP_PASSWORD=xxx
GMAIL_USER=contact@onurhaniffa.com
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_R2_ACCESS_KEY=xxx
CLOUDFLARE_R2_SECRET_KEY=xxx
```

## Database Schema (SQLite)

```sql
CREATE TABLE prospects (
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
  priority_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'discovered',
  -- status: discovered → queued → demo_generated → approved → emailed → followed_up → replied → converted → rejected → expired
  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  demo_url TEXT,
  demo_token TEXT,
  video_url TEXT,
  email_subject TEXT,
  email_body TEXT,
  emailed_at DATETIME,
  followup_at DATETIME,
  followup_sent BOOLEAN DEFAULT 0,
  replied BOOLEAN DEFAULT 0,
  reply_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, business_name)
);

CREATE TABLE outreach_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prospect_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  -- action: email_sent, followup_sent, reply_received, demo_deployed, demo_deleted, status_changed
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prospect_id) REFERENCES prospects(id)
);

CREATE TABLE scrape_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  results_count INTEGER,
  queued_count INTEGER,
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## CLI Commands

```bash
# Discovery — scrape and queue prospects
npm run outreach discover              # Run next target from config
npm run outreach discover -- --query "dental clinics London"  # Specific query

# Pipeline — generate demos for today's batch
npm run outreach prepare               # Pull 5 from queue, analyze, generate demos, record videos

# Dashboard — review and approve
npm run outreach dashboard             # Start local dashboard at localhost:3333

# Send — send approved emails
npm run outreach send                  # Send all approved emails (max 5/day)

# Follow-up — send day-4 follow-ups
npm run outreach followup              # Check and send due follow-ups

# Cleanup — remove expired demos
npm run outreach cleanup               # Delete demos/videos older than 30 days

# Status — quick overview
npm run outreach status                # Show queue size, today's sends, pending follow-ups
```

### Typical Daily Workflow
```
Morning:
  1. npm run outreach prepare          (5 min automated — generates demos)
  2. npm run outreach dashboard        (open browser, review 5 demos — 25 min)
  3. Approve/reject each demo in the dashboard
  4. npm run outreach send             (automated — sends approved emails)
  5. npm run outreach followup         (automated — sends due follow-ups)

Weekly:
  6. npm run outreach discover         (when queue is empty — refill)
  7. npm run outreach cleanup          (remove old demos)
```

## Component Details

### 1. Discovery (discover.ts)

**Input:** Query string from config (e.g., "dental clinics London")
**Output:** Prospects inserted into SQLite with status "discovered"

Flow:
1. Call Outscraper Maps Search API: `GET https://api.app.outscraper.com/maps/search-v3?query={query}&limit=40`
2. For each result, extract: name, website, phone, address, rating, reviews
3. If no email in Outscraper data, call their Emails & Contacts endpoint for the website URL
4. Skip if business already exists in DB (by email + name)
5. Insert new prospects with status "discovered"
6. Log the scrape in `scrape_history`

**Deduplication:** UNIQUE constraint on (email, business_name). If a business appears in multiple scrapes, it's ignored.

### 2. Analysis (analyze.ts)

**Input:** Prospect with a website URL
**Output:** Updated prospect with pagespeed_score, is_mobile_friendly, has_ssl

Flow:
1. Call PageSpeed Insights API: `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedtest?url={url}&strategy=mobile&category=performance`
2. Extract: performance score (0-100), LCP, CLS, FCP
3. Check SSL: does the URL redirect to HTTPS?
4. Check mobile: is there a viewport meta tag? (Playwright quick check)
5. Take a full-page screenshot with Playwright (saved locally for Claude to analyze later)
6. Update prospect record in DB

For businesses with NO website (website_url is null):
- Skip PageSpeed, set pagespeed_score = 0, has_website = false
- These get the highest priority score automatically

### 3. Scoring (score.ts)

**Input:** All prospects with status "discovered" that have been analyzed
**Output:** Prospects updated with priority_score and status changed to "queued"

Scoring rules (from config):
- No website at all: +100 points
- PageSpeed below 30: +90 points
- PageSpeed 30-50: +70 points
- Not mobile responsive: +80 points
- No SSL: +60 points
- Has email (required): must have email or skip

Filter OUT:
- No email address (can't contact them)
- Already in queue or already emailed
- Country is UAE or Germany (legal restrictions)

Update status to "queued" and set priority_score.

### 4. Demo Generation (generate-demo.ts)

**Input:** A queued prospect + their current website screenshot (if they have a site)
**Output:** Complete single-page HTML file

Flow:
1. Construct a Claude API prompt with:
   - Business name, industry, city, phone, address
   - Their current website screenshot (as base64 image in the prompt, if available)
   - Specific issues found (PageSpeed score, mobile issues, SSL)
   - Instructions: "Generate a complete, modern, single-page HTML website for this business. Use their real business name, phone, and address. Include: hero section, services, testimonials placeholder, contact section, mobile responsive, modern design. Use inline CSS and no external dependencies. Add a subtle 'DEMO — Concept by Onur Haniffa' watermark in the footer."
2. Claude returns complete HTML
3. Validate the HTML:
   - Business name appears in the output
   - No placeholder text ("Lorem ipsum", "Your Business Name Here")
   - HTML is valid (basic checks)
   - Responsive viewport meta tag present
4. Save HTML to `data/demos/{prospect-id}/index.html`
5. Generate a unique token (nanoid, 12 chars)
6. Update prospect: status → "demo_generated", demo_token set

### 5. Video Recording (record-video.ts)

**Input:** Generated HTML demo file
**Output:** MP4 video file

Flow:
1. Launch Playwright, open the demo HTML file at 1920x1080
2. Wait 2 seconds for any CSS transitions
3. Start video recording
4. Smooth auto-scroll from top to bottom over 20 seconds
5. Pause 2 seconds at the bottom
6. Stop recording → raw demo video saved
7. FFmpeg stitch: `intro.mp4` (your 10-sec clip) + demo scroll video
8. Output: `data/videos/{prospect-id}.mp4`
9. Update prospect with local video path

### 6. Demo Deployment (deploy-demo.ts)

**Input:** HTML file + video file for a prospect
**Output:** Live URLs for both

Flow:
1. Upload HTML to Cloudflare Pages at path `/{token}/index.html`
   - Token-based URL: `https://outreach-demos.pages.dev/{token}/`
   - NOT the business name — prevents trademark issues
2. Upload video to Cloudflare R2: `videos/{prospect-id}.mp4`
   - Public URL via R2 custom domain or presigned URL
3. Create a preview page at `/{token}/preview.html`:
   ```html
   <!-- Clean preview page with video player -->
   <video controls autoplay muted>
     <source src="{video_url}" type="video/mp4">
   </video>
   <p>Like what you see? Reply to my email and let's make it happen.</p>
   <p style="opacity:0.5">Concept by Onur Haniffa — onurhaniffa.com</p>
   ```
4. Update prospect: demo_url, video_url

### 7. Email Composition (compose-email.ts)

**Input:** Prospect with demo and video ready
**Output:** Email subject and body stored in prospect record

Two email tracks:

**Track A: Business HAS a website (bad score)**
```
Subject: Quick thought about [Business Name]'s website

Hi,

I came across [Business Name] while looking at [industry] businesses in [city].

I ran your site through Google's speed test and it scored [X]/100 on mobile —
that means a lot of potential customers are leaving before the page even loads.
[If not mobile friendly: It also doesn't display well on phones, which is how
most people search these days.]

I put together a quick concept of what a refreshed site could look like for
you — takes 30 seconds to watch:
[preview URL]

No strings attached — just thought it might be useful. If you're interested
in exploring this further, happy to chat.

[Recently helped case study relevant to their industry.]

Best,
Onur Haniffa
Web Designer — onurhaniffa.com
Istanbul, Turkey

(Reply "stop" and I won't email again.)
```

**Track B: Business has NO website**
```
Subject: Website idea for [Business Name]

Hi,

I was searching for [industry] in [city] and noticed [Business Name]
doesn't have a website yet. Your competitors [X] and [Y] are both showing
up on Google and capturing customers online.

I put together a quick concept of what a site could look like for your
business — takes 30 seconds to watch:
[preview URL]

Having a professional website typically costs less than you'd think and
can bring in customers 24/7. Happy to chat if this is something you've
been considering.

[Relevant case study.]

Best,
Onur Haniffa
Web Designer — onurhaniffa.com
Istanbul, Turkey

(Reply "stop" and I won't email again.)
```

**Follow-up email (day 4):**
```
Subject: Re: [original subject]

Hi again,

Just wanted to make sure this didn't get buried — I put together a
website concept for [Business Name] last week:
[preview URL]

Worth a quick look if you have 30 seconds. No pressure either way.

Best,
Onur
```

### 8. Email Sending (send.ts)

**Input:** Approved prospects with composed emails
**Output:** Emails sent, status updated

Flow:
1. Query DB: prospects with status "approved", limit by dailyLimit (5)
2. For each:
   - Create Nodemailer transport (Gmail SMTP + App Password)
   - Send plain text email (no HTML, no images, no tracking pixels)
   - Wait 30 seconds between sends
   - Update status → "emailed", set emailed_at and followup_at (now + 4 days)
   - Log to outreach_log
3. If any send fails, log error but continue with remaining

### 9. Follow-up (followup.ts)

**Input:** Prospects where followup_at <= now AND followup_sent = false AND replied = false
**Output:** Follow-up emails sent

Flow:
1. Query DB for due follow-ups
2. For each: send the follow-up email template
3. Update: followup_sent = true
4. Log to outreach_log
5. Respects daily limit (follow-ups + new emails combined <= daily limit)

### 10. Cleanup (cleanup.ts)

Flow:
1. Find prospects where demo was deployed > 30 days ago
2. Delete HTML from Cloudflare Pages
3. Delete video from Cloudflare R2
4. Delete local video files
5. Update status → "expired"
6. Log to outreach_log

### 11. Dashboard (dashboard/)

A local Express server at `localhost:3333` with a simple HTML/CSS/JS interface. No framework — just vanilla HTML served by Express, with API routes for data.

**Pages:**

**Home / Overview**
- Total prospects in DB
- Queue size (awaiting demos)
- Today's batch (pending review)
- Emails sent today / this week / this month
- Follow-ups due
- Reply rate (replies / emails sent)
- Conversion rate (converted / emails sent)

**Today's Batch (/batch)**
- List of 5 prospects with demos ready for review
- For each prospect:
  - Business name, industry, city
  - Their current website (link) + PageSpeed score
  - Generated demo (iframe preview)
  - Preview video (embedded player)
  - Generated email copy (editable text area)
  - Approve / Reject / Edit buttons
- Bulk approve button

**Prospect Database (/prospects)**
- Searchable, filterable table of all prospects
- Filter by: status, industry, city, date range
- Sort by: priority score, date, status
- Click to expand: full details, email copy, demo link, outreach log

**Outreach Log (/log)**
- Chronological feed of all actions
- Filterable by action type
- Shows: timestamp, prospect name, action, details

**Settings (/settings)**
- Edit config.json values through the UI
- Add/remove target queries
- Adjust daily limits
- View API usage / costs

**API Routes (routes.ts):**
```
GET  /api/stats              — dashboard overview numbers
GET  /api/batch              — today's batch of prospects
POST /api/batch/:id/approve  — approve a prospect for sending
POST /api/batch/:id/reject   — reject a prospect
POST /api/batch/:id/edit     — update email copy
GET  /api/prospects          — list all prospects (paginated, filterable)
GET  /api/prospects/:id      — single prospect detail
POST /api/prospects/:id/reply — mark as replied, add notes
POST /api/prospects/:id/convert — mark as converted
GET  /api/log                — outreach activity log
GET  /api/config             — current config
POST /api/config             — update config
```

## Legal Compliance

Every email includes:
- Sender's full name and business name
- Physical location (Istanbul, Turkey)
- Opt-out mechanism ("Reply stop")
- Honest, non-deceptive subject line
- Clear identification of why they're being contacted

Excluded markets:
- UAE / Dubai (consent required by law)
- Germany (consent required for B2B cold email)

Demo pages include:
- "DEMO — Concept by Onur Haniffa" watermark
- Token-based URLs (no business name in URL)
- Auto-expire after 30 days

## Error Handling

| Failure | Recovery |
|---|---|
| Outscraper API down | Retry 3x with exponential backoff, then skip and alert |
| PageSpeed API fails for a URL | Set score to null, still queue if no-website or other signals |
| Claude generates bad HTML | Validation catches it, mark as "generation_failed", skip to next |
| Claude generates placeholder text | Regex check for common placeholders, reject and regenerate once |
| Playwright video recording fails | Retry once, if fails again deploy demo without video |
| FFmpeg stitch fails | Send demo link without video preview |
| Gmail send fails | Log error, keep in "approved" status for retry next run |
| Cloudflare deployment fails | Retry once, then hold prospect for manual intervention |
| Prospect has no email | Skip entirely, never enters queue |
| Duplicate prospect | UNIQUE constraint catches it, skip silently |

## Security

- All API keys in `.env` (gitignored)
- Demo token URLs are 12-char nanoid (unguessable)
- No business logos scraped or used (text only)
- No personal data stored beyond what's publicly listed on Google Maps
- SQLite database is local only, not deployed anywhere
- Dashboard only accessible on localhost

## Cost Breakdown (Monthly)

| Service | Usage | Cost |
|---|---|---|
| Outscraper | ~200 lookups | ~$0.60 |
| PageSpeed API | ~200 calls | Free |
| Claude API (Sonnet) | ~150 demos × 5K tokens | ~$12 |
| Cloudflare Pages | 150 static pages | Free |
| Cloudflare R2 | 150 videos × ~20MB | Free tier (3GB) |
| Gmail SMTP | 150 + 75 follow-ups | Free |
| **Total** | | **~$13/month** |

## Success Metrics

| Metric | Target |
|---|---|
| Demos generated per day | 5 |
| Email open rate | >30% |
| Reply rate | >10% |
| Interested rate | >5% |
| Monthly clients from outreach | 1-3 |
| Cost per client acquired | <$15 |
| Time spent per day | <30 min (review + approve) |

## What's NOT in Scope (YAGNI)

- Multi-user support (this is a solo tool)
- OAuth2 for Gmail (App Password works fine at this volume)
- Real-time email open tracking (hurts deliverability)
- CRM integration (SQLite is the CRM)
- Mobile app for the dashboard
- A/B testing email variants (optimize manually after seeing data)
- Automatic reply detection (check manually, mark in dashboard)
