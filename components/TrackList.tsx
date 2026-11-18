import type { Track } from "@/lib/content";

type Row =
  | { kind: "disc"; label: string; key: string }
  | { kind: "section"; label: string; key: string }
  | { kind: "track"; track: Track; key: string };

export function TrackList({
  tracks,
  showDiscs = false,
}: {
  tracks: Track[];
  showDiscs?: boolean;
}) {
  const rows: Row[] = [];
  let lastSection: string | null = null;
  let lastDisc: string | undefined;

  tracks.forEach((track, index) => {
    const section = track.section ?? null;
    if (showDiscs && track.disc !== undefined && track.disc !== lastDisc) {
      rows.push({ kind: "disc", label: track.disc.replace("_", " "), key: `disc-${index}` });
      lastDisc = track.disc;
    }
    if (section !== null && section !== lastSection) {
      rows.push({ kind: "section", label: section, key: `section-${index}` });
      lastSection = section;
    }
    rows.push({
      kind: "track",
      track,
      key: `track-${track.disc ?? ""}-${String(track.n)}-${index}`,
    });
  });

  return (
    <table className="w-full border-collapse font-code text-sm">
      <tbody>
        {rows.map((row) => {
          if (row.kind === "disc") {
            return (
              <tr key={row.key}>
                <td
                  colSpan={3}
                  className="border-t border-line-strong bg-surface-2 px-2 py-1.5 font-code text-[0.68rem] uppercase tracking-[0.16em] text-ink-2"
                >
                  {row.label}
                </td>
              </tr>
            );
          }
          if (row.kind === "section") {
            return (
              <tr key={row.key}>
                <td
                  colSpan={3}
                  className="border-t border-line bg-surface-2 px-2 py-1.5 font-code text-[0.68rem] uppercase tracking-[0.16em] text-accent"
                >
                  {row.label}
                </td>
              </tr>
            );
          }
          const { track } = row;
          return (
            <tr key={row.key}>
              <td className="w-12 border-t border-line px-2 py-2 text-muted">
                {typeof track.n === "number" ? String(track.n).padStart(2, "0") : "—"}
              </td>
              <td className="border-t border-line px-2 py-2">
                <span className="font-sans text-sm text-ink">{track.title}</span>
                {track.note && <span className="ml-2 text-muted">— {track.note}</span>}
              </td>
              <td className="w-24 border-t border-line px-2 py-2 text-right text-muted">
                {track.duration.includes("TODO") ? (
                  <span className="border border-highlight px-1 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-highlight">
                    verify
                  </span>
                ) : (
                  track.duration
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
