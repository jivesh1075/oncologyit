# OncologyIT Admin Guide — OpenClaws Team

## Quick Reference

### Adding a New Article

1. Create a `.md` file in `/content/writing/`:

```
content/writing/my-new-article.md
```

2. Add frontmatter at the top:

```yaml
---
title: "Your Article Title"
description: "A brief description (used for SEO and previews)."
date: "2026-03-30"
tag: "signal"          # Options: signal | deep-dive | framework | tutorial | news
featured: false        # Set to true to pin to homepage
draft: false           # Set to true to hide from production
---
```

3. Write your article content in Markdown below the frontmatter.

4. Push to `main` branch. Vercel auto-deploys in ~60 seconds.

That's it. The article will automatically appear on the `/writing` page, in the sitemap, RSS feed, and search index.

---

### Adding a New Podcast Episode

1. Create a `.md` file in `/content/podcast/`:

```
content/podcast/ep025-your-episode.md
```

2. Add frontmatter:

```yaml
---
title: "Episode Title"
description: "Episode description."
date: "2026-03-30"
episodeNumber: 25
duration: "45 min"
audioUrl: "https://your-host.com/ep025.mp3"  # Optional
---
```

3. Write show notes in Markdown below.
4. Push to `main`.

---

### Adding a New Course

1. Create a folder in `/content/courses/`:

```
content/courses/your-course-id/
├── course.json          # Course metadata
├── mod-01-intro.md      # Module 1
├── mod-02-core.md       # Module 2
├── ...
└── quiz.json            # Quiz questions
```

2. **course.json** structure:

```json
{
  "id": "your-course-id",
  "title": "Course Title",
  "description": "Course description.",
  "price": 149,
  "passingScore": 80,
  "modules": [
    { "id": "mod-01", "title": "Module 1: Introduction", "file": "mod-01-intro.md", "order": 1 },
    { "id": "mod-02", "title": "Module 2: Core Concepts", "file": "mod-02-core.md", "order": 2 }
  ],
  "instructor": {
    "name": "Jivesh Sharma, M.D.",
    "credentials": "Medical Oncologist",
    "bio": "30+ years clinical experience."
  }
}
```

3. **quiz.json** structure:

```json
{
  "questions": [
    {
      "id": "q1",
      "moduleId": "mod-01",
      "question": "What is...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Because..."
    }
  ]
}
```

4. Push to `main`. The course will appear on `/course` and be available for enrollment.

---

### Adding Toolkit Items

1. Create a `.md` file in `/content/toolkit/`:

```yaml
---
title: "Tool Name"
description: "What this tool does."
category: "tools"       # Options: books | tools | education | frameworks
url: "https://example.com"
sortOrder: 5
---

Additional description or notes in Markdown.
```

---

### SEO — Automatic

All pages automatically get:
- **JSON-LD structured data** (Article, PodcastEpisode, Course, MedicalWebPage)
- **Open Graph tags** for social sharing
- **Sitemap.xml** updates when content is added
- **RSS feed** updates at `/rss.xml`

No manual SEO configuration needed.

---

### Admin Dashboard

Visit `/admin` (requires admin email in `ADMIN_EMAILS` env var) to see:
- Content counts (articles, episodes, courses)
- Recent content list
- Quick reference for adding content

---

### Deployment

| Action | Command |
|--------|---------|
| Local dev | `npm run dev` |
| Run tests | `npm test` |
| Build | `npm run build` |
| Deploy | Push to `main` → Vercel auto-deploys |

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAILS`
- `BEEHIIV_API_KEY` (optional)
- `BEEHIIV_PUBLICATION_ID` (optional)
- `STRIPE_SECRET_KEY` (for payments)
