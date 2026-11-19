import living from "@/content/projects-living.json";

export interface Gallery { key: string; title: string; images: string[] }
export interface LivingPage {
  id: string; slug: string; title: string; markdown: string;
  media: { galleries: Gallery[]; videos: { key: string; files: string[] }[]; files: string[] };
}
const pages = living as unknown as Record<string, LivingPage>;

/** Media (video, audio) archived on the Internet Archive. */
export const MEDIA_BASE = "https://archive.org/download/timet-media-modular/";

export const mainOrder = ["01","02","03","04","05","06","07","08"] as const;
export const mainProjects = mainOrder.map((id) => pages[id]);
export const performativeSubs = Object.values(pages).filter((p) => /^04_\d+$/.test(p.id));
export const appendixFor = (id: string) => pages["app" + id] ?? null;
export const bySlug = (slug: string) => mainProjects.find((p) => p.slug === slug);
export const subById = (id: string) => performativeSubs.find((p) => p.id === id);

export function summary(page: LivingPage): string {
  const first = page.markdown.split("\n\n").find((l) => l.trim() && !l.startsWith("-")) ?? "";
  return first.replace(/\*\*|\*|\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 190).replace(/\s+\S*$/, "") + "…";
}
