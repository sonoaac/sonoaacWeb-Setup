import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

type TicketStatus = "pending" | "in_progress" | "resolved" | "cancelled";

interface Ticket {
  id: number;
  token: string;
  tokenExpiresAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  issueDescription: string;
  status: TicketStatus;
  adminNotes?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_LABELS: Record<TicketStatus, string> = {
  pending:     "Pending",
  in_progress: "In Progress",
  resolved:    "Resolved",
  cancelled:   "Cancelled",
};

const STATUS_COLORS: Record<TicketStatus, string> = {
  pending:     "#d97706",
  in_progress: "#2563eb",
  resolved:    "#16a34a",
  cancelled:   "#6b7280",
};

const SERVICE_TYPES = [
  "Remote Support",
  "On-Site Visit",
  "Device Setup",
  "Software Fix",
  "Custom PC Build",
  "Consultation",
  "Other",
];

const inputClass = "w-full px-4 py-2.5 bg-black border border-green-900 text-white text-sm focus:border-green-500 focus:outline-none transition-colors placeholder:text-green-900";
const labelClass = "block text-xs uppercase tracking-widest text-green-800 mb-1";

function Badge({ status }: { status: TicketStatus }) {
  const color = STATUS_COLORS[status];
  const label = STATUS_LABELS[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 10px", borderRadius: 50, border: `1px solid ${color}40`, background: `${color}15`, color, fontSize: 12, fontWeight: 700, fontFamily: "Times New Roman" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}

// ── Auth gate ────────────────────────────────────────────────
function AuthGate({ onAuth }: { onAuth: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tickets", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 401) {
        setError("Incorrect admin key.");
      } else {
        onAuth(key);
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Times New Roman" }}>Admin Access</h1>
        <p className="text-green-900 text-sm mb-8">Enter your admin key to manage support tickets.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Admin Key</label>
            <input
              type="password"
              className={inputClass}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="••••••••••••"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !key}
            className="w-full border border-green-700 text-green-300 py-3 text-sm hover:bg-green-950 transition-colors disabled:opacity-40"
            style={{ fontFamily: "Times New Roman" }}
          >
            {loading ? "Verifying…" : "Enter →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Create ticket modal ─────────────────────────────────────
function CreateModal({ adminKey, onClose, onCreated }: { adminKey: string; onClose: () => void; onCreated: (result: { ticket: Ticket; trackUrl: string }) => void }) {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceType: SERVICE_TYPES[0],
    issueDescription: "",
    expiryDays: 30,
    adminNotes: "",
    internalNotes: "",
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminKey}` },
        body: JSON.stringify({ ...form, expiryDays: Number(form.expiryDays) }),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.message ?? "Failed to create ticket");
      }
      return res.json() as Promise<{ ticket: Ticket; trackUrl: string }>;
    },
    onSuccess: onCreated,
    onError: (err: Error) => setError(err.message),
  });

  function set(key: string, val: string | number) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-green-900/50 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-900/30">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Times New Roman" }}>New Ticket</h2>
          <button onClick={onClose} className="text-green-900 hover:text-green-500 text-xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Customer Name *</label>
              <input className={inputClass} value={form.customerName} onChange={(e) => set("customerName", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Customer Email *</label>
              <input type="email" className={inputClass} value={form.customerEmail} onChange={(e) => set("customerEmail", e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone (optional)</label>
              <input className={inputClass} value={form.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Service Type *</label>
              <select className={inputClass} value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)}>
                {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Issue Description *</label>
            <textarea className={`${inputClass} resize-none`} rows={3} value={form.issueDescription} onChange={(e) => set("issueDescription", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Admin Notes (visible to customer)</label>
            <textarea className={`${inputClass} resize-none`} rows={2} value={form.adminNotes} onChange={(e) => set("adminNotes", e.target.value)} placeholder="e.g. We received your request and will contact you soon." />
          </div>
          <div>
            <label className={labelClass}>Internal Notes (not visible to customer)</label>
            <textarea className={`${inputClass} resize-none`} rows={2} value={form.internalNotes} onChange={(e) => set("internalNotes", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Link expires in (days)</label>
            <input type="number" className={inputClass} min={1} max={365} value={form.expiryDays} onChange={(e) => set("expiryDays", e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-green-900 text-green-900 py-2.5 text-sm hover:border-green-700 hover:text-green-700 transition-colors" style={{ fontFamily: "Times New Roman" }}>
              Cancel
            </button>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !form.customerName || !form.customerEmail || !form.issueDescription}
              className="flex-1 border border-green-600 text-green-300 py-2.5 text-sm hover:bg-green-950 transition-colors disabled:opacity-40"
              style={{ fontFamily: "Times New Roman" }}
            >
              {mutation.isPending ? "Creating…" : "Create Ticket →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Track link created dialog ───────────────────────────────
function TrackLinkDialog({ trackUrl, ticket, onClose }: { trackUrl: string; ticket: Ticket; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(trackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="bg-black border border-green-700/50 w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Times New Roman" }}>Ticket Created</h2>
        <p className="text-green-900 text-sm mb-5">Send this tracking link to <span className="text-green-400">{ticket.customerName}</span>:</p>
        <div className="border border-green-900 p-3 mb-4 break-all text-green-300 text-xs font-mono">{trackUrl}</div>
        <div className="flex gap-3">
          <button
            onClick={copy}
            className="flex-1 border border-green-700 text-green-300 py-2.5 text-sm hover:bg-green-950 transition-colors"
            style={{ fontFamily: "Times New Roman" }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-green-900 text-green-900 py-2.5 text-sm hover:border-green-700 transition-colors"
            style={{ fontFamily: "Times New Roman" }}
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Ticket row (expandable) ─────────────────────────────────
function TicketRow({ ticket, adminKey, siteUrl }: { ticket: Ticket; adminKey: string; siteUrl: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [adminNotes, setAdminNotes] = useState(ticket.adminNotes ?? "");
  const [internalNotes, setInternalNotes] = useState(ticket.internalNotes ?? "");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const qc = useQueryClient();

  const trackUrl = `${siteUrl}/track/${ticket.token}`;

  function copyLink() {
    navigator.clipboard.writeText(trackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const update = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/admin/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminKey}` },
        body: JSON.stringify({ status, adminNotes: adminNotes || null, internalNotes: internalNotes || null }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      qc.invalidateQueries({ queryKey: ["admin-tickets"] });
    },
  });

  const createdDate = new Date(ticket.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="border border-green-900/30 mb-2">
      {/* Row header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-green-950/10 transition-colors"
      >
        <span className="text-gray-400 text-xs w-8 shrink-0">#{ticket.id}</span>
        <span className="text-white text-sm font-bold flex-1 min-w-0 truncate" style={{ fontFamily: "Times New Roman" }}>{ticket.customerName}</span>
        <span className="text-green-900 text-xs hidden sm:block shrink-0">{ticket.serviceType}</span>
        <Badge status={status} />
        <span className="text-green-900 text-xs hidden md:block shrink-0">{createdDate}</span>
        <span className="text-green-800 text-sm ml-auto">{open ? "▲" : "▼"}</span>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-2 border-t border-green-900/20 space-y-4">
              {/* Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <InfoLine label="Email" value={ticket.customerEmail} />
                {ticket.customerPhone && <InfoLine label="Phone" value={ticket.customerPhone} />}
                <InfoLine label="Service" value={ticket.serviceType} />
                <InfoLine label="Created" value={createdDate} />
              </div>
              <div>
                <span className={labelClass}>Issue</span>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{ticket.issueDescription}</p>
              </div>

              {/* Track link */}
              <div>
                <span className={labelClass}>Customer Track Link</span>
                <div className="flex gap-2">
                  <span className="text-green-900 text-xs font-mono truncate flex-1 border border-green-900/30 px-2 py-1.5">{trackUrl}</span>
                  <button onClick={copyLink} className="shrink-0 border border-green-900 text-green-800 px-3 text-xs hover:border-green-700 hover:text-green-600 transition-colors" style={{ fontFamily: "Times New Roman" }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TicketStatus)}
                >
                  {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              {/* Admin notes */}
              <div>
                <label className={labelClass}>Admin Notes (visible to customer)</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Update the customer on progress…"
                />
              </div>

              {/* Internal notes */}
              <div>
                <label className={labelClass}>Internal Notes (private)</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={2}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Internal reference notes…"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => update.mutate()}
                  disabled={update.isPending}
                  className="border border-green-600 text-green-300 px-5 py-2 text-sm hover:bg-green-950 transition-colors disabled:opacity-40"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  {update.isPending ? "Saving…" : "Save Changes"}
                </button>
                {saved && <span className="text-green-500 text-xs">Saved ✓</span>}
                {update.isError && <span className="text-red-500 text-xs">Save failed</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-widest text-green-900 block mb-0.5">{label}</span>
      <span className="text-gray-300 text-sm">{value}</span>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────
const FILTER_OPTIONS: Array<{ label: string; value: TicketStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminTickets() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newResult, setNewResult] = useState<{ ticket: Ticket; trackUrl: string } | null>(null);
  const [filter, setFilter] = useState<TicketStatus | "all">("all");
  const qc = useQueryClient();

  const siteUrl = window.location.origin;

  const { data: allTickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const res = await fetch("/api/admin/tickets", {
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    enabled: authed,
  });

  const tickets = useMemo(() =>
    filter === "all" ? allTickets : allTickets.filter((t) => t.status === filter),
    [allTickets, filter]
  );

  function handleAuth(key: string) {
    setAdminKey(key);
    setAuthed(true);
  }

  function handleCreated(result: { ticket: Ticket; trackUrl: string }) {
    setShowCreate(false);
    setNewResult(result);
    qc.invalidateQueries({ queryKey: ["admin-tickets"] });
  }

  if (!authed) return <AuthGate onAuth={handleAuth} />;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-green-900/30 px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-1">Sonoaac · Admin</span>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Times New Roman" }}>Support Tickets</h1>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="border border-green-600 text-green-300 px-5 py-2.5 text-sm hover:bg-green-950 transition-colors"
            style={{ fontFamily: "Times New Roman" }}
          >
            + New Ticket
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 text-xs border transition-colors ${filter === value ? "border-green-600 text-green-300 bg-green-950/30" : "border-green-900/50 text-green-900 hover:border-green-800 hover:text-green-800"}`}
              style={{ fontFamily: "Times New Roman" }}
            >
              {label}
              {value !== "all" && (
                <span className="ml-1.5 text-green-900/60">
                  {allTickets.filter((t) => t.status === value).length}
                </span>
              )}
              {value === "all" && <span className="ml-1.5 text-green-900/60">{allTickets.length}</span>}
            </button>
          ))}
        </div>

        {/* Ticket list */}
        {isLoading ? (
          <div className="text-green-900 text-sm tracking-widest uppercase py-12 text-center">Loading…</div>
        ) : tickets.length === 0 ? (
          <div className="border border-green-900/20 py-16 text-center">
            <p className="text-green-900 text-sm">No tickets yet.</p>
            {filter === "all" && (
              <button
                onClick={() => setShowCreate(true)}
                className="mt-4 border border-green-900 text-green-800 px-5 py-2 text-sm hover:border-green-700 hover:text-green-600 transition-colors"
                style={{ fontFamily: "Times New Roman" }}
              >
                Create your first ticket →
              </button>
            )}
          </div>
        ) : (
          <div>
            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} adminKey={adminKey} siteUrl={siteUrl} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreate && (
          <CreateModal adminKey={adminKey} onClose={() => setShowCreate(false)} onCreated={handleCreated} />
        )}
        {newResult && (
          <TrackLinkDialog
            trackUrl={newResult.trackUrl}
            ticket={newResult.ticket}
            onClose={() => setNewResult(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
