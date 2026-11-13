"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PriceMode } from "./types";

const STORAGE_KEY = "sharara.priceMode.v2";

export const PRICE_MODES: { value: PriceMode; short: string; label: string; title: string }[] = [
  {
    value: "gross",
    short: "כולל מע״מ",
    label: "צרכן · כולל מע״מ",
    title: "מחיר כולל מע״מ 18%",
  },
  {
    value: "net",
    short: "ללא מע״מ",
    label: "צרכן · ללא מע״מ",
    title: "מחיר ללא מע״מ, לצורכי השוואה",
  },
  {
    value: "dealer",
    short: "קבלן",
    label: "קבלן · לפי הצעה",
    title: "מחיר קבלן לפי כמויות",
  },
];

type PriceModeValue = {
  mode: PriceMode;
  setMode: (mode: PriceMode) => void;
};

const PriceModeContext = createContext<PriceModeValue | null>(null);

export function PriceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PriceMode>("gross");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "gross" || raw === "net" || raw === "dealer") setModeState(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback((next: PriceMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <PriceModeContext.Provider value={{ mode, setMode }}>{children}</PriceModeContext.Provider>
  );
}

export function usePriceMode(): PriceModeValue {
  const ctx = useContext(PriceModeContext);
  if (!ctx) throw new Error("usePriceMode must be used inside PriceModeProvider");
  return ctx;
}
