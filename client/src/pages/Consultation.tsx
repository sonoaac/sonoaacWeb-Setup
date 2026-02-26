import { Link } from "wouter";

// Book Consultation Page Stub
export default function Consultation() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Book a Consultation</h1>
      <p className="mb-6 text-lg text-gray-700">Consultations cover IT advice, device setup, troubleshooting, and business tech planning. Available for individuals and businesses worldwide.</p>
      {/* Booking form integration point */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">Start Booking</button>
      </div>
      <Link href="/services">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">Explore Services</button>
      </Link>
    </div>
  );
}
