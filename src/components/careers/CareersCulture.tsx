'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users2, Lightbulb, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';

const PILLARS = [
  {
    title: 'Collaborate',
    desc: 'Regardless of position, every team member is encouraged to voice their perspective and shape the direction of the company.',
    Icon: Users2,
    // Gentle float — teammates moving together
    iconAnimate: { y: [0, -5, 0] },
    iconTransition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 0.5 },
  },
  {
    title: 'Create',
    desc: 'Passion and adaptability fuel us to build elegant, beautiful solutions for the most complex challenges our customers face.',
    Icon: Lightbulb,
    // Tilt — an idea taking shape
    iconAnimate: { rotate: [0, -10, 10, -5, 0] },
    iconTransition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 0.8 },
  },
  {
    title: 'Grow',
    desc: 'Excellence, accountability, and autonomy — every team member grows at their own pace, on their own terms.',
    Icon: TrendingUp,
    // Rightward push — trending upward
    iconAnimate: { x: [0, 5, 0] },
    iconTransition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 0.6 },
  },
];

export const CareersCulture = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => messages[locale].textMap[source] ?? source;

  // Responsive grid columns: 1 on mobile, 2 on tablet, 3 on desktop.
  // Inline styles can't use Tailwind breakpoints, so track viewport via matchMedia
  // (same pattern as StaggerTestimonials).
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setColumns(3);
      else if (window.matchMedia('(min-width: 640px)').matches) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <section style={{
      padding: '80px 24px',
      background: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient background blobs */}
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(54,102,255,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(54,102,255,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1040, margin: '0 auto' }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100,
              background: 'rgba(54,102,255,0.06)', border: '1px solid rgba(54,102,255,0.15)',
              fontSize: 11, fontWeight: 700, color: '#3666ff',
              marginBottom: 20, letterSpacing: '0.12em', textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {t("Our Culture")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 600,
              lineHeight: 1.1, letterSpacing: '-0.035em',
              color: '#0D1117', margin: 0,
              fontFamily: 'var(--font-display)',
            }}
          >
            {t("Built on")}{' '}
            <span style={{ color: '#3666ff', fontStyle: 'italic', fontWeight: 500 }}>
              {t("Shared Principles")}
            </span>
          </motion.h2>
        </div>

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 20,
        }}>
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.13, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -14, scale: 1.025 }}
              style={{
                position: 'relative',
                background: 'white',
                border: '1px solid rgba(54,102,255,0.1)',
                borderRadius: 20,
                padding: '36px 28px',
                overflow: 'hidden',
                cursor: 'default',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04), 0 6px 28px rgba(54,102,255,0.07), 0 0 0 1px rgba(54,102,255,0.04)',
                transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08), 0 24px 56px rgba(54,102,255,0.18), 0 0 0 1px rgba(54,102,255,0.2)';
                el.style.borderColor = 'rgba(54,102,255,0.28)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04), 0 6px 28px rgba(54,102,255,0.07), 0 0 0 1px rgba(54,102,255,0.04)';
                el.style.borderColor = 'rgba(54,102,255,0.1)';
              }}
            >
              {/* Blue corner gradient — always visible, intensifies on hover via CSS */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 150, height: 150,
                background: 'radial-gradient(ellipse at top right, rgba(54,102,255,0.13) 0%, rgba(100,144,255,0.06) 40%, transparent 70%)',
                borderRadius: '0 20px 0 0',
                pointerEvents: 'none',
              }} />
              {/* Subtle corner dot */}
              <div style={{
                position: 'absolute', top: 18, right: 18,
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(54,102,255,0.25)',
                pointerEvents: 'none',
              }} />

              {/* Animated blue icon */}
              <div style={{ marginBottom: 24 }}>
                <motion.div
                  animate={pillar.iconAnimate}
                  transition={pillar.iconTransition}
                  style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'linear-gradient(135deg, #5a94ff 0%, #2a6cff 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(54,102,255,0.40), 0 0 0 1px rgba(255,255,255,0.12) inset',
                  }}
                >
                  <pillar.Icon size={22} color="white" strokeWidth={1.75} />
                </motion.div>
              </div>

              <h3 style={{
                fontSize: 19, fontWeight: 700, color: '#0D1117',
                marginBottom: 10, letterSpacing: '-0.02em',
                fontFamily: 'var(--font-display)',
              }}>
                {t(pillar.title)}
              </h3>

              <p style={{
                fontSize: 14.5, lineHeight: 1.65, color: '#64748b',
                margin: 0, fontFamily: 'var(--font-inter)',
              }}>
                {t(pillar.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
