# What Is AI? Core Concepts for Clinicians

## Learning Objectives

By the end of this module, you will be able to:

- Define artificial intelligence, machine learning, and deep learning
- Distinguish between narrow AI and general AI
- Identify the key components of an AI system
- Explain why AI is relevant to clinical practice now

---

## The AI Landscape

Artificial intelligence is not a single technology. It is a family of computational approaches that enable machines to perform tasks that traditionally required human cognition — pattern recognition, language understanding, decision-making, and prediction.

### The Hierarchy

**Artificial Intelligence (AI)** is the broadest category. It encompasses any system designed to mimic aspects of human intelligence. This includes everything from a simple rule-based clinical decision support alert ("if potassium > 6.0, flag") to a sophisticated model that reads pathology slides.

**Machine Learning (ML)** is a subset of AI. Instead of being explicitly programmed with rules, ML systems learn patterns from data. A machine learning model trained on 100,000 chest X-rays can learn to identify pneumonia without being told "look for consolidation in the lower lobes."

**Deep Learning (DL)** is a subset of ML that uses neural networks with many layers. Deep learning powers most of the AI breakthroughs you read about: image recognition, natural language processing, drug discovery, and genomic analysis.

**Large Language Models (LLMs)** are a specific type of deep learning model trained on massive text datasets. GPT-4, Claude, Gemini, and Llama are all LLMs. They understand and generate human language, which makes them uniquely useful in healthcare where so much information is encoded in text — clinical notes, research papers, patient communications.

### Narrow AI vs. General AI

Every AI system deployed in healthcare today is **narrow AI** — it performs specific tasks within defined boundaries. An AI that reads mammograms cannot write a clinical note. An AI that generates clinical notes cannot interpret lab values.

**General AI** (AGI) — a system that can perform any intellectual task a human can — does not exist today. When vendors claim their product "uses AI," they mean narrow AI trained on specific data for specific tasks. Understanding this distinction protects you from both hype and fear.

## The Three Components of Any AI System

Every AI application, from a simple classifier to a complex autonomous agent, has three components:

### 1. Data

AI systems learn from data. The quality, quantity, and representativeness of training data determine the system's capabilities and limitations. In healthcare, data comes from EHRs, imaging systems, lab results, claims databases, genomic sequencing, wearables, and patient-reported outcomes.

**Key insight for clinicians:** When evaluating an AI tool, your first question should be "what data was this trained on?" If the training data doesn't represent your patient population, the model's performance may not generalize to your practice.

### 2. Model

The model is the mathematical structure that learns patterns from data. Different model architectures are suited to different tasks:

- **Convolutional neural networks (CNNs)** for imaging (pathology, radiology)
- **Transformers** for language (clinical notes, patient communication)
- **Gradient-boosted trees** for structured data (lab values, claims)
- **Recurrent neural networks (RNNs)** for sequential data (time-series vitals)

You don't need to understand the math. You need to understand that model choice matters, and that no single model type is best for all tasks.

### 3. Infrastructure

The computing infrastructure that trains, hosts, and serves the model. This includes cloud computing (AWS, Azure, GCP), specialized hardware (GPUs, TPUs), and the software stack that connects the model to your clinical workflow. In healthcare, infrastructure must also satisfy HIPAA requirements, which constrains where data can be stored and processed.

## Why Now?

AI has existed as a research discipline since the 1950s. Three things changed to make it clinically relevant in the 2020s:

1. **Data availability** — The digitization of healthcare (EHRs, PACS, genomic databases) created the massive datasets needed to train useful models.
2. **Compute power** — GPU computing made it economically feasible to train large models. What cost millions in 2015 costs hundreds today.
3. **Model breakthroughs** — The transformer architecture (2017) enabled a step change in language and vision AI capabilities.

The intersection of all three created a deployment window that opened approximately in 2023 and is now accelerating.

---

## Key Takeaways

- AI is a family of technologies, not a single tool
- All current healthcare AI is narrow — task-specific, not general intelligence
- Every AI system has three components: data, model, and infrastructure
- Training data quality is the single most important factor in AI performance
- The convergence of data, compute, and model capability makes this moment unique
