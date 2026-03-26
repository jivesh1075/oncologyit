#!/bin/bash
# ─────────────────────────────────────────────────────────
# OncologyIT Newsletter Generator
# Runs weekly on ALFRED via cron/LaunchAgent
# Generates newsletter draft from scraped sources + recent articles
# Pushes to git as draft for JJ approval (or auto-publish)
# ─────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="${SCRIPT_DIR}/.."
CONTENT_DIR="${REPO_DIR}/src/content/newsletters"
SOURCES_DIR="${REPO_DIR}/data/newsletter-sources"
DATE=$(date +%Y-%m-%d)
WEEK_NUM=$(date +%V)
ISSUE_FILE="${CONTENT_DIR}/dispatch-${DATE}.md"

# Ensure directories exist
mkdir -p "${CONTENT_DIR}" "${SOURCES_DIR}"

echo "[$(date)] Newsletter generation started for ${DATE}"

# ─── STEP 1: Gather sources ───
# Jarvis should have already populated sources via scrape-sources.sh
# Sources are JSON files in data/newsletter-sources/

SOURCES_COUNT=$(ls "${SOURCES_DIR}"/*.json 2>/dev/null | wc -l || echo 0)
echo "[$(date)] Found ${SOURCES_COUNT} source files"

# ─── STEP 2: Generate newsletter via AI ───
# Uses the local model (DeepSeek/Ollama) to synthesize sources into newsletter

PROMPT=$(cat << 'PROMPT_EOF'
You are the editorial AI for OncologyIT.com, a thought leadership site at the intersection of oncology, health IT, and artificial intelligence, authored by Jivesh Sharma, M.D.

Generate a weekly newsletter dispatch with the following structure:

## OncologyIT Weekly Dispatch #[NUMBER]

### The Signal
[2-3 sentence executive summary of the week's most important development]

### What Happened This Week
[3-4 curated news items with 2-3 sentence analysis each. Focus on: FDA AI decisions, major health IT announcements, oncology technology developments, payer/provider AI moves, and relevant research publications.]

### Deep Cut
[One under-the-radar development that most readers will have missed but matters. 3-4 sentences.]

### From the Toolkit
[One recommended tool, resource, or read with a brief note on why it matters.]

### One Chart
[Describe a data point or statistic that tells a story. Include the number and source.]

---

Voice guidelines:
- Clinical-to-business perspective
- Contrarian when warranted — challenge conventional wisdom
- Data-driven, specific, not generic
- Under 800 words total
- No personal anecdotes or first-person career references
- No self-promotion
- Punchy closing sentence

Format as clean markdown ready for email rendering.
PROMPT_EOF
)

# Collect source summaries
SOURCE_CONTEXT=""
for f in "${SOURCES_DIR}"/*.json; do
  if [ -f "$f" ]; then
    SOURCE_CONTEXT="${SOURCE_CONTEXT}\n$(cat "$f")"
  fi
done

# Call the AI model
# Supports: DeepSeek via OpenRouter, local Ollama, or Claude API
MODEL_ENDPOINT="${NEWSLETTER_MODEL_ENDPOINT:-http://localhost:11434/api/generate}"
MODEL_NAME="${NEWSLETTER_MODEL:-qwen2.5:14b}"

RESPONSE=$(curl -s "${MODEL_ENDPOINT}" \
  -d "{
    \"model\": \"${MODEL_NAME}\",
    \"prompt\": \"${PROMPT}\n\nThis week's source material:\n${SOURCE_CONTEXT}\n\nGenerate the newsletter dispatch:\",
    \"stream\": false,
    \"options\": { \"temperature\": 0.3 }
  }" 2>/dev/null || echo "")

if [ -z "$RESPONSE" ]; then
  echo "[$(date)] ERROR: Model endpoint unreachable at ${MODEL_ENDPOINT}"
  echo "[$(date)] Falling back to template-only generation"

  # Fallback: create a template draft
  cat > "${ISSUE_FILE}" << TEMPLATE
---
subject: "OncologyIT Weekly Dispatch #${WEEK_NUM}"
preview_text: "[NEEDS EDIT] This week in oncology technology"
status: draft
created_by: alfred
date: ${DATE}
---

# OncologyIT Weekly Dispatch #${WEEK_NUM}

## The Signal

[AI-generated content unavailable — manual edit required]

## What Happened This Week

[Review sources in data/newsletter-sources/ and summarize]

## Deep Cut

[Under-the-radar development]

## From the Toolkit

[Weekly recommendation]

---

*You're receiving this because you subscribed at oncologyit.com. [Unsubscribe](#)*
TEMPLATE
else
  # Parse response and write newsletter
  CONTENT=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('response',''))" 2>/dev/null || echo "$RESPONSE")

  cat > "${ISSUE_FILE}" << NEWSLETTER_EOF
---
subject: "OncologyIT Weekly Dispatch #${WEEK_NUM}"
preview_text: "This week in oncology technology"
status: draft
created_by: alfred
date: ${DATE}
---

${CONTENT}

---

*You're receiving this because you subscribed at oncologyit.com. [Unsubscribe](#)*
NEWSLETTER_EOF
fi

echo "[$(date)] Newsletter draft written to ${ISSUE_FILE}"

# ─── STEP 3: Git commit (draft) ───
cd "${REPO_DIR}"
git add "${ISSUE_FILE}" 2>/dev/null || true
git commit -m "newsletter: draft dispatch ${DATE} [bot:alfred]" 2>/dev/null || true

# ─── STEP 4: Notify via Mission Control ───
MC_URL="${MC_ENDPOINT:-http://100.80.207.81:3777}"
curl -s -X POST "${MC_URL}/api/activity" \
  -H "Content-Type: application/json" \
  -d "{
    \"bot\": \"alfred\",
    \"action\": \"generate_newsletter\",
    \"details\": {\"issue\": \"dispatch-${DATE}\", \"status\": \"draft\", \"sources\": ${SOURCES_COUNT}},
    \"status\": \"success\"
  }" 2>/dev/null || true

echo "[$(date)] Newsletter generation complete"
