import { motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { QuoteBooklet } from "@/components/features/QuoteBooklet";

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* SWS Heading with gradient colors */}
              <div className="flex items-center gap-1 mb-6">
                <span className="text-6xl font-bold text-pink-600">S</span>
                <span className="text-6xl font-bold text-green-500">W</span>
                <span className="text-6xl font-bold text-pink-600">S</span>
              </div>

              {/* Subheader */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Sonoaac Web Services
              </h2>

              {/* Main Description */}
              <p className="text-base text-gray-700 mb-8 leading-relaxed max-w-lg">
                Build your dream digital presence. Small business owners, customize your website with us for a fraction of the agency cost. Or build a custom PC that fits your specific needs.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-green-500 hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Build my Website
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="/build-pc">
                  <button className="px-8 py-4 rounded-xl font-bold text-white bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 group">
                    Build a PC
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 rounded-xl font-bold text-gray-700 bg-white border border-gray-300 hover:border-pink-300 hover:bg-pink-50 transition-all">
                    View Services
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto h-96">
                {/* Top Image */}
                <motion.div
                  className="absolute top-0 right-0 w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white z-20 h-48"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/gempages1.svg"
                    alt="Web Services Showcase"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Bottom Image */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full rounded-2xl shadow-xl overflow-hidden border-4 border-white z-10 h-48"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/gempages.svg"
                    alt="Website Design"
                    className="w-full h-full object-cover opacity-90"
                  />
                </motion.div>

                {/* Decorative Ring */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dashed border-gray-200 rounded-full" style={{ animationDuration: '20s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Booklet Modal */}
      <QuoteBooklet open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />

      {/* Login Notification */}
      {showLoginMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          No user login available right now
        </motion.div>
      )}
    </div>
  );
}

