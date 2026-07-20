"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, UploadCloud, FileText, ShoppingCart, Send, User, Bot } from "lucide-react";

interface Feature {
  step: string;
  title?: string;
  content: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

/* ──────────────────────────────────────────────────────────
   ANIMATION 1: View PO Digitally Mockup
   ────────────────────────────────────────────────────────── */
function DigitalPOAnimation() {
  const [status, setStatus] = useState<"pending" | "confirming" | "confirmed">("pending");

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("confirming"), 1200);
    const timer2 = setTimeout(() => setStatus("confirmed"), 2600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0F19] p-6 flex flex-col justify-between font-sans text-white select-none">
      {/* Top Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-500 w-4 h-4 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-slate-400">PO-2026-9812</span>
        </div>
        <AnimatePresence mode="wait">
          {status === "pending" && (
            <motion.span
              key="pending"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-[9px] px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Confirmation
            </motion.span>
          )}
          {status === "confirming" && (
            <motion.span
              key="confirming"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-[9px] px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              Confirming...
            </motion.span>
          )}
          {status === "confirmed" && (
            <motion.span
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              ✓ Confirmed
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* PO metadata details */}
      <div className="my-4 grid grid-cols-2 gap-4 text-left">
        <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Customer</div>
          <div className="text-xs font-bold text-slate-200">FactWise Engineering Ltd</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Delivery Lead Time</div>
          <div className="text-xs font-bold text-slate-200">14 Days (Expedited)</div>
        </div>
      </div>

      {/* PO Items Table list */}
      <div className="bg-slate-900/40 rounded-xl border border-slate-800/80 p-3 text-left space-y-3">
        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold border-b border-slate-800/50 pb-1.5">Line Items</div>
        
        {/* Item 1 */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-start gap-2">
            <span className="text-slate-500 font-mono">1.</span>
            <div>
              <div className="font-semibold text-slate-200">Hydraulic Cylinders</div>
              <div className="text-[9px] text-slate-500 font-mono">HC-2048 · Qty 50</div>
            </div>
          </div>
          <span className="font-mono font-bold text-slate-300">₹14,20,000</span>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-800/40">
          <div className="flex items-start gap-2">
            <span className="text-slate-500 font-mono">2.</span>
            <div>
              <div className="font-semibold text-slate-200">Piston Seal Kits</div>
              <div className="text-[9px] text-slate-500 font-mono">PSK-114 · Qty 100</div>
            </div>
          </div>
          <span className="font-mono font-bold text-slate-300">₹4,20,000</span>
        </div>
      </div>

      {/* Total value display */}
      <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 rounded-xl p-3 my-2 text-left">
        <div>
          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total PO Value</div>
          <div className="text-lg font-black text-white font-mono tracking-tight">₹18,40,000</div>
        </div>
        <div className="text-[10px] bg-slate-800/60 border border-slate-700/60 rounded px-2 py-1 text-slate-300 font-mono">
          Tax Included
        </div>
      </div>

      {/* Confirmation Actions layout */}
      <div className="relative h-12 flex items-center justify-center border-t border-slate-800/80 pt-3">
        <AnimatePresence mode="wait">
          {status !== "confirmed" ? (
            <motion.div
              key="action-buttons"
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 w-full"
            >
              <button
                className={cn(
                  "flex-1 h-9 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-default relative overflow-hidden",
                  status === "confirming" 
                    ? "bg-[#3666ff]/20 text-[#3666ff] border border-[#3666ff]/40" 
                    : "bg-[#3666ff] text-white shadow-[0_4px_14px_rgba(54,102,255,0.3)]"
                )}
              >
                Confirm Order
              </button>
              <button className="h-9 px-4 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 cursor-default">
                Revision
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400"
            >
              <Check className="w-3.5 h-3.5" />
              PO Acknowledged. Buyer notified via FactWise ERP.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Clicker cursor pointer animation */}
        {status === "pending" && (
          <motion.div
            initial={{ x: 140, y: 40, opacity: 0 }}
            animate={{ x: -20, y: 6, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute text-base pointer-events-none z-20"
          >
            🖱️
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANIMATION 2: Upload Invoice Mockup
   ────────────────────────────────────────────────────────── */
function UploadInvoiceAnimation() {
  const [step, setStep] = useState<"upload" | "processing" | "matched">("upload");

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("processing"), 1200);
    const timer2 = setTimeout(() => setStep("matched"), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0F19] p-6 flex flex-col justify-between font-sans text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-mono tracking-wider text-slate-400">AP INVOICE SYNC</span>
        <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold uppercase tracking-wider font-mono">
          INV-2026-8041
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center my-4">
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-[#3666ff]/50 rounded-2xl p-6 bg-slate-900/10 h-52 transition-colors duration-300"
            >
              {/* Sliding PDF document representation */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-12 h-14 bg-red-600/10 border border-red-500/30 rounded-lg flex flex-col items-center justify-center relative mb-4 shadow-lg"
              >
                <FileText className="text-red-500 w-6 h-6" />
                <span className="absolute bottom-1 text-[7px] font-mono text-red-400 font-black">PDF</span>
              </motion.div>

              <span className="text-xs font-semibold text-slate-300">Drag & drop your invoice PDF</span>
              <span className="text-[10px] text-slate-500 mt-1">or click to browse files</span>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing-zone"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center border border-slate-800/80 rounded-2xl p-6 bg-slate-900/20 h-52 text-center"
            >
              <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-[#3666ff]/20 border-t-[#3666ff] animate-spin" />
                <UploadCloud className="text-[#3666ff] w-5 h-5 animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-slate-200">AI OCR Document Extraction...</span>
              <span className="text-[10px] text-slate-500 mt-1.5 font-mono">Reading rates & lines matching PO-9812</span>
            </motion.div>
          )}

          {step === "matched" && (
            <motion.div
              key="matched-zone"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col justify-between border border-slate-800/80 rounded-2xl p-4 bg-slate-900/10 h-52 text-left"
            >
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Automated 3-Way Match Verification</span>

              <div className="space-y-2.5">
                {/* Check 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>PO reference detected & matched (PO-9812)</span>
                </motion.div>

                {/* Check 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Goods Receipt Note (GRN-55) quantities matched</span>
                </motion.div>

                {/* Check 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Item unit rates align with contract terms</span>
                </motion.div>
              </div>

              {/* Status footer match */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Invoice Match: 100%</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider font-sans">
                  ✓ Ready for AP Payment
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANIMATION 3: Item Catalogue Builder Mockup
   ────────────────────────────────────────────────────────── */
function CatalogueBuilderAnimation() {
  const [price, setPrice] = useState("₹28,400");
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsEditing(true), 1000);
    const timer2 = setTimeout(() => {
      setPrice("₹27,800");
    }, 1800);
    const timer3 = setTimeout(() => {
      setIsEditing(false);
      setSuccess(true);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0F19] p-6 flex flex-col justify-between font-sans text-white select-none">
      {/* Top header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-[#3666ff] w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider text-slate-200">Catalog Manager</span>
        </div>
        {success && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Saved & Synced
          </motion.span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3.5 my-2 text-left">
        {/* Item Card 1 */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 relative flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">SKU: HC-2048</div>
            <div className="text-xs font-bold text-slate-200">Hydraulic Cylinder (High capacity)</div>
            <div className="text-[10px] text-[#3666ff] font-semibold">Lead Time: 14 Days</div>
          </div>
          
          {/* Price container input */}
          <div className="relative">
            <div className={cn(
              "px-3 py-1.5 rounded-lg border text-xs font-mono font-bold text-slate-200 transition-all duration-300 min-w-[72px] text-center",
              isEditing ? "border-[#3666ff] bg-[#3666ff]/10 shadow-[0_0_12px_rgba(54,102,255,0.15)]" : "border-slate-800 bg-slate-950"
            )}>
              {price}
            </div>

            {/* Micro Popover edit box */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.92 }}
                  className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-800 rounded-lg p-2 shadow-xl z-20 w-36 text-center"
                >
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Updating Rate...</span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">₹28,400 → ₹27,800</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Item Card 2 */}
        <div className="bg-slate-900/20 border border-slate-800/40 rounded-xl p-3 opacity-40 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">SKU: PSK-1142</div>
            <div className="text-xs font-bold text-slate-200">Piston Seal Kit (Silicone alternate)</div>
            <div className="text-[10px] text-slate-400 font-semibold">Lead Time: 7 Days</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono font-bold text-slate-400 text-center">
            ₹4,200
          </div>
        </div>
      </div>

      {/* Catalogue visibility status */}
      <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
        <span>Catalog Items: 12</span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Active on Buyer Marketplace
        </span>

        {/* Hover click cursor pointer */}
        {!success && !isEditing && (
          <motion.div
            initial={{ x: 120, y: 35, opacity: 0 }}
            animate={{ x: 75, y: -25, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-base pointer-events-none z-20"
          >
            🖱️
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANIMATION 4: Respond to Customer Directly Mockup
   ────────────────────────────────────────────────────────── */
function DirectChatAnimation() {
  const [stage, setStage] = useState<"ready" | "buyer" | "typing" | "sent" | "locked">("ready");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("buyer"), 400);
    const timer2 = setTimeout(() => setStage("typing"), 1500);
    const timer3 = setTimeout(() => setStage("sent"), 2800);
    const timer4 = setTimeout(() => setStage("locked"), 4200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0F19] p-6 flex flex-col justify-between font-sans text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Negotiation Portal (PO-9812)</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded bg-slate-850 border border-slate-800 text-slate-400 font-mono">
          Expedited Loop
        </span>
      </div>

      {/* Chat Conversation Area */}
      <div className="flex-1 overflow-hidden space-y-3.5 my-3 text-left flex flex-col justify-end min-h-0">
        
        {/* Message 1 (Buyer) */}
        {stage !== "ready" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-start gap-2.5 max-w-[85%]"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl rounded-tl-none p-2.5 text-xs text-slate-300 leading-normal">
              <span className="text-[9px] font-bold text-slate-500 block mb-0.5">Priya S. (Buyer)</span>
              Hi, can we improve the lead time on the Hydraulic Cylinders to 10 days?
            </div>
          </motion.div>
        )}

        {/* Message 2 (Typing Indicator or Supplier response) */}
        <AnimatePresence mode="wait">
          {stage === "typing" && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-2.5 self-end max-w-[85%] flex-row-reverse"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#3666ff]/10 border border-[#3666ff]/20 rounded-2xl rounded-tr-none p-2.5 text-xs text-[#3666ff] flex items-center gap-1.5">
                <span className="text-[9px] font-bold text-[#3666ff] block mb-0.5">Typing...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3666ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3666ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3666ff] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}

          {stage !== "ready" && stage !== "buyer" && stage !== "typing" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-start gap-2.5 self-end max-w-[85%] flex-row-reverse"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#3666ff] rounded-2xl rounded-tr-none p-2.5 text-xs text-white leading-normal shadow-[0_4px_14px_rgba(54,102,255,0.25)]">
                <span className="text-[9.5px] font-bold text-blue-100 block mb-0.5">Supplier Portal (You)</span>
                Sure! Lead time updated to 10 days. Expedited unit rate locked at ₹28,100.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input / Action Area */}
      <div className="relative border-t border-slate-800/80 pt-3 flex items-center gap-2">
        <AnimatePresence mode="wait">
          {stage !== "locked" ? (
            <motion.div
              key="input-box"
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex items-center gap-2"
            >
              <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-lg h-9 px-3 flex items-center text-xs text-slate-500">
                Message locked...
              </div>
              <button className="w-9 h-9 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-center text-slate-500 cursor-default">
                <Send className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="locked-deal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400"
            >
              <Check className="w-3.5 h-3.5" />
              Deal Locked. Revised PO-9812-V2 issued.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN RENDER COMPONENT
   ────────────────────────────────────────────────────────── */
export function FeatureSteps({
  features,
  className,
  title = "Benefits of joining FactWise",
  autoPlayInterval = 5000,
  imageHeight = "h-[450px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval, isPaused]);

  const handleStepClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  const renderActiveAnimation = (index: number) => {
    switch (index) {
      case 0:
        return <DigitalPOAnimation />;
      case 1:
        return <UploadInvoiceAnimation />;
      case 2:
        return <CatalogueBuilderAnimation />;
      case 3:
        return <DirectChatAnimation />;
      default:
        return null;
    }
  };

  return (
    <section 
      id="factwise-benefits"
      className={cn("py-32 bg-white border-t border-slate-100 relative overflow-hidden text-[#1A1D2E] scroll-mt-24", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Backdrop glowing decorations */}
      <div aria-hidden className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div aria-hidden className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto w-full px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-[11px] font-semibold text-[#3666ff] uppercase tracking-[0.12em] mb-6 shadow-[0_1px_2px_rgba(54,102,255,0.08)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#3666ff] opacity-75 animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#3666ff]" />
            </span>
            Partner Benefits
          </div>

          <h2 
            className="text-[32px] md:text-[44px] font-semibold text-[#0D1117] tracking-[-0.03em] leading-[1.1] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Interactive Steps List */}
          <div className="lg:col-span-6 space-y-3 relative">
            
            {/* Visual connector line behind the circles */}
            <div className="absolute left-[16px] md:left-[20px] top-6 bottom-6 w-0.5 bg-slate-100 -z-10" />

            {features.map((feature, index) => {
              const isActive = index === currentFeature;
              return (
                <div
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "flex items-start gap-4 md:gap-5 p-4 md:p-[18px] rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden group select-none",
                    isActive 
                      ? "bg-slate-50 border border-slate-200/60 shadow-[0_8px_30px_rgba(54,102,255,0.04)] scale-[1.01]" 
                      : "bg-transparent border border-transparent hover:bg-slate-50/40"
                  )}
                >
                  {/* Glowing vertical left edge on active */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3666ff]" />
                  )}

                  {/* Step Number Circle */}
                  <div 
                    className={cn(
                      "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300 relative z-10",
                      isActive
                        ? "bg-[#3666ff] border-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.3)] scale-110"
                        : "bg-white border-slate-200 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]"
                    )}
                  >
                    {index < currentFeature ? (
                      <span className="text-xs md:text-sm font-bold">✓</span>
                    ) : (
                      <span className="text-xs md:text-sm font-semibold font-mono">{feature.step}</span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 text-left">
                    <h3 
                      className={cn(
                        "text-[15.5px] md:text-[17px] font-semibold mb-1.5 leading-snug tracking-[-0.015em] transition-colors duration-300",
                        isActive ? "text-[#0D1117]" : "text-slate-500 group-hover:text-slate-800"
                      )}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title || `Benefit ${index + 1}`}
                    </h3>
                    <p 
                      className={cn(
                        "text-[12.5px] md:text-[13.5px] leading-relaxed transition-colors duration-300",
                        isActive ? "text-slate-600" : "text-slate-400/80"
                      )}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {feature.content}
                    </p>

                    {/* Active Slide Progress Bar indicator */}
                    {isActive && (
                      <div className="w-full h-[2px] bg-slate-200/80 mt-3 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#3666ff]" 
                          style={{ width: `${progress}%` }}
                          transition={{ ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Slide Animation Container (with simulated Browser Wrapper) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Soft glow background for the container */}
            <div className="absolute inset-0 bg-[#3666ff]/[0.02] blur-3xl rounded-full scale-90 -z-10" />

            <div
              className={cn(
                "relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0B0F19] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.35)] flex flex-col items-stretch",
                imageHeight
              )}
            >
              {/* Simulated Browser Frame Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/30 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-950/80 px-4 py-0.5 rounded-full border border-slate-850/60 tracking-wider">
                  factwise.io/portal/supplier
                </div>
                <div className="w-10" /> {/* balancer spacer */}
              </div>

              {/* Window Body */}
              <div className="flex-1 relative min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    className="absolute inset-0 rounded-b-2xl overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderActiveAnimation(currentFeature)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
