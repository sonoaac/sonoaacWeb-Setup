import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X } from "lucide-react";

// ── Rent-to-own model ───────────────────────────────────────────────────────
// 50% up front (gaming PCs and TVs). The remaining balance is paid as a fixed
// monthly amount until it's cleared — term depends on the price. After the last
// payment the device is yours. Optional protection plan is added at signup;
// on TVs it does NOT cover screen damage or accidental damage.

const DOWN_PCT = 0.5;

function money(n: number): string {
  return n % 1 === 0
    ? `$${n.toLocaleString()}`
    : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function plan(buyPrice: number, monthly: number) {
  const down = Math.round(buyPrice * DOWN_PCT);
  const remaining = buyPrice - down;
  const months = Math.max(1, Math.ceil(remaining / monthly));
  const lastPayment = remaining - monthly * (months - 1);
  const total = down + monthly * (months - 1) + Math.max(0, lastPayment);
  return { down, remaining, months, lastPayment, total };
}

// ── Catalogue ───────────────────────────────────────────────────────────────

type Category = "Gaming PC" | "Gaming Laptop" | "TV" | "Monitor";

interface RentalItem {
  id: string;
  category: Category;
  name: string;
  brand?: string;
  images: string[];
  buyPrice: number;
  monthly: number;
  tagline: string;
  specLine: string;
  highlights: [string, string][];
  features: [string, string][];
  specs: { group: string; rows: [string, string][] }[];
  included?: string;
  badge?: string;
}

const PROTECTION_NOTE_TV =
  "Optional protection plan (added at signup) covers mechanical and electrical failure. TV plans do not cover screen damage or accidental damage.";
const PROTECTION_NOTE_GENERAL =
  "Optional protection plan (added at signup) covers mechanical and electrical failure.";

const RENTALS: RentalItem[] = [
  {
    id: "fire-tv-55",
    category: "TV",
    name: '55" LED 4K UHD Smart Fire TV',
    images: ["/img/rentals/fire-tv-55-1.png", "/img/rentals/fire-tv-55-2.png"],
    buyPrice: 350,
    monthly: 25,
    tagline:
      "55-inch 4K Ultra HD with HDR10, DTS Virtual:X sound, and Fire TV built in — hands-free with Alexa.",
    specLine: '55" · 4K UHD · HDR10 · Fire TV · 60Hz',
    badge: "New for 2025",
    highlights: [
      ["Resolution", "4K (2160p)"],
      ["Screen size class", "55 inches"],
      ["Display type", "LED — Direct Lit"],
      ["HDR", "Yes — HDR10"],
      ["Refresh rate", "60Hz"],
      ["Smart platform", "Fire TV"],
      ["Voice assistant", "Amazon Alexa (built-in)"],
      ["HDMI inputs", "3 (HDMI 1 eARC/ARC)"],
    ],
    features: [
      ["4K Ultra HD (2160p)", "Four times the resolution of Full HD, with upscaling of lower-res content to near-4K quality."],
      ["HDR10", "A wider range of color detail and sharper contrast, from the brightest whites to the deepest blacks."],
      ["Fire TV built in", "Prime Video, Netflix, Disney+, Hulu, HBO Max and more — plus free ad-supported apps like Tubi and Pluto TV. Access to 1.8M+ movies and episodes (subscriptions may be required)."],
      ["Alexa voice remote", "Launch apps, search titles, and control playback hands-free."],
      ["Smart home hub", "Pair with compatible devices to view camera feeds, use AirPlay, and control lights and thermostats."],
      ["DTS Virtual:X", "An immersive sound format that creates a three-dimensional experience from the TV's speakers."],
      ["HDMI eARC", "Passes the original full-resolution audio to a soundbar or receiver over HDMI."],
      ["Versatile connections", "3 HDMI, composite (AV), digital optical out, USB, headphone jack, coax, Ethernet, and Wi-Fi."],
      ["Parental controls", "Block content by rating or channel; unlock with a PIN."],
      ["Wall mountable", "VESA 200 × 200 mm pattern."],
    ],
    specs: [
      {
        group: "General",
        rows: [
          ["Model year", "2025"],
          ["Color", "Black"],
        ],
      },
      {
        group: "Display",
        rows: [
          ["Display type", "LED (Standard LED panel)"],
          ["Resolution", "4K (2160p)"],
          ["Screen size", '54.5" (55" class)'],
          ["HDR format", "HDR10"],
          ["Backlight", "Direct Lit"],
          ["Refresh rate", "60Hz"],
          ["Motion enhancement", "None"],
        ],
      },
      {
        group: "Smart & voice",
        rows: [
          ["Smart platform", "Fire TV"],
          ["Featured apps", "Netflix, Prime Video, YouTube, Hulu, Disney+, HBO Max, Paramount+, Sling TV, Apple TV, ESPN+"],
          ["Screen mirroring", "Apple AirPlay"],
          ["Voice assistant", "Amazon Alexa (built-in, near-field mic)"],
        ],
      },
      {
        group: "Connectivity",
        rows: [
          ["HDMI inputs", "3 (eARC on HDMI 1)"],
          ["Other video", "1 × composite (AV)"],
          ["Audio out", "3.5mm + optical digital"],
          ["USB", "1 × USB-A"],
          ["Network", "1 × Ethernet LAN"],
          ["Wireless", "Wi-Fi 5, Bluetooth 5.0"],
          ["Tuner", "ATSC, Clear QAM"],
        ],
      },
      {
        group: "Audio",
        rows: [
          ["Speakers", "2 × downward-firing"],
          ["Channels", "2.0"],
          ["Surround", "DTS Virtual:X"],
        ],
      },
      {
        group: "Dimensions & power",
        rows: [
          ["With stand", '48.4" W × 30.1" H × 10.4" D'],
          ["Without stand", '48.4" W × 28.3" H × 3.2" D'],
          ["Weight (with stand)", "24.0 lb"],
          ["Stand width", '41.2"'],
          ["VESA mount", "200 × 200 mm"],
          ["Est. annual energy", "~243 kWh (~$39/yr)"],
        ],
      },
    ],
    included:
      '55" 4K Fire TV, Voice Remote with Alexa, 2 × AAA batteries, power cord, stand, screws, Quick Setup Guide.',
  },
  {
    id: "fire-tv-50",
    category: "TV",
    name: '50" LED 4K UHD Smart Fire TV',
    images: ["/img/rentals/fire-tv-55-1.png", "/img/rentals/fire-tv-55-2.png"],
    buyPrice: 300,
    monthly: 25,
    tagline:
      "50-inch 4K Ultra HD with HDR10, DTS Virtual:X sound, and Fire TV built in — hands-free with Alexa.",
    specLine: '50" · 4K UHD · HDR10 · Fire TV · 60Hz',
    highlights: [
      ["Resolution", "4K (2160p)"],
      ["Screen size class", "50 inches"],
      ["Display type", "LED — Direct Lit"],
      ["HDR", "Yes — HDR10"],
      ["Refresh rate", "60Hz"],
      ["Smart platform", "Fire TV"],
      ["Voice assistant", "Amazon Alexa (built-in)"],
      ["HDMI inputs", "3 (HDMI 1 eARC/ARC)"],
    ],
    features: [
      ["4K Ultra HD (2160p)", "Four times the resolution of Full HD, with upscaling of lower-res content to near-4K quality."],
      ["HDR10", "A wider range of color detail and sharper contrast, from the brightest whites to the deepest blacks."],
      ["Fire TV built in", "Prime Video, Netflix, Disney+, Hulu, HBO Max and more — plus free ad-supported apps like Tubi and Pluto TV. Access to 1.8M+ movies and episodes (subscriptions may be required)."],
      ["Alexa voice remote", "Launch apps, search titles, and control playback hands-free."],
      ["Smart home hub", "Pair with compatible devices to view camera feeds, use AirPlay, and control lights and thermostats."],
      ["DTS Virtual:X", "An immersive sound format that creates a three-dimensional experience from the TV's speakers."],
      ["HDMI eARC", "Passes the original full-resolution audio to a soundbar or receiver over HDMI."],
      ["Versatile connections", "3 HDMI, composite (AV), digital optical out, USB, headphone jack, coax, Ethernet, and Wi-Fi."],
      ["Parental controls", "Block content by rating or channel; unlock with a PIN."],
      ["Wall mountable", "VESA 200 × 200 mm pattern."],
    ],
    specs: [
      {
        group: "General",
        rows: [
          ["Model year", "2025"],
          ["Color", "Black"],
        ],
      },
      {
        group: "Display",
        rows: [
          ["Display type", "LED (Standard LED panel)"],
          ["Resolution", "4K (2160p)"],
          ["Screen size", '50" class'],
          ["HDR format", "HDR10"],
          ["Backlight", "Direct Lit"],
          ["Refresh rate", "60Hz"],
          ["Motion enhancement", "None"],
        ],
      },
      {
        group: "Smart & voice",
        rows: [
          ["Smart platform", "Fire TV"],
          ["Featured apps", "Netflix, Prime Video, YouTube, Hulu, Disney+, HBO Max, Paramount+, Sling TV, Apple TV, ESPN+"],
          ["Screen mirroring", "Apple AirPlay"],
          ["Voice assistant", "Amazon Alexa (built-in, near-field mic)"],
        ],
      },
      {
        group: "Connectivity",
        rows: [
          ["HDMI inputs", "3 (eARC on HDMI 1)"],
          ["Other video", "1 × composite (AV)"],
          ["Audio out", "3.5mm + optical digital"],
          ["USB", "1 × USB-A"],
          ["Network", "1 × Ethernet LAN"],
          ["Wireless", "Wi-Fi 5, Bluetooth 5.0"],
          ["Tuner", "ATSC, Clear QAM"],
        ],
      },
      {
        group: "Audio",
        rows: [
          ["Speakers", "2 × downward-firing"],
          ["Channels", "2.0"],
          ["Surround", "DTS Virtual:X"],
        ],
      },
      {
        group: "Compatibility",
        rows: [["VESA mount", "200 × 200 mm"]],
      },
    ],
    included:
      '50" 4K Fire TV, Voice Remote with Alexa, 2 × AAA batteries, power cord, stand, screws, Quick Setup Guide.',
  },
];

const FILTERS = ["All", "TVs", "Gaming PCs", "Gaming Laptops", "Monitors"] as const;
type Filter = (typeof FILTERS)[number];
const FILTER_MAP: Record<Filter, Category | null> = {
  All: null,
  TVs: "TV",
  "Gaming PCs": "Gaming PC",
  "Gaming Laptops": "Gaming Laptop",
  Monitors: "Monitor",
};

/** Only show the filter bar once there's more than one category in the catalogue. */
const CATEGORIES_IN_USE = new Set(RENTALS.map((r) => r.category));
const SHOW_FILTERS = CATEGORIES_IN_USE.size > 1;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// ── Image with graceful fallback ────────────────────────────────────────────

const CATEGORY_GLYPH: Record<Category, string> = {
  // simple line-art, drawn in a 0 0 64 40 viewBox
  TV: "M6 6h52v26H6zM24 36h16M20 40h24",
  "Gaming PC": "M16 4h20v34H16zM20 9h12M20 14h12M22 32h8",
  "Gaming Laptop": "M12 8h40v22H12zM6 34h52l-4 4H10z",
  Monitor: "M6 6h52v28H6zM26 38h12M22 40h20",
};

function ProductImage({
  src,
  alt,
  kind,
  className,
}: {
  src: string;
  alt: string;
  kind?: Category;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-green-900/10 border border-green-900/30 ${className ?? ""}`}
      >
        <svg width="64" height="40" viewBox="0 0 64 40" className="text-green-800/70">
          <path
            d={kind ? CATEGORY_GLYPH[kind] : "M6 6h52v28H6z"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-green-800/70 text-[9px] uppercase tracking-[0.25em]">Photo coming soon</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

// ── Detail modal ────────────────────────────────────────────────────────────

function DetailModal({ item, onClose }: { item: RentalItem; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const p = plan(item.buyPrice, item.monthly);
  const protectionNote = item.category === "TV" ? PROTECTION_NOTE_TV : PROTECTION_NOTE_GENERAL;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 flex items-start sm:items-center justify-center overflow-y-auto p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        className="bg-black border border-green-800 max-w-3xl w-full my-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-green-900 sticky top-0 bg-black">
          <div>
            <p className="text-green-800 text-[10px] uppercase tracking-[0.3em]">{item.category}</p>
            <h2 className="text-white font-bold text-lg leading-snug">{item.name}</h2>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-gray-500 hover:text-green-400 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Gallery */}
          <div>
            <ProductImage
              src={item.images[active]}
              alt={item.name}
              kind={item.category}
              className="w-full aspect-video object-contain bg-white"
            />
            {item.images.length > 1 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {item.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActive(i)}
                    className={`w-16 h-12 border ${i === active ? "border-green-400" : "border-green-900/40"}`}
                  >
                    <ProductImage
                      src={img}
                      alt=""
                      kind={item.category}
                      className="w-full h-full object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{item.tagline}</p>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-green-900/40 p-4">
              <p className="text-green-800 text-[10px] uppercase tracking-[0.25em] mb-1">Buy outright</p>
              <p className="text-white text-2xl font-bold">{money(item.buyPrice)}</p>
              <p className="text-gray-500 text-xs">one payment, it's yours</p>
            </div>
            <div className="border border-green-900/40 p-4">
              <p className="text-green-800 text-[10px] uppercase tracking-[0.25em] mb-1">Rent to own</p>
              <p className="text-white text-2xl font-bold">
                {money(p.down)} <span className="text-gray-500 text-xs font-normal">down (50%)</span>
              </p>
              <p className="text-gray-300 text-xs mt-1">
                then {money(item.monthly)}/mo for {p.months} month{p.months !== 1 ? "s" : ""}
                {p.lastPayment !== item.monthly && p.lastPayment > 0
                  ? ` (last month ${money(p.lastPayment)})`
                  : ""}
              </p>
              <p className="text-green-800 text-[10px] uppercase tracking-[0.15em] mt-1.5">
                Yours after the final payment · {money(p.total)} total
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">{protectionNote}</p>

          {/* Highlights */}
          {item.highlights.length > 0 && (
            <div>
              <p className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Highlights</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {item.highlights.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 text-xs border-b border-green-900/20 py-1">
                    <span className="text-gray-500">{k}</span>
                    <span className="text-gray-200 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {item.features.length > 0 && (
            <div>
              <p className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Features</p>
              <div className="space-y-2.5">
                {item.features.map(([t, b]) => (
                  <div key={t}>
                    <p className="text-gray-200 text-xs font-bold">{t}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {item.specs.length > 0 && (
            <div>
              <p className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Specifications</p>
              <div className="space-y-4">
                {item.specs.map((grp) => (
                  <div key={grp.group}>
                    <p className="text-green-800 text-[10px] uppercase tracking-[0.25em] mb-1">{grp.group}</p>
                    {grp.rows.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3 text-xs border-b border-green-900/20 py-1">
                        <span className="text-gray-500 shrink-0">{k}</span>
                        <span className="text-gray-300 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.included && (
            <div>
              <p className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-1">What's included</p>
              <p className="text-gray-400 text-xs leading-relaxed">{item.included}</p>
            </div>
          )}

          <Link href="/contact">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors"
            >
              Apply to Rent
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Rentals() {
  const [filter, setFilter] = useState<Filter>("All");
  const [detail, setDetail] = useState<RentalItem | null>(null);

  const cat = FILTER_MAP[filter];
  const items = cat ? RENTALS.filter((r) => r.category === cat) : RENTALS;
  const example = plan(350, 25); // 55" 4K Fire TV

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">Rentals</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Rent to Own.<br />
              Half Down, the Rest Monthly.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-4">
              TVs on a simple rent-to-own plan — with gaming PCs, laptops, and
              monitors coming soon. Put 50% down, pay a fixed monthly amount until
              the balance clears, and it's yours.
            </p>
            <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-8">
              In-house financing · quick approval · no balloon payment
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#catalogue"
                className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors text-center"
              >
                Browse the Catalogue
              </a>
              <a
                href="#how"
                className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors text-center"
              >
                How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">How It Works</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Half down, then monthly.</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                ["1 · 50% down", "Half the outright price up front, once approved. That covers the deposit and gets your order moving."],
                ["2 · Fixed monthly", "Pay a set amount each month toward the remaining balance. The number of months depends on the price."],
                ["3 · It's yours", "After the final payment the device is yours outright — no balloon fee, no return."],
              ].map(([title, body]) => (
                <div key={title} className="border border-green-900/40 p-4">
                  <p className="text-green-500 font-bold text-xs uppercase tracking-[0.15em] mb-2">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="border border-green-900/40 p-5">
              <p className="text-green-800 text-[10px] uppercase tracking-[0.3em] mb-3">
                Worked example — 55" 4K Fire TV
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between text-gray-300">
                  <span>Buy outright</span>
                  <span className="text-white font-bold">{money(350)}</span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>Rent to own — 50% down</span>
                  <span className="text-white font-bold">{money(example.down)}</span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>Then monthly</span>
                  <span className="text-white font-bold">
                    {money(25)}/mo × {example.months}
                  </span>
                </li>
                <li className="flex justify-between border-t border-green-900/30 pt-2 mt-1 text-green-500 font-bold text-xs uppercase tracking-[0.15em]">
                  <span>Rent-to-own total</span>
                  <span>{money(example.total)}</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-500 text-xs mt-4 leading-relaxed">
              {PROTECTION_NOTE_TV} Approval required. Ask us about longer terms on
              higher-value systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Delivery</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Ordered, shipped, done.</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                ["1 · Apply or call", "Apply online or call or text (862) 423-8875. We confirm the plan and approve you, usually the same day."],
                ["2 · We ship it", "Once approved, your order ships out. Allow 3–5 business days for it to arrive."],
                ["3 · You set it up", "It arrives ready to go. TVs include the stand, voice remote, and quick setup guide — plug in and you're watching."],
              ].map(([title, body]) => (
                <div key={title} className="border border-green-900/40 p-4">
                  <p className="text-green-500 font-bold text-xs uppercase tracking-[0.15em] mb-2">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-xs leading-relaxed">
              Delivery is included with every rental — no separate shipping fee. We
              don't install rentals and there's no setup charge; you set it up
              yourself. If you get stuck, Sonoaac remote support can walk you through
              it as a normal support session.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Catalogue</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Pick your system.</h2>

            {SHOW_FILTERS && (
              <div className="flex flex-wrap gap-2 mb-10">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-2 text-xs uppercase tracking-[0.12em] font-bold border transition-colors ${
                      filter === f
                        ? "bg-green-400 text-black border-green-400"
                        : "border-green-900/40 text-green-800 hover:border-green-700 hover:text-green-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => {
                const p = plan(item.buyPrice, item.monthly);
                return (
                  <div key={item.id} className="border border-green-900/40 flex flex-col">
                    <ProductImage
                      src={item.images[0]}
                      alt={item.name}
                      kind={item.category}
                      className="w-full aspect-video object-contain bg-white"
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="text-white font-bold text-sm leading-snug">{item.name}</h3>
                        {item.badge && (
                          <span className="text-[9px] uppercase tracking-[0.12em] text-black bg-green-400 px-1.5 py-0.5 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] mb-3">{item.specLine}</p>

                      <div className="mt-auto border-t border-green-900/30 pt-3 space-y-1">
                        <p className="text-gray-400 text-xs">
                          Buy outright <span className="text-white font-bold">{money(item.buyPrice)}</span>
                        </p>
                        <p className="text-white text-sm">
                          <span className="text-lg font-bold">{money(p.down)}</span>{" "}
                          <span className="text-gray-500 text-xs">down</span>
                        </p>
                        <p className="text-gray-400 text-xs">
                          then {money(item.monthly)}/mo × {p.months}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setDetail(item)}
                          className="flex-1 px-3 py-2.5 border border-green-800 text-green-400 font-bold text-[10px] uppercase tracking-[0.15em] hover:border-green-400 transition-colors"
                        >
                          Details
                        </button>
                        <Link href="/contact" className="flex-1">
                          <button className="w-full px-3 py-2.5 bg-green-400 text-black font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-green-300 transition-colors">
                            Apply
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Don't see it? We'll source it.</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              Tell us the console, PC, or TV you want and we'll quote a rent-to-own
              plan for it — same 50% down, same terms.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
                Request a Rental
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {detail && <DetailModal item={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>
    </div>
  );
}
