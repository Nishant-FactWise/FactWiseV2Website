"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Plus, Check, CheckCircle, X, GitBranch } from 'lucide-react';
import { cn } from "@/lib/utils";

// ─── Vendor data ──────────────────────────────────────────────────────────────
const VENDORS = [
  { name: "Shenzhen Co.", city: "Shenzhen",  code: "INR", sym: "$", fx: 83,  quote: 9.40,  shipping: 1.80, duty: 0.22, tax: 0.95 },
  { name: "Tata Steel",   city: "Mumbai",    code: "INR", sym: "₹", fx: 1,   quote: 920,   shipping: 35,   duty: 0,    tax: 28   },
  { name: "EuroMetal",    city: "Frankfurt", code: "EUR", sym: "€", fx: 91,  quote: 10.20, shipping: 0.95, duty: 0.12, tax: 1.05 },
];

const FIELDS = [
  { key: "quote",    label: "Unit Price", color: "bg-blue-100 text-blue-700 border-blue-200",       dot: "bg-blue-500"   },
  { key: "shipping", label: "Shipping",   color: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  { key: "duty",     label: "Duty %",     color: "bg-amber-100 text-amber-700 border-amber-200",    dot: "bg-amber-500"  },
  { key: "tax",      label: "Tax",        color: "bg-cyan-100 text-cyan-700 border-cyan-200",       dot: "bg-cyan-500"   },
];

type VKey = "quote" | "shipping" | "duty" | "tax";

// ─── IF/ELSE formula logic ────────────────────────────────────────────────────
// IF(Duty > 0, (Unit Price + Shipping) × (1 + Duty) + Tax, Unit Price + Shipping + Tax)
function computeCost(v: typeof VENDORS[0]): number {
  const base = v.quote + v.shipping;
  const landed = v.duty > 0
    ? base * (1 + v.duty) + v.tax   // IF branch
    : base + v.tax;                  // ELSE branch
  return landed * v.fx;
}

function vendorBranch(v: typeof VENDORS[0]): "if" | "else" {
  return v.duty > 0 ? "if" : "else";
}

const fmtINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtNative = (v: typeof VENDORS[0], key: VKey) => {
  const val = v[key];
  if (key === "duty") return (val * 100).toFixed(0) + "%";
  if (v.code === "INR") return "₹" + Math.round(val).toLocaleString("en-IN");
  return v.sym + val.toFixed(2);
};

// ─── Formula token types ──────────────────────────────────────────────────────
type TokenKind = "keyword" | "paren" | "field" | "operator" | "number" | "comma" | "space";
interface Token { kind: TokenKind; text: string; fieldKey?: string; }

// The full formula as a sequence of tokens
const FORMULA_TOKENS: Token[] = [
  { kind: "keyword",  text: "IF" },
  { kind: "paren",    text: "(" },
  { kind: "field",    text: "Duty %",    fieldKey: "duty" },
  { kind: "operator", text: " > " },
  { kind: "number",   text: "0" },
  { kind: "comma",    text: "," },
  { kind: "space",    text: " " },
  { kind: "paren",    text: "(" },
  { kind: "field",    text: "Unit Price", fieldKey: "quote" },
  { kind: "operator", text: " + " },
  { kind: "field",    text: "Shipping",   fieldKey: "shipping" },
  { kind: "paren",    text: ")" },
  { kind: "operator", text: " × " },
  { kind: "paren",    text: "(" },
  { kind: "number",   text: "1" },
  { kind: "operator", text: " + " },
  { kind: "field",    text: "Duty %",    fieldKey: "duty" },
  { kind: "paren",    text: ")" },
  { kind: "operator", text: " + " },
  { kind: "field",    text: "Tax",       fieldKey: "tax" },
  { kind: "comma",    text: "," },
  { kind: "space",    text: " " },
  { kind: "keyword",  text: "ELSE" },
  { kind: "space",    text: " " },
  { kind: "field",    text: "Unit Price", fieldKey: "quote" },
  { kind: "operator", text: " + " },
  { kind: "field",    text: "Shipping",   fieldKey: "shipping" },
  { kind: "operator", text: " + " },
  { kind: "field",    text: "Tax",       fieldKey: "tax" },
  { kind: "paren",    text: ")" },
];

// A "typed segment" — either a committed token or the currently-being-typed partial text
interface TypedSegment {
  kind: "committed" | "typing";
  token?: Token;       // for committed
  partial?: string;    // for the in-progress token being typed
  partialKind?: TokenKind;
  partialFieldKey?: string;
}

function tokenColor(t: Token): string {
  if (t.kind === "keyword")  return "text-indigo-600 font-black";
  if (t.kind === "paren")    return "text-slate-500 font-bold";
  if (t.kind === "operator") return "text-orange-500 font-bold";
  if (t.kind === "number")   return "text-emerald-600 font-bold";
  if (t.kind === "comma")    return "text-slate-400 font-bold";
  if (t.kind === "field") {
    const f = FIELDS.find(f => f.label === t.text);
    return f ? f.color.split(" ").filter(c => c.startsWith("text-")).join(" ") + " font-semibold" : "text-slate-700";
  }
  return "text-slate-400";
}

function fieldDot(fieldKey: string): string {
  return FIELDS.find(f => f.key === fieldKey)?.dot ?? "bg-slate-400";
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CustomFormulaAnimation() {
  const [phase, setPhase]               = useState(0);
  const [caption, setCaption]           = useState("");
  // Committed tokens (fully typed) + optional in-progress partial
  const [committedTokens, setCommittedTokens] = useState<Token[]>([]);
  const [partialText, setPartialText]   = useState("");
  const [partialToken, setPartialToken] = useState<Token | null>(null);
  const [addedFields, setAddedFields]   = useState<string[]>([]);
  const [scanIdx, setScanIdx]           = useState<number | null>(null);
  const [revealedCards, setRevealed]    = useState<number[]>([]);
  const [activeBranch, setActiveBranch] = useState<Record<number, "if" | "else" | null>>({});
  const [trueCosts, setTrueCosts]       = useState<number[]>([]);
  const [winner, setWinner]             = useState<number | null>(null);
  const [cursorPos, setCursorPos]       = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking]     = useState(false);

  const containerRef    = useRef<HTMLDivElement>(null);
  const addBtnRef       = useRef<HTMLButtonElement>(null);
  const saveBtnRef      = useRef<HTMLButtonElement>(null);
  const formulaInputRef = useRef<HTMLDivElement>(null);
  const cursorPosRef    = useRef({ x: 0, y: 0 });

  const centerOf = (el: HTMLElement | null) => {
    if (!el || !containerRef.current) return { x: 0, y: 0 };
    const er = el.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    return { x: er.left - cr.left + er.width / 2, y: er.top - cr.top + er.height / 2 };
  };

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const moveCursor = async (el: HTMLElement | null, ms = 700) => {
      if (!el || !containerRef.current) return;
      const start = { ...cursorPosRef.current };
      const end = centerOf(el);
      const steps = Math.ceil(ms / 16);
      for (let i = 1; i <= steps; i++) {
        if (cancelled) return;
        const t = i / steps;
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        cursorPosRef.current = { x: start.x + (end.x - start.x) * e, y: start.y + (end.y - start.y) * e };
        setCursorPos({ ...cursorPosRef.current });
        await sleep(16);
      }
    };

    const click = async (cb: () => void) => {
      if (cancelled) return;
      setIsClicking(true);
      await sleep(150);
      setIsClicking(false);
      cb();
    };

    async function run() {
      while (!cancelled) {
        // ── Reset ──
        setPhase(0);
        setCaption("3 vendors quoted — but which one is truly cheapest?");
        setCommittedTokens([]);
        setPartialText("");
        setPartialToken(null);
        setAddedFields([]);
        setScanIdx(null);
        setRevealed([]);
        setActiveBranch({});
        setTrueCosts([]);
        setWinner(null);
        const cr = containerRef.current?.getBoundingClientRect();
        if (cr) {
          cursorPosRef.current = { x: cr.width / 2, y: cr.height * 0.35 };
          setCursorPos({ ...cursorPosRef.current });
        }
        await sleep(1400);

        // ── Open formula builder ──
        await moveCursor(addBtnRef.current);
        await click(() => setPhase(1));
        setCaption("Building an IF/ELSE formula to calculate true landed cost per vendor");
        await sleep(600);

        // ── Click into expression bar ──
        await moveCursor(formulaInputRef.current, 500);
        await click(() => {});
        await sleep(400);

        // ── Type tokens character by character ──
        for (let i = 0; i < FORMULA_TOKENS.length; i++) {
          if (cancelled) return;
          const tok = FORMULA_TOKENS[i];

          // Instant tokens (space, single-char parens, comma, single-char operators)
          const isInstant = tok.kind === "space" || tok.text.trim().length <= 1;

          if (isInstant) {
            // Commit instantly — no character-by-character needed
            setCommittedTokens(prev => [...prev, tok]);
            setPartialText("");
            setPartialToken(null);
            await sleep(tok.kind === "space" ? 80 : 120);
          } else {
            // Type character by character
            setPartialToken(tok);
            for (let c = 1; c <= tok.text.length; c++) {
              if (cancelled) return;
              setPartialText(tok.text.slice(0, c));
              await sleep(110); // ~110ms per character — natural typing pace
            }
            // Commit the completed token as a styled chip
            setPartialText("");
            setPartialToken(null);
            setCommittedTokens(prev => [...prev, tok]);

            // Mark field as added when its chip is committed
            if (tok.kind === "field" && tok.fieldKey) {
              setAddedFields(prev =>
                prev.includes(tok.fieldKey!) ? prev : [...prev, tok.fieldKey!]
              );
            }
            // Brief pause after completing a word
            await sleep(tok.kind === "keyword" ? 220 : 160);
          }
        }
        await sleep(1800);
        setCaption("Formula complete — applying IF/ELSE logic to all 3 vendors at once");

        // ── Apply formula ──
        await moveCursor(saveBtnRef.current, 600);
        await click(() => setPhase(3));
        await sleep(400);

        // ── Scan each vendor — show which branch they take ──
        setCaption("Scanning each vendor — duty > 0 takes the IF branch, others take ELSE");
        for (let i = 0; i < VENDORS.length; i++) {
          if (cancelled) return;
          setScanIdx(i);
          await sleep(350);
          const branch = vendorBranch(VENDORS[i]);
          setActiveBranch(prev => ({ ...prev, [i]: branch }));
          await sleep(500);
          setRevealed(prev => [...prev, i]);
          await sleep(600);
        }
        setScanIdx(null);
        await sleep(400);

        // ── Reveal true costs ──
        const costs = VENDORS.map(computeCost);
        setTrueCosts(costs);
        setPhase(4);
        setCaption("True landed cost revealed — normalized to ₹ for a fair comparison");
        await sleep(700);

        // ── Declare winner ──
        const winIdx = costs.indexOf(Math.min(...costs));
        setWinner(winIdx);
        setCaption(`${VENDORS[winIdx].name} wins — the "cheapest" quote wasn't the best deal`);
        await sleep(4200);
      }
    }

    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const naiveCheapest = VENDORS.indexOf(
    VENDORS.reduce((a, b) => a.quote * a.fx < b.quote * b.fx ? a : b)
  );

  // nothing needed here — committedTokens + partialText drive the render

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-indigo-50/40">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none" />

      {/* Cursor */}
      <div className="absolute z-200 pointer-events-none" style={{ left: cursorPos.x, top: cursorPos.y }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          className={cn("drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform duration-75", isClicking && "scale-75")}>
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {isClicking && (
          <motion.div initial={{ scale: 0.4, opacity: 0.8 }} animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-0 w-5 h-5 bg-blue-400/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      {/* ── Dashboard shell ── */}
      <div className="relative w-full max-w-[691px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-200/70 z-10 overflow-hidden flex flex-col" style={{ height: 530 }}>

        {/* Browser chrome */}
        <div className="flex items-center justify-between px-4 bg-slate-50/90 border-b border-slate-100 shrink-0" style={{ height: 32 }}>
          <div className="flex gap-1.5">
            {["#FF5F56","#FFBD2E","#27C93F"].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-5 bg-white/80 rounded-md border border-slate-200/60 flex items-center px-3 gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7.5px] text-slate-400 font-mono select-none tracking-tight">factwise.io/rfq/bid-analysis</span>
            </div>
          </div>
          <div className="w-10 shrink-0" />
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-4 border-b border-slate-100 bg-white shrink-0" style={{ height: 44 }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-none">Bid Analysis — Steel Pipes RFQ</p>
              <p className="text-[8px] text-slate-400 mt-0.5">3 vendors · comparing total landed cost</p>
            </div>
          </div>
          <button ref={addBtnRef}
            className="flex items-center gap-1 px-3 py-1.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-bold rounded-lg shadow-md shadow-blue-500/20 shrink-0">
            <Plus className="w-3 h-3" /> Create Formula
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-stretch justify-center gap-3 px-4 py-4" style={{ height: 408 }}>

          {/* Vendor cards */}
          <div className="grid grid-cols-3 gap-3 pt-5">
            {VENDORS.map((v, i) => {
              const isWinner   = winner === i;
              const isLoser    = winner !== null && winner !== i;
              const isScanning = scanIdx === i;
              const isRevealed = revealedCards.includes(i);
              const branch     = activeBranch[i];
              const cost       = trueCosts[i];
              const isNaive    = phase === 0 && i === naiveCheapest;

              return (
                <motion.div key={i}
                  animate={{ y: isWinner ? -8 : 0, opacity: isLoser ? 0.72 : 1, scale: isWinner ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className={cn(
                    "relative rounded-2xl border flex flex-col transition-[border-color,box-shadow,background] duration-500",
                    isWinner
                      ? "border-emerald-400 bg-white shadow-[0_0_0_4px_rgba(22,163,74,0.10),0_20px_48px_rgba(22,163,74,0.18)]"
                      : isLoser
                      ? "border-red-300 bg-red-50/30 shadow-[0_0_0_3px_rgba(220,38,38,0.08)]"
                      : "border-slate-200 bg-white shadow-[0_8px_24px_rgba(12,16,32,0.06)]"
                  )}
                  style={{ padding: "14px 14px 12px" }}
                >
                  {/* Scan shimmer */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        initial={{ x: "-100%" }} animate={{ x: "240%" }}
                        transition={{ duration: 1.1, ease: "easeInOut" }}
                        style={{
                          position: "absolute", inset: 0, width: "55%", zIndex: 10, pointerEvents: "none",
                          borderRadius: "inherit",
                          background: "linear-gradient(90deg, transparent, rgba(108,71,255,0.16), transparent)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Winner / loser badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-30 flex justify-center">
                    <AnimatePresence mode="wait">
                      {isNaive && (
                        <motion.span key="trap"
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-700 text-[7px] font-black uppercase tracking-widest rounded-full whitespace-nowrap shadow-sm">
                          Looks cheapest
                        </motion.span>
                      )}
                      {isWinner && (
                        <motion.span key="win"
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          className="px-3 py-1 bg-emerald-500 text-white text-[7px] font-black uppercase tracking-widest rounded-full whitespace-nowrap shadow-lg shadow-emerald-500/40">
                          ✓ True Best
                        </motion.span>
                      )}
                      {isLoser && (
                        <motion.span key="bust"
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          className="px-3 py-1 bg-red-500 text-white text-[7px] font-black uppercase tracking-widest rounded-full whitespace-nowrap shadow-lg shadow-red-500/40">
                          Hidden costs
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Vendor name */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-[1.4px] leading-none">{v.name}</p>
                      <p className="text-[7px] text-slate-400 mt-0.5">{v.city}</p>
                    </div>
                    <span className={cn(
                      "text-[7px] font-black px-2 py-0.5 rounded text-white tracking-wide",
                      v.code === "INR" ? "bg-amber-500" : v.code === "INR" ? "bg-blue-700" : "bg-teal-600"
                    )}>{v.code}</span>
                  </div>

                  {/* Quote price */}
                  <div className="flex items-baseline gap-0.5 mb-3">
                    <span className="text-[13px] font-bold text-slate-400 leading-none">{v.sym}</span>
                    <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight tabular-nums">
                      {v.code === "INR" ? Math.round(v.quote).toLocaleString("en-IN") : v.quote.toFixed(2)}
                    </span>
                    <span className="text-[8px] text-slate-400 ml-1 font-medium">/ unit</span>
                  </div>

                  {/* Breakdown rows */}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.35 }}
                        className="space-y-1.5 mb-3 overflow-hidden"
                      >
                        {(["shipping","duty","tax"] as VKey[]).map((key, ki) => {
                          const field = FIELDS.find(f => f.key === key)!;
                          return (
                            <motion.div key={key}
                              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ki * 0.08 }}
                              className="flex items-center justify-between"
                            >
                              <span className="flex items-center gap-1.5 text-[8px] text-slate-500 font-medium">
                                <span className={cn("w-2 h-2 rounded-full shrink-0", field.dot)} />
                                {field.label}
                              </span>
                              <span className="text-[8px] font-bold text-slate-700 font-mono tabular-nums">
                                {fmtNative(v, key)}
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* True landed cost */}
                  <AnimatePresence>
                    {cost !== undefined && phase >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "mt-auto pt-2 border-t border-dashed",
                          isWinner ? "border-emerald-300" : isLoser ? "border-red-200" : "border-slate-200"
                        )}
                      >
                        <p className="text-[7px] font-bold uppercase tracking-[2px] text-slate-400 mb-0.5">True landed cost</p>
                        <motion.p
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 280, delay: i * 0.1 + 0.08 }}
                          className={cn(
                            "text-[22px] font-black tracking-tight leading-none tabular-nums",
                            isWinner ? "text-emerald-600" : isLoser ? "text-red-500" : "text-slate-800"
                          )}
                        >
                          {fmtINR(cost)}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Hint banner */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <GitBranch className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <p className="text-[8px] text-amber-700 font-medium">
                  <span className="font-bold">True Cost</span> unknown — quote hides duty, shipping & tax.{" "}
                  <span className="font-bold">Build an IF/ELSE formula</span> to apply the right logic per vendor.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>{/* end body */}

        {/* ── Formula Builder Modal ── */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div key="modal-bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-slate-900/30 flex items-center justify-center px-4">
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 16 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="w-full max-w-lg bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-linear-to-r from-white to-blue-50/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Calculator className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">Formula Builder · Total Landed Cost</p>
                      <p className="text-[8px] text-slate-400">Click fields to add them to your formula</p>
                    </div>
                  </div>
                  <X className="w-4 h-4 text-slate-400" />
                </div>

                <div className="px-5 py-4 space-y-3">
                  {/* Available field chips */}
                  <div>
                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Fields</p>
                    <div className="flex flex-wrap gap-2">
                      {FIELDS.map((f) => {
                        const added = addedFields.includes(f.key);
                        return (
                          <motion.div key={f.key}
                            animate={{ opacity: added ? 0.45 : 1 }}
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold",
                              f.color
                            )}
                          >
                            <span className={cn("w-2 h-2 rounded-full shrink-0", f.dot)} />
                            {f.label}
                            {added && <Check className="w-3 h-3 ml-0.5" />}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Formula expression bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Formula Expression</p>
                      <span className="text-[7px] text-indigo-500 font-bold flex items-center gap-1">
                        <GitBranch className="w-2.5 h-2.5" /> IF / ELSE logic
                      </span>
                    </div>
                    <div
                      ref={formulaInputRef}
                      className="min-h-[72px] px-4 py-3 bg-slate-50 border-2 border-blue-200 rounded-xl flex flex-wrap items-center gap-x-0.5 gap-y-1.5 shadow-inner font-mono text-[11px] leading-relaxed"
                    >
                      <AnimatePresence mode="popLayout">
                        {committedTokens.map((tok, idx) => {
                          if (tok.kind === "space") {
                            return <span key={`sp-${idx}`} className="w-1 inline-block" />;
                          }
                          if (tok.kind === "field" && tok.fieldKey) {
                            const f = FIELDS.find(f => f.key === tok.fieldKey)!;
                            return (
                              <motion.span
                                key={`tok-${idx}-${tok.text}-${tok.fieldKey}`}
                                initial={{ opacity: 0, scale: 0.75, y: 4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.75 }}
                                transition={{ type: "spring", stiffness: 500, damping: 24 }}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold mx-0.5",
                                  f.color
                                )}
                              >
                                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", f.dot)} />
                                {tok.text}
                              </motion.span>
                            );
                          }
                          return (
                            <motion.span
                              key={`tok-${idx}-${tok.text}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.08 }}
                              className={tokenColor(tok)}
                            >
                              {tok.text}
                            </motion.span>
                          );
                        })}
                      </AnimatePresence>

                      {/* In-progress partial text being typed character by character */}
                      {partialToken && partialText && (
                        <span className={cn(
                          partialToken.kind === "field" && partialToken.fieldKey
                            ? "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold mx-0.5 opacity-80 " +
                              (FIELDS.find(f => f.key === partialToken.fieldKey)?.color ?? "bg-slate-100 text-slate-700 border-slate-200")
                            : tokenColor(partialToken)
                        )}>
                          {partialToken.kind === "field" && partialToken.fieldKey && (
                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", fieldDot(partialToken.fieldKey))} />
                          )}
                          {partialText}
                        </span>
                      )}

                      {/* Placeholder */}
                      {committedTokens.length === 0 && !partialText && (
                        <span className="text-[10px] text-slate-300">Click expression bar to type…</span>
                      )}

                      {/* Blinking cursor */}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 shrink-0"
                      />
                    </div>

                    {/* Live formula preview — shows the two branches clearly */}
                    <AnimatePresence>
                      {committedTokens.length >= 6 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 px-3 py-2 bg-indigo-50/60 border border-indigo-100 rounded-lg overflow-hidden"
                        >
                          <p className="text-[7px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Logic Preview</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="text-[7px] font-black text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">IF</span>
                              <span className="text-[7.5px] text-slate-600 leading-tight">Duty &gt; 0 → (Unit Price + Shipping) × (1 + Duty%) + Tax</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-[7px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">ELSE</span>
                              <span className="text-[7.5px] text-slate-600 leading-tight">Unit Price + Shipping + Tax</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/60">
                  <p className="text-[8px] text-slate-400">{addedFields.length} of {FIELDS.length} fields added</p>
                  <button ref={saveBtnRef}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-bold rounded-xl transition-all",
                      addedFields.length === FIELDS.length
                        ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}>
                    Apply to All Vendors <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success toast */}
        <AnimatePresence>
          {phase >= 4 && winner !== null && (
            <motion.div key="toast"
              initial={{ opacity: 0, y: 24, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-white rounded-2xl border border-emerald-200 whitespace-nowrap">
              <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-800">{VENDORS[winner].name} is the true best deal</p>
                <p className="text-[7px] text-slate-500">IF/ELSE formula applied · auto-normalized to ₹</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption bar — inside the dashboard */}
        <div
          className="shrink-0 mx-4 mb-3 flex items-center gap-3 px-5 py-3.5 rounded-xl border pointer-events-none"
          style={{
            background: "#f0f9ff",
            borderColor: "#bae6fd",
            color: "#0c4a6e",
            transition: "opacity 0.4s ease",
            opacity: caption ? 1 : 0,
          }}
        >
          <span
            className="shrink-0 w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#0891b2", boxShadow: "0 0 8px rgba(8,145,178,0.5)" }}
          />
          <p className="text-[12px] font-semibold leading-relaxed tracking-wide m-0">{caption}</p>
        </div>

      </div>{/* end dashboard shell */}

    </div>
  );
}
