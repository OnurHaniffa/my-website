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
