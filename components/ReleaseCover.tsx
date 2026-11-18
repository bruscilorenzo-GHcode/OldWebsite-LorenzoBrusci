import Image from "next/image";
import type { Release } from "@/lib/content";
import { coverFor } from "@/lib/content";

export function ReleaseCover({
  release,
  sizes,
  priority = false,
  className = "",
}: {
  release: Release;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const cover = coverFor(release);

  if (cover) {
    const fit = release.coverFit ?? "cover";
    return (
      <Image
        src={cover}
        alt={`Cover of ${release.title}`}
        width={900}
        height={900}
        className={`aspect-square w-full border border-line bg-surface-2 ${
          fit === "contain" ? "object-contain" : "object-cover"
        } ${className}`}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={`flex aspect-square w-full flex-col justify-between border border-line bg-surface-2 p-4 ${className}`}
      role="img"
      aria-label={`${release.title} — no cover published`}
    >
      <span className="mono uppercase tracking-[0.14em] text-muted">
        No cover published
      </span>
      <span className="font-grotesk text-lg font-bold leading-tight tracking-[-0.03em] text-ink-2">
        {release.title}
      </span>
    </div>
  );
}
