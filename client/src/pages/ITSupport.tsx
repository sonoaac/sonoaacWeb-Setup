import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// IT Support & On-Site Services Page Stub
export default function ITSupport() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">IT Support & On-Site Services</h1>
      <p className="mb-6 text-lg text-gray-700">Remote support is available globally. On-site visits are scheduled after booking and availability confirmation. Get help with device setup, troubleshooting, and network configuration.</p>
      {/* Booking integration point */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Request IT Support</button>
      </div>
      <Link href="/book-consultation">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Book Consultation</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Need IT help?</h2>
        <Link href="/it-support">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Request IT Support</button>
        </Link>
        <Link href="/book-consultation">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Book Consultation</button>
        </Link>
      </CTASection>
    </div>
  );
}
