export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  website: string;
  founded: number;
  headquarters: string;
  employees?: string;
  revenue?: string;
  oncologyFocus: string[];
  keyProducts: string[];
  recentDevelopments: string[];
}

export const CATEGORIES = [
  { id: 'ehr-emr', name: 'EHR/EMR Systems', description: 'Electronic health record systems for oncology' },
  { id: 'radiation-oncology', name: 'Radiation Oncology', description: 'Radiation therapy technology and software' },
  { id: 'genomics-precision-medicine', name: 'Genomics & Precision Medicine', description: 'Genomic testing and AI-driven precision medicine' },
  { id: 'clinical-analytics', name: 'Clinical Analytics', description: 'Real-world evidence and clinical data analytics' },
  { id: 'practice-management', name: 'Practice Management', description: 'Revenue cycle management and practice operations software' },
  { id: 'digital-pathology', name: 'Digital Pathology', description: 'AI-powered pathology and diagnostic imaging solutions' }
];

export const VENDORS: Vendor[] = [
  {
    id: 'epic-systems',
    name: 'Epic Systems',
    category: 'ehr-emr',
    description: 'Leading EHR provider with comprehensive oncology module (Epic Beacon) for cancer centers.',
    website: 'https://www.epic.com',
    founded: 1979,
    headquarters: 'Verona, Wisconsin',
    employees: '12,000+',
    revenue: '$5.7B (2024 est.)',
    oncologyFocus: ['Oncology EHR', 'Clinical workflows', 'Research integration'],
    keyProducts: ['Epic Beacon', 'Cosmos research network', 'MyChart patient portal'],
    recentDevelopments: ['AI/ML expansion', 'Digital tumor boards', 'Enhanced interoperability']
  },
  {
    id: 'varian-medical',
    name: 'Varian Medical Systems',
    category: 'radiation-oncology',
    description: 'Global leader in radiation oncology technology, now part of Siemens Healthineers.',
    website: 'https://www.varian.com',
    founded: 1948,
    headquarters: 'Palo Alto, California',
    employees: '11,000+',
    revenue: '$3.2B (2023)',
    oncologyFocus: ['Radiation therapy', 'Proton therapy', 'Adaptive radiotherapy'],
    keyProducts: ['TrueBeam', 'Halcyon', 'Ethos', 'ProBeam'],
    recentDevelopments: ['Siemens Healthineers acquisition', 'Ethos AI adaptive therapy', 'Flash therapy research']
  },
  {
    id: 'tempus',
    name: 'Tempus',
    category: 'genomics-precision-medicine',
    description: 'AI-enabled precision medicine platform combining genomic data with clinical insights.',
    website: 'https://www.tempus.com',
    founded: 2015,
    headquarters: 'Chicago, Illinois',
    employees: '2,300+',
    revenue: '$367.2M (Q4 2025)',
    oncologyFocus: ['Genomic profiling', 'Liquid biopsy', 'AI-driven biomarkers'],
    keyProducts: ['Tempus Platform', 'Tempus xT', 'Tempus xF', 'Tempus xG'],
    recentDevelopments: ['2024 IPO', 'Ambry Genetics acquisition', 'Strategic pharma partnerships']
  },
  {
    id: 'flatiron-health',
    name: 'Flatiron Health',
    category: 'clinical-analytics',
    description: 'Real-world evidence platform for oncology, acquired by Roche in 2018.',
    website: 'https://www.flatiron.com',
    founded: 2012,
    headquarters: 'New York City, New York',
    employees: '1,500+',
    revenue: 'Part of Roche ($1.9B acquisition)',
    oncologyFocus: ['Real-world evidence', 'Clinical analytics', 'EHR data aggregation'],
    keyProducts: ['OncoEMR', 'Flatiron Platform', 'Flatiron Clinical Pipe', 'Flatiron Trials'],
    recentDevelopments: ['Roche integration', 'Horizon Datascapes launch', '2,000+ publications']
  },
  {
    id: 'nextech',
    name: 'Nextech',
    category: 'practice-management',
    description: 'Comprehensive practice management and EHR solution specifically designed for specialty practices including oncology, dermatology, and ophthalmology.',
    website: 'https://www.nextech.com',
    founded: 1997,
    headquarters: 'Tampa, Florida',
    employees: '1,200+',
    revenue: '$300M+ (2024 est.)',
    oncologyFocus: ['Oncology practice management', 'Revenue cycle management', 'Clinical documentation'],
    keyProducts: ['Nextech EHR', 'Nextech Practice Management', 'Nextech Interoperability', 'Nextech Analytics'],
    recentDevelopments: ['Private equity acquisition by TPG', 'AI-powered documentation tools', 'Enhanced telehealth capabilities']
  },
  {
    id: 'pathai',
    name: 'PathAI',
    category: 'digital-pathology',
    description: 'AI-powered digital pathology platform that enhances diagnostic accuracy and accelerates drug development in oncology through advanced image analysis.',
    website: 'https://www.pathai.com',
    founded: 2016,
    headquarters: 'Boston, Massachusetts',
    employees: '400+',
    revenue: '$100M+ (2024 est.)',
    oncologyFocus: ['Digital pathology', 'AI diagnostics', 'Biomarker discovery', 'Clinical trial enrichment'],
    keyProducts: ['PathAI Platform', 'AIM-PD-L1', 'AIM-HER2', 'PathExplore'],
    recentDevelopments: ['FDA clearance for AI algorithms', 'Major pharma partnerships', '$100M+ Series D funding']
  },
  {
    id: 'navigating-cancer',
    name: 'Navigating Cancer',
    category: 'practice-management',
    description: 'Patient engagement platform specifically designed for oncology practices, improving patient experience and clinical outcomes through digital navigation.',
    website: 'https://www.navigatingcancer.com',
    founded: 2008,
    headquarters: 'Seattle, Washington',
    employees: '200+',
    revenue: '$50M+ (2024 est.)',
    oncologyFocus: ['Patient navigation', 'Symptom management', 'Remote monitoring', 'Care coordination'],
    keyProducts: ['Patient Relationship Management', 'Symptom Care Management', 'Clinical Trials Matching', 'Patient Education'],
    recentDevelopments: ['Partnership with Epic Systems', 'Expansion to 500+ cancer centers', 'AI-driven symptom prediction']
  }
];

export function getVendorsByCategory(categoryId: string): Vendor[] {
  return VENDORS.filter(vendor => vendor.category === categoryId);
}

export function getVendorById(id: string): Vendor | undefined {
  return VENDORS.find(vendor => vendor.id === id);
}

export function getAllVendors(): Vendor[] {
  return VENDORS;
}

export function getFeaturedVendors(): Vendor[] {
  return VENDORS; // For now, all vendors are featured
}
