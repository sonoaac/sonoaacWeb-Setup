# TODO

Working notes for the Sonoaac site. One file per area — see the list at the bottom.

## Open action items

### Blocking / important
- [ ] **Fix the Vercel deploy.** "Provisioning integrations failed" — a connected
      Storage/DB integration is broken. Vercel → project → Storage tab → disconnect
      it; Settings → Environment Variables → delete any `DATABASE_URL` / `POSTGRES_*`;
      redeploy. The app is now fully DB-less so a clean project just works.
      Details: [deploy-vercel.md](deploy-vercel.md).
- [ ] **Set a real `GMAIL_APP_PASSWORD`** and add `GMAIL_USER` / `GMAIL_APP_PASSWORD`
      / `ADMIN_PHONE_SMS` to Vercel env vars. Without the password the contact form
      sends nothing. Details: [contact-email-sms.md](contact-email-sms.md).
- [ ] **Enable the AI assistant:** create `ANTHROPIC_API_KEY` at
      console.anthropic.com (set a monthly spend limit), add it to Vercel + local
      `.env`, redeploy. Until then the widget runs the keyword fallback.
      Details: [ai-assistant.md](ai-assistant.md).

### Nice to have
- [ ] Verify the Tello email-to-SMS gateway actually delivers (`8624238875@tmomail.net`).
- [ ] Add real product photos to `client/public/img/rentals/` as more items are listed.
- [ ] Delete the redundant repo-root `TV catalogue img/` folder (contents already
      copied into `client/public/img/rentals/`).
- [ ] Rental application form + financing backend (CTAs currently go to `/contact`).
- [ ] Per-IP rate limiting on `POST /api/assistant` if abuse shows up.
- [ ] Clean up the unused `@sendgrid/mail` dependency and stale SendGrid mentions.

## Areas

| File | What it covers |
|---|---|
| [deploy-vercel.md](deploy-vercel.md) | Vercel deploy, the "provisioning integrations failed" fix, DB-less setup |
| [contact-email-sms.md](contact-email-sms.md) | Contact form → Gmail SMTP + Tello SMS |
| [ai-assistant.md](ai-assistant.md) | Claude-powered HelpBot (Haiku 4.5) + keyword fallback |
| [rentals.md](rentals.md) | `/rentals` rent-to-own page, catalogue data, images |
| [knowledge-base.md](knowledge-base.md) | Knowledge Base removal, FAQ data source |
| [notes.md](notes.md) | Misc facts worth remembering |
