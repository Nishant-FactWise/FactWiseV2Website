"use client";

import * as React from "react";
import ScopedLocaleText from "@/components/ScopedLocaleText";

export default function HomeLocalizedMain({ children }: { children: React.ReactNode }) {
  const mainRef = React.useRef<HTMLElement | null>(null);

  return (
    <main
      ref={mainRef}
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflowX: "clip",
        background: "#FFFFFF",
        maxWidth: "100%",
        margin: "0",
      }}
    >
      <ScopedLocaleText rootRef={mainRef} />
      {children}
    </main>
  );
}
