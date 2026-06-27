"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          <span className="font-display text-lg font-bold tracking-tight text-paper">
            Northbeam<span className="text-signal">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-signal px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            Start a Project
          </a>
        </div>

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

      {isOpen && (
        <div className="border-t border-line bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-muted hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
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
