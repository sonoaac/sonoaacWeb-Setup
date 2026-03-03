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

const webServices = [
  {
    title: "Custom Website Design",
    description: "Tailored design built to reflect your brand. Clean, professional layouts for any industry.",
  },
  {
    title: "Mobile-Responsive Builds",
    description: "Every site is built mobile-first and tested across all screen sizes.",
  },
  {
    title: "SEO Optimization",
    description: "On-page SEO, fast load times, and structured markup to help clients find you.",
  },
  {
    title: "Admin & CMS Integration",
    description: "Easy-to-manage dashboards so you can update content without developer help.",
  },
];

export default function Services() {
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
              — Services
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              IT Support &amp;<br />Digital Solutions
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              From remote troubleshooting to full web development — Sonoaac covers
              the full range of tech needs for individuals and small businesses.
            </p>
            <Link href="/book-consultation">
              <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
                Book Consultation
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* IT Services */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / IT Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Tech Support &amp; Troubleshooting
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Remote IT Support",
                  detail: "Via Zoom, AnyDesk, or TeamViewer. Software errors, OS issues, login problems, virus removal — resolved without a site visit.",
                  path: "/it-support",
                },
                {
                  title: "On-Site Services",
                  detail: "Home and office visits. Hardware setup, network configuration, device installations, and workstation builds.",
                  path: "/on-site-services",
                },
                {
                  title: "Software & App Fixes",
                  detail: "Microsoft 365, app crashes, browser issues, driver errors, and full system troubleshooting for PC and Mac.",
                  path: "/software-fixes",
                },
                {
                  title: "Device Setup & Configuration",
                  detail: "New device setup, PC/laptop resets, software installation, virus protection, and optimization for business or personal use.",
                  path: "/device-setup",
                },
                {
                  title: "Business IT Solutions",
                  detail: "Startup IT setup, business email, workstation rollout, network security, and ongoing IT planning for small businesses.",
                  path: "/business-it",
                },
                {
                  title: "PC/Laptop Reset",
                  detail: "Full system reset and clean reinstall. Removes malware, resolves persistent issues, and restores performance.",
                  path: "/software-fixes",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col sm:flex-row sm:gap-8 py-5 border-b border-green-900/20 group"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-2 sm:mb-0 group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                    <Link href={item.path}>
                      <button className="text-xs text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors w-fit">
                        Details —
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Web Development */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Web Development
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Websites for Small Businesses
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Clean, professional web presence built around your business needs.
              No templates — every site is custom-designed and built for performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20">
              {webServices.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demos */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              03 / Live Demos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-12">
              These are live UI components built for real clients. Fully functional examples
              of what Sonoaac can build for your business.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-6">
                  Beauty &amp; Salon Booking
                </h3>
                <BraidingDemo />
              </div>
              <div>
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-6">
                  Automotive Service Menu
                </h3>
                <MechanicDemo />
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
              — Get Started
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Ready to work together?
            </h2>
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
