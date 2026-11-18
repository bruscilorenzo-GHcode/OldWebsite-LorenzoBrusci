import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licence",
  description:
    "Timet open database, texts and audio are licensed under Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0).",
};

const CC = "https://creativecommons.org/licenses/by-nc/4.0/";

const terms: { label: string; body: string }[] = [
  {
    label: "You may",
    body: "Share, copy and redistribute the material in any medium or format, and adapt, remix and build upon it.",
  },
  {
    label: "Attribution",
    body: "Give appropriate credit to Lorenzo Brusci / Timet (timet.org), provide a link to the licence and indicate if changes were made.",
  },
  {
    label: "NonCommercial",
    body: "You may not use the material for commercial purposes.",
  },
  {
    label: "No further restrictions",
    body: "You may not apply legal terms or technological measures that legally restrict others from doing anything the licence permits.",
  },
];

export default function LicencePage() {
  return (
    <div className="pb-16">
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Licence · CC BY-NC 4.0</p>
            <h1 className="display mt-4 max-w-[16ch]">
              Creative Commons Attribution-NonCommercial 4.0
            </h1>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-4 py-10 md:py-14">
          <div className="col-span-12 space-y-5 md:col-span-8 md:col-start-4">
            <p className="prose-editorial">
              The Timet open database, the audio objects, the texts and the
              interviews published on this site are licensed under CC BY-NC 4.0.
              Use them, study them, remix them, always crediting the author and
              never for commercial purposes.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Licence terms" className="border-b border-line">
        <div className="shell">
          {terms.map((term) => (
            <div
              key={term.label}
              className="grid12 gap-y-2 border-b border-line py-6 last:border-b-0"
            >
              <dt className="col-span-12 md:col-span-3">
                <span className="mono uppercase tracking-[0.16em] text-highlight">
                  {term.label}
                </span>
              </dt>
              <dd className="col-span-12 text-sm leading-relaxed text-ink-2 md:col-span-9">
                {term.body}
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
              The complete licence is published by Creative Commons.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <a href={`${CC}legalcode`} className="link-arrow">
              Read CC BY-NC 4.0
            </a>
          </div>
        </div>
      </section>

      <section className="shell grid12 py-8">
        <p className="col-span-12 text-sm text-ink-2 md:col-span-8 md:col-start-4">
          Commercial and AI uses are not covered by this licence and are
          licensed on request. Write to{" "}
          <a href="mailto:info@musi-co.com">info@musi-co.com</a>.
        </p>
      </section>
    </div>
  );
}
