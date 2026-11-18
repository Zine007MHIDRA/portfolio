# Zine El Abidine MHIDRA / Developer Portfolio

Dark editorial developer portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Lenis**, and **GSAP ScrollTrigger**. Syncs live public repository metadata from GitHub (`@Zine007MHIDRA`) via Incremental Static Regeneration (1-hour cache) with a verified static fallback snapshot.

## Features

- **Automatic GitHub Sync (ISR)**: Fetches profile counts, stars, languages, and live deployment links from the GitHub REST API on the server (`revalidate = 3600`), avoiding client-side rate limits.
- **Easy Local Customization**: Edit `src/data/portfolio-config.ts` to change featured project order, custom summaries, bio, email, or social links without editing UI components.
- **Drop-In Hero Video Support**: Ships with a dark brutalist architectural hero image (`public/media/hero-poster.jpg`). Drop any looping video at `public/media/hero.mp4` and the hero upgrades automatically to HTML5 `<video>` with off-screen auto-pause.
- **Kinetic Typography & Motion Controls**: Desktop Lenis smooth scroll + alternating GSAP `ScrollTrigger` horizontal project headlines, paired with an accessible pause/resume toggle and full `prefers-reduced-motion` support.
- **Accessible & Responsive**: WCAG AA verified contrast palette, 44px minimum touch targets, keyboard focus indicators, skip-to-content link, and 3-state responsive reflow.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional Environment Variables

Copy `.env.example` to `.env.local`:

- `GITHUB_TOKEN`: Optional read-only GitHub token to raise the API rate limit to 5,000 req/hr.
- `NEXT_PUBLIC_SITE_URL`: Canonical production URL for OpenGraph metadata once deployed.

## Deploy on Vercel

Import `Zine007MHIDRA/portfolio` in Vercel and deploy with the default Next.js preset. No additional configuration is required.
