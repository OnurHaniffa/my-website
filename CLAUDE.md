# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server at localhost:5173
npm run build            # Production build
npm run preview          # Preview production build

# Type checking
npm run check            # Run svelte-check once
npm run check:watch      # Run svelte-check in watch mode

# Testing (Playwright)
npx playwright test                        # Run all tests
npx playwright test tests/performance.spec.ts  # Run specific test file
```

## Architecture

This is a **SvelteKit 2 + Svelte 5** portfolio website using **Tailwind CSS 4** with shadcn-svelte UI components.

### Tech Stack
- **Framework**: SvelteKit 2 with Svelte 5 (uses runes: `$state`, `$derived`, `$effect`)
- **Styling**: Tailwind CSS 4 with OKLCH color system in `src/app.css`
- **UI Components**: shadcn-svelte (bits-ui based) in `src/lib/components/ui/`
- **Animations**: Motion One (`motion` package) + GSAP for complex animations
- **Testing**: Playwright for performance testing

### Project Structure

```
src/
├── routes/                    # SvelteKit file-based routing
│   ├── +page.svelte          # Homepage
│   ├── +layout.svelte        # Root layout (header/footer)
│   ├── work/                 # Portfolio page
│   ├── services/             # Services page (speedometer gauge UI)
│   ├── about/
│   ├── contact/
│   └── privacy/
├── lib/
│   ├── components/
│   │   ├── ui/               # shadcn-svelte components (button, card, sheet, etc.)
│   │   ├── layout/           # Container, Section, Header, Footer
│   │   ├── sections/         # Page sections (ProcessChainRings, etc.)
│   │   └── portfolio/        # Project showcase components (10 showcase types)
│   ├── data/
│   │   └── projects.ts       # Project data with ShowcaseType enum
│   └── utils/
│       └── animations.ts     # Motion One animation utilities & Svelte actions
└── app.css                   # Tailwind config + OKLCH CSS custom properties
```

### Key Patterns

**Animation Performance**: Use only GPU-accelerated properties (`transform`, `opacity`). Avoid `filter: blur()` and `transition: all`. The `src/lib/utils/animations.ts` provides optimized Svelte actions.

**Project Showcase System**: Projects in `src/lib/data/projects.ts` have a `showcaseType` field that maps to different showcase components in `src/lib/components/portfolio/`.

**Component Imports**: Use barrel exports:
```svelte
import { Container, Section } from '$lib/components/layout';
import { Button } from '$lib/components/ui/button';
import { ProcessChainRings } from '$lib/components/sections';
```

**Color System**: Uses OKLCH colors defined as CSS custom properties. Primary is blue, accent is red. Both light and dark modes defined in `app.css`.

## Turkish SEO Landing Pages & Locale System

The site is bilingual (EN default, TR) **and** hosts 30+ **TR-only** programmatic SEO landing pages that target Turkish keywords and have no English equivalent. This is the most architecturally non-obvious part of the codebase — touch it carefully.

**Locale forcing (server-side):**
- `src/lib/i18n/tr-only-routes.ts` is an EXPLICIT allowlist (`Set`) of every TR-only path — the single source of truth. It's an allowlist on purpose (a regex like `*-web-tasarim` would silently force-Turk future routes).
- `src/hooks.server.ts` reads it via `isTrOnlyRoute()` and forces `locale='tr'` server-side for those routes.
- `+layout.server.ts` exposes `isTrOnlyRoute` to the client; `ui/language-switcher` hides the toggle on TR-only routes (no EN to switch to).
- TR-only pages live at the **root** path (e.g. `/kadikoy-web-tasarim/`), NOT under `/tr/`. Bilingual pages use `/` (EN) and `/tr/` (TR).
- `src/lib/i18n/index.svelte.ts` `initLocale` must NOT clobber the server-set locale (past bug). Footer prefers i18n translations over CMS strings on the TR locale.

**Adding a new TR-only landing page — REQUIRED steps (easy to miss any one):**
1. Create the route `src/routes/<slug>/+page.svelte`.
2. Add `'/<slug>'` to the allowlist in `tr-only-routes.ts` — else it won't force TR and the switcher won't hide.
3. Add it to `trOnlyPages` in `src/routes/sitemap.xml/+server.ts` — else it's missing from the sitemap.

**Data-driven page pattern:** Most landing pages are generated from a data file + one shared component, not hand-written per page. Each route file is an ~8-line wrapper that looks up its data entry and renders the component:
- `data/districts.ts` → `sections/DistrictPage.svelte` (10 Istanbul district pages)
- `data/industries.ts` → `sections/IndustryPage.svelte` (8 vertical pages)
- `data/comparisons.ts` → `sections/ComparisonPage.svelte` (6 "X vs Y" pages)
- `data/cornerstone-clusters.ts` → `sections/CornerstoneCluster.svelte` (related-blog cluster shown on cornerstone pages)

**Blog:** `data/blog-posts.ts` holds bilingual posts (`content`/`contentTr`, `titleTr`/`descriptionTr`, optional `relatedCornerstones`). The body is Markdown rendered by a **custom line-parser** in `routes/blog/[slug]/+page.svelte` — it supports headings, lists, inline links, bold, code; it does **not** support tables (use lists). The SERP `<title>` appends `| Onur Haniffa Blog`, so keep `titleTr` short or it truncates.

**Structured data (JSON-LD):** The root `+layout.svelte` emits the site-wide `@graph` (LocalBusiness/ProfessionalService + WebSite + per-page BreadcrumbList) **and the dynamic canonical for every page**. Individual landing/blog pages add their own `FAQPage` / `Service` / `Article` blocks. GOTCHA: do **not** add a self-serving `aggregateRating` to the business schema — Google disallows a business rating itself and it triggers "Review snippet" errors in Search Console; real stars come from the Google Business Profile.

## Content & Verification Rules

- **No fabricated stats** in landing/marketing copy — don't invent percentages ("%65 of customers…"), load times, or counts. Hedge ("çoğu", "büyük kısmı") or omit. Prices must match the site's real tiers (15K–70K+ TL).
- **Never crop project images** — always `w-full h-auto`; never `object-cover` or fixed aspect ratios on portfolio/project images.
- **Verify before commit** — render-verify changed pages with Playwright (see `scripts/verify-*.mjs`, e.g. `scripts/verify-full-seo-suite.mjs`) and run `npm run check`. Never ship unverified.
- SEO is monitored outside the repo via `~/mcp-google-ads/gsc_scoreboard.py` (weekly Search Console snapshot of clicks/impressions/positions).

## Skill Usage Policy

**MANDATORY: Always invoke the relevant skills before starting any task.** Even if it uses extra context, producing proper, well-thought-out code is the priority. Specific rules:

- **Design/UI tasks**: Always invoke `frontend-design` skill before building or modifying any page, component, or visual element.
- **Any task requiring creative thinking or planning**: Always invoke `superpowers:brainstorming` skill first. This includes new features, new pages, new components, content strategy, or any non-trivial change.
- **SvelteKit/Svelte work**: Use framework knowledge from this CLAUDE.md (Svelte 5 runes, OKLCH colors, shadcn-svelte patterns).
- **Bug fixes**: Invoke `superpowers:systematic-debugging` before proposing fixes.
- **Implementation plans**: Invoke `superpowers:writing-plans` for multi-step tasks.
- **Before claiming work is done**: Invoke `superpowers:verification-before-completion`.
- **Code review**: Invoke `superpowers:requesting-code-review` after completing major features.

**When in doubt, invoke the skill.** It is always better to use a skill and not need it than to skip one and produce lower quality work.
