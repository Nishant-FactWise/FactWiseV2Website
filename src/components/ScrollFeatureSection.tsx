'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ── Feature definitions ─────────────────────────── */
const FEATURES = [
  {
    id: 'sourcing',
    title: 'Strategic Sourcing',
    desc: 'Launch multi-round RFQ events with landed cost comparison, automated vendor reminders, and algorithmic split-award recommendations.',
    color: '#3666ff',
  },
  {
    id: 'analytics',
    title: 'Spend Intelligence',
    desc: 'Unified visibility across the entire chain — from internal requisition to final payment — with 15+ pre-built dashboards and custom KPI tracking.',
    color: '#34d399',
  },
  {
    id: 'supplier',
    title: 'Supplier Lifecycle',
    desc: 'Manage the full vendor lifecycle from automated onboarding and KYC verification to live performance ratings and factory audits.',
    color: '#f59e0b',
  },
  {
    id: 'contracts',
    title: 'Contract Management',
    desc: 'Centralize vendor contracts with volume pricing tiers, automated expiry alerts, and seamless synchronization with your pricing intelligence repository.',
    color: '#3b82f6',
  },
];

/* ── Dashboard Shell ────────────────────────────── */
function DashboardShell({ title, children, activeColor }: { title: string, children: React.ReactNode, activeColor: string }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f6f9fc' }}>
      {/* Sidebar Mockup */}
      <div style={{
        width: 64,
        borderRight: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: 20,
        background: 'rgba(0,0,0,0.02)'
      }}>
        {/* FactWise SVG Logo */}
        <div style={{ width: 32, height: 32, marginBottom: 24 }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <rect width="100" height="100" rx="20" fill="#fff" />
            <path d="M30 25 L70 25 L70 35 L40 35 L40 45 L65 45 L65 55 L40 55 L40 75 L30 75 Z" fill="#000" />
            <path d="M50 55 L80 55 L80 85 L50 85 L50 75 L70 75 L70 65 L50 65 Z" fill="#3b82f6" />
          </svg>
        </div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ width: 32, height: 32, borderRadius: 10, background: i === 1 ? 'rgba(0,0,0,0.06)' : 'transparent', border: i === 1 ? '1px solid rgba(0,0,0,0.08)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'rgba(0,0,0,0.3)' }}>
            {i === 1 ? '◍' : '○'}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{
          height: 48,
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, marginRight: 12 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: '#6b6b7a', fontWeight: 500 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 80, height: 24, borderRadius: 6, background: 'rgba(0,0,0,0.05)' }} />
            <div style={{ width: 24, height: 24, borderRadius: 6, background: activeColor, opacity: 0.3 }} />
          </div>
        </div>

        {/* Panel Content */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Panel 1: Strategic Sourcing ─────────────────── */
const rfqRows = [
  { name: 'IT Hardware Q2', bids: '12 bids', due: 'Apr 28', status: 'Ongoing', color: '#34d399' },
  { name: 'Office Supplies', bids: '8 bids', due: 'May 02', status: 'Ongoing', color: '#34d399' },
  { name: 'Logistics RFP', bids: '5 bids', due: 'Apr 30', status: 'Award Stage', color: '#3666ff' },
  { name: 'Software License', bids: '3 bids', due: 'May 10', status: 'Approval Pending', color: '#f59e0b' },
];

function SourcingPanel() {
  return (
    <DashboardShell title="Strategic Sourcing · RFQ #8421" activeColor="#3666ff">
      <div style={{ padding: '24px', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 24, height: '100%' }}>
          <div style={{ flex: 1.5, paddingTop: 10 }}>
            {rfqRows.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#6b6b7a' }}>#{i + 1}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#000000' }}>{row.name}</span>
                    <span style={{ fontSize: 11, color: '#6b6b7a' }}>{row.bids} · Due {row.due}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: row.color }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 600, color: row.color }}>{row.status}</span>
                  </div>
                  <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: i === 2 ? '100%' : '70%' }}
                      transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
                      style={{ height: '100%', borderRadius: 2, background: row.color, opacity: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Split Award / PO Logic Section (Direct from Brief) */}
            <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Split-Award Recommendation</span>
                <span style={{ fontSize: 10, color: '#52525b' }}>Landed Cost Optimized</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { vendor: 'Global Parts', share: '60%', cost: '₹42,400' },
                  { vendor: 'TechLogistics', share: '40%', cost: '₹29,100' }
                ].map(v => (
                  <div key={v.vendor} style={{ padding: 10, borderRadius: 8, background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: 10, color: '#000000', marginBottom: 4, fontWeight: 600 }}>{v.vendor}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#34d399' }}>{v.share}</div>
                    <div style={{ fontSize: 10, color: '#52525b' }}>{v.cost}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(0,0,0,0.07)', borderRadius: 8, fontSize: 10, color: '#52525b', gap: 4 }}>
                  <span>+ Award</span>
                  <span>Alternate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.02)', borderRadius: 16, padding: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, display: 'block' }}>Event Intelligence</span>
            <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)', marginBottom: 20 }}>
              <span style={{ fontSize: 11, color: '#34d399', display: 'block', marginBottom: 4 }}>Landed Cost Recommendation</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#000000' }}>Alpha Steel Inc.</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#34d399' }}>₹42,100</span>
                <span style={{ fontSize: 10, color: '#34d399', opacity: 0.7 }}>12% below target</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Market Benchmark', val: '+4.2%' },
                { label: 'Risk Score', val: 'Low', color: '#34d399' },
                { label: 'Response Rate', val: '92%' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#6b6b7a' }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.color || '#000000' }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ── Panel 2: Spend Analytics ────────────────────── */
const spendCats = [
  { label: 'Direct Materials', pct: 42, color: '#3666ff' },
  { label: 'MRO & Supplies', pct: 24, color: '#3b82f6' },
  { label: 'Logistics & Ops', pct: 18, color: '#34d399' },
  { label: 'IT & Software', pct: 12, color: '#f59e0b' },
  { label: 'Other', pct: 4, color: '#6b6b7a' },
];

const kpiCards = [
  { label: 'Total Spend YTD', value: '₹4.2 Cr', valueColor: '#000000', bg: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.07)' },
  { label: 'Savings', value: '₹1.1 Cr ↓ 27%', valueColor: '#34d399', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.18)' },
];

function AnalyticsPanel() {
  return (
    <DashboardShell title="Spend Intelligence · Dashboard" activeColor="#34d399">
      <div style={{ padding: '24px', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Spend', val: '₹4.2 Cr', delta: '+12%', color: '#000000' },
            { label: 'Cost Savings', val: '₹1.1 Cr', delta: '27.4%', color: '#34d399' },
            { label: 'Compliance', val: '93%', delta: '+5.2%', color: '#3b82f6' }
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '16px',
                borderRadius: 16,
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.06)'
              }}
            >
              <span style={{ fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, display: 'block' }}>{kpi.label}</span>
              <div style={{ fontSize: 24, fontWeight: 700, color: kpi.color, letterSpacing: '-0.03em', marginBottom: 4 }}>{kpi.val}</div>
              <span style={{ fontSize: 10, color: '#34d399', fontWeight: 600 }}>{kpi.delta} vs LY</span>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1.2 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, display: 'block' }}>Spend by Category</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {spendCats.map((cat, i) => (
                <div key={cat.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#808080' }}>{cat.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#000000' }}>{cat.pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: '100%', background: cat.color, borderRadius: 3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.02)', borderRadius: 16, padding: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, display: 'block' }}>Monthly Trend</span>
            <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 8, paddingBottom: 10 }}>
              {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }}
                  style={{ flex: 1, background: 'rgba(52,211,153,0.3)', borderRadius: '4px 4px 0 0', border: '1px solid rgba(52,211,153,0.2)' }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 9, color: '#52525b' }}>JAN</span>
              <span style={{ fontSize: 9, color: '#52525b' }}>JUL</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ── Panel 3: Supplier Management ────────────────── */
const supplierRows = [
  { name: 'Alpha Inc', initial: 'A', kyc: 'Verified', rating: 4.8, onTime: 97, color: '#34d399' },
  { name: 'Unicorn Resale', initial: 'U', kyc: 'Pending', rating: 4.2, onTime: 88, color: '#f59e0b' },
  { name: 'Global Parts', initial: 'G', kyc: 'Verified', rating: 3.9, onTime: 82, color: '#3b82f6' },
];

const filterTabs = ['All', 'Certified', 'Pending'] as const;

function SupplierPanel() {
  return (
    <DashboardShell title="Supplier Portal · Directory" activeColor="#f59e0b">
      <div style={{ padding: '24px', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 20, height: '100%' }}>
          <div style={{ flex: 1, paddingTop: 10 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {filterTabs.map(f => (
                <div key={f} style={{ fontSize: 11, padding: '6px 12px', borderRadius: 8, color: f === 'All' ? '#000000' : '#52525b', background: f === 'All' ? 'rgba(0,0,0,0.07)' : 'transparent', border: '1px solid rgba(0,0,0,0.07)' }}>{f}</div>
              ))}
            </div>
            {supplierRows.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: s.color }}>{s.initial}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#000000' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b6b7a' }}>KYC: {s.kyc}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: s.color }}>★ {s.rating}</div>
                  <div style={{ fontSize: 10, color: '#52525b' }}>{s.onTime}% On-time</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ flex: 0.8, background: 'rgba(0,0,0,0.02)', borderRadius: 16, padding: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '100%', height: 120, borderRadius: 12, background: 'rgba(0,0,0,0.03)', marginBottom: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, color: '#52525b' }}>Supplier Performance Map</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ height: 32, borderRadius: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>Run Audit Report</div>
              <div style={{ height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#6b6b7a' }}>View Documents</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ── Panel 4: Contract Management ────────────────── */
const contractRows = [
  { name: 'Alpha Inc — Raw Steel', end: 'Apr 2027', tiers: '3 Tiers', pct: 80, warn: false },
  { name: 'Global Parts — MRO', end: 'Jun 2026', tiers: '2 Tiers', pct: 50, warn: false },
  { name: 'IT Licensing Suite', end: 'May 2026', tiers: 'Flat', pct: 20, warn: true },
];

const contractStats = [
  { label: '24 Active', color: '#34d399' },
  { label: '3 Expiring', color: '#f59e0b' },
  { label: '1 Expired', color: '#ef4444' },
];

function ContractPanel() {
  return (
    <DashboardShell title="Contract Lifecycle · Management" activeColor="#3b82f6">
      <div style={{ padding: '24px', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 24, height: '100%' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              {contractStats.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.label}</span>
                </div>
              ))}
            </div>
            {contractRows.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ marginBottom: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#000000' }}>{c.name}</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.05)', color: '#52525b' }}>{c.tiers}</span>
                  </div>
                  <span style={{ fontSize: 11, color: c.warn ? '#f59e0b' : '#52525b' }}>Ends {c.end}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
                    style={{ height: '100%', background: c.warn ? '#f59e0b' : '#3b82f6', borderRadius: 3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ flex: 0.8, background: 'rgba(0,0,0,0.02)', borderRadius: 16, padding: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, display: 'block' }}>Contract Repository</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Standard Terms', size: '2.4 MB', status: 'Approved' },
                { label: 'Volume Pricing', size: '1.1 MB', status: 'Pending' },
                { label: 'KYC Bundle', size: '8.2 MB', status: 'Verified' }
              ].map(doc => (
                <div key={doc.label} style={{ padding: '12px', borderRadius: 10, background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#000000', fontWeight: 500 }}>{doc.label}</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: doc.status === 'Verified' ? 'rgba(52,211,153,0.1)' : 'rgba(0,0,0,0.05)', color: doc.status === 'Verified' ? '#34d399' : '#a1a1aa' }}>{doc.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#52525b' }}>{doc.size} · PDF</span>
                    <div style={{ fontSize: 10, color: '#3b82f6', fontWeight: 600 }}>View</div>
                  </div>
                </div>
              ))}
              <div style={{ height: 36, borderRadius: 10, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#000', fontWeight: 600, marginTop: 8 }}>Renew Primary Contract</div>

              {/* QR Tracking Detail from Brief */}
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.02)', border: '1px dashed rgba(0,0,0,0.07)' }}>
                <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 4, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
                  <div style={{ width: '100%', height: '100%', border: '2px solid #000', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 2, left: 2, width: 6, height: 6, background: '#000' }} />
                    <div style={{ position: 'absolute', top: 2, right: 2, width: 6, height: 6, background: '#000' }} />
                    <div style={{ position: 'absolute', bottom: 2, left: 2, width: 6, height: 6, background: '#000' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Asset Tracking</div>
                  <div style={{ fontSize: 11, color: '#000000', fontWeight: 600 }}>Auto-generated QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

const PANELS = [SourcingPanel, AnalyticsPanel, SupplierPanel, ContractPanel];

/* ── Main export ─────────────────────────────────── */
export default function ScrollFeatureSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orb1Ref.current && orb2Ref.current) {
      gsap.to(orb1Ref.current, {
        x: '+=40',
        y: '+=30',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to(orb2Ref.current, {
        x: '-=50',
        y: '-=40',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(FEATURES.length - 1, Math.floor(v * FEATURES.length));
    setActive(Math.max(0, idx));
  });

  const ActivePanel = PANELS[active] ?? PANELS[0];
  const activeColor = FEATURES[active]?.color ?? FEATURES[0].color;

  return (
    <section ref={containerRef} style={{ position: 'relative', width: '100%', height: '500vh', background: '#f6f9fc' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#f6f9fc' }}>

        {/* Bokeh orbs */}
        <div
          ref={orb1Ref}
          style={{
            position: 'absolute', top: '-5%', left: '-8%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(54,102,255,0.07) 0%, transparent 70%)',
            filter: 'blur(90px)', pointerEvents: 'none',
          }}
        />
        <div
          ref={orb2Ref}
          style={{
            position: 'absolute', bottom: '-8%', right: '-4%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
            filter: 'blur(90px)', pointerEvents: 'none',
          }}
        />

        {/* ── Top: eyebrow + headline (Centered) ── */}
        <div style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 30
        }}>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 100,
                background: 'rgba(54,102,255,0.08)', border: '1px solid rgba(54,102,255,0.2)',
              }}
            >
              <div
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#3666ff',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                Platform Walkthrough
              </span>
            </div>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(32px,4vw,52px)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              color: '#000000',
              lineHeight: 1.1,
              marginBottom: 0,
            }}
          >
            One platform, end-to-end
          </h2>
        </div>

        {/* Content — two flex children at 100% height so right panel never shifts */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            ...GLOBAL_LAYOUT.containerStyle,
            display: 'grid',
            gridTemplateColumns: 'minmax(440px, 0.9fr) 1.1fr', // Slightly wider left col
            gap: 120,
            paddingTop: 280,
            paddingBottom: 100,
            alignItems: 'flex-start' // Top align to sync baselines
          }}
        >
          {/* ── Left: expandable list ── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 100px' }}>
            {/* Feature list */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {FEATURES.map((f, i) => (
                <div
                  key={f.id}
                  style={{
                    position: 'relative',
                    padding: '18px 0 18px 22px',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  {/* Accent bar */}
                  <motion.div
                    animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: 2, background: f.color, borderRadius: 1,
                      transformOrigin: 'top',
                    }}
                  />

                  {/* Title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span
                      style={{
                        fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em',
                        color: active === i ? '#000000' : '#808080',
                        transition: 'color 0.35s',
                      }}
                    >
                      {f.title}
                    </span>
                  </div>

                  {/* Expandable description */}
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: active === i ? 120 : 0, opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.65, marginTop: 10, paddingRight: 24 }}>
                      {f.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: dashboard panel ── */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start', // Top align
            justifyContent: 'flex-start',
            position: 'relative',
            height: '100%',
            paddingTop: 10, // Fine-tuned to hit the same line as the feature headline
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98, x: 120 }}
                animate={{ opacity: 1, scale: 1, x: 60 }} // Flat, but massive and shifted right
                exit={{ opacity: 0, scale: 0.98, x: 120 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '150%', // Massive scale as seen in video
                  minWidth: 1100,
                  height: 680,
                  borderRadius: 24,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  overflow: 'hidden',
                  boxShadow: `0 16px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)`,
                  position: 'relative',
                  zIndex: 20,
                  flexShrink: 0,
                }}
              >
                {/* Subtle top-down gradient for depth without tilt */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, ${activeColor}08 0%, transparent 40%)`,
                  pointerEvents: 'none'
                }} />

                <ActivePanel />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
