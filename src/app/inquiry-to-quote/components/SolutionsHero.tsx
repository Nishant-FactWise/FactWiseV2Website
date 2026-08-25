'use client';

import * as React from "react"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useLocalizedText } from '@/hooks/useLocalizedText'

/* â”€â”€ tiny inline SVG icons used inside the dashboard only â”€â”€ */
const IcGrid  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>
const IcBox   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
const IcLayers= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
const IcFile  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
const IcBar   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
const IcClock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
const IcWave  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   WHITE DASHBOARD MOCKUP
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function WhiteDashboard() {
  const mono = "'JetBrains Mono', monospace"
  return (
    <div style={{
      width:'100%', height:'100%', background:'white',
      borderRadius:12, overflow:'hidden',
      display:'flex', flexDirection:'column',
      fontFamily:"'Inter', sans-serif",
    }}>
      {/* Chrome bar */}
      <div style={{
        height:38, borderBottom:'1px solid #f1f5f9',
        display:'flex', alignItems:'center',
        padding:'0 14px', gap:7, background:'#fafbfc', flexShrink:0,
      }}>
        {['#ff5f57','#ffbd2e','#28ca42'].map(c=>(
          <div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}}/>
        ))}
        <div style={{
          marginLeft:10, background:'white', border:'1px solid #e8edf3',
          padding:'2px 10px', borderRadius:4,
          fontSize:9, color:'#94a3b8', fontFamily:mono,
        }}>
          app.factwise.io / inquiry-to-quote / IQ-2049
        </div>
      </div>

      {/* Body */}
      <div style={{display:'grid', gridTemplateColumns:'160px 1fr', flex:1, minHeight:0}}>

        {/* Sidebar */}
        <div style={{
          borderRight:'1px solid #f1f5f9', padding:'14px 8px',
          background:'#fafbfc', display:'flex', flexDirection:'column',
        }}>
          {/* Brand */}
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            paddingBottom:12, marginBottom:8,
            borderBottom:'1px solid #f1f5f9',
            fontSize:12, fontWeight:700, color:'#1A1D2E',
          }}>
            <div style={{
              width:18,height:18,borderRadius:4, flexShrink:0,
              background:'linear-gradient(135deg,#4f8bff,#2a6cff)',
              display:'grid', placeItems:'center',
            }}>
              <div style={{width:7,height:7,background:'white',clipPath:'polygon(0 0,100% 0,100% 40%,40% 40%,40% 100%,0 100%)'}}/>
            </div>
            FactWise
          </div>

          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'4px 6px 3px',fontWeight:600}}>Sourcing</div>
          {[
            {ic:<IcGrid/>,  label:'BOM Builder',     active:true},
            {ic:<IcBox/>,   label:'RFQ Events'},
            {ic:<IcLayers/>,label:'Vendor Bids'},
            {ic:<IcFile/>,  label:'Quote Gen'},
          ].map(({ic,label,active})=>(
            <div key={label} style={{
              display:'flex', alignItems:'center', gap:7,
              padding:'5px 7px', borderRadius:5, fontSize:10, fontWeight:500,
              color: active ? '#3666ff' : '#64748b',
              background: active ? 'rgba(54,102,255,0.07)' : 'transparent',
              border: active ? '1px solid rgba(54,102,255,0.14)' : '1px solid transparent',
              marginBottom:1,
            }}>
              <span style={{color:active?'#3666ff':'#94a3b8',display:'inline-flex'}}>{ic}</span>
              {label}
            </div>
          ))}

          <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',padding:'8px 6px 3px',fontWeight:600}}>Intelligence</div>
          {[{ic:<IcBar/>,label:'Cost Analytics'},{ic:<IcClock/>,label:'Price History'}].map(({ic,label})=>(
            <div key={label} style={{display:'flex',alignItems:'center',gap:7,padding:'5px 7px',borderRadius:5,fontSize:10,color:'#64748b',marginBottom:1}}>
              <span style={{color:'#94a3b8',display:'inline-flex'}}>{ic}</span>{label}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{padding:'16px 18px',overflow:'hidden',display:'flex',flexDirection:'column',gap:12}}>

          {/* Header */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.01em'}}>BOM-4781 Â· Hydraulic Assembly</div>
              <div style={{fontSize:9,color:'#94a3b8',marginTop:2}}>Multi-level Â· 247 line items Â· Rev 3.2</div>
            </div>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:4,
              padding:'3px 8px',borderRadius:5,fontSize:9,fontWeight:600,
              background:'rgba(0,184,132,0.08)',color:'#059669',
              border:'1px solid rgba(0,184,132,0.2)',
            }}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>
              Live sourcing
            </div>
          </div>

          {/* KPIs */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {[
              {label:'Target Cost',    value:'â‚¹48,210', delta:'â†“ 4.2% vs last rev'},
              {label:'Best Bid',       value:'â‚¹45,890', delta:'â†“ â‚¹2,320 saved'},
              {label:'Margin Forecast',value:'28.4%',   delta:'â†‘ 3.1 pts'},
            ].map(k=>(
              <div key={k.label} style={{
                background:'white',border:'1px solid #f1f5f9',
                borderRadius:8,padding:'9px 11px',
                boxShadow:'0 1px 3px rgba(15,23,42,0.04)',
              }}>
                <div style={{fontSize:8,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:16,fontWeight:700,color:'#1A1D2E',letterSpacing:'-0.02em',marginBottom:2}}>{k.value}</div>
                <div style={{fontSize:9,color:'#10b981',fontWeight:500}}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* BOM table */}
          <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:8,overflow:'hidden',boxShadow:'0 1px 3px rgba(15,23,42,0.04)'}}>
            <div style={{
              padding:'7px 12px',borderBottom:'1px solid #f1f5f9',
              display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fafbfc',
            }}>
              <span style={{fontSize:10,fontWeight:600,color:'#1A1D2E'}}>Cost-loaded BOM</span>
              <span style={{fontSize:9,color:'#94a3b8',fontFamily:mono}}>Updated 2m ago</span>
            </div>
            <div style={{
              display:'grid',gridTemplateColumns:'1.5fr 1fr 0.5fr 0.8fr 0.5fr',
              padding:'5px 12px',fontSize:8,color:'#94a3b8',
              textTransform:'uppercase',letterSpacing:'0.08em',
              borderBottom:'1px solid #f8fafc',background:'#fdfeff',
            }}>
              <div>Component</div><div>Part ID</div><div>Qty</div><div>Unit Cost</div><div>Trend</div>
            </div>
            {[
              {name:'Hydraulic cylinder',  id:'HC-2048-B',qty:12,price:'â‚¹284.20',bars:[50,70,60,85,75]},
              {name:'Piston seal kit',     id:'PSK-114-A',qty:24,price:'â‚¹42.80', bars:[80,65,70,55,50]},
              {name:'Pressure regulator', id:'PR-509-T', qty:6, price:'â‚¹176.50',bars:[45,60,75,70,90]},
              {name:'Stainless flange',   id:'SF-302-X', qty:18,price:'â‚¹89.10', bars:[60,55,50,45,40]},
            ].map((r,i)=>(
              <div key={r.id} style={{
                display:'grid',gridTemplateColumns:'1.5fr 1fr 0.5fr 0.8fr 0.5fr',
                padding:'7px 12px',borderBottom:i<3?'1px solid #f8fafc':'none',
                fontSize:10,alignItems:'center',
              }}>
                <div style={{fontWeight:600,color:'#1A1D2E'}}>{r.name}</div>
                <div style={{fontFamily:mono,color:'#94a3b8',fontSize:9}}>{r.id}</div>
                <div style={{color:'#64748b'}}>{r.qty}</div>
                <div style={{fontFamily:mono,fontWeight:500,color:'#1A1D2E'}}>{r.price}</div>
                <div style={{display:'flex',gap:2,alignItems:'flex-end',height:14}}>
                  {r.bars.map((h,j)=>(
                    <div key={j} style={{width:3,height:`${h}%`,borderRadius:1,background:'linear-gradient(180deg,#3666ff,#2a6cff)',opacity:0.75}}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FLOATING CARDS â€” white themed, same positions as HTML original
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN HERO
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function SolutionsHero() {
  const t = useLocalizedText()
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
      {/* Background glows */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-10%', right:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'rgba(59,130,246,0.1)', filter:'blur(120px)' }}/>
        <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'rgba(99,102,241,0.05)', filter:'blur(120px)' }}/>
        {/* Grid */}
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

        {/* â”€â”€ LEFT COLUMN â”€â”€ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          style={{ maxWidth:600 }}
        >
          <h1 style={{
            fontSize:'clamp(30px, 2.8vw, 46px)', fontWeight:600,
            lineHeight:1.1, letterSpacing:'-0.035em', marginBottom:24,
            fontFamily:'var(--font-display)',
          }}>
            {t('From customer inquiry to')}{' '}
            <span style={{
              background:'linear-gradient(135deg,#7ba6ff 0%,#4f8bff 50%,#2a6cff 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              {t('winning quote.')}
            </span>{' '}
            {t('Automated from start to finish.')}
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize:18, lineHeight:1.65, color:'#8899b8', fontWeight:400,
            marginBottom:40, maxWidth:520, fontFamily:'var(--font-inter)',
          }}>
            {t('Quoting is slow, costs are hard to calculate, and margins shrink by the time the quote ships. FactWise automates every step — so you move faster, price smarter, and win more business.')}
          </p>

          {/* CTAs */}
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
              {t('Get started')}
              <span style={{
                width:28, height:28, borderRadius:'50%',
                background:'rgba(255,255,255,0.18)',
                display:'grid', placeItems:'center',
              }}>
                <ArrowRight style={{ width:14, height:14 }}/>
              </span>
            </Link>
          </div>
        </motion.div>

        {/* â”€â”€ RIGHT COLUMN: Dashboard + floating cards â”€â”€ */}
        {isDesktop && (
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.35, ease:[0.16,1,0.3,1] }}
          className="hidden xl:block fw-hero-visual"
          style={{ position:'relative', height:520 }}
        >
          {/* Main dashboard frame */}
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

          {/* Float card 1 â€” RFQ Bids (top-left) */}
          <FloatCard delay={0.5} yAmt={12} dur={6} style={{ top:40, left:-45, width:248, padding:'10px 14px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>RFQ-9821 Â· Bids in</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>5 of 7 vendors responded</div>
              </div>
              <div style={{
                width:24, height:24, borderRadius:6,
                background:'rgba(54,102,255,0.08)', border:'1px solid rgba(54,102,255,0.15)',
                display:'grid', placeItems:'center', color:'#3666ff',
              }}><IcLayers/></div>
            </div>
            {[
              {name:'Vendor A', price:'â‚¹45,890', win:true},
              {name:'Vendor B', price:'â‚¹46,420'},
              {name:'Vendor C', price:'â‚¹47,180'},
              {name:'Vendor D', price:'â‚¹49,210', dim:true},
            ].map((v,i)=>(
              <div key={v.name} style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'3px 0', fontSize:10,
                borderBottom: i<3 ? '1px solid #f8fafc' : 'none',
              }}>
                <span style={{ display:'flex', alignItems:'center', gap:7, color:'#475569' }}>
                  <span style={{
                    width:5, height:5, borderRadius:'50%', display:'inline-block',
                    background: v.win ? '#10b981' : v.dim ? '#e2e8f0' : '#f59e0b',
                    boxShadow: v.win ? '0 0 6px rgba(16,185,129,0.6)' : 'none',
                  }}/>
                  {v.name}
                </span>
                <span style={{
                  fontFamily:mono, fontWeight:600, fontSize:10,
                  color: v.win ? '#10b981' : '#1A1D2E',
                }}>{v.price}</span>
              </div>
            ))}
          </FloatCard>

          {/* Float card 2 â€” Auto-negotiation (bottom-left) */}
          <FloatCard delay={1.2} yAmt={10} dur={7} style={{ bottom:120, left:20, width:228 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>Auto-negotiation</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>Round 3 of 4 Â· running</div>
              </div>
              <div style={{
                width:24, height:24, borderRadius:6,
                background:'rgba(0,184,132,0.08)', border:'1px solid rgba(0,184,132,0.2)',
                display:'grid', placeItems:'center', color:'#10b981',
              }}><IcWave/></div>
            </div>
            <div style={{ height:5, background:'#f1f5f9', borderRadius:3, overflow:'hidden', margin:'10px 0 7px' }}>
              <div style={{
                width:'72%', height:'100%', borderRadius:3,
                background:'linear-gradient(90deg,#3666ff,#10b981)',
              }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:'#94a3b8' }}>
              <span>Vendors driven to best price</span>
              <span style={{ color:'#10b981', fontWeight:700, fontFamily:mono }}>âˆ’8.7%</span>
            </div>
          </FloatCard>

          {/* Float card 3 â€” Quote ready (right side) */}
          <FloatCard delay={2.4} yAmt={14} dur={8} style={{ top:270, right:-40, width:268 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E' }}>Quote ready</div>
                <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>Q-2049 Â· Generated in 1 click</div>
              </div>
              <span style={{
                padding:'2px 8px', borderRadius:5, fontSize:9, fontWeight:700,
                background:'rgba(0,184,132,0.08)', color:'#10b981',
                border:'1px solid rgba(0,184,132,0.2)',
              }}>âœ“ Sent</span>
            </div>
            <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-0.025em', fontFamily:mono, color:'#1A1D2E', margin:'7px 0 2px' }}>
              <span style={{ fontSize:13, color:'#94a3b8' }}>$</span>58,470
            </div>
            <div style={{ fontSize:9, color:'#94a3b8', marginBottom:10 }}>Customer: Riverline Engineering</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingTop:10, borderTop:'1px solid #f1f5f9' }}>
              {[
                {label:'Landed cost', value:'â‚¹45,890'},
                {label:'Markup',      value:'27.4%'},
                {label:'Margin',      value:'â‚¹12,580', green:true},
                {label:'Turnaround',  value:'2h 14m'},
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
