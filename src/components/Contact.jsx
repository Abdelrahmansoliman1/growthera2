import { useEffect, useRef, useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Logo from "./Logo.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";

const CONTACT_ENDPOINT = "/api/contact";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Falls back to Cloudflare's always-pass test key when no real key is configured.
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

let turnstileLoader;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!turnstileLoader) {
    turnstileLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        turnstileLoader = null;
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileLoader;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  const showForm = status !== "success";

  useEffect(() => {
    if (!showForm) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current) return;
        widgetIdRef.current = turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          size: "flexible",
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      setTurnstileToken("");
    };
  }, [showForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    // Tokens are single-use; get a fresh one for any retry.
    if (widgetIdRef.current != null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setTurnstileToken("");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 relative overflow-hidden bg-neutral-950 text-white px-6 md:px-10 py-24 md:py-28"
    >
      <div className="absolute -left-20 -bottom-20 opacity-5  pointer-events-none">
        <Logo light className="h-[360px] w-[360px]" />
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <Eyebrow dark>Get In Touch</Eyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Let's grow your brand.
          </h2>
          <p className="text-neutral-300 max-w-md leading-relaxed">
            Tell us a bit about your brand and what you're looking to grow.
            We'll get back to you within one business day.
          </p>
          <div className="mt-10 flex items-center gap-3 text-neutral-300">
            <Mail size={18} className="text-era-green" />
            <a href="mailto:info@growtheraeg.com" className="text-sm">
              info@growtheraeg.com
            </a>
          </div>
        </div>

        <div className="cut-card border border-neutral-800 bg-neutral-900/60 p-7 md:p-8">
          {status === "success" ? (
            <div className="animate-fade-up flex flex-col items-start gap-3 py-6">
              <CheckCircle2 size={32} className="text-era-green" />
              <p className="font-display font-semibold text-lg">Message sent.</p>
              <p className="text-neutral-400 text-sm">
                Thanks for reaching out — we'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot: hidden from people, bots fill it in */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div>
                <label className="tracked-label text-xs text-neutral-400 mb-2 block">Name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-era-green focus:outline-none text-white placeholder-neutral-500 px-4 py-3 text-sm"
                  placeholder="Your name"
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <label className="tracked-label text-xs text-neutral-400 mb-2 block">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-era-green focus:outline-none text-white placeholder-neutral-500 px-4 py-3 text-sm"
                  placeholder="you@brand.com"
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <label className="tracked-label text-xs text-neutral-400 mb-2 block">Message</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-era-green focus:outline-none text-white placeholder-neutral-500 px-4 py-3 text-sm resize-none"
                  placeholder="What are you looking to grow?"
                  disabled={status === "submitting"}
                />
              </div>

              <div ref={turnstileRef} className="min-h-[65px]" />

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={16} />
                  <span>Something went wrong. Please try again, or email us directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !turnstileToken}
                className="cut tracked-label text-xs inline-flex items-center justify-center gap-2 bg-era-green text-neutral-950 px-6 py-3 font-semibold hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    Sending
                    <Loader2 size={14} strokeWidth={2.5} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
