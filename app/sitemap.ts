import type { MetadataRoute } from "next";
import { groups, seedProducts } from "@/lib/data";

const BASE_URL = "https://sharara-metal.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...groups.map((group) => ({
      url: `${BASE_URL}/products?group=${group.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = seedProducts
    .filter((product) => product.status === "published")
    .map((product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
