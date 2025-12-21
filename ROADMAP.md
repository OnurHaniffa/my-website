# Master Plan: Personal Business Website for Web Design Services

## Executive Summary

This plan creates a high-converting freelance website targeting European SMBs, built on research from award-winning portfolios (Awwwards, Tobias van Schneider, Brittany Chiang) and B2B conversion best practices. The design philosophy: **serious but warm, premium but accessible, confident but approachable**.

---

# PART 1 — RESEARCH SYNTHESIS

## Analyzed Sources

### Award-Winning Portfolios Studied
- **Tobias van Schneider** (vanschneider.com): Bold color blocking, large typography, prestigious client work displayed prominently
- **Brittany Chiang** (brittanychiang.com): Dark blue theme, minimal navigation, quantified achievements, accessibility-focused
- **Awwwards Freelance Collection**: Patterns from Site of the Day winners including Gilles Tossoukpé, Patrick Heng, Rob Fenech

### Key Patterns Extracted

| Element | Pattern | Why It Works |
|---------|---------|--------------|
| **Hero Section** | Outcome-focused headline + clear value proposition | 8/10 people only read headlines; clarity beats cleverness |
| **Navigation** | 4-5 items maximum, sticky header | Reduces cognitive load, maintains accessibility |
| **Color** | Limited palette (2-3 colors) with strategic accent | Creates visual harmony, guides attention |
| **Typography** | Strong hierarchy: 48px H1, 24-32px H2, 16-18px body | 75% of users judge credibility by design |
| **Trust Signals** | Client logos, testimonials, case studies above fold | 86% of customers cite social proof as purchase driver |
| **CTA Structure** | Single primary action per section | Reduces decision fatigue |
| **Whitespace** | 40-60% negative space | Improves readability, signals premium positioning |
| **Portfolio** | Visual thumbnails + outcome-focused case studies | Shows capability through results, not descriptions |

### European Business Preferences
- **Transparency**: Clear pricing signals, straightforward communication
- **Professionalism**: Clean, minimal design over flashy animations
- **Time zone compatibility**: Mention availability for European business hours
- **Cultural alignment**: Understated confidence vs. American-style bold claims

---

# PART 2 — DESIGN STRATEGY

## Design Direction: "Calm Confidence"

A design language that communicates: *"I'm experienced, reliable, and easy to work with—let's build something great together."*

### Why This Works for European SMBs
1. **Trust through restraint**: European business culture values understated professionalism
2. **Accessibility signals competence**: Clean, functional design proves you practice what you preach
3. **Calm reduces friction**: SMB owners are often overwhelmed; a calm site feels like a safe choice

## Color Philosophy

### Primary Palette
```
Background:     #FAFAFA (off-white, warmer than pure white)
Text Primary:   #1A1A1A (soft black, easier on eyes)
Text Secondary: #6B7280 (neutral gray for supporting text)
Accent:         #2563EB (professional blue—trust, competence)
Accent Hover:   #1D4ED8 (darker blue for interactions)
```

### Why This Palette
- **Off-white background**: Warmer than clinical white, reduces eye strain, signals sophistication
- **Soft black text**: More refined than #000, reads as premium
- **Blue accent**: Most trusted color in business (used by IBM, LinkedIn, PayPal)—but used sparingly as an accent, not dominant
- **No harsh colors**: Avoids aggressive reds/oranges that feel salesy

### Alternative: Subtle Dark Mode Option
```
Background:     #0F172A (slate blue-black)
Text Primary:   #F8FAFC
Accent:         #3B82F6
```
Offer as toggle for user preference—signals technical sophistication.

## Typography Hierarchy

### Font Selection: Inter + System Stack
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
```

**Why Inter**:
- Designed specifically for screens
- Excellent readability at all sizes
- Free (Google Fonts), fast loading
- Professional without being corporate

### Scale (Mobile-First)
```
H1 (Hero):      40px / 48px desktop | font-weight: 700 | line-height: 1.1
H2 (Sections):  32px / 40px desktop | font-weight: 600 | line-height: 1.2
H3 (Cards):     24px / 28px desktop | font-weight: 600 | line-height: 1.3
Body:           16px / 18px desktop | font-weight: 400 | line-height: 1.6
Small/Caption:  14px              | font-weight: 400 | line-height: 1.5
```

### Hierarchy Rules
1. **One H1 per page** (critical for SEO and visual hierarchy)
2. **Max 60-75 characters per line** for readability
3. **Generous line-height** (1.5-1.6) for body text
4. **Letter-spacing: -0.02em** on headlines for tightness

## Spacing System (8px Base)

```
--space-1:  4px   (tight)
--space-2:  8px   (elements)
--space-3:  16px  (related groups)
--space-4:  24px  (sections)
--space-5:  32px  (major sections)
--space-6:  48px  (page sections)
--space-7:  64px  (hero spacing)
--space-8:  96px  (section dividers)
```

### Layout Rules
- **Container max-width**: 1200px (comfortable reading width)
- **Section padding**: 96px vertical on desktop, 64px on mobile
- **Card padding**: 32px internal spacing
- **Content width for text**: 680px max (optimal reading)

## Animation Philosophy: "Purposeful Subtlety"

### What to Animate
- **Page transitions**: Gentle fade (200ms)
- **Hover states**: Scale 1.02 + shadow lift
- **Scroll reveals**: Fade up (not bounce or spin)
- **Loading states**: Skeleton shimmer

### What NOT to Animate
- No parallax (distracting, accessibility issues)
- No auto-playing carousels (conversion killers)
- No bouncing or spinning elements
- No page entry animations beyond subtle fade

### Implementation
```css
transition: all 200ms ease-out;
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  transition: none;
}
```

---

# PART 3 — WEBSITE STRUCTURE & CONTENT STRATEGY

## Site Map

```
/ (Home)
├── /work (Portfolio)
│   ├── /work/[project-slug] (Case Study 1)
│   └── /work/[project-slug] (Case Study 2)
├── /services
├── /about
├── /contact
└── /privacy (Legal requirement for EU)
```

## Page-by-Page Strategy

### HOME PAGE

**Psychological Goal**: Establish credibility in 3 seconds, create desire to learn more.

#### Section 1: Hero (Above the Fold)
```
HEADLINE (H1):
"I design websites that help European businesses grow."

SUBHEADLINE:
"Modern, professional websites built with trust and clarity—
so your customers know they're in good hands."

CTA: "See My Work" (button → /work)
SECONDARY: "Get in Touch" (text link → /contact)
```

**Why this copy**:
- **Outcome-focused**: "help businesses grow" not "I make websites"
- **Geographic targeting**: "European businesses" signals relevance
- **Trust language**: "trust and clarity" matches their needs
- **Customer-centric**: "so your customers know" puts client's customer first

#### Section 2: Trust Bar
```
"Trusted by businesses across Europe"
[Client Logo 1] [Client Logo 2] [Industry badges if applicable]
```

#### Section 3: Featured Work (2 Projects)
- Visual thumbnails (16:9 ratio)
- Project name + one-line outcome
- "View Case Study" link
- If you only have 2 projects, show both prominently—quality over quantity

#### Section 4: Services Overview
Three cards:
1. **Website Design** — "Strategic design that converts visitors into customers"
2. **Website Development** — "Fast, accessible, built to last"
3. **Ongoing Support** — "Peace of mind after launch"

CTA: "Learn More About Services"

#### Section 5: Why Work With Me
3-4 short points:
- "Clear communication, no jargon"
- "Fixed pricing, no surprises"
- "Fluent in European business hours"
- "Your project, your ownership"

#### Section 6: Testimonial (if available)
Single, prominent testimonial with:
- Quote
- Name + Company + Photo
- Result if possible ("Increased inquiries by 40%")

#### Section 7: CTA Section
```
"Ready to discuss your project?"
"Let's have a conversation about your goals—no pressure, no sales pitch."
[Schedule a Call] or [Send a Message]
```

#### Section 8: Footer
- Navigation links
- Contact email
- LinkedIn (professional credibility)
- "Based in [City] • Available across Europe"
- Privacy Policy link (GDPR requirement)

---

### WORK PAGE (/work)

**Psychological Goal**: Prove capability through real results.

#### Structure
- Brief intro: "Selected projects showcasing strategy, design, and results."
- Project cards (2 projects):
  - Large thumbnail image
  - Project name
  - One-line description
  - Industry/Type tag
  - "View Case Study" button

#### Individual Case Study Pages (/work/[slug])

**Structure**:
1. **Hero**: Project name + thumbnail + one-sentence impact
2. **Overview**: Client, Industry, Services Provided, Timeline
3. **The Challenge**: What problem were they facing?
4. **The Solution**: What did you build and why?
5. **Visual Gallery**: Screenshots, mockups (3-6 images)
6. **The Results**: Metrics if available, or qualitative outcomes
7. **Client Testimonial**: If available
8. **Next Project**: Link to the other case study

---

### SERVICES PAGE (/services)

**Psychological Goal**: Clarify what you offer, reduce ambiguity.

#### Structure
```
HEADLINE: "Services designed for growing businesses"

INTRO: "I partner with small and medium businesses to create
websites that look professional, work beautifully, and drive results."
```

#### Service 1: Website Design & Development
- What's included (discovery, design, development, testing)
- Technologies used (mention modern stack)
- Timeline indication ("typically 4-8 weeks")
- Starting price or "Get a Quote"

#### Service 2: Website Redesign
- For businesses with outdated sites
- Modernization approach

#### Service 3: Ongoing Maintenance (Optional)
- Monthly support packages
- Updates, security, minor changes

#### FAQ Section
- "How much does a website cost?"
- "How long does a project take?"
- "Do I own my website?"
- "Can you work with my existing brand?"

---

### ABOUT PAGE (/about)

**Psychological Goal**: Build human connection, establish reliability.

#### Structure
1. **Professional photo** (high quality, friendly but professional)
2. **Opening statement**: Who you are, what you do, why you do it
3. **Your approach**: 3-4 points on how you work
4. **Background**: Brief career summary (builds credibility)
5. **Personal touch**: One human detail (location, interests—keeps it real)
6. **CTA**: "Let's work together" → Contact

#### Copy Tone
- First person ("I" not "We")
- Warm but professional
- Confident but not boastful
- Focus on client benefit, not self-promotion

---

### CONTACT PAGE (/contact)

**Psychological Goal**: Make it easy to reach out, reduce friction.

#### Structure
1. **Headline**: "Let's talk about your project"
2. **Subheadline**: "Tell me about your business and goals—I'll get back to you within 24 hours."
3. **Simple form**:
   - Name
   - Email
   - Company (optional)
   - Message
   - Submit button: "Send Message"
4. **Alternative contact**: Direct email address displayed
5. **Availability note**: "I typically work with 2-3 clients at a time to ensure quality."
6. **Time zone note**: "Based in [Location] (CET/CEST) • Available across European time zones"

---

## Trust Signals by Page

| Page | Trust Signals |
|------|---------------|
| Home | Client logos, testimonial, "trusted by" language |
| Work | Real case studies, results, visual proof |
| Services | Clear deliverables, FAQ transparency |
| About | Photo, background, human connection |
| Contact | Response time commitment, availability |

## Portfolio Showcase Strategy (2 Projects)

Since you have only 2 projects, showcase them as **featured case studies** rather than a grid of thumbnails.

### Approach
1. **Make each case study substantial** (800-1200 words)
2. **Lead with outcomes**, not process
3. **Include diverse visuals**: Homepage, inner pages, mobile views
4. **If possible, get testimonials** from both clients
5. **Future-proof**: Structure allows easy addition of more projects

---

# PART 4 — TECHNICAL EXECUTION PLAN

## Technology Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Framework | SvelteKit 2.x | Modern, fast, excellent DX, SSG support |
| Language | TypeScript | Type safety, better IDE support |
| Styling | Tailwind CSS 3.x | Utility-first, design system friendly |
| Deployment | Vercel or Cloudflare Pages | Free tier, fast global CDN, easy SSL |
| Forms | Formspree or Resend | No backend needed, reliable delivery |
| Analytics | Plausible or Fathom | Privacy-friendly (GDPR compliant) |

## Folder Structure

```
my-website/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   └── Navigation.svelte
│   │   │   ├── ui/
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Section.svelte
│   │   │   │   └── Container.svelte
│   │   │   ├── home/
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── TrustBar.svelte
│   │   │   │   ├── FeaturedWork.svelte
│   │   │   │   ├── ServicesOverview.svelte
│   │   │   │   └── Testimonial.svelte
│   │   │   └── work/
│   │   │       ├── ProjectCard.svelte
│   │   │       └── CaseStudyLayout.svelte
│   │   ├── data/
│   │   │   ├── projects.ts        # Project data
│   │   │   ├── services.ts        # Services content
│   │   │   └── testimonials.ts    # Testimonials
│   │   ├── styles/
│   │   │   └── app.css            # Global styles + Tailwind
│   │   └── utils/
│   │       └── index.ts           # Utility functions
│   ├── routes/
│   │   ├── +layout.svelte         # Root layout
│   │   ├── +page.svelte           # Home
│   │   ├── work/
│   │   │   ├── +page.svelte       # Work listing
│   │   │   └── [slug]/
│   │   │       └── +page.svelte   # Case study
│   │   ├── services/
│   │   │   └── +page.svelte
│   │   ├── about/
│   │   │   └── +page.svelte
│   │   ├── contact/
│   │   │   └── +page.svelte
│   │   └── privacy/
│   │       └── +page.svelte
│   └── app.html
├── static/
│   ├── images/
│   │   ├── projects/             # Case study images
│   │   ├── profile.jpg           # Your photo
│   │   └── og-image.jpg          # Social sharing
│   └── favicon.ico
├── tailwind.config.js
├── svelte.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Component Philosophy

### 1. Atomic Design Approach
- **UI Components** (`/lib/components/ui/`): Reusable primitives (Button, Card, Section)
- **Feature Components** (`/lib/components/home/`, `/work/`): Page-specific compositions
- **Layout Components** (`/lib/components/layout/`): Header, Footer, Navigation

### 2. Props-Based Customization
```svelte
<!-- Button.svelte -->
<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let href: string | undefined = undefined;
</script>
```

### 3. Content in Data Files
Separate content from components for easy editing:
```typescript
// src/lib/data/projects.ts
export const projects = [
  {
    slug: 'project-one',
    title: 'Project Name',
    description: 'One-line description',
    thumbnail: '/images/projects/project-one/thumb.jpg',
    industry: 'E-commerce',
    services: ['Design', 'Development'],
    // ... case study content
  }
];
```

## Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#1A1A1A',
        muted: '#6B7280',
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        'content': '42.5rem', // 680px - optimal reading width
        'container': '75rem', // 1200px
      },
    },
  },
  plugins: [],
};
```

## SvelteKit Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    }),
    prerender: {
      entries: ['*']
    }
  }
};
```

## Performance Considerations

### Image Optimization
1. Use **WebP format** with JPEG fallback
2. Implement **responsive images** with srcset
3. **Lazy load** below-fold images
4. Optimal sizes:
   - Thumbnails: 800x450px (16:9)
   - Case study images: 1600px max width
   - Profile photo: 400x400px

### Loading Performance
1. **Static Site Generation** (SSG) for all pages
2. **Font subsetting**: Only load needed characters
3. **Preload critical resources**: Font, hero image
4. **Target metrics**: LCP < 2.5s, CLS < 0.1, FID < 100ms

### Font Loading Strategy
```html
<!-- In app.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Accessibility Considerations

### WCAG 2.1 AA Compliance
1. **Color contrast**: 4.5:1 minimum for text
2. **Focus states**: Visible focus rings on all interactive elements
3. **Semantic HTML**: Proper heading hierarchy, landmarks
4. **Alt text**: Descriptive alt for all images
5. **Keyboard navigation**: Full site navigable without mouse
6. **Reduced motion**: Respect `prefers-reduced-motion`

### Implementation
```svelte
<!-- Example accessible button -->
<button
  class="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
  aria-label={ariaLabel}
>
  {label}
</button>
```

---

# PART 5 — CONVERSION & TRUST

## Building Trust Without Native Language

### 1. Visual Professionalism
- **High-quality design IS the proof**: Your site demonstrates your capability
- **Pixel-perfect execution**: Any sloppiness undermines credibility
- **Consistent brand**: Same quality across all pages

### 2. Clear, Simple English
- Avoid idioms, slang, colloquialisms
- Short sentences, simple vocabulary
- Use "you/your" frequently (client-focused)
- Avoid jargon unless explaining

### 3. European-Specific Trust Signals
- **GDPR compliance**: Privacy policy, cookie notice
- **Time zone availability**: "Available CET/CEST business hours"
- **Location transparency**: "Based in [City], serving clients across Europe"
- **VAT-ready**: Mention ability to provide VAT invoices if applicable

### 4. Social Proof Hierarchy
Most powerful → least powerful for European B2B:
1. **Case studies with results** (quantified if possible)
2. **Named testimonials with photos**
3. **Client logos** (even 2 is better than none)
4. **Years of experience/number of projects**

## Positioning Strategy: "The Safe Choice"

### How to Position Yourself

**Competent**:
- Clean, functional website (you practice what you preach)
- Case studies showing process and results
- Technical credibility (mention modern stack without jargon)

**Reliable**:
- "24-hour response time" commitment
- "Fixed pricing" transparency
- Testimonials mentioning communication/delivery

**Easy to Work With**:
- Simple contact form (low friction)
- Clear process explanation
- "No jargon" promise
- Friendly but professional tone

### Copy Formulas That Build Trust

**Hero headline formula**:
"I [verb] [what] that [outcome for client's customer]"
→ "I design websites that help your customers trust you"

**Service description formula**:
"[What you get] so you can [outcome]"
→ "A fast, accessible website so you never lose a customer to slow loading"

**CTA formula**:
"[Action] + [low commitment reassurance]"
→ "Send a message—no commitment, just a conversation"

## Conversion Optimization Checklist

### Every Page
- [ ] Clear value proposition above fold
- [ ] Single primary CTA
- [ ] Trust signal present
- [ ] Path to contact visible

### Home Page
- [ ] Headline communicates outcome, not service
- [ ] Work samples visible without scrolling far
- [ ] Testimonial or social proof present
- [ ] Multiple CTAs (without being pushy)

### Contact Page
- [ ] Form is short (4-5 fields max)
- [ ] Response time commitment stated
- [ ] Alternative contact method shown
- [ ] No CAPTCHA (use honeypot instead)

---

# IMPLEMENTATION PHASES

## Phase 1: Project Initialization
**Goal**: Working dev environment with all tooling configured.

- [ ] Initialize SvelteKit project with `sv create` (Svelte 5 + TypeScript)
- [ ] Install and configure Tailwind CSS 3.x
- [ ] Set up ESLint + Prettier with Svelte plugins
- [ ] Configure path aliases (`$lib`, `$components`)
- [ ] Create folder structure as specified
- [ ] Verify dev server runs without errors
- [ ] Set up Git repository with `.gitignore`

**Deliverable**: Empty project that builds and runs.

---

## Phase 2: Design System Foundation
**Goal**: All design tokens and base styles in place.

- [ ] Configure Tailwind theme with custom colors (background, foreground, muted, accent)
- [ ] Set up typography scale in Tailwind config
- [ ] Define spacing system (space-1 through space-8)
- [ ] Add custom max-width utilities (content, container)
- [ ] Create `app.css` with CSS custom properties as fallbacks
- [ ] Import Inter font in `app.html` with proper preconnect
- [ ] Add base styles: reset, smooth scroll, selection colors
- [ ] Create dark mode CSS variables (for future toggle)

**Deliverable**: Design tokens documented and testable on a blank page.

---

## Phase 3: Core UI Components
**Goal**: Reusable primitive components ready for composition.

- [ ] `Button.svelte` — primary, secondary, ghost variants; sm/md/lg sizes; link support
- [ ] `Container.svelte` — max-width wrapper with responsive padding
- [ ] `Section.svelte` — vertical padding + optional background variants
- [ ] `Card.svelte` — bordered container with hover states
- [ ] `Badge.svelte` — small labels for tags/industries
- [ ] `Input.svelte` — form input with label, error state
- [ ] `Textarea.svelte` — multi-line input
- [ ] `Link.svelte` — styled anchor with underline animation

**Deliverable**: Component showcase page (`/dev/components`) showing all variants.

---

## Phase 4: Layout Components
**Goal**: Site-wide layout structure complete.

- [ ] `Header.svelte` — logo, navigation, mobile menu trigger
- [ ] `Navigation.svelte` — desktop nav links + mobile slide-out menu
- [ ] `MobileMenu.svelte` — full-screen overlay navigation
- [ ] `Footer.svelte` — nav links, contact info, social links, copyright
- [ ] `+layout.svelte` — root layout composing Header + Footer
- [ ] Implement sticky header behavior
- [ ] Add skip-to-content link for accessibility
- [ ] Test navigation keyboard accessibility

**Deliverable**: Navigate between placeholder pages with working header/footer.

---

## Phase 5: Home Page
**Goal**: Complete landing page with all 8 sections.

- [ ] `Hero.svelte` — headline, subheadline, dual CTAs
- [ ] `TrustBar.svelte` — client logos (placeholder if needed)
- [ ] `FeaturedWork.svelte` — 2 project cards linking to case studies
- [ ] `ServicesOverview.svelte` — 3 service cards with icons
- [ ] `WhyWorkWithMe.svelte` — 4-point value proposition list
- [ ] `Testimonial.svelte` — quote, name, company, photo (optional)
- [ ] `CTASection.svelte` — final call-to-action block
- [ ] Compose all sections in `/routes/+page.svelte`
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Add scroll-triggered fade-in animations

**Deliverable**: Fully functional home page with placeholder content.

---

## Phase 6: Work / Portfolio Pages
**Goal**: Portfolio listing and case study template.

- [ ] Create `src/lib/data/projects.ts` with project data structure
- [ ] `ProjectCard.svelte` — thumbnail, title, description, industry tag
- [ ] `/routes/work/+page.svelte` — intro text + project grid
- [ ] `CaseStudyLayout.svelte` — reusable case study template
- [ ] `/routes/work/[slug]/+page.svelte` — dynamic case study page
- [ ] `/routes/work/[slug]/+page.ts` — load function to fetch project data
- [ ] Case study sections: Hero, Overview, Challenge, Solution, Gallery, Results, Testimonial
- [ ] `ImageGallery.svelte` — responsive image grid with lightbox (optional)
- [ ] "Next Project" navigation at bottom
- [ ] Add project 1 content (your first real website)
- [ ] Add project 2 content (your second real website)

**Deliverable**: `/work` shows 2 projects; each links to full case study.

---

## Phase 7: Services Page
**Goal**: Clear service offerings with FAQ.

- [ ] `/routes/services/+page.svelte` — page structure
- [ ] `ServiceBlock.svelte` — service title, description, included items
- [ ] Service 1: Website Design & Development (full details)
- [ ] Service 2: Website Redesign
- [ ] Service 3: Ongoing Maintenance (optional offering)
- [ ] `FAQ.svelte` — accordion component for questions
- [ ] Add 4-6 FAQ items with answers
- [ ] CTA section at bottom

**Deliverable**: Services page explains offerings clearly.

---

## Phase 8: About & Contact Pages
**Goal**: Human connection + easy contact.

### About Page
- [ ] `/routes/about/+page.svelte`
- [ ] Professional photo section
- [ ] Bio/story section
- [ ] "How I Work" process steps
- [ ] Personal touch section
- [ ] CTA to contact

### Contact Page
- [ ] `/routes/contact/+page.svelte`
- [ ] `ContactForm.svelte` — name, email, company (optional), message
- [ ] Form validation (client-side)
- [ ] Honeypot field for spam prevention
- [ ] Direct email address display
- [ ] Availability note
- [ ] Time zone information

**Deliverable**: About page tells your story; Contact form submits (to console for now).

---

## Phase 9: Integrations & Legal
**Goal**: Working form, analytics, privacy compliance.

- [ ] Set up Formspree or Resend for form submissions
- [ ] Connect contact form to email service
- [ ] Test form submission end-to-end
- [ ] Add success/error states to form
- [ ] Set up Plausible or Fathom analytics
- [ ] Add analytics script to `app.html`
- [ ] `/routes/privacy/+page.svelte` — privacy policy content
- [ ] Add cookie consent banner (if using cookies)
- [ ] Footer link to privacy policy

**Deliverable**: Form submissions arrive in your inbox; analytics tracking live.

---

## Phase 10: SEO, Performance & Polish
**Goal**: Production-ready site.

### SEO
- [ ] Add `<svelte:head>` to all pages with title, description
- [ ] Create `og-image.jpg` (1200x630px)
- [ ] Add Open Graph meta tags
- [ ] Add Twitter card meta tags
- [ ] Create `sitemap.xml` (static or generated)
- [ ] Add `robots.txt`
- [ ] Add structured data (JSON-LD) for Person/Organization

### Performance
- [ ] Optimize all images (WebP, proper sizing)
- [ ] Implement lazy loading for below-fold images
- [ ] Audit with Lighthouse (target 90+ all categories)
- [ ] Fix any performance issues
- [ ] Test Core Web Vitals (LCP, CLS, FID)

### Polish
- [ ] Review all animations respect `prefers-reduced-motion`
- [ ] Full keyboard navigation test
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] 404 page (`/routes/+error.svelte`)
- [ ] Loading states for any async operations
- [ ] Final copy review and proofreading

**Deliverable**: Site passes all audits and works everywhere.

---

## Phase 11: Deployment & Launch
**Goal**: Live website.

- [ ] Choose deployment platform (Vercel recommended)
- [ ] Configure `adapter-static` or `adapter-vercel`
- [ ] Set up production build (`npm run build`)
- [ ] Deploy to staging URL
- [ ] Full QA on staging
- [ ] Connect custom domain
- [ ] Configure SSL (automatic on Vercel/Cloudflare)
- [ ] Set up redirects if needed
- [ ] Submit to Google Search Console
- [ ] Announce launch

**Deliverable**: Live at your custom domain.

---

## Phase 12 (Post-Launch): Iteration
**Goal**: Continuous improvement based on data.

- [ ] Monitor analytics for 2 weeks
- [ ] Review form conversion rates
- [ ] Gather feedback from first inquiries
- [ ] A/B test hero headline (optional)
- [ ] Add more case studies as you complete projects
- [ ] Collect and add client testimonials
- [ ] Consider blog section for SEO (future)

---

# RESEARCH SOURCES

- [Awwwards Freelance Portfolios](https://www.awwwards.com/awwwards/collections/freelance-portfolio/)
- [Tobias van Schneider - Portfolio Tips](https://vanschneider.com/category/portfolio-tips)
- [Brittany Chiang Portfolio](https://brittanychiang.com)
- [Trust Signals Guide - Webstacks](https://www.webstacks.com/blog/trust-signals)
- [Typography in Design Systems - EightShapes](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)
- [Color Psychology - 99designs](https://99designs.com/blog/creative-inspiration/psychology-color-web-design/)
- [SvelteKit Project Structure](https://kit.svelte.dev/docs/project-structure)
- [B2B Website Design - Blendb2b](https://www.blendb2b.com/blog/best-b2b-website-designs-2025)
- [Hero Copy Guide - ShiftWeb](https://shiftweb.com/how-to-write-a-compelling-website-hero-message/)
