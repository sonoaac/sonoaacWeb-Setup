import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Laptop, Monitor, Tablet } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { StickyNav } from "@/components/layout/StickyNav";

export default function MyTech() {
  const tabs = [
    { id: "hero", label: "Overview" },
    { id: "audiences", label: "For You" },
    { id: "recommendation", label: "Get Matched" },
  ];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessOrPersonal: "",
    deviceType: "",
    useCase: "",
    mustHaves: "",
    contact: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your API
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        businessOrPersonal: "",
        deviceType: "",
        useCase: "",
        mustHaves: "",
        contact: "",
      });
    }, 3000);
  };

  const exampleSetups = [
    {
      title: "Front desk iPad setup",
      description: "Great for check ins, scheduling, payments, and menus",
      icon: Tablet,
    },
    {
      title: "Small business desktop setup",
      description: "Great for invoicing, QuickBooks, multitasking, and storage",
      icon: Monitor,
    },
    {
      title: "Mobile laptop setup",
      description: "Great for travel, school, and everyday use - I'll come to your place to setup all software, virus protection, etc",
      icon: Laptop,
    },
  ];

  const targetAudiences = [
    { name: "Mechanic shops", icon: Zap },
    { name: "Braiding and beauty shops", icon: Users },
    { name: "Food spots and restaurants", icon: Zap },
    { name: "Retail and small offices", icon: Zap },
    { name: "Students and personal use", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="et-hero-tabs bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            My Tech
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
            Get the right tech for your business or personal use.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            If you are not sure what to buy, I will match you with the right setup. Laptops, desktops, iPads, and everything you need around it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2 w-fit">
              Book a quick consult
              <ArrowRight size={20} />
            </button>
            <Link href="/my-tech/build-pc">
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg border-2 border-gray-300 transition-colors inline-flex items-center gap-2 w-fit">
                See example setups
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Sticky Navigation with Content */}
      <StickyNav tabs={tabs}>
        {/* Who This Is For Section */}
        <section className="et-slide" id="audiences">
          <div className="max-w-6xl w-full px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                Who this is for
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
                Perfect for small businesses and regular everyday use.
              </p>

              {/* Target Audiences */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
                {targetAudiences.map((audience, idx) => (
                  <motion.div
                    key={audience.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <audience.icon size={32} className="text-green-500 mb-3" />
                    <h3 className="font-semibold text-gray-900">{audience.name}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Example Cards */}
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Example setups</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exampleSetups.map((setup, idx) => (
                  <motion.div
                    key={setup.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <setup.icon size={40} className="text-green-500 mb-4" />
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{setup.title}</h4>
                    <p className="text-gray-600">{setup.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recommendation Form Section */}
        <section className="et-slide" id="recommendation" style={{ background: "#f3f4f6" }}>
          <div className="max-w-2xl w-full px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                Get Your Recommendation
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Answer a few quick questions and I'll match you with the perfect setup.
              </p>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-green-50 border-2 border-green-500 rounded-lg text-center"
                >
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Thank you!</h3>
                  <p className="text-green-800 mb-2">
                    I will reach out and confirm your needs.
                  </p>
                  <p className="text-green-800">
                    After the consult, I will send your custom recommendation page with exact specs.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Are you shopping for business or personal?
                    </label>
                    <select
                      name="businessOrPersonal"
                      value={formData.businessOrPersonal}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select an option</option>
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      What kind of device do you want?
                    </label>
                    <select
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select a device</option>
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop</option>
                      <option value="ipad">iPad</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      What do you need it for?
                    </label>
                    <textarea
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      placeholder="e.g., invoicing, scheduling, school, editing, content creation, trading, gaming, POS, etc."
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Any must haves?
                    </label>
                    <textarea
                      name="mustHaves"
                      value={formData.mustHaves}
                      onChange={handleInputChange}
                      placeholder="e.g., touchscreen, big screen, lightweight, lots of storage, fast"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email or phone
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="your@email.com or (123) 456-7890"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Request my recommendation
                    <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </StickyNav>
    </div>
  );
}
