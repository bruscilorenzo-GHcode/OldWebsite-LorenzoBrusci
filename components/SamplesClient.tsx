"use client";

import { useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import samples from "@/content/samples.json";

interface Sample { id: number; y: string; c: string; m: string; s1: string; s2: string; me: string; a: string; f: string }
const all = samples as Sample[];
const IA = "https://archive.org/download/timet-database-samples/";
export const audioHref = (file: string) => IA + file.split("/").map(encodeURIComponent).join("/");
const uniq = (v: string[]) => Array.from(new Set(v.filter(Boolean))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const PAGE = 40;

export function SamplesClient() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("all");
  const [coll, setColl] = useState("all");
  const [src, setSrc] = useState("all");
  const [shown, setShown] = useState(PAGE);
  const [playing, setPlaying] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const years = useMemo(() => uniq(all.map((s) => s.y)), []);
  const colls = useMemo(() => uniq(all.map((s) => s.c)), []);
  const srcs = useMemo(() => uniq(all.map((s) => s.s1)), []);

  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return all.filter((s) =>
      (year === "all" || s.y === year) && (coll === "all" || s.c === coll) && (src === "all" || s.s1 === src) &&
      (!n || [s.m, s.s1, s.s2, s.me, s.a, s.c].join(" ").toLowerCase().includes(n)));
  }, [q, year, coll, src]);

  const toggle = (s: Sample) => {
    setErr(null);
    if (playing === s.id) { audio.current?.pause(); setPlaying(null); return; }
    audio.current?.pause();
    const a = new Audio(audioHref(s.f));
    a.onended = () => setPlaying(null);
    a.onerror = () => { setErr(`“${s.f.split("/").pop()}” is not available yet on the Internet Archive.`); setPlaying(null); };
    audio.current = a; a.play().then(() => setPlaying(s.id)).catch(() => setPlaying(null));
  };
  const reset = () => { setShown(PAGE); };
  const sel = "border border-line-strong bg-bg px-2 py-2 font-code text-sm text-ink";

  return (
    <div className="shell py-10 md:py-14">
      <div className="flex flex-wrap items-end gap-3" role="search">
        <label className="grow">
          <span className="mono block uppercase tracking-[0.14em] text-muted">Search</span>
          <input value={q} onChange={(e) => { setQ(e.target.value); reset(); }} placeholder="musician, source, metaphor, artwork…"
            className={`${sel} mt-1 w-full`} type="search" />
        </label>
        {[
          ["Year", year, setYear, years], ["Collection", coll, setColl, colls], ["Source", src, setSrc, srcs],
        ].map(([label, val, set, opts]) => (
          <label key={label as string}>
            <span className="mono block uppercase tracking-[0.14em] text-muted">{label as string}</span>
            <select className={`${sel} mt-1`} value={val as string} onChange={(e) => { (set as (v: string) => void)(e.target.value); reset(); }}>
              <option value="all">All</option>
              {(opts as string[]).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>
      <p className="mono mt-4 text-muted" aria-live="polite">{list.length} / {all.length} samples</p>
      {err && <p role="alert" className="mt-3 border-l-2 border-highlight pl-3 text-sm text-ink-2">{err}</p>}

      <ul className="mt-4 border-t border-line">
        {list.slice(0, shown).map((s) => (
          <li key={s.id} className="grid grid-cols-12 items-center gap-3 border-b border-line py-3">
            <button onClick={() => toggle(s)} aria-label={`${playing === s.id ? "Pause" : "Play"} sample ${s.id}`}
              className="col-span-2 flex h-9 w-9 items-center justify-center border border-line-strong hover:bg-surface md:col-span-1">
              {playing === s.id ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="col-span-10 md:col-span-7">
              <p className="font-grotesk text-base font-bold tracking-[-0.02em]">
                {[s.m || null, s.s1, s.s2].filter(Boolean).join(" · ")}
              </p>
              <p className="mono text-muted">{s.c} · {s.y}{s.me ? ` · ${s.me}` : ""}{s.a ? ` · “${s.a}”` : ""}</p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <a href={audioHref(s.f)} download className="link-arrow">Download mp3</a>
            </div>
          </li>
        ))}
      </ul>
      {shown < list.length && (
        <button onClick={() => setShown((n) => n + PAGE)} className="link-arrow mt-6">Show more ({list.length - shown})</button>
      )}
    </div>
  );
}
