import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind CSS classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date for display */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Generate a URL-safe slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Calculate reading time from content */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/** Truncate text to a max length with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

/** Site configuration constants */
export const SITE_CONFIG = {
  name: "OncologyIT",
  tagline: "Where Cancer Medicine Meets Technology",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.oncologyit.com",
  author: {
    name: "Jivesh Sharma, M.D.",
    role: "Medical Oncologist & CEO, Nexgen Precision",
    credentials: "MIT Sloan AI Certificate",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/jiveshsharma",
  },
} as const;
