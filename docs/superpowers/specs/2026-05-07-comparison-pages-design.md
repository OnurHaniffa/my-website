# Comparison Pages — Design Spec

**Date:** 2026-05-07
**Status:** Approved, building
**Phase:** SEO compounding plan, Phase 2 (last batch — comparisons)

## Problem

23 TR landing pages live (5 cornerstones + 10 districts + 8 industries). Locked SEO plan still has Phase 2 unfinished: comparison pages targeting decision-stage queries. These are buyers who already know they want a site and are choosing between options — high commercial intent, lower competition than head-of-funnel cornerstones.

**Reviewer's "don't ship more programmatic for 30 days" advice is wrong on timeline** (data won't arrive in 30 days for new pages — the locked plan itself shows month 1 = "0 traffic"). But the *spirit* is right: don't clone the same `IndustryPage.svelte` shape into 50 more pages. Comparison pages use a **different template structure**, so they don't compound the "thin template at scale" risk.

## Scope

**6 TR-only comparison routes:**

| Route | Buyer question | Primary keyword |
|---|---|---|
| `/wix-vs-ozel-web-sitesi/` | Wix or custom? | wix vs özel web sitesi |
| `/web-ajansi-vs-freelance/` | Agency or freelancer? | web ajansı vs freelance |
| `/wordpress-vs-ozel-tasarim/` | WordPress or custom? | wordpress vs özel tasarım |
| `/sablon-vs-ozel-tasarim/` | Template or custom design? | şablon vs özel tasarım |
| `/ucuz-vs-kaliteli-web-sitesi/` | Cheap or quality? | ucuz web sitesi vs kaliteli |
| `/yurtdisi-vs-yerli-web-tasarimci/` | Foreign or local designer? | yurtdışı vs yerli web tasarımcı |

**Out of scope:**
- EN comparison pages (English buyer queries differ — different copy, future batch)
- More than 6 pages (scope guardrail — quality > quantity per reviewer)
- Affiliate-style "best Wix alternatives" listicles (different intent, different page type)

## Architecture

Mirror the industries pattern, since it's verified working:

```
src/lib/data/comparisons.ts         # Data array, exported Comparison[] type
src/lib/components/sections/
  └── ComparisonPage.svelte         # Shared template (~400-500 lines)
src/routes/
  ├── wix-vs-ozel-web-sitesi/+page.svelte           # 8-line wrapper
  ├── web-ajansi-vs-freelance/+page.svelte          # 8-line wrapper
  ├── wordpress-vs-ozel-tasarim/+page.svelte        # 8-line wrapper
  ├── sablon-vs-ozel-tasarim/+page.svelte           # 8-line wrapper
  ├── ucuz-vs-kaliteli-web-sitesi/+page.svelte      # 8-line wrapper
  └── yurtdisi-vs-yerli-web-tasarimci/+page.svelte  # 8-line wrapper
src/lib/i18n/tr-only-routes.ts      # Add 6 paths to allowlist
src/lib/components/layout/footer.svelte  # Add Karşılaştırmalar column
src/routes/sitemap.xml/+server.ts   # Add comparisons.map(...) spread
scripts/verify-full-seo-suite.mjs   # Add 1-2 comparison routes to PAGES array
```

## Comparison data shape

```ts
interface Comparison {
  slug: string;                    // "wix-vs-ozel-web-sitesi"
  optionA: { name: string; tagline: string; }; // { name: 'Wix', tagline: 'Hazır şablon, sürükle-bırak' }
  optionB: { name: string; tagline: string; }; // { name: 'Özel Web Sitesi', tagline: 'Sıfırdan tasarım, kod kontrolü' }
  metaTitle: string;               // ≤60 chars
  metaDescription: string;         // ≤155 chars
  heroH1: string;
  heroSubtitle: string;
  comparisonRows: Array<{          // Side-by-side comparison table rows
    aspect: string;                // "Aylık Maliyet"
    a: string;                     // "16-49 USD/ay"
    b: string;                     // "Hosting maliyeti hariç tek seferlik"
  }>;
  whenToChooseA: { headline: string; reasons: string[]; };  // 3-5 reasons
  whenToChooseB: { headline: string; reasons: string[]; };  // 3-5 reasons
  honestTake: string;              // 200-300 word honest paragraph from designer perspective
  faq: Array<{ q: string; a: string }>; // 5-6 FAQs
  whatsappPrefill: string;
}
```

## Page structure (ComparisonPage.svelte)

1. **Hero** — H1 with both options, subtitle, two-button CTA (WhatsApp + scroll-to-comparison)
2. **Side-by-side comparison table** — 8-12 rows. Cost, time, SEO, scaling, support, ownership, etc.
3. **"When to choose A" panel** — 3-5 specific use cases, real examples
4. **"When to choose B" panel** — 3-5 specific use cases, real examples
5. **Honest take** — designer-perspective paragraph (~250 words). Not marketing copy. Real trade-offs.
6. **FAQ section** — 5-6 questions with FAQPage schema
7. **Sticky bottom WhatsApp CTA** — same pattern as industries

## Quality standards (apply from start, not retrofitted)

Lessons from this morning's BLOCK fixes baked in:

- **No fabricated %XX stats.** Hedge with "çoğu", "büyük kısmı", "genelde" if the precise number isn't verifiable
- **Real prices** — match the rest of the site (15K-70K TL ranges already documented in `web-sitesi-fiyatlari/`)
- **Title tags ≤60 chars** (verified in tests)
- **Description ≤155 chars** for SERP truncation safety
- **FAQ schema** on every page
- **No template-fill content** — each "honest take" is hand-written specific to the comparison
- **Internal links** — every page links to ≥2 cornerstones + ≥1 industry where relevant
- **No "industry-leading" / "best-in-class" / "world-class"** filler
- **Hedge cost claims** — Wix prices are public, custom prices vary; cite actual pricing tiers

## Footer cluster expansion

Currently 3 columns: Hizmetler / Sektörler / Hizmet Bölgeleri. Add a 4th column:

```
Karşılaştırmalar
- Wix vs Özel Site
- Web Ajansı vs Freelance
- WordPress vs Özel Tasarım
- Şablon vs Özel Tasarım
- Ucuz vs Kaliteli Site
- Yurtdışı vs Yerli Tasarımcı
```

Grid changes from `md:grid-cols-3` → `md:grid-cols-4` (or `md:grid-cols-2 lg:grid-cols-4` if cramped at md). Verify rendering at 768px, 1024px, 1280px viewports.

## Verification (must pass before commit)

**Extended `verify-full-seo-suite.mjs`** with comparison sample routes. All checks must pass:
- `lang=tr` on every comparison route
- Switcher hidden (TR-only)
- No hero button overlaps
- Footer in TR
- 0 console errors
- FAQPage schema present

**Manual eyeball check:**
- Render `/wix-vs-ozel-web-sitesi/` on mobile (390px) and desktop (1440px)
- Verify comparison table doesn't break on mobile (stacks vertically)
- Verify sticky CTA doesn't overlap content
- Verify footer 4-column grid doesn't cramp at 768px

**Production verification post-deploy:**
- Curl one comparison URL, confirm 200 + correct meta tags
- Spot-check sitemap.xml includes all 6 new paths

## Out of scope (deliberate)

- A/B testing variants
- Dynamic comparison "vs" search functionality
- Affiliate links to Wix/Squarespace
- Pricing calculator embedded in comparison
- Video embeds
- Changing existing IndustryPage.svelte / DistrictPage.svelte to share components with ComparisonPage (premature abstraction; ship and observe first)

## After this ships

Per the SEO plan reevaluation:
1. **Stop programmatic page builds.** This is the last batch.
2. **Internal-link re-architecture** — re-link 19 existing blog posts into the 5 cornerstones (no new pages, just link discipline)
3. **Lightweight GSC monitoring** — script that pulls weekly GSC summary, surfaces winners/losers
4. **Wait until month 2-3** for traffic data, then iterate winners

## Open questions / risks

- **Risk:** Comparison pages can read like SEO bait if not honestly opinionated. Mitigation: each "honest take" must be specific and willing to recommend the *other* option in some scenarios. Wix is genuinely the right answer for some buyers — say so.
- **Risk:** Footer cluster getting overcrowded (now 4 columns, 23+6=29 links). Mitigation: keep `text-sm`, watch mobile rendering.
- **Open:** Title tag patterns — `Wix vs Özel Web Sitesi: Hangisi Daha İyi? (2026)` is 49 chars, fits. Will write each by hand to avoid template feel.
