"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import SolutionsHero from "./components/SolutionsHero";
import ProblemSection from "./components/ProblemSection";
import QuoteToOrderFeatures from "./components/QuoteToOrderFeatures";
import QuoteToOrderFlowV2 from "./components/QuoteToOrderFlowV2";

const I2Q_FAQS: FAQItem[] = [
  {
    category: 'Sourcing',
    q: 'How does the RFQ creation process work?',
    a: 'FactWise allows you to create RFQs from approved requisitions instantly or from scratch. You can define line items, expected delivery dates, and specific terms, then invite vendors to bid. The entire process takes minutes rather than days.',
  },
  {
    category: 'Bidding',
    q: 'Do vendors need an account to submit bids?',
    a: 'No. Vendors receive secure, tokenised links via email that allow them to view RFQ details and submit their bids directly, without needing to register or log in to FactWise.',
  },
  {
    category: 'Analysis',
    q: 'How does FactWise help in comparing bids?',
    a: 'FactWise automatically normalises bids and calculates the True Landed Cost by factoring in base rates, freight, packaging, duties, and taxes. You can compare vendors side-by-side on an apples-to-apples basis.',
  },
  {
    category: 'Awarding',
    q: 'Can I split an award between multiple vendors?',
    a: 'Yes, FactWise supports split awarding. You can award different line items to different vendors, or split the quantity of a single line item across multiple vendors based on capacity or risk mitigation.',
  }
];

export default function InquiryToQuotePage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <ProblemSection />
      <QuoteToOrderFlowV2 />
      <QuoteToOrderFeatures />
      <FAQSection 
        faqs={I2Q_FAQS} 
        title={<>Inquiry to Quote <span className="italic" style={{ color: '#3666ff' }}>FAQ</span></>}
        description="Common questions about our sourcing, bidding, and supplier selection workflows."
      />
      <FlickeringFooter />
    </main>
  );
}
