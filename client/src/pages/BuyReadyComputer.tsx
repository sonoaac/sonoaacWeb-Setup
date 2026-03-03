import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function BuyReadyComputer() {
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
              — Device Recommendations
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Get the Right Device<br />for Your Needs.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-4">
              Not sure what to buy? We'll recommend the right laptop, desktop, or iPad
              for your workflow — then configure it for you before delivery.
            </p>
            <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-8">
              Sonoaac recommends — we do not sell hardware directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Request Device Recommendation
                </button>
              </Link>
              <Link href="/device-setup">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Setup My Device
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PC showcase images */}
      <section className="px-6 py-12 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="/images/gaming-pc-builder.webp"
              alt="PC components and hardware"
              className="w-full h-56 object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/gamingpc.jpg"
              alt="Custom gaming PC build"
              className="w-full h-56 object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / How It Works
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
                  title: "We set it up",
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
              02 / Device Types
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              What We Recommend
            </h2>
            <ul className="space-y-3">
              {[
                "Laptops — Windows and Mac, for work, school, and business",
                "Desktops — high-performance systems for invoicing, editing, or multitasking",
                "iPads — ideal for front-desk, POS, scheduling, and customer-facing use",
                "Custom PC builds — spec'd to your exact needs and budget",
                "Budget picks — solid, reliable devices that won't break the bank",
              ].map((item) => (
                <li key={item} className="flex gap-4 text-gray-300 text-sm">
                  <span className="text-green-400 font-bold shrink-0">//</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get a Recommendation
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Not sure what to buy?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/my-tech">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Get Tech Matched
                </button>
              </Link>
              <Link href="/book-consultation">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
