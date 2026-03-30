import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  Article,
  ArticleFrontmatter,
  PodcastEpisode,
  PodcastFrontmatter,
  ToolkitItem,
  ToolkitItemFrontmatter,
  CourseMetadata,
  QuizQuestion,
} from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Generic Content Loader ───

function loadMarkdownFiles<T>(directory: string): (T & { slug: string; content: string })[] {
  const dir = path.join(CONTENT_DIR, directory);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.(md|mdx)$/, "");

      // Ensure date fields are strings (gray-matter parses unquoted dates as Date objects)
      if (data.date instanceof Date) {
        data.date = data.date.toISOString().split("T")[0];
      }

      return {
        ...(data as T),
        slug,
        content,
      };
    });
}

// ─── Articles ───

export function getAllArticles(): Article[] {
  const articles = loadMarkdownFiles<ArticleFrontmatter>("writing");
  return articles
    .filter((a) => !a.draft)
    .map((a) => ({
      ...a,
      readTime: a.readTime || readingTime(a.content).text,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  return getAllArticles().find((a) => a.featured);
}

// ─── Podcast Episodes ───

export function getAllEpisodes(): PodcastEpisode[] {
  const episodes = loadMarkdownFiles<PodcastFrontmatter>("podcast");
  return episodes
    .filter((e) => !e.draft)
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
}

export function getEpisodeBySlug(slug: string): PodcastEpisode | undefined {
  return getAllEpisodes().find((e) => e.slug === slug);
}

// ─── Toolkit Items ───

export function getAllToolkitItems(): ToolkitItem[] {
  const items = loadMarkdownFiles<ToolkitItemFrontmatter>("toolkit");
  return items.sort((a, b) => a.sortOrder - b.sortOrder);
}

// ─── Courses ───

export function getCourseMetadata(courseId: string): CourseMetadata | null {
  const courseDir = path.join(CONTENT_DIR, "courses", courseId);
  const metaPath = path.join(courseDir, "course.json");
  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf-8");
  const data = JSON.parse(raw);

  // Map from actual JSON shape to CourseMetadata interface
  return {
    id: data.id || courseId,
    title: data.title,
    description: data.description || data.subtitle || "",
    price: data.price ?? (data.price_cents ? data.price_cents / 100 : 0),
    passingScore: data.passingScore ?? data.passing_score ?? 80,
    stripePriceId: data.stripePriceId || data.stripe_price_id,
    modules: (data.modules || []).map((m: Record<string, unknown>) => ({
      id: m.id as string,
      title: m.title as string,
      file: (m.file || m.content_file || "") as string,
      order: (m.order ?? 0) as number,
    })),
    instructor: data.instructor || {
      name: "Jivesh Sharma, M.D.",
      credentials: "Medical Oncologist · MIT Sloan AI Certificate",
      bio: "30+ years of clinical oncology experience.",
    },
  } as CourseMetadata;
}

export function getCourseModule(courseId: string, moduleFile: string): string | null {
  const filePath = path.join(CONTENT_DIR, "courses", courseId, moduleFile);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

export function getCourseQuiz(courseId: string): QuizQuestion[] {
  const quizPath = path.join(CONTENT_DIR, "courses", courseId, "quiz.json");
  if (!fs.existsSync(quizPath)) return [];

  const raw = fs.readFileSync(quizPath, "utf-8");
  const data = JSON.parse(raw);
  return (data.questions || data) as QuizQuestion[];
}

export function getAllCourseIds(): string[] {
  const coursesDir = path.join(CONTENT_DIR, "courses");
  if (!fs.existsSync(coursesDir)) return [];

  return fs
    .readdirSync(coursesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

// ─── Search Index (for CMD+K) ───

export function buildSearchIndex(): { type: string; title: string; description: string; slug: string; url: string }[] {
  const articles = getAllArticles().map((a) => ({
    type: "article" as const,
    title: a.title,
    description: a.description,
    slug: a.slug,
    url: `/writing/${a.slug}`,
  }));

  const episodes = getAllEpisodes().map((e) => ({
    type: "podcast" as const,
    title: e.title,
    description: e.description,
    slug: e.slug,
    url: `/podcast/${e.slug}`,
  }));

  const courses = getAllCourseIds()
    .map((id) => getCourseMetadata(id))
    .filter(Boolean)
    .map((c) => ({
      type: "course" as const,
      title: c!.title,
      description: c!.description,
      slug: c!.id,
      url: `/course/${c!.id}`,
    }));

  return [...articles, ...episodes, ...courses];
}
