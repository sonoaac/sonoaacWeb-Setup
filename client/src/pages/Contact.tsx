import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useSubmitContact } from "@/hooks/use-contact";
import { type InsertContactSubmission } from "@shared/routes";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const inputClass =
  "w-full px-4 py-3 bg-black border border-green-900 text-green-200 text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = useSubmitContact();

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(data, { onSuccess: () => reset() });
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
              — Contact
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-green-100 mb-6">
              Let's talk about<br />your tech needs.
            </h1>
            <p className="text-green-600 text-base leading-relaxed max-w-xl">
              Whether you need remote support, an on-site visit, or a new website —
              reach out and we'll get you sorted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Form */}
            <motion.div {...fadeUp}>
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
                01 / Send a Message
              </span>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-green-500 uppercase tracking-[0.2em] mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={inputClass + " resize-none"}
                    placeholder="Describe your issue or project..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </button>

                {submitContact.isSuccess && (
                  <p className="text-green-500 text-xs uppercase tracking-[0.15em] text-center">
                    Message sent — we'll be in touch within 24 hours.
                  </p>
                )}
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
                02 / Direct Contact
              </span>
              <div className="space-y-8">
                <div className="border-l-2 border-green-800 pl-5">
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">
                    Email
                  </h3>
                  <p className="text-green-300 text-sm mb-1">contact@sonoaac.com</p>
                  <p className="text-green-700 text-xs">Response within 24 hours</p>
                </div>

                <div className="border-l-2 border-green-800 pl-5">
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">
                    Location
                  </h3>
                  <p className="text-green-300 text-sm mb-1">New York, NY</p>
                  <p className="text-green-700 text-xs">Remote support available worldwide</p>
                </div>

                <div className="border-l-2 border-green-800 pl-5">
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">
                    Hours
                  </h3>
                  <p className="text-green-300 text-sm mb-1">By appointment</p>
                  <p className="text-green-700 text-xs">Walk-ins available at additional charge</p>
                </div>

                <div className="border-l-2 border-green-800 pl-5">
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">
                    Remote Sessions
                  </h3>
                  <p className="text-green-300 text-sm mb-1">Zoom · AnyDesk · TeamViewer</p>
                  <p className="text-green-700 text-xs">Available globally</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
