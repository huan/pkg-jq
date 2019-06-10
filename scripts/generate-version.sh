#!/usr/bin/env bash
set -e

[ -f src/version.ts ] || {
  echo "src/version.ts not found"
  exit 1
}

VERSION=$(ts-node --files bin/pkg-jq .version) as string"

cat <<_SRC_ > src/version.ts
/**
 * This file was auto generated from scripts/generate-version.sh
 */
export const VERSION = '${VERSION}' as string
_SRC_
