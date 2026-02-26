import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// Book Consultation Page
export default function BookConsultation() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">Book a Consultation</h1>
      <p className="mb-6 text-lg text-gray-700">Get expert advice for your tech needs. Available for individuals and businesses worldwide.</p>
      <ul className="mb-6 list-disc ml-6 text-gray-700">
        <li>IT consultations</li>
        <li>Device setup planning</li>
        <li>Business tech strategy</li>
      </ul>
      {/* Booking integration (Acuity) */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Start Booking</button>
      </div>
      <Link href="/it-support">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Request IT Support</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <Link href="/book-consultation">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Book Consultation</button>
        </Link>
        <Link href="/it-support">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Request IT Support</button>
        </Link>
      </CTASection>
    </div>
  );
}
