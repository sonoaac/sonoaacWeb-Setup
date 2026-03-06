import { useState, useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { MessageCircle, X, ChevronLeft } from "lucide-react";

// ── Shared formatting helpers ────────────────────────────────────────────────

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      {title && (
        <p className="text-green-400 font-bold text-xs uppercase tracking-wider mt-2">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

function BulletList({
  items,
  type = "dot",
}: {
  items: string[];
  type?: "check" | "cross" | "dot" | "arrow";
}) {
  const icon =
    type === "check" ? "✔" : type === "cross" ? "✖" : type === "arrow" ? "➡" : "•";
  const iconColor =
    type === "check"
      ? "text-green-400"
      : type === "cross"
      ? "text-red-400"
      : "text-gray-500";
  return (
    <ul className="space-y-0.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-xs">
          <span className={`${iconColor} shrink-0 mt-0.5`}>{icon}</span>
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CompareTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left text-green-400 font-bold py-1 pr-3 border-b border-green-900"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-green-900/30">
              {row.map((cell, j) => (
                <td key={j} className="py-1 pr-3 text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-400 text-xs italic leading-relaxed border-l-2 border-green-900 pl-2">
      {children}
    </p>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-green-900/20 border border-green-900 p-2 rounded text-xs text-gray-300 space-y-1">
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  question: string;
  answer: ReactNode;
  ctas?: { label: string; href: string }[];
}

interface Category {
  id: string;
  label: string;
  questions: Question[];
}

const CATEGORIES: Category[] = [
  // ── What We Do ────────────────────────────────────────────────────────────
  {
    id: "help",
    label: "What We Do",
    questions: [
      {
        id: "services",
        question: "What services does Sonoaac offer?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              We provide a full range of IT services for homes and small businesses.
              Whether you need a quick software fix or a full business network setup,
              we handle it.
            </p>
            <BulletList
              type="check"
              items={[
                "Remote support sessions via Zoom, AnyDesk, or TeamViewer",
                "On-site home and office visits — hardware, networks, and setup",
                "New device configuration and software installation",
                "Custom PC builds and component recommendations",
                "Software troubleshooting and OS fixes",
                "Business IT solutions and ongoing support",
              ]}
            />
          </div>
        ),
        ctas: [
          { label: "View Services", href: "/services" },
          { label: "Book Consultation", href: "/book-consultation" },
        ],
      },
      {
        id: "remote",
        question: "How does remote support work?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              We connect securely to your device over the internet using screen-sharing
              software. You can watch everything we do in real time and end the session
              at any moment — you are always in control.
            </p>
            <Section title="Tools we use">
              <BulletList
                type="dot"
                items={["Zoom", "AnyDesk", "TeamViewer"]}
              />
            </Section>
            <Section title="What we can fix remotely">
              <BulletList
                type="check"
                items={[
                  "Microsoft 365 and email setup or issues",
                  "App crashes, errors, and slow performance",
                  "OS settings, updates, and driver problems",
                  "Software installs, activations, and licenses",
                  "Virus scans and malware removal",
                  "Printer and peripheral connectivity",
                ]}
              />
            </Section>
            <Note>
              Available globally — remote support is not limited by location.
            </Note>
          </div>
        ),
        ctas: [{ label: "Get IT Support", href: "/it-support" }],
      },
      {
        id: "booking",
        question: "How do I book an appointment?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              All services are by appointment. Walk-ins are accepted at an additional
              charge. Booking takes only a few minutes and we will confirm by email
              with all the details.
            </p>
            <BulletList
              type="check"
              items={[
                "Book online through our consultation form — fastest option",
                "Contact us directly via the contact page",
                "Walk-ins accepted at an additional fee",
              ]}
            />
          </div>
        ),
        ctas: [
          { label: "Book Now", href: "/book-consultation" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },

  // ── Software Fixes ────────────────────────────────────────────────────────
  {
    id: "software",
    label: "Software Fixes",
    questions: [
      {
        id: "slow-computer",
        question: "Why is my computer running slow?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              A slow computer is one of the most common tech complaints — and it is
              almost always fixable without replacing the machine. The root cause is
              usually one of a few things.
            </p>
            <Section title="Most common causes">
              <BulletList
                type="dot"
                items={[
                  "Too many startup programs loading in the background at boot",
                  "Low RAM — not enough memory for your current workload",
                  "Old spinning hard drive (HDD) instead of a fast SSD",
                  "Malware or adware quietly consuming CPU and memory",
                  "Outdated Windows updates or outdated drivers",
                  "Storage drive nearly full — Windows slows down significantly below 10% free space",
                  "Too many browser tabs or heavy browser extensions",
                  "Overheating — dust buildup causes the CPU to throttle itself",
                ]}
              />
            </Section>
            <Section title="Typical fixes">
              <BulletList
                type="check"
                items={[
                  "Upgrade to an SSD — often the single biggest speed improvement possible",
                  "Add more RAM — especially if you run 10+ browser tabs or editing software",
                  "Disable unnecessary startup programs via Task Manager",
                  "Run a full virus and malware scan",
                  "Perform a clean Windows update",
                  "Free up disk space or expand storage",
                  "Clean dust from vents and fans",
                ]}
              />
            </Section>
            <Note>
              A computer that feels slow is often fixed by a RAM or SSD upgrade —
              not a full replacement. Many machines from 2015 or later perform like
              new after an SSD swap.
            </Note>
          </div>
        ),
        ctas: [{ label: "Get IT Support", href: "/it-support" }],
      },
      {
        id: "os-comparison",
        question: "What is the difference between Windows, macOS, and ChromeOS?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              These are the three main operating systems for personal computers. Each
              has a different philosophy — choosing the right one depends on what you
              do and what devices you already own.
            </p>
            <Section title="Windows">
              <BulletList
                type="check"
                items={[
                  "Most widely compatible — runs virtually all software",
                  "Best for gaming, business applications, and specialized tools",
                  "Used on the majority of laptops sold at Best Buy, Micro Center, and Costco",
                  "Highly customizable with hardware at every price range",
                  "Required for many corporate and enterprise environments",
                ]}
              />
            </Section>
            <Section title="macOS (Apple)">
              <BulletList
                type="check"
                items={[
                  "Hardware and software built together by Apple — very stable and optimized",
                  "Excellent for photo and video editing, music production, and creative work",
                  "Strong security and long software update support (5 to 7 years)",
                  "Integrates seamlessly with iPhone, iPad, and AirPods",
                  "Apple M-series chips deliver outstanding performance per watt",
                ]}
              />
            </Section>
            <Section title="ChromeOS (Google)">
              <BulletList
                type="check"
                items={[
                  "Lightweight — boots in seconds and rarely gets viruses",
                  "Designed for web and cloud apps (Google Docs, Gmail, YouTube)",
                  "Best for students, casual browsing, and basic office work",
                  "Generally the most affordable hardware option",
                  "Automatic background updates with very little maintenance needed",
                ]}
              />
            </Section>
            <Note>
              If you need Microsoft Office, Photoshop, or QuickBooks — choose
              Windows or macOS. For basic web use or school, ChromeOS works well at
              a low cost.
            </Note>
          </div>
        ),
        ctas: [{ label: "Buy a Computer", href: "/buy-ready-computer" }],
      },
    ],
  },

  // ── On-Site Services ──────────────────────────────────────────────────────
  {
    id: "onsite",
    label: "On-Site Services",
    questions: [
      {
        id: "laptop-upgrades",
        question: "Can laptops be upgraded like desktops?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Usually yes — but only partially. Laptops are designed for portability,
              which limits what can be replaced or added. The key is knowing which
              components are removable before you buy.
            </p>
            <Section title="Commonly upgradeable">
              <BulletList
                type="check"
                items={[
                  "RAM — if not soldered to the motherboard",
                  "SSD storage — most laptops allow this swap even on budget models",
                  "Wi-Fi card — on many business and gaming models",
                  "Battery — on models with accessible service panels",
                ]}
              />
            </Section>
            <Section title="Rarely or never upgradeable">
              <BulletList
                type="cross"
                items={[
                  "CPU (processor) — soldered directly to the board in nearly all laptops",
                  "GPU (graphics) — integrated into the CPU on most laptops",
                  "Display size or resolution",
                  "Ports or IO layout",
                ]}
              />
            </Section>
            <Note>
              Modern ultra-thin laptops like MacBook Air and Dell XPS often solder
              RAM and storage directly to the motherboard to save space — making
              upgrades impossible. Always check before buying if upgradeability
              matters to you.
            </Note>
          </div>
        ),
        ctas: [{ label: "On-Site Services", href: "/on-site-services" }],
      },
      {
        id: "ram-upgrade",
        question: "If a laptop has removable RAM, can it be upgraded?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Yes — if the RAM is not soldered and the motherboard supports a higher
              capacity, upgrading is usually straightforward and cost-effective.
            </p>
            <Section title="Signs RAM is upgradeable">
              <BulletList
                type="dot"
                items={[
                  "Laptop has physical RAM slots — visible when opening the back panel",
                  "Manufacturer specs list a maximum supported RAM amount",
                  "Bottom service panel can be opened with screws",
                  "BIOS or UEFI shows available slots and current usage",
                ]}
              />
            </Section>
            <Section title="Example upgrade scenario">
              <Callout>
                <p>Laptop ships with 8GB RAM in 1 slot, with 1 empty slot remaining.</p>
                <p className="text-green-400">
                  ➡ Can be upgraded to 16GB or 32GB depending on the motherboard's
                  maximum supported RAM.
                </p>
              </Callout>
            </Section>
            <Note>
              Adding more RAM reduces slowdowns when switching between apps, running
              browsers with many tabs open, or using editing software. It is often
              the fastest and cheapest upgrade you can make.
            </Note>
          </div>
        ),
        ctas: [{ label: "Book On-Site Visit", href: "/on-site-services" }],
      },
      {
        id: "brand-upgradeability",
        question: "Why do some laptop brands have better upgradeability?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Design priorities vary by brand. Business and performance laptops
              prioritize serviceability and long lifecycles. Consumer ultra-thin
              models prioritize thinness and weight at the expense of repairability.
            </p>
            <Section title="Brands known for upgrade options">
              <BulletList
                type="check"
                items={[
                  "Lenovo ThinkPad series — famous for repairability, RAM slots, and keyboard replacement",
                  "Dell Latitude and Precision — business focused with full service panel access",
                  "ASUS ProArt and business models — often have dual RAM slots and accessible drives",
                  "HP EliteBook — enterprise designed with field repair in mind",
                ]}
              />
            </Section>
            <Section title="Why these brands are more serviceable">
              <BulletList
                type="dot"
                items={[
                  "More internal space — chassis designed for airflow and component access",
                  "Screw-secured service panels rather than glued housings",
                  "Business-focused designs that need field repairs by IT departments",
                  "Longer product lifecycles requiring spare parts availability for years",
                ]}
              />
            </Section>
            <Section title="Brands with limited upgradeability">
              <BulletList
                type="cross"
                items={[
                  "Apple MacBook — RAM and SSD soldered since 2013, fully sealed on M-series",
                  "Dell XPS 13 consumer — increasingly soldered components over recent generations",
                  "Most ultra-thin budget laptops — glued batteries, soldered RAM and storage",
                ]}
              />
            </Section>
          </div>
        ),
        ctas: [{ label: "Get Advice", href: "/book-consultation" }],
      },
    ],
  },

  // ── Devices ───────────────────────────────────────────────────────────────
  {
    id: "devices",
    label: "Devices",
    questions: [
      {
        id: "cpu-cores",
        question: "What do CPU cores mean?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              The CPU (Central Processing Unit) is the brain of your computer. Cores
              are individual processing units inside the CPU chip — more cores mean
              the processor can handle more tasks at the same time without slowing
              down.
            </p>
            <Section title="Core count guide">
              <CompareTable
                headers={["Type", "Cores", "Best for"]}
                rows={[
                  ["Dual-Core", "2", "Basic browsing, documents"],
                  ["Quad-Core", "4", "Everyday multitasking"],
                  ["8-Core", "8", "Gaming, heavy workloads"],
                  ["12–16 Core", "12–16", "Video editing, 3D rendering"],
                ]}
              />
            </Section>
            <Section title="Major CPU brands">
              <BulletList
                type="dot"
                items={[
                  "Intel — Core i3, i5, i7, and i9 series",
                  "AMD — Ryzen 3, 5, 7, and 9 series",
                  "Apple — M1, M2, M3, M4 chips (Mac and iPad)",
                ]}
              />
            </Section>
            <Note>
              For most home and office use, a 4 to 8 core processor is plenty.
              Creators and gamers benefit most from 8 to 16 cores.
            </Note>
          </div>
        ),
        ctas: [{ label: "Build a PC", href: "/build-pc" }],
      },
      {
        id: "gpu-cores",
        question: "What are GPU cores?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              The GPU (Graphics Processing Unit) handles everything visual — rendering
              images, video, games, and increasingly AI tasks. GPU cores (also called
              shaders or CUDA cores on NVIDIA) process thousands of small calculations
              simultaneously, which is why they are so fast at graphics work.
            </p>
            <Section title="What GPU cores are used for">
              <BulletList
                type="check"
                items={[
                  "Gaming — rendering 3D environments at high frame rates in real time",
                  "Video editing — hardware-accelerated export, effects, and color grading",
                  "AI and machine learning workloads",
                  "3D modeling and rendering in applications like Blender",
                  "Photo editing with heavy filters or large RAW files",
                ]}
              />
            </Section>
            <Section title="Integrated vs dedicated GPU">
              <BulletList
                type="dot"
                items={[
                  "Integrated GPU — built into the CPU chip, shares system RAM, fine for everyday use and video streaming",
                  "Dedicated GPU — a separate card with its own video memory (VRAM), dramatically faster for gaming and creative work",
                ]}
              />
            </Section>
            <Note>
              NVIDIA and AMD are the two main dedicated GPU brands. For gaming or
              serious video work, a dedicated GPU makes a massive real-world
              difference compared to integrated graphics.
            </Note>
          </div>
        ),
        ctas: [{ label: "Custom PC Build", href: "/build-pc" }],
      },
    ],
  },

  // ── Device Setup ──────────────────────────────────────────────────────────
  {
    id: "setup",
    label: "Device Setup",
    questions: [
      {
        id: "ipad-vs-samsung",
        question: "What is the difference between Apple iPads and Samsung tablets?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Both are excellent tablets but built around different ecosystems. The
              right choice depends heavily on what apps and other devices you already
              use.
            </p>
            <Section title="Apple iPad (iPadOS)">
              <BulletList
                type="check"
                items={[
                  "Long software support — 5 to 7 years of iPadOS updates",
                  "Extremely powerful chips (M-series rivals full laptop CPUs)",
                  "Best tablet app selection — many productivity apps are iPad-first",
                  "Works seamlessly with iPhone, Mac, and AirPods",
                  "Apple Pencil support for precise drawing and note-taking",
                ]}
              />
            </Section>
            <Section title="Samsung Galaxy Tab (Android)">
              <BulletList
                type="check"
                items={[
                  "More customization — sideload apps, full file management",
                  "Expandable storage via microSD on many models",
                  "DeX desktop mode on select models for laptop-like multitasking",
                  "Works naturally with Google ecosystem and Android phones",
                  "Generally more affordable at the entry level",
                ]}
              />
            </Section>
            <Note>
              If you already use iPhone and Mac, iPad integrates far better.
              If you use Android and Google services, Samsung Galaxy Tab fits
              naturally into that workflow.
            </Note>
          </div>
        ),
        ctas: [{ label: "Device Setup", href: "/device-setup" }],
      },
      {
        id: "ipad-gpu-cores",
        question: "What do GPU cores mean on iPads?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Apple designs their own chips (A-series and M-series) for iPad. Each
              chip includes both CPU cores and GPU cores on the same piece of silicon,
              which is how Apple achieves both thin design and strong performance.
            </p>
            <Section title="Example — Apple M2 chip">
              <Callout>
                <p>8 CPU cores → handles apps, multitasking, and general performance</p>
                <p>10 GPU cores → handles graphics, gaming, video playback, and export</p>
              </Callout>
            </Section>
            <Section title="Why GPU cores matter on iPad">
              <BulletList
                type="dot"
                items={[
                  "Smoother gaming and high-frame-rate video playback",
                  "Faster photo and video editing in apps like Lightroom and LumaFusion",
                  "Better performance in AR apps and 3D visualization",
                  "ProRes video recording on iPad Pro requires significant GPU performance",
                ]}
              />
            </Section>
            <Note>
              For casual use like browsing, streaming, and notes, any iPad GPU is
              more than enough. For creative professionals, the M-series iPad Pro GPU
              matches or beats many full laptops.
            </Note>
          </div>
        ),
        ctas: [{ label: "Device Setup", href: "/device-setup" }],
      },
    ],
  },

  // ── Buy a Computer ────────────────────────────────────────────────────────
  {
    id: "buy",
    label: "Buy a Computer",
    questions: [
      {
        id: "laptop-specs",
        question: "What specs matter most when buying a laptop?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Here are the most important components to evaluate, ranked by everyday
              impact.
            </p>
            <Section title="1. Processor (CPU)">
              <p className="text-gray-300 text-xs leading-relaxed">
                Determines overall speed and multitasking ability. Look for Intel Core
                i5 / i7 or AMD Ryzen 5 / 7 for solid everyday performance. Avoid
                Celeron and Pentium chips for anything beyond very light use.
              </p>
            </Section>
            <Section title="2. RAM (memory)">
              <BulletList
                type="dot"
                items={[
                  "8GB — absolute minimum for Windows 11 today",
                  "16GB — recommended for comfortable everyday multitasking",
                  "32GB+ — heavy users, video editors, and developers",
                ]}
              />
            </Section>
            <Section title="3. Storage">
              <p className="text-gray-300 text-xs leading-relaxed">
                Always choose SSD over HDD. A 256GB SSD feels dramatically faster than
                a 1TB spinning HDD. 512GB SSD is the sweet spot for most users.
              </p>
            </Section>
            <Section title="4. Display">
              <BulletList
                type="dot"
                items={[
                  "1080p (Full HD) minimum — anything lower looks blurry on modern screens",
                  "Brightness matters for outdoor use or bright office environments",
                  "IPS panels give better color accuracy and viewing angles than TN panels",
                ]}
              />
            </Section>
            <Section title="5. Battery life">
              <p className="text-gray-300 text-xs leading-relaxed">
                Look for 8+ hours of real-world use if you work away from a desk.
                ARM-based laptops (Apple M-series, Snapdragon X Elite) deliver the
                best battery life available today.
              </p>
            </Section>
          </div>
        ),
        ctas: [
          { label: "Buy a Computer", href: "/buy-ready-computer" },
          { label: "Get Advice", href: "/book-consultation" },
        ],
      },
      {
        id: "ssd-vs-hdd",
        question: "Is SSD better than a hard drive?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Yes — SSDs are significantly faster, quieter, and more durable than
              traditional HDDs. They are now standard in most new computers for good
              reason.
            </p>
            <Section title="SSD vs HDD comparison">
              <CompareTable
                headers={["Feature", "HDD", "SSD"]}
                rows={[
                  ["Speed", "Slow", "Very fast"],
                  ["Boot time", "30–60 seconds", "5–15 seconds"],
                  ["Durability", "Mechanical parts", "No moving parts"],
                  ["Noise", "Audible spinning", "Silent"],
                  ["Power use", "Higher", "Lower"],
                  ["Price per GB", "Cheaper", "More expensive"],
                ]}
              />
            </Section>
            <Note>
              Swapping an old HDD for an SSD is often the most cost-effective upgrade
              you can make. A 5-year-old laptop can feel brand new after the swap —
              and the upgrade usually costs between $50 and $100.
            </Note>
          </div>
        ),
        ctas: [{ label: "Get IT Support", href: "/it-support" }],
      },
    ],
  },

  // ── Printers ──────────────────────────────────────────────────────────────
  {
    id: "printers",
    label: "Printers",
    questions: [
      {
        id: "inkjet-vs-laser",
        question: "What is the difference between inkjet and laser printers?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              The right printer depends on what and how often you print. Inkjet
              printers spray liquid ink onto paper. Laser printers use heat and
              powdered toner — a fundamentally different process that has big
              practical advantages for documents.
            </p>
            <Section title="Inkjet printers">
              <BulletList
                type="check"
                items={[
                  "Best print quality for photos and color graphics",
                  "Lower upfront purchase price",
                  "Compact size — fits easily in tight spaces",
                  "Can print on glossy photo paper and specialty media",
                ]}
              />
              <div className="mt-1.5">
                <BulletList
                  type="cross"
                  items={[
                    "Ink cartridges can dry out if not used regularly",
                    "Slower page-per-minute speed than laser",
                    "Higher cost per page over time",
                  ]}
                />
              </div>
            </Section>
            <Section title="Laser printers">
              <BulletList
                type="check"
                items={[
                  "Much faster — better for high-volume printing",
                  "Lower cost per page, especially for text documents",
                  "Toner does not dry out from infrequent use",
                  "Sharper, more consistent text quality",
                ]}
              />
              <div className="mt-1.5">
                <BulletList
                  type="cross"
                  items={[
                    "Higher upfront purchase price",
                    "Usually larger and heavier",
                    "Color laser printers are expensive",
                  ]}
                />
              </div>
            </Section>
            <Note>
              For home use with occasional printing, inkjet works fine. For an office
              or anyone printing 50+ pages per week, a laser printer pays for itself
              quickly in lower toner costs.
            </Note>
          </div>
        ),
        ctas: [{ label: "On-Site Setup", href: "/on-site-services" }],
      },
    ],
  },

  // ── Computer Knowledge ────────────────────────────────────────────────────
  {
    id: "knowledge",
    label: "Computer Knowledge",
    questions: [
      {
        id: "multi-monitor",
        question: "What determines how many monitors a computer can run?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              The number of monitors you can connect depends on several hardware
              factors working together. Understanding these helps avoid buying
              equipment that does not work for your setup.
            </p>
            <Section title="Key factors">
              <BulletList
                type="dot"
                items={[
                  "Graphics card (GPU) — total number of output ports it supports",
                  "Physical video ports on the computer (HDMI, DisplayPort, USB-C / Thunderbolt)",
                  "Whether the laptop GPU supports multiple simultaneous external displays",
                  "Docking station compatibility — quality docks can add 2 to 6 more display ports",
                  "OS and GPU driver support for the desired configuration",
                ]}
              />
            </Section>
            <Section title="Common setups">
              <BulletList
                type="check"
                items={[
                  "Most laptops natively — 1 to 2 external monitors",
                  "Laptop plus USB-C dock — 2 to 4 monitors depending on the dock",
                  "Desktop with mid-range GPU — 3 to 4 monitors",
                  "Desktop with high-end GPU — 4 to 6 monitors",
                ]}
              />
            </Section>
            <Note>
              Apple Silicon MacBooks (base M1 and M2) are limited to 1 external
              monitor without a workaround. The M-series Pro and Max chips officially
              support 2 to 5 external monitors.
            </Note>
          </div>
        ),
        ctas: [{ label: "Get IT Support", href: "/it-support" }],
      },
      {
        id: "component-stores",
        question: "Where can I compare laptops, tablets, and printers in detail?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              Our Knowledge Base has a full interactive comparison tool — pick any two
              products and see a side-by-side spec breakdown with photos, pros, cons,
              and real data.
            </p>
            <Section title="What you can compare">
              <BulletList
                type="check"
                items={[
                  "Laptops — MacBook Air M4, HP Omen, Dell XPS, Lenovo Yoga and more",
                  "Tablets — iPad Pro M4 vs Samsung Galaxy Tab S10 Ultra",
                  "Printers — Epson EcoTank, Brother laser, Canon PIXMA",
                ]}
              />
            </Section>
            <Section title="Also includes full FAQ on">
              <BulletList
                type="dot"
                items={[
                  "Why is my computer slow and how to fix it",
                  "SSD vs HDD with real speed numbers",
                  "CPU cores, GPU types, RAM — explained simply",
                  "Wi-Fi 5 vs 6 vs 6E differences",
                  "How many monitors your setup can support",
                ]}
              />
            </Section>
            <Note>
              Need help choosing? Book a free consultation and we will walk you
              through the right option for your budget and use case.
            </Note>
          </div>
        ),
        ctas: [
          { label: "Knowledge Base", href: "/knowledge-base" },
          { label: "Custom PC Build", href: "/build-pc" },
        ],
      },
    ],
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function HelpBot() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
    setSelectedQuestion(null);
  };

  const category = CATEGORIES.find((c) => c.id === selectedCategory);
  const question = category?.questions.find((q) => q.id === selectedQuestion);

  const goBack = () => {
    if (selectedQuestion) {
      setSelectedQuestion(null);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <>
      {/* Float button */}
      <button
        aria-label="Open help chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-green-400 text-black flex items-center justify-center hover:bg-green-300 transition-colors shadow-lg shadow-green-900/30 rounded-full"
      >
        <MessageCircle size={24} strokeWidth={2} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18 }}
            ref={panelRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            className="fixed bottom-24 right-6 z-[200] w-80 max-w-[calc(100vw-3rem)] bg-black border border-green-800 flex flex-col focus:outline-none shadow-xl shadow-black/50"
            style={{ maxHeight: "72vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-900 shrink-0">
              {selectedCategory || selectedQuestion ? (
                <button
                  aria-label="Go back"
                  onClick={goBack}
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors text-xs font-bold"
                >
                  <ChevronLeft size={14} />
                  Back
                </button>
              ) : (
                <span className="text-xs uppercase tracking-[0.3em] text-green-400 font-bold">
                  Sonoaac Help
                </span>
              )}
              <button
                aria-label="Close help"
                onClick={handleClose}
                className="text-gray-500 hover:text-green-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Breadcrumb */}
            {(selectedCategory || selectedQuestion) && (
              <div className="px-4 py-1.5 border-b border-green-900/40 shrink-0">
                <p className="text-xs text-gray-500 truncate">
                  {category?.label}
                  {question && (
                    <span className="text-gray-600"> › {question.question}</span>
                  )}
                </p>
              </div>
            )}

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {/* Level 3: Answer */}
              {question ? (
                <div className="space-y-3">
                  <p className="text-green-400 font-bold text-xs leading-snug">
                    {question.question}
                  </p>
                  <div className="text-xs space-y-2">{question.answer}</div>
                  {question.ctas && question.ctas.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-green-900/40">
                      {question.ctas.map((cta) => (
                        <Link key={cta.href} href={cta.href}>
                          <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-green-400 text-black text-xs uppercase tracking-[0.15em] font-bold hover:bg-green-300 transition-colors"
                          >
                            {cta.label}
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : category ? (
                /* Level 2: Questions in category */
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 mb-3">Select a question:</p>
                  {category.questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestion(q.id)}
                      className="w-full text-left px-3 py-2.5 border border-green-900 text-gray-300 text-xs hover:border-green-600 hover:text-green-400 hover:bg-green-900/10 transition-colors leading-snug"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              ) : (
                /* Level 1: Categories */
                <div className="space-y-3">
                  <p className="text-xs text-gray-500">What can we help with?</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold border border-green-900 text-gray-400 hover:border-green-600 hover:text-green-400 hover:bg-green-900/10 transition-colors"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
