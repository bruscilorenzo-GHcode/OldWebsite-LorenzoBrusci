import type { MetadataRoute } from "next";
import { releases } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://timet.org";
  const staticRoutes = [
    "",
    "/releases",
    "/projects",
    "/about",
    "/archive",
    "/contact",
    "/open-database",
    "/open-database/licence",
    "/open-database/licence/full",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...releases.map((release) => ({
      url: `${base}/releases/${release.slug}`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
