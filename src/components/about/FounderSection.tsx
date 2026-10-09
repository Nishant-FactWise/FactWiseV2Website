'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { withoutLongDashes } from '@/lib/display-text';

export const FounderSection = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => withoutLongDashes(messages[locale].textMap[source] ?? source);

  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-14">
      <div
        className="relative overflow-hidden rounded-[20px] px-5 py-10 sm:rounded-[24px] sm:px-6 sm:py-14 md:px-20 md:py-20"
        style={{ backgroundImage: "url('/TexturedGradient.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Subtle Glow Overlay */}
        <div 
          className="absolute -left-32 -top-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
          }} 
        />
        <div className="absolute inset-0 noise opacity-10 pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                {t("Leadership")}
              </div>

              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="mb-6 overflow-hidden py-1 text-[30px] font-bold leading-[1.1] tracking-tighter text-slate-900 sm:text-4xl md:mb-8 md:text-5xl"
              >
                {t("A Word From ").split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { y: 100, opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }
                      }
                    }}
                    className="inline-block"
                    style={{ display: char === " " ? "inline" : "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <span className="text-[#3666ff] font-instrument italic font-medium inline-block">
                  {t("The Founder").split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { y: 100, opacity: 0 },
                        visible: { 
                          y: 0, 
                          opacity: 1,
                          transition: { 
                            duration: 0.6, 
                            ease: [0.16, 1, 0.3, 1], 
                            delay: (index + 13) * 0.02 // Offset by length of "A Word From "
                          } 
                        }
                      }}
                      className="inline-block"
                      style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>

              <div className="max-w-2xl space-y-5 text-justify text-[15px] leading-7 text-slate-500 md:text-lg">
                <p>
                  {t("When I started this journey, my vision was simple. I wanted to create something that brings value, fosters connection, and makes a meaningful impact. Every step we've taken has been guided by a passion for innovation and a commitment to putting people first.")}
                </p>
                <p>
                  {t("This is not just a brand. It is a community, a space where ideas grow, challenges are met with creativity, and every voice matters. None of this would be possible without your support, trust, and belief in what we stand for.")}
                </p>
                <div className="mt-8 max-w-2xl rounded-r-2xl border-l-2 border-[#3666ff] bg-blue-50/30 p-4 sm:p-6 md:mt-10">
                  <p className="font-instrument text-justify text-lg font-semibold leading-relaxed text-slate-900 italic sm:text-xl">
                    {t("\"Together, we are building something truly special, and I can't wait to see what the future holds.\"")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center pb-7 md:col-span-5 md:pb-0"
            >
              <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
                <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[28px] border-4 border-white/30 shadow-2xl sm:rounded-[40px]">
                  <img
                    src="/founder-hero.png"
                    alt={t("Stawan Kamani - Founder of FactWise")}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name Blob Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-6 right-2 z-20 min-w-[170px] rounded-[22px] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 shadow-2xl sm:right-0 sm:min-w-[180px] sm:rounded-[28px] sm:p-5 md:-bottom-10 md:-right-16 md:min-w-[220px] md:rounded-[32px] md:p-6"
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold text-slate-900 tracking-tight">Stawan Kamani</div>
                    <div className="text-[#3666ff] font-bold uppercase tracking-[0.15em] text-[10px]">
                      {t("Founder & CEO")}
                    </div>
                  </div>
                </motion.div>

                {/* Decorative background elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
