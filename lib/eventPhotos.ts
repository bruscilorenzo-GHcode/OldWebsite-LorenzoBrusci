import photos from "@/content/event-photos.json";

type Entry = { file: string; w: number; h: number };
const data = photos as Record<string, Entry[]>;
const IA = "https://archive.org/download/timet-events-photos/";

/** event page stem -> gallery folders (+ optional subfolder; "" = top level only) */
const MAP: Record<string, { folder: string; sub?: string }[]> = {
  rinatura: [{ folder: "Rinaturagallery", sub: "" }, { folder: "Rinaturagallery", sub: "obj" }],
  rinatura_night: [{ folder: "Rinaturagallery", sub: "night" }],
  rinaturaprogressnight: [{ folder: "Rinaturagallery", sub: "night" }],
  rinaturaprogress: [{ folder: "Rinaturagallery", sub: "progress" }],
  strozziprogress: [{ folder: "strozzigallery", sub: "" }],
  ortoprogress: [{ folder: "ortoprogress", sub: "" }],
  orto: [{ folder: "ortoprogress", sub: "" }],
  rottemetr: [{ folder: "Rottemetrgallery", sub: "" }],
  flesh: [{ folder: "fleshgallery", sub: "" }],
  densa: [{ folder: "densagallery", sub: "" }],
  capezz: [{ folder: "capezzana", sub: "" }],
  park_palace: [{ folder: "kraft", sub: "" }],
  hic: [{ folder: "dancegallery", sub: "" }],
  stanza: [{ folder: "dancegallery", sub: "" }],
};
const enc = (p: string) => p.split("/").map(encodeURIComponent).join("/");

export interface Photo { thumb: string; full: string; w: number; h: number; alt: string }
export function photosFor(stem: string): Photo[] {
  const out: Photo[] = [];
  for (const { folder, sub } of MAP[stem] ?? []) {
    for (const e of data[folder] ?? []) {
      const first = e.file.includes("/") ? e.file.split("/")[0] : "";
      if (first === "thumbs") continue;
      if ((sub ?? "") !== first) continue;
      const path = `${folder}/${e.file}`;
      out.push({ thumb: `${IA}thumbs/${enc(path)}`, full: `${IA}full/${enc(path)}`, w: e.w, h: e.h, alt: `${stem.replace(/_/g, " ")} — photo ${out.length + 1}` });
    }
  }
  return out;
}
