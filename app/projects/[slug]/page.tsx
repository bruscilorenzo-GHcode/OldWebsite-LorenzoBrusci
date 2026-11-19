import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { MEDIA_BASE, appendixFor, bySlug, mainProjects, performativeSubs } from "@/lib/projects";

export function generateStaticParams() {
  return mainProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  return p ? { title: p.title } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();
  const idx = mainProjects.findIndex((p) => p.slug === slug);
  const prev = mainProjects[idx - 1], next = mainProjects[idx + 1];
  const appendix = appendixFor(project.id);
  const subs = project.id === "04" ? performativeSubs : [];

  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-4 py-10 md:py-14">
          <div className="col-span-12 md:col-span-9">
            <Link href="/projects" className="link-arrow">← Works &amp; research</Link>
            <p className="eyebrow mt-8">Field {project.id}</p>
            <h1 className="display-sm mt-3 max-w-[22ch]">{project.title}</h1>
          </div>
        </div>
      </section>

      <div className="shell grid12 gap-y-10 py-10 md:py-14">
        <nav aria-label="Fields" className="col-span-12 md:col-span-3">
          <ol className="border-t border-line-strong">
            {mainProjects.map((p) => (
              <li key={p.id} className="border-b border-line">
                <Link
                  href={`/projects/${p.slug}`}
                  aria-current={p.slug === slug ? "page" : undefined}
                  className={`block py-2 text-sm no-underline ${p.slug === slug ? "text-highlight" : "text-ink-2 hover:text-accent"}`}
                >
                  <span className="font-code mr-2 text-muted">{p.id}</span>{p.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <article className="col-span-12 max-w-[78ch] md:col-span-8 md:col-start-5">
          <Prose text={project.markdown} />

          {subs.length > 0 && (
            <section className="mt-12" aria-label="Works">
              <p className="eyebrow">Works · {subs.length}</p>
              <ul className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
                {subs.map((s) => (
                  <li key={s.id} className="bg-bg">
                    <Link href={`/projects/performative/${s.id}`} className="block p-4 no-underline hover:bg-surface">
                      <span className="font-code text-xs text-highlight">{s.id.replace("_", ".")}</span>
                      <span className="mt-1 block font-grotesk text-lg font-bold tracking-[-0.03em]">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.media.galleries.map((g) => (
            <section key={g.key} id={`gallery-${g.key}`} className="mt-12 scroll-mt-24">
              <p className="eyebrow">Gallery · {g.title}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {g.images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt={`${g.title}, image ${i + 1}`} loading="lazy" className="w-full border border-line" />
                ))}
              </div>
            </section>
          ))}

          {project.media.videos.map((v) => (
            <section key={v.key} id={`video-${v.key}`} className="mt-12 scroll-mt-24">
              <p className="eyebrow">Video · {v.key}</p>
              {v.files.map((f) => (
                <video key={f} controls preload="none" className="mt-4 w-full max-w-[640px] border border-line">
                  <source src={`${MEDIA_BASE}video/${encodeURIComponent(f)}`} />
                  <a href={`${MEDIA_BASE}video/${encodeURIComponent(f)}`}>Download {f}</a>
                </video>
              ))}
            </section>
          ))}

          {appendix && (
            <section id="excerpt" className="mt-12 scroll-mt-24 border-t border-line pt-8">
              <p className="eyebrow">Excerpt · {appendix.title}</p>
              <div className="mt-4"><Prose text={appendix.markdown} /></div>
            </section>
          )}

          <nav aria-label="Previous and next" className="mt-16 flex justify-between border-t border-line pt-6">
            {prev ? <Link href={`/projects/${prev.slug}`} className="link-arrow">← {prev.title}</Link> : <span />}
            {next ? <Link href={`/projects/${next.slug}`} className="link-arrow">{next.title} →</Link> : <span />}
          </nav>
        </article>
      </div>
    </>
  );
}
