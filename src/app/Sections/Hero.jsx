import Image from "next/image";
import StatusPanel from "../components/StatusPanel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#8C93A3 1px, transparent 1px), linear-gradient(90deg, #8C93A3 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Reduced padding from py-20 to py-12 and md:py-20 */}
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:items-center md:py-16">
        {/* Left Column */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-trace">
            Web + Growth Agency
          </span>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-paper md:text-5xl">
            We build and run your growth stack like production infrastructure.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Web development, SEO, paid ads, and content — engineered, shipped,
            and monitored under one roof. No vague reports. No black boxes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-md bg-signal px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              Start a Project
            </a>
            <a
              href="#services"
              className="rounded-md border border-line px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:border-trace hover:text-trace"
            >
              View Services
            </a>
          </div>

          <dl className="mt-12 flex gap-8 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Launched</dt>
              <dd className="font-display text-xl font-bold text-paper">40+ sites</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Avg. response</dt>
              <dd className="font-display text-xl font-bold text-paper">&lt; 24h</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Channels run</dt>
              <dd className="font-display text-xl font-bold text-paper">5</dd>
            </div>
          </dl>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          {/* Image */}
          <div className="relative w-full max-w-xs overflow-hidden rounded-xl">
            <Image
              src="/assets/heroimage.Webp"
              alt="Dashboard preview showing growth stack status"
              width={400}
              height={300}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          {/* Status Panel */}
          <StatusPanel />
        </div>
      </div>
    </section>
  );
}