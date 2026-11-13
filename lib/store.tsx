"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultSettings, seedProducts } from "./data";
import { roundShekel } from "./pricing";
import type { Product, Settings, Size } from "./types";

/** v3 = full catalog (groups + calc rates); v2 data is not compatible. */
const STORAGE_KEY = "sharara.store.v4";

type State = {
  products: Product[];
  settings: Settings;
  updatedAt: string | null;
};

type BulkTarget = "both" | "retail" | "dealer";

type StoreValue = State & {
  updateSize: (productId: string, sizeId: string, patch: Partial<Size>) => void;
  setStatus: (productId: string, status: Product["status"]) => void;
  applyBulk: (opts: {
    category: string;
    group: string;
    target: BulkTarget;
    percent: number;
  }) => void;
  setSettings: (patch: Partial<Settings>) => void;
  setCalcRate: (thicknessMm: number, rateNetPerSqm: number) => void;
  convertListToNet: () => void;
  reset: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const initialState: State = {
  products: seedProducts,
  settings: defaultSettings,
  updatedAt: null,
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  // Demo persistence. In production this is Firestore.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as State;
      if (Array.isArray(parsed.products) && parsed.products.length > 0) {
        setState({
          products: parsed.products,
          settings: parsed.settings ?? defaultSettings,
          updatedAt: parsed.updatedAt ?? null,
        });
      }
    } catch {
      /* ignore corrupt demo state */
    }
  }, []);

  const commit = useCallback((updater: (prev: State) => State) => {
    setState((prev) => {
      const next: State = { ...updater(prev), updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const updateSize = useCallback(
    (productId: string, sizeId: string, patch: Partial<Size>) => {
      commit((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === productId
            ? {
                ...product,
                sizes: product.sizes.map((size) =>
                  size.id === sizeId ? { ...size, ...patch } : size,
                ),
              }
            : product,
        ),
      }));
    },
    [commit],
  );

  const setStatus = useCallback(
    (productId: string, status: Product["status"]) => {
      commit((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === productId ? { ...product, status } : product,
        ),
      }));
    },
    [commit],
  );

  const applyBulk = useCallback(
    ({
      category,
      group,
      target,
      percent,
    }: {
      category: string;
      group: string;
      target: BulkTarget;
      percent: number;
    }) => {
      const factor = 1 + percent / 100;
      commit((prev) => ({
        ...prev,
        products: prev.products.map((product) => {
          if (group !== "all" && product.group !== group) return product;
          if (category !== "all" && product.category !== category) return product;
          return {
            ...product,
            sizes: product.sizes.map((size) => ({
              ...size,
              priceNetAgorot:
                target === "dealer" ? size.priceNetAgorot : roundShekel(size.priceNetAgorot * factor),
              dealerNetAgorot:
                target === "retail" || size.dealerNetAgorot === null
                  ? size.dealerNetAgorot
                  : roundShekel(size.dealerNetAgorot * factor),
            })),
          };
        }),
      }));
    },
    [commit],
  );

  const setSettings = useCallback(
    (patch: Partial<Settings>) => {
      commit((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
    },
    [commit],
  );

  /** Sheet price per m² for one thickness (net agorot). */
  const setCalcRate = useCallback(
    (thicknessMm: number, rateNetPerSqm: number) => {
      commit((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          calcRates: prev.settings.calcRates.map((rate) =>
            rate.thicknessMm === thicknessMm ? { ...rate, rateNetPerSqm } : rate,
          ),
        },
      }));
    },
    [commit],
  );

  /** Use when the entered price sheet already includes VAT. */
  const convertListToNet = useCallback(() => {
    commit((prev) => ({
      ...prev,
      products: prev.products.map((product) => ({
        ...product,
        sizes: product.sizes.map((size) => ({
          ...size,
          priceNetAgorot: roundShekel(size.priceNetAgorot / 1.18),
          dealerNetAgorot:
            size.dealerNetAgorot === null ? null : roundShekel(size.dealerNetAgorot / 1.18),
        })),
      })),
    }));
  }, [commit]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState(initialState);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        updateSize,
        setStatus,
        applyBulk,
        setSettings,
        setCalcRate,
        convertListToNet,
        reset,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
