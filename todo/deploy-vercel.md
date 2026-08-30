# Vercel deploy

## "Provisioning integrations failed"

Platform error, not code. Fires before build when a connected integration can't
be provisioned — almost always a broken **Storage/DB integration** (Vercel
Postgres / Neon / Upstash) whose provider account is suspended, over limits,
deleted, or whose OAuth connection expired.

Fix in the dashboard, in order:

1. Project → **Storage** tab → any store with an error → **Disconnect from
   Project** (or Delete).
2. Project → Settings → **Environment Variables** → delete anything the dead
   integration injected: `DATABASE_URL`, `POSTGRES_*`, `KV_*`,
   `BLOB_READ_WRITE_TOKEN`, `EDGE_CONFIG`.
3. Team → **Integrations** tab → remove/reconfigure any integration marked failed.
4. Team → Settings → **Billing** → clear any failed payment.
5. Deployments → **Redeploy** (uncheck "use existing build cache").
6. Still stuck: **Add New → Project → Import** the same repo as a fresh project,
   set only `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_PHONE_SMS`, `ADMIN_KEY`,
   `SITE_URL`, `ANTHROPIC_API_KEY` — no database vars — deploy, then move the
   domain over.

## The app is DB-less

`server/db.ts` no longer builds a Pool or reads `DATABASE_URL` (`db` is always
null). `server/storage.ts` returns stub data for every method, so PC-parts,
quotes, and tickets are non-persistent. The contact form and AI assistant don't
touch a database. A Vercel project with zero storage integrations just works.
To re-enable persistence later, restore a Pool in `server/db.ts` and run
`npm run db:push`.

## Vercel functions

- `api/contact.ts` — contact form → Gmail SMTP (+ Tello SMS).
- `api/assistant.ts` — AI chat, streams from Claude. Needs `ANTHROPIC_API_KEY`.
- The bundled Express server (`dist/index.cjs`) is not the request handler on
  Vercel; static frontend + these functions are.
