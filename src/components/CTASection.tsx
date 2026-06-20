'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const TRUST_ITEMS = ['No credit card required', '4-week onboarding', 'SOC 2 Type II'];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        width: '100%',
        background: '#ffffff',
        padding: `80px ${GLOBAL_LAYOUT.paddingX}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main CTA Card */}
          <div
            style={{
              position: 'relative',
              background: '#3666ff',
              borderRadius: 40,
              padding: '100px 40px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(54,102,255,0.3)',
            }}
          >
            {/* ── Decorative background ── */}
            {/* White Grid Overlay */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                pointerEvents: 'none',
                opacity: 0.5,
              }}
            />

            {/* Glowing Orbs */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: '-20%', left: '-10%',
                width: 600, height: 600,
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
              {/* Heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                Transform your procurement <span className="italic" style={{ color: '#E1E0CC' }}>ecosystem.</span>
              </h2>

              {/* Sub-text */}
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px, 1.2vw, 18px)',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  maxWidth: 640,
                  margin: '0 auto 48px auto',
                }}
              >
                Join global enterprises replacing fragmented spreadsheets with one connected, intelligent source-to-pay platform. Start your journey to 100% visibility today.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '16px 40px',
                    borderRadius: 100,
                    background: '#ffffff',
                    color: '#3666ff',
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Book a Demo
                </motion.a>
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '16px 40px',
                    borderRadius: 100,
                    border: '1px solid rgba(255,255,255,0.4)',
                    background: 'transparent',
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Sales
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
