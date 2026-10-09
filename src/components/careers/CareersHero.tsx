'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { withoutLongDashes } from '@/lib/display-text';

export const CareersHero = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => withoutLongDashes(messages[locale].textMap[source] ?? source);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/careers/hero-bg.png" 
          alt={t("FactWise Office")} 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-md sm:mb-8"
        >
          {t("Join Our Mission")}
        </motion.div>

        <motion.h1
          className="mb-6 py-2 text-[clamp(2.35rem,11vw,3.75rem)] font-bold leading-[1.06] tracking-tighter text-white sm:text-6xl md:mb-10 md:text-8xl"
        >
          <span className="inline-block overflow-hidden">
          {t("Careers at ").split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          </span>
          <span className="text-[#3666ff] font-instrument italic font-medium inline-block overflow-hidden">
            {"FactWise".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: (index + 11) * 0.02 
                }}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mb-8 max-w-3xl text-justify text-[15px] font-light leading-7 text-white/75 sm:text-xl md:mb-12 md:text-2xl"
        >
          {t("We're committed to boosting your potential and powering your journey. Redefine your limits and make visible impact.")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3666ff] px-6 py-3 text-sm font-bold text-white shadow-[0_20px_50px_rgba(54,102,255,0.4)] transition-all md:text-base"
        >
          {t("Explore Open Roles")}
        </motion.button>
      </div>

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-950 to-transparent z-1 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-slate-950 to-transparent z-1 pointer-events-none" />
    </section>
  );
};
