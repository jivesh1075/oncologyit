import type { MetadataRoute } from "next";
import { getAllArticles, getAllEpisodes, getAllCourseIds } from "@/lib/mdx/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.oncologyit.com";

/**
 * Dynamic sitemap that auto-updates as OpenClaws adds content.
 * Includes all articles, podcast episodes, courses, and static pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${BASE_URL}/writing/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const episodes = getAllEpisodes().map((e) => ({
    url: `${BASE_URL}/podcast/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const courses = getAllCourseIds().map((id) => ({
    url: `${BASE_URL}/course/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/writing`, priority: 0.9 },
    { url: `${BASE_URL}/podcast`, priority: 0.8 },
    { url: `${BASE_URL}/course`, priority: 0.9 },
    { url: `${BASE_URL}/toolkit`, priority: 0.7 },
    { url: `${BASE_URL}/safety-demo`, priority: 0.7 },
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/subscribe`, priority: 0.8 },
    { url: `${BASE_URL}/vendors`, priority: 0.6 },
    { url: `${BASE_URL}/resources`, priority: 0.5 },
    { url: `${BASE_URL}/contact`, priority: 0.4 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...articles, ...episodes, ...courses];
}
