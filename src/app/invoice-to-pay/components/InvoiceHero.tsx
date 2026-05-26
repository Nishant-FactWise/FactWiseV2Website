'use client';

import * as React from "react"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const IcFile     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
const IcTruck    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
const IcCheck    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
const IcCard     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
const IcShield   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcBar      = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>

function WhiteDashboard() {
  const mono = "'JetBrains Mono', monospace"
  const invoices = [
    { id:'INV-90412', vendor:'Apex Industrial',  value:'$14,910', status:'4-Way Matched', statusColor:'#10b981', bg:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.2)' },
    { id:'INV-90415', vendor:'Meridian Mfg.',     value:'$2,215',  status:'GR Pending',     statusColor:'#f59e0b', bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.2)' },
    { id:'INV-90418', vendor:'FluidTech Co.',     value:'$1,392',  status:'QC In Review',   statusColor:'#3666ff', bg:'rgba(54,102,255,0.08)', border:'rgba(54,102,255,0.2)' },
    { id:'INV-90420', vendor:'HydroMfg Ltd.',     value:'$6,570',  status:'Payment Cleared',statusColor:'#8b5cf6', bg:'rgba(139,92,246,0.08)', border:'rgba(139,92,246,0.2)' },
  ]
  return (
    <div style={{ width:'100%', height:'100%', background:'white', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:"'Inter', sans-serif" }}>
      {/* Chrome bar */}
      <div style={{ height:38, borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', padding:'0 14px', gap:7, background:'#fafbfc', flexShrink:0 }}>
        {['#ff5f57','#ffbd2e','#28ca42'].map(c=>(
          <div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}}/>
        ))}
        <div style={{ marginLeft:10, background:'white', border:'1px solid #e8edf3', padding:'2px 10px', borderRadius:4, fontSize:9, color:'#94a3b8', fontFamily:mono }}>
          app.factwise.io / payables / invoice-hub
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'160px 1fr', flex:1, minHeight:0 }}>
        {/* Sidebar */}
        <div style={{ borderRight:'1px solid #f1f5f9', padding:'14px 8px', background:'#fafbfc', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, paddingBottom:12, marginBottom:8, borderBottom:'1px solid #f1f5f9', fontSize:12, fontWeight:700, color:'#1A1D2E' }}>
            <div style={{ width:18,height:18,borderRadius:4,flexShrink:0, background:'linear-gradient(135deg,#4f8bff,#2a6cff)', display:'grid',placeItems:'center' }}>
              <div style={{width:7,height:7,background:'white',clipPath:'polygon(0 0,100% 0,100% 40%,40% 40%,40% 100%,0 100%)'}}/>
            </div>
            FactWise
          </div>
          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'4px 6px 3px',fontWeight:600}}>Payables</div>
          {[
            {ic:<IcFile/>,   label:'Invoices',         active:true},
            {ic:<IcTruck/>,  label:'Goods Receipts'},
            {ic:<IcShield/>, label:'Quality Checks'},
            {ic:<IcCard/>,   label:'Payments'},
          ].map(({ic,label,active})=>(
            <div key={label} style={{ display:'flex',alignItems:'center',gap:7, padding:'5px 7px',borderRadius:5,fontSize:10,fontWeight:500, color:active?'#3666ff':'#64748b', background:active?'rgba(54,102,255,0.07)':'transparent', border:active?'1px solid rgba(54,102,255,0.14)':'1px solid transparent', marginBottom:1 }}>
              <span style={{color:active?'#3666ff':'#94a3b8',display:'inline-flex'}}>{ic}</span>
              {label}
            </div>
          ))}
          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'8px 6px 3px',fontWeight:600}}>Reports</div>
          {[{ic:<IcBar/>,label:'Spend Analytics'},{ic:<IcCheck/>,label:'Audit Trail'}].map(({ic,label})=>(
            <div key={label} style={{display:'flex',alignItems:'center',gap:7,padding:'5px 7px',borderRadius:5,fontSize:10,color:'#64748b',marginBottom:1}}>
              <span style={{color:'#94a3b8',display:'inline-flex'}}>{ic}</span>{label}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ padding:'16px 18px', overflow:'hidden', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.01em'}}>Invoice Dashboard</div>
              <div style={{fontSize:9,color:'#94a3b8',marginTop:2}}>Q3 · 218 invoices · 24 pending payment</div>
            </div>
            <div style={{ display:'inline-flex',alignItems:'center',gap:4, padding:'3px 8px',borderRadius:5,fontSize:9,fontWeight:600, background:'rgba(0,184,132,0.08)',color:'#059669', border:'1px solid rgba(0,184,132,0.2)' }}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>
              4-Way Match Active
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {[
              {label:'Invoices Verified', value:'194',    delta:'↑ 31 this week'},
              {label:'Discrepancies Caught',value:'12',   delta:'↓ Saved $24k'},
              {label:'Cleared This Qtr',  value:'$3.1M',  delta:'↑ 18% on-time'},
            ].map(k=>(
              <div key={k.label} style={{ background:'white',border:'1px solid #f1f5f9',borderRadius:8,padding:'9px 11px',boxShadow:'0 1px 3px rgba(15,23,42,0.04)' }}>
                <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:16,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.02em',marginBottom:2}}>{k.value}</div>
                <div style={{fontSize:9,color:'#10b981',fontWeight:500}}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Invoices table */}
          <div style={{ background:'white',border:'1px solid #f1f5f9',borderRadius:8,overflow:'hidden',boxShadow:'0 1px 3px rgba(15,23,42,0.04)' }}>
            <div style={{ padding:'7px 12px',borderBottom:'1px solid #f1f5f9',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fafbfc' }}>
              <span style={{fontSize:10,fontWeight:600,color:'#1A1D2E'}}>Active Invoices</span>
              <span style={{fontSize:9,color:'#94a3b8',fontFamily:mono}}>Live</span>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'0.9fr 1.4fr 0.8fr 1fr', padding:'5px 12px',fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.08em',borderBottom:'1px solid #f8fafc',background:'#fdfeff' }}>
              <div>Invoice</div><div>Vendor</div><div>Value</div><div>Status</div>
            </div>
            {invoices.map((r,i)=>(
              <div key={r.id} style={{ display:'grid',gridTemplateColumns:'0.9fr 1.4fr 0.8fr 1fr', padding:'7px 12px',borderBottom:i<3?'1px solid #f8fafc':'none',fontSize:10,alignItems:'center' }}>
                <div style={{fontFamily:mono,color:'#94a3b8',fontSize:9}}>{r.id}</div>
                <div style={{fontWeight:600,color:'#1A1D2E',fontSize:10}}>{r.vendor}</div>
                <div style={{fontFamily:mono,color:'#1A1D2E',fontSize:10,fontWeight:600}}>{r.value}</div>
                <div style={{ display:'inline-flex',alignItems:'center',gap:4,padding:'2px 6px',borderRadius:4,fontSize:8,fontWeight:600,color:r.statusColor,background:r.bg,border:`1px solid ${r.border}`,width:'fit-content' }}>
                  {r.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatCard({ style, delay=0, yAmt=12, dur=6, children }: {
  style?: React.CSSProperties; delay?: number; yAmt?: number; dur?: number; children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:[0,-yAmt,0] }}
      transition={{
        opacity:{ duration:0.5, delay },
        y:{ duration:dur, repeat:Infinity, ease:'easeInOut', delay, times:[0,0.5,1] },
      }}
      style={{
        position:'absolute', zIndex:4,
        background:'white',
        border:'1px solid #e2e8f0',
        borderRadius:14, padding:14,
        boxShadow:'0 4px 6px -1px rgba(15,23,42,0.07), 0 20px 40px -8px rgba(15,23,42,0.14), 0 0 0 1px rgba(255,255,255,0.9) inset',
        fontFamily:"'Inter', sans-serif",
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function InvoiceHero() {
  const mono = "'JetBrains Mono', monospace"

  return (
    <>
    <section className="fw-hero-section" style={{ position:'relative', width:'100%', minHeight:'100vh', overflow:'hidden', background:'#020617', color:'white' }}>
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-10%', right:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'rgba(59,130,246,0.1)', filter:'blur(120px)' }}/>
        <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'rgba(99,102,241,0.05)', filter:'blur(120px)' }}/>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(120,150,220,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,220,0.04) 1px,transparent 1px)',
          backgroundSize:'64px 64px',
          maskImage:'radial-gradient(ellipse at center,black 30%,transparent 80%)',
        }}/>
      </div>

      <div className="fw-hero-grid" style={{
        position:'relative', zIndex:5,
        maxWidth:1440, margin:'0 auto',
        padding:'130px 56px 80px',
        display:'grid', gridTemplateColumns:'1.1fr 0.9fr',
        gap:60, alignItems:'start',
        minHeight:'calc(100vh - 90px)',
      }}>

        {/* LEFT COLUMN */}
        <div style={{ maxWidth:600 }}>

          {/* Heading */}
          <h1 style={{
            fontSize:'clamp(30px, 2.8vw, 46px)', fontWeight:600,
            lineHeight:1.15, letterSpacing:'-0.035em', marginBottom:24,
            fontFamily:'var(--font-display)',
          }}>
            Every Invoice Verified. Every Payment Controlled.{' '}
            <span style={{
              background:'linear-gradient(135deg,#7ba6ff 0%,#4f8bff 50%,#2a6cff 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              Every Rupee Accounted For.
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize:18, lineHeight:1.65, color:'#8899b8', fontWeight:400,
              marginBottom:40, maxWidth:520, fontFamily:'var(--font-inter)',
            }}
          >
            Stop chasing invoices, matching documents by hand, and hoping nothing slips through. FactWise unifies every step from vendor invoice to final payment — with full validation, flexibility, and visibility.
          </p>

          {/* CTA Buttons */}
          <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:48 }}>
            <Link
              href="/demo"
              style={{
                background:'linear-gradient(135deg,#4f8bff,#2a6cff)', color:'white', border:'none',
                padding:'14px 24px 14px 28px', borderRadius:100, fontSize:15, fontWeight:600,
                cursor:'pointer', display:'inline-flex', alignItems:'center', gap:10,
                boxShadow:'0 0 0 1px rgba(255,255,255,0.1) inset, 0 12px 40px rgba(42,108,255,0.4)',
                fontFamily:'var(--font-inter)', textDecoration:'none', lineHeight:1,
              }}
            >
              Get started
              <span style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'grid', placeItems:'center' }}>
                <ArrowRight style={{ width:14, height:14 }}/>
              </span>
            </Link>
            <button style={{
              background:'transparent', color:'white',
              border:'1px solid rgba(255,255,255,0.15)',
              padding:'14px 22px', borderRadius:100, fontSize:15,
              fontWeight:500, cursor:'pointer', fontFamily:'var(--font-inter)',
            }}>
              Watch product tour
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.35, ease:[0.16,1,0.3,1] }}
          className="fw-hero-visual"
          style={{ position:'relative', height:520 }}
        >
          <div style={{
            position:'absolute',
            left:40, top:0,
            width:'calc(100% + 56px)',
            height:520,
            borderRadius:'16px 0 0 16px',
            border:'1px solid rgba(120,150,220,0.18)',
            borderRight:'none',
            overflow:'hidden',
            boxShadow:'0 0 0 1px rgba(79,139,255,0.06), 0 40px 80px rgba(0,0,0,0.45), 0 0 80px rgba(42,108,255,0.12)',
          }}>
            <WhiteDashboard />
          </div>

          {/* Float card 1 — Invoice AI-parsed */}
          <FloatCard delay={0.5} yAmt={12} dur={6} style={{ top:40, left:-45, width:240, padding:'10px 14px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>INV-90412 · Parsed</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>Apex Industrial · $14,910</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:6, background:'rgba(54,102,255,0.08)', border:'1px solid rgba(54,102,255,0.2)', display:'grid', placeItems:'center', color:'#3666ff', fontSize:13 }}>AI</div>
            </div>
            {[
              {stage:'PDF auto-extracted',  done:true},
              {stage:'PO referenced',       done:true},
              {stage:'GR linked',           done:true},
              {stage:'QC report attached',  done:true, highlight:true},
            ].map((v,i)=>(
              <div key={v.stage} style={{ display:'flex', alignItems:'center', gap:7, padding:'3px 0', fontSize:10, borderBottom:i<3?'1px solid #f8fafc':'none' }}>
                <span style={{ width:14, height:14, borderRadius:'50%', display:'grid', placeItems:'center', background: v.highlight ? 'rgba(54,102,255,0.1)' : v.done ? 'rgba(16,185,129,0.1)' : '#f1f5f9', fontSize:8, fontWeight:700, color: v.highlight ? '#3666ff' : v.done ? '#10b981' : '#94a3b8' }}>
                  {v.done ? '✓' : '·'}
                </span>
                <span style={{ color: v.highlight ? '#3666ff' : '#475569', fontWeight: v.highlight ? 700 : 400 }}>{v.stage}</span>
              </div>
            ))}
          </FloatCard>

          {/* Float card 2 — 4-Way Match */}
          <FloatCard delay={1.2} yAmt={10} dur={7} style={{ bottom:120, left:20, width:228 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>4-Way Match · Verified</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>PO · GR · QC · Invoice</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:6, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', display:'grid', placeItems:'center', color:'#10b981', fontSize:13 }}>✓</div>
            </div>
            <div style={{ height:5, background:'#f1f5f9', borderRadius:3, overflow:'hidden', margin:'10px 0 7px' }}>
              <div style={{ width:'100%', height:'100%', borderRadius:3, background:'linear-gradient(90deg,#3666ff,#10b981)' }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:'#94a3b8' }}>
              <span>0 discrepancies · ready to pay</span>
              <span style={{ color:'#10b981', fontWeight:700, fontFamily:mono }}>100%</span>
            </div>
          </FloatCard>

          {/* Float card 3 — Payment cleared */}
          <FloatCard delay={2.4} yAmt={14} dur={8} style={{ top:270, right:-40, width:260 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>Payment Cleared</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>PAY-4421 · Apex Industrial</div>
              </div>
              <span style={{ padding:'2px 8px', borderRadius:5, fontSize:9, fontWeight:700, background:'rgba(0,184,132,0.08)', color:'#10b981', border:'1px solid rgba(0,184,132,0.2)' }}>✓ Paid</span>
            </div>
            <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-0.025em', fontFamily:mono, color:'#1A1D2E', margin:'7px 0 2px' }}>
              <span style={{ fontSize:13, color:'#94a3b8' }}>$</span>14,070
            </div>
            <div style={{ fontSize:9, color:'#94a3b8', marginBottom:10 }}>Net of $840 QC deduction · 6% discount captured</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingTop:10, borderTop:'1px solid #f1f5f9' }}>
              {[
                {label:'Match cycle',    value:'2.1 hrs'},
                {label:'Savings',        value:'$840', green:true},
                {label:'Duplicates blocked', value:'3 this qtr'},
                {label:'Audit trail',    value:'Complete'},
              ].map(q=>(
                <div key={q.label}>
                  <div style={{ fontSize:8, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{q.label}</div>
                  <div style={{ fontFamily:mono, fontWeight:600, fontSize:10, color:q.green?'#10b981':'#1A1D2E' }}>{q.value}</div>
                </div>
              ))}
            </div>
          </FloatCard>
        </motion.div>
      </div>

      <style>{`@keyframes fw-pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </section>
    </>
  )
}
