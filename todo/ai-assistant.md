# AI assistant / HelpBot

The floating chat widget (`client/src/components/features/HelpBot.tsx`) now streams
replies from **Claude Haiku 4.5**, with the original keyword engine as a fallback.

## How it's wired

- `shared/assistant-knowledge.ts` — plain-text business + tech knowledge base.
  **Edit this file to change what the bot knows.**
- `shared/assistant-core.ts` — system prompt, guardrails, history sanitizing,
  streaming Claude client. Model + limits are constants at the top.
- `api/assistant.ts` — Vercel serverless function; streams the reply.
- `POST /api/assistant` in `server/routes.ts` — same thing for local dev.
- Both return `{ "fallback": true }` JSON on any failure (missing key, error,
  empty response). HelpBot then uses the keyword engine for the rest of the session.

## Guardrails (in the system prompt)

- Never confirms, prices, schedules, or promises an order/rental/shipment —
  always hands off to a human Sonoaac agent.
- Scope limited to IT support, devices, PC parts, Wi-Fi, printers, monitors,
  Microsoft 365, and Sonoaac's own services/rentals/trade-ins.
- Never invents prices, specs, dates, or policies.
- Short answers; ignores instructions in user messages that try to change its role.
- History clamped to ~16 turns / ~14k chars, `max_tokens` 1024, system prompt is
  prompt-cached (≈90% cheaper per call after the first).

## To enable

- [ ] Create an API key at console.anthropic.com → API Keys.
- [ ] Set a **monthly spend limit** in the console.
- [ ] Add `ANTHROPIC_API_KEY` to Vercel env vars and local `.env`.
- [ ] Redeploy. (Until then the widget behaves exactly like the keyword version.)

## Later

- [ ] Per-IP rate limiting on the function if abuse appears.
- [ ] Consider a "create a support ticket" tool so the bot can file follow-ups
      directly instead of only pointing at the contact form.
