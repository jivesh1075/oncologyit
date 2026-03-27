# Regulatory Landscape: FDA, HIPAA, and AI

## Learning Objectives

- Understand how the FDA classifies and regulates AI/ML-based medical devices
- Explain the concept of Software as a Medical Device (SaMD) and its risk classification
- Navigate HIPAA requirements for AI training data and deployment
- Recognize the gap between regulatory guidance and the pace of AI deployment
- Evaluate the implications of locked vs. adaptive algorithms

---

## FDA Regulation of Clinical AI

The FDA does not regulate "artificial intelligence" as a category. It regulates **Software as a Medical Device (SaMD)** — software intended to be used for one or more medical purposes that performs those purposes without being part of a hardware medical device.

An AI algorithm that reads pathology slides, predicts sepsis risk, or recommends radiation doses is regulated as SaMD. An AI tool that schedules appointments or generates billing codes is not.

### Risk-Based Classification

Like all medical devices, the FDA classifies SaMD by risk level:

**Class I (Low Risk)** — General wellness applications, low-risk clinical decision support. Minimal regulatory requirements, often exempt from premarket review.

**Class II (Moderate Risk)** — Most clinical AI falls here. Requires a 510(k) clearance demonstrating the device is "substantially equivalent" to a predicate device, or a De Novo classification for novel device types. Examples: AI-assisted radiology triage, pathology screening tools.

**Class III (High Risk)** — Devices that support or make life-sustaining decisions. Requires a Premarket Approval (PMA) with clinical trial evidence. Few AI devices are currently Class III, but autonomous diagnostic systems may fall here.

As of 2026, the FDA has authorized over 900 AI/ML-enabled medical devices, the vast majority through the 510(k) pathway. Radiology and cardiology account for the largest share; oncology applications are growing rapidly.

### Locked vs. Adaptive Algorithms

This distinction is critical for understanding AI regulation:

**Locked algorithms** have fixed parameters after deployment. They produce the same output for the same input every time. They do not learn from new data in the field. Most FDA-cleared AI devices use locked algorithms because their behavior is predictable and testable.

**Adaptive algorithms** continue learning from new data after deployment. Their behavior changes over time, which means a model cleared by the FDA today may produce different outputs six months from now. This creates a fundamental regulatory challenge: how do you validate something that keeps changing?

### The Predetermined Change Control Plan

The FDA's response to adaptive AI is the **predetermined change control plan (PCCP)**. Under this framework, manufacturers describe anticipated modifications to their algorithm in advance — what types of changes will occur, how performance will be monitored, and what triggers require new regulatory submissions.

Think of it as pre-approved guardrails: the manufacturer gets advance clearance for certain types of updates (e.g., retraining on new data from the same distribution), while larger changes (new indications, different patient populations) still require new submissions.

This framework is still evolving. The FDA issued final guidance on PCCPs in 2024, but practical implementation across the industry remains inconsistent.

## HIPAA and AI

The Health Insurance Portability and Accountability Act (HIPAA) governs how protected health information (PHI) is used, stored, and shared. AI introduces specific HIPAA considerations at every stage.

### Training Data

Using patient data to train AI models requires appropriate safeguards:

**De-identification** — If data is properly de-identified per HIPAA Safe Harbor or Expert Determination methods, it is no longer PHI and can be used for AI training without individual authorization. However, true de-identification of clinical data (especially imaging and genomic data) is harder than it appears.

**Business Associate Agreements (BAAs)** — If an AI vendor will access PHI (for training, validation, or deployment), they must sign a BAA. This is not optional. The BAA must specifically address how PHI will be used in model development.

**Minimum Necessary Standard** — Only the minimum PHI necessary for the AI's intended purpose should be shared. An AI tool for radiology triage does not need access to psychiatric notes.

### Deployment Considerations

**On-premise vs. cloud** — Where the AI model runs determines the HIPAA compliance architecture. Cloud-based AI that processes PHI must run in a HIPAA-compliant environment (AWS HIPAA-eligible services, Azure HIPAA-compliant configurations, Google Cloud HIPAA BAA).

**Model outputs as PHI** — If an AI generates a clinical recommendation linked to a specific patient, that output is PHI and must be protected accordingly. This includes audit trails, access controls, and encryption.

**Patient data in prompts** — For LLM-based tools, clinical data entered into prompts may be processed by third-party servers. Organizations must ensure that any LLM vendor handling clinical queries has appropriate HIPAA protections and does not use prompt data for model training.

## The Regulatory Gap

The most important thing to understand about AI regulation in healthcare is that it is not keeping pace with deployment. This creates both risk and responsibility for clinical leaders.

### What the Gap Looks Like

- **Clinical Decision Support (CDS)** exemptions allow many AI tools to avoid FDA review entirely if they meet certain criteria (display source data, are intended for clinician use, don't replace clinical judgment). Many vendors design their products to fit within these exemptions.
- **Laboratory-Developed Tests (LDTs)** using AI have historically been regulated by CMS/CLIA rather than the FDA, though the FDA has signaled intent to assert jurisdiction.
- **Off-label use** of AI tools — using a radiology AI cleared for chest X-rays to screen a population it wasn't validated on — falls in a regulatory gray zone.
- **Generative AI** (LLMs used for clinical documentation, patient communication, decision support) is largely unregulated. The FDA has not issued specific guidance on generative AI in clinical settings.

### What This Means for Organizations

Because regulation lags deployment, health systems cannot rely on FDA clearance alone as a marker of safety or efficacy. Organizations need their own governance:

1. **Internal AI review committees** — Evaluate AI tools before deployment, regardless of FDA status
2. **Validation on local data** — A model cleared by the FDA may not perform adequately on your patient population
3. **Post-deployment monitoring** — Track AI performance in real-world use, not just at the time of go-live
4. **Incident reporting** — Establish processes for capturing and responding to AI-related adverse events

---

## Key Takeaways

- The FDA regulates clinical AI as Software as a Medical Device (SaMD) with risk-based classification (Class I, II, III)
- Most clinical AI is cleared through the 510(k) pathway as Class II devices
- Locked algorithms are easier to regulate; adaptive algorithms require predetermined change control plans
- HIPAA applies to AI training data, deployment infrastructure, and model outputs — BAAs are required for any vendor accessing PHI
- Regulatory gaps exist for CDS exemptions, generative AI, and off-label use of cleared devices
- Organizations must build internal governance because FDA clearance alone is insufficient assurance of safety or fit
