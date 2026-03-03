import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "IT Support", path: "/it-support" },
    { name: "Contact", path: "/contact" },
    { name: "Agreement", path: "/service-agreement" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={`transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-black"}`}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <button className="cursor-pointer flex items-center gap-3 group">
              <img
                src="/images/sonoaaclogos.png"
                alt="Sonoaac"
                className="h-8 md:h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-bold text-sm md:text-base text-green-300 tracking-[0.3em] uppercase">
                Sonoaac
              </span>
            </button>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <button
                  className={`text-xs uppercase tracking-[0.25em] font-bold transition-colors ${
                    isActive(link.path)
                      ? "text-green-400"
                      : "text-green-700 hover:text-green-400"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            ))}
            <Link href="/book-consultation">
              <motion.button
                className="px-5 py-2 bg-green-400 text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-green-300 transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                Book Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-green-600 hover:text-green-400 text-xs uppercase tracking-[0.25em] font-bold transition-colors py-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-green-900/50 bg-black overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              <Link href="/">
                <button
                  className={`block w-full text-left py-3 text-xs uppercase tracking-[0.25em] font-bold border-b border-green-900/30 transition-colors ${
                    isActive("/") ? "text-green-400" : "text-green-700 hover:text-green-400"
                  }`}
                >
                  Home
                </button>
              </Link>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <button
                    className={`block w-full text-left py-3 text-xs uppercase tracking-[0.25em] font-bold border-b border-green-900/30 transition-colors ${
                      isActive(link.path) ? "text-green-400" : "text-green-700 hover:text-green-400"
                    }`}
                  >
                    {link.name}
                  </button>
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/book-consultation">
                  <button className="w-full py-3 bg-green-400 text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-green-300 transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
