import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const inputClass =
  "w-full px-4 py-3 bg-black border border-green-900 text-green-200 text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";

const selectClass =
  "w-full px-4 py-3 bg-black border border-green-900 text-green-200 text-sm focus:border-green-500 focus:outline-none transition-colors appearance-none";

export default function MyTech() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessOrPersonal: "",
    deviceType: "",
    useCase: "",
    mustHaves: "",
    contact: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ businessOrPersonal: "", deviceType: "", useCase: "", mustHaves: "", contact: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — My Tech
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-green-100 mb-6">
              Get Matched to<br />the Right Tech.
            </h1>
            <p className="text-green-600 text-base leading-relaxed max-w-xl mb-8">
              Not sure what to buy? Tell us your needs and we'll recommend the right
              laptop, desktop, iPad, or setup — and configure it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#recommendation" className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors text-center">
                Get Matched
              </a>
              <Link href="/book-consultation">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / Who It's For
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-green-100 mb-10">
              Perfect for Any Use Case
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-green-900/20">
              {[
                { title: "Mechanic Shops", detail: "Invoicing, QuickBooks, parts lookup, and front-desk management." },
                { title: "Beauty & Salons", detail: "Scheduling, POS, customer management, and front-desk iPads." },
                { title: "Restaurants & Food", detail: "POS setup, inventory, online ordering, and kitchen displays." },
                { title: "Retail & Small Offices", detail: "Workstations, POS, inventory, and multi-user environments." },
                { title: "Students", detail: "Reliable laptops for school, notes, research, and creative work." },
                { title: "Personal Use", detail: "Everyday computing — web browsing, media, video calls, and more." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-xs font-bold text-green-300 uppercase tracking-[0.15em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-green-700 text-xs leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example setups */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / Example Setups
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-green-100 mb-10">
              Common Recommendations
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Front Desk iPad Setup",
                  detail: "iPad with scheduling app, POS, and digital forms. Great for check-ins, payments, and customer-facing interactions. Wall-mounted or stand-mounted with card reader.",
                },
                {
                  title: "Small Business Desktop",
                  detail: "Full tower or compact desktop for invoicing, QuickBooks, document management, and multitasking. Dual-monitor setup recommended for productivity.",
                },
                {
                  title: "Mobile Laptop Setup",
                  detail: "Lightweight laptop for travel, school, and everyday use. I'll come to your location to install all software, configure virus protection, and set up accounts.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="flex flex-col sm:flex-row sm:gap-8 py-5 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-green-300 uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-2 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-green-600 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendation form */}
      <section id="recommendation" className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              03 / Get Matched
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-green-100 mb-4">
              Tell Us What You Need
            </h2>
            <p className="text-green-600 text-sm mb-10 leading-relaxed">
              Answer a few quick questions and we'll match you with the right setup.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-green-700 p-8"
              >
                <h3 className="text-sm font-bold text-green-300 uppercase tracking-[0.2em] mb-3">
                  Request Received
                </h3>
                <p className="text-green-500 text-sm leading-relaxed">
                  We'll reach out to confirm your needs. After a quick consult,
                  we'll send a custom recommendation with exact specs and pricing.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Business or Personal?
                  </label>
                  <select
                    name="businessOrPersonal"
                    value={formData.businessOrPersonal}
                    onChange={handleInputChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select...</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Device Type
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleInputChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select device...</option>
                    <option value="laptop">Laptop</option>
                    <option value="desktop">Desktop</option>
                    <option value="ipad">iPad</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    What do you need it for?
                  </label>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    placeholder="e.g. invoicing, scheduling, school, editing, trading, gaming, POS..."
                    required
                    className={inputClass + " resize-none"}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Any must-haves?
                  </label>
                  <textarea
                    name="mustHaves"
                    value={formData.mustHaves}
                    onChange={handleInputChange}
                    placeholder="e.g. touchscreen, large screen, lightweight, lots of storage..."
                    className={inputClass + " resize-none"}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="your@email.com or (123) 456-7890"
                    required
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors"
                >
                  Request My Recommendation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
