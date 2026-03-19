# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **KOL/KOC Booking Agency** workspace containing strategy docs, competitor research, and a production Next.js website for a Vietnamese influencer marketing agency specializing in Home & Living / cleaning products.

## Business Context

- **Model:** Supply-first KOL/KOC booking — build KOC network first, then pitch brands using reach/data as leverage
- **Niche:** Home & Living (dọn nhà, gia dụng, tẩy rửa) — aligns with internal product line (industrial + household cleaning products)
- **Founder:** Minhha (Hà Nội). Team of 3 + factory partner
- **Stage:** Pre-launch / planning — no external clients yet
- **Three-phase roadmap:** Phase 1 KOL/KOC booking → Phase 2 Social Media Management → Phase 3 Full-stack Agency

## Key Strategy Docs

Before making any recommendations, read:
1. `docs/superpowers/specs/2026-03-15-agency-strategy-design.md` — full strategy, growth hacks, revenue model, KPIs
2. `docs/guides/tiktok-handbook-2026.md` — TikTok platform guide (also website content)

Research material (read-only): `comme/`, `dreamagency/`, `sefamedia/`, `haravan/`, `hunteragency/` — scraped competitor sites.

---

## Website (`website/`)

### Stack

- **Next.js 16.2** (App Router, React 19) — **NOT Next.js 14**. Read `website/node_modules/next/dist/docs/` before writing any Next.js-specific code.
- **Tailwind CSS v4** — uses `@theme {}` blocks in `globals.css`, NOT `tailwind.config.ts` (that file was deleted). Custom tokens live exclusively in `website/app/globals.css`.
- **Framer Motion 12** for all scroll reveals, tab animations, count-up, page transitions
- **@studio-freight/lenis** for smooth scroll (wrapped in `SmoothScroll.tsx` client component)
- **GSAP** installed but reserved for bubble diagram (not yet used)
- Vietnamese language only — all copy is in Vietnamese

### Commands (run from `website/`)

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build (must pass before any PR)
npm run lint     # ESLint
```

### Design Tokens

Defined in `website/app/globals.css` `@theme {}` block:

| Token | Value |
|---|---|
| `--color-blue` | `#1B6DEA` |
| `--color-blue-dark` | `#0F4FB8` |
| `--color-blue-deep` | `#0A2240` |
| `--color-blue-light` | `#EEF5FF` |
| `--color-blue-mid` | `#DBEAFE` |
| `--font-sans` | `"Be Vietnam Pro"` |

Because Tailwind v4 auto-generates utilities from `@theme`, use inline `style={}` props when a token isn't resolving as expected (common with dynamic values).

### CSS Keyframes

Defined in `globals.css` — use via `animation:` inline style:
- `orbMove` — floating orb background movement
- `floatUp` — confetti particles rising
- `livePulse` — green pulse on live badge
- `typing` — chat typing dots
- `ticker` — logo marquee (CSS fallback)

### Animation Library (`website/lib/animations.ts`)

Shared Framer Motion variants:
- `fadeUp`, `staggerContainer`, `staggerItem`, `slideInLeft`, `slideInRight`, `scaleIn`
- `viewport` — standard `useInView` config `{ once: true, margin: '-80px' }`

### Content / Data (`website/lib/data.ts`)

Single source of truth for all page content. Exported with TypeScript interfaces:
- `SITE`, `STATS`, `FEATURE_TABS`, `SERVICES`, `STEPS`, `LOGOS`, `TESTIMONIALS`, `BLOG_POSTS`
- `TabMetric` uses `{ value, label }` keys (not `v`/`l`)
- `Step` uses `step` key (not `n`)

### Architecture

`app/page.tsx` composes all section components in order — it is a Server Component with no logic. Each section is an independent Client Component that imports only what it needs from `lib/`.

Component layout:
- `components/layout/` — `Navbar`, `Footer`, `SmoothScroll` (app shell)
- `components/sections/` — one file per page section
- `components/ui/` — reusable primitives: `CountUp`, `FloatingBadge`, `WaveDivider`

### Visual Reference

`agency-homepage-v2.html` — pure HTML/CSS prototype at repo root. Use this as the ground truth for layout, animation behavior, and visual style when building or debugging components.
