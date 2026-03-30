"use client";

import { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { Search, FileText, Mic, BookOpen, Wrench, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/types";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  // CMD+K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Search
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  const iconMap: Record<string, React.ReactNode> = {
    article: <FileText className="h-4 w-4" aria-hidden="true" />,
    podcast: <Mic className="h-4 w-4" aria-hidden="true" />,
    course: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    toolkit: <Wrench className="h-4 w-4" aria-hidden="true" />,
  };

  return (
    <>
      {children}

      {/* Search Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[20vh]"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search OncologyIT"
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Search OncologyIT" shouldFilter={false}>
              <div className="flex items-center border-b border-slate-200 px-4">
                <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <Command.Input
                  placeholder="Search articles, podcasts, courses..."
                  className="flex-1 border-0 bg-transparent px-3 py-4 text-base text-navy outline-none placeholder:text-slate-400"
                  value={query}
                  onValueChange={setQuery}
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded p-1 text-slate-400 hover:text-slate-600"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2">
                {query.length >= 2 && results.length === 0 && (
                  <Command.Empty className="px-4 py-8 text-center text-sm text-slate-500">
                    No results found for &ldquo;{query}&rdquo;
                  </Command.Empty>
                )}

                {results.map((result) => (
                  <Command.Item
                    key={result.url}
                    value={result.title}
                    onSelect={() => {
                      router.push(result.url);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-50 aria-selected:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      {iconMap[result.type] || <FileText className="h-4 w-4" />}
                    </span>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium text-navy">
                        {result.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {result.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-500">
                      {result.type}
                    </span>
                  </Command.Item>
                ))}
              </Command.List>

              <div className="border-t border-slate-200 px-4 py-2 text-xs text-slate-400">
                <span className="font-mono">↑↓</span> navigate &middot;{" "}
                <span className="font-mono">↵</span> open &middot;{" "}
                <span className="font-mono">esc</span> close
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
