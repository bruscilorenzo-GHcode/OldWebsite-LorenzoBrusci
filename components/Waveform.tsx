export function Waveform({
  peaks,
  progress = 0,
  active = false,
  className = "",
}: {
  peaks: number[];
  progress?: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-10 items-center gap-[2px] ${className}`}
      aria-hidden="true"
    >
      {peaks.map((peak, index) => {
        const played = active && (index + 1) / peaks.length <= progress;
        return (
          <span
            key={index}
            className="min-w-px flex-1"
            style={{
              height: `${Math.max(6, Math.round(peak * 100))}%`,
              backgroundColor: played
                ? "var(--accent)"
                : "var(--type-texture)",
            }}
          />
        );
      })}
    </div>
  );
}
