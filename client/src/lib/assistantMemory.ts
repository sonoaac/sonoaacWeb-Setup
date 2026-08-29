import type { ReactNode } from "react";
import { FAQ_SECTIONS } from "@/pages/KnowledgeBase";

/**
 * Assistant memory + retrieval.
 *
 * The Knowledge Base FAQ (`FAQ_SECTIONS`, still exported from the now-unrouted
 * KnowledgeBase page) is the assistant's long-term memory. Each FAQ entry is
 * flattened into a searchable record; `retrieve()` scores a free-text question
 * against every record by keyword / phrase overlap and returns the best matches.
 * Multi-part questions ("school laptop, Intel vs M vs AMD, 8 vs 16 vs 32 GB")
 * surface several records at once.
 *
 * A handful of service records (pricing, booking, trade-in, …) are appended so
 * the assistant also covers things the FAQ doesn't.
 */

export interface MemoryEntry {
  id: string;
  sectionId: string;
  section: string;
  q: string;
  /** Rendered answer: a string (service records) or the FAQ's ReactNode. */
  a: ReactNode;
  /** Curated keyword string, normalized. Weighted higher than body text. */
  kw: string;
  /** Full normalized searchable blob (question + keywords + answer text). */
  text: string;
  cta?: { label: string; href: string };
}

// ── Text helpers ─────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\bwi fi\b/g, "wifi")
    .replace(/\s+/g, " ")
    .trim();
}

/** Recursively pull visible text out of a React node tree. */
function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join(" ");
  const props = (node as { props?: { children?: ReactNode } }).props;
  if (props && props.children != null) return nodeText(props.children);
  return "";
}

// ── Synonyms ─────────────────────────────────────────────────────────────────

const SYNONYMS: Record<string, string[]> = {
  computer: ["laptop", "pc", "desktop", "machine"],
  laptop: ["computer", "notebook", "pc"],
  pc: ["computer", "desktop"],
  desktop: ["computer", "pc", "tower"],
  mac: ["apple", "macos", "macbook"],
  macbook: ["mac", "apple", "macos"],
  apple: ["mac", "macos", "macbook"],
  intel: ["core", "cpu", "processor"],
  amd: ["ryzen", "cpu", "processor"],
  ryzen: ["amd", "cpu", "processor"],
  cpu: ["processor", "chip"],
  processor: ["cpu", "chip"],
  chip: ["cpu", "processor"],
  gpu: ["graphics", "nvidia", "radeon", "geforce"],
  graphics: ["gpu"],
  ram: ["memory", "gb"],
  memory: ["ram", "gb"],
  ssd: ["storage", "drive", "nvme"],
  hdd: ["storage", "drive", "harddrive"],
  storage: ["ssd", "drive"],
  wifi: ["wireless", "network", "router", "internet"],
  router: ["wifi", "modem", "network"],
  modem: ["router", "gateway", "wifi"],
  internet: ["wifi", "network"],
  monitor: ["display", "screen"],
  display: ["monitor", "screen"],
  screen: ["monitor", "display"],
  gaming: ["game", "games", "fps", "gamer"],
  game: ["gaming", "games"],
  school: ["student", "students", "college", "class", "homework", "study"],
  student: ["school", "college"],
  office: ["work", "business", "teams", "outlook"],
  work: ["office", "business"],
  business: ["office", "work", "company"],
  teams: ["office", "microsoft", "365"],
  editing: ["editor", "premiere", "resolve", "creative", "render"],
  npu: ["ai", "neural", "copilot"],
  tablet: ["ipad", "galaxy"],
  ipad: ["tablet", "apple"],
  freezing: ["freeze", "frozen", "slow"],
  freeze: ["freezing", "frozen"],
  slow: ["sluggish", "lag", "laggy", "freezing", "slowdown"],
  buy: ["buying", "purchase", "get", "new"],
  price: ["pricing", "cost", "rates", "quote", "fee"],
  cost: ["price", "pricing"],
  sell: ["selling", "trade", "tradein"],
  trade: ["tradein", "sell", "selling"],
};

/** Phrases that, if present anywhere in the query, add extra tokens. */
const PHRASE_SYNONYMS: Record<string, string[]> = {
  "m chip": ["apple", "silicon", "mseries", "macbook", "mac"],
  "m series": ["apple", "silicon", "macbook", "mac"],
  "apple silicon": ["macbook", "mseries", "mac"],
  "for school": ["student", "college", "homework"],
  "for college": ["student", "school"],
  "video editing": ["premiere", "resolve", "creative", "render", "gpu"],
  "how many monitors": ["monitor", "displays", "multiple"],
  "trade in": ["tradein", "sell"],
  "new computer": ["buying", "laptop", "specs"],
  "new laptop": ["buying", "specs"],
};

const STOP = new Set(
  "the a an of to in on for and or is are do i my me you your it this that with what how much many need vs than then so if can should would could will just about get got have has new want".split(
    " ",
  ),
);

// ── Build memory from the FAQ ────────────────────────────────────────────────

const SECTION_CTA: Record<string, { label: string; href: string }> = {
  "slow-pc": { label: "Get IT Support", href: "/services#software" },
  os: { label: "Get IT Support", href: "/services#software" },
  hardware: { label: "Explore Devices", href: "/my-tech" },
  buying: { label: "Explore Devices", href: "/my-tech" },
  tablets: { label: "Device Setup", href: "/services" },
  networking: { label: "On-Site Services", href: "/services#onsite" },
  displays: { label: "Get IT Support", href: "/services#software" },
  microsoft365: { label: "Business IT", href: "/services#business" },
  "cpu-gpu": { label: "Custom PC Build", href: "/my-tech/build-pc" },
};

const faqEntries: MemoryEntry[] = FAQ_SECTIONS.flatMap((s) =>
  s.items.map((it, i) => {
    const kw = normalize(it.keywords ?? "");
    const body = nodeText(it.a);
    return {
      id: `${s.id}-${i}`,
      sectionId: s.id,
      section: s.label,
      q: it.q,
      a: it.a,
      kw,
      text: normalize(`${it.q} ${it.keywords ?? ""} ${body}`),
      cta: SECTION_CTA[s.id],
    };
  }),
);

// ── Service records (not in the FAQ) ─────────────────────────────────────────

function svc(
  id: string,
  q: string,
  keywords: string,
  a: string,
  cta?: { label: string; href: string },
): MemoryEntry {
  return {
    id,
    sectionId: "services",
    section: "Sonoaac Services",
    q,
    a,
    kw: normalize(keywords),
    text: normalize(`${q} ${keywords} ${a}`),
    cta,
  };
}

const serviceEntries: MemoryEntry[] = [
  svc(
    "svc-overview",
    "What does Sonoaac do?",
    "services offer help what do you do list of services everything remote onsite on site setup repair fix",
    "Sonoaac is an NJ-based IT service for homes and small businesses:\n- Remote support (Zoom, AnyDesk, TeamViewer)\n- On-site home and office visits\n- New device setup and software installs\n- Custom PC builds and part recommendations\n- Business IT, email, and Microsoft 365\n- Web development\n- Device trade-ins for cash",
    { label: "View Services", href: "/services" },
  ),
  svc(
    "svc-pricing",
    "How much do services cost?",
    "price pricing cost how much rates fee quote charge expensive cheap estimate",
    "Every job gets a clear quote before work starts. Common starting prices:\n- Remote virus removal: $49 / session\n- Full PC reset & reinstall: $79\n- On-site setup visit: $99 (first hour)\n- Custom PC build consult: $59\n- Business email (M365): $129\n- Custom website: $499",
    { label: "View Services", href: "/services" },
  ),
  svc(
    "svc-booking",
    "How do I book an appointment?",
    "book booking appointment schedule reschedule consultation set up a time walk in",
    "All services are by appointment (walk-ins cost extra). Book online through the consultation form, or call or text (862) 423-8875. Same-day is often available and we confirm by email.",
    { label: "Book a Consultation", href: "/contact" },
  ),
  svc(
    "svc-remote",
    "How does remote support work?",
    "remote support online screen share anydesk teamviewer zoom remotely connect fix online",
    "We connect securely to your device over the internet with screen sharing. You watch everything in real time and can end the session anytime. Good for M365/email, app errors, slow performance, driver issues, malware scans, and printer setup. No location limit.",
    { label: "Get Remote Support", href: "/services#remote" },
  ),
  svc(
    "svc-rentals",
    "Can I rent electronics instead of buying?",
    "rent rental rentals rent to own renting lease finance financing payment plan installments monthly gaming pc laptop tv monitor console down payment no credit cant afford spread the cost fire tv delivery shipping how long ship install installation setup",
    "Yes — Sonoaac rents TVs on a rent-to-own plan (gaming PCs, laptops, and monitors coming soon):\n- 50% down\n- Then a fixed monthly payment until the balance clears (term depends on the price)\n- After the final payment the device is yours — no balloon fee\n- Optional protection plan at signup (TV plans don't cover screen or accidental damage)\n\nTVs available now:\n- 55\" 4K Fire TV — $350 outright, or $175 down + $25/mo for 7 months\n- 50\" 4K Fire TV — $300 outright, or $150 down + $25/mo for 6 months\n\nDelivery: apply online or call/text (862) 423-8875, and once approved it ships — allow 3–5 business days. Delivery is included (no separate shipping fee) and there's no installation or setup charge; you set it up yourself.",
    { label: "Browse Rentals", href: "/rentals" },
  ),
  svc(
    "svc-trade-in",
    "Can I sell or trade in a device?",
    "trade in tradein sell selling sell my phone laptop iphone cash for buy back how much is my worth value",
    "Yes — bring in an unlocked iPhone, Samsung Galaxy, or iPad and walk out with cash (not store credit). Get an instant estimate by picking your device and condition, we verify it in person, then pay on the spot.",
    { label: "Get a Trade-In Quote", href: "/trade-in" },
  ),
  svc(
    "svc-contact",
    "How do I reach a real person?",
    "contact phone call text number email reach get in touch talk to speak to support",
    "Call or text (862) 423-8875, or send a message through the contact page — a Sonoaac tech replies by email, usually the same day. NJ-based, serving NJ and the tri-state area; remote support anywhere.",
    { label: "Contact Us", href: "/contact" },
  ),
  svc(
    "svc-data-transfer",
    "Can you move my files to a new device?",
    "data transfer move files migrate new computer setup copy files backup lost files recover data photos",
    "Yes. We move files, photos, email, bookmarks, and settings from an old device to a new one (PC, Mac, phone, or tablet), migrate accounts, and set up a backup so it doesn't happen again. Basic recovery from failing drives too.",
    { label: "Device Setup", href: "/services" },
  ),
];

export const MEMORY: MemoryEntry[] = [...faqEntries, ...serviceEntries];

// ── Retrieval ────────────────────────────────────────────────────────────────

export interface Hit {
  entry: MemoryEntry;
  score: number;
}

function tokenize(query: string): { tokens: Set<string>; ordered: string[] } {
  const norm = normalize(query);
  const ordered = norm.split(" ").filter((t) => t && !STOP.has(t) && (t.length > 1 || /^\d+$/.test(t)));
  const tokens = new Set(ordered);
  for (const t of ordered) (SYNONYMS[t] ?? []).forEach((x) => tokens.add(x));
  for (const [phrase, extra] of Object.entries(PHRASE_SYNONYMS)) {
    if (norm.includes(phrase)) extra.forEach((x) => tokens.add(x));
  }
  return { tokens, ordered };
}

export function retrieve(query: string, limit = 3): Hit[] {
  const { tokens, ordered } = tokenize(query);
  if (tokens.size === 0) return [];

  const tokenList = Array.from(tokens);
  const hits: Hit[] = [];
  for (const entry of MEMORY) {
    const title = normalize(entry.q);
    let score = 0;

    for (const tok of tokenList) {
      if (!tok) continue;
      if (title.includes(tok)) score += 3;
      else if (entry.kw && entry.kw.includes(tok)) score += 2;
      else if (entry.text.includes(tok)) score += 1;
    }

    for (let i = 0; i < ordered.length - 1; i++) {
      const bigram = `${ordered[i]} ${ordered[i + 1]}`;
      if (title.includes(bigram)) score += 4;
      else if (entry.kw && entry.kw.includes(bigram)) score += 2;
      else if (entry.text.includes(bigram)) score += 1;
    }

    if (score > 0) hits.push({ entry, score });
  }

  hits.sort((a, b) => b.score - a.score);
  if (hits.length === 0) return [];

  const top = hits[0].score;
  return hits.filter((h) => h.score >= 3 && h.score >= top * 0.4).slice(0, limit);
}

export function bestScore(query: string): number {
  const hits = retrieve(query, 1);
  return hits.length ? hits[0].score : 0;
}
