import discographyJson from "@/content/discography.json";
import aboutJson from "@/content/about.json";
import projectsJson from "@/content/projects.json";
import eventsJson from "@/content/events.json";
import articlesJson from "@/content/articles.json";
import guestsJson from "@/content/guest-composers.json";
import siteJson from "@/content/site.json";
import contactJson from "@/content/contact.json";

export interface Track {
  n: number | string;
  title: string;
  duration: string;
  section?: string | null;
  disc?: string;
  note?: string;
}

export interface LineupEntry {
  name: string;
  role: string;
}

export interface Release {
  slug: string;
  title: string;
  sourceTitle?: string;
  year: number | string;
  yearSource?: string;
  releaseDate?: string;
  releaseDateSource?: string;
  sortDate?: number;
  sourcePage: string;
  description: string;
  descriptionSource?: string;
  coverImage: string | null;
  coverThumb?: string | null;
  coverFit?: "cover" | "contain";
  coverNote?: string;
  audioFolder: string | null;
  audioNote?: string;
  lineup: LineupEntry[];
  lineupNote?: string;
  tracks: Track[];
  tracklistStatus?: string;
  creditsNotes?: string[];
  sectionDurations?: Record<string, string>;
  composerLegend?: Record<string, string>;
  anomalies?: string[];
  externalLinks?: Array<{ label: string; url: string; note?: string }>;
  bandcampStatus?: string;
}

export interface Bio {
  name: string;
  category: "member" | "collaborator";
  sourcePage: string;
  bioText: string;
}

export interface Project {
  id: string;
  title: string;
  sourcePage: string;
  bodyText: string;
}

export interface EventRecord {
  slug: string;
  title: string;
  type: string;
  dateText: string;
  year: string;
  location: string;
  sourcePage: string;
  bodyText: string;
}

export interface ArticleRecord {
  slug: string;
  title: string;
  sourcePage: string;
  bodyText: string;
  type?: string;
}

export interface GuestRecord {
  name: string;
  monthYearVerbatim: string;
  sourcePage: string;
  bioText: string;
}

export const releases = (discographyJson.releases as unknown as Release[])
  .slice()
  .sort(
    (a, b) =>
      (a.sortDate ?? Number(a.year) ?? 9999) -
      (b.sortDate ?? Number(b.year) ?? 9999),
  );

export const additionalReleases = discographyJson.additionalReleasesFound as Array<{
  slug: string;
  title: string;
  year: number | string;
  sourcePage: string;
  note: string;
}>;

export const about = aboutJson as unknown as {
  collective: {
    statement: string;
    founded: number;
    founder: string;
    collectiveActionEnded: number;
    news: string;
    lastUpdate: string;
  };
  membersListVerbatim: string[];
  collaborationListVerbatim: string[];
  bios: Bio[];
  nameNormalisations: Array<{ source: string; display: string; reason: string }>;
  taxonomy: { members: string; collaborators: string; note: string };
  personLinks: Array<{ name: string; url: string; source: string }>;
  lineage: {
    statement: string;
    statementIt: string;
    source: string;
    links: Array<{ label: string; url: string }>;
  };
};

export const projects = (projectsJson.projects as unknown as Project[]).filter(
  (project) => project.id !== "indexprov",
);

export const preconditions = projectsJson.preconditions as unknown as {
  sourcePage: string;
  bodyText: string;
};

export const events = (eventsJson.events as unknown as EventRecord[])
  .slice()
  .sort((a, b) => {
    const ay = parseInt(a.year, 10) || 0;
    const by = parseInt(b.year, 10) || 0;
    if (ay !== by) return by - ay;
    return a.title.localeCompare(b.title);
  });

export const articles = articlesJson.articles as unknown as ArticleRecord[];
export const guests = guestsJson.composers as unknown as GuestRecord[];
export const sitePages = siteJson.pages as unknown as Array<{
  slug: string;
  sourcePage: string;
  bodyText: string;
}>;

export const canonicalContact = contactJson as unknown as {
  canonical: { email: string; label: string; useFor: string[] };
  legacy: {
    sourcePage: string;
    status: string;
    entries: Array<{ role: string; name: string; email: string; status: string }>;
  };
  replacementPolicy: string;
};

export function sitePage(slug: string) {
  return sitePages.find((page) => page.slug === slug);
}

export function coverFor(release: Release): string | null {
  if (!release.coverImage) return null;
  return `/covers/${release.slug}.jpg`;
}

export function personUrl(name: string): string | null {
  const normalised = displayName(name);
  return (
    about.personLinks.find((entry) => entry.name === normalised)?.url ?? null
  );
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const bioPeople = about.bios.map((bio) => ({
  ...bio,
  slug: slugify(bio.name),
}));

export function displayName(name: string): string {
  const normalisation = about.nameNormalisations.find(
    (entry) => entry.source === name,
  );
  return normalisation ? normalisation.display : name;
}

export const navigation = [
  { href: "/releases", label: "Releases" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/people", label: "People" },
  { href: "/archive", label: "Archive" },
  { href: "/open-database", label: "Open database" },
  { href: "/contact", label: "Contact" },
];
