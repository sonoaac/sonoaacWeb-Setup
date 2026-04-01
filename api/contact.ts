import type { IncomingMessage, ServerResponse } from "http";
import sgMail from "@sendgrid/mail";

const BUSINESS_EMAIL = "sonoaac@gmail.com";

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ message: "Method not allowed" }));
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    res.statusCode = 400;
    return res.end(JSON.stringify({
      message: "Missing required fields",
      field: !name ? "name" : !email ? "email" : "message",
    }));
  }

  const key = process.env.SENDGRID_API_KEY;
  if (key) {
    try {
      sgMail.setApiKey(key);
      await sgMail.send({
        to: BUSINESS_EMAIL,
        from: BUSINESS_EMAIL,
        replyTo: email,
        subject: `New message from ${name} — Sonoaac Contact Form`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Message:</strong></p><p style="white-space:pre-wrap">${message}</p>`,
      });
    } catch (err: any) {
      console.error("SendGrid error:", err?.response?.body ?? err.message);
    }
  }

  res.statusCode = 201;
  res.end(JSON.stringify({
    id: 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  }));
}
