import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['deep-dive', 'signal', 'framework', 'analysis', 'opinion']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readTime: z.string().optional(),
  }),
});

const podcast = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    episodeNumber: z.number(),
    duration: z.string(),
    audioUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const toolkit = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['books', 'tools', 'education', 'frameworks']),
    url: z.string().optional(),
    affiliateUrl: z.string().optional(),
    sortOrder: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, podcast, toolkit };
