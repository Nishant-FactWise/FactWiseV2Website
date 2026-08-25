'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Check, FileSpreadsheet, Cpu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { getPathLocale, localizePath } from '@/lib/i18n';
import { useLocalizedText } from '@/hooks/useLocalizedText';

const SupplierModal = dynamic(() => import('@/components/ui/SupplierModal'), { ssr: false });

/* ── Inline SVG Icons ── */
const IcGrid = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);
const IcBox = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const IcLayers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const IcFile = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const IcBar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IcClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

/* ════════════════════════════════════════════
   SUPPLIER COMMAND CENTER DASHBOARD MOCKUP
════════════════════════════════════════════ */
function SupplierDashboardMockup() {
  const t = useLocalizedText();
  const mono = "'JetBrains Mono', monospace";
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: 38,
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 7,
          background: '#fafbfc',
          flexShrink: 0,
        }}
      >
        {['#ff5f57', '#ffbd2e', '#28ca42'].map((c) => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
        ))}
        <div
          style={{
            marginLeft: 10,
            background: 'white',
            border: '1px solid #e8edf3',
            padding: '2px 10px',
            borderRadius: 4,
            fontSize: 9,
            color: '#94a3b8',
            fontFamily: mono,
          }}
        >
          app.factwise.io / supplier-portal / active-rfqs
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            borderRight: '1px solid #f1f5f9',
            padding: '14px 8px',
            background: '#fafbfc',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              paddingBottom: 12,
              marginBottom: 8,
              borderBottom: '1px solid #f1f5f9',
              fontSize: 12,
              fontWeight: 700,
              color: '#1A1D2E',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                flexShrink: 0,
                background: 'linear-gradient(135deg,#4f8bff,#2a6cff)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  background: 'white',
                  clipPath: 'polygon(0 0,100% 0,100% 40%,40% 40%,40% 100%,0 100%)',
                }}
              />
            </div>
            {t('FactWise Supplier')}
          </div>

          <div style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 6px 3px', fontWeight: 600 }}>
            {t('Quoting Hub')}
          </div>
          {[
            { ic: <IcGrid />, label: 'Active RFQs', active: true },
            { ic: <IcBox />, label: 'Excel Upload' },
            { ic: <IcLayers />, label: 'API Sync Logs' },
            { ic: <IcFile />, label: 'AI Price Repo' },
          ].map(({ ic, label, active }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 7px',
                borderRadius: 5,
                fontSize: 10,
                fontWeight: 500,
                color: active ? '#3666ff' : '#64748b',
                background: active ? 'rgba(54,102,255,0.07)' : 'transparent',
                border: active ? '1px solid rgba(54,102,255,0.14)' : '1px solid transparent',
                marginBottom: 1,
              }}
            >
              <span style={{ color: active ? '#3666ff' : '#94a3b8', display: 'inline-flex' }}>{ic}</span>
              {t(label)}
            </div>
          ))}

          <div style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 6px 3px', fontWeight: 600 }}>
            {t('Analytics')}
          </div>
          {[{ ic: <IcBar />, label: 'Win Rate KPI' }, { ic: <IcClock />, label: 'Quote Speed' }].map(({ ic, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 7px', borderRadius: 5, fontSize: 10, color: '#64748b', marginBottom: 1 }}>
              <span style={{ color: '#94a3b8', display: 'inline-flex' }}>{ic}</span>
              {t(label)}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ padding: '16px 18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1D2E', letterSpacing: '-0.01em' }}>
                {t('RFQ-8842 · Riverline Engineering PCB Assembly')}
              </div>
              <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2 }}>
                {t('142 line items · Closes in 4d · Direct Platform Event')}
              </div>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 8px',
                borderRadius: 5,
                fontSize: 9,
                fontWeight: 600,
                background: 'rgba(0,184,132,0.08)',
                color: '#059669',
                border: '1px solid rgba(0,184,132,0.2)',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              {t('Ready to Quote')}
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { l: 'Total Line Items', v: '142 pcs', d: 'Structured BOM', c: '#1A1D2E' },
              { l: 'AI Matched Lines', v: '100% (142)', d: 'From custom MPN repo', c: '#059669' },
              { l: 'Est. Bid Value', v: '₹28,45,000', d: 'Margin: 24.2%', c: '#3666ff' },
            ].map((k) => (
              <div
                key={k.l}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  padding: '7px 10px',
                }}
              >
                <div style={{ fontSize: 8.5, color: '#64748b', fontWeight: 500 }}>{t(k.l)}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: k.c, fontFamily: mono, marginTop: 1 }}>{k.v}</div>
                <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 1 }}>{t(k.d)}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 6, overflow: 'hidden', flex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 85px 85px 65px',
                background: '#f1f5f9',
                padding: '5px 10px',
                fontSize: 8.5,
                fontWeight: 600,
                color: '#64748b',
              }}
            >
              <span>{t('Line Item & MPN')}</span>
              <span style={{ textAlign: 'right' }}>MOQ</span>
              <span style={{ textAlign: 'right' }}>{t('Unit Rate')}</span>
              <span style={{ textAlign: 'right' }}>{t('Total (₹)')}</span>
              <span style={{ textAlign: 'center' }}>{t('Source')}</span>
            </div>
            {[
              { name: '1. STM32F407VGT6 Microcontroller', moq: '500', rate: '₹420.00', total: '₹2,10,000', src: 'AI Repo', c: '#059669' },
              { name: '2. Multi-layer PCB High-Frequency', moq: '1,000', rate: '₹145.00', total: '₹1,45,000', src: 'AI Repo', c: '#059669' },
              { name: '3. SMD Ceramic Capacitor 0.1uF 50V', moq: '10,000', rate: '₹1.80', total: '₹18,000', src: 'Excel Sync', c: '#3666ff' },
              { name: '4. Precision Power Inductor 4.7uH', moq: '2,500', rate: '₹24.50', total: '₹61,250', src: 'API Sync', c: '#8b5cf6' },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 60px 85px 85px 65px',
                  padding: '6px 10px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: 9,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600, color: '#1A1D2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {row.name}
                </span>
                <span style={{ textAlign: 'right', fontFamily: mono, color: '#64748b' }}>{row.moq}</span>
                <span style={{ textAlign: 'right', fontFamily: mono, fontWeight: 600, color: '#1A1D2E' }}>{row.rate}</span>
                <span style={{ textAlign: 'right', fontFamily: mono, fontWeight: 700, color: '#1A1D2E' }}>{row.total}</span>
                <span style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      fontSize: 7.5,
                      padding: '1.5px 5px',
                      borderRadius: 4,
                      background: `${row.c}15`,
                      color: row.c,
                      fontWeight: 700,
                      border: `1px solid ${row.c}30`,
                    }}
                  >
                    {t(row.src)}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 2 }}>
            <span style={{ fontSize: 9, color: '#64748b' }}>⚡ {t('All 142 items priced · Ready for 1-Click Submission')}</span>
            <button
              style={{
                background: '#3666ff',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: '0 2px 6px rgba(54,102,255,0.4)',
              }}
            >
              {t('Submit Winning Bid ➔')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   FLOATING STATUS CARDS
════════════════════════════════════════════ */
function FloatCard({
  children,
  delay,
  yAmt = 8,
  dur = 5,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  yAmt?: number;
  dur?: number;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: [0, -yAmt, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { repeat: Infinity, duration: dur, ease: 'easeInOut', delay: delay + 0.4 },
      }}
      style={{
        position: 'absolute',
        background: 'white',
        borderRadius: 14,
        border: '1px solid rgba(15,23,42,0.08)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.9) inset',
        zIndex: 20,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN SUPPLIER HERO COMPONENT
════════════════════════════════════════════ */
export default function SupplierHero() {
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = useLocalizedText();

  return (
    <div
      style={{
        position: 'relative',
        background: '#020617',
        color: 'white',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: 'absolute',
          top: -150,
          left: '15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(54,102,255,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          right: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="grid grid-cols-1 xl:grid-cols-[1fr_1.25fr] gap-8 items-center"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '120px 24px 100px',
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
        }}
      >
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 620 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 100,
              background: 'rgba(54,102,255,0.12)',
              border: '1px solid rgba(54,102,255,0.3)',
              color: '#60a5fa',
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 24,
              fontFamily: 'var(--font-inter)',
            }}
          >
            <Sparkles className="size-3.5 text-[#3666ff]" />
            {t('AI-POWERED SUPPLIER QUOTING')}
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 3.2vw, 52px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              marginBottom: 24,
              fontFamily: 'var(--font-display)',
            }}
          >
            {t('FactWise Works With Every Supplier.')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#7ba6ff 0%,#4f8bff 50%,#2a6cff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('Simply and Seamlessly.')}
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: '#94a3b8',
              fontWeight: 400,
              marginBottom: 40,
              maxWidth: 560,
              fontFamily: 'var(--font-inter)',
            }}
          >
            {t('Respond through the portal, Excel, or API — FactWise matches every line item against your pricing and gets your bid out before the deadline.')}
          </p>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href={localizePath('/supplier-onboarding', locale)}
              style={{
                background: 'linear-gradient(135deg,#4f8bff,#2a6cff)',
                color: 'white',
                border: 'none',
                padding: '12px 22px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 12px 40px rgba(42,108,255,0.4)',
                fontFamily: 'var(--font-inter)',
                textDecoration: 'none',
              }}
            >
              {t('Get Started as Supplier')}
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <ArrowRight className="size-3" />
              </span>
            </Link>

            <a
              href="#supplier-problems"
              style={{
                padding: '12px 20px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                color: 'white',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              {t('Why Most Suppliers Struggle ➔')}
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 44, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check className="size-4 text-emerald-400 shrink-0" />
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>{t('Zero Portal Friction')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileSpreadsheet className="size-4 text-blue-400 shrink-0" />
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>{t('Instant Excel Upload')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu className="size-4 text-purple-400 shrink-0" />
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>{t('AI Auto-Response')}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Desktop Dashboard Mockup + Floating Widgets) */}
        <div className="hidden xl:block" style={{ paddingLeft: 48 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: 'relative', height: 530 }}
          >
            {/* Main dashboard container */}
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: 0,
                width: 'calc(100% + 80px)',
                height: 520,
                borderRadius: '16px 0 0 16px',
                border: '1px solid rgba(120,150,220,0.18)',
                borderRight: 'none',
                overflow: 'hidden',
                boxShadow: '0 0 0 1px rgba(79,139,255,0.06), 0 40px 80px rgba(0,0,0,0.45), 0 0 80px rgba(42,108,255,0.15)',
              }}
            >
              <SupplierDashboardMockup />
            </div>

            {/* Float Card 1 — Incoming RFQ Invite (top-left) */}
            <FloatCard delay={0.5} yAmt={12} dur={6} style={{ top: 30, left: -40, width: 255, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1D2E' }}>{t('New RFQ Invite')}</div>
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>Riverline Engineering · IQ-8842</div>
                </div>
                <span style={{ fontSize: 8.5, padding: '2px 6px', borderRadius: 100, background: '#dbeafe', color: '#1d4ed8', fontWeight: 700 }}>
                  {t('LIVE')}
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#475569', background: '#f8fafc', padding: '6px 8px', borderRadius: 6, border: '1px solid #e2e8f0' }}>
                📦 {t('142 items · Target Deadline: 4d')}
              </div>
            </FloatCard>

            {/* Float Card 2 — Excel Roundtrip Badge (bottom-left) */}
            <FloatCard delay={0.7} yAmt={10} dur={5} style={{ bottom: 35, left: -25, width: 260, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#059669',
                    flexShrink: 0,
                  }}
                >
                  <FileSpreadsheet className="size-5" />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: '#065f46' }}>{t('Excel Upload Complete')}</div>
                  <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>✓ {t('142 line items parsed in 0.8s')}</div>
                </div>
              </div>
            </FloatCard>

            {/* Float Card 3 — AI Auto-Response (top-right overlay inside dashboard) */}
            <FloatCard delay={0.9} yAmt={14} dur={7} style={{ top: 180, right: -10, width: 265, padding: '12px 14px', borderLeft: '4px solid #3666ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ✨ {t('FactWise AI Engine')}
                </span>
                <span style={{ fontSize: 8, background: '#ecfdf5', color: '#059669', padding: '1.5px 6px', borderRadius: 4, fontWeight: 700 }}>
                  {t('Active')}
                </span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1D2E', lineHeight: 1.3 }}>
                {t('MPN-Wise Price List Matched')}
              </div>
              <div style={{ fontSize: 9.5, color: '#64748b', marginTop: 2 }}>
                {t('Tiered volume break (MOQ 500) applied. Quote ready with 100% accuracy.')}
              </div>
            </FloatCard>
          </motion.div>
        </div>
      </div>

      {/* Supplier registration modal */}
      <AnimatePresence>
        {modalOpen && <SupplierModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
