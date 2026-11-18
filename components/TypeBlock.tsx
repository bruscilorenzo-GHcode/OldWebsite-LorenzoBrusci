import type { CSSProperties } from "react";
import type { SoundObjectType } from "@/types/soundObject";

const labels: Record<SoundObjectType, string> = {
  acoustic: "Acoustic",
  electronic: "Electronic",
  field: "Field",
  voice: "Voice",
  percussion: "Percussion",
  texture: "Texture",
};

export function TypeBlock({
  type,
  withLabel = false,
}: {
  type: SoundObjectType;
  withLabel?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="type-block"
        style={{ backgroundColor: `var(--type-${type})` } as CSSProperties}
        aria-hidden="true"
      />
      {withLabel && <span className="mono uppercase tracking-[0.14em] text-muted">{labels[type]}</span>}
      {!withLabel && <span className="sr-only">{labels[type]}</span>}
    </span>
  );
}
