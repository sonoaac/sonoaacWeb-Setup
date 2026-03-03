import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const services = [
  {
    num: "01",
    title: "Remote IT Support",
    description:
      "Troubleshooting and diagnostics via Zoom, AnyDesk, or TeamViewer. Software errors, OS issues, login problems, and virus removal — handled remotely, worldwide.",
  },
  {
    num: "02",
    title: "On-Site Services",
    description:
      "Home and office visits for hardware setup, network configuration, device installations, and workstation builds. Scheduled by appointment.",
  },
  {
    num: "03",
    title: "Software & App Fixes",
    description:
      "Microsoft 365, app crashes, browser issues, driver errors, and full OS troubleshooting. Fast, professional resolution for all platforms.",
  },
  {
    num: "04",
    title: "Device Setup & Sales",
    description:
      "New device configuration, PC and laptop resets, software installation, and virus protection. Ready-to-use setups for business or personal use.",
  },
  {
    num: "05",
    title: "Web Development",
    description:
      "Clean, professional websites for small businesses. Custom design, mobile-responsive layouts, and SEO-optimized builds tailored to your brand.",
  },
  {
    num: "06",
    title: "Business IT Solutions",
    description:
      "Startup IT setup, business email, workstation rollout, network security, and growth planning. Full-scope IT support for small businesses.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="px-6 py-20 md:py-36 border-b border-green-900/30 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-8">
                — IT Support &amp; Digital Solutions
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Fast. Reliable.<br />
                Tech Support<br />
                <span className="text-green-400">On Your Terms.</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-10">
                Remote and in-person IT support, web development, and device solutions
                for individuals and small businesses. Operated by a registered U.S.
                IT Support &amp; Digital Solutions Specialist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/book-consultation">
                  <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                    Book Consultation
                  </button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 hover:text-green-300 transition-colors w-full sm:w-auto">
                    View Services
                  </button>
                </Link>
              </div>
              <p className="text-green-900 text-xs uppercase tracking-[0.25em]">
                Services by appointment — walk-ins available at additional charge
              </p>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="/images/sncimg1cloudscomputing.png"
                alt="Cloud computing and IT support"
                className="w-full max-w-md mx-auto opacity-90"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
              What We Do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-green-900/20">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-black p-6 hover:bg-green-950/30 transition-colors group"
              >
                <span className="text-xs text-green-900 tracking-[0.3em] block mb-4 font-bold">
                  {service.num}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3 group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / How We Work
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Appointment-Based Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-2 border-green-800 pl-6">
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-3">
                  Remote Support
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Secure sessions via Zoom, AnyDesk, or TeamViewer. Available globally.
                  Fast resolution without leaving your home or office.
                </p>
                <Link href="/it-support">
                  <button className="text-xs text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors">
                    Learn more —
                  </button>
                </Link>
              </div>
              <div className="border-l-2 border-green-800 pl-6">
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-3">
                  In-Person Service
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Home and office visits for hardware, networking, and device work.
                  Scheduled by appointment after booking confirmation.
                </p>
                <Link href="/on-site-services">
                  <button className="text-xs text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors">
                    Learn more —
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sonoaac */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              03 / Why Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Why Choose Sonoaac
            </h2>
            <ul className="space-y-4 list-disc pl-5 marker:text-green-400">
              {[
                "Registered U.S. business — IT Support & Digital Solutions Specialist",
                "One-on-one personalized service, not a call center",
                "Remote support globally via Zoom, AnyDesk, and TeamViewer",
                "In-person service for homes and small businesses",
                "Honest recommendations — no unnecessary upselling",
                "Software recommendations are non-refundable — Sonoaac advises, does not sell",
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
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get Started
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for reliable<br />tech support?
            </h2>
            <p className="text-gray-300 text-base mb-10 max-w-md">
              Book a consultation or reach out. We'll get your tech sorted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Consultation
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
