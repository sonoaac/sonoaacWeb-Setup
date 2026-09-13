# Rentals / rent-to-own — retired (2026-09-13)

The `/rentals` rent-to-own TV page was removed at the user's request ("we are
not doing that idea"). **Not deleted** — preserved for later:

- `client/src/pages/Rentals.tsx` → `_ignore/Rentals.tsx`
- `client/src/components/features/ScrollCarousel.tsx` → `_ignore/ScrollCarousel.tsx`
  (the Shop page's photo-tile carousel; retired in the same pass since the Shop
  page's "My Tech" section moved to a plain filter + grid layout instead)

`_ignore/` is gitignored — same pattern used for `MyTech.tsx` / `BuildPC.tsx`.
Files are still on disk, just out of the build and out of git. To bring rentals
back: restore `Rentals.tsx` into `client/src/pages/`, re-add the lazy import +
`<Route path="/rentals" component={Rentals} />` in `App.tsx` (replacing the
redirect), and re-add a "Rent to Own" link in the footer / Shop nav.

Product photos are untouched at `client/public/img/rentals/` — still on disk if
the feature comes back; the redundant repo-root `TV catalogue img/` folder is
still there too.

## What changed to route around it

- `App.tsx`: `/rentals` now redirects to `/shop` (was its own route/page).
- Footer: "Rent to Own" link removed from `footerLinks`.
- Shop page (`Shop.tsx`): the old carousel of 6 photo-tile items (Laptops,
  Gaming, Business, Tablets, Budget, Rent-to-Own TVs) was replaced with a plain
  newspaper-style filter + grid — 5 categories only: **Laptops, TV, Desktops,
  Phones, Tablets**. TV is now just another "Sonoaac recommends and helps set
  up" category like the rest, not a financing pitch. Every card links to
  `/contact`.
- `assistantMemory.ts`: removed the `svc-rentals` FAQ entry entirely and the
  "Rent-to-own TVs" line from `svc-overview`.
- `HelpBot.tsx`: removed the "Rent-to-own TVs" bullet from the chat `GREETING`.
- `shared/assistant-knowledge.ts`: removed the whole "## Rentals" section
  (how rent-to-own works, TV catalogue, delivery steps) and replaced it with a
  short "## Shop" section describing the five browse categories, no financing.
- `shared/assistant-core.ts`: system-prompt scope line and the /rentals-specific
  browse-only rule were reworded to reference `/shop` instead, and explicitly
  state Sonoaac does not offer rent-to-own or financing.

Verified: `npm run check` clean; Shop page renders the filter + grid on both
mobile and desktop with no console errors.
