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
      {/* Acuity Scheduling booking link for Consultation */}
      <div className="mb-8">
        {/*
          Booking flow: User is sent to Acuity external booking page for Consultation.
          Acuity form should collect:
            - Name
            - Email
            - Location (State/Country)
            - Service interest (Consultation)
            - Notes/Issue description
          If embed is desired, replace <a> with iframe.
        */}
        <a
          href="https://your-acuity-link.com/schedule.php?appointmentType=Consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-6 py-3 bg-green-500 text-white rounded-lg font-semibold text-center w-full sm:w-auto hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          Book Consultation
        </a>
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
