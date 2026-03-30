"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/writing", label: "Writing" },
  { href: "/podcast", label: "Podcast" },
  { href: "/course", label: "Academy" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/safety-demo", label: "Safety Demo" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="container-wide flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-navy"
          aria-label="OncologyIT Home"
        >
          <span className="font-serif text-2xl">Oncology</span>
          <span className="text-teal font-sans font-semibold">IT</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search trigger (CMD+K) */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400 transition hover:border-teal hover:text-teal md:flex"
            aria-label="Open search (Cmd+K)"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              );
            }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Search...</span>
            <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Subscribe CTA */}
          <Link
            href="/subscribe"
            className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark"
          >
            Subscribe
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={cn(
          "border-t border-slate-200 bg-white md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        role="menu"
      >
        <div className="container-wide space-y-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-4 py-2 text-base font-medium text-slate-600 transition hover:bg-slate-50 hover:text-navy"
              role="menuitem"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
