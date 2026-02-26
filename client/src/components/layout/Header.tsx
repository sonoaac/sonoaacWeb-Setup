// Shared Header component
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-30">
      <div className="font-bold text-xl text-gray-900">Sonoaac IT Services</div>
      <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-4">
        <Link href="/">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Home</a>
        </Link>
        <Link href="/book-consultation">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Consultation</a>
        </Link>
        <Link href="/it-support">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">IT Support</a>
        </Link>
        <Link href="/on-site-services">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">On-Site</a>
        </Link>
        <Link href="/device-setup">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Device Setup</a>
        </Link>
        <Link href="/buy-ready-computer">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Buy Computer</a>
        </Link>
        <Link href="/software-fixes">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Software Fixes</a>
        </Link>
        <Link href="/business-it">
          <a className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors hover:bg-gray-100 text-sm sm:text-base">Business IT</a>
        </Link>
      </nav>
    </header>
  );
}
