import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function OnSiteServices() {
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
              — On-Site Services
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              We Come to You.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
              Home and office visits for hardware setup, network configuration, device
              installations, and hands-on troubleshooting. All scheduled by appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Request On-Site Service
                </button>
              </Link>
              <Link href="/book-consultation">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
            </div>
            <p className="text-green-900 text-xs uppercase tracking-[0.2em]">
              Walk-ins available at additional charge
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / What We Do
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              On-Site Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20">
              {[
                {
                  title: "Home Visits",
                  detail: "Device setup, troubleshooting, router configuration, and software installation at your home.",
                },
                {
                  title: "Office Visits",
                  detail: "Workstation setup, printer installation, network config, and multi-device environments.",
                },
                {
                  title: "Workstation Setup",
                  detail: "Full PC or Mac setup — hardware, OS configuration, software, accounts, and security.",
                },
                {
                  title: "Device Installations",
                  detail: "Printers, monitors, NAS drives, routers, switches, and peripheral device installations.",
                },
                {
                  title: "Network Configuration",
                  detail: "WiFi setup, wired networks, mesh systems, and basic firewall configuration for homes and offices.",
                },
                {
                  title: "Hardware Troubleshooting",
                  detail: "Component diagnosis, repair coordination, and hands-on fixes for hardware issues.",
                },
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

      {/* Policy */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Scheduling
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              How It Works
            </h2>
            <ul className="space-y-4">
              {[
                "Book online or contact us to request an on-site visit",
                "Availability confirmed after booking — we'll confirm date and time",
                "Walk-ins are available at an additional charge",
                "Service area and travel fees discussed at booking",
                "Please have devices accessible and accounts ready before the visit",
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
              — Schedule a Visit
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Need hands-on help?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Request On-Site Service
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
