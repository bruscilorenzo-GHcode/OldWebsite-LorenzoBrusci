import type { Metadata } from "next";
import Link from "next/link";
import { OpenDatabaseClient } from "@/components/OpenDatabaseClient";

export const metadata: Metadata = {
  title: "Open database",
  description:
    "Timet Open Sound Database. Individual sound objects, filterable by type, year, source project and tag.",
};

export default function OpenDatabasePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="mono uppercase tracking-[0.14em] text-muted">Full catalogue · 543 samples</p>
          <Link href="/open-database/samples" className="link-arrow">Browse the complete timet.database</Link>
        </div>
      </div>
      <OpenDatabaseClient />
    </>
  );
}
