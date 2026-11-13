import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "מוצרים — מידות, מחירון ומחשבון הערכה",
  description:
    "מכולות אשפתון, פלינומים, צנרת ספירלית, תעלות מיזוג, ארונות כיבוי אש, גרילים, חיתוך CNC ועבודות מתכת — עם מידות, מחירון או מחשבון הערכה.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">מוצרים</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
          ארבע קבוצות מוצרים. פריטים עם מחירון מציגים טבלת מידות ומחיר, צנרת ותעלות מציגות מחשבון
          הערכה לפי מ״ר פח, והשאר מתומחרים בהצעת מחיר.
        </p>
      </header>

      <div className="mt-6">
        <Suspense
          fallback={<div className="card p-10 text-center text-sm text-slate-600">טוען מוצרים…</div>}
        >
          <CatalogClient />
        </Suspense>
      </div>
    </div>
  );
}

