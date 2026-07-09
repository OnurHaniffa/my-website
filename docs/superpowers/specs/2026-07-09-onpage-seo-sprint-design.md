# On-Page SEO Sprint — onurhaniffa.com

**Date:** 2026-07-09
**Goal:** Convert existing organic impressions into clicks and WhatsApp inquiries by optimizing pages that ALREADY rank. Lead with fast on-page wins (Level 1); quality backlinks (Level 2) run as a slow parallel drip the user does manually.

## Why (verified)
- Backlinks are a confirmed top-3 ranking factor, but slow and partly out of our hands → treat as a light drip of ~5 QUALITY links, not a project.
- On-page CTR + content + internal linking is fast, free, fully in our control, and converts impressions we already have. **This sprint = Level 1.**

## Context — real GSC data (2026-07-09)
- **Cost blog** `/blog/web-sitesi-maliyeti-istanbul-2026/`: pos 7, **741 impr, ~0 clicks** — the single biggest CTR opportunity. A title fix is already made but sitting UNCOMMITTED/undeployed.
- `/web-tasarim-istanbul/`: pos 5.8 (top 6).
- `/web-sitesi-fiyatlari/`: **mid-wobble** (pos 7 → 18) from a July 5 title change → **LEAVE ITS TITLE ALONE**, let it settle.
- `/kurumsal-web-sitesi-yaptirma/`: pos 11 (striking distance — one nudge from page 1).
- Districts (kadıköy pos 33) climbing on their own — don't touch.
- **9 Google reviews (5.0)** — not yet surfaced anywhere on the site.

## Workstreams

### 1. CTR pass — titles + meta on already-ranking pages
- **Cost blog:** ship the uncommitted title fix + rewrite meta description to lead with the price hook. **#1 priority.**
- `/web-tasarim-istanbul/`: sharpen title + meta.
- `/kurumsal-web-sitesi-yaptirma/`: title + meta.
- `/web-sitesi-fiyatlari/`: **META ONLY** (title stays — mid-wobble).
- Hooks to lead with: **"15.000 TL'den · şeffaf fiyat · 2–6 hafta."**

### 2. Content depth — 2 highest-value pages only
- **Cost blog:** expand into the best answer to "web sitesi ne kadar" — clear price ranges, cost drivers, comparison, FAQ; funnel to fiyatları. **Expand, don't gut.** Run prose through the humanizer skill.
- `/web-sitesi-fiyatlari/`: deepen the body (NOT the title) into the most complete pricing answer in the market. Expand, don't gut.

### 3. Internal linking — funnel to money pages
- Cost blog (741 impr) → prominent keyword-anchor link to `/web-sitesi-fiyatlari/`.
- Homepage + strong pages → commercial pages with descriptive anchors.
- Internal links into `/kurumsal-...` (pos 11) to nudge it into page 1.

### 4. Design / conversion polish — money pages
- `/web-sitesi-fiyatlari/` + homepage: clearer pricing presentation, sharper WhatsApp CTAs, above-fold clarity.
- **Surface "5.0 ★ Google (9 reviews)"** social proof on the money pages. Premium, on-brand, **no cropped images** (per project rule). Invoke frontend-design skill during build.

## Safety rules (baked in — do not violate)
1. Don't touch titles of pages ranking well AND converting.
2. Be bold only on impressions-but-no-clicks pages.
3. **LEAVE `/web-sitesi-fiyatlari/` TITLE** (mid-wobble) — meta/body only.
4. Expand, don't gut ranking pages.
5. One clean batch = one recrawl cycle (no repeated tweaks).
6. No URL changes.
7. No keyword stuffing, thin content, or bought links.

## Level 2 drip (user does, parallel — not this sprint)
5 quality links only: Clutch (complete + 1 review), Sortlist, DesignRush, 1 local Istanbul directory, the lab credit link. Quality > quantity.

## Verification
- Playwright render-check every changed page + `npm run check`.
- Scoreboard baseline recorded (2026-07-09); re-measure lift ~2026-07-23.
- Ship in one clean commit + push to main (auto-deploys).

## Success criteria
- Organic clicks trend up (from 5) over 2–4 weeks.
- Cost blog converts its 741 impressions into real clicks.
- No lasting rank drops (temporary 1–2 week wobbles acceptable if they recover).
