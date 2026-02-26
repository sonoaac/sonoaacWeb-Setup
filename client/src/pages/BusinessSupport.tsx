import { Link } from "wouter";

// Small Business IT Support Page Stub
export default function BusinessSupport() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Small Business IT Support</h1>
      <p className="mb-6 text-lg text-gray-700">Startup IT setup, business email, workstation rollout, security, and growth planning. Get expert help for your business.</p>
      {/* Booking integration point */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">Book Business Consultation</button>
      </div>
      <Link href="/consultation">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">Book Consultation</button>
      </Link>
    </div>
  );
}
