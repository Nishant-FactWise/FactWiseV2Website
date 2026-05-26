'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { cn } from '@/lib/utils';
import { Check, ArrowRight, X, ChevronRight, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStep {
  title: string;
  description: string;
}

interface PlatformTemplateProps {
  hero: {
    h1: string;
    subheadline: string;
    primaryCTA: { text: string; href: string };
    secondaryCTA: { text: string; href: string };
    visual: React.ReactNode;
  };
  comparison: {
    old: string[];
    new: string[];
  };
  capabilities: {
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
      visual: React.ReactNode;
      className?: string;
    }[];
  };
  workflow: {
    title: string;
    steps: WorkflowStep[];
  };
  features: string[];
  personas?: {
    title: string;
    items: { role: string; quote: string }[];
  };
  relatedModules: { name: string; href: string }[];
  ctaBanner: {
    text: string;
    btnText: string;
    btnHref: string;
  };
}

const SectionContainer = ({ children, className, id, style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) => (
  <section id={id} style={style} className={cn("py-20 md:py-24 px-6 relative", className)}>
    <div className="max-w-6xl mx-auto w-full relative z-10">
      {children}
    </div>
  </section>
);

export default function PlatformTemplate({
  hero,
  comparison,
  capabilities,
  workflow,
  features,
  personas,
  relatedModules,
  ctaBanner
}: PlatformTemplateProps) {

  useEffect(() => {
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  return (
    <main className="bg-[#f6f9fc] text-[#f4f4f5] min-h-screen selection:bg-[#3666ff]/30 selection:text-white font-sans overflow-x-hidden max-w-[1600px] mx-auto">
      
      {/* ── Hero Section (Aligned with Pipe Moodboard) ── */}
      <section className="relative pt-48 pb-20 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-white/[0.05]">
        {/* Pipe Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] bg-[#3666ff]/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 dot-grid opacity-[0.2]" />
          {/* Subtle Grid Lines from Moodboard */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3666ff]/10 border border-[#3666ff]/20 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.25em] mb-10">
                <Zap size={10} className="fill-[#3666ff]" />
                Module Overview
              </div>
              <h1 className="text-4xl md:text-[56px] font-light tracking-tight leading-[1.05] mb-10 text-white">
                {hero.h1}
              </h1>
              <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-lg font-normal">
                {hero.subheadline}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href={hero.primaryCTA.href}
                  className="px-8 py-4 bg-[#3666ff] text-white rounded-xl font-semibold text-sm hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  {hero.primaryCTA.text}
                  <ArrowRight size={16} />
                </a>
                <a 
                  href={hero.secondaryCTA.href}
                  className="px-8 py-4 bg-white/[0.03] border border-white/10 text-white rounded-xl font-semibold text-sm hover:bg-white/[0.08] transition-all"
                >
                  {hero.secondaryCTA.text}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-[#3666ff]/10 blur-[80px] rounded-full scale-90" />
              <div className="relative glass-card rounded-[32px] overflow-hidden aspect-[4/3] shadow-2xl border-white/10">
                <div className="absolute inset-0 noise-bg opacity-[0.05]" />
                {hero.visual}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Comparison Section ── */}
      <SectionContainer className="bg-[#f6f9fc] border-b border-white/[0.05]">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Old Way */}
          <div className="reveal p-10 rounded-[32px] border border-white/5 bg-white/[0.01] group">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-10">Legacy Process</h3>
            <ul className="space-y-6">
              {comparison.old.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-gray-500 font-normal">
                  <div className="mt-2 w-1 h-1 rounded-full bg-red-500/40 shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way */}
          <div className="reveal p-10 rounded-[32px] border border-[#3666ff]/10 bg-[#3666ff]/[0.02] group">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#3666ff] mb-10">Optimized by Factwise</h3>
            <ul className="space-y-6">
              {comparison.new.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-white/80 font-normal">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3666ff] shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* ── Capabilities (Bento) ── */}
      <SectionContainer>
        <div className="max-w-2xl mb-20 reveal">
          <h2 className="text-3xl md:text-[40px] font-light tracking-tight mb-6 text-white leading-tight">{capabilities.title}</h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">{capabilities.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.cards.map((card, i) => (
            <div 
              key={i} 
              className={cn(
                "reveal group glass-card hover:border-[#3666ff]/30 rounded-[24px] overflow-hidden flex flex-col transition-all duration-500",
                card.className
              )}
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-[#0d0d14]">
                <div className="absolute inset-0 noise-bg opacity-[0.03]" />
                {card.visual}
              </div>
              <div className="p-8 relative">
                <h4 className="text-lg font-medium mb-3 text-white">{card.title}</h4>
                <p className="text-xs text-gray-500 font-normal leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── Workflow ── */}
      <SectionContainer className="bg-[#0e0e14]/30 border-y border-white/[0.05]">
        <div className="text-center mb-20 reveal">
          <h2 className="text-3xl font-light tracking-tight text-white">{workflow.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {workflow.steps.map((step, i) => (
            <div key={i} className="reveal flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#3666ff]/50 transition-all duration-500">
                <span className="text-xl font-light text-gray-600 group-hover:text-[#3666ff]">{i + 1}</span>
              </div>
              <h4 className="text-base font-medium text-white mb-3">{step.title}</h4>
              <p className="text-[11px] text-gray-600 font-normal leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── Feature List ── */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto reveal">
          <h3 className="text-2xl font-light mb-12 text-center text-white">Full Feature Overview</h3>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-md bg-[#3666ff]/10 flex items-center justify-center text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-all">
                  <Check size={12} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors font-normal">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* ── Personas ── */}
      {personas && (
        <SectionContainer className="border-t border-white/[0.05]">
          <div className="text-center mb-20 reveal">
            <h2 className="text-3xl font-light tracking-tight text-white">{personas.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {personas.items.map((item, i) => (
              <div key={i} className="reveal group p-10 rounded-[32px] glass-card hover:bg-white/[0.01] transition-all">
                <div className="text-[#3666ff] font-bold uppercase tracking-[0.25em] text-[9px] mb-8">{item.role}</div>
                <p className="text-xl font-light text-white/90 leading-[1.6] italic mb-10">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 opacity-30">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="h-3 w-24 bg-white/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* ── CTA Banner ── */}
      <SectionContainer>
        <div className="reveal glass-card rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center border-[#3666ff]/20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3666ff]/10 via-transparent to-blue-500/5 pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-10 leading-tight">
              {ctaBanner.text}
            </h2>
            <div className="flex justify-center">
              <a 
                href={ctaBanner.btnHref}
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-sm hover:scale-[1.05] transition-transform flex items-center gap-2 shadow-xl shadow-white/5"
              >
                {ctaBanner.btnText}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ── Related Modules ── */}
      <SectionContainer className="border-t border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-600 font-bold uppercase tracking-[0.25em] text-[9px]">Explore Related Modules</div>
          <div className="flex flex-wrap justify-center gap-8">
            {relatedModules.map((module, i) => (
              <a 
                key={i} 
                href={module.href}
                className="text-sm text-gray-500 hover:text-[#3666ff] transition-colors flex items-center gap-2 font-medium"
              >
                {module.name}
                <ChevronRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>

      <FlickeringFooter />
    </main>
  );
}
