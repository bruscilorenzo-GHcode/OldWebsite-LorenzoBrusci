import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { performativeSubs, subById } from "@/lib/projects";

export function generateStaticParams() {
  return performativeSubs.map((s) => ({ sub: s.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ sub: string }> }): Promise<Metadata> {
  const { sub } = await params;
  const s = subById(sub);
  return s ? { title: `${s.title} · Performative projects` } : {};
}

export default async function PerformativeSubPage({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const page = subById(sub);
  if (!page) notFound();
  const i = performativeSubs.findIndex((s) => s.id === sub);
  const prev = performativeSubs[i - 1], next = performativeSubs[i + 1];
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 py-10 md:py-14">
          <div className="col-span-12 md:col-span-9">
            <Link href="/projects/performative" className="link-arrow">← Performative projects</Link>
            <p className="eyebrow mt-8">Work {page.id.replace("_", ".")}</p>
            <h1 className="display-sm mt-3">{page.title}</h1>
          </div>
        </div>
      </section>
      <div className="shell grid12 py-10 md:py-14">
        <article className="col-span-12 max-w-[78ch] md:col-span-8 md:col-start-4">
          <Prose text={page.markdown} />
          <nav aria-label="Previous and next" className="mt-16 flex justify-between border-t border-line pt-6">
            {prev ? <Link href={`/projects/performative/${prev.id}`} className="link-arrow">← {prev.title}</Link> : <span />}
            {next ? <Link href={`/projects/performative/${next.id}`} className="link-arrow">{next.title} →</Link> : <span />}
          </nav>
        </article>
      </div>
    </>
  );
}
