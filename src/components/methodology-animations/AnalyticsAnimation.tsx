"use client";
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, BarChart3, Grid3x3, Plus, TrendingUp, TrendingDown, 
  Shield, Coins, Activity, PieChart, Target, Star, Check, 
  HelpCircle, Award, Zap, Upload, Eye, Database, Layers
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLocalizedText } from "@/hooks/useLocalizedText";

/* ============ DATA ============ */
const VENDORS = [
  { code: "BS", name: "Bharat Steel",     final: 124400, base: 132100, delta: -5.8, color: "#6366f1", best: true,
    perf: { price: 92, otd: 96, qty: 88, qual: 95, risk: 84 } },
  { code: "SK", name: "SKF Engineering",  final: 128900, base: 130200, delta: -1.0, color: "#06b6d4", best: false,
    perf: { price: 76, otd: 88, qty: 82, qual: 90, risk: 78 } },
  { code: "TM", name: "Timken Co.",       final: 131600, base: 129400, delta: +1.7, color: "#8b5cf6", best: false,
    perf: { price: 64, otd: 92, qty: 86, qual: 88, risk: 80 } },
  { code: "NK", name: "Nakamura Metals",  final: 134200, base: 138900, delta: -3.4, color: "#ec4899", best: false,
    perf: { price: 58, otd: 84, qty: 78, qual: 82, risk: 72 } },
];

const MONTHS = ["J","F","M","A","M","J","J","A","S","O","N","D"];

// Spend categories for donut chart
const SPEND = [
  { cat: "Direct Materials",  value: 1240, color: "#6366f1" },
  { cat: "Indirect Materials",value: 620,  color: "#06b6d4" },
  { cat: "Logistics",         value: 380,  color: "#f59e0b" },
  { cat: "Operations",        value: 280,  color: "#10b981" },
  { cat: "Capex",             value: 180,  color: "#ec4899" },
];

// Live KPIs flip from red/amber → green as data lands
const KPIS = [
  { label: "Margin Focus",  red: "-2.4%",  green: "+3.1%", icon: Shield,  tone: "rose" },
  { label: "Cycle Time",   red: "14 days", green: "6 days", icon: Activity, tone: "amber" },
  { label: "PO Accuracy",  red: "82%",    green: "98%",   icon: Target,  tone: "cyan" },
  { label: "Spend / SKU",  red: "₹2.1L",  green: "₹1.7L", icon: Coins,   tone: "pink" },
];

// Vendor performance scorecard radar dimensions
const RADAR_DIMS = [
  { key: "price", label: "Price"   },
  { key: "otd",   label: "OTD"     },
  { key: "qty",   label: "Quantity" },
  { key: "qual",  label: "Quality"  },
  { key: "risk",  label: "Risk"     },
];

/* ============ COUNTER HOOK ============ */
function useCount(target: number, active: boolean, dur = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) { setV(0); return; }
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

/* ============ RADAR HELPERS ============ */
function radarPoints(perf: Record<string, number>, dims: typeof RADAR_DIMS, cx = 90, cy = 90, r = 60) {
  const step = (Math.PI * 2) / dims.length;
  const pts = dims.map((d, i) => {
    const a = -Math.PI / 2 + i * step;
    const val = (perf[d.key] || 0) / 100;
    return [cx + Math.cos(a) * r * val, cy + Math.sin(a) * r * val];
  });
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ") + " Z";
}

function radarAxis(dims: typeof RADAR_DIMS, cx = 90, cy = 90, r = 60) {
  const step = (Math.PI * 2) / dims.length;
  return dims.map((d, i) => {
    const a = -Math.PI / 2 + i * step;
    return {
      x1: cx, y1: cy,
      x2: cx + Math.cos(a) * r, y2: cy + Math.sin(a) * r,
      lx: cx + Math.cos(a) * (r + 14), ly: cy + Math.sin(a) * (r + 14),
      label: d.label,
      anchor: (Math.abs(Math.cos(a)) < 0.2 ? "middle" : (Math.cos(a) > 0 ? "start" : "end")) as "middle" | "start" | "end"
    };
  });
}

/* ============ STAT COMPONENT ============ */
function StatCard({ icon: Icon, num, label, active, tone, delta, deltaDir }: any) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-white/70 backdrop-blur-md border rounded-xl p-2.5 transition-all duration-300",
      active 
        ? "border-indigo-200 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.12)] scale-[1.01]" 
        : "border-slate-100/80 shadow-xs"
    )}>
      {active && (
        <div className={cn(
          "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r",
          tone === "green" ? "from-emerald-400 to-teal-500" :
          tone === "cyan" ? "from-cyan-400 to-indigo-500" :
          "from-indigo-500 to-purple-600"
        )} />
      )}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
        <div className={cn("w-5 h-5 rounded-lg flex items-center justify-center shadow-xs transition-colors shrink-0", 
          tone === "green" ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" :
          tone === "cyan" ? "bg-cyan-50 text-cyan-600 border border-cyan-100/50" :
          "bg-indigo-50 text-indigo-600 border border-indigo-100/50"
        )}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-xs font-black text-slate-800 tracking-tight leading-none mt-0.5">{num}</div>
      {delta && (
        <div className={cn(
          "text-[8.5px] font-black mt-1.5 flex items-center gap-0.5 leading-none",
          deltaDir === "down" ? "text-emerald-600" : "text-rose-600"
        )}>
          {deltaDir === "down" ? <TrendingDown className="w-2.5 h-2.5" /> : <TrendingUp className="w-2.5 h-2.5" />}
          {delta}
        </div>
      )}
    </div>
  );
}

/* ============ PILL COMPONENT ============ */
function PillDeck({ icon: Icon, label, lit }: any) {
  return (
    <div className={cn(
      "flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all duration-300 relative overflow-hidden",
      lit 
        ? "border-indigo-200 bg-indigo-50/40 shadow-[0_4px_12px_-3px_rgba(99,102,241,0.12)] ring-1 ring-indigo-500/5" 
        : "border-slate-100 bg-white/60 hover:bg-white hover:border-slate-200 shadow-xs"
    )}>
      {lit && (
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-indigo-500" />
      )}
      <div className={cn("w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300",
        lit ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
      )}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <span className={cn("text-[9px] font-bold tracking-tight transition-colors duration-300",
        lit ? "text-slate-800 font-extrabold" : "text-slate-500"
      )}>{label}</span>
      <div className={cn("w-1.5 h-1.5 rounded-full ml-auto transition-all shrink-0 duration-300",
        lit ? "bg-indigo-500 shadow-[0_0_8px_#6366f1]" : "bg-slate-200"
      )} />
    </div>
  );
}

/* ============ MAIN CLASS COMPONENT ============ */
export default function AnalyticsAnimation({ speed = 0.5, onPhaseChange }: { speed?: number; onPhaseChange?: (phase: number) => void }) {
  const t = useLocalizedText();
  const [phase, setPhase] = useState(0);
  const [qmarks, setQmarks] = useState(0);
  const [bidRows, setBidRows] = useState(0);
  const [bidPrices, setBidPrices] = useState([0,0,0,0]);
  const [bidScores, setBidScores] = useState([0,0,0,0]);
  const [chartIn, setChartIn] = useState(false);
  const [perfRows, setPerfRows] = useState(0);
  const [perfShape, setPerfShape] = useState(false);
  const [spendRows, setSpendRows] = useState(0);
  const [donutFill, setDonutFill] = useState(0);
  const [kpiTiles, setKpiTiles] = useState(0);
  const [kpiGood, setKpiGood] = useState(0);
  const [recIn, setRecIn] = useState(false);
  const [recRows, setRecRows] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [awardState, setAwardState] = useState(0); // 0 hidden | 1 in | 2 pulse | 3 done
  const [finaleChips, setFinaleChips] = useState(0);
  
  const [lit, setLit] = useState({ bids: false, history: false, perf: false, spend: false, kpi: false });

  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    const speedMul = Math.max(0.3, (Number(speed) || 1) * 1.75);
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        // Reset
        setPhase(0); setQmarks(0);
        setBidRows(0); setBidPrices([0,0,0,0]); setBidScores([0,0,0,0]);
        setChartIn(false);
        setPerfRows(0); setPerfShape(false);
        setSpendRows(0); setDonutFill(0);
        setKpiTiles(0); setKpiGood(0);
        setRecIn(false); setRecRows(0); setConfidence(0); setAwardState(0);
        setFinaleChips(0);
        setLit({ bids: false, history: false, perf: false, spend: false, kpi: false });
        onPhaseChange?.(0);

        // 1. GUESS
        setPhase(1); onPhaseChange?.(1);
        for (let i = 1; i <= 8; i++) {
          if (cancelRef.current) return;
          setQmarks(i);
          await sleep(160);
        }
        await sleep(2400);

        // 2. SIGNAL (short trans)
        setPhase(2); onPhaseChange?.(2);
        await sleep(1200);

        // 3. BIDS
        setPhase(3); onPhaseChange?.(3);
        setLit(s => ({ ...s, bids: true }));
        for (let i = 1; i <= VENDORS.length; i++) {
          if (cancelRef.current) return;
          setBidRows(i);
          await sleep(320);
        }
        for (let step = 0; step <= 16; step++) {
          if (cancelRef.current) return;
          const t = step / 16;
          const eased = 1 - Math.pow(1 - t, 3);
          setBidPrices(VENDORS.map(v => Math.round(v.final * eased + v.base * (1 - eased))));
          await sleep(60);
        }
        const maxPrice = Math.max(...VENDORS.map(v => v.final));
        const minPrice = Math.min(...VENDORS.map(v => v.final));
        setBidScores(VENDORS.map(v => Math.round(100 - ((v.final - minPrice) / (maxPrice - minPrice)) * 50)));
        await sleep(2400);

        // 4. HISTORY
        setPhase(4); onPhaseChange?.(4);
        setLit(s => ({ ...s, history: true }));
        setChartIn(true);
        await sleep(3200);

        // 5. VENDOR PERFORMANCE
        setPhase(5); onPhaseChange?.(5);
        setLit(s => ({ ...s, perf: true }));
        setPerfShape(true);
        for (let i = 1; i <= RADAR_DIMS.length; i++) {
          if (cancelRef.current) return;
          setPerfRows(i);
          await sleep(280);
        }
        await sleep(2400);

        // 6. SPEND
        setPhase(6); onPhaseChange?.(6);
        setLit(s => ({ ...s, spend: true }));
        const total = SPEND.reduce((s, x) => s + x.value, 0);
        let cum = 0;
        for (let i = 0; i < SPEND.length; i++) {
          if (cancelRef.current) return;
          cum += SPEND[i].value;
          setDonutFill(cum);
          setSpendRows(i + 1);
          await sleep(380);
        }
        await sleep(2000);

        // 7. KPI
        setPhase(7); onPhaseChange?.(7);
        setLit(s => ({ ...s, kpi: true }));
        for (let i = 1; i <= KPIS.length; i++) {
          if (cancelRef.current) return;
          setKpiTiles(i);
          await sleep(220);
        }
        await sleep(600);
        for (let i = 1; i <= KPIS.length; i++) {
          if (cancelRef.current) return;
          setKpiGood(i);
          await sleep(380);
        }
        await sleep(2000);

        // 8. DECIDE
        setPhase(8); onPhaseChange?.(8);
        setRecIn(true);
        await sleep(500);
        for (let i = 1; i <= 3; i++) {
          if (cancelRef.current) return;
          setRecRows(i);
          await sleep(320);
        }
        await sleep(300);
        setConfidence(94);
        await sleep(1400);
        setAwardState(1); await sleep(350);
        setAwardState(2); await sleep(1800);
        setAwardState(3); await sleep(1400);

        await sleep(3400);
      }
    }

    loop();
    return () => { cancelRef.current = true; };
  }, [speed, onPhaseChange]);

  /* ===== Captions ===== */
  const captions: Record<number, string> = {
    1: "Three vendors. Five plants. No clear answer. Decisions made on hunches.",
    2: "FactWise turns on. Every operational signal consolidates instantly.",
    3: "Real-time bid intelligence — quotes update across vendors as they land.",
    4: "12 months of price history. Know what 'fair' really looks like.",
    5: "Vendor performance: OTD, quality, risk — scored, ranked, compared.",
    6: "Live spend visibility. Surfacing category and operations distribution YTD.",
    7: "Margin protected. KPIs flip green. You see it before finance asks.",
    8: "Award Bharat Steel — 94% confidence, recommendation logged.",
  };

  /* ===== Q-mark positions for SCENE 1 ===== */
  const QMARK_POS = [
    { x: 10, y: 12, s: 32, d: 0   },
    { x: 78, y: 18, s: 26, d: 120 },
    { x: 22, y: 70, s: 38, d: 240 },
    { x: 80, y: 72, s: 30, d: 80  },
    { x: 50, y: 8,  s: 22, d: 300 },
    { x: 6,  y: 44, s: 28, d: 160 },
    { x: 88, y: 48, s: 24, d: 200 },
    { x: 44, y: 84, s: 20, d: 60  },
  ];

  /* ===== History chart ===== */
  const CHART_VB_W = 100, CHART_VB_H = 50;
  const histMax = 145, histMin = 120;
  const buildPath = (data: number[]) => {
    const stepX = CHART_VB_W / (data.length - 1);
    const pts = data.map((v, i) => [
      i * stepX,
      CHART_VB_H - ((v - histMin) / (histMax - histMin)) * CHART_VB_H
    ]);
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
    const fill = `${line} L ${CHART_VB_W.toFixed(2)} ${CHART_VB_H.toFixed(2)} L 0 ${CHART_VB_H.toFixed(2)} Z`;
    return { line, fill, pts };
  };
  const HIST_BS = [142,138,135,131,128,130,127,131,128,126,125,124];
  const HIST_SK = [134,133,134,132,131,132,130,131,130,129,129,129];
  const bsChart = buildPath(HIST_BS);
  const skChart = buildPath(HIST_SK);

  /* ===== Radar geometry ===== */
  const axes = useMemo(() => radarAxis(RADAR_DIMS, 90, 90, 60), []);
  const ringRs = [15, 30, 45, 60];
  const bsZero = useMemo(() => radarPoints({ price: 0, otd: 0, qty: 0, qual: 0, risk: 0 }, RADAR_DIMS, 90, 90, 60), []);
  const skZero = bsZero;
  const bsFull = useMemo(() => radarPoints(VENDORS[0].perf, RADAR_DIMS, 90, 90, 60), []);
  const skFull = useMemo(() => radarPoints(VENDORS[1].perf, RADAR_DIMS, 90, 90, 60), []);

  /* ===== Donut geometry ===== */
  const donutR = 64, donutCx = 85, donutCy = 85;
  const donutCirc = 2 * Math.PI * donutR;
  const totalSpend = SPEND.reduce((s, x) => s + x.value, 0); // 2700 → "₹2.7M"
  
  let segStart = 0;
  const segs = SPEND.map((s) => {
    const frac = s.value / totalSpend;
    const len = frac * donutCirc;
    const offset = -((segStart / totalSpend) * donutCirc); // negative offset rotates clockwise
    segStart += s.value;
    return { color: s.color, len, offset, filled: donutFill >= segStart };
  });

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-indigo-50/40">
      
      {/* Visual background enhancements */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none animate-pulse duration-[10s]" />

      <div className="relative w-full max-w-[691px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-200/70 z-10 overflow-hidden flex flex-col" style={{ height: 552 }}>
        
        {/* Browser Chrome */}
        <div className="flex items-center justify-between px-4 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 shrink-0" style={{ height: 32 }}>
          <div className="flex gap-1.5">
            {["#FF5F56","#FFBD2E","#27C93F"].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full shadow-xs transition-transform hover:scale-110" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-5 bg-white/80 backdrop-blur-md rounded-md border border-slate-200/60 flex items-center px-3 gap-1.5 shadow-2xs">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[7.5px] text-slate-400 font-mono select-none tracking-tight">factwise.io/intelligence/award</span>
            </div>
          </div>
          <div className="w-10 shrink-0" />
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Side rail */}
          <div className="w-14 px-2 py-4 bg-slate-50/50 backdrop-blur-md border-r border-slate-100 flex flex-col items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-200/50 transition-colors duration-200">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-200/50 transition-colors duration-200">
              <Grid3x3 className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-xl bg-indigo-50/60 text-indigo-500 border border-indigo-100/50 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4" />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col p-4 gap-3.5 min-w-0 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-[13px] font-extrabold text-slate-900 tracking-tight leading-none">{t("Decision Intelligence")}</h3>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.14em] mt-1">{t("The Right Data at Every Decision Point")}</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-[8.5px] font-bold text-indigo-600 tracking-wide shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                {t("Live Engine")}
              </div>
            </div>

            {/* Stage */}
            <div className="flex-1 bg-linear-to-b from-slate-50/50 to-slate-100/40 border border-slate-200/60 rounded-2xl p-3.5 relative overflow-hidden min-h-0 flex flex-col shadow-inner">
              <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0" />
              
              <div className="flex items-center justify-between mb-3 shrink-0 z-10">
                <h4 className="text-[10px] font-bold text-slate-700 tracking-wide">
                  {t(phase === 1 ? "Operating Without Data" :
                   phase === 2 ? "Operational Signal Locked" :
                   phase === 3 ? "Real-Time Bid Intelligence" :
                   phase === 4 ? "Historical Pricing Trend" :
                   phase === 5 ? "Vendor Performance Radar" :
                   phase === 6 ? "YTD Spend Distribution" :
                   phase === 7 ? "Live Margin KPIs" :
                   phase === 8 ? "Smart Recommendation" :
                   phase === 9 ? "Consolidated Decision Captured" :
                   "Command Center")}
                </h4>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8,9].map(i => (
                      <div key={i} className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        phase === i ? "bg-indigo-500 w-3" :
                        phase > i ? "bg-indigo-300 w-1.5" : "bg-slate-200 w-1.5"
                      )} />
                    ))}
                  </div>
                  <span className="text-[8px] font-semibold text-indigo-600 flex items-center gap-1 whitespace-nowrap bg-indigo-50/60 border border-indigo-100/40 px-1.5 py-0.5 rounded-md">
                    <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                    {t("Auto-Processing")}
                  </span>
                </div>
              </div>

              {/* Dynamic Content Area with AnimatePresence */}
              <div className="flex-1 overflow-hidden flex flex-col relative z-10">
                <AnimatePresence mode="wait">
                  
                  {/* SCENE 1 - GUESS */}
                  {phase === 1 && (
                    <motion.div 
                      key="s1"
                      initial={{ opacity: 0, scale: 0.97 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      {/* Floating question marks */}
                      {QMARK_POS.map((p, i) => (
                        <div key={i} className={cn(
                          "absolute font-extrabold text-slate-300/60 select-none transition-all duration-1000",
                          qmarks > i ? "opacity-100 scale-110" : "opacity-0 scale-90"
                        )}
                        style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s, transitionDelay: `${p.d}ms` }}>
                          ?
                        </div>
                      ))}
                      <div className="w-64 bg-white border border-slate-200 rounded-xl p-3 shadow-lg z-10 pointer-events-auto">
                        <h5 className="font-extrabold text-slate-800 text-[10px] flex items-center gap-1.5 mb-2">
                          <HelpCircle className="w-4 h-4 text-slate-400" /> {t("Which vendor wins this award?")}
                        </h5>
                        <div className="space-y-1.5">
                          {VENDORS.slice(0, 3).map((v) => (
                            <div key={v.code} className="flex justify-between items-center px-2 py-1.5 border border-dashed border-slate-200 rounded-lg text-[9px]">
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500">{v.code}</span>
                                <span className="text-slate-500 font-bold">{v.name}</span>
                              </span>
                              <span className="text-slate-300 font-extrabold">?</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-2.5 text-[8.5px] text-slate-400 font-semibold italic text-center select-none">
                          {t("Decision made on gut feel...")}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 2 - SIGNAL */}
                  {phase === 2 && (
                    <motion.div 
                      key="s2"
                      initial={{ opacity: 0, scale: 0.97 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 -m-3 bg-indigo-100/50 rounded-full animate-ping opacity-75" />
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                          <Zap className="w-7 h-7 animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <h5 className="text-[14px] font-bold text-slate-800 tracking-tight">{t("Operational Signal Locked")}</h5>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">{t("Connecting historical prices, vendor metrics, & raw bids...")}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 3 - BIDS */}
                  {phase === 3 && (
                    <motion.div 
                      key="s3"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col gap-1.5 overflow-y-auto pr-1"
                    >
                      <div className="grid grid-cols-[28px_1.5fr_0.9fr_0.9fr_1fr_20px] gap-2 items-center px-2 py-1 text-[8px] font-bold uppercase text-slate-400 tracking-wider">
                        <div></div>
                        <div>{t("Vendor")}</div>
                        <div>{t("Quote")}</div>
                        <div>vs LY</div>
                        <div>{t("Score")}</div>
                        <div></div>
                      </div>
                      <div className="space-y-1.5">
                        {VENDORS.map((b, i) => (
                          <div key={b.code} className={cn(
                            "grid grid-cols-[28px_1.5fr_0.9fr_0.9fr_1fr_20px] gap-2 items-center p-2.5 bg-white border rounded-xl transition-all duration-300 shadow-2xs",
                            b.best ? "border-indigo-200 bg-indigo-50/20 shadow-sm" : "border-slate-100",
                            bidRows > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          )}>
                            <div className="w-6 h-6 rounded-lg text-white font-mono text-[9px] font-black flex items-center justify-center shadow-xs shrink-0" style={{ background: b.color }}>
                              {b.code}
                            </div>
                            <div className="font-semibold text-slate-800 text-[10px] truncate">{b.name}</div>
                            <div className="font-mono text-slate-900 text-[10px] font-bold">₹{(bidPrices[i] / 100000).toFixed(2)}L</div>
                            <div className={cn(
                              "text-[9px] font-bold flex items-center gap-0.5",
                              b.delta < 0 ? "text-emerald-600" : "text-rose-600"
                            )}>
                              {b.delta < 0 ? <TrendingDown className="w-2.5 h-2.5" /> : <TrendingUp className="w-2.5 h-2.5" />}
                              {b.delta > 0 ? "+" : ""}{b.delta.toFixed(1)}%
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                              <div className="h-full rounded-full transition-all duration-1000" 
                                   style={{ 
                                     width: `${bidScores[i] || 0}%`, 
                                     background: b.best ? "linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)" : `linear-gradient(90deg, ${b.color}cc, ${b.color})` 
                                   }} />
                            </div>
                            <div className="shrink-0 flex items-center justify-center">
                              {b.best && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 4 - HISTORY */}
                  {phase === 4 && (
                    <motion.div 
                      key="s4"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2 px-1 shrink-0">
                        <span className="text-[10px] font-semibold text-slate-700">{t("12-Month Historical Pricing · SKU-1003")}</span>
                        <div className="flex gap-3 text-[9px] font-medium text-slate-500 leading-none select-none">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-indigo-500 rounded" />Bharat Steel</span>
                          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-cyan-500 rounded" />SKF</span>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0 relative bg-white border border-slate-100 rounded-xl p-3 pb-6 pr-8 shadow-2xs flex flex-col">
                        <div className="flex-1 min-h-0 relative">
                          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${CHART_VB_W} ${CHART_VB_H}`} preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="fillBS4" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22"/>
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                              </linearGradient>
                              {/* Clip rect that slides from left to right to reveal lines */}
                              <clipPath id="revealClip4">
                                <rect
                                  x="0" y={-2} width={CHART_VB_W} height={CHART_VB_H + 4}
                                  style={{
                                    transformOrigin: "0 0",
                                    animation: chartIn
                                      ? "revealChart 1.4s cubic-bezier(0.4,0,0.2,1) forwards"
                                      : "none",
                                    transform: chartIn ? undefined : "scaleX(0)",
                                  }}
                                />
                              </clipPath>
                            </defs>
                            {/* Grid lines */}
                            {[0, 0.25, 0.5, 0.75, 1].map(p => (
                              <line key={p} x1="0" x2={CHART_VB_W} y1={p * CHART_VB_H} y2={p * CHART_VB_H}
                                stroke="#e2e8f0" strokeWidth="0.4"/>
                            ))}
                            {/* Fill area — fades in with opacity */}
                            <path
                              d={bsChart.fill}
                              fill="url(#fillBS4)"
                              clipPath="url(#revealClip4)"
                              style={{ opacity: chartIn ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
                            />
                            {/* SKF line */}
                            <path
                              d={skChart.line}
                              fill="none"
                              stroke="#06b6d4"
                              strokeWidth="0.7"
                              strokeOpacity="0.85"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              clipPath="url(#revealClip4)"
                            />
                            {/* Bharat Steel line */}
                            <path
                              d={bsChart.line}
                              fill="none"
                              stroke="#6366f1"
                              strokeWidth="0.9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              clipPath="url(#revealClip4)"
                            />
                          </svg>
                        </div>
                        {/* Y-Axis HTML Labels */}
                        <div className="absolute right-2 top-3 bottom-6 flex flex-col justify-between text-[8px] font-medium text-slate-400 select-none h-[calc(100%-36px)] text-right">
                          <span>₹145</span>
                          <span>₹138</span>
                          <span>₹131</span>
                          <span>₹125</span>
                          <span>₹120</span>
                        </div>
                        {/* Y-Axis Title */}
                        <div className="absolute right-2 top-[-2px] text-[7.5px] font-semibold text-slate-500 select-none">
                          {t("Price")}
                        </div>
                        {/* X-Axis HTML Labels */}
                        <div className="absolute left-3 right-8 bottom-3.5 flex justify-between text-[8px] font-medium text-slate-400 select-none">
                          {MONTHS.map((m, i) => (
                            <span key={i} className="w-4 text-center">{m}</span>
                          ))}
                        </div>
                        {/* X-Axis Title */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[7.5px] font-semibold text-slate-500 select-none">
                          {t("Month")}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 5 - VENDOR PERFORMANCE RADAR */}
                  {phase === 5 && (
                    <motion.div 
                      key="s5"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center gap-5"
                    >
                      <div className="w-40 h-40 shrink-0 bg-white border border-slate-100 rounded-xl p-1.5 shadow-2xs">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 180 180">
                          {ringRs.map(r => (
                            <circle key={r} className="stroke-slate-100 fill-none stroke-[1]" cx="90" cy="90" r={r}/>
                          ))}
                          <circle className="fill-indigo-50/5 stroke-none" cx="90" cy="90" r={60}/>
                          {axes.map((a, i) => (
                            <g key={i}>
                              <line className="stroke-slate-200 fill-none stroke-[1]" x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}/>
                              <text className="font-semibold text-[8px] fill-slate-400 uppercase tracking-wide leading-none" x={a.lx} y={a.ly} textAnchor={a.anchor} dominantBaseline="middle">{a.label}</text>
                            </g>
                          ))}
                          <path className="stroke-cyan-500 fill-cyan-500/10 stroke-[1.5] transition-all duration-1000" d={perfShape ? skFull : skZero}/>
                          <path className="stroke-indigo-600 fill-indigo-600/20 stroke-[1.5] transition-all duration-1000" d={perfShape ? bsFull : bsZero}/>
                        </svg>
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto min-w-0 pr-1">
                        <div className="text-[11px] font-semibold text-slate-800 mb-1 leading-none shrink-0 flex items-center gap-1.5">
                          Bharat Steel Score <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-bold">91/100</span>
                        </div>
                        {RADAR_DIMS.map((d, i) => {
                          const val = VENDORS[0].perf[d.key as keyof typeof VENDORS[0]["perf"]];
                          return (
                            <div key={d.key} className={cn(
                              "flex items-center gap-2.5 transition-all duration-300 shrink-0",
                              perfRows > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                            )}>
                              <span className="text-[9px] font-medium text-slate-500 w-12 truncate">{d.label}</span>
                              <div className="flex-1 h-1.5 bg-slate-100 border border-slate-200/40 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" 
                                     style={{ width: perfRows > i ? `${val}%` : "0%" }} />
                              </div>
                              <span className="font-mono font-bold text-slate-800 text-[9px] w-6 text-right shrink-0">{val}</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 6 - SPEND DONUT */}
                  {phase === 6 && (
                    <motion.div 
                      key="s6"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center gap-5"
                    >
                      <div className="w-40 h-40 shrink-0 relative bg-white border border-slate-100 rounded-xl p-1.5 shadow-2xs">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 170 170">
                          <circle cx={donutCx} cy={donutCy} r={donutR} fill="none" stroke="#f8fafc" strokeWidth="18"/>
                          {segs.map((s, i) => (
                            <circle key={i}
                              className="fill-none stroke-[18] transition-all duration-1000"
                              cx={donutCx} cy={donutCy} r={donutR}
                              stroke={s.color}
                              strokeDasharray={`${s.filled ? s.len : 0} ${donutCirc}`}
                              strokeDashoffset={s.offset}
                            />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none pointer-events-none select-none">
                          <span className="text-base font-bold text-slate-800">₹2.7 Cr</span>
                          <span className="text-[8px] text-slate-400 font-medium uppercase tracking-wider mt-1.5">{t("YTD Spend")}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-w-0 pr-1">
                        {SPEND.map((s, i) => (
                          <div key={s.cat} className={cn(
                            "flex items-center gap-2.5 transition-all duration-300 shrink-0",
                            spendRows > i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                          )}>
                            <span className="w-2.5 h-2.5 rounded shadow-xs shrink-0" style={{ background: s.color }} />
                            <span className="text-[9.5px] font-medium text-slate-600 flex-1 truncate">{s.cat}</span>
                            <span className="font-mono font-bold text-slate-800 text-[9px] shrink-0">₹{s.value}K</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SCENE 7 - LIVE KPIs */}
                  {phase === 7 && (
                    <motion.div 
                      key="s7"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 grid grid-cols-2 gap-2.5 min-h-0"
                    >
                      {KPIS.map((k, i) => {
                        const Ic = k.icon;
                        const good = kpiGood > i;
                        return (
                          <div key={k.label} className={cn(
                            "flex flex-col justify-between p-3 bg-white border rounded-xl shadow-2xs transition-all duration-500 overflow-hidden relative",
                            good ? "border-emerald-200 bg-emerald-50/20 shadow-sm" : "border-slate-100/80",
                            kpiTiles > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          )}>
                            <div className="flex items-center gap-2.5 shrink-0">
                              <div className={cn(
                                "w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0",
                                good 
                                  ? "bg-emerald-100 text-emerald-600" 
                                  : k.tone === "rose" ? "bg-rose-50 text-rose-500"
                                  : k.tone === "amber" ? "bg-amber-50 text-amber-500"
                                  : k.tone === "cyan" ? "bg-cyan-50 text-cyan-500"
                                  : "bg-slate-50 text-slate-400"
                              )}>
                                <Ic className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none truncate">{k.label}</span>
                            </div>
                            <div className={cn(
                              "text-[17px] font-bold transition-colors shrink-0 mt-2 tracking-tight",
                              good ? "text-emerald-600" : "text-rose-600"
                            )}>
                              {good ? k.green : k.red}
                            </div>
                            <span className="absolute right-2 bottom-2 opacity-35 shrink-0">
                              {good ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* SCENE 8 - DECIDE */}
                  {phase === 8 && (
                    <motion.div 
                      key="s8"
                      initial={{ opacity: 0, scale: 0.97 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex flex-col justify-between min-h-0"
                    >
                      <div className={cn(
                        "bg-linear-to-b from-white to-indigo-50/30 border border-indigo-200/80 rounded-xl p-3 shadow-md transition-all duration-500 flex flex-col gap-2 relative",
                        recIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      )}>
                        <div className="flex items-center justify-between shrink-0 mb-0.5">
                          <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-md text-[8.5px] font-semibold tracking-wider uppercase shadow-xs shrink-0 flex items-center gap-1 select-none">
                            <Zap className="w-2.5 h-2.5 fill-white" /> Recommend
                          </span>
                          <span className="font-semibold text-slate-800 text-[12px] truncate flex-1 ml-2.5">Bharat Steel</span>
                          <span className="font-mono text-[12px] font-bold text-indigo-600 shrink-0 ml-2">₹1.24L</span>
                        </div>
                        <div className="space-y-1.5 mt-0.5">
                          <div className={cn("flex items-center gap-2.5 transition-all duration-300 text-[9.5px] text-slate-600", recRows > 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5")}>
                            <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><TrendingDown className="w-3.5 h-3.5" /></span>
                            <span>5.8% below last year · historical downward trend detected</span>
                          </div>
                          <div className={cn("flex items-center gap-2.5 transition-all duration-300 text-[9.5px] text-slate-600", recRows > 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5")}>
                            <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Star className="w-3.5 h-3.5" /></span>
                            <span>{t("Vendor score 91/100 — OTD 96%, Quality rating: A+")}</span>
                          </div>
                          <div className={cn("flex items-center gap-2.5 transition-all duration-300 text-[9.5px] text-slate-600", recRows > 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5")}>
                            <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Shield className="w-3.5 h-3.5" /></span>
                            <span>Margin impact: +3.1pts. Consolidated audit log stored.</span>
                          </div>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 shrink-0">
                          <div className="flex justify-between font-semibold text-indigo-700 text-[9px] uppercase tracking-wider leading-none">
                            <span>Confidence Signal</span>
                            <span>{confidence}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 border border-slate-200/40 rounded-full overflow-hidden shrink-0 mt-0.5">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)] transition-all duration-1000" style={{ width: `${confidence}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className={cn(
                        "flex items-center justify-center gap-2 py-2.5 px-4 font-semibold text-[12px] rounded-xl shadow-lg border relative select-none shrink-0 transition-all duration-300 mt-2",
                        awardState >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                        awardState === 2 ? "animate-pulse shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-400" :
                        awardState === 3 ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-emerald-500/25" :
                        "bg-slate-100 text-slate-400 border-slate-200"
                      )}>
                        {awardState === 3 ? (
                          <>
                            <Check className="w-4 h-4 shrink-0 shadow-md" />
                            <span>Awarded · ₹7.7K under historical avg captured</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 shrink-0 fill-white" />
                            <span>{t("Award Bharat Steel")}</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


            </div>

            {/* Caption popup — between stage and pills, in normal flow */}
            <AnimatePresence mode="wait">
              {captions[phase] && (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl shrink-0"
                  style={{
                    background: "rgba(248,250,255,0.95)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    boxShadow: "0 2px 16px -4px rgba(99,102,241,0.14), 0 1px 3px rgba(15,23,42,0.05)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#818cf8] shrink-0 mt-[3px] animate-pulse" />
                  <p className="text-[12px] font-semibold text-slate-600 leading-relaxed tracking-wide m-0">
                    {t(captions[phase])}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>


          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(8px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes revealChart {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
