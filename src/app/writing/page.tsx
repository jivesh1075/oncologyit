import Link from "next/link";
import { getAllArticles } from "@/lib/mdx/content";
import { formatDate } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "Writing",
  description: "Deep analysis on oncology informatics, AI in healthcare, and clinical technology.",
  path: "/writing",
});

export default function WritingPage() {
  const articles = getAllArticles();

  const TAG_STYLES: Record<string, string> = {
    signal: "tag-pill tag-signal",
    "deep-dive": "tag-pill tag-deep-dive",
    framework: "tag-pill tag-framework",
    tutorial: "tag-pill tag-tutorial",
    news: "tag-pill tag-news",
  };

  return (
    <section className="py-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl font-bold">Writing</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Signal reports, deep dives, and frameworks for oncology leaders
          navigating AI and clinical technology.
        </p>

        <div className="mt-10 space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group block rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <span className={TAG_STYLES[article.tag]}>{article.tag}</span>
                  <h2 className="mt-2 font-serif text-xl font-bold transition group-hover:text-teal">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-slate-600 line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-slate-400 md:text-right">
                  {formatDate(article.date)}
                  <br />
                  {article.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
