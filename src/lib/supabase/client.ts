import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in Client Components.
 * Uses the browser client from @supabase/ssr for cookie-based auth.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
  );
}
