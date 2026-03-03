import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Section = ({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div {...fadeUp} className="py-10 border-b border-green-900/25">
    <div className="flex gap-6 sm:gap-10 flex-col sm:flex-row">
      <span className="text-xs text-green-900 tracking-[0.3em] font-bold shrink-0 mt-1">
        {num}
      </span>
      <div className="flex-1">
        <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">
          {title}
        </h2>
        <div className="text-gray-300 text-sm leading-relaxed space-y-3">{children}</div>
      </div>
    </div>
  </motion.div>
);

export default function ServiceAgreement() {
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
              — Legal
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Service Agreement
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-4">
              By booking or using any Sonoaac service, you agree to the terms outlined
              below. Please read carefully before your first appointment.
            </p>
            <p className="text-green-800 text-xs uppercase tracking-[0.2em]">
              Last updated: 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agreement body */}
      <section className="px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Section num="01" title="About Sonoaac">
            <p>
              Sonoaac is a registered U.S. business providing IT support, troubleshooting,
              device setup, web development, and related digital services. Services are
              operated by an IT Support &amp; Digital Solutions Specialist.
            </p>
            <p>
              Sonoaac operates as a service provider only. We do not sell hardware or
              software directly. All product recommendations are advisory in nature.
            </p>
          </Section>

          <Section num="02" title="Services Provided">
            <p>Services include but are not limited to:</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-green-400">
              {[
                "Remote IT support via Zoom, AnyDesk, or TeamViewer",
                "On-site IT support — home and office visits",
                "Software troubleshooting and OS repair",
                "Virus and malware removal",
                "Device setup, configuration, and optimization",
                "PC and laptop resets",
                "New device setup",
                "Web development and design",
                "Business IT consulting",
                "Tech recommendations for devices and software",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section num="03" title="Appointments & Scheduling">
            <p>
              All services are performed by appointment only. Clients must book in advance
              through the Sonoaac booking system or by contacting us directly.
            </p>
            <p>
              Walk-in service requests are accepted at Sonoaac's discretion and are subject
              to an additional walk-in charge. Walk-in availability is not guaranteed.
            </p>
            <p>
              Appointment times are confirmed after booking. On-site visit availability
              is subject to location and scheduling. Sonoaac reserves the right to reschedule
              with reasonable notice.
            </p>
            <p>
              Clients should be present and available for the duration of service, particularly
              for on-site visits and remote sessions requiring account access.
            </p>
          </Section>

          <Section num="04" title="Payment & Fees">
            <p>
              Payment is due at the time of service unless otherwise agreed in writing.
              Accepted payment methods will be communicated at the time of booking.
            </p>
            <p>
              Service fees vary based on the type and complexity of work. Estimates provided
              before service commencement are based on initial assessment and may be revised
              if the scope of work changes.
            </p>
            <p>
              Walk-in appointments are charged at a higher rate than scheduled appointments.
              Travel fees may apply for on-site visits outside standard service areas.
            </p>
          </Section>

          <Section num="05" title="Software Purchases">
            <p>
              Sonoaac does not sell software. Any software recommended is purchased directly
              by the client through official retailers or vendors.
            </p>
            <p className="font-bold text-green-400">
              All software purchases are non-refundable once acquired. Sonoaac provides
              recommendations only and is not responsible for software purchases made by
              the client.
            </p>
            <p>
              Sonoaac recommends only licensed, legitimate software. We do not assist
              with or endorse the use of unlicensed, pirated, or unauthorized software.
            </p>
          </Section>

          <Section num="06" title="Remote Access Consent">
            <p>
              For remote support sessions, the client grants Sonoaac temporary access to
              their device using agreed tools (Zoom, AnyDesk, TeamViewer, or similar).
            </p>
            <p>
              Remote access is used solely to perform the requested service. Sonoaac will
              not access, copy, or retain personal files, passwords, or data beyond what
              is necessary to resolve the issue.
            </p>
            <p>
              The client may end the remote session at any time. By initiating a remote
              session, the client acknowledges and consents to this access.
            </p>
          </Section>

          <Section num="07" title="Data & Privacy">
            <p>
              Sonoaac does not collect, store, or share personal data beyond what is
              necessary to perform the requested service. Contact information provided
              at booking is used for communication and scheduling purposes only.
            </p>
            <p>
              Clients are responsible for backing up their own data before any service
              involving system changes, resets, or reinstallations. Sonoaac strongly
              recommends a full backup before any major work begins.
            </p>
          </Section>

          <Section num="08" title="Limitation of Liability">
            <p>
              Sonoaac provides services on a best-effort basis. While every effort is made
              to resolve issues professionally and thoroughly, Sonoaac does not guarantee
              specific outcomes or results.
            </p>
            <p>
              Sonoaac is not liable for data loss, hardware failure, or software issues
              that arise after service has been performed, provided service was completed
              in good faith and in accordance with this agreement.
            </p>
            <p>
              In no event shall Sonoaac's liability exceed the amount paid for the specific
              service in question.
            </p>
          </Section>

          <Section num="09" title="Client Responsibilities">
            <p>
              Clients are responsible for providing accurate information about their device,
              issue, and environment at the time of booking and during service.
            </p>
            <p>
              For on-site visits, clients must ensure the service area is accessible and
              that relevant devices and accounts are available.
            </p>
            <p>
              Clients are responsible for maintaining account credentials. Sonoaac is not
              responsible for access issues caused by forgotten or changed passwords after
              service completion.
            </p>
          </Section>

          <Section num="10" title="Contact & Disputes">
            <p>
              For questions about this agreement or any service, contact Sonoaac directly
              at <span className="text-green-400">sonoaac@gmail.com</span>.
            </p>
            <p>
              Disputes shall first be addressed through direct communication. Sonoaac is
              committed to resolving client concerns fairly and promptly.
            </p>
            <p>
              This agreement is governed by the laws of the State of New York, United States.
              Use of Sonoaac services constitutes acceptance of these terms.
            </p>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Questions about this agreement?
            </h2>
            <p className="text-gray-300 text-sm mb-8">
              Contact us directly at sonoaac@gmail.com or reach out before your
              first appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
              <Link href="/book-consultation">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
