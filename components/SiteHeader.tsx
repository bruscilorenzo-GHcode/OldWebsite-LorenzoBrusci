import Link from "next/link";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-3 py-4">
        <div className="flex items-end gap-6">
          <Link
            href="/"
            className="font-grotesk text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.06em] text-ink no-underline"
          >
            TIMET<span className="text-highlight">.</span>
          </Link>
          <p className="mono hidden whitespace-nowrap uppercase tracking-[0.14em] text-muted lg:block">
            Sound-art collective · 1993–2003
          </p>
        </div>
        <nav
          aria-label="Main"
          className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono whitespace-nowrap uppercase tracking-[0.14em] text-ink no-underline hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
