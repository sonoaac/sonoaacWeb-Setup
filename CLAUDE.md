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

This is a monorepo with a React SPA frontend, Express backend, and shared types — all in TypeScript.

```
client/src/    → React frontend (Vite entry: client/index.html)
server/        → Express backend (entry: server/index.ts)
shared/        → Types/schemas shared between client and server
script/        → Build orchestration (script/build.ts)
```

**Path aliases:** `@/` → `client/src/`, `@shared/` → `shared/`

### Frontend

- **Router:** Wouter (lightweight, replaces React Router) — routes defined in `client/src/App.tsx`
- **Server state:** React Query (`@tanstack/react-query`) with `queryClient.ts` as the central API client; uses `apiRequest()` for all fetches
- **Forms:** React Hook Form + Zod validation (schemas from `shared/schema.ts`)
- **UI:** Shadcn/ui components (Radix UI primitives + Tailwind CSS) in `client/src/components/ui/`
- **Animations:** Framer Motion for standard animations, GSAP for advanced scroll/timeline effects
- **Layout components:** `client/src/components/layout/` — Header, Footer, StickyNav, ScrollWindow, ErrorBoundary, CTASection

The `ScrollWindow` component drives the sticky horizontal-scroll sections on the Home page.

### Backend

- Express with JSON body parsing + request logging middleware
- `server/routes.ts` registers all API routes on the Express app
- `server/storage.ts` abstracts DB access (check for DB availability before ops)
- `server/vite.ts` injects Vite as middleware in dev mode; `server/static.ts` serves `dist/public/` in production
- Runs on `PORT` env var, defaulting to 5000

**API endpoints:**
- `GET /api/pc-parts` — fetch PC components
- `POST /api/quotes` — create a quote
- `POST /api/contact` — submit contact form

### Database

- **ORM:** Drizzle ORM — schema defined in `shared/schema.ts`, config in `drizzle.config.ts`
- **DB:** PostgreSQL (connection string from `DATABASE_URL` env var)
- Tables: `pc_parts`, `quotes`, `contact_submissions`
- The app degrades gracefully when no DB is connected (storage layer checks before querying)

### Deployment

- **Target:** Vercel (`vercel.json` present)
- Build output: `dist/public/` (static frontend) + `dist/index.cjs` (server function)
- SPA routing handled via Vercel rewrites — all unmatched paths return `index.html`

### Environment Variables

Copy `.env.example` to `.env`. Required for full functionality:
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — for express-session
- Optional: `STRIPE_SECRET_KEY`, `SENDGRID_API_KEY`, `OPENAI_API_KEY`
- Feature flags: `ENABLE_QUOTES`, `ENABLE_PC_BUILDER`, `ENABLE_SERVICES`
