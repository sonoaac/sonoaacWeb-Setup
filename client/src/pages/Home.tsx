import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { StickyNav } from "@/components/layout/StickyNav";

export default function Home() {
  const tabs = [
    { id: "services", label: "Services" },
    { id: "my-tech", label: "My Tech" },
    { id: "partnerships", label: "Partnerships" },
    { id: "products", label: "Products" },
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
      >
        {/* Services Section */}
        <section className="et-slide" id="services">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl px-8 sm:px-12 lg:px-16 flex justify-end"
          >
            <div className="max-w-[55%] text-right">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Client builds
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                If you need a website or a full web app, I can build it clean and professional, mobile ready, and easy to manage.
              </p>
              <Link href="/services">
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                  See services
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* My Tech Section */}
        <section className="et-slide" id="my-tech" style={{ background: "#f3f4f6" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
          >
            <div className="max-w-[55%]">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Right Setup for You
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Get the right tech for your business or personal use. Sonoaac helps you pick the right devices based on what you actually need.
              </p>
              <Link href="/my-tech">
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                  Explore products
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Partnerships Section */}
        <section className="et-slide" id="partnerships">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl px-8 sm:px-12 lg:px-16 flex justify-end"
          >
            <div className="max-w-[55%] text-right">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Partnerships
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                If you have a strong idea and you want to build it the right way, we can team up and move serious.
              </p>
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                  Talk to me
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Featured Products Section */}
        <section className="et-slide" id="products" style={{ background: "#f3f4f6" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl px-8 sm:px-12 lg:px-16"
          >
            <div className="max-w-[55%]">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Products under Sonoaac
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                I do not just build for people. I ship my own platforms too.
              </p>

              <div className="space-y-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-medium rounded mb-3">
                    Live
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sonoaac Web Services
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Full service web development for small businesses and startups
                  </p>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-medium rounded mb-3">
                    Live
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    My Tech
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Find the perfect device for your business or personal needs. Get professional recommendations based on your use case.
                  </p>
                  <Link href="/my-tech">
                    <button className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2">
                      Explore now
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-gray-400 text-white text-sm font-medium rounded mb-3">
                    Planning
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    More coming soon
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Building tools and platforms that solve real problems
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </StickyNav>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white flex justify-end py-20 px-8 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pr-8 sm:pr-12 lg:pr-16 max-w-[55%] text-right"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to build something?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Whether you need a website for your business or want to partner on a new product, let's talk.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
              Get in touch
              <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </section>

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
  );
}
