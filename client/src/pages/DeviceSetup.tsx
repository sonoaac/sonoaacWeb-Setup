import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function DeviceSetup() {
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
              — Device Setup
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-green-100 mb-6">
              Device Setup &amp;<br />Configuration
            </h1>
            <p className="text-green-600 text-base leading-relaxed max-w-xl mb-8">
              Get your new or existing device fully configured, optimized, and secured.
              Business and personal setups — done right the first time.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Setup My Device
                </button>
              </Link>
              <Link href="/buy-ready-computer">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Device Recommendations
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
              01 / What We Do
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-green-100 mb-10">
              Setup Services
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "New Device Setup",
                  detail: "Unboxing, account setup, software installation, security configuration, and optimization. Ready to use from day one.",
                },
                {
                  title: "PC & Laptop Reset",
                  detail: "Full system reset and clean reinstall. Removes accumulated issues, malware, and performance problems.",
                },
                {
                  title: "Software Installation",
                  detail: "Install and configure the applications you need — Microsoft 365, Adobe, QuickBooks, browsers, and more.",
                },
                {
                  title: "Security Setup",
                  detail: "Antivirus installation, Windows Security configuration, and basic security hardening for your device.",
                },
                {
                  title: "Data Transfer",
                  detail: "Move files, photos, and documents from old device to new. Safely backed up before any work begins.",
                },
                {
                  title: "Account Configuration",
                  detail: "Email accounts, cloud storage (Google Drive, OneDrive), printers, and peripheral devices all connected and working.",
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
                  <h3 className="text-xs font-bold text-green-300 uppercase tracking-[0.15em] sm:w-48 shrink-0 mb-2 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-green-600 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get Set Up
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-green-100 mb-8">
              Ready to set up your device?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Appointment
                </button>
              </Link>
              <Link href="/buy-ready-computer">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Need a New Device?
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
