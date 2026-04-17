"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeRedirect } from "@/lib/safe-redirect";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = redirect;
  }

  async function handleMagicLink() {
    if (!email) { setError("Enter your email first."); return; }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?redirect=${redirect}` },
    });
    if (error) { setError(error.message); }
    else { setError(""); alert("Check your email for the login link."); }
    setLoading(false);
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8">
        <h1 className="font-serif text-2xl font-bold">Sign In</h1>
        <p className="mt-1 text-sm text-slate-600">
          Access your courses, certificates, and saved articles.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-navy px-4 py-3 font-semibold text-white transition hover:bg-navy-light disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleMagicLink} className="text-sm text-teal transition hover:text-teal-dark">
            Or sign in with a magic link
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-teal hover:text-teal-dark">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
