import Link from "next/link";
import { projects, releases } from "@/lib/content";
import { ReleaseCover } from "@/components/ReleaseCover";

const coreSlugs = new Set([
  "cicli-di-sintesi",
  "quadri-di-schermo-vivo",
  "colazione-con-la-pietra",
  "shadows-ombre",
  "la-via-negativa",
  "restituzioni",
  "carne-capitata",
  "on-zarathustra",
]);

const featured = releases.filter((release) => coreSlugs.has(release.slug));
const selectedProjects = projects.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-10 py-14 md:py-24">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Concept group · Firenze · 1993–2003</p>
            <h1 className="display mt-6 max-w-[13ch]">
              Nonlinear music and sound architecture.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-20">
            <p className="prose-editorial">
              Lorenzo Brusci (1966) founded the concept group Timet in 1993.
              They have been composing music for theatre, dance, television,
              radio, and sound installations.
            </p>
            <p className="prose-editorial mt-5">
              Our main efforts include the evolution of compositional and
              performing techniques for nonlinear music and sound architecture.
              We support the open data philosophy for the distribution of
              intellectual objects, including final compositions, single audio
              elements, and electronic partitures.
            </p>
            <Link href="/about" className="link-arrow mt-6 inline-flex">
              Read the collective
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Period" className="border-b border-line bg-surface">
        <div className="shell grid12 items-center py-4">
          <p className="col-span-4 font-code text-sm text-muted">1993</p>
          <div className="col-span-4 h-px bg-line-strong" />
          <p className="col-span-4 text-right font-code text-sm text-muted">2003</p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Selected releases</p>
            <h2 className="display-sm mt-4">Discography</h2>
            <Link href="/releases" className="link-arrow mt-6 inline-flex">
              All releases
            </Link>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {featured.map((release) => (
                <Link
                  key={release.slug}
                  href={`/releases/${release.slug}`}
                  className="group bg-surface p-3 no-underline"
                >
                  <ReleaseCover
                    release={release}
                    sizes="(max-width: 768px) 45vw, 22vw"
                  />
                  <p className="mono mt-3 text-highlight">{release.year}</p>
                  <p className="mt-1 font-grotesk font-bold leading-tight tracking-[-0.03em] text-ink group-hover:text-accent">
                    {release.title}
                  </p>
                  <p className="mono mt-1 text-muted">{release.tracks.length} tracks</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Selected projects</p>
            <h2 className="display-sm mt-4">Works</h2>
            <Link href="/projects" className="link-arrow mt-6 inline-flex">
              All projects
            </Link>
          </div>
          <div className="col-span-12 md:col-span-9">
            {selectedProjects.map((project) => (
              <article
                key={project.id}
                className="grid grid-cols-12 gap-4 border-t border-line py-4 last:border-b"
              >
                <p className="col-span-2 font-code text-sm text-highlight">{project.id}</p>
                <div className="col-span-10">
                  <h3 className="font-grotesk text-xl font-bold tracking-[-0.03em]">
                    {project.title}
                  </h3>
                  <p className="mono mt-1 text-muted">{project.sourcePage}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 items-end gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Open sound database</p>
            <h2 className="display-sm mt-4 max-w-[18ch]">
              Individual sound objects, open for non-commercial use.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link href="/open-database" className="link-arrow inline-flex">
              Enter the database
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
