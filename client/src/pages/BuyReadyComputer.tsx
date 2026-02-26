import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// Buy Ready Computer Page
export default function BuyReadyComputer() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">Buy a Ready-to-Use Computer</h1>
      <p className="mb-6 text-lg text-gray-700">Get a fully configured device delivered to your door. Business and personal options available.</p>
      <ul className="mb-6 list-disc ml-6 text-gray-700">
        <li>Device recommendation</li>
        <li>Procurement or customer-provided device</li>
        <li>Full configuration before delivery</li>
      </ul>
      {/* Booking integration (Acuity) */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Request Device Quote</button>
      </div>
      <Link href="/device-setup">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Setup My Device</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Need a new device?</h2>
        <Link href="/buy-ready-computer">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Request Device Quote</button>
        </Link>
        <Link href="/device-setup">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Setup My Device</button>
        </Link>
      </CTASection>
    </div>
  );
}
