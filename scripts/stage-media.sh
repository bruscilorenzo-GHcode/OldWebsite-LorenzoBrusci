#!/usr/bin/env bash
# Stage the audio objects that are served from Aruba.
# The source backup is read-only; this script only copies files into deploy/.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP="${TIMET_BACKUP:-/Users/lorenzobrusci2020/TIMET_SITO_BACKUP}"
DST="$REPO/deploy/aruba-media/audio/objects"

mkdir -p "$DST"

copy() {
  local src="$1"
  local dst="$2"
  if [ ! -f "$BACKUP/$src" ]; then
    echo "MISSING: $BACKUP/$src" >&2
    exit 1
  fi
  cp "$BACKUP/$src" "$DST/$dst"
  printf "%-14s %s\n" "$dst" "$(shasum -a 256 "$DST/$dst" | cut -d' ' -f1)"
}

copy "mp3/CarneCapitata/2-Inizia dal cervello.mp3" "obj-0005.mp3"
copy "mp3/QuadriDiSchermoVivo/21 pure l'albero e.mp3" "obj-0006.mp3"
copy "mp3/Shadows/1-the hungry hawk.mp3" "obj-0007.mp3"
copy "tracks/zara/cd_1/01 - Zarathustra's prologue__Zara_(CD1).mp3" "obj-0008.mp3"

echo
echo "Staged in $DST"
du -sh "$DST"
echo
echo "Upload the contents of deploy/aruba-media/audio/ to:"
echo "  https://media.timet.org/audio/"
echo
echo "Then set in Vercel:"
echo "  NEXT_PUBLIC_AUDIO_BASE=https://media.timet.org/audio"
