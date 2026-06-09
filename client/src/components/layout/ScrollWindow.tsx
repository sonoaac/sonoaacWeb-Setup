import React from "react";
import { Link } from "wouter";

export interface ScrollWindowSection {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface ScrollWindowProps {
  sections: ScrollWindowSection[];
}

export const ScrollWindow: React.FC<ScrollWindowProps> = ({ sections }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="hidden md:grid grid-cols-2 gap-12 min-h-[calc(100vh-6rem)]">
        {/* Left: Text sections */}
        <div className="flex flex-col gap-16 justify-center">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{section.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{section.description}</p>
              {section.ctaLabel && section.ctaHref && (
                <Link href={section.ctaHref}>
                  <button className="btn-primary">
                    {section.ctaLabel}
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
        {/* Right: Sticky image frame */}
        <div className="relative flex items-center min-h-[400px]">
          <div className="sticky top-28 w-full">
            <div className="brand-panel border shadow-xl overflow-hidden flex items-center justify-center min-h-[400px] h-[60vh] max-h-[500px]">
              {/* Show the image for the currently visible section */}
              <ScrollWindowImages sections={sections} />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile: stack sections, no sticky */}
      <div className="md:hidden flex flex-col gap-12">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            <img
              src={section.imageSrc}
              alt={section.imageAlt}
              className="border border-green-900/20 shadow-sm w-full object-cover max-h-64"
              loading="lazy"
            />
            <p className="text-base text-gray-700">{section.description}</p>
            {section.ctaLabel && section.ctaHref && (
              <Link href={section.ctaHref}>
                <button className="btn-primary w-full sm:w-auto">
                  {section.ctaLabel}
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper: show the image for the currently visible section (desktop)
const ScrollWindowImages: React.FC<{ sections: ScrollWindowSection[] }> = ({ sections }) => {
  // Track which section is most visible in viewport
  const [activeIdx, setActiveIdx] = React.useState(0);
  const sectionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      let bestIdx = 0;
      let bestTop = Infinity;
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < bestTop) {
          bestTop = rect.top;
          bestIdx = idx;
        }
      });
      setActiveIdx(bestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {sections.map((section, idx) => (
        <div
          key={idx}
          ref={el => (sectionRefs.current[idx] = el)}
          style={{ display: idx === activeIdx ? "block" : "none" }}
          aria-hidden={idx !== activeIdx}
        >
          <img
            src={section.imageSrc}
            alt={section.imageAlt}
            className="w-full h-full object-cover transition-all duration-300"
            loading="lazy"
          />
        </div>
      ))}
    </>
  );
};

export default ScrollWindow;
