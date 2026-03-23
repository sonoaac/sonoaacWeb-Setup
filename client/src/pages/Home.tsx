import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, MapPin, Cpu, Briefcase, Globe, Wrench } from "lucide-react";
import { Link } from "wouter";
import MonitorIntro from "@/components/features/MonitorIntro";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const categoryTiles = [
  { icon: Monitor,   label: "Remote Support",    sub: "Virus removal, OS fixes, M365",   link: "/services#remote"   },
  { icon: MapPin,    label: "On-Site Visit",      sub: "Home & office · NYC area",        link: "/services#onsite"   },
  { icon: Cpu,       label: "Devices & Builds",   sub: "Custom PCs, setup, TechMatcher",  link: "/my-tech"           },
  { icon: Briefcase, label: "Business IT",        sub: "Email, networks, small teams",    link: "/services#business" },
  { icon: Globe,     label: "Web Development",    sub: "Custom sites from scratch",       link: "/services#web"      },
  { icon: Wrench,    label: "Software Fixes",     sub: "Resets, malware, performance",    link: "/services#software" },
];

const pricingCards = [
  { service: "Remote Virus Removal",        price: "$49",  note: "Per session" },
  { service: "Full PC Reset / Reinstall",   price: "$79",  note: "Windows or Mac" },
  { service: "On-Site Setup Visit",         price: "$99",  note: "First hour · NYC area" },
  { service: "Custom PC Build Consult",     price: "$59",  note: "Parts + build plan included" },
  { service: "Business Email (M365)",       price: "$129", note: "Setup + configuration" },
  { service: "Custom Website",              price: "$499", note: "Mobile-responsive · built from scratch" },
];

const serviceCards = [
  {
    title: "Remote IT Support",
    startingAt: "$49",
    detail:
      "Virus removal, Microsoft 365, OS errors, app crashes, email config, driver issues, and security audits — via Zoom, AnyDesk, or TeamViewer.",
    link: "/services#remote",
  },
  {
    title: "On-Site Services",
    startingAt: "$99",
    detail:
      "Home and office visits for workstation setup, network configuration, hardware installs, and hands-on troubleshooting. We come to you.",
    link: "/services#onsite",
  },
  {
    title: "Business IT Solutions",
    startingAt: "$129",
    detail:
      "Startup IT planning, business email & Microsoft 365, workstation rollouts, security fundamentals, network setup, and ongoing support.",
    link: "/services#business",
  },
  {
    title: "Devices & Custom Builds",
    startingAt: "$59",
    detail:
      "Device recommendations, new device setup, PC/laptop resets, custom PC builds, data transfers, and our TechMatcher tool.",
    link: "/my-tech",
  },
  {
    title: "Software & App Fixes",
    startingAt: "$49",
    detail:
      "Full PC/laptop resets, performance issues, malware removal, login problems, driver errors, and Microsoft 365 troubleshooting.",
    link: "/services#software",
  },
  {
    title: "Web Development",
    startingAt: "$499",
    detail:
      "Custom websites for small businesses. Mobile-responsive, SEO-optimized, with admin dashboards. No templates — built from scratch.",
    link: "/services#web",
  },
];

const howItWorks = [
  { step: "01", title: "Book a Consultation", body: "Fill out the quick contact form or call/text (862) 755-9845. Same-day often available." },
  { step: "02", title: "We Diagnose & Fix It", body: "Remote or on-site — we identify the problem, give you a clear quote, and get to work." },
  { step: "03", title: "You're Back Up & Running", body: "Issue resolved, no jargon, no surprises. Follow-up support included." },
];

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

        {/* ── Section 1: Hero ───────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-32 border-b border-green-900/30">
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
                <a href="#pricing">
                  <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                    See Pricing
                  </button>
                </a>
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

        {/* ── Section 2: Category Tiles ─────────────────────────────────── */}
        <section className="px-6 py-16 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Browse by Category</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What do you need?</h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-green-900/20">
              {categoryTiles.map((tile, i) => {
                const Icon = tile.icon;
                return (
                  <motion.div
                    key={tile.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link href={tile.link}>
                      <button className="w-full bg-black p-6 hover:bg-green-950/20 transition-colors group text-left">
                        <Icon size={22} className="text-green-800 group-hover:text-green-400 transition-colors mb-3" />
                        <div className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-1 group-hover:text-green-400 transition-colors">
                          {tile.label}
                        </div>
                        <div className="text-[11px] text-gray-500 leading-relaxed">{tile.sub}</div>
                      </button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Pricing ────────────────────────────────────────── */}
        <section id="pricing" className="px-6 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Transparent Pricing</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Starting-At Rates</h2>
              <p className="text-gray-400 text-sm max-w-xl">
                Every job gets a clear quote before work begins. These are floor prices — final cost depends on complexity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-green-900/20">
              {pricingCards.map((item, i) => (
                <motion.div
                  key={item.service}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-black p-7 hover:bg-green-950/20 transition-colors"
                >
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {item.price}
                    <span className="text-xs text-green-800 font-normal ml-1 uppercase tracking-[0.15em]">starting at</span>
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-[0.15em] mt-3 mb-1">{item.service}</div>
                  <div className="text-[11px] text-gray-500">{item.note}</div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors inline-flex items-center gap-2">
                  Get a Custom Quote <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors">
                  See All Services
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Section 4: Services Grid ──────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">What We Do</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Services</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20">
              {serviceCards.map((item, i) => (
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
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-green-700 uppercase tracking-[0.15em]">
                      Starting at <span className="text-green-400 font-bold">{item.startingAt}</span>
                    </span>
                    <Link href={item.link}>
                      <button className="text-xs text-green-800 uppercase tracking-[0.15em] hover:text-green-400 transition-colors">
                        Details →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Why Sonoaac ────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Why Sonoaac</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Built on Trust</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { point: "Registered US Business", sub: "Operating officially since day one. Fully licensed." },
                  { point: "Upfront Pricing", sub: "Starting rates shown. Full quote before any work begins." },
                  { point: "Secure Remote Access", sub: "Consent-based sessions only. Your data stays yours." },
                  { point: "One-on-One Support", sub: "You talk directly to the person doing the work." },
                ].map((item) => (
                  <div
                    key={item.point}
                    className="border-l-2 border-green-900 pl-4 hover:border-green-600 transition-colors"
                  >
                    <h3 className="text-xs font-bold text-white uppercase tracking-[0.12em] mb-2">{item.point}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Section 6: How It Works ───────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">Process</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">How It Works</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-green-900/20">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black p-8"
                >
                  <div className="text-4xl font-bold text-green-900 mb-4">{step.step}</div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 7: CTA ────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-gray-400 text-sm mb-10 max-w-xl">
                Call or text <a href="tel:+18627559845" className="text-green-400 hover:text-green-300 transition-colors">(862) 755-9845</a>,
                or email <a href="mailto:sonoaac@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">sonoaac@gmail.com</a>.
                Same-day appointments often available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
                <a href="tel:+18627559845">
                  <button className="px-8 py-4 border border-green-900 text-green-700 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-700 hover:text-green-400 transition-colors font-mono">
                    (862) 755-9845
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
