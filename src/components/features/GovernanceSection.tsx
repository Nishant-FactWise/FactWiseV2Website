'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrowserChrome, FeatureLayout, FeatureSectionData } from './Shared';

const ApprovalWorkflowMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const steps = [
    { label: 'PR Submitted', by: 'Sarah K.', time: '9:14 AM', status: 'done', color: '#34d399' },
    { label: 'Budget Review', by: 'Finance Team', time: '10:02 AM', status: 'done', color: '#34d399' },
    { label: 'Manager Approval', by: 'John M.', time: 'Pending', status: 'active', color: '#7c5cfc' },
    { label: 'CFO Sign-off', by: 'Linda R.', time: '—', status: 'pending', color: '#3f3f46' },
  ];

  return (
    <div style={{ paddingTop: '80px', perspective: '1200px' }}>
      <motion.div
        style={{
          background: 'linear-gradient(145deg, #0a0a0c 0%, #111116 100%)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: '0 50px 140px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.05)',
          fontFamily: 'var(--font-inter), sans-serif',
          transformStyle: 'preserve-3d',
        }}
      >
        <BrowserChrome url="factwise.io/approvals/queue" />

        <div style={{ padding: '28px 32px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5', marginBottom: 28, letterSpacing: '-0.01em' }}>Approval Queue</div>

          <div ref={ref}>
            {steps.map((step, i, arr) => (
              <motion.div
                key={step.label}
                style={{ display: 'flex', gap: 18 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.9 + i * 0.18 }}
                    style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: step.status === 'done' ? `${step.color}20` : step.status === 'active' ? `${step.color}30` : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${step.status === 'pending' ? 'rgba(255,255,255,0.1)' : step.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: step.status === 'active' ? `0 0 20px ${step.color}50` : 'none',
                    }}
                  >
                    {step.status === 'done' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {step.status === 'active' && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 10, height: 10, borderRadius: '50%', background: step.color }}
                      />
                    )}
                    {step.status === 'pending' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />}
                  </motion.div>

                  {i < arr.length - 1 && (
                    <div style={{ width: 2, height: 36, background: 'rgba(255,255,255,0.04)', marginTop: 5, marginBottom: 5, overflow: 'hidden' }}>
                      <motion.div
                        style={{ width: '100%', background: '#34d399' }}
                        initial={{ height: 0 }}
                        animate={inView && i === 0 ? { height: '100%' } : { height: 0 }}
                        transition={{ duration: 0.7, delay: 1.4 }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ paddingTop: 4, paddingBottom: i < arr.length - 1 ? 28 : 0 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: step.status === 'pending' ? '#52525b' : '#f4f4f5' }}>{step.label}</span>
                    {step.status === 'active' && (
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: 9, fontWeight: 500, color: '#7c5cfc', background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)', padding: '2px 10px', borderRadius: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}
                      >
                        ACTION REQUIRED
                      </motion.span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b6b7a', marginTop: 5, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{step.by}</span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span>{step.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{
              marginTop: 24,
              padding: '20px',
              borderRadius: 16,
              background: 'rgba(124,92,252,0.05)',
              border: '1px solid rgba(124,92,252,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: '#f4f4f5', fontWeight: 600 }}>Purchase Order Review</div>
              <div style={{ fontSize: 11, color: '#6b6b7a', marginTop: 3 }}>PO-2024-0387 · ₹12,450.00</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, fontWeight: 500, color: '#f4f4f5', background: 'rgba(255,255,255,0.03)', cursor: 'pointer' }}>Reject</div>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,92,252,0.4)' }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 0px #7c5cfc00', '0 0 25px #7c5cfc40', '0 0 0px #7c5cfc00'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ padding: '8px 18px', borderRadius: 10, background: '#7c5cfc', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
              >
                Approve
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const GOVERNANCE_DATA: FeatureSectionData = {
  id: 'usability',
  badge: 'Cut excess spend 50%',
  badgeColor: '#7c5cfc',
  title: 'Governance without\nfriction',
  description: 'Automated approval workflows route requests to the right people instantly. An intuitive interface means zero training time — your team gets compliant on day one.',
  features: [
    { icon: '✓', label: 'Auto-routing approvals', desc: 'Define multi-tier approval rules once. Every purchase request flows through the right reviewers automatically.' },
    { icon: '◎', label: 'Zero-training UI', desc: 'An interface so intuitive your team adopts it without workshops or change-management overhead.' },
    { icon: '◈', label: 'Proactive visibility', desc: 'Customized insights surface anomalies before they become budget overruns.' },
  ],
  mockup: <ApprovalWorkflowMockup />,
  align: 'right',
  orbColor1: 'rgba(124,92,252,0.11)',
  orbColor2: 'rgba(54,102,255,0.07)',
};

export default function GovernanceSection() {
  return <FeatureLayout section={GOVERNANCE_DATA} />;
}
