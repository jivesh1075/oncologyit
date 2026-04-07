/**
 * OncologyIT Platform — Core Type Definitions
 * IEC 62304 Class B Software — Type safety for clinical data paths
 */

// ─── Content Types ───

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  tag: "signal" | "deep-dive" | "framework" | "tutorial" | "news";
  featured?: boolean;
  draft?: boolean;
  readTime?: string;
  author?: string;
  image?: string;
  topics?: string[];
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export interface PodcastFrontmatter {
  title: string;
  description: string;
  date: string;
  episodeNumber: number;
  duration: string;
  audioUrl?: string;
  draft?: boolean;
  topics?: string[];
}

export interface PodcastEpisode extends PodcastFrontmatter {
  slug: string;
  content: string;
}

export interface ToolkitItemFrontmatter {
  title: string;
  description: string;
  category: "books" | "tools" | "education" | "frameworks";
  url?: string;
  affiliateUrl?: string;
  sortOrder: number;
}

export interface ToolkitItem extends ToolkitItemFrontmatter {
  slug: string;
  content: string;
}

// ─── Course / LMS Types ───

export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  price: number;
  modules: CourseModuleMeta[];
  passingScore: number;
  stripePriceId?: string;
  instructor: {
    name: string;
    credentials: string;
    bio: string;
  };
}

export interface CourseModuleMeta {
  id: string;
  title: string;
  file: string;
  order: number;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSubmission {
  courseId: string;
  answers: Record<string, number>; // questionId -> selectedIndex
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  moduleId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateId: string;
  nameOnCert: string;
  overallScore: number;
  issuedAt: string;
}

// ─── Safety Engine Types (FHIR R4 aligned) ───

/**
 * Laboratory result for dose-clearance validation.
 * Aligns with FHIR R4 Observation resource (lab results).
 * IEC 62304 — Safety-critical data type.
 */
export interface LabResult {
  /** Absolute Neutrophil Count in cells/mm³ */
  anc: number;
  /** Platelet count in cells/mm³ */
  platelets: number;
  /** Hemoglobin in g/dL (informational) */
  hemoglobin?: number;
  /** Date the lab was drawn */
  collectionDate: string;
  /** FHIR Patient reference ID */
  patientId: string;
}

/**
 * Result of dose-clearance validation.
 * IEC 62304 — Safety-critical output type.
 */
export interface DoseClearanceResult {
  /** Whether treatment may proceed */
  cleared: boolean;
  /** Machine-readable status */
  status: "CLEARED" | "HOLD" | "HARD_STOP";
  /** Human-readable clinical rationale */
  reasons: string[];
  /** Lab values that triggered the decision */
  triggeringValues: {
    parameter: string;
    value: number;
    threshold: number;
    unit: string;
  }[];
  /** ISO 8601 timestamp of validation */
  validatedAt: string;
  /** ID of the validating clinician or system */
  validatedBy: string;
}

/**
 * HIPAA audit log entry for PHI access events.
 * 45 CFR § 164.312(b) — Audit controls.
 */
export interface HipaaAuditEntry {
  timestamp: string;
  userId: string;
  action: "VIEW" | "CREATE" | "UPDATE" | "DELETE" | "EXPORT" | "VALIDATE";
  resourceType: string;
  resourceId: string;
  patientId?: string;
  ipAddress?: string;
  userAgent?: string;
  outcome: "SUCCESS" | "FAILURE" | "DENIED";
  details?: string;
}

// ─── Vendor Types ───

export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  founded: number;
  headquarters: string;
  employees: string;
  revenue: string;
  oncologyFocus: string[];
  keyProducts: string[];
  recentDevelopments: string[];
  featured?: boolean;
}

export interface VendorCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

// ─── User / Auth Types ───

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface SavedArticle {
  userId: string;
  articleSlug: string;
  savedAt: string;
}

// ─── Newsletter Types ───

export interface NewsletterSubscription {
  email: string;
  name?: string;
  source: "website" | "course" | "lead-magnet" | "import";
}

// ─── Search Types ───

export interface SearchResult {
  type: "article" | "podcast" | "course" | "toolkit";
  title: string;
  description: string;
  slug: string;
  url: string;
  score?: number;
}

// ─── SEO Types ───

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export interface JsonLdSchema {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}
