import type { Express } from "express";
import type { Server } from "http";
import { randomBytes } from "crypto";
import { storage } from "./storage";
import { sendContactEmail, sendAdminNotification } from "./email";
import { api } from "@shared/routes";
import { z } from "zod";

function requireAdmin(req: any, res: any): boolean {
  const key = process.env.ADMIN_KEY;
  if (!key) return true; // no key configured — open (dev mode)
  const auth = req.headers["authorization"] ?? "";
  if (auth !== `Bearer ${key}`) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === PC Parts ===
  app.get(api.pcParts.list.path, async (req, res) => {
    const parts = await storage.getPcParts();
    res.json(parts);
  });

  // === Quotes ===
  app.post(api.quotes.create.path, async (req, res) => {
    try {
      const input = api.quotes.create.input.parse(req.body);
      const quote = await storage.createQuote(input);
      res.status(201).json(quote);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === Contact ===
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const submission = await storage.createContactSubmission(input);
      await sendContactEmail(input.name, input.email, input.message).catch(console.error);
      res.status(201).json(submission);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Contact route error:", err);
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // === Tickets — Customer: get by token ===
  app.get("/api/tickets/:token", async (req, res) => {
    try {
      const ticket = await storage.getTicketByToken(req.params.token);
      if (!ticket) return res.status(404).json({ message: "Ticket not found or link has expired." });
      if (new Date(ticket.tokenExpiresAt) < new Date()) {
        return res.status(410).json({ message: "This tracking link has expired. Contact us at sonoaac@gmail.com." });
      }
      // Never expose internalNotes to customer
      const { internalNotes: _internal, ...safe } = ticket as any;
      res.json(safe);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  });

  // === Tickets — Customer: send message ===
  app.post("/api/tickets/:token/message", async (req, res) => {
    try {
      const ticket = await storage.getTicketByToken(req.params.token);
      if (!ticket) return res.status(404).json({ message: "Ticket not found." });
      if (new Date(ticket.tokenExpiresAt) < new Date()) {
        return res.status(410).json({ message: "Link expired." });
      }

      const message = z.string().min(1).max(2000).parse(req.body.message);
      const siteUrl = process.env.SITE_URL ?? "https://sonoaac.com";

      await sendAdminNotification(
        `Message from ${ticket.customerName} — Ticket #${ticket.id}`,
        `Customer: ${ticket.customerName} (${ticket.customerEmail})\nService: ${ticket.serviceType}\n\nMessage:\n${message}\n\nManage: ${siteUrl}/admin/tickets`
      ).catch(console.error);

      res.json({ ok: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Message is required." });
      }
      res.status(500).json({ message: "Failed to send message." });
    }
  });

  // === Tickets — Admin: list all ===
  app.get("/api/admin/tickets", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const tickets = await storage.getAllTickets();
    res.json(tickets);
  });

  // === Tickets — Admin: create ===
  app.post("/api/admin/tickets", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const input = z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        serviceType: z.string().min(1),
        issueDescription: z.string().min(1),
        expiryDays: z.number().int().min(1).max(365).default(30),
        adminNotes: z.string().optional(),
        internalNotes: z.string().optional(),
      }).parse(req.body);

      const token = randomBytes(24).toString("hex");
      const tokenExpiresAt = new Date();
      tokenExpiresAt.setDate(tokenExpiresAt.getDate() + input.expiryDays);

      const ticket = await storage.createTicket({
        token,
        tokenExpiresAt,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone ?? null,
        serviceType: input.serviceType,
        issueDescription: input.issueDescription,
        status: "pending",
        adminNotes: input.adminNotes ?? null,
        internalNotes: input.internalNotes ?? null,
      });

      const siteUrl = process.env.SITE_URL ?? "https://sonoaac.com";
      const trackUrl = `${siteUrl}/track/${token}`;

      res.status(201).json({ ticket, trackUrl });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      console.error("Create ticket error:", err);
      res.status(500).json({ message: "Failed to create ticket." });
    }
  });

  // === Tickets — Admin: update ===
  app.patch("/api/admin/tickets/:id", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const id = z.coerce.number().int().parse(req.params.id);
      const input = z.object({
        status: z.enum(["pending", "in_progress", "resolved", "cancelled"]).optional(),
        adminNotes: z.string().nullable().optional(),
        internalNotes: z.string().nullable().optional(),
      }).parse(req.body);

      const ticket = await storage.updateTicket(id, input);
      if (!ticket) return res.status(404).json({ message: "Ticket not found." });
      res.json(ticket);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update ticket." });
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingParts = await storage.getPcParts();
  if (existingParts.length === 0) {
    console.log("Seeding PC Parts...");
    const parts = [
      { category: "CPU", name: "Intel Core i9-13900K", price: 589, specs: "24 Cores, 5.8 GHz" },
      { category: "CPU", name: "AMD Ryzen 9 7950X", price: 599, specs: "16 Cores, 5.7 GHz" },
      { category: "CPU", name: "Intel Core i5-13600K", price: 319, specs: "14 Cores, 5.1 GHz" },
      { category: "GPU", name: "NVIDIA RTX 4090", price: 1599, specs: "24GB GDDR6X" },
      { category: "GPU", name: "NVIDIA RTX 4080", price: 1199, specs: "16GB GDDR6X" },
      { category: "GPU", name: "AMD Radeon RX 7900 XTX", price: 999, specs: "24GB GDDR6" },
      { category: "Motherboard", name: "ASUS ROG Maximus Z790", price: 499, specs: "E-ATX, WiFi 6E" },
      { category: "Motherboard", name: "MSI MPG B650 Edge", price: 239, specs: "ATX, WiFi 6E" },
      { category: "RAM", name: "Corsair Vengeance 32GB", price: 110, specs: "DDR5 5600MHz" },
      { category: "RAM", name: "G.Skill Trident Z5 64GB", price: 240, specs: "DDR5 6000MHz" },
      { category: "Storage", name: "Samsung 980 Pro 2TB", price: 129, specs: "NVMe SSD" },
      { category: "Storage", name: "WD Black SN850X 1TB", price: 89, specs: "NVMe SSD" },
      { category: "Case", name: "Lian Li O11 Dynamic", price: 149, specs: "Mid Tower" },
      { category: "Case", name: "NZXT H9 Flow", price: 159, specs: "Mid Tower" },
      { category: "PSU", name: "Corsair RM1000x", price: 189, specs: "1000W 80+ Gold" },
      { category: "PSU", name: "EVGA SuperNOVA 850", price: 139, specs: "850W 80+ Gold" },
    ];
    for (const part of parts) {
      await storage.createPcPart(part);
    }
    console.log("Seeding complete.");
  }
}
