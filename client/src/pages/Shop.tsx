import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Laptop, Tv, Monitor, Smartphone, Tablet, type LucideIcon } from "lucide-react";
import { ScrambleText } from "@/components/features/ScrambleText";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

interface ShopItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

// Sonoaac recommends devices and helps set them up — it doesn't sell hardware
// directly (see /trade-in for the one thing it does buy).
const CATEGORIES = ["Laptops", "TV", "Desktops", "Phones", "Tablets"];

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "laptops",
    category: "Laptops",
    title: "Laptops",
    subtitle: "Windows & Mac, picked for work, school, and browsing.",
    icon: Laptop,
  },
  {
    id: "tv",
    category: "TV",
    title: "TVs",
    subtitle: "Smart TVs sized and set up for your space.",
    icon: Tv,
  },
  {
    id: "desktops",
    category: "Desktops",
    title: "Desktops",
    subtitle: "Reliable towers and all-in-ones for home or office.",
    icon: Monitor,
  },
  {
    id: "phones",
    category: "Phones",
    title: "Phones",
    subtitle: "Everyday and business smartphones, set up and ready to go.",
    icon: Smartphone,
  },
  {
    id: "tablets",
    category: "Tablets",
    title: "Tablets",
    subtitle: "iPads and Android tablets for work, school, or the front desk.",
    icon: Tablet,
  },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(
    () => (activeCategory === "All" ? SHOP_ITEMS : SHOP_ITEMS.filter((item) => item.category === activeCategory)),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Masthead */}
      <section className="border-t border-black">
        <div className="max-w-5xl mx-auto px-6">
          {/* Meta line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between py-3 border-b border-green-900/30 text-[10px] uppercase tracking-[0.25em] text-green-800"
          >
            <span>Sonoaac Edition</span>
            <span className="hidden sm:inline">Devices &middot; Trade-Ins</span>
          </motion.div>

          {/* Nameplate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-center py-10 md:py-14 border-b border-black"
          >
            <ScrambleText
              as="h1"
              text="The Sonoaac Shop"
              className="text-white"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                fontSize: "clamp(2.75rem, 9vw, 6rem)",
                lineHeight: 0.95,
              }}
            />
            <p className="text-gray-400 text-xs md:text-sm mt-4 max-w-md mx-auto leading-relaxed">
              Sonoaac recommends devices and sets them up for you — browse the
              lineup, then talk to us about your specific needs.
            </p>
          </motion.div>

          {/* Section index */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">
            <a href="#my-tech" className="hover:text-green-400 transition-colors">My Tech</a>
            <Link href="/trade-in">
              <button className="hover:text-green-400 transition-colors">Trade In</button>
            </Link>
            <Link href="/contact">
              <button className="hover:text-green-400 transition-colors">Get Advice</button>
            </Link>
          </nav>
        </div>
      </section>

      {/* My Tech: filter + grid */}
      <section id="my-tech" className="py-10 md:py-16 border-t border-green-900/30 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-400">My Tech</span>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Filter sidebar */}
            <aside className="md:w-36 shrink-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">Filter</p>
              <div className="flex flex-wrap md:flex-col gap-x-5 gap-y-2 md:gap-y-3 md:sticky md:top-24">
                {["All", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs uppercase tracking-[0.15em] text-left transition-colors ${
                      activeCategory === cat
                        ? "text-white font-bold underline underline-offset-4"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 flex-1">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.id} href="/contact">
                    <div className="group border border-black p-6 h-full flex flex-col cursor-pointer hover:bg-black/[0.03] transition-colors">
                      <Icon size={26} strokeWidth={1} className="text-white mb-5" />
                      <h3
                        className="font-bold text-base uppercase mb-2 text-white"
                        style={{ fontFamily: "'Times New Roman', Times, serif", letterSpacing: "-0.01em" }}
                      >
                        {item.title}
                      </h3>
                      <div className="h-px w-8 bg-black mb-2" />
                      <p className="text-xs text-gray-400 leading-relaxed mb-5 flex-1">{item.subtitle}</p>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        Get Advice &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 md:py-24 border-t border-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              }}
            >
              Don't See What You Need?
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              Tell us what you're looking for and we'll point you the right way.
              Sonoaac recommends — we don't sell hardware directly.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
                Talk to Us
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
