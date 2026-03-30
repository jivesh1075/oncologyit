"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?redirect=/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold">Check Your Email</h1>
          <p className="mt-3 text-slate-600">
            We sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8">
        <h1 className="font-serif text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-sm text-slate-600">
          Join OncologyIT to access courses and track your progress.
        </p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="signup-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
            <p className="mt-1 text-xs text-slate-500">Minimum 8 characters</p>
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-teal px-4 py-3 font-semibold text-white transition hover:bg-teal-dark disabled:opacity-60">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-teal hover:text-teal-dark">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
