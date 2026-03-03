import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { MessageCircle, X } from "lucide-react";

const TOPICS = [
  {
    id: "help",
    label: "What We Do",
    response: "Remote and in-person IT support, web development, software troubleshooting, device setup, and business IT solutions.",
    ctas: [
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "View Services", href: "/services" },
    ],
  },
  {
    id: "remote",
    label: "Remote Support",
    response: "Secure remote sessions via Zoom, AnyDesk, or TeamViewer. Available globally for software, email, OS, and troubleshooting issues.",
    ctas: [
      { label: "Get IT Support", href: "/it-support" },
      { label: "Book Consultation", href: "/book-consultation" },
    ],
  },
  {
    id: "onsite",
    label: "On-Site Services",
    response: "Home and office visits for hardware setup, network config, and device installations. Scheduled by appointment — walk-ins at additional charge.",
    ctas: [
      { label: "On-Site Services", href: "/on-site-services" },
      { label: "Book Consultation", href: "/book-consultation" },
    ],
  },
  {
    id: "devices",
    label: "Device Setup",
    response: "New device configuration, PC and laptop resets, software installation, and device recommendations for business or personal use.",
    ctas: [
      { label: "Device Setup", href: "/device-setup" },
      { label: "My Tech", href: "/my-tech" },
    ],
  },
  {
    id: "booking",
    label: "Appointments",
    response: "All services are by appointment. Walk-ins are available at an additional charge. Book online or contact us to schedule.",
    ctas: [
      { label: "Book Now", href: "/book-consultation" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function HelpBot() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const selectedTopic = TOPICS.find((t) => t.id === selected);

  return (
    <>
      {/* Float button */}
      <button
        aria-label="Open help chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-green-400 text-black flex items-center justify-center hover:bg-green-300 transition-colors shadow-lg shadow-green-900/30 rounded-full"
      >
        <MessageCircle size={24} strokeWidth={2} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18 }}
            ref={panelRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            className="fixed bottom-24 right-6 z-[200] w-80 max-w-[calc(100vw-3rem)] bg-black border border-green-800 p-5 flex flex-col gap-4 focus:outline-none shadow-xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-green-400 font-bold">
                Sonoaac Help
              </span>
              <button
                aria-label="Close help"
                onClick={handleClose}
                className="text-gray-500 hover:text-green-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelected(topic.id)}
                  aria-pressed={selected === topic.id}
                  className={`px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold border transition-colors ${
                    selected === topic.id
                      ? "bg-green-400 text-black border-green-400"
                      : "border-green-900 text-gray-400 hover:border-green-600 hover:text-green-400"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Response */}
            {selectedTopic ? (
              <div className="flex flex-col gap-3">
                <p className="text-gray-300 text-xs leading-relaxed">
                  {selectedTopic.response}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.ctas.map((cta) => (
                    <Link key={cta.href} href={cta.href}>
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-green-400 text-black text-xs uppercase tracking-[0.15em] font-bold hover:bg-green-300 transition-colors"
                      >
                        {cta.label}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Select a topic above.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
