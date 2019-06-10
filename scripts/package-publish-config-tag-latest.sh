#!/usr/bin/env bash
set -e

# Bug compatible with -r not supported (we need a raw string)
eval "VERSION=$(ts-node --files bin/pkg-jq -r .version)"

if npx semver-is-prod $VERSION; then
  npm run pkg-jq -- -i '.publishConfig.tag="latest"'
  echo "production release: publicConfig.tag set to latest."
else
  npm run pkg-jq -- -i '.publishConfig.tag="next"'
  echo 'development release: publicConfig.tag set to next.'
fi

