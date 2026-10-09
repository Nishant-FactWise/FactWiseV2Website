'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import MorphingSVG from './MorphingSVG';
import { AboutCounter } from './AboutCounter';
import { withoutLongDashes } from '@/lib/display-text';

const STATS = [
  { value: 5, prefix: '$', suffix: 'B+', label: 'Spend Managed globally' },
  { value: 60, suffix: '%', label: 'Cycle Time Reduction' },
  { value: 150, suffix: '+', label: 'Global Enterprises' },
  { value: 24, suffix: '/7', label: 'Strategic AI Support' }
];

/* Animates a heading character-by-character (slide-up) but keeps each WORD in an
   inline-block/whitespace-nowrap wrapper so words never break mid-word — only
   whole words wrap to the next line. `base` offsets the stagger so a second
   line continues the sequence. */
function AnimatedTitle({ text, base = 0 }: { text: string; base?: number }) {
  const words = text.split(' ');
  let idx = base;
  return (
    <>
      {words.map((word, wi) => {
        const charEls = word.split('').map((ch) => {
          const i = idx++;
          return (
            <motion.span
              key={i}
              variants={{
                hidden: { y: 100, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.018 } },
              }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          );
        });
        idx++; // account for the inter-word space in the stagger sequence
        return (
          <React.Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">{charEls}</span>
            {wi < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export const ImpactMission = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => withoutLongDashes(messages[locale].textMap[source] ?? source);

  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-14">
      <div
        className="relative overflow-hidden rounded-[20px] py-10 sm:rounded-[24px] sm:py-12 md:py-16"
        style={{ backgroundImage: "url('/TexturedGradient.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Subtle Glow Overlay */}
        <div 
          className="absolute -right-32 -bottom-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
          }} 
        />
        <div className="absolute inset-0 noise opacity-10 pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-10 grid items-center gap-8 px-5 sm:px-6 md:mb-12 md:grid-cols-12 md:gap-16">
            {/* Left: Morphing Animation */}
            <div className="md:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-[260px] md:max-w-none">
                <MorphingSVG />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="flex min-w-0 flex-col items-start md:col-span-7">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              {t("Impact & Mission")}
            </div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-6 max-w-full overflow-hidden py-2 text-[30px] font-bold leading-[1.08] tracking-tighter text-slate-900 sm:text-4xl md:mb-8 md:text-5xl"
            >
              <AnimatedTitle text={t("Automating Every Workflow")} base={0} />
              <br className="md:hidden" />
              <span className="text-[#3666ff] font-instrument italic font-medium">
                <AnimatedTitle text={t("Manufacturers Depend On.")} base={26} />
              </span>
            </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="space-y-5 md:space-y-6"
              >
                <p className="text-justify text-[15px] leading-7 text-slate-600 sm:text-base md:text-xl">
                  {t("We are building the operating system for modern manufacturing and connecting every team, every vendor, and every workflow into one intelligent platform. FactWise automates the complex, eliminates the manual, and gives manufacturers the clarity to make better decisions, faster.")}
                </p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-justify text-base font-semibold leading-7 text-slate-900 italic md:text-lg">
                    {t("MISSION: Delight users and provide sustainable, positive impact to the organizations we serve.")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-x-5 gap-y-8 border-t border-slate-200 px-5 pt-10 sm:px-6 md:grid-cols-4 md:gap-0 md:pt-16"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="relative flex min-h-24 flex-col justify-center gap-2 md:border-r md:border-slate-200 md:px-8 md:first:pl-0 md:last:border-0">
                <div className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  <AboutCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] font-medium uppercase leading-snug tracking-wider text-slate-500 sm:text-sm">{t(stat.label)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
