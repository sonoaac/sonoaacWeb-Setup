import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { StickyNav } from "@/components/layout/StickyNav";

export default function Home() {
  // Homepage navigation tabs for sticky nav
  const tabs = [
    { id: "hero", label: "Home" },
    { id: "help", label: "What We Help With" },
    { id: "onsite", label: "On-Site Services" },
    { id: "remote", label: "Remote Support" },
    { id: "devices", label: "Device Setup & Sales" },
    { id: "trust", label: "Why Choose Us" },
    { id: "cta", label: "Get Started" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation with Content */}
      <StickyNav 
        tabs={tabs}
        heroImage={{
          src: "/images/sonoaactexts.png",
          alt: "Sonoaac"
        }}
      <div className="min-h-screen bg-white">
        {/* Sticky Navigation with Content */}
        <StickyNav 
          tabs={tabs}
          heroImage={{
            src: "/images/sonoaactexts.png",
            alt: "Sonoaac"
          }}
        >
          {/* 1. Hero Section */}
          <section className="et-slide" id="hero">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16 flex justify-end"
            >
              <div className="max-w-[55%] text-right">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  On-Site & Remote Tech Setup for Homes and Small Businesses
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Consultations, fixes, and full device setups — done right
                </p>
                <div className="flex gap-4 justify-end">
                  <Link href="/contact">
                    <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Book a Consultation
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Request IT Support
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 2. What We Help With */}
          <section className="et-slide" id="help" style={{ background: "#f3f4f6" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Service Cards */}
                <ServiceCard title="Computer & Device Setup" link="/my-tech" />
                <ServiceCard title="Small Business IT Support" link="/services" />
                <ServiceCard title="Software & App Fixes" link="/software-fixes" />
                <ServiceCard title="On-Site Visits" link="/services" />
                <ServiceCard title="Remote Support" link="/services" />
              </div>
            </motion.div>
          </section>

          {/* 3. On-Site Services */}
          <section className="et-slide" id="onsite">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
            >
              <div className="max-w-[55%]">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  On-Site Services
                </h2>
                <ul className="list-disc ml-6 text-xl text-gray-600 mb-8">
                  <li>Home visits</li>
                  <li>Office visits</li>
                  <li>Workstation & network setup</li>
                  <li>Device installations</li>
                </ul>
                <p className="text-lg text-gray-700 mb-6">
                  On-site services are scheduled after booking and availability confirmation.
                </p>
                <Link href="/services">
                  <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                    Request On-Site Service
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* 4. Remote Support */}
          <section className="et-slide" id="remote" style={{ background: "#f3f4f6" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
            >
              <div className="max-w-[55%]">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Remote Support
                </h2>
                <ul className="list-disc ml-6 text-xl text-gray-600 mb-8">
                  <li>Microsoft 365 issues</li>
                  <li>Email setup</li>
                  <li>App errors</li>
                  <li>OS troubleshooting</li>
                </ul>
                <Link href="/services">
                  <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                    Start Remote Support
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* 5. Device Setup & Sales */}
          <section className="et-slide" id="devices">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
            >
              <div className="max-w-[55%]">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Device Setup & Sales
                </h2>
                <ul className="list-disc ml-6 text-xl text-gray-600 mb-8">
                  <li>New or existing device setup</li>
                  <li>Business-ready configuration</li>
                  <li>Fully configured device delivery</li>
                </ul>
                <div className="flex gap-4">
                  <Link href="/my-tech">
                    <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Setup My Device
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                  <Link href="/device-sales">
                    <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Buy a Ready-to-Use Computer
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 6. Why Choose Us */}
          <section className="et-slide" id="trust" style={{ background: "#f3f4f6" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
            >
              <div className="max-w-[55%]">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose Us
                </h2>
                <ul className="list-disc ml-6 text-xl text-gray-600 mb-8">
                  <li>Professionally registered U.S. business</li>
                  <li>Clear, non-technical communication</li>
                  <li>Secure & productivity-focused setups</li>
                  <li>One-on-one personalized support</li>
                </ul>
              </div>
            </motion.div>
          </section>

          {/* 7. Final CTA Section */}
          <section className="bg-gray-900 text-white flex justify-end py-20 px-8 sm:px-12 lg:px-16" id="cta">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pr-8 sm:pr-12 lg:pr-16 max-w-[55%] text-right"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to get started?
              </h2>
              <div className="flex gap-4 justify-end mb-8">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                    Book Consultation
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                    Get IT Support
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/device-sales">
                  <button className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                    Request Device Quote
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </section>
        </StickyNav>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="text-center text-gray-600">
              <p className="mb-2">© 2025 Sonoaac. All rights reserved.</p>
              <p className="text-sm">Building products and services that matter.</p>
            </div>
          </div>
        </footer>
      </div>
