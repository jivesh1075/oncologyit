import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx/content";
import { formatDate, SITE_CONFIG } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { MDXContent } from "@/components/layout/mdx-content";
import { NewsletterForm } from "@/components/conversion/newsletter-form";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return genMeta({
    title: article.title,
    description: article.description,
    path: `/writing/${slug}`,
    type: "article",
    publishedTime: article.date,
    author: article.author || SITE_CONFIG.author.name,
    tags: article.topics,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const TAG_STYLES: Record<string, string> = {
    signal: "tag-pill tag-signal",
    "deep-dive": "tag-pill tag-deep-dive",
    framework: "tag-pill tag-framework",
    tutorial: "tag-pill tag-tutorial",
    news: "tag-pill tag-news",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleSchema({ ...article }),
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Writing", url: "/writing" },
              { name: article.title, url: `/writing/${slug}` },
            ]),
          ]),
        }}
      />

      <article className="py-16">
        <div className="container-narrow">
          {/* Header */}
          <header className="mb-10">
            <span className={TAG_STYLES[article.tag]}>{article.tag}</span>
            <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              {article.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
              <span>{article.author || SITE_CONFIG.author.name}</span>
              <span>&middot;</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>&middot;</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* Body */}
          <div className="prose">
            <MDXContent content={article.content} />
          </div>

          {/* Inline Newsletter CTA (Conversion Ladder) */}
          <div className="mt-16 rounded-xl border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-serif text-xl font-bold">
              Found this analysis useful?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Get the Weekly Signal — one email per week with the most important
              developments in oncology informatics and AI.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
