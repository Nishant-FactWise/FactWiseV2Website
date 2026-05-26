"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import {
  AnimatedBotIcon,
  AnimatedTrendingUpIcon,
  AnimatedZapIcon,
  AnimatedSearchCheckIcon,
  AnimatedBrainCircuitIcon,
  AnimatedLightbulbIcon,
} from "@/components/ui/animated-icons";

/* ─── Feature data ─── */
const features = [
  {
    icon: AnimatedTrendingUpIcon,
    title: "Increased Savings.",
    description:
      "Stop sourcing in silos. FactWise combines requisitions for the same item automatically — unlocking volume advantage and driving costs down before negotiations even begin.",
    href: "#",
  },
  {
    icon: AnimatedZapIcon,
    title: "Procure Faster.",
    description:
      "From first requisition to final PO in half the time — every bottleneck eliminated, every step automated.",
    href: "#",
  },
  {
    icon: AnimatedBotIcon,
    title: "Negotiate Using AI.",
    description:
      "AI-powered auto-negotiations drive vendors to their best price automatically — without your team sending a single message.",
    href: "#",
  },
  {
    icon: AnimatedLightbulbIcon,
    title: "Automated Pricing.",
    description:
      "Historical rates, contract prices, and market data surfaced automatically — so you always know the best price before you even start sourcing.",
    href: "#",
  },
  {
    icon: AnimatedSearchCheckIcon,
    title: "Complete Visibility.",
    description:
      "Every requisition, every approval, every PO — tracked in real time from start to finish. Complete visibility across the entire procurement journey, always.",
    href: "#",
  },
  {
    icon: AnimatedBrainCircuitIcon,
    title: "AI-Powered Efficiency.",
    description:
      "From item import to vendor allocation — FactWise's AI handles the repetitive, time-consuming work automatically so your team focuses on decisions, not data entry.",
    href: "#",
  },
];

/* ─── Single card with mouse-tracking glow & micro-interactions ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  comingSoon,
  index,
}: {
  icon: React.ComponentType<{ isHovered: boolean }>;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position (relative to card)
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smoothed for buttery glow
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, rgba(54,102,255,0.02), transparent 60%)`;
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${smoothX}px ${smoothY}px, rgba(54,102,255,0.12), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col bg-white p-8 lg:p-9 overflow-hidden isolate rounded-2xl border border-slate-200/70 shadow-[0_4px_24px_-14px_rgba(15,23,42,0.12)] transition-colors duration-300"
      style={
        index % 2 === 1
          ? {
              background:
                "radial-gradient(circle at top left, rgba(54,102,255,0.13), transparent 48%), radial-gradient(circle at bottom right, rgba(54,102,255,0.13), transparent 48%), #ffffff",
            }
          : undefined
      }
    >
      {/* Animated border glow — sits on the card edge using a mask */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: borderGlow,
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Soft radial glow that follows cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowBackground }}
      />

      {/* Top accent line — sweeps in on hover */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3666ff] to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-out"
      />

      {/* Top row: numbered prefix + icon */}
      <div className="relative z-10 mb-7 flex items-start justify-between">
        <motion.div
          whileHover={{ scale: 1.05, rotate: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative"
        >
          <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 text-[#3666ff] ring-1 ring-blue-100 group-hover:ring-[#3666ff]/30 transition-all duration-300 overflow-hidden">
            {/* Sweep highlight on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-[900ms] ease-out"
            />
            <Icon isHovered={isHovered} />
          </div>
          {/* Subtle dashed orbit ring on hover */}
          <span
            aria-hidden
            className="absolute -inset-1.5 rounded-2xl border border-dashed border-[#3666ff]/25 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500"
          />
        </motion.div>

        <span
          className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-[#3666ff] tracking-[0.2em] transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative z-10 text-[17px] font-semibold text-[#0D1117] mb-3 leading-snug tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>

      <p
        className="relative z-10 text-sm text-slate-500 leading-relaxed flex-1 group-hover:text-slate-600 transition-colors duration-300"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {description}
      </p>

      {/* Footer */}
      {comingSoon && (
        <div className="relative z-10 mt-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-75 animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-slate-400" />
            </span>
            Coming soon
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function ReqToPoFeatures() {
  return (
    <section className="relative w-full bg-white py-28 overflow-hidden">
      {/* Decorative dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-6 shadow-[0_1px_2px_rgba(54,102,255,0.08)]"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#3666ff] opacity-75 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#3666ff]" />
              </span>
              Core Capabilities
            </motion.div>

            <h2
              className="text-[36px] md:text-[48px] font-semibold text-[#0D1117] mb-5 tracking-[-0.03em] leading-[1.1] max-w-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Powerful Features.{" "}
              <span className="text-[#3666ff]">
                Right Where You Need Them.
              </span>
            </h2>

           
          </div>

          {/* Right-side meta count */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-3 shrink-0"
          >
            <div className="flex flex-col items-end">
              <span
                className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {String(features.length).padStart(2, "0")} capabilities
              </span>
              <span
                className="text-[10px] font-mono text-slate-300 tracking-wider mt-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                · scroll to explore ·
              </span>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Grid — bordered cards with shared borders */}
      <div className="relative mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
