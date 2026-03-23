import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Cpu, Monitor, Database, HardDrive, Box, Zap, Layers,
  ArrowRight, ChevronRight, ShoppingCart, X, Star, Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ── Component Catalog (2025 — updated hardware) ─────────────────────────────

type Part = {
  id: number;
  category: string;
  name: string;
  price: number;
  specs: string;
  badge?: string;
  topPick?: boolean;
};

const PARTS: Part[] = [
  // CPUs
  { id:  1, category: "CPU",         name: "AMD Ryzen 9 9950X",             price: 649,  specs: "16-Core / 5.7GHz / 170W",           badge: "Flagship"   },
  { id:  2, category: "CPU",         name: "AMD Ryzen 9 9900X",             price: 449,  specs: "12-Core / 5.6GHz / 120W",           topPick: true       },
  { id:  3, category: "CPU",         name: "Intel Core Ultra 9 285K",       price: 589,  specs: "24-Core Hybrid / 5.7GHz / 125W"                         },
  { id:  4, category: "CPU",         name: "Intel Core Ultra 7 265K",       price: 394,  specs: "20-Core Hybrid / 5.5GHz / 125W",    badge: "Sweet Spot" },
  { id:  5, category: "CPU",         name: "AMD Ryzen 7 9700X",             price: 299,  specs: "8-Core / 5.5GHz / 65W",             badge: "Best Value" },

  // GPUs
  { id:  6, category: "GPU",         name: "NVIDIA GeForce RTX 5090",       price: 1999, specs: "32GB GDDR7 / Blackwell",            badge: "Flagship"   },
  { id:  7, category: "GPU",         name: "NVIDIA GeForce RTX 5080",       price: 999,  specs: "16GB GDDR7 / Blackwell",            topPick: true       },
  { id:  8, category: "GPU",         name: "NVIDIA GeForce RTX 5070 Ti",    price: 749,  specs: "16GB GDDR7 / Blackwell",            badge: "Best Value" },
  { id:  9, category: "GPU",         name: "NVIDIA GeForce RTX 5070",       price: 549,  specs: "12GB GDDR7 / Blackwell"                                 },
  { id: 10, category: "GPU",         name: "AMD Radeon RX 9070 XT",         price: 699,  specs: "16GB GDDR6 / RDNA 4",              badge: "AMD Pick"   },
  { id: 11, category: "GPU",         name: "AMD Radeon RX 9070",            price: 549,  specs: "16GB GDDR6 / RDNA 4"                                    },
  { id: 12, category: "GPU",         name: "NVIDIA GeForce RTX 4070 Super", price: 499,  specs: "12GB GDDR6X / Ada Lovelace",       badge: "Budget"     },

  // Motherboards
  { id: 13, category: "Motherboard", name: "ASUS ROG Strix Z890-E Gaming",  price: 449,  specs: "ATX / DDR5 / Wi-Fi 7 / PCIe 5.0"                       },
  { id: 14, category: "Motherboard", name: "MSI MEG Z890 ACE",              price: 349,  specs: "ATX / DDR5 / Wi-Fi 7 / PCIe 5.0", topPick: true       },
  { id: 15, category: "Motherboard", name: "ASUS TUF Gaming B650M-Plus",    price: 179,  specs: "mATX / DDR5 / Wi-Fi 6",            badge: "Best Value" },

  // RAM
  { id: 16, category: "RAM",         name: "Corsair Dominator Titanium 32GB", price: 149, specs: "DDR5 6400MHz / 2×16GB"                                },
  { id: 17, category: "RAM",         name: "G.Skill Trident Z5 64GB",       price: 219,  specs: "DDR5 6000MHz / 2×32GB",            topPick: true       },
  { id: 18, category: "RAM",         name: "Kingston Fury Beast 16GB",      price: 65,   specs: "DDR5 5200MHz / 2×8GB",             badge: "Budget"     },

  // Storage
  { id: 19, category: "Storage",     name: "Samsung 990 Pro 2TB",           price: 149,  specs: "NVMe PCIe 4.0 / 7,450 MB/s"                            },
  { id: 20, category: "Storage",     name: "WD Black SN850X 2TB",           price: 139,  specs: "NVMe PCIe 4.0 / 7,300 MB/s",      topPick: true       },
  { id: 21, category: "Storage",     name: "Seagate FireCuda 530 1TB",      price: 89,   specs: "NVMe PCIe 4.0 / 7,300 MB/s",      badge: "Budget"     },

  // Cases
  { id: 22, category: "Case",        name: "Lian Li O11 Dynamic EVO XL",    price: 179,  specs: "Full Tower / Dual-Chamber"                              },
  { id: 23, category: "Case",        name: "Fractal Design Torrent RGB",     price: 149,  specs: "Mid Tower / Airflow-Optimized",    topPick: true       },
  { id: 24, category: "Case",        name: "NZXT H7 Flow",                  price: 129,  specs: "Mid Tower / Tempered Glass",       badge: "Popular"    },

  // PSU
  { id: 25, category: "PSU",         name: "Corsair RM1000x 80+ Gold",      price: 189,  specs: "1000W / Fully Modular",            topPick: true       },
  { id: 26, category: "PSU",         name: "Seasonic Prime TX-850",         price: 199,  specs: "850W / 80+ Titanium / Modular"                         },
  { id: 27, category: "PSU",         name: "be quiet! Straight Power 12",   price: 129,  specs: "750W / 80+ Platinum / Modular",    badge: "Budget"     },
];

const CATEGORIES = [
  { id: "CPU",         label: "Processor",    icon: Cpu       },
  { id: "GPU",         label: "Graphics",     icon: Monitor   },
  { id: "Motherboard", label: "Motherboard",  icon: Layers    },
  { id: "RAM",         label: "Memory",       icon: Database  },
  { id: "Storage",     label: "Storage",      icon: HardDrive },
  { id: "Case",        label: "Case",         icon: Box       },
  { id: "PSU",         label: "Power Supply", icon: Zap       },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function BuildPC() {
  const [selections, setSelections] = useState<Record<string, Part>>({});
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { toast } = useToast();

  const activeCategory = CATEGORIES[activeCategoryIndex];
  const currentParts = PARTS.filter((p) => p.category === activeCategory.id);

  const partsCost = useMemo(
    () => Object.values(selections).reduce((sum, p) => sum + p.price, 0),
    [selections]
  );
  const totalEstimate = Math.round(partsCost * 1.15);
  const selectedCount = Object.keys(selections).length;
  const isComplete = selectedCount === CATEGORIES.length;

  const handleSelect = (part: Part) => {
    setSelections((prev) => ({ ...prev, [part.category]: part }));
    if (activeCategoryIndex < CATEGORIES.length - 1) {
      setTimeout(() => setActiveCategoryIndex((i) => i + 1), 350);
    }
  };

  const handleSubmit = () => {
    if (!isComplete) {
      toast({
        title: "Incomplete Build",
        description: `Select all ${CATEGORIES.length} components to continue.`,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Build Submitted!",
      description: "We'll reach out to confirm your build and finalize pricing.",
    });
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black">

      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 lg:px-12 py-3 border-b border-green-900/20">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em]">
          <Link href="/"><button className="text-green-800 hover:text-green-500 transition-colors">Home</button></Link>
          <ChevronRight size={10} className="text-green-900" />
          <Link href="/my-tech"><button className="text-green-800 hover:text-green-500 transition-colors">My Tech</button></Link>
          <ChevronRight size={10} className="text-green-900" />
          <span className="text-green-500">Build PC</span>
        </div>
      </div>

      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-green-900/30 bg-gradient-to-br from-green-950/50 via-black to-black">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-green-700 block mb-3">
              Custom PC Builder
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Configure Your<br />
              <span className="text-green-400">Dream Build.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
              Select your components below. Sonoaac assembles, bench-tests, and delivers.
              Assembly and testing fee (15%) is included in your final quote.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#builder">
                <button className="px-6 py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors inline-flex items-center gap-2">
                  Start Selecting <ArrowRight size={14} />
                </button>
              </a>
              <Link href="/contact">
                <button className="px-6 py-3 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                  Request Custom Quote
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Decorative accent */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-green-400/3 to-transparent pointer-events-none" />
      </div>

      {/* ── Builder Area ──────────────────────────────────────────────── */}
      <div id="builder" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 scroll-mt-6">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Tabs + Parts Grid ─────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Category tab bar */}
            <div className="overflow-x-auto mb-8">
              <div className="flex gap-2 min-w-max pb-1">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  const done = !!selections[cat.id];
                  const active = idx === activeCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] font-bold transition-all whitespace-nowrap border ${
                        active
                          ? "bg-green-400 text-black border-green-400"
                          : done
                          ? "border-green-700 text-green-500 hover:border-green-500"
                          : "border-green-900/50 text-green-800 hover:border-green-700 hover:text-green-600"
                      }`}
                    >
                      {done && !active ? <Check size={11} /> : <Icon size={11} />}
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section heading */}
            <div className="mb-5">
              <h2 className="text-base font-bold text-white uppercase tracking-[0.2em]">
                {activeCategory.label}
              </h2>
              <p className="text-green-800 text-[11px] uppercase tracking-[0.15em] mt-1">
                {selectedCount} of {CATEGORIES.length} components selected
              </p>
            </div>

            {/* Part cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence mode="wait">
                {currentParts.map((part, i) => {
                  const isSelected = selections[activeCategory.id]?.id === part.id;
                  return (
                    <motion.div
                      key={part.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.04 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(part)}
                      className={`relative p-5 border cursor-pointer transition-all group ${
                        isSelected
                          ? "border-green-400 bg-green-950/25"
                          : "border-green-900/40 hover:border-green-700 hover:bg-green-950/10"
                      }`}
                    >
                      {/* Badges — top-right */}
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        {part.topPick && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-400 text-black text-[9px] font-bold uppercase tracking-[0.08em]">
                            <Star size={8} fill="black" /> Top Pick
                          </span>
                        )}
                        {part.badge && !part.topPick && (
                          <span className="px-2 py-0.5 border border-green-700 text-green-600 text-[9px] font-bold uppercase tracking-[0.08em]">
                            {part.badge}
                          </span>
                        )}
                      </div>

                      <div className="pr-16">
                        <h3 className={`text-sm font-bold mb-1.5 leading-tight transition-colors ${
                          isSelected ? "text-green-300" : "text-gray-200 group-hover:text-white"
                        }`}>
                          {part.name}
                        </h3>
                        <p className="text-green-800 text-[11px] leading-relaxed mb-3">
                          {part.specs}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 text-sm font-bold">
                            ${part.price.toLocaleString()}
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-green-400 text-[10px] font-bold uppercase tracking-[0.08em]">
                              <Check size={11} /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Prev / Next controls */}
            <div className="flex justify-between mt-6 pt-4 border-t border-green-900/20">
              <button
                onClick={() => setActiveCategoryIndex((i) => Math.max(0, i - 1))}
                disabled={activeCategoryIndex === 0}
                className="px-5 py-2.5 border border-green-900/50 text-green-800 text-xs uppercase tracking-[0.15em] font-bold hover:border-green-700 hover:text-green-600 transition-colors disabled:opacity-30"
              >
                ← Previous
              </button>
              {activeCategoryIndex < CATEGORIES.length - 1 ? (
                <button
                  onClick={() => setActiveCategoryIndex((i) => i + 1)}
                  className="px-5 py-2.5 bg-green-900/30 border border-green-800 text-green-400 text-xs uppercase tracking-[0.15em] font-bold hover:bg-green-900/50 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className="px-5 py-2.5 bg-green-400 text-black text-xs uppercase tracking-[0.15em] font-bold hover:bg-green-300 transition-colors disabled:opacity-40"
                >
                  Submit Build →
                </button>
              )}
            </div>
          </div>

          {/* ── Right: Build Summary (desktop lg+) ──────────────────── */}
          <div className="hidden lg:block lg:w-80 shrink-0">
            <div className="border border-green-900/40 sticky top-28">
              <div className="px-5 py-4 border-b border-green-900/30">
                <span className="text-[10px] uppercase tracking-[0.3em] text-green-700">
                  Build Summary
                </span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {CATEGORIES.map((cat) => {
                  const sel = selections[cat.id];
                  return (
                    <div key={cat.id} className="flex items-start justify-between gap-3">
                      <span className="text-green-800 text-[10px] uppercase tracking-[0.1em] shrink-0 pt-0.5">
                        {cat.label}
                      </span>
                      {sel ? (
                        <div className="text-right">
                          <div className="text-green-400 text-[11px] font-bold leading-tight">
                            {sel.name}
                          </div>
                          <div className="text-green-800 text-[10px] mt-0.5">
                            ${sel.price.toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-green-900 text-[11px] italic">— not selected</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-4 border-t border-green-900/30 space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-green-800 uppercase tracking-[0.12em]">
                      Estimate
                    </div>
                    <div className="text-[9px] text-green-900 mt-0.5">
                      Parts + 15% assembly & test
                    </div>
                  </div>
                  <motion.div
                    key={totalEstimate}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <div className="text-2xl font-bold text-green-300">
                      ${totalEstimate.toLocaleString()}
                    </div>
                  </motion.div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className="w-full py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isComplete
                    ? "Submit Build"
                    : `${selectedCount} / ${CATEGORIES.length} Selected`}
                </button>
                <Link href="/contact">
                  <button className="w-full py-2.5 border border-green-900 text-green-700 text-xs uppercase tracking-[0.12em] hover:border-green-700 hover:text-green-400 transition-colors">
                    Request Custom Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile: Floating Build Cart ───────────────────────────────── */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={() => setSummaryOpen(true)}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.15em] shadow-2xl shadow-black/60"
        >
          <ShoppingCart size={14} />
          {selectedCount}/{CATEGORIES.length} · ${totalEstimate.toLocaleString()}
        </motion.button>
      </div>

      {/* Mobile Build Summary Sheet */}
      <AnimatePresence>
        {summaryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/80 z-50"
              onClick={() => setSummaryOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-green-900/50 z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-green-900/30">
                <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">
                  Build Summary
                </span>
                <button onClick={() => setSummaryOpen(false)}>
                  <X size={18} className="text-green-700 hover:text-green-400 transition-colors" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-3">
                {CATEGORIES.map((cat) => {
                  const sel = selections[cat.id];
                  return (
                    <div key={cat.id} className="flex justify-between gap-4">
                      <span className="text-green-800 text-[10px] uppercase tracking-[0.1em] shrink-0">
                        {cat.label}
                      </span>
                      {sel ? (
                        <div className="text-right">
                          <div className="text-green-400 text-[11px] font-bold leading-tight">
                            {sel.name}
                          </div>
                          <div className="text-green-800 text-[10px] mt-0.5">
                            ${sel.price.toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-green-900 text-[11px] italic">— not selected</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-4 border-t border-green-900/30 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-green-700 uppercase tracking-[0.15em]">
                      Estimate
                    </div>
                    <div className="text-[9px] text-green-900">
                      Parts + 15% assembly & test
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-300">
                    ${totalEstimate.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => { handleSubmit(); setSummaryOpen(false); }}
                  disabled={!isComplete}
                  className="w-full py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors disabled:opacity-40"
                >
                  {isComplete
                    ? "Submit Build"
                    : `${selectedCount} / ${CATEGORIES.length} Components Selected`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
