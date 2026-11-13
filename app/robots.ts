import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

/** `output: "export"` needs the route to be explicitly static. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // robots paths are host-root relative, so the Pages sub-path has to be included
        disallow: [`${BASE_PATH}/admin/`],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
