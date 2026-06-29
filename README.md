# Northbeam Digital — Agency Website

Production-ready Next.js (App Router) starter for a web dev + marketing
agency offering Web Development, SEO, Google Ads, Instagram Post Creation,
and Media Marketing.

---

## 1. Site Architecture & UI Strategy

### Sitemap

```
/                     Home — every section below, designed to stand alone
/services             Overview grid (same data as the homepage grid, reused)
/services/[slug]      One SEO-targeted landing page per service
                       (web-development, seo, google-ads,
                        instagram-post-creation, media-marketing)
/work                 Case studies — proof, not just claims
/about                Team, story, how you work
/pricing              Optional — even "starting at $X" ranges reduce drop-off
/blog                 SEO content hub (you sell SEO — this is also the proof)
/contact              Dedicated page embedding the same <ContactForm />
/privacy, /terms      Legal
```

**Why separate `/services/[slug]` pages matter:** each service has different
buyer intent and different keywords. A single "Services" page can't rank for
"google ads agency" and "instagram content agency" at once — five focused
pages can, and each one gives your own Google Ads campaigns a matching
landing page instead of sending paid traffic to the homepage.

### Homepage section order (built in this repo)

1. **Navbar** — sticky, always-visible CTA
2. **Hero** — headline + the "Live Status Panel" signature element
3. **Services Grid** — all five offerings, equal weight
4. **Testimonials** — quantified results, not star ratings
5. **Contact Form** — the conversion event
6. **Footer**

Recommended additions once you have the content: a **Process** section
(this is genuinely sequential, so numbered steps 01–04 are appropriate
there) and a **Case Studies / Work** section with 2–3 deeper stories.

### Rendering & performance strategy

- Built on the **Next.js App Router**. Every section is a **React Server
  Component by default** — zero client-side JS for Hero, ServicesGrid, and
  Testimonials. Only `Navbar` (mobile menu) and `ContactForm` (form state)
  are client components (`"use client"`).
- Fonts load via `next/font/google` — self-hosted, no render-blocking
  third-party font requests.
- Result: a fast Largest Contentful Paint and a small JS bundle, which
  matters both for conversion (speed → lower bounce) and for SEO — and
  doubles as a quiet proof-of-work, since you're selling SEO/performance.

### Conversion strategy

- **Multiple low-friction entry points** to the same form: hero CTA, sticky
  nav CTA, and the dedicated `#contact` section.
- **Only one truly required field set** (name, email, service, brief) —
  phone is optional, which is shown to reduce form abandonment.
- **Trust panel beside the form**, not just inside it: response-time
  promise, NDA availability, and a no-spam statement — addresses the three
  things a wary buyer is silently worried about right before they hit send.
- **Quantified testimonials** (a specific %, not a 5-star icon) read as more
  credible and are harder to dismiss as filler.
- **Service-matched landing pages** (see sitemap above) so paid traffic
  never lands somewhere generic.

---

## 2. Design System

The visual direction leans into what this agency actually does: it runs
client growth channels the way an engineer runs production infrastructure.
The hero's **Live Status Panel** makes that literal — each service appears
as a monitored "channel" with a live indicator, instead of a generic stock
photo or gradient stat card.

| Token | Value | Used for |
|---|---|---|
| `ink` | `#0B0E14` | Page background |
| `surface` | `#121722` | Cards, panels |
| `line` | `#232A38` | Borders, dividers |
| `paper` | `#EDEFF4` | Primary text |
| `muted` | `#8C93A3` | Secondary text |
| `signal` | `#F2B84B` | Primary accent — CTAs, focus rings |
| `trace` | `#5BC8DD` | Secondary accent — links, icons |
| `success` / `danger` | `#4ADE80` / `#F2705A` | Form states only |

**Fonts:** Space Grotesk (display/headlines), Inter (body), JetBrains Mono
(eyebrows, labels, data tags) — set up in `app/layout.jsx`.

**To rebrand:** edit the hex values in `tailwind.config.js`. Every
component references the named colors (`bg-ink`, `text-signal`, etc.), so a
palette change is a one-file edit.

---

## 3. Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the three keys below
npm run dev
```

Then open `http://localhost:3000`.

### Contact form: Turnstile + Resend

The contact form is wired to two services. Fill in `.env.local` with:

| Variable | Where to get it | Used in |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare dashboard → Turnstile | `components/ContactForm.jsx` (client-side widget) |
| `TURNSTILE_SECRET_KEY` | Cloudflare dashboard → Turnstile | `app/api/contact/route.js` (server-side verification) |
| `RESEND_API_KEY` | resend.com/api-keys | `app/api/contact/route.js` (sending the email) |

**How a submission flows:**
1. The Turnstile widget runs its challenge in the browser and calls
   `onSuccess` with a one-time token.
2. The form won't submit without that token (button stays disabled), and
   sends it to `/api/contact` alongside the form fields.
3. The route handler re-verifies the token against Cloudflare's
   `siteverify` endpoint **before doing anything else** — if that fails,
   no email is sent.
4. Only once verification passes does it call `resend.emails.send(...)`.
5. The token is single-use, so the widget resets after every attempt
   (success or failure) to fetch a fresh one for the next try.

**Before going live with Resend:** the `from` address in `route.js` is
currently `onboarding@resend.dev`, which only works for testing. Verify
your own domain in the Resend dashboard and swap it in once you have.

### Before going live (everything else)

1. **Swap placeholder copy** — every section has `EDIT HERE` comments marking
   headline text, the agency name/logo in `Navbar.jsx` and `Footer.jsx`, the
   fallback email in `ContactForm.jsx`, and the stats in `Hero.jsx`.
2. **Replace testimonial placeholders** in `Testimonials.jsx` with real
   client quotes and metrics once you have them.
3. **Build out `/services/[slug]`, `/work`, `/contact`** pages reusing the
   components already built here.
