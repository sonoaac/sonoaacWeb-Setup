import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const TOPICS = [
  {
    id: "help",
    label: "What We Help With",
    response: "We help with tech support, device setup, business IT, and more. How can we assist you today?",
    ctas: [
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Get IT Support", href: "/it-support" },
    ],
  },
  {
    id: "onsite",
    label: "On-Site Services",
    response: "We offer on-site visits for homes and offices. Schedule a visit or request a quote!",
    ctas: [
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Request On-Site Service", href: "/services" },
    ],
  },
  {
    id: "remote",
    label: "Remote Support",
    response: "Get fast remote help for software, email, and troubleshooting. Start a remote session or contact us!",
    ctas: [
      { label: "Get IT Support", href: "/it-support" },
      { label: "Book Consultation", href: "/book-consultation" },
    ],
  },
  {
    id: "devices",
    label: "Device Setup & Sales",
    response: "We set up new and existing devices, and offer ready-to-use computers. Need a quote or setup?",
    ctas: [
      { label: "Setup My Device", href: "/my-tech" },
      { label: "Request Device Quote", href: "/device-sales" },
    ],
  },
  {
    id: "trust",
    label: "Why Choose Us",
    response: "Sonoaac is a registered U.S. business focused on clear, secure, and personal tech help.",
    ctas: [
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Get IT Support", href: "/it-support" },
    ],
  },
];

export default function HelpBot() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleChip = (id: string) => {
    setSelected(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const selectedTopic = TOPICS.find((t) => t.id === selected);

  return (
    <>
      {/* Floating HelpBot Button */}
      <button
        aria-label="Open help chat"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        onClick={() => setOpen(true)}
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
      >
        <MessageCircle size={28} className="mr-2" />
        <span className="font-semibold text-base hidden sm:inline">Need help?</span>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2 }}
            ref={panelRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 flex flex-col gap-3 focus:outline-none"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-gray-900">HelpBot</span>
              <button
                aria-label="Close help chat"
                className="text-gray-400 hover:text-gray-700 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                onClick={handleClose}
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${
                    selected === topic.id
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-green-50"
                  }`}
                  onClick={() => handleChip(topic.id)}
                  aria-pressed={selected === topic.id}
                >
                  {topic.label}
                </button>
              ))}
            </div>
            {selectedTopic ? (
              <div className="flex flex-col gap-2">
                <div className="text-gray-800 text-base mb-1">{selectedTopic.response}</div>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.ctas.map((cta) => (
                    <Link key={cta.href} href={cta.href}>
                      <a
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                        tabIndex={0}
                        aria-label={cta.label}
                      >
                        {cta.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-sm">Select a topic to get started.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
