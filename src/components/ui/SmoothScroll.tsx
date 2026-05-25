'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ScrollSmoother was making the page lerp scroll position, which felt
// "stuck" past the second parallax section once GSAP ScrollTriggers and
// framer-motion useScroll subscribers stacked up. Native scroll + the
// per-section animations is significantly snappier, especially on
// Windows / Edge / lower-power devices. Keeping the component as a
// no-op wrapper so existing imports & DOM structure remain stable.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
