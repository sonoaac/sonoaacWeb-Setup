import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "My Tech", path: "/my-tech" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-black ${
      scrolled 
        ? "bg-white shadow-md" 
        : "bg-white"
    }`} style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Left side: Logo + SNC + Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo with SNC */}
            <Link href="/">
              <button className="flex-shrink-0 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <motion.img
                    src="/images/sonoaaclogos.png"
                    alt="Sonoaac"
                    className="h-12 w-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="font-bold text-3xl text-gray-900">SNC</span>
                </div>
              </button>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      isActive(link.path) 
                        ? "text-green-600 bg-green-50" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link href="/contact">
              <motion.button
                className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm bg-green-500 hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get started
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                    isActive(link.path)
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            ))}
            <div className="pt-3">
              <Link href="/contact">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-3 text-white font-semibold bg-green-500 rounded-lg hover:bg-green-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
