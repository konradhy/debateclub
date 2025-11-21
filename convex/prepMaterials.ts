import { action } from "./_generated/server";
import { v } from "convex/values";
import { callOpenRouter, type OpenRouterMessage } from "./lib/openrouter";

/**
 * Generates comprehensive prep materials for a debate
 * - User CheatSheet: Customized technique guide
 * - User Opening Statement: Scripted 30-second opener
 * - User Debate Notes: Research, stats, talking points
 * - Opponent Talking Points: AI-generated arguments for opponent
 */
export const generate = action({
  args: {
    topic: v.string(),
    userPosition: v.string(), // "pro" or "con"
    aiPosition: v.string(), // "pro" or "con"
    style: v.string(), // "aggressive", "socratic", "academic", "political"
    difficulty: v.string(), // "easy", "medium", "hard"
  },
  returns: v.object({
    userCheatSheet: v.string(),
    userOpeningStatement: v.string(),
    userDebateNotes: v.string(),
    opponentTalkingPoints: v.array(v.string()),
  }),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY not configured");
    }

    const systemPrompt = `You are an expert debate coach trained in Mehdi Hasan's techniques. Your prep materials must match the quality and depth of professional debate preparation - with specific receipts, strategic timing guidance, and concrete examples.

DEBATE SETUP:
- Topic: ${args.topic}
- User Position: ${args.userPosition.toUpperCase()}
- AI Opponent Position: ${args.aiPosition.toUpperCase()}
- Opponent Style: ${args.style}
- Difficulty Level: ${args.difficulty}

STRATEGIC PRINCIPLES (Critical - Apply to all materials):

1. TIMING MATTERS
   - Receipts deployed AFTER opponent overreach score higher
   - Don't dump all evidence at once - space strategically throughout debate
   - Save strongest zinger for closing statement

2. EMOTIONAL INTELLIGENCE
   - Passionate delivery amplifies impact
   - Personal stories need emotional resonance
   - Dry technical arguments score lower - frame them emotionally

3. CONTEXT-AWARE TACTICS
   - If opponent says "no evidence exists" → immediate Receipt deployment (9-10 impact)
   - If opponent makes partial truth → Concession & Pivot
   - If opponent rambles > 45 seconds → Strategic Interruption

4. AUDIENCE AWARENESS
   - Academic audience: Emphasize data, methodology, peer review
   - General public: Emphasize relatable examples, emotional stories
   - Hostile audience: Pre-empt objections, acknowledge concerns first

5. OPENING HOOKS
   - Start with personal story, provocative question, or bold claim
   - First 30 seconds set the tone for entire debate
   - Hook must be memorable AND relevant to topic

---

GENERATE 4 COMPONENTS:

=== 1. USER CHEATSHEET (400-600 words) ===

Structure using this EXACT format:

# ${args.topic} - Debate CheatSheet

**Your Position:** ${args.userPosition.toUpperCase()} | **Opponent:** ${args.aiPosition.toUpperCase()}

---

## 🎯 Core Arguments (3-4)

1. **[Argument Name]**: [One sentence claim]
   - Receipt: [Source Year]: "[Specific statistic/fact]"

[Repeat for 3-4 arguments]

---

## 📊 Key Receipts (Deploy Strategically)

- **[Source Year]:** [Specific statistic or fact]
- **[Source Year]:** [Specific statistic or fact]

[5-7 total receipts, each with specific source, year, and exact statistic]

---

## 🥋 Technique Examples

### Concession & Pivot
**Formula:** "You're right that [acknowledge their point], but here's what you're missing: [pivot with evidence]"
**Deploy when:** [Specific scenario for this debate topic]
**Example:** "[Full example response for this specific topic]"

### Receipts
**Deploy strategically:** After opponent makes absolute claim or overreaches
**Key moments:**
- When they say "[specific claim opponent might make for this topic]"
- When they question "[specific thing they'll question]"

### Zingers (Keep under 20 words)
- "[Topic-specific memorable line]"
- "[Contradiction exposed]"
- "[Ironic reversal]"

[5-7 zingers total - MUST be topic-specific and memorable]

---

## 🛡️ Opponent Arguments → Your Counters

| They Say | You Say (with technique) |
|----------|--------------------------|
| "[Specific argument #1]" | "[Your counter using Concession & Pivot OR Receipts]" |

[4-6 rows total]

---

## 💬 Quick Reference

**Opening Hook:** [One powerful line to start]
**Closing Zinger:** [Memorable closer that ties back to opening]

---

=== 2. USER OPENING STATEMENT (75-90 words) ===

Requirements:
- Hook (story, question, or bold claim)
- Position statement
- 1-2 key receipts with sources
- Emotional resonance
- Memorable frame

75-90 words EXACTLY - count them carefully.

---

=== 3. USER DEBATE NOTES (800-1200 words) ===

Structure using this format:

# ${args.topic} - Comprehensive Debate Prep

**Your Position:** ${args.userPosition.toUpperCase()} | **Opponent:** ${args.aiPosition.toUpperCase()}

---

## 🎯 Your Core Arguments

### 1. [Argument Name]
- **Key Point:** [Main claim]
- **Receipt:** [Source Year]: "[Specific statistic]"
- **Why it matters:** [Strategic context]
- **When to deploy:** [Timing guidance]
- **Zinger:** "[Memorable summary under 20 words]"

[Repeat for 3-4 core arguments]

---

## 🥋 Advanced Technique Guide

### Concession & Pivot (Defensive)
**Formula:** "You're right that [X], but here's what you're missing: [Y]"

**Strategic Use:**
- Builds credibility by acknowledging valid points
- Pivots to stronger ground
- Disarms aggressive opponents

**Topic-Specific Examples:**

1. **When they say:** "[Specific opponent claim for this topic]"
   **You respond:** "[Full scripted response showing the formula in action]"

2. **When they say:** "[Second specific claim]"
   **You respond:** "[Full scripted response]"

3. **When they say:** "[Third specific claim]"
   **You respond:** "[Full scripted response]"

### Receipts (Evidence Deployment)
**Strategic Timing:** Deploy AFTER opponent overreach or makes absolute claim

**Your Arsenal:**
- **[Source Year]:** "[Full quote or specific statistic]"
  → **Deploy when:** [Specific moment in debate]
  → **Impact:** [Why this matters strategically]

[Repeat for 7-10 receipts total]

### Zingers (Memorable One-Liners)
**Criteria:** Under 20 words, memorable, exposes contradiction or uses irony

**Your Zingers:**
1. "[Zinger]" - **Use after:** [Specific moment]
2. "[Zinger]" - **Use when:** [Specific moment]

[5-7 zingers total with deployment timing]

---

## 🛡️ Anticipated Opponent Arguments & Rebuttals

### Opponent Argument #1: "[Full argument they'll likely make]"
**Type:** [Economic/Moral/Practical/etc.]
**Counter Strategy:** [Which technique to use]
**Your Response:** "[Full scripted rebuttal]"
**Follow-up Zinger:** "[Optional memorable line]"

[Repeat for 5-7 opponent arguments]

---

## 📋 Debate Flow Strategy

**Opening (0-2 min):**
- Lead with [specific hook/story for this topic]
- Deploy [specific receipt] immediately to establish credibility
- Set frame: [specific framing for this position]

**Middle (2-10 min):**
- Use Concession & Pivot when they make [specific type of claim]
- Deploy receipts strategically - space them out, don't dump
- Watch for these key moments: [specific trigger moments]

**Closing (final 30 sec):**
- Callback to opening hook
- Strongest zinger
- Clear position restatement

---

## 💡 Pro Tips

**Timing:**
- Don't deploy all receipts in opening - save ammunition
- Strongest zinger reserved for final statement
- Interrupt only when they're making provably false claim mid-sentence

**Emotional Intelligence:**
- Passionate, authentic delivery matters more than perfect words
- Show personal connection to topic - vulnerability builds trust
- Frame technical data emotionally: "This isn't just a number - it's [human impact]"

**Adaptation:**
- If opponent escalates aggression, stay calm and deploy receipts methodically
- If opponent concedes points, acknowledge generously then pivot
- If losing ground, use Reframe or Gish Gallop to reset debate terms

---

=== 4. OPPONENT TALKING POINTS ===

Count based on difficulty:
- Easy: 3-5 arguments (simpler, more obvious)
- Medium: 5-7 arguments (sophisticated, nuanced)
- Hard: 7-10 arguments (complex, multi-layered, anticipates rebuttals)

Tone based on style:
- Aggressive: Confrontational, challenges directly, questions motives
- Socratic: Asks questions, exposes contradictions, probes assumptions
- Academic: Data-heavy, methodological critiques, theoretical frameworks
- Political: Values-based, appeals to consequences, framing battles

Format for EACH talking point (1-3 sentences):
1. The claim
2. The reasoning/evidence
3. [For medium/hard] Preemptive counter to anticipated rebuttal

Generate ${args.difficulty === "easy" ? "3-5" : args.difficulty === "medium" ? "5-7" : "7-10"} talking points with ${args.style} style.

---

OUTPUT FORMAT:

Return ONLY valid JSON with properly escaped strings.

CRITICAL RULES:
- Use \\n for line breaks within strings (REQUIRED!)
- Use \\" for quotes within text
- Do NOT include markdown code blocks (like \`\`\`json) around the JSON
- Do NOT include any explanatory text outside the JSON
- Ensure all control characters are properly escaped

{
  "userCheatSheet": "[Full markdown content with \\n for line breaks]",
  "userOpeningStatement": "[75-90 word statement]",
  "userDebateNotes": "[Full markdown content with \\n for line breaks]",
  "opponentTalkingPoints": [
    "Talking point 1",
    "Talking point 2"
  ]
}

VALIDATION CHECKS (verify before returning):
1. ✓ userCheatSheet contains 5-7 receipts with sources and years
2. ✓ userCheatSheet contains technique formulas and topic-specific examples
3. ✓ userCheatSheet contains opponent arguments table with 4-6 rows
4. ✓ userOpeningStatement is 75-90 words
5. ✓ userDebateNotes contains 7-10 detailed receipts with deployment timing
6. ✓ userDebateNotes contains 3-4 examples per major technique
7. ✓ userDebateNotes contains 5-7 anticipated arguments with full rebuttals
8. ✓ opponentTalkingPoints count matches difficulty level
9. ✓ All markdown uses \\n for line breaks
10. ✓ No unescaped quotes or control characters`;

    const userPrompt = `Generate comprehensive, professional-grade debate prep materials for:

Topic: "${args.topic}"
User Position: ${args.userPosition.toUpperCase()}
Opponent Position: ${args.aiPosition.toUpperCase()}
Opponent Style: ${args.style}
Difficulty: ${args.difficulty}

Requirements:
- Use REAL statistics and sources (or realistic placeholders with actual organizations/years)
- Provide topic-specific examples, NOT generic advice
- Include strategic timing guidance for each technique
- Generate ${args.difficulty === "easy" ? "3-5" : args.difficulty === "medium" ? "5-7" : "7-10"} opponent talking points
- Ensure all receipts have sources and years
- Make zingers memorable and under 20 words
- Opening statement must be exactly 75-90 words

Generate materials that match professional debate prep quality.`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    try {
      const siteUrl = process.env.SITE_URL || "https://oratorprep.com";

      // Use the most advanced model for high-quality prep materials
      const response = await callOpenRouter(
        apiKey,
        messages,
        siteUrl,
        3, // maxRetries
        "openai/gpt-4o", // Use GPT-4o for best quality
      );

      let content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI");
      }

      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "");

      // Parse JSON response - find the JSON object
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error(
          "[generatePrepMaterials] No JSON found. Content:",
          content.substring(0, 500),
        );
        throw new Error("No JSON found in AI response");
      }

      let jsonString = jsonMatch[0];

      // Try to parse
      let result;
      try {
        result = JSON.parse(jsonString);
      } catch (parseError) {
        // Log for debugging
        console.error("[generatePrepMaterials] Parse error:", parseError);
        console.error(
          "[generatePrepMaterials] JSON string (first 500 chars):",
          jsonString.substring(0, 500),
        );

        throw new Error(
          `Failed to parse AI response. The AI returned invalid JSON. Please try again.`,
        );
      }

      // Validate structure
      if (
        !result.userCheatSheet ||
        !result.userOpeningStatement ||
        !result.userDebateNotes ||
        !Array.isArray(result.opponentTalkingPoints)
      ) {
        throw new Error("Invalid response structure from AI");
      }

      // Enhanced validation for quality
      const wordCount = result.userOpeningStatement.trim().split(/\s+/).length;

      // Validate opening statement word count (should be 75-90 words)
      if (wordCount < 60 || wordCount > 110) {
        console.warn(
          `[generatePrepMaterials] Opening statement word count is ${wordCount}, expected 75-90`,
        );
      }

      // Validate opponent talking points count based on difficulty
      const expectedCount =
        args.difficulty === "easy"
          ? { min: 3, max: 5 }
          : args.difficulty === "medium"
            ? { min: 5, max: 7 }
            : { min: 7, max: 10 };

      if (
        result.opponentTalkingPoints.length < expectedCount.min ||
        result.opponentTalkingPoints.length > expectedCount.max
      ) {
        console.warn(
          `[generatePrepMaterials] Opponent talking points count is ${result.opponentTalkingPoints.length}, expected ${expectedCount.min}-${expectedCount.max} for ${args.difficulty} difficulty`,
        );
      }

      // Check for basic quality indicators
      const hasReceipts = /\*\*.*?20\d{2}.*?\*\*/.test(result.userCheatSheet);
      const hasZingers = /Zinger/i.test(result.userCheatSheet);
      const hasTechniques = /Concession & Pivot|Receipts|Formula/i.test(
        result.userCheatSheet,
      );

      if (!hasReceipts) {
        console.warn(
          "[generatePrepMaterials] CheatSheet may be missing receipts with years",
        );
      }
      if (!hasZingers) {
        console.warn(
          "[generatePrepMaterials] CheatSheet may be missing zingers section",
        );
      }
      if (!hasTechniques) {
        console.warn(
          "[generatePrepMaterials] CheatSheet may be missing technique examples",
        );
      }

      return {
        userCheatSheet: result.userCheatSheet,
        userOpeningStatement: result.userOpeningStatement,
        userDebateNotes: result.userDebateNotes,
        opponentTalkingPoints: result.opponentTalkingPoints,
      };
    } catch (error) {
      console.error("[generatePrepMaterials] Error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to generate prep materials",
      );
    }
  },
});
