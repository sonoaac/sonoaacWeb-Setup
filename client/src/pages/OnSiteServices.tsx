import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// On-Site Services Page
export default function OnSiteServices() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">On-Site IT Services</h1>
      <p className="mb-6 text-lg text-gray-700">Home and office visits, device installations, and network setup. Scheduled after booking and availability confirmation.</p>
      <ul className="mb-6 list-disc ml-6 text-gray-700">
        <li>Home visits</li>
        <li>Office visits</li>
        <li>Workstation & network setup</li>
        <li>Device installations</li>
      </ul>
      {/* Booking integration (Acuity) */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Request On-Site Service</button>
      </div>
      <Link href="/book-consultation">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Book Consultation</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Need on-site help?</h2>
        <Link href="/on-site-services">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Request On-Site Service</button>
        </Link>
        <Link href="/book-consultation">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Book Consultation</button>
        </Link>
      </CTASection>
    </div>
  );
}
