'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Trophy, CheckCircle2, RefreshCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import ScrollReveal from './ui/ScrollReveal';


/* ─── Card 1: Severe Value Loss (Price Erosion Graph) ─── */
const SevereValueLossAnimation = () => {
  const points = [
    { x: 75, y: 195, label: 'Quote', val: '100' },
    { x: 150, y: 150, label: 'PO', val: '150' },
    { x: 225, y: 70, label: 'Invoice', val: '280+' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 280 280" fill="none" style={{ maxWidth: 280, maxHeight: 280 }}>
        <defs>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="line-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Y-Axis Grid & Labels */}
        {[0, 100, 200, 300].map((val, i) => {
          const y = 235 - (val / 300) * 180;
          return (
            <g key={val}>
              <line x1="55" y1={y} x2="255" y2={y} stroke="#1A1D2E" strokeOpacity="0.07" strokeWidth="1" />
              <text x="25" y={y + 4} fill="#7B82A8" fontSize="10" fontWeight="400">{val}</text>
            </g>
          );
        })}

        {/* Y-Axis Title */}
        <text
          x="12"
          y="145"
          textAnchor="middle"
          fill="#1A1D2E"
          fillOpacity="0.4"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.1em"
          transform="rotate(-90, 12, 145)"
        >
          COST ($)
        </text>

        {/* X-Axis Labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y="255" textAnchor="middle" fill="#7B82A8" fontSize="11" fontWeight="400">
            {p.label}
          </text>
        ))}

        {/* X-Axis Title */}
        <text
          x="150"
          y="275"
          textAnchor="middle"
          fill="#1A1D2E"
          fillOpacity="0.4"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          PROCUREMENT STAGE
        </text>

        {/* Price Escalation Indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          transform="translate(55, 30)"
        >
          <circle cx="8" cy="0" r="8" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <text x="22" y="4" fill="#ef4444" fontSize="10" fontWeight="900" letterSpacing="0.08em">COST LEAKAGE</text>
        </motion.g>

        {/* Connecting Line - Animated */}
        <motion.path
          d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y}`}
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          filter="url(#glow-red)"
        />

        {/* Data Points & Labels */}
        {points.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x} cy={p.y} r="4.5" fill="#ef4444" filter="url(#glow-red)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: i * 0.5, duration: 0.5 }}
            />
            <motion.text
              x={i === 2 ? p.x : p.x + 12}
              y={i === 2 ? p.y - 18 : p.y + 4}
              textAnchor={i === 2 ? "middle" : "start"}
              fill="#ef4444" fontSize="13" fontWeight="800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.5 + 0.2 }}
            >
              ${p.val}
            </motion.text>

            {/* Alert Pulse for last node */}
            {i === 2 && (
              <motion.circle
                cx={p.x} cy={p.y} r="16" stroke="#ef4444" strokeWidth="1"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ─── Card 2: Operational Inefficiency (Yellow) ─── */
const InefficiencyAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 280 280" fill="none" style={{ maxWidth: 280, maxHeight: 280 }}>
        <defs>
          <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Input Tools (Left) */}
        {[
          { y: 70, type: 'mail', delay: 0 },
          { y: 140, type: 'sheet', delay: 0.5 },
          { y: 210, type: 'calc', delay: 1 }
        ].map((tool, i) => (
          <g key={i} transform={`translate(55, ${tool.y})`}>
            <motion.g
              animate={{ x: [0, 5, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: tool.delay }}
            >
              <circle cx={0} cy={0} r="22" stroke="#f59e0b" strokeWidth="1.2" fill="rgba(245,158,11,0.03)" filter="url(#glow-yellow)" />
              <g transform="translate(-8, -8)" stroke="#f59e0b" strokeWidth="1.2">
                {tool.type === 'mail' && <path d="M 0 2 L 8 8 L 16 2 M 0 2 V 14 H 16 V 2 Z" />}
                {tool.type === 'sheet' && <path d="M 0 0 H 16 V 16 H 0 Z M 0 5 H 16 M 0 10 H 16 M 5 0 V 16 M 11 0 V 16" />}
                {tool.type === 'calc' && <rect width="14" height="16" rx="2" />}
              </g>
              {/* Flowing Data Bits */}
              <motion.rect
                width="4" height="4" fill="#f59e0b"
                animate={{ x: [25, 80], opacity: [0, 1, 0], rotate: [0, 90] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
              />
            </motion.g>
          </g>
        ))}

        {/* Central Friction Gear */}
        <g transform="translate(145, 140)">
          <motion.path
            d="M 38 0 A 38 38 0 1 0 -38 0 A 38 38 0 1 0 38 0 M 0 -15 L 0 15 M -15 0 L 15 0"
            stroke="#f59e0b" strokeWidth="2" fill="rgba(245,158,11,0.05)" filter="url(#glow-yellow)"
            animate={{ rotate: [0, 45, 40, 90, 85, 180, 175, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.g
            animate={{ rotate: [0, 45, 40, 90, 85, 180, 175, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <rect
                key={angle} x="-5" y="-44" width="10" height="8" fill="#f59e0b"
                transform={`rotate(${angle}, 0, 0)`}
              />
            ))}
          </motion.g>
        </g>

        {/* Friction Sparks */}
        {[...Array(12)].map((_, i) => {
          const dx = Math.sin(i * 30) * 40;
          const dy = Math.cos(i * 30) * 40;

          return (
            <motion.circle
              key={i}
              r="1"
              fill="#f59e0b"
              cx={145}
              cy={140}
              animate={{
                x: [0, dx],
                y: [0, dy],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            />
          );
        })}

        {/* Stuttering Clock */}
        <g transform="translate(245, 140)">
          <circle cx="0" cy="0" r="26" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.05)" filter="url(#glow-yellow)" />
          {[0, 90, 180, 270].map(angle => (
            <circle
              key={angle}
              cx={24 * Math.cos((angle - 90) * Math.PI / 180)}
              cy={24 * Math.sin((angle - 90) * Math.PI / 180)}
              r="1.2"
              fill="#f59e0b"
              fillOpacity="0.6"
            />
          ))}
          <motion.g
            animate={{ rotate: [0, 90, 70, 180, 160, 270, 250, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <line
              x1="0" y1="0" x2="0" y2="-22"
              stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
              filter="url(#glow-yellow)"
            />
          </motion.g>
          <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
        </g>

        {/* Labels for components */}
        <g fill="#f59e0b" fillOpacity="0.7" fontSize="9" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">
          <text x="55" y="262">SCATTERED DATA</text>
          <text x="145" y="205">BOTTLENECKS</text>
          <text x="245" y="190">DELAY</text>
        </g>
      </svg>
    </div>
  );
};

/* ─── Card 3: Zero Visibility (Spotlight Concept) ─── */
const ZeroVisibilityAnimation = () => {
  const nodes = [
    { x: 70, y: 75, label: 'ERP', type: 'db' },
    { x: 210, y: 75, label: 'CRM', type: 'user' },
    { x: 140, y: 145, label: 'DATA GAP', type: 'gap' },
    { x: 70, y: 215, label: 'EXCEL', type: 'sheet' },
    { x: 210, y: 215, label: 'EMAIL', type: 'mail' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 280 280" fill="none" style={{ maxWidth: 280, maxHeight: 280 }}>
        <defs>
          <filter id="glow-cyan-spot" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <mask id="spotlight-mask">
            <rect width="280" height="280" fill="black" />
            <motion.circle
              cx={80} cy={80} r="65" fill="white"
              animate={{
                x: [0, 120, 120, 0, 0],
                y: [0, 0, 130, 130, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </mask>
        </defs>

        {/* Ambient Dust Particles */}
        {[...Array(12)].map((_, i) => {
          const initialX = 140 + (Math.sin(i) * 100);
          const initialY = 140 + (Math.cos(i) * 100);
          const duration = 5 + (i % 5);

          return (
            <motion.circle
              key={i} r="0.8" fill="#1A1D2E" fillOpacity="0.12"
              cx={initialX}
              cy={initialY}
              animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -30] }}
              transition={{ duration: duration, repeat: Infinity }}
            />
          );
        })}

        {/* Hidden Layer (Visible via Mask) */}
        <g mask="url(#spotlight-mask)">
          {nodes.map((node, i) => (
            <g key={i} transform={`translate(${node.x}, ${node.y})`}>
              <motion.circle
                cx={0} cy={0} r="32" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.3"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
              <g transform="translate(-10, -10)" stroke="#06b6d4" strokeWidth="1.8">
                {node.type === 'db' && <path d="M 0 5 A 10 5 0 1 0 20 5 A 10 5 0 1 0 0 5 Z M 0 5 V 15 A 10 5 0 0 0 20 15 V 5" />}
                {node.type === 'user' && <path d="M 10 8 A 4 4 0 1 0 10 0 A 4 4 0 1 0 10 8 Z M 0 20 Q 0 12 10 12 Q 20 12 20 20" />}
                {node.type === 'sheet' && <path d="M 0 0 H 18 V 18 H 0 Z M 0 6 H 18 M 0 12 H 18 M 6 0 V 18" />}
                {node.type === 'mail' && <path d="M 0 4 L 10 12 L 20 4 M 0 4 V 16 H 20 V 4 Z" />}
                {node.type === 'gap' && (
                  <motion.g animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <path d="M 0 0 L 20 20 M 20 0 L 0 20" strokeWidth="2.5" filter="url(#glow-cyan-spot)" />
                  </motion.g>
                )}
              </g>
              <text y="48" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="900" letterSpacing="0.05em">
                {node.label}
              </text>
            </g>
          ))}
        </g>

        {/* Moving Spotlight Edge Glow */}
        <motion.circle
          cx={80} cy={80} r="66" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.15" fill="none"
          animate={{
            x: [0, 120, 120, 0, 0],
            y: [0, 0, 130, 130, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

const PROBLEMS = [
  {
    Animation: SevereValueLossAnimation,
    title: "Overpaying. Every single order.",
    description: "Without historical price intelligence, you miss savings on every order. FactWise tracks all quotes, purchase orders, and contracts to ensure you always pay the best price.",
    accent: "#ef4444",
    label: "Financial Gap"
  },
  {
    Animation: InefficiencyAnimation,
    title: "Drowning in manual work.",
    description: "Emails, follow-ups, and spreadsheets waste valuable hours. FactWise automates your entire cycle — from onboarding and customer quotes to requisitions, approvals, and payments.",
    accent: "#f59e0b",
    label: "Productivity Gap"
  },
  {
    Animation: ZeroVisibilityAnimation,
    title: "Flying blind.",
    description: "Lack of transparency hides costly spend spikes and late deliveries. FactWise provides real-time visibility into all purchase orders, approvals, and supplier performance.",
    accent: "#06b6d4",
    label: "Visibility Gap"
  }
];

export default function ProblemSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <section id="problem" className="relative py-12 px-4 md:px-10" style={{ scrollMarginTop: '100px' }}>
      <div className="relative overflow-hidden rounded-[24px] py-24" style={{ backgroundColor: '#ebf1fa' }}>
        <div className="absolute inset-0 noise" />
        <div style={{ ...GLOBAL_LAYOUT.containerStyle, paddingLeft: '80px', paddingRight: '80px', opacity: 0 }} />
      </div>
    </section>
  );

  return (
    <section
      id="problem"
      className="relative py-12 px-4 md:px-10"
      style={{ scrollMarginTop: '100px' }}
    >
      <div 
        className="relative overflow-hidden rounded-[24px] py-24"
        style={{ backgroundColor: '#ebf1fa' }}
      >
        {/* Blue Glow on Right - Optimized */}
        <div 
          className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(54, 102, 255, 0.25) 0%, rgba(54, 102, 255, 0.1) 30%, transparent 70%)',
            willChange: 'opacity'
          }} 
        />

        <div className="absolute inset-0 noise" />

        {/* Content */}
        <div className="relative z-10" style={{ ...GLOBAL_LAYOUT.containerStyle, paddingLeft: '24px', paddingRight: '24px' }}>

          <div className="mx-auto max-w-3xl text-center flex flex-col items-center mb-16">
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                The Problem
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
                Your procurement is costing you <span className="text-[#3666ff]">money, time, and control.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal type="split-words" delay={0.3} stagger={0.01}>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl font-medium">
                Hidden overspend, manual bottlenecks, and zero visibility — three problems quietly draining your business every day.
              </p>
            </ScrollReveal>
          </div>


          {/* Problems Grid — 3-across on tablet/desktop, single column on phones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((prob, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative w-full h-[480px] lg:h-[400px] bg-white border border-[#E2E5F0] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Visual Area — half height on mobile (card always open); full height
                    on desktop, shrinking to half on hover. */}
                <div className="relative w-full h-1/2 lg:h-full transition-all duration-500 lg:group-hover:h-1/2 bg-white flex items-center justify-center">
                  {/* Initial Title Overlay (Bottom, Grey) — desktop-only; on mobile the
                      open content below already shows the title. */}
                  <div className="absolute bottom-8 left-8 transition-all duration-500 opacity-0 lg:opacity-100 lg:group-hover:opacity-0 lg:group-hover:translate-y-4">
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#7B82A8',
                      margin: 0,
                      lineHeight: 1.2,
                    }}>
                      {prob.title}
                    </h3>
                  </div>
                  <prob.Animation />
                </div>

                {/* Content Area — open by default on mobile; on desktop it stays hidden
                    below and slides up on hover. */}
                <div className="absolute left-0 w-full h-1/2 px-8 transition-all duration-500 flex flex-col justify-center bg-white/95 backdrop-blur-sm opacity-100 top-1/2 lg:opacity-0 lg:top-full lg:group-hover:opacity-100 lg:group-hover:top-1/2">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: prob.accent,
                      boxShadow: `0 0 8px ${prob.accent}`,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: prob.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}>
                      {prob.label}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1A1D2E',
                    marginBottom: '10px',
                    lineHeight: 1.2,
                  }}>
                    {prob.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#7B82A8',
                    lineHeight: 1.6,
                  }}>
                    {prob.description}
                  </p>
                </div>

                {/* Textured blue gradient corner */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '250px',
                  height: '250px',
                  background: `radial-gradient(circle at top right, rgba(74, 111, 255, 0.15), transparent 70%)`,
                  pointerEvents: 'none',
                  maskImage: 'radial-gradient(circle at top right, black, transparent 60%)',
                  WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 60%)',
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
