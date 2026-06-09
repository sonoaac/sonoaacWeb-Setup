import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

const BUSINESS_EMAIL = "sonoaac@gmail.com";

function createTransporter() {
  const user = process.env.GMAIL_USER ?? BUSINESS_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

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

  const transporter = createTransporter();
  if (transporter) {
    try {
      const from = process.env.GMAIL_USER ?? BUSINESS_EMAIL;
      await transporter.sendMail({
        from,
        to: BUSINESS_EMAIL,
        replyTo: email,
        subject: `New message from ${name} — Sonoaac Contact Form`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> <a href="mailto:${email}">${email}</a></p><p><b>Message:</b></p><p style="white-space:pre-wrap">${message}</p>`,
      });
      const smsTo = process.env.ADMIN_PHONE_SMS;
      if (smsTo) {
        await transporter.sendMail({
          from,
          to: smsTo,
          subject: "",
          text: `SNC contact: ${name} (${email}): ${String(message).slice(0, 120)}`,
        });
      }
    } catch (err: any) {
      console.error("Nodemailer error:", err?.message ?? err);
    }
  }

  res.statusCode = 201;
  res.end(JSON.stringify({ id: 1, name, email, message, createdAt: new Date().toISOString() }));
}
