import { useState } from "react";
import { motion } from "framer-motion";

// ── Reusable primitives ───────────────────────────────────────────────────────

const inputClass =
  "w-full px-4 py-2.5 bg-black border border-green-900/60 text-white text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900/50";

const labelClass = "block text-xs uppercase tracking-widest text-green-800 mb-1.5";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 border-b border-green-900/30 pb-3">
      <span className="flex items-center justify-center w-7 h-7 border border-green-700 text-green-400 text-xs font-bold shrink-0" style={{ fontFamily: "Times New Roman" }}>
        {num}
      </span>
      <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]" style={{ fontFamily: "Times New Roman" }}>
        {title}
      </h2>
    </div>
  );
}

function CheckBox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        onClick={onChange}
        className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
          checked ? "border-green-500 bg-green-500/20" : "border-green-900/60 group-hover:border-green-700"
        }`}
      >
        {checked && <span className="text-green-400 text-xs leading-none">✓</span>}
      </span>
      <span className="text-gray-300 text-sm leading-snug" onClick={onChange}>{label}</span>
    </label>
  );
}

function RadioBox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        onClick={onChange}
        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
          checked ? "border-green-500 bg-green-500/20" : "border-green-900/60 group-hover:border-green-700"
        }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-green-400 block" />}
      </span>
      <span className="text-gray-300 text-sm" onClick={onChange}>{label}</span>
    </label>
  );
}

function CheckGroup({
  items,
  selected,
  onToggle,
  cols = 2,
}: {
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
  cols?: 1 | 2 | 3;
}) {
  const colClass = cols === 3 ? "grid-cols-1 sm:grid-cols-3" : cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";
  return (
    <div className={`grid ${colClass} gap-2.5`}>
      {items.map((item) => (
        <CheckBox key={item} label={item} checked={selected.includes(item)} onChange={() => onToggle(item)} />
      ))}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-green-700 mb-3 font-bold">{title}</p>
      {children}
    </div>
  );
}

// ── Initial form state ────────────────────────────────────────────────────────

const INITIAL = {
  // 1. Client Info
  businessName: "", contactPerson: "", positionTitle: "", phone: "", altPhone: "",
  businessEmail: "", website: "", address: "", city: "", state: "", zip: "",
  locations: "", yearsInBusiness: "",
  bestTime: [] as string[],
  contactMethod: [] as string[],

  // 2. Business Type
  businessTypes: [] as string[],
  businessTypeOther: "",

  // Contact Person
  workingWith: "",
  preferredContact: "",

  // 3. Services
  computerIt: [] as string[],
  security: [] as string[],
  network: [] as string[],
  hardware: [] as string[],
  webDigital: [] as string[],
  otherServices: [] as string[],

  // 4. Current Environment
  internetProvider: "", internetType: "",
  networkType: "", numDevices: "",
  hasServer: "", serverType: "",
  hasBackup: "", backupType: "",
  currentItProvider: "", currentWebsite: "",
  ongoingIssues: "",

  // 5. Business Goals
  goals: [] as string[],
  goalsOther: "",

  // 6. Budget & Timeline
  budget: "", timeline: "", targetDate: "",

  // 7. Additional Services
  bizSetup: [] as string[],
  branding: [] as string[],
  howHeard: "", additionalNotes: "",

  // 8. Notes
  surveyNotes: "",

  // Agreement
  agreedToTerms: false,
  clientName: "", clientDate: "",
};

type FormState = typeof INITIAL;

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

// ── Agreement text ────────────────────────────────────────────────────────────

const AGREEMENT_SECTIONS = [
  {
    title: "1. Privacy & Data Protection",
    body: `All personal and business information collected through this form and during service delivery is handled with strict confidentiality. Sonoaac (SNC) will not sell, share, or distribute your information to third parties without your explicit written consent. Your data is used solely to deliver and improve the services you request.`,
  },
  {
    title: "2. Employee Information Protection",
    body: `The personal information of Sonoaac technicians and employees — including personal phone numbers, home addresses, personal email accounts, and any other private details — is strictly confidential and will not be disclosed to clients under any circumstances. All communication with Sonoaac staff must occur through official channels: sonoaacservices@gmail.com, 201-349-6917, or www.sonoaac.com. Clients agree not to solicit or contact employees directly outside of authorized business channels.`,
  },
  {
    title: "3. Free Reschedule Guarantee",
    body: `If a Sonoaac technician is unable to fully resolve your issue during the initial service visit — through no fault of the client — you are entitled to one (1) complimentary follow-up appointment at no additional labor cost. This rescheduled visit will be coordinated at a mutually convenient time. There is no expense or penalty to the client for exercising this guarantee.`,
  },
  {
    title: "4. Expense Disclaimer — Parts & Third-Party Costs",
    body: `Sonoaac technicians and contractors are not personally or financially liable for the cost of hardware, replacement parts, software licenses, subscriptions, or any third-party services that may be required to complete your service request. All such costs will be clearly communicated to you before any purchase is made and will require your explicit approval. All expenses beyond agreed labor fees remain the financial responsibility of the client.`,
  },
  {
    title: "5. Limitation of Liability",
    body: `Sonoaac's liability is strictly limited to the direct service fees agreed upon for the specific engagement. Sonoaac is not liable for indirect, incidental, or consequential losses — including but not limited to data loss, business interruption, or equipment damage — resulting from pre-existing conditions discovered during service or from circumstances beyond our reasonable control.`,
  },
  {
    title: "6. Your Rights as a Client",
    body: `You have the right to access, correct, or request deletion of any personal data Sonoaac holds on your behalf at any time. You may withdraw consent for ongoing data use by contacting sonoaac@gmail.com. Nothing in this agreement limits any rights afforded to you under applicable state or federal law. This agreement is intended to protect both parties and ensure a transparent, professional service relationship.`,
  },
  {
    title: "7. Mutual Respect & Professional Conduct",
    body: `Both Sonoaac and the client agree to maintain respectful, professional conduct throughout the service relationship. Sonoaac reserves the right to decline or discontinue service in cases of harassment, abuse, fraudulent representation, or violation of these terms. Clients who violate these terms forfeit any guarantees outlined in this agreement.`,
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function ClientForms() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function tog(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: toggle(f[key] as string[], val) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agreedToTerms) { setError("You must agree to the service terms to submit."); return; }
    if (!form.clientName.trim()) { setError("Please enter your name in the signature field."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/client-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us at sonoaacservices@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg text-center">
          <div className="w-14 h-14 border border-green-700 flex items-center justify-center mx-auto mb-6">
            <span className="text-green-400 text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Times New Roman" }}>
            Form Submitted Successfully
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Thank you, <span className="text-white">{form.clientName}</span>. Your discovery form has been received by Sonoaac.
            A technician will review your submission and follow up via your preferred contact method within 1–2 business days.
          </p>
          <div className="border border-green-900/30 p-5 text-left mb-8">
            <p className="text-green-800 text-xs uppercase tracking-widest mb-2">What happens next</p>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>→ We review your service needs</li>
              <li>→ We contact you to confirm details</li>
              <li>→ We schedule your appointment</li>
              <li>→ Our technician arrives ready to solve your issue</li>
            </ul>
          </div>
          <a href="/" className="border border-green-900 text-green-800 px-6 py-2.5 text-sm hover:border-green-700 hover:text-green-600 transition-colors" style={{ fontFamily: "Times New Roman" }}>
            Return to Home →
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="px-6 py-16 md:py-24 border-b border-green-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-5">
              Sonoaac · Client Discovery
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "Times New Roman" }}>
              Client Discovery &<br />Site Survey Form
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Complete this form so we can understand your technology needs and prepare the right solution.
              All information is confidential. This takes about 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {["Your info is protected", "Free reschedule if needed", "No hidden costs"].map((t) => (
                <span key={t} className="border border-green-900/40 text-green-800 text-xs px-3 py-1.5 tracking-wide">
                  ✓ {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-12 space-y-14">

        {/* ── Section 1: Client Information ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={1} title="Client Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Business Name">
              <input className={inputClass} value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Your business name" />
            </Field>
            <Field label="Contact Person">
              <input className={inputClass} value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Position / Title">
              <input className={inputClass} value={form.positionTitle} onChange={(e) => set("positionTitle", e.target.value)} placeholder="Owner, Manager, IT Lead…" />
            </Field>
            <Field label="Phone">
              <input className={inputClass} type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Primary phone" />
            </Field>
            <Field label="Alt. Phone (optional)">
              <input className={inputClass} type="tel" value={form.altPhone} onChange={(e) => set("altPhone", e.target.value)} placeholder="Secondary phone" />
            </Field>
            <Field label="Business Email *">
              <input className={inputClass} type="email" required value={form.businessEmail} onChange={(e) => set("businessEmail", e.target.value)} placeholder="email@yourbusiness.com" />
            </Field>
            <Field label="Website (if any)">
              <input className={inputClass} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="www.yourbusiness.com" />
            </Field>
            <Field label="Business Address">
              <input className={inputClass} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" />
            </Field>
            <Field label="City">
              <input className={inputClass} value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="State">
              <input className={inputClass} value={form.state} onChange={(e) => set("state", e.target.value)} />
            </Field>
            <Field label="Zip Code">
              <input className={inputClass} value={form.zip} onChange={(e) => set("zip", e.target.value)} />
            </Field>
            <Field label="Number of Locations">
              <input className={inputClass} value={form.locations} onChange={(e) => set("locations", e.target.value)} placeholder="1" />
            </Field>
            <Field label="Years in Business">
              <input className={inputClass} value={form.yearsInBusiness} onChange={(e) => set("yearsInBusiness", e.target.value)} placeholder="e.g. 3" />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <Field label="Best Time to Contact">
              <div className="flex flex-wrap gap-4 mt-1">
                {["Morning", "Afternoon", "Evening"].map((t) => (
                  <CheckBox key={t} label={t} checked={form.bestTime.includes(t)} onChange={() => tog("bestTime", t)} />
                ))}
              </div>
            </Field>
            <Field label="Preferred Contact Method">
              <div className="flex flex-wrap gap-4 mt-1">
                {["Phone", "Email", "Text", "Other"].map((t) => (
                  <CheckBox key={t} label={t} checked={form.contactMethod.includes(t)} onChange={() => tog("contactMethod", t)} />
                ))}
              </div>
            </Field>
          </div>
        </motion.div>

        {/* ── Section 2: Business Type ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={2} title="Business Type (Check all that apply)" />
          <CheckGroup
            cols={3}
            items={[
              "Restaurant / Food Service", "Auto Repair / Service",
              "Retail Store", "Salon / Barbershop",
              "Medical / Dental Office", "Real Estate",
              "Professional Office", "Construction / Contracting",
              "Educational (School / College)", "Law Firm",
              "Church / Non-Profit", "E-commerce Business",
              "Manufacturing / Warehouse",
            ]}
            selected={form.businessTypes}
            onToggle={(v) => tog("businessTypes", v)}
          />
          <div className="mt-4">
            <Field label="Other (describe)">
              <input className={inputClass} value={form.businessTypeOther} onChange={(e) => set("businessTypeOther", e.target.value)} placeholder="Describe your business type" />
            </Field>
          </div>
          <div className="mt-6 border border-green-900/30 p-5">
            <p className={labelClass}>You will be working with</p>
            <div className="flex flex-wrap gap-6 mb-5">
              {["Mark", "Ishmael"].map((n) => (
                <RadioBox key={n} label={n} checked={form.workingWith === n} onChange={() => set("workingWith", n)} />
              ))}
            </div>
            <p className={labelClass}>Preferred Contact Person</p>
            <div className="flex flex-wrap gap-6">
              {["Mark", "Ishmael", "Either"].map((n) => (
                <RadioBox key={n} label={n} checked={form.preferredContact === n} onChange={() => set("preferredContact", n)} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Section 3: Services ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={3} title="Services You Are Interested In (Check all that apply)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SubSection title="Computer & IT Services">
              <CheckGroup cols={1} items={["New Computer Setup", "Laptop Setup", "Operating System Installation", "Software Installation", "Microsoft 365 Setup", "Email Setup & Configuration", "Data Transfer / Migration", "Data Backup & Recovery", "PC Tune-Up / Optimization"]} selected={form.computerIt} onToggle={(v) => tog("computerIt", v)} />
            </SubSection>
            <SubSection title="Security & Maintenance">
              <CheckGroup cols={1} items={["Virus & Malware Removal", "Security Check & Protection", "Firewall Setup", "Regular Maintenance Plan", "Performance Optimization", "System Updates"]} selected={form.security} onToggle={(v) => tog("security", v)} />
            </SubSection>
            <SubSection title="Network & Connectivity">
              <CheckGroup cols={1} items={["Wi-Fi Setup / Optimization", "Wired Network Setup", "Router / Switch Installation", "Network Troubleshooting", "Guest Wi-Fi Setup", "VPN / Remote Access Setup"]} selected={form.network} onToggle={(v) => tog("network", v)} />
            </SubSection>
            <SubSection title="Hardware & Peripherals">
              <CheckGroup cols={1} items={["Printer Setup & Installation", "Scanner Setup", "Multi-function Device Setup", "Monitor / Display Setup", "External Drive Setup", "POS System Setup", "Computer Hardware Upgrade", "Custom PC Build"]} selected={form.hardware} onToggle={(v) => tog("hardware", v)} />
            </SubSection>
            <SubSection title="Web & Digital Services">
              <CheckGroup cols={1} items={["Website Design (New)", "Website Redesign", "E-commerce Website", "Website Maintenance", "Search Engine Optimization (SEO)", "Domain & Hosting Setup", "Custom Web Application", "Website Security"]} selected={form.webDigital} onToggle={(v) => tog("webDigital", v)} />
            </SubSection>
            <SubSection title="Other Services">
              <CheckGroup cols={1} items={["Security Camera Installation", "Digital Signage / TV Display Systems", "Queue & Order Display Systems", "Remote IT Support", "On-Site IT Support / Consulting", "IT Training / User Training"]} selected={form.otherServices} onToggle={(v) => tog("otherServices", v)} />
            </SubSection>
          </div>
        </motion.div>

        {/* ── Section 4: Current Environment ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={4} title="Current Environment" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Current Internet Provider">
              <input className={inputClass} value={form.internetProvider} onChange={(e) => set("internetProvider", e.target.value)} placeholder="Xfinity, Fios, Spectrum…" />
            </Field>
            <Field label="Internet Type">
              <div className="flex flex-wrap gap-4 mt-1">
                {["Fiber", "Cable", "DSL", "Other"].map((t) => (
                  <RadioBox key={t} label={t} checked={form.internetType === t} onChange={() => set("internetType", t)} />
                ))}
              </div>
            </Field>
            <Field label="Existing Network">
              <div className="flex flex-wrap gap-4 mt-1">
                {["Wi-Fi", "Wired", "Both", "None"].map((t) => (
                  <RadioBox key={t} label={t} checked={form.networkType === t} onChange={() => set("networkType", t)} />
                ))}
              </div>
            </Field>
            <Field label="Number of Computers / Devices">
              <input className={inputClass} value={form.numDevices} onChange={(e) => set("numDevices", e.target.value)} placeholder="e.g. 5" />
            </Field>
            <div>
              <Field label="Existing Server?">
                <div className="flex flex-wrap gap-4 mt-1">
                  {["Yes", "No"].map((t) => (
                    <RadioBox key={t} label={t} checked={form.hasServer === t} onChange={() => set("hasServer", t)} />
                  ))}
                </div>
              </Field>
              {form.hasServer === "Yes" && (
                <input className={`${inputClass} mt-2`} value={form.serverType} onChange={(e) => set("serverType", e.target.value)} placeholder="If yes, what type?" />
              )}
            </div>
            <div>
              <Field label="Backup System in Place?">
                <div className="flex flex-wrap gap-4 mt-1">
                  {["Yes", "No"].map((t) => (
                    <RadioBox key={t} label={t} checked={form.hasBackup === t} onChange={() => set("hasBackup", t)} />
                  ))}
                </div>
              </Field>
              {form.hasBackup === "Yes" && (
                <input className={`${inputClass} mt-2`} value={form.backupType} onChange={(e) => set("backupType", e.target.value)} placeholder="If yes, what type?" />
              )}
            </div>
            <Field label="Current IT Support Provider">
              <input className={inputClass} value={form.currentItProvider} onChange={(e) => set("currentItProvider", e.target.value)} placeholder="None, or provider name" />
            </Field>
            <Field label="Current Website">
              <input className={inputClass} value={form.currentWebsite} onChange={(e) => set("currentWebsite", e.target.value)} placeholder="www.yoursite.com or None" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Any Ongoing Issues or Challenges?">
              <textarea className={`${inputClass} resize-none`} rows={3} value={form.ongoingIssues} onChange={(e) => set("ongoingIssues", e.target.value)} placeholder="Describe any recurring problems, slowness, outages, security concerns…" />
            </Field>
          </div>
        </motion.div>

        {/* ── Section 5: Business Goals ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={5} title="Business Goals & Needs (Check all that apply)" />
          <CheckGroup
            cols={2}
            items={["Improve System Performance", "Go Paperless / Digital Transformation", "Increase Security", "Improve Customer Experience", "Set Up New Office / Location", "Expand Online Presence", "Upgrade Existing Equipment", "Increase Sales / Leads", "Improve Wi-Fi / Network", "Need Ongoing IT Support", "Reduce Downtime"]}
            selected={form.goals}
            onToggle={(v) => tog("goals", v)}
          />
          <div className="mt-4">
            <Field label="Other Goal">
              <input className={inputClass} value={form.goalsOther} onChange={(e) => set("goalsOther", e.target.value)} placeholder="Describe any other goals" />
            </Field>
          </div>
        </motion.div>

        {/* ── Section 6: Budget & Timeline ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={6} title="Budget Range & Timeline" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className={labelClass}>Budget Range</p>
              <div className="space-y-2.5">
                {["Under $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "Over $10,000", "To Be Determined"].map((b) => (
                  <RadioBox key={b} label={b} checked={form.budget === b} onChange={() => set("budget", b)} />
                ))}
              </div>
            </div>
            <div>
              <p className={labelClass}>Timeline</p>
              <div className="space-y-2.5">
                {["As Soon As Possible", "Within 1 – 2 Weeks", "Within 1 Month", "Within 2 – 3 Months", "Planning / Future Project"].map((t) => (
                  <RadioBox key={t} label={t} checked={form.timeline === t} onChange={() => set("timeline", t)} />
                ))}
              </div>
              <div className="mt-5">
                <Field label="Target Date (optional)">
                  <input type="date" className={inputClass} value={form.targetDate} onChange={(e) => set("targetDate", e.target.value)} />
                </Field>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Section 7: Additional Services ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={7} title="Additional Services" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <SubSection title="Business Setup & Registration">
              <CheckGroup cols={1} items={["Consultation", "Register My Business", "Start Up My Business", "Business License / Permits Guidance", "EIN / Tax ID Assistance"]} selected={form.bizSetup} onToggle={(v) => tog("bizSetup", v)} />
            </SubSection>
            <SubSection title="Branding & Marketing Services">
              <CheckGroup cols={1} items={["Show on Maps (Google Business Profile)", "Logo Creation", "Social Media Accounts Creation", "Social Media Promotion", "Business Email Setup"]} selected={form.branding} onToggle={(v) => tog("branding", v)} />
            </SubSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="How did you hear about us?">
              <input className={inputClass} value={form.howHeard} onChange={(e) => set("howHeard", e.target.value)} placeholder="Google, referral, social media…" />
            </Field>
            <Field label="Additional Notes / Requests">
              <textarea className={`${inputClass} resize-none`} rows={3} value={form.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)} placeholder="Anything else we should know?" />
            </Field>
          </div>
        </motion.div>

        {/* ── Section 8: Site Survey Notes ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeader num={8} title="Site Survey Notes" />
          <Field label="Notes (layout, access, special requirements, etc.)">
            <textarea className={`${inputClass} resize-none`} rows={6} value={form.surveyNotes} onChange={(e) => set("surveyNotes", e.target.value)} placeholder="Describe your location layout, parking, access requirements, or anything else that would help our technician prepare…" />
          </Field>
        </motion.div>

        {/* ── Service Agreement ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="border border-green-900/40 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-900/30">
              <span className="text-green-400 text-lg">⚖</span>
              <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]" style={{ fontFamily: "Times New Roman" }}>
                Sonoaac Service Agreement & Client Rights
              </h2>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              This agreement protects both you as a client and Sonoaac's employees. Please read each section carefully before signing.
            </p>

            <div className="space-y-6">
              {AGREEMENT_SECTIONS.map((s) => (
                <div key={s.title} className="border-l border-green-900/40 pl-4">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{s.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            {/* Highlights box */}
            <div className="border border-green-900/40 bg-green-950/10 p-5 mt-8 mb-8">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-4">Key Protections Summary</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "🔒", title: "Your Privacy", desc: "Your information is never sold or shared with third parties." },
                  { icon: "🔄", title: "Free Reschedule", desc: "If we can't resolve it on the first visit, we come back at no charge to you." },
                  { icon: "💳", title: "No Surprise Costs", desc: "Parts & licenses are your responsibility, but always approved by you first." },
                ].map((item) => (
                  <div key={item.title}>
                    <p className="text-base mb-1">{item.icon}</p>
                    <p className="text-white text-xs font-bold mb-1" style={{ fontFamily: "Times New Roman" }}>{item.title}</p>
                    <p className="text-gray-500 text-xs leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agreement checkbox */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <span
                  onClick={() => set("agreedToTerms", !form.agreedToTerms)}
                  className={`w-5 h-5 border shrink-0 flex items-center justify-center mt-0.5 transition-colors cursor-pointer ${
                    form.agreedToTerms ? "border-green-500 bg-green-500/20" : "border-green-900/60"
                  }`}
                >
                  {form.agreedToTerms && <span className="text-green-400 text-xs leading-none">✓</span>}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">
                  I confirm that the above information is accurate. I have read and understand this service agreement, including the privacy policy, free reschedule guarantee, and expense disclaimer. I agree to the terms set forth by Sonoaac Technology Services.
                </span>
              </label>
            </div>

            {/* Signature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Printed Name (Signature) *">
                <input
                  className={inputClass}
                  required
                  value={form.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                  placeholder="Type your full name"
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  className={inputClass}
                  value={form.clientDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("clientDate", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </motion.div>

        {/* Submit */}
        {error && (
          <p className="text-red-500 text-sm border border-red-900/40 px-4 py-3">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="border border-green-600 text-green-300 px-8 py-3.5 text-sm hover:bg-green-950 transition-colors disabled:opacity-40"
            style={{ fontFamily: "Times New Roman" }}
          >
            {submitting ? "Submitting…" : "Submit Discovery Form →"}
          </button>
          <p className="text-green-900 text-xs self-center">
            Your form is sent securely to our team. We'll follow up within 1–2 business days.
          </p>
        </div>

      </form>
    </div>
  );
}
