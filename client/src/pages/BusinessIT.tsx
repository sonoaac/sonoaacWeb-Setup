import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function BusinessIT() {
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
              — Business IT
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Small Business<br />IT Solutions
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
              Full-scope IT support for small businesses — from day-one setup to
              ongoing tech management. Built for founders, operators, and growing teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Business Consultation
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / What We Offer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Business IT Services
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Startup IT Setup",
                  detail: "Get your business tech off the ground. Workstations, accounts, email, and core software configured from day one.",
                },
                {
                  title: "Business Email & Tools",
                  detail: "Microsoft 365 or Google Workspace setup. Professional email, shared calendars, and collaboration tools.",
                },
                {
                  title: "Workstation Rollout",
                  detail: "Multiple computers deployed with consistent configuration, security, and accounts. Ready for your team.",
                },
                {
                  title: "Security Fundamentals",
                  detail: "Antivirus, backup strategy, account security, and basic network hardening to protect your business.",
                },
                {
                  title: "Network Configuration",
                  detail: "Business WiFi, wired networks, and basic infrastructure for reliable connectivity.",
                },
                {
                  title: "Ongoing IT Support",
                  detail: "Recurring support for software issues, updates, new hires, and day-to-day tech problems.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col sm:flex-row sm:gap-8 py-5 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] sm:w-52 shrink-0 mb-2 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Who It's For
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Built for Small Businesses
            </h2>
            <ul className="space-y-3 list-disc pl-5 marker:text-green-400">
              {[
                "Startups getting their first IT setup",
                "Service businesses — salons, shops, mechanic shops, restaurants",
                "Retail and small office environments",
                "Freelancers and solo operators who need a professional setup",
                "Growing teams adding workstations and user accounts",
              ].map((item) => (
                <li key={item} className="text-gray-300 text-sm">
                  {item}
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
              — Get Started
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Ready to build your business tech?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Business Consultation
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
