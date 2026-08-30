import type { IncomingMessage, ServerResponse } from "http";
import {
  streamAssistantReply,
  sanitizeMessages,
  assistantAvailable,
} from "../shared/assistant-core";

/**
 * Vercel serverless function — streams a chat reply from Claude.
 * Mirrors the Express `POST /api/assistant` route used in local dev.
 * On any failure it returns a JSON body with `fallback: true` so the widget
 * drops back to its built-in keyword assistant.
 */
export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse,
) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 405;
    return res.end(JSON.stringify({ message: "Method not allowed" }));
  }

  if (!assistantAvailable()) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 503;
    return res.end(JSON.stringify({ fallback: true }));
  }

  const messages = sanitizeMessages(req.body?.messages);
  if (messages.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: "No messages" }));
  }

  const iterator = streamAssistantReply(messages);

  // Pull the first chunk before committing to a 200 — a failure here still
  // returns JSON so the client can fall back cleanly.
  let first: IteratorResult<string>;
  try {
    first = await iterator.next();
  } catch (err: any) {
    console.error("Assistant error:", err?.message ?? err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 502;
    return res.end(JSON.stringify({ fallback: true }));
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 200;
  if (!first.done && first.value) res.write(first.value);

  try {
    for await (const chunk of iterator) res.write(chunk);
  } catch (err: any) {
    console.error("Assistant stream error:", err?.message ?? err);
  }
  res.end();
}
