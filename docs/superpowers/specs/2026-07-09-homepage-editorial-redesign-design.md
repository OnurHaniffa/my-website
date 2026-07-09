# Homepage Editorial Redesign — Killing the AI Tells

**Date:** 2026-07-09
**Goal:** The homepage looks templated/AI-generated ("vibecoded") — actively off-putting for a site whose job is to prove design skill. Redesign it into a distinctive, intentional, premium **editorial / design-studio** aesthetic (Direction A, user-approved) while keeping every SEO signal intact.

## Why this matters
The homepage IS the portfolio. Prospects deciding on a 15–70K TL project judge the designer by this page. Template tells → "he builds template sites" → lost trust. This is a conversion/trust fix as much as a design one.

## The AI tells to kill (diagnosed from live screenshots)
| # | Tell | Fix |
|---|------|-----|
| 1 | Dot-pill badges ("• ISTANBUL-BASED WEB DESIGNER", "• Starting from 15,000 TL") | Remove. Plain editorial kicker line or nothing. |
| 2 | Colored keyword in H1 ("Professional **Web Design** in Istanbul" in blue) | Single ink color; confidence from type, not color highlights. |
| 3 | Floating angled device mockups (browser chrome + phone) | Real work screenshots, large, flat, cleanly framed on the grid. |
| 4 | Generic stat bar (50+ / 5.0 / 2-6 with dividers) | Re-set as a quiet editorial line (small caps, rule above), not a boxed KPI strip. |
| 5 | Blue + red shadcn palette on white | Paper/ink editorial palette, ONE accent. |
| 6 | Circle-outline decorations, glow blurs | Remove all decorative flourishes. |
| 7 | Inter font (the canonical AI-default face) | New pairing (below). |
| 8 | Symmetric text-left/mockup-right hero | Asymmetric editorial composition. |

## Design system (Phase 1 tokens)
- **Type pairing:**
  - Display: **Fraunces** (characterful editorial serif, optical sizing, real personality) — headlines, section titles.
  - Body/UI: **Instrument Sans** or similar clean grotesk — body, nav, buttons. (Final call at build time; must NOT be Inter/Roboto/Arial/Space Grotesk.)
  - Loaded via @font-face/fontsource, subset, `font-display: swap` — performance budget: no layout shift, no LCP regression.
- **Palette (OKLCH tokens in app.css):**
  - Paper: warm off-white (~oklch 0.97 warm hue) ground.
  - Ink: near-black warm gray.
  - ONE accent: deep editorial blue (keeps brand continuity with existing primary, used sparingly — links, one CTA, small marks). Red demoted out of the marketing surface (WhatsApp green stays for the WhatsApp CTA only, it's a recognized brand color).
  - Dark mode: same system inverted (ink paper ↔), verified.
- **Grid & space:** 12-col editorial grid, generous margins, intentional asymmetry. Whitespace is the luxury signal.
- **Motion:** ONE orchestrated load reveal on the hero (staggered, transform/opacity only). Kill scattered fade-up-on-everything. GPU-only properties per project rule.

## Scope — two phases
**Phase 1 (this spec):** design tokens (fonts + palette) + **hero section rebuild**. The hero is the flagship, the most-seen surface, and carries tells #1–6 and #8. Establishes the language.
**Phase 2 (separate pass, after user sees Phase 1 live):** cascade the system through the remaining ~9 sections (portfolio, pricing, process, testimonials, industries, FAQ, blog, CTA) + header/footer alignment.

Phasing rationale: one section done excellently > ten sections half-restyled; user judges the direction on the hero before we commit the whole page; smaller diffs = verifiable.

Note: the token change (fonts/palette) will restyle shared components site-wide. That's intended — the system should propagate — but Phase 1 verification must check key non-homepage pages (fiyatları, a district page, blog post) still render correctly.

## New hero composition (concrete)
- Editorial kicker (small caps, letter-spaced): "Web Designer — Istanbul" (no pill, no dot).
- H1: same text "Professional Web Design in Istanbul" — set in Fraunces, large (clamp ~3.5–6rem), single ink color, tight leading. TR locale keeps its translated equivalent.
- Supporting paragraph: same copy as today (SEO-stable), body face, comfortable measure (~60ch).
- Facts line (replaces stat bar + price pill): one quiet line in small caps with thin rule: "50+ projects · 5.0 Google (9 reviews) · from 15,000 TL · 2–6 weeks".
- CTAs: primary "Write on WhatsApp" (solid ink or WhatsApp green, no gradient), secondary "See my work" as underlined text link — editorial, not two pill buttons.
- Work presence: ONE large flat screenshot of Designs by Joe, straight (no angle, no browser chrome, no phone overlay), cropped cleanly on the grid with a hairline border — or, if it fights the composition, typographic-only hero with work immediately below the fold. Build-time call.
- No circles, no glows, no floating shapes.

## SEO guardrails (hard rules)
1. H1/H2 text, paragraph copy, and all visible content strings UNCHANGED (both locales).
2. `<title>`, meta descriptions, canonical, hreflang, JSON-LD untouched.
3. URLs unchanged. Heading hierarchy unchanged.
4. Performance: no LCP/CLS regression — fonts subset + swap; images sized; motion transform/opacity only.
5. Project rule: never crop project images with object-cover — use clean full renders.

## Verification (before commit)
- `npm run check` clean.
- Playwright screenshots: desktop + mobile, light + dark, EN + TR — hero renders, no overflow, fonts loaded.
- Spot-check fiyatları + one district page + one blog post for token fallout.
- Confirm H1/meta/JSON-LD byte-identical where required (diff the rendered head).
- Single clean commit; push after user sees screenshots.

## Success criteria
- Zero items from the kill-list remain on the hero.
- Page reads "a designer with a point of view made this" — distinctive type, calm palette, real work.
- No SEO signal changed; no performance regression.
- User sign-off on the live hero before Phase 2 begins.
