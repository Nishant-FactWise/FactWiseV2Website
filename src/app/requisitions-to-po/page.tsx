"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import ReqHero from "./components/ReqHero";
import ReqProblemSection from "./components/ReqProblemSection";
import ReqToPoFlow from "./components/ReqToPoFlow";
import ReqToPoFeatures from "./components/ReqToPoFeatures";

export default function RequisitionsToPoPage() {
  return (
    <main className="min-h-screen bg-white">
      <ReqHero />
      <ReqProblemSection />
      <ReqToPoFlow />
      <ReqToPoFeatures />
      <FlickeringFooter />
    </main>
  );
}
