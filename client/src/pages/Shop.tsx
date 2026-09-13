import { motion } from "framer-motion";
import { Link } from "wouter";
import { Laptop, Gamepad2, Building2, Tablet, PiggyBank, Tv } from "lucide-react";
import { ScrollCarousel, type CarouselItem } from "@/components/features/ScrollCarousel";
import { ScrambleText } from "@/components/features/ScrambleText";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// Sonoaac recommends devices and helps set them up — it doesn't sell hardware
// directly (see /trade-in and /rentals for the two things it does sell/rent).
const MY_TECH_ITEMS: CarouselItem[] = [
  {
    id: "laptops",
    kicker: "Laptops",
    title: "Everyday Laptops",
    subtitle: "Windows & Mac, picked for work, school, and browsing.",
    gradient: "linear-gradient(155deg, #0f2e1c 0%, #04120a 70%)",
    icon: Laptop,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "gaming",
    kicker: "Gaming",
    title: "Gaming Rigs",
    subtitle: "High refresh, dedicated GPU, built to your budget.",
    gradient: "linear-gradient(155deg, #1a2e0f 0%, #0a1206 70%)",
    icon: Gamepad2,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "business",
    kicker: "Business",
    title: "Business Desktops",
    subtitle: "Reliable multitasking, built for the office.",
    gradient: "linear-gradient(155deg, #0f2020 0%, #051010 70%)",
    icon: Building2,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "tablets",
    kicker: "Tablets",
    title: "Tablets & iPads",
    subtitle: "Front-desk, POS, scheduling, and on-the-go use.",
    gradient: "linear-gradient(155deg, #12241c 0%, #05120c 70%)",
    icon: Tablet,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "budget",
    kicker: "Value",
    title: "Budget Picks",
    subtitle: "Solid and reliable — devices that won't break the bank.",
    gradient: "linear-gradient(155deg, #1c2412 0%, #0c1006 70%)",
    icon: PiggyBank,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "rentals",
    kicker: "Rent to Own",
    title: "Rent-to-Own TVs",
    subtitle: "50% down, fixed monthly, own it outright.",
    gradient: "linear-gradient(155deg, #0f2e1c 0%, #030a06 70%)",
    icon: Tv,
    href: "/rentals",
    cta: "Browse Rentals",
  },
];

export default function Shop() {
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
            <span className="hidden sm:inline">Devices &middot; Rentals &middot; Trade-Ins</span>
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
            <Link href="/rentals">
              <button className="hover:text-green-400 transition-colors">Rent to Own</button>
            </Link>
            <Link href="/trade-in">
              <button className="hover:text-green-400 transition-colors">Trade In</button>
            </Link>
            <Link href="/contact">
              <button className="hover:text-green-400 transition-colors">Get Advice</button>
            </Link>
          </nav>
        </div>
      </section>

      {/* My Tech carousel */}
      <section id="my-tech" className="py-10 md:py-16 border-t border-green-900/30 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <motion.div {...fadeUp} className="inline-block">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-400">My Tech</span>
          </motion.div>
        </div>
        <ScrollCarousel items={MY_TECH_ITEMS} />
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
