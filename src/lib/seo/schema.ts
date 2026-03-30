/**
 * OncologyIT — JSON-LD Schema Generator
 * Automated structured data for all page types.
 * Supports: MedicalWebPage, Article, Course, PodcastEpisode
 */

import { SITE_CONFIG } from "@/lib/utils";
import type { ArticleFrontmatter, PodcastFrontmatter, CourseMetadata, JsonLdSchema } from "@/types";

const BASE_URL = SITE_CONFIG.url;

// ─── Organization Schema (site-wide) ───

export function organizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OncologyIT",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Where Cancer Medicine Meets Technology — Oncology informatics, AI in healthcare, and clinical technology leadership.",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      jobTitle: SITE_CONFIG.author.role,
    },
    sameAs: [SITE_CONFIG.social.linkedin],
  };
}

// ─── MedicalWebPage (homepage, about, resources) ───

export function medicalWebPageSchema(opts: {
  title: string;
  description: string;
  url: string;
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.url}`,
    publisher: organizationSchema(),
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Clinician",
      healthCondition: {
        "@type": "MedicalCondition",
        name: "Cancer",
      },
    },
  };
}

// ─── Article Schema ───

export function articleSchema(
  article: ArticleFrontmatter & { slug: string }
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author || SITE_CONFIG.author.name,
      url: `${BASE_URL}/about`,
    },
    publisher: organizationSchema(),
    url: `${BASE_URL}/writing/${article.slug}`,
    image: article.image || `${BASE_URL}/og/articles/${article.slug}.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/writing/${article.slug}`,
    },
    articleSection: article.tag,
    keywords: article.topics?.join(", "),
  };
}

// ─── Podcast Episode Schema ───

export function podcastEpisodeSchema(
  episode: PodcastFrontmatter & { slug: string }
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    datePublished: episode.date,
    episodeNumber: episode.episodeNumber,
    duration: `PT${episode.duration.replace(" min", "M")}`,
    url: `${BASE_URL}/podcast/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "The OncologyIT Podcast",
      url: `${BASE_URL}/podcast`,
    },
    ...(episode.audioUrl && {
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: episode.audioUrl,
        encodingFormat: "audio/mpeg",
      },
    }),
  };
}

// ─── Course Schema ───

export function courseSchema(course: CourseMetadata): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: organizationSchema(),
    url: `${BASE_URL}/course/${course.id}`,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      instructor: {
        "@type": "Person",
        name: course.instructor.name,
        description: course.instructor.bio,
      },
    },
    numberOfCredits: course.modules.length,
    educationalCredentialAwarded: "Certificate of Completion",
  };
}

// ─── Breadcrumb Schema ───

export function breadcrumbSchema(
  items: { name: string; url: string }[]
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
