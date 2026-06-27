// EDIT HERE — links, legal pages, and social handles.
const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          <span className="font-display text-sm font-bold text-paper">
            Northbeam Digital
          </span>
        </div>

        <nav className="flex flex-wrap gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-muted hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} Northbeam Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
