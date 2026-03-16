import { motion } from "framer-motion";
import { Link } from "wouter";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as any,
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Services() {
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
              — Services
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              IT Support &amp;<br />Digital Solutions
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Remote troubleshooting, on-site visits, software fixes, device setup, business IT,
              and custom web development — everything your home or business needs.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-green-800 uppercase tracking-[0.2em]">
              {[
                ["Remote Support", "#remote"],
                ["On-Site", "#onsite"],
                ["Software Fixes", "#software"],
                ["Device Setup", "#device-setup"],
                ["Business IT", "#business"],
                ["Web Dev", "#web"],
              ].map(([label, href]) => (
                <a key={label} href={href} className="hover:text-green-400 transition-colors">
                  {label} ↓
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 01 — Remote IT Support */}
      <section id="remote" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              01 / Remote IT Support
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Help Without a Site Visit
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Secure remote sessions via Zoom, AnyDesk, or TeamViewer. We connect to your
              device with your consent and resolve issues in real time.
            </p>
            <div className="space-y-0">
              {[
                {
                  title: "Virus & Malware Removal",
                  detail: "Full scan, removal, and prevention setup. Protect your device and data.",
                },
                {
                  title: "Microsoft 365 Setup & Troubleshooting",
                  detail: "Outlook, Teams, Word, Excel, OneDrive — setup, login issues, and configuration.",
                },
                {
                  title: "OS Errors & System Issues",
                  detail: "Blue screens, slow boot, Windows Update failures, system file corruption.",
                },
                {
                  title: "App Crashes & Software Errors",
                  detail: "Diagnose and resolve application errors, freezes, and compatibility issues.",
                },
                {
                  title: "Email Configuration",
                  detail: "Setup and troubleshooting for Gmail, Outlook, and business email accounts.",
                },
                {
                  title: "Driver & Hardware Issues",
                  detail: "Missing or outdated drivers, device recognition errors, peripheral setup.",
                },
                {
                  title: "Security Audits",
                  detail: "Review your security posture, update settings, and recommend improvements.",
                },
                {
                  title: "PC / Laptop Full Reset",
                  detail: "Clean Windows reinstall to remove malware, resolve persistent errors, and restore speed.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:gap-8 py-4 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-1 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 — On-Site Services */}
      <section id="onsite" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              02 / On-Site Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              We Come to You
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Home and office visits for hands-on setup, troubleshooting, and installs.
              All on-site appointments are scheduled in advance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20 mb-10">
              {[
                {
                  title: "Home Visits",
                  detail: "Personal device setup, troubleshooting, Wi-Fi issues, and smart home tech at your residence.",
                },
                {
                  title: "Office Visits",
                  detail: "Multi-workstation setup, network configuration, and team-wide device management.",
                },
                {
                  title: "Workstation Setup",
                  detail: "Full desk setup — PC, monitors, peripherals, software, and user accounts configured.",
                },
                {
                  title: "Device Installations",
                  detail: "Printers, scanners, external drives, docking stations, and other peripherals.",
                },
                {
                  title: "Network Configuration",
                  detail: "Router setup, Wi-Fi optimization, LAN configuration, and network security hardening.",
                },
                {
                  title: "Hardware Troubleshooting",
                  detail: "Diagnosing and repairing hardware issues — components, connections, and upgrades.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <div className="border-l-2 border-green-900 pl-5">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-green-400 font-bold">Scheduling:</span> All on-site services are by appointment.
                Walk-ins are available at an additional charge. Contact us to confirm availability.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 03 — Software & App Fixes */}
      <section id="software" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              03 / Software &amp; App Fixes
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Common Issues We Resolve
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Available remotely or on-site for Windows and Mac. If your device is misbehaving,
              we can diagnose and fix it.
            </p>
            <div className="space-y-0 mb-10">
              {[
                {
                  title: "Virus & Malware",
                  detail: "Detection, removal, and ongoing protection setup to keep your system clean.",
                },
                {
                  title: "Microsoft 365",
                  detail: "Login errors, licensing issues, sync problems, and full suite configuration.",
                },
                {
                  title: "OS Errors",
                  detail: "Blue screens, update failures, boot loops, corrupted system files.",
                },
                {
                  title: "App Crashes",
                  detail: "Repeated crashes, freezing, and software conflicts diagnosed and resolved.",
                },
                {
                  title: "Login Issues",
                  detail: "Account lockouts, password resets, Windows Hello, and two-factor authentication setup.",
                },
                {
                  title: "Driver & Hardware Errors",
                  detail: "Missing, outdated, or conflicting drivers reinstalled and configured.",
                },
                {
                  title: "Performance Issues",
                  detail: "Slow startup, high CPU/RAM usage, background bloatware removed.",
                },
                {
                  title: "PC / Laptop Full Reset",
                  detail: "Complete Windows reinstall — wipes the slate clean. Data backup included.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:gap-8 py-4 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-1 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <div className="border-l-2 border-green-900 pl-5">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-green-400 font-bold">Software policy:</span> Sonoaac recommends software
                but does not sell licenses directly. Software purchases are made by the client and are
                non-refundable. We do not install unlicensed or pirated software.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04 — Device Setup */}
      <section id="device-setup" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              04 / Device Setup &amp; Configuration
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Use, Right Away
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              New device or old — we configure everything from scratch so you can focus on
              work, not setup. Available remotely or in person.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20 mb-8">
              {[
                {
                  title: "New Device Setup",
                  detail: "Unbox, configure, install essential software, and connect all accounts on your new laptop, desktop, or iPad.",
                },
                {
                  title: "PC & Laptop Reset",
                  detail: "Full reinstall from scratch — removes clutter, malware, and slow-down. Brings device back to peak performance.",
                },
                {
                  title: "Software Installation",
                  detail: "Install, configure, and update any productivity, business, or creative software you need.",
                },
                {
                  title: "Security Setup",
                  detail: "Antivirus, firewall, Windows Defender tuning, and secure password management setup.",
                },
                {
                  title: "Data Transfer",
                  detail: "Move files, settings, and accounts from an old device to a new one safely and completely.",
                },
                {
                  title: "Account Configuration",
                  detail: "Email, Microsoft 365, Google Workspace, iCloud, and all other accounts set up and synced.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <Link href="/my-tech">
              <button className="text-xs text-green-800 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                Need a device recommendation? → My Tech
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 05 — Business IT */}
      <section id="business" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              05 / Business IT Solutions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              IT Built for Small Business
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              From day-one startup setup to ongoing IT management — Sonoaac keeps your
              business tech running so you can focus on what you do best.
            </p>
            <div className="space-y-0 mb-10">
              {[
                {
                  title: "Startup IT Setup",
                  detail: "Get your first office or home office fully operational — computers, network, software, and accounts.",
                },
                {
                  title: "Business Email & Tools",
                  detail: "Microsoft 365 or Google Workspace for your whole team — email, calendar, shared drives, and video calls.",
                },
                {
                  title: "Workstation Rollout",
                  detail: "Deploy multiple workstations for new hires or office expansions. Consistent setup across all machines.",
                },
                {
                  title: "Security Fundamentals",
                  detail: "Antivirus, password policies, two-factor authentication, and employee security best practices.",
                },
                {
                  title: "Network Configuration",
                  detail: "Business Wi-Fi, router setup, wired LAN, guest network isolation, and remote access VPN.",
                },
                {
                  title: "Ongoing IT Support",
                  detail: "Recurring support for day-to-day IT issues, updates, and equipment as your team grows.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:gap-8 py-4 border-b border-green-900/20"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] sm:w-56 shrink-0 mb-1 sm:mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <div className="border-l-2 border-green-900 pl-5">
              <p className="text-green-800 text-xs uppercase tracking-[0.15em] mb-2">Works for</p>
              <p className="text-gray-300 text-sm">
                Startups · Service businesses · Retail shops · Freelancers · Growing teams
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 06 — Web Development */}
      <section id="web" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              06 / Web Development
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Websites for Small Businesses
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Clean, professional web presence built around your business needs.
              No templates — every site is custom-designed and built for performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20 mb-14">
              {[
                {
                  title: "Custom Website Design",
                  description: "Tailored design built to reflect your brand. Clean, professional layouts for any industry.",
                },
                {
                  title: "Mobile-Responsive Builds",
                  description: "Every site is built mobile-first and tested across all screen sizes.",
                },
                {
                  title: "SEO Optimization",
                  description: "On-page SEO, fast load times, and structured markup to help clients find you.",
                },
                {
                  title: "Admin & CMS Integration",
                  description: "Easy-to-manage dashboards so you can update content without developer help.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-black p-6 hover:bg-green-950/20 transition-colors"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Live Demos */}
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Live Demos
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">See It In Action</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Fully functional UI components built for real clients. This is what Sonoaac builds.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-6">
                  Beauty &amp; Salon Booking
                </h4>
                <BraidingDemo />
              </div>
              <div>
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-6">
                  Automotive Service Menu
                </h4>
                <MechanicDemo />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              — Get Started
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Ready to work together?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto">
                  Book Consultation
                </button>
              </Link>
              <Link href="/my-tech">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Device Matching
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
