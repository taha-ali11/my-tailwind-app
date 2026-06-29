"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Reveal — wrap any block of content in <Reveal> and it animates into view
// the first time it scrolls into the viewport. This is the ONE animation
// engine used by every section — edit the values in this file and every
// section updates at once.
//
//   direction   "up" | "left" | "right" | "none"  — which side it enters from
//   delay       stagger in ms, e.g. delay={index * 100} for cascading cards
//   className   passed through to the wrapper div (e.g. "h-full" inside a grid)
//
// Built on IntersectionObserver + a CSS transition, NOT CSS scroll-timelines —
// this is the more widely-supported, more predictable approach across browsers.
// Animates once per page load; scrolling back up and down won't re-trigger it.
// ─────────────────────────────────────────────────────────────────────────
export default function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect "reduce motion" — show content immediately, skip the animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only ever animate in once
        }
      },
      {
        threshold: 0.15, // fires once 15% of the element is on screen
        rootMargin: "0px 0px -60px 0px", // fires slightly before it reaches the very bottom edge
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // EDIT HERE — how far (in Tailwind spacing units) each direction travels
  // before settling into place. Smaller = subtler, larger = more dramatic.
  const hiddenPosition = {
    up: "translate-y-10",
    left: "-translate-x-12",
    right: "translate-x-12",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        // EDIT HERE — animation speed/easing. 700ms ease-out reads as smooth
        // without feeling slow; transition-[opacity,transform] (rather than
        // transition-all) keeps this from ever touching unrelated properties.
        "transition-[opacity,transform] duration-700 ease-out",
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenPosition}`,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
