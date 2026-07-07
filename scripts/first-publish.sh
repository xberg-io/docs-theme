#!/usr/bin/env bash
#
# One-time manual publish of @xberg-io/docs-theme to public npm.
#
# Run this ONCE to seed the package on the registry. Two auth options:
#   • export NPM_TOKEN=<granular automation token>   (npmjs.com → Access Tokens)
#   • or run `npm login` first and leave NPM_TOKEN unset
#
# After it succeeds (one time):
#   1. npmjs.com → @xberg-io/docs-theme → Settings → Trusted Publishers →
#      add GitHub Actions: repository "xberg-io/docs-theme", workflow "publish.yaml".
#   2. All later releases go through .github/workflows/publish.yaml (OIDC + provenance).
#      Do NOT run this script again.
#
set -euo pipefail

cd "$(dirname "$0")/.."

pkg="$(node -p "require('./package.json').name")"
ver="$(node -p "require('./package.json').version")"

if npm view "${pkg}@${ver}" version >/dev/null 2>&1; then
	echo "${pkg}@${ver} is already on npm — nothing to do."
	echo "Use .github/workflows/publish.yaml for future releases."
	exit 0
fi

TMP_NPMRC=""
cleanup() { [ -n "$TMP_NPMRC" ] && rm -f "$TMP_NPMRC"; }
trap cleanup EXIT

auth_args=()
if [ -n "${NPM_TOKEN:-}" ]; then
	TMP_NPMRC="$(mktemp)"
	printf '//registry.npmjs.org/:_authToken=%s\n' "$NPM_TOKEN" >"$TMP_NPMRC"
	auth_args=(--userconfig "$TMP_NPMRC")
else
	echo "NPM_TOKEN not set — assuming 'npm login' has already been run." >&2
fi

echo "Publishing ${pkg}@${ver} to public npm…"
npm publish --access public "${auth_args[@]}"

cat <<'EOF'

Done. One-time follow-up:
  • npmjs.com → @xberg-io/docs-theme → Settings → add a GitHub Actions Trusted Publisher
      repository: xberg-io/docs-theme
      workflow:   publish.yaml
  • Future releases: cut a GitHub Release (or run the Publish workflow) — it publishes
    with OIDC + provenance. Do not run this script again.
EOF
