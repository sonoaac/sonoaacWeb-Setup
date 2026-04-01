# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Express + Vite HMR on port 5000)
npm run build     # Production build → dist/public/ (frontend) + dist/index.cjs (server)
npm run start     # Run production server
npm run check     # TypeScript type checking (no separate lint script)
npm run db:push   # Push Drizzle schema to PostgreSQL
```

No test framework is configured — `npm run check` is the closest equivalent.

## Architecture

This is a monorepo with a React SPA frontend, Express backend, and shared types — all in TypeScript. The site is for **Sonoaac** (SNC), an IT services company offering consultations, remote/on-site support, device setup, and custom PC builds.

```
client/src/    → React frontend (Vite entry: client/index.html)
server/        → Express backend (entry: server/index.ts)
shared/        → Types, Zod schemas, and typed API route definitions
script/        → Build orchestration (script/build.ts)
```

**Path aliases:** `@/` → `client/src/`, `@shared/` → `shared/`

### Frontend

- **Router:** Wouter — all routes defined in `client/src/App.tsx`
- **Server state:** React Query with `queryClient.ts`; all fetches use `apiRequest()` from `client/src/lib/queryClient.ts`
- **Forms:** React Hook Form + Zod (schemas from `shared/schema.ts`)
- **UI:** Shadcn/ui (Radix UI + Tailwind CSS) in `client/src/components/ui/`
- **Animations:** Framer Motion for standard animations, GSAP for advanced effects
- **Theme:** `ThemeContext` in `client/src/context/ThemeContext.tsx` — **locked to light mode only**. The context exists but actively removes any stored theme preference and the `data-theme` attribute. There is no dark/light toggle.

### Design System

The app uses a **terminal/monospace aesthetic**: `Times New Roman` body font, green (`hsl(142, 69%, 58%)`) as the primary/accent color, and a white-on-black base layer. The `App.tsx` root div uses `bg-black text-green-200`, but `index.css` permanently overrides these for light mode — `bg-black → #fff`, `text-green-200 → #14532d`, etc. **Write component styles in dark-terminal Tailwind terms** (e.g., `bg-black`, `text-green-300`) and rely on the CSS overrides in `index.css` to invert them to the B&W light theme. Dark mode is not active.

Base font size is `clamp(17px, 1.1vw + 14px, 20px)` on `<html>`, so all Tailwind `rem`-based sizes scale responsively.

**App shell layout** (`App.tsx`): sticky `Header` (2-tier navbar, see below), a `h-10 md:h-[88px]` spacer div to offset the fixed header height, then a 3-column flex row on `xl` screens — `DesktopSidebar` | `main` (Router) | `DesktopRightPanel` — then `Footer`. `HelpBot` and `Toaster` are rendered globally.

**Navbar structure** (`Header` / `Navbar`): Two-tier layout:
- **Tier 1** (utility bar, ~40px): logo, contact info, primary CTA button
- **Tier 2** (main nav, ~48px): navigation links with dropdown menus for Services and MyTech (dropdowns include service names and starting prices)

**Key layout components** (`client/src/components/layout/`):
- `StickyNav` — used on the Home page; renders a tab bar that sticks to the top on scroll, with an animated slider underline. Wraps page sections as children using `et-slide` / `et-hero-tabs` CSS classes defined inline.
- `ScrollWindow` — drives the sticky horizontal-scroll card sections on the Home page (each card has title, description, image, and a CTA link).
- `DesktopSidebar` / `DesktopRightPanel` — flanking panels in the `xl` 3-column layout.
- `ScrollProgress` — thin progress bar at top of viewport.
- `CTASection` — reusable call-to-action banner used across pages.
- `SectionScroll` — scroll-snap section wrapper used within pages for full-height slide transitions.
- `ErrorBoundary` — wraps routes to catch and display render errors gracefully.

**Feature components** (`client/src/components/features/`):
- `HelpBot` — global chat/help widget.
- `QuoteBooklet` — multi-step quote flow used on service pages.
- `TechMatcher` — multi-step device recommendation quiz modal; collects device type, use cases, budget, and portability preference, then returns a matched recommendation.
- `MonitorIntro` — monitor/display visual component used on the Knowledge Base page.

**Pages** (all lazy-loaded via `React.lazy`):

| Route | Page |
|---|---|
| `/` | `Home` |
| `/services` | `Services` |
| `/my-tech` | `MyTech` |
| `/my-tech/build-pc` | `BuildPC` |
| `/contact` | `Contact` |
| `/knowledge-base` | `KnowledgeBase` |
| `/service-agreement` | `ServiceAgreement` |
| `/trade-in` | `TradeIn` |

Legacy routes (`/it-support`, `/on-site-services`, `/device-setup`, `/software-fixes`, `/business-it`, `/book-consultation`, `/buy-ready-computer`, `/build-pc`) all redirect to consolidated pages via `<RedirectTo>` in `App.tsx`. Several legacy page files (`ITSupport.tsx`, `OnSiteServices.tsx`, etc.) still exist in `client/src/pages/` but are no longer imported.

### Backend

- Express with JSON body parsing + request logging middleware
- `server/routes.ts` registers all API routes and seeds PC parts data on startup if the table is empty
- `server/storage.ts` — `DatabaseStorage` class implementing `IStorage`; all methods check `if (!db)` and return stub data when no DB is connected (graceful degradation)
- `server/vite.ts` injects Vite as middleware in dev; `server/static.ts` serves `dist/public/` in production
- Runs on `PORT` env var, defaulting to 5000

**API route definitions** are type-safe objects in `shared/routes.ts` — each entry has `method`, `path`, `input` (Zod schema), and `responses`. Routes are imported as `api` in both `server/routes.ts` and client hooks.

**API endpoints:**
- `GET /api/pc-parts` — fetch PC components
- `POST /api/quotes` — create a quote
- `POST /api/contact` — submit contact form

### Database

- **ORM:** Drizzle ORM — schema in `shared/schema.ts`, config in `drizzle.config.ts`
- **DB:** PostgreSQL via `DATABASE_URL` env var
- Tables: `pc_parts`, `quotes`, `contact_submissions`
- `pc_parts.price` is stored as whole dollar integers

### Deployment

- **Target:** Vercel (`vercel.json` present)
- Build output: `dist/public/` (static frontend) + `dist/index.cjs` (server function)
- SPA routing handled via Vercel rewrites — all unmatched paths return `index.html`

### Environment Variables

Copy `.env.example` to `.env`:
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — for express-session
- Optional: `STRIPE_SECRET_KEY`, `SENDGRID_API_KEY`, `OPENAI_API_KEY`
- Feature flags: `ENABLE_QUOTES`, `ENABLE_PC_BUILDER`, `ENABLE_SERVICES`
