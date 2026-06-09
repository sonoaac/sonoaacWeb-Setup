import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, ChevronRight, Info, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

// ─── Pricing data ──────────────────────────────────────────────────────────
// competitorAvg = typical trade-in value across Gazelle / SellCell / BestBuy / Apple
// Sonoaac cash offer = 50% of competitorAvg (competitors offer store credit; we pay cash)

const IPHONE_MODELS: { id: string; name: string; released: number; storage: { gb: string; competitorAvg: number }[] }[] = [
  {
    id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", released: 2024,
    storage: [
      { gb: "256GB", competitorAvg: 700 },
      { gb: "512GB", competitorAvg: 745 },
      { gb: "1TB",   competitorAvg: 800 },
    ],
  },
  {
    id: "iphone-16-pro", name: "iPhone 16 Pro", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 640 },
      { gb: "256GB", competitorAvg: 680 },
      { gb: "512GB", competitorAvg: 730 },
      { gb: "1TB",   competitorAvg: 790 },
    ],
  },
  {
    id: "iphone-16-plus", name: "iPhone 16 Plus", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 490 },
      { gb: "256GB", competitorAvg: 525 },
      { gb: "512GB", competitorAvg: 570 },
    ],
  },
  {
    id: "iphone-16", name: "iPhone 16", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 530 },
      { gb: "256GB", competitorAvg: 565 },
      { gb: "512GB", competitorAvg: 610 },
    ],
  },
  {
    id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", released: 2023,
    storage: [
      { gb: "256GB", competitorAvg: 545 },
      { gb: "512GB", competitorAvg: 590 },
      { gb: "1TB",   competitorAvg: 640 },
    ],
  },
  {
    id: "iphone-15-pro", name: "iPhone 15 Pro", released: 2023,
    storage: [
      { gb: "128GB", competitorAvg: 490 },
      { gb: "256GB", competitorAvg: 530 },
      { gb: "512GB", competitorAvg: 570 },
      { gb: "1TB",   competitorAvg: 620 },
    ],
  },
  {
    id: "iphone-15-plus", name: "iPhone 15 Plus", released: 2023,
    storage: [
      { gb: "128GB", competitorAvg: 360 },
      { gb: "256GB", competitorAvg: 395 },
      { gb: "512GB", competitorAvg: 435 },
    ],
  },
  {
    id: "iphone-15", name: "iPhone 15", released: 2023,
    storage: [
      { gb: "128GB", competitorAvg: 395 },
      { gb: "256GB", competitorAvg: 430 },
      { gb: "512GB", competitorAvg: 470 },
    ],
  },
  {
    id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 345 },
      { gb: "256GB", competitorAvg: 375 },
      { gb: "512GB", competitorAvg: 410 },
      { gb: "1TB",   competitorAvg: 450 },
    ],
  },
  {
    id: "iphone-14-pro", name: "iPhone 14 Pro", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 310 },
      { gb: "256GB", competitorAvg: 340 },
      { gb: "512GB", competitorAvg: 375 },
      { gb: "1TB",   competitorAvg: 415 },
    ],
  },
  {
    id: "iphone-14-plus", name: "iPhone 14 Plus", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 215 },
      { gb: "256GB", competitorAvg: 240 },
      { gb: "512GB", competitorAvg: 270 },
    ],
  },
  {
    id: "iphone-14", name: "iPhone 14", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 235 },
      { gb: "256GB", competitorAvg: 260 },
      { gb: "512GB", competitorAvg: 290 },
    ],
  },
  {
    id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", released: 2021,
    storage: [
      { gb: "128GB", competitorAvg: 210 },
      { gb: "256GB", competitorAvg: 235 },
      { gb: "512GB", competitorAvg: 260 },
      { gb: "1TB",   competitorAvg: 290 },
    ],
  },
  {
    id: "iphone-13-pro", name: "iPhone 13 Pro", released: 2021,
    storage: [
      { gb: "128GB", competitorAvg: 190 },
      { gb: "256GB", competitorAvg: 215 },
      { gb: "512GB", competitorAvg: 240 },
      { gb: "1TB",   competitorAvg: 265 },
    ],
  },
  {
    id: "iphone-13", name: "iPhone 13", released: 2021,
    storage: [
      { gb: "128GB", competitorAvg: 140 },
      { gb: "256GB", competitorAvg: 160 },
      { gb: "512GB", competitorAvg: 185 },
    ],
  },
  {
    id: "iphone-13-mini", name: "iPhone 13 Mini", released: 2021,
    storage: [
      { gb: "128GB", competitorAvg: 110 },
      { gb: "256GB", competitorAvg: 130 },
      { gb: "512GB", competitorAvg: 150 },
    ],
  },
];

const SAMSUNG_MODELS: typeof IPHONE_MODELS = [
  {
    id: "s25-ultra", name: "Galaxy S25 Ultra", released: 2025,
    storage: [
      { gb: "256GB", competitorAvg: 520 },
      { gb: "512GB", competitorAvg: 565 },
      { gb: "1TB",   competitorAvg: 620 },
    ],
  },
  {
    id: "s25-plus", name: "Galaxy S25+", released: 2025,
    storage: [
      { gb: "256GB", competitorAvg: 440 },
      { gb: "512GB", competitorAvg: 475 },
    ],
  },
  {
    id: "s25", name: "Galaxy S25", released: 2025,
    storage: [
      { gb: "128GB", competitorAvg: 360 },
      { gb: "256GB", competitorAvg: 390 },
    ],
  },
  {
    id: "s24-ultra", name: "Galaxy S24 Ultra", released: 2024,
    storage: [
      { gb: "256GB", competitorAvg: 390 },
      { gb: "512GB", competitorAvg: 430 },
      { gb: "1TB",   competitorAvg: 475 },
    ],
  },
  {
    id: "s24-plus", name: "Galaxy S24+", released: 2024,
    storage: [
      { gb: "256GB", competitorAvg: 295 },
      { gb: "512GB", competitorAvg: 330 },
    ],
  },
  {
    id: "s24", name: "Galaxy S24", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 225 },
      { gb: "256GB", competitorAvg: 250 },
    ],
  },
  {
    id: "s23-ultra", name: "Galaxy S23 Ultra", released: 2023,
    storage: [
      { gb: "256GB", competitorAvg: 245 },
      { gb: "512GB", competitorAvg: 275 },
      { gb: "1TB",   competitorAvg: 310 },
    ],
  },
  {
    id: "s23-plus", name: "Galaxy S23+", released: 2023,
    storage: [
      { gb: "256GB", competitorAvg: 185 },
      { gb: "512GB", competitorAvg: 215 },
    ],
  },
  {
    id: "s23", name: "Galaxy S23", released: 2023,
    storage: [
      { gb: "128GB", competitorAvg: 145 },
      { gb: "256GB", competitorAvg: 165 },
    ],
  },
];

const IPAD_MODELS: typeof IPHONE_MODELS = [
  {
    id: "ipad-pro-13-m4", name: "iPad Pro 13\" (M4)", released: 2024,
    storage: [
      { gb: "256GB", competitorAvg: 680 },
      { gb: "512GB", competitorAvg: 745 },
      { gb: "1TB",   competitorAvg: 830 },
    ],
  },
  {
    id: "ipad-pro-11-m4", name: "iPad Pro 11\" (M4)", released: 2024,
    storage: [
      { gb: "256GB", competitorAvg: 580 },
      { gb: "512GB", competitorAvg: 640 },
      { gb: "1TB",   competitorAvg: 720 },
    ],
  },
  {
    id: "ipad-air-13-m2", name: "iPad Air 13\" (M2)", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 380 },
      { gb: "256GB", competitorAvg: 430 },
      { gb: "512GB", competitorAvg: 480 },
    ],
  },
  {
    id: "ipad-air-11-m2", name: "iPad Air 11\" (M2)", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 295 },
      { gb: "256GB", competitorAvg: 345 },
      { gb: "512GB", competitorAvg: 385 },
    ],
  },
  {
    id: "ipad-mini-7", name: "iPad Mini (7th gen)", released: 2024,
    storage: [
      { gb: "128GB", competitorAvg: 265 },
      { gb: "256GB", competitorAvg: 300 },
    ],
  },
  {
    id: "ipad-pro-12-m2", name: "iPad Pro 12.9\" (M2)", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 460 },
      { gb: "256GB", competitorAvg: 510 },
      { gb: "512GB", competitorAvg: 565 },
      { gb: "1TB",   competitorAvg: 630 },
    ],
  },
  {
    id: "ipad-pro-11-m2", name: "iPad Pro 11\" (M2)", released: 2022,
    storage: [
      { gb: "128GB", competitorAvg: 380 },
      { gb: "256GB", competitorAvg: 425 },
      { gb: "512GB", competitorAvg: 480 },
      { gb: "1TB",   competitorAvg: 540 },
    ],
  },
  {
    id: "ipad-air-5", name: "iPad Air (5th gen, M1)", released: 2022,
    storage: [
      { gb: "64GB",  competitorAvg: 220 },
      { gb: "256GB", competitorAvg: 270 },
    ],
  },
  {
    id: "ipad-10", name: "iPad (10th gen)", released: 2022,
    storage: [
      { gb: "64GB",  competitorAvg: 155 },
      { gb: "256GB", competitorAvg: 185 },
    ],
  },
  {
    id: "ipad-mini-6", name: "iPad Mini (6th gen)", released: 2021,
    storage: [
      { gb: "64GB",  competitorAvg: 190 },
      { gb: "256GB", competitorAvg: 230 },
    ],
  },
  {
    id: "ipad-9", name: "iPad (9th gen)", released: 2021,
    storage: [
      { gb: "64GB",  competitorAvg: 85 },
      { gb: "256GB", competitorAvg: 105 },
    ],
  },
];

type Category = "iphone" | "samsung" | "ipad";
type Condition = "excellent" | "good" | "fair" | "ineligible";

const CONDITION_MULTIPLIER: Record<Condition, number> = {
  excellent: 1.0,
  good: 0.85,
  fair: 0.65,
  ineligible: 0,
};

const SONOAAC_MULTIPLIER = 0.5; // cash offer — 50% of typical market rate

function calcOffer(competitorAvg: number, condition: Condition): number {
  return Math.round(competitorAvg * SONOAAC_MULTIPLIER * CONDITION_MULTIPLIER[condition]);
}

// ─── Sub-components ────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i < current ? "24px" : "8px",
            height: "4px",
            background: i < current ? "#000" : "#ddd",
            transition: "all 0.3s",
          }}
        />
      ))}
      <span style={{ fontSize: "0.65rem", color: "#999", letterSpacing: "0.15em", textTransform: "uppercase", marginLeft: "4px" }}>
        Step {current} of {total}
      </span>
    </div>
  );
}

function SelectCard({
  label,
  sub,
  selected,
  onClick,
  icon,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "16px",
        border: selected ? "2px solid #000" : "2px solid #e0e0e0",
        background: selected ? "#000" : "#fff",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
      onMouseEnter={e => {
        if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#999";
      }}
      onMouseLeave={e => {
        if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0";
      }}
    >
      {icon && <div style={{ marginBottom: "4px", color: selected ? "#fff" : "#555" }}>{icon}</div>}
      <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: selected ? "#fff" : "#111" }}>
        {label}
      </div>
      {sub && <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.65rem", color: selected ? "#ccc" : "#888" }}>{sub}</div>}
    </button>
  );
}

// ─── Serial Number Help ────────────────────────────────────────────────────

function SerialHelp({ category }: { category: Category | null }) {
  const [open, setOpen] = useState(false);

  const instructions: Record<Category, { title: string; steps: string[]; note: string }[]> = {
    iphone: [
      {
        title: "Find model name & serial (iPhone)",
        steps: [
          "Open Settings on your iPhone.",
          "Tap General → About.",
          "Look for Model Name (e.g. iPhone 15 Pro) and Serial Number.",
          "The model name is the exact device name you need to select below.",
        ],
        note: "Tip: You can also find the model on the original box or receipt.",
      },
    ],
    samsung: [
      {
        title: "Find model name & serial (Samsung Galaxy)",
        steps: [
          "Open Settings on your Samsung.",
          "Scroll down and tap About Phone.",
          "Look for Model Name (e.g. Galaxy S24 Ultra) and Serial Number.",
          "Serial Number is also printed inside the SIM tray slot on some models.",
        ],
        note: "Tip: Dial *#06# to quickly display the IMEI, which can help verify your device.",
      },
    ],
    ipad: [
      {
        title: "Find model name & serial (iPad)",
        steps: [
          "Open Settings on your iPad.",
          "Tap General → About.",
          "Look for Model Name (e.g. iPad Pro 11-inch M4) and Serial Number.",
          "On older iPads, the serial number is also engraved on the back of the device near the bottom.",
        ],
        note: "Tip: The model name will tell you the exact generation — match it exactly to the list below.",
      },
    ],
  };

  const items = category ? instructions[category] : Object.values(instructions).flat();

  return (
    <div style={{ border: "1px solid #e5e5e5", marginBottom: "24px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "14px 18px", background: "#f8f8f8",
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Info size={14} color="#555" />
          <span style={{ fontFamily: "'Times New Roman', serif", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#333" }}>
            How to find your serial number and model name
          </span>
        </div>
        <ChevronDown size={14} color="#999" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "16px 18px", borderTop: "1px solid #e5e5e5" }}>
              {items.map((item, idx) => (
                <div key={idx} style={{ marginBottom: idx < items.length - 1 ? "20px" : 0 }}>
                  <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#111", marginBottom: "10px" }}>
                    {item.title}
                  </p>
                  <ol style={{ paddingLeft: "18px", margin: 0 }}>
                    {item.steps.map((step, i) => (
                      <li key={i} style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.78rem", color: "#444", lineHeight: 1.7, marginBottom: "2px" }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888", marginTop: "8px", fontStyle: "italic" }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function TradeIn() {
  const [category, setCategory] = useState<Category | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [storageGb, setStorageGb] = useState<string | null>(null);
  const [condition, setCondition] = useState<Condition | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const models =
    category === "iphone" ? IPHONE_MODELS :
    category === "samsung" ? SAMSUNG_MODELS :
    category === "ipad" ? IPAD_MODELS : [];

  const selectedModel = models.find(m => m.id === modelId) ?? null;
  const selectedStorageObj = selectedModel?.storage.find(s => s.gb === storageGb) ?? null;

  const step =
    !category ? 1 :
    !modelId ? 2 :
    !storageGb ? 3 :
    !condition ? 4 : 5;

  function reset() {
    setCategory(null);
    setModelId(null);
    setStorageGb(null);
    setCondition(null);
    setSubmitted(false);
  }

  const offerAmount = selectedStorageObj && condition && condition !== "ineligible"
    ? calcOffer(selectedStorageObj.competitorAvg, condition)
    : null;


  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ backgroundColor: "#000", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.35em", color: "#888", marginBottom: "14px" }}>
            Sonoaac Trade-In Program
          </p>
          <h1 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.4rem)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Trade In.<br />Get Paid Cash.
          </h1>
          <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "1rem", color: "#aaa", lineHeight: 1.7, maxWidth: "520px", marginBottom: "24px" }}>
            Bring in your unlocked iPhone, Samsung Galaxy, or iPad and walk out with cash. No store credit, no waiting — real money on the spot after inspection. Get your estimate in under 2 minutes.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              "iPhone 13 and up",
              "Samsung S23 and up",
              "iPads (unlocked)",
              "Devices up to 5 years old",
            ].map(tag => (
              <span key={tag} style={{ padding: "5px 12px", border: "1px solid #444", fontFamily: "'Times New Roman', serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#ccc" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works strip ── */}
      <div style={{ borderBottom: "2px solid #000", backgroundColor: "#f8f8f8" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: "0" }}>
          {[
            ["01", "Get your quote", "Pick your device and condition below. Takes 60 seconds."],
            ["02", "Bring it in", "Valid 3 days. Bring the device to Sonoaac for inspection."],
            ["03", "Get paid", "We verify condition, then pay cash or store credit on the spot."],
          ].map(([num, title, desc], i, arr) => (
            <div key={num} style={{ flex: "1 1 200px", padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #e0e0e0" : "none" }}>
              <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "1.6rem", color: "#e5e5e5", lineHeight: 1, marginBottom: "4px" }}>{num}</p>
              <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111", marginBottom: "4px" }}>{title}</p>
              <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#777", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quote Tool ── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.35em", color: "#999", marginBottom: "6px" }}>
            Instant Quote
          </p>
          <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "1.6rem", color: "#000", letterSpacing: "-0.01em" }}>
            What device are you trading in?
          </h2>
        </div>

        <SerialHelp category={category} />

        <AnimatePresence mode="wait">
          <motion.div key={`step-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {/* Step 1: Category */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#111" }}>
                  Device type
                </p>
                <StepIndicator current={step} total={5} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                <SelectCard
                  label="iPhone"
                  sub="13 and newer"
                  selected={category === "iphone"}
                  onClick={() => { setCategory("iphone"); setModelId(null); setStorageGb(null); setCondition(null); }}
                  icon={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  }
                />
                <SelectCard
                  label="Samsung"
                  sub="Galaxy S23 and newer"
                  selected={category === "samsung"}
                  onClick={() => { setCategory("samsung"); setModelId(null); setStorageGb(null); setCondition(null); }}
                  icon={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                      <circle cx="12" cy="18" r="0.5" fill="currentColor"/>
                    </svg>
                  }
                />
                <SelectCard
                  label="iPad"
                  sub="Unlocked, 2021 and newer"
                  selected={category === "ipad"}
                  onClick={() => { setCategory("ipad"); setModelId(null); setStorageGb(null); setCondition(null); }}
                  icon={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="2" width="18" height="20" rx="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Step 2: Model */}
            {category && (
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#111", marginBottom: "10px" }}>
                  Select your exact model
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {models.map(m => (
                    <SelectCard
                      key={m.id}
                      label={m.name}
                      sub={`Released ${m.released}`}
                      selected={modelId === m.id}
                      onClick={() => { setModelId(m.id); setStorageGb(null); setCondition(null); }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Storage */}
            {modelId && selectedModel && (
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#111", marginBottom: "10px" }}>
                  Storage capacity
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedModel.storage.map(s => (
                    <SelectCard
                      key={s.gb}
                      label={s.gb}
                      selected={storageGb === s.gb}
                      onClick={() => { setStorageGb(s.gb); setCondition(null); }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Condition */}
            {storageGb && (
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#111", marginBottom: "6px" }}>
                  Device condition
                </p>
                <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.7rem", color: "#999", marginBottom: "12px" }}>
                  Be honest — Sonoaac inspects every device in person. Misrepresented condition results in quote rejection.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {([
                    { id: "excellent" as Condition, label: "Excellent", sub: "Like new. No scratches, works perfectly." },
                    { id: "good" as Condition, label: "Good", sub: "Minor wear, works perfectly. Small surface scratches." },
                    { id: "fair" as Condition, label: "Fair", sub: "Visible scratches or minor wear. No cracks. Fully functional." },
                    { id: "ineligible" as Condition, label: "Not eligible", sub: "Cracked screen, dents, water damage, won't power on." },
                  ]).map(c => (
                    <SelectCard
                      key={c.id}
                      label={c.label}
                      sub={c.sub}
                      selected={condition === c.id}
                      onClick={() => setCondition(c.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Quote result */}
            {condition && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>

                {condition === "ineligible" ? (
                  <div style={{ border: "2px solid #e53935", padding: "24px", background: "#fff5f5" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <XCircle size={22} color="#e53935" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c62828", marginBottom: "8px" }}>
                          Device not eligible
                        </p>
                        <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.78rem", color: "#555", lineHeight: 1.65 }}>
                          Sonoaac does not accept devices with cracked screens, broken displays, significant dents, water damage, or devices that do not power on. These conditions make the device ineligible for a trade-in offer.
                        </p>
                        <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888", marginTop: "10px" }}>
                          Have a different device in better condition?{" "}
                          <button onClick={reset} style={{ color: "#000", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Times New Roman', serif", fontSize: "0.72rem" }}>
                            Start over
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : submitted ? (
                  <div style={{ border: "2px solid #000", padding: "32px", textAlign: "center" }}>
                    <CheckCircle size={32} color="#000" style={{ margin: "0 auto 12px" }} />
                    <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#000", marginBottom: "8px" }}>
                      Quote locked in
                    </p>
                    <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.78rem", color: "#555", lineHeight: 1.65, marginBottom: "16px" }}>
                      Your <strong>${offerAmount}</strong> offer is valid for <strong>3 days</strong> from today. Bring your device to Sonoaac for in-person inspection. If the condition does not match your selection, Sonoaac reserves the right to revise or reject the offer.
                    </p>
                    <Link href="/contact">
                      <button className="btn-primary" style={{ marginBottom: "10px" }}>
                        Book a Drop-Off Appointment
                      </button>
                    </Link>
                    <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.65rem", color: "#aaa", marginTop: "8px" }}>
                      Or call us at (201) 349-6917
                    </p>
                    <button onClick={reset} style={{ display: "block", margin: "16px auto 0", fontFamily: "'Times New Roman', serif", fontSize: "0.68rem", color: "#888", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                      Get another quote
                    </button>
                  </div>
                ) : (
                  <div style={{ border: "2px solid #000" }}>
                    {/* Offer banner */}
                    <div style={{ backgroundColor: "#000", padding: "28px 28px 24px", textAlign: "center" }}>
                      <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#888", marginBottom: "8px" }}>
                        Your Sonoaac Offer
                      </p>
                      <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(2.4rem, 8vw, 3.8rem)", color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>
                        ${offerAmount}
                      </p>
                      <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888", marginTop: "6px" }}>
                        {selectedModel?.name} · {storageGb} · {condition?.charAt(0).toUpperCase()}{condition?.slice(1)} condition
                      </p>
                    </div>

                    {/* Validity + CTA */}
                    <div style={{ padding: "20px 28px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                        <Clock size={14} color="#555" />
                        <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#555" }}>
                          This offer is valid for <strong>3 days</strong> from the time you claim it, unless you cancel. Sonoaac may reject the offer upon inspection if the device condition does not match.
                        </p>
                      </div>
                      <button
                        className="btn-primary"
                        style={{ width: "100%", textAlign: "center" }}
                        onClick={() => setSubmitted(true)}
                      >
                        Claim This Offer — ${offerAmount}
                      </button>
                      <button onClick={reset} style={{ display: "block", margin: "10px auto 0", fontFamily: "'Times New Roman', serif", fontSize: "0.65rem", color: "#aaa", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                        Start over
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── What we don't accept ── */}
      <div style={{ borderTop: "2px solid #000", backgroundColor: "#f8f8f8", padding: "40px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#999", marginBottom: "16px" }}>
            Eligibility and Conditions
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
            {([
              { ok: false, text: "Cracked, shattered, or severely scratched screens" },
              { ok: false, text: "Devices that do not power on or are stuck in a boot loop" },
              { ok: false, text: "Physical dents, bent frames, or damaged ports" },
              { ok: false, text: "Water damage indicators triggered (liquid contact)" },
              { ok: false, text: "iCloud or Google account lock still active on the device" },
              { ok: false, text: "Carrier-locked devices (must be unlocked)" },
              { ok: false, text: "Devices older than 5 years from original release date" },
              { ok: false, text: "Models below iPhone 13, Galaxy S23, or iPad (9th gen 2021)" },
              { ok: true,  text: "Minor surface scratches that do not affect display are accepted" },
              { ok: true,  text: "Offers are valid 3 days — customer may cancel anytime before drop-off" },
              { ok: true,  text: "Sonoaac reserves the right to revise or reject any offer upon in-person inspection" },
            ] as { ok: boolean; text: string }[]).map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                {item.ok
                  ? <CheckCircle size={14} color="#43a047" style={{ flexShrink: 0, marginTop: "2px" }} />
                  : <XCircle size={14} color="#e53935" style={{ flexShrink: 0, marginTop: "2px" }} />
                }
                <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#444", lineHeight: 1.55 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", border: "1px solid #e0e0e0", padding: "16px", display: "flex", gap: "10px", alignItems: "flex-start", backgroundColor: "#fff" }}>
            <AlertTriangle size={16} color="#f57c00" style={{ flexShrink: 0, marginTop: "1px" }} />
            <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#555", lineHeight: 1.65 }}>
              <strong>Pricing disclaimer:</strong> All trade-in values shown are estimates based on current competitor market rates and are updated periodically. Final offers are confirmed at time of in-person inspection. Sonoaac is not obligated to honor quotes that were generated using incorrect device information.
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA footer ── */}
      <div style={{ borderTop: "1px solid #e5e5e5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "1.1rem", color: "#000", marginBottom: "8px" }}>
          Questions about your trade-in?
        </p>
        <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.8rem", color: "#777", marginBottom: "20px" }}>
          Call or message us before bringing your device in.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+12013496917" className="btn-outline">
            (201) 349-6917
          </a>
          <Link href="/contact">
            <button className="btn-primary">Contact Us</button>
          </Link>
        </div>
      </div>

    </div>
  );
}
