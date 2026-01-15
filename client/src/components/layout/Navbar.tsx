import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { QuoteBooklet } from "@/components/features/QuoteBooklet";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Build PC", path: "/build-pc" },
    { name: "Services", path: "/services" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 cursor-pointer">
              <img src="/sonoaac-logo.svg" alt="Sonoaac" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <div className={`cursor-pointer px-3 py-2 text-sm font-medium transition-colors hover:text-pink-600 ${
                    isActive(link.path) ? "text-pink-600" : "text-gray-600"
                  }`}>
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="h-0.5 bg-pink-500 w-full mt-1"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/contact">
                <div className="text-gray-600 hover:text-pink-600 font-medium text-sm cursor-pointer transition-colors">
                  Contact
                </div>
              </Link>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-6 py-2.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-pink-500 to-green-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-pink-500 p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <div
                    className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link href="/contact">
                  <div className="block w-full text-center px-4 py-3 text-gray-600 font-medium border border-gray-200 rounded-xl cursor-pointer">
                    Contact Us
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full px-4 py-3 text-white font-medium bg-gradient-to-r from-pink-500 to-green-500 rounded-xl"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
      
      <QuoteBooklet open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </>
  );
}
