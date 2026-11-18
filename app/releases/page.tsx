import type { Metadata } from "next";
import Link from "next/link";
import { additionalReleases, releases } from "@/lib/content";
import { ReleaseCover } from "@/components/ReleaseCover";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Timet discography: Cicli di sintesi, Quadri di schermo vivo, Colazione con la Pietra, La Via Negativa, Shadows, Restituzioni, Carne Capitata, On Zarathustra.",
};

export default function ReleasesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Catalogue · 1996–2006</p>
            <h1 className="display mt-4">Discography</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-4">
            <p className="prose-editorial">
              Fourteen releases, with tracklists, durations and musician credits
              recovered from the original pages where published.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-10 md:py-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {releases.map((release) => (
              <Link
                key={release.slug}
                href={`/releases/${release.slug}`}
                className="group border border-line bg-surface p-3 no-underline md:p-4"
              >
                <ReleaseCover
                  release={release}
                  sizes="(max-width: 768px) 45vw, 30vw"
                />
                <p className="mono mt-4 text-highlight">{release.year}</p>
                <h2 className="mt-1 font-grotesk text-lg font-bold leading-tight tracking-[-0.03em] text-ink group-hover:text-accent">
                  {release.title}
                </h2>
                <p className="mono mt-2 text-muted">{release.tracks.length > 0 ? `${release.tracks.length} tracks` : "No tracklist published"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Also in the archive</p>
            <h2 className="display-sm mt-4">Further releases</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {additionalReleases.map((release, index) => (
              <article
                key={release.slug}
                className="grid grid-cols-12 gap-3 border-t border-line py-4 last:border-b"
              >
                <p className="col-span-2 font-code text-sm text-highlight">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="col-span-10">
                  <h3 className="font-grotesk text-lg font-bold tracking-[-0.03em]">
                    {release.title}
                  </h3>
                  <p className="mono mt-1 text-muted">
                    {release.year} · {release.sourcePage}
                  </p>
                  <p className="mt-2 text-sm text-ink-2">{release.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell grid12 py-8">
        <p className="col-span-12 md:col-span-8 md:col-start-4 text-sm text-ink-2">
          Audio files are not stored in this repository. Listening links, where
          published, are on each release page. The full catalogue remains
          metadata-complete.
        </p>
      </section>
    </>
  );
}
