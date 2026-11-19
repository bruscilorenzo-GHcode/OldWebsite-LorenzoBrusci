import type { Metadata } from "next";
import Link from "next/link";
import { articles, events } from "@/lib/content";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Legacy Timet archive: writings, documents, photographic inventories and held material.",
};

const textArticles = articles.filter((article) => article.type !== "pdf");
const pdfArticles = articles.filter((article) => article.type === "pdf");

const photographicInventory = [
  { collection: "Ri.Natura", files: 151, source: "events/Rinaturagallery" },
  { collection: "Villa Strozzi", files: 35, source: "events/strozzigallery" },
  { collection: "Orto Abitato", files: 24, source: "events/ortoprogress" },
  { collection: "Rotte Metropolitane", files: 13, source: "events/Rottemetrgallery" },
  { collection: "Flesh for Fantasy", files: 10, source: "events/fleshgallery" },
  { collection: "Densa", files: 9, source: "events/densagallery" },
  { collection: "Dance", files: 9, source: "events/dancegallery" },
  { collection: "Capezzana", files: 8, source: "events/capezzana" },
  { collection: "Kraft", files: 6, source: "events/kraft" },
];

export default function ArchivePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Legacy material · register paper</p>
            <h1 className="display mt-4">Archive</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-4">
            <p className="prose-editorial text-ink-2">
              An index of the material recovered from the original timet.org
              server. This is an archive register, not a curated exhibition.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-6 py-4">
          <p className="col-span-12 font-code text-xs uppercase tracking-[0.16em] text-accent">
            What this page is
          </p>
          <p className="col-span-12 max-w-[80ch] text-sm text-ink-2 md:col-span-9">
            The legacy site was a FrontPage and Classic ASP application. The
            material below is reproduced or indexed from that backup. Nothing
            was rewritten. Items that could not be verified are marked
            <span className="ml-1 border border-highlight px-1 py-0.5 font-code text-[0.62rem] uppercase tracking-[0.12em] text-ink">
              verify
            </span>
            rather than reconstructed.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Writings</p>
            <h2 className="display-sm mt-4">Articles</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {textArticles.map((article) => {
              const lead =
                article.bodyText.split(/\n\s*\n/).find((block) => block.trim()) ?? "";
              return (
                <article
                  key={article.slug}
                  className="border-t border-line py-5 last:border-b"
                >
                  <h3 className="font-grotesk text-xl font-bold tracking-[-0.03em]">
                    <Link href={`/archive/articles/${article.sourcePage.replace(/^articles\//, "").replace(/\.htm$/, "")}`} className="no-underline hover:text-accent">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mono mt-1 text-muted">Read the full text →</p>
                  <p className="mt-3 max-w-[80ch] text-sm leading-relaxed text-ink-2">
                    {lead}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Events &amp; installations · {events.length}</p>
            <h2 className="display-sm mt-4">Events</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {events.map((event) => {
              const slug = event.sourcePage.replace(/^events\//, "").replace(/\.htm$/, "");
              return (
                <Link key={event.slug} href={`/archive/events/${slug}`} className="grid grid-cols-12 gap-3 border-t border-line py-3 no-underline last:border-b hover:bg-surface">
                  <span className="col-span-2 font-code text-sm text-highlight">{event.year}</span>
                  <span className="col-span-10 font-grotesk text-lg font-bold tracking-[-0.03em]">
                    {event.title}
                    <span className="mono ml-3 text-muted">{event.location}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Documents</p>
            <h2 className="display-sm mt-4">PDF</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {pdfArticles.map((document) => (
              <div
                key={document.slug}
                className="grid grid-cols-12 gap-3 border-t border-line py-3 last:border-b"
              >
                <p className="col-span-2 font-code text-xs text-highlight">PDF</p>
                <div className="col-span-10">
                  <p className="font-grotesk text-base font-bold tracking-[-0.02em]">
                    {document.title}
                  </p>
                  <p className="mono mt-1 text-muted">{document.sourcePage}</p>
                </div>
              </div>
            ))}
            <p className="mt-6 max-w-[80ch] text-sm text-ink-2">
              The backup also holds 19 Giardino Sonoro / La Limonaia documents
              and four Word press files. They belong to a separate project and
              are indexed, not reproduced here.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Visual archive</p>
            <h2 className="display-sm mt-4">Photographs</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <table className="w-full border-collapse font-code text-sm">
              <tbody>
                {photographicInventory.map((item) => (
                  <tr key={item.collection} className="border-t border-line">
                    <td className="py-2.5 pr-3">{item.collection}</td>
                    <td className="py-2.5 pr-3 text-right text-muted">{item.files} files</td>
                    <td className="hidden py-2.5 text-right text-muted md:table-cell">
                      {item.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[80ch] text-sm text-ink-2">
              A total of 287 event photographs and 74 project-gallery images are
              held in the backup. The inventory lists collections, not a curated
              selection. Large originals stay outside the repository.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Held material</p>
            <h2 className="display-sm mt-4">Not published</h2>
          </div>
          <div className="col-span-12 space-y-4 md:col-span-9">
            <p className="max-w-[80ch] text-sm text-ink-2">
              Masters remain in the original Pro Tools and Kyma sessions. Seven
              Access databases hold member, news and forum records and are not
              public. Thirty-one Flash files have no runtime and are not served.
              Eight hundred and twenty-nine MP3 files are held on external
              storage, not in this repository.
            </p>
            <p className="max-w-[80ch] text-sm text-ink-2">
              What is not available is stated as clearly as what is. See the{" "}
              <a href="/open-database/licence">open database licence</a> for the
              published objects and their reservations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
