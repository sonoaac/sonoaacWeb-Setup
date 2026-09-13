import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

/**
 * Mobile-first horizontal scroll-snap carousel, styled like a newspaper photo
 * spread — square-cornered tiles, a thin hairline frame, a small uppercase
 * "kicker" over a serif headline, a rule before the dek, a bordered link.
 *
 * Cards sit flat ("simple display") until you scroll — the card nearest
 * center gets a subtle scale/brightness lift, tracked via IntersectionObserver
 * (works everywhere, unlike the Chromium-only `animation-timeline: view()`
 * CSS approach). A thin progress bar and a "swipe" hint reinforce that it
 * scrolls horizontally.
 *
 * Text inside a card uses inline `style` colors, never `text-white` /
 * `text-green-*` classNames — those are globally remapped to dark ink for the
 * site's black-on-white theme (see index.css), which would make text
 * invisible against these intentionally dark card photos.
 */

export interface CarouselItem {
  id: string;
  kicker: string;
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
                className="group shrink-0 snap-center w-[78vw] sm:w-[320px] h-[400px] relative overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
                style={{
                  background: item.gradient,
                  border: "1px solid rgba(255,255,255,0.3)",
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 28%, rgba(0,0,0,0.92) 100%)" }}
                />
                {Icon && (
                  <Icon
                    size={34}
                    strokeWidth={1}
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    className="absolute top-5 right-5 transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] mb-2"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.kicker}
                  </p>
                  <p
                    className="font-bold text-xl leading-[1.15] uppercase mb-2"
                    style={{ color: "#f5f5f5", fontFamily: "'Times New Roman', Times, serif", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </p>
                  <div className="h-px w-8 mb-2" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {item.subtitle}
                  </p>
                  {item.cta && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                      style={{ color: "#fff" }}
                    >
                      {item.cta} &rarr;
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mx-6 sm:mx-[calc(50%-160px)] h-px bg-black/15 mt-4 max-w-[calc(100%-3rem)] sm:max-w-none">
        <div
          className="h-full bg-black transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(6, progress)}%` }}
        />
      </div>

      {/* Swipe hint — fades once the user has scrolled */}
      <div
        className={`flex items-center justify-center gap-2 mt-3 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-500 text-gray-500 ${
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
        className="hidden sm:flex absolute left-2 top-[176px] w-9 h-9 items-center justify-center text-black hover:text-gray-500 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollByCard(1)}
        className="hidden sm:flex absolute right-2 top-[176px] w-9 h-9 items-center justify-center text-black hover:text-gray-500 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
