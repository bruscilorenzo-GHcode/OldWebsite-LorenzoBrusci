import data from "@/content/people.json";

export interface Person {
  name: string; slug: string; group: "member" | "collaborator";
  guestComposer: string | null; originalBio: string | null; originalSource: string | null;
  cv: string | null; sources: { label: string; url: string }[]; website: string | null;
}
export const people = (data.people as unknown as Person[]);
export const members = people.filter((p) => p.group === "member");
export const collaborators = people.filter((p) => p.group === "collaborator");
export const personBySlug = (slug: string) => people.find((p) => p.slug === slug);
export const peopleSlug = (name: string) => people.find((p) => p.name === name || p.name.startsWith(name + " /"))?.slug ?? null;

/** Short text for cards: CV if present, else the first sentences of the 2004 bio. */
export function blurb(p: Person, max = 200): string {
  const t = (p.cv ?? p.originalBio ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
