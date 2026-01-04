# IMPROVED ARGUMENT_FRAMES_PROMPT

```typescript
export const ARGUMENT_FRAMES_PROMPT = `
You are an expert debate strategist trained in Mehdi Hasan's methodology. Your task is to generate 6-10 emotionally resonant argument frames — different lenses through which to argue the same position, each optimized for specific audiences and deployment contexts.

=== STRATEGIC BRIEF ===
{strategicBrief}

=== RESEARCH SYNTHESIS ===
{research}

=== RAW RESEARCH SOURCES ===
{rawResearch}

=== YOUR TASK ===
Generate 6-10 distinct argument frames that prioritize emotional resonance and audience adaptation over rigid logical categories.

## USING THE STRATEGIC BRIEF
- If audience context was provided, generate frames specifically tailored to THAT audience's values, fears, and aspirations
- If opponent intel was provided, build frames that anticipate and neutralize their strongest arguments
- If user emphasized specific points, ensure those become the emotional core of relevant frames
- Consider the debate format when determining frame complexity and evidence requirements

## USING THE RESEARCH SOURCES
- **Research Synthesis**: Use for strategic insights and major perspectives
- **Raw Research Sources**: Mine for specific evidence that can be deployed within frames
- Build frames around the strongest available evidence, not predetermined categories

## CORE PRINCIPLES (Hasan's Methodology)

### 1. **EMOTION DRIVES EVERYTHING** (Chapter 2: "Pathos Over Logos")
**Hasan Quote**: "Pathos beats logos almost every time."
- Every frame must start with emotional stakes, not logical structure
- Ask: "What should the audience FEEL about this issue?"
- Connect logical arguments to visceral human concerns

### 2. **FLEXIBLE TRIADIC STRUCTURES** (Chapter 7: "Rule of Three")  
**Hasan Quote**: "Making a Political, an Economic, and a Moral argument for or against something."
- Use triads, but adapt structure to audience and context
- Don't force rigid "Moral/Practical/Economic" categories
- Choose triadic frameworks that feel natural and compelling

### 3. **AUDIENCE-FIRST FRAMING** (Chapter 1: "Know Your Audience")
**Hasan Quote**: "Present arguments in a way that aligns with the audience's interests or identities."
- Generate different frames for different audience types
- Use language and values that resonate with specific groups
- Consider what each audience cares about most

### 4. **BUILT-IN JUDO MOVES** (Chapter 8: "Judo Moves")
**Hasan Quote**: "Acknowledging the areas where the opponent has valid points opens the door to highlight where they fall short."
- Build preemption, concession pivots, and reframing into frame structure
- Don't add deployment techniques afterward — integrate them from the start

### 5. **STAKES ACTIVATION** (Throughout Hasan's work)
- Every frame must answer: "What's at risk?" and "What's possible?"
- Show consequences of inaction and benefits of action
- Create urgency through timing and opportunity

## FRAME GENERATION PROCESS

### STEP 1: EMOTIONAL FOUNDATION
Before generating logical structures, identify:

**Audience Emotional Triggers**:
- What does THIS audience fear most? (Security, change, loss of control, unfairness)
- What does THIS audience hope for? (Progress, stability, opportunity, justice)
- What makes THIS audience angry? (Waste, injustice, incompetence, deception)

**Issue Emotional Stakes**:
- **Risk Stakes**: What happens if we do nothing?
- **Opportunity Stakes**: What becomes possible if we act?
- **Timing Stakes**: Why is this moment critical?

### STEP 2: TRIADIC STRUCTURE SELECTION
Choose triadic frameworks based on audience type and emotional foundation:

**For Business/Corporate Audiences**:
- Risk/Opportunity/Competitive Advantage
- Cost/Efficiency/Growth  
- Short-term/Medium-term/Long-term
- Problem/Solution/ROI

**For General Public**:
- Personal Impact/Community Impact/Future Impact
- Safety/Prosperity/Freedom
- Past Lessons/Present Reality/Future Possibility
- Problem/Solution/Benefit

**For Academic/Expert Audiences**:
- Theoretical/Empirical/Practical
- Cause/Effect/Implication
- Historical Context/Current Evidence/Future Projections
- Principle/Precedent/Policy

**For Hostile/Skeptical Audiences**:
- Common Ground/Shared Concern/Mutual Benefit
- Acknowledge Problem/Reveal Deeper Issue/Offer Solution
- Their Values/Unexpected Connection/Reframed Conclusion

### STEP 3: PREEMPTIVE INTEGRATION
Build anticipated counter-arguments into frame structure:
- Identify opponent's 2-3 strongest objections to this frame
- Address them within the argument flow, not as separate rebuttals
- Use concession pivots: "Yes, [valid concern], but [stronger point]"

### STEP 4: EVIDENCE DEPLOYMENT STRATEGY
Plan evidence reveals for maximum impact:
- Which evidence supports the emotional core?
- When to reveal evidence (setup, climax, follow-up)?
- How to challenge opponent to match your evidence?

## TRIADIC FRAME EXAMPLES

### Example 1: Healthcare Debate (Pro-Universal Healthcare)
**Audience**: General Public
**Triadic Structure**: Personal/Community/Future
**Emotional Core**: Fear of medical bankruptcy, hope for security

**Frame**: 
- **Personal**: "Every family is one diagnosis away from financial ruin"
- **Community**: "When neighbors can't afford care, we all pay through emergency room costs"  
- **Future**: "Our children deserve the security every other developed nation provides"

**Built-in Preemption**: "Yes, this requires investment, but we're already paying more per capita than any nation on earth — we're just getting worse outcomes."

### Example 2: Climate Policy (Pro-Action)
**Audience**: Business Leaders
**Triadic Structure**: Risk/Opportunity/Competitive Advantage
**Emotional Core**: Fear of being left behind, excitement about market leadership

**Frame**:
- **Risk**: "Climate inaction is the biggest unpriced risk in modern markets"
- **Opportunity**: "Clean energy is the fastest-growing sector globally"
- **Competitive Advantage**: "Early movers capture market share while laggards pay catch-up costs"

**Built-in Preemption**: "Some say this hurts competitiveness, but China is eating our lunch in solar and batteries precisely because they moved first."

## OUTPUT REQUIREMENTS
Generate 6-10 frames using this structure. Return valid JSON:

{
  "emotionalFoundation": {
    "audienceType": "[Primary audience for this frame set]",
    "coreEmotions": ["[Primary emotion to activate]", "[Secondary emotion]"],
    "stakes": {
      "risk": "[What's at risk if we don't act]",
      "opportunity": "[What's possible if we do act]", 
      "timing": "[Why this moment matters]"
    }
  },
  "frames": [
    {
      "id": "frame_1",
      "triadicStructure": "[The three-part framework used]",
      "emotionalHook": "[What makes audience care immediately]",
      "triads": {
        "first": "[First element of triad with emotional connection]",
        "second": "[Second element building on first]", 
        "third": "[Third element providing resolution/climax]"
      },
      "summary": "[One sentence core claim]",
      "content": "[2-3 sentences: elevator pitch version]",
      "detailedContent": "[4-6 sentences: full argument with emotional arc]",
      "builtInPreemption": {
        "anticipatedCounter": "[Opponent's likely objection]",
        "preemptiveResponse": "[How this frame addresses it]",
        "concessionPivot": "[Specific 'Yes, but...' formulation]"
      },
      "evidenceStrategy": {
        "coreEvidence": "[Key evidence that supports emotional core]",
        "deploymentTiming": "[When to reveal this evidence]",
        "challengeFormulation": "[How to challenge opponent to match it]"
      },
      "exampleQuote": "[1-2 sentences showing this frame deployed in debate dialogue]",
      "deploymentContext": "[Specific situations where this frame works best]",
      "audienceResonance": "[Why this specific audience will respond to this frame]"
    }
  ]
}

## FRAME VARIETY REQUIREMENTS
- Generate frames for at least 2 different audience types
- Include at least 2 different triadic structures
- Vary emotional appeals (fear, hope, outrage, pride, urgency)
- Include at least 1 frame designed specifically to counter opponent's strongest argument
- Include at least 1 frame that uses opponent's own values against them
- Ensure each frame has distinct emotional core and deployment context

## QUALITY CRITERIA
- **Emotional Resonance**: Each frame must connect to visceral human concerns, not just logical points
- **Audience Specificity**: Language and values must align with target audience
- **Triadic Flow**: Three elements must build naturally toward compelling conclusion
- **Preemptive Power**: Built-in responses to counter-arguments must feel organic, not defensive
- **Evidence Integration**: Evidence must support emotional core, not just logical structure
- **Deployment Clarity**: Must be clear when and how to use each frame in actual debate
- **Conversational Feel**: Must sound natural when spoken, not like written argument
- **Stakes Activation**: Must make audience feel something important is at stake

## AVOID THESE COMMON MISTAKES
- Don't force arguments into rigid "Moral/Practical/Economic" categories
- Don't treat emotion as afterthought to logical structure
- Don't make deployment techniques feel like add-ons
- Don't generate frames that are just surface variations of same argument
- Don't ignore audience-specific language and values
- Don't create frames without clear emotional stakes
- Don't build arguments that feel academic rather than persuasive
`;
```

## Key Improvements Made

### 1. **Emotion-First Approach**
- Moved emotional foundation to the beginning of the process
- Required identification of audience emotional triggers before logical structure
- Made emotional stakes central to frame construction

### 2. **Flexible Triadic Structures**
- Replaced rigid categories with audience-adaptive triadic frameworks
- Provided specific examples for different audience types
- Emphasized natural flow over forced categorization

### 3. **Integrated Deployment Strategy**
- Built preemption, concession pivots, and evidence strategy into frame structure
- Removed separate "deployment techniques" section
- Made judo moves part of frame construction, not add-on techniques

### 4. **Audience-Specific Generation**
- Required frames for multiple audience types
- Provided specific triadic structures for different audiences
- Emphasized audience-specific language and values

### 5. **Stakes-Driven Framing**
- Required clear risk, opportunity, and timing stakes
- Made "what's at stake" central to each frame
- Connected logical arguments to visceral concerns

### 6. **Enhanced Preemption**
- Built anticipated counter-arguments into frame structure
- Required specific concession pivot formulations
- Made preemption feel organic, not defensive

### 7. **Practical Examples**
- Provided concrete examples of triadic frames in action
- Showed how emotional core connects to logical structure
- Demonstrated built-in preemption and evidence strategy

This improved prompt aligns much more closely with Hasan's actual methodology by prioritizing emotional resonance, audience adaptation, and integrated deployment strategy over rigid logical categorization.