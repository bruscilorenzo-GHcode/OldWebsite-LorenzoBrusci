import type { Metadata } from "next";
import { OpenDatabaseClient } from "@/components/OpenDatabaseClient";

export const metadata: Metadata = {
  title: "Open database",
  description:
    "Timet Open Sound Database. Individual sound objects, filterable by type, year, source project and tag.",
};

export default function OpenDatabasePage() {
  return <OpenDatabaseClient />;
}
