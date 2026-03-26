#!/bin/bash
# ─────────────────────────────────────────────────────────
# OncologyIT Content Publisher
# Used by ALFRED to publish new articles, podcast entries,
# and toolkit items to the git repo → auto-deploy via Vercel
#
# Usage:
#   ./publish-content.sh article "title" "tag" "description" content.md
#   ./publish-content.sh podcast 25 "title" "description" "42 min"
#   ./publish-content.sh toolkit "title" "category" "description" "https://affiliate.link"
# ─────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="${SCRIPT_DIR}/.."
DATE=$(date +%Y-%m-%d)
MC_URL="${MC_ENDPOINT:-http://100.80.207.81:3777}"

publish_article() {
  local title="$1"
  local tag="$2"
  local description="$3"
  local content_file="$4"
  local slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
  local output="${REPO_DIR}/src/content/articles/${slug}.md"

  # Estimate read time (~200 words/min)
  local words=$(wc -w < "$content_file")
  local read_time=$(( (words + 199) / 200 ))

  cat > "${output}" << EOF
---
title: "${title}"
description: "${description}"
date: ${DATE}
tag: ${tag}
readTime: "${read_time} min read"
---

$(cat "$content_file")
EOF

  echo "[$(date)] Published article: ${slug}"
  echo "${output}"
}

publish_podcast() {
  local ep_num="$1"
  local title="$2"
  local description="$3"
  local duration="$4"
  local slug="ep$(printf '%03d' $ep_num)-$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | head -c 50)"
  local output="${REPO_DIR}/src/content/podcast/${slug}.md"

  cat > "${output}" << EOF
---
title: "${title}"
description: "${description}"
date: ${DATE}
episodeNumber: ${ep_num}
duration: "${duration}"
---

${description}
EOF

  echo "[$(date)] Published podcast: ${slug}"
  echo "${output}"
}

publish_toolkit() {
  local title="$1"
  local category="$2"
  local description="$3"
  local url="$4"
  local slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | head -c 50)
  local output="${REPO_DIR}/src/content/toolkit/${slug}.md"

  cat > "${output}" << EOF
---
title: "${title}"
description: "${description}"
category: ${category}
affiliateUrl: "${url}"
sortOrder: 0
---

${description}
EOF

  echo "[$(date)] Published toolkit item: ${slug}"
  echo "${output}"
}

# ─── MAIN ───
TYPE="${1:-}"
shift || true

case "$TYPE" in
  article)
    FILE=$(publish_article "$@")
    ;;
  podcast)
    FILE=$(publish_podcast "$@")
    ;;
  toolkit)
    FILE=$(publish_toolkit "$@")
    ;;
  *)
    echo "Usage: $0 {article|podcast|toolkit} [args...]"
    exit 1
    ;;
esac

# Git commit + push (triggers Vercel deploy)
cd "${REPO_DIR}"
git add -A 2>/dev/null || true
git commit -m "content: publish ${TYPE} [bot:$(hostname -s)]" 2>/dev/null || true
git push origin main 2>/dev/null || true

# Notify Mission Control
curl -s -X POST "${MC_URL}/api/activity" \
  -H "Content-Type: application/json" \
  -d "{
    \"bot\": \"$(hostname -s)\",
    \"action\": \"publish_${TYPE}\",
    \"details\": {\"date\": \"${DATE}\", \"type\": \"${TYPE}\"},
    \"status\": \"success\"
  }" 2>/dev/null || true

echo "[$(date)] Published and deployed: ${TYPE}"
