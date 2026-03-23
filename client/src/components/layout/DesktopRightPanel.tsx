import { Link, useLocation } from "wouter";

export function DesktopRightPanel() {
  const [location] = useLocation();
  if (location === "/") return null;
  return (
    <aside className="hidden xl:flex xl:flex-col xl:w-52 xl:shrink-0 border-l border-green-900/30 sticky top-20 self-start h-[calc(100vh-80px)] overflow-y-auto">
      <div className="px-5 py-8 flex flex-col gap-8">

        {/* Quick actions */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-green-900 block mb-3">
            Quick Actions
          </span>
          <ul className="space-y-1">
            {[
              { label: "Book Consultation", path: "/contact" },
              { label: "IT Support", path: "/services" },
              { label: "Contact Us", path: "/contact" },
              { label: "Service Agreement", path: "/service-agreement" },
            ].map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <button className="w-full text-left text-[11px] uppercase tracking-[0.15em] font-bold py-1.5 text-gray-400 hover:text-green-400 transition-colors">
                    {item.label}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Remote tools */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-green-900 block mb-3">
            Remote Sessions
          </span>
          <ul className="space-y-1.5">
            {["Zoom", "AnyDesk", "TeamViewer"].map((tool) => (
              <li key={tool}>
                <span className="text-[10px] text-green-800 uppercase tracking-[0.2em]">
                  {tool}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[9px] text-green-900 mt-2 uppercase tracking-[0.15em]">
            Available worldwide
          </p>
        </div>

        {/* Availability */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-green-900 block mb-3">
            Availability
          </span>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-green-400 shrink-0" />
            <span className="text-[10px] text-green-600 uppercase tracking-[0.15em]">
              Open for appointments
            </span>
          </div>
          <p className="text-[9px] text-green-800 uppercase tracking-[0.15em] leading-relaxed">
            Walk-ins at additional charge
          </p>
        </div>

        {/* Contact */}
        <div className="mt-auto pt-4 border-t border-green-900/20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-green-900 block mb-2">
            Contact
          </span>
          <p className="text-[10px] text-green-700 break-all">
            contact@sonoaac.com
          </p>
        </div>
      </div>
    </aside>
  );
}
