import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// Software & App Fixes Page Stub
export default function SoftwareFixes() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">Software & App Fixes</h1>
      <p className="mb-6 text-lg text-gray-700">Resolve Microsoft 365 issues, app crashes, login problems, and OS errors. Fast, professional troubleshooting for all devices.</p>
      {/* Booking integration point */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold w-full sm:w-auto">Fix My Software Issue</button>
      </div>
      <Link href="/it-support">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Request IT Support</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Software issues?</h2>
        <Link href="/software-fixes">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Fix My Software Issue</button>
        </Link>
        <Link href="/it-support">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Request IT Support</button>
        </Link>
      </CTASection>
    </div>
  );
}
