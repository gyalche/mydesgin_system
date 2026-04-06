#!/usr/bin/env bash

set -euo pipefail

file="deploy_storybook.sh"

if [[ ! -f "$file" ]]; then
  exit 0
fi

perl -0pi -e 's#SLACK_URL="https://hooks\.slack\.com/services/[^"\n]+"#SLACK_URL="\${SLACK_URL:-}"#g' "$file"

if ! grep -Fq 'Set SLACK_URL before running this script' "$file"; then
  perl -0pi -e 's#(if \[\[ \$\{target_env\} != "prod" \]\] && \[\[ \$\{target_env\} != "staging" \]\] && \[\[ \$\{target_env\} != "testing" \]\]; then\n  echo "Specify stage"\n  exit 1\nfi\n)#$1\nif [[ -z "$SLACK_URL" ]]; then\n  echo "Set SLACK_URL before running this script"\n  exit 1\nfi\n#' "$file"
fi
