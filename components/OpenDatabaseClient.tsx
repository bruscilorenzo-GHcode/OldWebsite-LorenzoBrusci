"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { audioUrl, formatDuration } from "@/lib/audio";
import type { SoundDataset, SoundObject } from "@/types/soundObject";
import { TypeBlock } from "@/components/TypeBlock";
import { Waveform } from "@/components/Waveform";

type FilterKey = "type" | "year" | "project" | "tag";

const emptyFilters: Record<FilterKey, string> = {
  type: "all",
  year: "all",
  project: "all",
  tag: "all",
};

function unique(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}

export function OpenDatabaseClient() {
  const [dataset, setDataset] = useState<SoundDataset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, string>>(emptyFilters);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const lengthRef = useRef(0);
  const playingRef = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/dataset.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Dataset unavailable (${response.status}).`);
        return response.json() as Promise<SoundDataset>;
      })
      .then((data) => {
        if (alive) setDataset(data);
      })
      .catch((reason: unknown) => {
        if (alive) setError(reason instanceof Error ? reason.message : "Dataset unavailable.");
      });
    return () => {
      alive = false;
    };
  }, []);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.onended = null;
      try {
        sourceRef.current.stop();
      } catch {
        /* already stopped */
      }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    playingRef.current = null;
    setPlayingId(null);
    setProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      stop();
      contextRef.current?.close().catch(() => undefined);
      contextRef.current = null;
    };
  }, [stop]);

  const play = useCallback(
    async (object: SoundObject) => {
      if (!object.published) return;
      if (playingRef.current === object.id) {
        stop();
        return;
      }
      stop();
      setPlayerError(null);

      const url = audioUrl(object.audio);
      if (!url) {
        setPlayerError("No audio source for this object.");
        return;
      }

      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) throw new Error("Web Audio is not available in this browser.");
        if (!contextRef.current) contextRef.current = new Ctor();
        const context = contextRef.current;
        if (context.state === "suspended") await context.resume();

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Audio unavailable (${response.status}). Set NEXT_PUBLIC_AUDIO_BASE for external storage.`,
          );
        }
        const bytes = await response.arrayBuffer();
        const buffer = await context.decodeAudioData(bytes);

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.onended = () => {
          if (playingRef.current === object.id) {
            playingRef.current = null;
            setPlayingId(null);
            setProgress(0);
          }
        };
        source.start();

        sourceRef.current = source;
        startedAtRef.current = context.currentTime;
        lengthRef.current = buffer.duration;
        playingRef.current = object.id;
        setPlayingId(object.id);
        setProgress(0);

        const tick = () => {
          if (!playingRef.current || !contextRef.current) return;
          const elapsed = contextRef.current.currentTime - startedAtRef.current;
          setProgress(Math.min(1, elapsed / (lengthRef.current || 1)));
          frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
      } catch (reason) {
        stop();
        setPlayerError(
          reason instanceof Error ? reason.message : "Playback failed.",
        );
      }
    },
    [stop],
  );

  const objects = dataset?.objects ?? [];
  const typeOptions = useMemo(
    () => ["all", ...unique(objects.map((object) => object.type))],
    [objects],
  );
  const yearOptions = useMemo(
    () => ["all", ...unique(objects.map((object) => String(object.year)))],
    [objects],
  );
  const projectOptions = useMemo(
    () => ["all", ...unique(objects.map((object) => object.sourceProject))],
    [objects],
  );
  const tagOptions = useMemo(
    () => ["all", ...unique(objects.flatMap((object) => object.tags))],
    [objects],
  );

  const filtered = useMemo(
    () =>
      objects.filter((object) => {
        if (filters.type !== "all" && object.type !== filters.type) return false;
        if (filters.year !== "all" && String(object.year) !== filters.year) return false;
        if (filters.project !== "all" && object.sourceProject !== filters.project) return false;
        if (filters.tag !== "all" && !object.tags.includes(filters.tag)) return false;
        return true;
      }),
    [objects, filters],
  );

  const totalDuration = filtered.reduce((sum, object) => sum + object.duration, 0);
  const current = objects.find((object) => object.id === playingId) ?? null;

  const setFilter = (key: FilterKey, value: string) =>
    setFilters((previous) => ({ ...previous, [key]: value }));

  return (
    <div className={playingId ? "pb-28" : ""}>
      <section className="border-b border-line">
        <div className="shell grid12 py-12 md:py-16">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow">Open sound database</p>
            <h1 className="display mt-4 max-w-[12ch]">Sound objects.</h1>
            <p className="prose-editorial mt-6">
              Individual sound objects extracted from the Timet archive. Listen,
              study, teach and build non-commercial work. Commercial use and AI
              training are reserved.
            </p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-4 md:mt-0">
            <dl className="border-t border-line-strong">
              <div className="flex items-baseline justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Objects</dt>
                <dd className="font-grotesk text-2xl">{filtered.length} / {objects.length || "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Duration</dt>
                <dd className="font-code text-lg">{formatDuration(totalDuration)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-line py-3">
                <dt className="mono uppercase tracking-[0.14em] text-muted">Licence</dt>
                <dd className="mono">TOSOL-1.0</dd>
              </div>
            </dl>
            <Link href="/open-database/licence" className="link-arrow mt-4 inline-flex">
              Read the licence
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Filters" className="border-b border-line bg-surface">
        <div className="shell grid12 gap-4 py-5">
          <label className="col-span-6 md:col-span-3">
            <span className="mono uppercase tracking-[0.14em] text-muted">Type</span>
            <select
              value={filters.type}
              onChange={(event) => setFilter("type", event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-2 py-2 font-code text-sm"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All types" : option}</option>
              ))}
            </select>
          </label>
          <label className="col-span-6 md:col-span-2">
            <span className="mono uppercase tracking-[0.14em] text-muted">Year</span>
            <select
              value={filters.year}
              onChange={(event) => setFilter("year", event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-2 py-2 font-code text-sm"
            >
              {yearOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All years" : option}</option>
              ))}
            </select>
          </label>
          <label className="col-span-6 md:col-span-3">
            <span className="mono uppercase tracking-[0.14em] text-muted">Source project</span>
            <select
              value={filters.project}
              onChange={(event) => setFilter("project", event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-2 py-2 font-code text-sm"
            >
              {projectOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All projects" : option}</option>
              ))}
            </select>
          </label>
          <label className="col-span-6 md:col-span-3">
            <span className="mono uppercase tracking-[0.14em] text-muted">Tag</span>
            <select
              value={filters.tag}
              onChange={(event) => setFilter("tag", event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-2 py-2 font-code text-sm"
            >
              {tagOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All tags" : option}</option>
              ))}
            </select>
          </label>
          <div className="col-span-12 md:col-span-1 md:flex md:items-end md:justify-end">
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="mono w-full border border-line px-2 py-2 uppercase tracking-[0.12em] hover:border-highlight hover:text-highlight md:w-auto"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div aria-live="polite" className="shell">
        {error && <p className="py-8 font-code text-sm text-accent">{error}</p>}
        {!error && !dataset && <p className="py-8 font-code text-sm text-muted">Loading dataset…</p>}
        {dataset && filtered.length === 0 && (
          <p className="py-8 font-code text-sm text-muted">No objects match these filters.</p>
        )}
        {playerError && <p className="py-4 font-code text-sm text-accent">{playerError}</p>}
      </div>

      <section aria-label="Objects" className="shell">
        {filtered.map((object) => {
          const isPlaying = playingId === object.id;
          return (
            <article
              key={object.id}
              className={`grid12 items-center gap-y-3 border-b border-line py-4 ${
                object.published ? "" : "opacity-45"
              }`}
            >
              <div className="col-span-2 md:col-span-1">
                <TypeBlock type={object.type} />
              </div>
              <div className="col-span-10 md:col-span-4">
                <h2 className="font-grotesk text-lg leading-tight tracking-[-0.03em]">
                  {object.title}
                </h2>
                <p className="mono mt-1 text-muted">
                  <span className="uppercase">{object.type}</span> · {object.sourceProject} · {object.year}
                </p>
                {!object.published && (
                  <p className="mono mt-1 uppercase tracking-[0.12em] text-highlight">
                    Master held, not published
                  </p>
                )}
              </div>
              <div className="col-span-6 md:col-span-2">
                <p className="text-sm text-ink-2">{object.instrument}</p>
                <p className="mono mt-1 text-muted">{object.tags.join(" · ")}</p>
              </div>
              <div className="col-span-12 md:col-span-3">
                <Waveform
                  peaks={object.peaks}
                  active={isPlaying}
                  progress={isPlaying ? progress : 0}
                />
              </div>
              <div className="col-span-3 md:col-span-1">
                <p className="mono text-right text-muted">{formatDuration(object.duration)}</p>
              </div>
              <div className="col-span-3 md:col-span-1 md:text-right">
                <button
                  type="button"
                  onClick={() => play(object)}
                  disabled={!object.published}
                  aria-label={
                    object.published
                      ? `${isPlaying ? "Stop" : "Play"} ${object.title}`
                      : `${object.title} — master held, not published`
                  }
                  aria-pressed={isPlaying}
                  className="inline-flex h-10 w-10 items-center justify-center border border-line-strong disabled:cursor-not-allowed disabled:border-line disabled:text-muted enabled:hover:border-highlight enabled:hover:text-highlight"
                >
                  {isPlaying ? <Square size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {current && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line-strong bg-surface">
          <div className="shell grid12 items-center gap-y-2 py-3">
            <div className="col-span-10 flex items-center gap-3">
              <TypeBlock type={current.type} />
              <div className="min-w-0">
                <p className="truncate font-grotesk text-sm font-bold tracking-[-0.02em]">
                  {current.title}
                </p>
                <p className="mono text-muted">
                  {current.sourceProject} · {formatDuration(progress * current.duration)} / {formatDuration(current.duration)}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={stop}
                aria-label="Stop playback"
                className="inline-flex h-10 w-10 items-center justify-center border border-line-strong hover:border-highlight hover:text-highlight"
              >
                <Square size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
