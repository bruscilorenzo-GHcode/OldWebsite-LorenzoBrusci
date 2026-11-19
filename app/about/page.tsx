import type { Metadata } from "next";
import Link from "next/link";
import { about, releases } from "@/lib/content";
import { collaborators, members } from "@/lib/people";

export const metadata: Metadata = {
  title: "About",
  description:
    "Timet: founded by Lorenzo Brusci in 1993 as a sound-art collective, since 2003 the virtual label behind his music productions. Members, collaborators, timeline and biographies.",
};

const fixedMilestones = [
  { year: 1993, label: "Timet founded by Lorenzo Brusci in Firenze." },
  { year: 2003, label: "The collective stops its performing activity. Signing as Lorenzo Brusci/Timet, Brusci keeps composing for dance and theatre, launches Giardino Sonoro and begins turning Timet into his editorial platform in music." },
];

const milestones = [
  ...fixedMilestones,
  ...releases.map((release) => ({
    year: Number(release.year),
    label: `Release: ${release.title}.`,
  })),
].sort((a, b) => a.year - b.year);

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Timet · virtual label</p>
            <h1 className="display mt-4">About Timet</h1>
            <p className="mt-6 max-w-[52ch] text-lg text-ink-2">
              Founded in 1993 by Lorenzo Brusci as a collective of musicians,
              artists and collaborators. Since 2003 the virtual label behind
              all his music productions.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <dl className="border-t border-line-strong">
              <div className="flex justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Founded</dt>
                <dd className="font-code">{about.collective.founded}</dd>
              </div>
              <div className="flex justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Founder</dt>
                <dd className="font-code">{about.collective.founder}</dd>
              </div>
              <div className="flex justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Collective</dt>
                <dd className="font-code">1993–{about.collective.collectiveActionEnded}</dd>
              </div>
              <div className="flex justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Label</dt>
                <dd className="font-code">{about.collective.collectiveActionEnded}–today</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Statement</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="prose-editorial">
              {about.collective.statement.replaceAll("info@musi-co.com", "info@musi-co.com")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          {[
            { title: "Members", list: members },
            { title: "Collaborators", list: collaborators },
          ].map((g) => (
            <div key={g.title} className="col-span-12 md:col-span-6">
              <p className="eyebrow">{g.title} · {g.list.length}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">
                {g.list.map((person, index) => (
                  <span key={person.slug}>
                    {index > 0 && ", "}
                    <Link href={`/people/${person.slug}`} className="underline decoration-line-strong underline-offset-2 hover:text-accent">{person.name}</Link>
                  </span>
                ))}
              </p>
            </div>
          ))}
          <p className="col-span-12 text-sm">
            <Link href="/people" className="link-arrow">All members and collaborators, with short biographies</Link>
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Timeline</p>
            <h2 className="display-sm mt-4">Since 1993</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            {milestones.map((milestone, index) => (
              <div
                key={`${milestone.year}-${index}`}
                className="grid grid-cols-12 gap-3 border-t border-line py-3 last:border-b"
              >
                <p className="col-span-3 font-code text-sm text-highlight md:col-span-2">
                  {milestone.year}
                </p>
                <p className="col-span-9 text-sm text-ink-2 md:col-span-10">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell grid12 py-10">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow">Since 2003</p>
        </div>
        <div className="col-span-12 space-y-5 md:col-span-8 md:col-start-5">
          <p className="text-lg text-ink-2">{about.lineage.statement}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {about.lineage.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener" className="link-arrow">
                {link.label} ↗
              </a>
            ))}
          </div>
          <p className="text-sm text-ink-2">
            Lorenzo Brusci’s ongoing work is published at{" "}
            <a href="https://lorenzobrusci.com/" rel="noopener">lorenzobrusci.com</a>,{" "}
            <a href="https://www.musstdesign.com" rel="noopener">musstdesign.com</a>,{" "}
            <a href="https://soundcloud.com/lorenzo-brusci" rel="noopener">SoundCloud</a> and{" "}
            <a href="https://lorenzobrusci-timet.bandcamp.com/" rel="noopener">Bandcamp</a>.
          </p>
        </div>
      </section>
    </>
  );
}
