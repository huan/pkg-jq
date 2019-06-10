#!/usr/bin/env bash
set -e

[ -f src/version.ts ] || {
  echo "src/version.ts not found"
  exit 1
}

VERSION=$(ts-node --files bin/pkg-jq -r .version)

cat <<_SRC_
/**
 * This file was auto generated from scripts/generate-version.sh
 */
export const VERSION: string = '${VERSION}'
_SRC_
