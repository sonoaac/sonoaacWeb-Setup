import { motion } from "framer-motion";
import { Link } from "wouter";
import { Laptop, Gamepad2, Building2, Tablet, PiggyBank, Tv } from "lucide-react";
import { ScrollCarousel, type CarouselItem } from "@/components/features/ScrollCarousel";

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
    title: "Everyday Laptops",
    subtitle: "Windows & Mac, picked for work, school, and browsing.",
    gradient: "linear-gradient(155deg, #0f2e1c 0%, #04120a 70%)",
    icon: Laptop,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "gaming",
    title: "Gaming Rigs",
    subtitle: "High refresh, dedicated GPU, built to your budget.",
    gradient: "linear-gradient(155deg, #1a2e0f 0%, #0a1206 70%)",
    icon: Gamepad2,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "business",
    title: "Business Desktops",
    subtitle: "Reliable multitasking, built for the office.",
    gradient: "linear-gradient(155deg, #0f2020 0%, #051010 70%)",
    icon: Building2,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "tablets",
    title: "Tablets & iPads",
    subtitle: "Front-desk, POS, scheduling, and on-the-go use.",
    gradient: "linear-gradient(155deg, #12241c 0%, #05120c 70%)",
    icon: Tablet,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "budget",
    title: "Budget Picks",
    subtitle: "Solid and reliable — devices that won't break the bank.",
    gradient: "linear-gradient(155deg, #1c2412 0%, #0c1006 70%)",
    icon: PiggyBank,
    href: "/contact",
    cta: "Get Advice",
  },
  {
    id: "rentals",
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
      {/* Hero */}
      <section className="px-6 pt-20 md:pt-28 pb-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-4">Shop</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Browse the Lineup.</h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-6">
              Sonoaac recommends devices and sets them up for you — swipe through
              what's popular, then talk to us about your specific needs.
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em]">
              <Link href="/rentals">
                <button className="text-green-400 hover:text-green-300 transition-colors underline underline-offset-4">
                  Rent to Own TVs
                </button>
              </Link>
              <Link href="/trade-in">
                <button className="text-green-400 hover:text-green-300 transition-colors underline underline-offset-4">
                  Trade In Your Device
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Tech carousel */}
      <section className="py-10 md:py-16 border-t border-green-900/30">
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <motion.div {...fadeUp} className="inline-block border border-green-800 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-400">My Tech</span>
          </motion.div>
        </div>
        <ScrollCarousel items={MY_TECH_ITEMS} />
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 md:py-24 border-t border-green-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Don't see what you need?</h2>
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
