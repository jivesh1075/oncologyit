# Machine Learning Fundamentals

## Learning Objectives

- Explain the difference between supervised, unsupervised, and reinforcement learning
- Understand training, validation, and test sets
- Interpret basic performance metrics (accuracy, sensitivity, specificity, AUC)
- Recognize overfitting and data leakage

---

## How Machines Learn

Machine learning is fundamentally about finding patterns in data and using those patterns to make predictions on new, unseen data. The process follows a consistent workflow regardless of the application.

### The ML Workflow

1. **Collect data** — Gather labeled examples (e.g., 10,000 pathology slides with confirmed diagnoses)
2. **Prepare data** — Clean, normalize, and split into training, validation, and test sets
3. **Choose a model** — Select an architecture appropriate to the task
4. **Train** — The model adjusts its parameters to minimize prediction error on training data
5. **Validate** — Test performance on held-out data the model hasn't seen
6. **Deploy** — Put the model into production where it makes predictions on real-world data
7. **Monitor** — Track performance over time for drift and degradation

### Three Types of Machine Learning

**Supervised Learning** — The model learns from labeled examples. You provide both the input (chest X-ray) and the correct output (pneumonia / no pneumonia). The model learns the mapping between inputs and outputs. This is the most common type in clinical AI.

*Clinical examples:* Tumor classification from pathology images, readmission risk prediction from EHR data, sepsis early warning from vital signs.

**Unsupervised Learning** — The model finds patterns in data without labels. No one tells the model what to look for — it discovers structure on its own.

*Clinical examples:* Patient cohort discovery (finding subtypes of disease that weren't previously recognized), anomaly detection in lab results, clustering genomic profiles.

**Reinforcement Learning** — The model learns by trial and error, receiving rewards for good decisions and penalties for bad ones. Less common in clinical practice today, but increasingly relevant for treatment optimization.

*Clinical examples:* Adaptive radiation therapy dosing, dynamic treatment regimens, robotic surgery optimization.

## The Critical Split: Training, Validation, Test

The most important concept in evaluating any ML system is **data splitting**. A model's performance on its training data is meaningless — it has memorized those examples. What matters is performance on data it has never seen.

- **Training set** (~70%) — The model learns from this data
- **Validation set** (~15%) — Used during development to tune the model
- **Test set** (~15%) — Held out completely until final evaluation. This simulates real-world performance.

**Red flag for clinicians:** If a vendor cannot tell you how their model was evaluated, or if they report performance only on training data, that is a disqualifying signal.

## Performance Metrics

### For Classification Tasks

**Accuracy** — The percentage of predictions the model got right. Misleading when classes are imbalanced (if 95% of patients don't have the disease, a model that always says "no disease" is 95% accurate but clinically useless).

**Sensitivity (Recall)** — Of all patients who actually have the disease, what percentage did the model correctly identify? High sensitivity means few missed cases.

**Specificity** — Of all patients who don't have the disease, what percentage did the model correctly rule out? High specificity means few false alarms.

**Positive Predictive Value (PPV)** — Of all patients the model flagged as positive, what percentage actually have the disease? This is what clinicians care about most in screening.

**AUC-ROC** — Area Under the Receiver Operating Characteristic Curve. A single number (0-1) summarizing the model's ability to discriminate between classes across all threshold settings. AUC of 0.5 = random guessing. AUC of 1.0 = perfect discrimination. Most useful clinical AI models have AUC between 0.75-0.95.

### The Sensitivity-Specificity Tradeoff

Every classification model has a threshold — a cutoff point where it decides "positive" vs "negative." Moving this threshold trades sensitivity for specificity:

- **Lower threshold** → More sensitive (catches more true positives) but less specific (more false positives)
- **Higher threshold** → More specific (fewer false alarms) but less sensitive (more missed cases)

The right threshold depends on clinical context. For cancer screening, you want high sensitivity (don't miss cancer). For surgical candidacy, you might want high specificity (don't operate unnecessarily).

## Overfitting and Data Leakage

**Overfitting** occurs when a model performs well on training data but poorly on new data. The model has memorized the training examples rather than learning generalizable patterns. Overfitting is the most common failure mode in healthcare AI.

**Data leakage** occurs when information from the test set inadvertently influences training. Example: if the same patient appears in both training and test sets, the model's test performance will be artificially inflated because it has already "seen" that patient's data.

**Why this matters clinically:** An AI tool that was validated with data leakage will underperform in your practice. Ask vendors about their data splitting methodology and whether they controlled for patient-level leakage.

---

## Key Takeaways

- Supervised learning (labeled data) dominates clinical AI today
- Always evaluate model performance on held-out test data, never training data
- Accuracy alone is insufficient — understand sensitivity, specificity, and PPV in clinical context
- AUC-ROC provides a threshold-independent measure of model discrimination
- Overfitting and data leakage are the two most common validity threats in healthcare AI
