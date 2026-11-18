import type { Metadata } from "next";
import { EditorialText } from "@/components/EditorialText";
import { preconditions, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Timet research: nonlinear composition, hyper-classicism, sonic architecture, sound objects, open database and video.",
};

const main = projects.filter(
  (project) => !project.id.startsWith("app") && !project.id.includes("_"),
);
const appendices = projects.filter(
  (project) => project.id.startsWith("app") || project.id.includes("_"),
);

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
              The conceptual and methodological essays behind the collective:
              nonlinearity, sound architecture, performative projects and the
              open database.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Pre-conditions</p>
            <h2 className="display-sm mt-4">Info-structure</h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <EditorialText text={preconditions.bodyText} />
          </div>
        </div>
      </section>

      <section aria-label="Fields of application">
        {main.map((project) => (
          <article key={project.id} id={project.id} className="scroll-mt-24 border-b border-line">
            <div className="shell grid12 gap-y-5 py-10 md:py-12">
              <div className="col-span-12 md:col-span-3">
                <p className="font-code text-sm text-highlight">{project.id}</p>
                <h2 className="mt-2 font-grotesk text-2xl font-bold leading-tight tracking-[-0.04em]">
                  {project.title}
                </h2>
                <p className="mono mt-3 text-muted">{project.sourcePage}</p>
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-5">
                <EditorialText text={project.bodyText} />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-surface">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Appendices</p>
            <h2 className="display-sm mt-4">Excerpts</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {appendices.map((project) => {
              const lead =
                project.bodyText.split("\n").find((line) => line.trim()) ?? "";
              return (
                <article
                  key={project.id}
                  className="grid grid-cols-12 gap-3 border-t border-line py-3 last:border-b"
                >
                  <p className="col-span-2 font-code text-xs text-highlight">{project.id}</p>
                  <div className="col-span-10">
                    <h3 className="font-grotesk text-base font-bold tracking-[-0.02em]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-2">{lead}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
