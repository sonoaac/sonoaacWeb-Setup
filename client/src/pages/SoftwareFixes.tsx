import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function SoftwareFixes() {
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
              — Software Fixes
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Software &amp; App<br />Troubleshooting
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
              Resolve app crashes, OS errors, login issues, and slow performance.
              Fast, professional troubleshooting for Windows and Mac — remote or in-person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Fix My Issue
                </button>
              </Link>
              <Link href="/it-support">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Request IT Support
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we fix */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / What We Fix
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Common Issues Resolved
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20">
              {[
                {
                  title: "Virus & Malware Removal",
                  detail: "Full system scan and removal using professional tools. Includes security hardening to prevent reinfection.",
                },
                {
                  title: "Microsoft 365 Issues",
                  detail: "Outlook not syncing, Teams errors, Word/Excel crashes, licensing problems, and OneDrive issues.",
                },
                {
                  title: "OS Errors & Blue Screens",
                  detail: "Windows stop errors, boot failures, update issues, and system file corruption — diagnosed and repaired.",
                },
                {
                  title: "App Crashes & Freezes",
                  detail: "Any application that won't launch, crashes on use, or runs slowly — diagnosed and resolved.",
                },
                {
                  title: "Login & Account Issues",
                  detail: "Forgotten passwords, account lockouts, two-factor authentication problems, and account recovery.",
                },
                {
                  title: "Driver & Hardware Issues",
                  detail: "Audio, display, USB, network adapters, and peripheral drivers — updated, replaced, or fixed.",
                },
                {
                  title: "Performance Issues",
                  detail: "Slow startup, high CPU/RAM usage, disk errors, and bloatware removal for faster performance.",
                },
                {
                  title: "PC/Laptop Full Reset",
                  detail: "Clean OS reinstall when issues are beyond repair. All data backed up before any reset begins.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
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

      {/* Software disclaimer */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Software Policy
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Software Purchases
            </h2>
            <div className="border-l-2 border-green-800 pl-6">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Sonoaac recommends software solutions — we do not sell software directly.
                All software is purchased by the client through official channels.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Software purchases are non-refundable once acquired. We recommend only
                what is needed and appropriate for your situation.
              </p>
              <Link href="/service-agreement">
                <button className="text-xs text-green-800 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                  Read Full Service Agreement —
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get Help
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Software giving you trouble?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Appointment
                </button>
              </Link>
              <Link href="/it-support">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Remote IT Support
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
