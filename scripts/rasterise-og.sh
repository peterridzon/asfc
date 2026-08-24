#!/usr/bin/env bash
# Rasterises the OpenGraph card and the Apple touch icon.
#
# macOS ships no general SVG rasteriser, so we use qlmanage (Quick Look), which
# always renders into a square. scripts/.og-square.svg pads the 1200x630 design
# into a 1200x1200 canvas so the centre crop below is exact.
#
#   ./scripts/rasterise-og.sh
#
# The generated PNGs are committed, so this only needs re-running when the
# artwork in scripts/generate-placeholders.mjs changes.
set -euo pipefail

cd "$(dirname "$0")/.."
node scripts/generate-placeholders.mjs >/dev/null

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

qlmanage -t -s 1200 -o "$work" scripts/.og-square.svg >/dev/null 2>&1
sips -c 630 1200 "$work/.og-square.svg.png" --out public/og-image.png >/dev/null

qlmanage -t -s 180 -o "$work" public/favicon.svg >/dev/null 2>&1
cp "$work/favicon.svg.png" public/apple-touch-icon.png

echo "public/og-image.png        $(sips -g pixelWidth -g pixelHeight public/og-image.png | tail -2 | tr -d ' \n')"
echo "public/apple-touch-icon.png $(sips -g pixelWidth -g pixelHeight public/apple-touch-icon.png | tail -2 | tr -d ' \n')"
