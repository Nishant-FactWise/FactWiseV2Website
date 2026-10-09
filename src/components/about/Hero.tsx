'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getPathLocale, localizePath } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { withoutLongDashes } from '@/lib/display-text';

export const Hero = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => withoutLongDashes(messages[locale].textMap[source] ?? source);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/group-diverse-people-having-business-meeting.jpg"
          alt={t("FactWise Team")}
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <motion.h1
          className="mb-6 overflow-hidden py-2 text-[clamp(2rem,10vw,3rem)] font-bold leading-[1.08] tracking-tighter text-white sm:mb-8 sm:text-5xl lg:text-6xl"
        >
          {t("One Platform.").split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {t("Every Team. Every Workflow.")}
          </motion.span>
          <br />
          <span className="text-[#3666ff] font-instrument italic font-medium inline-block">
            {t("Every Step.").split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.55 + index * 0.03,
                }}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mb-8 max-w-3xl text-justify text-[15px] font-light leading-7 text-white/75 sm:mb-10 sm:text-lg md:text-xl"
        >
          {t("FactWise is redefining how manufacturers buy, source, quote, and pay — automating every workflow, eliminating every bottleneck, and building the operating system for modern manufacturing operations.")}
        </motion.p>

        <motion.a
          href={localizePath("/platform", locale)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          whileHover={{ scale: 1.05, backgroundColor: '#4d7aff' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3666ff] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(54,102,255,0.35)] transition-all sm:px-8 sm:text-base"
        >
          {t("Explore the Platform")}
        </motion.a>
      </div>

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-950 to-transparent z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-slate-950 to-transparent z-[1] pointer-events-none" />
    </section>
  );
};
