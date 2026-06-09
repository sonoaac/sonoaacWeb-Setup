import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Monitor, Tablet, Printer, ArrowRight, CheckCircle, XCircle, Minus, Search, X } from "lucide-react";
import { Link } from "wouter";

// ── Types ────────────────────────────────────────────────────────────────────

interface ProductSpec {
  key: string;
  label: string;
  value: string;
  betterIs?: "lower" | "higher" | "none";
}

interface CompareProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: string;
  priceNum: number;
  tagline: string;
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface CompareCategory {
  id: string;
  label: string;
  icon: ReactNode;
  description: string;
  products: CompareProduct[];
}

export interface FAQItem {
  q: string;
  a: ReactNode;
  keywords?: string;
}

export interface FAQSection {
  id: string;
  label: string;
  icon: string;
  items: FAQItem[];
}

// ── Helper: extract first number from string ─────────────────────────────────

function extractNum(val: string): number | null {
  const m = val.replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : null;
}

function compareVals(
  a: string,
  b: string,
  betterIs: "lower" | "higher" | "none"
): "left" | "right" | "tie" | "na" {
  if (betterIs === "none") return "na";
  const na = extractNum(a);
  const nb = extractNum(b);
  if (na === null || nb === null) return "na";
  if (na === nb) return "tie";
  if (betterIs === "lower") return na < nb ? "left" : "right";
  return na > nb ? "left" : "right";
}

// ── Product Data ─────────────────────────────────────────────────────────────

const LAPTOP_SPECS_ORDER = [
  "cpu", "gpu", "gpuType", "ram", "storage",
  "display", "battery", "weight", "os", "ports", "price",
];

const TABLET_SPECS_ORDER = [
  "cpu", "ram", "storage", "display", "battery", "battery_mah",
  "rear_camera", "front_camera", "durability", "stylus",
  "connectivity", "os", "price",
];

const PRINTER_SPECS_ORDER = [
  "type", "speed_bw", "speed_color", "resolution",
  "cost_bw", "cost_color", "functions", "adf", "duplex",
  "connectivity", "price",
];

const COMPARE_CATEGORIES: CompareCategory[] = [
  // ── Laptops ───────────────────────────────────────────────────────────────
  {
    id: "laptops",
    label: "Laptops",
    icon: <Monitor size={18} />,
    description: "Compare 2025 laptops side by side — GPU vs integrated, budget vs premium.",
    products: [
      {
        id: "macbook-air-m4",
        name: "MacBook Air M4",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/2025/03/apple-introduces-the-new-macbook-air-with-the-m4-chip-and-a-sky-blue-color/article/Apple-MacBook-Air-hero-250305_big.jpg.large.jpg",
        price: "$999",
        priceNum: 999,
        tagline: "Ultralight, fanless, all-day battery",
        bestFor: "Students, everyday work, creatives",
        pros: [
          "Up to 18 hours battery — best in class",
          "Completely silent — no fans",
          "Best performance-per-watt available",
          "Incredibly thin and light at 2.7 lbs",
          "Two external monitor support",
        ],
        cons: [
          "No dedicated GPU — limited for gaming",
          "macOS only — smaller gaming library",
          "RAM and storage fixed at purchase",
          "60Hz display only on base model",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Apple M4 (10-core CPU)", betterIs: "none" },
          { key: "gpu", label: "Graphics", value: "Apple M4 Integrated (10-core GPU)", betterIs: "none" },
          { key: "gpuType", label: "GPU Type", value: "Integrated", betterIs: "none" },
          { key: "ram", label: "RAM", value: "16GB – 32GB unified", betterIs: "none" },
          { key: "storage", label: "Storage", value: "256GB – 2TB SSD", betterIs: "none" },
          { key: "display", label: "Display", value: '13.6" Liquid Retina 2560×1664, 60Hz', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "Up to 18 hours", betterIs: "higher" },
          { key: "weight", label: "Weight", value: "2.7 lbs (1.24 kg)", betterIs: "lower" },
          { key: "os", label: "OS", value: "macOS Sequoia", betterIs: "none" },
          { key: "ports", label: "Ports", value: "2× Thunderbolt 4, MagSafe, 3.5mm", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$999", betterIs: "lower" },
        ],
      },
      {
        id: "hp-omen-max-16",
        name: "Omen Max 16",
        brand: "HP",
        image: "https://www.hp.com/content/dam/sites/omen/worldwide/laptops/2025-omen-16-intel/omen-max-16-product-page-header-2880-x-1638-px.jpg",
        price: "$2,099",
        priceNum: 2099,
        tagline: "Full gaming power with RTX 5080",
        bestFor: "Gamers, 3D artists, power users",
        pros: [
          "NVIDIA RTX 5080 handles any game or 3D workload",
          "240Hz QHD display built for competitive gaming",
          "Upgradeable RAM and storage (not soldered)",
          "Best raw GPU performance in a laptop",
          "Strong cooling system with MUX switch",
        ],
        cons: [
          "Heavy at 5.9 lbs — not ideal to carry all day",
          "Battery life drops to 2–3 hours during gaming",
          "Loud fans under full load",
          "High starting price of $2,099+",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Intel Core Ultra 9 / AMD Ryzen AI 9", betterIs: "none" },
          { key: "gpu", label: "Graphics", value: "NVIDIA GeForce RTX 5080 (dedicated)", betterIs: "none" },
          { key: "gpuType", label: "GPU Type", value: "Dedicated (NVIDIA RTX 5080)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "16GB – 64GB DDR5", betterIs: "none" },
          { key: "storage", label: "Storage", value: "512GB – 2TB NVMe SSD", betterIs: "none" },
          { key: "display", label: "Display", value: '16" QHD 2560×1600, 240Hz IPS', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "4–8 hours (2–3h gaming)", betterIs: "higher" },
          { key: "weight", label: "Weight", value: "5.9 lbs (2.68 kg)", betterIs: "lower" },
          { key: "os", label: "OS", value: "Windows 11", betterIs: "none" },
          { key: "ports", label: "Ports", value: "USB-A ×3, USB-C, HDMI 2.1, SD, RJ45", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$2,099", betterIs: "lower" },
        ],
      },
      {
        id: "dell-xps-13-2025",
        name: "XPS 13 (2025)",
        brand: "Dell",
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9345/pdp/laptop-xps-13-9345-nt-bue-01.jpg",
        price: "$1,099",
        priceNum: 1099,
        tagline: "Ultra-thin Windows ultrabook with 27h battery",
        bestFor: "Business travelers, productivity, portability",
        pros: [
          "Up to 27 hours battery life on Snapdragon X Elite",
          "Only 2.73 lbs — extremely portable",
          "FHD+ 120Hz display — smooth and sharp",
          "Competitive price for premium build quality",
          "Copilot+ AI features built in",
        ],
        cons: [
          "Only 2 Thunderbolt ports — limited connectivity",
          "Integrated graphics only — no gaming",
          "Snapdragon ARM model has some app compatibility gaps",
          'Smaller 13.4" screen may feel cramped for some',
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Snapdragon X Elite (12-core) / Intel Core Ultra", betterIs: "none" },
          { key: "gpu", label: "Graphics", value: "Integrated Qualcomm Adreno / Intel Arc", betterIs: "none" },
          { key: "gpuType", label: "GPU Type", value: "Integrated", betterIs: "none" },
          { key: "ram", label: "RAM", value: "16GB – 64GB", betterIs: "none" },
          { key: "storage", label: "Storage", value: "512GB – 1TB SSD", betterIs: "none" },
          { key: "display", label: "Display", value: '13.4" FHD+ 1920×1200, 120Hz', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "Up to 27 hours", betterIs: "higher" },
          { key: "weight", label: "Weight", value: "2.73 lbs (1.24 kg)", betterIs: "lower" },
          { key: "os", label: "OS", value: "Windows 11", betterIs: "none" },
          { key: "ports", label: "Ports", value: "2× Thunderbolt 4 only", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$1,099", betterIs: "lower" },
        ],
      },
      {
        id: "lenovo-yoga-9i-2025",
        name: "Yoga 9i 2-in-1",
        brand: "Lenovo",
        image: "https://p4-ofp.static.pub//fes/cms/2025/11/24/zjkqmclmxzre8a2bjk68do4qpk52ol174345.png",
        price: "$1,440",
        priceNum: 1440,
        tagline: "OLED 2-in-1 convertible for creatives",
        bestFor: "Creatives, students, flexible workers",
        pros: [
          "Stunning 2.8K OLED 120Hz display",
          "Converts to tablet mode — great for drawing and notes",
          "32GB RAM on-chip — fast and efficient",
          "12–15h battery life for a full workday",
          "Intel Arc delivers usable light gaming",
        ],
        cons: [
          "RAM is soldered — cannot upgrade after purchase",
          "Integrated GPU limits 3D and gaming performance",
          "Single 1TB storage option at base",
          "Higher weight than pure ultrabooks at 3.3 lbs",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Intel Core Ultra 7 258V (Lunar Lake)", betterIs: "none" },
          { key: "gpu", label: "Graphics", value: "Intel Arc Integrated (Lunar Lake)", betterIs: "none" },
          { key: "gpuType", label: "GPU Type", value: "Integrated (Intel Arc)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "32GB on-chip (soldered)", betterIs: "none" },
          { key: "storage", label: "Storage", value: "1TB SSD", betterIs: "none" },
          { key: "display", label: "Display", value: '14" OLED 2.8K 2880×1800, 120Hz touch', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "12–15 hours", betterIs: "higher" },
          { key: "weight", label: "Weight", value: "3.3 lbs (1.5 kg)", betterIs: "lower" },
          { key: "os", label: "OS", value: "Windows 11", betterIs: "none" },
          { key: "ports", label: "Ports", value: "2× Thunderbolt 4, USB-A, 3.5mm", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$1,440", betterIs: "lower" },
        ],
      },
      {
        id: "lenovo-yoga-pro-9i-2025",
        name: "Yoga Pro 9i Aura",
        brand: "Lenovo",
        image: "https://p4-ofp.static.pub//fes/cms/2025/11/24/zjkqmclmxzre8a2bjk68do4qpk52ol174345.png",
        price: "$1,849",
        priceNum: 1849,
        tagline: '16" OLED creator laptop with RTX 5060',
        bestFor: "Video editors, designers, semi-pro gamers",
        pros: [
          "RTX 5060 handles real video editing and light gaming",
          "3.2K 120Hz OLED — one of the best creator displays",
          'Large 16" screen for serious work',
          "Solid performance at a lower price than gaming-focused rivals",
          "Good keyboard with backlight",
        ],
        cons: [
          "Heavier than the Yoga 9i at 4.4 lbs",
          "8–10h battery life is decent but not class-leading",
          "RTX 5060 is mid-range — not for high-end 3D",
          "Fans run audibly under GPU load",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Intel Core Ultra 9 285H", betterIs: "none" },
          { key: "gpu", label: "Graphics", value: "NVIDIA GeForce RTX 5060 (dedicated)", betterIs: "none" },
          { key: "gpuType", label: "GPU Type", value: "Dedicated (NVIDIA RTX 5060)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "32GB DDR5", betterIs: "none" },
          { key: "storage", label: "Storage", value: "1TB SSD", betterIs: "none" },
          { key: "display", label: "Display", value: '16" OLED 3.2K 3200×2000, 120Hz', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "8–10 hours (light use)", betterIs: "higher" },
          { key: "weight", label: "Weight", value: "4.4 lbs (2.0 kg)", betterIs: "lower" },
          { key: "os", label: "OS", value: "Windows 11", betterIs: "none" },
          { key: "ports", label: "Ports", value: "USB-C ×2, USB-A ×3, HDMI 2.1, SD", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$1,849", betterIs: "lower" },
        ],
      },
    ],
  },

  // ── Tablets ───────────────────────────────────────────────────────────────
  {
    id: "tablets",
    label: "Tablets",
    icon: <Tablet size={18} />,
    description: "Compare the top tablets — Apple vs Samsung, camera, battery, and performance.",
    products: [
      {
        id: "ipad-pro-m4",
        name: "iPad Pro M4 13\"",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/2024/05/apple-unveils-stunning-new-ipad-pro-with-m4-chip-and-apple-pencil-pro/article/Apple-iPad-Pro-hero-240507_big.jpg.large.jpg",
        price: "$1,299",
        priceNum: 1299,
        tagline: "Most powerful iPad ever, laptop-class chip",
        bestFor: "Creative professionals, developers, iPad power users",
        pros: [
          "M4 chip matches MacBook performance — fastest tablet chip ever",
          "Tandem OLED Ultra Retina XDR — exceptional display quality",
          "5.1mm thin — world's thinnest Apple product",
          "Thunderbolt 4 USB-C — connects to pro displays and docks",
          "Long software support (6–7 years of iPadOS updates)",
        ],
        cons: [
          "Starting at $1,299 — significantly more expensive",
          "S Pen not included (Apple Pencil Pro sold separately, $129)",
          "iPadOS is still more limited than macOS or Android for file management",
          "No IP68 rating — requires a case for water resistance",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Apple M4 (9-core CPU, 10-core GPU)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "8GB – 16GB", betterIs: "none" },
          { key: "storage", label: "Storage", value: "256GB – 2TB", betterIs: "none" },
          { key: "display", label: "Display", value: '13" Ultra Retina XDR OLED, 2752×2064, 120Hz ProMotion', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "Up to 13 hours", betterIs: "higher" },
          { key: "battery_mah", label: "Battery Capacity", value: "10,307 mAh", betterIs: "higher" },
          { key: "rear_camera", label: "Rear Camera", value: "12MP wide, 4K@60fps video", betterIs: "none" },
          { key: "front_camera", label: "Front Camera", value: "12MP ultra-wide, Center Stage", betterIs: "none" },
          { key: "durability", label: "Durability / Water Resist.", value: "No official IP rating", betterIs: "none" },
          { key: "stylus", label: "Stylus", value: "Apple Pencil Pro (sold separately, $129)", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3, USB-C Thunderbolt 4", betterIs: "none" },
          { key: "os", label: "OS", value: "iPadOS 17", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$1,299", betterIs: "lower" },
        ],
      },
      {
        id: "samsung-tab-s10-ultra",
        name: "Galaxy Tab S10 Ultra",
        brand: "Samsung",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s10-ultra.jpg",
        price: "$1,199",
        priceNum: 1199,
        tagline: '14.6" Android powerhouse with S Pen included',
        bestFor: "Android users, multi-taskers, note-takers",
        pros: [
          '14.6" Dynamic AMOLED 2X — largest premium tablet display',
          "S Pen included — no extra stylus cost",
          "IP68 water and dust resistance",
          "MicroSD slot for expandable storage",
          "Dual front cameras — better for video calls",
          "DeX mode — desktop-like multitasking",
        ],
        cons: [
          "Dimensity 9300+ significantly behind Apple M4 in benchmarks",
          "Battery life ~9.5h vs 13h on iPad Pro",
          "Android tablet app selection still lags behind iPadOS",
          "Heavy at 718g vs 579g for iPad Pro",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "MediaTek Dimensity 9300+ (4nm)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "12GB – 16GB", betterIs: "none" },
          { key: "storage", label: "Storage", value: "256GB – 1TB + microSD expandable", betterIs: "none" },
          { key: "display", label: "Display", value: '14.6" Dynamic AMOLED 2X, 1848×2960, 120Hz', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "Up to 9.5 hours", betterIs: "higher" },
          { key: "battery_mah", label: "Battery Capacity", value: "11,200 mAh", betterIs: "higher" },
          { key: "rear_camera", label: "Rear Camera", value: "13MP wide + 8MP ultra-wide, 4K@30fps", betterIs: "none" },
          { key: "front_camera", label: "Front Camera", value: "12MP + 12MP ultra-wide (dual selfie)", betterIs: "none" },
          { key: "durability", label: "Durability / Water Resist.", value: "IP68 rated (1.5m for 30 min)", betterIs: "none" },
          { key: "stylus", label: "Stylus", value: "S Pen included in box", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3, USB-C 3.2, optional 5G", betterIs: "none" },
          { key: "os", label: "OS", value: "Android 14 / One UI 6.1", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$1,199", betterIs: "lower" },
        ],
      },
      {
        id: "ipad-air-m2",
        name: "iPad Air M2 11\"",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/2024/05/apple-unveils-stunning-new-ipad-pro-with-m4-chip-and-apple-pencil-pro/article/Apple-iPad-Pro-hero-240507_big.jpg.large.jpg",
        price: "$599",
        priceNum: 599,
        tagline: "Powerful mid-range iPad for most people",
        bestFor: "Students, home users, light creatives",
        pros: [
          "M2 chip — faster than most Android tablets",
          "More affordable than iPad Pro at $599",
          "Apple Pencil 2 support for drawing and notes",
          "USB-C with good speed for most users",
          "Light at 1.02 lbs",
        ],
        cons: [
          "LCD display (not OLED) — less vibrant than Pro",
          "60Hz only — no ProMotion on this model",
          "8GB RAM — less than iPad Pro",
          "Apple Pencil sold separately",
        ],
        specs: [
          { key: "cpu", label: "Processor", value: "Apple M2 (8-core CPU, 9-core GPU)", betterIs: "none" },
          { key: "ram", label: "RAM", value: "8GB", betterIs: "none" },
          { key: "storage", label: "Storage", value: "128GB – 1TB", betterIs: "none" },
          { key: "display", label: "Display", value: '11" Liquid Retina IPS LCD, 2360×1640, 60Hz', betterIs: "none" },
          { key: "battery", label: "Battery Life", value: "Up to 10 hours", betterIs: "higher" },
          { key: "battery_mah", label: "Battery Capacity", value: "7,606 mAh", betterIs: "higher" },
          { key: "rear_camera", label: "Rear Camera", value: "12MP wide, 4K@60fps video", betterIs: "none" },
          { key: "front_camera", label: "Front Camera", value: "12MP ultra-wide, Center Stage", betterIs: "none" },
          { key: "durability", label: "Durability / Water Resist.", value: "No official IP rating", betterIs: "none" },
          { key: "stylus", label: "Stylus", value: "Apple Pencil 2 (sold separately, $129)", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3, USB-C 3.2", betterIs: "none" },
          { key: "os", label: "OS", value: "iPadOS 17", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "$599", betterIs: "lower" },
        ],
      },
    ],
  },

  // ── Printers ──────────────────────────────────────────────────────────────
  {
    id: "printers",
    label: "Printers",
    icon: <Printer size={18} />,
    description: "Inkjet vs laser — compare cost per page, speed, and best use cases.",
    products: [
      {
        id: "epson-ecotank-et4850",
        name: "EcoTank ET-4850",
        brand: "Epson",
        image: "https://epson.com/Assets/us/Products/C11CJ29201/hero-zoom/c11cj29201_zoom_0.jpg",
        price: "~$349",
        priceNum: 349,
        tagline: "Lowest running cost — refillable ink tanks",
        bestFor: "High-volume color printing, small offices, families",
        pros: [
          "Lowest cost per page — as low as $0.003 per page in black",
          "Ink tank holds enough for years of printing",
          "No cartridge purchases — just refill bottles",
          "Full all-in-one: print, copy, scan, fax",
          "Wi-Fi and Ethernet for network sharing",
        ],
        cons: [
          "Higher upfront cost (~$349)",
          "Inkjet — ink can smear on some paper types",
          "Slower than laser at 15 ppm",
          "Bulkier design than standard inkjet",
        ],
        specs: [
          { key: "type", label: "Printer Type", value: "Inkjet (refillable tank)", betterIs: "none" },
          { key: "speed_bw", label: "Speed (B&W)", value: "15 ppm", betterIs: "higher" },
          { key: "speed_color", label: "Speed (Color)", value: "8 ppm", betterIs: "higher" },
          { key: "resolution", label: "Resolution", value: "4800 × 1200 dpi", betterIs: "none" },
          { key: "cost_bw", label: "Cost/page (B&W)", value: "~$0.003", betterIs: "lower" },
          { key: "cost_color", label: "Cost/page (Color)", value: "~$0.010", betterIs: "lower" },
          { key: "functions", label: "Functions", value: "Print, Copy, Scan, Fax", betterIs: "none" },
          { key: "adf", label: "Auto Doc. Feeder", value: "Yes — 35 pages", betterIs: "none" },
          { key: "duplex", label: "Auto Duplex", value: "Yes", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, Ethernet, USB", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "~$349", betterIs: "lower" },
        ],
      },
      {
        id: "brother-hll2380dw",
        name: "HL-L2380DW",
        brand: "Brother",
        image: "https://www.brother-usa.com/~/media/Product%20Images/HL-L2380DW_front.jpg",
        price: "~$180",
        priceNum: 180,
        tagline: "Fast monochrome laser for heavy document loads",
        bestFor: "Office environments, high document volume, businesses",
        pros: [
          "36 ppm — significantly faster than inkjet printers",
          "Low 3.7¢ cost per page for text documents",
          "Toner does not dry out from infrequent use",
          "50-page auto document feeder",
          "Auto duplex + Wi-Fi built in",
        ],
        cons: [
          "Monochrome only — no color printing",
          "Higher toner cartridge cost than EcoTank ink",
          "Not ideal for photos or color-heavy documents",
          "Larger footprint than compact inkjets",
        ],
        specs: [
          { key: "type", label: "Printer Type", value: "Laser (monochrome)", betterIs: "none" },
          { key: "speed_bw", label: "Speed (B&W)", value: "36 ppm", betterIs: "higher" },
          { key: "speed_color", label: "Speed (Color)", value: "N/A — B&W only", betterIs: "none" },
          { key: "resolution", label: "Resolution", value: "1200 × 1200 dpi", betterIs: "none" },
          { key: "cost_bw", label: "Cost/page (B&W)", value: "~$0.037", betterIs: "lower" },
          { key: "cost_color", label: "Cost/page (Color)", value: "Not available", betterIs: "none" },
          { key: "functions", label: "Functions", value: "Print, Copy, Scan", betterIs: "none" },
          { key: "adf", label: "Auto Doc. Feeder", value: "Yes — 50 pages", betterIs: "none" },
          { key: "duplex", label: "Auto Duplex", value: "Yes", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi, Ethernet, USB, Bluetooth", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "~$180", betterIs: "lower" },
        ],
      },
      {
        id: "canon-pixma-ts9521c",
        name: "PIXMA TS9521C",
        brand: "Canon",
        image: "https://www.usa.canon.com/T/GetAsset?category=pdpimagerotation&altImageIndex=0&partnumber=4459C002",
        price: "~$180",
        priceNum: 180,
        tagline: "Versatile inkjet for photos and everyday printing",
        bestFor: "Home users, photo printing, light office use",
        pros: [
          "Excellent photo print quality — 4800×1200 dpi color",
          "Compact and quiet for home use",
          "Bluetooth and Wi-Fi for easy wireless printing",
          "More affordable upfront than EcoTank",
          "Prints on a variety of media including glossy photo paper",
        ],
        cons: [
          "Ink cartridges can dry out if unused for weeks",
          "Higher cost per color page (~$0.10)",
          "Slower than laser at 13 ppm",
          "Cartridge replacements needed more often than EcoTank",
        ],
        specs: [
          { key: "type", label: "Printer Type", value: "Inkjet (cartridge)", betterIs: "none" },
          { key: "speed_bw", label: "Speed (B&W)", value: "13 ppm", betterIs: "higher" },
          { key: "speed_color", label: "Speed (Color)", value: "10 ppm", betterIs: "higher" },
          { key: "resolution", label: "Resolution", value: "4800 × 1200 dpi", betterIs: "none" },
          { key: "cost_bw", label: "Cost/page (B&W)", value: "~$0.040", betterIs: "lower" },
          { key: "cost_color", label: "Cost/page (Color)", value: "~$0.100", betterIs: "lower" },
          { key: "functions", label: "Functions", value: "Print, Copy, Scan", betterIs: "none" },
          { key: "adf", label: "Auto Doc. Feeder", value: "Yes", betterIs: "none" },
          { key: "duplex", label: "Auto Duplex", value: "Yes", betterIs: "none" },
          { key: "connectivity", label: "Connectivity", value: "Wi-Fi, Bluetooth, USB", betterIs: "none" },
          { key: "price", label: "Starting Price", value: "~$180", betterIs: "lower" },
        ],
      },
    ],
  },
];

// ── FAQ Data ──────────────────────────────────────────────────────────────────

export const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "slow-pc",
    label: "Slow & Freezing Computers",
    icon: "🐌",
    items: [
      {
        q: "Why is my computer running slow?",
        keywords: "slow computer fix speed up sluggish freezing startup slow boot performance",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>A slow computer is almost always fixable without replacing the machine. The cause is usually one of these:</p>
            <ul className="space-y-1 pl-1">
              {[
                "Too many startup programs loading every time you boot",
                "Insufficient RAM — not enough memory for your workload",
                "Old spinning hard drive (HDD) instead of a fast SSD",
                "Malware or adware quietly consuming CPU and RAM",
                "Outdated Windows or driver updates pending",
                "Storage drive nearly full (below 10% free slows Windows significantly)",
                "Overheating — dust buildup causes the CPU to throttle down",
                "Browser with too many extensions or dozens of open tabs",
              ].map((item, i) => (
                <li key={i} className="flex gap-2"><span className="text-gray-400 shrink-0">•</span>{item}</li>
              ))}
            </ul>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Most effective fixes:</p>
              <ul className="space-y-1 pl-1">
                {[
                  "Replace HDD with SSD — often the single biggest improvement possible",
                  "Add more RAM (especially if you run 10+ browser tabs or editing apps)",
                  "Disable unused startup programs via Task Manager",
                  "Run a full malware scan",
                  "Free up storage — delete or move files you no longer need",
                  "Clean dust from vents with compressed air",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-500 shrink-0">✔</span>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">A machine that feels slow is often fixed by a RAM or SSD upgrade — not replacement. Many laptops from 2015+ perform like new after an SSD swap.</p>
          </div>
        ),
      },
      {
        q: "My computer freezes and then comes back — what causes that?",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <p>Temporary freezes (where the computer pauses and then recovers) are usually caused by:</p>
            <ul className="space-y-1 pl-1">
              {[
                "HDD struggling to read/write — the mechanical arm gets behind on requests",
                "RAM running out — Windows moves data to a slow swap file on disk",
                "Background Windows Update downloading and installing",
                "Antivirus scanning in the background during peak usage",
                "Driver conflict or outdated GPU/chipset driver",
                "Failing or overheating storage drive (check SMART status with CrystalDiskInfo)",
              ].map((item, i) => (
                <li key={i} className="flex gap-2"><span className="text-gray-400 shrink-0">•</span>{item}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If the freezes are getting more frequent, your storage drive may be failing. Back up your data immediately and request a diagnostic.</p>
          </div>
        ),
      },
      {
        q: "How do I know if I need more RAM or an SSD?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Signs you need more RAM:</p>
              <ul className="space-y-1 pl-1">
                {[
                  "Task Manager shows RAM usage constantly above 85–90%",
                  "System slows drastically when switching between apps",
                  "Browser tabs take a long time to reload after switching",
                  "You regularly run 10+ browser tabs plus other apps",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-400 shrink-0">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Signs you need an SSD:</p>
              <ul className="space-y-1 pl-1">
                {[
                  "Windows takes 30–60 seconds to boot instead of 5–10 seconds",
                  "Opening apps or files feels sluggish even on a fast CPU",
                  "You can hear the hard drive spinning and clicking during load",
                  "CrystalDiskInfo shows HDD health below 80%",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-500 shrink-0">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">You can have both problems at the same time. An SSD upgrade alone costs $50–$100 for a 500GB drive and is typically the first recommendation.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "os",
    label: "Windows, macOS & ChromeOS",
    icon: "💻",
    items: [
      {
        q: "What is the difference between Windows, macOS, and ChromeOS?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-green-950/10 border border-green-900/20 rounded-lg p-3">
                <p className="font-bold text-green-800 mb-1">Windows</p>
                <ul className="space-y-0.5 text-xs">
                  {["Most compatible — runs virtually all software", "Best for gaming, business tools, and specialized apps", "Widest hardware price range ($300 to $3,000+)", "Used on most laptops and desktops worldwide", "Required for many corporate IT environments"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-400">✔</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-gray-800 mb-1">macOS (Apple)</p>
                <ul className="space-y-0.5 text-xs">
                  {["Hardware and software built together — very stable and optimized", "M-series chips deliver industry-leading performance per watt", "Best battery life of any laptop platform", "Best-in-class for photo/video editing and audio production", "Integrates seamlessly with iPhone, iPad, and AirPods"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500">✔</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                <p className="font-bold text-yellow-800 mb-1">ChromeOS (Google)</p>
                <ul className="space-y-0.5 text-xs">
                  {["Lightweight — boots in under 10 seconds", "Almost immune to viruses and malware", "Designed for web and cloud apps (Google Workspace)", "Best for students, basic browsing, and light office work", "Most affordable hardware — Chromebooks start under $200"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-yellow-600">✔</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If you need Microsoft Office (full desktop version), gaming, or specialized business software — choose Windows or macOS. ChromeOS works well for students and basic web use at a low price.</p>
          </div>
        ),
      },
      {
        q: "Should I upgrade to Windows 11?",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <p>Windows 10 reaches end of support in October 2025, meaning no more security updates. Upgrading to Windows 11 is recommended if your hardware supports it.</p>
            <p className="font-semibold text-gray-700">Windows 11 minimum requirements:</p>
            <ul className="space-y-1 pl-1">
              {["64-bit processor at 1GHz or faster (most made after 2015 qualify)", "4GB RAM minimum (8GB strongly recommended)", "64GB storage minimum", "TPM 2.0 security chip (most post-2017 machines have this)"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-gray-400">•</span>{x}</li>)}
            </ul>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Run the PC Health Check tool from Microsoft to see if your computer is eligible. If it is not, the machine may be due for an upgrade regardless.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware & Upgrades",
    icon: "🔧",
    items: [
      {
        q: "Can I upgrade my laptop's RAM and storage?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="font-bold text-green-700 text-xs mb-1.5">Usually Upgradeable</p>
                <ul className="space-y-0.5 text-xs">
                  {["RAM (if not soldered)", "SSD / storage drive", "Wi-Fi card (some models)", "Battery (with panel access)"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500">✔</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <p className="font-bold text-red-700 text-xs mb-1.5">Rarely Upgradeable</p>
                <ul className="space-y-0.5 text-xs">
                  {["CPU (processor)", "GPU (graphics)", "Display", "Ports or IO layout"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-red-400">✖</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p>Whether RAM is upgradeable depends on the laptop. Signs it is:</p>
            <ul className="space-y-1 pl-1 text-xs">
              {["Bottom panel can be opened with screws", "Manufacturer spec sheet lists maximum RAM", "RAM slots visible inside the chassis", "Manufacturer sells RAM upgrade kits for the model"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-gray-400">•</span>{x}</li>)}
            </ul>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Brands like Lenovo ThinkPad, Dell Latitude, and ASUS ProArt tend to be the most upgradeable. Apple MacBooks and most ultra-thin consumer laptops solder components to save space.</p>
          </div>
        ),
      },
      {
        q: "What is the difference between SSD and HDD?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold text-gray-700">HDD</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold text-green-700">SSD</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Boot time", "30–60 seconds", "5–10 seconds"],
                    ["Speed", "80–160 MB/s", "500–7,000 MB/s"],
                    ["Moving parts", "Yes — spinning disk + arm", "No — flash memory chips"],
                    ["Noise", "Audible clicks and hum", "Completely silent"],
                    ["Shock resistance", "Vulnerable to drops", "Resistant to drops"],
                    ["Lifespan", "3–5 years typical", "5–10 years typical"],
                    ["Cost per GB", "Lower (~$0.02/GB)", "Higher (~$0.07/GB)"],
                    ["Power use", "Higher draw", "Lower draw"],
                  ].map(([feat, hdd, ssd], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{feat}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-500">{hdd}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-green-700">{ssd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Replacing an HDD with a 500GB SSD typically costs $50–$80 and is the single highest-impact upgrade for a slow laptop.</p>
          </div>
        ),
      },
      {
        q: "What do CPU cores actually mean for everyday use?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>CPU cores are independent processing units inside the chip. More cores allow the CPU to handle more tasks simultaneously without slowing down.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Core count</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Real-world meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2 cores (Dual-Core)", "Basic email, documents, browsing — may struggle with modern multitasking"],
                    ["4 cores (Quad-Core)", "Smooth everyday use, video calls, light photo editing"],
                    ["8 cores", "Gaming, multiple apps open, video encoding"],
                    ["12–16 cores", "Video editing, 3D rendering, heavy developer workloads"],
                    ["20+ cores (M4 / Intel Ultra)", "Professional creative workloads, AI, large data sets"],
                  ].map(([cores, meaning], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{cores}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">GHz (clock speed) matters too — a 4-core chip at 4.5GHz often outperforms an 8-core chip at 2.0GHz for everyday single-threaded tasks.</p>
          </div>
        ),
      },
      {
        q: "What is a dedicated GPU and do I need one?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>Most laptops use an integrated GPU — graphics processing built into the CPU chip that shares system RAM. A dedicated GPU is a separate graphics card with its own fast VRAM memory.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-gray-700 text-xs mb-1.5">Integrated GPU — fine for:</p>
                <ul className="space-y-0.5 text-xs text-gray-600">
                  {["Web browsing and email", "4K video streaming", "Basic photo editing", "Light productivity apps", "Casual games from 2010–2015"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="font-bold text-green-700 text-xs mb-1.5">Dedicated GPU — needed for:</p>
                <ul className="space-y-0.5 text-xs text-gray-600">
                  {["Modern gaming at high settings", "Video editing and export", "3D modeling (Blender, CAD)", "AI image generation", "Machine learning"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500">✔</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Note: Apple's M-series chips have very capable integrated GPUs that outperform many entry-level dedicated GPUs — the line is blurring on Apple hardware specifically.</p>
          </div>
        ),
      },
      {
        q: "How much RAM do I actually need in 2025?",
        keywords: "ram memory how much 8gb 16gb 32gb enough too much need",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>RAM (memory) determines how many things your computer can handle at once. More RAM prevents slowdowns when multitasking. Here's the real-world breakdown:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">RAM Amount</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Who it's for</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">What it handles</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["4GB", "Basic Chromebook use only", "Web browsing and Google Docs — anything more will stutter"],
                    ["8GB", "Light users only in 2025", "Email, browsing, Office — will feel sluggish with Teams open too"],
                    ["16GB", "The recommended standard in 2025", "All everyday work including Teams, Office, and 15+ browser tabs simultaneously"],
                    ["32GB", "Power users, creative, dev work", "Video editing, multiple VMs, coding with Docker, heavy Photoshop work"],
                    ["64GB+", "Professional workstations", "3D rendering, machine learning, data science with large datasets"],
                  ].map(([ram, who, handles], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-2 px-3 border border-gray-200 font-bold text-green-700">{ram}</td>
                      <td className="py-2 px-3 border border-gray-200 font-medium text-gray-700">{who}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-500">{handles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
              <p className="font-semibold text-gray-800">What apps actually use:</p>
              <ul className="space-y-1 text-gray-600">
                {[
                  "Google Chrome: 150–500MB per tab — 20 tabs = 3–10GB RAM just in your browser",
                  "Microsoft Teams: 500MB–1.5GB on its own — more during screen sharing and video calls",
                  "Microsoft Outlook: 200–600MB depending on mailbox size",
                  "Microsoft Word/Excel: 200–500MB each",
                  "Zoom (during a call with background blur): 600MB–1.2GB",
                  "OneDrive sync running in background: 100–300MB",
                ].map((x, i) => <li key={i} className="flex gap-2"><span className="text-gray-400">•</span>{x}</li>)}
              </ul>
              <p className="font-semibold text-gray-700 mt-2">Total for a typical work session: 6–14GB RAM — which is why 8GB is tight and 16GB is the right minimum in 2025.</p>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">RAM is one of the cheapest upgrades if your laptop supports it. Adding 8GB to a machine with slow 8GB often costs $30–$50 and makes a dramatic difference in daily responsiveness.</p>
          </div>
        ),
      },
      {
        q: "What are the minimum specs for a work or office computer in 2025?",
        keywords: "minimum specs work office computer typing email teams zoom word excel what do i need requirements work laptop",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>The right specs depend on what you actually run. Here are the minimum requirements by workload:</p>
            <div className="space-y-3">
              {[
                {
                  label: "Light Use — Typing, Email, Web Browsing",
                  color: "bg-green-50 border-green-100",
                  specs: [
                    ["CPU", "Intel Core i3/i5 (any 2019+) or AMD Ryzen 3/5", "A 4-core CPU is more than enough for typing and web browsing"],
                    ["RAM", "8GB minimum, 16GB preferred", "8GB handles light use — 16GB adds buffer for more tabs and apps"],
                    ["Storage", "256GB SSD", "SSD is mandatory — HDD makes even typing feel slow due to system delays"],
                    ["Battery", "10+ hours real-world", "Prioritize battery if you work without an outlet nearby"],
                  ],
                },
                {
                  label: "Office Work — Teams, Outlook, Word, Excel",
                  color: "bg-green-950/10 border-green-900/20",
                  specs: [
                    ["CPU", "Intel Core i5/i7 (Gen 11+) or AMD Ryzen 5/7", "Needed for Teams video calls and Excel with large datasets"],
                    ["RAM", "16GB — non-negotiable", "Teams + Outlook + Chrome + OneDrive together use 8–14GB RAM"],
                    ["Storage", "512GB SSD", "Outlook cache, Office installs, and OneDrive local sync use 50–100GB"],
                    ["OS", "Windows 11 Pro for business", "Allows domain join, BitLocker encryption, and Remote Desktop"],
                  ],
                },
                {
                  label: "Heavy Work — Multiple Apps, Large Files, Presentations",
                  color: "bg-orange-50 border-orange-100",
                  specs: [
                    ["CPU", "Intel Core i7/i9 or AMD Ryzen 7/9", "More cores handle parallel app loading and heavy file operations"],
                    ["RAM", "32GB", "Heavy multitasking with large files and multiple demanding apps"],
                    ["Storage", "1TB NVMe SSD", "Large project files, recordings, and installs fill storage fast"],
                    ["GPU", "Dedicated GPU if doing any visual design or video", "Otherwise integrated GPU is fine for Office work"],
                  ],
                },
              ].map((tier, ti) => (
                <div key={ti} className={`border rounded-lg p-3 ${tier.color}`}>
                  <p className="font-bold text-gray-800 text-sm mb-2">{tier.label}</p>
                  <div className="space-y-1.5">
                    {tier.specs.map(([spec, value, note], si) => (
                      <div key={si}>
                        <div className="flex gap-2 text-sm">
                          <span className="font-semibold text-gray-700 w-20 shrink-0">{spec}:</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                        {note && <p className="text-xs text-gray-500 ml-[5.5rem]">{note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If your current computer is slow for work, the most common fix is adding RAM (if upgradeable) or replacing the hard drive with an SSD — not buying a new machine. Sonoaac can diagnose what's bottlenecking your system.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "buying",
    label: "Buying a Computer",
    icon: "🛒",
    items: [
      {
        q: "What specs should I focus on when buying a laptop?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>Here are the specs that actually matter for everyday performance, in order of impact:</p>
            <ol className="space-y-2">
              {[
                ["Processor (CPU)", "Look for Intel Core i5/i7 Gen 12+ or AMD Ryzen 5/7 7000+. Avoid Celeron, Pentium, and Atom for anything beyond very basic use."],
                ["RAM", "16GB is the recommended starting point in 2025. 8GB is workable but tight. 32GB for video/photo editors."],
                ["Storage (SSD)", "512GB SSD minimum. Avoid HDD. NVMe SSD is faster than SATA SSD — look for NVMe if performance matters."],
                ["Display", "1080p (1920×1080) minimum. IPS or OLED for better colors. 120Hz for smooth scrolling. 300+ nits brightness for bright rooms."],
                ["Battery life", "Look for 10+ hours of real-world use if you work away from an outlet. ARM chips (M-series, Snapdragon X) deliver the best battery."],
              ].map(([spec, desc], i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-500 font-bold shrink-0">{i + 1}.</span>
                  <div><span className="font-semibold text-gray-700">{spec}: </span>{desc}</div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Don't judge a laptop by price alone. A $600 laptop with 16GB RAM and SSD will outperform a $900 laptop with 8GB RAM and HDD in everyday use.</p>
          </div>
        ),
      },
      {
        q: "How long should a laptop or desktop last?",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Device type</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Typical lifespan</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Budget laptop ($300–600)", "3–4 years", "Limited upgrade options"],
                    ["Mid-range laptop ($700–1,200)", "4–6 years", "SSD + RAM upgrade extends life"],
                    ["Premium laptop ($1,300+)", "5–8 years", "Better build, longer support"],
                    ["Desktop PC", "7–10+ years", "Highly upgradeable — swap GPU, RAM, SSD over time"],
                    ["MacBook (M-series)", "6–8+ years", "Apple offers 7 years of macOS updates"],
                  ].map(([type, life, notes], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-700">{type}</td>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-green-700">{life}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-500">{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Proper maintenance (keeping storage above 15% free, cleaning dust, updating drivers) can add 1–2 years to any machine's effective life.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "tablets",
    label: "Tablets & Mobile",
    icon: "📱",
    items: [
      {
        q: "iPad vs Android tablet — which should I choose?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-gray-800 text-xs mb-1.5">Choose iPad if:</p>
                <ul className="space-y-0.5 text-xs">
                  {["You already use iPhone or Mac", "App quality matters to you (most apps are iPad-first)", "You want 5–7 years of software updates", "You do creative work (drawing, music, video)"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-gray-600">•</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-green-950/10 border border-green-900/20 rounded-lg p-3">
                <p className="font-bold text-green-800 text-xs mb-1.5">Choose Android if:</p>
                <ul className="space-y-0.5 text-xs">
                  {["You use Android phone or Google apps", "You want a larger screen at lower cost", "You need microSD expandable storage", "You want more file management control"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500">•</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Neither is objectively better — the right choice depends on your existing ecosystem and how you plan to use the tablet.</p>
          </div>
        ),
      },
      {
        q: "What do GPU cores mean on tablets and phones?",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <p>Apple's chips (A-series and M-series) contain both CPU cores and GPU cores on one piece of silicon. More GPU cores = faster graphics, gaming, and video processing.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs space-y-1">
              <p className="font-semibold text-gray-700">Example — Apple M4 chip:</p>
              <p>• <span className="text-gray-800 font-medium">9-core CPU</span> — handles apps, multitasking, general tasks</p>
              <p>• <span className="text-green-700 font-medium">10-core GPU</span> — handles graphics, video editing, gaming frames</p>
            </div>
            <p>More GPU cores directly improve: gaming smoothness, video export speed in apps like LumaFusion, AR/3D app performance, and ProRes video recording on iPad Pro.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "networking",
    label: "Networking & Wi-Fi",
    icon: "📶",
    items: [
      {
        q: "My Wi-Fi is slow — is it my router or my device?",
        keywords: "wifi slow router device speed test ethernet speed problem fix",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <p>Run a quick test to isolate the problem:</p>
            <ol className="space-y-1.5">
              {[
                "Run a speed test at fast.com while connected to Wi-Fi — note the result",
                "Plug a laptop directly into the router with an Ethernet cable — run the speed test again",
                "If Ethernet is fast but Wi-Fi is slow, the problem is your Wi-Fi signal, router placement, or the device's Wi-Fi card",
                "If both are slow, the problem is your internet service or the modem/router itself",
              ].map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-500 font-bold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="font-semibold text-gray-700 mt-1">Common Wi-Fi fixes:</p>
            <ul className="space-y-0.5 text-xs pl-1">
              {["Reboot the router (unplug for 30 seconds)", "Move the router to a central location — walls and floors block signal", "Upgrade to Wi-Fi 6 router if yours is 5+ years old", "Use a mesh system for large homes or offices", "Change Wi-Fi channel in router settings to avoid interference from neighbors"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-gray-400">•</span>{x}</li>)}
            </ul>
          </div>
        ),
      },
      {
        q: "What is the difference between Wi-Fi 5, Wi-Fi 6, and Wi-Fi 6E?",
        keywords: "wifi 5 wifi 6 wifi 6e wifi 7 difference upgrade 802.11ac 802.11ax speed standard",
        a: (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Standard</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Max speed</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Frequency</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Wi-Fi 5 (802.11ac)", "3.5 Gbps", "5GHz", "Good for most homes"],
                    ["Wi-Fi 6 (802.11ax)", "9.6 Gbps", "2.4 & 5GHz", "Crowded environments, smart homes"],
                    ["Wi-Fi 6E", "9.6 Gbps+", "2.4, 5 & 6GHz", "Low latency, fast devices close to router"],
                    ["Wi-Fi 7 (802.11be)", "46 Gbps", "2.4, 5 & 6GHz", "Future-proof, multi-link operation"],
                  ].map(([std, speed, freq, use], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{std}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{speed}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{freq}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">The real-world benefit of upgrading from Wi-Fi 5 to Wi-Fi 6 is mostly felt in homes with 10+ connected devices. For most households, Wi-Fi 5 is still fine.</p>
          </div>
        ),
      },
      {
        q: "What is a WiFi extender and when do I actually need one?",
        keywords: "wifi extender repeater booster range dead zone weak signal coverage whole home mesh powerline",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>A WiFi extender (also called a repeater or range extender) picks up your existing WiFi signal and rebroadcasts it, extending coverage into areas your router can't reach.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-gray-800 text-xs mb-2">WiFi Extender / Repeater</p>
                <ul className="text-xs space-y-1 text-gray-600">
                  {["Cheapest option ($20–$60)", "Plugs into wall outlet", "Extends signal into dead zones", "Usually creates a second network name", "Speed drops 30–50% (it's relaying, not routing)"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-green-950/10 border border-green-900/20 rounded-lg p-3">
                <p className="font-bold text-green-800 text-xs mb-2">Mesh System (Recommended)</p>
                <ul className="text-xs space-y-1 text-gray-600">
                  {["Multiple nodes work as one network", "Seamless roaming — same network name throughout", "No speed penalty between nodes", "Best for homes over 1,500 sq ft", "Examples: Eero, Google Nest, TP-Link Deco ($100–$250)"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500">✔</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="font-bold text-green-800 text-xs mb-2">Powerline Adapter</p>
                <ul className="text-xs space-y-1 text-gray-600">
                  {["Sends internet through your electrical wiring", "No WiFi signal issues — wired connection", "Great for distant rooms or basements", "Requires two adapters (one near router, one at device)", "Speed depends on wiring quality (~100–500 Mbps)"].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-600">•</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="font-semibold text-gray-700">Signs you need a WiFi extender or mesh:</p>
            <ul className="space-y-1 text-sm pl-1">
              {["Signal drops to 1–2 bars in certain rooms", "Video calls keep cutting out in specific areas", "Devices disconnect when you walk to another floor or room", "You have a home over 1,500 sq ft and a single router"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-gray-400">•</span>{x}</li>)}
            </ul>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Recommendation: Skip cheap extenders and go straight to a 2-node mesh system. The seamless roaming and zero speed penalty are worth the extra $50–$80.</p>
          </div>
        ),
      },
      {
        q: "What is the difference between a router, a modem, and a gateway?",
        keywords: "router modem gateway difference what does a router do isp cable box internet box combo",
        a: (
          <div className="space-y-3 text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Device</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">What it does</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Who provides it</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Modem", "Converts your ISP's signal (cable, fiber, DSL) into a network signal your home can use", "Usually rented from your ISP (Xfinity, Verizon, Spectrum)"],
                    ["Router", "Distributes the internet from your modem to all devices via WiFi or Ethernet", "You buy this yourself — or use what your ISP provides"],
                    ["Gateway (Combo)", "Modem and router combined into one box — most ISPs provide these by default", "Your ISP provides this — you pay a monthly rental fee"],
                  ].map(([dev, does, who], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-2 px-3 border border-gray-200 font-bold text-gray-800">{dev}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-600">{does}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-500">{who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm space-y-2">
              <p className="font-semibold text-gray-800">Should you buy your own router?</p>
              <p className="text-gray-600">Most ISP-provided gateways are mediocre. Buying your own router ($80–$150) typically gives you better WiFi range, faster speeds, and better security features — and eliminates the $10–$15/month rental fee your ISP charges.</p>
              <p className="font-semibold text-gray-800 mt-2">Good standalone routers in 2025:</p>
              <ul className="space-y-0.5 text-sm text-gray-600">
                {["TP-Link Archer AX55 (~$80) — best budget WiFi 6 router", "ASUS RT-AX88U (~$200) — excellent for larger homes", "Eero 6+ (~$130 for 3-node mesh) — best for whole-home coverage"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✔</span>{x}</li>)}
              </ul>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If your ISP provides a combo gateway and you want to use your own router, you'll need to put the gateway in "bridge mode" to avoid double-NAT issues. Sonoaac can help with this setup.</p>
          </div>
        ),
      },
      {
        q: "2.4 GHz vs 5 GHz WiFi — which band should I connect to?",
        keywords: "2.4 ghz 5 ghz band frequency which is better range speed wifi band select choose",
        a: (
          <div className="space-y-3 text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Band</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Range</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Speed</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2.4 GHz", "Long range, penetrates walls better", "Slower (up to 600 Mbps)", "Smart home devices, devices far from router"],
                    ["5 GHz", "Shorter range, blocked more by walls", "Much faster (up to 3.5 Gbps)", "Laptops, phones, streaming — when close to router"],
                    ["6 GHz (Wi-Fi 6E)", "Shortest range, barely penetrates walls", "Fastest (up to 9.6 Gbps)", "High-speed devices in the same room as router"],
                  ].map(([band, range, speed, use], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-2 px-3 border border-gray-200 font-bold text-gray-800">{band}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-600">{range}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-600">{speed}</td>
                      <td className="py-2 px-3 border border-gray-200 text-green-700">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-semibold text-gray-800">Simple rule:</p>
            <ul className="space-y-1 text-sm pl-1">
              {["In the same room as your router: use 5 GHz", "In a far room or through multiple walls: use 2.4 GHz", "Smart plugs, cameras, and IoT devices: always 2.4 GHz (they don't support 5 GHz)", "Most modern routers merge both bands under one name and auto-select — you don't have to choose manually"].map((x, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✔</span>{x}</li>)}
            </ul>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If your router shows separate network names like "HomeNetwork" and "HomeNetwork_5G", connect your phone and laptop to the 5GHz version whenever you're nearby for significantly faster speeds.</p>
          </div>
        ),
      },
      {
        q: "How do I add WiFi to a desktop PC that doesn't have it?",
        keywords: "desktop pc wifi wireless no wifi how to add usb wifi adapter pcie card dongle ethernet",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>Most desktops don't have built-in WiFi. You have three options:</p>
            <div className="space-y-3">
              {[
                {
                  title: "USB WiFi Adapter (~$15–$40)",
                  pros: "Plug-and-play, no opening the case, works on any desktop",
                  cons: "Slower than PCIe cards, can be blocked by other USB devices or desk positioning",
                  rec: "Best for renters or those who move computers frequently",
                },
                {
                  title: "PCIe WiFi Card (~$30–$80)",
                  pros: "Fastest WiFi option for desktops, includes external antennas for better signal, supports WiFi 6/6E",
                  cons: "Requires opening the desktop case and an available PCIe slot",
                  rec: "Best for permanent setups — perform closest to a laptop's built-in WiFi",
                },
                {
                  title: "Ethernet Cable (Best Option)",
                  pros: "No WiFi interference, fastest possible speeds, most reliable — zero drops",
                  cons: "Requires running a cable from your router to the desktop",
                  rec: "Always the best choice for a stationary desktop if cable routing is possible",
                },
              ].map((opt, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3">
                  <p className="font-bold text-gray-800 text-sm mb-1">{opt.title}</p>
                  <p className="text-xs text-green-700 mb-0.5"><span className="font-semibold">Pro:</span> {opt.pros}</p>
                  <p className="text-xs text-red-600 mb-0.5"><span className="font-semibold">Con:</span> {opt.cons}</p>
                  <p className="text-xs text-gray-500 italic">{opt.rec}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Sonoaac can install a PCIe WiFi card or USB adapter, install drivers, and configure your network connection on-site or remotely.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "displays",
    label: "Monitors & Displays",
    icon: "🖥️",
    items: [
      {
        q: "What monitor specs actually matter?",
        a: (
          <div className="space-y-4 text-sm text-gray-600">
            {/* Resolution visual */}
            <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", padding: "16px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "#aaa", marginBottom: "14px" }}>
                Resolution — same screen size, more pixels = sharper
              </p>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-end", justifyContent: "center", flexWrap: "wrap" }}>
                {([
                  { label: "1080p", sub: "1920×1080", cols: 5, rows: 3, note: "Standard" },
                  { label: "1440p", sub: "2560×1440", cols: 8, rows: 5, note: "Recommended" },
                  { label: "4K", sub: "3840×2160", cols: 12, rows: 7, note: "Ultra sharp" },
                ] as { label: string; sub: string; cols: number; rows: number; note: string }[]).map(({ label, sub, cols, rows, note }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <svg width="88" height="56" viewBox="0 0 88 56" style={{ display: "block" }}>
                      {/* monitor bezel */}
                      <rect x="1" y="1" width="86" height="50" rx="2" fill="#fff" stroke="#333" strokeWidth="2"/>
                      {/* screen area */}
                      <rect x="4" y="4" width="80" height="44" fill="#f0f4ff"/>
                      {/* pixel grid */}
                      {Array.from({ length: cols - 1 }).map((_, i) => (
                        <line key={`v${i}`} x1={4 + (80 / cols) * (i + 1)} y1="4" x2={4 + (80 / cols) * (i + 1)} y2="48" stroke="#c8d0e8" strokeWidth="0.6"/>
                      ))}
                      {Array.from({ length: rows - 1 }).map((_, i) => (
                        <line key={`h${i}`} x1="4" y1={4 + (44 / rows) * (i + 1)} x2="84" y2={4 + (44 / rows) * (i + 1)} stroke="#c8d0e8" strokeWidth="0.6"/>
                      ))}
                      {/* stand */}
                      <rect x="39" y="51" width="10" height="4" fill="#999"/>
                      <rect x="32" y="55" width="24" height="1.5" fill="#888"/>
                    </svg>
                    <p style={{ fontSize: "0.72rem", fontWeight: 900, color: "#222", letterSpacing: "0.05em" }}>{label}</p>
                    <p style={{ fontSize: "0.58rem", color: "#999" }}>{sub}</p>
                    <p style={{ fontSize: "0.58rem", fontWeight: 700, color: label === "1440p" ? "#1976d2" : "#aaa", textTransform: "uppercase", letterSpacing: "0.1em" }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel type visual */}
            <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", padding: "16px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "#aaa", marginBottom: "12px" }}>
                Panel types — pick the right trade-off
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {([
                  {
                    name: "IPS",
                    tag: "Color & Angles",
                    best: "Designers, everyday use",
                    bg: "#e8f4fd",
                    border: "#90caf9",
                    accent: "#1565c0",
                    arc: 160,
                    arcColor: "#42a5f5",
                  },
                  {
                    name: "VA",
                    tag: "Deep Contrast",
                    best: "Movies, dark rooms",
                    bg: "#f3e5f5",
                    border: "#ce93d8",
                    accent: "#6a1b9a",
                    arc: 100,
                    arcColor: "#ab47bc",
                  },
                  {
                    name: "TN",
                    tag: "Speed",
                    best: "Competitive gaming",
                    bg: "#e8f5e9",
                    border: "#a5d6a7",
                    accent: "#1b5e20",
                    arc: 60,
                    arcColor: "#66bb6a",
                  },
                ] as { name: string; tag: string; best: string; bg: string; border: string; accent: string; arc: number; arcColor: string }[]).map(({ name, tag, best, bg, border, accent, arc, arcColor }) => (
                  <div key={name} style={{ background: bg, border: `1px solid ${border}`, padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    {/* Viewing angle arc diagram */}
                    <svg width="60" height="36" viewBox="0 0 60 36">
                      {/* Monitor outline */}
                      <rect x="22" y="2" width="16" height="10" rx="1" fill="#fff" stroke={accent} strokeWidth="1.5"/>
                      <rect x="28" y="12" width="4" height="3" fill={accent} opacity="0.5"/>
                      {/* Viewing angle arc */}
                      {(() => {
                        const rad = (arc / 2) * (Math.PI / 180);
                        const cx = 30, cy = 14, r = 18;
                        const x1 = cx - Math.sin(rad) * r;
                        const y1 = cy + Math.cos(rad) * r;
                        const x2 = cx + Math.sin(rad) * r;
                        const y2 = cy + Math.cos(rad) * r;
                        const large = arc > 180 ? 1 : 0;
                        return (
                          <path
                            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                            fill={arcColor}
                            opacity="0.25"
                          />
                        );
                      })()}
                      {/* Center line */}
                      <line x1="30" y1="14" x2="30" y2="34" stroke={arcColor} strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
                    </svg>
                    <p style={{ fontSize: "0.72rem", fontWeight: 900, color: accent, letterSpacing: "0.08em" }}>{name}</p>
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{tag}</p>
                    <p style={{ fontSize: "0.58rem", color: "#555", textAlign: "center", lineHeight: 1.35 }}>{best}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Refresh rate visual */}
            <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", padding: "16px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "#aaa", marginBottom: "12px" }}>
                Refresh rate — frames per second
              </p>
              <div style={{ position: "relative", paddingBottom: "28px" }}>
                <div style={{ height: "10px", background: "linear-gradient(to right, #d0d0d0 0%, #888 40%, #333 70%, #000 100%)", borderRadius: "5px" }} />
                {([
                  { hz: "60Hz", pct: "0%", label: "Everyday", offset: "-4px" },
                  { hz: "144Hz", pct: "43%", label: "Gaming", offset: "-22px" },
                  { hz: "240Hz", pct: "73%", label: "Competitive", offset: "-28px" },
                  { hz: "360Hz+", pct: "97%", label: "Pro", offset: "-26px" },
                ] as { hz: string; pct: string; label: string; offset: string }[]).map(({ hz, pct, label, offset }) => (
                  <div key={hz} style={{ position: "absolute", top: "14px", left: pct, transform: `translateX(${offset})`, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <div style={{ width: "1px", height: "6px", background: "#999" }} />
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>{hz}</p>
                    <p style={{ fontSize: "0.55rem", color: "#999", whiteSpace: "nowrap" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Spec</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">What it means</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Resolution", "Pixel count — more = sharper", "1440p (2K) or 4K for 27\"+"],
                    ["Refresh rate", "How many frames per second", "60Hz normal, 144Hz+ for gaming"],
                    ["Panel type", "Color accuracy and angles", "IPS for color, VA for contrast, TN for speed"],
                    ["Response time", "How fast pixels change", "1–5ms for gaming, 8ms+ is fine for work"],
                    ["Brightness (nits)", "How bright the screen can get", "300+ for normal rooms, 400+ near windows"],
                    ["Color gamut", "Range of colors displayed", "sRGB 99% for photo/video work"],
                  ].map(([spec, meaning, rec], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{spec}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{meaning}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-green-700">{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        q: "How many monitors can my computer support?",
        a: (
          <div className="space-y-4 text-sm text-gray-600">
            <p>The number of monitors depends on your GPU's output ports and your connection method.</p>

            {/* Multi-monitor layout diagram */}
            <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", padding: "16px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "#aaa", marginBottom: "14px" }}>
                Example setups
              </p>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-end", justifyContent: "center", flexWrap: "wrap" }}>
                {([
                  { count: 1, label: "Laptop", sublabel: "1 external", color: "#e3f2fd", border: "#90caf9" },
                  { count: 2, label: "Laptop + Dock", sublabel: "2–4 displays", color: "#e8f5e9", border: "#a5d6a7" },
                  { count: 4, label: "Desktop GPU", sublabel: "3–6 displays", color: "#fff3e0", border: "#ffcc80" },
                ] as { count: number; label: string; sublabel: string; color: string; border: string }[]).map(({ count, label, sublabel, color, border }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    {/* Monitor icons in a row */}
                    <div style={{ display: "flex", gap: "4px", alignItems: "flex-end" }}>
                      {Array.from({ length: count }).map((_, i) => (
                        <svg key={i} width={count > 2 ? 28 : 40} height={count > 2 ? 22 : 30} viewBox="0 0 40 30" style={{ display: "block" }}>
                          <rect x="1" y="1" width="38" height="24" rx="2" fill={color} stroke={border} strokeWidth="2"/>
                          <rect x="4" y="4" width="32" height="18" fill="#fff" opacity="0.7"/>
                          <rect x="17" y="25" width="6" height="3" fill={border}/>
                          <rect x="12" y="28" width="16" height="1.5" fill={border} opacity="0.7"/>
                        </svg>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 900, color: "#333" }}>{label}</p>
                    <p style={{ fontSize: "0.58rem", color: "#888" }}>{sublabel}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Setup</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Max monitors</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Most laptops (native ports)", "1–2 external displays"],
                    ["Laptop + USB-C dock", "2–4 displays depending on dock"],
                    ["Desktop with integrated GPU", "2–3 displays"],
                    ["Desktop with mid-range dedicated GPU", "3–4 displays"],
                    ["Desktop with high-end GPU", "4–6 displays"],
                    ["MacBook base M-series", "1 external monitor (limitation of base chip)"],
                    ["MacBook M-series Pro/Max", "2–5 external monitors"],
                  ].map(([setup, count], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-700">{setup}</td>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-green-700">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "microsoft365",
    label: "Microsoft 365",
    icon: "📧",
    items: [
      {
        q: "What is Microsoft 365 and do I actually need it?",
        keywords: "microsoft 365 office subscription word excel outlook teams onedrive is it worth it what is office",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>Microsoft 365 (formerly called Office 365) is a subscription that gives you the full Microsoft Office suite plus cloud services — all continuously updated. Here's exactly what you get:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-950/10 border border-green-900/20 rounded-lg p-3">
                <p className="font-bold text-green-800 text-sm mb-2">Apps Included</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {[
                    "Word — documents, reports, resumes",
                    "Excel — spreadsheets, budgets, data",
                    "PowerPoint — presentations",
                    "Outlook — email and calendar",
                    "Teams — video calls and chat",
                    "OneDrive — 1TB cloud storage",
                    "OneNote — notes and organization",
                    "Publisher / Access (PC only)",
                  ].map((x, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✔</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-gray-800 text-sm mb-2">Plans & Pricing (2025)</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    ["Personal", "$6.99/mo", "1 person, up to 5 devices"],
                    ["Family", "$9.99/mo", "Up to 6 people"],
                    ["Business Basic", "$6/user/mo", "Web versions only, Teams, OneDrive"],
                    ["Business Standard", "$12.50/user/mo", "Full desktop apps + Teams + SharePoint"],
                    ["Business Premium", "$22/user/mo", "Adds advanced security and device management"],
                  ].map(([plan, price, desc], i) => (
                    <li key={i} className="border-b border-gray-100 pb-1 last:border-0">
                      <span className="font-semibold text-gray-800">{plan}</span>{" "}
                      <span className="text-green-700 font-bold">{price}</span>{" — "}
                      <span className="text-gray-500 text-xs">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-sm">
              <p className="font-bold text-yellow-800 mb-1">Subscription vs. buying Office once — which is better?</p>
              <ul className="space-y-1 text-gray-700">
                {[
                  "One-time Office purchase ($150) gives you permanent licenses but no updates — you're stuck on that version forever",
                  "Microsoft 365 at $6.99/month = $83.88/year — you always have the newest version, cloud sync, and mobile apps",
                  "After 2 years, the subscription has cost the same as buying — but you're always current and have OneDrive 1TB included",
                  "For businesses: Microsoft 365 Business Basic/Standard is the standard — it includes Teams, SharePoint, and compliance tools you can't get with one-time Office",
                ].map((x, i) => <li key={i} className="flex gap-2"><span className="text-yellow-600">•</span>{x}</li>)}
              </ul>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Sonoaac can set up your Microsoft 365 account, migrate your email, configure Outlook, and set up OneDrive sync on all your devices.</p>
          </div>
        ),
      },
      {
        q: "Microsoft 365 vs Google Workspace — which should my business use?",
        keywords: "microsoft 365 google workspace gsuite comparison business email office google docs sheets which is better",
        a: (
          <div className="space-y-3 text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Factor</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Microsoft 365</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Google Workspace</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Email", "Outlook (full-featured client)", "Gmail (web-first, simple)"],
                    ["Documents", "Word — richest formatting, industry standard", "Google Docs — simpler, real-time collab"],
                    ["Spreadsheets", "Excel — most powerful, complex formulas", "Google Sheets — good for shared budgets"],
                    ["Video calls", "Teams — deep integration with Office", "Google Meet — simple, browser-based"],
                    ["Storage", "OneDrive 1TB per user", "Google Drive 30GB (pooled)"],
                    ["Offline access", "Full desktop apps work offline", "Limited offline — needs internet mostly"],
                    ["Price", "From $6/user/month", "From $6/user/month"],
                    ["Best for", "Businesses using Windows, Excel-heavy work, VPN, compliance needs", "Startups, remote teams, companies living in the browser"],
                  ].map(([factor, ms, google], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-2 px-3 border border-gray-200 font-semibold text-gray-700">{factor}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-600">{ms}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-600">{google}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">If your clients send you Word or Excel files, Microsoft 365 preserves formatting perfectly. Google Docs sometimes shifts formatting on import. For heavy Excel users, there is no substitute for desktop Excel.</p>
          </div>
        ),
      },
      {
        q: "What are the minimum specs to run Microsoft 365 and Teams smoothly?",
        keywords: "microsoft 365 teams minimum specs requirements computer specs ram cpu outlook word excel zoom teams",
        a: (
          <div className="space-y-3 text-gray-600">
            <p>Microsoft 365 apps are more resource-hungry than most people expect — especially when Teams, Outlook, OneDrive, and Chrome all run simultaneously.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Component</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Minimum</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Recommended</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["RAM", "8GB", "16GB", "Teams + Outlook + Chrome + OneDrive typically uses 8–14GB combined"],
                    ["Processor", "Intel Core i3 / Ryzen 3", "Intel Core i5/i7 or Ryzen 5/7", "Teams video calls and background blur require real CPU headroom"],
                    ["Storage", "128GB SSD", "512GB SSD", "Office installs, Outlook cache, and OneDrive sync use 50–100GB"],
                    ["Display", "Any 1080p", "1080p or 1440p, 13–15 inch", "Larger screens let you see Excel sheets and Teams without constant scrolling"],
                    ["Internet", "5 Mbps up/down", "20+ Mbps symmetric", "Teams HD video calls need 4–5 Mbps upload per participant"],
                  ].map(([comp, min, rec, why], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-2 px-3 border border-gray-200 font-bold text-gray-700">{comp}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-500">{min}</td>
                      <td className="py-2 px-3 border border-gray-200 text-green-700 font-semibold">{rec}</td>
                      <td className="py-2 px-3 border border-gray-200 text-gray-500 text-xs">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Sonoaac installs and configures Microsoft 365 on your devices, migrates email, sets up shared mailboxes, and configures Teams — remote or on-site.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "cpu-gpu",
    label: "CPU & GPU",
    icon: "🔧",
    items: [
      {
        q: "What is the best CPU and GPU combination for gaming in 2025?",
        keywords: "cpu gpu combo combination gaming best budget 1080p 1440p 4k rtx amd nvidia ryzen intel",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>Pairing the right CPU and GPU prevents bottlenecks. Here are the best combos by budget:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Budget</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">CPU</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">GPU</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["~$500", "AMD Ryzen 5 7600", "NVIDIA RTX 4060", "1080p 144Hz gaming"],
                    ["~$800", "Intel Core i5-14600K", "NVIDIA RTX 4070", "1440p 144Hz gaming"],
                    ["~$1,200", "AMD Ryzen 7 7800X3D", "NVIDIA RTX 4070 Ti Super", "1440p–4K high fps"],
                    ["~$2,400+", "Intel Core i9-14900K", "NVIDIA RTX 4090", "4K 144Hz, max settings"],
                    ["AMD Build ~$1,100", "AMD Ryzen 7 7700X", "AMD RX 7900 GRE", "Strong 1440p–4K alternative"],
                  ].map(([budget, cpu, gpu, target], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-semibold text-green-700">{budget}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-700">{cpu}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-700">{gpu}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-500">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">The Ryzen 7 7800X3D's 3D V-Cache makes it the best gaming CPU pound-for-pound — it outperforms the i9-14900K in most games at a lower cost.</p>
          </div>
        ),
      },
      {
        q: "Best CPU × GPU combo for video editing and creative work?",
        keywords: "cpu gpu video editing creative premiere davinci resolve final cut pro best combo rendering",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p>Video editing uses both the CPU (timeline scrubbing, exports) and GPU (effects, acceleration). Best combos depend on your software:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Software</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Best CPU</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Best GPU</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Adobe Premiere Pro", "Intel Core i9-14900K", "NVIDIA RTX 4080", "CUDA acceleration + AI features"],
                    ["DaVinci Resolve", "AMD Ryzen 9 7950X", "AMD RX 7900 XTX", "OpenCL + fast CPU for noise reduction"],
                    ["Final Cut Pro", "Apple M3 Max / M4 Max", "Built-in Apple GPU", "Natively optimized — fastest exports"],
                    ["Budget edit setup", "Intel Core i7-13700K", "NVIDIA RTX 4060 Ti", "Solid 1080p–4K editing under $1,100"],
                  ].map(([sw, cpu, gpu, why], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{sw}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{cpu}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{gpu}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-500 text-xs">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">For Final Cut Pro users: always go Apple Silicon. An M3 Pro MacBook Pro exports 4K video faster than most $3,000 Windows PCs for that specific workflow.</p>
          </div>
        ),
      },
      {
        q: "What is an NPU and do I need one?",
        keywords: "npu neural processing unit ai chip qualcomm snapdragon apple intel amd copilot copilot plus",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong className="text-gray-800">NPU</strong> = <strong className="text-gray-800">Neural Processing Unit</strong> — a dedicated chip built for AI and machine learning tasks. Unlike the CPU (general-purpose) or GPU (parallel graphics), the NPU handles AI inference at high speed with very low power draw.</p>
            <div className="space-y-2">
              <p className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Where you'll find NPUs in 2025:</p>
              <ul className="space-y-2 text-xs">
                {[
                  ["Apple Silicon (M1–M4)", "16–38 TOPS Neural Engine. Powers Face ID, photo cleanup, Siri, on-device AI in Photos and other apps."],
                  ["Qualcomm Snapdragon X Elite", "Hexagon NPU — 45 TOPS. Used in Windows Copilot+ PCs: Dell XPS 13, Surface Pro 11, Lenovo X1."],
                  ["Intel Lunar Lake (Core Ultra 200V)", "Intel NPU 4 — ~48 TOPS. Powers Windows Studio Effects, live captions, and AI features in apps."],
                  ["AMD Ryzen AI (Strix Point)", "XDNA2 NPU — up to 50 TOPS. Featured in Asus ROG, Lenovo Yoga Pro, HP EliteBook."],
                ].map(([chip, desc], i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500 font-bold shrink-0 mt-0.5">→</span>
                    <span><span className="font-medium text-gray-700">{chip}:</span> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-xs">
              <p className="font-semibold text-gray-700 mb-1.5">What NPUs actually do today:</p>
              {[
                "Real-time background blur and noise cancellation in video calls (no cloud required)",
                "AI-powered photo editing — object removal, enhance detail, denoise — processed locally",
                "Windows Studio Effects: auto eye contact correction, auto-framing, voice focus",
                "On-device voice transcription and live captions without sending audio to the cloud",
                "Faster AI in apps like Photoshop, Lightroom, and DaVinci Resolve",
              ].map((x, i) => (
                <p key={i} className="flex gap-1.5"><span className="text-green-500">✓</span>{x}</p>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-2">Do you need one? If buying in 2025, most new chips already include an NPU — you get the benefits automatically. It won't affect gaming or general day-to-day performance either way.</p>
          </div>
        ),
      },
      {
        q: "AMD vs Intel: which CPU should I choose for a desktop build?",
        keywords: "amd intel cpu which better ryzen vs core processor comparison desktop build gaming work",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Factor</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">AMD Ryzen</th>
                    <th className="text-left py-2 px-3 border border-gray-200 font-semibold">Intel Core</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Gaming (2025)", "Best — Ryzen 7 7800X3D dominates with 3D V-Cache", "Very close — i9-14900K competes at 1080p"],
                    ["Multitasking / workloads", "Ryzen 9 7950X has more cores for rendering and encoding", "i9-14900K hybrid architecture handles mixed loads well"],
                    ["Power efficiency", "Better — Ryzen 7600 / 7700X run cooler and use less power", "Higher power draw on K-series CPUs at stock speeds"],
                    ["Platform cost", "AM5 socket — pricier motherboards, long upgrade path", "LGA1700 — wide range of boards, cheaper entry point"],
                    ["Price per performance", "Usually better at mid-range ($200–$350 CPUs)", "Competitive at high end; older gen i5/i7 still capable"],
                    ["AI / NPU", "Ryzen AI (Strix) — NPU in newer laptops, not desktop yet", "Intel Core Ultra (Meteor Lake, Lunar Lake) include NPU"],
                  ].map(([factor, amd, intel], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium text-gray-700">{factor}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{amd}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-gray-600">{intel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-2">Verdict: Pure gaming → Ryzen 7 7800X3D. Content creation mixed workloads → either i9-14900K or Ryzen 9 7950X. Budget builds → Ryzen 5 7600 gives better value than similarly-priced Intel options.</p>
          </div>
        ),
      },
      {
        q: "Integrated vs dedicated GPU: what's the difference and which do I need?",
        a: (
          <div className="space-y-3 text-sm text-gray-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Integrated GPU</p>
                <ul className="space-y-1 text-xs">
                  {[
                    "Built into the CPU — shares system RAM",
                    "Low power — great for battery life",
                    "Handles: web browsing, Office, video streaming, light photo editing",
                    "Cannot run demanding games or 3D rendering",
                    "Examples: Intel Iris Xe, Apple M4 GPU, AMD Radeon 780M",
                  ].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span>{x}</li>)}
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <p className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Dedicated GPU</p>
                <ul className="space-y-1 text-xs">
                  {[
                    "Separate chip with its own VRAM (4GB–24GB)",
                    "Higher power draw — reduces battery life",
                    "Handles: gaming, 3D modeling, video editing, AI rendering",
                    "Significantly more performance for visual workloads",
                    "Examples: NVIDIA RTX 4060–4090, AMD RX 7600–7900 XTX",
                  ].map((x, i) => <li key={i} className="flex gap-1.5"><span className="text-green-600">•</span>{x}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-2">If you browse, stream, use Office, and do video calls — integrated is fine and you get much better battery life. If you game, edit video, do 3D work, or run local AI tools — you need a dedicated GPU.</p>
          </div>
        ),
      },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ProductCard({
  product,
  selected,
  onSelect,
  disabled,
}: {
  product: CompareProduct;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled && !selected}
      className={`w-full text-left border-2 rounded-xl p-3 transition-all ${
        selected
          ? "border-green-500 bg-green-50 shadow-md shadow-green-100"
          : disabled
          ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
          : "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
      }`}
    >
      <div className="relative w-full h-28 mb-2 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const next = t.nextElementSibling as HTMLElement | null;
            if (next) next.style.display = "flex";
          }}
        />
        <div
          className="hidden absolute inset-0 items-center justify-center bg-gray-100 text-gray-400 text-xs font-medium"
        >
          {product.brand} {product.name}
        </div>
        {selected && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
              <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 font-medium">{product.brand}</p>
      <p className="text-sm font-bold text-gray-800 leading-tight">{product.name}</p>
      <p className="text-xs text-gray-500 mt-0.5">{product.tagline}</p>
      <p className="text-sm font-bold text-green-600 mt-1">{product.price}</p>
    </button>
  );
}

function ComparisonTable({
  left,
  right,
  specsOrder,
}: {
  left: CompareProduct;
  right: CompareProduct;
  specsOrder: string[];
}) {
  const leftMap = Object.fromEntries(left.specs.map((s) => [s.key, s]));
  const rightMap = Object.fromEntries(right.specs.map((s) => [s.key, s]));

  return (
    <div className="mt-6 space-y-4">
      {/* Header with photos */}
      <div className="grid grid-cols-[1fr_120px_1fr] gap-2 items-end">
        <div className="text-center">
          <div className="h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-2">
            <img
              src={left.image}
              alt={left.name}
              className="h-full w-full object-contain p-3"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "flex";
              }}
            />
            <div className="hidden h-full w-full items-center justify-center text-xs text-gray-400">{left.name}</div>
          </div>
          <p className="text-xs text-gray-400">{left.brand}</p>
          <p className="text-sm font-bold text-gray-800">{left.name}</p>
          <p className="text-sm font-bold text-green-600">{left.price}</p>
        </div>
        <div className="text-center pb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">vs</span>
        </div>
        <div className="text-center">
          <div className="h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-2">
            <img
              src={right.image}
              alt={right.name}
              className="h-full w-full object-contain p-3"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "flex";
              }}
            />
            <div className="hidden h-full w-full items-center justify-center text-xs text-gray-400">{right.name}</div>
          </div>
          <p className="text-xs text-gray-400">{right.brand}</p>
          <p className="text-sm font-bold text-gray-800">{right.name}</p>
          <p className="text-sm font-bold text-green-600">{right.price}</p>
        </div>
      </div>

      {/* Spec rows */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {specsOrder.map((key, i) => {
          const ls = leftMap[key];
          const rs = rightMap[key];
          if (!ls && !rs) return null;
          const winner = ls && rs && ls.betterIs
            ? compareVals(ls.value, rs.value, ls.betterIs)
            : "na";

          return (
            <div
              key={key}
              className={`grid grid-cols-[1fr_100px_1fr] gap-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
            >
              <div
                className={`px-3 py-2.5 text-xs text-right leading-snug ${
                  winner === "left"
                    ? "font-semibold text-green-700 bg-green-50/60"
                    : "text-gray-600"
                }`}
              >
                {ls?.value ?? "—"}
              </div>
              <div className="px-2 py-2.5 text-center text-xs text-gray-400 font-medium border-x border-gray-100">
                {ls?.label ?? rs?.label}
              </div>
              <div
                className={`px-3 py-2.5 text-xs leading-snug ${
                  winner === "right"
                    ? "font-semibold text-green-700 bg-green-50/60"
                    : "text-gray-600"
                }`}
              >
                {rs?.value ?? "—"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pros / cons */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { product: left, side: "left" },
          { product: right, side: "right" },
        ].map(({ product }) => (
          <div key={product.id} className="space-y-2">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">{product.name}</p>
            <div>
              <p className="text-xs font-semibold text-green-700 mb-1">Pros</p>
              <ul className="space-y-0.5">
                {product.pros.map((p, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                    <CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-600 mb-1">Cons</p>
              <ul className="space-y-0.5">
                {product.cons.map((c, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                    <XCircle size={11} className="text-red-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-2">
              <p className="text-xs text-green-700">
                <span className="font-semibold">Best for:</span> {product.bestFor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {section.items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-base font-bold text-gray-900 pr-4">{item.q}</span>
            <ChevronDown
              size={16}
              className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-100">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Search Result Item ────────────────────────────────────────────────────────

function SearchResultItem({
  item,
}: {
  item: FAQItem & { sectionLabel: string; sectionIcon: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between px-4 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors gap-3"
      >
        <div className="min-w-0">
          <span className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <span>{item.sectionIcon}</span>
            {item.sectionLabel}
          </span>
          <span className="text-base font-bold text-gray-900 block">{item.q}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-100">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function KnowledgeBase() {
  const [activeCategoryId, setActiveCategoryId] = useState("laptops");
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [activeFAQId, setActiveFAQId] = useState("cpu-gpu");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = COMPARE_CATEGORIES.find((c) => c.id === activeCategoryId)!;
  const specsOrder =
    activeCategoryId === "laptops"
      ? LAPTOP_SPECS_ORDER
      : activeCategoryId === "tablets"
      ? TABLET_SPECS_ORDER
      : PRINTER_SPECS_ORDER;

  const leftProduct = activeCategory.products.find((p) => p.id === selectedLeft) ?? null;
  const rightProduct = activeCategory.products.find((p) => p.id === selectedRight) ?? null;

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleProductSelect = (id: string) => {
    if (selectedLeft === id) {
      setSelectedLeft(null);
    } else if (selectedRight === id) {
      setSelectedRight(null);
    } else if (!selectedLeft) {
      setSelectedLeft(id);
    } else if (!selectedRight) {
      setSelectedRight(id);
    } else {
      // Replace left
      setSelectedLeft(id);
    }
  };

  const activeFAQSection = FAQ_SECTIONS.find((s) => s.id === activeFAQId)!;

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  const searchResults =
    searchQuery.trim().length > 0
      ? FAQ_SECTIONS.flatMap((s) =>
          s.items
            .filter((item) => {
              const term = normalize(searchQuery);
              return (
                normalize(item.q).includes(term) ||
                normalize(item.keywords ?? "").includes(term)
              );
            })
            .map((item) => ({ ...item, sectionLabel: s.label, sectionIcon: s.icon }))
        )
      : [];;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">
              Sonoaac Knowledge Base
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Tech Support Knowledge Base
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Compare real products side by side and get answers to the most common tech questions — laptops, tablets, printers, Wi-Fi, and more.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/contact">
                <button className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm inline-flex items-center gap-2">
                  Book a Consultation
                  <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline px-5 py-2.5 text-sm">
                  Our Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky search bar ── */}
      <div className="sticky top-[64px] md:top-[80px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search — CPU combos, NPU, Wi-Fi, repairs, displays..."
              className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-14">
        {/* ── Compare Tool ──────────────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
            <p className="text-gray-500 text-sm mt-1">
              Select a category, then pick any two products to compare specs side by side.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {COMPARE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategoryId === cat.id
                    ? "bg-green-400 text-black shadow"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-4">
            {activeCategory.description} — Select two to compare.
          </p>

          {/* Product grid */}
          <div className={`grid gap-3 ${activeCategory.products.length <= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
            {activeCategory.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedLeft === product.id || selectedRight === product.id}
                onSelect={() => handleProductSelect(product.id)}
                disabled={
                  selectedLeft !== null &&
                  selectedRight !== null &&
                  selectedLeft !== product.id &&
                  selectedRight !== product.id
                }
              />
            ))}
          </div>

          {/* Selection status */}
          <div className="mt-4 flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${selectedLeft ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
              {selectedLeft ? <CheckCircle size={12} /> : <Minus size={12} />}
              {selectedLeft ? leftProduct?.name : "Select first product"}
            </div>
            <span className="text-gray-300 font-bold">vs</span>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${selectedRight ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
              {selectedRight ? <CheckCircle size={12} /> : <Minus size={12} />}
              {selectedRight ? rightProduct?.name : "Select second product"}
            </div>
            {(selectedLeft || selectedRight) && (
              <button
                onClick={() => { setSelectedLeft(null); setSelectedRight(null); }}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Comparison result */}
          <AnimatePresence>
            {leftProduct && rightProduct && (
              <motion.div
                key={`${leftProduct.id}-${rightProduct.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 mt-4 shadow-sm"
              >
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Comparison</p>
                <ComparisonTable
                  left={leftProduct}
                  right={rightProduct}
                  specsOrder={specsOrder}
                />
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                  <Link href="/contact">
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-xs transition-colors inline-flex items-center gap-1.5">
                      Get Advice on Which to Buy
                      <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── FAQ Knowledge Base ────────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm mt-1">
              Real answers to the most common tech questions our customers ask.
            </p>
          </div>

          {searchQuery.trim() ? (
            <div>
              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-gray-400 text-sm">
                    No results for &ldquo;<span className="text-gray-600 font-medium">{searchQuery}</span>&rdquo;
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Try a different term or browse by category below.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-4">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                  </p>
                  {searchResults.map((item, i) => (
                    <SearchResultItem key={i} item={item} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex gap-2 flex-wrap mb-6">
                {FAQ_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveFAQId(section.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeFAQId === section.id
                        ? "bg-green-400 text-black"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span>{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFAQId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FAQAccordion section={activeFAQSection} />
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* CTA */}
          <div className="mt-8 brand-panel border border-green-900/20 p-6">
            <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Our team can help you choose the right device, fix your current setup, or advise on upgrades — in person or remotely.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <button className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm transition-colors inline-flex items-center gap-2">
                  Book Consultation
                  <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-outline px-5 py-2.5 text-sm">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
