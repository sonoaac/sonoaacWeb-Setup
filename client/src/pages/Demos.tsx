import { motion } from "framer-motion";
import { Link } from "wouter";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

interface Demo {
  id: string;
  industry: string;
  title: string;
  blurb: string;
  Component: () => JSX.Element;
}

// Add new demos here — each renders in its own section.
const DEMOS: Demo[] = [
  {
    id: "salon",
    industry: "Beauty / Salon",
    title: "Salon Booking Flow",
    blurb:
      "Pick a style, see pricing, and book an appointment slot — the kind of booking flow a braiding or hair salon needs on its site.",
    Component: BraidingDemo,
  },
  {
    id: "auto",
    industry: "Automotive",
    title: "Auto Service Menu",
    blurb:
      "A service menu with clear pricing and a quote request, built for an auto repair shop.",
    Component: MechanicDemo,
  },
];

export default function Demos() {
  return (
    <div className="min-h-screen bg-black">
      <section className="px-6 pt-20 md:pt-28 pb-10 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-4">Live Demos</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">See It In Action</h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
              Fully functional UI components built for real client industries — this is the
              kind of thing Sonoaac builds into a site.
            </p>
          </motion.div>
        </div>
      </section>

      {DEMOS.map((demo) => {
        const Comp = demo.Component;
        return (
          <section key={demo.id} className="px-6 py-14 md:py-20 border-b border-green-900/30">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
                  {demo.industry}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{demo.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl mb-8">{demo.blurb}</p>
                <Comp />
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want one built for your business?
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              Tell us your industry and what customers need to do on your site, and we'll
              build it in.
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
