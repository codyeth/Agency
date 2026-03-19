# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **KOL/KOC Booking Agency** strategy, operations, and website workspace. The repo contains planning documents, specs, competitor research, and website source files for a Vietnamese influencer marketing agency specializing in Home & Living / cleaning products.

## Business Context

- **Model:** Supply-first KOL/KOC booking — build KOC network first, then pitch brands using reach/data as leverage
- **Niche:** Home & Living (dọn nhà, gia dụng, tẩy rửa) — aligns with internal product line (industrial + household cleaning products)
- **Founder:** Minhha (Hà Nội). Team of 3 + factory partner
- **Stage:** Pre-launch / planning — no external clients yet
- **Three-phase roadmap:** Phase 1 KOL/KOC booking → Phase 2 Social Media Management → Phase 3 Full-stack Agency

## Repository Structure

- `docs/superpowers/specs/` — Master strategy design doc (`2026-03-15-agency-strategy-design.md`) — source of truth for business model, growth hacks, KPIs, ops playbook
- `docs/guides/` — Knowledge content for website/SEO (`tiktok-handbook-2026.md`)
- `agency-homepage-v2.html` — Working HTML prototype of the agency homepage (Pure HTML/CSS/JS, reference for website design style and animations)
- `comme/`, `dreamagency/`, `sefamedia/`, `haravan/`, `hunteragency/` — Scraped competitor website content (read-only research material)
- `listagency.md` — List of competitor URLs researched
- `zafago.md`, `comme.md` — Additional competitor notes
- `.superpowers/brainstorm/` — Visual brainstorming artifacts (do not edit)

## Website Build

The agency website is being built as a **Next.js + Tailwind CSS + Framer Motion** project deployable to Vercel. Key decisions:
- Vietnamese language only
- Style reference: `agency-homepage-v2.html` (blue-dominant, SaaS-style, Be Vietnam Pro font)
- Blog/content hub for SEO — daily content to drive organic traffic
- Blog CMS: Sanity (free tier) so non-technical team can publish without touching code
- No domain purchased yet — will preview on `.vercel.app` subdomain first

## Key Strategy Docs to Read First

Before making any recommendations, read:
1. `docs/superpowers/specs/2026-03-15-agency-strategy-design.md` — full strategy, growth hacks, revenue model, KPIs
2. `docs/guides/tiktok-handbook-2026.md` — TikTok platform guide (also website content)
