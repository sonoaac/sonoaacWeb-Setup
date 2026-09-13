import { motion } from "framer-motion";
import { Link } from "wouter";

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
              Services
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              IT Support &amp;<br />Digital Solutions
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Remote and on-site help, computer and printer setup, Google Workspace, local
              SEO, and web development — everything your home or business needs.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-green-800 uppercase tracking-[0.2em]">
              {[
                ["Remote Support", "#remote"],
                ["On-Site", "#onsite"],
                ["Computer & Printer Setup", "#software"],
                ["Device Setup", "#device-setup"],
                ["Google Workspace", "#business"],
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
              Remote IT Support
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
                  title: "Google Workspace & Email",
                  detail: "Gmail, Google Workspace apps, Calendar, Drive, and business email on Google — setup, login issues, and configuration.",
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
                  title: "Printer Setup",
                  detail: "Install and configure printers and scanners, Wi-Fi printing, and driver issues.",
                },
                {
                  title: "PC / Laptop Full Reset",
                  detail: "Clean reinstall to clear out clutter, resolve persistent errors, and restore speed.",
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
              On-Site Services
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

      {/* 03 — Computer & Printer Setup */}
      <section id="software" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Computer &amp; Printer Setup
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Set Up Right, First Time
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Available remotely or on-site for Windows and Mac. We get a new or refreshed
              machine, printer, and accounts working the way they should.
            </p>
            <div className="space-y-0 mb-10">
              {[
                {
                  title: "New Computer Setup",
                  detail: "Out-of-box setup, updates, essential apps, accounts, and preferences configured and ready to use.",
                },
                {
                  title: "Printer & Scanner Setup",
                  detail: "Install and configure printers and scanners, Wi-Fi printing, and driver troubleshooting.",
                },
                {
                  title: "Wi-Fi & Network",
                  detail: "Connect devices, fix drop-outs, position the router, and set up guest Wi-Fi.",
                },
                {
                  title: "Drivers & Peripherals",
                  detail: "Missing, outdated, or conflicting drivers reinstalled; webcams, docks, and peripherals connected.",
                },
                {
                  title: "Accounts & Email",
                  detail: "Gmail, Outlook, Google Workspace, iCloud, and business email set up and synced across devices.",
                },
                {
                  title: "Data Transfer",
                  detail: "Move files, photos, bookmarks, and settings from an old device to a new one.",
                },
                {
                  title: "Performance Cleanup",
                  detail: "Slow startup, high CPU/RAM usage, and background bloatware cleared out.",
                },
                {
                  title: "PC / Laptop Full Reset",
                  detail: "Complete clean reinstall — wipes the slate clean. Data backup included.",
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
              Device Setup &amp; Configuration
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
                  detail: "Full reinstall from scratch — clears out clutter and slow-down and brings the device back to peak performance.",
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
                  detail: "Gmail, Google Workspace, business email, iCloud, and all other accounts set up and synced.",
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
            <Link href="/contact">
              <button className="text-xs text-green-800 uppercase tracking-[0.2em] hover:text-green-400 transition-colors">
                Need a device recommendation? → Contact Us
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 05 — Google Workspace Setup */}
      <section id="business" className="px-6 py-16 md:py-24 border-b border-green-900/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Google Workspace Setup
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Set Up Google Everything
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-10">
              Get your whole business running on Google — email, calendar, files, and
              your Google Business Profile — set up cleanly and synced across every device.
            </p>
            <div className="space-y-0 mb-10">
              {[
                {
                  title: "Business Email on Google",
                  detail: "Professional email at your own domain (you@yourbusiness.com) with Gmail — set up, verified, and migrated from your old inbox.",
                },
                {
                  title: "Google Workspace Apps",
                  detail: "Drive, Docs, Sheets, Slides, Calendar, and Meet configured for your team, with shared drives and sharing rules.",
                },
                {
                  title: "Google Business Profile",
                  detail: "Create or claim your listing, fill in hours, services, photos, and service area so you show up on Google and Maps.",
                },
                {
                  title: "Accounts & Devices",
                  detail: "Sign every phone, tablet, and computer into the right Google account and confirm email, calendar, and files all sync.",
                },
                {
                  title: "Team Onboarding",
                  detail: "Add staff accounts, set permissions, and hand over a simple guide so everyone knows how to use it.",
                },
                {
                  title: "Local SEO Basics",
                  detail: "Consistent business info across the web, local keywords, and basic on-page SEO to help customers find you.",
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
              Web Development
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Websites You Fully Own and Run Yourself
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-8">
              Simple, fast static websites — custom built, no templates. You get full
              autonomous control: your own admin login to edit pages, text, and
              images whenever you want, without calling a developer and with no
              monthly fees to us.
            </p>

            <div className="border border-green-900/40 p-5 max-w-xl mb-12">
              <p className="text-green-800 text-[10px] uppercase tracking-[0.3em] mb-2">Pricing</p>
              <p className="text-white text-2xl font-bold mb-1">
                Starts at $500 <span className="text-gray-500 text-sm font-normal">/ 5 pages</span>
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Five simple static pages, mobile responsive, with an admin panel so
                you run it yourself. Extra pages, forms, booking, e-commerce, and
                other add-ons are priced separately — ask for a quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-green-900/20 mb-14">
              {[
                {
                  title: "Full Ownership & Control",
                  description: "The site is yours. You get the admin login and full autonomous control to update pages, copy, and images yourself — no developer needed, no monthly fees to us.",
                },
                {
                  title: "Simple Static Pages",
                  description: "Fast, lightweight static builds. The $500 base covers 5 pages — home, about, services, gallery, contact, or whatever fits your business.",
                },
                {
                  title: "Mobile-Responsive",
                  description: "Built mobile-first and tested across phones, tablets, and desktops.",
                },
                {
                  title: "SEO & Performance",
                  description: "On-page SEO, fast load times, and clean structured markup so clients can find you.",
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

            {/* Live Demos → own page */}
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-2">
              Live Demos
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">See It In Action</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-6">
              Fully functional UI components built for real client industries. This is what
              Sonoaac builds.
            </p>
            <Link href="/demos">
              <button className="px-8 py-4 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
                View Live Demos
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
              Get Started
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
              <Link href="/trade-in">
                <button className="px-8 py-4 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto">
                  Trade In Your Device
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
