import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'OncologyIT — Where Cancer Medicine Meets Technology',
    description: 'Independent analysis on AI, health IT, and the systems reshaping oncology. By Jivesh Sharma, M.D.',
    site: context.site || 'https://oncologyit.com',
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.description,
      link: `/articles/${article.id.replace(/\.md$/, '')}`,
    })),
    customData: '<language>en-us</language>',
  });
}
