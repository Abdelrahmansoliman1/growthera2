// Cloudflare Pages Function for the contact form (served at /api/contact).
// Logic lives in lib/contact.js. Only POST is handled; other methods get 405.

import { handleContact } from "../../lib/contact.js";

export async function onRequestPost({ request, env }) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // Leave body empty; handleContact will reject it as invalid input.
  }
  const ip = request.headers.get("CF-Connecting-IP") || "";

  const result = await handleContact(body, ip, env);
  return Response.json(result.body, { status: result.status });
}
