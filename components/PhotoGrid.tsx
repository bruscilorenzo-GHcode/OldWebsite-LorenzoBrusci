import type { Photo } from "@/lib/eventPhotos";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  return (
    <section aria-label="Photographs" className="mt-12 border-t border-line pt-8">
      <p className="eyebrow">Photographs · {photos.length}</p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((p) => (
          <li key={p.full}>
            <a href={p.full} target="_blank" rel="noopener" className="block border border-line hover:border-accent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumb} alt={p.alt} loading="lazy" width={p.w > p.h ? 480 : Math.round((480 * p.w) / p.h)} className="aspect-[4/3] w-full object-cover" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mono mt-3 text-muted">Hosted by the Internet Archive · CC BY-NC 4.0</p>
    </section>
  );
}
