'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FounderSection = () => {
  return (
    <section className="py-8 px-6 md:px-14 bg-white">
      <div
        className="relative overflow-hidden rounded-[24px] py-14 px-6 md:py-20 md:px-20"
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
                Leadership
              </div>

              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-8 overflow-hidden py-1"
              >
                {"A Word From ".split("").map((char, index) => (
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
                  {"The Founder".split("").map((char, index) => (
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

              <div className="space-y-5 text-slate-500 text-justify text-base md:text-lg leading-relaxed max-w-2xl">
                <p>
                  When I started this journey, my vision was simple. I wanted to create
                  something that brings value, fosters connection, and makes a meaningful
                  impact. Every step we've taken has been guided by a passion for innovation
                  and a commitment to putting people first.
                </p>
                <p>
                  This is not just a brand. It is a community, a space where ideas grow,
                  challenges are met with creativity, and every voice matters. None of this
                  would be possible without your support, trust, and belief in what we stand
                  for.
                </p>
                <div className="mt-10 p-6 border-l-2 border-[#3666ff] bg-blue-50/30 rounded-r-2xl max-w-2xl">
                  <p className="font-semibold text-slate-900 italic font-instrument text-xl leading-relaxed">
                    "Together, we are building something truly special, and I can't wait to see
                    what the future holds."
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
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[280px]">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10 border-4 border-white/30">
                  <img
                    src="/founder-hero.png"
                    alt="Stawan Kamani - Founder of FactWise"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name Blob Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-8 right-0 md:-bottom-10 md:-right-16 z-20 bg-gradient-to-br from-white to-blue-50 p-5 md:p-6 rounded-[28px] md:rounded-[32px] shadow-2xl border border-blue-100 min-w-[180px] md:min-w-[220px]"
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold text-slate-900 tracking-tight">Stawan Kamani</div>
                    <div className="text-[#3666ff] font-bold uppercase tracking-[0.15em] text-[10px]">
                      Founder & CEO
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
