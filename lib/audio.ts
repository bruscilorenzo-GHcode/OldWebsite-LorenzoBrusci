export const AUDIO_BASE = (process.env.NEXT_PUBLIC_AUDIO_BASE ?? "").replace(
  /\/+$/,
  "",
);

export function audioUrl(path: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  // The four short previews ship with Vercel in /public/audio.
  if (path.startsWith("/audio/")) return path;
  const clean = path.replace(/^\/+/, "");
  return AUDIO_BASE ? `${AUDIO_BASE}/${clean}` : `/${clean}`;
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
