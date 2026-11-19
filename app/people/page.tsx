import type { Metadata } from "next";
import Link from "next/link";
import { blurb, collaborators, members, type Person } from "@/lib/people";

export const metadata: Metadata = {
  title: "People",
  description: "Members and collaborators of Timet, with short biographies.",
};

function Card({ p }: { p: Person }) {
  const text = blurb(p);
  return (
    <li className="bg-bg">
      <Link href={`/people/${p.slug}`} className="block h-full p-5 no-underline hover:bg-surface">
        <p className="mono uppercase tracking-[0.14em] text-highlight">
          {p.guestComposer ? `Guest composer ${p.guestComposer}` : p.group === "member" ? "Member" : "Collaborator"}
        </p>
        <h3 className="mt-2 font-grotesk text-lg font-bold tracking-[-0.03em]">{p.name}</h3>
        {text && <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>}
      </Link>
    </li>
  );
}

export default function PeoplePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid12 gap-y-6 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Timet · people</p>
            <h1 className="display mt-4">Members &amp; collaborators</h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-4">
            <p className="prose-editorial">
              The musicians and artists who worked with Timet since 1993. Short biographies are
              compiled from public sources, each with its link; original 2004 texts are kept on the
              person pages.
            </p>
          </div>
        </div>
      </section>
      {[
        { title: "Members", list: members },
        { title: "Collaborators", list: collaborators },
      ].map((g) => (
        <section key={g.title} className="border-b border-line" aria-label={g.title}>
          <div className="shell py-10 md:py-14">
            <p className="eyebrow">{g.title} · {g.list.length}</p>
            <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {g.list.map((p) => <Card key={p.slug} p={p} />)}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
