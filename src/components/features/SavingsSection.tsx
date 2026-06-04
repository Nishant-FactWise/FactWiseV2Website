'use client';

import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Calendar, 
  BarChart3, 
  ShoppingCart, 
  User, 
  ArrowLeft, 
  Filter, 
  Star
} from 'lucide-react';
import { SECTION_LAYOUT } from './Shared';

export default function SavingsSection() {
  const [stage, setStage] = useState<'selection' | 'transition' | 'savings'>('selection');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const dashboardX = useTransform(scrollYProgress, [0.3, 0.8], [0, 150]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);

  useEffect(() => {
    if (!isInView) {
      const timeout = setTimeout(() => setStage('selection'), 0);
      return () => clearTimeout(timeout);
    }

    const runSequence = () => {
      const timer1 = setTimeout(() => setStage('transition'), 8000); // 8s selection
      const timer2 = setTimeout(() => setStage('savings'), 9000);    // 1s click delay
      const timer3 = setTimeout(() => setStage('selection'), 18000); // 9s savings view
      return [timer1, timer2, timer3];
    };

    let timers = runSequence();
    const interval = setInterval(() => {
      timers.forEach(t => clearTimeout(t));
      timers = runSequence();
    }, 18000);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearInterval(interval);
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} style={{ position: 'relative', width: '100%', padding: `${SECTION_LAYOUT.paddingY} 0`, overflow: 'hidden', backgroundColor: '#0a0a0c' }}>
      <div style={{ ...SECTION_LAYOUT.containerStyle, position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            style={{ order: 1 }}
          >
            {/* Badge */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)' }}>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c5cfc' }}
                />
                <span style={{ fontSize: 11, fontWeight: 500, color: '#7c5cfc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Real-time Savings</span>
              </div>
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#f4f4f5', marginBottom: 18 }}>
              Negotiate smarter,<br />spend less
            </h2>
            
            <p style={{ fontSize: 16, color: '#6b6b7a', lineHeight: 1.7, marginBottom: 34, maxWidth: 440 }}>
              Leverage dynamic and historic supplier insights to drive competitive pricing. 
              Discover certified suppliers, cut maverick spend, and channel volume to preferred partners.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: "Better negotiations", desc: "Use live market benchmarks to push suppliers on pricing, terms, and lead times — every cycle.", icon: <ArrowLeft className="rotate-180" size={14} /> },
                { label: "Smarter sourcing", desc: "Discover new suppliers who meet your quality certifications and pricing requirements instantly.", icon: <Filter size={14} /> },
                { label: "Eliminate maverick spend", desc: "Increase preferred supplier volume by 80% with automated enforcement and spend transparency.", icon: <Star size={14} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  style={{ display: 'flex', gap: 13 }}
                >
                  <div style={{ flexShrink: 0, marginTop: 2, width: 30, height: 30, borderRadius: '50%', background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#7c5cfc', fontWeight: 400 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#6b6b7a', lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ 
              x: dashboardX,
              opacity: dashboardOpacity,
              perspective: '1000px'
            }}
            className="relative flex justify-end"
          >
            <div className="bg-[#111116] rounded-2xl border border-white/10 shadow-2xl overflow-hidden w-full max-w-[640px] h-[420px] flex">
              
              {/* Sidebar */}
              <div style={{ 
                width: 60, 
                backgroundColor: '#0a0a0c', 
                borderRight: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                paddingTop: 20,
                gap: 20
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(124,92,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Star size={16} color="#7c5cfc" />
                </div>
                <Calendar size={18} color="#6b6b7a" />
                <div style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid #7c5cfc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 1, backgroundColor: '#7c5cfc' }} />
                </div>
                <BarChart3 size={18} color="#6b6b7a" />
                <ShoppingCart size={18} color="#6b6b7a" />
                <div style={{ marginTop: 'auto', marginBottom: 20 }}>
                  <User size={18} color="#6b6b7a" />
                </div>
              </div>

              {/* Main Area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0c' }}>
                {/* Header */}
                <div style={{ 
                  height: 50, 
                  borderBottom: '1px solid rgba(255,255,255,0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '0 20px',
                  backgroundColor: 'rgba(10,10,12,0.8)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowLeft size={12} color="#f4f4f5" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#f4f4f5' }}>Select Winners</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <Filter size={12} color="#6b6b7a" />
                      <span style={{ fontSize: 11, color: '#6b6b7a' }}>Filter By</span>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 20 }}>
                  <AnimatePresence mode="wait">
                    {stage !== 'savings' ? (
                      <motion.div 
                        key="selection"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <div style={{ fontSize: 10, color: '#7c5cfc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 15, fontWeight: 600 }}>
                          Events &gt; IT Solutions
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                          {/* Supplier 1 */}
                          <div style={{ background: '#111116', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#1a1a23', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#7c5cfc' }}>S1</div>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>Global Tech</div>
                              </div>
                              <div style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(124,92,252,0.1)', color: '#7c5cfc', fontSize: '8px', fontWeight: '700' }}>RECOMMENDED</div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                              <div>
                                <div style={{ fontSize: '8px', color: '#6b6b7a', textTransform: 'uppercase', marginBottom: '2px' }}>Price</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>₹980.00</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '8px', color: '#6b6b7a', textTransform: 'uppercase', marginBottom: '2px' }}>Lead Time</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>12 Days</div>
                              </div>
                            </div>

                            <motion.div 
                              animate={stage === 'transition' ? { scale: 0.96 } : { scale: 1 }}
                              style={{ 
                                width: '100%', 
                                height: '30px', 
                                borderRadius: '6px', 
                                backgroundColor: stage === 'transition' ? '#6548d9' : '#7c5cfc', 
                                color: '#fff', 
                                fontSize: '11px', 
                                fontWeight: '700', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(124,92,252,0.2)'
                              }}
                            >
                              Award Contract
                            </motion.div>
                          </div>

                          {/* Supplier 2 */}
                          <div style={{ background: '#111116', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', padding: '12px', opacity: 0.4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                              <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#1a1a23', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#6b6b7a' }}>S2</div>
                              <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>Zenith Sys</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                              <div>
                                <div style={{ fontSize: '8px', color: '#6b6b7a', textTransform: 'uppercase', marginBottom: '2px' }}>Price</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>₹1,040.00</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '8px', color: '#6b6b7a', textTransform: 'uppercase', marginBottom: '2px' }}>Lead Time</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>24 Days</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional detail list */}
                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '9px', color: '#6b6b7a' }}>Product Category</div>
                              <div style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>Enterprise Hardware</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '9px', color: '#6b6b7a' }}>Total Items</div>
                              <div style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>1,240 Units</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="savings"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                          <div style={{ fontSize: '10px', color: '#7c5cfc', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '600' }}>Projected Savings</div>
                          <div style={{ fontSize: '56px', fontWeight: '700', color: '#f4f4f5', letterSpacing: '-0.04em', lineHeight: 1 }}>27%<span style={{ color: '#7c5cfc' }}>+</span></div>
                        </div>

                        <div style={{ width: '100%', height: '140px', display: 'flex', alignItems: 'flex-end', gap: '15px', padding: '0 20px', position: 'relative' }}>
                          {[
                            { h: 40, val: '₹2.1M', label: 'Q1' },
                            { h: 70, val: '₹3.9M', label: 'Q2' },
                            { h: 95, val: '₹5.5M', label: 'Q3' },
                            { h: 125, val: '₹6.7M', label: 'Q4', active: true }
                          ].map((bar, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: bar.h }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: 'easeOut' }}
                                style={{ 
                                  width: '100%', 
                                  backgroundColor: bar.active ? '#7c5cfc' : 'rgba(255,255,255,0.04)',
                                  borderRadius: '4px 4px 0 0',
                                  position: 'relative'
                                }}
                              >
                                <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: '#6b6b7a', fontWeight: '700' }}>{bar.val}</div>
                              </motion.div>
                              <div style={{ fontSize: '8px', color: '#6b6b7a', fontWeight: '600' }}>{bar.label}</div>
                            </div>
                          ))}

                          <svg style={{ position: 'absolute', top: 0, left: 35, width: 'calc(100% - 70px)', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                            <motion.path
                              d="M 0 100 L 80 80 L 160 55 L 240 25"
                              fill="none"
                              stroke="#7c5cfc"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.8, duration: 1.5 }}
                            />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Refined Mouse Cursor - Organic Movement */}
                  <motion.div
                    style={{ position: 'absolute', zIndex: 100, pointerEvents: 'none', top: 0, left: 0 }}
                    animate={
                      stage === 'selection' 
                        ? { 
                            x: [100, 180, 235], 
                            y: [100, 180, 140], 
                            opacity: [0, 1, 1],
                            scale: 1 
                          } 
                        : stage === 'transition' 
                          ? { x: 235, y: 140, scale: 0.85, opacity: 1 } 
                          : { x: 260, y: 160, opacity: 0, scale: 1 } 
                    }
                    transition={{ 
                      duration: stage === 'selection' ? 4.5 : 0.3,
                      delay: stage === 'selection' ? 3.5 : 0,
                      times: stage === 'selection' ? [0, 0.6, 1] : undefined,
                      ease: "easeInOut" 
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1">
                      <path d="M5.652 3.633a1.5 1.5 0 00-1.447 2.22l5.71 11.53c.484.978 1.83 1.05 2.414.135l1.66-2.593 4.512 4.512a1.5 1.5 0 002.121-2.121l-4.512-4.512 2.593-1.66c.915-.584.843-1.93-.135-2.414l-11.53-5.71a1.5 1.5 0 00-1.386-.101z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
