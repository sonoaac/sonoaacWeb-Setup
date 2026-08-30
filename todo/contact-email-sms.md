# Contact form — email + SMS delivery

Site contact number is **(862) 423-8875** (Tello line, on the T-Mobile network).

Form submissions are handled by `api/contact.ts` (production / Vercel) and
`server/email.ts` (local Express). Both send via nodemailer → Gmail SMTP
(`smtp.gmail.com:465`). The HelpBot escalation form posts to the same endpoint.

## Outstanding

- [ ] **Set a real `GMAIL_APP_PASSWORD`.** `.env` still has the placeholder
      `xxxx xxxx xxxx xxxx`. Without it `createTransporter()` returns `null` and
      nothing sends. Generate at myaccount.google.com → Security → App passwords
      (2-Step Verification must be on for sonoaac@gmail.com).
- [ ] **Add env vars in Vercel** (Project → Settings → Environment Variables) —
      `.env` is local only: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_PHONE_SMS`.
      Redeploy after.
- [ ] **Restart the local dev server** after any `.env` change (env read once at boot).
- [ ] **Verify the Tello SMS gateway** — currently `8624238875@tmomail.net`.
      T-Mobile email-to-SMS is unreliable and sometimes filters unknown senders.
      Send a test submission; if the text never arrives, treat the Gmail inbox as
      the reliable channel or move to a real SMS API (Twilio, etc.).

## Done

- [x] Phone number replaced in all client files → (862) 423-8875 / `tel:+18624238875`.
- [x] `ADMIN_PHONE_SMS` in `.env` set to `8624238875@tmomail.net`.
