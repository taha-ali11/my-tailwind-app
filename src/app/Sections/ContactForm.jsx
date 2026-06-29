"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
// npm install @marsidev/react-turnstile lucide-react
import { Lock, ShieldCheck, Clock3, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import Reveal from "../components/Reveal";

// EDIT HERE — dropdown options. Keep these in sync with ServicesGrid.jsx.
const SERVICE_OPTIONS = [
  "Web Development",
  "SEO",
  "Google Ads",
  "Instagram Post Creation",
  "Media Marketing",
  "Something else",
];

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  service: "",
  brief: "",
};

// Lightweight client-side validation — keeps bad submissions from ever
// hitting your API route. Server-side validation still happens in
// app/api/contact/route.js, so don't treat this as the only safety net.
function validate(form) {
  const errors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Enter your full name (at least 2 characters).";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  // Phone is optional, but if provided it should look like a phone number.
  if (form.phone.trim() && !/^[0-9+\-()\s]{7,20}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!form.service) errors.service = "Select the service you need.";

  if (!form.brief.trim()) {
    errors.brief = "Tell us a little about the project.";
  } else if (form.brief.trim().length < 20) {
    errors.brief = "Add a bit more detail (at least 20 characters).";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  // Dynamic message from the API response — shown in the error banner below.
  const [serverMessage, setServerMessage] = useState("");

  // ── Cloudflare Turnstile state ──────────────────────────────────────────
  // `turnstileToken` is null until the widget finishes its challenge and
  // calls onSuccess. We block submission client-side when it's missing AND
  // re-verify it server-side in app/api/contact/route.js — never trust a
  // client-side check alone.
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef(null);

  // True once you've added a real site key to .env.local. Until then, the
  // widget has nothing to render — so instead of silently showing nothing
  // (and blocking the button forever), we show a styled placeholder and let
  // the form submit normally. Flip this on automatically the moment your
  // NEXT_PUBLIC_TURNSTILE_SITE_KEY env var is set — no code change needed.
  const hasTurnstileSiteKey = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const canSubmit = hasTurnstileSiteKey ? Boolean(turnstileToken) : true;

  // Turnstile tokens are single-use and short-lived, so we fetch a fresh one
  // after every submit attempt — whether it succeeded or failed.
  function resetTurnstile() {
    turnstileRef.current?.reset();
    setTurnstileToken(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error the moment the person starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Don't even attempt the request without a completed challenge —
    // the API route enforces this too, but failing fast saves a round trip.
    // (Skipped entirely if Turnstile isn't configured yet — see canSubmit above.)
    if (!canSubmit) {
      setStatus("error");
      setServerMessage("Please complete the verification check before sending.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      // ───────────────────────────────────────────────────────────────
      // EDIT HERE — this is your form submission endpoint.
      // Points at the local route handler in app/api/contact/route.js,
      // which verifies the Turnstile token and sends the email via Resend.
      // ───────────────────────────────────────────────────────────────
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong sending your message.");
      }

      setStatus("success");
      setForm(INITIAL_FORM_STATE);
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "Something went wrong sending your message.");
    } finally {
      resetTurnstile();
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          {/* ─────────────────────────── FORM COLUMN ─────────────────────────── */}
          <Reveal direction="left">
            <div>
              {/* EDIT HERE — section header */}
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-trace">
                Start a project
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">
                Tell us what you're trying to grow.
              </h2>
              <p className="mt-4 max-w-md text-muted">
                One short form. A real person replies within one business day —
                no auto-sequence, no sales-call ambush.
              </p>

              {/* SUCCESS STATE — replaces the form once the request lands */}
              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-8 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="font-medium text-paper">Brief received.</p>
                    <p className="mt-1 text-sm text-muted">
                      We've logged your project and will reply by email within one
                      business day. No spam, no newsletter sign-up — just a reply.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-3 font-mono text-xs uppercase tracking-wider text-trace hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {/* FORM — hidden after a successful submission */}
              {status !== "success" && (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-7">
                  {/* ERROR BANNER — shown only if the request itself failed */}
                  {status === "error" && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/10 p-4"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                      <p className="text-sm text-paper">
                        {serverMessage || "Something went wrong sending your message."} Try
                        again, or email us directly at{" "}
                        {/* EDIT HERE — fallback contact email */}
                        <a href="mailto:hello@DevX.agency" className="text-trace underline">
                          hello@DevX.agency
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  {/* NAME */}
                  <div>
                    <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-muted">
                      Name <span className="text-signal">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jordan Lee"
                      className={`mt-2 h-12 w-full rounded-lg border bg-surface px-4 text-base text-paper placeholder:text-muted/60 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal ${errors.name ? "border-danger" : "border-line"
                        }`}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL + PHONE — paired on one row at desktop width */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted">
                        Email <span className="text-signal">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jordan@company.com"
                        className={`mt-2 h-12 w-full rounded-lg border bg-surface px-4 text-base text-paper placeholder:text-muted/60 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal ${errors.email ? "border-danger" : "border-line"
                          }`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-danger">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="font-mono text-xs uppercase tracking-wider text-muted">
                        Phone <span className="text-muted/60">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`mt-2 h-12 w-full rounded-lg border bg-surface px-4 text-base text-paper placeholder:text-muted/60 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal ${errors.phone ? "border-danger" : "border-line"
                          }`}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-danger">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SERVICE NEEDED — dropdown */}
                  <div>
                    <label htmlFor="service" className="font-mono text-xs uppercase tracking-wider text-muted">
                      Service needed <span className="text-signal">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`mt-2 h-12 w-full rounded-lg border bg-surface px-4 text-base text-paper focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal ${errors.service ? "border-danger" : "border-line"
                        } ${form.service === "" ? "text-muted/60" : ""}`}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "service-error" : undefined}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option} className="text-paper">
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className="mt-1.5 text-xs text-danger">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* PROJECT BRIEF */}
                  <div>
                    <label htmlFor="brief" className="font-mono text-xs uppercase tracking-wider text-muted">
                      Project brief <span className="text-signal">*</span>
                    </label>
                    <textarea
                      id="brief"
                      name="brief"
                      rows={5}
                      maxLength={600}
                      value={form.brief}
                      onChange={handleChange}
                      placeholder="e.g., We need a 5-page site redesign plus ongoing SEO before our Q4 launch."
                      className={`mt-2 min-h-[120px] w-full resize-y rounded-lg border bg-surface px-4 py-3 text-base text-paper placeholder:text-muted/60 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal ${errors.brief ? "border-danger" : "border-line"
                        }`}
                      aria-invalid={Boolean(errors.brief)}
                      aria-describedby={errors.brief ? "brief-error" : "brief-hint"}
                    />
                    {errors.brief && (
                      <p id="brief-error" className="mt-1.5 text-xs text-danger">
                        {errors.brief}
                      </p>
                    )}
                    {/* EDIT HERE — helper copy + live character count, capped at maxLength above */}
                    <div className="mt-1.5 flex items-center justify-between gap-3">
                      <p id="brief-hint" className="text-xs text-muted">
                        Brief but specific — we'll handle the rest.
                      </p>
                      <span className="shrink-0 font-mono text-xs text-muted">
                        {form.brief.length}/600
                      </span>
                    </div>
                  </div>

                  {/* ─────────────────────── CLOUDFLARE TURNSTILE ───────────────────────
                    Renders Cloudflare's anti-spam challenge. The package injects its
                    own <script> tag and handles the widget lifecycle — no manual
                    script tag needed. onSuccess fires with a one-time-use token that
                    gets sent to the API route and re-verified server-side. */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      Security check
                    </span>
                    <div className="mt-2">
                      <Turnstile
                        ref={turnstileRef}
                        // EDIT HERE — paste your Cloudflare Turnstile SITE KEY into
                        // NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local (safe to expose
                        // client-side — it's the public half of the key pair).
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {
                          setTurnstileToken(token);
                          setTurnstileError(false);
                        }}
                        onError={() => {
                          setTurnstileToken(null);
                          setTurnstileError(true);
                        }}
                        onExpire={() => setTurnstileToken(null)}
                        options={{ theme: "dark", size: "flexible" }}
                      />
                    </div>
                    {turnstileError ? (
                      <p className="mt-2 text-xs text-danger">
                        Verification failed to load. Refresh the page and try again.
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted">
                        Protects this form from spam — nothing else is shared.
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !canSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal/90 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send Project Brief"
                    )}
                  </button>

                  {/* EDIT HERE — fallback contact, shown in place of the old
                    "complete verification" notice. Same destination as the
                    other two mailto links in this component. */}
                  <p className="font-mono text-xs text-muted">
                    Prefer email? Reach us directly at{" "}
                    <a
                      href="mailto:hello@DevX.agency"
                      className="text-trace underline transition-colors hover:text-paper"
                    >
                      hello@DevX.agency
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ─────────────────────────── TRUST PANEL COLUMN ─────────────────────────── */}
          <Reveal direction="right" delay={150} className="h-full">
            <div className="h-full rounded-xl border border-line bg-surface p-6 md:p-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
                What happens after you send this
              </h3>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-trace" />
                  <span className="text-sm text-paper">
                    A real reply within <strong className="font-medium">one business day</strong> — never an autoresponder.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-trace" />
                  <span className="text-sm text-paper">
                    NDA available on request before we discuss any specifics.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-trace" />
                  <span className="text-sm text-paper">
                    Your details are used to reply to this enquiry only — never sold, never spammed.
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11px] text-muted">
                  Prefer email? Reach us directly at{" "}
                  {/* EDIT HERE — fallback contact email, repeated for visibility */}
                  <a href="mailto:hello@DevX.agency" className="text-trace underline">
                    hello@DevX.agency
                  </a>
                </p>
              </div>

              {/* NEW — data protection / encryption assurance */}
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Data protection
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-trace" />
                  <p className="text-sm text-paper">
                    Everything you submit here is <strong className="font-medium">encrypted in transit and at rest</strong>.
                    We handle your details under our{" "}
                    {/* EDIT HERE — link to your real Privacy Policy page once it's live */}
                    <a href="/privacy" className="text-trace underline">Privacy Policy</a> and never share them with third parties.
                  </p>
                </div>
              </div>

              {/* NEW — contact-method consent: covers email / message / call,
                and doubles as the "how we'll reach you" disclosure most
                lead forms are missing */}
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Contact preferences
                </p>
                <p className="mt-3 text-sm text-paper">
                  By submitting this form, you agree to let us follow up about your
                  enquiry by <strong className="font-medium">email, text message, or phone call</strong> —
                  whichever you're likely to see first. No marketing lists, no third-party
                  sharing — and you can ask us to stop at any time.
                </p>
              </div>

              {/* EDIT HERE — swap these for real numbers once you have them.
                Mirrors the stat-strip style used in Hero.jsx, so the panel
                doesn't run out of content and trail off into empty space. */}
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  By the numbers
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-mono text-[11px] text-muted">Avg. first reply</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-paper">12 hrs</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-muted">Projects shipped</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-paper">40+</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-muted">Client retention</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-paper">92%</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-muted">Years running</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-paper">5</dd>
                  </div>
                </dl>
              </div>

              {/* EDIT HERE — your guarantee. A concrete, specific promise reads
                as more credible than generic reassurance copy. */}
              <p className="mt-6 border-t border-line pt-5 text-sm text-paper">
                <span className="font-medium">Our promise:</span> if you don't hear back
                within one business day, the next reply comes straight from our founder
                — no exceptions.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}