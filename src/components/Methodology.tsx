"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, BarChart3, Users, Scale, Calculator } from 'lucide-react';
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

// ── Lazy-load each animation — only the active one is ever in the bundle chunk
const ScaleAnimation          = dynamic(() => import('./methodology-animations/ScaleAnimation'),          { ssr: false });
const CustomFormulaAnimation  = dynamic(() => import('./methodology-animations/CustomFormulaAnimation'),  { ssr: false });
const AnalyticsAnimation      = dynamic(() => import('./methodology-animations/AnalyticsAnimation'),      { ssr: false });
const CollaborationAnimation  = dynamic(() => import('./methodology-animations/CollaborationAnimation'),  { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const pages = [
  {
    id: 1,
    title: "Configure Anything",
    description: "Configure approval chains, custom fields, cost formulas, and event templates independently without writing code or waiting on IT. FactWise bends to how you run your business, giving your team full control of every workflow from day one.",
    details: [
      "Your Business. Your Rules. No IT Required.",
      "Configure approval hierarchies by amount, vendor type, or item tags.",
      "Build custom formulas and watch them apply automatically.",
      "Your system. Your way. From day one."
    ],
    icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    Animation: CustomFormulaAnimation,
    color: '#4A6FFF'
  },
  {
    id: 2,
    title: "Scale Effortlessly",
    description: "Manage direct materials, indirect procurement, and complex BOMs at any volume without multiplying the workload. FactWise automates routine tasks, combined requisitions, and bid analysis so your team focuses on decisions, not data entry.",
    details: [
      "More Volume. More Complexity. Same Simplicity.",
      "Alternate items per line and bulk imports.",
      "Multi-requisition combining for better pricing.",
      "More vendors. More items. Same effort."
    ],
    icon: <Scale className="w-6 h-6 text-blue-500" />,
    Animation: ScaleAnimation,
    color: '#00b884'
  },
  {
    id: 3,
    title: "AI Powered Analytics",
    description: "Make informed awards and protect your margins with real-time bid intelligence, historical pricing, and vendor performance metrics. FactWise delivers instant spend visibility and live KPIs exactly when and where you need them.",
    details: [
      "The Right Data. At Every Decision Point.",
      "Real-time bid intelligence and historical pricing.",
      "Live KPIs and spend visibility for stakeholders.",
      "Stop guessing. Start knowing."
    ],
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    Animation: AnalyticsAnimation,
    color: '#f59e0b'
  },
  {
    id: 4,
    title: "Collaborate Seamlessly",
    description: "Procurement doesn't happen in one team. FactWise connects every stakeholder in one place — each team works in their own module, with their own permissions, but everything stays connected. And vendors aren't outside the process — they bid, negotiate, and track payments on the same platform.",
    details: [
      "Every Team. Every Vendor. One Platform.",
      "Each module, each role, each permission — kept in context.",
      "Vendors bid, raise invoices, and track payments inside.",
      "No handoff emails. No spreadsheet versions. Real-time."
    ],
    icon: <Users className="w-6 h-6 text-blue-500" />,
    Animation: CollaborationAnimation,
    color: '#8b5cf6'
  }
];

export default function MethodologySection() {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef    = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // The pinned split-screen is a desktop interaction. Below lg (1024px) we render a
  // plain vertical stack instead, so both the copy and the animation show for every
  // feature. This component is dynamically imported with ssr:false, so reading
  // matchMedia in the initializer is safe (no SSR/hydration mismatch).
  const [isDesktop, setIsDesktop] = useState(
    () => (typeof window === 'undefined' ? true : window.matchMedia('(min-width: 1024px)').matches)
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // N panels share N-1 transitions. Snap points are spread evenly across the whole
  // [0,1] range (last panel lands at progress 1.0) so there is no dead scroll tail.
  const segments = pages.length - 1;
  const snapPoints = pages.map((_, i) => i / segments); // e.g. [0, 1/3, 2/3, 1]

  useGSAP(() => {
    if (!isDesktop || !containerRef.current) return;

    let lastPage = 1;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      // ~0.85 viewport of scroll per transition (was 1.25vh per panel + a dead
      // 1.25vh tail). Advancing to the next feature is now one short flick.
      end: () => `+=${segments * 85}%`,
      pin: true,
      pinType: "transform",
      // Small scrub only — nothing is continuously tied to scroll here (panels swap
      // at discrete thresholds), so a large scrub is pure dead-time: you scroll, then
      // ~1s later the panel moves. 0.3 keeps it smooth but responsive.
      scrub: 0.3,
      onUpdate: (self) => {
        // Round progress to the nearest panel so the active panel and the snap
        // target always agree — no lingering between snaps.
        const page = Math.min(
          pages.length,
          Math.max(1, Math.round(self.progress * segments) + 1)
        );
        if (page !== lastPage) {
          lastPage = page;
          setCurrentPage(page);
        }
      },
      snap: {
        snapTo: snapPoints,
        duration: { min: 0.2, max: 0.4 },
        delay: 0.05,
        ease: "power1.inOut",
        directional: true,
      },
      fastScrollEnd: true,
      preventOverlaps: true,
      anticipatePin: 1,
    });

    return () => { scrollTriggerRef.current?.kill(); };
  }, { scope: containerRef, dependencies: [isDesktop] });

  const handleDotClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const targetScroll = st.start + (st.end - st.start) * snapPoints[index];
    gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: "power2.inOut" });
  };

  return (
    <section className="bg-white relative" id="how-it-works">
      {/* Static header */}
      <div className="max-w-7xl mx-auto px-8 lg:px-24 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center flex flex-col items-center mb-6"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            HOW WE DO IT
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
            Stop Adapting to Your Software.<br />
            <span className="text-[#3666ff]"> It Should Adapt to You.</span>
          </h2>
        </motion.div>
      </div>

      {/* DESKTOP (lg+): pinned split-screen scroll experience.
          Always mounted, just CSS-hidden below lg — never unmounted by React. While
          ScrollTrigger's pin is active it wraps this node in a pin-spacer (re-parenting
          it), so unmounting it from React throws "removeChild ... not a child of this
          node". The pin is created/reverted by the useGSAP hook (gated on isDesktop). */}
      {/* backfaceVisibility+translate3d: gives this element its own stable
          compositing layer so the ScrollTrigger pin counter-transform and the
          ScrollSmoother parent transform share the same sub-pixel rounding
          origin — eliminates the 1-px flicker on Windows 125 % DPI screens. */}
      <div
        ref={containerRef}
        className="relative hidden h-screen overflow-hidden bg-white lg:block"
        style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
      >
        {pages.map((page, i) => {
          const idx      = i + 1;
          const isActive = currentPage === idx;
          const isBefore = idx < currentPage;

          const leftTrans  = isActive ? 'translateY(0)' : isBefore ? 'translateY(-100%)' : 'translateY(100%)';
          const rightTrans = isActive ? 'translateY(0)' : isBefore ? 'translateY(100%)'  : 'translateY(-100%)';
          const isLeftText = idx % 2 !== 0;

          const textPanel = (border: string, bg: string) => {
            const isWhitePanel = bg.includes("white") || bg.includes("slate-50");
            const cardBg = isWhitePanel ? "bg-[#F8FAFF] border-blue-50/50" : "bg-white border-slate-100/80";
            return (
              <div className={cn("w-full h-full flex flex-col justify-center p-8 lg:p-24 relative overflow-hidden", bg, border)}>
                {/* Giant elegant watermark slide number */}
                <div className="absolute right-8 top-8 lg:right-16 lg:top-16 text-7xl lg:text-9xl font-black text-slate-500/5 pointer-events-none select-none font-mono tracking-tighter">
                  0{idx}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-5 leading-tight bg-gradient-to-r from-[#0b1322] to-[#3666ff] bg-clip-text text-transparent relative z-10">
                  {page.title}
                </h3>
                
                <p className="text-base lg:text-lg mb-8 leading-relaxed text-slate-600 max-w-xl relative z-10">
                  {page.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {page.details.map((detail, dIdx) => (
                    <div 
                      key={dIdx} 
                      className={cn(
                        "flex items-start gap-3.5 p-4 rounded-xl border shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default",
                        cardBg
                      )}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium leading-relaxed text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          };

          // Only mount the animation when this panel is active (or adjacent, for
          // pre-loading) — and only on desktop, where this block is visible. The mobile
          // stack below renders its own animations.
          const shouldMountAnimation = isDesktop && Math.abs(currentPage - idx) <= 1;

          const animPanel = (
            <div className="w-full h-full relative overflow-hidden">
              {shouldMountAnimation && <page.Animation />}
            </div>
          );

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left Half */}
              <div
                className="absolute top-0 left-0 w-full lg:w-1/2 h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: leftTrans }}
              >
                {isLeftText
                  ? textPanel("border-r", (idx === 2 || idx === 4) ? "bg-[#F8FAFF] border-slate-100" : "bg-white border-slate-50")
                  : animPanel}
              </div>

              {/* Right Half */}
              <div
                className="absolute top-0 right-0 lg:left-1/2 w-full lg:w-1/2 h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: rightTrans }}
              >
                {!isLeftText
                  ? textPanel("border-l", (idx === 2 || idx === 4) ? "bg-[#F8FAFF] border-slate-100" : "bg-slate-50 border-slate-100")
                  : animPanel}
              </div>
            </div>
          );
        })}

        {/* Dot nav */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-3">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'bg-blue-600 scale-150' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET (<lg): plain vertical stack so BOTH the copy and the
          animation are visible for every feature — the pinned split-screen above
          overlaps its two halves on narrow screens and hides one of them. Always
          mounted, CSS-hidden at lg+. */}
      <div className="flex flex-col gap-5 px-4 pb-16 sm:px-6 lg:hidden">
        {pages.map((page, i) => (
          <MobileFeature key={page.id} page={page} idx={i + 1} />
        ))}
      </div>
    </section>
  );
}

// The methodology dashboards are authored at a fixed ~700×580 canvas. On phones that
// canvas is wider than the screen, so the inner dashboard used to clip on the right.
// We render it at its native size and CSS-scale the whole thing down to fit the
// available width — the dashboard stays proportional, just smaller. Desktop is
// unaffected (this component only renders on the mobile/tablet branch).
const ANIM_DESIGN_W = 700;
const ANIM_DESIGN_H = 580;

function MobileFeature({ page, idx }: { page: (typeof pages)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // Mount the (looping) animation only while the card is near the viewport, so four
  // animations don't all run off-screen at once and drag on mobile.
  const inView = useInView(ref, { margin: '200px 0px' });

  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const apply = () => setScale(Math.min(1, el.clientWidth / ANIM_DESIGN_W));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
    >
      {/* Copy */}
      <div className="relative p-6 sm:p-8">
        <div className="pointer-events-none absolute right-5 top-4 select-none font-mono text-6xl font-black tracking-tighter text-slate-500/[0.05]">
          0{idx}
        </div>
        <h3 className="relative z-10 mb-4 bg-gradient-to-r from-[#0b1322] to-[#3666ff] bg-clip-text text-2xl font-extrabold leading-tight tracking-tight text-transparent sm:text-3xl">
          {page.title}
        </h3>
        <p className="relative z-10 mb-6 text-base leading-relaxed text-slate-600">
          {page.description}
        </p>
        <div className="relative z-10 grid grid-cols-1 gap-3">
          {page.details.map((detail, dIdx) => (
            <div
              key={dIdx}
              className="flex items-start gap-3 rounded-xl border border-blue-50/60 bg-[#F8FAFF] p-3.5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium leading-relaxed text-slate-700">
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animation — rendered at its native canvas size, then scaled to fit width. */}
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden border-t border-slate-100 bg-slate-50/50"
        style={{ height: scale ? ANIM_DESIGN_H * scale : 360 }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: ANIM_DESIGN_W,
            height: ANIM_DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {scale > 0 && inView && <page.Animation />}
        </div>
      </div>
    </div>
  );
}
