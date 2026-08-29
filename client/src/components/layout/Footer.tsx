import { Link } from "wouter";

const serviceLinks = [
  { label: "IT Support", path: "/it-support" },
  { label: "On-Site Services", path: "/on-site-services" },
  { label: "Software Fixes", path: "/software-fixes" },
  { label: "Device Setup", path: "/device-setup" },
  { label: "Business IT", path: "/business-it" },
  { label: "Web Development", path: "/services" },
  { label: "My Tech", path: "/my-tech" },
  { label: "Rent to Own", path: "/rentals" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-green-900/30 bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          {/* About */}
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-green-800 block mb-4">
              Sonoaac
            </span>
            <p className="text-green-700 text-xs leading-relaxed mb-3">
              IT Support and Digital Solutions Specialist.
              Registered US business.
            </p>
            <p className="text-green-800 text-xs leading-relaxed">
              Services by appointment only.<br />
              Walk ins available at additional charge.
            </p>
          </div>

          {/* Services */}
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-green-800 block mb-4">
              Services
            </span>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.path}>
                    <button className="text-green-700 text-xs hover:text-green-400 transition-colors uppercase tracking-[0.15em]">
                      {item.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-green-800 block mb-4">
              Legal &amp; Info
            </span>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/service-agreement">
                  <button className="text-green-700 text-xs hover:text-green-400 transition-colors uppercase tracking-[0.15em]">
                    Service Agreement
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <button className="text-green-700 text-xs hover:text-green-400 transition-colors uppercase tracking-[0.15em]">
                    Contact Us
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/book-consultation">
                  <button className="text-green-700 text-xs hover:text-green-400 transition-colors uppercase tracking-[0.15em]">
                    Book Consultation
                  </button>
                </Link>
              </li>
            </ul>
            <span className="text-xs uppercase tracking-[0.35em] text-green-800 block mb-2">
              Contact
            </span>
            <p className="text-green-700 text-xs">contact@sonoaac.com</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-900/20 pt-6 flex flex-col sm:flex-row justify-between items-start gap-3">
          <p className="text-green-900 text-xs">
            &copy; {year} Sonoaac. All rights reserved.
          </p>
          <p className="text-green-900 text-xs text-right">
            Software purchases are nonrefundable. Sonoaac recommends and does not sell software directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
