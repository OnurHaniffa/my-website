# Internal Linking Architecture — Design Spec

**Date:** 2026-05-08
**Status:** Approved, building
**Phase:** SEO compounding plan, Phase 1 cleanup (cluster-and-link)

## Problem

29 TR-only landing pages live (5 cornerstones + 10 districts + 8 industries + 6 comparisons) plus 18 blog posts. The blog posts have 6+ months of Google index history; the cornerstones are brand new with near-zero authority. Currently no deliberate internal linking connects them — each lives as an orphaned page in Google's link graph.

Without internal linking:
- Cornerstones get no PageRank flow from older indexed content
- Google sees no topic-cluster signal (no "hub of related pages")
- Anchor text pointing at cornerstones is essentially absent
- Crawl frequency for cornerstones is minimal

This is infrastructure work, not traffic work. It manifests when traffic arrives in month 2-3 — without it, cornerstones rank multiple SERP pages worse than they should.

## Scope

**Cluster section + inline links across 18 blog posts and 5 cornerstones.**

Two halves of the same architecture:
- **Outbound (post → cornerstone):** 2-4 contextual inline links inside each blog post pointing up to the most relevant cornerstone(s)
- **Inbound (cornerstone → post):** "Bu konuda daha fazlası" cluster section on each cornerstone listing 4-6 related blog posts as cards

**Out of scope:**
- Industry/district/comparison cluster sections (premature — they don't have content clusters yet)
- Cross-blog "Related posts" widget at end of blog posts (different feature)
- Auto-keyword scanner (fragile, spammy — see Approach 3 in brainstorming)
- New blog posts to fill cluster gaps (will assess after this ships)

## Architecture

### Data layer

**1. Extend `BlogPost` interface in `src/lib/data/blog-posts.ts`:**

```ts
export interface BlogPost {
  // ... existing fields
  relatedCornerstones?: string[];  // e.g., ['/web-sitesi-fiyatlari/', '/web-tasarim-istanbul/']
}
```

Each blog post gets 1-3 cornerstone paths in priority order (most relevant first). Optional field — backwards compatible.

**2. New `src/lib/data/cornerstone-clusters.ts`:**

```ts
export const cornerstoneClusters: Record<string, string[]> = {
  '/web-tasarim-istanbul/': ['seo-nedir-isletmeler-icin-rehber', ...],
  '/web-sitesi-fiyatlari/': [...],
  '/kurumsal-web-sitesi-yaptirma/': [...],
  '/e-ticaret-sitesi-yaptirma/': [...],
  '/web-sitesi-yenileme/': [...]
};
```

Single source of truth for "which posts cluster around this cornerstone." Order = display priority. Each cornerstone gets 4-7 posts.

### Component

**`src/lib/components/sections/CornerstoneCluster.svelte`**

Props:
```ts
{ cornerstonePath: string; heading?: string; }
```

Logic:
1. Look up `cornerstoneClusters[cornerstonePath]` → list of slugs
2. Resolve each slug to a `BlogPost` from `blogPosts`
3. Render heading + grid of 4-6 post cards

Card shape: thumbnail/icon, title (titleTr), description (descriptionTr, ~150 char truncated), read time, "Devamı →" link to `/blog/[slug]/`.

Layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for 4-7 cards. Same visual language as existing site cards.

Drop into all 5 cornerstones between FAQ section and final CTA:
```svelte
<CornerstoneCluster cornerstonePath="/web-tasarim-istanbul/" />
```

### Cluster mapping (data design)

| Cornerstone | Cluster posts (in display order) |
|---|---|
| `/web-tasarim-istanbul/` | seo-nedir-isletmeler-icin-rehber, istanbul-dijital-pazarlama-rehberi-2026, istanbul-kucuk-isletme-web-sitesi-rehberi, sosyal-medya-mi-web-sitesi-mi, google-ads-mi-seo-mu-isletmeler-icin-karsilastirma, web-tasarim-trendleri-2026, kurumsal-web-sitesi-neden-onemli |
| `/web-sitesi-fiyatlari/` | web-sitesi-maliyeti-istanbul-2026, web-tasarimci-secerken-10-soru, sosyal-medya-mi-web-sitesi-mi, istanbul-kucuk-isletme-web-sitesi-rehberi |
| `/kurumsal-web-sitesi-yaptirma/` | kurumsal-web-sitesi-neden-onemli, web-sitesi-guvenligi-rehberi-2026, mobil-uyumlu-web-sitesi-neden-sart, web-sitesi-donusum-orani-artirma, avukat-hukuk-burosu-web-sitesi-tasarimi |
| `/e-ticaret-sitesi-yaptirma/` | e-ticaret-web-sitesi-kurma-rehberi-2026, web-sitesi-donusum-orani-artirma, web-sitesi-hizi-ve-seo-iliskisi, mobil-uyumlu-web-sitesi-neden-sart |
| `/web-sitesi-yenileme/` | wordpress-mu-ozel-yazilim-mi, web-sitesi-hizi-ve-seo-iliskisi, web-tasarim-trendleri-2026, mobil-uyumlu-web-sitesi-neden-sart, neden-sveltekit-en-iyi-framework, web-sitesi-guvenligi-rehberi-2026 |

Total link count: ~26 cornerstone→post edges (some posts appear in 2-3 clusters by design).

### Inline anchor mapping (post → cornerstone)

Each post receives 2-4 inline `<a href>` insertions to the cornerstone(s) it supports. **No new sentences added** — only linkify existing keyword phrases.

| Blog post | Primary cornerstone | Secondary | Anchor count |
|---|---|---|---|
| web-tasarimci-secerken-10-soru | /web-sitesi-fiyatlari/ | /web-tasarim-istanbul/ | 2-3 |
| web-sitesi-maliyeti-istanbul-2026 | /web-sitesi-fiyatlari/ | /web-tasarim-istanbul/ | 3 |
| neden-sveltekit-en-iyi-framework | /web-sitesi-yenileme/ | /wordpress-vs-ozel-tasarim/ | 2 |
| web-tasarim-trendleri-2026 | /web-sitesi-yenileme/ | /web-tasarim-istanbul/ | 2 |
| restoran-web-sitesi-tasarimi-rehberi | /restoran-web-sitesi/ | /web-tasarim-istanbul/ | 2 |
| mobil-uyumlu-web-sitesi-neden-sart | /web-sitesi-yenileme/ | /kurumsal-web-sitesi-yaptirma/ | 2-3 |
| e-ticaret-web-sitesi-kurma-rehberi-2026 | /e-ticaret-sitesi-yaptirma/ | /web-sitesi-fiyatlari/ | 3 |
| kurumsal-web-sitesi-neden-onemli | /kurumsal-web-sitesi-yaptirma/ | /web-tasarim-istanbul/ | 3 |
| web-sitesi-hizi-ve-seo-iliskisi | /web-sitesi-yenileme/ | /e-ticaret-sitesi-yaptirma/ | 2 |
| seo-nedir-isletmeler-icin-rehber | /web-tasarim-istanbul/ | /kurumsal-web-sitesi-yaptirma/ | 2 |
| wordpress-mu-ozel-yazilim-mi | /wordpress-vs-ozel-tasarim/ | /web-sitesi-yenileme/ | 3 |
| web-sitesi-guvenligi-rehberi-2026 | /kurumsal-web-sitesi-yaptirma/ | /web-sitesi-yenileme/ | 2 |
| sosyal-medya-mi-web-sitesi-mi | /web-tasarim-istanbul/ | /web-sitesi-fiyatlari/ | 2 |
| web-sitesi-donusum-orani-artirma | /e-ticaret-sitesi-yaptirma/ | /kurumsal-web-sitesi-yaptirma/ | 2 |
| istanbul-kucuk-isletme-web-sitesi-rehberi | /web-tasarim-istanbul/ | /web-sitesi-fiyatlari/ | 2-3 |
| avukat-hukuk-burosu-web-sitesi-tasarimi | /avukat-web-sitesi/ | /kurumsal-web-sitesi-yaptirma/ | 2 |
| google-ads-mi-seo-mu-isletmeler-icin-karsilastirma | /web-tasarim-istanbul/ | /web-sitesi-fiyatlari/ | 2 |
| istanbul-dijital-pazarlama-rehberi-2026 | /web-tasarim-istanbul/ | /e-ticaret-sitesi-yaptirma/ | 2 |

Estimated total: ~40-50 post→cornerstone inline anchors.

### Anchor text strategy

**Rule:** Only linkify phrases the post **already contains**. Don't add new sentences.

Good anchor diversity (mix these per cornerstone, don't repeat the same anchor 5x):
- `/web-sitesi-fiyatlari/` → "web sitesi fiyatları", "web sitesi maliyeti", "şeffaf fiyatlandırma"
- `/kurumsal-web-sitesi-yaptirma/` → "kurumsal web sitesi", "kurumsal site yaptırma", "kurumsal web tasarımı"
- `/web-tasarim-istanbul/` → "İstanbul'da web tasarım", "İstanbul web tasarımcı", "İstanbul'daki web tasarım hizmeti"
- `/e-ticaret-sitesi-yaptirma/` → "e-ticaret sitesi", "e-ticaret altyapısı", "e-ticaret sitesi yaptırma"
- `/web-sitesi-yenileme/` → "web sitesi yenileme", "site yenileme", "mevcut sitenizi yenilemek"

This anchor variety is itself a ranking signal — Google sees diverse natural anchors as more credible than 50 identical ones.

## Verification

Extend `verify-full-seo-suite.mjs` with two new checks:

**Check 7: Cornerstone cluster present**
For each of 5 cornerstones:
- Count `<a href="/blog/...">` links in main content area
- Must be ≥4

**Check 8: Blog posts link upward**
For 3 sampled blog post URLs:
- Count `<a href="/[cornerstone-path]/">` links in main content
- Must be ≥1

**Manual eyeball check:**
- Render `/web-tasarim-istanbul/` cornerstone — verify cluster section renders 4-7 cards correctly on mobile + desktop
- Click 2 random anchors in 2 random blog posts — verify they navigate to expected cornerstones
- Verify no broken links (404s)

## Implementation order

1. Add `relatedCornerstones` field type to `BlogPost`
2. Create `cornerstone-clusters.ts` data file
3. Build `CornerstoneCluster.svelte` component
4. Drop component into 5 cornerstone pages (between FAQ and CTA)
5. Render-test cluster section (Playwright)
6. Edit each of 18 blog posts: add `relatedCornerstones` field + linkify 2-4 phrases
7. Extend verification script
8. Full Playwright verify
9. Commit + push

## Quality standards

- **No new sentences in blog posts** — linkify existing phrases only
- **No "Click here" / "Read more" anchors** — descriptive keyword anchors only
- **Anchor diversity per cornerstone** — vary anchor text, don't repeat same phrase across all incoming links
- **Cluster cards must be readable** — title + description + read time + arrow link, not 12 fields
- **Mobile-first cluster** — 1 column mobile, 2-3 columns desktop
- **No broken links** — every anchor verified during testing

## Realistic timeline (re-stated)

| Week | What's measurable |
|---|---|
| 1-2 | Crawl. No visible change. |
| 3-4 | Re-index with new link graph. Maybe minor SERP shifts. |
| 8-12 | First measurable benefit if cornerstones are on the cusp of page 1-2 transitions. |
| 24+ | Compounding benefit — locked plan's "100 clicks/mo + first inquiry" largely depends on this being in place. |

This is the work that the locked plan calls out as Phase 1 cleanup. It can't be done later when traffic arrives — it has to already be in place.
