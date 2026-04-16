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
    comprar/page.tsx # /comprar real estate listing clone
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
    admin/AdminDashboard.tsx # Frontend-only navigable admin panel for /admin
  config/admin/ # Country, locale and UI dictionary configuration for admin mockup
  mocks/        # Local mock data for admin modules
  services/     # Mock service layer prepared for future backend integration
  utils/        # Admin formatting helpers
  types/        # Shared admin TypeScript interfaces
public/images/  # Real site images downloaded locally, including homepage and /comprar assets
clone-data/     # Extracted site data (tokens, content, assets, behaviors); clone-data/comprar stores the /imoveis/brasil/ extraction
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

- **Runtime**: Node.js 24 via the Replit module configuration
- **Dev server**: `npm run dev` — starts on port 5000, bound to 0.0.0.0
- **Production**: `npm run start` — same port/host config
- The workflow "Start application" runs `npm run dev` automatically

## Clone Process

The clone was built using:
1. Playwright for site extraction (screenshots, design tokens, content, assets)
2. Python scripts in `scripts/` to download all images locally
3. Design subagent for component building
4. Homepage and /comprar listing images are stored locally in `public/images/`

## Key Configuration

- `next.config.ts`: allows Replit preview development origins including `*.replit.dev`, `*.worf.replit.dev`, `*.spock.replit.dev`, and the current `REPLIT_DEV_DOMAIN`; `images.unoptimized: true`
- `package.json`: dev/start scripts use `-p 5000 -H 0.0.0.0`
- `.replit`: uses Node.js 24, workflow `Start application` runs `npm run dev` and waits for port 5000

## Property Detail Modal

- Next.js intercepting routes (`@modal/(.)imovel/[slug]/[id]`) open property as a right-side drawer at 1100px max-width while keeping `/comprar` dimmed behind.
- Direct URL access (`/imovel/[slug]/[id]`) renders a full-page layout.
- Modal tab nav: **Anúncio · N Fotos · Mapa · Street View · Nas proximidades** (all tabs functional with conditional rendering)
  - **Anúncio**: split gallery + two-column content (description, specs, contact, financing, amenities, bus stops)
  - **N Fotos**: masonry 2–3-column gallery of all property photos (N is dynamic count)
  - **Mapa**: full-height Leaflet + OpenStreetMap map centered on property coordinates, with home pin
  - **Street View**: Google Maps Street View embedded via iframe (no API key required)
  - **Nas proximidades**: Leaflet map with 8 category filter pills (Parques, Transporte, Mercados, Alimentação, Farmácias, Academias, Escolas, Hospitais) + category markers
- Split gallery: large main photo + 2 side thumbnails
- Contact panel: Mensagem/Agendar tabs, form fields, phone reveal, WhatsApp, Anunciante Diamante card
- Dynamic breadcrumbs/title from property data; description expandable
- Leaflet components lazy-loaded (SSR-safe) using `lazy` + `Suspense`; container double-init protection via `_leaflet_id` cleanup

## Mobile Filter Drawer

- `MobileFilterDrawer.tsx`: full-height left-side drawer opened by "Filtros" button (visible below `xl`)
- Same filter sections as the desktop sidebar: type tabs, location, price, rooms, baths, parking, area, amenities
- Sticky footer with "Limpar tudo" + "Aplicar filtros" buttons
- `ComprarClient.tsx`: client component that owns drawer open/close state and renders the button + drawer

## Admin Mockup

- `/admin` renders a frontend-only, navigable administrative panel for a real estate portal.
- Includes dashboard, properties, property editor, property types, filters/taxonomies, currencies, CMS, leads, CRM, reports, ERP, users/permissions, general settings, and country/locale settings.
- Admin visual direction is intentionally pure minimalism: light sidebar, neutral stone palette, subtle borders, no futuristic effects, no color-heavy gradients, and restrained typography across all admin pages.
- Data is local and mock-only via `src/mocks/adminData.ts` and `src/services/mockAdminService.ts`; there is no real backend, database, upload, authentication, API, or external integration.
- Country selector supports Brazil, Portugal, and United States with visible changes to locale, currency, labels, postal-code terminology, phone mask examples, tax terms, and conditional fields such as FGTS/permuta.
- Role selector visually simulates Super Admin, Admin, Editor de Conteúdo, Corretor / Operador Comercial, and Financeiro permissions by hiding/locking modules in the UI.
- The global footer is hidden on `/admin` through `FooterVisibility` so the admin shell can occupy the full viewport.

## Migration Status

- Dependencies have been installed for Node and Python helper scripts.
- The Replit workflow launches successfully and serves the app on port 5000.
- Browser verification shows the homepage rendering in the Replit preview.
- `/comprar` uses a centered, detached sticky filter card with internal hover-only scrolling.
- Homepage focuses on real estate only; vehicle sections and the app promo section with vehicle copy were removed, and real estate discovery links point to `/comprar`.
