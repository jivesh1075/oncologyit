import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { BookOpen, Award, Bookmark, ArrowRight } from "lucide-react";

export const metadata = genMeta({
  title: "Dashboard",
  description: "Your OncologyIT dashboard — courses, certificates, and saved articles.",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ""}.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/dashboard/courses"
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
          >
            <BookOpen className="h-8 w-8 text-teal" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-serif text-lg font-bold group-hover:text-teal">
                My Courses
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Track your progress and continue learning.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:text-teal" />
          </Link>

          <Link
            href="/dashboard/certificates"
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
          >
            <Award className="h-8 w-8 text-teal" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-serif text-lg font-bold group-hover:text-teal">
                Certificates
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Download and verify your certificates.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:text-teal" />
          </Link>

          <Link
            href="/dashboard/saved"
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal hover:shadow-md"
          >
            <Bookmark className="h-8 w-8 text-teal" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-serif text-lg font-bold group-hover:text-teal">
                Saved Articles
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Articles you&apos;ve bookmarked for later.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:text-teal" />
          </Link>
        </div>

        {/* Account Info */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-lg font-bold">Account</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="font-medium text-slate-500">Email:</span> {user?.email}</p>
            <p><span className="font-medium text-slate-500">Member since:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
