import { Link } from "wouter";
import CTASection from "@/components/layout/CTASection";

// On-Site Services Page
export default function OnSiteServices() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16">
      <h1 className="text-3xl font-bold mb-4">On-Site IT Services</h1>
      <p className="mb-6 text-lg text-gray-700">Home and office visits, device installations, and network setup. Scheduled after booking and availability confirmation.</p>
      <ul className="mb-6 list-disc ml-6 text-gray-700">
        <li>Home visits</li>
        <li>Office visits</li>
        <li>Workstation & network setup</li>
        <li>Device installations</li>
      </ul>
      {/* Acuity Scheduling booking link for On-Site Service Request */}
      <div className="mb-8">
        {/*
          Booking flow: User is sent to Acuity external booking page for On-Site Service Request.
          Acuity form should collect:
            - Name
            - Email
            - Location (State/Country)
            - Service interest (On-Site Service)
            - Notes/Issue description
          If embed is desired, replace <a> with iframe.
        */}
        <a
          href="https://your-acuity-link.com/schedule.php?appointmentType=OnSiteService"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-6 py-3 bg-green-500 text-white rounded-lg font-semibold text-center w-full sm:w-auto hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          Request On-Site Service
        </a>
      </div>
      <Link href="/book-consultation">
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full sm:w-auto">Book Consultation</button>
      </Link>
      <CTASection>
        <h2 className="text-2xl font-bold mb-4">Need on-site help?</h2>
        <Link href="/on-site-services">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold mr-2 mb-2">Request On-Site Service</button>
        </Link>
        <Link href="/book-consultation">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold mb-2">Book Consultation</button>
        </Link>
      </CTASection>
    </div>
  );
}
