export interface Vendor {
  id: string;
  name: string;
  slug: string;
  category: VendorCategory;
  description: string;
  founded: number;
  headquarters: string;
  ceo: string;
  employees: string;
  revenue: string;
  website: string;
  overview: string;
  oncologyFocus: string[];
  technologyStack: string[];
  recentDevelopments: string[];
  keyResources: Record<string, string>;
  logo?: string;
  featured: boolean;
}

export type VendorCategory = 'ehr-emr' | 'radiation-oncology' | 'genomics-precision-medicine' | 'clinical-analytics';

export interface Category {
  id: VendorCategory;
  name: string;
  description: string;
  icon: string;
  vendorCount: number;
}

export const CATEGORIES: Record<VendorCategory, Category> = {
  'ehr-emr': {
    id: 'ehr-emr',
    name: 'EHR/EMR Systems',
    description: 'Electronic Health Record and Electronic Medical Record systems specialized for oncology care',
    icon: '📋',
    vendorCount: 1
  },
  'radiation-oncology': {
    id: 'radiation-oncology',
    name: 'Radiation Oncology',
    description: 'Radiation therapy systems, treatment planning, and oncology information systems',
    icon: '⚡',
    vendorCount: 1
  },
  'genomics-precision-medicine': {
    id: 'genomics-precision-medicine',
    name: 'Genomics & Precision Medicine',
    description: 'Genomic testing, AI-powered precision medicine platforms, and molecular diagnostics',
    icon: '🧬',
    vendorCount: 1
  },
  'clinical-analytics': {
    id: 'clinical-analytics',
    name: 'Clinical Analytics',
    description: 'Real-world evidence, clinical data analytics, and research platforms',
    icon: '📊',
    vendorCount: 1
  }
};