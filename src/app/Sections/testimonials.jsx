// EDIT HERE — swap in real client testimonials as you collect them.
// "metric" is optional but recommended: a single quantified result reads as
// more credible than a star rating, and it's consistent with the site's
// data/dashboard visual language.
import Reveal from "../components/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "They rebuilt our site and took over SEO in the same month. Organic traffic overtook paid within a quarter — something our last two agencies never managed.",
    name: "Sarah Mitchell",
    role: "Founder, Lumen Skincare",
    metric: "+186% organic traffic",
  },
  {
    quote:
      "What stood out was the reporting. Every week we get a real number, not a deck full of vanity metrics. Our ad spend finally makes sense.",
    name: "David Okafor",
    role: "Marketing Lead, Forge Outdoor",
    metric: "-34% cost per lead",
  },
  {
    quote:
      "Our Instagram went from sporadic to genuinely on-schedule. Engagement followed almost immediately, and it freed up hours of my week.",
    name: "Priya Anand",
    role: "Owner, Anand & Co. Studio",
    metric: "+2.4x engagement rate",
  },
];

// Generates initials for the avatar circle — no stock headshots required.
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* SECTION HEADER — EDIT HERE */}
        <Reveal direction="up">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-trace">
            Client results
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">
            Outcomes, in their own words.
          </h2>
        </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            // EDIT HERE — delay={index * 120} staggers each card in after the
            // last; all three rise from below rather than left/right since
            // they're equal-weight items in a row (alternating sides reads
            // oddly when there's no clear "pairing" — reserve left/right for
            // grids like ServicesGrid where each item is visually distinct).
            <Reveal key={testimonial.name} direction="up" delay={index * 120} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-xl border border-line bg-ink p-6">
                <blockquote className="text-sm leading-relaxed text-paper">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <figcaption className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-trace/15 font-mono text-xs font-medium text-trace">
                      {getInitials(testimonial.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-paper">
                        {testimonial.name}
                      </span>
                      <span className="block text-xs text-muted">{testimonial.role}</span>
                    </span>
                  </figcaption>

                  {testimonial.metric && (
                    <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[11px] text-success">
                      {testimonial.metric}
                    </span>
                  )}
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
