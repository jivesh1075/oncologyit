import { NextRequest, NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/mdx/content";
import type { SearchResult } from "@/types";

/**
 * GET /api/search?q=query
 * Full-text search across all content types.
 * In production, replace with Supabase pgvector for semantic search.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const index = buildSearchIndex();

  const results = index
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    )
    .slice(0, 10)
    .map((item) => ({
      type: item.type as SearchResult["type"],
      title: item.title,
      description: item.description,
      slug: item.slug,
      url: item.url,
      score: item.title.toLowerCase().includes(q) ? 1 : 0.5,
    }));

  return NextResponse.json({ results });
}
