# AI Website Clone Template — Chaves na Mão Clone

A pixel-perfect Next.js clone of [chavesnamao.com.br](https://www.chavesnamao.com.br/), Brazil's leading real estate and vehicle classifieds portal.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Language**: TypeScript
- **Package manager**: npm
- **Font**: Urbanist (Google Fonts)

## Project Structure

```
src/
  app/          # Next.js App Router pages and layouts
    page.tsx    # Homepage — assembles all clone sections
    layout.tsx  # Root layout with Urbanist font + metadata
    globals.css # Design tokens, animations, scrollbar utilities
  components/   # Clone components
    Logo.tsx         # Inline SVG brand logo
    Header.tsx       # Sticky header with nav + mobile drawer
    HeroSection.tsx  # Full-width hero with search form
    PropertySection.tsx  # Property type cards + feature cards + CTAs
    VehicleSection.tsx   # Vehicle categories + popular models
    AppSection.tsx   # App download section with badges + QR code
    AdsSection.tsx   # Red "Anuncie" banner with benefits
    Footer.tsx       # Dark footer with links + social icons
public/images/  # All real site images downloaded locally (47 assets)
clone-data/     # Extracted site data (tokens, content, assets, behaviors)
scripts/        # Recon scripts (recon.py, extract-extra.py)
```

## Design Tokens (from live site)

- **Primary red**: #EB0027
- **Dark text**: #2A2A2F / #323131
- **Secondary text**: #5E5C5D
- **Surface**: #F6F5F5
- **Footer bg**: #191B27
- **Font**: Urbanist, weight 400–900

## Running on Replit

- **Dev server**: `npm run dev` — starts on port 5000, bound to 0.0.0.0
- **Production**: `npm run start` — same port/host config
- The workflow "Start application" runs `npm run dev` automatically

## Clone Process

The clone was built using:
1. Playwright for site extraction (screenshots, design tokens, content, assets)
2. Python scripts in `scripts/` to download all images locally
3. Design subagent for component building
4. All 47 images are stored locally in `public/images/`

## Key Configuration

- `next.config.ts`: `allowedDevOrigins` for Replit preview, `images.unoptimized: true`
- `package.json`: dev/start scripts use `-p 5000 -H 0.0.0.0`
