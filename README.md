# OncologyIT.com

**Thought leadership platform at the intersection of oncology, health IT, and AI.**

Built on Astro. Content-driven via markdown. Bot-operated via OpenClaw swarm. Deployed on Vercel.

---

## Architecture

```
oncologyit/
├── src/
│   ├── content/           # All content as markdown (git-driven)
│   │   ├── articles/      # Blog posts & analysis
│   │   ├── podcast/       # Episode show notes
│   │   ├── toolkit/       # Affiliate/resource items
│   │   └── courses/       # Certification course content + quizzes
│   ├── layouts/           # Base, Article layouts
│   ├── pages/             # Astro pages (index, articles, podcast, admin, course)
│   ├── components/        # Shared UI components
│   └── styles/            # Global CSS (Mockup B aesthetic)
├── scripts/               # Bot automation scripts
│   ├── generate-newsletter.sh    # ALFRED: weekly newsletter draft
│   ├── scrape-sources.sh         # Jarvis: daily source collection
│   ├── publish-content.sh        # Either bot: publish to git → deploy
│   ├── generate_certificate.py   # PDF certificate generator
│   └── launchagents/             # macOS LaunchAgent plists
├── db/
│   └── schema.sql         # Neon PostgreSQL schema
├── data/
│   └── newsletter-sources/  # Scraped source material (gitignored)
└── public/                # Static assets
```

## Content Pipeline

### How Bots Publish Content

1. **Jarvis** scrapes sources daily (4 AM CT) → `data/newsletter-sources/`
2. **ALFRED** generates newsletter draft weekly (Mon 5 AM CT) → `src/content/newsletters/`
3. Either bot publishes articles via `scripts/publish-content.sh`:
   ```bash
   ./scripts/publish-content.sh article "Title" "deep-dive" "Description" /path/to/content.md
   ```
4. Git push to `main` → Vercel auto-deploys in ~30 seconds

### Content Types

| Type | Directory | Frontmatter Required |
|------|-----------|---------------------|
| Article | `src/content/articles/` | title, description, date, tag, readTime |
| Podcast | `src/content/podcast/` | title, description, date, episodeNumber, duration |
| Toolkit | `src/content/toolkit/` | title, description, category, affiliateUrl |

### Article Tags
`deep-dive` | `signal` | `framework` | `analysis` | `opinion`

### Toolkit Categories
`books` | `tools` | `education` | `frameworks`

## Certification Course

### AI Foundations ($149)

8 modules + 40-question exam. Content in `src/content/courses/ai-foundations/`.

**Flow:**
1. User pays via Stripe Checkout
2. Course modules unlock (markdown rendered as prose)
3. User completes all modules → takes exam
4. Score ≥ 80% → certificate generated (PDF)
5. Certificate has unique UUID, verifiable at `/verify/{id}`

**Certificate Generation:**
```bash
python3 scripts/generate_certificate.py \
  --name "Jane Doe, M.D." \
  --score 92 \
  --cert-id "$(uuidgen)"
```

## Deployment

### Prerequisites
- Node.js 18+
- Vercel account (free tier works)
- Neon PostgreSQL database
- Stripe account (for course payments)
- Domain: oncologyit.com at Network Solutions

### Steps

1. **Push to GitHub:**
   ```bash
   cd oncologyit
   git init
   git add -A
   git commit -m "initial: oncologyit.com"
   git remote add origin git@github.com:jivesh1075/oncologyit.git
   git push -u origin main
   ```

2. **Connect Vercel:**
   - Import repo at vercel.com/new
   - Framework: Astro
   - Build command: `npm run build`
   - Output: `dist`
   - Set environment variables (see below)

3. **DNS (Network Solutions):**
   - Add CNAME: `oncologyit.com` → `cname.vercel-dns.com`
   - Or A records: `76.76.21.21`
   - Add domain in Vercel dashboard → verify

4. **Database:**
   ```bash
   psql $DATABASE_URL < db/schema.sql
   ```

5. **Stripe:**
   - Create product "AI Foundations Certification" ($149)
   - Copy price ID → update `course.json`
   - Set webhook endpoint → `/api/stripe/webhook`

### Environment Variables (Vercel)
```
DATABASE_URL=postgresql://...@ep-xxx.us-east-2.aws.neon.tech/oncologyit
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_PASSWORD_HASH=<bcrypt hash>
SESSION_SECRET=<random 64 char string>
```

## Bot Setup on Swarm

### ALFRED (content generation + publishing)

```bash
# Clone repo
cd ~/projects
git clone git@github.com:jivesh1075/oncologyit.git

# Install LaunchAgents
cp oncologyit/scripts/launchagents/com.oncologyit.newsletter-generate.plist \
   ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.oncologyit.newsletter-generate.plist
```

### Jarvis (source scraping + monitoring)

```bash
# Clone repo
cd ~/projects
git clone git@github.com:jivesh1075/oncologyit.git

# Install LaunchAgents
cp oncologyit/scripts/launchagents/com.oncologyit.scrape-sources.plist \
   ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.oncologyit.scrape-sources.plist
```

### Cron Schedule

| Bot | Task | Schedule |
|-----|------|----------|
| Jarvis | Scrape sources | Daily 4:00 AM CT |
| ALFRED | Generate newsletter | Monday 5:00 AM CT |
| Either | Publish articles | On-demand via publish-content.sh |

## Admin Dashboard

Accessible at `/admin`. Session-authenticated (JJ only).

**Panels:**
- **Stats**: Subscribers, enrollments, certificates, revenue, page views, bot actions
- **Newsletter Queue**: Draft → Approve → Schedule → Send pipeline
- **Content List**: Published articles and podcast episodes with view counts
- **Bot Activity**: Real-time log of ALFRED/Jarvis actions
- **Course Metrics**: Enrollment, completion rates, module progress, revenue

## Monetization

| Revenue Stream | Mechanism | Status |
|---------------|-----------|--------|
| Course sales | Stripe Checkout ($149) | Ready to wire |
| Affiliate links | Toolkit items w/ affiliateUrl | Ready |
| Newsletter sponsors | Manual sponsor slot in dispatch | Phase 2 |
| Digital downloads | Gumroad/Lemon Squeezy embeds | Phase 2 |

---

*Built by the OpenClaw swarm. Maintained by ALFRED and Jarvis.*
