"use client";

import { PRICE_MODES, usePriceMode } from "@/lib/price-mode";

export default function PriceToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = usePriceMode();

  return (
    <div
      role="group"
      aria-label="בחירת סוג מחיר"
      className="flex items-center rounded-full bg-slate-100 p-0.5 text-[11px] font-semibold"
    >
      {PRICE_MODES.map((option) => {
        const active = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-pressed={active}
            onClick={() => setMode(option.value)}
            className={`whitespace-nowrap rounded-full px-2.5 py-1 transition ${
              active
                ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {compact ? option.short : option.label}
          </button>
        );
      })}
    </div>
  );
}
