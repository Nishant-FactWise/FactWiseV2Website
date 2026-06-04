'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrowserChrome, FeatureLayout, FeatureSectionData } from './Shared';

const ReconciliationMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const cards = [
    { label: 'Purchase Order', ref_: 'PO-2024-0387' },
    { label: 'Invoice', ref_: 'INV-9921-B' },
    { label: 'Goods Receipt', ref_: 'GR-4412' },
    { label: 'Quality Check', ref_: 'QC-881' },
  ];

  return (
    <div style={{ paddingTop: '140px' }}>
      <motion.div 
        ref={ref} 
        style={{ background: '#0a0a0c', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', fontFamily: 'var(--font-inter), sans-serif', perspective: '1000px' }}
      >
        <BrowserChrome url="factwise.io/payments/reconciliation" />

        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5' }}>4-Way Reconciliation</div>
            <motion.div
              style={{ fontSize: 10, fontWeight: 600, color: '#34d399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', padding: '3px 9px', borderRadius: 5 }}
            >
              Auto-matched
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 9, color: '#6b6b7a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.label}</span>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 440, damping: 18, delay: 0.42 + i * 0.11 }}
                    style={{ fontSize: 12, color: '#34d399', fontWeight: 700 }}
                  >
                    ✓
                  </motion.span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#f4f4f5', marginTop: 4 }}>{card.ref_}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{ padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ fontSize: 10, color: '#6b6b7a' }}>Total Amount</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.95, duration: 0.4 }}
                style={{ fontSize: 16, fontWeight: 700, color: '#f4f4f5', marginTop: 1 }}
              >
                ₹12,480.00
              </motion.div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#6b6b7a' }}>Variance</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1.05 }}
                style={{ fontSize: 16, fontWeight: 700, color: '#34d399', marginTop: 1 }}
              >
                ₹0.00
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 0px #f59e0b00', '0 0 16px #f59e0b40', '0 0 0px #f59e0b00'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ padding: '7px 14px', borderRadius: 8, background: '#f59e0b', fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              Release Payment →
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AUTOMATION_DATA: FeatureSectionData = {
  id: 'efficiency',
  badge: '20% productivity boost',
  badgeColor: '#f59e0b',
  title: 'End-to-end\nautomation',
  description: 'Streamline the entire source-to-pay journey. Real-time data flows through every touchpoint while four-way reconciliation closes invoices without manual intervention.',
  features: [
    { icon: '⚡', label: 'Automated ordering', desc: 'Convert approved RFQs to POs in one click. No re-entry, no errors, no delays.' },
    { icon: '◷', label: 'Real-time data', desc: 'Every stakeholder sees the same live numbers — inventory, budget, delivery status — always.' },
    { icon: '⇌', label: 'Four-way reconciliation', desc: 'POs, invoices, goods receipts, and quality checks matched automatically. Payment released on match.' },
  ],
  mockup: <ReconciliationMockup />,
  align: 'left',
  orbColor1: 'rgba(245,158,11,0.06)',
  orbColor2: 'rgba(124,92,252,0.05)',
};

export default function AutomationSection() {
  return <FeatureLayout section={AUTOMATION_DATA} />;
}
