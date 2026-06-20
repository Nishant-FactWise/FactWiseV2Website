'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap, Users } from 'lucide-react';

const VALUES = [
  {
    title: "Customer first, always.",
    desc: "Aim to create positive impact for organizations and bring sheer delight for every user — big or small.",
    icon: Heart,
    tag: "Principle 01",
    // Double-pulse like a real heartbeat
    iconAnimate: { scale: [1, 1.28, 1, 1.15, 1] },
    iconTransition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.45, 0.6, 1] },
  },
  {
    title: "Strive for excellence.",
    desc: "Constantly raise the bar for yourself and others with big-picture thinking and nuanced, robust execution.",
    icon: Star,
    tag: "Principle 02",
    // Gentle spin-and-snap twinkle
    iconAnimate: { rotate: [0, 18, -14, 10, -6, 0], scale: [1, 1.12, 1.05, 1.1, 1.02, 1] },
    iconTransition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    title: "Never settle.",
    desc: "Aspire to deliver extraordinary results while always maintaining accountability and integrity.",
    icon: Zap,
    tag: "Principle 03",
    // Fast vertical bounce + flash
    iconAnimate: { y: [0, -7, 0, -4, 0], scale: [1, 1.08, 1, 1.04, 1] },
    iconTransition: { duration: 1.3, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    title: "Always think win–win.",
    desc: "Challenge yourself to create win-win solutions for all stakeholders in every situation.",
    icon: Users,
    tag: "Principle 04",
    // Slow breathing expand
    iconAnimate: { scale: [1, 1.14, 1], rotate: [0, 4, -4, 0] },
    iconTransition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  },
];

export const ValuesGrid = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-14 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          Our Values
        </motion.div>

        {/* Heading */}
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tighter mb-12"
          >
            The Values <span className="font-instrument italic font-medium text-[#3666ff]">That Ship</span> With Every Line Of Code.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -14, scale: 1.02 }}
              className="group relative bg-white border border-slate-100 rounded-[28px] md:rounded-[32px] p-6 md:p-8 min-h-[300px] md:min-h-[380px] flex flex-col justify-between overflow-hidden"
              style={{
                boxShadow:
                  '0 2px 6px rgba(0,0,0,0.04), 0 6px 24px rgba(54,102,255,0.07), 0 0 0 1px rgba(54,102,255,0.05)',
                transition: 'box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 4px 12px rgba(0,0,0,0.07), 0 20px 52px rgba(54,102,255,0.18), 0 0 0 1px rgba(54,102,255,0.18)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 2px 6px rgba(0,0,0,0.04), 0 6px 24px rgba(54,102,255,0.07), 0 0 0 1px rgba(54,102,255,0.05)';
              }}
            >
              {/* Blue corner gradient wash */}
              <div
                className="absolute top-0 right-0 size-44 rounded-tr-[32px] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 80% at 100% 0%, rgba(54,102,255,0.13) 0%, rgba(91,134,255,0.06) 45%, transparent 70%)',
                }}
              />

              {/* Corner soft glow (always visible, intensifies on hover) */}
              <div
                className="absolute -top-10 -right-10 size-36 rounded-full pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                style={{ background: 'rgba(54,102,255,0.18)', filter: 'blur(44px)' }}
              />

              <div className="relative z-10">
                {/* Animated blue gradient icon */}
                <div className="size-12 md:size-16 rounded-2xl flex items-center justify-center shadow-[0_4px_18px_rgba(54,102,255,0.38)] group-hover:shadow-[0_6px_26px_rgba(54,102,255,0.55)] group-hover:scale-110 transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, #3666ff 0%, #6690ff 100%)' }}
                >
                  <motion.div
                    animate={value.iconAnimate as any}
                    transition={value.iconTransition as any}
                    className="text-white"
                  >
                    <value.icon className="size-6 md:size-7" strokeWidth={2} />
                  </motion.div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-6 md:mt-10 mb-3 md:mb-4 tracking-tight leading-snug">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {value.desc}
                </p>
              </div>

              <div className="relative z-10 pt-5 md:pt-8 mt-auto flex items-center border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-[#3666ff]/30 group-hover:bg-[#3666ff] transition-colors duration-500" />
                  <span className="text-[10px] font-bold text-[#3666ff] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-500">
                    {value.tag}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
