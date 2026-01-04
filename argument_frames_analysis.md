# ARGUMENT_FRAMES_PROMPT Analysis: Current vs. Hasan's Methodology

## Executive Summary

The current ARGUMENT_FRAMES_PROMPT has solid foundations but suffers from **structural rigidity** that conflicts with Hasan's core principle of flexible, audience-adaptive framing. While it correctly incorporates deployment techniques and evidence integration, it forces arguments into predetermined categories rather than generating emotionally resonant frames tailored to specific audiences and contexts.

## Current Prompt Strengths

### ✅ What's Working Well

1. **Deployment Techniques Integration**: Excellent inclusion of Concession Pivot, Reframing, Preemption, and Evidence Integration with Hasan quotes and examples
2. **Evidence Connection**: Strong guidance on extracting specific findings from research sources
3. **Example Quote Requirement**: Forces practical application of deployment techniques
4. **Strategic Brief Integration**: Good use of audience context and opponent intelligence
5. **Pathos Over Logos Recognition**: Includes emotional core requirement

## Critical Gaps Against Hasan's Methodology

### ❌ Major Issues

#### 1. **RIGID CATEGORIZATION PROBLEM**
**Current Approach**: Forces "Moral/Ethical, Practical/Consequentialist, Economic, Historical/Precedent" categories
**Hasan's Approach**: Flexible triadic structures adapted to context

**Quote from Hasan**: "Making a Political, an Economic, and a Moral argument" is ONE example, not THE template.

**Problem**: This rigidity prevents:
- Audience-specific frame adaptation
- Context-sensitive argument selection  
- Natural triadic flow that feels conversational
- Emotional resonance optimization

#### 2. **MISSING EMOTIONAL ACTIVATION**
**Current**: Mentions "emotional core" as afterthought
**Hasan's Core**: "Pathos beats logos almost every time" - emotion should drive frame selection

**Gap**: No guidance on:
- How to identify audience's emotional triggers
- Which emotions work for which argument types
- How to build emotional stakes into frame structure
- Connecting logical arguments to visceral feelings

#### 3. **DEPLOYMENT TECHNIQUES FEEL SEPARATE**
**Current**: Deployment techniques taught as separate section
**Hasan's Approach**: Judo moves integrated into argument construction

**Problem**: Frames should be BUILT with deployment strategy, not have techniques applied afterward

#### 4. **NO STAKES EMPHASIS**
**Missing**: Clear guidance on showing "what's at risk" or "what's possible"
**Hasan's Method**: Every argument should answer "So what?" and "Why now?"

#### 5. **INSUFFICIENT AUDIENCE ADAPTATION**
**Current**: Generic audience consideration
**Hasan's Principle**: "Present arguments in a way that aligns with the audience's interests or identities"

**Gap**: Should generate different frame sets for:
- Business audiences vs. academic vs. general public
- Hostile vs. neutral vs. friendly audiences
- Different value systems (security, freedom, fairness, etc.)

#### 6. **WEAK PREEMPTION INTEGRATION**
**Current**: Preemption taught as deployment technique
**Hasan's Approach**: Frames should anticipate and neutralize counter-arguments

## Specific Improvement Recommendations

### 1. **REPLACE RIGID CATEGORIES WITH FLEXIBLE TRIADS**

**Instead of**: Fixed "Moral, Practical, Economic, Historical" categories
**Use**: Context-adaptive triadic structures:

```
For Business Audience:
- Risk/Opportunity/Competitive Advantage
- Cost/Efficiency/Growth
- Short-term/Medium-term/Long-term

For General Public:
- Personal Impact/Community Impact/Future Impact
- Safety/Prosperity/Freedom
- Problem/Solution/Benefit

For Academic Audience:
- Theoretical/Empirical/Practical
- Cause/Effect/Implication
- Historical/Current/Projected
```

### 2. **EMOTION-FIRST FRAME GENERATION**

**Add Section**: "EMOTIONAL FOUNDATION"
```
Before generating logical structures, identify:
1. What should the audience FEEL about this issue?
   - Fear (what's at risk)
   - Hope (what's possible) 
   - Outrage (what's unfair)
   - Pride (what we can achieve)
   - Urgency (why now matters)

2. Which emotions resonate with THIS audience?
   - Security-focused: Fear of loss, pride in protection
   - Progress-focused: Hope for improvement, outrage at stagnation
   - Fairness-focused: Outrage at injustice, pride in equality

3. How does each frame activate these emotions?
```

### 3. **INTEGRATED DEPLOYMENT STRATEGY**

**Replace**: Separate deployment techniques section
**With**: Frame generation that includes built-in deployment:

```json
{
  "frame": {
    "coreArgument": "[The logical structure]",
    "emotionalHook": "[What makes audience care]",
    "builtInPreemption": "[Anticipated counter-argument addressed]",
    "deploymentStrategy": {
      "bestUsedWhen": "[Specific opponent moves or audience states]",
      "leadInTechnique": "[Concession/Reframe/Preemption setup]",
      "evidenceReveal": "[When and how to deploy supporting evidence]",
      "followUpPressure": "[How to capitalize after making the point]"
    }
  }
}
```

### 4. **STAKES-DRIVEN FRAMING**

**Add Requirement**: Every frame must answer:
- "What happens if we do nothing?" (Risk stakes)
- "What becomes possible if we act?" (Opportunity stakes)  
- "Why is this moment critical?" (Timing stakes)

### 5. **AUDIENCE-ADAPTIVE GENERATION**

**New Structure**: Generate 2-3 frame sets for different audience types:
```
"audienceFrameSets": [
  {
    "audienceType": "Business/Corporate",
    "frames": [3 frames optimized for business values],
    "emotionalAppeals": ["Competitive advantage", "Risk mitigation", "Growth opportunity"]
  },
  {
    "audienceType": "General Public", 
    "frames": [3 frames optimized for general concerns],
    "emotionalAppeals": ["Personal safety", "Family impact", "Community benefit"]
  },
  {
    "audienceType": "Academic/Expert",
    "frames": [3 frames optimized for expert analysis],
    "emotionalAppeals": ["Intellectual integrity", "Evidence quality", "Long-term implications"]
  }
]
```

### 6. **PREEMPTIVE FRAME CONSTRUCTION**

**Add Requirement**: Each frame must include:
- "anticipatedCounters": [List of likely objections]
- "preemptiveElements": [How the frame addresses these before opponent raises them]
- "trapPotential": [How this frame sets up opponent vulnerabilities]

## Recommended New Prompt Structure

### Phase 1: Emotional Foundation
1. Identify audience emotional triggers
2. Map issue to audience values/identities
3. Determine stakes (risk/opportunity/timing)

### Phase 2: Triadic Structure Selection  
1. Choose triadic framework based on audience type
2. Ensure emotional resonance in each element
3. Build in preemptive elements

### Phase 3: Deployment Integration
1. Identify optimal deployment contexts
2. Build in judo move setups
3. Plan evidence reveals and follow-up pressure

### Phase 4: Audience Adaptation
1. Generate variations for different audience types
2. Adjust emotional appeals and language
3. Modify complexity and evidence types

## Implementation Priority

### High Priority (Immediate Impact)
1. Replace rigid categories with flexible triads
2. Add emotion-first frame generation
3. Integrate deployment strategy into frame construction

### Medium Priority (Next Iteration)  
1. Add audience-adaptive frame sets
2. Strengthen stakes emphasis
3. Improve preemption integration

### Low Priority (Future Enhancement)
1. Add frame effectiveness scoring
2. Include opponent-specific adaptations
3. Build in real-time frame selection guidance

## Conclusion

The current prompt has excellent tactical elements but needs strategic restructuring to align with Hasan's core methodology. The key insight is that **frames should be emotionally resonant, audience-adaptive structures with built-in deployment strategies**, not logical categories with techniques applied afterward.

The rigid categorization is the biggest barrier to effective implementation of Hasan's approach. Fixing this foundational issue will unlock the prompt's potential to generate truly persuasive, contextually appropriate argument frames.