import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ITSupport() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
                — IT Support
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                IT Support &amp;<br />Troubleshooting
              </h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
                Remote and in-person tech support for individuals and small businesses.
                Fast, professional resolution for software, hardware, and network issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-consultation">
                  <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                    Request IT Support
                  </button>
                </Link>
                <Link href="/book-consultation">
                  <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                    Book Consultation
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="/images/sncimg1cloudscomputing.png"
                alt="Remote IT support and cloud computing"
                className="w-full max-w-sm mx-auto opacity-90"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Remote Support */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / Remote Support
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Secure Remote Sessions
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-8">
              Connect with a specialist via Zoom, AnyDesk, or TeamViewer. No travel required.
              Fast response for issues that need immediate attention.
            </p>
            <ul className="space-y-3">
              {[
                "Virus and malware removal",
                "Microsoft 365 setup and troubleshooting",
                "App crashes and software errors",
                "OS errors and slow system performance",
                "Email configuration and login recovery",
                "Driver issues and system updates",
                "Security audits and basic hardening",
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

      {/* On-Site */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / On-Site Support
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              In-Person When You Need It
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-6">
              Some issues need hands-on attention. On-site visits are scheduled by appointment
              after booking and availability confirmation.
            </p>
            <Link href="/on-site-services">
              <button className="px-6 py-3 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                On-Site Services —
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get Help Now
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Having a tech issue?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Request IT Support
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
