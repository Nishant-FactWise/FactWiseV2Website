'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Pause, ShoppingCart, Zap, Send, Mail, RefreshCw } from 'lucide-react';

const APPROVAL_FLOW = [
    { id: 'REQ-1041', item: 'Hydraulic Seals × 200',  dept: 'Engineering',  value: '$8,400',  status: 'Approved' },
    { id: 'REQ-1042', item: 'Control Valves × 50',    dept: 'Maintenance',  value: '$6,200',  status: 'Approved' },
    { id: 'REQ-1043', item: 'Hydraulic Seals × 300',  dept: 'Operations',   value: '$12,600', status: 'Approved' },
    { id: 'REQ-1044', item: 'Pressure Gauges × 30',   dept: 'Quality',      value: '$3,450',  status: 'Approved' },
];

const VENDORS = ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E', 'Vendor F'];

export default function ReqSection32({ isActive = true }: { isActive?: boolean }) {
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    // Phase 1: Purchaser inbound list
    const [inboundN, setInboundN] = useState(0);
    // Phase 2: Consolidation animation
    const [consolidateStep, setConsolidateStep] = useState(0); // 0=none, 1=highlight, 2=merged, 3=savings
    // Phase 3: RFQ auto-setup
    const [vendorN, setVendorN] = useState(0);
    const [priceLoaded, setPriceLoaded] = useState(false);
    const [allocLoaded, setAllocLoaded] = useState(false);
    // Phase 4: RFQ Live
    const [rfqLive, setRfqLive] = useState(false);

    const resetAll = () => {
        setInboundN(0);
        setConsolidateStep(0);
        setVendorN(0);
        setPriceLoaded(false);
        setAllocLoaded(false);
        setRfqLive(false);
    };

    React.useEffect(() => {
        if (!isAuto || !isActive) return;
        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function run() {
            while (!cancel && isAuto) {
                resetAll();
                setPhase(1);
                await sleep(300);

                // Phase 1: Inbound list builds up
                for (let i = 1; i <= 4; i++) {
                    if (cancel) return;
                    setInboundN(i);
                    await sleep(500);
                }
                await sleep(1800);

                // Phase 2: Consolidation
                if (cancel) return;
                setPhase(2);
                setInboundN(0);
                await sleep(400);
                setConsolidateStep(1); // highlight matching reqs
                await sleep(1200);
                setConsolidateStep(2); // merged
                await sleep(1000);
                setConsolidateStep(3); // show savings
                await sleep(2200);

                // Phase 3: RFQ auto-setup
                if (cancel) return;
                setPhase(3);
                setConsolidateStep(0);
                await sleep(400);
                for (let i = 1; i <= 6; i++) {
                    if (cancel) return;
                    setVendorN(i);
                    await sleep(300);
                }
                await sleep(500);
                setPriceLoaded(true);
                await sleep(500);
                setAllocLoaded(true);
                await sleep(2000);

                // Phase 4: RFQ Live
                if (cancel) return;
                setPhase(4);
                setVendorN(0);
                setPriceLoaded(false);
                setAllocLoaded(false);
                await sleep(400);
                setRfqLive(true);
                await sleep(2500);
            }
        }

        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => {
        setIsAuto(false);
        setPhase(p);
        resetAll();
        if (p === 1) { setInboundN(4); }
        if (p === 2) { setConsolidateStep(3); }
        if (p === 3) { setVendorN(6); setPriceLoaded(true); setAllocLoaded(true); }
        if (p === 4) { setRfqLive(true); }
    };

    const steps = [
        { p: 1, title: 'Approved Reqs in Purchaser Inbound' },
        { p: 2, title: 'Multi-Req Consolidation' },
        { p: 3, title: 'Auto Vendor Selection & Target Price' },
        { p: 4, title: 'RFQ Live — Before Inbox Opens' },
    ];

    return (
        <div id="req-section-3-2" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{ __html: `
            .s32-stage {
              flex:1; background:#fbfcfe; border:1px solid rgba(15,23,42,0.06);
              border-radius:16px; padding:18px; position:relative; overflow:hidden; min-height:400px;
            }
            .s32-scene { position:absolute; top:18px; left:18px; right:18px; bottom:84px; opacity:0; transition:opacity .4s ease; pointer-events:none; overflow:hidden; }
            .s32-scene.on { opacity:1; pointer-events:auto; }
            .s32-row {
              background:white; border:1px solid rgba(15,23,42,0.07); border-radius:10px;
              padding:10px 12px; display:grid; grid-template-columns:0.8fr 1.5fr 0.9fr 0.8fr 0.7fr;
              gap:8px; align-items:center; font-size:10px;
              opacity:0; transform:translateY(8px); transition:all .45s cubic-bezier(.22,.61,.36,1);
            }
            .s32-row.in { opacity:1; transform:translateY(0); }
            .s32-row.highlight { border-color:rgba(54,102,255,0.4); background:rgba(54,102,255,0.04); }
            .s32-merged {
              background:white; border:1.5px solid rgba(0,184,132,0.35); border-radius:12px;
              padding:12px 14px; opacity:0; transform:scale(0.97);
              transition:all .5s cubic-bezier(.22,.61,.36,1);
            }
            .s32-merged.in { opacity:1; transform:scale(1); }
            .s32-savings {
              background:linear-gradient(90deg,rgba(0,184,132,0.07),rgba(54,102,255,0.04));
              border:1px solid rgba(0,184,132,0.2); border-radius:10px;
              padding:10px 14px; display:flex; align-items:center; justify-content:space-between;
              opacity:0; transform:translateY(5px); transition:all .45s ease;
            }
            .s32-savings.in { opacity:1; transform:translateY(0); }
            .s32-vendorChip {
              display:flex; flex-direction:column; align-items:center; gap:3px;
              opacity:0; transform:translateY(8px); transition:all .4s cubic-bezier(.22,.61,.36,1);
            }
            .s32-vendorChip.in { opacity:1; transform:translateY(0); }
            .s32-chipLogo {
              width:32px; height:32px; border-radius:9px;
              background:linear-gradient(135deg,#475569,#64748b);
              display:grid; place-items:center; color:white;
              font-size:8.5px; font-weight:800;
              border:2px solid transparent; transition:all .35s ease;
            }
            .s32-vendorChip.in .s32-chipLogo {
              border-color:rgba(54,102,255,0.3);
              box-shadow:0 0 0 3px rgba(54,102,255,0.1);
              background:linear-gradient(135deg,#3b5bdb,#4c6ef5);
            }
            .s32-rfqCard {
              background:white; border:1.5px solid rgba(54,102,255,0.3); border-radius:14px;
              padding:16px 18px; text-align:center; position:relative;
              opacity:0; transform:scale(0.9) translateY(-8px); transition:all .55s cubic-bezier(.22,.61,.36,1);
            }
            .s32-rfqCard.in { opacity:1; transform:scale(1) translateY(0); }
            .s32-rfqCard::after {
              content:''; position:absolute; inset:-6px; border-radius:19px;
              border:1.5px solid rgba(54,102,255,0.15);
              animation:s32-ring 2.4s ease-out infinite; pointer-events:none;
            }
            @keyframes s32-ring { 0%{transform:scale(0.94);opacity:.7} 100%{transform:scale(1.12);opacity:0} }
            .s32-cap {
              position:absolute; left:18px; bottom:14px; right:18px;
              font-size:11px; font-weight:600; color:#64748b; line-height:1.5;
              display:flex; align-items:center; gap:12px; padding:10px 14px;
              background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px;
              box-shadow:0 4px 12px rgba(0,0,0,0.03); transition:opacity .35s ease,transform .35s ease;
              opacity:0; transform:translateY(10px); pointer-events:none;
            }
            .s32-cap.on { opacity:1; transform:translateY(0); }
            .s32-cap .cd { width:5px; height:5px; border-radius:50%; background:#3666ff; flex-shrink:0; animation:s32-pulse 1.6s ease-in-out infinite; }
            @keyframes s32-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
            ` }} />

            {/* LEFT: Animation Panel (this section flips — anim on left, text on right) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                className="lg:col-span-6 order-2 lg:order-1 relative"
            >
                <div
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.28),0_15px_40px_-10px_rgba(54,102,255,0.2)] overflow-hidden flex flex-col justify-between select-none min-h-[510px] lg:h-[510px] w-full"
                >
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <ShoppingCart className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Purchaser Inbound</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                            <span className={`size-1.5 rounded-full ${isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">{isAuto ? 'Auto-Pilot' : 'Manual'}</span>
                        </div>
                    </div>

                    <div className="s32-stage">

                        {/* SCENE 1: Purchaser Inbound List */}
                        <div className={`s32-scene ${phase === 1 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>Approved — Awaiting Sourcing Action</span>
                                    {inboundN >= 4 && <span style={{ fontSize:9, color:'#3666ff', fontWeight:800, fontFamily:"'JetBrains Mono',monospace" }}>4 ITEMS READY</span>}
                                </div>
                                <div style={{ display:'grid', gridTemplateColumns:'0.8fr 1.5fr 0.9fr 0.8fr 0.7fr', gap:8, fontSize:8, color:'#94a3b8', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0 12px 4px' }}>
                                    <div>REQ ID</div><div>Item</div><div>Dept</div><div>Value</div><div>Status</div>
                                </div>
                                {APPROVAL_FLOW.map((r, i) => (
                                    <div key={r.id} className={`s32-row ${inboundN > i ? 'in' : ''}`} style={{ transitionDelay:`${i*0.08}s` }}>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", color:'#3666ff', fontSize:9, fontWeight:700 }}>{r.id}</div>
                                        <div style={{ fontWeight:700, color:'#0b1322' }}>{r.item}</div>
                                        <div style={{ color:'#64748b' }}>{r.dept}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:'#0b1322' }}>{r.value}</div>
                                        <div style={{ fontSize:8, fontWeight:800, color:'#00b884', background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:4, padding:'2px 6px', textAlign:'center' }}>✓ {r.status}</div>
                                    </div>
                                ))}
                                {inboundN >= 4 && (
                                    <div style={{ padding:'8px 14px', background:'rgba(54,102,255,0.06)', border:'1px solid rgba(54,102,255,0.12)', borderRadius:9, fontSize:10, fontWeight:700, color:'#1e3a8a', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2 }}>
                                        <span>No chasing. No manual handoffs. Delivered directly to your queue.</span>
                                        <span style={{ fontSize:8, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", fontWeight:800, background:'rgba(54,102,255,0.1)', padding:'2px 6px', borderRadius:3 }}>AUTO</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 2: Consolidation */}
                        <div className={`s32-scene ${phase === 2 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    Matching Requisitions — Same Item Detected
                                </div>

                                {/* Three separate reqs being highlighted */}
                                {consolidateStep >= 1 && (
                                    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                        {[
                                            { id:'REQ-1041', qty:'200 pcs', dept:'Engineering', unit:'$42/pc' },
                                            { id:'REQ-1043', qty:'300 pcs', dept:'Operations',  unit:'$42/pc' },
                                        ].map((r, i) => (
                                            <div key={r.id} style={{ background:'rgba(54,102,255,0.05)', border:`1.5px solid ${consolidateStep >= 2 ? 'rgba(0,184,132,0.3)' : 'rgba(54,102,255,0.35)'}`, borderRadius:10, padding:'9px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11, transition:'all .5s ease' }}>
                                                <div>
                                                    <span style={{ fontFamily:"'JetBrains Mono',monospace", color:'#3666ff', fontSize:9, fontWeight:700, marginRight:8 }}>{r.id}</span>
                                                    <span style={{ fontWeight:700, color:'#0b1322' }}>Hydraulic Seals</span>
                                                </div>
                                                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:'#0b1322' }}>{r.qty}</span>
                                                    <span style={{ fontSize:9, color:'#64748b' }}>{r.dept}</span>
                                                    {consolidateStep >= 2 && (
                                                        <span style={{ fontSize:8, fontWeight:800, color:'#3666ff', background:'rgba(54,102,255,0.1)', padding:'2px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace" }}>MERGED ↓</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Arrow */}
                                {consolidateStep >= 2 && (
                                    <div style={{ textAlign:'center', fontSize:20, color:'#3666ff', lineHeight:1 }}>⤵</div>
                                )}

                                {/* Merged result */}
                                <div className={`s32-merged ${consolidateStep >= 2 ? 'in' : ''}`}>
                                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                                        <div>
                                            <div style={{ fontSize:9, fontWeight:800, color:'#00b884', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.06em', marginBottom:3 }}>✓ CONSOLIDATED RFQ LINE</div>
                                            <div style={{ fontSize:13, fontWeight:800, color:'#0b1322' }}>Hydraulic Seals — Merged</div>
                                            <div style={{ fontSize:9, color:'#64748b', fontFamily:"'JetBrains Mono',monospace", marginTop:3 }}>REQ-1041 + REQ-1043 · Eng + Ops</div>
                                        </div>
                                        <div style={{ textAlign:'right' }}>
                                            <div style={{ fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Combined Qty</div>
                                            <div style={{ fontSize:18, fontWeight:800, color:'#0b1322', fontFamily:"'JetBrains Mono',monospace" }}>500 pcs</div>
                                        </div>
                                    </div>
                                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                                        {[
                                            { label:'Separate unit price', value:'$42.00/pc', cross:true },
                                            { label:'Bulk rate (500+)',     value:'$34.50/pc', green:true },
                                        ].map(c => (
                                            <div key={c.label} style={{ background:'#f8fafc', borderRadius:8, padding:'8px 10px', border:'1px solid rgba(15,23,42,0.06)' }}>
                                                <div style={{ fontSize:8, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{c.label}</div>
                                                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, fontSize:12, color: c.cross ? '#94a3b8' : c.green ? '#00b884' : '#0b1322', textDecoration: c.cross ? 'line-through' : 'none' }}>{c.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={`s32-savings ${consolidateStep >= 3 ? 'in' : ''}`}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#065f46' }}>Volume savings unlocked</span>
                                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:800, color:'#00b884' }}>↓ $3,750 saved (18%)</span>
                                </div>
                            </div>
                        </div>

                        {/* SCENE 3: RFQ Auto-Setup */}
                        <div className={`s32-scene ${phase === 3 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    RFQ Auto-Setup · AI Pre-filling
                                </div>

                                {/* Vendor chips */}
                                <div>
                                    <div style={{ fontSize:9, fontWeight:800, color:'#94a3b8', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>AUTO-SELECTED VENDORS (from history)</div>
                                    <div style={{ display:'flex', justifyContent:'space-around', padding:'4px 0' }}>
                                        {VENDORS.map((v, i) => (
                                            <div key={v} className={`s32-vendorChip ${vendorN > i ? 'in' : ''}`} style={{ transitionDelay:`${i*0.08}s` }}>
                                                <div className="s32-chipLogo">{v.split(' ')[1]}</div>
                                                <span style={{ fontSize:8, fontWeight:700, color:'#475569', maxWidth:44, textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v}</span>
                                                {vendorN > i && <span style={{ fontSize:7, fontWeight:800, color:'#00b884', fontFamily:"'JetBrains Mono',monospace" }}>HIST</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Target price prefill */}
                                {priceLoaded && (
                                    <div style={{ background:'white', border:'1px solid rgba(15,23,42,0.08)', borderRadius:10, padding:'10px 12px', animation:'s32-fadeIn .4s ease forwards' }}>
                                        <div style={{ fontSize:9, fontWeight:800, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.06em', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                                            <span style={{ width:5, height:5, borderRadius:'50%', background:'#3666ff', display:'inline-block', animation:'s32-pulse 1.6s infinite' }} />
                                            TARGET PRICES · Pre-filled from 18 past POs
                                        </div>
                                        {[
                                            { item:'Hydraulic Seals (merged)', target:'$34.50/pc', last:'$38.20', saving:'9.7%' },
                                            { item:'Control Valves',           target:'$124/unit', last:'$131',   saving:'5.3%' },
                                            { item:'Pressure Gauges',          target:'$115/unit', last:'$119',   saving:'3.4%' },
                                        ].map(r => (
                                            <div key={r.item} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(15,23,42,0.04)', fontSize:10 }}>
                                                <span style={{ color:'#475569', fontWeight:600 }}>{r.item}</span>
                                                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                                                    <span style={{ color:'#94a3b8', fontFamily:"'JetBrains Mono',monospace", fontSize:9, textDecoration:'line-through' }}>{r.last}</span>
                                                    <span style={{ color:'#00b884', fontFamily:"'JetBrains Mono',monospace", fontWeight:800 }}>{r.target}</span>
                                                    <span style={{ fontSize:8, background:'rgba(0,184,132,0.1)', color:'#00b884', padding:'1px 5px', borderRadius:3, fontWeight:800 }}>↓{r.saving}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Allocation tracking */}
                                {allocLoaded && (
                                    <div style={{ background:'rgba(54,102,255,0.04)', border:'1px solid rgba(54,102,255,0.14)', borderRadius:10, padding:'9px 12px', fontSize:10, animation:'s32-fadeIn .4s ease forwards' }}>
                                        <div style={{ fontSize:9, fontWeight:800, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", marginBottom:5 }}>REQUISITION ALLOCATION TRACKED</div>
                                        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                                            {['REQ-1041: 200 pcs', 'REQ-1043: 300 pcs', 'REQ-1042: 50 units', 'REQ-1044: 30 units'].map(a => (
                                                <span key={a} style={{ fontSize:9, fontWeight:700, color:'#3666ff', background:'rgba(54,102,255,0.08)', border:'1px solid rgba(54,102,255,0.15)', padding:'3px 8px', borderRadius:5, fontFamily:"'JetBrains Mono',monospace" }}>{a}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 4: RFQ Live */}
                        <div className={`s32-scene ${phase === 4 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16, padding:'0 8px' }}>
                                <div className={`s32-rfqCard ${rfqLive ? 'in' : ''}`} style={{ width:'100%', maxWidth:320 }}>
                                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, marginBottom:6 }}>
                                        <div style={{ width:8, height:8, borderRadius:'50%', background:'#00b884', animation:'s32-pulse 1.4s infinite' }} />
                                        <span style={{ fontSize:14, fontWeight:800, color:'#0b1322' }}>Event Live · Vendors Notified</span>
                                    </div>
                                    <div style={{ fontSize:10, color:'#64748b', marginBottom:12 }}>Hydraulic Procurement · 3 items · 6 vendors</div>
                                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                                        {[
                                            { label:'Items', value:'3' },
                                            { label:'Vendors', value:'6' },
                                        ].map(k => (
                                            <div key={k.label} style={{ background:'#f8fafc', borderRadius:8, padding:'8px 6px', textAlign:'center' }}>
                                                <div style={{ fontSize:16, fontWeight:800, color:'#0b1322' }}>{k.value}</div>
                                                <div style={{ fontSize:8, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginTop:2 }}>{k.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {rfqLive && (
                                    <div style={{ width:'100%', maxWidth:320, display:'flex', flexDirection:'column', gap:8 }}>
                                        {[
                                            { ic: Send,      text: 'RFQ dispatched to 6 vendors simultaneously', time:'0 min' },
                                            { ic: Zap,       text: 'Target prices pre-loaded · Allocation tracked', time:'0 min' },
                                        ].map((row, i) => (
                                            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', background:'white', border:'1px solid rgba(15,23,42,0.07)', borderRadius:10, fontSize:11, color:'#475569', animation:`s32-slideIn .4s ease ${i*0.15}s both` }}>
                                                <div style={{ width:24, height:24, borderRadius:6, background:'rgba(54,102,255,0.1)', color:'#3666ff', display:'grid', placeItems:'center', flexShrink:0 }}>
                                                    <row.ic size={11} />
                                                </div>
                                                <span style={{ flex:1 }}>{row.text}</span>
                                                <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:'#00b884', fontWeight:800 }}>{row.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`s32-cap ${phase > 0 ? 'on' : ''}`}>
                            <span className="cd" />
                            <span>
                                {phase === 1 ? 'Approved requisitions land directly in the purchaser queue — no chasing, no manual handoffs.' :
                                 phase === 2 ? 'FactWise automatically combines requisitions for the same item, unlocking volume advantages and better pricing leverage.' :
                                 phase === 3 ? 'Approved vendors auto-selected from history. Best Prices autofilled from past POs. Every allocation tracked per requisition.' :
                                 'Your event is live before anyone else has opened their inbox.'}
                            </span>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                            <button onClick={() => setIsAuto(!isAuto)} className="size-5 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer text-slate-500">
                                {isAuto ? <Pause className="size-3" /> : <Play className="size-3" />}
                            </button>
                            <span className="font-medium">{isAuto ? 'Autopilot Active' : 'Paused — click steps to explore'}</span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT: Text + Steps */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                    Sourcing Trigger
                </div>
                <h3 className="text-[28px] md:text-[36px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    From Requisition to RFQ.<br />
                    <span className="text-[#3666ff]">Automated in Minutes, Not Days.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Once approved, requisitions land in the assigned purchaser's inbound list — turn RFQ in a single action. FactWise auto-combines requisitions for the same item for volume advantage and better pricing, auto-selects approved vendors, and pre-fills target prices from historical and market data, with every allocation tracked per item.
                </p>

                <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                    {steps.map((item) => (
                        <div
                            key={item.p}
                            onClick={() => goManual(item.p)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                phase === item.p
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {phase === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    phase === item.p ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                    : phase > item.p ? 'border-[#00b884] bg-[#00b884] text-white'
                                    : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    phase === item.p ? 'text-[#3666ff]' : phase > item.p ? 'text-slate-700' : 'text-slate-500'
                                }`}>{item.title}</span>
                            </div>
                            {phase === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes s32-fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
            @keyframes s32-slideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
            ` }} />
        </div>
    );
}
