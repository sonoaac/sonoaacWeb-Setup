import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// Computer & Device Setup Page Stub
export default function DeviceSetup() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">Computer & Device Setup</h1>
      <p className="mb-6 text-lg text-gray-700">Get your new or existing device fully configured, optimized, and secured. Business and personal setups available.</p>
      {/* Booking integration point */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Setup My Device</button>
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Buy & Setup a Device</button>
      </div>
      <Link href="/buy-ready-computer">
        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold w-full sm:w-auto">Request Device Quote</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Need device setup?</h2>
        <Link href="/device-setup">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Setup My Device</button>
        </Link>
        <Link href="/buy-ready-computer">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Buy & Setup a Device</button>
        </Link>
      </CTASection>
    </div>
  );
}
