import { Link } from "wouter";

// Fully Configured Device Sales Page Stub
export default function DeviceSales() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Fully Configured Device Sales</h1>
      <p className="mb-6 text-lg text-gray-700">Get a device recommended, procured, and fully configured for your needs. Delivery available after setup.</p>
      {/* Booking integration point */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">Request Custom Device Quote</button>
      </div>
      <Link href="/device-setup">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">Setup My Device</button>
      </Link>
    </div>
  );
}
