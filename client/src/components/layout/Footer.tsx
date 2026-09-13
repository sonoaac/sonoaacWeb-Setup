import { Link } from "wouter";

const footerLinks = [
  { label: "Remote IT Support", path: "/services#remote" },
  { label: "On-Site Services", path: "/services#onsite" },
  { label: "Computer & Printer Setup", path: "/services#software" },
  { label: "Google Workspace Setup", path: "/services#business" },
  { label: "Web Development", path: "/services#web" },
  { label: "Live Demos", path: "/demos" },
  { label: "Shop", path: "/shop" },
  { label: "Trade In", path: "/trade-in" },
  { label: "Rent to Own", path: "/rentals" },
  { label: "Service Agreement", path: "/service-agreement" },
  { label: "Contact Us", path: "/contact" },
  { label: "Book Consultation", path: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-green-900/30 bg-black">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-3">
        {/* 1. Brand + one-line blurb */}
        <p className="text-xs leading-relaxed">
          <span className="uppercase tracking-[0.3em] text-green-800 font-bold">Sonoaac</span>
          <span className="text-green-700">
            {" "}&mdash; IT Support and Digital Solutions Specialist. Registered US business.
            By appointment; walk-ins at additional charge.
          </span>
        </p>

        {/* 2. Every page link, one flowing row */}
        <p className="text-xs leading-relaxed">
          {footerLinks.map((item, i) => (
            <span key={item.label + item.path}>
              {i > 0 && <span className="text-green-900"> &middot; </span>}
              <Link href={item.path}>
                <button className="text-green-700 hover:text-green-400 transition-colors uppercase tracking-[0.1em]">
                  {item.label}
                </button>
              </Link>
            </span>
          ))}
        </p>

        {/* 3. Contact */}
        <p className="text-xs text-green-700">
          <a href="tel:+18624238875" className="hover:text-green-400 transition-colors">
            (862) 423-8875
          </a>
          <span className="text-green-900"> &middot; </span>
          <a href="mailto:contact@sonoaac.com" className="hover:text-green-400 transition-colors">
            contact@sonoaac.com
          </a>
        </p>

        {/* 4-5. Copyright + disclaimer */}
        <div className="border-t border-green-900/20 pt-3 flex flex-col sm:flex-row justify-between gap-1 text-[11px] text-green-900">
          <p>&copy; {year} Sonoaac. All rights reserved.</p>
          <p className="sm:text-right">
            Software purchases are nonrefundable. Sonoaac recommends and does not sell software directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
