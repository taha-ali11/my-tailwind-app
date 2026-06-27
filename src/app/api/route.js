// app/api/contact/route.js
//
// Two-step handler:
//   Step A — verify the Cloudflare Turnstile token. Stop immediately if it fails.
//   Step B — only if Step A passed, send the enquiry email through Resend.
//
// Both steps fail closed: any error returns success: false and nothing is sent.

import { Resend } from "resend";
// npm install resend

// EDIT HERE — paste your Resend API key into RESEND_API_KEY in .env.local
// (server-only — never prefix this one with NEXT_PUBLIC_).
const resend = new Resend(process.env.RESEND_API_KEY);

// This is Cloudflare's real verification endpoint. (Note: the prompt referenced
// "cloudflare.com" generically — the actual API lives at challenges.cloudflare.com.)
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ───────────────────────────────────────────────────────────────────────────
// STEP A — Cloudflare Turnstile verification
// ───────────────────────────────────────────────────────────────────────────
async function verifyTurnstileToken(token, remoteIp) {
  const params = new URLSearchParams();
  // EDIT HERE — paste your Turnstile SECRET KEY into TURNSTILE_SECRET_KEY in
  // .env.local (server-only — this one must never reach the browser).
  params.append("secret", process.env.TURNSTILE_SECRET_KEY);
  params.append("response", token);
  if (remoteIp) params.append("remoteip", remoteIp);

  const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  // Cloudflare returns { success: boolean, "error-codes": [...], ... }
  return verifyResponse.json();
}

// Minimal HTML-escaping so submitted text can't break out of the email markup.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, service, brief, turnstileToken } = body;

  // ── Field validation — defense in depth; the form already checks this ──
  if (!name || !email || !service || !brief) {
    return Response.json(
      { success: false, message: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return Response.json(
      { success: false, message: "Invalid email address." },
      { status: 400 }
    );
  }
  if (!turnstileToken) {
    return Response.json(
      { success: false, message: "Missing verification token." },
      { status: 400 }
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // STEP A — Verify the token with Cloudflare BEFORE doing anything else.
  // If this fails for any reason, stop here — never send the email.
  // ───────────────────────────────────────────────────────────────────────
  const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  let turnstileResult;
  try {
    turnstileResult = await verifyTurnstileToken(turnstileToken, remoteIp);
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return Response.json(
      { success: false, message: "Could not verify you're human right now. Please try again." },
      { status: 502 }
    );
  }

  if (!turnstileResult.success) {
    console.warn("Turnstile verification rejected:", turnstileResult["error-codes"]);
    return Response.json(
      { success: false, message: "Verification failed. Please retry the challenge and resend." },
      { status: 403 }
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // STEP B — CAPTCHA passed. Dispatch the notification email via Resend.
  // ───────────────────────────────────────────────────────────────────────
  try {
    const { data, error } = await resend.emails.send({
      // EDIT HERE — Resend requires "from" to be on a domain you've verified
      // in the Resend dashboard. "onboarding@resend.dev" only works for testing.
      from: "Northbeam Website <onboarding@resend.dev>",
      // EDIT HERE — the inbox that should receive new project enquiries
      to: ["hello@northbeam.agency"],
      // Lets you hit "Reply" in your inbox and respond straight to the lead
      replyTo: email,
      subject: `New project enquiry — ${service} (${name})`,
      html: `
        <h2>New project enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(brief).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Verification passed, but the email failed to send." },
        { status: 502 }
      );
    }

    return Response.json({ success: true, message: "Brief received.", id: data?.id });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return Response.json(
      { success: false, message: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
