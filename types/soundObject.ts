export type SoundObjectType =
  | "acoustic"
  | "electronic"
  | "field"
  | "voice"
  | "percussion"
  | "texture";

/** Metadata invariants required by TOSOL-1.0 Section 7. */
export interface SoundObject {
  id: string;
  title: string;
  sourceProject: string;
  year: number;
  type: SoundObjectType;
  instrument: string;
  duration: number;
  sampleRate: number;
  tags: string[];
  licence: "TOSOL-1.0";
  tdm_reservation: "reserved";
  checksum: string;
  provenance: string;
  published: boolean;
  /** Quantised, normalised amplitude peaks, 0..1. */
  peaks: number[];
  /** Runtime audio path. Null for metadata-only objects. */
  audio: string | null;
}

/** Root manifest required by TOSOL-1.0 Section 6. */
export interface SoundDataset {
  name: string;
  version: string;
  curator: string;
  contact: string;
  licence: "TOSOL-1.0";
  tdm_policy: "reserved";
  ai_training: "reserved";
  source: string;
  updated: string;
  notice: string;
  objects: SoundObject[];
}
