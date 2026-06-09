import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

type TicketStatus = "pending" | "in_progress" | "resolved" | "cancelled";

const STATUS_CONFIG: Record<TicketStatus, { label: string; dotColor: string; badgeStyle: string }> = {
  pending:     { label: "Pending Review",  dotColor: "#d97706", badgeStyle: "background:#fef3c7;color:#92400e;border:1px solid #fde68a" },
  in_progress: { label: "In Progress",     dotColor: "#2563eb", badgeStyle: "background:#dbeafe;color:#1e3a8a;border:1px solid #bfdbfe" },
  resolved:    { label: "Resolved",        dotColor: "#16a34a", badgeStyle: "background:#dcfce7;color:#14532d;border:1px solid #bbf7d0" },
  cancelled:   { label: "Cancelled",       dotColor: "#6b7280", badgeStyle: "background:#f3f4f6;color:#374151;border:1px solid #e5e7eb" },
};

function StatusBadge({ status }: { status: TicketStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      style={{ ...(Object.fromEntries(cfg.badgeStyle.split(";").map(s => { const [k,v] = s.split(":"); return [k?.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), v?.trim()]; }).filter(([k])=>k))), display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 50, fontSize: 13, fontWeight: 700, fontFamily: "Times New Roman" }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cfg.dotColor, display: "inline-block" }} />
      {cfg.label}
    </span>
  );
}

interface Ticket {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  issueDescription: string;
  status: TicketStatus;
  adminNotes?: string;
  tokenExpiresAt: string;
  createdAt: string;
}

export default function TrackTicket() {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const { data: ticket, isLoading, error } = useQuery<Ticket>({
    queryKey: ["ticket", token],
    queryFn: async () => {
      const res = await fetch(`/api/tickets/${token}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Not found");
      }
      return res.json();
    },
    retry: false,
  });

  const sendMessage = useMutation({
    mutationFn: async (msg: string) => {
      const res = await fetch(`/api/tickets/${token}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      if (!res.ok) throw new Error("Failed to send");
    },
    onSuccess: () => {
      setMessageSent(true);
      setMessage("");
    },
  });

  const inputClass = "w-full px-4 py-3 bg-black border border-green-900 text-white text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-800 text-sm tracking-widest uppercase">Loading…</div>
      </div>
    );
  }

  if (error || !ticket) {
    const msg = error instanceof Error ? error.message : "This tracking link is invalid or has expired.";
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 rounded-full border border-red-900 flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Times New Roman" }}>
            Link Unavailable
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">{msg}</p>
          <a
            href="mailto:sonoaac@gmail.com"
            className="inline-block border border-green-900 text-green-400 px-6 py-3 text-sm hover:border-green-500 hover:text-green-300 transition-colors"
            style={{ fontFamily: "Times New Roman" }}
          >
            Contact Us Directly →
          </a>
        </motion.div>
      </div>
    );
  }

  const expiryDate = new Date(ticket.tokenExpiresAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const createdDate = new Date(ticket.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-black">
      {/* Header band */}
      <div className="border-b border-green-900/30 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-green-800">Sonoaac · Support Tracker</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Title row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "Times New Roman" }}>
              Your Support Request
            </h1>
            <StatusBadge status={ticket.status} />
          </div>

          {/* Main card */}
          <div className="border border-green-900/40 bg-black/60 p-6 md:p-8 mb-6">
            <div className="grid gap-5">
              <Row label="Name" value={ticket.customerName} />
              <Row label="Service" value={ticket.serviceType} />
              <Row label="Submitted" value={createdDate} />
              <Row label="Ticket #" value={`#${ticket.id}`} />
              <div>
                <span className="text-xs uppercase tracking-widest text-green-900 block mb-2">Issue Description</span>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{ticket.issueDescription}</p>
              </div>
            </div>
          </div>

          {/* Admin notes */}
          {ticket.adminNotes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="border border-green-700/50 bg-green-950/20 p-6 mb-6"
            >
              <span className="text-xs uppercase tracking-widest text-green-600 block mb-3">Message from Sonoaac</span>
              <p className="text-green-200 text-sm leading-relaxed whitespace-pre-wrap">{ticket.adminNotes}</p>
            </motion.div>
          )}

          {/* Resolved state */}
          {ticket.status === "resolved" && (
            <div className="border border-green-900/40 p-5 mb-6 text-center">
              <p className="text-green-400 text-sm" style={{ fontFamily: "Times New Roman" }}>
                This request has been resolved. Thank you for choosing Sonoaac.
              </p>
            </div>
          )}

          {/* Message form */}
          {ticket.status !== "cancelled" && ticket.status !== "resolved" && (
            <div className="border border-green-900/30 p-6">
              <h2 className="text-base font-bold text-white mb-4" style={{ fontFamily: "Times New Roman" }}>
                Send Us a Message
              </h2>
              {messageSent ? (
                <div className="text-green-400 text-sm py-2">
                  Message received — we'll follow up shortly.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (message.trim()) sendMessage.mutate(message);
                  }}
                >
                  <textarea
                    className={`${inputClass} resize-none mb-4`}
                    rows={4}
                    placeholder="Ask a question, provide additional details, or request a call back…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    required
                  />
                  <button
                    type="submit"
                    disabled={sendMessage.isPending || !message.trim()}
                    className="border border-green-700 text-green-300 px-6 py-2.5 text-sm hover:bg-green-950 transition-colors disabled:opacity-40"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    {sendMessage.isPending ? "Sending…" : "Send Message →"}
                  </button>
                  {sendMessage.isError && (
                    <p className="text-red-500 text-xs mt-2">Failed to send. Please email sonoaac@gmail.com directly.</p>
                  )}
                </form>
              )}
            </div>
          )}

          <p className="text-green-900 text-xs mt-8">
            This link is valid until {expiryDate}. Save this page or bookmark it to check back for updates.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-xs uppercase tracking-widest text-green-900 sm:w-28 shrink-0 mb-1 sm:mb-0 sm:pt-0.5">{label}</span>
      <span className="text-gray-200 text-sm">{value}</span>
    </div>
  );
}
