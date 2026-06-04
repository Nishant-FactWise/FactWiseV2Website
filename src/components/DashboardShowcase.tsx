'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  BarChart3, Users, FileText, Package,
  CheckCircle2, Trophy, CreditCard,
  DollarSign,
} from 'lucide-react';
import { GLOBAL_LAYOUT } from './LayoutConfig';

// ─── Shared shell (sidebar + top bar) ────────────────────────────────────────

const SIDE_ICONS = [BarChart3, Users, FileText, Package, DollarSign];

function Shell({
  accent,
  topbar,
  children,
}: {
  accent: string;
  topbar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0a0a0c',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        display: 'flex',
        overflow: 'hidden',
        fontFamily: 'var(--font-inter), sans-serif',
        boxShadow: '0 48px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 50,
          background: 'rgba(0,0,0,0.45)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '14px 0',
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            background: '#0052cc',
            borderRadius: 7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 900,
            fontSize: 12,
            marginBottom: 6,
          }}
        >
          F
        </div>
        {SIDE_ICONS.map((Icon, idx) => (
          <div
            key={idx}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: idx === 0 ? `${accent}18` : 'transparent',
              border: `1px solid ${idx === 0 ? `${accent}35` : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={12} color={idx === 0 ? accent : 'rgba(255,255,255,0.16)'} />
          </div>
        ))}
      </div>

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div
          style={{
            height: 42,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 0,
            flexShrink: 0,
          }}
        >
          {topbar}
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Shared KPI card ──────────────────────────────────────────────────────────

function Kpi({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: '9px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 800, color: accent ?? '#10b981', lineHeight: 1 }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Tab bar helper ───────────────────────────────────────────────────────────

function Tabs({ items, accent }: { items: string[]; accent: string }) {
  return (
    <>
      {items.map((t, i) => (
        <span
          key={t}
          style={{
            fontSize: 9,
            fontWeight: 600,
            marginRight: 14,
            color: i === 0 ? accent : 'rgba(255,255,255,0.22)',
            borderBottom: i === 0 ? `1.5px solid ${accent}` : 'none',
            paddingBottom: 2,
          }}
        >
          {t}
        </span>
      ))}
    </>
  );
}

// ─── Shared mini helpers ─────────────────────────────────────────────────────

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ fontSize: 8, fontWeight: 700, color, background: bg, border: `1px solid ${color}30`, borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
      {label}
    </span>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.045)' }}>
      {children}
    </div>
  );
}

// ─── 1. Requisitions mockup ──────────────────────────────────────────────────

function RequisitionMockup() {
  const accent = '#f43f5e';
  const reqs = [
    { id: 'REQ-0841', item: 'PCB Assembly × 500', dept: 'R&D', amount: '₹1,24,800', status: 'Approved', lvl: 3 },
    { id: 'REQ-0842', item: 'Packaging Film × 2000', dept: 'Ops', amount: '₹38,400', status: 'Pending', lvl: 1 },
    { id: 'REQ-0843', item: 'Server Hardware', dept: 'IT', amount: '₹3,20,000', status: 'Rework', lvl: 2 },
    { id: 'REQ-0844', item: 'Office Supplies × 10', dept: 'Admin', amount: '₹4,200', status: 'Approved', lvl: 2 },
  ];

  return (
    <Shell
      accent={accent}
      topbar={
        <>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#f4f4f5', marginRight: 18, flexShrink: 0 }}>
            Requisitions
          </span>
          <Tabs items={['All', 'Pending', 'Approved', 'Rejected']} accent={accent} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <FileText size={12} color="rgba(255,255,255,0.22)" />
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
        <Kpi label="Total" value="24" accent={accent} />
        <Kpi label="Pending" value="7" accent="#f59e0b" />
        <Kpi label="Approved" value="15" accent="#10b981" />
        <Kpi label="Avg Time" value="2.1d" accent={accent} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {reqs.map((r) => {
          const statusColor = r.status === 'Approved' ? '#10b981' : r.status === 'Rework' ? '#f59e0b' : accent;
          const statusBg = r.status === 'Approved' ? '#10b98118' : r.status === 'Rework' ? '#f59e0b18' : `${accent}18`;
          return (
            <Row key={r.id}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', fontWeight: 600 }}>{r.id}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#f4f4f5', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.item}</span>
                  <Badge label={r.status} color={statusColor} bg={statusBg} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>{r.dept}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#f4f4f5' }}>{r.amount}</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                    {[1, 2, 3].map((l) => (
                      <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: '50%',
                          background: l <= r.lvl ? `${accent}20` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${l <= r.lvl ? accent : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 7, color: l <= r.lvl ? accent : 'rgba(255,255,255,0.2)',
                          fontWeight: 800,
                        }}>
                          {l <= r.lvl ? '✓' : l}
                        </div>
                        {l < 3 && <div style={{ width: 10, height: 1, background: l < r.lvl ? `${accent}60` : 'rgba(255,255,255,0.08)' }} />}
                      </div>
                    ))}
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>L{r.lvl}/3</span>
                  </div>
                </div>
              </div>
            </Row>
          );
        })}
      </div>
    </Shell>
  );
}

// ─── 2. Sourcing / RFQ mockup ────────────────────────────────────────────────

function SourcingMockup() {
  const accent = '#7c5cfc';
  const vendors = [
    { name: 'Thrift Co.', landed: 312, rank: 1, color: '#10b981' },
    { name: 'AlphaSup', landed: 334, rank: 2, color: '#f59e0b' },
    { name: 'GlobalMat', landed: 367, rank: 3, color: '#3b82f6' },
  ];
  const maxLanded = 367;

  return (
    <Shell
      accent={accent}
      topbar={
        <>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#f4f4f5', marginRight: 18, flexShrink: 0 }}>
            RFQ: K-A Assembly
          </span>
          <Tabs items={['Overview', 'Bids', 'Compare', 'Award']} accent={accent} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <Trophy size={12} color="rgba(255,255,255,0.22)" />
            <BarChart3 size={12} color="rgba(255,255,255,0.22)" />
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
        <Kpi label="Vendors Invited" value="8" accent={accent} />
        <Kpi label="Responded" value="3" accent="#10b981" />
        <Kpi label="Best Landed" value="₹312" accent={accent} />
        <Kpi label="Rounds" value="2" accent={accent} />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Landed Rate Comparison · Raw Material 1
        </div>
        {vendors.map((v) => (
          <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: '#f4f4f5', fontWeight: 600, width: 62, flexShrink: 0 }}>{v.name}</span>
            <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${(v.landed / maxLanded) * 100}%`, height: '100%', background: v.color, opacity: 0.7, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                <span style={{ fontSize: 7, fontWeight: 800, color: '#fff' }}>₹{v.landed}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              {v.rank === 1 && <Trophy size={9} color="#f59e0b" />}
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>#{v.rank}</span>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          {[['Base Rate', '#6b7280'], ['Freight', '#9ca3af'], ['Landed', '#f4f4f5']].map(([l, c]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 3, borderRadius: 2, background: c }} />
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#10b98110', border: '1px solid #10b98128', borderRadius: 8 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#10b981' }}>Recommended: Thrift Co. — ₹312 landed</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Save 9.5% vs. avg vendor</div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#fff', background: accent, padding: '5px 10px', borderRadius: 6 }}>
          Award & Create PO →
        </div>
      </div>
    </Shell>
  );
}

// ─── 3. Purchase Orders mockup ───────────────────────────────────────────────

function PurchaseOrderMockup() {
  const accent = '#3b82f6';
  const steps = ['Created', 'Approved', 'Issued', 'Ongoing', 'Completed'];
  const currentStep = 3;
  const items = [
    { name: 'PCB Assembly', qty: '500 pcs', rate: '₹285/pc', total: '₹1,42,500', ok: true },
    { name: 'Packaging Film', qty: '2000 m', rate: '₹19.20/m', total: '₹38,400', ok: true },
    { name: 'Solder Wire', qty: '50 kg', rate: '₹820/kg', total: '₹41,000', ok: false },
  ];

  return (
    <Shell
      accent={accent}
      topbar={
        <>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#f4f4f5', marginRight: 18, flexShrink: 0 }}>
            PO-2024-0387
          </span>
          <Tabs items={['All POs', 'Ongoing', 'Pending Approval', 'Completed']} accent={accent} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <Package size={12} color="rgba(255,255,255,0.22)" />
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
        <Kpi label="Active POs" value="48" accent={accent} />
        <Kpi label="In Approval" value="12" accent="#f59e0b" />
        <Kpi label="Overdue" value="3" accent="#f43f5e" />
        <Kpi label="Total Value" value="₹2.4 Cr" accent={accent} />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '9px 12px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
          PO Status · Thrift Co. · ₹2,21,900
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: i < currentStep ? accent : i === currentStep ? `${accent}30` : 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${i <= currentStep ? accent : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, color: i < currentStep ? '#fff' : i === currentStep ? accent : 'rgba(255,255,255,0.2)',
                  fontWeight: 800,
                }}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 7, color: i <= currentStep ? '#f4f4f5' : 'rgba(255,255,255,0.22)', fontWeight: i === currentStep ? 700 : 400, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1.5, background: i < currentStep ? accent : 'rgba(255,255,255,0.08)', margin: '0 4px', marginBottom: 18 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 16px', gap: 0, padding: '5px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {['Item', 'Qty', 'Rate', 'Total', ''].map((h) => (
            <span key={h} style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
          ))}
        </div>
        {items.map((item) => (
          <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 16px', gap: 0, padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: '#f4f4f5', fontWeight: 600 }}>{item.name}</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{item.qty}</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{item.rate}</span>
            <span style={{ fontSize: 9, color: '#f4f4f5', fontWeight: 700 }}>{item.total}</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.ok ? '#10b981' : '#f59e0b' }} />
          </div>
        ))}
      </div>
    </Shell>
  );
}

// ─── 4. Invoice matching mockup ──────────────────────────────────────────────

function InvoiceMockup() {
  const accent = '#f59e0b';
  const invoices = [
    { id: 'INV-9921', vendor: 'Thrift Co.', amount: '₹1,42,500', status: 'matched', mismatch: null },
    { id: 'INV-9922', vendor: 'AlphaSup', amount: '₹34,200', status: 'exception', mismatch: 'Price mismatch' },
    { id: 'INV-9923', vendor: 'GlobalMat', amount: '₹78,900', status: 'matched', mismatch: null },
  ];

  return (
    <Shell
      accent={accent}
      topbar={
        <>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#f4f4f5', marginRight: 18, flexShrink: 0 }}>
            Invoice Matching
          </span>
          <Tabs items={['All', 'Auto-matched', 'Exceptions', 'Pending']} accent={accent} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <CreditCard size={12} color="rgba(255,255,255,0.22)" />
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
        <Kpi label="Auto-matched" value="142" accent="#10b981" />
        <Kpi label="Exceptions" value="7" accent="#f43f5e" />
        <Kpi label="Match Rate" value="91%" accent={accent} />
        <Kpi label="Pending" value="7" accent="#6b7280" />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          3-Way Match · INV-9921
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { label: 'Purchase Order', id: 'PO-0387', amount: '₹1,42,500', ok: true },
            { label: 'Invoice', id: 'INV-9921', amount: '₹1,42,500', ok: true },
            { label: 'Goods Receipt', id: 'GR-4412', amount: '₹1,42,500', ok: true },
          ].map((doc, i) => (
            <div key={doc.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: `1px solid ${doc.ok ? '#10b98138' : '#f43f5e38'}`, borderRadius: 8, padding: '7px 9px' }}>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{doc.label}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#f4f4f5' }}>{doc.id}</div>
                <div style={{ fontSize: 10, fontWeight: 800, color: doc.ok ? '#10b981' : '#f43f5e', marginTop: 3 }}>{doc.amount}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: doc.ok ? '#10b981' : '#f43f5e', marginTop: 4 }}>{doc.ok ? '✓ Verified' : '✗ Mismatch'}</div>
              </div>
              {i < 2 && (
                <div style={{ width: 16, textAlign: 'center', fontSize: 10, color: '#10b981', flexShrink: 0 }}>⟷</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {invoices.map((inv) => (
          <Row key={inv.id}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: inv.status === 'matched' ? '#10b981' : '#f43f5e', flexShrink: 0 }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#f4f4f5', width: 70, flexShrink: 0 }}>{inv.id}</span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', flex: 1 }}>{inv.vendor}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#f4f4f5' }}>{inv.amount}</span>
            {inv.mismatch
              ? <Badge label={inv.mismatch} color="#f43f5e" bg="#f43f5e18" />
              : <Badge label="Auto-matched" color="#10b981" bg="#10b98118" />
            }
          </Row>
        ))}
      </div>
    </Shell>
  );
}

// ─── 5. Analytics mockup ─────────────────────────────────────────────────────

function AnalyticsMockup() {
  const accent = '#34d399';
  const categories = [
    { name: 'Raw Materials', pct: 42, color: '#7c5cfc' },
    { name: 'Electronics', pct: 28, color: '#3b82f6' },
    { name: 'Packaging', pct: 16, color: '#f59e0b' },
    { name: 'Services', pct: 14, color: '#f43f5e' },
  ];
  const vendors = [
    { name: 'Thrift Co.', spend: '₹1.2 Cr', pct: 100 },
    { name: 'AlphaSup', spend: '₹82L', pct: 68 },
    { name: 'GlobalMat', spend: '₹64L', pct: 53 },
    { name: 'PartHub', spend: '₹38L', pct: 32 },
  ];

  return (
    <Shell
      accent={accent}
      topbar={
        <>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#f4f4f5', marginRight: 18, flexShrink: 0 }}>
            Analytics
          </span>
          <Tabs items={['Spend', 'Pricing', 'Vendors', 'Items']} accent={accent} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <BarChart3 size={12} color="rgba(255,255,255,0.22)" />
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 7 }}>
        <Kpi label="Total Spend" value="₹4.2 Cr" accent={accent} />
        <Kpi label="Savings" value="23%" accent="#10b981" />
        <Kpi label="Active POs" value="156" accent={accent} />
        <Kpi label="Vendors" value="38" accent={accent} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, flex: 1, minHeight: 0 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Spend by Category</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
            {categories.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', width: 72, flexShrink: 0 }}>{c.name}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: 3, opacity: 0.8 }} />
                </div>
                <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.45)', width: 22, textAlign: 'right', flexShrink: 0 }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Top Vendors by Spend</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7 }}>
            {vendors.map((v) => (
              <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', width: 56, flexShrink: 0 }}>{v.name}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${v.pct}%`, height: '100%', background: accent, borderRadius: 3, opacity: 0.7 }} />
                </div>
                <span style={{ fontSize: 8, fontWeight: 700, color: accent, width: 38, textAlign: 'right', flexShrink: 0 }}>{v.spend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const ITEMS = [
  {
    id: 'requisitions',
    label: 'Requisitions',
    accent: '#f43f5e',
    title: 'Purchase requests, routed and approved automatically.',
    description:
      'Internal teams raise requests in seconds. Multi-level approval chains route each request to the right approver — with escalation, delegation, and a full audit trail.',
    bullets: [
      'Multi-level approval hierarchy with criteria-based routing',
      'Department and budget-aware request tracking',
      'Automatic fulfillment tracking from request to delivery',
    ],
    Dashboard: RequisitionMockup,
  },
  {
    id: 'sourcing',
    label: 'Strategic Sourcing',
    accent: '#7c5cfc',
    title: 'Run competitive RFQs and award the best bid in one flow.',
    description:
      'Invite multiple vendors, collect bids, negotiate in rounds, compare landed costs side-by-side, and create POs from awarded bids — without leaving the platform.',
    bullets: [
      'Multi-round bidding with full negotiation history preserved',
      'Landed cost comparison: base rate, freight, taxes, duties',
      'One-click PO creation from awarded bid allocations',
    ],
    Dashboard: SourcingMockup,
  },
  {
    id: 'purchase-orders',
    label: 'Purchase Orders',
    accent: '#3b82f6',
    title: 'Every purchase order tracked from issue to delivery.',
    description:
      'Create POs from sourcing events or directly. Route through configurable approval workflows, manage delivery schedules, and handle amendments with full version history.',
    bullets: [
      'Criteria-based multi-level approval routing',
      'Delivery schedule management with buyer-seller confirmation',
      'Full amendment history — every revision version-chained',
    ],
    Dashboard: PurchaseOrderMockup,
  },
  {
    id: 'invoice-payment',
    label: 'Invoice & Payment',
    accent: '#f59e0b',
    title: 'Invoices matched and released without manual work.',
    description:
      'Automatic 3-way matching flags price, tax, and terms mismatches before they become problems. Credits, prepayments, and payment tracking all in one place.',
    bullets: [
      'Automatic PO–Invoice–GR 3-way matching',
      'Auto-hold on 7 mismatch conditions with exception handling',
      'Credit management: QC rejections, prepayments, netting',
    ],
    Dashboard: InvoiceMockup,
  },
  {
    id: 'analytics',
    label: 'Analytics & Intelligence',
    accent: '#34d399',
    title: 'Every price, every vendor, every dollar — visible.',
    description:
      'A single analytics layer joins your entire supply chain. Unified pricing intelligence aggregates contracts, bids, POs, and live distributor feeds in one searchable repository.',
    bullets: [
      'Full chain analytics: RFQ → Bid → PO → Invoice → Payment',
      'Pricing repository from 6 sources including Digi-Key and Mouser',
      'Configurable dashboards with 15+ views, filters, and export',
    ],
    Dashboard: AnalyticsMockup,
  },
];

// ─── Content panel ────────────────────────────────────────────────────────────

function ContentPanel({ item }: { item: (typeof ITEMS)[0] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 0 0 52px',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(24px, 2.8vw, 36px)',
          fontWeight: 300,
          lineHeight: 1.15,
          color: '#f4f4f5',
          marginBottom: 16,
          letterSpacing: '-0.02em',
          maxWidth: 380,
        }}
      >
        {item.title}
      </h2>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: '#6b6b7a',
          marginBottom: 28,
          maxWidth: 380,
        }}
      >
        {item.description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {item.bullets.map((b) => (
          <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={15} color={item.accent} style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, lineHeight: 1.5, color: '#a1a1aa' }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerListRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const listY = useMotionValue(0);

  const total = ITEMS.length;
  const cardMetrics = useRef<{ top: number; height: number }[]>([]);

  const handleDotClick = useCallback((targetIdx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const viewH = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollRange = section.clientHeight - viewH;
    const targetScrollY = sectionTop + (targetIdx / Math.max(1, total - 1)) * scrollRange;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }, [total]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;

      // Lazily measure cards on first invocation (or after forced re-measure)
      if (cardMetrics.current.length === 0) {
        cardMetrics.current = cardRefs.current.map((el) => ({
          top: el?.offsetTop ?? 0,
          height: el?.offsetHeight ?? 0,
        }));
      }

      const section = sectionRef.current;
      const metrics = cardMetrics.current;
      if (!section || metrics.length < 2) return;

      const viewH = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();

      // Progress 0→1 across the sticky scroll range
      const scrollRange = sectionRect.height - viewH;
      const scrolled = -sectionRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      // Translate inner list: card[0] centered at progress=0, card[N-1] at progress=1
      // HEADER_H accounts for the 200px padding-top on the two-column layout so cards
      // center within the visible content area, not the full viewport height.
      const HEADER_H = 200;
      const first = metrics[0];
      const last = metrics[total - 1];
      const startY = (viewH - HEADER_H) / 2 - first.top - first.height / 2;
      const endY = (viewH - HEADER_H) / 2 - last.top - last.height / 2;
      const targetY = startY + (endY - startY) * progress;
      listY.set(targetY);

      // Active = card whose center is closest to the content-area midpoint
      const viewCenter = (viewH - HEADER_H) / 2;
      let minDist = Infinity;
      let newActive = activeIdxRef.current;
      metrics.forEach(({ top, height }, i) => {
        const dist = Math.abs(targetY + top + height / 2 - viewCenter);
        if (dist < minDist) { minDist = dist; newActive = i; }
      });

      // Hysteresis: only switch when new winner is clearly closer (>30px margin)
      const currentDist = (() => {
        const m = metrics[activeIdxRef.current];
        return m ? Math.abs(targetY + m.top + m.height / 2 - viewCenter) : Infinity;
      })();

      if (newActive !== activeIdxRef.current && minDist < currentDist - 30) {
        activeIdxRef.current = newActive;
        setActiveIndex(newActive);
      }
    });
  }, [listY, total]);

  useEffect(() => {
    const handleResize = () => {
      cardMetrics.current = []; // force re-measure
      handleScroll();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // set initial position
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${total * 100}vh`,
        width: '100%',
        background: '#0a0a0c',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#0a0a0c',
        }}
      >
        {/* Centered section header */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: `${GLOBAL_LAYOUT.paddingX} ${GLOBAL_LAYOUT.paddingX} 0`,
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7c5cfc', boxShadow: '0 0 10px #7c5cfc' }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: '#7c5cfc', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
              Platform Tour
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: '#f4f4f5', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 16 }}>
            The full source-to-pay{' '}
            <span style={{ color: '#6b6b7a', fontWeight: 300 }}>lifecycle.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.7, fontWeight: 400, maxWidth: 480 }}>
            Scroll through every module — from the first purchase request to the final payment.
          </p>
        </div>
        {/* Numbered step navigator */}
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            zIndex: 10,
          }}
        >
          {ITEMS.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleDotClick(i)}
                title={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 0',
                  justifyContent: 'flex-end',
                  fontFamily: 'inherit',
                }}
              >
                <motion.div
                  animate={{
                    background: isActive ? item.accent : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.3)',
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `1px solid ${isActive ? item.accent : 'rgba(255,255,255,0.12)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div
          style={{
            maxWidth: GLOBAL_LAYOUT.maxWidth,
            margin: '0 auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: `200px ${GLOBAL_LAYOUT.paddingX} 0`,
          }}
        >
          {/* LEFT: dashboard column — translates vertically as page scrolls */}
          <div style={{ width: '57%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            {/* Fade edges so off-screen cards dissolve naturally */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 140,
                background: 'linear-gradient(to bottom, #0a0a0c 20%, transparent)',
                pointerEvents: 'none', zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
                background: 'linear-gradient(to top, #0a0a0c 20%, transparent)',
                pointerEvents: 'none', zIndex: 2,
              }}
            />

            <motion.div
              ref={innerListRef}
              style={{ display: 'flex', flexDirection: 'column', gap: 100, y: listY }}
            >
              {ITEMS.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.div
                    key={item.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    animate={{
                      scale: isActive ? 1 : 0.88,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.8 }}
                    style={{
                      transformOrigin: 'center center',
                      flexShrink: 0,
                      borderRadius: 18,
                      boxShadow: isActive ? `0 0 0 1px ${item.accent}30, 0 32px 64px rgba(0,0,0,0.5), 0 0 80px ${item.accent}12` : 'none',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    <item.Dashboard />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: content synced to active dashboard */}
          <div
            style={{
              width: '43%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.7 }}
                style={{ width: '100%' }}
              >
                <ContentPanel item={ITEMS[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
