# Cold Outreach Pipeline — Design Spec (v2)

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

**Pricing strategy:** £500-750 per project to start. Goal is to build portfolio + Google reviews, not maximize revenue. Price is never mentioned in outreach — it comes up in conversation after they reply.

## Architecture

A standalone Node.js/TypeScript CLI tool at `~/outreach/` with a local dashboard served via Express.

```
~/outreach/
├── src/
│   ├── discover.ts        — Outscraper API: find businesses + competitors
│   ├── analyze.ts         — PageSpeed API + Playwright: score websites
│   ├── score.ts           — Filter and rank prospects
│   ├── generate-demo.ts   — Claude API: create HTML demo pages
│   ├── record-video.ts    — Playwright: scroll-capture (desktop + mobile)
│   ├── generate-gif.ts    — FFmpeg: extract 3-5s animated GIF teaser
│   ├── deploy-demo.ts     — Deploy demo + video + GIF to Cloudflare
│   ├── compose-email.ts   — Claude API: generate unique personalized email
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
- **Cloudflare Pages** (demo hosting, free)
- **Cloudflare R2** (video + GIF hosting, free tier)

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
  competitor1 TEXT,
  competitor2 TEXT,
  status TEXT DEFAULT 'discovered',
  -- status flow: discovered → queued → demo_generated → approved → sequence_active → replied → converted → rejected → expired
  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  demo_url TEXT,
  demo_token TEXT,
  video_url TEXT,
  gif_url TEXT,
  -- Sequence tracking
  sequence_step INTEGER DEFAULT 0,
  -- 0=not started, 1=day0_email_sent, 2=day3_followup_sent, 3=day6_whatsapp, 4=day10_breakup_sent
  email_subject TEXT,
  email_body TEXT,
  day0_sent_at DATETIME,
  day3_sent_at DATETIME,
  day6_whatsapp_sent BOOLEAN DEFAULT 0,
  day6_whatsapp_sent_at DATETIME,
  day10_sent_at DATETIME,
  replied BOOLEAN DEFAULT 0,
  reply_channel TEXT,
  -- reply_channel: email, whatsapp
  reply_notes TEXT,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, business_name)
);

CREATE TABLE outreach_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prospect_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  -- actions: day0_email_sent, day3_followup_sent, day6_whatsapp_queued, day6_whatsapp_sent,
  --          day10_breakup_sent, reply_received, demo_deployed, demo_deleted, status_changed
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
npm run outreach discover -- --query "plumbers London"  # Specific query

# Pipeline — generate demos for today's batch
npm run outreach prepare               # Pull 5 from queue, analyze, generate demos, record videos, create GIFs

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
4. From the same query results, extract 2-3 competitor names (other businesses with websites) — stored as competitor1, competitor2 on the prospect
5. Skip if business already exists in DB (by email + name)
6. **Require both email AND phone** — prospects without phone are skipped (phone needed for WhatsApp on Day 6)
7. Insert new prospects with status "discovered"
8. Log the scrape in `scrape_history`

**Deduplication:** UNIQUE constraint on (email, business_name).

### 2. Analysis (analyze.ts)

**Input:** Prospect with a website URL
**Output:** Updated prospect with pagespeed_score, is_mobile_friendly, has_ssl

Flow:
1. Call PageSpeed Insights API: `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedtest?url={url}&strategy=mobile&category=performance`
2. Extract: performance score (0-100), LCP, CLS, FCP
3. Check SSL: does the URL redirect to HTTPS?
4. Check mobile: is there a viewport meta tag? (Playwright quick check)
5. Take a full-page screenshot with Playwright (saved locally for Claude to analyze during demo generation)
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

Filter OUT:
- No email address (can't contact them)
- No phone number (can't WhatsApp them)
- Already in queue or already contacted
- Country is UAE or Germany (strict consent laws for B2B cold email)

Update status to "queued" and set priority_score.

### 4. Demo Generation (generate-demo.ts)

**Input:** A queued prospect + their current website screenshot (if they have a site)
**Output:** Complete single-page HTML file

Flow:
1. Construct a Claude API prompt (Sonnet) with:
   - Business name, industry, city, phone, address, Google rating
   - Their current website screenshot (as base64 image, if available)
   - Specific issues found (PageSpeed score, mobile issues, SSL)
   - Industry-specific design instructions (see prompt below)
2. Claude returns complete HTML
3. Validate the HTML:
   - Business name appears in the output (exact match)
   - Phone number appears in the output
   - No placeholder text (regex scan for: "Lorem ipsum", "Your Business", "Company Name", "123-456", "example.com", "John Doe", "[placeholder]")
   - HTML is valid (basic structural checks)
   - Responsive viewport meta tag present
   - Design looks different from last 5 generated demos (basic CSS colour comparison)
4. If validation fails, regenerate once with feedback about what failed
5. If second attempt fails, skip prospect and log as "generation_failed"
6. Save HTML to `data/demos/{prospect-id}/index.html`
7. Generate a unique token (nanoid, 12 chars)
8. Update prospect: status → "demo_generated", demo_token set

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
- Generate a complete, single-page HTML file with ALL CSS inline (no external dependencies)
- Use the business's REAL name, phone number, and address throughout
- Sections: hero with strong CTA, services/what we do, about/why choose us, testimonials area (use "Your {rating}★ Google reviews speak for themselves" with a prompt to display real reviews), contact section with address and phone
- Mobile responsive (must look great on 375px wide)
- Modern design: clean typography, good whitespace, subtle animations (CSS only), professional colour palette appropriate for the industry
- DO NOT use placeholder images — use solid colour blocks, CSS gradients, or simple SVG icons/illustrations instead
- DO NOT use any generic placeholder text — every word must be relevant to this specific business
- Footer must include: "Demo concept by Onur Haniffa — onurhaniffa.com" in subtle, small text
- Make it look like a real website, not a template. Vary layouts between demos.
```

### 5. Video Recording (record-video.ts)

**Input:** Generated HTML demo file
**Output:** MP4 video file

Flow:
1. Launch Playwright, open the demo HTML at **1920x1080** (desktop)
2. Wait 2 seconds for any CSS transitions
3. Start video recording
4. Smooth auto-scroll from top to bottom over **15 seconds**
5. Pause 1 second at bottom
6. **Switch to mobile viewport (375x812)**
7. Scroll back to top instantly (no animation)
8. Smooth auto-scroll top to bottom over **10 seconds**
9. Stop recording
10. FFmpeg stitch: `intro.mp4` (5-sec personal intro clip) + desktop scroll + mobile scroll
11. Output: `data/videos/{prospect-id}.mp4` (total ~30 seconds)
12. Update prospect with local video path

**Why both desktop + mobile:** The core pitch for businesses with bad sites is "your site doesn't work on mobile." Showing the demo looking perfect on mobile in the video is the money shot.

### 6. GIF Generation (generate-gif.ts)

**Input:** The recorded demo video
**Output:** 3-5 second animated GIF showing the best part of the demo

Flow:
1. Extract a 3-5 second clip from the desktop portion of the video (the hero section)
2. FFmpeg converts to GIF: `ffmpeg -i video.mp4 -ss 6 -t 4 -vf "fps=12,scale=600:-1" -loop 0 output.gif`
   - Start at 6 seconds (after the intro clip, right when the demo appears)
   - 4 seconds duration
   - 12fps for smooth but small file size
   - 600px wide (good for email)
   - Loop forever
3. Verify GIF is under 2MB (Gmail inline image limit for reliable rendering). If over, reduce FPS to 8 or scale to 480px.
4. Save to `data/gifs/{prospect-id}.gif`
5. Update prospect with local GIF path

### 7. Demo Deployment (deploy-demo.ts)

**Input:** HTML file + video file + GIF file for a prospect
**Output:** Live URLs for all three

Flow:
1. Upload HTML to Cloudflare Pages at path `/{token}/index.html`
   - Live at: `https://outreach-demos.pages.dev/{token}/`
   - Token-based URL (no business name — prevents trademark issues)
2. Upload video to Cloudflare R2: `videos/{prospect-id}.mp4`
   - Public URL via R2 custom domain
3. Upload GIF to Cloudflare R2: `gifs/{prospect-id}.gif`
   - Public URL via R2 custom domain
4. Create a preview page at `/{token}/preview.html`:
   ```html
   <!-- Clean preview page with video player and CTA -->
   <video controls autoplay muted playsinline>
     <source src="{video_url}" type="video/mp4">
   </video>
   <p>Like what you see? Reply to my email and let's make it happen.</p>
   <p style="opacity:0.5">Demo concept by Onur Haniffa — onurhaniffa.com</p>
   ```
5. Update prospect: demo_url, video_url, gif_url

### 8. Email Composition (compose-email.ts)

**Input:** Prospect with demo, video, and GIF ready
**Output:** Email subject, HTML body (with inline GIF), and plain text fallback stored in prospect record

This is where Claude generates a **unique, genuine-sounding email for each prospect.** No rigid templates — Claude writes each email fresh based on a tone guide.

**Claude Email Composition Prompt:**
```
Write a cold outreach email for a web designer named Onur Haniffa who has built a demo website for this business.

BUSINESS DETAILS:
- Name: {business_name}
- Industry: {industry}
- City: {city}
- Google Rating: {rating}★ ({reviews} reviews)
- Has website: {yes/no}
- Website issues: {issues or "no website"}
- Competitors with websites: {competitor1}, {competitor2}

WHAT YOU'VE DONE:
You genuinely spent time building a demo website concept for this business. A GIF preview will be embedded in the email (you don't need to describe it — it will be inserted automatically after your text). A full 30-second video walkthrough link will be placed below the GIF.

TONE GUIDE:
- Write like a real human who actually put effort into this, not like a marketer
- Be warm, genuine, slightly casual. This should read like a message from a person, not a company
- Acknowledge honestly that this is cold outreach — don't pretend you "stumbled across" them
- Emphasise that you genuinely put in time and created this because you thought they could benefit
- Show you believe in what you made for them
- Be respectful of their time
- NEVER use these phrases: "I came across", "I stumbled upon", "I noticed", "I'd love to", "quick question", "just following up", "I hope this email finds you well", "touching base", "circle back", "reach out", "no-brainer"

FORMAT:
- Subject line: short, specific to their business, not clickbait-y
- Body: 4-6 sentences maximum before the GIF placement marker
- After the GIF: 1 sentence pointing to the full video + 1 sentence invitation to chat
- Sign off as: Onur Haniffa / Web Designer — onurhaniffa.com
- End with: (If this isn't for you, just let me know and I won't email again.)
- Place the marker {GIF_PLACEHOLDER} exactly where the GIF should appear in the email
- Place the marker {VIDEO_LINK} where the full video link should go

IMPORTANT:
- Each email must feel unique. Vary the opening, the angle, the specific compliment or observation.
- Reference something specific about the business: their Google rating, a specific service they offer, their location, their competitors — something that proves you actually looked at them.
- Keep it SHORT. The GIF does the selling, not the email.

EXAMPLE EMAILS (for tone reference only — do NOT copy these):

Example 1:
Subject: An idea for {Business Name}

Hi there,

I hope you're doing fantastic. I know this is a bit out of the blue, but I was looking at {industry} businesses in {city} and your {rating}★ reviews genuinely stood out — you clearly do great work. But honestly, your website doesn't do you justice.

I took the liberty of putting together a quick website concept for {Business Name}. I genuinely think it could help more people find you online.

{GIF_PLACEHOLDER}

Here's a 30-second walkthrough of the full concept: {VIDEO_LINK}

If you're even slightly interested, I'd love to chat about it. No pressure at all.

Onur Haniffa
Web Designer — onurhaniffa.com

(If this isn't for you, just let me know and I won't email again.)

Example 2:
Subject: Put something together for {Business Name}

Hi,

This might be a bit unusual — I'm a web designer and I actually went ahead and built a website concept for {Business Name}. I know you didn't ask for it, but I genuinely thought you could benefit from a fresh online presence, especially with your {rating}★ reputation.

{GIF_PLACEHOLDER}

Full 30-second walkthrough here: {VIDEO_LINK}

I'd be happy to talk if this is something you've been thinking about. Either way, I hope it's at least interesting to see.

Onur Haniffa
Web Designer — onurhaniffa.com

(If this isn't for you, just let me know and I won't email again.)
```

The pipeline then:
1. Takes Claude's output
2. Replaces `{GIF_PLACEHOLDER}` with the inline GIF image (CID-embedded for email)
3. Replaces `{VIDEO_LINK}` with the actual Cloudflare preview page URL
4. Generates both an HTML version (with embedded GIF) and a plain text fallback (with the video link only)
5. Stores both versions in the prospect record for review in the dashboard

### 9. The 4-Touch Sequence (sequence.ts)

**Input:** Active sequences and their current step
**Output:** Queues the appropriate action for each prospect based on their sequence day

```
Day 0  — Email with inline GIF + video link (automated)
Day 3  — Follow-up email in same thread (automated)
Day 6  — WhatsApp message with video link (semi-automated — sent manually from phone)
Day 10 — Breakup email in same thread (automated)
```

**Day 0 — Initial Email (automated)**
- Sends the Claude-composed email with inline GIF
- Uses Nodemailer with CID attachment for the GIF (renders inline in Gmail)
- Plain text fallback includes the video link
- Updates: sequence_step → 1, day0_sent_at → now, status → "sequence_active"

**Day 3 — Follow-up Email (automated)**
Claude generates a unique follow-up. Tone guide:
```
Write a short follow-up email. Same thread (Re: {original subject}).
3-4 sentences max. Gently reference what you sent, include the video link again.
Don't be pushy. Don't repeat the same pitch. Find a slightly different angle —
maybe mention a competitor, or a specific benefit for their industry.
Do NOT say "just following up" or "bumping this" or "circling back."
```
- Updates: sequence_step → 2, day3_sent_at → now

**Day 6 — WhatsApp Message (semi-automated)**
The dashboard queues up WhatsApp messages for the day. For each:
- Shows the business name, phone number, and pre-written message
- "Copy message" button copies text to clipboard
- "Open WhatsApp" button opens `https://wa.me/{phone}` in browser
- You paste and send manually from your phone/WhatsApp Web (~2 min for all 5)

WhatsApp message (generated by Claude, same tone principles):
```
Hi! I'm Onur, a web designer. I know this is a bit random, but I actually
put together a website concept for {Business Name} — I genuinely thought
you could benefit from it.

Here's a quick 30-second walkthrough: {video_url}

No pressure at all — just thought it might be useful! 👍
```
- Updates: sequence_step → 3 (marked by the user in dashboard after sending)

**Day 10 — Breakup Email (automated)**
Claude generates a unique breakup. Tone guide:
```
Write a final, graceful close-out email. Same thread (Re: {original subject}).
2-3 sentences. Let them know this is the last email. Leave the demo link
alive for a few more weeks. Be warm and wish them well.
This should NOT feel passive-aggressive. It should feel like a genuine,
respectful goodbye.
```
- Updates: sequence_step → 4, day10_sent_at → now

**Sequence rules:**
- If a prospect replies at ANY step, the sequence stops immediately. No further automated touches.
- Daily sending limit (5) applies to Day 0 emails only. Follow-ups and breakups don't count against the limit (they're for existing sequences, not new outreach).
- WhatsApp messages are not automated — they're queued in the dashboard for manual sending.

### 10. Email Sending (send.ts)

**Input:** Approved prospects + due sequence actions
**Output:** Emails sent, sequence steps updated

Flow:
1. Query DB for:
   - Day 0: prospects with status "approved", limit by dailyLimit (5)
   - Day 3: prospects where day0_sent_at is 3+ days ago AND sequence_step = 1 AND replied = false
   - Day 10: prospects where day0_sent_at is 10+ days ago AND sequence_step >= 2 AND replied = false
     (Note: Day 10 fires based on time since Day 0, not dependent on WhatsApp being marked sent. This prevents the sequence from stalling if the user forgets to mark WhatsApp as sent.)
2. For each email:
   - Create Nodemailer transport (Gmail SMTP + App Password)
   - For Day 0: send HTML email with CID-embedded GIF + plain text fallback
   - For Day 3 and Day 10: send plain text in same thread (using In-Reply-To header with original Message-ID)
   - Wait 30 seconds between sends
   - Update sequence tracking in DB
   - Log to outreach_log
3. If any send fails, log error but continue with remaining

**Email format for Day 0:**
- From: `Onur Haniffa <contact@onurhaniffa.com>`
- Content-Type: multipart/alternative (HTML + plain text)
- HTML part: Claude's email with GIF embedded via CID (`<img src="cid:demo-gif">`)
- Plain text part: Claude's email with video link (no GIF)
- Attachment: GIF file with Content-ID `<demo-gif>` and Content-Disposition `inline`

**Email threading for Day 3 and Day 10:**
- Store the Message-ID from Day 0 email in the DB
- Day 3 and Day 10 emails use `In-Reply-To` and `References` headers pointing to the Day 0 Message-ID
- Subject: `Re: {original subject}`
- This makes them appear in the same thread in Gmail

### 11. Cleanup (cleanup.ts)

Flow:
1. Find prospects where demo was deployed > 30 days ago
2. Delete HTML from Cloudflare Pages
3. Delete video from Cloudflare R2
4. Delete GIF from Cloudflare R2
5. Delete local files (demos/, videos/, gifs/)
6. Update status → "expired"
7. Log to outreach_log

### 12. Dashboard (dashboard/)

A local Express server at `localhost:3333` with a vanilla HTML/CSS/JS interface. No framework.

**Pages:**

**Home / Overview (/)**
- Total prospects in DB
- Queue size (awaiting demo generation)
- Active sequences (in progress)
- Emails sent today / this week / this month
- WhatsApp messages due today
- Reply rate by channel (email vs WhatsApp)
- Reply rate by sequence step (which touch converts best)
- Conversion rate (converted / total contacted)

**Today's Batch (/batch)**
- List of prospects with demos ready for review
- For each prospect:
  - Business name, industry, city, Google rating
  - Their current website (link) + PageSpeed score
  - Generated demo (iframe preview)
  - Preview video (embedded player)
  - GIF preview (inline image)
  - Generated email copy (editable text area — both subject and body)
  - Approve / Reject / Edit buttons
- Bulk approve button

**Sequence Manager (/sequences)**
- All active sequences with their current step
- Filter by: step (Day 0/3/6/10), status, industry, city
- Today's due actions highlighted at top:
  - Day 3 follow-ups to send (automated)
  - Day 6 WhatsApp messages to send (manual — with copy + open buttons)
  - Day 10 breakups to send (automated)
- For each prospect: full timeline of all touches sent and their dates
- "Mark as replied" button with channel selector (email/WhatsApp) and notes field

**Prospect Database (/prospects)**
- Searchable, filterable table of all prospects
- Filter by: status, industry, city, country, date range, sequence step
- Sort by: priority score, date, status
- Click to expand: full details, all email copy sent, demo link, complete outreach log

**Outreach Log (/log)**
- Chronological feed of all actions
- Filterable by action type
- Shows: timestamp, prospect name, action, details

**Settings (/settings)**
- Edit config.json values through the UI
- Add/remove target queries
- Adjust daily limits
- View sending stats

**API Routes (routes.ts):**
```
GET  /api/stats                     — dashboard overview numbers
GET  /api/batch                     — today's batch of prospects with demos
POST /api/batch/:id/approve         — approve a prospect for sending
POST /api/batch/:id/reject          — reject a prospect
POST /api/batch/:id/edit            — update email subject/body
GET  /api/sequences                 — all active sequences
GET  /api/sequences/today           — today's due actions (follow-ups, WhatsApp, breakups)
POST /api/sequences/:id/whatsapp-sent — mark WhatsApp as sent
GET  /api/prospects                 — list all prospects (paginated, filterable)
GET  /api/prospects/:id             — single prospect detail with full timeline
POST /api/prospects/:id/reply       — mark as replied (channel, notes)
POST /api/prospects/:id/convert     — mark as converted
GET  /api/log                       — outreach activity log
GET  /api/config                    — current config
POST /api/config                    — update config
```

## Legal Compliance

Every email includes:
- Sender's full name
- Website (onurhaniffa.com)
- Opt-out mechanism ("If this isn't for you, just let me know and I won't email again.")
- Honest, non-deceptive subject line
- Non-deceptive content (no fake urgency, no misleading claims)

Excluded markets:
- UAE / Dubai (consent required by law)
- Germany (consent required for B2B cold email)

Demo pages include:
- "Demo concept by Onur Haniffa — onurhaniffa.com" watermark
- Token-based URLs (no business name in URL — prevents trademark issues)
- Auto-expire after 30 days

WhatsApp messages:
- Sent manually from personal WhatsApp Business (not automated API)
- Respectful, single message per prospect (no spam)
- Clear identification of who you are and why you're messaging

## Error Handling

| Failure | Recovery |
|---|---|
| Outscraper API down | Retry 3x with exponential backoff, then skip and alert |
| PageSpeed API fails for a URL | Set score to null, still queue if no-website or other signals |
| Claude generates bad HTML | Validation catches it, regenerate once with feedback. If fails again, mark as "generation_failed" and skip |
| Claude generates placeholder text | Regex check catches it, regenerate once. If fails again, skip |
| Claude generates duplicate-looking email | Compare against last 10 sent emails. If too similar, regenerate with explicit instruction to vary |
| Playwright video recording fails | Retry once, if fails again deploy demo without video (email will use demo link instead of video link) |
| FFmpeg stitch/GIF extraction fails | Deploy demo without video/GIF (email falls back to demo link only) |
| GIF over 2MB | Re-extract at lower FPS (8) and smaller width (480px). If still over, skip GIF and send text-only email with video link |
| Gmail send fails | Log error, keep in current sequence step for retry next run |
| Cloudflare deployment fails | Retry once, then hold prospect for manual intervention |
| Prospect has no email | Skip entirely, never enters queue |
| Prospect has no phone | Skip entirely, never enters queue (phone required for WhatsApp step) |
| Duplicate prospect | UNIQUE constraint catches it, skip silently |

## Security

- All API keys in `.env` (gitignored)
- Demo token URLs are 12-char nanoid (unguessable)
- No business logos scraped or used (text only in demos)
- No personal data stored beyond what's publicly listed on Google Maps
- SQLite database is local only, not deployed anywhere
- Dashboard only accessible on localhost
- GIF/video files cleaned up after 30 days

## Cost Breakdown (Monthly, at 5/day × 22 working days = 110 prospects)

| Service | Usage | Cost |
|---|---|---|
| Outscraper | ~200 lookups/month | ~$0.60 |
| PageSpeed API | ~200 calls/month | Free |
| Claude API (Sonnet) | ~110 demos × ~5K tokens + ~330 emails × ~1K tokens | ~$15 |
| Cloudflare Pages | ~110 static pages | Free |
| Cloudflare R2 | ~110 videos (~20MB each) + ~110 GIFs (~1MB each) | Free tier (2.3GB, under 10GB free) |
| Gmail SMTP | ~110 Day 0 + ~110 Day 3 + ~110 Day 10 = ~330 emails | Free |
| **Total** | | **~$16/month** |

## Success Metrics

| Metric | Target | How Measured |
|---|---|---|
| Demos generated per day | 5 | Dashboard stats |
| Demo quality pass rate | >80% (4/5 pass validation) | Generation failure logs |
| GIF email delivery rate | >95% | Gmail sent folder (no bounces) |
| Reply rate (all channels combined) | >10% | Dashboard: replied / total contacted |
| Reply rate breakdown by touch | Track per step | Dashboard sequence analytics |
| WhatsApp reply rate | >15% | Dashboard: WhatsApp replies / WhatsApp sent |
| Interested rate (positive replies) | >5% | Manual tagging in dashboard |
| Monthly clients from outreach | 2-4 | Dashboard conversions |
| Cost per client acquired | <$10 | Total cost / conversions |
| Time spent per day | <30 min | Self-tracked |

## What's NOT in Scope (YAGNI)

- Multi-user support (solo tool)
- OAuth2 for Gmail (App Password works at this volume)
- Real-time email open tracking (hurts deliverability, and we track link clicks via Cloudflare instead)
- CRM integration (SQLite is the CRM)
- Mobile app for the dashboard
- A/B testing email variants (optimise manually after seeing data)
- Automatic reply detection (check manually, mark in dashboard)
- WhatsApp Business API automation (manual sending is fine at 5/day and feels more personal)
- Multi-language support (English only for UK/IE/AU markets)
- LinkedIn outreach (can't automate without getting banned)
