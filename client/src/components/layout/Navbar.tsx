import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { QuoteBooklet } from "@/components/features/QuoteBooklet";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "services", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const isActive = (id: string) => activeSection === id;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-pink-500/10 border-b border-gray-900" 
          : "bg-black/80 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left Side */}
            <button 
              onClick={() => scrollToSection("home")}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.img
                  src="/images/sonoaaclogos.PNG"
                  alt="Sonoaac"
                  className="h-12 w-auto"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="hidden sm:flex items-center gap-1 font-bold text-2xl">
                  <span className="text-pink-500 text-3d-pink">S</span>
                  <span className="text-green-500 text-3d-green">W</span>
                  <span className="text-pink-500 text-3d-pink">S</span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`cursor-pointer px-4 py-2 text-sm font-bold rounded-lg transition-all font-code ${
                    isActive(link.id) 
                      ? "text-pink-500 bg-pink-500/10 border border-pink-500/30" 
                      : "text-gray-300 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                onClick={() => setIsQuoteOpen(true)}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-sm bg-gradient-primary hover-glow-pink transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Quote
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-pink-500 p-2"
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
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-900"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 text-base font-bold rounded-lg cursor-pointer transition-all font-code ${
                    isActive(link.id)
                      ? "text-pink-500 bg-pink-500/10 border border-pink-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3">
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full px-4 py-3 text-white font-bold bg-gradient-primary rounded-xl hover-glow-pink"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Quote
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
      
      <QuoteBooklet open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </>
  );
}
