"use client";

import { PriceModeProvider } from "@/lib/price-mode";
import { StoreProvider } from "@/lib/store";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <PriceModeProvider>{children}</PriceModeProvider>
    </StoreProvider>
  );
}
