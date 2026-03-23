import { Link, useLocation } from "wouter";

const serviceGroups = [
  {
    label: "Support",
    links: [
      { name: "IT Support", path: "/it-support" },
      { name: "Software Fixes", path: "/software-fixes" },
      { name: "On-Site Services", path: "/on-site-services" },
    ],
  },
  {
    label: "Devices",
    links: [
      { name: "Device Setup", path: "/device-setup" },
      { name: "My Tech", path: "/my-tech" },
      { name: "Buy a Computer", path: "/buy-ready-computer" },
    ],
  },
  {
    label: "Business",
    links: [
      { name: "Business IT", path: "/business-it" },
      { name: "Web Dev", path: "/services" },
      { name: "Book Consultation", path: "/book-consultation" },
    ],
  },
];

export function DesktopSidebar() {
  const [location] = useLocation();
  if (location === "/") return null;

  return (
    <aside className="hidden xl:flex xl:flex-col xl:w-52 xl:shrink-0 border-r border-green-900/30 sticky top-20 self-start h-[calc(100vh-80px)] overflow-y-auto">
      <div className="px-5 py-8 flex flex-col gap-8">

        {/* Brand */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-green-900 block mb-3">
            Sonoaac
          </span>
          <p className="text-[10px] text-green-800 leading-relaxed">
            IT Support &amp; Digital<br />Solutions Specialist
          </p>
        </div>

        {/* Service groups */}
        {serviceGroups.map((group) => (
          <div key={group.label}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-green-800 block mb-3">
              {group.label}
            </span>
            <ul className="space-y-1">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <button
                      className={`w-full text-left text-[11px] uppercase tracking-[0.15em] font-bold py-1.5 transition-colors ${
                        location === link.path
                          ? "text-green-400"
                          : "text-gray-400 hover:text-green-400"
                      }`}
                    >
                      {location === link.path ? "→ " : ""}
                      {link.name}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Book CTA */}
        <div className="mt-auto pt-4 border-t border-green-900/20">
          <Link href="/book-consultation">
            <button className="w-full py-2.5 bg-green-400 text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
              Book Now
            </button>
          </Link>
          <p className="text-[9px] text-green-900 uppercase tracking-[0.2em] text-center mt-2">
            By appointment only
          </p>
        </div>
      </div>
    </aside>
  );
}
