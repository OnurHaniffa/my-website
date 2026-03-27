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
