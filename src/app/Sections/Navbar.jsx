"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react

// EDIT HERE — nav links and labels
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────────────────────────────────
// Custom smooth scroll — the browser's native `scroll-behavior: smooth`
// (set in globals.css) animates, but every browser picks its own speed and
// you can't slow it down from CSS alone. This intercepts the click instead
// and animates the scroll ourselves over a fixed, controllable duration.
//
//   duration       EDIT HERE — higher = slower/smoother, lower = snappier
//   navbarOffset   EDIT HERE — should roughly match the navbar's own height,
//                  so a section's heading doesn't end up tucked behind it
// ─────────────────────────────────────────────────────────────────────────
function smoothScrollTo(hash, duration = 800) {
  const target = document.querySelector(hash);
  if (!target) return;

  const navbarOffset = 72;
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY - navbarOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavClick(event, href) {
    event.preventDefault();
    smoothScrollTo(href);
    setIsOpen(false); // no-op on desktop, closes the mobile panel when open
  }

  return (
    // Note: the navbar deliberately doesn't use the scroll-triggered <Reveal>
    // that every other section uses — it's sticky and visible at the very
    // top of the page before any scrolling happens, so a scroll trigger would
    // just fire instantly. Instead it gets a one-time fade-in on page load
    // (animate-fade-in-down — defined in globals.css).
    <header className="sticky top-0 z-50 animate-fade-in-down border-b border-line bg-ink/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* LOGO — swap this text/SVG for your real logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          <span className="font-display text-lg font-bold tracking-tight text-paper">
            Northbeam<span className="text-signal">.</span>
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => handleNavClick(event, "#contact")}
            className="rounded-md bg-signal px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            Start a Project
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-paper md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE MENU PANEL */}
      {isOpen && (
        <div className="border-t border-line bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="font-mono text-sm uppercase tracking-wider text-muted hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(event) => handleNavClick(event, "#contact")}
              className="rounded-md bg-signal px-4 py-2 text-center font-mono text-xs font-medium uppercase tracking-wider text-ink"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}