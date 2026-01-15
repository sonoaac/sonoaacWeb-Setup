import { motion } from "framer-motion";
import { ArrowRight, Monitor, Code, Palette } from "lucide-react";
import { Link } from "wouter";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink-300 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-300 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Now accepting new projects
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Build your <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500 px-1">dream</span> digital presence.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Small business owners, customize your website with us for a fraction of the agency cost. Or build a custom PC that fits your specific needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/build-pc">
                <button className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-green-500 hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2 group">
                  Build a PC
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:border-pink-200 hover:bg-pink-50 transition-all">
                  View Services
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating Image Composition */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div 
                className="absolute top-0 right-0 w-3/4 rounded-3xl shadow-2xl overflow-hidden border-4 border-white z-20"
                whileHover={{ y: -10 }}
              >
                {/* Landing page hero scenic mountain landscape */}
                <img src="/gempages.svg" alt="Website Demo" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 w-3/4 rounded-3xl shadow-xl overflow-hidden border-4 border-white z-10 grayscale hover:grayscale-0 transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                {/* Modern gaming setup with neon lights */}
                <img src="/gempages1.svg" alt="PC Build" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dashed border-gray-300 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demos Showcase Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From local mechanics to beauty salons, we create tailored digital experiences that convert visitors into customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[2rem] blur-xl -z-10 opacity-50" />
              <BraidingDemo />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold">Beauty & Wellness</h3>
                <p className="text-sm text-gray-500">Booking systems, galleries, and elegant design.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-slate-500/20 rounded-[2rem] blur-xl -z-10 opacity-50" />
              <MechanicDemo />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold">Automotive & Trades</h3>
                <p className="text-sm text-gray-500">Service menus, emergency contacts, and rugged aesthetics.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                <Monitor />
              </div>
              <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
              <p className="text-gray-500">Websites that look perfect on phones, tablets, and desktops automatically.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Code />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Tech Stack</h3>
              <p className="text-gray-500">Built with React, Tailwind, and Node.js for blazing fast performance.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Palette />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Branding</h3>
              <p className="text-gray-500">Unique color schemes and typography that match your business identity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
