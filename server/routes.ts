import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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
      res.status(201).json(submission);
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

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingParts = await storage.getPcParts();
  if (existingParts.length === 0) {
    console.log("Seeding PC Parts...");
    const parts = [
      // CPU
      { category: "CPU", name: "Intel Core i9-13900K", price: 589, specs: "24 Cores, 5.8 GHz" },
      { category: "CPU", name: "AMD Ryzen 9 7950X", price: 599, specs: "16 Cores, 5.7 GHz" },
      { category: "CPU", name: "Intel Core i5-13600K", price: 319, specs: "14 Cores, 5.1 GHz" },
      
      // GPU
      { category: "GPU", name: "NVIDIA RTX 4090", price: 1599, specs: "24GB GDDR6X" },
      { category: "GPU", name: "NVIDIA RTX 4080", price: 1199, specs: "16GB GDDR6X" },
      { category: "GPU", name: "AMD Radeon RX 7900 XTX", price: 999, specs: "24GB GDDR6" },

      // Motherboard
      { category: "Motherboard", name: "ASUS ROG Maximus Z790", price: 499, specs: "E-ATX, WiFi 6E" },
      { category: "Motherboard", name: "MSI MPG B650 Edge", price: 239, specs: "ATX, WiFi 6E" },

      // RAM
      { category: "RAM", name: "Corsair Vengeance 32GB", price: 110, specs: "DDR5 5600MHz" },
      { category: "RAM", name: "G.Skill Trident Z5 64GB", price: 240, specs: "DDR5 6000MHz" },

      // Storage
      { category: "Storage", name: "Samsung 980 Pro 2TB", price: 129, specs: "NVMe SSD" },
      { category: "Storage", name: "WD Black SN850X 1TB", price: 89, specs: "NVMe SSD" },

      // Case
      { category: "Case", name: "Lian Li O11 Dynamic", price: 149, specs: "Mid Tower" },
      { category: "Case", name: "NZXT H9 Flow", price: 159, specs: "Mid Tower" },

      // PSU
      { category: "PSU", name: "Corsair RM1000x", price: 189, specs: "1000W 80+ Gold" },
      { category: "PSU", name: "EVGA SuperNOVA 850", price: 139, specs: "850W 80+ Gold" },
    ];

    for (const part of parts) {
      await storage.createPcPart(part);
    }
    console.log("Seeding complete.");
  }
}
