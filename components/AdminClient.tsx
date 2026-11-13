"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, groups } from "@/lib/data";
import { formatILS, formatNum, withVat } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import type { Product, Size } from "@/lib/types";

type BulkTarget = "both" | "retail" | "dealer";

const targetLabels: Record<BulkTarget, string> = {
  both: "צרכן + קבלן",
  retail: "צרכן בלבד",
  dealer: "קבלן בלבד",
};

/** Controlled number input that keeps a local draft so clearing the field works. */
function NumField({
  value,
  onCommit,
  step = 1,
  min = 0,
  className = "",
  ariaLabel,
}: {
  value: number;
  onCommit: (next: number) => void;
  step?: number;
  min?: number;
  className?: string;
  ariaLabel: string;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      min={min}
      value={draft}
      dir="ltr"
      aria-label={ariaLabel}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={() => {
        const parsed = Number(draft);
        if (!Number.isFinite(parsed) || parsed < min) {
          setDraft(String(value));
          return;
        }
        if (parsed !== value) onCommit(parsed);
      }}
      className={`field num py-1.5 ${className}`}
    />
  );
}

export default function AdminClient() {
  const {
    products,
    settings,
    updatedAt,
    updateSize,
    setStatus,
    applyBulk,
    setSettings,
    setCalcRate,
    convertListToNet,
    reset,
  } = useStore();

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [bulkGroup, setBulkGroup] = useState("all");
  const [bulkTarget, setBulkTarget] = useState<BulkTarget>("retail");
  const [bulkPercent, setBulkPercent] = useState("5");
  const [toast, setToast] = useState<string | null>(null);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => {
        if (!term) return true;
        return (
          product.name.toLowerCase().includes(term) ||
          product.subtitle.toLowerCase().includes(term)
        );
      });
  }, [products, category, query]);

  const affectedSizes = useMemo(
    () =>
      products
        .filter((product) => bulkGroup === "all" || product.group === bulkGroup)
        .reduce((total, product) => total + product.sizes.length, 0),
    [products, bulkGroup],
  );

  function handleBulk() {
    const percent = Number(bulkPercent);
    if (!Number.isFinite(percent) || percent === 0) {
      notify("יש להזין אחוז שונה מאפס");
      return;
    }
    applyBulk({ category: "all", group: bulkGroup, target: bulkTarget, percent });
    notify(
      `עודכנו ${affectedSizes} מידות ב־${percent > 0 ? "+" : ""}${percent}% (${targetLabels[bulkTarget]})`,
    );
  }

  function exportCsv() {
    const header = [
      "קבוצה",
      "מוצר",
      "מידה",
      "רוחב (ס״מ)",
      "גובה (ס״מ)",
      "אורך (ס״מ)",
      "נפח (מ״ק)",
      "משקל (ק״ג)",
      "מחיר נטו",
      "כולל מע״מ 18%",
      "מחיר קבלן נטו",
      "מחיר משוער",
    ];
    const rows = products.flatMap((product) =>
      product.sizes.map((size) => [
        groups.find((group) => group.slug === product.group)?.name ?? product.group,
        product.name,
        size.label,
        size.widthCm ? String(size.widthCm) : "",
        size.heightCm ? String(size.heightCm) : "",
        String(size.lengthCm),
        size.volumeM3.toFixed(2),
        String(size.weightKg),
        (size.priceNetAgorot / 100).toFixed(0),
        (withVat(size.priceNetAgorot) / 100).toFixed(0),
        size.dealerNetAgorot === null ? "לפי הצעה" : (size.dealerNetAgorot / 100).toFixed(0),
        size.provisional ? "כן" : "לא",
      ]),
    );
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sharara-price-list.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("המחירון יוצא לקובץ CSV (Excel)");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
              דמו
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">עריכת מחירון ומוצרים</h1>
          </div>
          <p className="mt-1 text-[13px] text-slate-600">
            שנה מחיר או מידה כאן ופתח את דף המוצר — השינוי מופיע מיד.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11.5px] text-slate-600">
            {updatedAt ? `נשמר ${new Date(updatedAt).toLocaleTimeString("he-IL")}` : "לא בוצעו שינויים"}
          </span>
          <button type="button" onClick={exportCsv} className="btn btn-ghost text-[13px]">
            ייצוא CSV
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("לאפס את כל השינויים ולחזור לנתוני הבסיס?")) {
                reset();
                notify("הנתונים אופסו");
              }
            }}
            className="btn btn-ghost text-[13px] text-rose-600"
          >
            איפוס
          </button>
          <Link href="/products/ashpaon" className="btn btn-primary text-[13px]">
            צפייה באתר
          </Link>
        </div>
      </div>

      {/* Price list status */}
      <section className="card mt-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">סטטוס המחירון</h2>
            <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-slate-500">
              עד שהמחירון לא אומת מול חשבונית או מחירון עדכני, האתר מציג את המחירים בלי תאריך
              עדכון. אחרי אימות — התאריך מוצג ללקוחות.
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              settings.priceListStatus === "verified"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {settings.priceListStatus === "verified" ? "מאומת" : "טרם אומת"}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="block">
            <span className="mb-1 block text-[12px] font-semibold text-slate-600">סטטוס</span>
            <select
              value={settings.priceListStatus}
              onChange={(event) => {
                const status = event.target.value as "draft" | "verified";
                setSettings({ priceListStatus: status });
                notify(status === "verified" ? "המחירון סומן כמאומת" : "המחירון סומן כטיוטה");
              }}
              className="field"
            >
              <option value="draft">טיוטה — לא מוצג תאריך</option>
              <option value="verified">מאומת — מוצג תאריך עדכון</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-[12px] font-semibold text-slate-600">תאריך עדכון</span>
            <input
              type="date"
              value={settings.priceListDate ?? ""}
              disabled={settings.priceListStatus !== "verified"}
              onChange={(event) => setSettings({ priceListDate: event.target.value || null })}
              className="field num disabled:bg-slate-100 disabled:text-slate-400"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "הפעולה ממירה את כל המחירים לנטו (מחלק ב־1.18) — לבצע רק אם המחירון שהוזן כולל מע״מ. להמשיך?",
                )
              ) {
                convertListToNet();
                notify("המחירון הומר לנטו (÷1.18)");
              }
            }}
            className="btn btn-ghost whitespace-nowrap text-[13px]"
          >
            המחירון הוזן כולל מע״מ — המר לנטו
          </button>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="card p-4 sm:p-5">
          <h2 className="text-sm font-bold text-slate-900">עדכון מחירים גורפי</h2>
          <p className="mt-1 text-[12px] text-slate-500">
            עדכון אחוזי לכל המידות בקטגוריה — השימוש הנפוץ לפני עליית מחירי פלדה.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_100px_auto]">
            <select
              value={bulkGroup}
              onChange={(event) => setBulkGroup(event.target.value)}
              className="field"
              aria-label="קבוצת מוצרים לעדכון גורפי"
            >
              <option value="all">כל הקבוצות</option>
              {groups.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              value={bulkTarget}
              onChange={(event) => setBulkTarget(event.target.value as BulkTarget)}
              className="field"
              aria-label="סוג מחיר לעדכון"
            >
              {(Object.keys(targetLabels) as BulkTarget[]).map((key) => (
                <option key={key} value={key}>
                  {targetLabels[key]}
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                value={bulkPercent}
                onChange={(event) => setBulkPercent(event.target.value)}
                inputMode="decimal"
                className="field num pe-7 text-center"
                dir="ltr"
                aria-label="אחוז שינוי"
              />
              <span className="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-[12px] text-slate-400">
                %
              </span>
            </div>
            <button type="button" onClick={handleBulk} className="btn btn-primary whitespace-nowrap">
              עדכון {affectedSizes} מידות
            </button>
          </div>
        </div>

        <div className="card p-4 sm:p-5">
          <h2 className="text-sm font-bold text-slate-900">סינון מהיר</h2>
          <div className="mt-3 space-y-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="חיפוש מוצר"
              className="field"
              aria-label="חיפוש מוצר"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="field"
              aria-label="סינון קטגוריה"
            >
              <option value="all">כל הקטגוריות</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="card mt-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">תעריפי פח למחשבון ההערכה</h2>
            <p className="mt-1 text-[12px] text-slate-600">
              מחיר נטו למ״ר פח לפי עובי — משפיע על צנרת ספירלית ועל תעלות מלבניות.
            </p>
          </div>
          <span className="text-[11.5px] text-slate-600">המחשבון מציג טווח סביב התעריף</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {settings.calcRates.map((rate) => (
            <label key={rate.thicknessMm} className="block">
              <span className="mb-1 block text-[11.5px] font-semibold text-slate-600">
                <bdi dir="ltr">{rate.thicknessMm}</bdi> מ״מ · ₪/מ״ר
              </span>
              <NumField
                value={Math.round(rate.rateNetPerSqm / 100)}
                step={5}
                onCommit={(next) => setCalcRate(rate.thicknessMm, Math.round(next * 100))}
                ariaLabel={`תעריף פח בעובי ${rate.thicknessMm} מ״מ`}
              />
            </label>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-5">
        {visible.map((product) => (
          <ProductEditor
            key={product.id}
            product={product}
            onSize={(sizeId, patch) => updateSize(product.id, sizeId, patch)}
            onStatus={(status) => setStatus(product.id, status)}
          />
        ))}
        {visible.length === 0 && (
          <div className="card p-10 text-center text-sm text-slate-500">לא נמצאו מוצרים לסינון הזה.</div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-[12.5px] leading-relaxed text-brand-900">
        <b>מה שונה בגרסה החיה:</b> התחברות עורכים, שמירה במסד נתונים במקום בדפדפן, העלאת תמונות
        אמיתיות, והיסטוריית מחירים שמאפשרת לחזור לגרסה קודמת של המחירון.
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function ProductEditor({
  product,
  onSize,
  onStatus,
}: {
  product: Product;
  onSize: (sizeId: string, patch: Partial<Size>) => void;
  onStatus: (status: Product["status"]) => void;
}) {
  const published = product.status === "published";
  const isBox = product.sizes.some((size) => size.widthCm && size.heightCm);
  const groupLabel = groups.find((group) => group.slug === product.group)?.name ?? product.group;

  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[11px] text-slate-600">
              {groupLabel} · {categories.find((item) => item.slug === product.category)?.name}
            </div>
            <h3 className="text-[15px] font-bold text-slate-900">{product.name}</h3>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
              published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
            }`}
          >
            {published ? "מפורסם" : "טיוטה"}
          </span>
          {product.kind === "calc" && (
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10.5px] font-bold text-brand-800">
              מחשבון
            </span>
          )}
          {product.kind === "quote" && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-600">
              לפי הצעה
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onStatus(published ? "draft" : "published")}
            className="btn btn-ghost px-3 py-1.5 text-[12px]"
          >
            {published ? "העברה לטיוטה" : "פרסום"}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-ghost px-3 py-1.5 text-[12px]"
            target="_blank"
          >
            צפייה בדף ↗
          </Link>
        </div>
      </div>

      {product.sizes.length === 0 ? (
        <div className="px-4 py-6 text-[13px] text-slate-600 sm:px-5">
          {product.kind === "calc"
            ? "מוצר מחושב — המחיר מוצג כמחשבון הערכה לפי מ״ר פח, ואין טבלת מידות."
            : "אין טבלת מחירים למוצר הזה. הדף מציג ״לפי הצעה״ עם טופס בקשת מחיר."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-slate-600">
                <th className="px-3 py-2.5 text-start">תווית מידה</th>
                {isBox && (
                  <>
                    <th className="px-2 py-2.5 text-start">רוחב (ס״מ)</th>
                    <th className="px-2 py-2.5 text-start">גובה (ס״מ)</th>
                  </>
                )}
                <th className="px-2 py-2.5 text-start">אורך (ס״מ)</th>
                <th className="px-2 py-2.5 text-start">נפח (מ״ק)</th>
                <th className="px-2 py-2.5 text-start">משקל (ק״ג)</th>
                <th className="px-2 py-2.5 text-start">מחיר נטו</th>
                <th className="px-2 py-2.5 text-start">כולל מע״מ</th>
                <th className="px-2 py-2.5 text-start">מחיר קבלן נטו</th>
                <th className="px-2 py-2.5 text-start">משוער</th>
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((size) => (
                <tr key={size.id} className="border-t border-slate-100">
                  <td className="px-3 py-2.5">
                    <input
                      value={size.label}
                      onChange={(event) => onSize(size.id, { label: event.target.value })}
                      className="field w-24 py-1.5"
                      aria-label={`תווית מידה ${size.label}`}
                    />
                  </td>
                  {isBox && (
                    <>
                      <td className="px-2 py-2.5">
                        <NumField
                          value={size.widthCm ?? 0}
                          step={5}
                          onCommit={(next) => onSize(size.id, { widthCm: next })}
                          className="w-16"
                          ariaLabel={`רוחב ${size.label}`}
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <NumField
                          value={size.heightCm ?? 0}
                          step={5}
                          onCommit={(next) => onSize(size.id, { heightCm: next })}
                          className="w-16"
                          ariaLabel={`גובה ${size.label}`}
                        />
                      </td>
                    </>
                  )}
                  <td className="px-2 py-2.5">
                    <NumField
                      value={size.lengthCm}
                      onCommit={(next) => onSize(size.id, { lengthCm: next })}
                      className="w-20"
                      ariaLabel={`אורך ${size.label}`}
                    />
                  </td>
                  <td className="px-2 py-2.5">
                    <NumField
                      value={size.volumeM3}
                      step={0.01}
                      onCommit={(next) => onSize(size.id, { volumeM3: next })}
                      className="w-20"
                      ariaLabel={`נפח ${size.label}`}
                    />
                  </td>
                  <td className="px-2 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <NumField
                        value={size.weightKg}
                        step={5}
                        onCommit={(next) => onSize(size.id, { weightKg: next })}
                        className="w-20"
                        ariaLabel={`משקל ${size.label}`}
                      />
                      <label className="flex items-center gap-1 text-[10.5px] font-semibold text-amber-700">
                        <input
                          type="checkbox"
                          checked={size.weightEstimated}
                          onChange={(event) =>
                            onSize(size.id, { weightEstimated: event.target.checked })
                          }
                        />
                        משוער
                      </label>
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <NumField
                      value={Math.round(size.priceNetAgorot / 100)}
                      step={50}
                      onCommit={(next) => onSize(size.id, { priceNetAgorot: Math.round(next * 100) })}
                      className="w-24"
                      ariaLabel={`מחיר נטו ${size.label}`}
                    />
                  </td>
                  <td className="num px-2 py-2.5 text-slate-500">
                    {formatILS(withVat(size.priceNetAgorot))}
                  </td>
                  <td className="px-2 py-2.5">
                    <div className="flex items-center gap-1.5">
                      {size.dealerNetAgorot === null ? (
                        <span className="text-[11.5px] font-semibold text-slate-500">לפי הצעה</span>
                      ) : (
                        <NumField
                          value={Math.round(size.dealerNetAgorot / 100)}
                          step={50}
                          onCommit={(next) =>
                            onSize(size.id, { dealerNetAgorot: Math.round(next * 100) })
                          }
                          className="w-24"
                          ariaLabel={`מחיר קבלן נטו ${size.label}`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          onSize(size.id, {
                            dealerNetAgorot:
                              size.dealerNetAgorot === null
                                ? Math.round((size.priceNetAgorot * 0.85) / 100) * 100
                                : null,
                          })
                        }
                        className="rounded-lg border border-slate-200 px-2 py-1 text-[10.5px] font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        {size.dealerNetAgorot === null ? "קביעת מחיר" : "לפי הצעה"}
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <label className="flex items-center gap-1 text-[10.5px] font-semibold text-amber-700">
                      <input
                        type="checkbox"
                        checked={size.provisional ?? false}
                        onChange={(event) => onSize(size.id, { provisional: event.target.checked })}
                        aria-label={`מחיר משוער ${size.label}`}
                      />
                      משוער
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[11.5px] text-slate-500 sm:px-5">
        {product.sizes.length > 0 && (
          <>
            <bdi dir="ltr">
              {formatNum(product.sizes[0].volumeM3, 2)}–
              {formatNum(product.sizes[product.sizes.length - 1].volumeM3, 2)}
            </bdi>{" "}
            מ״ק · {product.sizes.length} מידות
          </>
        )}
        {product.sizes.length === 0 && "ללא טבלת מחירים"}
      </div>
    </section>
  );
}
