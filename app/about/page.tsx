import type { Metadata } from "next";
import { PersonName } from "@/components/PersonName";
import { about, bioPeople, displayName, personUrl, releases } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Timet: Italian sound-art collective founded by Lorenzo Brusci in 1993. Members, collaborators, timeline and biographies.",
};

const fixedMilestones = [
  { year: 1993, label: "Timet founded by Lorenzo Brusci in Firenze." },
  { year: 2003, label: "Timet stops its activity; the work continues through Giardino Sonoro." },
];

const milestones = [
  ...fixedMilestones,
  ...releases.filter((release) => Number(release.year) <= 2003).map((release) => ({
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
            <p className="eyebrow">The collective</p>
            <h1 className="display mt-4">About Timet</h1>
            <p className="mt-6 max-w-[52ch] text-lg text-ink-2">
              Founded in 1993 by Lorenzo Brusci. Active until 2003. Musicians,
              artists and collaborators.
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
                <dt className="mono uppercase tracking-[0.14em] text-muted">Active</dt>
                <dd className="font-code">1993–{about.collective.stoppedActivity}</dd>
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
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">Members · Musicians · {about.membersListVerbatim.length}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              {about.membersListVerbatim.map((name, index) => (
                <span key={name}>
                  {index > 0 && ", "}
                  <PersonName name={name} />
                </span>
              ))}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">Collaboration · Artists · {about.collaborationListVerbatim.length}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              {about.collaborationListVerbatim.map((name, index) => (
                <span key={name}>
                  {index > 0 && ", "}
                  <PersonName name={name} />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Timeline</p>
            <h2 className="display-sm mt-4">1993–2003</h2>
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

      <section className="border-b border-line bg-surface">
        <div className="shell grid12 gap-y-8 py-10 md:py-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Biographies · {bioPeople.length}</p>
            <h2 className="display-sm mt-4">People</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              {bioPeople.map((bio) => {
                const website = personUrl(bio.name);
                return (
                  <article key={bio.slug} className="bg-bg p-5">
                    <p className="mono uppercase tracking-[0.14em] text-highlight">
                      {bio.category === "member" ? "Musician · member" : "Artist · collaborator"}
                    </p>
                    <h3 className="mt-2 font-grotesk text-lg font-bold tracking-[-0.03em]">
                      {displayName(bio.name)}
                    </h3>
                    <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-ink-2">
                      {bio.bioText}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="mono text-muted">{bio.sourcePage}</p>
                      {website && (
                        <a href={website} target="_blank" rel="noopener" className="link-arrow">
                          Website ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 max-w-[70ch] text-sm text-ink-2">
              The original member list also names Marco Veneri, Massimo Bressan,
              Andrea De Luca, Alessandro Fiori, Enrico Gabrielli, Enzo Cimino,
              Monica Demuru, Preot Buxton, Stefano Bollani, Daniele Pianigiani,
              Phonat, Maurizio Meossi, Filippo Innocenti and Paolo Fiumi. No
              biography was published for them on the site.
            </p>
          </div>
        </div>
      </section>

      <section className="shell grid12 py-10">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow">After 2003</p>
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
