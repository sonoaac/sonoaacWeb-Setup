import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === PC Parts Table ===
export const pcParts = pgTable("pc_parts", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // CPU, GPU, RAM, Motherboard, Storage, Case, PSU
  name: text("name").notNull(),
  price: integer("price").notNull(), // Stored in cents or whole dollars? Let's assume whole dollars for simplicity based on provided code
  specs: text("specs"), // E.g., "AM4", "3200MHz", "8GB"
  imageUrl: text("image_url"),
});

// === Quotes Table ===
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  pageCount: text("page_count"),
  complexity: text("complexity"),
  features: jsonb("features").$type<string[]>(), // Array of selected feature names
  addons: jsonb("addons").$type<string[]>(), // Array of selected addon names
  estimatedPrice: integer("estimated_price"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === Contact Submissions ===
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === Tickets Table ===
export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  tokenExpiresAt: timestamp("token_expires_at").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  serviceType: text("service_type").notNull(),
  issueDescription: text("issue_description").notNull(),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === Schemas ===
export const insertPcPartSchema = createInsertSchema(pcParts).omit({ id: true });
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });

// === Types ===
export type PcPart = typeof pcParts.$inferSelect;
export type InsertPcPart = z.infer<typeof insertPcPartSchema>;

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

export const insertTicketSchema = createInsertSchema(tickets).omit({ id: true, createdAt: true, updatedAt: true });
export type Ticket = typeof tickets.$inferSelect;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
