import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in Client Components.
 * Uses the browser client from @supabase/ssr for cookie-based auth.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (process.env.NODE_ENV === "development" && (!url || !key)) {
    console.warn("[supabase/client] Running with placeholder credentials — no real Supabase access");
  }
  return createBrowserClient(
    url || "https://placeholder.supabase.co",
    key || "placeholder"
  );
}
