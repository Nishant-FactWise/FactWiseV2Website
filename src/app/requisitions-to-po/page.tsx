"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import ScopedLocaleText from "@/components/ScopedLocaleText";
import ReqHero from "./components/ReqHero";
import ReqProblemSection from "./components/ReqProblemSection";
import ReqToPoFlow from "./components/ReqToPoFlow";
import ReqToPoFeatures from "./components/ReqToPoFeatures";

export default function RequisitionsToPoPage() {
  const mainRef = React.useRef<HTMLElement | null>(null);

  return (
    <main ref={mainRef} className="min-h-screen bg-white">
      <ScopedLocaleText rootRef={mainRef} />
      <ReqHero />
      <ReqProblemSection />
      <ReqToPoFlow />
      <ReqToPoFeatures />
      <FlickeringFooter />
    </main>
  );
}
