"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { asset } from "@/lib/site";
import type { ProductDrawing } from "@/lib/types";

/**
 * Renders one of the shop's drawings. If the file has not been dropped into
 * `/public/specs` yet the component hides itself (or shows `fallback`), so the
 * data can reference drawings before they exist.
 */
export default function DrawingFigure({
  drawing,
  fallback = null,
  className = "",
  sizes = "(min-width: 1024px) 640px, 100vw",
}: {
  drawing: ProductDrawing;
  fallback?: ReactNode;
  className?: string;
  sizes?: string;
}) {
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(asset(drawing.src), { method: "HEAD" })
      .then((res) => {
        if (!cancelled && !res.ok) setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [drawing.src]);

  if (missing) return <>{fallback}</>;

  return (
    <Image
      src={asset(drawing.src)}
      alt={drawing.alt}
      width={drawing.width}
      height={drawing.height}
      sizes={sizes}
      onError={() => setMissing(true)}
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}
