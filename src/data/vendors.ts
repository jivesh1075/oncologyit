/**
 * OncologyIT Vendor Directory
 * 
 * Comprehensive database of oncology health IT vendors.
 * Used to power the /vendors directory page and vendor profiles.
 * 
 * Data quality standards:
 * - All fields must be verified with public sources
 * - Revenue/employee estimates should be labeled as such
 * - Focus areas should be specific to oncology
 * - Keep descriptions concise and factual
 */

import type { Vendor, VendorCategory } from '@/types';

// ─── Vendor Categories ───
export const CATEGORIES: VendorCategory[] = [
  {
    id: 'ehr-emr',
    name: 'EHR/EMR',
    description: 'Electronic health record and practice management systems specifically designed for oncology workflows.',
    icon: '🏥'
  },
  {
    id: 'radiation-oncology',
    name: 'Radiation Oncology',
    description: 'Treatment planning, delivery, and management systems for radiation therapy.',
    icon: '☢️'
  },
  {
    id: 'genomics-precision-medicine',
    name: 'Genomics & Precision Medicine',
    description: 'Genomic testing, biomarker analysis, and personalized treatment decision support.',
    icon: '🧬'
  },
  {
    id: 'clinical-analytics',
    name: 'Clinical Analytics',
    description: 'Real-world evidence, outcomes tracking, and population health analytics for oncology.',
    icon: '📊'
  },
  {
    id: 'practice-management',
    name: 'Practice Management',
    description: 'Revenue cycle management, scheduling, billing, and operational software for oncology practices.',
    icon: '💼'
  },
  {
    id: 'clinical-trial-matching',
    name: 'Clinical Trial Matching',
    description: 'AI-powered platforms that match cancer patients to appropriate clinical trials.',
    icon: '🔬'
  },
  {
    id: 'digital-pathology',
    name: 'Digital Pathology',
    description: 'AI-powered pathology image analysis and digital workflow solutions for cancer diagnosis.',
    icon: '🔍'
  },
  {
    id: 'patient-engagement',
    name: 'Patient Engagement',
    description: 'Patient portals, navigation platforms, and remote monitoring tools for cancer care.',
    icon: '❤️'
  },
  {
    id: 'ai-clinical-decision-support',
    name: 'AI Clinical Decision Support',
    description: 'Artificial intelligence systems that assist oncologists with diagnosis, treatment planning, and clinical decision-making.',
    icon: '🤖'
  },
  {
    id: 'population-health-registry',
    name: 'Population Health & Registry',
    description: 'Real-world evidence platforms, cancer registries, and population health analytics for oncology.',
    icon: '📈'
  }
];

// ─── Vendors ───
export const VENDORS: Vendor[] = [
  {
    id: 'nextech',
    name: 'Nextech',
    category: 'practice-management',
    description: 'Nextech provides specialty-specific EHR and practice management solutions for oncology practices, with deep integration for revenue cycle management, clinical workflows, and patient engagement. Their oncology-specific modules support chemotherapy ordering, infusion tracking, and clinical trial management.',
    website: 'https://www.nextech.com',
    founded: 1997,
    headquarters: 'Tampa, Florida',
    employees: '500-1,000',
    revenue: '$80-100M (est.)',
    oncologyFocus: ['Medical Oncology', 'Hematology', 'Radiation Oncology'],
    keyProducts: ['Nextech EHR', 'Practice Management', 'Interoperability Suite', 'Patient Portal'],
    recentDevelopments: [
      'AI-powered clinical documentation assistance',
      'Enhanced oncology-specific billing automation',
      'Real-time prior authorization integration',
      'Expanded clinical trial management capabilities'
    ],
    featured: true
  },
  {
    id: 'pathai',
    name: 'PathAI',
    category: 'digital-pathology',
    description: 'PathAI develops AI-powered digital pathology solutions that improve diagnostic accuracy and enable precision medicine in oncology. Their platform analyzes pathology images to provide quantitative insights for cancer diagnosis, prognosis, and treatment response prediction.',
    website: 'https://www.pathai.com',
    founded: 2016,
    headquarters: 'Boston, Massachusetts',
    employees: '200-500',
    revenue: '$50-100M (est.)',
    oncologyFocus: ['Digital Pathology', 'Biomarker Discovery', 'Treatment Response Prediction'],
    keyProducts: ['AIM-NSCLC', 'AIM-PD-L1', 'PathExplore Platform', 'Research Services'],
    recentDevelopments: [
      'FDA clearance for AI-powered NSCLC PD-L1 scoring',
      'Partnerships with major pharmaceutical companies for drug development',
      'Expansion into multiple cancer types including breast and prostate',
      'Integration with major pathology scanner vendors'
    ],
    featured: true
  },
  {
    id: 'trialjectory',
    name: 'TrialJectory (Leal Health)',
    category: 'clinical-trial-matching',
    description: 'TrialJectory (now Leal Health) is an AI-powered clinical trial matching platform that empowers cancer patients to find and access appropriate clinical trials. The platform analyzes patient clinical profiles against trial eligibility criteria to provide personalized trial recommendations.',
    website: 'https://www.lealhealth.com',
    founded: 2017,
    headquarters: 'New York, New York',
    employees: '50-100',
    revenue: '$10-20M (est.)',
    oncologyFocus: ['Clinical Trial Matching', 'Patient Empowerment', 'Trial Recruitment'],
    keyProducts: ['Patient Matching Platform', 'Physician Portal', 'Pharma Services', 'Real-World Data Analytics'],
    recentDevelopments: [
      '$20M Series A funding led by Insight Partners',
      'Rebranded to Leal Health with expanded services',
      'Partnerships with major cancer centers and pharma companies',
      'AI algorithm improvements increasing match accuracy by 40%'
    ],
    featured: true
  },
  {
    id: 'navigating-cancer',
    name: 'Navigating Cancer',
    category: 'patient-engagement',
    description: 'Navigating Cancer provides a comprehensive digital health platform for oncology practices to optimize patient engagement, streamline clinical workflows, and enhance care outcomes. Their platform includes patient portals, remote symptom monitoring, and care coordination tools.',
    website: 'https://www.navigatingcare.com',
    founded: 2008,
    headquarters: 'Seattle, Washington',
    employees: '100-250',
    revenue: '$20-50M (est.)',
    oncologyFocus: ['Patient Engagement', 'Remote Monitoring', 'Care Coordination', 'Symptom Management'],
    keyProducts: ['Patient Portal', 'Remote Symptom Monitoring', 'Care Coordination Platform', 'Analytics Dashboard'],
    recentDevelopments: [
      'Expanded integration with major oncology EHR systems',
      'Enhanced remote patient monitoring for immunotherapy patients',
      'Real-time symptom alerting to clinical teams',
      'Partnerships with over 2,500 oncology providers nationwide'
    ]
  },
  {
    id: 'massive-bio',
    name: 'Massive Bio',
    category: 'clinical-trial-matching',
    description: 'Massive Bio is an AI-powered platform that connects cancer patients to clinical trials globally, using proprietary algorithms to match patients based on their genomic and clinical profiles. The platform operates across 17 countries and partners with pharmaceutical companies to accelerate trial recruitment.',
    website: 'https://massivebio.com',
    founded: 2015,
    headquarters: 'Istanbul, Turkey (with US operations)',
    employees: '51-200',
    revenue: '$10-20M (est.)',
    oncologyFocus: ['Clinical Trial Matching', 'Precision Oncology', 'Global Trial Access'],
    keyProducts: ['AI Trial Matching Platform', 'Virtual Tumor Board', 'Pharma Partnership Services', 'Global Trial Network'],
    recentDevelopments: [
      'Expansion to 17 countries across North America, Europe, and LATAM',
      'Partnerships with major pharmaceutical companies for trial recruitment',
      'AI algorithm enhancements improving match accuracy',
      'Integration with community oncology practices nationwide'
    ]
  },
  {
    id: 'canceriq',
    name: 'CancerIQ',
    category: 'ai-clinical-decision-support',
    description: 'CancerIQ provides an AI-powered platform that helps healthcare providers identify patients at genetic risk for cancer and deliver personalized prevention plans. The platform integrates genetic data with clinical information to support risk assessment, early detection, and personalized treatment planning.',
    website: 'https://www.canceriq.com',
    founded: 2013,
    headquarters: 'Chicago, Illinois',
    employees: '11-50',
    revenue: '$5-10M (est.)',
    oncologyFocus: ['Genetic Risk Assessment', 'Cancer Prevention', 'Early Detection', 'Personalized Care Planning'],
    keyProducts: ['Risk Assessment Platform', 'Genetic Counseling Tools', 'Prevention Planning', 'Clinical Decision Support'],
    recentDevelopments: [
      '$23.9M in total funding including investment from Amgen',
      'Expansion of genetic risk assessment capabilities',
      'Integration with major EHR systems for point-of-care genetic evaluation',
      'Partnerships with health systems for population cancer risk screening'
    ]
  },
  {
    id: 'cota',
    name: 'COTA Healthcare',
    category: 'population-health-registry',
    description: 'COTA Healthcare is an oncology real-world data and analytics company that organizes complex cancer data to provide insights for research, drug development, and clinical care. Founded by oncologists and data scientists, COTA transforms fragmented real-world data into actionable intelligence for improving cancer outcomes.',
    website: 'https://cotahealthcare.com',
    founded: 2011,
    headquarters: 'New York, New York',
    employees: '100-250',
    revenue: '$20-50M (est.)',
    oncologyFocus: ['Real-World Evidence', 'Clinical Analytics', 'Drug Development', 'Outcomes Research'],
    keyProducts: ['Real-World Data Platform', 'Analytics Suite', 'Regulatory Solutions', 'HEOR Services'],
    recentDevelopments: [
      'Leadership transition to medical oncologist CEO',
      'Expansion of real-world data partnerships with life sciences companies',
      'Enhanced analytics for immuno-oncology treatments',
      'Collaborations with cancer centers for quality improvement initiatives'
    ]
  }
];

// ─── Helper Functions ───
export function getVendorById(id: string): Vendor | undefined {
  return VENDORS.find(vendor => vendor.id === id);
}

export function getVendorsByCategory(categoryId: string): Vendor[] {
  return VENDORS.filter(vendor => vendor.category === categoryId);
}

export function getCategoryById(id: string): VendorCategory | undefined {
  return CATEGORIES.find(category => category.id === id);
}

export function getAllVendors(): Vendor[] {
  return VENDORS;
}

export function getAllCategories(): VendorCategory[] {
  return CATEGORIES;
}

// ─── Featured Vendors (for homepage) ───
export const FEATURED_VENDORS: string[] = [
  'nextech',
  'pathai',
  'navigating-cancer',
  'canceriq'
];