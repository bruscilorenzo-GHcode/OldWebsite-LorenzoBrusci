import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackList } from "@/components/TrackList";
import { ReleaseCover } from "@/components/ReleaseCover";
import { releases } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((item) => item.slug === slug);
  if (!release) return { title: "Release not found" };
  return {
    title: release.title,
    description: `${release.title} (${release.year}) — Timet. Tracklist, credits and archive notes.`,
  };
}

export default async function ReleasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = releases.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const release = releases[index];
  const previous = releases[index - 1];
  const next = releases[index + 1];
  const hasTodoDescription = release.description.includes("TODO");

  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-4">
            <ReleaseCover
              release={release}
              sizes="(max-width: 768px) 90vw, 32vw"
              priority
            />
            {release.coverNote && (
              <p className="mono mt-2 max-w-[42ch] text-muted">{release.coverNote}</p>
            )}
          </div>
          <div className="col-span-12 md:col-span-8 md:pl-6">
            <Link href="/releases" className="link-arrow">
              ← Releases
            </Link>
            <p className="eyebrow mt-8">{release.releaseDate ?? release.year} · Timet</p>
            <h1 className="display mt-4">{release.title}</h1>
            {release.sourceTitle && (
              <p className="mono mt-3 text-muted">Published as “{release.sourceTitle}”</p>
            )}

            {hasTodoDescription ? (
              <p className="mt-6 border-l-2 border-highlight bg-surface px-4 py-3 font-code text-sm text-ink-2">
                Description not published on the original page.{" "}
                <span className="ml-1 border border-highlight px-1 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-highlight">
                  verify
                </span>
              </p>
            ) : (
              <p className="prose-editorial mt-6 whitespace-pre-line">{release.description}</p>
            )}

            {release.externalLinks && release.externalLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap items-start gap-3">
                {release.externalLinks.map((link) => (
                  <div key={link.url} className="flex flex-col items-start gap-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-code text-xs uppercase tracking-[0.14em] no-underline hover:border-accent hover:text-accent"
                    >
                      {link.label} ↗
                    </a>
                    {link.note && (
                      <p className="mono mt-2 max-w-[60ch] text-muted">{link.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {(!release.externalLinks || release.externalLinks.length === 0) &&
              release.bandcampStatus && (
                <p className="mono mt-4 text-muted">{release.bandcampStatus}</p>
              )}

            <dl className="mt-8 border-t border-line-strong">
              <div className="grid grid-cols-12 gap-3 border-b border-line py-2.5">
                <dt className="col-span-4 mono uppercase tracking-[0.14em] text-muted">Year</dt>
                <dd className="col-span-8 font-code text-sm">{release.releaseDate ?? release.year}</dd>
              </div>
              <div className="grid grid-cols-12 gap-3 border-b border-line py-2.5">
                <dt className="col-span-4 mono uppercase tracking-[0.14em] text-muted">Tracks</dt>
                <dd className="col-span-8 font-code text-sm">{release.tracks.length > 0 ? release.tracks.length : "Not published"}</dd>
              </div>
              <div className="grid grid-cols-12 gap-3 border-b border-line py-2.5">
                <dt className="col-span-4 mono uppercase tracking-[0.14em] text-muted">Audio</dt>
                <dd className="col-span-8 font-code text-sm">{release.audioFolder ?? "Not published"}</dd>
              </div>
              <div className="grid grid-cols-12 gap-3 border-b border-line py-2.5">
                <dt className="col-span-4 mono uppercase tracking-[0.14em] text-muted">Source</dt>
                <dd className="col-span-8 font-code text-sm">{release.sourcePage}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Tracklist</p>
            <h2 className="display-sm mt-4">Contents</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {release.tracks.length > 0 ? (
              <TrackList tracks={release.tracks} showDiscs={release.slug === "on-zarathustra" || release.slug === "nova-compilatione"} />
            ) : (
              <p className="border-l-2 border-highlight bg-surface px-4 py-3 font-code text-sm text-ink-2">
                {release.tracklistStatus ?? "Tracklist not published."}
              </p>
            )}
            {release.sectionDurations && (
              <dl className="mt-6 border-t border-line">
                {Object.entries(release.sectionDurations).map(([section, duration]) => (
                  <div key={section} className="grid grid-cols-12 gap-3 border-b border-line py-2">
                    <dt className="col-span-8 font-code text-sm text-ink-2">{section}</dt>
                    <dd className="col-span-4 text-right font-code text-sm text-muted">{duration}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Credits</p>
            <h2 className="display-sm mt-4">Line-up</h2>
            {release.composerLegend && (
              <dl className="mt-6 border-t border-line">
                {Object.entries(release.composerLegend).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-12 gap-2 border-b border-line py-1.5">
                    <dt className="col-span-4 font-code text-xs text-muted">{key}</dt>
                    <dd className="col-span-8 font-code text-xs text-ink-2">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="col-span-12 md:col-span-9">
            {release.lineup.length > 0 ? (
              <ul className="border-t border-line-strong">
                {release.lineup.map((person) => (
                  <li
                    key={`${person.name}-${person.role}`}
                    className="grid grid-cols-12 gap-3 border-b border-line py-2.5"
                  >
                    <span className="col-span-5 font-grotesk font-bold tracking-[-0.02em]">
                      {person.name}
                    </span>
                    <span className="col-span-7 text-sm text-ink-2">{person.role}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-l-2 border-highlight bg-surface px-4 py-3 font-code text-sm text-ink-2">
                {release.lineupNote ?? "Line-up not published."}
              </p>
            )}
            {release.creditsNotes && release.creditsNotes.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow">Notes</p>
                <div className="mt-3 space-y-2">
                  {release.creditsNotes.map((note) => (
                    <p key={note} className="max-w-[70ch] text-sm text-ink-2">{note}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {(release.audioNote || release.anomalies?.length) && (
        <section className="border-b border-line">
          <div className="shell grid12 gap-y-4 py-8">
            <p className="col-span-12 md:col-span-3 eyebrow">Archive notes</p>
            <div className="col-span-12 space-y-3 md:col-span-9">
              {release.audioNote && <p className="text-sm text-ink-2">{release.audioNote}</p>}
              {release.anomalies?.map((anomaly) => (
                <p key={anomaly} className="border-l-2 border-highlight bg-surface px-4 py-3 font-code text-xs text-ink-2">
                  {anomaly}
                </p>
              ))}
              {release.audioFolder && (
                <p className="mono text-muted">
                  Audio source: {release.audioFolder}. Files are held on external storage, not in this repository.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Release navigation" className="shell grid12 gap-4 py-8">
        <div className="col-span-6">
          {previous && (
            <Link href={`/releases/${previous.slug}`} className="link-arrow">
              ← {previous.title}
            </Link>
          )}
        </div>
        <div className="col-span-6 text-right">
          {next && (
            <Link href={`/releases/${next.slug}`} className="link-arrow">
              {next.title} →
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
