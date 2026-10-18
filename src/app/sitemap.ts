import type { MetadataRoute } from "next";
import { LANDINGS } from "@/data/destinations";
import { packagePath } from "@/data/landing";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return Object.values(LANDINGS).flatMap(l => [
    {
      url: l.path === "/" ? base : `${base}${l.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: l.path === "/" ? 1 : 0.9,
    },
    ...l.packages.map(p => ({
      url: `${base}${packagePath(l, p)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]);
}
