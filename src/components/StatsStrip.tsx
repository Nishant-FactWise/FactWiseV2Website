'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const STATS = [
  {
    value: '3x',
    label: 'Faster RFQ-to-PO',
    sub: 'Cut sourcing cycles without cutting corners',
  },
  {
    value: '100%',
    label: 'Total Visibility',
    sub: 'Track every rupee, every approval, and every team members impact in one place ',
  },
  {
    value: '20+',
    label: 'Modules, One Platform',
    sub: 'Every workflow your business runs on, built-in from day one',
  },
];

function Counter({ value, inView }: { value: string; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Extract numeric part and suffix
  const numMatch = value.match(/(\d+)/);
  const target = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth finish
        delay: 0.2
      });
      return controls.stop;
    } else {
      // Reset count to 0 when it leaves the view so it can animate again
      count.set(0);
    }
  }, [inView, count, target]);

  return (
    <>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </>
  );
}

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="w-full border-t border-b relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        borderColor: 'rgba(74,111,255,0.08)',
      }}
    >
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      <div
        className="mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0 py-14 relative z-10"
        style={GLOBAL_LAYOUT.containerStyle}
      >

        {/* Left — value prop text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="hidden md:block lg:w-[34%] lg:pr-14 flex-shrink-0"
        >
          <p
            className="max-w-[280px]"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.72,
              color: '#7B82A8',
            }}
          >
            Procurement is where it starts — not where it ends. FactWise automates every workflow — from quotes and vendors to orders,
            approvals, and payments — so your team spends less time chasing and more time closing.

          </p>
        </motion.div>

        {/* Vertical divider (desktop) */}
        <div
          className="hidden lg:block w-px self-stretch flex-shrink-0"
          style={{ background: 'rgba(74,111,255,0.1)' }}
        />

        {/* Right — 3 stats (always a row, resized to fit on phones) */}
        <div className="flex-1 flex flex-row items-stretch divide-x w-full"
          style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.1 }}
              className="flex-1 flex flex-col gap-1.5 px-2 sm:px-10 py-2 sm:py-0"
              style={{ borderColor: 'rgba(74,111,255,0.1)' }}
            >
              {/* Big number with counter animation */}
              <div
                className="leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 5vw, 3.1rem)',
                  fontWeight: 800,
                  color: '#0D0F1C',
                  letterSpacing: '-0.04em',
                }}
              >
                <Counter value={stat.value} inView={inView} />
              </div>
              {/* Primary label */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1A1D2E',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.label}
              </span>
              {/* Sub descriptor */}
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#7B82A8',
                  lineHeight: 1.5,
                }}
              >
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
