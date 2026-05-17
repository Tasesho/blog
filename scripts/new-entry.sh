#!/usr/bin/env sh
set -eu

if [ "$#" -lt 1 ]; then
  echo "Usage: ./scripts/new-entry.sh \"titulo de la entrada\""
  exit 1
fi

title="$*"
date="$(date +%F)"
slug="$(printf "%s" "$title" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9]/-/g; s/-\{1,\}/-/g; s/^-//; s/-$//')"

file="entries/${date}-${slug}.md"

if [ -e "$file" ]; then
  echo "Entry already exists: $file"
  exit 1
fi

cat > "$file" <<EOF
---
title: ${title}
date: ${date}
description:
---

# ${title}

EOF

node scripts/build-index.js
echo "Created $file"
