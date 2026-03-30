import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { getAllArticles, getAllEpisodes, getAllCourseIds, getCourseMetadata } from "@/lib/mdx/content";
import { FileText, Mic, BookOpen, Users, Activity, BarChart3 } from "lucide-react";

export const metadata = genMeta({
  title: "Admin Dashboard",
  description: "OncologyIT admin dashboard for the OpenClaws team.",
  path: "/admin",
});

export default function AdminPage() {
  const articles = getAllArticles();
  const episodes = getAllEpisodes();
  const courseIds = getAllCourseIds();
  const courses = courseIds.map((id) => getCourseMetadata(id)).filter(Boolean);

  const stats = [
    { label: "Published Articles", value: articles.length, icon: FileText },
    { label: "Podcast Episodes", value: episodes.length, icon: Mic },
    { label: "Courses", value: courses.length, icon: BookOpen },
    { label: "Total Modules", value: courses.reduce((acc, c) => acc + (c?.modules.length || 0), 0), icon: BarChart3 },
  ];

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-slate-600">
            OpenClaws content management and platform metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-teal" aria-hidden="true" />
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Articles */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold">
              <FileText className="h-5 w-5 text-teal" aria-hidden="true" />
              Recent Articles
            </h2>
            <div className="mt-4 space-y-3">
              {articles.slice(0, 5).map((a) => (
                <div key={a.slug} className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-slate-400">{a.date} · {a.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Podcast Episodes */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold">
              <Mic className="h-5 w-5 text-teal" aria-hidden="true" />
              Recent Episodes
            </h2>
            <div className="mt-4 space-y-3">
              {episodes.slice(0, 5).map((ep) => (
                <div key={ep.slug} className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <p className="text-sm font-medium">EP {ep.episodeNumber}: {ep.title}</p>
                    <p className="text-xs text-slate-400">{ep.date} · {ep.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Add Content */}
        <div className="mt-10 rounded-xl border border-teal/20 bg-teal/5 p-6">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold">
            <Activity className="h-5 w-5 text-teal" aria-hidden="true" />
            OpenClaws Quick Reference
          </h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p><strong>New Article:</strong> Drop a <code>.md</code> file in <code>/content/writing/</code> with frontmatter (title, description, date, tag).</p>
            <p><strong>New Episode:</strong> Drop a <code>.md</code> file in <code>/content/podcast/</code> with episode number and duration.</p>
            <p><strong>New Course:</strong> Create a folder in <code>/content/courses/</code> with <code>course.json</code>, module <code>.md</code> files, and <code>quiz.json</code>.</p>
            <p><strong>Deploy:</strong> Push to <code>main</code> branch. Vercel auto-deploys in ~60 seconds.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
