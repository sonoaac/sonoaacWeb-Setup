import { useState, useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { useSubmitContact } from "@/hooks/use-contact";
import { retrieve, type MemoryEntry } from "@/lib/assistantMemory";

// ── Matching helpers ─────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const YES_RE =
  /^(y|ya|yes|yeah|yep|yup|sure|ok|okay|it did|that did|that helped|helped|worked|fixed|perfect|great|awesome|nice|thanks|thank you|got it|makes sense|all good)\b/;
const NO_RE =
  /^(n|no|nope|nah|not really|not quite|didn t|didnt|does not|doesn t|doesnt|negative|still (not|having|broken|slow|down)|nothing)\b/;

function isEscalationIntent(text: string): boolean {
  const n = normalize(text);
  return (
    /\b(talk|speak|chat) to (a )?(human|person|someone|rep|agent|tech|technician)\b/.test(n) ||
    /\bcontact support\b/.test(n) ||
    /\bcustomer (service|support|care)\b/.test(n) ||
    /\b(real|actual|live) (person|human|agent)\b/.test(n) ||
    /\b(have |get )?someone (call|contact|reach|email|text|help) me\b/.test(n) ||
    /\b(call|contact|reach|email|text) me back\b/.test(n) ||
    /\bget back to me\b/.test(n) ||
    /\bleave (my|a) (details|message|info)\b/.test(n)
  );
}

function smallTalk(text: string): string | null {
  const n = normalize(text);
  if (!n) return null;
  if (
    /^(hi|hey|hello|yo|sup|hiya|howdy|good (morning|afternoon|evening))\b/.test(n) ||
    n === "help" ||
    n === "menu" ||
    n === "what can you do"
  ) {
    return "I can help with things like slow or infected computers, what laptop, tablet, or PC parts to buy (CPU, RAM, SSD, GPU), Wi-Fi and networking, monitors, Microsoft 365, plus pricing, trade-ins, and booking a visit. What's going on?";
  }
  if (/\b(thanks|thank you|thx|ty|appreciate|cheers)\b/.test(n)) {
    return "Anytime. Anything else I can help with?";
  }
  if (/\b(bye|goodbye|see ya|see you|thats all|that s all|cya)\b/.test(n)) {
    return "Take care! If you need us, call or text (862) 423-8875 or use the contact page.";
  }
  return null;
}

// ── Chat model ───────────────────────────────────────────────────────────────

type Mode = "chat" | "awaitingFeedback" | "escalating";
type Flow = { id: "buy"; tries: number };

let msgSeq = 0;
const nextId = () => ++msgSeq;

interface Msg {
  id: number;
  role: "user" | "bot";
  text?: string;
  entry?: MemoryEntry;
  form?: boolean;
}

const userMsg = (text: string): Msg => ({ id: nextId(), role: "user", text });
const botText = (text: string): Msg => ({ id: nextId(), role: "bot", text });
const botEntry = (entry: MemoryEntry): Msg => ({ id: nextId(), role: "bot", entry });
const formMsg = (): Msg => ({ id: nextId(), role: "bot", form: true });

const GREETING = "Hi, I'm the Sonoaac assistant. What can I help with?";
const seedMessages = (): Msg[] => [botText(GREETING)];

const FEEDBACK_Q = "Did that answer it for you?";
const FALLBACK =
  'I’m not totally sure I follow. Try rewording that, or if you’d like a real person to follow up, just say “contact support”.';

// ── Guided "which computer" flow ─────────────────────────────────────────────

type UseCase = "school" | "office" | "gaming" | "creative" | "general";

function isBuyIntent(text: string): boolean {
  const n = normalize(text);
  if (/\bnew (computer|laptop|pc|desktop|macbook|chromebook)\b/.test(n)) return true;
  if (/\b(which|what|best)\b[^.!?]*\b(computer|laptop|pc|macbook|chromebook)\b/.test(n)) return true;
  if (
    /\b(buy|buying|purchase|purchasing|get|getting|need|want|looking for|shopping for|recommend|choose|pick|suggest)\b[^.!?]*\b(computer|laptop|pc|notebook|desktop|macbook|chromebook|machine)\b/.test(
      n,
    )
  )
    return true;
  return false;
}

function detectUseCase(text: string): UseCase | null {
  const n = normalize(text);
  if (/\b(school|student|students|college|university|campus|class|classes|homework|study|studying)\b/.test(n))
    return "school";
  if (
    /\b(video|videos|photo|photos|editing|edit|premiere|photoshop|lightroom|davinci|resolve|final cut|render|rendering|3d|blender|creative|content creation|animation|design)\b/.test(
      n,
    )
  )
    return "creative";
  if (/\b(gaming|game|games|gamer|fps|steam|fortnite|valorant|esports|triple a|aaa)\b/.test(n))
    return "gaming";
  if (/\b(office|work|working|business|teams|outlook|excel|word|spreadsheet|email|corporate|job)\b/.test(n))
    return "office";
  if (/\b(general|home|everyday|basic|browsing|casual|family|simple|light use|web)\b/.test(n))
    return "general";
  return null;
}

const BUY_CLARIFY =
  "Happy to help you pick. What will you mainly use it for — school, office work, gaming, creative work like video or photo, or general home use?";
const BUY_RECLARIFY =
  "No problem — roughly, is it for everyday stuff (browsing, email, docs), heavier work, or gaming and creative work?";

const BUY_ANSWERS: Record<UseCase, { title: string; body: string; cta: { label: string; href: string } }> = {
  school: {
    title: "Picking a laptop for school",
    body: `Prioritize portability, battery, and reliability over raw power:
- CPU: Intel Core i5 or AMD Ryzen 5 — or an Apple M-series MacBook Air
- RAM: 16GB is ideal; 8GB only if the budget is tight
- Storage: 512GB SSD (256GB minimum)
- Screen & battery: 1080p, 10+ hours real-world
- A Chromebook is fine if you only need a browser and Google Docs

Sweet spot is about $500–$800.

Ask me about any piece — RAM, storage, or Windows vs Mac vs Chromebook — and I'll go deeper.`,
    cta: { label: "Explore Devices", href: "/my-tech" },
  },
  office: {
    title: "A laptop for office work",
    body: `For Teams, Outlook, Word, and Excel:
- CPU: Intel Core i5/i7 (11th gen or newer) or AMD Ryzen 5/7
- RAM: 16GB, non-negotiable — Teams + Outlook + Chrome + OneDrive together use 8–14GB
- Storage: 512GB SSD
- OS: Windows 11 Pro if you need domain join, BitLocker, or Remote Desktop

Typical range is $700–$1,100.

Is this light use (mostly email and docs) or heavy (big files, lots of apps at once)? I can tighten the spec.`,
    cta: { label: "Business IT", href: "/services#business" },
  },
  gaming: {
    title: "A machine for gaming",
    body: `Depends on your target resolution and budget:
- ~$500: AMD Ryzen 5 7600 + RTX 4060 — 1080p 144Hz
- ~$800: Intel Core i5-14600K + RTX 4070 — 1440p 144Hz
- ~$1,200: Ryzen 7 7800X3D + RTX 4070 Ti Super — 1440p to 4K
- ~$2,400+: Core i9-14900K + RTX 4090 — 4K, max settings

The Ryzen 7 7800X3D is the best gaming CPU per dollar right now.

Want a desktop build or a gaming laptop, and what resolution are you aiming for?`,
    cta: { label: "Custom PC Build", href: "/my-tech/build-pc" },
  },
  creative: {
    title: "A machine for video and photo work",
    body: `- RAM: 32GB
- GPU: a dedicated card — RTX 4070 or better (NVIDIA for Premiere and CUDA), or AMD RX 7900 for DaVinci Resolve
- CPU: fast multi-core — Intel Core i9 or Ryzen 9
- Storage: 1TB NVMe SSD

On Final Cut Pro, go Apple Silicon (M3/M4 Pro or Max) — it exports 4K faster than most Windows PCs at the same price.

Which app do you use most — Premiere, DaVinci Resolve, Final Cut, or Photoshop/Lightroom?`,
    cta: { label: "Custom PC Build", href: "/my-tech/build-pc" },
  },
  general: {
    title: "A laptop for everyday home use",
    body: `For browsing, email, docs, and video:
- CPU: any Intel Core i3/i5 or AMD Ryzen 3/5 from 2020 or newer
- RAM: 16GB (8GB is fine if it's genuinely light use)
- Storage: 256–512GB SSD — never a spinning HDD

No need to overspend — a $500–$700 laptop handles all of this comfortably.

Want a Windows vs Mac vs Chromebook breakdown for this?`,
    cta: { label: "Explore Devices", href: "/my-tech" },
  },
};

function buyEntry(uc: UseCase): MemoryEntry {
  const a = BUY_ANSWERS[uc];
  return {
    id: `buy-${uc}`,
    sectionId: "services",
    section: "Buying advice",
    q: a.title,
    a: a.body,
    kw: "",
    text: "",
    cta: a.cta,
  };
}

// ── Router ───────────────────────────────────────────────────────────────────

interface Routed {
  messages: Msg[];
  mode: Mode;
  flow: Flow | null;
}

function escalate(): Routed {
  return {
    messages: [
      botText(
        "No problem — I'll get a Sonoaac tech to follow up with you. Add your details below and we'll be in touch, usually the same day:",
      ),
      formMsg(),
    ],
    mode: "escalating",
    flow: null,
  };
}

/** Show one answer at a time; mention the runners-up conversationally. */
function retrieveResult(text: string): Routed {
  const hits = retrieve(text, 3);
  if (hits.length === 0) {
    return { messages: [botText(FALLBACK)], mode: "chat", flow: null };
  }
  const messages: Msg[] = [botEntry(hits[0].entry)];
  if (hits.length > 1) {
    const more = hits
      .slice(1)
      .map((h) => `“${h.entry.q}”`)
      .join(" or ");
    messages.push(botText(`I can also go into ${more} — just ask.`));
  }
  messages.push(botText(FEEDBACK_Q));
  return { messages, mode: "awaitingFeedback", flow: null };
}

function answerUseCase(uc: UseCase): Routed {
  return {
    messages: [botEntry(buyEntry(uc)), botText(FEEDBACK_Q)],
    mode: "awaitingFeedback",
    flow: null,
  };
}

function advanceBuyFlow(text: string, flow: Flow): Routed {
  const uc = detectUseCase(text);
  if (uc) return answerUseCase(uc);
  if (isEscalationIntent(text)) return escalate();

  // Changed the subject with a clear question? Answer that instead.
  const hits = retrieve(text, 1);
  if (hits.length && hits[0].score >= 5) return retrieveResult(text);

  if (flow.tries >= 1) return answerUseCase("general");
  return { messages: [botText(BUY_RECLARIFY)], mode: "chat", flow: { id: "buy", tries: flow.tries + 1 } };
}

function route(text: string, flow: Flow | null): Routed {
  if (flow) return advanceBuyFlow(text, flow);
  if (isEscalationIntent(text)) return escalate();

  const st = smallTalk(text);
  if (st) return { messages: [botText(st)], mode: "chat", flow: null };

  if (isBuyIntent(text)) {
    const uc = detectUseCase(text);
    if (uc) return answerUseCase(uc);
    return { messages: [botText(BUY_CLARIFY)], mode: "chat", flow: { id: "buy", tries: 0 } };
  }

  return retrieveResult(text);
}

// ── Renderers ────────────────────────────────────────────────────────────────

/** Render a plain-text answer: blank lines = paragraphs, "- " lines = bullets. */
function PlainAnswer({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const bullets = lines.filter((l) => l.trim().startsWith("- "));
        if (bullets.length && bullets.length === lines.length) {
          return (
            <ul key={bi} className="space-y-0.5">
              {bullets.map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="text-gray-500 shrink-0">•</span>
                  <span>{l.replace(/^\s*-\s+/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi} className="leading-relaxed">
            {lines.map((l, li) => (
              <span key={li}>
                {l.replace(/^\s*-\s+/, "• ")}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function EntryBubble({ entry, onNavigate }: { entry: MemoryEntry; onNavigate: () => void }) {
  return (
    <>
      <p className="text-green-400 font-bold text-xs leading-snug">{entry.q}</p>
      <div className="text-xs text-gray-300 space-y-2">
        {typeof entry.a === "string" ? (
          <PlainAnswer text={entry.a} />
        ) : (
          /* kb-mono neutralizes the FAQ's light-mode Tailwind colors */
          <div className="kb-mono">{entry.a as ReactNode}</div>
        )}
      </div>
      {entry.cta && (
        <p className="text-[0.7rem] pt-1.5 border-t border-gray-800">
          <Link href={entry.cta.href}>
            <button
              onClick={onNavigate}
              className="text-green-400 underline hover:text-green-300 transition-colors"
            >
              {entry.cta.label}
            </button>
          </Link>
        </p>
      )}
    </>
  );
}

// ── Escalation form ──────────────────────────────────────────────────────────

function EscalationForm({
  defaultMessage,
  onSubmitted,
}: {
  defaultMessage: string;
  onSubmitted: (name: string) => void;
}) {
  const submit = useSubmitContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState(defaultMessage);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-gray-300 text-xs leading-relaxed">
        Sent ✓ — your request is on its way. We'll reply by email, usually the same day.
      </p>
    );
  }

  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const valid = name.trim().length > 0 && emailOk && msg.trim().length > 0;

  const field =
    "w-full bg-black border border-green-900 text-gray-200 text-xs px-2.5 py-1.5 " +
    "focus:outline-none focus:border-green-600 placeholder:text-gray-600";

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!valid) {
      setErr("Add your name, a valid email, and a short description.");
      return;
    }
    const body = {
      name: name.trim(),
      email: email.trim(),
      message:
        "[HelpBot] Customer asked for a follow-up.\n" +
        (phone.trim() ? `Phone: ${phone.trim()}\n` : "") +
        `\n${msg.trim()}`,
    };
    try {
      await submit.mutateAsync(body as any);
      setDone(true);
      onSubmitted(name.trim());
    } catch (e: any) {
      setErr(e?.message ?? "Couldn't send. Try again, or call (862) 423-8875.");
    }
  };

  return (
    <form onSubmit={handle} className="space-y-2">
      <input
        className={field}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <input
        className={field}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        className={field}
        placeholder="Phone (optional)"
        inputMode="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        autoComplete="tel"
      />
      <textarea
        className={field}
        rows={3}
        placeholder="What do you need help with?"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {err && <p className="text-red-400 text-[0.65rem]">{err}</p>}
      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full px-3 py-2 bg-green-400 text-black text-[0.65rem] uppercase tracking-[0.15em] font-bold hover:bg-green-300 transition-colors disabled:opacity-40"
      >
        {submit.isPending ? "Sending…" : "Send to customer service"}
      </button>
    </form>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function HelpBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [flow, setFlow] = useState<Flow | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  const lastQuestionRef = useRef("");
  // Plain-text mirror of the chat, sent to /api/assistant as history.
  const convoRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  // Flips true once the AI endpoint is unreachable — then it's keyword-only.
  const llmDownRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setMessages((prev) => (prev.length ? prev : seedMessages()));
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const emit = (userText: string, botMsgs: Msg[], nextMode: Mode, nextFlow: Flow | null) => {
    setMessages((m) => [...m, userMsg(userText)]);
    setPending(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setMessages((m) => [...m, ...botMsgs]);
      setPending(false);
      setMode(nextMode);
      setFlow(nextFlow);
    }, 340);
  };

  /** Keyword-engine reply rendered immediately (the user message is already shown). */
  const keywordReplyInline = (text: string) => {
    lastQuestionRef.current = text;
    const r = route(text, null);
    setMessages((m) => [...m, ...r.messages]);
    setMode(r.mode);
    setFlow(r.flow);
    setPending(false);
  };

  /** Stream a reply from the AI assistant; fall back to the keyword engine on failure. */
  const streamFromLLM = async (text: string) => {
    setMessages((m) => [...m, userMsg(text)]);
    convoRef.current = [...convoRef.current, { role: "user" as const, content: text }].slice(-16);
    setPending(true);
    setMode("chat");
    setFlow(null);

    const botId = nextId();
    let acc = "";
    let streaming = false;

    try {
      const resp = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: convoRef.current }),
      });

      if (!resp.ok || !resp.body) {
        llmDownRef.current = true;
        keywordReplyInline(text);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!streaming) {
          setMessages((m) => [...m, { id: botId, role: "bot", text: acc }]);
          streaming = true;
          setPending(false);
        } else {
          setMessages((m) => m.map((x) => (x.id === botId ? { ...x, text: acc } : x)));
        }
      }

      acc = acc.trim();
      if (!streaming || !acc) {
        llmDownRef.current = true;
        setMessages((m) => m.filter((x) => x.id !== botId));
        keywordReplyInline(text);
        return;
      }
      setMessages((m) => m.map((x) => (x.id === botId ? { ...x, text: acc } : x)));
      convoRef.current = [...convoRef.current, { role: "assistant" as const, content: acc }].slice(-16);
    } catch {
      if (streaming && acc.trim()) {
        // Connection dropped mid-reply — keep what streamed.
      } else {
        llmDownRef.current = true;
        setMessages((m) => m.filter((x) => x.id !== botId));
        keywordReplyInline(text);
        return;
      }
    } finally {
      setPending(false);
    }
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || pending) return;
    setInput("");

    // Explicit human hand-off always opens the form, in either mode.
    if (isEscalationIntent(text)) {
      convoRef.current = [...convoRef.current, { role: "user" as const, content: text }].slice(-16);
      const r = route(text, null);
      emit(text, r.messages, r.mode, r.flow);
      return;
    }

    // Yes/no only applies right after a keyword-engine answer.
    if (mode === "awaitingFeedback" && !flow) {
      const n = normalize(text);
      if (YES_RE.test(n)) {
        emit(text, [botText("Glad that helped. Ask me anything else whenever you need.")], "chat", null);
        return;
      }
      if (NO_RE.test(n)) {
        emit(
          text,
          [
            botText(
              "Sorry that didn't sort it. Leave your details and a Sonoaac tech will follow up with you directly — usually the same day:",
            ),
            formMsg(),
          ],
          "escalating",
          null,
        );
        return;
      }
    }

    // Primary path: AI assistant. Falls back to the keyword engine on any failure.
    if (!llmDownRef.current) {
      void streamFromLLM(text);
      return;
    }

    lastQuestionRef.current = text;
    const r = route(text, flow);
    emit(text, r.messages, r.mode, r.flow);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onEscalated = (name: string) => {
    setMessages((m) => [
      ...m,
      botText(
        `Thanks${name ? ", " + name : ""}. Your request is in — a Sonoaac tech will reach out by email, usually the same day. Anything else while you're here?`,
      ),
    ]);
    setMode("chat");
    setFlow(null);
  };

  const startOver = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPending(false);
    setInput("");
    setMode("chat");
    setFlow(null);
    lastQuestionRef.current = "";
    convoRef.current = [];
    llmDownRef.current = false;
    setMessages(seedMessages());
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Float button */}
      <button
        aria-label="Open assistant chat"
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
            aria-label="Sonoaac assistant chat"
            className="fixed bottom-24 right-6 z-[200] w-[22rem] max-w-[calc(100vw-3rem)] bg-black border border-green-800 flex flex-col focus:outline-none shadow-xl shadow-black/50"
            style={{ height: "min(72vh, 560px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-900 shrink-0">
              <span className="text-xs uppercase tracking-[0.3em] text-green-400 font-bold">
                Sonoaac Assistant
              </span>
              <div className="flex items-center gap-2">
                {messages.length > 1 && (
                  <button
                    aria-label="Start over"
                    onClick={startOver}
                    className="text-gray-500 hover:text-green-400 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <button
                  aria-label="Close assistant"
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-green-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto p-3 min-h-0 space-y-3"
            >
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] bg-green-400 text-black text-xs px-3 py-2 rounded leading-relaxed">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-start">
                    <div className="max-w-[92%] border border-gray-800 bg-gray-900/40 px-3 py-2.5 rounded space-y-2">
                      {m.form ? (
                        <EscalationForm
                          defaultMessage={lastQuestionRef.current}
                          onSubmitted={onEscalated}
                        />
                      ) : m.entry ? (
                        <EntryBubble entry={m.entry} onNavigate={() => setOpen(false)} />
                      ) : (
                        <p className="text-gray-300 text-xs leading-relaxed">{m.text}</p>
                      )}
                    </div>
                  </div>
                ),
              )}

              {pending && (
                <div className="flex justify-start">
                  <div className="border border-gray-800 bg-gray-900/40 px-3 py-2 rounded">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-green-900 p-2 shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                aria-label="Type your message"
                className="flex-1 bg-black border border-green-900 text-gray-200 text-xs px-3 py-2 focus:outline-none focus:border-green-600 placeholder:text-gray-600"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || pending}
                className="w-9 h-9 shrink-0 bg-green-400 text-black flex items-center justify-center hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
