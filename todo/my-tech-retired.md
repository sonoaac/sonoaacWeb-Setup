# My Tech — retired (2026-09-13)

The `/my-tech` page (device matching filter + TechMatcher quiz + recommendation
form) was removed from the live site at the user's request. **Not deleted** —
preserved for later:

- `client/src/pages/MyTech.tsx` → `_ignore/MyTech.tsx`
- `client/src/components/features/TechMatcher.tsx` → `_ignore/TechMatcher.tsx`
- `client/src/pages/BuyReadyComputer.tsx` → `_ignore/BuyReadyComputer.tsx`
  (already dead/unrouted before this — it only existed to import TechMatcher,
  so it moved with it rather than leaving a broken import behind)

`_ignore/` is gitignored (see `.gitignore` — same pattern used for `BuildPC.tsx`
earlier). Files are still on disk, just out of the build and out of git. To
bring the feature back: restore the three files into `client/src/...`, re-add
the `MyTech` lazy import + `<Route path="/my-tech" component={MyTech} />` in
`App.tsx`, and re-add a "Device Matching" entry pointing at `/my-tech`.

## What changed to route around it

- `App.tsx`: `/my-tech`, `/my-tech/build-pc`, `/buy-ready-computer`, and
  `/build-pc` all redirect to `/services` now (was `/my-tech`).
- Navbar: the "My Tech" dropdown (Device Matching, Rent to Own, Trade In) is
  now **"Devices"** (Rent to Own, Trade In only) — `myTechMenu` in
  `Navbar.tsx`, kept the name for now since it still drives that dropdown.
- Home: the "Device Matching" category tile became a **Trade In** tile
  (`categoryTiles` in `Home.tsx`).
- Footer: "My Tech" link removed from `serviceLinks`.
- Services page: "Need a device recommendation? → My Tech" now says
  "→ Contact Us" (`/contact`); the bottom "Device Matching" CTA button is now
  "Trade In Your Device" (`/trade-in`).
- HelpBot + assistant memory: every "Explore Devices → /my-tech" CTA (buying
  advice answers, FAQ section CTAs for hardware/buying/cpu-gpu topics) now
  says "Get Advice → /contact" instead.
- `shared/assistant-knowledge.ts` had no My Tech references to begin with —
  nothing to change there.

Left untouched (already dead/unwired before this, out of scope): `/my-tech`
string references inside `DesktopSidebar.tsx`, `StickyNav.tsx`, and
`SectionScroll.tsx` — none of those three components are imported by `App.tsx`
or any live page.

Verified: `npm run check` and `npm run build` both clean; browser check confirms
`/my-tech` redirects to `/services` with zero console errors, and the new
"Devices" nav dropdown renders correctly.
