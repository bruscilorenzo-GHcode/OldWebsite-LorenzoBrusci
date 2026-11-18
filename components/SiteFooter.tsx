import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid12 gap-y-8 py-12">
        <div className="col-span-12 md:col-span-5">
          <p className="mono uppercase tracking-[0.18em] text-muted">Timet</p>
          <p className="mt-4 max-w-sm text-ink-2">
            Italian sound-art collective founded by Lorenzo Brusci in 1993,
            active until 2003. Compositions for theatre, dance, television,
            radio and sound installations.
          </p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="mono uppercase tracking-[0.18em] text-muted">Archive</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li><Link href="/releases" className="no-underline hover:text-accent">Releases</Link></li>
            <li><Link href="/projects" className="no-underline hover:text-accent">Projects</Link></li>
            <li><Link href="/archive" className="no-underline hover:text-accent">Archive</Link></li>
            <li><Link href="/open-database" className="no-underline hover:text-accent">Open database</Link></li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-4">
          <p className="mono uppercase tracking-[0.18em] text-muted">Elsewhere</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li><a href="https://lorenzobrusci.com/" rel="noopener" className="no-underline hover:text-accent">lorenzobrusci.com</a></li>
            <li><a href="https://www.musstdesign.com" rel="noopener" className="no-underline hover:text-accent">musstdesign.com</a></li>
            <li><a href="https://soundcloud.com/lorenzo-brusci" rel="noopener" className="no-underline hover:text-accent">SoundCloud</a></li>
            <li><a href="https://soundcloud.com/musst-1" rel="noopener" className="no-underline hover:text-accent">SoundCloud / MUSST</a></li>
            <li><a href="https://lorenzobrusci-timet.bandcamp.com/" rel="noopener" className="no-underline hover:text-accent">Bandcamp</a></li>
          </ul>
        </div>
        <div className="col-span-12 rule pt-4">
          <div className="flex flex-wrap justify-between gap-3">
            <p className="mono text-muted">
              © Timet / Lorenzo Brusci. Texts reproduced from the original timet.org archive.
            </p>
            <p className="mono text-muted">
              <Link href="/open-database/licence" className="no-underline hover:text-accent">CC-BY-NC-4.0</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
