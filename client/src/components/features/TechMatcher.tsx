import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

// ─── Types ───────────────────────────────────────────────────────────────────

type DeviceType = "windows" | "mac" | "desktop" | "ipad" | "chromebook" | "unsure";
type UseCase =
  | "everyday"
  | "work"
  | "school"
  | "creative"
  | "gaming"
  | "pos"
  | "video"
  | "family";
type Budget = "under300" | "300to600" | "600to1000" | "1000plus" | "bestvalue";
type Portability = "desk" | "go" | "both";

interface Answers {
  device: DeviceType | null;
  useCases: UseCase[];
  budget: Budget | null;
  portability: Portability | null;
}

interface Recommendation {
  tag: string;
  title: string;
  summary: string;
  why: string[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

// ─── Recommendation Engine ────────────────────────────────────────────────────

function getRecommendation(answers: Answers): Recommendation {
  const { device, useCases, budget, portability } = answers;
  const has = (uc: UseCase) => useCases.includes(uc);

  // Gaming
  if (device === "windows" && has("gaming")) {
    if (budget === "under300" || budget === "300to600") {
      return {
        tag: "Gaming",
        title: "Budget Gaming Laptop",
        summary:
          "A mid-range Windows laptop with a dedicated GPU — like the Lenovo IdeaPad Gaming 3 or ASUS TUF A15 — gives solid 1080p gaming without overspending.",
        why: [
          "Dedicated NVIDIA RTX 4060 handles most modern titles at 1080p",
          "Upgradeable RAM and storage lets you grow over time",
          "Windows gives you the widest game library compatibility",
          "Shop refurbished to stretch your budget further",
        ],
        ctaLabel: "Book a Setup Consultation",
        ctaHref: "/book-consultation",
        secondaryLabel: "Compare Devices",
        secondaryHref: "/knowledge-base",
      };
    }
    return {
      tag: "Gaming",
      title: "High-Performance Gaming Laptop",
      summary:
        "The ASUS ROG or HP OMEN line with RTX 4070/4080 and a 165 Hz display will handle any game at high settings — plus creative work on the side.",
      why: [
        "RTX 4070+ delivers 1440p gaming at high frame rates",
        "High-refresh display (144–240 Hz) is a real competitive advantage",
        "Powerful enough for video editing, streaming, and content creation",
        "Windows platform means zero compatibility issues with games or software",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
      secondaryLabel: "Compare Devices",
      secondaryHref: "/knowledge-base",
    };
  }

  // Creative / Mac
  if (device === "mac" || (has("creative") && device !== "windows")) {
    if (budget === "under300" || budget === "300to600") {
      return {
        tag: "Creative",
        title: "Refurbished MacBook Air M1",
        summary:
          "A certified refurbished MacBook Air M1 is the most affordable way into the Apple ecosystem — fast, fanless, and excellent for design and photo editing.",
        why: [
          "M1 chip still outperforms most Intel laptops in creative tasks",
          "Fanless design means silent operation during long editing sessions",
          "macOS integrates seamlessly with iPhone and iPad",
          "Sonoaac can source, inspect, and set up a refurbished unit for you",
        ],
        ctaLabel: "Request a Recommendation",
        ctaHref: "/book-consultation",
      };
    }
    return {
      tag: "Creative / Mac",
      title: "MacBook Air M4 or MacBook Pro M4",
      summary:
        "For creative professionals, the MacBook Air M4 is the best all-round laptop money can buy. Step up to MacBook Pro M4 Pro for heavy video or 3D work.",
      why: [
        "M4 chip beats most Windows laptops in photo, video, and audio editing",
        "Brilliant Liquid Retina display with accurate color reproduction",
        "18-hour battery life — work all day without a charger",
        "Final Cut Pro, Logic Pro, and the full Adobe suite run flawlessly",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
      secondaryLabel: "Compare Devices",
      secondaryHref: "/knowledge-base",
    };
  }

  // iPad / POS / Front Desk
  if (device === "ipad" || has("pos")) {
    return {
      tag: "iPad / Tablet",
      title: "iPad (10th Gen) or iPad Pro M4",
      summary:
        "For a front-desk terminal, POS system, or mobile productivity tool, the iPad is the most reliable and manageable tablet on the market.",
      why: [
        "iPad 10th Gen handles Square, Clover, and most POS apps perfectly",
        "iPad Pro M4 is ideal for creative professionals and power users",
        "Easy to manage with Apple Business Manager for multi-device deployments",
        "Sonoaac sets up your POS, apps, and MDM profiles from scratch",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
      secondaryLabel: "Compare Tablets",
      secondaryHref: "/knowledge-base",
    };
  }

  // Desktop / High-performance stationary
  if (device === "desktop") {
    if (has("gaming") || has("creative")) {
      return {
        tag: "Custom Desktop",
        title: "Custom-Built Desktop PC",
        summary:
          "A custom desktop gives you the most performance per dollar for gaming or creative work — Sonoaac specs and builds it to your exact needs.",
        why: [
          "Significantly more power than any laptop at the same price",
          "Upgradeable: add more RAM, storage, or a better GPU later",
          "Sonoaac handles parts sourcing, assembly, and OS setup",
          "Ideal for video editing workstations, rendering farms, and serious gaming rigs",
        ],
        ctaLabel: "Get a Custom Build Quote",
        ctaHref: "/my-tech/build-pc",
        secondaryLabel: "Book a Consultation",
        secondaryHref: "/book-consultation",
      };
    }
    return {
      tag: "Desktop",
      title: "Business Desktop or Mini PC",
      summary:
        "For everyday business tasks, invoicing, and multi-monitor setups, a compact business desktop or mini PC is quiet, reliable, and easy to maintain.",
      why: [
        "Mini PCs like the Intel NUC or ASUS PN series are space-efficient and quiet",
        "Supports dual or triple monitor setups without a dedicated GPU",
        "Far cheaper to repair and upgrade than an all-in-one",
        "Sonoaac handles setup, software, security, and remote access configuration",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
    };
  }

  // Chromebook
  if (device === "chromebook") {
    return {
      tag: "Chromebook",
      title: "Chromebook for School or Simple Use",
      summary:
        "Chromebooks are the most affordable, low-maintenance option for students and light users who live in a browser.",
      why: [
        "Boots in seconds, rarely needs maintenance, and is very hard to break",
        "Works with Google Workspace, Classroom, and most web apps",
        "Under $300 for most models — strong value for schools and families",
        "Sonoaac can enroll and manage Chromebooks for classrooms or families",
      ],
      ctaLabel: "Book a Consultation",
      ctaHref: "/book-consultation",
    };
  }

  // Work / Business laptop
  if (has("work") || has("video")) {
    if (budget === "under300" || budget === "300to600") {
      return {
        tag: "Business",
        title: "Budget Business Laptop",
        summary:
          "For email, video calls, and Office apps, a refurbished ThinkPad or Dell Latitude in the $300–$500 range is rock-solid and professionally supported.",
        why: [
          "Refurbished business laptops have enterprise-grade keyboards and build quality",
          "ThinkPads are renowned for durability and long battery life",
          "Sonoaac can source, inspect, and configure one before delivery",
          "Includes Windows 11 Pro — required for business network and VPN access",
        ],
        ctaLabel: "Request a Recommendation",
        ctaHref: "/book-consultation",
      };
    }
    return {
      tag: "Business",
      title: "Premium Business Laptop",
      summary:
        "The Dell XPS 13, LG Gram, or Lenovo ThinkPad X1 Carbon are the gold standard for professionals who need a thin, powerful laptop for all-day work.",
      why: [
        "Lightweight (under 2.5 lbs) for daily commutes and travel",
        "All-day battery — 12–18 hours on a charge",
        "Premium build quality that holds up over years of use",
        "Windows 11 Pro with full business software compatibility",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
      secondaryLabel: "Compare Devices",
      secondaryHref: "/knowledge-base",
    };
  }

  // School / Student
  if (has("school")) {
    if (budget === "under300") {
      return {
        tag: "Student",
        title: "Chromebook or Budget Windows Laptop",
        summary:
          "Under $300, a Chromebook is the most reliable pick for students. For more flexibility, a refurbished Windows laptop opens up more software options.",
        why: [
          "Chromebooks handle Google Docs, Classroom, and online research perfectly",
          "Almost zero maintenance — updates happen in the background",
          "Light and easy to carry between classes",
          "Sonoaac can set up parental controls and school account access",
        ],
        ctaLabel: "Book a Consultation",
        ctaHref: "/book-consultation",
      };
    }
    return {
      tag: "Student",
      title: "Windows Laptop or MacBook Air",
      summary:
        "For college students, a mid-range Windows laptop or MacBook Air M4 covers everything — research, writing, presentations, and light creative work.",
      why: [
        "MacBook Air M4 has best-in-class battery life for all-day classes",
        "Windows laptops offer more software compatibility for engineering or science programs",
        "Both handle Office 365, Adobe apps, and video calls without issue",
        "Sonoaac sets it up with all your accounts and software before you start",
      ],
      ctaLabel: "Book a Setup Consultation",
      ctaHref: "/book-consultation",
      secondaryLabel: "Compare Devices",
      secondaryHref: "/knowledge-base",
    };
  }

  // Family / Everyday / Fallback
  return {
    tag: "General Use",
    title: "Everyday Windows Laptop",
    summary:
      "For browsing, streaming, video calls, and general use, a mid-range Windows laptop from Lenovo, HP, or ASUS gives you the most value for your money.",
    why: [
      "Handles everything most households need — streaming, Office, banking, photos",
      "Windows 11 is familiar and has the widest software library",
      "Upgradeable RAM and storage keeps it useful for years",
      "Sonoaac sets it up completely — accounts, antivirus, and optimization",
    ],
    ctaLabel: "Book a Setup Consultation",
    ctaHref: "/book-consultation",
    secondaryLabel: "Compare Devices",
    secondaryHref: "/knowledge-base",
  };
}

// ─── Step Option Components ───────────────────────────────────────────────────

function OptionButton({
  label,
  sublabel,
  selected,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 border transition-all duration-150 ${
        selected
          ? "border-green-400 bg-green-400/10 text-green-300"
          : "border-green-900 text-gray-300 hover:border-green-700 hover:text-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-green-400" : "border-green-800"
          }`}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-green-400 block" />}
        </span>
        <div>
          <span className="text-sm font-semibold block">{label}</span>
          {sublabel && (
            <span className="text-xs text-gray-500 mt-0.5 block">{sublabel}</span>
          )}
        </div>
      </div>
    </button>
  );
}

function MultiOptionButton({
  label,
  sublabel,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={`w-full text-left px-5 py-4 border transition-all duration-150 ${
        selected
          ? "border-green-400 bg-green-400/10 text-green-300"
          : disabled
          ? "border-green-900/40 text-gray-600 cursor-not-allowed"
          : "border-green-900 text-gray-300 hover:border-green-700 hover:text-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-4 h-4 shrink-0 border-2 flex items-center justify-center ${
            selected ? "border-green-400 bg-green-400/20" : "border-green-800"
          }`}
        >
          {selected && (
            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 12 12">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <div>
          <span className="text-sm font-semibold block">{label}</span>
          {sublabel && (
            <span className="text-xs text-gray-500 mt-0.5 block">{sublabel}</span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TechMatcher({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    device: null,
    useCases: [],
    budget: null,
    portability: null,
  });

  const totalSteps = answers.device === "ipad" || answers.device === "desktop" || answers.device === "chromebook" ? 4 : 5;

  const skipPortability =
    answers.device === "ipad" ||
    answers.device === "desktop" ||
    answers.device === "chromebook";

  function next() {
    if (step === 3 && skipPortability) {
      setStep(5);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step === 5 && skipPortability) {
      setStep(3);
    } else {
      setStep((s) => s - 1);
    }
  }

  function restart() {
    setStep(1);
    setAnswers({ device: null, useCases: [], budget: null, portability: null });
  }

  const canNext =
    (step === 1 && answers.device !== null) ||
    (step === 2 && answers.useCases.length > 0) ||
    (step === 3 && answers.budget !== null) ||
    (step === 4 && answers.portability !== null);

  const rec = step === 5 ? getRecommendation(answers) : null;

  const stepLabel = step <= 4 ? `Step ${step} of ${totalSteps}` : "Your Match";
  const progress = step === 5 ? 100 : ((step - 1) / totalSteps) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.25 }}
        className="bg-black border border-green-900 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-green-900/50 flex items-center justify-between shrink-0">
          <div>
            <p className="text-green-800 text-xs uppercase tracking-[0.3em] mb-1">
              Tech Matcher
            </p>
            <p className="text-white text-sm font-semibold">{stepLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="text-green-800 hover:text-green-400 transition-colors p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-green-900/30 shrink-0">
          <motion.div
            className="h-full bg-green-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Device Type ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  What kind of device are you leaning towards?
                </h2>
                <p className="text-gray-500 text-xs mb-6">
                  Not sure? Pick "Not sure" and we'll figure it out.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      { val: "windows", label: "Windows Laptop", sub: "Best variety & compatibility" },
                      { val: "mac", label: "Mac / MacBook", sub: "Apple ecosystem, creative work" },
                      { val: "desktop", label: "Desktop / PC", sub: "Stationary, most power per dollar" },
                      { val: "ipad", label: "iPad / Tablet", sub: "Touch, POS, mobile productivity" },
                      { val: "chromebook", label: "Chromebook", sub: "Budget, simple, web-based use" },
                      { val: "unsure", label: "Not Sure", sub: "We'll recommend based on use" },
                    ] as { val: DeviceType; label: string; sub: string }[]
                  ).map((opt) => (
                    <OptionButton
                      key={opt.val}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers.device === opt.val}
                      onClick={() => setAnswers((a) => ({ ...a, device: opt.val }))}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Use Case ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  What will you mainly use it for?
                </h2>
                <p className="text-gray-500 text-xs mb-6">
                  Select up to 2 — your top priorities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      { val: "everyday", label: "Everyday Use", sub: "Browsing, streaming, social media" },
                      { val: "work", label: "Work / Business", sub: "Email, Office, remote work" },
                      { val: "school", label: "School / Studying", sub: "Notes, research, assignments" },
                      { val: "creative", label: "Creative Work", sub: "Photo, video, design, music" },
                      { val: "gaming", label: "Gaming", sub: "PC games, high-performance graphics" },
                      { val: "pos", label: "POS / Front Desk", sub: "Point-of-sale, reception terminal" },
                      { val: "video", label: "Video Calls", sub: "Zoom, Teams, client meetings" },
                      { val: "family", label: "Family / Shared", sub: "Multiple users, parental controls" },
                    ] as { val: UseCase; label: string; sub: string }[]
                  ).map((opt) => (
                    <MultiOptionButton
                      key={opt.val}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers.useCases.includes(opt.val)}
                      disabled={answers.useCases.length >= 2}
                      onClick={() => {
                        setAnswers((a) => {
                          const has = a.useCases.includes(opt.val);
                          if (has) {
                            return { ...a, useCases: a.useCases.filter((u) => u !== opt.val) };
                          }
                          if (a.useCases.length >= 2) return a;
                          return { ...a, useCases: [...a.useCases, opt.val] };
                        });
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Budget ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  What's your budget?
                </h2>
                <p className="text-gray-500 text-xs mb-6">
                  We'll find the best option within your range.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      { val: "under300", label: "Under $300", sub: "Budget picks — Chromebooks, refurbished laptops" },
                      { val: "300to600", label: "$300 – $600", sub: "Solid mid-range — most everyday needs covered" },
                      { val: "600to1000", label: "$600 – $1,000", sub: "Performance & quality — great all-rounders" },
                      { val: "1000plus", label: "$1,000+", sub: "Premium — MacBooks, gaming rigs, workstations" },
                      { val: "bestvalue", label: "Best Value for Money", sub: "You choose — we optimize for value" },
                    ] as { val: Budget; label: string; sub: string }[]
                  ).map((opt) => (
                    <OptionButton
                      key={opt.val}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers.budget === opt.val}
                      onClick={() => setAnswers((a) => ({ ...a, budget: opt.val }))}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Portability (conditional) ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  How will you carry it?
                </h2>
                <p className="text-gray-500 text-xs mb-6">
                  Portability affects battery life, weight, and screen size recommendations.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      {
                        val: "desk",
                        label: "Mostly at My Desk",
                        sub: "Stays plugged in — bigger screen is fine",
                      },
                      {
                        val: "go",
                        label: "On the Go",
                        sub: "Commuting, travel, coffee shops — weight and battery matter",
                      },
                      {
                        val: "both",
                        label: "Both",
                        sub: "Balanced — moderate weight with all-day battery",
                      },
                    ] as { val: Portability; label: string; sub: string }[]
                  ).map((opt) => (
                    <OptionButton
                      key={opt.val}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers.portability === opt.val}
                      onClick={() => setAnswers((a) => ({ ...a, portability: opt.val }))}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 5: Result ── */}
            {step === 5 && rec && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <div className="mb-5">
                  <span className="text-xs uppercase tracking-[0.3em] text-green-800">
                    Our Recommendation
                  </span>
                </div>

                {/* Tag */}
                <span className="inline-block px-3 py-1 bg-green-400/10 border border-green-800 text-green-400 text-xs uppercase tracking-[0.2em] mb-4">
                  {rec.tag}
                </span>

                {/* Title + summary */}
                <h2 className="text-2xl font-bold text-white mb-3">{rec.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{rec.summary}</p>

                {/* Why bullets */}
                <div className="border-t border-green-900/40 pt-5 mb-6">
                  <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-3">
                    Why this works for you
                  </p>
                  <ul className="space-y-2">
                    {rec.why.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <svg
                          className="w-4 h-4 text-green-400 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3 8l3.5 3.5L13 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={rec.ctaHref}>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors w-full sm:w-auto"
                    >
                      {rec.ctaLabel}
                    </button>
                  </Link>
                  {rec.secondaryLabel && rec.secondaryHref && (
                    <Link href={rec.secondaryHref}>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-[0.2em] hover:border-green-400 transition-colors w-full sm:w-auto"
                      >
                        {rec.secondaryLabel}
                      </button>
                    </Link>
                  )}
                </div>

                {/* Restart */}
                <button
                  onClick={restart}
                  className="mt-5 text-xs text-green-900 hover:text-green-700 underline underline-offset-2 transition-colors"
                >
                  Start over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-green-900/50 flex items-center justify-between shrink-0">
            <button
              onClick={step === 1 ? onClose : back}
              className="text-xs text-green-800 hover:text-green-400 uppercase tracking-[0.2em] transition-colors"
            >
              {step === 1 ? "Cancel" : "← Back"}
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                canNext
                  ? "bg-green-400 text-black hover:bg-green-300"
                  : "bg-green-900/30 text-green-900 cursor-not-allowed"
              }`}
            >
              {step === 3 && skipPortability ? "See My Match →" : "Next →"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
