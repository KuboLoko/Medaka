import type { MetadataRoute } from "next";
import { noindexRoutes, routes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((path) => !noindexRoutes.includes(path))
    .map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.7,
    }));
}
