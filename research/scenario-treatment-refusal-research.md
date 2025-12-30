# Treatment Refusal - Research & Sources

**Last Updated:** December 29, 2025

---

## Primary Framework

**Motivational Interviewing in Health Care: Helping Patients Change Behavior**
- **Authors:** Stephen Rollnick, William R. Miller, Christopher C. Butler
- **Year:** 2008 (Second Edition: 2023)
- **Source:** The Guilford Press
- **Key Concept:** A patient-centered counseling approach for addressing ambivalence about behavior change. Emphasizes partnership, autonomy, and evoking the patient's own motivations rather than imposing authority.

**Secondary Framework: OARS Techniques**
- **Source:** Miller & Rollnick, Motivational Interviewing Network of Trainers (MINT)
- **Year:** Core MI technique set, refined 2023
- **Key Concept:** Open questions, Affirmations, Reflective listening, and Summaries – the foundational interaction skills used "early and often" in motivational interviewing.

---

## Core Techniques → `scoreCategories`

These become the 4 dimensions measured in analysis.

### 1. Reflective Listening

**Source:** Miller & Rollnick, "Motivational Interviewing in Health Care" (2008); Reinforced in patient communication literature (ScienceDirect, 2020)
**What it is:** Summarizing what the patient said using their own words without paraphrasing. Demonstrating you heard and understood their concern before responding with medical advice.
**Why it works:** Reflective listening is a mandatory prerequisite for empathy. It builds trust and reveals the patient's real concerns – often fear, misinformation, or feeling unheard. Physicians rated as more empathetic when they spend more time listening and making reflective statements.
**Measurable signals:**
- Did they paraphrase the patient's concern before responding?
- Did they validate the emotion ("It sounds like you're worried about...")?
- Did they avoid immediately jumping to counterarguments?

**Quote:** "Practicing 'Reflective listening' is a mandatory prerequisite for empathy." (Patient Education and Counseling, 2020)

→ **Score Category:** "Reflective Listening" – "Did they demonstrate understanding by reflecting the patient's concerns before responding?"

### 2. Open Questions (OARS)

**Source:** Relias, "How to Use OARS Skills in Motivational Interviewing" (2024); MINT guidance
**What it is:** Open-ended questions that invite patients to "tell their story" without leading them. Typically begin with "How" or "What" rather than "Why" (which can feel accusatory).
**Why it works:** Open questions reveal the underlying reasons for refusal – fear of side effects, cultural beliefs, past negative experiences, cost concerns. You cannot address objections you don't understand.
**Measurable signals:**
- Did they ask "What concerns do you have about this treatment?"
- Did they avoid yes/no questions that shut down conversation?
- Did they explore rather than interrogate?

**Quote:** "Open questions invite others to 'tell their story' in their own words without leading them in a specific direction." (University of Iowa SBIRT Academy)

→ **Score Category:** "Open Questions" – "Did they use 'What' and 'How' questions to uncover the real barriers to treatment?"

### 3. Evoking Change Talk (vs. Sustain Talk)

**Source:** NCBI Bookshelf, "Motivational Interviewing as a Counseling Style" (2023); UNC Center for AIDS Research (2025)
**What it is:** Recognizing when patients express reasons to change ("change talk") versus reasons not to change ("sustain talk"), and responding strategically. Using reflections to soften sustain talk and amplify change talk.
**Why it works:** Change talk consists of client statements that favor change. When you argue with sustain talk, you trigger psychological reactance – the patient defends their refusal harder. Softening sustain talk creates space for ambivalence to resolve naturally.
**Measurable signals:**
- Did they avoid arguing when patient expressed reasons not to change?
- Did they use reflective listening to acknowledge sustain talk without reinforcing it?
- Did they amplify patient's own stated concerns about not changing?

**Quote:** "Sustain talk and change talk are expressions of both sides of ambivalence about change. Ambivalence is normalized, explored without judgement and, as a result, may be resolved." (NCBI, 2023)

→ **Score Category:** "Evoking Motivation" – "Did they elicit and amplify the patient's own reasons for change rather than imposing external reasons?"

### 4. Respecting Autonomy (Partnership vs. Authority)

**Source:** StatPearls, "Refusal of Care" (2024); Journal of Healthcare (2023)
**What it is:** Honoring the patient's right to make their own healthcare decisions, even when you disagree. Framing the conversation as collaborative problem-solving rather than doctor-knows-best directives.
**Why it works:** Every competent adult patient has the right to refuse treatment, and their reasons do not have to be sound or rational. When providers become authoritarian, patients disengage or comply superficially without genuine buy-in. Partnership creates trust and space for patients to reconsider.
**Measurable signals:**
- Did they acknowledge the patient's right to decide?
- Did they avoid paternalistic language ("You have to..." or "You need to...")?
- Did they position themselves as a partner, not an authority figure?

**Quote:** "Patient autonomy states that every person has the right to make informed decisions about their healthcare without healthcare professionals imposing their own beliefs." (StatPearls, 2024)

→ **Score Category:** "Respecting Autonomy" – "Did they honor the patient's right to decide while still providing medical guidance?"

### 5. Affirmations (OARS)

**Source:** Homeless Hub, "Motivational Interviewing: OARS" guide; Relias MI training
**What it is:** Recognizing patient strengths and acknowledging behaviors that lead toward positive change, no matter how small.
**Why it works:** Affirmations build confidence in one's ability to change. Even patients refusing treatment may have strengths worth recognizing – showing up for the appointment, asking questions, caring about outcomes.
**Measurable signals:**
- Did they notice and name patient strengths?
- Were affirmations genuine and specific, not generic praise?

→ This informs `systemPrompt` behavior (patient becomes more collaborative when strengths are affirmed)

### 6. Elicit-Provide-Elicit

**Source:** Miller & Rollnick, "Motivational Interviewing" 4th ed. (2023); healthcare communication best practices
**What it is:** Three-step structure for providing information: (1) Ask permission, (2) Provide information clearly, (3) Check understanding and reaction.
**Why it works:** Patients tune out unsolicited advice. Asking permission signals respect. Checking reaction reveals whether information landed or triggered defensiveness.

→ This informs `systemPrompt` behavior and `keyPhrases[]`

---

## Common Mistakes → `systemPrompt` punish rules

These become behavioral rules that punish bad technique.

### 1. Lecturing or Scolding

**Source:** PMC, "Healthcare providers and patients: professional assertiveness" (2023); "Why Word Choice Matters" (Clinical Advisor)
**What people do:** When patient refuses, provider launches into lecture about risks, statistics, and why the patient is making a bad decision.
**Why it fails:** Lecturing and scolding patients is considered unprofessional and counterproductive. It triggers psychological reactance – when told what to do, people dig in harder to protect their autonomy. Patients tune out and stop sharing real concerns.
**AI Response:** When provider lectures without asking questions, patient should become more defensive and shut down emotionally.

→ **systemPrompt rule:** "IF provider delivers long explanations or warnings without asking questions, THEN patient becomes quieter, defensive, and less likely to share real concerns."

### 2. Using Authoritarian Language ("You need to...")

**Source:** PubMed, "Authoritarian physicians and patients' fear of being labeled 'difficult'" (2012); "Why Many Doctors Are Authoritarians" (2019)
**What people do:** Provider uses directive language like "You have to take this medication" or "You need to do this treatment."
**Why it fails:** Authoritarian physicians are key obstacles to shared decision making. The term "noncompliance" smacks of physician authoritarianism. Directive language creates power struggle and makes patients fear being labeled "difficult."
**AI Response:** When provider uses authoritarian language, patient should feel judged and become less willing to engage honestly.

→ **systemPrompt rule:** "IF provider uses directive language like 'You need to' or 'You have to,' THEN patient feels talked down to and becomes less collaborative."

### 3. Arguing Against Refusal

**Source:** Miller & Rollnick MI principles (2023); "Avoiding Risk With Nonadherent Patients" (PMC, 2015)
**What people do:** When patient says "I don't want this treatment," provider immediately argues: "But you need this because..."
**Why it fails:** Arguing for change while patient argues against it is the "righting reflex" – it puts you on opposite sides. The more you argue for change, the more patient argues against it. This is the opposite of motivational interviewing.
**AI Response:** When provider argues directly, patient should defend refusal more strongly and bring up additional reasons not to change.

→ **systemPrompt rule:** "IF provider argues directly against refusal ('But you need this because...'), THEN patient defends position more strongly and raises additional objections."

### 4. Failing to Explore the "Why" Behind Refusal

**Source:** CMPA, "What to do when patients do not follow doctor's advice" (2013); MIEC, "How to Manage Non-Adherent Patients"
**What people do:** Provider accepts the refusal at face value without asking about underlying concerns, fears, or barriers.
**Why it fails:** Understanding reasons behind refusal can range from fear and anxiety to cultural or personal belief. You cannot address concerns you haven't uncovered. Non-adherence may be unintentional due to cost, complexity, or misunderstanding.
**AI Response:** If provider doesn't ask why, patient never reveals the real reason (fear of side effects, had bad experience before, can't afford it, etc.).

→ **systemPrompt rule:** "IF provider accepts refusal without exploring reasons, THEN patient doesn't share underlying concern and conversation ends prematurely."

### 5. Making Patients Feel Judged ("Non-Compliant")

**Source:** "The Noncompliant vs The Non-adherent Patient" (CAP Physicians); "Why Word Choice Matters"
**What people do:** Provider uses judgmental language or tone that implies the patient is being difficult, irrational, or non-compliant.
**Why it fails:** Healthcare providers should use "nonadherent" rather than "noncompliant" to reflect healthier patient-provider relationship. Patients who feel judged stop being honest. They may superficially agree to avoid conflict, then not follow through.
**AI Response:** When patient feels judged, they should become defensive, withdraw, or give false agreement to end conversation.

→ **systemPrompt rule:** "IF provider sounds frustrated or judgmental, THEN patient either becomes defensive or gives false agreement to end the uncomfortable conversation."

---

## Realistic Openings → `firstMessage[]`

How do these conversations actually start? These are patients refusing recommended treatment for various reasons.

1. "I've been thinking about what you said last time, and I don't think I want to start that medication. I've heard it has a lot of side effects." – [Context: Patient researched online, focused on side effects]

2. "Look, I appreciate you trying to help, but I just don't believe in taking all these pills. My grandmother lived to 95 without any medications." – [Context: Cultural/personal belief against medication]

3. "I understand this is supposed to help, but honestly, I'm feeling fine. I don't see why I need treatment if I'm not even sick." – [Context: Asymptomatic condition like hypertension]

4. "The thing is, I can't afford another prescription. My insurance doesn't cover it, and I'm already spending too much on the medications I'm taking." – [Context: Financial barrier]

5. "I tried something similar before and it made me feel terrible. I'm not going through that again." – [Context: Past negative experience with treatment]

---

## Objection Patterns → `responseMap[]`

What pushback is common? How should the provider respond?

### 1. Trigger: "I don't want the side effects"

**Source:** Common refusal reason; addressed in MI literature
**Why they say this:** Legitimate fear, often amplified by internet research. May have had past bad experience.
**How to respond:** "What side effects are you most concerned about?" (open question). Then: "Would it be helpful if I shared what we typically see, and we can decide together if it's worth it?"

→ **responseMap entry:** { trigger: "worried about side effects", response: "Ask which specific side effects concern them. Use elicit-provide-elicit to share realistic expectations." }

### 2. Trigger: "I don't believe in taking medication"

**Source:** Belief-based refusal, common in lifestyle/chronic disease management
**Why they say this:** Cultural values, distrust of pharmaceuticals, preference for natural approaches.
**How to respond:** "Help me understand what's behind that – have you had experiences that shaped that belief?" (reflective listening, open question)

→ **responseMap entry:** { trigger: "don't believe in medication", response: "Explore the belief with curiosity. Ask about experiences that shaped it. Respect autonomy while offering partnership." }

### 3. Trigger: "I feel fine, I don't need treatment"

**Source:** Very common with asymptomatic conditions (hypertension, high cholesterol, prediabetes)
**Why they say this:** Absence of symptoms makes treatment feel unnecessary. Preventive care lacks immediate tangible benefit.
**How to respond:** "That makes sense – when you're feeling good, it's hard to see why treatment matters. What do you understand about what could happen down the road?"

→ **responseMap entry:** { trigger: "I feel fine", response: "Validate the logic. Ask what they understand about long-term risks. Partner on prevention strategy." }

### 4. Trigger: "I can't afford it"

**Source:** Extremely common barrier; documented in adherence literature
**Why they say this:** Financial constraint is real, and often embarrassing to discuss.
**How to respond:** "I'm glad you brought that up – cost is a real concern. Let me see if there are alternatives or assistance programs that could help."

→ **responseMap entry:** { trigger: "cost barrier", response: "Validate the concern. Explore alternatives: generics, assistance programs, or modified treatment plan." }

### 5. Trigger: "I had a bad experience before"

**Source:** Past negative experience creates strong avoidance
**Why they say this:** Traumatic past experience creates legitimate fear. May have been different medication/procedure.
**How to respond:** "That sounds like it was really difficult. What happened?" (Reflective listening, invitation to share)

→ **responseMap entry:** { trigger: "bad past experience", response: "Reflect the difficulty. Ask them to share what happened. Distinguish if this is actually different." }

### 6. Trigger: "I need to think about it"

**Source:** Stalling/avoidance or genuine need for time
**Why they say this:** May be overwhelmed, uncertain, or politely avoiding.
**How to respond:** "Of course – this is your decision. What questions are you hoping to answer as you think it through?"

→ **responseMap entry:** { trigger: "need time to think", response: "Honor the need for time. Ask what questions they're wrestling with. Offer to help think it through." }

---

## Power Phrases → `keyPhrases[]`

Language that works in this scenario.

1. "Help me understand what concerns you most about this treatment." – [Open question that invites patient to share real barriers without judgment]

2. "It sounds like you're worried about [X]. Did I get that right?" – [Reflective listening that validates emotion and checks understanding]

3. "This is your decision – I'm here to help you make the choice that's right for you." – [Honors autonomy, positions provider as partner not authority]

4. "What do you already know about this condition?" – [Elicit-provide-elicit: find out what they know before adding information]

5. "Would it be helpful if I shared what I typically see with this treatment?" – [Asks permission before providing medical information]

6. "What matters most to you when it comes to your health?" – [Evokes patient's own values, creates space for change talk]

7. "You're the expert on your own life – I'm the expert on the medical side. Let's figure this out together." – [Partnership language that respects both roles]

---

## Behavioral Dynamics → `systemPrompt` rules

How should the AI respond to different provider behaviors?

**Reward behaviors (provider does well):**
- IF provider uses reflective listening → Patient feels heard, opens up about real concern (fear, cost, past experience)
- IF provider asks open questions → Patient shares underlying barrier that can actually be addressed
- IF provider respects autonomy ("This is your decision") → Patient relaxes, becomes more willing to consider options
- IF provider acknowledges patient's strengths or values → Patient feels respected, more collaborative

**Punish behaviors (provider does poorly):**
- IF provider lectures or lists risks without asking questions → Patient shuts down, stops engaging
- IF provider uses authoritarian language ("You need to...") → Patient feels judged, becomes defensive
- IF provider argues against refusal → Patient defends position more strongly, brings up more objections
- IF provider shows frustration or impatience → Patient gives false agreement to end conversation, but won't actually take treatment

**Goal tension:**
- Patient's goal: Avoid treatment they're afraid of, don't understand, can't afford, or don't trust
- Provider's goal: Get patient to accept medically necessary treatment
- Natural tension: Provider knows treatment is important; patient has legitimate autonomy and often legitimate concerns. Resolution requires understanding the "why" and partnering on a solution patient can accept.

---

## Key Data/Stats

- Adherence to long-term therapy for chronic illnesses in developed countries averages **50%** (WHO Adherence Report; PMC, 2011)
- Medication nonadherence for chronic diseases affects **40-50% of patients** prescribed medications for diabetes or hypertension (PMC, 2018)
- Nonadherence causes at least **100,000 preventable deaths** and **$100 billion in preventable medical costs** per year in the US (PMC, 2018)
- Between **one-third and two-thirds of all medication-related hospitalizations** result from poor medication adherence (PMC, 2011)
- Public trust in healthcare fell from **71.5% in 2020 to 40.1% in 2024**, impacting treatment acceptance (Healthcare statistics, 2024)
- Since 1986, any patient who has capacity has the **right to refuse any treatment**, regardless of medical necessity (StatPearls, 2024)

---

## References

### Books

1. Rollnick, Stephen, Miller, William R., & Butler, Christopher C. (2008). *Motivational Interviewing in Health Care: Helping Patients Change Behavior*. The Guilford Press.

2. Miller, William R. & Rollnick, Stephen. (2023). *Motivational Interviewing: Helping People Change and Grow* (4th ed.). The Guilford Press.

### Articles/Papers

1. Boissy, A., et al. (2020). Practicing "Reflective listening" is a mandatory prerequisite for empathy. *Patient Education and Counseling*, 103(10), 2136-2137. https://pubmed.ncbi.nlm.nih.gov/32487470/

2. Relias. (2024). How to Use OARS Skills in Motivational Interviewing. https://www.relias.com/blog/oars-motivational-interviewing

3. StatPearls. (2024). Refusal of Care. https://www.ncbi.nlm.nih.gov/books/NBK560886/

4. Nieuwlaat, R., et al. (2014). Interventions for enhancing medication adherence. *Cochrane Database of Systematic Reviews*. Cited in PMC3191684.

5. NCBI Bookshelf. (2023). Chapter 3 – Motivational Interviewing as a Counseling Style. *Enhancing Motivation for Change in Substance Use Disorder Treatment*. https://www.ncbi.nlm.nih.gov/books/NBK571068/

6. UNC Center for AIDS Research. (2025). Responding to Sustain Talk. https://www.med.unc.edu/cfar/2025/11/conversations-about-change-responding-to-sustain-talk/

7. CMPA. (2013). What to do when patients do not follow the doctor's advice: Dealing with non-adherence. https://www.cmpa-acpm.ca/en/advice-publications/browse-articles/2013/what-to-do-when-patients-do-not-follow-the-doctor-s-advice-dealing-with-non-adherence

8. Rosenbaum, L. (2012). Authoritarian physicians and patients' fear of being labeled 'difficult' among key obstacles to shared decision making. *PubMed*, https://pubmed.ncbi.nlm.nih.gov/22566443/

9. PMC. (2023). Healthcare providers and patients: an essay on the importance of professional assertiveness in healthcare today. https://pmc.ncbi.nlm.nih.gov/articles/PMC10101662/

10. Clinical Advisor. (2023). Why Word Choice Matters When Describing Patients Who Do Not Follow Medical Advice. https://www.clinicaladvisor.com/features/word-choice-describe-patients-do-not-listen-to-medical-advice/
