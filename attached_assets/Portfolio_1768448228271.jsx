import React, { useState } from "react";

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-green-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-pink-600 transition text-xl"
        >
          Get Quotes
        </button>
      </div>
      {/* Right Side Booklet */}
      <div
        className={`w-1/2 bg-white shadow-2xl p-8 transition-all duration-700 ease-in-out overflow-y-auto ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ minHeight: "100vh", position: "relative" }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-pink-500 hover:text-green-500 text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-pink-500">
          Website Features & Build Details
        </h2>
        <ol className="list-decimal ml-6 space-y-6 text-gray-800">
          <li>
            <div className="font-semibold mb-2">Number of Pages</div>
            <ul className="list-disc ml-6">
              <li>Single Page</li>
              <li>2 Pages</li>
              <li>3 Pages</li>
              <li>4 Pages</li>
              <li>5 Pages</li>
              <li>Custom</li>
            </ul>
          </li>
          <li>
            <div className="font-semibold mb-2">Website Complexity / Type</div>
            <ul className="list-disc ml-6">
              <li>
                Basic (HTML, CSS, JavaScript)
                <br />
                <span className="text-gray-500">
                  Clean, simple, static website
                </span>
              </li>
              <li>
                Advanced (React + TypeScript)
                <br />
                <span className="text-gray-500">
                  Dynamic components, better performance
                </span>
              </li>
              <li>
                Full Stack (Next.js + API)
                <br />
                <span className="text-gray-500">
                  Scalable, connected to backend
                </span>
              </li>
            </ul>
          </li>
          <li>
            <div className="font-semibold mb-2">Core Features</div>
            <ul className="list-disc ml-6">
              <li>Responsive design (mobile/tablet/desktop)</li>
              <li>Navigation menu (header + footer)</li>
              <li>Contact / Booking form</li>
              <li>About & Services section</li>
              <li>Location / Map integration</li>
              <li>Gallery or Product showcase</li>
              <li>Blog / News section</li>
              <li>Client testimonials</li>
              <li>Social media links</li>
              <li>Newsletter signup</li>
            </ul>
          </li>
          <li>
            <div className="font-semibold mb-2">Additional Options</div>
            <ul className="list-disc ml-6">
              <li>SEO optimization</li>
              <li>Branding & UI Design</li>
              <li>
                E commerce setup (cart, checkout, product pages)
              </li>
              <li>Maintenance & Support</li>
              <li>Hosting & Deployment setup</li>
              <li>Custom domain connection</li>
              <li>Multi language support</li>
              <li>CMS (Content Management System)</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
