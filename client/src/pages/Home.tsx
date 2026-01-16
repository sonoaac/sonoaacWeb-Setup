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
      <section className="relative overflow-hidden bg-slate-50 min-h-[85vh] flex items-start pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* SWS Heading with gradient colors */}
              <div className="flex items-center gap-1 mb-4">
                <span className="text-6xl font-bold text-pink-600">S</span>
                <span className="text-6xl font-bold text-green-500">W</span>
                <span className="text-6xl font-bold text-pink-600">S</span>
              </div>

              {/* Subheader */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sonoaac Web Services
              </h2>

              {/* Main Description */}
              <p className="text-base text-gray-700 mb-6 leading-relaxed max-w-lg">
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

