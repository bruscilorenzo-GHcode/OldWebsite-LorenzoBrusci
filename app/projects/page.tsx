import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/Prose";
import method from "@/content/method.json";
import { mainProjects, summary } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Timet research and works: nonlinear composition, hyper-classicism, immersion, performative projects, sonic architecture, open database, video.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Deepening Timet</p>
            <h1 className="display mt-4">Works &amp; research</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-4">
            <p className="prose-editorial">
              Eight fields of application, from nonlinear composition to sonic architecture.
              Each opens onto its works, sound examples, galleries and videos.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Fields of application" className="border-b border-line">
        <div className="shell grid gap-px border-x border-line bg-line md:grid-cols-2">
          {mainProjects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="group block bg-bg p-6 no-underline hover:bg-surface">
              <p className="font-code text-sm text-highlight">{p.id}</p>
              <h2 className="mt-2 font-grotesk text-2xl font-bold leading-tight tracking-[-0.04em]">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{summary(p)}</p>
              <p className="mono mt-4 uppercase tracking-[0.14em] text-muted group-hover:text-accent">
                {p.media.galleries.length > 0 && `${p.media.galleries.length} galleries · `}
                {p.media.videos.length > 0 && `${p.media.videos.length} video · `}
                open →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Pre-conditions</p>
            <h2 className="display-sm mt-4">Method</h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <Prose text={method.markdown} />
          </div>
        </div>
      </section>
    </>
  );
}
