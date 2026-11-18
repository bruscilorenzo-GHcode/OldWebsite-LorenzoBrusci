import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(
  path.join(process.cwd(), "content/licence/tosol-1.0.md"),
  "utf8",
);

const marker = "# PAGE COPY — /open-database/licence";
const markerIndex = source.indexOf(marker);

export const legalMarkdown =
  markerIndex === -1 ? source.trim() : source.slice(0, markerIndex).trim();

const pageRaw = markerIndex === -1 ? "" : source.slice(markerIndex + marker.length);

export const pageCopyBlocks: string[] = (() => {
  const blocks: string[] = [];
  let current: string[] = [];
  for (const rawLine of pageRaw.split("\n")) {
    const line = rawLine.replace(/^>\s?/, "").trim();
    if (!line) {
      if (current.length) {
        blocks.push(current.join(" "));
        current = [];
      }
      continue;
    }
    current.push(line);
  }
  if (current.length) blocks.push(current.join(" "));
  return blocks;
})();

export interface LicenceDefinition {
  label: string;
  body: string;
}

export const licenceDefinitions: LicenceDefinition[] = pageCopyBlocks
  .map((block) => {
    const match = block.match(/^\*\*(.+?)\*\*\s*—\s*([\s\S]*)$/);
    return match ? { label: match[1], body: match[2] } : null;
  })
  .filter((value): value is LicenceDefinition => value !== null);

export const licenceIntro = pageCopyBlocks.filter(
  (block) => !block.startsWith("**") && !block.startsWith("Status:"),
);

export const licenceStatus =
  pageCopyBlocks.find((block) => block.startsWith("Status:")) ??
  "Status: pending legal review.";
