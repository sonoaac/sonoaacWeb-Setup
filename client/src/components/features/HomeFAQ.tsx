import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { FAQ_SECTIONS, type FAQSection } from "@/pages/KnowledgeBase";

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0 border-t border-black/10">
      {section.items.map((item, i) => (
        <div key={i} className="border-b border-black/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-0 py-5 text-left transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 800,
                fontSize: "0.88rem",
                color: "#000",
                paddingRight: "24px",
                lineHeight: 1.45,
              }}
            >
              {item.q}
            </span>
            <ChevronDown
              size={15}
              style={{
                color: "#999",
                flexShrink: 0,
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {/* kb-mono wrapper strips all Tailwind color classes */}
                <div className="pb-5 pt-1 kb-mono">{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function HomeFAQ() {
  const [activeSectionId, setActiveSectionId] = useState(FAQ_SECTIONS[0].id);
  const activeSection = FAQ_SECTIONS.find((s) => s.id === activeSectionId)!;

  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-20 md:py-28 border-b border-green-900/30"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label">Knowledge Base</p>
          <h2
            style={{
              fontFamily: "'Times New Roman', serif",
              fontWeight: 900,
              fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
              color: "#000",
              marginBottom: "0.5rem",
            }}
          >
            Tech Questions Answered
          </h2>
          <p
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "0.88rem",
              color: "#666",
              maxWidth: "520px",
              lineHeight: 1.65,
            }}
          >
            Common hardware, software, and networking questions — plain answers, no jargon.
          </p>
        </motion.div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FAQ_SECTIONS.map((section) => {
            const active = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "8px 14px",
                  background: active ? "#000" : "transparent",
                  color: active ? "#fff" : "#555",
                  border: `1.5px solid ${active ? "#000" : "#ccc"}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#000";
                    (e.currentTarget as HTMLElement).style.color = "#000";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ccc";
                    (e.currentTarget as HTMLElement).style.color = "#555";
                  }
                }}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <motion.div
          key={activeSectionId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FAQAccordion section={activeSection} />
        </motion.div>

        {/* Link to full KB */}
        <div className="mt-10">
          <Link href="/knowledge-base">
            <button
              style={{
                fontFamily: "'Times New Roman', serif",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "14px 24px",
                background: "none",
                color: "#000",
                border: "2px solid #000",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#000";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "none";
                (e.currentTarget as HTMLElement).style.color = "#000";
              }}
            >
              Full Knowledge Base + Product Comparisons →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
