import type { MetadataRoute } from "next";
import { events, articles, releases } from "@/lib/content";
import { people } from "@/lib/people";
import { mainProjects, performativeSubs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://timet.org";
  const staticRoutes = [
    "",
    "/releases",
    "/projects",
    "/about",
    "/people",
    "/archive",
    "/contact",
    "/open-database",
    "/open-database/licence",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...[
      ...people.map((p) => `/people/${p.slug}`),
      ...mainProjects.map((p) => `/projects/${p.slug}`),
      ...performativeSubs.map((p) => `/projects/performative/${p.id}`),
      ...events.map((e) => `/archive/events/${e.sourcePage.replace(/^events\//, "").replace(/\.htm$/, "")}`),
      ...articles.filter((a) => a.type !== "pdf").map((a) => `/archive/articles/${a.sourcePage.replace(/^articles\//, "").replace(/\.htm$/, "")}`),
    ].map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-11-19"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...releases.map((release) => ({
      url: `${base}/releases/${release.slug}`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
