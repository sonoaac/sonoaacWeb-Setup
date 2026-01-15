import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, Send } from "lucide-react";
import { useSubmitContact } from "@/hooks/use-contact";
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

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Let's talk about your project.</h1>
              <p className="text-xl text-gray-500 leading-relaxed">
                Whether you need a custom PC build or a website overhaul, we're here to help. Reach out and let's get started.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 shrink-0">
                  <Mail />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email Us</h3>
                  <p className="text-gray-500">contact@sonoaac.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                  <Phone />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Call Us</h3>
                  <p className="text-gray-500">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Location</h3>
                  <p className="text-gray-500">New York, NY</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
                  placeholder="jane@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-green-500 hover:shadow-xl hover:shadow-pink-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
}
