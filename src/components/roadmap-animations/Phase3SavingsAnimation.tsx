"use client";
import React, { useState, useEffect, useRef } from "react";

const TrendIcon = ({ s = 14 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const CheckIcon3 = ({ s = 14 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const AlertIcon = ({ s = 14 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const BoxIcon = ({ s = 14 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);

const P3_CSS = `
.p3-root{position:relative;width:100%;font-family:'Inter',system-ui,sans-serif;color:#0b1322;}
.p3-dash{position:relative;width:100%;height:100%;background:white;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 80px -30px rgba(15,23,42,0.22),0 8px 20px -8px rgba(15,23,42,0.06);border:1px solid rgba(15,23,42,0.05);}
.p3-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;border-bottom:1px solid rgba(15,23,42,0.05);}
.p3-bar-l{display:flex;align-items:center;gap:10px;min-width:0;}
.p3-bar-mark{width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#1F3FB8 0%,#3666ff 100%);color:white;display:grid;place-items:center;box-shadow:0 4px 10px rgba(54,102,255,0.3);flex-shrink:0;}
.p3-bar-crumbs{display:flex;align-items:center;gap:6px;min-width:0;}
.p3-bar-mod{font-size:12px;font-weight:700;color:#0b1322;letter-spacing:-0.01em;}
.p3-bar-sep{color:#cbd5e1;font-size:10px;}
.p3-bar-page{font-size:11px;font-weight:500;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.p3-bar-r{display:flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:700;color:#00b884;}
.p3-bar-r .dot{width:5px;height:5px;border-radius:50%;background:#00b884;box-shadow:0 0 0 3px rgba(0,184,132,0.18);animation:p3-pulse 1.6s ease-in-out infinite;}
@keyframes p3-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.3);}}
.p3-steps{display:flex;align-items:center;gap:4px;padding:10px 18px 0;}
.p3-steps .pd{height:3px;background:#e2e8f0;border-radius:99px;flex:1;transition:all .35s ease;}
.p3-steps .pd.on{background:#3666ff;}
.p3-steps .pd.done{background:#cbd5e1;}
.p3-stepLbl{padding:6px 18px 0;display:flex;align-items:baseline;gap:6px;}
.p3-stepLbl .t{font-size:11px;font-weight:700;color:#0b1322;letter-spacing:-0.005em;}
.p3-stepLbl .s{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;color:#94a3b8;letter-spacing:0.06em;}
.p3-stage{flex:1;margin:10px 14px 14px;background:#fbfcfe;border:1px solid rgba(15,23,42,0.06);border-radius:12px;padding:12px;position:relative;overflow:hidden;min-height:0;}
.p3-cap{position:absolute;left:12px;bottom:10px;right:12px;font-size:10px;color:#64748b;line-height:1.4;display:flex;align-items:center;gap:6px;transition:opacity .35s ease;opacity:0;pointer-events:none;}
.p3-cap.on{opacity:1;}
.p3-cap .cd{width:4px;height:4px;border-radius:50%;background:#3666ff;flex-shrink:0;animation:p3-pulse 1.6s ease-in-out infinite;}
.p3-scene{position:absolute;inset:12px;bottom:34px;opacity:0;transition:opacity .4s ease;pointer-events:none;}
.p3-scene.on{opacity:1;}
.p3-chart{position:absolute;inset:0;background:white;border:1px solid rgba(15,23,42,0.05);border-radius:11px;padding:12px 14px 8px;display:flex;flex-direction:column;gap:5px;overflow:hidden;}
.p3-chartHd{display:flex;justify-content:space-between;align-items:flex-end;}
.p3-chartHd .sku{font-family:'JetBrains Mono',monospace;font-size:8px;font-weight:700;color:#3666ff;letter-spacing:0.06em;}
.p3-chartHd .nm{font-size:11px;font-weight:800;color:#0b1322;margin-top:2px;letter-spacing:-0.01em;}
.p3-chartHd .meta{font-size:9px;color:#94a3b8;margin-top:1px;}
.p3-chartHd .right{text-align:right;}
.p3-chartHd .right .v{font-size:15px;font-weight:800;font-variant-numeric:tabular-nums;color:#00b884;line-height:1;letter-spacing:-0.02em;}
.p3-chartHd .right .l{font-size:7.5px;font-weight:700;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;margin-top:3px;}
.p3-chartCanvas{position:relative;flex:1;}
.p3-chartCanvas svg{width:100%;height:100%;overflow:visible;}
.p3-gridLine{stroke:#eef2f7;stroke-width:0.5;}
.p3-axisLbl{font-family:'JetBrains Mono',monospace;font-size:6px;font-weight:700;fill:#cbd5e1;}
.p3-trendLine{fill:none;stroke:#cbd5e1;stroke-width:1.2;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000;transition:stroke-dashoffset 1.2s ease;}
.p3-trendLine.in{stroke-dashoffset:0;}
.p3-trendArea{fill:rgba(54,102,255,0.06);opacity:0;transition:opacity .8s ease;}
.p3-trendArea.in{opacity:1;}
.p3-fairBand{fill:rgba(0,184,132,0.06);opacity:0;transition:opacity .6s ease;}
.p3-fairBand.in{opacity:1;}
.p3-fairLine{stroke:#00b884;stroke-width:1.2;stroke-dasharray:4 3;stroke-dashoffset:100;opacity:0;transition:stroke-dashoffset .6s ease,opacity .4s ease;}
.p3-fairLine.in{stroke-dashoffset:0;opacity:1;}
.p3-fairLbl{font-size:6.5px;font-weight:800;fill:#00b884;font-family:'JetBrains Mono',monospace;opacity:0;transition:opacity .4s ease;letter-spacing:0.04em;}
.p3-fairLbl.in{opacity:1;}
.p3-dot{transform-origin:center;transform-box:fill-box;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .3s ease,fill .5s ease,stroke .5s ease;}
.p3-dot.in{transform:scale(1);opacity:1;}
.p3-dot.flash{animation:p3-flash 1.4s ease-in-out infinite;}
@keyframes p3-flash{0%,100%{filter:drop-shadow(0 0 0 rgba(239,68,68,0));}50%{filter:drop-shadow(0 0 5px rgba(239,68,68,0.7));}}
.p3-insight{position:absolute;left:12px;top:44px;width:175px;padding:9px 10px;background:white;border:1px solid #fcd34d;border-left:3px solid #f59e0b;border-radius:7px;box-shadow:0 10px 18px -8px rgba(245,158,11,0.2);opacity:0;transform:translateX(-8px);transition:all .5s cubic-bezier(.22,.61,.36,1);z-index:4;}
.p3-insight.in{opacity:1;transform:translateX(0);}
.p3-insight .ih{display:flex;align-items:center;gap:5px;margin-bottom:4px;}
.p3-insight .ih .ai{width:18px;height:18px;border-radius:5px;background:rgba(245,158,11,0.15);color:#d97706;display:grid;place-items:center;}
.p3-insight .ih .at{font-size:8.5px;font-weight:800;color:#92400e;letter-spacing:0.06em;}
.p3-insight .ib{font-size:9.5px;color:#475569;line-height:1.4;}
.p3-insight .ib b{color:#0b1322;font-weight:700;}
.p3-insight .ic{margin-top:5px;padding:5px 8px;background:#fef3c7;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;color:#92400e;letter-spacing:0.02em;}
.p3-savedChip{position:absolute;right:12px;bottom:12px;display:inline-flex;align-items:center;gap:5px;padding:6px 10px;background:#00b884;color:white;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:0.02em;box-shadow:0 6px 14px -6px rgba(0,184,132,0.4);opacity:0;transform:scale(0.85);transition:all .45s cubic-bezier(.34,1.56,.64,1);z-index:5;}
.p3-savedChip.in{opacity:1;transform:scale(1);}
.p3-compound{position:absolute;inset:0;display:flex;flex-direction:column;gap:7px;}
.p3-compHead{padding:0 2px;display:flex;align-items:center;justify-content:space-between;}
.p3-compHead .tt{font-size:10px;font-weight:700;color:#475569;}
.p3-compHead .tg{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;color:#00b884;letter-spacing:0.06em;}
.p3-compRow{display:grid;grid-template-columns:26px 1fr 90px 80px;gap:8px;align-items:center;padding:8px 12px;background:white;border:1px solid rgba(15,23,42,0.06);border-radius:9px;opacity:0;transform:translateY(5px);transition:all .45s cubic-bezier(.22,.61,.36,1);}
.p3-compRow.in{opacity:1;transform:translateY(0);}
.p3-compRow.done{border-color:rgba(0,184,132,0.3);background:#f6fcf9;}
.p3-compIc{width:24px;height:24px;border-radius:6px;display:grid;place-items:center;background:rgba(54,102,255,0.1);color:#3666ff;}
.p3-compRow.done .p3-compIc{background:rgba(0,184,132,0.12);color:#00b884;}
.p3-compNm{font-size:10.5px;font-weight:700;color:#0b1322;letter-spacing:-0.005em;}
.p3-compSub{font-size:8.5px;color:#94a3b8;margin-top:1px;font-family:'JetBrains Mono',monospace;letter-spacing:0.02em;}
.p3-compBar{height:4px;background:#eef2f7;border-radius:99px;overflow:hidden;}
.p3-compBar::after{content:"";display:block;height:100%;width:0;background:#00b884;border-radius:99px;transition:width .8s cubic-bezier(.22,.61,.36,1);}
.p3-compRow.done .p3-compBar::after{width:var(--p,0%);}
.p3-compDelta{text-align:right;}
.p3-compDelta .v{font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:800;color:#94a3b8;font-variant-numeric:tabular-nums;transition:color .35s ease;}
.p3-compRow.done .p3-compDelta .v{color:#00b884;}
.p3-compDelta .l{font-size:7px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;text-transform:uppercase;margin-top:2px;}
.p3-finale{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:0 12px;}
.p3-fbig{font-size:44px;font-weight:800;letter-spacing:-0.045em;color:#00b884;line-height:1;font-variant-numeric:tabular-nums;}
.p3-fsub{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;}
.p3-marginCard{display:flex;gap:16px;background:white;border:1px solid rgba(15,23,42,0.08);border-radius:11px;padding:10px 18px;margin-top:2px;}
.p3-marginCard .mc{text-align:center;}
.p3-marginCard .mc .v{font-size:17px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-0.025em;line-height:1;color:#0b1322;}
.p3-marginCard .mc .l{font-size:8px;font-weight:700;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;}
.p3-marginCard .sep{width:1px;background:rgba(15,23,42,0.08);}
.p3-fchips{display:flex;gap:5px;margin-top:4px;flex-wrap:wrap;justify-content:center;}
.p3-fchip{display:inline-flex;align-items:center;gap:4px;padding:4px 8px;background:white;border:1px solid rgba(15,23,42,0.08);border-radius:999px;font-size:9px;font-weight:600;color:#475569;opacity:0;transform:translateY(4px);transition:all .4s ease;}
.p3-fchip.in{opacity:1;transform:translateY(0);}
.p3-fchip .ic{color:#00b884;}
`;

const HISTORY = [
  { m: "Jan", p: 19.40 }, { m: "Feb", p: 19.10 }, { m: "Mar", p: 18.90 },
  { m: "Apr", p: 19.30 }, { m: "May", p: 18.80 }, { m: "Jun", p: 19.20 },
  { m: "Jul", p: 19.00 }, { m: "Aug", p: 19.20 },
];
const FAIR_PRICE = 19.10;
const FAIR_BAND_PCT = 0.05;
const NEW_QUOTE_HIGH = 21.50;
const NEW_QUOTE_LOW = 19.40;
const CX0 = 8, CX1 = 95, CY1 = 84;
const Y_MIN = 18.0, Y_MAX = 22.5;
function xAt(i: number, total: number) { return CX0 + (i / total) * (CX1 - CX0); }
function yAt(p: number) { return CY1 - ((p - Y_MIN) / (Y_MAX - Y_MIN)) * (CY1 - 6); }

const CATEGORIES = [
  { name: "Steel & Fasteners",     sku: "168 SKUs", saved: 412000, p: 92 },
  { name: "Resins & Polymers",     sku: "94 SKUs",  saved: 308000, p: 76 },
  { name: "Cable & Harness",       sku: "211 SKUs", saved: 286000, p: 70 },
  { name: "Bearings & Mechanical", sku: "57 SKUs",  saved: 234000, p: 58 },
];

export default function Phase3SavingsAnimation({ speed = 1 }: { speed?: number }) {
  useEffect(() => {
    if (document.getElementById("p3-style")) return;
    const s = document.createElement("style");
    s.id = "p3-style"; s.textContent = P3_CSS;
    document.head.appendChild(s);
  }, []);

  const [phase, setPhase] = useState(0);
  const [histN, setHistN] = useState(0);
  const [trendLine, setTrendLine] = useState(false);
  const [fairIn, setFairIn] = useState(false);
  const [newQuoteIn, setNewQuoteIn] = useState(false);
  const [insightIn, setInsightIn] = useState(false);
  const [quoteDown, setQuoteDown] = useState(false);
  const [savedChipIn, setSavedChipIn] = useState(false);
  const [compN, setCompN] = useState(0);
  const [compDone, setCompDone] = useState(0);
  const [chipsN, setChipsN] = useState(0);
  const cancelRef = useRef(false);
  const speedMul = Math.max(0.3, Number(speed) || 1);

  useEffect(() => {
    cancelRef.current = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms / speedMul));
    async function loop() {
      while (!cancelRef.current) {
        setPhase(0); setHistN(0); setTrendLine(false); setFairIn(false);
        setNewQuoteIn(false); setInsightIn(false); setQuoteDown(false);
        setSavedChipIn(false); setCompN(0); setCompDone(0); setChipsN(0);
        await sleep(400);
        setPhase(1); await sleep(900);
        setPhase(2);
        for (let i = 1; i <= HISTORY.length; i++) { if (cancelRef.current) return; setHistN(i); await sleep(180); }
        await sleep(200); setTrendLine(true); await sleep(900);
        setPhase(3); setFairIn(true); await sleep(1500);
        setPhase(4); setNewQuoteIn(true); await sleep(1500);
        setPhase(5); setInsightIn(true); await sleep(2000);
        setPhase(6); setQuoteDown(true); await sleep(700); setSavedChipIn(true); await sleep(1500);
        setPhase(7); await sleep(300);
        for (let i = 1; i <= CATEGORIES.length; i++) { if (cancelRef.current) return; setCompN(i); await sleep(180); }
        await sleep(220);
        for (let i = 1; i <= CATEGORIES.length; i++) { if (cancelRef.current) return; setCompDone(i); await sleep(280); }
        await sleep(800);
        setPhase(8);
        for (let i = 1; i <= 3; i++) { if (cancelRef.current) return; setChipsN(i); await sleep(140); }
        await sleep(3000);
      }
    }
    loop();
    return () => { cancelRef.current = true; };
  }, [speedMul]);

  const captions: Record<number, string> = {
    1: "Item-level price history — every SKU, every vendor.",
    2: "8 months of paid prices, stored and benchmarked.",
    3: "Fair market price emerges. ±5% confidence band.",
    4: "New quote arrives. 11.5% above your fair price.",
    5: "FactWise flags it. Counter-offer suggested.",
    6: "Negotiation won. ₹2,520 saved on one line.",
    7: "Compound it across every category, every quarter.",
    8: "₹1.24 Cr saved YTD. Margins up. Intelligence wins.",
  };
  const TITLES = ["Price Intelligence","Price Intelligence","Price History","Fair Market Benchmark","New Quote · Anomaly","AI Insight","Negotiation Won","Savings · By Category","Compounding"];
  const TAGS   = ["","","STL-0421","STL-0421","STL-0421","STL-0421","STL-0421","YTD · ALL PLANTS","FY24"];

  const newQuoteY = quoteDown ? yAt(NEW_QUOTE_LOW) : yAt(NEW_QUOTE_HIGH);
  const newQuoteFill = quoteDown ? "#00b884" : "#ef4444";
  const newQuoteX = xAt(HISTORY.length + 0.6, HISTORY.length + 1);

  const histPath = "M " + xAt(0, HISTORY.length - 1) + " " + yAt(HISTORY[0].p) +
    HISTORY.slice(1).map((h, i) => " L " + xAt(i + 1, HISTORY.length - 1) + " " + yAt(h.p)).join("");
  const histArea = histPath +
    " L " + xAt(HISTORY.length - 1, HISTORY.length - 1) + " " + CY1 +
    " L " + xAt(0, HISTORY.length - 1) + " " + CY1 + " Z";

  return (
    <div className="p3-root">
      <div className="p3-dash">
        <div className="p3-bar">
          <div className="p3-bar-l">
            <div className="p3-bar-mark"><TrendIcon s={12}/></div>
            <div className="p3-bar-crumbs">
              <span className="p3-bar-mod">Spend Intelligence</span>
              <span className="p3-bar-sep">/</span>
              <span className="p3-bar-page">FY24 · Direct Materials</span>
            </div>
          </div>
          <div className="p3-bar-r"><span className="dot"/>COMPOUNDING</div>
        </div>

        <div className="p3-steps">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className={"pd " + (phase === i ? "on" : phase > i ? "done" : "")}/>
          ))}
        </div>
        <div className="p3-stepLbl">
          <span className="t">{TITLES[phase] ?? ""}</span>
          {TAGS[phase] && <span className="s">· {TAGS[phase]}</span>}
        </div>

        <div className="p3-stage">
          {/* SCENES 1-6 — CHART */}
          <div className={"p3-scene " + (phase >= 1 && phase <= 6 ? "on" : "")}>
            <div className="p3-chart">
              <div className="p3-chartHd">
                <div>
                  <div className="sku">STL-0421</div>
                  <div className="nm">Steel Bracket M8 · 304</div>
                  <div className="meta">Direct material · 1,200 units / month</div>
                </div>
                <div className="right">
                  <div className="v">₹{FAIR_PRICE.toFixed(2)}</div>
                  <div className="l">Fair / unit</div>
                </div>
              </div>
              <div className="p3-chartCanvas">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[20,40,60,80].map(y => <line key={y} className="p3-gridLine" x1={CX0} y1={y} x2={CX1} y2={y}/>)}
                  {[18,19,20,21,22].map(v => (
                    <text key={v} className="p3-axisLbl" x={CX0-1} y={yAt(v)+1.5} textAnchor="end">₹{v}</text>
                  ))}
                  {HISTORY.map((h, i) => (
                    <text key={h.m} className="p3-axisLbl" x={xAt(i, HISTORY.length-1)} y={CY1+6} textAnchor="middle">{h.m}</text>
                  ))}
                  <path className={"p3-trendArea " + (trendLine ? "in" : "")} d={histArea}/>
                  <path className={"p3-trendLine " + (trendLine ? "in" : "")} d={histPath} pathLength={1000}/>
                  <rect className={"p3-fairBand " + (fairIn ? "in" : "")}
                    x={CX0} y={yAt(FAIR_PRICE*(1+FAIR_BAND_PCT))}
                    width={CX1-CX0}
                    height={yAt(FAIR_PRICE*(1-FAIR_BAND_PCT))-yAt(FAIR_PRICE*(1+FAIR_BAND_PCT))}/>
                  <line className={"p3-fairLine " + (fairIn ? "in" : "")}
                    x1={CX0} y1={yAt(FAIR_PRICE)} x2={CX1} y2={yAt(FAIR_PRICE)} pathLength={100}/>
                  <text className={"p3-fairLbl " + (fairIn ? "in" : "")}
                    x={CX1-1} y={yAt(FAIR_PRICE)-1.5} textAnchor="end">FAIR ₹{FAIR_PRICE.toFixed(2)}</text>
                  {HISTORY.map((h, i) => (
                    <circle key={h.m} className={"p3-dot " + (histN > i ? "in" : "")}
                      cx={xAt(i, HISTORY.length-1)} cy={yAt(h.p)} r={1.5}
                      fill="#3666ff" stroke="white" strokeWidth={0.6}/>
                  ))}
                  <circle
                    className={"p3-dot " + (newQuoteIn ? "in " : "") + (newQuoteIn && !quoteDown ? "flash" : "")}
                    cx={newQuoteX} cy={newQuoteY} r={2.2}
                    fill={newQuoteFill} stroke="white" strokeWidth={0.8}/>
                  {newQuoteIn && (
                    <text x={newQuoteX} y={newQuoteY-3} textAnchor="middle"
                      fontSize="6" fontWeight="800"
                      fill={quoteDown ? "#00b884" : "#ef4444"}
                      fontFamily="JetBrains Mono, monospace">
                      ₹{(quoteDown ? NEW_QUOTE_LOW : NEW_QUOTE_HIGH).toFixed(2)}
                    </text>
                  )}
                </svg>
                <div className={"p3-insight " + (insightIn && !quoteDown ? "in" : "")}>
                  <div className="ih">
                    <div className="ai"><AlertIcon s={10}/></div>
                    <div className="at">OVERPRICED</div>
                  </div>
                  <div className="ib">Quote <b>₹{NEW_QUOTE_HIGH}</b> is <b>+11.5%</b> above fair price. Counter at <b>₹{NEW_QUOTE_LOW}</b>?</div>
                  <div className="ic">→ Suggest ₹{NEW_QUOTE_LOW} · save ₹2,520</div>
                </div>
                <div className={"p3-savedChip " + (savedChipIn ? "in" : "")}>
                  <CheckIcon3 s={11}/> SAVED ₹2,520
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 7 — COMPOUND */}
          <div className={"p3-scene " + (phase === 7 ? "on" : "")}>
            <div className="p3-compound">
              <div className="p3-compHead">
                <div className="tt">Same play. Every category.</div>
                <div className="tg">YTD</div>
              </div>
              {CATEGORIES.map((c, i) => (
                <div key={c.name}
                  className={"p3-compRow " + (compN > i ? "in " : "") + (compDone > i ? "done" : "")}
                  style={{ "--p": `${c.p}%` } as React.CSSProperties}>
                  <div className="p3-compIc"><BoxIcon s={13}/></div>
                  <div>
                    <div className="p3-compNm">{c.name}</div>
                    <div className="p3-compSub">{c.sku}</div>
                  </div>
                  <div className="p3-compBar"/>
                  <div className="p3-compDelta">
                    <div className="v">−₹{(c.saved/10000).toFixed(1)}L</div>
                    <div className="l">{compDone > i ? "SAVED" : "OPTIMIZING"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCENE 8 — FINALE */}
          <div className={"p3-scene " + (phase === 8 ? "on" : "")}>
            <div className="p3-finale">
              <div className="p3-fbig">₹1.24 Cr</div>
              <div className="p3-fsub">Saved · FY24 YTD</div>
              <div className="p3-marginCard">
                <div className="mc"><div className="v">+3.4 pts</div><div className="l">Gross Margin</div></div>
                <div className="sep"/>
                <div className="mc"><div className="v">−8.2%</div><div className="l">Unit Cost</div></div>
                <div className="sep"/>
                <div className="mc"><div className="v">38</div><div className="l">Wins / Year</div></div>
              </div>
              <div className="p3-fchips">
                {["Fair-price benchmarks","Negotiation prompts","Compounding savings"].map((lb, i) => (
                  <div key={lb} className={"p3-fchip " + (chipsN > i ? "in" : "")}>
                    <span className="ic"><CheckIcon3 s={10}/></span>{lb}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={"p3-cap " + (captions[phase] ? "on" : "")}>
            <span className="cd"/>{captions[phase] || ""}
          </div>
        </div>
      </div>
    </div>
  );
}
