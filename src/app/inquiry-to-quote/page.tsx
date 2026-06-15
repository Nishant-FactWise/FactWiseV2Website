"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import SolutionsHero from "./components/SolutionsHero";
import ProblemSection from "./components/ProblemSection";
import QuoteToOrderFeatures from "./components/QuoteToOrderFeatures";
import QuoteToOrderFlowV2 from "./components/QuoteToOrderFlowV2";

export default function InquiryToQuotePage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <ProblemSection />
      <QuoteToOrderFlowV2 />
      <QuoteToOrderFeatures />
      <FlickeringFooter />
    </main>
  );
}
