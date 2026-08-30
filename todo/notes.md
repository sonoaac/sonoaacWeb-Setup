# Misc notes

- **SendGrid is not used anywhere in code.** `@sendgrid/mail` is a leftover
  dependency in `package.json`; stale mentions remain in `CLAUDE.md` / `AGENTS.md`
  / `.env.example`. Safe to ignore or clean up.
- The public phone number on the site is display text + `tel:` links only. It
  rings only when a visitor manually calls/texts it — it is not wired to any form.
- `.env` is gitignored (has secrets). `.env.example` is the template.
- GitHub push credential on this machine was fixed to the `sonoaac` account
  (was `alfsautosalesmechanic-droid`).
