import Link from "next/link";
import { getAllEpisodes } from "@/lib/mdx/content";
import { formatDate } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "Podcast",
  description: "The OncologyIT Podcast — conversations on clinical AI, informatics, and technology leadership.",
  path: "/podcast",
});

export default function PodcastPage() {
  const episodes = getAllEpisodes();

  return (
    <section className="py-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl font-bold">The Podcast</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Deep conversations on clinical AI, oncology informatics, and
          technology leadership in healthcare.
        </p>

        <div className="mt-10 space-y-4">
          {episodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/podcast/${ep.slug}`}
              className="group flex items-start gap-6 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy text-xl font-bold text-teal-light">
                {ep.episodeNumber}
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold transition group-hover:text-teal">
                  {ep.title}
                </h2>
                <p className="mt-1 text-slate-600 line-clamp-2">
                  {ep.description}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {formatDate(ep.date)} · {ep.duration}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
