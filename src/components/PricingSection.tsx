"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GLOBAL_LAYOUT } from './LayoutConfig';

const pricingTiers = [
  {
    name: "Starter",
    description: "Essential tools for small teams.",
    price: "₹3,999",
    period: "/mo",
    features: [
      "Up to 5 team members",
      "Basic analytics",
      "24/7 email support",
      "10GB storage",
    ],
    buttonText: "Get Started",
    popular: false,
    color: "blue", // maps to theme color
  },
  {
    name: "Pro",
    description: "Advanced features for scaling operations.",
    price: "₹9,999",
    period: "/mo",
    features: [
      "Unlimited team members",
      "Advanced reporting dashboard",
      "Priority 24/7 support",
      "100GB storage",
      "Custom integrations",
    ],
    buttonText: "Start Free Trial",
    popular: true,
    color: "violet",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations.",
    price: "Custom",
    period: "",
    features: [
      "Dedicated account manager",
      "Custom analytics & reporting",
      "SLA support",
      "Unlimited storage",
      "On-premise deployment options",
    ],
    buttonText: "Contact Sales",
    popular: false,
    color: "red",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function PricingSection() {
  return (
    <section 
      className="w-full bg-[#f6f9fc] border-t border-[rgba(0,0,0,0.07)]"
      style={{ padding: `96px 0` }}
    >
      <div 
        style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto', paddingLeft: GLOBAL_LAYOUT.paddingX, paddingRight: GLOBAL_LAYOUT.paddingX }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8, mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#3666ff] mb-6 block">
              Pricing Plans
            </span>
            <h2 className="text-[40px] md:text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-[#000000]">
              Simple, transparent <br />
              <strong className="font-semibold">pricing for everyone.</strong>
            </h2>
          </div>
          <p className="text-[#6b6b7a] text-[14px] max-w-sm">
            Choose the perfect plan for your team&apos;s needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={cn(
                "relative bg-white border border-[rgba(0,0,0,0.07)] rounded-[16px] p-8 transition-all duration-300 flex flex-col group",
                tier.popular
                  ? "border-[#3666ff] shadow-[0_0_30px_rgba(54,102,255,0.12)] hover:shadow-[0_0_40px_rgba(54,102,255,0.2)]"
                  : "hover:border-[rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(0,0,0,0.05)]"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[rgba(54,102,255,0.1)] border border-[rgba(54,102,255,0.25)] text-[#3666ff] text-[10px] uppercase tracking-[0.1em] font-medium py-1 px-3 rounded-full backdrop-blur-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-[24px] font-medium text-[#000000] mb-2">
                  {tier.name}
                </h3>
                <p className="text-[#6b6b7a] text-[13px] h-10">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-[rgba(0,0,0,0.07)]">
                <div className="flex items-baseline gap-1">
                  <span className="text-[48px] font-light tracking-[-0.02em] text-[#000000]">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[#6b6b7a] text-[14px]">
                      {tier.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-1 w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0",
                        tier.color === "violet"
                          ? "bg-[#3666ff]"
                          : tier.color === "blue"
                            ? "bg-[#4b8bff]"
                            : "bg-[#e8433a]"
                      )}
                    >
                      <Check className="w-[10px] h-[10px] text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] text-[#6b6b7a]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-4 rounded-[16px] text-[14px] font-medium transition-all duration-300",
                  tier.popular
                    ? "bg-[#3666ff] text-white hover:bg-[#2a55ee]"
                    : "bg-[rgba(0,0,0,0.04)] text-[#000000] hover:bg-[rgba(0,0,0,0.07)] border border-[rgba(0,0,0,0.07)]"
                )}
              >
                {tier.buttonText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
