"use client";

import Link from "next/link";
import { categoryName, cheapestSize } from "@/lib/data";
import { usePriceMode } from "@/lib/price-mode";
import { formatILS, priceFor } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { mode } = usePriceMode();
  const cheapest = cheapestSize(product);
  const startPrice = cheapest ? priceFor(cheapest, mode) : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
    >
      <div className="grid-lines relative flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-3">
        <ProductImage product={product} variant="card" />
        <span className="absolute top-3 start-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
          {categoryName(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-brand-700">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-slate-600">{product.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.kind === "table" && <span className="chip">{product.sizes.length} מידות</span>}
          {product.kind === "calc" && <span className="chip">מחשבון הערכה</span>}
          {product.kind === "quote" && <span className="chip">לפי הצעה</span>}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <div className="text-[11px] text-slate-600">
              {startPrice !== null ? "החל מ־" : product.kind === "calc" ? "תעריף" : "מחיר"}
            </div>
            <div className="num text-lg font-extrabold text-slate-900">
              {startPrice !== null
                ? formatILS(startPrice)
                : product.kind === "calc"
                  ? "לפי מ״ר"
                  : "לפי הצעה"}
            </div>
          </div>
          <span className="flex items-center gap-1 text-[13px] font-bold text-brand-700">
            פרטים
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
