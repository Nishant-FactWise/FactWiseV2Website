'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import SectionHeader from './SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Mini mockup components ──────────────────── */

const BrowserFrame = ({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) => (
  <div className={className} style={{ background: '#0a0a0c', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', fontFamily: 'var(--font-inter), sans-serif', position: 'relative' }}>
    <div style={{ padding: '10px 16px', background: '#111116', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', opacity: 0.8 }} />
      </div>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 12px', fontSize: 10, color: '#6b6b7a', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {url}
      </div>
    </div>
    {children}
  </div>
);

function SupplierScoringMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const suppliers = [
    { name: 'Alpha Inc', tag: 'Recommended', price: '₹4.20', lead: '5 days', qty: 100, score: 94, color: '#34d399' },
    { name: 'Unicorn Resale', tag: 'Alt', price: '₹4.85', lead: '7 days', qty: 50, score: 81, color: '#7c5cfc' },
    { name: 'Stermone Ltd', tag: 'New', price: '₹5.10', lead: '10 days', qty: 200, score: 72, color: '#fbbf24' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".row-item", {
        x: -20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      gsap.from(".score-fill", {
        width: 0,
        stagger: 0.2,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <BrowserFrame url="factwise.io/sourcing/events/rfq-2024-011">
      <div ref={containerRef}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#f4f4f5', marginBottom: 4 }}>Select Winners</div>
            <div style={{ fontSize: 12, color: '#6b6b7a' }}>RFQ-2024-011 · Office Supplies Q4</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 500, color: '#f4f4f5', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}>Compare</div>
            <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#fff', background: '#7c5cfc', borderRadius: 6 }}>Award</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 12, padding: '10px 16px', background: '#111116', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {['SUPPLIER', 'UNIT PRICE', 'LEAD TIME', 'MIN QTY', 'SCORE'].map(h => (
            <div key={h} style={{ fontSize: 9, fontWeight: 600, color: '#6b6b7a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {suppliers.map((s, i) => (
            <div key={i} className="row-item"
              style={{
                display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', alignItems: 'center',
                background: i === 0 ? 'rgba(52,211,153,0.05)' : 'transparent',
                borderLeft: i === 0 ? '3px solid #34d399' : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{s.name[0]}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#f4f4f5' }}>{s.name}</div>
                  <div style={{ fontSize: 9, color: s.color, background: `${s.color}15`, padding: '2px 6px', borderRadius: 4, alignSelf: 'flex-start', fontWeight: 600 }}>{s.tag}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f4f4f5' }}>{s.price}</div>
              <div style={{ fontSize: 12, color: '#a1a1aa' }}>{s.lead}</div>
              <div style={{ fontSize: 12, color: '#a1a1aa' }}>{s.qty}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: '#27272a', borderRadius: 2 }}>
                  <div className="score-fill" style={{ width: `${s.score}%`, height: '100%', background: s.color, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.score}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#18181b' }}>
          <div style={{ fontSize: 11, color: '#71717a' }}>3 suppliers · Responses closed</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 500, color: '#fff', background: '#10b981', borderRadius: 6 }}>Award Alpha Inc →</div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SourcingPipelineMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = [
    { label: 'PR Submitted', sub: 'Sarah K. · 9:14 AM', status: 'done' },
    { label: 'Budget Review', sub: 'Finance Team · 10:02 AM', status: 'done' },
    { label: 'Manager Approval', sub: 'John M. · Pending', status: 'active' },
    { label: 'CFO Sign-off', sub: 'Linda R. · —', status: 'pending' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-item", {
        opacity: 0,
        y: 10,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      gsap.to(".active-pulse", {
        scale: 1.5,
        opacity: 0,
        repeat: -1,
        duration: 1.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <BrowserFrame url="factwise.io/approvals/queue">
      <div ref={containerRef}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5' }}>Approval Queue</div>
        </div>
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((s, i) => (
            <div key={i} className="step-item" style={{ display: 'flex', gap: 12, position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', left: 11, top: 24, bottom: -20, width: 2, background: s.status === 'done' ? '#34d399' : 'rgba(255,255,255,0.04)' }} />
              )}
              <div style={{
                width: 24, height: 24, borderRadius: '50%', border: `2px solid ${s.status === 'done' ? '#34d399' : s.status === 'active' ? '#7c5cfc' : '#3f3f46'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', zIndex: 1, position: 'relative'
              }}>
                {s.status === 'done' && <span style={{ fontSize: 10, color: '#34d399' }}>✓</span>}
                {s.status === 'active' && (
                  <>
                    <div className="active-pulse" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#7c5cfc30' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c5cfc' }} />
                  </>
                )}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: s.status === 'pending' ? '#a1a1aa' : '#f4f4f5' }}>{s.label}</div>
                  {s.status === 'active' && <div style={{ fontSize: 9, fontWeight: 600, color: '#7c5cfc', background: '#7c5cfc20', padding: '2px 6px', borderRadius: 4 }}>IN PROGRESS</div>}
                </div>
                <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ margin: '0 16px 16px', padding: '12px', background: '#7c5cfc10', border: '1px solid #7c5cfc20', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: '#7c5cfc', fontWeight: 500 }}>PO-2024-0387 awaiting review</div>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#fff', background: '#7c5cfc', borderRadius: 6 }}>Approve</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function NLPMockup() {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullText = "What is our total spend on steel?";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typing effect
      gsap.to({}, {
        duration: 2.5,
        repeat: -1,
        repeatDelay: 2,
        onUpdate: function () {
          if (textRef.current) {
            const progress = this.progress();
            const charCount = Math.floor(progress * fullText.length);
            textRef.current.textContent = fullText.slice(0, charCount);
          }
        }
      });

      // Chart bars
      gsap.from(".bar", {
        scaleY: 0,
        stagger: 0.1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 40
      }}>
        <span style={{ color: '#7c5cfc', fontSize: 13, fontWeight: 600 }}>⌘</span>
        <span ref={textRef} style={{ fontSize: 12, color: '#6b6b7a', fontStyle: 'italic' }}></span>
        <span style={{ marginLeft: 'auto', width: 2, height: 16, background: '#7c5cfc', animation: 'blink 1s infinite' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 48, padding: '0 4px' }}>
        {[40, 65, 85, 100, 75, 90, 60].map((h, i) => (
          <div key={i} className="bar"
            style={{
              flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0',
              background: i === 3 ? '#7c5cfc' : 'rgba(124,92,252,0.15)',
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#34d399', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)', padding: '6px 10px', borderRadius: 8 }}>
        ↑ ₹2.4M spend analyzed
      </div>
      <style jsx>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

function BYOKMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [
    { label: 'PURCHASE ORDER', val: 'PO-2024-0387' },
    { label: 'INVOICE', val: 'INV-9921-B' },
    { label: 'GOODS RECEIPT', val: 'GR-4412' },
    { label: 'QUALITY CHECK', val: 'QC-881' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".match-item", {
        scale: 0.95,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      gsap.to(".release-btn", {
        boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <BrowserFrame url="factwise.io/payments/reconciliation">
      <div ref={containerRef}>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5' }}>4-Way Reconciliation</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#34d399', background: '#34d39915', padding: '4px 10px', borderRadius: 6 }}>Auto-matched</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px 16px' }}>
          {items.map((item, i) => (
            <div key={i} className="match-item"
              style={{ padding: '12px 16px', background: '#34d39908', border: '1px solid #34d39930', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#a1a1aa', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5' }}>{item.val}</div>
              </div>
              <div style={{ fontSize: 14, color: '#34d399', fontWeight: 'bold' }}>✓</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px', margin: '0 16px 16px', background: '#111116', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: '#6b6b7a', marginBottom: 4 }}>Total Amount</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5' }}>₹12,480.00</div>
          </div>
          <div className="release-btn" style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#f59e0b', borderRadius: 8 }}>
            Release Payment →
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Feature cards data ──────────────────────── */
const features = [
  {
    badge: { label: 'AI Risk', cls: 'pv' },
    title: 'Supplier Intelligence',
    description: 'Score suppliers based on multi-dimensional data points: lead time, financial risk, and ESG compliance.',
    colSpan: 'md:col-span-2',
    MockupComponent: SupplierScoringMockup,
    delay: 0.08,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Workflows', cls: 'pb' },
    title: 'Approval Workflows',
    description: 'Manage RFX cycles and contract lifecycle with a node-based visual workflow builder.',
    colSpan: 'md:col-span-1',
    MockupComponent: SourcingPipelineMockup,
    delay: 0.16,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Insights', cls: 'pv' },
    title: 'Conversational Analytics',
    description: 'Query spend data in plain English. Get real-time performance charts and saving opportunities.',
    colSpan: 'md:col-span-1',
    MockupComponent: NLPMockup,
    delay: 0.24,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Finance', cls: 'pr' },
    title: 'Automated Reconciliation',
    description: 'Automatically perform 4-way matching between POs, Invoices, Goods Receipts, and Quality Checks.',
    colSpan: 'md:col-span-2',
    MockupComponent: BYOKMockup,
    delay: 0.32,
    accent: '#f59e0b',
  },
];

function ProcessDemo({ cardsRef }: { cardsRef: React.RefObject<(HTMLDivElement | null)[]> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const steps = ["Source", "Approve", "Analyze", "Pay"];

  useEffect(() => {
    if (!cursorRef.current || !cardsRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 2 }
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.to(cursorRef.current, {
        x: () => {
          const rect = card.getBoundingClientRect();
          const parentRect = card.parentElement?.getBoundingClientRect() || { left: 0 };
          return rect.left - parentRect.left + rect.width / 2;
        },
        y: () => {
          const rect = card.getBoundingClientRect();
          const parentRect = card.parentElement?.getBoundingClientRect() || { top: 0 };
          return rect.top - parentRect.top + rect.height / 2;
        },
        opacity: 1,
        scale: 1,
        onStart: () => setActiveStep(i),
      }, i === 0 ? 0 : "+=1");
    });

    return () => { tl.kill(); };
  }, [cardsRef]);

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'absolute', width: 20, height: 20, background: '#7c5cfc',
        borderRadius: '50%', filter: 'blur(8px)', opacity: 0, scale: 0,
        pointerEvents: 'none', zIndex: 50, border: '2px solid rgba(255,255,255,0.5)',
        boxShadow: '0 0 20px #7c5cfc'
      }} />
      <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 20, zIndex: 30 }}>
        {steps.map((s, i) => (
          <div key={s} style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: activeStep === i ? '#7c5cfc' : '#3f3f46',
            transition: 'color 0.3s'
          }}>
            {i + 1}. {s}
          </div>
        ))}
      </div>
    </>
  );
}

export default function BentoGrid() {
  return (
    <section id="product" style={{ ...GLOBAL_LAYOUT.sectionStyle, paddingTop: '40px', zIndex: 20 }}>
      <div style={GLOBAL_LAYOUT.containerStyle}>

      <SectionHeader
        label="Capabilities"
        title="Modern Source-to-Pay."
        description="A holistic suite of tools designed to optimize direct material spend and mitigate supply chain risk."
        accentColor="#7c5cfc"
      />

      {/* Bento grid */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-cols-1 md:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className={f.colSpan}
              style={{
                position: 'relative',
                background: '#0a0a0c',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '32px',
                overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                gsap.to(el, {
                  borderColor: `${f.accent}40`,
                  boxShadow: `0 10px 40px ${f.accent}12, inset 0 0 20px ${f.accent}05`,
                  y: -5,
                  duration: 0.3
                });
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                gsap.to(el, {
                  borderColor: 'rgba(255,255,255,0.07)',
                  boxShadow: 'none',
                  y: 0,
                  duration: 0.3
                });
              }}
            >
              {/* Mockup visual */}
              <div style={{ marginBottom: 28 }}>
                <f.MockupComponent />
              </div>

              {/* Card text */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <span className={`pill ${f.badge.cls}`} style={{ marginBottom: 12 }}>{f.badge.label}</span>
                <h3 style={{ fontSize: 18, fontWeight: 500, color: '#f4f4f5', marginBottom: 8, lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.6, fontWeight: 400 }}>{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
