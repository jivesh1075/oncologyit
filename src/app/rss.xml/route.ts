import { Feed } from "feed";
import { getAllArticles, getAllEpisodes } from "@/lib/mdx/content";
import { SITE_CONFIG } from "@/lib/utils";

const BASE_URL = SITE_CONFIG.url;

export async function GET() {
  const feed = new Feed({
    title: "OncologyIT",
    description: SITE_CONFIG.tagline,
    id: BASE_URL,
    link: BASE_URL,
    language: "en",
    copyright: `Copyright ${new Date().getFullYear()} OncologyIT`,
    author: {
      name: SITE_CONFIG.author.name,
      link: `${BASE_URL}/about`,
    },
  });

  const articles = getAllArticles();
  articles.forEach((a) => {
    feed.addItem({
      title: a.title,
      id: `${BASE_URL}/writing/${a.slug}`,
      link: `${BASE_URL}/writing/${a.slug}`,
      description: a.description,
      date: new Date(a.date),
      author: [{ name: a.author || SITE_CONFIG.author.name }],
    });
  });

  const episodes = getAllEpisodes();
  episodes.forEach((ep) => {
    feed.addItem({
      title: `EP ${ep.episodeNumber}: ${ep.title}`,
      id: `${BASE_URL}/podcast/${ep.slug}`,
      link: `${BASE_URL}/podcast/${ep.slug}`,
      description: ep.description,
      date: new Date(ep.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
