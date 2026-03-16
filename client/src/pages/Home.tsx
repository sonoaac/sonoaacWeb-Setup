import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import MonitorIntro from "@/components/features/MonitorIntro";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("sonoaac-intro");
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("sonoaac-intro", "1");
    } catch {}
  };

  return (
    <>
      {showIntro && <MonitorIntro onComplete={handleIntroComplete} />}
      <div className="min-h-screen bg-black">

      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-32 border-b border-green-900/30 min-h-[88vh] flex items-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              Sonoaac · IT Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fast, Friendly IT Help.<br />
              <span className="text-green-400">On-Site. Remote. Anywhere.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              NYC-based tech support for homes, freelancers, and small businesses.
              Remote troubleshooting, on-site visits, device setup, custom PC builds,
              and web development — all under one name.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors inline-flex items-center gap-2">
                  Book a Consultation <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                  See All Services
                </button>
              </Link>
            </div>

            {/* Stat strip */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-green-900/30">
              {[
                ["Remote + On-Site", "Two ways to help"],
                ["NYC Based", "Tri-state area coverage"],
                ["Registered US Business", "Licensed & insured"],
                ["By Appointment", "Same-day often available"],
              ].map(([label, sub]) => (
                <div key={label}>
                  <div className="text-xs font-bold text-white uppercase tracking-[0.15em]">{label}</div>
                  <div className="text-xs text-green-800 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Services + Why Us ─────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 border-b border-green-900/30">
        <div className="max-w-5xl mx-auto">

          <motion.div {...fadeUp} className="mb-10">
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              What We Do
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20 mb-16">
            {[
              {
                title: "Remote IT Support",
                detail:
                  "Virus removal, Microsoft 365, OS errors, app crashes, email config, driver issues, and security audits — via Zoom, AnyDesk, or TeamViewer. No site visit needed.",
                link: "/services#remote",
              },
              {
                title: "On-Site Services",
                detail:
                  "Home and office visits for workstation setup, network configuration, hardware installs, and hands-on troubleshooting. We come to you.",
                link: "/services#onsite",
              },
              {
                title: "Business IT Solutions",
                detail:
                  "Startup IT planning, business email & Microsoft 365, workstation rollouts, security fundamentals, network setup, and ongoing IT support for small teams.",
                link: "/services#business",
              },
              {
                title: "Devices & Custom Builds",
                detail:
                  "Device recommendations, new device setup, PC/laptop resets, custom PC builds, data transfers, and our TechMatcher tool to find your perfect setup.",
                link: "/my-tech",
              },
              {
                title: "Software & App Fixes",
                detail:
                  "Full PC/laptop resets, performance issues, malware removal, login problems, driver errors, and Microsoft 365 troubleshooting for Windows and Mac.",
                link: "/services#software",
              },
              {
                title: "Web Development",
                detail:
                  "Custom websites for small businesses. Mobile-responsive, SEO-optimized, with admin dashboards. No templates — built from scratch for your brand.",
                link: "/services#web",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-black p-7 hover:bg-green-950/20 transition-colors group"
              >
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3 group-hover:text-green-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{item.detail}</p>
                <Link href={item.link}>
                  <button className="text-xs text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors">
                    Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Why Sonoaac */}
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Why Sonoaac
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Built on Trust</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  point: "Registered US Business",
                  sub: "Operating officially since day one. Fully licensed.",
                },
                {
                  point: "Clear Pricing",
                  sub: "No hidden fees. Quotes provided before any work begins.",
                },
                {
                  point: "Secure Remote Access",
                  sub: "Consent-based sessions only. Your data stays yours.",
                },
                {
                  point: "One-on-One Support",
                  sub: "You talk directly to the person doing the work.",
                },
              ].map((item) => (
                <div
                  key={item.point}
                  className="border-l-2 border-green-900 pl-4 hover:border-green-600 transition-colors"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-2">
                    {item.point}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: CTA + Contact ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Ready to get started?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link href="/contact">
                    <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors inline-flex items-center gap-2">
                      Book Consultation <ArrowRight size={16} />
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                      Browse Services
                    </button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-green-800 uppercase tracking-[0.25em] mb-4">
                    Quick Links
                  </p>
                  {[
                    ["Services", "/services"],
                    ["My Tech & Device Matching", "/my-tech"],
                    ["Knowledge Base", "/knowledge-base"],
                    ["Service Agreement", "/service-agreement"],
                  ].map(([label, href]) => (
                    <Link key={label} href={href}>
                      <button className="block text-xs text-green-700 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                        {label}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    label: "Email",
                    value: "sonoaac@gmail.com",
                    sub: "Response within 24 hours",
                  },
                  {
                    label: "Phone",
                    value: "(862) 755-9845",
                    sub: "Call or text — by appointment",
                  },
                  {
                    label: "Location",
                    value: "New York, NY",
                    sub: "Remote support available worldwide",
                  },
                  {
                    label: "Remote Sessions",
                    value: "Zoom · AnyDesk · TeamViewer",
                    sub: "Available globally",
                  },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-green-800 pl-5">
                    <div className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-1">
                      {item.label}
                    </div>
                    <div className="text-white text-sm">{item.value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
