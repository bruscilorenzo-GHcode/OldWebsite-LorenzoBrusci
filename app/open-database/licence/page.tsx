import type { Metadata } from "next";
import Link from "next/link";
import { InlineText } from "@/components/Markdown";
import {
  licenceDefinitions,
  licenceIntro,
  licenceStatus,
  pageCopyBlocks,
} from "@/lib/licence";

export const metadata: Metadata = {
  title: "Licence",
  description:
    "Timet Open Sound Object Licence v1.0 (TOSOL-1.0): granted uses, reserved rights, attribution and machine-readable reservation.",
};

export default function LicencePage() {
  const title =
    pageCopyBlocks
      .find((block) => block.startsWith("**Timet Open Sound Object Licence"))
      ?.replace(/\*\*/g, "") ?? "Timet Open Sound Object Licence";
  const body = licenceIntro;
  const statusDetail = licenceStatus.match(/Full text:.*$/)?.[0] ?? "";

  return (
    <div className="pb-16">
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Licence · TOSOL-1.0</p>
            <h1 className="display mt-4 max-w-[16ch]">{title}</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-14">
            <div className="border-y border-line-strong py-4">
              <p className="mono uppercase tracking-[0.16em] text-highlight">
                Status
              </p>
              <p className="mt-2 font-grotesk text-xl font-bold tracking-[-0.03em]">
                Pending legal review
              </p>
              {statusDetail && (
                <p className="mt-2 text-sm text-ink-2">{statusDetail}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-4 py-10 md:py-14">
          <div className="col-span-12 space-y-5 md:col-span-8 md:col-start-4">
            {body.map((paragraph) => (
              <p key={paragraph} className="prose-editorial">
                <InlineText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Licence definitions" className="border-b border-line">
        <div className="shell">
          {licenceDefinitions.map((definition) => (
            <div
              key={definition.label}
              className="grid12 gap-y-2 border-b border-line py-6 last:border-b-0"
            >
              <dt className="col-span-12 md:col-span-3">
                <span className="mono uppercase tracking-[0.16em] text-highlight">
                  {definition.label}
                </span>
              </dt>
              <dd className="col-span-12 text-sm leading-relaxed text-ink-2 md:col-span-9">
                <InlineText text={definition.body} />
              </dd>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 items-center gap-y-4 py-8">
          <div className="col-span-12 md:col-span-8">
            <p className="mono uppercase tracking-[0.16em] text-muted">
              Full legal text
            </p>
            <p className="mt-2 text-sm text-ink-2">
              The complete TOSOL-1.0 text, including definitions, conditions and
              termination.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link href="/open-database/licence/full" className="link-arrow">
              Read TOSOL-1.0
            </Link>
          </div>
        </div>
      </section>

      <section className="shell grid12 py-8">
        <p className="col-span-12 text-sm text-ink-2 md:col-span-8 md:col-start-4">
          The reservation is deliberate. Timet licenses commercial and AI uses on
          request. Write to{" "}
          <a href="mailto:info@musi-co.com">info@musi-co.com</a>.
        </p>
      </section>
    </div>
  );
}
