import { Code ,Code2, Search, MousePointerClick, Instagram, Megaphone, ArrowUpRight } from "lucide-react";
// npm install lucide-react
import Reveal from "../components/Reveal";

// EDIT HERE — this array is the single source of truth for the services grid.
// Add, remove, or reorder services freely; the layout adjusts automatically.
// "code" mirrors a real catalog/ticket ID (ties into the status-panel concept
// in the hero) rather than implying these are steps in a sequence.
const SERVICES = [
  {
    code: "SVC-01",
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, accessible, production-grade websites built on modern frameworks — not template builders. Designed to convert, built to last.",
  },
  {
    code: "SVC-02",
    icon: Search,
    title: "SEO",
    description:
      "Technical audits, content strategy, and link-building that compound over time. We track rankings the way engineers track uptime.",
  },
  {
    code: "SVC-03",
    icon: MousePointerClick,
    title: "Google Ads",
    description:
      "Search and display campaigns built around real unit economics. Budgets get reallocated weekly, not left to run on autopilot.",
  },
  {
    code: "SVC-04",
    icon: Instagram,
    title: "Instagram Post Creation",
    description:
      "On-brand graphics, carousels, and captions produced on a predictable weekly cadence — so your feed never goes quiet.",
  },
  {
    code: "SVC-05",
    icon: Megaphone,
    title: "Media Marketing",
    description:
      "Cross-channel campaigns that connect your paid, organic, and social efforts into one coherent story instead of five disconnected ones.",
  },
  {
    code: "SVC-06",
    icon: Code,
    title: "WordPress Development",
    description:
      "Custom WordPress solutions that are fast, secure, and easy to manage. We build themes and plugins tailored to your needs.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="border-b border-line bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* SECTION HEADER — EDIT HERE */}
        <Reveal direction="up">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-trace">
            What we run
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">
            Five channels. One accountable team.
          </h2>
          <p className="mt-4 text-muted">
            Most agencies hand you off between specialists. We keep the same
            small team across every channel, so nothing gets lost in translation.
          </p>
        </div>
        </Reveal>

        {/* GRID — first card spans full width on desktop for visual rhythm */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              // EDIT HERE — alternates left/right per card; change the
              // condition below (e.g. always "left", or every 3rd "right")
              // to restyle the cascade. delay staggers each card by 100ms.
              <Reveal
                key={service.code}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="h-full"
              >
                <a
                  href={`#contact`} // EDIT HERE — link to a dedicated /services/[slug] page once built
                  className="group flex h-full flex-col justify-between gap-4 bg-surface p-6 transition-colors hover:bg-surface/60 md:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-wider text-muted">
                        {service.code}
                      </span>
                      <Icon className="h-5 w-5 text-trace" strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-paper">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
