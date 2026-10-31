#!/usr/bin/env bash
#MISE description="Publish @xberg-io/docs-theme with provenance, skipping a version already on npm"
set -euo pipefail

ver="$(node -p "require('./package.json').version")"
if npm view "@xberg-io/docs-theme@${ver}" version >/dev/null 2>&1; then
  echo "skip @xberg-io/docs-theme@${ver} (already on npm)"
  exit 0
fi
npm publish --access public --provenance
