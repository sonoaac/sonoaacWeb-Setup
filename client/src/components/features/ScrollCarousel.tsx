import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

/**
 * Mobile-first horizontal scroll-snap carousel.
 *
 * Cards sit flat ("simple display") until you scroll — the card nearest
 * center gets a subtle scale/brightness lift so it reads as a carousel in
 * motion, tracked via IntersectionObserver (works everywhere, unlike the
 * Chromium-only `animation-timeline: view()` CSS approach). A thin progress
 * bar and a "swipe" hint reinforce that it scrolls horizontally.
 */

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  gradient: string; // CSS background (gradient) — no external images needed
  icon?: LucideIcon;
  href: string;
  cta?: string;
}

export function ScrollCarousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const io = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, index: -1 };
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.intersectionRatio > best.ratio) best = { ratio: entry.intersectionRatio, index: idx };
        }
        if (best.index !== -1) setActive(best.index);
      },
      { root: track, threshold: thresholds },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    if (!hasScrolled) setHasScrolled(true);
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(100, Math.max(0, (track.scrollLeft / max) * 100)) : 0);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = cardRefs.current[0];
    if (!track || !card) return;
    const amount = card.getBoundingClientRect().width + 16; // card + gap
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 sm:px-[calc(50%-160px)] pb-2"
        style={{ scrollPaddingInline: "24px" }}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href}>
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                data-index={i}
                className="group shrink-0 snap-center w-[78vw] sm:w-[320px] h-[380px] rounded-2xl relative overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
                style={{
                  background: item.gradient,
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                {Icon && (
                  <Icon
                    size={40}
                    strokeWidth={1.25}
                    className="absolute top-6 right-6 text-white/70 transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-xl leading-snug mb-1">{item.title}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{item.subtitle}</p>
                  {item.cta && (
                    <p className="text-green-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">
                      {item.cta} &rarr;
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mx-6 sm:mx-[calc(50%-160px+0px)] h-[2px] bg-green-900/30 mt-4 max-w-[calc(100%-3rem)] sm:max-w-none">
        <div
          className="h-full bg-green-400 transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(6, progress)}%` }}
        />
      </div>

      {/* Swipe hint — fades once the user has scrolled */}
      <div
        className={`flex items-center justify-center gap-2 mt-3 text-green-800 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-500 ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <ChevronLeft size={12} />
        Scroll for more
        <ChevronRight size={12} />
      </div>

      {/* Desktop arrow controls */}
      <button
        aria-label="Previous"
        onClick={() => scrollByCard(-1)}
        className="hidden sm:flex absolute left-2 top-[152px] w-9 h-9 items-center justify-center rounded-full bg-black/60 border border-green-800 text-green-400 hover:bg-black transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollByCard(1)}
        className="hidden sm:flex absolute right-2 top-[152px] w-9 h-9 items-center justify-center rounded-full bg-black/60 border border-green-800 text-green-400 hover:bg-black transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
