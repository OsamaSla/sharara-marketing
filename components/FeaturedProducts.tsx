"use client";

import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ limit = 4 }: { limit?: number }) {
  const { products } = useStore();
  const published = products.filter((product) => product.status === "published");

  const featured: typeof published = [];
  const usedGroups = new Set<string>();
  for (const product of published) {
    if (featured.length >= limit) break;
    if (!usedGroups.has(product.group)) {
      featured.push(product);
      usedGroups.add(product.group);
    }
  }
  for (const product of published) {
    if (featured.length >= limit) break;
    if (!featured.includes(product)) featured.push(product);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {featured.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
