// Shared contact form logic: validates input, checks Turnstile, emails via Resend.
// Used by both the Vercel function (api/contact.js) and the Cloudflare Pages
// function (functions/api/contact.js).
// Env vars: RESEND_API_KEY, CONTACT_FROM, CONTACT_TO, TURNSTILE_SECRET_KEY (see .env.example).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Returns { status, body } for the platform wrapper to send back.
export async function handleContact(body, ip, env) {
  body = body || {};
  // Collapse line breaks so the name is safe to put in the subject line.
  const name = String(body.name || "").replace(/[\r\n]+/g, " ").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const company = String(body.company || "").trim(); // honeypot

  // Bots fill every field; pretend success so they don't retry.
  if (company) return { status: 200, body: { ok: true } };

  if (
    !name || name.length > 100 ||
    !email || email.length > 200 || !EMAIL_RE.test(email) ||
    !message || message.length > 5000
  ) {
    return { status: 400, body: { ok: false, error: "Invalid input" } };
  }

  const captchaOk = await verifyTurnstile(
    String(body.turnstileToken || ""),
    ip,
    env.TURNSTILE_SECRET_KEY
  );
  if (!captchaOk) {
    return { status: 403, body: { ok: false, error: "Captcha failed" } };
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { status: 500, body: { ok: false } };
  }

  const from = env.CONTACT_FROM || "Growth Era Website <onboarding@resend.dev>";
  const to = env.CONTACT_TO || "info@growtheraeg.com";

  const html = `
    <h2>New contact form message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New contact form message from ${name}`,
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, await resendRes.text());
      return { status: 500, body: { ok: false } };
    }

    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { status: 500, body: { ok: false } };
  }
}

// Checks the Cloudflare Turnstile token. Fails closed if the secret is missing.
async function verifyTurnstile(token, ip, secret) {
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (!token) return false;

  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip) params.append("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: params,
    });
    const data = await r.json();
    if (!data.success) console.warn("Turnstile rejected:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}
