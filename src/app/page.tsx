import Link from "next/link";
import { getAllArticles, getFeaturedArticle, getAllEpisodes } from "@/lib/mdx/content";
import { formatDate } from "@/lib/utils";
import { medicalWebPageSchema, organizationSchema } from "@/lib/seo/schema";
import { generateMetadata } from "@/lib/seo/metadata";
import { NewsletterForm } from "@/components/conversion/newsletter-form";

export const metadata = generateMetadata({
  title: "OncologyIT — Where Cancer Medicine Meets Technology",
  description:
    "Expert analysis on oncology informatics, AI in healthcare, and clinical technology leadership by Jivesh Sharma, M.D.",
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const episodes = getAllEpisodes().slice(0, 3);
  const recent = articles.filter((a) => a.slug !== featured?.slug).slice(0, 4);

  const TAG_STYLES: Record<string, string> = {
    signal: "tag-pill tag-signal",
    "deep-dive": "tag-pill tag-deep-dive",
    framework: "tag-pill tag-framework",
    tutorial: "tag-pill tag-tutorial",
    news: "tag-pill tag-news",
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            medicalWebPageSchema({
              title: "OncologyIT",
              description: "Where Cancer Medicine Meets Technology",
              url: "/",
            }),
          ]),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="gradient-navy py-20 text-white md:py-28">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-light">
              Oncology Informatics & AI
            </p>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Where Cancer Medicine{" "}
              <span className="text-teal-light">Meets Technology</span>
            </h1>
            <p className="mb-8 text-lg text-slate-300 md:text-xl">
              Independent analysis for oncology leaders navigating AI, clinical
              informatics, and technology transformation. No vendor ties. No
              sponsored content.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-light"
              >
                Get the Weekly Signal
              </Link>
              <Link
                href="/course"
                className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-6 py-3 font-semibold text-white transition hover:border-white"
              >
                Explore the Academy
              </Link>
            </div>
          </div>

          {/* Author Card */}
          <div className="mt-12 flex items-center gap-4 border-t border-slate-700 pt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-xl font-bold text-teal-light">
              JS
            </div>
            <div>
              <p className="font-semibold">Jivesh Sharma, M.D.</p>
              <p className="text-sm text-slate-400">
                Medical Oncologist · CEO, Nexgen Precision · MIT Sloan AI Certificate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      {featured && (
        <section className="border-b border-slate-200 py-16">
          <div className="container-wide">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-teal">
              Featured
            </p>
            <Link href={`/writing/${featured.slug}`} className="group block">
              <span className={TAG_STYLES[featured.tag]}>
                {featured.tag}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold transition group-hover:text-teal md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                {featured.description}
              </p>
              <p className="mt-3 text-sm text-slate-400">
                {formatDate(featured.date)} · {featured.readTime}
              </p>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Recent Articles ─── */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">Latest Analysis</h2>
            <Link
              href="/writing"
              className="text-sm font-medium text-teal transition hover:text-teal-dark"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {recent.map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
              >
                <span className={TAG_STYLES[article.tag]}>{article.tag}</span>
                <h3 className="mt-3 font-serif text-xl font-bold transition group-hover:text-teal">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {article.description}
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  {formatDate(article.date)} · {article.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Podcast Band ─── */}
      <section className="gradient-navy py-16 text-white">
        <div className="container-wide">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">The Podcast</h2>
            <Link
              href="/podcast"
              className="text-sm font-medium text-teal-light transition hover:text-white"
            >
              All episodes &rarr;
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {episodes.map((ep) => (
              <Link
                key={ep.slug}
                href={`/podcast/${ep.slug}`}
                className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-teal"
              >
                <p className="mb-1 text-xs font-medium text-teal-light">
                  EP {ep.episodeNumber} · {ep.duration}
                </p>
                <h3 className="font-serif text-lg font-bold transition group-hover:text-teal-light">
                  {ep.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {ep.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter Signup ─── */}
      <section className="py-16">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl font-bold">
            Get the Weekly Signal
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-600">
            One email per week. The most important developments in oncology
            informatics, AI, and clinical technology — distilled by a practicing
            oncologist.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
