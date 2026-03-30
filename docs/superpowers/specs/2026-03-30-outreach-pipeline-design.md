# Cold Outreach Pipeline — Design Spec (Final)

## Goal

Build an automated pipeline that discovers UK/Ireland/Australia businesses with bad or no websites, generates custom demo websites using Claude, records scroll-preview videos, creates animated GIF teasers, and runs a 4-touch outreach sequence (email + WhatsApp) — all managed through a local web dashboard.

## Strategy

**Core bet:** 5 businesses per day, each receiving a custom-built website demo with a scroll video and animated GIF preview, sent from a real Gmail account, will convert significantly better than high-volume generic cold email.

**Why this works:** Nobody else is doing this. Every other cold emailer sends "I noticed your website could be improved, let's book a call." We're sending proof — a video of a website we literally built for them, with their real business name, address, and phone number. The effort is the differentiator.

**Target markets:** UK, Ireland, Australia (English-speaking, high density of SMBs with bad websites). This is a separate channel from the Turkey Google Ads strategy.

**Target industries (ranked by likelihood of bad websites):**
1. Trades (plumbers, electricians, builders, roofers)
2. Dental clinics / physiotherapists / chiropractors
3. Local restaurants / takeaways
4. Hair salons / barbers / beauty clinics
5. Accountants / solicitors (smaller firms)
6. Estate agents (independent)
7. Auto mechanics / MOT centres
8. Vets

**Pricing strategy:** £500-750 per project to start. Goal is to build portfolio + Google reviews, not maximise revenue. Price is never mentioned in outreach — it comes up in conversation after they reply.

## Architecture

A standalone Node.js/TypeScript CLI tool at `~/outreach/` with a local dashboard served via Express.

```
~/outreach/
├── src/
│   ├── discover.ts        — Outscraper API: find businesses + competitors
│   ├── analyze.ts         — PageSpeed API + Playwright: score websites
│   ├── score.ts           — Filter and rank prospects
│   ├── prepare.ts         — Orchestrator: runs the full daily batch pipeline
│   ├── generate-demo.ts   — Claude API: create HTML demo pages
│   ├── record-video.ts    — Playwright: scroll-capture (desktop + mobile)
│   ├── generate-gif.ts    — FFmpeg: extract 3-5s animated GIF teaser
│   ├── deploy-demo.ts     — Upload demo + video + GIF to Cloudflare R2
│   ├── compose-email.ts   — Claude API: generate unique personalised email
│   ├── send.ts            — Nodemailer: send emails with inline GIF
│   ├── sequence.ts        — Manage the 4-touch sequence (Day 0/3/6/10)
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
│   ├── intro.mp4          — Pre-recorded 5-second intro clip
│   ├── screenshots/       — Current website screenshots (for Claude)
│   ├── demos/             — Generated HTML demos
│   ├── videos/            — Generated preview videos (auto-cleaned)
│   └── gifs/              — Generated GIF teasers (auto-cleaned)
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
- **Anthropic Claude API** (Sonnet — HTML demo generation + email composition)
- **Playwright** (screenshots, video recording, mobile checks)
- **FFmpeg** (video stitching + GIF extraction)
- **Nodemailer** (email sending via Gmail SMTP, supports inline images)
- **better-sqlite3** (local database)
- **Express** (local dashboard server)
- **Cloudflare R2** (hosting everything: demos, videos, GIFs — all via public R2 bucket with custom domain)
- **Wrangler CLI** (Cloudflare R2 uploads)

**Why R2 for everything (not Pages + R2):** Cloudflare Pages deploys from git repos or directories — it's designed for full-site deploys, not individual file uploads. R2 is a simple object store with public access, perfect for uploading individual HTML/video/GIF files per prospect. One bucket, one custom domain, everything served from `demos.onurhaniffa.com/{token}/`.

## Configuration

### config.json
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
  screenshot_path TEXT,
  priority_score INTEGER DEFAULT 0,
  competitor1 TEXT,
  competitor2 TEXT,
  status TEXT DEFAULT 'discovered',
  -- status flow: discovered → queued → demo_generated → approved → sequence_active → replied → converted → rejected → expired → opted_out
  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  demo_url TEXT,
  demo_token TEXT,
  video_url TEXT,
  gif_url TEXT,
  gif_local_path TEXT,
  -- Sequence tracking
  sequence_step INTEGER DEFAULT 0,
  -- 0=not started, 1=day0_email_sent, 2=day3_followup_sent, 3=day6_whatsapp, 4=day10_breakup_sent
  day0_message_id TEXT,
  -- Stores the SMTP Message-ID from the Day 0 email, used for threading Day 3 and Day 10 replies
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
  -- Set to true if prospect replies "stop" or asks to not be contacted. Sequence halts immediately.
  replied BOOLEAN DEFAULT 0,
  reply_channel TEXT,
  -- reply_channel: email, whatsapp
  reply_sentiment TEXT,
  -- reply_sentiment: positive, negative, neutral (set manually in dashboard)
  reply_notes TEXT,
  replied_at DATETIME,
  -- Deal tracking (after reply)
  deal_stage TEXT,
  -- deal_stage: replied → in_conversation → quoted → won → lost
  deal_value REAL,
  deal_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, business_name)
);

CREATE TABLE outreach_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prospect_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  -- actions: day0_email_sent, day3_followup_sent, day6_whatsapp_queued, day6_whatsapp_sent,
  --          day10_breakup_sent, reply_received, opted_out, demo_deployed, demo_deleted,
  --          status_changed, deal_stage_changed
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

-- Index for sequence queries (find due follow-ups efficiently)
CREATE INDEX idx_prospects_sequence ON prospects(sequence_step, day0_sent_at, replied, opted_out);
CREATE INDEX idx_prospects_status ON prospects(status);
```

## CLI Commands

```bash
# Discovery — scrape and queue prospects
npm run outreach discover              # Run next target from config
npm run outreach discover -- --query "plumbers London"  # Specific query

# Pipeline — generate demos for today's batch
npm run outreach prepare               # Full pipeline: score → pick top 5 → analyze → generate demos → record videos → create GIFs → deploy → compose emails

# Dashboard — review and approve
npm run outreach dashboard             # Start local dashboard at localhost:3333

# Send — run today's sequence actions
npm run outreach send                  # Send Day 0 emails + Day 3 follow-ups + Day 10 breakups for all active sequences

# WhatsApp — show today's WhatsApp messages to send
npm run outreach whatsapp              # List Day 6 WhatsApp messages due today (copy-to-clipboard + open WhatsApp Web)

# Cleanup — remove expired demos
npm run outreach cleanup               # Delete demos/videos/GIFs older than 30 days

# Status — quick overview
npm run outreach status                # Show queue size, active sequences, today's actions, reply stats
```

### Daily Workflow
```
Morning (25-30 min):
  1. npm run outreach prepare          (automated — generates 5 demos + videos + GIFs, ~5 min)
  2. npm run outreach dashboard        (open browser, review 5 demos + email copy, ~15 min)
  3. Approve/reject/edit each in the dashboard
  4. npm run outreach send             (automated — sends Day 0 emails, Day 3 follow-ups, Day 10 breakups)
  5. npm run outreach whatsapp         (shows today's WhatsApp messages — send from phone, ~2 min)
  6. Check for replies in email/WhatsApp, mark in dashboard (~5 min)

Weekly:
  7. npm run outreach discover         (when queue runs low — refill)
  8. npm run outreach cleanup          (remove expired demos)
```

## Component Details

### 1. Discovery (discover.ts)

**Input:** Query string from config (e.g., "plumbers London")
**Output:** Prospects inserted into SQLite with status "discovered"

Flow:
1. Call Outscraper Maps Search API: `GET https://api.app.outscraper.com/maps/search-v3?query={query}&limit=40`
2. For each result, extract: name, website, phone, address, rating, reviews
3. If no email in Outscraper data, call their Emails & Contacts endpoint for the website URL
4. From the same query results, identify competitors: other businesses in the results that **have a website** and a rating above 4.0. Store the top 2 by review count as competitor1, competitor2 on prospects that don't have good websites.
5. Skip if business already exists in DB (by email + name)
6. **Require both email AND phone** — prospects without phone are skipped (phone needed for WhatsApp on Day 6)
7. Insert new prospects with status "discovered"
8. Log the scrape in `scrape_history`

**Deduplication:** UNIQUE constraint on (email, business_name).

### 2. Analysis (analyze.ts)

**Input:** Prospect with a website URL
**Output:** Updated prospect with pagespeed_score, is_mobile_friendly, has_ssl, screenshot_path

Flow:
1. Call PageSpeed Insights API: `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedtest?url={url}&strategy=mobile&category=performance`
2. Extract: performance score (0-100), LCP, CLS, FCP
3. Check SSL: does the URL redirect to HTTPS?
4. Check mobile: is there a viewport meta tag? (Playwright quick check)
5. Take a full-page screenshot with Playwright, save to `data/screenshots/{prospect-id}.png`
6. Update prospect record in DB (including screenshot_path)

For businesses with NO website (website_url is null):
- Skip PageSpeed, set pagespeed_score = 0, has_website = false
- No screenshot taken
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

Filter OUT:
- No email address (can't contact them)
- No phone number (can't WhatsApp them)
- Already in queue or already contacted
- Country is UAE or Germany (strict consent laws for B2B cold email)

Update status to "queued" and set priority_score.

### 4. Prepare — Daily Batch Orchestrator (prepare.ts)

**Input:** None (reads from DB)
**Output:** 5 prospects with demos, videos, GIFs, deployed and email copy ready for review

This is the main command you run each morning. It chains the entire pipeline:

```
1. Score all unscored "discovered" prospects          → score.ts
2. Pick top 5 from "queued" by priority_score         → DB query
3. For each of the 5 (sequentially):
   a. Run analysis if not already analyzed             → analyze.ts
   b. Generate HTML demo                              → generate-demo.ts
   c. Record desktop + mobile scroll video            → record-video.ts
   d. Extract GIF teaser from video                   → generate-gif.ts
   e. Deploy demo HTML + video + GIF to Cloudflare R2 → deploy-demo.ts
   f. Compose personalised email via Claude            → compose-email.ts
   g. Update status → "demo_generated"
4. Print summary: "5 demos ready for review. Run `npm run outreach dashboard`"
```

If any step fails for a prospect, log the error, skip that prospect, and continue with the next. The `prepare` command should never crash — it processes as many as it can.

**Parallelism:** Steps 3a-3g run sequentially per prospect (each step depends on the previous). But prospects themselves could be processed in parallel (up to 3 concurrent). Start with sequential processing — parallelise later if the 5-minute target isn't met.

### 5. Demo Generation (generate-demo.ts)

**Input:** A queued prospect + their current website screenshot (if they have a site)
**Output:** Complete single-page HTML file

Flow:
1. Construct a Claude API prompt (Sonnet) with:
   - Business name, industry, city, phone, address, Google rating
   - Their current website screenshot (as base64 image, if available)
   - Specific issues found (PageSpeed score, mobile issues, SSL)
   - Industry-specific design instructions
2. Claude returns complete HTML
3. Validate the HTML:
   - Business name appears in the output (exact match)
   - Phone number appears in the output
   - No placeholder text (regex scan for: "Lorem ipsum", "Your Business", "Company Name", "123-456", "555-", "example.com", "John Doe", "[placeholder]", "ACME", "Sample")
   - HTML is valid (basic structural checks: has `<html>`, `<head>`, `<body>`, closes all tags)
   - Responsive viewport meta tag present
   - File size is reasonable (50KB-500KB — too small means empty, too large means bloated)
4. If validation fails, regenerate once with feedback about what failed
5. If second attempt fails, skip prospect and log as "generation_failed"
6. Save HTML to `data/demos/{prospect-id}/index.html`
7. Generate a unique token (nanoid, 12 chars)
8. Update prospect: demo_token set

**Claude Demo Generation Prompt:**
```
You are generating a demo website for a real business. This will be shown to the business owner as a concept of what their website could look like.

BUSINESS DETAILS:
- Name: {business_name}
- Industry: {industry}
- City: {city}
- Phone: {phone}
- Address: {address}
- Google Rating: {rating}★ ({reviews} reviews)

{If has website: "Their current website screenshot is attached. It scores {pagespeed_score}/100 on Google PageSpeed. Issues: {issues list}. Create something that is clearly a significant upgrade — modern, fast, clean."}

{If no website: "They currently have no website at all. Create something that shows them what they're missing."}

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
```

### 6. Video Recording (record-video.ts)

**Input:** Generated HTML demo file
**Output:** MP4 video file

Flow:
1. Launch Playwright, open the demo HTML at **1920x1080** (desktop)
2. Wait 2 seconds for any CSS transitions/animations to settle
3. Start video recording (Playwright's built-in `page.video`)
4. Smooth auto-scroll from top to bottom over **15 seconds** (use `window.scrollBy` with `requestAnimationFrame` for smoothness)
5. Pause 1 second at bottom
6. **Switch to mobile viewport (375x812)** via `page.setViewportSize`
7. Scroll back to top instantly (`window.scrollTo(0, 0)`)
8. Wait 0.5 seconds
9. Smooth auto-scroll top to bottom over **10 seconds**
10. Stop recording → raw video saved
11. FFmpeg stitch: `intro.mp4` (5-sec personal intro clip) + raw recording
12. FFmpeg output settings: H.264, 30fps, CRF 23 (good quality, reasonable size)
13. Output: `data/videos/{prospect-id}.mp4` (total ~30 seconds, typically 15-25MB)
14. Update prospect with local video path

**Why both desktop + mobile:** The core pitch for businesses with bad sites is "your site doesn't work on mobile." Showing the demo looking perfect on mobile in the video is the money shot.

### 7. GIF Generation (generate-gif.ts)

**Input:** The recorded demo video
**Output:** 3-5 second animated GIF showing the hero section of the demo

Flow:
1. Extract a 4-second clip starting right after the intro clip ends (the hero section appearing on screen)
2. FFmpeg converts to GIF:
   ```
   ffmpeg -i video.mp4 -ss 6 -t 4 -vf "fps=12,scale=600:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
   ```
   - Start at 6 seconds (after the 5-sec intro, plus 1 sec buffer)
   - 4 seconds duration
   - 12fps for smooth but small file size
   - 600px wide (good for email)
   - Two-pass palette generation for better GIF colour quality
   - Loop forever
3. Check file size:
   - Under 1.5MB: use as-is (safe for all email clients)
   - 1.5MB-2MB: acceptable, use as-is
   - Over 2MB: re-extract at 8fps and 480px width
   - Still over 2MB: re-extract at 6fps, 400px, 3 seconds duration
   - Still over 2MB: skip GIF for this prospect, fall back to text-only email with video link
4. Save to `data/gifs/{prospect-id}.gif`
5. Update prospect: gif_local_path set

### 8. Demo Deployment (deploy-demo.ts)

**Input:** HTML file + video file + GIF file for a prospect
**Output:** Live URLs for all three

Everything goes to a single Cloudflare R2 bucket with public access enabled via a custom domain (`demos.onurhaniffa.com`).

Flow:
1. Upload HTML to R2: `{token}/index.html`
   - Live at: `https://demos.onurhaniffa.com/{token}/`
   - Content-Type: `text/html`
2. Upload video to R2: `{token}/video.mp4`
   - Live at: `https://demos.onurhaniffa.com/{token}/video.mp4`
   - Content-Type: `video/mp4`
3. Upload GIF to R2: `{token}/preview.gif`
   - Live at: `https://demos.onurhaniffa.com/{token}/preview.gif`
   - Content-Type: `image/gif`
4. Upload a preview page to R2: `{token}/preview.html`
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Website Concept for {Business Name}</title>
     <style>
       body { margin: 0; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
       video { max-width: 100%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
       p { margin-top: 24px; opacity: 0.7; font-size: 14px; }
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
   </html>
   ```
5. Update prospect: demo_url, video_url, gif_url (all public R2 URLs)

**R2 upload method:** Use the AWS S3 SDK (R2 is S3-compatible) with the R2 endpoint. This is simpler than Wrangler CLI and works well for individual file uploads.

### 9. Email Composition (compose-email.ts)

**Input:** Prospect with demo, video, and GIF deployed
**Output:** Email subject, HTML body (with inline GIF), plain text fallback, and WhatsApp message — all stored in prospect record

Claude generates **four pieces of copy** for each prospect in a single API call:
1. Day 0 email (subject + body)
2. Day 3 follow-up email body
3. Day 6 WhatsApp message
4. Day 10 breakup email body

All generated together so Claude can ensure they don't repeat the same points and each touch has a different angle.

**Claude Email Composition Prompt:**
```
You are writing a 4-touch outreach sequence for a web designer named Onur Haniffa. He has genuinely built a demo website for this business and wants to show it to them.

BUSINESS DETAILS:
- Name: {business_name}
- Industry: {industry}
- City: {city}
- Google Rating: {rating}★ ({reviews} reviews)
- Has website: {yes/no}
- Current website issues: {pagespeed_score}/100 PageSpeed, {issues or "no website"}
- Competitors with good websites: {competitor1}, {competitor2}

CONTEXT:
A GIF preview of the demo will be embedded inline in the Day 0 email — you don't need to describe the GIF, just place the marker where it should appear. A full 30-second video walkthrough link will go where you place the video marker. The video shows both desktop and mobile versions of the demo.

VOICE & TONE:
- Write like a real human who genuinely put effort into building something for this business
- Warm, honest, slightly casual — this should read like a message from a real person
- Acknowledge honestly that this is unsolicited — don't pretend you "stumbled across" them or that this is anything other than cold outreach
- Emphasise the genuine effort: you actually took the time to build this because you thought it could help them
- Be respectful of their time and never pushy
- BANNED PHRASES (never use these): "I came across", "I stumbled upon", "I noticed", "I'd love to", "quick question", "just following up", "I hope this email finds you well", "touching base", "circle back", "reach out", "no-brainer", "low-hanging fruit", "game changer", "win-win", "synergy", "leverage", "take it to the next level"
- Each of the 4 touches must use a DIFFERENT opening and a different angle. Do not repeat compliments or points across touches.

OUTPUT FORMAT (return as JSON):
{
  "day0_subject": "...",
  "day0_body": "... {GIF_PLACEHOLDER} ... {VIDEO_LINK} ...",
  "day3_body": "... {VIDEO_LINK} ...",
  "whatsapp_message": "... {VIDEO_LINK} ...",
  "day10_body": "... {VIDEO_LINK} ..."
}

RULES FOR EACH TOUCH:

Day 0 Email:
- Subject: short, specific to their business, not clickbait-y or salesy
- Body: 4-6 sentences before {GIF_PLACEHOLDER}
- After {GIF_PLACEHOLDER}: 1 sentence with {VIDEO_LINK} for the full walkthrough + 1 sentence inviting them to chat
- Sign off: Onur Haniffa / Web Designer — onurhaniffa.com
- End with: (If this isn't for you, just let me know and I won't email again.)
- Reference something specific: their Google rating, their industry, their city, their competitors — something that proves you actually looked at them

Day 3 Follow-up Email:
- Will be sent as "Re: {day0_subject}" in the same thread
- 3-4 sentences max
- Different angle from Day 0 — maybe mention competitors, or a specific benefit for their industry, or the mobile experience
- Include {VIDEO_LINK} again
- Sign off as just "Onur"
- Do NOT say "just following up", "bumping this", "circling back", or anything that sounds like a generic follow-up

Day 6 WhatsApp Message:
- Short, casual, warm — written for WhatsApp not email
- 3-4 lines max
- Include {VIDEO_LINK}
- Can use one emoji if it feels natural, but don't overdo it
- Mention that you also sent an email a few days ago

Day 10 Breakup Email:
- Will be sent as "Re: {day0_subject}" in the same thread
- 2-3 sentences — this is the final touch
- Graceful, warm goodbye. Let them know this is the last email.
- Mention the demo link will stay live for a few more weeks
- Include {VIDEO_LINK} one last time
- Should NOT feel passive-aggressive — genuine, respectful farewell
- Sign off as just "Onur"

EXAMPLE DAY 0 (for tone reference — do NOT copy):

Subject: An idea for {Business Name}

Hi there,

I hope you're doing fantastic. I know this is a bit out of the blue — I'm a web designer and I actually went ahead and built a website concept for {Business Name}. I know you didn't ask for it, but I genuinely thought your business could benefit from a stronger online presence, especially with your {rating}★ reputation.

I put in the time because I honestly think it could help more people find you.

{GIF_PLACEHOLDER}

Here's a 30-second walkthrough of the full concept: {VIDEO_LINK}

If you're even slightly interested, I'd be happy to chat. No pressure at all.

Onur Haniffa
Web Designer — onurhaniffa.com

(If this isn't for you, just let me know and I won't email again.)
```

The pipeline then:
1. Parses Claude's JSON response
2. Validates all 4 pieces are present and non-empty
3. Checks banned phrases aren't used
4. Stores all 4 in the prospect record: day0_subject, day0_body, day3_body, whatsapp_message, day10_body
5. For the dashboard preview, replaces `{GIF_PLACEHOLDER}` with a local GIF preview and `{VIDEO_LINK}` with the live URL

### 10. The 4-Touch Sequence (sequence.ts)

**Input:** Active sequences and their current step
**Output:** Queues the appropriate action for each prospect based on their sequence day

```
Day 0  — Email with inline GIF + video link (automated)
Day 3  — Follow-up email in same thread (automated)
Day 6  — WhatsApp message with video link (semi-automated — sent manually from phone)
Day 10 — Breakup email in same thread (automated)
```

**Day 0 — Initial Email (automated)**
- Sends the Day 0 email with inline GIF (CID-embedded)
- Stores the SMTP Message-ID returned by Nodemailer in `day0_message_id`
- Updates: sequence_step → 1, day0_sent_at → now, status → "sequence_active"

**Day 3 — Follow-up Email (automated)**
- Sends Day 3 email body in same thread (using In-Reply-To: day0_message_id)
- Subject: `Re: {day0_subject}`
- Plain text only (no GIF in follow-ups — keeps it feeling personal)
- Updates: sequence_step → 2, day3_sent_at → now

**Day 6 — WhatsApp Message (semi-automated)**
The dashboard queues up WhatsApp messages for the day. For each:
- Shows the business name, phone number, and pre-written message (from whatsapp_message field)
- "Copy message" button copies text to clipboard
- "Open WhatsApp" button opens `https://wa.me/{phone}?text={encoded_message}` in browser (pre-fills the message)
- You review, optionally tweak, and send from WhatsApp Web (~2 min for all 5)
- Updates: sequence_step → 3 (marked by user clicking "Sent" in dashboard)

**Day 10 — Breakup Email (automated)**
- Sends Day 10 email body in same thread (using In-Reply-To: day0_message_id)
- Subject: `Re: {day0_subject}`
- Plain text only
- Updates: sequence_step → 4, day10_sent_at → now

**Sequence rules:**
- If a prospect replies at ANY step, the sequence stops. No further automated touches.
- If a prospect opts out (replies "stop", "not interested", "remove me"), set opted_out = true. Sequence halts. This prospect is never contacted again.
- Daily sending limit (5) applies to Day 0 emails only. Follow-ups and breakups don't count against the limit.
- WhatsApp messages are not automated — queued in dashboard for manual sending.
- Day 10 fires based on **time since Day 0** (10+ days), not dependent on WhatsApp being marked sent. This prevents the sequence from stalling if you forget to mark WhatsApp as sent in the dashboard.

### 11. Email Sending (send.ts)

**Input:** Approved prospects + due sequence actions
**Output:** Emails sent, sequence steps updated

Flow:
1. Query DB for:
   - Day 0: prospects with status "approved", limit by dailyLimit (5)
   - Day 3: prospects where day0_sent_at is 3+ days ago AND sequence_step = 1 AND replied = false AND opted_out = false
   - Day 10: prospects where day0_sent_at is 10+ days ago AND sequence_step >= 2 AND replied = false AND opted_out = false
2. For each email:
   - Create Nodemailer transport (Gmail SMTP + App Password)
   - For Day 0: send HTML email with CID-embedded GIF + plain text fallback
   - For Day 3 and Day 10: send plain text in same thread (In-Reply-To + References headers)
   - Wait 30 seconds between sends (spread out sending to look natural)
   - Capture the SMTP Message-ID from Day 0 sends and store in DB
   - Update sequence tracking in DB
   - Log to outreach_log
3. If any send fails, log error but continue with remaining

**Email format for Day 0:**
- From: `Onur Haniffa <contact@onurhaniffa.com>`
- Content-Type: multipart/alternative (HTML + plain text)
- HTML part: Day 0 body with `{GIF_PLACEHOLDER}` replaced by `<img src="cid:demo-gif" alt="Website demo preview for {business_name}" style="max-width:600px; width:100%; border-radius:8px;">`
- Plain text part: Day 0 body with `{GIF_PLACEHOLDER}` removed and `{VIDEO_LINK}` replaced with actual URL
- Attachment: GIF file with Content-ID `<demo-gif>` and Content-Disposition `inline`

**Email threading for Day 3 and Day 10:**
- Use `In-Reply-To` and `References` headers pointing to `day0_message_id`
- Subject: `Re: {day0_subject}`
- This makes them appear in the same Gmail thread

### 12. Cleanup (cleanup.ts)

Flow:
1. Find prospects where demo was deployed > 30 days ago AND status is not "converted" or "in_conversation"
2. Delete all files from R2 under `{token}/` (index.html, video.mp4, preview.gif, preview.html)
3. Delete local files (screenshots/, demos/, videos/, gifs/ for this prospect)
4. Clear the URL fields in DB (demo_url, video_url, gif_url)
5. Update status → "expired" (only if not already in a deal stage)
6. Log to outreach_log

**Do NOT clean up prospects that are in active conversation or converted** — they may still be referencing the demo.

### 13. Dashboard (dashboard/)

A local Express server at `localhost:3333` with a vanilla HTML/CSS/JS interface. No framework.

**Pages:**

**Home / Overview (/)**
- Total prospects in DB
- Queue size (awaiting demo generation)
- Active sequences (in progress, by step)
- Emails sent today / this week / this month
- WhatsApp messages due today
- Reply rate by channel (email vs WhatsApp)
- Reply rate by sequence step (which touch converts best — this is the most important metric for optimising)
- Conversion rate (converted / total contacted)
- Revenue from converted deals (sum of deal_value where deal_stage = "won")
- Pipeline value (sum of deal_value where deal_stage = "quoted" or "in_conversation")

**Today's Batch (/batch)**
- List of prospects with demos ready for review
- For each prospect:
  - Business name, industry, city, Google rating
  - Their current website (link + screenshot) + PageSpeed score
  - Generated demo (iframe preview at both desktop and mobile widths)
  - Preview video (embedded player)
  - GIF preview (inline image — what the recipient will see in email)
  - Full generated email sequence (Day 0, Day 3, WhatsApp, Day 10 — all editable text areas)
  - Approve / Reject / Edit buttons
- Bulk approve button (approve all 5 at once if they all look good)

**Sequence Manager (/sequences)**
- All active sequences with their current step, shown as a timeline
- Filter by: step (Day 0/3/6/10), status, industry, city
- Today's due actions highlighted at top:
  - Day 3 follow-ups due (automated — will send when you run `npm run outreach send`)
  - Day 6 WhatsApp messages due (manual — with "Copy message" + "Open WhatsApp" + "Mark sent" buttons)
  - Day 10 breakups due (automated — will send when you run `npm run outreach send`)
- For each prospect: full timeline showing all touches sent, their dates, and whether the prospect clicked the demo link
- "Mark as replied" button with: channel selector (email/WhatsApp), sentiment (positive/negative/neutral), notes field
- "Mark as opted out" button (stops the sequence and flags the prospect)

**Deals (/deals)**
- Prospects that have replied positively, tracked through deal stages
- Kanban-style view: Replied → In Conversation → Quoted → Won → Lost
- For each deal: business name, industry, city, reply date, notes, deal value
- Drag-and-drop between stages (or buttons to advance)
- Won deals show revenue earned
- Lost deals show reason (editable notes)

**Prospect Database (/prospects)**
- Searchable, filterable table of all prospects
- Filter by: status, industry, city, country, date range, sequence step, deal stage
- Sort by: priority score, date, status
- Click to expand: full details, all email copy sent, demo link, complete outreach log timeline

**Outreach Log (/log)**
- Chronological feed of all actions
- Filterable by action type
- Shows: timestamp, prospect name, action, details

**Settings (/settings)**
- Edit config.json values through the UI
- Add/remove target queries
- Adjust daily limits and sequence timing
- View sending stats

**API Routes (routes.ts):**
```
GET  /api/stats                        — dashboard overview numbers
GET  /api/batch                        — today's batch of prospects with demos
POST /api/batch/:id/approve            — approve a prospect for sending
POST /api/batch/:id/reject             — reject a prospect
POST /api/batch/:id/edit               — update email copy (all 4 touches)
GET  /api/sequences                    — all active sequences
GET  /api/sequences/today              — today's due actions
POST /api/sequences/:id/whatsapp-sent  — mark WhatsApp as sent
GET  /api/prospects                    — list all prospects (paginated, filterable)
GET  /api/prospects/:id                — single prospect detail with full timeline
POST /api/prospects/:id/reply          — mark as replied (channel, sentiment, notes)
POST /api/prospects/:id/opt-out        — mark as opted out (stops sequence)
POST /api/prospects/:id/deal           — update deal stage and value
GET  /api/deals                        — all deals by stage
GET  /api/log                          — outreach activity log
GET  /api/config                       — current config
POST /api/config                       — update config
```

## Legal Compliance

Every email includes:
- Sender's full name
- Website (onurhaniffa.com)
- Opt-out mechanism ("If this isn't for you, just let me know and I won't email again.")
- Honest, non-deceptive subject line
- Non-deceptive content (no fake urgency, no misleading claims)

Opt-out handling:
- If a prospect replies with "stop", "unsubscribe", "remove me", "not interested", or similar — mark as opted_out in DB immediately
- opted_out prospects are excluded from ALL future sequence steps and future scrapes (even if re-discovered)
- Check opted_out flag before every send

Excluded markets:
- UAE / Dubai (consent required by law for cold B2B email)
- Germany (consent required for B2B cold email under UWG)

Demo pages include:
- "Demo concept by Onur Haniffa — onurhaniffa.com" watermark
- Token-based URLs (no business name in URL — prevents trademark issues)
- Auto-expire after 30 days

WhatsApp messages:
- Sent manually from personal WhatsApp Business (not automated API)
- Respectful, single message per prospect
- Clear identification of who you are and why you're messaging

## Error Handling

| Failure | Recovery |
|---|---|
| Outscraper API down | Retry 3x with exponential backoff, then skip and alert |
| PageSpeed API fails for a URL | Set score to null, still queue if no-website or other signals |
| Claude generates bad HTML | Validation catches it, regenerate once with feedback. If fails again, mark as "generation_failed" and skip |
| Claude generates placeholder text | Regex check catches it, regenerate once. If fails again, skip |
| Claude email copy uses banned phrase | Regex check catches it, regenerate with explicit instruction to avoid that phrase |
| Claude returns invalid JSON for email composition | Retry once. If fails, skip prospect. |
| Playwright video recording fails | Retry once, if fails again deploy demo without video (email uses demo link instead) |
| FFmpeg stitch/GIF extraction fails | Deploy demo without video/GIF (email falls back to demo link only) |
| GIF over 2MB after all resize attempts | Skip GIF, send text-only email with video link |
| Gmail send fails | Log error, keep in current sequence step for retry next run |
| Gmail rate limit hit | Stop sending, resume next run. Log how many were sent. |
| R2 upload fails | Retry once, then hold prospect for manual intervention |
| Prospect has no email | Skip entirely, never enters queue |
| Prospect has no phone | Skip entirely, never enters queue |
| Duplicate prospect | UNIQUE constraint catches it, skip silently |
| Opted-out prospect re-discovered | Check opted_out flag during scoring, skip silently |

## Security

- All API keys in `.env` (gitignored)
- Demo token URLs are 12-char nanoid (unguessable, ~2 trillion possibilities)
- No business logos scraped or used (text only in demos)
- No personal data stored beyond what's publicly listed on Google Maps
- SQLite database is local only, not deployed anywhere
- Dashboard only accessible on localhost
- GIF/video/demo files cleaned up after 30 days
- R2 bucket has no listing enabled (can't browse all demos, must know the token)

## Cost Breakdown (Monthly, at 5/day x 22 working days = 110 prospects)

| Service | Usage | Cost |
|---|---|---|
| Outscraper | ~200 lookups/month | ~$0.60 |
| PageSpeed API | ~200 calls/month | Free |
| Claude API (Sonnet) | ~110 demos x ~5K tokens + ~110 email compositions x ~2K tokens | ~$15 |
| Cloudflare R2 storage | ~110 demos x (HTML + video + GIF + preview) ~25MB each = ~2.7GB | Free tier (10GB) |
| Cloudflare R2 operations | ~500 PUT + ~1000 GET/month | Free tier (1M requests) |
| Gmail SMTP | ~110 Day 0 + ~110 Day 3 + ~110 Day 10 = ~330 emails | Free |
| **Total** | | **~$16/month** |

## Success Metrics

| Metric | Target | How Measured |
|---|---|---|
| Demos generated per day | 5 | Dashboard stats |
| Demo quality pass rate | >80% (4/5 pass validation) | Generation failure logs |
| GIF email delivery rate | >95% | Gmail sent folder (no bounces) |
| Reply rate (all channels combined) | >10% | Dashboard: replied / total contacted |
| Reply rate by touch | Track per step | Dashboard sequence analytics |
| WhatsApp reply rate | >15% | Dashboard: WhatsApp replies / WhatsApp sent |
| Interested rate (positive replies) | >5% | Manual tagging in dashboard |
| Monthly clients from outreach | 2-4 | Dashboard: deals won |
| Revenue per month from outreach | £1,000-3,000 | Dashboard: deal values |
| Cost per client acquired | <$10 | Total cost / deals won |
| Time spent per day | <30 min | Self-tracked |

## What's NOT in Scope (YAGNI)

- Multi-user support (solo tool)
- OAuth2 for Gmail (App Password works at this volume)
- Real-time email open tracking (hurts deliverability)
- Demo link click analytics (add later if needed via Cloudflare Analytics)
- CRM integration (SQLite is the CRM)
- Mobile app for the dashboard
- A/B testing email variants (optimise manually after seeing data)
- Automatic reply detection (check manually, mark in dashboard)
- WhatsApp Business API automation (manual sending is fine at 5/day and feels more personal)
- Multi-language support (English only for UK/IE/AU markets)
- LinkedIn outreach (can't automate without getting banned)
- Invoice generation or payment processing (handle offline)
