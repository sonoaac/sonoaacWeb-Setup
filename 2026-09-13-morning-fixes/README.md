# Morning fixes — 2026-09-13

(You said "09/13/2023" — using today's actual date, 2026-09-13, so this folder
stays meaningful later. Say if you meant something else.)

Frontend review of Home, Services, My Tech, Rentals, Trade-In, and Demos —
real scroll-through screenshots + console-error check (zero JS errors found).
Findings ranked by importance, split into what got auto-fixed vs. what's on you.

## Auto-fixed

- [x] **Footer service links were stale.** `client/src/components/layout/Footer.tsx`
      listed pre-reshape names ("IT Support", "Software Fixes", "Business IT")
      pointing at legacy redirect routes. Now matches the current Navbar/Services
      lineup exactly (Remote IT Support, On-Site Services, Computer & Printer
      Setup, Google Workspace Setup, Web Development, Live Demos, My Tech, Trade
      In, Rent to Own). Also repointed "Book Consultation" straight to `/contact`
      instead of through the `/book-consultation` redirect.
- [x] **Home's "Transparent Pricing" section contradicted itself.** Heading said
      "Transparent Pricing / Starting-At Rates" while every card said "By quote"
      — no actual rate shown. Renamed to "How Pricing Works / One Clear Quote, No
      Surprises" and reworded the intro paragraph to match reality.
- [x] **Pricing cards reordered.** Was: giant "By quote" as if it were a number,
      then a "starting at" label, then the service name below it (backwards).
      Now: service name first, then "By quote", then the note — reads correctly
      regardless of whether it's a word or a dollar figure later.
- [x] **"Starting at By quote" grammar** on the Home services grid — dropped the
      "Starting at" prefix, the value now stands alone.
- [x] **"Upfront Pricing — Starting rates shown"** trust bullet (Home, "Why
      Sonoaac") — changed to "No guessing — you get a full quote before any work
      begins," since no rates are shown anymore.

All four files (`Home.tsx`, `Footer.tsx`) type-check and build clean; verified
with fresh screenshots after the edit.

## Left for you

- [ ] **Insignia/Best Buy branding is still visible in the Rentals product
      photos.** `client/public/img/rentals/fire-tv-55-1.png` (reused for the 50"
      listing) is a real photo of the TV with "INSIGNIA | Fire TV" on-screen. All
      the *text* was scrubbed a while back, but the *image* still shows it. Needs
      a replacement photo without that branding, or a re-crop.
- [ ] **Web Development is the only Services-page section with a real number**
      ($500 / 5 pages) while its five sibling sections (Google Setup, Computer &
      Printer Setup, etc.) show no price at all. Your call whether to keep the
      firm $500 or make it "by quote" like the rest.
- [ ] **Category-tile icons on Home** ("Browse by Category") render very small
      and faint — more like tiny gray dots than icons. Worth sizing up or
      dropping.
- [ ] **Black-band hero treatment** (big white serif on black) appears only on
      Trade-In; Home/Services/My Tech all have white-on-white heroes. Confirm
      whether that's meant to make Trade-In feel special, or should extend
      elsewhere for rhythm.
- [ ] **Home is a long single scroll** (~7,100px desktop). Not wrong, but for a
      local service business, a shorter page might get people to the phone
      number / quote faster.
- [ ] **Overall look** (Times New Roman + tracked uppercase labels + green on
      black/white) reads more editorial/law-firm than typical "tech support" —
      distinctive, but confirm that's the intended positioning.

## Screenshots

`screenshots/home-pricing-after.png` and `screenshots/footer-after.png` — the
two fixed sections, post-edit. `screenshots/rentals-insignia-issue.png` — shows
the Insignia branding still visible on the TV photos (the one item left for you).

## Notes

- Playwright got installed locally (`npm install --no-save playwright`, plus its
  Chromium browser under `%LOCALAPPDATA%\ms-playwright`) purely to take these
  screenshots — it's in `node_modules` only, not added to `package.json` or
  committed. Safe to leave for future visual checks or remove.
- The very first screenshot I took showed huge blank gaps between every section
  — looked like a broken-site bug. It wasn't: it's a `whileInView` /
  `IntersectionObserver` (Framer Motion) animation timing artifact specific to
  full-page headless screenshots, not something a real visitor scrolling the
  page would ever see. Confirmed by re-shooting with a proper scroll-through.
