# The Future: Agentic AI and Autonomous Systems

## Learning Objectives

- Distinguish between AI tools, copilots, and autonomous agents
- Evaluate the opportunities and risks of agentic AI in healthcare
- Understand the infrastructure ownership thesis and its strategic implications
- Identify which healthcare workflows are most suited to agentic automation
- Prepare your organization for the next wave of clinical AI

---

## From Tools to Agents

The AI landscape is shifting from tools that assist humans to agents that act autonomously. Understanding this progression is essential for healthcare leaders preparing for the next wave.

### The Three Levels

**AI Tools** perform single tasks and return output for human action. A radiology AI that flags a suspicious lesion is a tool. It does one thing, then waits for the radiologist to act.

**AI Copilots** assist humans interactively across tasks. An ambient documentation system that listens to a patient encounter, drafts a clinical note, and suggests coding is a copilot. It handles multiple related tasks but operates under continuous human supervision.

**AI Agents** autonomously plan, execute multi-step workflows, use tools, and make decisions without human intervention at each step. An AI agent that receives a prior authorization denial, reviews the clinical record, identifies the gap in documentation, generates an appeal letter, submits it to the payer, and monitors for response — that is an agent. It takes a goal and executes a workflow.

The distinction matters because the risk profile, governance requirements, and potential impact are fundamentally different at each level.

## Agentic AI in Healthcare

Agentic AI is particularly relevant in healthcare because the field is dominated by complex, multi-step workflows that span multiple systems — exactly the type of work agents are designed for.

### Administrative Automation

Healthcare administration is the highest-value, lowest-risk domain for agentic AI. These workflows are:

- **Multi-step** — Prior authorization requires checking eligibility, gathering documentation, submitting to the payer, responding to requests for information, and tracking outcomes
- **Multi-system** — They span EHRs, payer portals, scheduling systems, and communication platforms
- **Rule-based but complex** — The rules are knowable but the volume and variation overwhelm human capacity
- **Low clinical risk** — Administrative errors are costly but rarely directly harm patients

**Key applications:**
- **Prior authorization and appeals** — Navigating payer requirements, generating documentation, submitting and tracking requests
- **Claims management** — Identifying coding errors, preventing denials, managing resubmissions
- **Scheduling optimization** — Coordinating multi-visit treatment plans across providers, rooms, and equipment
- **Patient communication** — Sending reminders, answering routine questions, coordinating referrals

### Clinical Support (With Guardrails)

Agentic AI is beginning to enter clinical workflows, but with essential human oversight:

- **Clinical trials matching and pre-screening** — Agents that continuously scan patient records against trial criteria, pre-screening candidates for coordinator review
- **Care coordination** — Agents that track patient progress through treatment protocols, flagging deviations and coordinating between specialists
- **Post-treatment surveillance** — Agents that monitor lab results, imaging schedules, and symptom reports, alerting the care team to potential recurrence signals

In all clinical applications, the agent acts within defined boundaries and escalates to humans for clinical decisions.

## The Risk of Autonomous Action

The core risk of agentic AI is autonomy without adequate oversight. When an agent takes an action — modifying an order, sending a patient communication, submitting a claim — based on flawed reasoning, the error propagates without human interception.

### Failure Modes

**Compounding errors** — Unlike a tool that makes a single prediction, an agent makes sequential decisions. An error in step 2 propagates through steps 3, 4, and 5. A prior auth agent that misidentifies the patient's insurance plan may generate a correct-looking but fundamentally invalid submission.

**Scope creep** — Agents that perform well in their defined domain may be gradually assigned tasks outside their validated scope. An agent designed for routine prior auth may be used for complex exception cases it wasn't designed to handle.

**Invisible failure** — If an agent processes 500 tasks per day, a 2% error rate means 10 failures daily. Without monitoring, these failures accumulate silently until a pattern of harm emerges.

**Accountability gaps** — When an AI agent makes a decision that leads to patient harm, the accountability chain is unclear. Is it the vendor who built the agent? The health system that deployed it? The clinician who delegated to it?

### Mitigation Strategies

1. **Human-on-the-loop** — The agent acts autonomously for routine tasks but escalates to humans for exceptions, high-risk decisions, or novel situations
2. **Bounded autonomy** — Define explicit boundaries: what the agent can do, what it cannot, and what requires human approval
3. **Audit trails** — Every agent action is logged with reasoning, enabling retrospective review
4. **Kill switches** — The ability to immediately halt agent activity when problems are detected
5. **Performance monitoring** — Continuous tracking of agent accuracy, error rates, and exception patterns

## The Infrastructure Ownership Thesis

The shift to agentic AI raises a strategic question: who controls the intelligence layer?

### Rent vs. Own

Most health systems currently **rent** their AI capabilities from SaaS vendors. The vendor owns the model, the training pipeline, and the feedback loop. When the contract ends, the health system loses the capability and starts over.

The **ownership thesis** argues that health systems should own their AI infrastructure — models, data pipelines, and feedback loops — because this creates compounding competitive advantage:

1. **Your data improves your models.** Every patient encounter generates data that, when fed back into your models, makes them better for your specific population.
2. **Your models improve your care.** Better models mean more accurate predictions, more efficient workflows, and better outcomes.
3. **Better care generates more data.** Superior outcomes attract patients, generating more data to fuel the cycle.

This flywheel is only possible when you own the infrastructure. When you rent it, the vendor captures the compounding value.

### Practical Ownership

"Owning" AI infrastructure doesn't mean building everything from scratch. It means:

- **Owning your data pipeline** — Clean, structured, accessible data that you control
- **Owning your fine-tuned models** — Models adapted to your population, your workflows, your outcomes
- **Owning your feedback loops** — Systems that capture outcomes and feed them back into model improvement
- **Controlling your deployment** — The ability to update, modify, or replace models without vendor dependency

The foundation of all of this is data infrastructure. Organizations that invest in clean, interoperable, well-governed data assets will be positioned to deploy AI — whether built or bought — effectively. Those without it will struggle regardless of which vendors they choose.

## Preparing for the Next Wave

The organizations that will thrive in the agentic AI era are investing now in four areas:

### 1. Data Infrastructure

Clean, interoperable, well-governed data is the foundation. If your EHR data is messy, your AI will be unreliable. Invest in data engineering before AI engineering.

### 2. AI Governance

Build the governance structures described in Module 7 — multi-stakeholder review, bias auditing, monitoring frameworks — before you need them. Retrofitting governance onto deployed AI is far harder than building it in from the start.

### 3. Workforce Development

AI doesn't replace clinicians. It changes what they do. Invest in training: AI literacy for clinicians, prompt engineering for knowledge workers, and data fluency for administrators. The organizations that develop hybrid human-AI workflows will outperform those that try to automate humans out of the loop.

### 4. Pilot Culture

Build institutional muscle for rapid experimentation. Shadow deploy. Run pilots. Learn fast. The organizations that test 10 AI tools and deploy 3 will outperform those that evaluate endlessly and deploy none.

---

## Key Takeaways

- AI is evolving from single-task tools to copilots to autonomous agents capable of multi-step workflows
- Healthcare administration (prior auth, claims, scheduling) is the highest-value, lowest-risk domain for agentic AI
- The primary risk of agentic AI is autonomous action without adequate oversight — errors compound across sequential steps
- Human-on-the-loop oversight, bounded autonomy, and continuous monitoring are essential safeguards
- The infrastructure ownership thesis argues that organizations controlling their own AI infrastructure build compounding advantage
- Preparation requires investment in data infrastructure, AI governance, workforce development, and a culture of rapid piloting
