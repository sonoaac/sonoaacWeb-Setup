import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

const servicesMenu = [
  { name: "Remote IT Support",  path: "/services#remote",   sub: "Starting at $49"  },
  { name: "On-Site Services",   path: "/services#onsite",   sub: "Starting at $99"  },
  { name: "Software Fixes",     path: "/services#software", sub: "Starting at $49"  },
  { name: "Business IT",        path: "/services#business", sub: "Starting at $129" },
  { name: "Web Development",    path: "/services#web",      sub: "Starting at $499" },
];

const myTechMenu = [
  { name: "Build a Custom PC", path: "/my-tech/build-pc", sub: "Configure your dream build" },
  { name: "Device Matching",   path: "/my-tech",          sub: "Find the right device"      },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const openMenu = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (path: string) =>
    location === path || location.startsWith(path.split("#")[0] + "/");

  return (
    <div className={`transition-shadow duration-300 ${scrolled ? "shadow-xl shadow-black/60" : ""}`}>

      {/* ── Tier 1: Utility Bar ───────────────────────────────────────── */}
      <div className="bg-[#060606] border-b border-green-900/25">
        <div className="w-full px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-10">

            {/* Logo */}
            <Link href="/">
              <button className="flex items-center gap-2.5 group cursor-pointer">
                <img
                  src="/images/sonoaaclogos.png"
                  alt="Sonoaac"
                  className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span className="font-bold text-xs text-green-300 tracking-[0.3em] uppercase">
                  Sonoaac
                </span>
              </button>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+18627559845"
                className="hidden sm:flex items-center gap-1.5 text-[10px] text-green-800 hover:text-green-400 transition-colors tracking-[0.1em] font-mono"
              >
                <Phone size={10} />
                (862) 755-9845
              </a>
              <a
                href="mailto:sonoaac@gmail.com"
                className="hidden lg:flex items-center gap-1.5 text-[10px] text-green-800 hover:text-green-400 transition-colors tracking-[0.1em]"
              >
                <Mail size={10} />
                sonoaac@gmail.com
              </a>
              <Link href="/contact">
                <motion.button
                  className="px-4 py-1.5 bg-green-400 text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-green-300 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now
                </motion.button>
              </Link>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-gray-500 hover:text-green-400 transition-colors p-1"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tier 2: Main Nav (desktop only) ──────────────────────────── */}
      <div className="hidden md:block bg-black border-b border-green-900/40">
        <div className="w-full px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("services")}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 h-12 text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                    isActive("/services") ? "text-green-400" : "text-gray-400 hover:text-green-300"
                  }`}
                >
                  Services
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${openDropdown === "services" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute top-full left-0 w-64 bg-black border border-green-900/50 shadow-2xl shadow-black z-50"
                    >
                      {servicesMenu.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <button className="w-full text-left px-5 py-3.5 hover:bg-green-950/30 transition-colors group border-b border-green-900/20 last:border-0">
                            <div className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] group-hover:text-green-400 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-green-800 mt-0.5">{item.sub}</div>
                          </button>
                        </Link>
                      ))}
                      <Link href="/services">
                        <button className="w-full text-left px-5 py-3 bg-green-950/10 hover:bg-green-950/30 transition-colors">
                          <div className="text-[10px] text-green-600 uppercase tracking-[0.15em] font-bold">
                            View All Services →
                          </div>
                        </button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* My Tech dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("mytech")}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 h-12 text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                    isActive("/my-tech") ? "text-green-400" : "text-gray-400 hover:text-green-300"
                  }`}
                >
                  My Tech
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${openDropdown === "mytech" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === "mytech" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute top-full left-0 w-64 bg-black border border-green-900/50 shadow-2xl shadow-black z-50"
                    >
                      {myTechMenu.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <button className="w-full text-left px-5 py-3.5 hover:bg-green-950/30 transition-colors group border-b border-green-900/20 last:border-0">
                            <div className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] group-hover:text-green-400 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-green-800 mt-0.5">{item.sub}</div>
                          </button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static links */}
              {[
                { name: "Knowledge Base", path: "/knowledge-base" },
                { name: "Agreement",      path: "/service-agreement" },
              ].map((link) => (
                <Link key={link.name} href={link.path}>
                  <button
                    className={`px-4 h-12 text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                      isActive(link.path) ? "text-green-400" : "text-gray-400 hover:text-green-300"
                    }`}
                  >
                    {link.name}
                  </button>
                </Link>
              ))}
            </div>

            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black border-b border-green-900/50 overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              <div className="pb-3 mb-2 border-b border-green-900/30">
                <p className="text-[9px] text-green-900 uppercase tracking-[0.35em] mb-2 pt-1">
                  Services
                </p>
                {servicesMenu.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <button className="block w-full text-left py-2.5 text-xs text-gray-400 hover:text-green-400 uppercase tracking-[0.15em] font-bold transition-colors">
                      {item.name}
                      <span className="ml-2 text-[9px] text-green-800 normal-case tracking-normal font-normal">
                        {item.sub}
                      </span>
                    </button>
                  </Link>
                ))}
              </div>
              <div className="pb-3 mb-2 border-b border-green-900/30">
                <p className="text-[9px] text-green-900 uppercase tracking-[0.35em] mb-2">
                  My Tech
                </p>
                {myTechMenu.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <button className="block w-full text-left py-2.5 text-xs text-gray-400 hover:text-green-400 uppercase tracking-[0.15em] font-bold transition-colors">
                      {item.name}
                    </button>
                  </Link>
                ))}
              </div>
              <Link href="/knowledge-base">
                <button className="block w-full text-left py-2.5 text-xs text-gray-400 hover:text-green-400 uppercase tracking-[0.15em] font-bold transition-colors border-b border-green-900/30">
                  Knowledge Base
                </button>
              </Link>
              <Link href="/service-agreement">
                <button className="block w-full text-left py-2.5 text-xs text-gray-400 hover:text-green-400 uppercase tracking-[0.15em] font-bold transition-colors border-b border-green-900/30">
                  Agreement
                </button>
              </Link>
              <div className="pt-3 space-y-2">
                <a href="tel:+18627559845" className="flex items-center gap-2 text-xs text-green-700 hover:text-green-400 transition-colors font-mono py-1">
                  <Phone size={12} /> (862) 755-9845
                </a>
                <a href="mailto:sonoaac@gmail.com" className="flex items-center gap-2 text-xs text-green-700 hover:text-green-400 transition-colors py-1">
                  <Mail size={12} /> sonoaac@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
