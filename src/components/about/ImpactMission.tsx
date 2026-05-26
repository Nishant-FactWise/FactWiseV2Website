'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MorphingSVG from './MorphingSVG';
import { AboutCounter } from './AboutCounter';

const STATS = [
  { value: 5, prefix: '$', suffix: 'B+', label: 'Spend Managed globally' },
  { value: 60, suffix: '%', label: 'Cycle Time Reduction' },
  { value: 150, suffix: '+', label: 'Global Enterprises' },
  { value: 24, suffix: '/7', label: 'Strategic AI Support' }
];

export const ImpactMission = () => {
  return (
    <section className="py-8 px-6 md:px-14 bg-white">
      <div 
        className="relative overflow-hidden rounded-[24px] py-16" 
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
          <div className="grid md:grid-cols-12 gap-16 items-center mb-12 px-6">
            {/* Left: Morphing Animation */}
            <div className="md:col-span-5 flex items-center justify-center">
              <MorphingSVG />
            </div>

            {/* Right: Text Content */}
            <div className="md:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Our Mission
            </div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tighter mb-8 overflow-hidden py-2"
            >
              {"Automating Every Workflow ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: 100, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.018 }
                    }
                  }}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br className="md:hidden" />
              <span className="text-[#3666ff] font-instrument italic font-medium inline-block">
                {"Manufacturers Depend On.".split("").map((char, index) => (
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
                          delay: (index + 26) * 0.018
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                  We are building the operating system for modern manufacturing \u2014 connecting every team,
                  every vendor, and every workflow into one intelligent platform. FactWise automates
                  the complex, eliminates the manual, and gives manufacturers the clarity to make
                  better decisions, faster.
                </p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-slate-900 font-semibold text-lg italic">
                    MISSION: Delight users and provide sustainable, positive impact to the organizations we serve.
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
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 pt-16 border-t border-slate-200 px-6"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 relative md:px-8 first:pl-0 last:border-0 md:border-r border-slate-200 h-24 justify-center">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  <AboutCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500 leading-tight uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
