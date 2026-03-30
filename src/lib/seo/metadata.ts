/**
 * OncologyIT — Metadata Generator
 * Creates Next.js Metadata objects for each page type.
 */

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/utils";

const BASE_URL = SITE_CONFIG.url;

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate a complete Next.js Metadata object for any page.
 * Handles title template, OG tags, Twitter cards, and canonical URL.
 */
export function generateMetadata(opts: MetaOptions): Metadata {
  const url = `${BASE_URL}${opts.path}`;
  const ogImage = opts.ogImage || `${BASE_URL}/og-default.png`;
  const title = opts.title;

  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: (opts.type as "website" | "article" | "profile") || "website",
      ...(opts.publishedTime && { publishedTime: opts.publishedTime }),
      ...(opts.author && {
        authors: [opts.author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [ogImage],
    },
    ...(opts.tags && { keywords: opts.tags }),
  };
}

/** Default site metadata for the root layout */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "OncologyIT — Where Cancer Medicine Meets Technology",
    template: "%s | OncologyIT",
  },
  description:
    "Expert analysis on oncology informatics, AI in healthcare, and clinical technology leadership. By Jivesh Sharma, M.D.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
