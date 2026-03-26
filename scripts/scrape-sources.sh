#!/bin/bash
# ─────────────────────────────────────────────────────────
# OncologyIT Source Scraper
# Runs daily on Jarvis via cron/LaunchAgent
# Scrapes oncology + AI + health IT news sources
# Outputs JSON summaries to data/newsletter-sources/
# ─────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="${SCRIPT_DIR}/.."
SOURCES_DIR="${REPO_DIR}/data/newsletter-sources"
DATE=$(date +%Y-%m-%d)

mkdir -p "${SOURCES_DIR}"

echo "[$(date)] Source scraping started"

# ─── RSS/API SOURCES ───
# Each source outputs a JSON file with title, url, summary, date, category

FEEDS=(
  "https://www.healthaffairs.org/action/showFeed?type=etoc&feed=rss"
  "https://www.healthcareitnews.com/feed"
  "https://www.fiercehealthcare.com/rss/xml"
  "https://pubmed.ncbi.nlm.nih.gov/rss/search/1s-vJ_WRJd0kNLjO7CsmyKLQFaVLyMnrSDT7SHsqgLEOnAIKzE/?limit=15&utm_campaign=pubmed-2&fc=20210101000000"
)

# PubMed search: oncology AND (artificial intelligence OR machine learning)
# FDA AI/ML device approvals feed
# CMS.gov news

fetch_feed() {
  local url="$1"
  local name="$2"
  local output="${SOURCES_DIR}/${name}-${DATE}.json"

  echo "[$(date)] Fetching: ${name}"

  # Use curl + simple XML/RSS parsing
  # In production, use Python feedparser for robustness
  CONTENT=$(curl -s --max-time 30 "${url}" 2>/dev/null || echo "")

  if [ -n "$CONTENT" ]; then
    # Write raw for AI processing
    echo "{\"source\": \"${name}\", \"date\": \"${DATE}\", \"raw\": $(echo "$CONTENT" | head -c 10000 | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null || echo '""')}" > "${output}"
    echo "[$(date)] Saved: ${output}"
  else
    echo "[$(date)] WARN: Empty response from ${name}"
  fi
}

# Fetch all feeds (parallel-safe)
fetch_feed "${FEEDS[0]}" "health-affairs" &
fetch_feed "${FEEDS[1]}" "healthcare-it-news" &
fetch_feed "${FEEDS[2]}" "fierce-healthcare" &
fetch_feed "${FEEDS[3]}" "pubmed-onc-ai" &
wait

# ─── AI CONTENT OPPORTUNITY DETECTION ───
# Scan scraped sources for content opportunities and flag them

MODEL_ENDPOINT="${SCRAPER_MODEL_ENDPOINT:-http://localhost:11434/api/generate}"
MODEL_NAME="${SCRAPER_MODEL:-qwen2.5:14b}"

OPPORTUNITY_PROMPT="Review the following news items. Identify the top 3 content opportunities for OncologyIT.com — topics where a practicing oncologist with AI expertise could provide unique analysis. For each, suggest an article title and a 1-sentence angle. Respond in JSON format: [{\"title\": \"...\", \"angle\": \"...\", \"source\": \"...\"}]"

# Combine sources
ALL_SOURCES=""
for f in "${SOURCES_DIR}"/*-${DATE}.json; do
  [ -f "$f" ] && ALL_SOURCES="${ALL_SOURCES}\n$(cat "$f" | head -c 2000)"
done

if [ -n "$ALL_SOURCES" ]; then
  OPPS=$(curl -s "${MODEL_ENDPOINT}" \
    -d "{
      \"model\": \"${MODEL_NAME}\",
      \"prompt\": \"${OPPORTUNITY_PROMPT}\n\nSources:\n${ALL_SOURCES}\",
      \"stream\": false,
      \"options\": { \"temperature\": 0.3 }
    }" 2>/dev/null || echo "")

  if [ -n "$OPPS" ]; then
    echo "$OPPS" > "${SOURCES_DIR}/opportunities-${DATE}.json"
    echo "[$(date)] Content opportunities saved"
  fi
fi

# ─── CLEANUP OLD SOURCES ───
# Keep 14 days of source data
find "${SOURCES_DIR}" -name "*.json" -mtime +14 -delete 2>/dev/null || true

# ─── NOTIFY MISSION CONTROL ───
MC_URL="${MC_ENDPOINT:-http://100.80.207.81:3777}"
SOURCE_COUNT=$(ls "${SOURCES_DIR}"/*-${DATE}.json 2>/dev/null | wc -l || echo 0)

curl -s -X POST "${MC_URL}/api/activity" \
  -H "Content-Type: application/json" \
  -d "{
    \"bot\": \"jarvis\",
    \"action\": \"scrape_sources\",
    \"details\": {\"date\": \"${DATE}\", \"sources_collected\": ${SOURCE_COUNT}},
    \"status\": \"success\"
  }" 2>/dev/null || true

echo "[$(date)] Source scraping complete: ${SOURCE_COUNT} sources collected"
