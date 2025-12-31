#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

npm pack --silent --pack-destination "$tmp" @expo-google-fonts/inter@0.4.2 >/dev/null
tar -xzf "$tmp/expo-google-fonts-inter-0.4.2.tgz" -C "$tmp" package/900Black/Inter_900Black.ttf

uvx --from opentype-feature-freezer==1.32.2 --with fonttools==4.68.0 pyftfeatfreeze \
  -f cv02,cv03,cv04,cv09 \
  "$tmp/package/900Black/Inter_900Black.ttf" \
  assets/fonts/Inter_Digits.ttf
