'use client';

import * as React from "react"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const IcList    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
const IcCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
const IcShop    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
const IcFile    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
const IcBar     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
const IcUsers   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>

function WhiteDashboard() {
  const mono = "'JetBrains Mono', monospace"
  const reqs = [
    { id:'REQ-1041', desc:'Hydraulic Seals × 200',   dept:'Engineering',  status:'Approved',   statusColor:'#10b981', bg:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.2)' },
    { id:'REQ-1042', desc:'Control Valves × 50',     dept:'Maintenance',  status:'Pending',    statusColor:'#f59e0b', bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.2)'  },
    { id:'REQ-1043', desc:'Safety Gloves × 500',     dept:'Operations',   status:'RFQ Sent',   statusColor:'#3666ff', bg:'rgba(54,102,255,0.08)', border:'rgba(54,102,255,0.2)'  },
    { id:'REQ-1044', desc:'Pressure Gauges × 30',    dept:'Quality',      status:'PO Issued',  statusColor:'#8b5cf6', bg:'rgba(139,92,246,0.08)', border:'rgba(139,92,246,0.2)'  },
  ]
  return (
    <div style={{ width:'100%', height:'100%', background:'white', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:"'Inter', sans-serif" }}>
      {/* Chrome bar */}
      <div style={{ height:38, borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', padding:'0 14px', gap:7, background:'#fafbfc', flexShrink:0 }}>
        {['#ff5f57','#ffbd2e','#28ca42'].map(c=>(
          <div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}}/>
        ))}
        <div style={{ marginLeft:10, background:'white', border:'1px solid #e8edf3', padding:'2px 10px', borderRadius:4, fontSize:9, color:'#94a3b8', fontFamily:mono }}>
          app.factwise.io / requisitions / dashboard
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
          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'4px 6px 3px',fontWeight:600}}>Procurement</div>
          {[
            {ic:<IcList/>,  label:'Requisitions',    active:true},
            {ic:<IcCheck/>, label:'Approvals'},
            {ic:<IcShop/>,  label:'RFQ Events'},
            {ic:<IcFile/>,  label:'Purchase Orders'},
          ].map(({ic,label,active})=>(
            <div key={label} style={{ display:'flex',alignItems:'center',gap:7, padding:'5px 7px',borderRadius:5,fontSize:10,fontWeight:500, color:active?'#3666ff':'#64748b', background:active?'rgba(54,102,255,0.07)':'transparent', border:active?'1px solid rgba(54,102,255,0.14)':'1px solid transparent', marginBottom:1 }}>
              <span style={{color:active?'#3666ff':'#94a3b8',display:'inline-flex'}}>{ic}</span>
              {label}
            </div>
          ))}
          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'8px 6px 3px',fontWeight:600}}>Reports</div>
          {[{ic:<IcBar/>,label:'Spend Analytics'},{ic:<IcUsers/>,label:'Vendor Panel'}].map(({ic,label})=>(
            <div key={label} style={{display:'flex',alignItems:'center',gap:7,padding:'5px 7px',borderRadius:5,fontSize:10,color:'#64748b',marginBottom:1}}>
              <span style={{color:'#94a3b8',display:'inline-flex'}}>{ic}</span>{label}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ padding:'16px 18px', overflow:'hidden', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.01em'}}>Requisition Dashboard</div>
              <div style={{fontSize:9,color:'#94a3b8',marginTop:2}}>Q3 · 142 requisitions · 18 pending approval</div>
            </div>
            <div style={{ display:'inline-flex',alignItems:'center',gap:4, padding:'3px 8px',borderRadius:5,fontSize:9,fontWeight:600, background:'rgba(0,184,132,0.08)',color:'#059669', border:'1px solid rgba(0,184,132,0.2)' }}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>
              AI Active
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {[
              {label:'Open Reqs',      value:'38',      delta:'↑ 12 this week'},
              {label:'Pending Approval',value:'18',     delta:'↓ 6 cleared today'},
              {label:'POs Issued',     value:'₹2.4M',   delta:'↑ 22% vs last qtr'},
            ].map(k=>(
              <div key={k.label} style={{ background:'white',border:'1px solid #f1f5f9',borderRadius:8,padding:'9px 11px',boxShadow:'0 1px 3px rgba(15,23,42,0.04)' }}>
                <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:16,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.02em',marginBottom:2}}>{k.value}</div>
                <div style={{fontSize:9,color:'#10b981',fontWeight:500}}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Reqs table */}
          <div style={{ background:'white',border:'1px solid #f1f5f9',borderRadius:8,overflow:'hidden',boxShadow:'0 1px 3px rgba(15,23,42,0.04)' }}>
            <div style={{ padding:'7px 12px',borderBottom:'1px solid #f1f5f9',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fafbfc' }}>
              <span style={{fontSize:10,fontWeight:600,color:'#1A1D2E'}}>Active Requisitions</span>
              <span style={{fontSize:9,color:'#94a3b8',fontFamily:mono}}>Live</span>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'0.8fr 1.6fr 1fr 0.8fr', padding:'5px 12px',fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.08em',borderBottom:'1px solid #f8fafc',background:'#fdfeff' }}>
              <div>Req ID</div><div>Description</div><div>Department</div><div>Status</div>
            </div>
            {reqs.map((r,i)=>(
              <div key={r.id} style={{ display:'grid',gridTemplateColumns:'0.8fr 1.6fr 1fr 0.8fr', padding:'7px 12px',borderBottom:i<3?'1px solid #f8fafc':'none',fontSize:10,alignItems:'center' }}>
                <div style={{fontFamily:mono,color:'#94a3b8',fontSize:9}}>{r.id}</div>
                <div style={{fontWeight:600,color:'#1A1D2E',fontSize:10}}>{r.desc}</div>
                <div style={{color:'#64748b',fontSize:9}}>{r.dept}</div>
                <div style={{ display:'inline-flex',alignItems:'center',gap:4,padding:'2px 6px',borderRadius:4,fontSize:8,fontWeight:600,color:r.statusColor,background:r.bg,border:`1px solid ${r.border}` }}>
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

export default function ReqHero() {
  const mono = "'JetBrains Mono', monospace"
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    setIsDesktop(window.innerWidth >= 1280)
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        gap:60, alignItems:'center',
        minHeight:'calc(100vh - 90px)',
        transform: 'translateY(3%)',
      }}>

        {/* LEFT COLUMN */}
        <div style={{ maxWidth:600 }}>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(31px, 2.9vw, 47px)', fontWeight: 600,
            lineHeight: 1.15, letterSpacing: '-0.035em', marginBottom: 24,
            fontFamily: 'var(--font-display)',
          }}>
            From Internal Request to Purchase Order.{' '}
            <span style={{
              background: 'linear-gradient(135deg,#7ba6ff 0%,#4f8bff 50%,#2a6cff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Without the Back and Forth.
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: 'clamp(17.3px, 1.25vw, 18px)', lineHeight: 1.65, color: '#8899b8', fontWeight: 400,
              marginBottom: 40, maxWidth: 520, fontFamily: 'var(--font-inter)',
            }}
          >
            Requests get lost, approvals stall, and POs go out manually one by one. FactWise unifies every step into one intelligent flow — so requests move faster, sourcing gets smarter, and every PO ships with confidence.
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
          </div>

        </div>

        {/* RIGHT COLUMN */}
        {isDesktop && (
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.35, ease:[0.16,1,0.3,1] }}
          className="hidden xl:block fw-hero-visual"
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

          {/* Float card 1 — Approval triggered */}
          <FloatCard delay={0.5} yAmt={12} dur={6} style={{ top:40, left:-45, width:240, padding:'10px 14px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>REQ-1041 · Approved</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>Engineering · ₹14,800 value</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:6, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', display:'grid', placeItems:'center', color:'#10b981', fontSize:13 }}>✓</div>
            </div>
            {[
              {stage:'Dept. Manager',   done:true},
              {stage:'Finance Review',  done:true},
              {stage:'Procurement Lead',done:true},
              {stage:'PO Released',     done:true, highlight:true},
            ].map((v,i)=>(
              <div key={v.stage} style={{ display:'flex', alignItems:'center', gap:7, padding:'3px 0', fontSize:10, borderBottom:i<3?'1px solid #f8fafc':'none' }}>
                <span style={{ width:14, height:14, borderRadius:'50%', display:'grid', placeItems:'center', background: v.highlight ? 'rgba(54,102,255,0.1)' : v.done ? 'rgba(16,185,129,0.1)' : '#f1f5f9', fontSize:8, fontWeight:700, color: v.highlight ? '#3666ff' : v.done ? '#10b981' : '#94a3b8' }}>
                  {v.done ? '✓' : '·'}
                </span>
                <span style={{ color: v.highlight ? '#3666ff' : '#475569', fontWeight: v.highlight ? 700 : 400 }}>{v.stage}</span>
              </div>
            ))}
          </FloatCard>

          {/* Float card 2 — RFQ Auto-sent */}
          <FloatCard delay={1.2} yAmt={10} dur={7} style={{ bottom:120, left:20, width:228 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>RFQ Auto-dispatched</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>6 vendors · REQ-1041</div>
              </div>
              <div style={{ width:24, height:24, borderRadius:6, background:'rgba(54,102,255,0.08)', border:'1px solid rgba(54,102,255,0.2)', display:'grid', placeItems:'center', color:'#3666ff', fontSize:10 }}>📤</div>
            </div>
            <div style={{ height:5, background:'#f1f5f9', borderRadius:3, overflow:'hidden', margin:'10px 0 7px' }}>
              <div style={{ width:'83%', height:'100%', borderRadius:3, background:'linear-gradient(90deg,#3666ff,#10b981)' }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:'#94a3b8' }}>
              <span>5 of 6 bids received</span>
              <span style={{ color:'#10b981', fontWeight:700, fontFamily:mono }}>83%</span>
            </div>
          </FloatCard>

          {/* Float card 3 — PO Generated */}
          <FloatCard delay={2.4} yAmt={14} dur={8} style={{ top:270, right:-40, width:260 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>PO Generated</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>PO-3812 · Apex Industrial</div>
              </div>
              <span style={{ padding:'2px 8px', borderRadius:5, fontSize:9, fontWeight:700, background:'rgba(0,184,132,0.08)', color:'#10b981', border:'1px solid rgba(0,184,132,0.2)' }}>✓ Issued</span>
            </div>
            <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-0.025em', fontFamily:mono, color:'#1A1D2E', margin:'7px 0 2px' }}>
              <span style={{ fontSize:13, color:'#94a3b8' }}>$</span>14,200
            </div>
            <div style={{ fontSize:9, color:'#94a3b8', marginBottom:10 }}>Vendor: Apex Industrial Supply Co.</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingTop:10, borderTop:'1px solid #f1f5f9' }}>
              {[
                {label:'Requisitions',  value:'3 merged'},
                {label:'Savings',       value:'₹1,840', green:true},
                {label:'Approval time', value:'4.2 hrs'},
                {label:'PO cycle',      value:'< 1 day'},
              ].map(q=>(
                <div key={q.label}>
                  <div style={{ fontSize:8, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{q.label}</div>
                  <div style={{ fontFamily:mono, fontWeight:600, fontSize:10, color:q.green?'#10b981':'#1A1D2E' }}>{q.value}</div>
                </div>
              ))}
            </div>
          </FloatCard>
        </motion.div>
        )}
      </div>

      <style>{`@keyframes fw-pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </section>
    </>
  )
}
