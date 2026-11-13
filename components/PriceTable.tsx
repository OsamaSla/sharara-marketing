"use client";

import { usePriceMode } from "@/lib/price-mode";
import { formatILS, formatNum, priceFor, priceModeBadge, priceModeNote } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import type { Product, Size } from "@/lib/types";
import PriceToggle from "./PriceToggle";

function PriceCell({ size }: { size: Size }) {
  const { mode } = usePriceMode();
  const price = priceFor(size, mode);

  if (price === null) {
    return (
      <span className="block text-[13px] font-bold text-slate-600">
        לפי הצעה
        <span className="block text-[10.5px] font-medium text-slate-600">לפי כמות</span>
      </span>
    );
  }

  return (
    <span className="block text-[15px] font-extrabold text-slate-900">
      {formatILS(price)}
      {size.provisional && (
        <span className="ms-1 align-middle text-[10px] font-semibold text-amber-700">משוער</span>
      )}
    </span>
  );
}

export default function PriceTable({ product }: { product: Product }) {
  const { mode } = usePriceMode();
  const { settings } = useStore();

  const isBox = product.sizes.some((size) => size.widthCm && size.heightCm);
  const anyProvisional = product.sizes.some((size) => size.provisional);

  return (
    <section className="card overflow-hidden" aria-labelledby="price-table-title">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 p-4 sm:p-5">
        <div>
          <h2 id="price-table-title" className="text-base font-extrabold text-slate-900">
            {isBox ? "מידות ומחירון" : "מידות, נפח ומחירון"}
          </h2>
          <p className="mt-1 text-[12px] text-slate-500">
            {isBox
              ? "מידות פנימיות בסנטימטרים · כולל אוגנים בשני הקצוות"
              : "חתך קבוע: רוחב עליון 1,433 מ״מ · תחתון 500 מ״מ · גובה 1,184 מ״מ"}
          </p>
        </div>
        <div className="no-print">
          <PriceToggle />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-[11.5px] font-semibold text-slate-600">
              {isBox ? (
                <>
                  <th className="px-4 py-3 text-start">
                    רוחב
                    <span className="block text-[10px] font-normal text-slate-600">ס״מ</span>
                  </th>
                  <th className="px-4 py-3 text-start">
                    גובה
                    <span className="block text-[10px] font-normal text-slate-600">ס״מ</span>
                  </th>
                  <th className="px-4 py-3 text-start">
                    אורך
                    <span className="block text-[10px] font-normal text-slate-600">ס״מ</span>
                  </th>
                </>
              ) : (
                <th className="px-4 py-3 text-start">אורך</th>
              )}
              <th className="px-4 py-3 text-start">
                נפח
                <span className="block text-[10px] font-normal text-slate-600">מ״ק</span>
              </th>
              <th className="px-4 py-3 text-start">
                משקל
                <span className="block text-[10px] font-normal text-slate-600">ק״ג · משוער</span>
              </th>
              <th className="px-4 py-3 text-start">
                מחיר
                <span className="block text-[10px] font-normal text-slate-600">
                  {priceModeBadge[mode]}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {product.sizes.map((size) => (
              <tr key={size.id} className="border-t border-slate-100 transition hover:bg-brand-50/50">
                {isBox ? (
                  <>
                    <td className="num px-4 py-3.5 font-bold text-slate-900">{size.widthCm}</td>
                    <td className="num px-4 py-3.5 font-bold text-slate-900">{size.heightCm}</td>
                    <td className="num px-4 py-3.5 font-bold text-slate-900">{size.lengthCm}</td>
                  </>
                ) : (
                  <td className="px-4 py-3.5">
                    <bdi dir="ltr" className="num block font-bold text-slate-900">
                      {size.label}
                    </bdi>
                  </td>
                )}
                <td className="num px-4 py-3.5 font-semibold text-slate-700">
                  {formatNum(size.volumeM3, 2)}
                </td>
                <td className="num px-4 py-3.5 text-slate-700">
                  {formatNum(size.weightKg)}
                  {size.weightEstimated && (
                    <span className="ms-1 text-[10px] font-semibold text-amber-700">משוער</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <PriceCell size={size} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-slate-100 md:hidden">
        {product.sizes.map((size) => (
          <div key={size.id} className="flex items-center justify-between gap-3 p-4">
            <div>
              <bdi dir="ltr" className="num block text-[15px] font-extrabold text-slate-900">
                {isBox && size.widthCm && size.heightCm
                  ? `${size.widthCm}×${size.heightCm}×${size.lengthCm}`
                  : size.label}
              </bdi>
              <div className="mt-0.5 text-[11.5px] text-slate-600">
                <span className="num">{formatNum(size.volumeM3, 2)}</span> מ״ק ·{" "}
                <span className="num">{formatNum(size.weightKg)}</span> ק״ג משוער
              </div>
            </div>
            <PriceCell size={size} />
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-[11.5px] leading-relaxed text-slate-600 sm:px-5">
        <p>
          {priceModeNote[mode]} המשקל הוא הערכה לפי עובי פח טיפוסי — המשקל הסופי נקבע בייצור.
        </p>
        <p className="mt-1">
          {settings.priceListStatus === "verified" && settings.priceListDate
            ? `המחירון אומת ל־${settings.priceListDate}.`
            : anyProvisional
              ? "המחירים בטבלה משוערים עד לאימות מחירון הפלינומים."
              : "המחירון טרם אומת מול חשבונית עדכנית."}{" "}
          מידה אחרת? אפשר לייצר לפי מידה —{" "}
          <span className="font-semibold">בהצעת מחיר</span>.
        </p>
      </div>
    </section>
  );
}
