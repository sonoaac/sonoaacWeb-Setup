import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

interface Tab {
  id: string;
  label: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface StickyNavProps {
  tabs: Tab[];
  children: React.ReactNode;
  heroImage?: HeroImage;
}

export function StickyNav({ tabs, children, heroImage }: StickyNavProps) {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const tabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const heroTabsRef = useRef<HTMLDivElement>(null);

  const tabContainerHeight = 90;

  // Handle tab click
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    const element = document.getElementById(tabId);
    if (element) {
      const scrollTop = element.offsetTop - tabContainerHeight + 1;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  // Set slider CSS based on current tab
  useEffect(() => {
    if (currentId && tabRefs.current[currentId]) {
      const tab = tabRefs.current[currentId];
      if (tab) {
        setSliderWidth(tab.offsetWidth);
        setSliderLeft(tab.offsetLeft);
      }
    }
  }, [currentId]);

  // Track active tab + sticky state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroTabsRef.current) {
        const offset =
          heroTabsRef.current.offsetTop +
          heroTabsRef.current.offsetHeight -
          tabContainerHeight;
        setIsSticky(window.scrollY >= offset);
      }
      findCurrentTab();
    };

    const handleResize = () => {
      if (currentId && tabRefs.current[currentId]) {
        const tab = tabRefs.current[currentId];
        if (tab) {
          setSliderWidth(tab.offsetWidth);
          setSliderLeft(tab.offsetLeft);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, tabs]);

  const findCurrentTab = () => {
    let newCurrentId: string | null = null;

    tabs.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) {
        const offsetTop = element.offsetTop - tabContainerHeight;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
          newCurrentId = tab.id;
        }
      }
    });

    if (newCurrentId !== currentId) {
      setCurrentId(newCurrentId);
    }
  };

  const [location] = useLocation();
  // Main nav links (from Navbar)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "My Tech", path: "/my-tech" },
    { name: "Contact", path: "/contact" },
  ];
  const isActive = (path: string) => location === path;

  return (
    <div>
      {/* Sticky Nav Section - always at the top of the page flow */}
      <section style={{ position: 'relative', zIndex: 100 }}>
        {/* This spacer ONLY appears when sticky, so content gets pushed down */}
        {isSticky && <div aria-hidden="true" style={{ height: tabContainerHeight }} />}

        <nav
          className={`et-hero-tabs-container ${isSticky ? "et-hero-tabs-container--top" : ""}`}
          style={isSticky ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 } : { position: 'static' }}
        >
          {/* Logo and SNC */}
          <Link href="/">
            <button className="flex-shrink-0 cursor-pointer group flex items-center gap-3 mr-8 mt-2">
              <motion.img
                src="/images/sonoaaclogos.png"
                alt="Sonoaac"
                className="h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <span className="font-bold text-3xl text-gray-900">SNC</span>
            </button>
          </Link>
          {/* Main nav links (no CTA) */}
          <div className="hidden lg:flex items-center space-x-1 mr-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive(link.path)
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            ))}
          </div>
          {/* Section tabs (always visible) */}
          <div className="flex-1 items-center justify-end hidden md:flex">
            {tabs.map((tab) => (
              <motion.a
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                href={`#${tab.id}`}
                className={`et-hero-tab ${currentId === tab.id ? "active" : ""}`}
                onClick={(e) => handleTabClick(e, tab.id)}
                whileHover={{ color: "white" }}
              >
                {tab.label}
              </motion.a>
            ))}
            <motion.span
              className="et-hero-tab-slider"
              animate={{ width: `${sliderWidth}px`, left: `${sliderLeft}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </nav>
      </section>

      {/* Hero Section (logo/image) only on Home page if heroImage is provided */}
      {heroImage && (
        <section className="et-hero-tabs" ref={heroTabsRef}>
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="max-w-full h-auto mx-auto"
            style={{ maxHeight: "80vh", objectFit: "contain" }}
          />
        </section>
      )}

      {/* Content */}
      <main className="et-main et-main--spaced">{children}</main>

      <style>{`
        :root {
          --tabsH: ${tabContainerHeight}px;
        }

        /* Optional but recommended: native anchor jumps won't hide behind header */
        [id] {
          scroll-margin-top: var(--tabsH);
        }

        .et-hero-tabs {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          position: relative;
          background: #eee;
          text-align: center;
          padding: 0 2em;
          padding-bottom: var(--tabsH);
        }

        /* Section headings: left or right, bold, shadow */
        .et-slide h1, .et-slide h2, .et-slide h3, .et-slide h4 {
          text-align: left;
          font-weight: bold;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.12), 0 1px 0 #fff;
          margin-bottom: 1.5rem;
        }
        /* Alternate right alignment for every even section */
        .et-slide:nth-of-type(even) h1,
        .et-slide:nth-of-type(even) h2,
        .et-slide:nth-of-type(even) h3,
        .et-slide:nth-of-type(even) h4 {
          text-align: right;
        }
        .et-slide {
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }

        .et-hero-tabs-container {
          display: flex;
          flex-direction: row;
          position: static;
          width: 100%;
          height: var(--tabsH);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          background: #fff;
          z-index: 10;
        }

        .et-hero-tabs-container--top {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 9999 !important;
        }

        .et-hero-tab {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          color: #000;
          letter-spacing: 0.1rem;
          transition: all 0.5s ease;
          font-size: 1rem;
          text-decoration: none;
          cursor: pointer;
        }

        .et-hero-tab:hover {
          color: white;
          background: rgba(102, 177, 241, 0.8);
          transition: all 0.5s ease;
        }

        .et-hero-tab-slider {
          position: absolute;
          bottom: 0;
          height: 8px;
          background: #66B1F1;
        }


        .et-main {
          width: 100%;
        }
        .et-main--spaced {
          margin-top: 2.5rem;
        }

        @media (min-width: 800px) {
          .et-hero-tab {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
