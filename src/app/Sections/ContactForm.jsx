"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Lock, ShieldCheck, Clock3, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

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

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required.";

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

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
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  // ── Cloudflare Turnstile state ──────────────────────────────────────────
  // `turnstileToken` is null until the widget finishes its challenge and
  // calls onSuccess. We block submission client-side when it's missing AND
  // re-verify it server-side in app/api/contact/route.js — never trust a
  // client-side check alone.
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef(null);

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
    if (!turnstileToken) {
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
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
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
                      <a href="mailto:hello@northbeam.agency" className="text-trace underline">
                        hello@northbeam.agency
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* NAME */}
                <div>
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jordan Lee"
                    className={`mt-2 w-full rounded-md border bg-surface px-4 py-3 text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-signal ${
                      errors.name ? "border-danger" : "border-line"
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
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jordan@company.com"
                      className={`mt-2 w-full rounded-md border bg-surface px-4 py-3 text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-signal ${
                        errors.email ? "border-danger" : "border-line"
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
                      className={`mt-2 w-full rounded-md border bg-surface px-4 py-3 text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-signal ${
                        errors.phone ? "border-danger" : "border-line"
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
                    Service needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-md border bg-surface px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-signal ${
                      errors.service ? "border-danger" : "border-line"
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
                    Project brief
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={5}
                    value={form.brief}
                    onChange={handleChange}
                    placeholder="What are you trying to achieve, and by when?"
                    className={`mt-2 w-full resize-none rounded-md border bg-surface px-4 py-3 text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-signal ${
                      errors.brief ? "border-danger" : "border-line"
                    }`}
                    aria-invalid={Boolean(errors.brief)}
                    aria-describedby={errors.brief ? "brief-error" : undefined}
                  />
                  {errors.brief && (
                    <p id="brief-error" className="mt-1.5 text-xs text-danger">
                      {errors.brief}
                    </p>
                  )}
                </div>

                {/* ─────────────────────── CLOUDFLARE TURNSTILE ───────────────────────
                    Renders Cloudflare's anti-spam challenge. The package injects its
                    own <script> tag and handles the widget lifecycle — no manual
                    script tag needed. onSuccess fires with a one-time-use token that
                    gets sent to the API route and re-verified server-side. */}
                <div>
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
                  {turnstileError && (
                    <p className="mt-2 text-xs text-danger">
                      Verification failed to load. Refresh the page and try again.
                    </p>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
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
                {!turnstileToken && !isSubmitting && (
                  <p className="text-center text-xs text-muted">
                    Complete the verification above to enable sending.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* ─────────────────────────── TRUST PANEL COLUMN ─────────────────────────── */}
          <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
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
                <a href="mailto:hello@northbeam.agency" className="text-trace underline">
                  hello@northbeam.agency
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
