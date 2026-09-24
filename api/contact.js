// Vercel serverless function for the contact form. Logic lives in lib/contact.js.

import { handleContact } from "../lib/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();

  const result = await handleContact(body, ip, process.env);
  return res.status(result.status).json(result.body);
}

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}
