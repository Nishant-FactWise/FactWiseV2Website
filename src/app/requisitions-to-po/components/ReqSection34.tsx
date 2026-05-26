'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Pause, BarChart2 } from 'lucide-react';

const BIDS_RAW = [
    { code:'A', name:'Vendor A', unit:'$37.80', freight:'$2.10', duty:'$1.80', pkg:'$0.90', landed:'$42.60' },
    { code:'B', name:'Vendor B', unit:'$39.50', freight:'$3.40', duty:'$2.90', pkg:'$0.60', landed:'$46.40' },
    { code:'C', name:'Vendor C', unit:'$38.90', freight:'$4.20', duty:'$3.50', pkg:'$1.10', landed:'$47.70' },
    { code:'D', name:'Vendor D', unit:'$40.20', freight:'$1.80', duty:'$1.50', pkg:'$0.80', landed:'$44.30' },
    { code:'E', name:'Vendor E', unit:'$41.00', freight:'$1.20', duty:'$0.90', pkg:'$0.70', landed:'$43.80' },
];

export default function ReqSection34({ isActive = true }: { isActive?: boolean }) {
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    // Phase 1: Raw unit price comparison
    const [rawBidsN, setRawBidsN] = useState(0);
    // Phase 2: Landed cost revealed
    const [landedN, setLandedN] = useState(0);
    const [formulaApplied, setFormulaApplied] = useState(false);
    // Phase 3: AI recommendation
    const [aiRec, setAiRec] = useState(false);
    const [viewMode, setViewMode] = useState<'line'|'all'>('line');
    // Phase 4: Award shortlist
    const [shortlistN, setShortlistN] = useState(0);

    const resetAll = () => {
        setRawBidsN(0); setLandedN(0); setFormulaApplied(false);
        setAiRec(false); setViewMode('line'); setShortlistN(0);
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

                // Phase 1: Raw bids
                for (let i = 1; i <= 5; i++) { if (cancel) return; setRawBidsN(i); await sleep(400); }
                await sleep(1800);

                // Phase 2: Landed cost
                if (cancel) return;
                setPhase(2);
                setRawBidsN(0);
                await sleep(400);
                setFormulaApplied(true);
                await sleep(400);
                for (let i = 1; i <= 5; i++) { if (cancel) return; setLandedN(i); await sleep(400); }
                await sleep(1800);

                // Phase 3: AI recommendation
                if (cancel) return;
                setPhase(3);
                setLandedN(5);
                setFormulaApplied(true);
                await sleep(500);
                setAiRec(true);
                await sleep(900);
                setViewMode('all');
                await sleep(2000);

                // Phase 4: Shortlist
                if (cancel) return;
                setPhase(4);
                setAiRec(false);
                setViewMode('line');
                setLandedN(0);
                await sleep(400);
                for (let i = 1; i <= 3; i++) { if (cancel) return; setShortlistN(i); await sleep(600); }
                await sleep(2200);
            }
        }

        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => {
        setIsAuto(false);
        setPhase(p);
        resetAll();
        if (p === 1) { setRawBidsN(5); }
        if (p === 2) { setLandedN(5); setFormulaApplied(true); }
        if (p === 3) { setLandedN(5); setFormulaApplied(true); setAiRec(true); setViewMode('all'); }
        if (p === 4) { setShortlistN(3); }
    };

    const steps = [
        { p: 1, title: 'Supplier Bids Arrive' },
        { p: 2, title: 'Landed Cost Formula Applied' },
        { p: 3, title: 'AI Recommendation per Line Item' },
        { p: 4, title: 'Shortlist & Award with Confidence' },
    ];

    return (
        <div id="req-section-3-4" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{ __html: `
            .s34-stage { flex:1; background:#fbfcfe; border:1px solid rgba(15,23,42,0.06); border-radius:16px; padding:18px; position:relative; overflow:hidden; min-height:400px; }
            .s34-scene { position:absolute; top:18px; left:18px; right:18px; bottom:84px; opacity:0; transition:opacity .4s ease; pointer-events:none; overflow:hidden; }
            .s34-scene.on { opacity:1; pointer-events:auto; }
            .s34-row { background:white; border:1px solid rgba(15,23,42,0.07); border-radius:9px; padding:9px 10px; display:grid; gap:6px; align-items:center; font-size:10px; opacity:0; transform:translateX(-8px); transition:all .4s cubic-bezier(.22,.61,.36,1); }
            .s34-row.in { opacity:1; transform:translateX(0); }
            .s34-row.best { border-color:rgba(0,184,132,0.35); background:#f6fcf9; }
            .s34-row.wrong { border-color:rgba(245,158,11,0.3); background:#fffdf0; }
            .s34-cap { position:absolute; left:18px; bottom:14px; right:18px; font-size:11px; font-weight:600; color:#64748b; line-height:1.5; display:flex; align-items:center; gap:12px; padding:10px 14px; background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.03); transition:opacity .35s ease,transform .35s ease; opacity:0; transform:translateY(10px); pointer-events:none; }
            .s34-cap.on { opacity:1; transform:translateY(0); }
            .s34-cap .cd { width:5px; height:5px; border-radius:50%; background:#3666ff; flex-shrink:0; animation:s34-pulse 1.6s ease-in-out infinite; }
            @keyframes s34-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
            .s34-scanBeam {
              position:absolute; left:0; right:0; height:70px; pointer-events:none;
              background:linear-gradient(180deg, transparent 0%, rgba(54,102,255,0.18) 45%, rgba(54,102,255,0.22) 55%, transparent 100%);
              border-top:1px solid rgba(54,102,255,0.45);
              border-bottom:1px solid rgba(54,102,255,0.25);
              box-shadow:0 0 28px rgba(54,102,255,0.25);
              animation:s34-scan 2.8s cubic-bezier(.45,.05,.55,.95) infinite;
              z-index:2;
              mix-blend-mode:multiply;
            }
            @keyframes s34-scan {
              0%   { transform:translateY(-70px); opacity:0; }
              12%  { opacity:1; }
              88%  { opacity:1; }
              100% { transform:translateY(360px); opacity:0; }
            }
            .s34-scanLabel {
              position:absolute; top:8px; right:8px; z-index:3;
              font-size:8px; font-weight:800; font-family:'JetBrains Mono',monospace;
              color:#3666ff; background:rgba(54,102,255,0.08);
              border:1px solid rgba(54,102,255,0.2);
              padding:3px 7px; border-radius:4px; letter-spacing:0.08em;
              display:flex; align-items:center; gap:5px; pointer-events:none;
            }
            .s34-scanLabel::before {
              content:''; width:5px; height:5px; border-radius:50%; background:#3666ff;
              animation:s34-pulse 1s ease-in-out infinite;
            }
            ` }} />

            {/* LEFT: Animation Panel */}
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
                                <BarChart2 className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Bid Analytics</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500">5 Vendors</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                            <span className={`size-1.5 rounded-full ${isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">{isAuto ? 'Auto-Pilot' : 'Manual'}</span>
                        </div>
                    </div>

                    <div className="s34-stage">

                        {/* AI Scan beam — visible while AI is analyzing */}
                        {phase === 3 && (
                            <div className="s34-scanBeam" />
                        )}

                        {/* SCENE 1: Raw bids — sorted by unit price */}
                        <div className={`s34-scene ${phase === 1 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>Unit Price Comparison Only</span>
                                    <span style={{ fontSize:9, color:'#f59e0b', fontWeight:800, fontFamily:"'JetBrains Mono',monospace", background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', padding:'2px 7px', borderRadius:4 }}>⚠ Incomplete View</span>
                                </div>
                                <div style={{ display:'grid', gridTemplateColumns:'auto 1.2fr 0.8fr 0.8fr', gap:6, fontSize:8, color:'#94a3b8', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0 6px 2px' }}>
                                    <div /> <div>Vendor</div><div>Unit Price</div><div>Rank</div>
                                </div>
                                {[...BIDS_RAW].sort((a,b) => parseFloat(a.unit.replace('$','')) - parseFloat(b.unit.replace('$',''))).map((v, i) => (
                                    <div key={v.code} className={`s34-row ${rawBidsN > i ? 'in' : ''} ${i === 0 ? 'best' : ''}`} style={{ gridTemplateColumns:'auto 1.2fr 0.8fr 0.8fr', transitionDelay:`${i*0.08}s` }}>
                                        <div style={{ width:24, height:24, borderRadius:6, background: i===0 ? 'linear-gradient(135deg,#059669,#10b981)' : 'linear-gradient(135deg,#475569,#64748b)', display:'grid', placeItems:'center', color:'white', fontSize:8.5, fontWeight:800, flexShrink:0 }}>{v.code}</div>
                                        <div style={{ fontWeight:700, color:'#0b1322' }}>{v.name}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color: i===0 ? '#00b884' : '#0b1322' }}>{v.unit}</div>
                                        <div style={{ fontSize:8.5, fontWeight:800, color: i===0 ? '#00b884' : '#64748b' }}>#{i+1} {i===0 ? '← WIN?' : ''}</div>
                                    </div>
                                ))}
                                {rawBidsN >= 5 && (
                                    <div style={{ padding:'8px 12px', background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:9, fontSize:10, fontWeight:600, color:'#92400e' }}>
                                        ⚠ Unit price alone misses freight, duties, insurance & packaging — the real cost is hidden.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 2: Landed cost applied */}
                        <div className={`s34-scene ${phase === 2 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>True Landed Cost View</span>
                                    {formulaApplied && <span style={{ fontSize:9, color:'#00b884', fontWeight:800, fontFamily:"'JetBrains Mono',monospace", background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', padding:'2px 7px', borderRadius:4 }}>✓ Formula Applied</span>}
                                </div>
                                {formulaApplied && (
                                    <div style={{ background:'rgba(54,102,255,0.05)', border:'1px solid rgba(54,102,255,0.12)', borderRadius:9, padding:'7px 12px', fontSize:9, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", fontWeight:700 }}>
                                        Formula: Unit + Freight + Import Duty (BCD 5%) + Packaging → INR
                                    </div>
                                )}
                                <div style={{ display:'grid', gridTemplateColumns:'auto 0.9fr 0.6fr 0.6fr 0.6fr 0.7fr', gap:5, fontSize:7.5, color:'#94a3b8', fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', padding:'0 4px 2px' }}>
                                    <div/><div>Vendor</div><div>Unit</div><div>Freight</div><div>Duty</div><div>Landed</div>
                                </div>
                                {[...BIDS_RAW].sort((a,b) => parseFloat(a.landed.replace('$','')) - parseFloat(b.landed.replace('$',''))).map((v, i) => (
                                    <div key={v.code} className={`s34-row ${landedN > i ? 'in' : ''} ${i===0 ? 'best' : i===2||i===3 ? 'wrong' : ''}`} style={{ gridTemplateColumns:'auto 0.9fr 0.6fr 0.6fr 0.6fr 0.7fr', transitionDelay:`${i*0.08}s` }}>
                                        <div style={{ width:22, height:22, borderRadius:5, background: i===0 ? 'linear-gradient(135deg,#059669,#10b981)' : 'linear-gradient(135deg,#475569,#64748b)', display:'grid', placeItems:'center', color:'white', fontSize:8, fontWeight:800, flexShrink:0 }}>{v.code}</div>
                                        <div style={{ fontWeight:700, color:'#0b1322', fontSize:9 }}>{v.name}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#64748b' }}>{v.unit}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#f59e0b' }}>+{v.freight}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#ef4444' }}>+{v.duty}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, fontSize:10, color: i===0 ? '#00b884' : i>=2 ? '#ef4444' : '#0b1322' }}>{v.landed}</div>
                                    </div>
                                ))}
                                {landedN >= 5 && (
                                    <div style={{ padding:'8px 12px', background:'rgba(0,184,132,0.06)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:9, fontSize:10, fontWeight:700, color:'#065f46', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <span>Vendor A (#1 landed) was #1 unit price too — but Vendor C jumped from #3 → #5</span>
                                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color:'#00b884', fontSize:10 }}>$42.60</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 3: AI recommendation + view toggle */}
                        <div className={`s34-scene ${phase === 3 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>FactWise AI Recommendation</span>
                                    <div style={{ display:'flex', gap:5 }}>
                                        {(['line','all'] as const).map(m => (
                                            <button key={m} onClick={() => setViewMode(m)} style={{ fontSize:8.5, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", padding:'3px 9px', borderRadius:5, border:`1px solid ${viewMode===m ? 'rgba(54,102,255,0.4)' : 'rgba(15,23,42,0.1)'}`, background:viewMode===m ? 'rgba(54,102,255,0.08)' : 'white', color:viewMode===m ? '#3666ff' : '#94a3b8', cursor:'pointer' }}>
                                                {m === 'line' ? 'Line View' : 'All Vendors'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {aiRec && viewMode === 'line' && (
                                    <div style={{ background:'linear-gradient(135deg,rgba(54,102,255,0.07),rgba(0,184,132,0.04))', border:'1px solid rgba(54,102,255,0.2)', borderRadius:12, padding:'10px 14px' }}>
                                        <div style={{ fontSize:9, fontWeight:800, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", marginBottom:6, display:'flex', alignItems:'center', gap:5 }}>
                                            <span style={{ width:5, height:5, borderRadius:'50%', background:'#3666ff', display:'inline-block', animation:'s34-pulse 1.4s infinite' }} />
                                            FW AI RECOMMENDATION · Best bid per item
                                        </div>
                                        {[
                                            { item:'Hydraulic Seals (500 pcs)',  vendor:'Vendor A', landed:'$42.60', saving:'$2,200', pct:'10.3%' },
                                            { item:'Control Valves (50 units)',  vendor:'Vendor D', landed:'$44.30', saving:'$830',   pct:'6.8%'  },
                                            { item:'Pressure Gauges (30 units)', vendor:'Vendor B', landed:'$46.40', saving:'$540',   pct:'4.5%'  },
                                        ].map(r => (
                                            <div key={r.item} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid rgba(15,23,42,0.04)', fontSize:10 }}>
                                                <div>
                                                    <div style={{ fontWeight:700, color:'#0b1322' }}>{r.item}</div>
                                                    <div style={{ fontSize:9, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", marginTop:1 }}>→ {r.vendor}</div>
                                                </div>
                                                <div style={{ textAlign:'right' }}>
                                                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color:'#00b884' }}>{r.landed}</div>
                                                    <div style={{ fontSize:8.5, color:'#00b884' }}>↓{r.saving} ({r.pct})</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {viewMode === 'all' && (
                                    <div style={{ background:'white', border:'1px solid rgba(15,23,42,0.07)', borderRadius:10, padding:'10px 12px' }}>
                                        <div style={{ fontSize:9, fontWeight:800, color:'#94a3b8', letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:"'JetBrains Mono',monospace", marginBottom:7 }}>All Vendors · All Items · Landed Cost</div>
                                        <div style={{ display:'grid', gridTemplateColumns:'1.2fr repeat(5,0.8fr)', gap:5, fontSize:8.5, textAlign:'center' }}>
                                            <div style={{ color:'#94a3b8', fontWeight:800 }}>Item</div>
                                            {BIDS_RAW.map(v => <div key={v.code} style={{ fontWeight:800, color:'#475569' }}>{v.code}</div>)}
                                            {[
                                                { item:'Hyd. Seals', vals:['$42.60','$46.40','$47.70','$44.30','$43.80'], best:0 },
                                                { item:'Ctrl Valves', vals:['$53.10','$55.20','$58.40','$52.10','$56.80'], best:3 },
                                                { item:'Prss Gauges', vals:['$63.50','$61.20','$67.80','$65.10','$69.40'], best:1 },
                                            ].map(row => (
                                                <React.Fragment key={row.item}>
                                                    <div style={{ fontWeight:600, color:'#0b1322', textAlign:'left', fontSize:9 }}>{row.item}</div>
                                                    {row.vals.map((v, i) => (
                                                        <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight: i===row.best ? 800 : 600, color: i===row.best ? '#00b884' : '#64748b', background: i===row.best ? 'rgba(0,184,132,0.08)' : 'transparent', borderRadius:4, padding:'2px 3px' }}>{v}</div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 4: Shortlist */}
                        <div className={`s34-scene ${phase === 4 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    Shortlist · Award Decision
                                </div>
                                {[
                                    { vendor:'Vendor A', item:'Hydraulic Seals', qty:'500 pcs',  landed:'$42.60', total:'$21,300', type:'primary' },
                                    { vendor:'Vendor D', item:'Control Valves',  qty:'50 units', landed:'$44.30', total:'$2,215',  type:'primary' },
                                    { vendor:'Vendor B', item:'Pressure Gauges', qty:'30 units', landed:'$46.40', total:'$1,392',  type:'backup' },
                                ].slice(0, shortlistN).map((row, i) => (
                                    <div key={row.vendor+row.item} className={`s34-row in`} style={{ gridTemplateColumns:'none', display:'block', transitionDelay:`${i*0.1}s`, borderColor: row.type==='backup' ? 'rgba(245,158,11,0.25)' : 'rgba(0,184,132,0.3)', background: row.type==='backup' ? '#fffdf0' : '#f6fcf9' }}>
                                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
                                            <div>
                                                <div style={{ fontSize:10, fontWeight:800, color:'#0b1322' }}>{row.vendor}</div>
                                                <div style={{ fontSize:9, color:'#64748b', marginTop:1 }}>{row.item} · {row.qty}</div>
                                            </div>
                                            <span style={{ fontSize:8, fontWeight:800, padding:'2px 7px', borderRadius:4, color: row.type==='backup' ? '#92400e' : '#065f46', background: row.type==='backup' ? 'rgba(245,158,11,0.1)' : 'rgba(0,184,132,0.1)', border:`1px solid ${row.type==='backup' ? 'rgba(245,158,11,0.3)' : 'rgba(0,184,132,0.3)'}` }}>
                                                {row.type === 'primary' ? '★ PRIMARY' : '⬡ BACKUP'}
                                            </span>
                                        </div>
                                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                                            <span style={{ color:'#94a3b8' }}>Landed: <b style={{ color:'#0b1322' }}>{row.landed}</b></span>
                                            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color: row.type==='primary' ? '#00b884' : '#f59e0b' }}>Total: {row.total}</span>
                                        </div>
                                    </div>
                                ))}
                                {shortlistN >= 3 && (
                                    <div style={{ padding:'9px 13px', background:'linear-gradient(90deg,rgba(0,184,132,0.07),rgba(54,102,255,0.04))', border:'1px solid rgba(0,184,132,0.2)', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <span style={{ fontSize:10, fontWeight:700, color:'#065f46' }}>✓ 3 items shortlisted · Ready for PO generation</span>
                                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, fontSize:11, color:'#00b884' }}>$24,907 total</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`s34-cap ${phase > 0 ? 'on' : ''}`}>
                            <span className="cd" />
                            <span>
                                {phase === 1 ? 'Unit price alone is misleading — it hides freight, duties, and packaging that erode margin.' :
                                 phase === 2 ? 'Custom landed cost formulas applied to every bid — freight, duty, packaging — all normalized to your currency.' :
                                 phase === 3 ? 'AI highlights the best bid per item. Switch views to compare competitive and excluded bids at a glance.' :
                                 'Shortlist with primary and backup allocations — every award backed by true cost data.'}
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
                    Bid Analysis
                </div>
                <h3 className="text-[28px] md:text-[36px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    See True Landed Cost.<br />
                    <span className="text-[#3666ff]">Award with Confidence.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    FactWise applies your custom landed-cost formulas across every bid — duties, freight, insurance, and packaging factored in and normalized to your currency. See competitive, non-competitive, and excluded bids at a glance — line-by-line or all-vendors — while Recommended Analytics highlights the best bid per item, so every award is backed by intelligence, not instinct.
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
        </div>
    );
}
