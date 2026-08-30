/**
 * Plain-text knowledge base for the Sonoaac AI assistant.
 * This is the single source of truth injected into the system prompt.
 * Keep it factual and current — the model is told never to invent anything
 * that isn't here.
 */
export const ASSISTANT_KNOWLEDGE = `
## Company

Sonoaac (SNC) is an NJ-based IT services company for homes, freelancers, and small
businesses. Services: remote support, on-site home/office visits, new device setup,
software troubleshooting, custom PC builds, business IT and Microsoft 365, web
development, device trade-ins, and rent-to-own electronics.

## Contact

- Call or text: (862) 423-8875
- Or use the contact page — a Sonoaac tech replies by email, usually the same day.
- NJ based; on-site covers NJ and the surrounding tri-state area. Remote support
  works anywhere.
- Everything is by appointment. Walk-ins are accepted for an extra fee. Same-day is
  often available.

## Services and starting prices

- Remote virus / malware removal — from $49 per session
- Full PC reset & reinstall (Windows or Mac) — from $79
- On-site setup visit — from $99 (first hour), NJ area
- Custom PC build consult — from $59 (parts list and build plan included)
- Business email / Microsoft 365 setup — from $129
- Custom website — from $499 (mobile responsive, built from scratch)
- Every job gets a clear quote before any work starts. No surprise charges.

## Remote support

We connect securely over the internet with screen-sharing (Zoom, AnyDesk, or
TeamViewer). The customer watches in real time and can end the session anytime.
Good for Microsoft 365 and email, app crashes and errors, slow performance, driver
and update problems, software installs and activations, virus scans, and printer
setup. No location limit.

## Trade-in (sell a device for cash)

Bring in an unlocked iPhone, Samsung Galaxy, or iPad and walk out with cash — not
store credit, no mail-in wait. Get an instant estimate by picking the device and
condition, we verify it in person, then pay on the spot. Be honest about condition;
misrepresented devices get the quote rejected.

## Rentals (rent-to-own electronics) — the /rentals page

The /rentals page is a browse / shopping page ONLY. There is NO cart, NO checkout,
and NO online payment. Nothing ships or sells automatically. Every rental AND every
outright purchase is arranged in a quick chat or call with a human Sonoaac agent
first — the agent confirms availability, the plan, and approval (usually the same
day), and nothing moves until the customer has spoken with us. When someone wants
to rent or buy, point them to the contact page and (862) 423-8875 and offer to
pass along their name, email, and phone.

Tagline on the page: "In-house financing · quick approval · no balloon payment."

### How rent-to-own works (3 steps)
1. 50% down — half the outright price up front, once approved. That covers the
   deposit and gets the order moving.
2. Fixed monthly — a set amount each month toward the remaining balance. The
   number of months depends on the price.
3. It's yours — after the final payment the device is owned outright. No balloon
   fee, no return.

Worked example — 55" 4K Fire TV: buy outright $350, or rent-to-own $175 down (50%)
then $25/mo x 7 months = $350 total (rent-to-own costs the same as buying, just
spread out).

Optional protection plan (added at signup) covers mechanical and electrical
failure. TV protection plans do NOT cover screen damage or accidental damage.
Approval required. Longer terms may be available on higher-value systems — ask.

### TVs available now
- 55" LED 4K UHD Smart Fire TV — $350 outright, or $175 down + $25/mo for 7 months.
- 50" LED 4K UHD Smart Fire TV — $300 outright, or $150 down + $25/mo for 6 months.
Both: 4K UHD, HDR10, 60Hz, Fire TV built in with an Alexa voice remote, 3x HDMI
(eARC on HDMI 1), Wi-Fi 5, Bluetooth 5.0, DTS Virtual:X sound. Box includes the
stand, remote, batteries, power cord, screws, and a quick setup guide.
Gaming PCs, gaming laptops, and monitors are "coming soon" — not orderable yet.

### Delivery (3 steps)
1. Chat or call — start a chat or call/text (862) 423-8875. A Sonoaac agent
   confirms availability, the plan, and approval, usually the same day. Nothing
   moves until the customer has spoken with us.
2. We ship it — once confirmed with the agent, the order ships. Allow 3-5 business
   days to arrive.
3. Set it up — it arrives ready to go; TVs include the stand, remote, and quick
   setup guide. Plug in and go.

Delivery is included with every rental — no separate shipping fee. We do NOT
install rentals and there is no setup charge; the customer sets it up. If they get
stuck, Sonoaac remote support can walk them through it as a normal support session.

## Tech FAQ (use these facts; keep answers short)

Slow computer — usual causes: too many startup programs, low RAM, an old spinning
hard drive instead of an SSD, malware, pending updates, a nearly-full drive
(Windows slows badly below ~10% free), too many browser tabs/extensions,
overheating from dust. Biggest fixes: swap the hard drive for an SSD, add RAM,
trim startup programs, run a malware scan, free up disk space, clean dust. A RAM or
SSD upgrade usually beats replacing the machine.

RAM in 2025: 8GB is tight (fine for light use, struggles with Teams + many tabs).
16GB is the recommended standard for everyday work. 32GB for video/photo editing,
VMs, or heavy multitasking. 64GB+ is workstation territory.

SSD vs HDD: an SSD boots in 5-15 seconds vs 30-60 for an HDD, is silent, has no
moving parts, and lasts longer. Swapping an HDD for a ~500GB SSD costs roughly
$50-100 and is the single biggest speed upgrade for an older laptop.

CPU cores: 2 cores = basic tasks, 4 = comfortable everyday multitasking, 8 =
gaming and heavy workloads, 12-16 = video editing and 3D. Clock speed (GHz)
matters too. For most home/office use, 4-8 cores is plenty. Brands: Intel Core
i3/i5/i7/i9, AMD Ryzen 3/5/7/9, Apple M-series.

GPU: integrated graphics (built into the CPU, shares RAM) is fine for browsing,
streaming, Office, and light photo work. A dedicated GPU (its own VRAM) is needed
for modern gaming, video editing/export, 3D, and local AI. NVIDIA and AMD are the
two dedicated brands; Apple M-series integrated GPUs are unusually strong.

Windows vs macOS vs ChromeOS: Windows is the most compatible — best for gaming,
business software, widest price range. macOS is very stable and optimized, great
for creative work, best battery life, long update support, integrates with iPhone
and iPad. ChromeOS is lightweight, cheap, nearly virus-free, best for students and
web-only use. Need full Office, Photoshop, or QuickBooks: choose Windows or macOS.

Buying a laptop — what matters, in order: CPU (Intel Core i5/i7 12th gen+ or AMD
Ryzen 5/7 7000+; avoid Celeron/Pentium/Atom), 16GB RAM (8GB is workable, 32GB for
editors), 512GB SSD (NVMe if possible, never an HDD), a 1080p+ IPS or OLED screen,
and 10+ hours real battery. A $600 laptop with 16GB + SSD beats a $900 one with
8GB + HDD.

Wi-Fi slow: test speed on Wi-Fi, then plug into the router with Ethernet and test
again. If Ethernet is fast but Wi-Fi isn't, it's signal/router placement/the
device's Wi-Fi card. If both are slow, it's the internet service or the modem.
Common fixes: reboot the router, move it central, upgrade to Wi-Fi 6 if 5+ years
old, use a mesh system for large homes, change the Wi-Fi channel.

Wi-Fi 5 vs 6 vs 6E: Wi-Fi 5 is fine for most homes. Wi-Fi 6 mainly helps homes
with 10+ connected devices. 6E adds a clean 6 GHz band for fast devices close to
the router. Extender vs mesh: skip cheap extenders (they halve speed and make a
second network name); a 2-node mesh system roams seamlessly with no speed penalty
and is worth the extra $50-80.

Monitors / multi-monitor: most laptops drive 1-2 external displays natively, 2-4
with a USB-C dock, desktops 3-6 depending on the GPU. Base M1/M2 MacBooks are
limited to 1 external monitor; M-series Pro/Max support 2-5. For a monitor,
1440p is the sweet spot; IPS for color, higher refresh (144Hz+) for gaming.

Microsoft 365: subscription for the full Office suite plus Teams and 1TB OneDrive,
always updated. Personal is ~$6.99/mo, Family ~$9.99/mo, Business Basic ~$6/user,
Business Standard ~$12.50/user (full desktop apps). For businesses on Windows with
heavy Excel or compliance needs, Microsoft 365 beats Google Workspace; Google
Workspace suits browser-first startups. Teams + Outlook + Chrome + OneDrive
together use 8-14GB RAM, so 16GB is the practical minimum for office machines.

Gaming build combos (2025): ~$500 Ryzen 5 7600 + RTX 4060 for 1080p 144Hz; ~$800
Core i5-14600K + RTX 4070 for 1440p; ~$1,200 Ryzen 7 7800X3D + RTX 4070 Ti Super
for 1440p-4K; ~$2,400+ Core i9-14900K + RTX 4090 for 4K max. The Ryzen 7 7800X3D
is the best gaming CPU per dollar. Editing: 32GB RAM, RTX 4070+ (NVIDIA for
Premiere/CUDA, AMD RX 7900 for DaVinci Resolve), Core i9 / Ryzen 9; on Final Cut
Pro go Apple Silicon.

AMD vs Intel for a desktop: pure gaming -> Ryzen 7 7800X3D. Mixed
creation/multitasking -> Core i9-14900K or Ryzen 9 7950X. Budget -> Ryzen 5 7600
is better value than similar Intel.

Custom PC builds: tell us the budget and use (gaming, editing, office), we spec
parts, order, assemble and cable-manage, install Windows and drivers, and
stress-test before handoff. Build consult from $59.

Data transfer / new device setup: we move files, photos, email, bookmarks, and
settings from an old device to a new one (PC, Mac, phone, tablet), migrate
accounts, and set up a backup. Basic recovery from failing drives too.
`.trim();
