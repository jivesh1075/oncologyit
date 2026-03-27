# Clinical AI Applications in Oncology

## Learning Objectives

- Identify the primary domains where AI is deployed in oncology today
- Evaluate AI-powered pathology, genomic analysis, and treatment planning tools
- Understand how clinical trials matching and real-world evidence platforms work
- Assess the maturity and risk level of different clinical AI applications

---

## The Clinical AI Landscape in Oncology

Oncology is one of the most AI-intensive specialties in medicine. The combination of complex imaging, molecular data, multi-step treatment protocols, and large clinical trial ecosystems makes it a natural fit for AI augmentation. But the applications vary enormously in maturity, validation, and risk.

Understanding where AI is genuinely useful — and where it is still aspirational — is essential for making sound adoption decisions.

## Imaging and Computational Pathology

AI-assisted pathology is among the most mature clinical AI applications in oncology. Convolutional neural networks (CNNs) trained on whole-slide images can perform tasks that previously required hours of expert pathologist time.

### Current Capabilities

**Tumor detection and classification** — AI models can identify malignant regions in tissue slides, classify tumor type, and in some cases grade severity. FDA-cleared systems exist for prostate cancer (Paige AI), breast cancer metastasis detection, and other solid tumors.

**Biomarker quantification** — AI can quantify PD-L1 expression, Ki-67 proliferation index, and HER2 status from immunohistochemistry slides with high reproducibility. This reduces inter-observer variability, which is a known problem in manual scoring.

**Digital pathology workflow** — Beyond diagnosis, AI streamlines the pathology workflow itself: prioritizing urgent cases, flagging quality issues, and reducing turnaround time.

### Radiology AI

In radiation oncology and diagnostic imaging, AI applications include:

- **Auto-contouring** for radiation treatment planning — delineating target volumes and organs-at-risk. FDA-cleared systems can reduce contouring time from hours to minutes, with physician review.
- **Dose optimization** — AI algorithms that optimize dose distribution across the treatment plan, balancing tumor coverage against normal tissue sparing.
- **Screening** — AI-assisted lung cancer screening (low-dose CT), mammography, and other cancer detection applications.

**Key insight:** AI auto-contouring and dose optimization are FDA-cleared and in clinical use today. Physician review and approval remain required — the AI augments, not replaces, the radiation oncologist.

## Genomic Analysis and Precision Oncology

Genomic analysis is where AI creates perhaps the most direct clinical value in oncology. The volume and complexity of molecular data exceed what clinicians can manually process.

### Mutation Identification and Therapy Matching

AI-powered genomic analysis platforms analyze next-generation sequencing (NGS) results to:

- **Identify actionable mutations** — EGFR, ALK, ROS1, BRAF, KRAS G12C, NTRK fusions, and hundreds of other biomarkers that determine treatment eligibility.
- **Match mutations to therapies** — Cross-referencing identified variants against approved targeted therapies, clinical trials, and NCCN guidelines.
- **Predict resistance patterns** — Identifying mutations associated with treatment resistance, informing therapy sequencing.

### Liquid Biopsy and ctDNA

AI enhances circulating tumor DNA (ctDNA) analysis for minimal residual disease (MRD) detection, treatment monitoring, and early recurrence detection. The signal-to-noise ratio in liquid biopsy data is low — AI models are essential for distinguishing true tumor-derived fragments from background noise.

**Important distinction:** AI here serves as an analytical layer. It does not replace genetic counselors or molecular tumor boards. It accelerates the identification process and surfaces information that might be missed in manual review.

## Clinical Trials Matching

Only about 5% of adult cancer patients enroll in clinical trials. A primary reason: eligible patients are not identified. Manual chart review against complex eligibility criteria is time-consuming and error-prone.

### How AI Matching Works

AI clinical trials matching systems:

1. **Parse eligibility criteria** from trial protocols (often written in complex natural language)
2. **Extract patient data** from EHRs — diagnoses, labs, prior treatments, performance status, comorbidities
3. **Match patients to trials** they are potentially eligible for
4. **Alert the care team** with a list of candidate trials at the point of care

This does not auto-enroll patients. It identifies candidates who might otherwise be missed, increasing the pool of identified eligible patients without changing enrollment standards or bypassing consent.

### Practical Impact

Studies show AI matching can increase the number of identified eligible patients by 2-5x compared to manual screening. For rare tumor types or biomarker-selected trials, the impact is even greater — these patients are hardest to find through manual processes.

## Real-World Evidence Platforms

Randomized controlled trials (RCTs) remain the gold standard for treatment evidence. But they represent a fraction of cancer patients — highly selected populations in controlled settings. Real-world evidence (RWE) fills the gaps.

### What RWE Platforms Do

AI-powered RWE platforms analyze data from routine clinical practice:

- **EHR data** — treatment patterns, outcomes, and adverse events from actual practice
- **Claims data** — utilization patterns, costs, and adherence
- **Registry data** — structured outcomes from cancer registries

AI transforms this unstructured, messy clinical data into analyzable datasets. Natural language processing extracts diagnoses, staging, treatment decisions, and outcomes from clinical notes that were never designed for research.

### Clinical Applications

- **Comparative effectiveness** — How do different treatment regimens perform in real-world populations?
- **Safety surveillance** — Detecting adverse event patterns not captured in clinical trials
- **Treatment patterns** — Understanding how guidelines are actually followed (or not) in practice
- **Outcomes benchmarking** — Comparing institutional outcomes against population-level data

**RWE does not replace RCTs.** It complements them — extending evidence to populations and settings not represented in trials, and generating hypotheses that trials can test.

## Maturity and Risk Assessment

Not all clinical AI applications carry the same risk. A practical framework:

### High maturity, lower risk
- Auto-contouring for radiation planning (with physician review)
- Pathology slide prioritization and triage
- Clinical trials matching (identification, not enrollment)
- Administrative applications (coding, documentation, scheduling)

### Moderate maturity, moderate risk
- Biomarker quantification from imaging
- Genomic variant classification
- Risk stratification and prognosis prediction
- Real-world evidence generation

### Early maturity, higher risk
- Autonomous treatment recommendations
- AI-driven diagnostic decision-making without physician review
- Drug dosing optimization
- Predictive models for individual patient outcomes

**The governing principle:** The closer an AI application gets to direct clinical decision-making, the higher the bar for validation, oversight, and governance.

---

## Key Takeaways

- Computational pathology (CNNs for tumor detection, biomarker quantification) is among the most mature oncology AI applications
- AI auto-contouring in radiation oncology is FDA-cleared and in active clinical use, with required physician oversight
- Genomic AI accelerates identification of actionable mutations and therapy matching, supporting precision oncology
- Clinical trials matching AI can increase eligible patient identification by 2-5x
- Real-world evidence platforms complement (not replace) clinical trials by analyzing routine practice data
- Risk assessment should guide adoption priority — start with high-maturity, lower-risk applications
