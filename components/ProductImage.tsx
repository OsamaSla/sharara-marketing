"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import ProductVisual from "./ProductVisual";

type Variant = "card" | "hero" | "banner";

const captionClass = "mt-2 max-w-3xl text-center text-[11.5px] leading-relaxed text-slate-600";

/**
 * Picks the best available visual: the shop's real drawing, then a real photo,
 * then the illustration.
 *
 * A drawing can be wired into `lib/data.ts` before the file lands in
 * `/public/specs`. The `onError` handler cannot be relied on (the browser often
 * fails the image before React hydrates), so a HEAD check after mount decides
 * the fallback instead.
 */
export default function ProductImage({
  product,
  variant = "card",
  priority = false,
}: {
  product: Product;
  variant?: Variant;
  priority?: boolean;
}) {
  const [drawingMissing, setDrawingMissing] = useState(false);
  const [photoMissing, setPhotoMissing] = useState(false);

  const drawingSrc = product.drawing?.src;
  useEffect(() => {
    if (!drawingSrc) return;
    let cancelled = false;
    fetch(drawingSrc, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && !res.ok) setDrawingMissing(true);
      })
      .catch(() => {
        if (!cancelled) setDrawingMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [drawingSrc]);

  const drawing = product.drawing && !drawingMissing ? product.drawing : null;
  const photo = product.image && !photoMissing ? product.image : null;
  const wide = variant === "banner";
  const sizes = wide ? "(min-width: 1024px) 900px, 100vw" : "380px";

  // `photoFirst` keeps the product shot in the hero and leaves the drawing to the spec card.
  const showPhoto = photo && (product.photoFirst || !drawing);
  const showDrawing = !showPhoto && drawing;

  if (showDrawing && drawing) {
    const className =
      variant === "card"
        ? "h-40 w-full rounded-lg object-contain"
        : wide
          ? "h-auto w-full max-w-3xl"
          : "h-auto w-full max-w-[380px] object-contain";

    return (
      <>
        <Image
          src={drawing.src}
          alt={drawing.alt}
          width={drawing.width}
          height={drawing.height}
          sizes={sizes}
          priority={priority}
          onError={() => setDrawingMissing(true)}
          className={className}
        />
        {wide && drawing.caption ? <p className={captionClass}>{drawing.caption}</p> : null}
      </>
    );
  }

  if (photo) {
    const className =
      variant === "card"
        ? "h-40 w-auto rounded-lg object-contain"
        : wide
          ? "h-auto w-full max-w-3xl object-contain"
          : "h-auto w-full max-w-[380px] rounded-xl border border-slate-200 bg-white object-contain";

    return (
      <>
        <Image
          src={photo}
          alt={`${product.name} — תמונה`}
          width={product.imageWidth ?? 292}
          height={product.imageHeight ?? 238}
          sizes={sizes}
          priority={priority}
          onError={() => setPhotoMissing(true)}
          className={className}
        />
        {variant !== "card" && product.photoCredit ? (
          <span className="mt-2 text-center text-[10.5px] leading-tight text-slate-600">
            {product.photoCredit}
          </span>
        ) : null}
      </>
    );
  }

  return (
    <ProductVisual
      category={product.category}
      className={variant === "card" ? "h-40 w-full" : "h-52 w-full max-w-xs"}
    />
  );
}
