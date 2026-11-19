"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

let current: { audio: HTMLAudioElement; stop: () => void } | null = null;

export function TrackPlayButton({ src, label }: { src: string; label: string }) {
  const [on, setOn] = useState(false);
  const [bad, setBad] = useState(false);
  useEffect(() => () => { if (current && on) { current.audio.pause(); current = null; } }, [on]);

  const toggle = () => {
    if (current && current.audio.src === new URL(src, location.href).href) { current.audio.pause(); current.stop(); current = null; return; }
    current?.audio.pause(); current?.stop();
    const audio = new Audio(src);
    const stop = () => setOn(false);
    audio.onended = () => { stop(); current = null; };
    audio.onerror = () => { setBad(true); stop(); current = null; };
    current = { audio, stop };
    audio.play().then(() => setOn(true)).catch(() => { stop(); });
  };
  return (
    <button type="button" onClick={toggle} aria-label={`${on ? "Pause" : "Play"} ${label}`} title={bad ? "Audio not available yet" : undefined}
      className={`flex h-7 w-7 items-center justify-center border ${bad ? "border-highlight text-highlight" : "border-line-strong hover:bg-surface"}`}>
      {on ? <Pause size={13} /> : <Play size={13} />}
    </button>
  );
}
