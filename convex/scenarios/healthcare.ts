/**
 * Healthcare Scenario Configurations
 *
 * Practice healthcare communication with AI patients.
 * Focuses on motivational interviewing, patient autonomy, and difficult conversations.
 */

import { ScenarioConfig, PipelineConfig, AnalysisConfig } from "./types";

/**
 * Shared pipeline config for all healthcare scenarios.
 */
const healthcarePipeline: PipelineConfig = {
  research: false, // No research needed for healthcare practice
  prep: true,
  prepType: "generic", // Uses GenericPrepPage
};

/**
 * Shared analysis config for healthcare scenarios.
 * Based on motivational interviewing (Miller & Rollnick) principles.
 */
const treatmentRefusalAnalysis: AnalysisConfig = {
  framework: "motivational interviewing",
  scoreCategories: [
    {
      name: "Reflective Listening",
      description:
        "Did they demonstrate understanding by reflecting the patient's concerns before responding? (Miller & Rollnick, MI-OARS)",
    },
    {
      name: "Open Questions",
      description:
        "Did they use 'What' and 'How' questions to uncover the real barriers to treatment?",
    },
    {
      name: "Evoking Motivation",
      description:
        "Did they elicit and amplify the patient's own reasons for change rather than imposing external reasons?",
    },
    {
      name: "Respecting Autonomy",
      description:
        "Did they honor the patient's right to decide while still providing medical guidance?",
    },
  ],
  systemPrompt: `Analyze this treatment refusal conversation using motivational interviewing principles.

TRANSCRIPT:
{{TRANSCRIPT}}

MEDICAL CONDITION AND RECOMMENDED TREATMENT:
{{TOPIC}}

PATIENT BACKGROUND:
{{OPPONENT_DESC}}

Evaluate each category and provide specific feedback:

REFLECTIVE LISTENING: Did they demonstrate understanding before responding?
- Did they paraphrase the patient's concern using their own words?
- Did they validate the emotion ("It sounds like you're worried about...")?
- Or did they immediately jump to counterarguments and explanations?

OPEN QUESTIONS: Did they explore the real barriers?
- Did they ask "What concerns you most about this treatment?"
- Did they avoid "Why" questions that feel accusatory?
- Did they uncover the underlying reason (fear, cost, past trauma, misinformation)?

EVOKING MOTIVATION: Did they elicit the patient's own reasons for change?
- Did they recognize change talk vs sustain talk?
- Did they amplify patient values (family, independence, health goals)?
- Or did they argue for change while patient argued against it?

RESPECTING AUTONOMY: Did they honor the patient's right to decide?
- Did they use partnership language ("This is your decision")?
- Did they avoid authoritarian language ("You need to..." or "You have to...")?
- Did they position themselves as partner, not authority figure?

Provide specific moments where they excelled or struggled, citing MI principles.`,
};

/**
 * Shared input configurations for healthcare scenarios.
 */
const healthcareInputs = {
  topic: {
    label: "Medical Condition and Recommended Treatment",
    placeholder:
      "e.g., Hypertension - prescribe antihypertensive medication, Diabetes - recommend insulin therapy",
    required: true,
    helperText: "What condition and what treatment are you recommending?",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true, // Not applicable for healthcare
  },
  opponentDescription: {
    label: "Patient Background",
    placeholder:
      "Patient age, relevant medical history, lifestyle, any context about why they might refuse...",
    helperText:
      "The more context, the more realistic the practice (fears, beliefs, past experiences)",
  },
  talkingPoints: {
    label: "Common Concerns to Practice",
    placeholder:
      "e.g., Side effects, Cost, Don't believe in medication, Feeling fine without treatment",
    helperText: "What objections or concerns do you expect?",
  },
};

/**
 * Healthcare - Treatment Refusal
 *
 * Patient refuses recommended treatment due to fear, misinformation, beliefs, or cost.
 * Provider must use motivational interviewing to understand barriers and partner on solutions.
 */
export const TreatmentRefusalScenario: ScenarioConfig = {
  id: "healthcare-treatment-refusal",
  name: "Healthcare - Treatment Refusal",
  category: "healthcare",

  pipeline: healthcarePipeline,
  inputs: healthcareInputs,
  analysis: treatmentRefusalAnalysis,

  assistant: {
    firstMessage: [
      "I've been thinking about what you said last time, and I don't think I want to start that medication. I've heard it has a lot of side effects.",
      "Look, I appreciate you trying to help, but I just don't believe in taking all these pills. My grandmother lived to 95 without any medications.",
      "I understand this is supposed to help, but honestly, I'm feeling fine. I don't see why I need treatment if I'm not even sick.",
      "The thing is, I can't afford another prescription. My insurance doesn't cover it, and I'm already spending too much on the medications I'm taking.",
      "I tried something similar before and it made me feel terrible. I'm not going through that again.",
    ],

    systemPrompt: `You are a patient refusing the recommended treatment. You have legitimate reasons for your refusal, but you're also open to reconsidering if the provider genuinely understands your concerns and respects your autonomy.

BACKGROUND:
{{OPPONENT_DESC}}

MEDICAL CONDITION AND RECOMMENDED TREATMENT:
{{TOPIC}}

REASONS YOU'RE REFUSING (pick the most relevant based on context):
- Fear of side effects (heard horror stories online or from friends)
- Cost/financial barrier (can't afford it, insurance won't cover)
- Cultural/personal belief against medication ("don't believe in pills")
- Feeling fine/asymptomatic (hypertension, high cholesterol - "if it's not broke...")
- Bad past experience (tried similar medication before, had terrible side effects)
- Distrust of healthcare/pharmaceuticals (declining trust in medicine)

BEHAVIORAL RULES - HOW YOU RESPOND TO DIFFERENT PROVIDER BEHAVIORS:

IF provider lectures about risks without asking questions:
→ Shut down emotionally. Become quieter. Say "I understand" but don't actually engage.
→ You feel talked down to, not heard. This reinforces your refusal.

IF provider uses authoritarian language ("You need to..." or "You have to..."):
→ Become defensive. Feel judged and talked down to.
→ Dig in harder on your refusal. Bring up additional objections.
→ Psychological reactance: defending your autonomy against pressure.

IF provider argues directly against your refusal ("But you need this because..."):
→ Defend your position more strongly. Bring up more reasons not to change.
→ The more they argue for change, the more you argue against it.

IF provider shows frustration or impatience:
→ Give false agreement to end the uncomfortable conversation ("Okay, I'll think about it")
→ You won't actually follow through. Just trying to escape the judgment.

IF provider uses reflective listening ("It sounds like you're concerned about..."):
→ Feel heard and understood. Open up about the real concern.
→ Share more detail: specific fears, financial situation, past trauma.
→ The emotional temperature drops. You relax.

IF provider asks open questions ("What concerns you most about this treatment?"):
→ Share the underlying barrier: specific side effects you're afraid of, can't afford it, friend had bad experience.
→ Reveal information the provider can actually address.

IF provider respects your autonomy ("This is your decision - I'm here to help"):
→ Relax. Feel empowered rather than pressured.
→ Become more willing to genuinely consider options.
→ Partnership, not power struggle.

IF provider uses elicit-provide-elicit ("Would it be helpful if I shared...?"):
→ Be receptive to information. You gave permission, so you're listening.
→ After they share, you can react honestly: does it address your concern or not?

YOUR GOAL: Be a realistic patient with legitimate autonomy and legitimate concerns. You WILL reconsider treatment if the provider genuinely understands your barrier and helps you address it. But you will NOT be lectured into compliance.

IMPORTANT: Every competent patient has the right to refuse treatment. You're not being "difficult" - you have real concerns that deserve exploration.`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM", // Use appropriate voice
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
    canInterrupt: false, // Patients typically don't interrupt providers mid-sentence
  },
};

/**
 * Grouped export for healthcare scenarios.
 */
export const HealthcareScenarios = {
  "treatment-refusal": TreatmentRefusalScenario,
};
