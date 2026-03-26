# Large Language Models in Clinical Settings

## Learning Objectives

- Explain how LLMs work at a conceptual level (tokenization, attention, generation)
- Identify appropriate clinical use cases for LLMs
- Understand hallucination risk and mitigation strategies
- Evaluate LLM-based tools for clinical deployment

---

## How LLMs Work

Large language models are neural networks trained on massive text datasets to predict the next token (word or subword) in a sequence. Through this simple training objective — predict what comes next — they develop emergent capabilities: summarization, reasoning, translation, code generation, and conversational ability.

### Key Concepts

**Tokenization** — Text is broken into tokens (roughly words or word pieces). "Oncology" might be one token; "gastroesophageal" might be split into multiple tokens. Models have a context window — the maximum number of tokens they can process at once (ranging from 4K to 200K+ tokens in current models).

**Attention Mechanism** — The transformer architecture uses "attention" to understand relationships between tokens regardless of distance. When processing "The patient's HER2 status was positive, so the oncologist recommended trastuzumab," the model attends to the relationship between "HER2 positive" and "trastuzumab" even though they're far apart in the sentence.

**Generation** — LLMs generate text one token at a time, sampling from a probability distribution. Temperature controls randomness: low temperature (0.0-0.3) produces deterministic, factual output; high temperature (0.7-1.0) produces more creative, varied output. Clinical applications should use low temperature.

## Clinical Use Cases

### High-Value, Lower-Risk
- **Clinical note generation** from audio/encounter data
- **Patient communication** — translating clinical language to patient-friendly explanations
- **Literature synthesis** — summarizing research for clinical questions
- **Prior authorization** — generating appeal letters from clinical documentation
- **Coding assistance** — suggesting ICD-10/CPT codes from documentation

### Higher-Risk, Requiring Validation
- **Clinical decision support** — treatment recommendations based on patient data
- **Diagnostic assistance** — differential diagnosis generation
- **Drug interaction checking** — beyond database lookups
- **Risk stratification** — predicting outcomes from unstructured data

## Hallucination: The Critical Risk

LLMs can generate text that is fluent, confident, and completely wrong. This is called "hallucination." In healthcare, hallucination can be dangerous — a fabricated drug interaction, an incorrect dosing recommendation, a made-up clinical trial.

### Mitigation Strategies

1. **Retrieval-Augmented Generation (RAG)** — Ground the model's responses in verified source documents rather than relying on parametric memory
2. **Human-in-the-loop** — Always have a clinician review AI-generated clinical content before it reaches patients
3. **Citation requirements** — Configure the system to cite sources, making hallucinations easier to detect
4. **Domain-specific fine-tuning** — Models tuned on medical literature hallucinate less on medical topics
5. **Temperature control** — Use low temperature settings for factual clinical output

---

## Key Takeaways

- LLMs predict text probabilistically — they don't "understand" medicine
- Clinical note generation and patient communication are the highest-value, lowest-risk applications
- Hallucination is the primary safety concern — always validate AI-generated clinical content
- RAG and human-in-the-loop are the most effective hallucination mitigations
- Low temperature settings are essential for clinical applications
