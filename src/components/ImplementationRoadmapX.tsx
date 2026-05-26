"use client";

// ─── ARCHIVED VERSION ────────────────────────────────────────────────────────
// This is the parallax-scroll version of the Implementation Roadmap section.
// It uses the three animated dashboard components (Phase1, Phase2, Phase3).
// The active version is ImplementationRoadmap.tsx (3-card layout).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef } from "react";
import { CheckCircle2, Rocket, Settings2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollReveal from "./ui/ScrollReveal";
import Phase1SetupAnimation from "./roadmap-animations/Phase1SetupAnimation";
import Phase2AutomationAnimation from "./roadmap-animations/Phase2AutomationAnimation";
import Phase3SavingsAnimation from "./roadmap-animations/Phase3SavingsAnimation";

const roadmapSections = [
  {
    id: 1,
    phase: "Phase 01",
    title: "Discovery & Setup",
    timeline: "2–8 Weeks",
    description: "Launch your digital transformation with expert guidance. We handle the complexity of legacy data migration and role-based configuration.",
    icon: Rocket,
    color: "#3666ff",
    items: [
      "Expert onboarding initialized on Day 1",
      "Seamless legacy data migration & validation",
      "Role-based access & platform configuration",
    ],
  },
  {
    id: 2,
    phase: "Phase 02",
    title: "Operational Excellence",
    timeline: "3–6 Months",
    description: "Replace slow, manual procurement with automated workflows. Gain real-time visibility across your entire global supply chain.",
    icon: Settings2,
    color: "#4f46e5",
    reverse: true,
    items: [
      "Full-scale autonomous procurement approvals",
      "Live real-time visibility across supply chains",
      "Advanced vendor performance tracking",
    ],
  },
  {
    id: 3,
    phase: "Phase 03",
    title: "Measurable Savings",
    timeline: "6–12 Months",
    description: "Realize significant, auditable cost reductions. Data-driven insights surface new savings opportunities and strategic value.",
    icon: TrendingUp,
    color: "#0ea5e9",
    items: [
      "Auditable ROI realization & cost savings",
      "Strategic sourcing & predictive forecasting",
      "Consolidated multi-entity reporting",
    ],
  },
];

const ANIMATIONS = [Phase1SetupAnimation, Phase2AutomationAnimation, Phase3SavingsAnimation];

export default function ImplementationRoadmapX() {
  return (
    <section id="roadmap" className="relative py-12 px-4 md:px-10" style={{ scrollMarginTop: "100px" }}>
      <div className="relative overflow-hidden rounded-[24px] py-24">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 noise opacity-40 pointer-events-none mix-blend-overlay" />
        <div
          className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(54,102,255,0.25) 0%, rgba(54,102,255,0.1) 30%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Rocket className="w-3 h-3" />
                <span>Implementation Journey</span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
                From setup to <span className="italic text-[#3666ff]">measurable savings</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal type="split-words" delay={0.3} stagger={0.01}>
              <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                A structured, high-velocity path to operational transformation — meticulously engineered for enterprise scale.
              </p>
            </ScrollReveal>
          </div>

          {/* Sections */}
          <div className="space-y-0">
            {roadmapSections.map((section, index) => (
              <RoadmapSection key={section.id} section={section} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection({
  section,
  index,
}: {
  section: (typeof roadmapSections)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const AnimComponent = ANIMATIONS[index];

  useGSAP(
    () => {
      if (!ref.current || !contentRef.current || !visualRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { y: 40 },
        {
          y: -40,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        visualRef.current,
        { y: 60, opacity: 0 },
        {
          y: -60,
          opacity: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-[70vh] flex flex-col items-center justify-center gap-12 lg:gap-20 py-16",
        (section as { reverse?: boolean }).reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Content Column */}
      <div ref={contentRef} className="flex-1 max-w-xl space-y-8 w-full">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-[#3666ff] tracking-[0.3em] uppercase">
              {section.phase}
            </span>
            <div className="h-px w-10 bg-blue-100" />
            <span className="text-[11px] font-bold text-slate-400 italic">{section.timeline}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1A1D2E] tracking-tight">
            {section.title}
          </h3>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {section.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 group hover:border-blue-200 transition-colors"
            >
              <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Dashboard Column */}
      <div
        ref={visualRef}
        className="flex-1 w-full max-w-[560px] min-w-0"
        style={{ opacity: 0 }}
      >
        <div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: "1 / 1.04" }}
        >
          <AnimComponent speed={1} />
        </div>
      </div>
    </div>
  );
}
