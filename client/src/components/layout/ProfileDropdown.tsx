import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"main" | "settings">("main");
  const { theme, toggleTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setView("main");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setView("main"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Profile avatar button */}
      <button
        onClick={() => { setOpen(!open); setView("main"); }}
        aria-label="Open profile"
        className="w-8 h-8 border border-green-800 text-green-500 text-[10px] font-bold uppercase tracking-wider hover:border-green-400 hover:text-green-400 transition-colors flex items-center justify-center shrink-0"
      >
        SNC
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-black border border-green-800 z-[150] shadow-xl shadow-black/50"
          >
            {view === "main" && (
              <>
                {/* Profile header */}
                <div className="px-4 py-3 border-b border-green-900/30">
                  <p className="text-xs font-bold text-green-300 uppercase tracking-[0.2em]">
                    Sonoaac
                  </p>
                  <p className="text-[10px] text-green-700 mt-0.5 uppercase tracking-[0.15em]">
                    IT Support &amp; Digital Solutions
                  </p>
                </div>

                {/* Settings option */}
                <div className="p-2">
                  <button
                    onClick={() => setView("settings")}
                    className="w-full text-left px-3 py-2.5 text-xs text-green-600 hover:text-green-400 hover:bg-green-950/20 transition-colors uppercase tracking-[0.2em] font-bold flex items-center justify-between"
                  >
                    <span>[ Settings ]</span>
                    <span className="text-green-800">→</span>
                  </button>
                </div>
              </>
            )}

            {view === "settings" && (
              <>
                {/* Settings header */}
                <div className="px-4 py-3 border-b border-green-900/30 flex items-center gap-3">
                  <button
                    onClick={() => setView("main")}
                    className="text-green-800 hover:text-green-400 text-xs transition-colors"
                    aria-label="Back"
                  >
                    ←
                  </button>
                  <span className="text-xs font-bold text-green-400 uppercase tracking-[0.2em]">
                    [ Settings ]
                  </span>
                </div>

                {/* Theme toggle */}
                <div className="p-4">
                  <p className="text-[10px] text-green-800 uppercase tracking-[0.3em] mb-3">
                    Appearance
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-500 uppercase tracking-[0.15em]">
                      Theme
                    </span>
                    {/* Toggle switch */}
                    <button
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                      className="relative flex items-center w-[88px] h-8 border border-green-900 hover:border-green-700 transition-colors overflow-hidden"
                    >
                      {/* Dark option */}
                      <span
                        className={`flex-1 h-full flex items-center justify-center text-[9px] font-bold uppercase tracking-wider transition-colors ${
                          theme === "dark"
                            ? "bg-green-400 text-black"
                            : "text-green-800"
                        }`}
                      >
                        Dark
                      </span>
                      {/* Light option */}
                      <span
                        className={`flex-1 h-full flex items-center justify-center text-[9px] font-bold uppercase tracking-wider transition-colors ${
                          theme === "light"
                            ? "bg-green-400 text-black"
                            : "text-green-800"
                        }`}
                      >
                        Light
                      </span>
                    </button>
                  </div>
                  <p className="text-[10px] text-green-900 mt-3 uppercase tracking-[0.15em]">
                    Currently: {theme} mode
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
