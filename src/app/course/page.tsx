import Link from "next/link";
import { getCourseMetadata } from "@/lib/mdx/content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { courseSchema } from "@/lib/seo/schema";

export const metadata = genMeta({
  title: "OncologyIT Academy",
  description: "Professional certification courses in AI, oncology informatics, and clinical technology.",
  path: "/course",
});

export default function CoursePage() {
  const course = getCourseMetadata("ai-foundations");

  return (
    <>
      {course && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema(course)) }}
        />
      )}

      <section className="gradient-navy py-20 text-white">
        <div className="container-wide">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-light">
            OncologyIT Academy
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold md:text-5xl">
            {course?.title || "Foundations of AI in Healthcare"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {course?.description || "A comprehensive certification course for healthcare leaders."}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <span className="text-3xl font-bold text-teal-light">
              ${course?.price || 149}
            </span>
            <Link
              href="/login?redirect=/dashboard/courses/ai-foundations"
              className="rounded-lg bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-light"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      {course && (
        <section className="py-16">
          <div className="container-wide">
            <h2 className="font-serif text-3xl font-bold">Curriculum</h2>
            <p className="mt-2 text-slate-600">
              {course.modules.length} modules + Final Exam + Certificate of Completion
            </p>

            <div className="mt-8 space-y-3">
              {course.modules.map((mod, i) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-bold text-teal-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{mod.title}</h3>
                  </div>
                </div>
              ))}

              {/* Final Exam */}
              <div className="flex items-center gap-4 rounded-xl border-2 border-teal bg-teal/5 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">
                  ✓
                </span>
                <div>
                  <h3 className="font-semibold">Final Exam & Certification</h3>
                  <p className="text-sm text-slate-600">
                    Score &gt;{course.passingScore}% to earn your certificate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instructor */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-bold">Your Instructor</h2>
          <div className="mt-6 flex items-start gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-bold text-teal-light">
              JS
            </div>
            <div>
              <h3 className="text-xl font-bold">Jivesh Sharma, M.D.</h3>
              <p className="text-teal">Medical Oncologist · CEO, Nexgen Precision</p>
              <p className="mt-3 max-w-2xl text-slate-600">
                30+ years of clinical oncology experience. MIT Sloan AI Certificate holder.
                Building the intersection of cancer medicine and technology through
                vendor-independent analysis and education.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
