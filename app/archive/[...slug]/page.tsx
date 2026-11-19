import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { events } from "@/lib/content";

const ROOT = path.join(process.cwd(), "archive/texts");
const SECTIONS = ["events", "articles", "downloads", "about", "guest", "modular", "Compilazione"];

function walk(dir: string, base = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name), path.join(base, e.name)) :
    e.name.endsWith(".md") ? [path.join(base, e.name.replace(/\.md$/, ""))] : []);
}
const eventStem = (e: { sourcePage: string }) => e.sourcePage.replace(/^events\//, "").replace(/\.htm$/, "");
function fromEvent(stem: string) {
  const e = events.find((x) => eventStem(x) === stem);
  if (!e) return null;
  const body = e.bodyText.split(/\n\s*\n/).map((b) => b.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean).join("\n\n");
  const meta = [e.dateText, e.location].filter(Boolean).join(" · ");
  return { title: e.title, body: (meta ? `*${meta}*\n\n` : "") + body, section: "events" };
}
function load(slug: string[]) {
  const file = path.join(ROOT, ...slug) + ".md";
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) return slug[0] === "events" && slug.length === 2 ? fromEvent(slug[1]) : null;
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n+([\s\S]*)$/);
  const title = m?.[1].match(/title: "(.*)"/)?.[1] ?? slug.at(-1) ?? "";
  return { title, body: (m ? m[2] : raw).trim(), section: slug[0] };
}

export function generateStaticParams() {
  const fromFiles = walk(ROOT).filter((s) => SECTIONS.includes(s.split(path.sep)[0])).map((s) => s.split(path.sep));
  const fromEvents = events.map((e) => ["events", eventStem(e)]);
  const all = new Map<string, string[]>();
  [...fromFiles, ...fromEvents].forEach((sl) => all.set(sl.join("/"), sl));
  return [...all.values()].map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const d = load(slug); return d ? { title: d.title } : {};
}

export default async function ArchiveTextPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = load(slug);
  if (!doc) notFound();
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 py-10 md:py-14">
          <div className="col-span-12 md:col-span-9">
            <Link href="/archive" className="link-arrow">← Archive</Link>
            <p className="eyebrow mt-8">{doc.section}</p>
            <h1 className="display-sm mt-3 max-w-[24ch]">{doc.title}</h1>
          </div>
        </div>
      </section>
      <div className="shell grid12 py-10 md:py-14">
        <article className="col-span-12 max-w-[72ch] md:col-span-8 md:col-start-4">
          <Prose text={doc.body} />
          <p className="mono mt-12 border-t border-line pt-4 text-muted">
            Text from the original timet.org · CC BY-NC 4.0
          </p>
        </article>
      </div>
    </>
  );
}
