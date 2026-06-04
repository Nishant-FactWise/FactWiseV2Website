'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrowserChrome, FeatureLayout, FeatureSectionData } from './Shared';
import { ShoppingCart, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';

const RequisitionMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const items = [
    { name: 'MacBook Pro 14"', qty: 5, price: '₹1,999', total: '₹9,995', status: 'Approved' },
    { name: 'Dell UltraSharp 32"', qty: 10, price: '₹749', total: '₹7,490', status: 'Pending' },
    { name: 'Ergonomic Desk Chair', qty: 12, price: '₹450', total: '₹5,400', status: 'Draft' },
  ];

  return (
    <div style={{ paddingTop: '100px', perspective: '1200px' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 180, scale: 0.95, rotateY: -10, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1], x: { type: 'spring', stiffness: 40, damping: 12 } }}
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
        <BrowserChrome url="factwise.io/requisitions/new" />

        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#f4f4f5' }}>New Requisition</h4>
              <p style={{ fontSize: 12, color: '#6b6b7a', marginTop: 2 }}>PR-2024-0512 · Draft</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b6b7a', fontSize: 12, fontWeight: 500 }}>Save Draft</div>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: '#7c5cfc', color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                Submit Request <ArrowRight size={14} />
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '14px 18px', color: '#6b6b7a', fontWeight: 500 }}>Item Description</th>
                  <th style={{ padding: '14px 18px', color: '#6b6b7a', fontWeight: 500 }}>Qty</th>
                  <th style={{ padding: '14px 18px', color: '#6b6b7a', fontWeight: 500 }}>Total</th>
                  <th style={{ padding: '14px 18px', color: '#6b6b7a', fontWeight: 500 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <motion.tr 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    style={{ borderBottom: i === items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)' }}
                  >
                    <td style={{ padding: '14px 18px', color: '#f4f4f5', fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: '14px 18px', color: '#6b6b7a' }}>{item.qty}</td>
                    <td style={{ padding: '14px 18px', color: '#f4f4f5' }}>{item.total}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ 
                        fontSize: 10, 
                        fontWeight: 600, 
                        padding: '3px 8px', 
                        borderRadius: 6, 
                        background: item.status === 'Approved' ? 'rgba(52,211,153,0.1)' : item.status === 'Pending' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
                        color: item.status === 'Approved' ? '#34d399' : item.status === 'Pending' ? '#f59e0b' : '#6b6b7a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em'
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ 
              marginTop: 20, 
              padding: '16px', 
              borderRadius: 12, 
              background: 'rgba(124,92,252,0.05)', 
              border: '1px dashed rgba(124,92,252,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: '#7c5cfc',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <Plus size={16} /> Add another item
          </motion.div>
        </div>

        {/* Floating conversion tag */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            background: '#34d399',
            color: '#000',
            padding: '8px 16px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 10px 30px rgba(52,211,153,0.3)'
          }}
        >
          <CheckCircle2 size={14} /> Ready to Order
        </motion.div>
      </motion.div>
    </div>
  );
};

const REQUISITIONS_DATA: FeatureSectionData = {
  id: 'requisitions',
  badge: 'Requisitions',
  badgeColor: '#7c5cfc',
  title: 'Request-to-order\nsimplified',
  description: 'Empower your team to create requisitions with ease. FactWise automatically validates requests against budgets and preferred supplier lists to ensure compliance from the start.',
  features: [
    { icon: '🛒', label: 'Intuitive PR creation', desc: 'A consumer-grade shopping experience for enterprise operations. Search catalogs or add custom items in seconds.' },
    { icon: '📊', label: 'Budget validation', desc: 'Real-time checks against department budgets. Prevent overspending before it even reaches approval.' },
    { icon: '🔄', label: 'One-click conversion', desc: 'Automatically convert approved requisitions into purchase orders and send them to vendors instantly.' },
  ],
  mockup: <RequisitionMockup />,
  align: 'left',
  orbColor1: 'rgba(124,92,252,0.12)',
  orbColor2: 'rgba(54,102,255,0.08)',
};

export default function RequisitionsSection() {
  return <FeatureLayout section={REQUISITIONS_DATA} />;
}
