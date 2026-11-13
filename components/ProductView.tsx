"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryName, cheapestSize, company, groupName, skipGeometry } from "@/lib/data";
import { usePriceMode } from "@/lib/price-mode";
import { formatILS, formatNum, priceFor, priceModeBadge } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import DimensionDiagram from "./DimensionDiagram";
import DrawingFigure from "./DrawingFigure";
import PlenumDesigns from "./PlenumDesigns";
import PriceCalculator from "./PriceCalculator";
import PriceTable from "./PriceTable";
import ProductImage from "./ProductImage";
import QuoteDialog from "./QuoteDialog";

const defaultIncluded = [
  "ייצור במפעל שלנו, לפי שרטוט או מדידה בשטח.",
  "חומרי גלם מגולוונים או צבועים לפי דרישה.",
  "בדיקת מידות לפני משלוח.",
  "אפשרות להתקנה על ידי הצוות שלנו.",
];

export default function ProductView({ slug }: { slug: string }) {
  const { products } = useStore();
  const { mode } = usePriceMode();
  const product = products.find((item) => item.slug === slug);

  // The drawing layout (full-width banner) is only used once the file really exists.
  const drawingSrc = product?.drawing?.src ?? null;
  const [drawingAvailable, setDrawingAvailable] = useState(false);
  useEffect(() => {
    if (!drawingSrc) return;
    let cancelled = false;
    fetch(drawingSrc, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setDrawingAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setDrawingAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [drawingSrc]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold">המוצר לא נמצא</h1>
        <Link href="/products" className="btn btn-primary mt-6">
          חזרה לקטלוג
        </Link>
      </div>
    );
  }

  const cheapest = cheapestSize(product);
  const startPrice = cheapest ? priceFor(cheapest, mode) : null;
  const isSkip = product.category === "skips";
  const drawingIsHero = Boolean(product.drawing) && !product.photoFirst;
  const isBox = product.sizes.some((size) => size.widthCm && size.heightCm);
  const biggest = product.sizes.reduce<(typeof product.sizes)[number] | undefined>(
    (max, size) => (!max || size.lengthCm > max.lengthCm ? size : max),
    undefined,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <nav aria-label="מיקום בעץ" className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-600">
        <Link href="/" className="hover:text-brand-700">
          דף הבית
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-700">
          מוצרים
        </Link>
        <span>/</span>
        <Link href={`/products?group=${product.group}`} className="hover:text-brand-700">
          {groupName(product.group)}
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">{product.name}</span>
      </nav>

      {product.status === "draft" && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-[12.5px] font-semibold text-amber-800">
          תצוגה מקדימה — המוצר בסטטוס טיוטה ואינו מוצג בקטלוג הציבורי.
        </div>
      )}

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="card flex h-full flex-col overflow-hidden">
          {drawingIsHero ? (
            <div className="flex flex-col items-center justify-center border-b border-slate-100 bg-white p-4 sm:p-6">
              <ProductImage product={product} variant="banner" priority />
            </div>
          ) : null}
          <div className={`${drawingIsHero ? "" : "grid md:grid-cols-[1fr_1.05fr]"} flex-1`}>
            {drawingIsHero ? null : (
              <div className="grid-lines flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
                <ProductImage product={product} variant="hero" priority />
              </div>
            )}

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">{categoryName(product.category)}</span>
                {product.kind === "table" && (
                  <span className="chip">{product.sizes.length} מידות</span>
                )}
                {product.kind === "calc" && <span className="chip">הערכת מחיר</span>}
                {product.kind === "quote" && <span className="chip">לפי הצעה</span>}
              </div>

              <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 sm:text-[27px]">
                {product.name}
              </h1>
              <p className="mt-1.5 text-[13.5px] text-slate-600">{product.subtitle}</p>

              <p className="mt-4 text-[13.5px] leading-relaxed text-slate-600">{product.description}</p>

              <ul className="mt-4 grid gap-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                    <svg
                      className="mt-0.5 shrink-0 text-brand-600"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-28">
          <div className="card p-5">
            {product.kind === "table" && startPrice !== null ? (
              <>
                <div className="text-[12px] text-slate-600">
                  החל מ־ · {priceModeBadge[mode]}
                </div>
                <div className="num mt-1 text-2xl font-extrabold text-slate-900">
                  {formatILS(startPrice)}
                </div>
                <div className="mt-1 text-[11.5px] text-slate-600">
                  {product.sizes.length} מידות
                  {isBox
                    ? ` · ${formatNum(cheapest?.volumeM3 ?? 0, 2)}–${formatNum(biggest?.volumeM3 ?? 0, 2)} מ״ק`
                    : ` · ${formatNum(cheapest?.volumeM3 ?? 0, 2)}–${formatNum(
                        biggest?.volumeM3 ?? 0,
                        2,
                      )} מ״ק`}
                </div>
              </>
            ) : product.kind === "calc" ? (
              <>
                <div className="text-[12px] text-slate-600">מחיר</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">לפי מ״ר פח</div>
                <div className="mt-1 text-[11.5px] text-slate-600">
                  חשבו הערכה במחשבון שלמטה — המחיר הסופי לפי שרטוט.
                </div>
              </>
            ) : (
              <>
                <div className="text-[12px] text-slate-600">מחיר</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">לפי הצעה</div>
                <div className="mt-1 text-[11.5px] text-slate-600">
                  {mode === "dealer" ? "מחירי קבלן לפי כמויות" : "המחיר נקבע לפי מפרט, כמות ומידות"}
                </div>
              </>
            )}

            <div className="mt-4 space-y-2">
              <QuoteDialog label="בקשת הצעת מחיר" productName={product.name} className="w-full" />
              <a href={company.sales[0].whatsapp} className="btn btn-ghost w-full">
                וואטסאפ עם המכירות
              </a>
              <a href={company.phoneHref} className="btn btn-ghost num w-full">
                {company.phone}
              </a>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="text-[11px] font-semibold text-slate-600">אנשי קשר</div>
              <ul className="mt-1.5 space-y-1 text-[12px]">
                {company.sales.map((person) => (
                  <li key={person.phone} className="flex items-center justify-between gap-2">
                    <span className="text-slate-600">{person.name}</span>
                    <a
                      href={person.href}
                      className="num flex min-h-7 items-center py-1 font-semibold text-slate-800 hover:text-brand-700"
                    >
                      {person.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold text-slate-900">מה כלול</h2>
            <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-slate-600">
              {(product.included ?? defaultIncluded).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {product.drawing && !drawingIsHero && !isSkip ? (
        <div className="card mt-6 p-4 sm:p-5">
          <h2 className="text-sm font-bold text-slate-900">שרטוטים</h2>
          <p className="mt-1 text-[12px] text-slate-600">
            חתכים ומידות לפי שרטוט הייצור. מידות במ״מ.
          </p>
          <DrawingFigure
            drawing={product.drawing}
            className="mt-2"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </div>
      ) : null}

      {product.kind === "table" && (
        <>
          {isSkip ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
              <div className="card p-4 sm:p-5">
                <h2 className="text-sm font-bold text-slate-900">שרטוט מידות</h2>
                <p className="mt-1 text-[12px] text-slate-600">
                  חתך קבוע לכל המידות — האורך משתנה. מידות במ״מ.
                </p>
                {product.drawing ? (
                  <DrawingFigure
                    drawing={product.drawing}
                    className="mt-2"
                    fallback={
                      <DimensionDiagram lengthCm={biggest?.lengthCm ?? 150} className="mt-2 w-full max-w-md" />
                    }
                  />
                ) : (
                  <DimensionDiagram lengthCm={biggest?.lengthCm ?? 150} className="mt-2 w-full max-w-md" />
                )}
              </div>

              <div className="card p-5">
                <h2 className="text-sm font-bold text-slate-900">מפרט</h2>
                <dl className="mt-3 divide-y divide-slate-100 text-[13px]">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between gap-3 py-2">
                      <dt className="text-slate-600">{spec.label}</dt>
                      <dd className="font-semibold text-slate-800">{spec.value}</dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 py-2">
                    <dt className="text-slate-600">נפח</dt>
                    <dd className="num font-semibold text-slate-800">
                      <bdi dir="ltr">
                        {formatNum(cheapest?.volumeM3 ?? 0, 2)}–
                        {formatNum(biggest?.volumeM3 ?? 0, 2)}
                      </bdi>{" "}
                      מ״ק
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-slate-100 pt-3 text-[11.5px] leading-relaxed text-slate-600">
                  חתך המכולה: {formatNum(skipGeometry.topWidthMm)} מ״מ רוחב עליון,{" "}
                  {formatNum(skipGeometry.bottomWidthMm)} מ״מ תחתון, {formatNum(skipGeometry.heightMm)}{" "}
                  מ״מ גובה.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 card p-5">
              <h2 className="text-sm font-bold text-slate-900">מפרט</h2>
              <dl className="mt-3 grid gap-x-6 divide-y divide-slate-100 text-[13px] sm:grid-cols-2 sm:divide-y-0">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-3 py-2">
                    <dt className="text-slate-600">{spec.label}</dt>
                    <dd className="font-semibold text-slate-800">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-6">
            <PriceTable product={product} />
          </div>

          {product.adders && product.adders.length > 0 && <PlenumDesigns adders={product.adders} />}
        </>
      )}

      {product.kind === "calc" && (
        <div className="mt-6">
          <PriceCalculator product={product} />
          <div className="card mt-6 p-5">
            <h2 className="text-sm font-bold text-slate-900">מפרט</h2>
            <dl className="mt-3 grid gap-x-6 text-[13px] sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-3 border-b border-slate-100 py-2"
                >
                  <dt className="text-slate-600">{spec.label}</dt>
                  <dd className="font-semibold text-slate-800">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {product.kind === "quote" && (
        <div className="card mt-6 p-6 text-center sm:p-8">
          <h2 className="text-lg font-extrabold text-slate-900">המוצר מתומחר לפי הצעה</h2>
          <p className="mx-auto mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-600">
            שלחו מידות, שרטוט או מפרט ונחזור עם הצעת מחיר מסודרת — בדרך כלל תוך יום עסקים. אפשר גם
            לתאם מדידה בשטח.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <QuoteDialog label="שליחת מידות להצעה" productName={product.name} />
            <a href={company.sales[0].whatsapp} className="btn btn-ghost">
              וואטסאפ
            </a>
          </div>
        </div>
      )}

      {product.documents.length > 0 && (
        <div className="card mt-6 p-5">
          <h2 className="text-sm font-bold text-slate-900">הורדות</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.documents.map((doc) => (
              <li key={doc.name}>
                <a
                  href="#"
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-[13px] transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
                    </svg>
                    {doc.name}
                  </span>
                  <span className="text-[11px] text-slate-600">{doc.meta}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
