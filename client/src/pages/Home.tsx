import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, MapPin, Cpu, Briefcase, Globe, Wrench } from "lucide-react";
import { Link } from "wouter";
import MonitorIntro from "@/components/features/MonitorIntro";
import HomeFAQ from "@/components/features/HomeFAQ";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const categoryTiles = [
  { icon: Monitor,   label: "Remote Support",   sub: "Virus removal, OS fixes, M365",  link: "/services#remote"   },
  { icon: MapPin,    label: "On Site Visit",     sub: "Home and office, NJ area",       link: "/services#onsite"   },
  { icon: Cpu,       label: "Devices and Builds",sub: "Custom PCs, setup, TechMatcher", link: "/my-tech"           },
  { icon: Briefcase, label: "Business IT",       sub: "Email, networks, small teams",   link: "/services#business" },
  { icon: Globe,     label: "Web Development",   sub: "Custom sites built from scratch",link: "/services#web"      },
  { icon: Wrench,    label: "Software Fixes",    sub: "Resets, malware, performance",   link: "/services#software" },
];

const pricingCards = [
  { service: "Remote Virus Removal",       price: "$49",  note: "Per session"                       },
  { service: "Full PC Reset and Reinstall",price: "$79",  note: "Windows or Mac"                    },
  { service: "On Site Setup Visit",        price: "$99",  note: "First hour, NJ area"               },
  { service: "Custom PC Build Consult",    price: "$59",  note: "Parts and build plan included"     },
  { service: "Business Email (M365)",      price: "$129", note: "Setup and configuration"           },
  { service: "Custom Website",             price: "$500", note: "5 static pages, you fully control it" },
];

const serviceCards = [
  {
    title: "Remote IT Support",
    startingAt: "$49",
    detail: "Virus removal, Microsoft 365, OS errors, app crashes, email config, driver issues, and security audits via Zoom, AnyDesk, or TeamViewer.",
    link: "/services#remote",
  },
  {
    title: "On Site Services",
    startingAt: "$99",
    detail: "Home and office visits for workstation setup, network configuration, hardware installs, and hands-on troubleshooting. We come to you.",
    link: "/services#onsite",
  },
  {
    title: "Business IT Solutions",
    startingAt: "$129",
    detail: "Startup IT planning, business email and Microsoft 365, workstation rollouts, security fundamentals, network setup, and ongoing support.",
    link: "/services#business",
  },
  {
    title: "Devices and Custom Builds",
    startingAt: "$59",
    detail: "Device recommendations, new device setup, PC and laptop resets, custom PC builds, data transfers, and our TechMatcher tool.",
    link: "/my-tech",
  },
  {
    title: "Software and App Fixes",
    startingAt: "$49",
    detail: "Full PC and laptop resets, performance issues, malware removal, login problems, driver errors, and Microsoft 365 troubleshooting.",
    link: "/services#software",
  },
  {
    title: "Web Development",
    startingAt: "$500",
    detail: "Simple static websites you fully own and run yourself. $500 covers 5 pages, mobile responsive, with an admin panel. Add-ons priced separately.",
    link: "/services#web",
  },
];

const howItWorks = [
  { step: "01", title: "Book a Consultation", body: "Fill out the quick contact form or call or text (862) 423-8875. Same day often available." },
  { step: "02", title: "We Diagnose and Fix It", body: "Remote or on site, we identify the problem, give you a clear quote, and get to work." },
  { step: "03", title: "Back Up and Running", body: "Issue resolved, no jargon, no surprises. Follow up support included." },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem("sonoaac-intro"); }
    catch { return true; }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try { sessionStorage.setItem("sonoaac-intro", "1"); } catch {}
  };

  return (
    <>
      {showIntro && <MonitorIntro onComplete={handleIntroComplete} />}
      <div className="min-h-screen bg-black">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 pt-20 pb-24 md:pt-28 md:pb-32 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="section-label">Sonoaac IT Services</p>
              <h1
                style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 900, fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#000", marginBottom: "1.25rem" }}
              >
                Fast, Friendly IT Help.<br />
                <em style={{ fontStyle: "italic", fontWeight: 900 }}>On Site. Remote. Anywhere.</em>
              </h1>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "#444", maxWidth: "600px", marginBottom: "2.5rem" }}>
                NJ based tech support for homes, freelancers, and small businesses.
                Remote troubleshooting, on site visits, device setup, custom PC builds,
                and web development all under one name.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/contact">
                  <button className="btn-primary inline-flex items-center gap-2">
                    Book a Consultation <ArrowRight size={16} />
                  </button>
                </Link>
                <a href="#pricing">
                  <button className="btn-outline">See Pricing</button>
                </a>
              </div>

              {/* Stat strip */}
              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-7 border-t border-green-900/30">
                {[
                  ["Remote and On Site", "Two ways to help"],
                  ["NJ Based",           "NJ and tri-state coverage"],
                  ["Registered US Business", "Licensed and insured"],
                  ["By Appointment",     "Same day often available"],
                ].map(([label, sub]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#000" }}>{label}</div>
                    <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#999", marginTop: "2px" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Category Tiles ────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 md:py-24 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-label">Browse by Category</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#000" }}>
                What do you need?
              </h2>
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
                      <button
                        className="w-full bg-black text-left transition-colors group"
                        style={{ padding: "28px 24px" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
                      >
                        <Icon size={20} style={{ color: "#bbb", marginBottom: "12px", transition: "color 0.15s" }} className="group-hover:!text-black" />
                        <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "#000", marginBottom: "4px" }}>
                          {tile.label}
                        </div>
                        <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888", lineHeight: 1.5 }}>
                          {tile.sub}
                        </div>
                      </button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────── */}
        <section id="pricing" className="px-6 sm:px-10 lg:px-16 py-20 md:py-28 border-b border-green-900/30" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-label">Transparent Pricing</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#000", marginBottom: "0.6rem" }}>
                Starting-At Rates
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#666", maxWidth: "500px" }}>
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
                  className="bg-black"
                  style={{ padding: "32px 28px" }}
                >
                  <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "2.4rem", color: "#000", lineHeight: 1 }}>
                    {item.price}
                  </div>
                  <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 500, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#999", marginBottom: "14px" }}>
                    starting at
                  </div>
                  <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#000", marginBottom: "4px" }}>
                    {item.service}
                  </div>
                  <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888" }}>
                    {item.note}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="btn-primary inline-flex items-center gap-2">
                  Get a Custom Quote <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline">See All Services</button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Services Grid ─────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-label">What We Do</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#000" }}>
                Our Services
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20">
              {serviceCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-black group"
                  style={{ padding: "32px 28px", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
                >
                  <h3 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "#000", marginBottom: "10px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.82rem", color: "#666", lineHeight: 1.7, marginBottom: "16px" }}>
                    {item.detail}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.72rem", color: "#888" }}>
                      Starting at{" "}
                      <strong style={{ color: "#000", fontWeight: 900 }}>{item.startingAt}</strong>
                    </span>
                    <Link href={item.link}>
                      <button style={{ fontFamily: "'Times New Roman', serif", fontWeight: 800, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#000", background: "none", border: "none", cursor: "pointer" }}>
                        Details →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Sonoaac ───────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 md:py-28 border-b border-green-900/30" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="section-label">Why Sonoaac</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#000", marginBottom: "2rem" }}>
                Built on Trust
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { point: "Registered US Business",  sub: "Operating officially since day one. Fully licensed." },
                  { point: "Upfront Pricing",         sub: "Starting rates shown. Full quote before any work begins." },
                  { point: "Secure Remote Access",    sub: "Consent based sessions only. Your data stays yours." },
                  { point: "One on One Support",      sub: "You talk directly to the person doing the work." },
                ].map((item) => (
                  <div key={item.point} style={{ borderLeft: "3px solid #000", paddingLeft: "18px" }}>
                    <h3 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#000", marginBottom: "8px" }}>
                      {item.point}
                    </h3>
                    <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.65 }}>
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ──────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 md:py-28 border-b border-green-900/30">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-label">Process</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#000" }}>
                How It Works
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-green-900/20">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black"
                  style={{ padding: "36px 28px" }}
                >
                  <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "3.5rem", color: "#e5e5e5", lineHeight: 1, marginBottom: "16px" }}>
                    {step.step}
                  </div>
                  <h3 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "#000", marginBottom: "10px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.82rem", color: "#666", lineHeight: 1.7 }}>
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Knowledge Base FAQ ────────────────────────────────────────── */}
        <HomeFAQ />

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 md:py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="section-label">Get Started</p>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000", marginBottom: "1rem" }}>
                Ready to get started?
              </h2>
              <p style={{ fontSize: "1rem", color: "#555", maxWidth: "520px", marginBottom: "2.5rem", lineHeight: 1.75 }}>
                Call or text{" "}
                <a href="tel:+18624238875" style={{ color: "#000", fontWeight: 900 }}>(862) 423-8875</a>
                , or email{" "}
                <a href="mailto:sonoaac@gmail.com" style={{ color: "#000", fontWeight: 900 }}>sonoaac@gmail.com</a>
                . Same day appointments often available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <button className="btn-primary inline-flex items-center gap-2">
                    Book Consultation <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="btn-outline">Browse Services</button>
                </Link>
                <a href="tel:+18624238875">
                  <button
                    style={{
                      padding: "16px 28px", border: "2px solid #ccc", background: "none",
                      fontFamily: "monospace", fontWeight: 700, fontSize: "0.82rem",
                      letterSpacing: "0.08em", color: "#555", cursor: "pointer",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#000"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ccc"; (e.currentTarget as HTMLElement).style.color = "#555"; }}
                  >
                    (862) 423-8875
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
