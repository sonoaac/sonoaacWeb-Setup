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
type Workload = "light" | "office365" | "videocalls" | "dev" | "heavy";
type StepKey = "device" | "usecase" | "budget" | "workload" | "portability";

interface Answers {
  device: DeviceType | null;
  useCases: UseCase[];
  budget: Budget | null;
  portability: Portability | null;
  workload: Workload | null;
}

interface MinSpec {
  label: string;
  value: string;
  note?: string;
}

interface Recommendation {
  tag: string;
  title: string;
  summary: string;
  why: string[];
  minSpecs?: MinSpec[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

// ─── Step Logic ───────────────────────────────────────────────────────────────

function getSteps(answers: Answers): StepKey[] {
  const steps: StepKey[] = ["device", "usecase", "budget"];
  if (answers.useCases.some((u) => ["work", "video"].includes(u))) {
    steps.push("workload");
  }
  if (!["ipad", "desktop", "chromebook"].includes(answers.device ?? "")) {
    steps.push("portability");
  }
  return steps;
}

// ─── Recommendation Engine ────────────────────────────────────────────────────

function getRecommendation(answers: Answers): Recommendation {
  const { device, useCases, budget, workload } = answers;
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
          "NVIDIA RTX 4060 handles most modern titles at 1080p 60fps+",
          "Upgradeable RAM and storage lets you grow over time",
          "Windows gives you the widest game library compatibility",
          "Shop refurbished to stretch your budget further",
        ],
        minSpecs: [
          { label: "GPU", value: "NVIDIA RTX 4060 minimum", note: "The GPU is the single most important part for gaming — do not compromise here" },
          { label: "CPU", value: "Intel Core i5/i7 or AMD Ryzen 5/7", note: "Gaming is mostly GPU-bound. Both Intel and AMD are fine here." },
          { label: "RAM", value: "16GB DDR5", note: "Most modern games require 16GB. 8GB causes stuttering." },
          { label: "Display", value: "1080p, 144Hz minimum", note: "144Hz refresh rate makes a bigger difference than resolution in gaming." },
          { label: "Storage", value: "512GB NVMe SSD", note: "Modern games install 50–100GB each — plan accordingly." },
        ],
        ctaLabel: "Get Device Matched",
        ctaHref: "/my-tech",
        secondaryLabel: "Explore Devices",
        secondaryHref: "/my-tech",
      };
    }
    return {
      tag: "Gaming",
      title: "High-Performance Gaming Laptop",
      summary:
        "The ASUS ROG or HP OMEN line with RTX 4070/4080 and a 165Hz display will handle any game at high settings — plus creative work on the side.",
      why: [
        "RTX 4070+ delivers 1440p gaming at high frame rates",
        "High-refresh display (144–240Hz) is a real competitive edge in FPS games",
        "Powerful enough for video editing, streaming, and content creation",
        "Windows platform means zero compatibility issues with games or software",
      ],
      minSpecs: [
        { label: "GPU", value: "NVIDIA RTX 4070 Ti Super or RTX 4080", note: "RTX 4070 Ti Super is the best value in this tier — nearly matches the 4080 for less money" },
        { label: "CPU", value: "Intel Core i7-14700HX or AMD Ryzen 9 7945HX", note: "AMD leads in multi-core; Intel leads in single-core peak. Both are excellent for gaming." },
        { label: "RAM", value: "16GB–32GB DDR5", note: "32GB future-proofs for game streaming and editing simultaneously" },
        { label: "Display", value: "1440p 165Hz or 1080p 240Hz", note: "1440p for better visuals; 1080p 240Hz for competitive FPS advantage" },
        { label: "Storage", value: "1TB NVMe SSD minimum", note: "Large AAA games are 100GB+ — space fills fast" },
      ],
      ctaLabel: "Get Device Setup",
      ctaHref: "/contact",
      secondaryLabel: "Explore Devices",
      secondaryHref: "/my-tech",
    };
  }

  // Creative / Mac
  if (device === "mac" || (has("creative") && device !== "windows")) {
    if (budget === "under300" || budget === "300to600") {
      return {
        tag: "Creative",
        title: "Refurbished MacBook Air M1",
        summary:
          "A certified refurbished MacBook Air M1 is the most affordable entry into Apple — fast, fanless, and excellent for design and photo editing.",
        why: [
          "M1 chip still outperforms most Intel laptops in creative tasks",
          "Fanless design — completely silent during long editing sessions",
          "macOS integrates seamlessly with iPhone and iPad",
          "Sonoaac can source, inspect, and fully configure a refurbished unit",
        ],
        minSpecs: [
          { label: "Chip", value: "Apple M1 minimum (M2 preferred)", note: "M-series chips outperform similarly-priced Windows laptops for creative work" },
          { label: "RAM", value: "8GB minimum, 16GB for video editing", note: "Apple unified memory is shared between CPU and GPU — more is better." },
          { label: "Storage", value: "256GB minimum (512GB recommended)", note: "Creative files add up fast — an external SSD is a cost-effective expansion." },
        ],
        ctaLabel: "Get Device Matched",
        ctaHref: "/my-tech",
      };
    }
    return {
      tag: "Creative / Mac",
      title: "MacBook Air M4 or MacBook Pro M4",
      summary:
        "For creative professionals, the MacBook Air M4 is the best all-round laptop available. Step up to MacBook Pro M4 Pro for heavy video or 3D work.",
      why: [
        "M4 chip beats most Windows laptops in photo, video, and audio editing",
        "Liquid Retina display with accurate color reproduction — essential for color work",
        "18-hour battery life — work all day without a charger",
        "Final Cut Pro, Logic Pro, and the full Adobe suite run flawlessly",
      ],
      minSpecs: [
        { label: "Chip", value: "Apple M4 (Air) or M4 Pro (MacBook Pro)", note: "M4 Pro's extra GPU cores make a large difference in 4K video and 3D rendering" },
        { label: "RAM", value: "16GB minimum, 24GB for heavy video or 3D", note: "16GB on M4 is roughly equivalent to 24GB on Windows for creative tasks due to unified memory" },
        { label: "Storage", value: "512GB or 1TB SSD", note: "Creative project files are large — 512GB fills up faster than you expect" },
        { label: "Display note", value: "MacBook Air 13\" or 15\" both have excellent Liquid Retina displays — accurate colors out of the box" },
      ],
      ctaLabel: "Get Device Setup",
      ctaHref: "/contact",
      secondaryLabel: "Explore Devices",
      secondaryHref: "/my-tech",
    };
  }

  // iPad / POS / Front Desk
  if (device === "ipad" || has("pos")) {
    return {
      tag: "iPad / Tablet",
      title: "iPad 10th Gen or iPad Pro M4",
      summary:
        "For a front-desk terminal, POS system, or mobile productivity tool, the iPad is the most reliable and manageable tablet on the market.",
      why: [
        "iPad 10th Gen handles Square, Clover, and most POS apps perfectly",
        "iPad Pro M4 is ideal for creative professionals and power users",
        "Easy to manage with Apple Business Manager for multi-device deployments",
        "Sonoaac sets up your POS apps, MDM profiles, and accessories from scratch",
      ],
      minSpecs: [
        { label: "Model", value: "iPad 10th Gen ($349) for POS — iPad Air for general productivity" },
        { label: "Storage", value: "64–128GB for POS use; 256GB+ for general use" },
        { label: "Accessories", value: "Square Stand or Clover mount, protective case, keyboard cover if needed" },
        { label: "Connectivity", value: "Wi-Fi model is fine if router is nearby; Cellular if the iPad moves around" },
      ],
      ctaLabel: "Get iPad Setup",
      ctaHref: "/contact",
      secondaryLabel: "Explore Devices",
      secondaryHref: "/my-tech",
    };
  }

  // Desktop
  if (device === "desktop") {
    if (has("gaming") || has("creative")) {
      return {
        tag: "Custom Desktop",
        title: "Custom-Built Desktop PC",
        summary:
          "A custom desktop gives you the most performance per dollar for gaming or creative work — Sonoaac specs and builds it to your exact needs.",
        why: [
          "Significantly more power than any laptop at the same budget",
          "Upgradeable: add more RAM, a better GPU, or more storage later",
          "Sonoaac handles parts sourcing, assembly, and full OS setup",
          "Ideal for gaming rigs, video editing workstations, and rendering machines",
        ],
        minSpecs: [
          { label: "CPU (Gaming)", value: "AMD Ryzen 7 7800X3D — best gaming CPU money can buy", note: "Its 3D V-Cache technology gives it a large edge in game frame rates over Intel" },
          { label: "CPU (Creative)", value: "AMD Ryzen 9 7950X or Intel Core i9-14900K", note: "More cores = faster video exports and 3D renders. AMD wins multi-core; Intel wins single-core bursts." },
          { label: "GPU", value: "NVIDIA RTX 4070 Ti Super (best value) or RTX 4080/4090 for top tier" },
          { label: "RAM", value: "32GB DDR5 for gaming; 64GB for creative workstations", note: "Desktop RAM is affordable — don't underbuy. 32GB future-proofs well." },
          { label: "Storage", value: "1TB NVMe SSD for OS and apps + 2TB HDD or 2nd SSD for storage" },
        ],
        ctaLabel: "Get a Custom Build Quote",
        ctaHref: "/my-tech/build-pc",
        secondaryLabel: "Contact for Specs",
        secondaryHref: "/contact",
      };
    }
    return {
      tag: "Desktop",
      title: "Business Desktop or Mini PC",
      summary:
        "For everyday business tasks, invoicing, and multi-monitor setups, a compact business desktop or mini PC is quiet, reliable, and easy to maintain.",
      why: [
        "Mini PCs like the Intel NUC or ASUS PN series are space-efficient and quiet",
        "Supports dual or triple monitor setups with an integrated GPU",
        "Far cheaper to repair and upgrade than an all-in-one",
        "Sonoaac handles full setup — software, security, and remote access",
      ],
      minSpecs: [
        { label: "Processor", value: "Intel Core i5 or AMD Ryzen 5 (any 2020+ gen)" },
        { label: "RAM", value: "16GB — enough for multi-tab browsing, Office, and Teams together" },
        { label: "Storage", value: "256–512GB SSD" },
        { label: "Display", value: "Any 1080p or 1440p external monitor — a 27\" 1440p IPS is the sweet spot" },
      ],
      ctaLabel: "Get Setup Help",
      ctaHref: "/contact",
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
      minSpecs: [
        { label: "Processor", value: "Intel Celeron or MediaTek is fine for Chrome OS" },
        { label: "RAM", value: "4GB is workable, 8GB preferred for multiple tabs" },
        { label: "Storage", value: "64–128GB (Chrome OS stores most data in the cloud)" },
        { label: "Important note", value: "Chrome OS cannot run Windows software — only web and Android apps" },
      ],
      ctaLabel: "Contact for Setup",
      ctaHref: "/contact",
    };
  }

  // Work / Business — detailed workload-based specs
  if (has("work") || has("video")) {
    if (budget === "under300" || budget === "300to600") {
      return {
        tag: "Business",
        title: "Budget Business Laptop",
        summary:
          "For email, web browsing, and Office apps, a refurbished ThinkPad or Dell Latitude in the $300–$500 range is rock-solid and professionally supported.",
        why: [
          "Refurbished business laptops have enterprise-grade keyboards and build quality",
          "ThinkPads are renowned for durability, great keyboards, and long battery life",
          "Sonoaac can source, inspect, and configure one before delivery",
          "Windows 11 Pro — required for business domain login and VPN access",
        ],
        minSpecs: [
          { label: "Processor", value: "Intel Core i5 (Gen 8+) or AMD Ryzen 5", note: "Avoid Celeron and Pentium — they're too slow for modern web apps and Teams." },
          { label: "RAM", value: "16GB minimum", note: "Outlook + Chrome + Teams running together uses 8–12GB RAM easily. 8GB will feel tight." },
          { label: "Storage", value: "256GB SSD — mandatory", note: "An HDD makes even basic tasks feel painful in 2025." },
          { label: "Microsoft 365", value: "$6.99/month (Personal) or $6/user/month (Business Basic)", note: "Includes Outlook, Word, Excel, OneDrive, and Teams. Worth it over a one-time purchase — always updated." },
        ],
        ctaLabel: "Contact for a Recommendation",
        ctaHref: "/contact",
      };
    }

    if (workload === "light") {
      return {
        tag: "Work",
        title: "Light Work Setup — Typing, Email & Web",
        summary:
          "If your main tasks are typing documents, email, and browsing, you don't need a powerful machine. Here's exactly what actually matters.",
        why: [
          "A 4-core processor handles typing, email, and web browsing with zero effort",
          "8GB RAM is enough when you're not running heavy apps — 16GB future-proofs you",
          "An SSD is the most important spec — it makes the whole computer feel fast",
          "AMD Ryzen 5 gives excellent battery life and performance for basic work at a lower price than Intel equivalents",
        ],
        minSpecs: [
          { label: "Processor", value: "Intel Core i5 (any 2019+) or AMD Ryzen 5 5000+", note: "For typing and email, a 4-core i5 is overkill — you're paying for reliability, not raw power." },
          { label: "RAM", value: "8GB minimum, 16GB recommended", note: "8GB handles email, Word, and a few browser tabs. 16GB if you keep many tabs open." },
          { label: "Storage", value: "256GB SSD — not HDD", note: "SSD is mandatory. An HDD will make the computer feel broken by comparison — boot takes 60+ seconds vs 8 seconds on SSD." },
          { label: "Battery", value: "Look for 10+ hours real-world life", note: "ARM chips (Apple M-series, Snapdragon X) deliver the best battery for light work." },
          { label: "Microsoft 365", value: "$6.99/month Personal — Word, Excel, Outlook, OneDrive 1TB, Teams", note: "Recommended over one-time Office purchase: you get cloud sync, mobile apps, and always-updated software." },
        ],
        ctaLabel: "Get It Set Up",
        ctaHref: "/contact",
        secondaryLabel: "See Devices",
        secondaryHref: "/my-tech",
      };
    }

    if (workload === "office365") {
      return {
        tag: "Work",
        title: "Microsoft 365 Work Setup",
        summary:
          "Office apps, Outlook, Teams, and OneDrive together need a capable machine. Here are the specs that keep everything running smoothly — and what Microsoft 365 actually gives you.",
        why: [
          "Teams + Outlook + Chrome + OneDrive running together typically uses 8–14GB RAM",
          "Intel Core i5/i7 or AMD Ryzen 5/7 handle Office's AI Copilot features smoothly",
          "A fast SSD means OneDrive syncs quickly and large Excel files open in seconds",
          "Microsoft 365 is $6.99–$12.50/month and includes far more than just Office apps",
        ],
        minSpecs: [
          { label: "Processor", value: "Intel Core i5/i7 (Gen 11+) or AMD Ryzen 5/7 5000+", note: "Intel Core Ultra models include an NPU for AI Copilot features in Word and Excel. AMD is more affordable." },
          { label: "RAM", value: "16GB DDR4/DDR5", note: "Teams + Outlook + Chrome + OneDrive sync combined exceeds 8GB RAM. 16GB gives comfortable headroom." },
          { label: "Storage", value: "512GB SSD minimum", note: "Outlook email cache, OneDrive local sync, and Office installs use 50–100GB easily." },
          { label: "OS", value: "Windows 11 Pro recommended", note: "Pro allows joining a business domain, BitLocker encryption, and Remote Desktop access." },
          {
            label: "Microsoft 365 Plans",
            value: "Personal $6.99/mo · Family $9.99/mo · Business Basic $6/user · Business Standard $12.50/user",
            note: "Business Standard includes full desktop apps. Business Basic is cloud-only (browser versions of Office). Personal/Family for home users.",
          },
        ],
        ctaLabel: "Get Microsoft 365 Setup",
        ctaHref: "/contact",
        secondaryLabel: "See Work Devices",
        secondaryHref: "/my-tech",
      };
    }

    if (workload === "videocalls") {
      return {
        tag: "Work",
        title: "Video Calls & Remote Meetings Setup",
        summary:
          "Zoom, Teams, and Google Meet work best with a solid camera, fast internet, and enough RAM to run calls alongside your other apps.",
        why: [
          "Video calls with background blur and AI effects use significant CPU and RAM",
          "A 1080p webcam makes a huge difference on professional calls — 720p looks blurry on large screens",
          "Your upload speed matters more than download speed for video calls (10+ Mbps recommended)",
          "Intel Core Ultra includes an NPU that handles background blur natively at minimal CPU cost",
        ],
        minSpecs: [
          { label: "Processor", value: "Intel Core i5/i7 (Gen 10+) or AMD Ryzen 5/7", note: "Background blur and AI camera effects require real CPU power. Intel Core Ultra with NPU handles this more efficiently." },
          { label: "RAM", value: "16GB — Zoom + browser + other work apps exceeds 8GB during calls", note: "Background blur in Teams and Zoom is RAM-intensive on top of your other apps." },
          { label: "Webcam", value: "1080p built-in or external (Logitech C920s, ~$70)", note: "Most cheap laptop webcams are 720p. For client-facing calls, a dedicated 1080p webcam is worth the upgrade." },
          { label: "Microphone", value: "USB headset or dedicated USB mic — built-in laptop mics are mediocre", note: "Sound quality is as important as video quality on professional calls." },
          { label: "Internet", value: "10+ Mbps upload for HD video, 5 Mbps minimum for SD", note: "Use Ethernet cable instead of Wi-Fi when possible — drops cause stuttering and call disconnects." },
        ],
        ctaLabel: "Get Full Setup",
        ctaHref: "/contact",
        secondaryLabel: "Remote IT Support",
        secondaryHref: "/services#remote",
      };
    }

    if (workload === "dev") {
      return {
        tag: "Development",
        title: "Developer & Technical Work Setup",
        summary:
          "Development workloads — IDEs, Docker, VMs, large code repos — need serious RAM and fast storage. Here's what actually matters and why.",
        why: [
          "32GB RAM is the minimum for modern dev work — Docker, IDEs, and browsers together exceed 16GB",
          "AMD Ryzen 9 or Intel Core i9 offer the most cores for parallel builds and compilation",
          "NVMe SSD speed directly impacts build times, Docker pull speeds, and repo operations",
          "MacBook Pro M4 Pro delivers exceptional compile speeds with all-day battery life",
        ],
        minSpecs: [
          { label: "Processor", value: "AMD Ryzen 7/9 7000+ or Intel Core i7/i9 Gen 13+, or Apple M4 Pro", note: "More cores = faster compilation. AMD leads multi-threaded workloads. Apple M4 Pro is best-in-class per-watt for dev work." },
          { label: "RAM", value: "32GB minimum — 64GB if running multiple VMs or containers", note: "VS Code + Chrome + Docker + local server + Slack + build tools easily exceeds 20GB RAM." },
          { label: "Storage", value: "1TB NVMe SSD minimum", note: "node_modules, Docker images, and large repos fill storage quickly. Fast I/O directly affects build speed." },
          { label: "OS", value: "Windows 11 Pro (with WSL2) or macOS — both fully support Docker, Node, Python", note: "WSL2 on Windows 11 Pro gives a full Linux environment without dual-booting." },
          { label: "Display", value: "27\"+ 1440p or 4K external monitor for desk work", note: "Multiple windows side-by-side is a major productivity boost in development." },
        ],
        ctaLabel: "Get Dev Setup Help",
        ctaHref: "/contact",
        secondaryLabel: "Custom PC Build",
        secondaryHref: "/my-tech/build-pc",
      };
    }

    // heavy or null fallback
    return {
      tag: "Power Work",
      title: "Heavy Multitasking Setup",
      summary:
        "Running multiple demanding apps simultaneously needs a machine with serious CPU core count and plenty of RAM.",
      why: [
        "8 or more CPU cores handle parallel tasks without slowdown",
        "32GB RAM is the sweet spot for multitasking multiple heavy apps",
        "AMD Ryzen 7 gives excellent multi-app performance at a strong price-to-performance ratio",
        "A fast NVMe SSD eliminates wait time when opening apps and loading large files",
      ],
      minSpecs: [
        { label: "Processor", value: "AMD Ryzen 7 or Intel Core i7 (Gen 12+)", note: "For multitasking: more cores matter more than raw clock speed. Aim for 8 cores minimum." },
        { label: "RAM", value: "32GB DDR4/DDR5", note: "Photoshop + Premiere + Chrome + Teams running simultaneously can exceed 20GB RAM." },
        { label: "Storage", value: "1TB NVMe SSD", note: "Fast storage dramatically reduces app launch times and large file open times." },
        { label: "GPU", value: "Dedicated GPU (NVIDIA RTX 4060+) if doing any visual work", note: "Integrated GPU is fine for Office. Dedicated GPU required for editing, 3D, or rendering." },
      ],
      ctaLabel: "Get Full Setup",
      ctaHref: "/contact",
      secondaryLabel: "Custom PC Build",
      secondaryHref: "/my-tech/build-pc",
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
        minSpecs: [
          { label: "Chromebook", value: "Any model with 4GB+ RAM and 64GB+ storage" },
          { label: "Budget Windows", value: "Refurbished ThinkPad or Dell with i5, 8GB RAM, 256GB SSD" },
          { label: "Note", value: "Chromebooks cannot run desktop Windows or Mac apps" },
        ],
        ctaLabel: "Get Setup Help",
        ctaHref: "/contact",
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
        "Both handle Microsoft 365, Adobe apps, and video calls without issue",
        "Sonoaac sets it up with all your accounts and software before you start",
      ],
      minSpecs: [
        { label: "Option A: Windows", value: "Intel Core i5/Ryzen 5, 16GB RAM, 512GB SSD", note: "Best for STEM programs requiring Windows-only software." },
        { label: "Option B: Mac", value: "MacBook Air M4 16GB / 256GB", note: "Best for writing-heavy, creative, or general use — exceptional battery life." },
        { label: "Microsoft 365", value: "Many universities offer Microsoft 365 Education free — check with your school's IT department before paying." },
      ],
      ctaLabel: "Get It Set Up",
      ctaHref: "/contact",
      secondaryLabel: "Explore Devices",
      secondaryHref: "/my-tech",
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
      "16GB RAM keeps things responsive even with multiple tabs and apps",
      "Sonoaac sets it up completely — accounts, antivirus, and optimization",
    ],
    minSpecs: [
      { label: "Processor", value: "Intel Core i5 or AMD Ryzen 5 (any 2020+ gen)" },
      { label: "RAM", value: "16GB — comfortable for everyday use with multiple apps" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "1080p, 15 inch — best balance of screen size and portability" },
    ],
    ctaLabel: "Get It Set Up",
    ctaHref: "/contact",
    secondaryLabel: "Explore Devices",
    secondaryHref: "/my-tech",
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
    workload: null,
  });

  const steps = getSteps(answers);
  const totalSteps = steps.length;
  const currentStepKey = step <= steps.length ? steps[step - 1] : null;
  const isResult = step > steps.length;
  const rec = isResult ? getRecommendation(answers) : null;
  const progress = isResult ? 100 : ((step - 1) / totalSteps) * 100;
  const stepLabel = isResult ? "Your Match" : `Step ${step} of ${totalSteps}`;

  const canNext =
    currentStepKey === "device"
      ? answers.device !== null
      : currentStepKey === "usecase"
      ? answers.useCases.length > 0
      : currentStepKey === "budget"
      ? answers.budget !== null
      : currentStepKey === "workload"
      ? answers.workload !== null
      : currentStepKey === "portability"
      ? answers.portability !== null
      : false;

  function next() {
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function restart() {
    setStep(1);
    setAnswers({ device: null, useCases: [], budget: null, portability: null, workload: null });
  }

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
            <p className="text-green-800 text-xs uppercase tracking-[0.3em] mb-1">Tech Matcher</p>
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

            {/* Step: Device Type */}
            {currentStepKey === "device" && (
              <motion.div
                key="device"
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
                  Not sure? Pick "Not Sure" and we'll figure it out.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      { val: "windows", label: "Windows Laptop", sub: "Best variety and compatibility" },
                      { val: "mac", label: "Mac / MacBook", sub: "Apple ecosystem, creative work" },
                      { val: "desktop", label: "Desktop / PC", sub: "Stationary, most power per dollar" },
                      { val: "ipad", label: "iPad / Tablet", sub: "Touch, POS, mobile productivity" },
                      { val: "chromebook", label: "Chromebook", sub: "Budget, simple, web-based use" },
                      { val: "unsure", label: "Not Sure", sub: "We'll recommend based on your use" },
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

            {/* Step: Use Case */}
            {currentStepKey === "usecase" && (
              <motion.div
                key="usecase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  What will you mainly use it for?
                </h2>
                <p className="text-gray-500 text-xs mb-6">Select up to 2 — your top priorities.</p>
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
                          const alreadySelected = a.useCases.includes(opt.val);
                          if (alreadySelected) {
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

            {/* Step: Budget */}
            {currentStepKey === "budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">What's your budget?</h2>
                <p className="text-gray-500 text-xs mb-6">We'll find the best option within your range.</p>
                <div className="space-y-3">
                  {(
                    [
                      { val: "under300", label: "Under $300", sub: "Chromebooks, refurbished laptops" },
                      { val: "300to600", label: "$300 – $600", sub: "Solid mid-range — most everyday needs covered" },
                      { val: "600to1000", label: "$600 – $1,000", sub: "Performance and quality — great all-rounders" },
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

            {/* Step: Workload (work/video users only) */}
            {currentStepKey === "workload" && (
              <motion.div
                key="workload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  What will you mainly run day-to-day?
                </h2>
                <p className="text-gray-500 text-xs mb-6">
                  This determines the minimum specs you actually need — be honest, it saves money.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      {
                        val: "light",
                        label: "Typing, Email & Web Browsing",
                        sub: "Google, Gmail/Outlook, Word — light work only",
                      },
                      {
                        val: "office365",
                        label: "Microsoft 365 — Word, Excel, Outlook, Teams",
                        sub: "Full Office suite with OneDrive and video calls",
                      },
                      {
                        val: "videocalls",
                        label: "Video Calls — Zoom, Teams, or Google Meet",
                        sub: "Frequent HD video meetings, screen sharing",
                      },
                      {
                        val: "dev",
                        label: "Development or Technical Work",
                        sub: "Code editors, Docker, databases, large repos",
                      },
                      {
                        val: "heavy",
                        label: "Multiple Demanding Apps at Once",
                        sub: "Photoshop, Premiere, large spreadsheets, multitasking",
                      },
                    ] as { val: Workload; label: string; sub: string }[]
                  ).map((opt) => (
                    <OptionButton
                      key={opt.val}
                      label={opt.label}
                      sublabel={opt.sub}
                      selected={answers.workload === opt.val}
                      onClick={() => setAnswers((a) => ({ ...a, workload: opt.val }))}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step: Portability */}
            {currentStepKey === "portability" && (
              <motion.div
                key="portability"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-white mb-2">How will you carry it?</h2>
                <p className="text-gray-500 text-xs mb-6">
                  Portability affects battery life, weight, and screen size recommendations.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      { val: "desk", label: "Mostly at My Desk", sub: "Stays plugged in — bigger screen is fine" },
                      { val: "go", label: "On the Go", sub: "Commuting, travel — weight and battery matter" },
                      { val: "both", label: "Both", sub: "Balanced — moderate weight with all-day battery" },
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

            {/* Result */}
            {isResult && rec && (
              <motion.div
                key="result"
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

                <span className="inline-block px-3 py-1 bg-green-400/10 border border-green-800 text-green-400 text-xs uppercase tracking-[0.2em] mb-4">
                  {rec.tag}
                </span>

                <h2 className="text-2xl font-bold text-white mb-3">{rec.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">{rec.summary}</p>

                {/* Why bullets */}
                <div className="border-t border-green-900/40 pt-4 mb-5">
                  <p className="text-green-800 text-xs uppercase tracking-[0.2em] mb-3">
                    Why this works for you
                  </p>
                  <ul className="space-y-2">
                    {rec.why.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 16 16">
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

                {/* Minimum specs */}
                {rec.minSpecs && rec.minSpecs.length > 0 && (
                  <div className="border border-green-900/50 bg-green-950/20 p-4 mb-6">
                    <p className="text-green-400 text-xs uppercase tracking-[0.2em] mb-3 font-bold">
                      Minimum Specs to Look For
                    </p>
                    <div className="space-y-3">
                      {rec.minSpecs.map((spec, i) => (
                        <div key={i}>
                          <div className="flex gap-2">
                            <span className="text-green-700 text-xs uppercase tracking-[0.1em] shrink-0 w-28 pt-0.5">
                              {spec.label}
                            </span>
                            <span className="text-white text-xs font-semibold">{spec.value}</span>
                          </div>
                          {spec.note && (
                            <p className="text-gray-500 text-xs mt-1 ml-[7.5rem] leading-relaxed">
                              {spec.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
        {!isResult && (
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
              {step === steps.length ? "See My Match →" : "Next →"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
