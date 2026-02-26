import { motion } from "framer-motion";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";
import { StickyNav } from "@/components/layout/StickyNav";
import { Code, Server, Smartphone, Globe } from "lucide-react";

export default function Services() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "demos", label: "Live Demos" },
  ];

  // serviceCards intentionally left empty per design request
  const serviceCards: Array<any> = [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="et-hero-tabs bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building clean, professional web solutions tailored to your business needs.
          </p>
        </motion.div>
      </section>

      {/* Sticky Navigation with Content */}
      <StickyNav tabs={tabs}>
        {/* Overview Section */}
        <section className="et-slide" id="overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center">Service Overview</h2>
              
              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {serviceCards.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-green-50 p-12 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">What We Include</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Custom website design and development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Mobile-responsive layouts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Fast, secure, and SEO-optimized</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Easy-to-manage admin dashboard</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Demos Section */}
        <section className="et-slide" id="demos" style={{ background: "#f3f4f6" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-center">See It In Action</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-center mb-16">
                Explore our live component demos. These are fully functional UI elements we've built for clients in various industries.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">1</span>
                    Beauty & Salon Booking
                  </h3>
                  <BraidingDemo />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold">2</span>
                    Automotive Service Menu
                  </h3>
                  <MechanicDemo />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </StickyNav>
    </div>
  );
}
