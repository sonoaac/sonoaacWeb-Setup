import { db } from "./db";
import {
  pcParts, quotes, contactSubmissions,
  type PcPart, type InsertPcPart,
  type Quote, type InsertQuote,
  type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  // PC Parts
  getPcParts(): Promise<PcPart[]>;
  createPcPart(part: InsertPcPart): Promise<PcPart>;

  // Quotes
  createQuote(quote: InsertQuote): Promise<Quote>;

  // Contact
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getPcParts(): Promise<PcPart[]> {
    return await db.select().from(pcParts);
  }

  async createPcPart(part: InsertPcPart): Promise<PcPart> {
    const [newPart] = await db.insert(pcParts).values(part).returning();
    return newPart;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db.insert(quotes).values(quote).returning();
    return newQuote;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }
}

export const storage = new DatabaseStorage();
