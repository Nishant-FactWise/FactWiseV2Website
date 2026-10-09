"use client";

import React from "react";
import { ArrowRight, ShieldCheck, ZapIcon, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import { getPathLocale, localizePath } from "@/lib/i18n";

const modules = [
  {
    tag: "QUOTE AUTOMATION",
    title: "Inquiry to Quote",
    description: "From BOM to customer quote in record time with intelligent sourcing, automated negotiations, and true landed-cost analytics.",
    imageUrl: "/images/quote-order.png",
    features: [
      "BOM & cost intelligence",
      "Automated vendor sourcing & negotiations",
      "One-click customer quote generation",
    ],
    href: "/inquiry-to-quote",
    icon: BarChart3
  },
  {
    tag: "SOURCING AUTOMATION",
    title: "Requisition to PO",
    description: "Raise, approve, source, and issue purchase orders in one seamless flow without the back and forth.",
    imageUrl: "/images/req-po.png",
    features: [
      "Combine requisitions for bulk pricing",
      "Auto-filled target prices on every RFQ",
      "Multi-vendor POs in one click",
    ],
    href: "/requisitions-to-po",
    icon: ShieldCheck
  },
  {
    tag: "INVOICE AUTOMATION",
    title: "Invoice to Pay",
    description: "Every invoice is validated against PO, GR, QC, and contract terms, so you always pay the right amount.",
    imageUrl: "/images/invoice-pay.png",
    features: [
      "AI-powered invoice generation",
      "Flexible GR, QC & payment sequencing",
      "Always pay the right amount automatically",
    ],
    href: "/invoice-to-pay",
    icon: ZapIcon
  },
];

const CARDS_STYLE = `
  .factwise-cards-section {
    --blue-50: #eff4ff;
    --blue-100: #dbeafe;
    --blue-400: #60a5fa;
    --blue-600: #3666ff;
    --blue-800: #1e3a8a;
    --gray-50: #F7F6F3;
    --gray-100: #EFEDE8;
    --gray-200: #DDD9D0;
    --gray-400: #94a3b8;
    --gray-700: #334155;
    --gray-900: #0f172a;
    --radius: 20px;
    --radius-sm: 10px;
    --shadow-card: 0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
    --shadow-hover: 0 8px 24px rgba(0,0,0,0.07), 0 24px 64px rgba(0,0,0,0.10);
  }

  .fw-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 340px);
    gap: 24px;
    justify-content: center;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  @media (max-width: 1100px) {
    .fw-cards-grid { grid-template-columns: repeat(2, minmax(0, 340px)); }
  }

  /* Card */
  .fw-card {
    background: #FFFFFF;
    min-height: 510px;
    border-radius: var(--radius);
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    transition: transform 0.38s cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.38s cubic-bezier(0.23, 1, 0.32, 1),
                border-color 0.3s ease;
    will-change: transform;
  }

  .fw-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
  }

  .fw-card.featured {
    border: 1.5px solid var(--blue-600);
    background: linear-gradient(180deg, #f5f8ff 0%, #ffffff 30%);
    box-shadow: 0 14px 38px rgba(54, 102, 255, 0.16), 0 4px 12px rgba(15, 23, 42, 0.06);
    overflow: visible;
    transform: scale(1.025);
  }

  .fw-card.featured:hover {
    border-color: var(--blue-600);
    transform: translateY(-8px) scale(1.035);
    box-shadow: 0 20px 48px rgba(54, 102, 255, 0.22), 0 8px 20px rgba(15, 23, 42, 0.08);
  }



  /* Card top color bar */
  .fw-card-bar {
    height: 4px;
    width: 100%;
    transition: height 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .fw-card:hover .fw-card-bar { height: 6px; }

  .fw-card-blue  .fw-card-bar { background: linear-gradient(90deg, var(--blue-400), var(--blue-600)); }

  .fw-card.featured .fw-card-bar,
  .fw-card.featured:hover .fw-card-bar {
    height: 4px;
    background: transparent;
  }

  /* Card header */
  .fw-card-header {
    padding: 24px 24px 0;
    text-align: left;
  }

  .fw-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .fw-card-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    transition: transform 0.2s ease;
  }

  .fw-card:hover .fw-card-badge { transform: scale(1.05); }

  .fw-badge-blue  { background: var(--blue-50);  color: var(--blue-800); }

  .fw-popular-pill {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 999px;
    background: var(--blue-600);
    color: #ffffff;
    border: 4px solid #ffffff;
    box-shadow: 0 7px 18px rgba(54, 102, 255, 0.28);
  }

  /* Icon */
  .fw-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fw-card:hover .fw-card-icon { transform: scale(1.12) rotate(-4deg); }

  .fw-icon-blue  { background: var(--blue-50); }

  .fw-card-icon svg { width: 22px; height: 22px; }

  .fw-card-title {
    font-size: 22px !important;
    font-weight: 600 !important;
    color: var(--gray-900) !important;
    letter-spacing: -0.3px !important;
    margin-bottom: 10px !important;
    line-height: 1.2 !important;
    transition: color 0.2s ease;
    text-align: left;
  }

  .fw-card-blue:hover  .fw-card-title { color: var(--blue-800) !important; }

  .fw-card-desc {
    font-size: 13.5px !important;
    color: #475569 !important;
    line-height: 1.65 !important;
    font-weight: 400 !important;
    padding-bottom: 20px !important;
    text-align: left;
  }

  /* Divider */
  .fw-card-divider {
    height: 1px;
    background: var(--gray-100);
    margin: 0 24px;
    transition: background 0.3s ease;
  }

  .fw-card:hover .fw-card-divider { background: var(--gray-200); }

  /* Features */
  .fw-card-features {
    padding: 18px 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 11px;
    text-align: left;
  }

  .fw-feature {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px !important;
    color: var(--gray-700) !important;
    line-height: 1.45 !important;
    transition: transform 0.25s ease;
    font-weight: 500 !important;
    text-align: left;
  }

  .fw-card:hover .fw-feature:nth-child(1) { transform: translateX(3px); transition-delay: 0.03s; }
  .fw-card:hover .fw-feature:nth-child(2) { transform: translateX(3px); transition-delay: 0.07s; }
  .fw-card:hover .fw-feature:nth-child(3) { transform: translateX(3px); transition-delay: 0.11s; }

  .fw-feature-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .fw-dot-blue  { background: var(--blue-50); }
  .fw-dot-green { background: var(--green-50); }
  .fw-dot-amber { background: var(--amber-50); }

  .fw-feature-dot svg { width: 10px; height: 10px; }

  /* Footer */
  .fw-card-footer {
    padding: 16px 24px 22px;
  }

  .fw-card-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 0;
    border-radius: 12px;
    font-size: 13px !important;
    font-weight: 600 !important;
    border: none;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.25s ease,
                gap 0.25s ease;
    letter-spacing: 0.01em !important;
    text-transform: uppercase !important;
  }

  .fw-card:hover .fw-card-btn { gap: 12px; }

  .fw-btn-blue {
    background: var(--blue-50);
    color: var(--blue-800);
  }
  .fw-btn-blue:hover {
    background: var(--blue-100);
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(54, 102, 255, 0.18);
  }

  .fw-card.featured .fw-card-btn {
    background: var(--blue-600);
    color: #ffffff;
    box-shadow: 0 8px 18px rgba(54, 102, 255, 0.2);
  }

  .fw-card.featured .fw-card-btn:hover {
    background: #2f5bea;
    box-shadow: 0 10px 24px rgba(54, 102, 255, 0.28);
  }

  .fw-btn-arrow {
    display: inline-flex;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fw-card-btn:hover .fw-btn-arrow { transform: translate(3px, -3px); }

  @media (max-width: 740px) {
    .fw-cards-grid { grid-template-columns: minmax(0, 1fr); max-width: 380px; gap: 32px; margin: 0 auto; }
    .fw-card { min-height: 440px; border-radius: 18px; }
    .fw-card-header { padding: 22px 22px 0; }
    .fw-card-meta { margin-bottom: 14px; }
    .fw-card-icon { width: 40px; height: 40px; margin-bottom: 12px; }
    .fw-card-title { font-size: 21px !important; margin-bottom: 8px !important; }
    .fw-card-desc { font-size: 13px !important; line-height: 1.6 !important; padding-bottom: 16px !important; text-align: justify; text-justify: inter-word; }
    .fw-card-divider { margin: 0 22px; }
    .fw-card-features { padding: 18px 22px 22px; gap: 10px; }
    .fw-card-footer { padding: 14px 22px 22px; }
    .fw-card.featured,
    .fw-card.featured:hover { transform: none; }
  }
`;

function Card({ module, index }: { module: typeof modules[0], index: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const translate = useLocalizedText();
  const locale = getPathLocale(pathname);

  // Theme configuration
  const t = {
    colorKey: "blue",
    badgeClass: "fw-badge-blue",
    iconClass: "fw-icon-blue",
    dotClass: "fw-dot-blue",
    btnClass: "fw-btn-blue",
    iconStroke: "#3666ff",
  };
  const isFeatured = index === 1;
  const moduleHref = localizePath(module.href, locale);

  return (
    <div
      className={`fw-card fw-card-${t.colorKey} ${isFeatured ? "featured" : ""}`}
      onClick={() => router.push(moduleHref)}
    >
      {isFeatured && <span className="fw-popular-pill">{translate("Most popular")}</span>}
      <div className="fw-card-bar"></div>
      <div className="fw-card-header">
        <div className="fw-card-meta">
          <span className={`fw-card-badge ${t.badgeClass}`}>{translate(module.tag)}</span>
        </div>
        <div className={`fw-card-icon ${t.iconClass}`}>
          <module.icon className="w-5 h-5" style={{ color: t.iconStroke }} />
        </div>
        <h2 className="fw-card-title">{translate(module.title)}</h2>
        <p className="fw-card-desc">{translate(module.description)}</p>
      </div>

      <div className="fw-card-divider mt-4"></div>
      <div className="fw-card-features">
        {module.features.map((feature, i) => (
          <div key={i} className="fw-feature">
            <span className={`fw-feature-dot ${t.dotClass}`}>
              <svg viewBox="0 0 12 12" fill="none" stroke={t.iconStroke} strokeWidth="2" strokeLinecap="round">
                <polyline points="2,6 5,9 10,3"/>
              </svg>
            </span>
            {translate(feature)}
          </div>
        ))}
      </div>

      <div className="fw-card-footer">
        <button
          type="button"
          className={`fw-card-btn ${t.btnClass}`}
          aria-label={`${translate("Explore solution")}: ${translate(module.title)}`}
          onClick={(event) => {
            event.stopPropagation();
            router.push(moduleHref);
          }}
        >
          {translate("Explore solution")}
          <span className="fw-btn-arrow">
            <ArrowRight size={14} />
          </span>
        </button>
      </div>
    </div>
  );
}

import ScrollReveal from "./ui/ScrollReveal";

export default function ProcurementModules() {
  const translate = useLocalizedText();
  return (
    <section id="procurement-modules" className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20 factwise-cards-section">
      <style dangerouslySetInnerHTML={{ __html: CARDS_STYLE }} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A6FFF] sm:mb-6">
            {translate('Platform Modules')}
          </div>
          <h2 className="mb-4 text-[28px] font-bold leading-[1.12] tracking-tight text-[#1A1D2E] sm:text-3xl md:mb-6 md:text-5xl">
            {translate('Smarter ')}<span className="text-[#3666ff]">{translate('Manufacturing')}</span> {translate('Starts Here')}
          </h2>
          <p className="mx-auto max-w-2xl text-justify text-[15px] font-medium leading-[1.65] text-slate-500 sm:text-center sm:text-base md:text-lg">
            {translate('Scalable, enterprise-ready modules designed to automate every workflow manufacturers depend on — from first inquiry to final payment.')}
          </p>
        </motion.div>

        <ScrollReveal className="fw-cards-grid" stagger={0.15} delay={0.3}>
          {modules.map((module, index) => (
            <Card key={index} module={module} index={index} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

