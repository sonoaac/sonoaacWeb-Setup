# TODO

## Contact form email + SMS delivery (2026-08-28)

Contact number was changed site-wide to **(862) 423-8875** (Tello line, T-Mobile network).
Form submissions are handled by `api/contact.ts` (production / Vercel) and
`server/email.ts` (local Express). Both send via nodemailer -> Gmail SMTP
(`smtp.gmail.com:465`).

### Outstanding steps to make delivery actually work

- [ ] **Set a real `GMAIL_APP_PASSWORD`.** `.env:11` is still the placeholder
      `xxxx xxxx xxxx xxxx`. Without it `createTransporter()` returns `null` and
      nothing sends. Generate at myaccount.google.com -> Security -> App passwords
      (2-Step Verification must be enabled on sonoaac@gmail.com).
- [ ] **Add env vars in Vercel** (Project -> Settings -> Environment Variables),
      not just `.env` (local only): `GMAIL_USER`, `GMAIL_APP_PASSWORD`,
      `ADMIN_PHONE_SMS`. Redeploy after.
- [ ] **Restart local dev server** after `.env` changes (env read once at boot).
- [ ] **Verify the Tello SMS gateway works.** Currently set to
      `8624238875@tmomail.net` (`.env:14`). T-Mobile email-to-SMS is unreliable and
      sometimes filters unknown senders. Send a test submission and confirm the text
      arrives. If it doesn't, fall back to the Gmail inbox as the reliable channel
      or consider a real SMS API (Twilio, etc.).

### Already done

- [x] Replaced phone number in all 6 client files (Navbar, Home, Contact, TradeIn,
      ClientForms, BookConsultation) -> (862) 423-8875 / `tel:+18624238875`.
- [x] Updated `ADMIN_PHONE_SMS` in `.env` to `8624238875@tmomail.net`.
- [x] Commented out `DATABASE_URL` in `.env` so the app runs locally with stub data
      (no local Postgres). Restore it + run `npm run db:push` when a DB is available.

### Assistant / Knowledge Base (2026-08-28)

- Knowledge Base is no longer a page. `/knowledge-base` redirects to `/`, nav links
  removed. `client/src/pages/KnowledgeBase.tsx` is kept (unrouted) — it still
  exports `FAQ_SECTIONS`, which is now the data source for both the Home FAQ and
  the assistant.
- `client/src/lib/assistantMemory.ts` is the assistant's memory + keyword retrieval
  engine. It flattens `FAQ_SECTIONS` into searchable records (+ a few service
  records for pricing / booking / trade-in / etc.) and `retrieve(query)` returns
  the best-matching FAQ answers, supporting multi-part questions.
- HelpBot renders FAQ answers wrapped in `.kb-mono` (same class Home FAQ uses to
  neutralize the light-mode Tailwind colors).
- To edit what the assistant knows: edit the FAQ entries in
  `pages/KnowledgeBase.tsx` (add a `keywords:` string for better matching), or add
  service records in `assistantMemory.ts`.

### Rentals / rent-to-own (2026-08-28)

- New page `client/src/pages/Rentals.tsx` at `/rentals` (nav: MyTech dropdown +
  footer). Catalogue of gaming PCs, gaming laptops, TVs, and monitors, each with
  a detail modal (image gallery, highlights, features, full spec tables).
- Rent-to-own model: **50% down** (`DOWN_PCT = 0.5`), then a per-item fixed
  `monthly` payment until the balance clears; `plan(buyPrice, monthly)` computes
  the term. Every item has `buyPrice` (outright) + `monthly`. After the last
  payment it's owned — no balloon fee.
- Optional protection plan mentioned at signup; TV plans exclude screen and
  accidental damage (`PROTECTION_NOTE_TV`).
- Catalogue is TV-only for now (`fire-tv-55` — $350 outright / $175 down +
  $25/mo × 7). Gaming PC / laptop / monitor items were removed; re-add to the
  `RENTALS` array when ready. Filter bar auto-hides while one category (see
  `SHOW_FILTERS`). No Insignia / Best Buy branding — generic "55" 4K Fire TV".
- **Product images**: `client/public/img/rentals/`, served at `/img/rentals/...`.
  TV has `fire-tv-55-1.png` (product) + `fire-tv-55-2.png` (remote) added.
  Missing images fall back to a "Photo coming soon" tile.
- Redundant now: the repo-root `TV catalogue img/` folder (originals were copied
  into `client/public/img/rentals/`) — safe to delete.
- "Apply to Rent" buttons point to `/contact` — no dedicated rental application
  form / financing backend yet.
- Assistant knows about it via the `svc-rentals` record in `assistantMemory.ts`.

### Notes

- SendGrid is NOT used anywhere in code. `@sendgrid/mail` is a leftover dependency
  in `package.json` and stale mentions remain in `CLAUDE.md` / `AGENTS.md` /
  `.env.example`. Safe to ignore or clean up later.
- The public phone number on the site is display text + `tel:` links only. It rings
  only when a visitor manually calls/texts it; it is not wired to the form.
