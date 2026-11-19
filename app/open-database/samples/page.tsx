import type { Metadata } from "next";
import Link from "next/link";
import { SamplesClient } from "@/components/SamplesClient";

export const metadata: Metadata = {
  title: "Sample catalogue",
  description: "timet.database: 543 sample elaborations (1996–2003), searchable and playable. CC BY-NC 4.0.",
};

export default function SamplesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <Link href="/open-database" className="link-arrow">← Open database</Link>
            <p className="eyebrow mt-8">timet.database · 1996–2003</p>
            <h1 className="display mt-4">Sample catalogue</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-12">
            <p className="prose-editorial">
              543 sample elaborations from the original open database. Search, listen and download:
              audio is hosted by the Internet Archive.
            </p>
            <p className="mt-4 text-sm text-ink-2">
              Data: <a href="/timet-database.csv">CSV</a> ·{" "}
              <a href="https://doi.org/10.5281/zenodo.24355801" rel="noopener">Zenodo DOI</a> ·{" "}
              <Link href="/open-database/licence">CC BY-NC 4.0</Link>
            </p>
          </div>
        </div>
      </section>
      <SamplesClient />
    </>
  );
}
