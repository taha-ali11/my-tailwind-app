import { Building2, Leaf, Mountain, Palette, Landmark, Home, HeartPulse, Coffee } from "lucide-react";
// npm install lucide-react
import Reveal from "../components/Reveal";

// EDIT HERE — these are placeholder "client" marks, not real logos. I can't
// reproduce anyone's actual branding without permission, so each one is a
// simple icon + wordmark in your own design system instead — a common,
// honest stand-in until you have real signed-off client logos to drop in.
// "Lumen Skincare", "Forge Outdoor", and "Anand & Co. Studio" are reused
// from Testimonials.jsx so the clients you're showing stay consistent
// across the site. `accent` alternates between your two brand accents.
const PARTNERS = [
  { name: "American ASK4 Logistics", icon: Building2, accent: "text-trace" },
  { name: "Lumen Skincare", icon: Leaf, accent: "text-signal" },
  { name: "Forge Outdoor", icon: Mountain, accent: "text-trace" },
  { name: "Anand & Co. Studio", icon: Palette, accent: "text-signal" },
  { name: "Cedarline Finance", icon: Landmark, accent: "text-trace" },
  { name: "Northfield Realty", icon: Home, accent: "text-signal" },
  { name: "Vela Health", icon: HeartPulse, accent: "text-trace" },
  { name: "Driftwood Coffee Co.", icon: Coffee, accent: "text-signal" },
];

function PartnerMark({ name, icon: Icon, accent }) {
  return (
    // group/mark — a NAMED group scope so each logo reveals its own color
    // independently on hover, separate from the outer group that pauses
    // the whole marquee.
    <div className="group/mark flex shrink-0 items-center gap-2.5 px-8">
      <Icon
        className={`h-5 w-5 ${accent} grayscale opacity-50 transition-all duration-300 group-hover/mark:grayscale-0 group-hover/mark:opacity-100`}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap font-display text-base font-semibold text-muted transition-colors duration-300 group-hover/mark:text-paper">
        {name}
      </span>
    </div>
  );
}

export default function TrustedPartners() {
  return (
    <section className="border-b border-line bg-surface py-14">
      <Reveal direction="up">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Trusted by teams at
          </p>
        </div>

        {/* MARQUEE TRACK
            The partner list is rendered twice back-to-back, then the track
            is animated exactly -50% of its own width — since that's the
            width of ONE full set, the second copy lines up perfectly with
            where the first one started, so the loop has no visible seam.
            `group` here pauses the scroll on hover so a name can be read;
            the mask gradient fades both edges so logos don't hard-cut. */}
        <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <PartnerMark key={`${partner.name}-${index}`} {...partner} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}