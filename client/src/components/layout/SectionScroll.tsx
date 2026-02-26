
import { useEffect } from "react";
import './SectionScroll.css';

const SectionScroll: React.FC = () => {
  // Minimal JS for smooth scroll and sticky-safe anchor jumps
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const sectionsData = [
  {
    id: "client-builds",
    title: "Client builds",
    className: "first",
    bgUrl: "/images/sncimg1cloudscomputing.png",
    content: (
      <>
        <p className="section-desc">
          If you need a website or a full web app, I can build it clean and professional, mobile ready, and easy to manage.
        </p>
        <a href="/services" className="section-link">See services</a>
      </>
    ),
  },
  {
    id: "right-setup",
    title: "The Right Setup for You",
    className: "second",
    bgUrl: "/images/sonoaactexts1.png",
    content: (
      <>
        <p className="section-desc">
          Get the right tech for your business or personal use. Sonoaac helps you pick the right devices based on what you actually need.
        </p>
        <a href="/my-tech" className="section-link">Explore products</a>
      </>
    ),
  },
  {
    id: "partnerships",
    title: "Partnerships",
    className: "third",
    bgUrl: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    content: (
      <>
        <p className="section-desc">
          If you have a strong idea and you want to build it the right way, we can team up and move serious.
        </p>
        <a href="/contact" className="section-link">Talk to me</a>
      </>
    ),
  },
];

  const Section = ({ id, title, className, bgUrl, content }: any) => {
  // If bgUrl is a gradient, use background; if image, use url()
  const isGradient = bgUrl && bgUrl.startsWith('linear-gradient');
  const style = isGradient
    ? { background: bgUrl }
    : { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };

    return (
      <section id={id} className={`section ${className}`}>
        <div className="wrapper-outer">
          <div className="wrapper-inner">
            <div className="background" style={style}>
              <h2 className="section-title">{title}</h2>
              {content}
            </div>
          </div>
        </div>
      </section>
    );
  };


  return (
    <div className="app-container single-scroll">
      <header className="header">
        <nav>
          {sectionsData.map((section) => (
            <a key={section.id} href={`#${section.id}`}>{section.title}</a>
          ))}
        </nav>
      </header>
      <div className="sections-stack">
        {sectionsData.map((section) => (
          <Section key={section.id} {...section} />
        ))}
      </div>
    </div>
  );
};

export default SectionScroll;
