import type { MetadataRoute } from "next";
import { groups, seedProducts } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** `output: "export"` needs the route to be explicitly static. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...groups.map((group) => ({
      url: `${SITE_URL}/products/?group=${group.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = seedProducts
    .filter((product) => product.status === "published")
    .map((product) => ({
      url: `${SITE_URL}/products/${product.slug}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
