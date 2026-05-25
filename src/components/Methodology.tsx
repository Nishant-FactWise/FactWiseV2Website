"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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

  // N panels share N-1 transitions. Snap points are spread evenly across the whole
  // [0,1] range (last panel lands at progress 1.0) so there is no dead scroll tail.
  const segments = pages.length - 1;
  const snapPoints = pages.map((_, i) => i / segments); // e.g. [0, 1/3, 2/3, 1]

  useGSAP(() => {
    if (!containerRef.current) return;

    let lastPage = 1;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
<<<<<<< Updated upstream
      // ~0.85 viewport of scroll per transition (was 1.25vh per panel + a dead
      // 1.25vh tail). Advancing to the next feature is now one short flick.
      end: () => `+=${segments * 85}%`,
      pin: true,
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
=======
      // Was (pages.length + 1) * 100% = 500vh which left a 150vh dead zone
      // after the last page where the section stayed pinned but nothing
      // changed on screen — that's the "scroll stuck after Collaborate
      // Seamlessly" feeling. Now one viewport per page, exactly.
      end: () => `+=${pages.length * 100}%`,
      pin: true,
      // Scrub 1 added a 1s lerp on top of native scroll — felt sluggish.
      // 0.3 keeps a subtle smoothing without the lag.
      scrub: 0.3,
      onUpdate: (self) => {
        const progress  = self.progress;
        const direction = self.direction;

        // Equal quarters now that the pin distance is pages.length × 100vh.
        // Small hysteresis on the reverse direction prevents flicker.
        let page: number;
        if (direction === 1) {
          if      (progress < 0.25) page = 1;
          else if (progress < 0.50) page = 2;
          else if (progress < 0.75) page = 3;
          else                      page = 4;
        } else {
          if      (progress < 0.18) page = 1;
          else if (progress < 0.43) page = 2;
          else if (progress < 0.68) page = 3;
          else                      page = 4;
        }

>>>>>>> Stashed changes
        if (page !== lastPage) {
          lastPage = page;
          setCurrentPage(page);
        }
      },
      snap: {
<<<<<<< Updated upstream
        snapTo: snapPoints,
        duration: { min: 0.2, max: 0.4 },
        delay: 0.05,
=======
        // Added 1.0 so the section snaps cleanly out after the last page
        // instead of dragging through any leftover pixels.
        snapTo: [0, 0.25, 0.50, 0.75, 1.0],
        duration: { min: 0.15, max: 0.4 },
        delay: 0.1,
>>>>>>> Stashed changes
        ease: "power1.inOut",
        directional: true,
      },
      fastScrollEnd: true,
      preventOverlaps: true,
      anticipatePin: 1,
    });

    return () => { scrollTriggerRef.current?.kill(); };
  }, { scope: containerRef });

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

      {/* Scroll adventure */}
      <div ref={containerRef} className="relative overflow-hidden h-screen bg-white">
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

          // Only mount the animation component when this panel is active (or adjacent for pre-loading)
          const shouldMountAnimation = Math.abs(currentPage - idx) <= 1;

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
    </section>
  );
}
