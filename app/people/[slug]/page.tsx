import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { people, personBySlug } from "@/lib/people";

export function generateStaticParams() { return people.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = personBySlug(slug);
  return p ? { title: p.name, description: (p.cv ?? p.originalBio ?? "").slice(0, 160) } : {};
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = personBySlug(slug);
  if (!p) notFound();
  const same = people.filter((x) => x.group === p.group);
  const i = same.findIndex((x) => x.slug === slug);
  const prev = same[i - 1], next = same[i + 1];
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 py-10 md:py-14">
          <div className="col-span-12 md:col-span-9">
            <Link href="/people" className="link-arrow">← Members &amp; collaborators</Link>
            <p className="eyebrow mt-8">
              {p.guestComposer ? `Collaborator · guest composer ${p.guestComposer}` : p.group === "member" ? "Member" : "Collaborator"}
            </p>
            <h1 className="display-sm mt-3">{p.name}</h1>
          </div>
        </div>
      </section>
      <div className="shell grid12 py-10 md:py-14">
        <article className="col-span-12 max-w-[72ch] md:col-span-8 md:col-start-4">
          {p.cv && <p className="prose-editorial">{p.cv}</p>}
          {p.sources.length > 0 && (
            <p className="mt-4 text-sm text-ink-2">
              Sources:{" "}
              {p.sources.map((s, k) => (
                <span key={s.url}>{k > 0 && " · "}<a href={s.url} target="_blank" rel="noopener">{s.label}</a></span>
              ))}
              {p.website && <> · <a href={p.website} target="_blank" rel="noopener">Official site ↗</a></>}
            </p>
          )}
          {p.originalBio && (
            <section className="mt-10 border-t border-line pt-6">
              <p className="eyebrow">From the original timet.org{p.originalSource ? ` · ${p.originalSource}` : ""}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{p.originalBio}</p>
            </section>
          )}
          {!p.cv && !p.originalBio && (
            <p className="text-ink-2">No biography was published for this person on the original site.</p>
          )}
          <nav aria-label="Previous and next" className="mt-16 flex justify-between border-t border-line pt-6">
            {prev ? <Link href={`/people/${prev.slug}`} className="link-arrow">← {prev.name}</Link> : <span />}
            {next ? <Link href={`/people/${next.slug}`} className="link-arrow">{next.name} →</Link> : <span />}
          </nav>
        </article>
      </div>
    </>
  );
}
