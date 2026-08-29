import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function BookConsultation() {
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
              — Book a Consultation
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Talk<br />About Your Tech.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
              Get expert advice for your tech needs. Available for individuals and
              businesses worldwide. Remote and in-person options available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Send a Message
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / What to Expect
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              What We Cover
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "IT Consultations",
                  detail: "Review your current setup, identify issues, and get clear recommendations — no jargon.",
                },
                {
                  title: "Device Planning",
                  detail: "Not sure what to buy? We'll match you with the right laptop, desktop, iPad, or setup for your workflow.",
                },
                {
                  title: "Business Tech Strategy",
                  detail: "Plan your IT infrastructure for a new or growing business. Email, workstations, security, and more.",
                },
                {
                  title: "Web Project Scoping",
                  detail: "Discuss your website needs and get a clear scope, timeline, and quote for your project.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-green-900 pl-5 py-1 hover:border-green-600 transition-colors"
                >
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.15em] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Appointment policy */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Appointments
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Scheduling Policy
            </h2>
            <ul className="space-y-4 list-disc pl-5 marker:text-green-400">
              {[
                "All consultations are by appointment — book online or contact us",
                "Walk-in consultations are available at an additional charge",
                "Remote consultations are available worldwide via Zoom",
                "On-site consultations are confirmed after booking and availability check",
                "Please review the Service Agreement before your first appointment",
              ].map((item) => (
                <li key={item} className="text-gray-300 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/service-agreement">
                <button className="text-xs text-green-800 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                  Read Service Agreement —
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact info */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              03 / Contact
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Reach Out Directly
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-green-800 pl-5">
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">Email</h3>
                <p className="text-white text-sm">sonoaac@gmail.com</p>
              </div>
              <div className="border-l-2 border-green-800 pl-5">
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">Phone</h3>
                <p className="text-white text-sm">(862) 423-8875</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Ready?
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Book your consultation today.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Now
                </button>
              </Link>
              <Link href="/it-support">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  IT Support
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
