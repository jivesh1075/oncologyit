/**
 * safe-redirect.ts — reject open-redirect vectors before navigating the user
 * away from the site.
 *
 * Accepted: in-app relative paths that begin with "/" followed by a non-slash,
 * non-backslash character. Everything else falls back to the provided default.
 *
 * Rejects:
 *   - null / undefined / empty string
 *   - absolute URLs (https://evil.example, javascript:, data:)
 *   - protocol-relative URLs (//evil.example)
 *   - backslash tricks (/\evil.example)
 *   - paths that do not start with "/"
 */
export function safeRedirect(
  value: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (typeof value !== "string" || value.length === 0) return fallback;
  // Must start with "/" and next char must not be "/" or "\"
  if (!/^\/[^/\\]/.test(value)) return fallback;
  return value;
}
