import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import TechMatcher from "@/components/features/TechMatcher";

// ── Find Your Match — Pre-built PC Data ─────────────────────────────────────

type PrebuiltPC = {
  id: number;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  price: number;
  useCases: string[];   // gaming | work | editing | light
  brand: string;        // windows | mac
  badge?: string;
};

const PREBUILTS: PrebuiltPC[] = [
  { id: 1,  name: "Lenovo Legion Tower 7i",    cpu: "Core Ultra 7 265K", gpu: "RTX 4080 Super", ram: "32GB", storage: "1TB SSD",  price: 1999, useCases: ["gaming"],           brand: "windows", badge: "Best Seller" },
  { id: 2,  name: "Acer Predator Orion 7000",  cpu: "i9-14900K",         gpu: "RTX 4080",       ram: "32GB", storage: "2TB SSD",  price: 1799, useCases: ["gaming"],           brand: "windows"                        },
  { id: 3,  name: "ASUS ROG Strix G16 Laptop", cpu: "Intel Ultra 9 275HX",gpu:"RTX 5090",       ram: "32GB", storage: "2TB SSD",  price: 3499, useCases: ["gaming", "editing"],brand: "windows", badge: "Flagship"   },
  { id: 4,  name: "MSI MEG Infinite X2",       cpu: "Core Ultra 9 285K", gpu: "RTX 4090",       ram: "64GB", storage: "2TB SSD",  price: 3999, useCases: ["gaming", "editing"],brand: "windows"                        },
  { id: 5,  name: "Dell XPS Desktop",          cpu: "Core Ultra 7",      gpu: "RTX 4070 Ti",    ram: "32GB", storage: "1TB SSD",  price: 1499, useCases: ["work", "editing"],  brand: "windows", badge: "Professional"},
  { id: 6,  name: "HP OMEN 45L",               cpu: "Ryzen 9 7950X",     gpu: "RTX 4090",       ram: "64GB", storage: "2TB SSD",  price: 2999, useCases: ["editing", "gaming"],brand: "windows"                        },
  { id: 7,  name: "Apple Mac Studio (M4 Max)", cpu: "M4 Max",            gpu: "40-core GPU",    ram: "64GB", storage: "1TB SSD",  price: 2199, useCases: ["editing", "work"],  brand: "mac",     badge: "Mac Pick"   },
  { id: 8,  name: "Apple Mac Mini (M4)",       cpu: "M4",                gpu: "10-core GPU",    ram: "16GB", storage: "256GB SSD",price: 599,  useCases: ["work", "light"],    brand: "mac",     badge: "Popular"    },
  { id: 9,  name: "HP Pavilion Desktop",       cpu: "Ryzen 5 7600",      gpu: "RX 7600",        ram: "16GB", storage: "512GB SSD",price: 649,  useCases: ["work", "light"],    brand: "windows", badge: "Budget Pick" },
  { id: 10, name: "Microsoft Surface Pro 11",  cpu: "Snapdragon X Elite",gpu: "Integrated",     ram: "16GB", storage: "512GB SSD",price: 999,  useCases: ["work", "light"],    brand: "windows", badge: "Portable"   },
];

const BUDGETS   = ["Any", "Under $1,000", "$1,000–$2,000", "$2,000+"] as const;
const USE_CASES = ["Any", "Gaming", "Work & School", "Video Editing", "Light Use"] as const;
const BRANDS    = ["Any", "Windows", "Mac"] as const;

type Budget   = typeof BUDGETS[number];
type UseCase  = typeof USE_CASES[number];
type Brand    = typeof BRANDS[number];

const USE_CASE_KEY: Record<UseCase, string> = {
  "Any": "",  "Gaming": "gaming",  "Work & School": "work",
  "Video Editing": "editing",  "Light Use": "light",
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const inputClass =
  "w-full px-4 py-3 bg-black border border-green-900 text-white text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";

const selectClass =
  "w-full px-4 py-3 bg-black border border-green-900 text-white text-sm focus:border-green-500 focus:outline-none transition-colors appearance-none";

export default function MyTech() {
  const [matcherOpen, setMatcherOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Find Your Match filters
  const [budget, setBudget]     = useState<Budget>("Any");
  const [useCase, setUseCase]   = useState<UseCase>("Any");
  const [brand, setBrand]       = useState<Brand>("Any");

  const matchedPCs = useMemo(() => {
    return PREBUILTS.filter((pc) => {
      if (budget === "Under $1,000"   && pc.price >= 1000) return false;
      if (budget === "$1,000–$2,000"  && (pc.price < 1000 || pc.price > 2000)) return false;
      if (budget === "$2,000+"        && pc.price <= 2000) return false;
      if (useCase !== "Any" && !pc.useCases.includes(USE_CASE_KEY[useCase])) return false;
      if (brand === "Windows" && pc.brand !== "windows") return false;
      if (brand === "Mac"     && pc.brand !== "mac")     return false;
      return true;
    });
  }, [budget, useCase, brand]);

  const [formData, setFormData] = useState({
    businessOrPersonal: "",
    deviceType: "",
    useCase: "",
    mustHaves: "",
    contact: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ businessOrPersonal: "", deviceType: "", useCase: "", mustHaves: "", contact: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black">

      {/* Hero */}
      <section className="px-6 py-20 md:py-32 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              My Tech
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Get Matched to<br />the Right Device.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-4">
              Not sure what to buy? Tell us your needs and we'll recommend the right
              laptop, desktop, iPad, or custom PC — then configure it completely for you.
            </p>
            <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-8">
              Sonoaac recommends — we do not sell hardware directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setMatcherOpen(true)}
                className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors text-center"
              >
                Launch TechMatcher
              </button>
              <a href="#recommendation" className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors text-center">
                Get Matched
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Find Your Match ──────────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Find Your Match</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Filter by Your Needs
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Set your filters and we'll show matching pre-built options. We recommend where to buy — you purchase directly.
            </p>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {/* Budget */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-green-800 mb-2">Budget</p>
                <div className="flex flex-col gap-1.5">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-2 text-xs text-left uppercase tracking-[0.12em] font-bold border transition-colors ${
                        budget === b
                          ? "bg-green-400 text-black border-green-400"
                          : "border-green-900/40 text-green-800 hover:border-green-700 hover:text-green-500"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Use Case */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-green-800 mb-2">Main Use</p>
                <div className="flex flex-col gap-1.5">
                  {USE_CASES.map((u) => (
                    <button
                      key={u}
                      onClick={() => setUseCase(u)}
                      className={`px-3 py-2 text-xs text-left uppercase tracking-[0.12em] font-bold border transition-colors ${
                        useCase === u
                          ? "bg-green-400 text-black border-green-400"
                          : "border-green-900/40 text-green-800 hover:border-green-700 hover:text-green-500"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-green-800 mb-2">Platform</p>
                <div className="flex flex-col gap-1.5">
                  {BRANDS.map((br) => (
                    <button
                      key={br}
                      onClick={() => setBrand(br)}
                      className={`px-3 py-2 text-xs text-left uppercase tracking-[0.12em] font-bold border transition-colors ${
                        brand === br
                          ? "bg-green-400 text-black border-green-400"
                          : "border-green-900/40 text-green-800 hover:border-green-700 hover:text-green-500"
                      }`}
                    >
                      {br}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-green-700">
                {matchedPCs.length} match{matchedPCs.length !== 1 ? "es" : ""} found
              </p>
            </div>

            {matchedPCs.length === 0 ? (
              <div className="border border-green-900/30 p-8 text-center">
                <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-2">No exact matches</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters, or
                  {" "}<Link href="/contact"><button className="text-green-500 hover:text-green-300 transition-colors underline underline-offset-2">book a consultation</button></Link>
                  {" "}for a custom recommendation.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                  {matchedPCs.map((pc) => (
                    <motion.div
                      key={pc.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="border border-green-900/40 p-5 hover:border-green-700 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.1em] leading-tight group-hover:text-green-400 transition-colors">
                          {pc.name}
                        </h3>
                        {pc.badge && (
                          <span className="ml-2 shrink-0 px-2 py-0.5 border border-green-700 text-green-600 text-[9px] font-bold uppercase tracking-[0.08em]">
                            {pc.badge}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 mb-4">
                        {[["CPU", pc.cpu], ["GPU", pc.gpu], ["RAM", pc.ram], ["Storage", pc.storage]].map(([label, val]) => (
                          <div key={label} className="flex gap-3 text-[11px]">
                            <span className="text-green-900 uppercase tracking-[0.1em] w-14 shrink-0">{label}</span>
                            <span className="text-gray-400">{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-bold text-sm">~${pc.price.toLocaleString()}</span>
                        <Link href="/contact">
                          <button className="text-[10px] text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors">
                            Book Consult →
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              How It Works
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Our Recommendation Process
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Tell us your needs",
                  detail: "We ask about your use case, budget, and preferences — work, school, business, creative, or general use.",
                },
                {
                  step: "02",
                  title: "We recommend the right device",
                  detail: "Based on your needs, we recommend specific models — laptop, desktop, iPad, or Mac — with clear reasoning.",
                },
                {
                  step: "03",
                  title: "You purchase directly",
                  detail: "Sonoaac does not sell hardware. We recommend where to buy. You purchase from the retailer of your choice.",
                },
                {
                  step: "04",
                  title: "We set it up for you",
                  detail: "Once you have the device, we configure it completely — accounts, software, security, and optimization.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 sm:gap-10">
                  <span className="text-green-900 font-bold text-xs tracking-[0.3em] shrink-0 mt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Device types */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Device Types
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              What We Recommend
            </h2>
            <ul className="space-y-4 list-disc pl-5 marker:text-green-400">
              {[
                "Laptops — Windows and Mac, for work, school, and business",
                "Desktops — high-performance systems for invoicing, editing, or multitasking",
                "iPads — ideal for front-desk, POS, scheduling, and customer-facing use",
                "Custom PC builds — spec'd to your exact needs and budget",
                "Budget picks — solid, reliable devices that won't break the bank",
              ].map((item) => (
                <li key={item} className="text-gray-300 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Who It's For
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Perfect for Any Use Case
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-green-900/20">
              {[
                { title: "Mechanic Shops", detail: "Invoicing, QuickBooks, parts lookup, and front-desk management." },
                { title: "Beauty & Salons", detail: "Scheduling, POS, customer management, and front-desk iPads." },
                { title: "Restaurants & Food", detail: "POS setup, inventory, online ordering, and kitchen displays." },
                { title: "Retail & Small Offices", detail: "Workstations, POS, inventory, and multi-user environments." },
                { title: "Students", detail: "Reliable laptops for school, notes, research, and creative work." },
                { title: "Personal Use", detail: "Everyday computing — web browsing, media, video calls, and more." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example setups */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Example Setups
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Common Recommendations
            </h2>
            <div className="space-y-0">
              {[
                {
                  title: "Front Desk iPad Setup",
                  detail: "iPad with scheduling app, POS, and digital forms. Great for check-ins, payments, and customer-facing interactions. Wall-mounted or stand-mounted with card reader.",
                },
                {
                  title: "Small Business Desktop",
                  detail: "Full tower or compact desktop for invoicing, QuickBooks, document management, and multitasking. Dual-monitor setup recommended for productivity.",
                },
                {
                  title: "Mobile Laptop Setup",
                  detail: "Lightweight laptop for travel, school, and everyday use. Fully configured on-site with all software, virus protection, and accounts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col sm:flex-row sm:gap-8 py-5 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-2 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Build a Custom PC */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Custom PC Builds
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Build Your Own PC
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-8">
              Want something spec'd exactly to your needs? Use our PC builder to select
              your components — processor, GPU, RAM, storage, case, and power supply —
              then request a quote for assembly.
            </p>
            <Link href="/my-tech/build-pc">
              <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
                Open PC Builder
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recommendation form */}
      <section id="recommendation" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Get Matched
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tell Us What You Need
            </h2>
            <p className="text-gray-300 text-sm mb-10 leading-relaxed">
              Answer a few quick questions and we'll match you with the right setup.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-green-700 p-8"
              >
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-3">
                  Request Received
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We'll reach out to confirm your needs. After a quick consult,
                  we'll send a custom recommendation with exact specs and pricing.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Business or Personal?
                  </label>
                  <select
                    name="businessOrPersonal"
                    value={formData.businessOrPersonal}
                    onChange={handleInputChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select...</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Device Type
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleInputChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select device...</option>
                    <option value="laptop">Laptop</option>
                    <option value="desktop">Desktop</option>
                    <option value="ipad">iPad</option>
                    <option value="custom-pc">Custom PC Build</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    What do you need it for?
                  </label>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    placeholder="e.g. invoicing, scheduling, school, editing, trading, gaming, POS..."
                    required
                    className={inputClass + " resize-none"}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Any must-haves?
                  </label>
                  <textarea
                    name="mustHaves"
                    value={formData.mustHaves}
                    onChange={handleInputChange}
                    placeholder="e.g. touchscreen, large screen, lightweight, lots of storage..."
                    className={inputClass + " resize-none"}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="your@email.com or (123) 456-7890"
                    required
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors"
                >
                  Request My Recommendation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* TechMatcher modal */}
      <AnimatePresence>
        {matcherOpen && <TechMatcher onClose={() => setMatcherOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
