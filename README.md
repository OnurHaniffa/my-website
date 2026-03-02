# onurhaniffa.com — Personal Portfolio & Freelance Website

> **Live:** [onurhaniffa.com](https://onurhaniffa.com)

Personal portfolio and freelance business website featuring custom interactive UI components, a headless CMS, bilingual content, and performance testing.

## Features

- **Custom SVG Gauge:** Interactive speedometer UI with clickable arc segments and curved text
- **10 Showcase Variants:** Different component layouts for presenting portfolio projects
- **Headless CMS:** Directus 11 integration with graceful fallback when CMS is unavailable
- **Internationalization:** Full English/Turkish support with hreflang tags and URL-based locale routing
- **Animations:** Motion One + GSAP with `prefers-reduced-motion` respect
- **Theme System:** OKLCH-based dark/light mode
- **Contact Form:** Rate limiting, honeypot field, XSS sanitization via Resend API
- **Testing:** Playwright performance tests across multiple viewports

## Tech Stack

- **Framework:** SvelteKit 2, Svelte 5 (runes API)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **CMS:** Directus 11 (Docker Compose)
- **Animations:** GSAP, Motion One
- **Testing:** Playwright
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev

# Optional: Start Directus CMS
docker compose up -d
```

## Built By

**Onur Haniffa** — [onurhaniffa.com](https://onurhaniffa.com) · [LinkedIn](https://linkedin.com/in/onurhaniffa) · [GitHub](https://github.com/OnurHaniffa)
