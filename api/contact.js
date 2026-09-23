// Vercel serverless function: emails contact form submissions via Resend.
// Env vars: RESEND_API_KEY, CONTACT_FROM, CONTACT_TO, TURNSTILE_SECRET_KEY (see .env.example).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  // Collapse line breaks so the name is safe to put in the subject line.
  const name = String(body.name || "").replace(/[\r\n]+/g, " ").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const company = String(body.company || "").trim(); // honeypot

  // Bots fill every field; pretend success so they don't retry.
  if (company) return res.status(200).json({ ok: true });

  if (
    !name || name.length > 100 ||
    !email || email.length > 200 || !EMAIL_RE.test(email) ||
    !message || message.length > 5000
  ) {
    return res.status(400).json({ ok: false, error: "Invalid input" });
  }

  const captchaOk = await verifyTurnstile(
    String(body.turnstileToken || ""),
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim()
  );
  if (!captchaOk) {
    return res.status(403).json({ ok: false, error: "Captcha failed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ ok: false });
  }

  const from = process.env.CONTACT_FROM || "Growth Era Website <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO || "info@growtheraeg.com";

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
      return res.status(500).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    return res.status(500).json({ ok: false });
  }
}

// Checks the Cloudflare Turnstile token. Fails closed if the secret is missing.
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
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

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}
