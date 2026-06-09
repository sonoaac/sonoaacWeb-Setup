import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useSubmitContact } from "@/hooks/use-contact";

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
  "w-full px-4 py-3 bg-black border border-green-900 text-white text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
              Contact & Booking
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Talk About<br />Your Tech.
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl">
              Book a consultation, request support, or ask a question.
              Remote and in-person options available for individuals and businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation types */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              What We Cover
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
              Consultation Types
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "IT Consultations",
                  detail: "Review your current setup, identify issues, and get clear recommendations — no jargon.",
                },
                {
                  title: "Device Planning",
                  detail: "Not sure what to buy? We'll match you with the right laptop, desktop, iPad, or setup for your workflow.",
                },
                {
                  title: "Business Tech Strategy",
                  detail: "Plan your IT infrastructure for a new or growing business — email, workstations, security, and more.",
                },
                {
                  title: "Web Project Scoping",
                  detail: "Discuss your website needs and get a clear scope, timeline, and quote for your project.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-green-900 pl-5 py-1 hover:border-green-600 transition-colors"
                >
                  <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.15em] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scheduling policy */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Scheduling
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Appointment Policy
            </h2>
            <ul className="space-y-4 list-disc pl-5 marker:text-green-400 mb-8">
              {[
                "All consultations are by appointment — book online or contact us directly",
                "Walk-in consultations are available at an additional charge",
                "Remote consultations are available worldwide via Zoom",
                "On-site appointments are confirmed after booking and availability check",
                "Please review the Service Agreement before your first appointment",
              ].map((item) => (
                <li key={item} className="text-gray-300 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/service-agreement">
              <button className="text-xs text-green-800 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                Read Service Agreement
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Calendly Booking */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Book Online
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Schedule an Appointment
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Pick a time that works for you — slots update in real time. You'll receive a confirmation email automatically.
            </p>
            <div
              className="calendly-inline-widget w-full overflow-hidden"
              data-url="https://calendly.com/sonoaac?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e5e7eb&primary_color=4ade80"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Form + Contact info */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Form */}
            <motion.div {...fadeUp}>
              <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
                Send a Message
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
                    placeholder="Describe your issue, project, or question..."
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
                Direct Contact
              </span>
              <div className="space-y-8">
                {[
                  {
                    label: "Email",
                    value: "sonoaac@gmail.com",
                    sub: "Response within 24 hours",
                  },
                  {
                    label: "Phone",
                    value: "(201) 349-6917",
                    sub: "By appointment — call or text",
                  },
                  {
                    label: "Location",
                    value: "New Jersey",
                    sub: "Remote support available worldwide",
                  },
                  {
                    label: "Hours",
                    value: "By appointment",
                    sub: "Walk-ins available at additional charge",
                  },
                  {
                    label: "Remote Sessions",
                    value: "Zoom · AnyDesk · TeamViewer",
                    sub: "Available globally",
                  },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-green-800 pl-5">
                    <h3 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-2">
                      {item.label}
                    </h3>
                    <p className="text-white text-sm mb-1">{item.value}</p>
                    <p className="text-gray-400 text-xs">{item.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
