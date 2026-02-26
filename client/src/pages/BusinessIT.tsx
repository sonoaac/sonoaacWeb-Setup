import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// Business IT Support Page
export default function BusinessIT() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">Small Business IT Support</h1>
      <p className="mb-6 text-lg text-gray-700">Startup IT setup, business email, workstation rollout, security, and growth planning. Get expert help for your business.</p>
      <ul className="mb-6 list-disc ml-6 text-gray-700">
        <li>Startup IT setup</li>
        <li>Business email & tools</li>
        <li>Workstation rollout</li>
        <li>Security fundamentals</li>
        <li>Growth planning</li>
      </ul>
      {/* Booking integration (Acuity) */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Book Business Consultation</button>
      </div>
      <Link href="/book-consultation">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Book Consultation</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Business IT needs?</h2>
        <Link href="/business-it">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Book Business Consultation</button>
        </Link>
        <Link href="/book-consultation">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Book Consultation</button>
        </Link>
      </CTASection>
    </div>
  );
}
