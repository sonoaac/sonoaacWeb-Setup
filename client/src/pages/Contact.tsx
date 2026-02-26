import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, Send } from "lucide-react";
import { useSubmitContact } from "@/hooks/use-contact";
import { StickyNav } from "@/components/layout/StickyNav";
import { type InsertContactSubmission } from "@shared/routes";

// Schema specifically for the form (client-side validation)
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = useSubmitContact();

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const tabs = [
    { id: "message", label: "Send Message" },
    { id: "info", label: "Contact Info" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="et-hero-tabs bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Let's talk about your project.</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether you need a custom tech setup or a website overhaul, we're here to help. Reach out and let's get started.
          </p>
        </motion.div>
      </section>

      {/* Sticky Navigation with Content */}
      <StickyNav tabs={tabs}>
        {/* Message Section */}
        <section className="et-slide" id="message">
          <div className="max-w-2xl w-full px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm w-full"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                  <input
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full py-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="et-slide" id="info" style={{ background: "#f3f4f6" }}>
          <div className="max-w-3xl w-full px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-center mb-12">Other ways to reach us</h2>

              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white p-8 rounded-xl border border-gray-200"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                    <p className="text-gray-600 text-lg">contact@sonoaac.com</p>
                    <p className="text-gray-500 text-sm mt-2">We'll respond within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-4 bg-white p-8 rounded-xl border border-gray-200"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                    <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm mt-2">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4 bg-white p-8 rounded-xl border border-gray-200"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Location</h3>
                    <p className="text-gray-600 text-lg">New York, NY</p>
                    <p className="text-gray-500 text-sm mt-2">Available for remote and in-person meetings</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </StickyNav>
    </div>
  );
}
