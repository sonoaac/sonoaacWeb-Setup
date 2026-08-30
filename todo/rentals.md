# Rentals / rent-to-own

`client/src/pages/Rentals.tsx` at `/rentals` (nav: MyTech dropdown + footer).
It's a **browse/shopping page — no cart, no checkout.** Every rental and purchase
is arranged in a chat or call with a human Sonoaac agent.

## Model

- **50% down** (`DOWN_PCT = 0.5`) once approved, then a per-item fixed `monthly`
  payment until the balance clears. `plan(buyPrice, monthly)` computes the term.
- After the final payment the device is owned — no balloon fee, no return.
- Optional protection plan at signup covers mechanical/electrical failure. **TV
  plans exclude screen and accidental damage** (`PROTECTION_NOTE_TV`).
- Delivery included (no shipping fee); we don't install and there's no setup
  charge. Ships 3–5 business days after the agent confirms the order.

## Catalogue

- TV-only right now: `fire-tv-55` ($350 / $175 down + $25/mo × 7) and `fire-tv-50`
  ($300 / $150 down + $25/mo × 6). Generic "4K Fire TV" naming — no Insignia /
  Best Buy branding.
- Gaming PC / laptop / monitor items were removed; re-add to the `RENTALS` array
  when ready. Filter bar auto-hides while there's one category (`SHOW_FILTERS`).
- Images in `client/public/img/rentals/`, served at `/img/rentals/...`. The 50"
  reuses the 55" photos. Missing images fall back to a "Photo coming soon" tile.

## Outstanding

- [ ] Add real photos as more items are listed.
- [ ] Delete the redundant repo-root `TV catalogue img/` folder.
- [ ] Dedicated rental application form + financing backend (CTAs → `/contact`).
- [ ] Re-add non-TV catalogue items when stock/pricing is set.
