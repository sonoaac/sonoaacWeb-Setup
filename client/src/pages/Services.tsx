import { motion } from "framer-motion";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";
import { Code, Server, Smartphone, Globe } from "lucide-react";

export default function Services() {
  const serviceCards = [
    {
      icon: Globe,
      title: "Website Development",
      description: "Custom websites tailored to your brand. From simple landing pages to complex e-commerce stores.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Server,
      title: "Hosting & Maintenance",
      description: "We handle the technical stuff so you don't have to. Secure hosting, daily backups, and updates.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Ensure your site looks stunning on every device. Mobile-first design approach.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Code,
      title: "Custom Applications",
      description: "Need specialized internal tools? We build custom web apps to streamline your business.",
      color: "bg-pink-50 text-pink-600"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Our Services
        </motion.h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We bring enterprise-level quality to small businesses at prices that make sense.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
      </div>

      {/* Live Demos Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-gray-500 max-w-xl">
                Explore our live component demos. These are fully functional UI elements we've built for clients in various industries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">1</span>
                Beauty & Salon Booking
              </h3>
              <BraidingDemo />
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
                Automotive Service Menu
              </h3>
              <MechanicDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
