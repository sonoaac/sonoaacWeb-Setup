import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

const servicesMenu = [
  { name: "Remote IT Support",  path: "/services#remote",   sub: "Starting at $49"  },
  { name: "On Site Services",   path: "/services#onsite",   sub: "Starting at $99"  },
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
    <div
      className="w-full bg-white"
      style={{ boxShadow: scrolled ? "0 1px 0 0 #000" : "none", transition: "box-shadow 0.2s" }}
    >
      {/* ── Tier 1: Utility Bar ───────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div className="w-full px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-11">

            {/* Logo */}
            <Link href="/">
              <button className="flex items-center gap-2.5 group cursor-pointer">
                <img
                  src="/images/sonoaaclogos.png"
                  alt="Sonoaac"
                  className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span
                  style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "0.2em", color: "#000", textTransform: "uppercase" }}
                >
                  Sonoaac
                </span>
              </button>
            </Link>

            {/* Right: contact info + CTA */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+18627559845"
                className="hidden sm:flex items-center gap-1.5 transition-colors"
                style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "0.72rem", color: "#777", letterSpacing: "0.08em" }}
              >
                <Phone size={11} />
                (862) 755-9845
              </a>
              <a
                href="mailto:sonoaac@gmail.com"
                className="hidden lg:flex items-center gap-1.5 transition-colors"
                style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "0.72rem", color: "#777", letterSpacing: "0.08em" }}
              >
                <Mail size={11} />
                sonoaac@gmail.com
              </a>
              <Link href="/contact">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: "#000", color: "#fff",
                    fontFamily: "'Times New Roman', Times, serif",
                    fontWeight: 900, fontSize: "0.7rem",
                    textTransform: "uppercase", letterSpacing: "0.18em",
                    padding: "7px 18px", border: "none", cursor: "pointer",
                  }}
                >
                  Book Now
                </motion.button>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden transition-colors p-1"
                style={{ color: "#555" }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tier 2: Main Nav (desktop only) ──────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ borderBottom: "2px solid #000" }}
      >
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
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontWeight: isActive("/services") ? 900 : 700,
                    fontSize: "0.78rem", textTransform: "uppercase",
                    letterSpacing: "0.18em", color: isActive("/services") ? "#000" : "#555",
                    display: "flex", alignItems: "center", gap: "4px",
                    padding: "0 16px", height: "48px", background: "none", border: "none",
                    cursor: "pointer", transition: "color 0.15s",
                  }}
                >
                  Services
                  <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdown === "services" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{
                        position: "absolute", top: "100%", left: 0,
                        width: "260px", backgroundColor: "#fff",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0 #000", zIndex: 50,
                      }}
                    >
                      {servicesMenu.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <button
                            style={{
                              display: "block", width: "100%", textAlign: "left",
                              padding: "12px 20px", background: "none", border: "none",
                              borderBottom: "1px solid #e5e5e5", cursor: "pointer",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                          >
                            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#000" }}>
                              {item.name}
                            </div>
                            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "0.65rem", color: "#888", marginTop: "2px" }}>
                              {item.sub}
                            </div>
                          </button>
                        </Link>
                      ))}
                      <Link href="/services">
                        <button
                          style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "10px 20px", background: "#f9f9f9",
                            border: "none", cursor: "pointer", transition: "background 0.15s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#eee")}
                          onMouseLeave={e => (e.currentTarget.style.background = "#f9f9f9")}
                        >
                          <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 900, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#000" }}>
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
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontWeight: isActive("/my-tech") ? 900 : 700,
                    fontSize: "0.78rem", textTransform: "uppercase",
                    letterSpacing: "0.18em", color: isActive("/my-tech") ? "#000" : "#555",
                    display: "flex", alignItems: "center", gap: "4px",
                    padding: "0 16px", height: "48px", background: "none", border: "none",
                    cursor: "pointer", transition: "color 0.15s",
                  }}
                >
                  My Tech
                  <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdown === "mytech" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === "mytech" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{
                        position: "absolute", top: "100%", left: 0,
                        width: "260px", backgroundColor: "#fff",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0 #000", zIndex: 50,
                      }}
                    >
                      {myTechMenu.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <button
                            style={{
                              display: "block", width: "100%", textAlign: "left",
                              padding: "12px 20px", background: "none", border: "none",
                              borderBottom: "1px solid #e5e5e5", cursor: "pointer",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                          >
                            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#000" }}>
                              {item.name}
                            </div>
                            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "0.65rem", color: "#888", marginTop: "2px" }}>
                              {item.sub}
                            </div>
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
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontWeight: isActive(link.path) ? 900 : 700,
                      fontSize: "0.78rem", textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: isActive(link.path) ? "#000" : "#555",
                      padding: "0 16px", height: "48px",
                      background: "none", border: "none",
                      cursor: "pointer", transition: "color 0.15s",
                    }}
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

      {/* ── Mobile Menu ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderBottom: "2px solid #000", backgroundColor: "#fff" }}
          >
            <div className="px-5 py-5 space-y-0">
              <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "12px", marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#aaa", marginBottom: "8px" }}>
                  Services
                </p>
                {servicesMenu.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <button
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "9px 0", background: "none", border: "none",
                        fontFamily: "'Times New Roman', serif", fontWeight: 800,
                        fontSize: "0.82rem", textTransform: "uppercase",
                        letterSpacing: "0.14em", color: "#222", cursor: "pointer",
                      }}
                    >
                      {item.name}
                      <span style={{ fontWeight: 500, fontSize: "0.65rem", color: "#999", marginLeft: "8px", textTransform: "none", letterSpacing: "0" }}>
                        {item.sub}
                      </span>
                    </button>
                  </Link>
                ))}
              </div>

              <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "12px", marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#aaa", marginBottom: "8px" }}>
                  My Tech
                </p>
                {myTechMenu.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <button
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "9px 0", background: "none", border: "none",
                        fontFamily: "'Times New Roman', serif", fontWeight: 800,
                        fontSize: "0.82rem", textTransform: "uppercase",
                        letterSpacing: "0.14em", color: "#222", cursor: "pointer",
                      }}
                    >
                      {item.name}
                    </button>
                  </Link>
                ))}
              </div>

              {[
                { name: "Knowledge Base", path: "/knowledge-base" },
                { name: "Agreement",      path: "/service-agreement" },
              ].map((link) => (
                <Link key={link.name} href={link.path}>
                  <button
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "9px 0", background: "none",
                      borderBottom: "1px solid #e5e5e5", borderTop: "none",
                      borderLeft: "none", borderRight: "none",
                      fontFamily: "'Times New Roman', serif", fontWeight: 800,
                      fontSize: "0.82rem", textTransform: "uppercase",
                      letterSpacing: "0.14em", color: "#222", cursor: "pointer",
                    }}
                  >
                    {link.name}
                  </button>
                </Link>
              ))}

              <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <a href="tel:+18627559845" style={{ fontFamily: "monospace", fontSize: "0.82rem", color: "#555", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone size={13} /> (862) 755-9845
                </a>
                <a href="mailto:sonoaac@gmail.com" style={{ fontFamily: "'Times New Roman', serif", fontSize: "0.8rem", color: "#555", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Mail size={13} /> sonoaac@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
