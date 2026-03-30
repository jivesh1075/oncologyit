# AI Implementation Strategy for Health Systems

## Learning Objectives

- Apply a build vs. buy framework for clinical AI decisions
- Evaluate AI vendors using structured criteria
- Understand shadow deployment and staged rollout strategies
- Measure ROI comprehensively for clinical AI investments
- Identify the most common implementation failure modes and how to prevent them

---

## The Build vs. Buy Decision

Every health system deploying AI faces a foundational question: do we build our own capability, or do we buy it from a vendor? The answer depends on whether the AI capability is a commodity or a source of competitive advantage.

### When to Buy

Buy when the AI capability is **commodity** — well-established, widely available, and not differentiated by your data or workflows:

- Standard radiology triage (many FDA-cleared options)
- Ambient clinical documentation (Dragon, Abridge, Nabla)
- Coding and billing optimization
- Generic clinical decision support alerts

In these cases, vendor solutions are more cost-effective than building. The technology is mature, the market is competitive, and your internal data doesn't create meaningful differentiation.

### When to Build (or Own)

Build or own when the AI capability is a **source of competitive advantage** — when your proprietary data, your patient population, or your clinical workflows create value that a vendor cannot replicate:

- Population health models trained on your patient demographics
- Specialty-specific clinical decision support (e.g., your oncology treatment patterns)
- Operational optimization models built on your staffing, scheduling, and volume data
- Care pathway intelligence that encodes your institutional knowledge

**The ownership thesis:** Organizations that own their AI infrastructure — models, data pipelines, feedback loops — build compounding advantage over time. Each patient encounter generates data that improves the model, which improves care, which attracts patients. Organizations that rent capabilities from vendors reset with every contract cycle.

### The Hybrid Approach

Most health systems will land on a hybrid: buy commodity capabilities, build or own differentiating ones. The strategic question is knowing which is which.

## Vendor Evaluation

When buying AI, structured evaluation prevents costly mistakes.

### The Evaluation Framework

**1. Training Data**
- What data was the model trained on?
- Does it represent your patient population (demographics, disease mix, payer mix)?
- How large and diverse is the training set?

**This is the most important question.** A model trained on academic medical center data may underperform in a community oncology practice. If the vendor cannot or will not describe their training data, that is a disqualifying signal.

**2. Validation Evidence**
- Is there external validation (tested on data from institutions outside the developer)?
- Are results published in peer-reviewed literature?
- What metrics are reported (sensitivity, specificity, AUC — not just accuracy)?

**3. Integration**
- Does the tool integrate with your EHR (Epic, Oracle Health, etc.)?
- Is it a standalone application or embedded in clinical workflow?
- What is the latency? (A model that takes 30 seconds to return results will not be used during a 15-minute visit.)

**4. Regulatory Status**
- Is the device FDA-cleared, and under what classification?
- If not cleared, what exemption does the vendor claim?
- Is the vendor's regulatory strategy credible?

**5. Total Cost of Ownership**
- Licensing fees (per-user, per-study, per-encounter)
- Implementation costs (integration, training, change management)
- Ongoing costs (support, updates, data pipeline maintenance)

## Shadow Deployment

Shadow deployment is the most effective risk mitigation strategy for clinical AI. It bridges the gap between bench validation and live clinical use.

### How It Works

1. The AI system is connected to live clinical data
2. It processes real patient encounters and generates outputs
3. Clinicians do **not** see or act on the AI's outputs
4. AI outputs are compared against actual clinical decisions retrospectively

### Why It Matters

Shadow deployment reveals things that bench testing cannot:

- **Data distribution mismatch** — Does your data look like the training data?
- **Workflow integration issues** — Can the system process data in the format your EHR provides?
- **Edge cases** — How does the AI handle incomplete data, unusual presentations, or patients the model hasn't seen?
- **Alert fatigue potential** — Would the AI generate so many alerts that clinicians would ignore them?

A typical shadow deployment runs 30-90 days. The cost is minimal (the AI runs in the background). The learning is invaluable.

### Staged Rollout After Shadow

1. **Shadow** — AI runs silently, outputs logged but not displayed
2. **Advisory** — AI outputs displayed to clinicians as suggestions, with easy override
3. **Integrated** — AI outputs embedded in workflow, with clinician review
4. **Optimized** — Based on usage data, refine alert thresholds, display, and workflow position

## Measuring ROI

AI ROI is frequently measured too narrowly. A comprehensive framework captures all value creation and all costs.

### Cost Side

- **Direct costs** — Software licensing, cloud compute, hardware
- **Implementation costs** — Integration engineering, data pipeline development, testing
- **Change management costs** — Clinical training, workflow redesign, communication
- **Ongoing costs** — Maintenance, monitoring, model updates, vendor management

### Value Side

- **Direct savings** — Reduced staffing needs, fewer denials, faster throughput
- **Time savings** — Clinician time freed from administrative tasks (documentation, prior auth), translated into additional patient encounters or reduced burnout
- **Quality improvement** — Reduced diagnostic errors, faster turnaround, improved guideline adherence
- **Patient experience** — Reduced wait times, better communication, improved access
- **Revenue impact** — Increased clinical trial enrollment, reduced leakage, improved coding accuracy

### The Time Horizon Problem

AI ROI rarely materializes in the first 90 days. Implementation has a learning curve. Clinician adoption takes time. The full value of AI — especially for models that improve with your data — compounds over 12-24 months. Organizations that evaluate ROI only at the 6-month mark often abandon tools that would have delivered significant returns at 18 months.

## Why Implementations Fail

The most common reason clinical AI implementations fail is not technical. It is organizational.

### Top Failure Modes

**1. Poor workflow integration** — The AI tool exists outside the clinician's natural workflow. It requires a separate login, a different screen, or manual data entry. Clinicians won't use it.

**2. No clinical champion** — AI deployed by IT without active clinical sponsorship will not be adopted. Clinicians trust peers, not vendors or administrators. Every successful AI implementation has a physician champion who advocates for the tool, provides feedback, and models usage.

**3. Alert fatigue** — The AI generates too many low-value alerts. Clinicians learn to ignore all of them, including the important ones. Threshold tuning during shadow deployment prevents this.

**4. Misaligned expectations** — Leadership expects AI to deliver immediate, dramatic results. AI is not a switch you flip — it's an infrastructure investment that compounds over time.

**5. No monitoring** — The AI is deployed and forgotten. Performance degrades as patient populations shift, coding practices change, or data pipelines break. Without monitoring, no one notices until harm has occurred.

---

## Key Takeaways

- Buy commodity AI, build or own differentiating AI — the strategic question is knowing which is which
- Training data representativeness is the single most important vendor evaluation criterion
- Shadow deployment (30-90 days) is the most effective pre-deployment risk mitigation strategy
- Measure ROI comprehensively: direct savings, time savings, quality improvement, and revenue impact — over a 12-24 month horizon
- Most AI implementation failures are organizational (poor workflow integration, no clinical champion), not technical
- Every successful deployment requires a physician champion and staged rollout
