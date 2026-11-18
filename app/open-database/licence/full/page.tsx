import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { legalMarkdown } from "@/lib/licence";

export const metadata: Metadata = {
  title: "TOSOL-1.0 — full text",
  description:
    "Full text of the Timet Open Sound Object Licence v1.0. Draft pending legal review.",
};

export default function FullLicencePage() {
  return (
    <div className="pb-16">
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-4 py-10">
          <div className="col-span-12 md:col-span-8">
            <Link href="/open-database/licence" className="link-arrow">
              ← Licence
            </Link>
            <p className="eyebrow mt-8">Full legal text</p>
            <h1 className="display-sm mt-3">TOSOL-1.0</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-16">
            <p className="border-l-2 border-highlight pl-3 font-code text-xs uppercase tracking-[0.14em] text-highlight">
              Pending legal review
            </p>
          </div>
        </div>
      </section>

      <section className="shell grid12 py-10">
        <article className="col-span-12 max-w-[78ch] md:col-span-9 md:col-start-3">
          <Markdown text={legalMarkdown} />
        </article>
      </section>
    </div>
  );
}
