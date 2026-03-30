import { notFound } from "next/navigation";
import { getAllEpisodes, getEpisodeBySlug } from "@/lib/mdx/content";
import { formatDate, SITE_CONFIG } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { podcastEpisodeSchema } from "@/lib/seo/schema";
import { MDXContent } from "@/components/layout/mdx-content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEpisodes().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  return genMeta({
    title: `EP ${ep.episodeNumber}: ${ep.title}`,
    description: ep.description,
    path: `/podcast/${slug}`,
  });
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastEpisodeSchema({ ...ep })),
        }}
      />

      <article className="py-16">
        <div className="container-narrow">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal">
              Episode {ep.episodeNumber}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              {ep.title}
            </h1>
            <p className="mt-3 text-lg text-slate-600">{ep.description}</p>
            <p className="mt-3 text-sm text-slate-400">
              {formatDate(ep.date)} · {ep.duration}
            </p>

            {/* Audio Player */}
            {ep.audioUrl ? (
              <audio
                controls
                className="mt-6 w-full"
                preload="metadata"
                aria-label={`Play episode ${ep.episodeNumber}: ${ep.title}`}
              >
                <source src={ep.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-500">
                Audio coming soon — show notes below.
              </div>
            )}
          </header>

          <div className="prose">
            <MDXContent content={ep.content} />
          </div>
        </div>
      </article>
    </>
  );
}
