import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  pcParts, quotes, contactSubmissions, tickets,
  type PcPart, type InsertPcPart,
  type Quote, type InsertQuote,
  type ContactSubmission, type InsertContactSubmission,
  type Ticket, type InsertTicket,
} from "@shared/schema";

export interface IStorage {
  getPcParts(): Promise<PcPart[]>;
  createPcPart(part: InsertPcPart): Promise<PcPart>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getTicketByToken(token: string): Promise<Ticket | null>;
  getAllTickets(): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicket(id: number, patch: Partial<Pick<Ticket, "status" | "adminNotes" | "internalNotes">>): Promise<Ticket | null>;
}

export class DatabaseStorage implements IStorage {
  async getPcParts(): Promise<PcPart[]> {
    if (!db) return [];
    return await db.select().from(pcParts);
  }

  async createPcPart(part: InsertPcPart): Promise<PcPart> {
    if (!db) return { ...part, id: 1 } as PcPart;
    const [newPart] = await db.insert(pcParts).values(part).returning();
    return newPart;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    if (!db) return { ...quote, id: 1, createdAt: new Date() } as Quote;
    const [newQuote] = await db.insert(quotes).values(quote).returning();
    return newQuote;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    if (!db) return { ...submission, id: 1, createdAt: new Date() } as ContactSubmission;
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }

  async getTicketByToken(token: string): Promise<Ticket | null> {
    if (!db) return null;
    const [row] = await db.select().from(tickets).where(eq(tickets.token, token));
    return row ?? null;
  }

  async getAllTickets(): Promise<Ticket[]> {
    if (!db) return [];
    return await db.select().from(tickets).orderBy(desc(tickets.createdAt));
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    if (!db) return { ...ticket, id: 1, createdAt: new Date(), updatedAt: new Date() } as Ticket;
    const [row] = await db.insert(tickets).values(ticket).returning();
    return row;
  }

  async updateTicket(id: number, patch: Partial<Pick<Ticket, "status" | "adminNotes" | "internalNotes">>): Promise<Ticket | null> {
    if (!db) return null;
    const [row] = await db
      .update(tickets)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(tickets.id, id))
      .returning();
    return row ?? null;
  }
}

export const storage = new DatabaseStorage();
