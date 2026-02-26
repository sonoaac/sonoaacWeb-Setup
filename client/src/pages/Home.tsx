import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import { StickyNav } from "@/components/layout/StickyNav";
import ScrollWindow from "@/components/layout/ScrollWindow";

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
        showTabs={false}
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
                  Fast, Friendly Tech Help—Anywhere
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Book a consultation, get remote support, or schedule on-site service. We make IT easy for homes and small businesses.
                </p>
                <div className="flex flex-col xs:flex-row gap-4 justify-end w-full max-w-xs sm:max-w-none mx-auto sm:mx-0">
                  <Link href="/book-consultation">
                    <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Book Consultation
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                  <Link href="/it-support">
                    <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                      Get IT Support
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          <ScrollWindow
            sections={[
              {
                title: "Get the Right PC for Your Work",
                description:
                  "We help you choose or build the perfect PC for creators, office, or small business. Get expert advice on specs, performance, and value.",
                imageSrc: "/images/gamingpc.jpg",
                imageAlt: "Custom PC for creators and business",
                ctaLabel: "Book Consultation",
                ctaHref: "/book-consultation",
              },
              {
                title: "On-Site Services",
                description:
                  "Home or office visits for setup, troubleshooting, and upgrades. We come to you for networks, devices, and more.",
                imageSrc: "/images/onsite-support.webp",
                imageAlt: "On-site IT support",
                ctaLabel: "Request On-Site Service",
                ctaHref: "/services",
              },
              {
                title: "Remote Support",
                description:
                  "Fast help for Microsoft 365, email, app errors, and OS issues. Secure remote sessions for homes and businesses.",
                imageSrc: "/images/remote-support.webp",
                imageAlt: "Remote IT support",
                ctaLabel: "Get IT Support",
                ctaHref: "/it-support",
              },
              {
                title: "Device Setup & Sales",
                description:
                  "Ready-to-go laptops, desktops, iPads, and Macs. We set up new and existing devices for productivity and security.",
                imageSrc: "/images/gaming-pc-builder.webp",
                imageAlt: "Device setup and sales",
                ctaLabel: "Request Device Quote",
                ctaHref: "/device-sales",
              },
              {
                title: "Why Choose Us",
                description:
                  "Sonoaac is a registered U.S. business. We focus on clear communication, secure setups, and one-on-one support.",
                imageSrc: "/images/sonoaactexts.png",
                imageAlt: "Why choose Sonoaac",
                ctaLabel: "Book Consultation",
                ctaHref: "/book-consultation",
              },
            ]}
          />

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
              <div className="flex flex-col xs:flex-row gap-4 justify-end mb-8 w-full max-w-xs sm:max-w-none mx-auto sm:mx-0">
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
        {/* Footer removed: now rendered globally in App layout */}
      </StickyNav>
    </div>
  );
}
