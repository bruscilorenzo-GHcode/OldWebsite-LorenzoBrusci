import type { Metadata } from "next";
import { canonicalContact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Timet: commissions, publishing, guest composers and performative projects.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-4">Write to us.</h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-2">
              Commissions, publishing, guest composers and performative
              projects.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <p className="mono uppercase tracking-[0.16em] text-muted">
              {canonicalContact.canonical.label}
            </p>
            <a
              href={`mailto:${canonicalContact.canonical.email}`}
              className="mt-2 inline-block font-grotesk text-2xl font-bold tracking-[-0.03em] text-ink no-underline hover:text-accent"
            >
              {canonicalContact.canonical.email}
            </a>
            <p className="mt-4 text-sm text-ink-2">
              {canonicalContact.replacementPolicy}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Legacy contacts</p>
            <h2 className="display-sm mt-4">Provenance</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {canonicalContact.legacy.entries.map((entry) => (
              <div
                key={`${entry.role}-${entry.email}`}
                className="grid grid-cols-12 gap-3 border-t border-line py-3 last:border-b"
              >
                <p className="col-span-12 font-code text-[0.68rem] uppercase tracking-[0.14em] text-muted md:col-span-3">
                  {entry.status === "defunct" ? "Defunct" : "Legacy"}
                </p>
                <p className="col-span-12 text-sm text-ink-2 md:col-span-5">{entry.role}</p>
                <p className="col-span-12 font-code text-sm text-ink-2 md:col-span-4">
                  {entry.name} · {entry.email}
                </p>
              </div>
            ))}
            <p className="mt-6 max-w-[80ch] text-sm text-ink-2">
              Addresses published between 2004 and 2014 are reproduced for
              provenance. Every <span className="font-code">@timet.org</span>{" "}
              address is defunct; use the canonical address above.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
