# Organized Todos

## #1: Custom Icon System
Replace all Lucide icons with custom-designed icons that follow a consistent visual theme. Use nano banana to generate 9 icons at a time in a grid, then use Affinity to isolate each icon and handle backgrounds. This requires crafting the right prompt for nano banana and creating a comprehensive list of all icons needed throughout the app.

## #2: AI Interruption Protocol
Test and revise the interruption protocol. Move away from the current pause/mute/toggle approach. Instead, create different AI modes (via system prompts and Vapi configuration) where some modes will interrupt the user and others won't. This involves adjusting the canInterrupt boolean and interruptionThreshold settings in scenario assistant configs, along with corresponding system prompt instructions. Set up a default mode with a toggle to switch between interrupting and non-interrupting behavior.

## #3: Send Extracted Research to Study Mode & Fix Appending
Add click-to-send functionality on extracted research items (arguments, receipts, openers, zingers, counter-arguments) in the My Research tab. When clicked, these items should be sent to study mode and auto-populate into the quick reference section.

While implementing this, fix the research data appending issue where new user-added research overwrites existing research data instead of appending to it. The system should preserve existing research and accumulate new items.

## #4: MAJOR - Evidence Sourcing Agent
Build an AI agent that finds and adds supporting evidence with source URLs. Specifically needs to handle:

1. **Argument Frames**: Currently have empty evidenceIds arrays. Agent should use the evidenceNeeded text descriptions to find relevant receipts or external sources and populate evidenceIds.

2. **Opponent Intelligence - Their Arguments**: The evidence field currently contains only text descriptions of what they'll cite. Need actual source URLs and citations.

3. **Opponent Intelligence - User's Counters**: Each counter object needs a new supporting evidence field with sources/URLs to back up the counter-argument.

This will require decisions about schema modifications (add new fields vs. reuse existing structures) and whether to modify generation prompts or handle this as a post-processing step. The agent must be accountable with monitoring/logging of reasoning for each source inclusion. Consider adding expandable UI elements to display evidence without cluttering the interface.

## #5: Argument Frame Example Quotes
Add example quotes to each argument frame showing the framework in action. These should demonstrate how to actually deploy the argument in a real debate scenario, giving users concrete examples of what it sounds like when spoken.

## #6: Edit Opponent Intelligence
Add the ability to edit opponent intelligence items. Need to investigate why this wasn't originally included in the UI, as there may have been a specific reason for omitting it.

## #7: Receipt Deployment Examples
Receipts should include examples of how to deploy them in action. Currently receipts have a deployment field, but it needs concrete examples showing how to actually use each receipt during a debate.

## #8: Adjustable Opening/Closing Statement Length
The opening and closing statements feel short. Make the length adjustable and check what the book suggests for optimal length.

## #9: Debate Summary Booklet
Create an easy-to-read summary booklet (approximately 7-minute read) that gives users a mental model of the argument they're making. This should be a skimmable document that helps users quickly understand what they're getting into before the debate.

## #10: MAJOR - Perceived Wait Time Optimization
The goal is to make analysis and research generation feel faster, even when backend processes take time. Users currently wait with minimal feedback, making the experience feel slow.

**Strategies to implement:**

1. **Instant Feedback with Flash Content**: Show AI-generated placeholder content immediately (with clear "preliminary" caveat) while real generation happens in background. Users start reading/interacting right away.

2. **Progressive Streaming**: Display fields as they populate in real-time rather than waiting for all generation to complete. Show partial results immediately.

3. **Parallel Processing**: Run independent generation tasks concurrently instead of sequentially. Update the UI to show multiple items generating at once.

4. **Engaging Status Messages**: Use a tiny/cheap LLM to generate contextual phrases about what's happening ("Analyzing their strongest arguments...", "Finding counterevidence...") to keep users engaged during processing.

5. **Timing & Metrics**: Measure and display actual timing for deep research vs firecrawl methods. Use this data to set user expectations and optimize the experience.

Create a reusable component/hook that implements these patterns for use across prep generation, analysis page, and research page.

**Note:** This requires extensive rewiring of the generation pipeline and UI - potentially the hardest todo on this list. Will need to check which of these approaches are actually feasible with current architecture.

## #11: Scenario Context Field Investigation
Some scenarios break when you add extra context and other lower fields, suggesting these fields aren't even being used in the prompts. Investigate which scenario fields are actually utilized and fix the ones that are being ignored.

## #12: Error Page Design
Create nice, well-designed error pages for all error-prone scenarios. Implement these individually for each scenario type rather than a single generic error page.

## #13: Analysis Page Content Links
The analysis page should link to the appropriate scenario blog posts for further reading. Additionally, recommend books or studies for further reading. This requires mapping a large list of items users can select from, which would also serve as great SEO fodder.

## #14: Monetization System & Token Economy
Implement a multi-tiered monetization system that supports the marketing funnel workflow: Users discover specific scenarios through marketing (e.g., doctor scenario for patient compliance), read targeted blog content, and receive free credits/tokens for that specific scenario. The system needs to handle: (1) scenario-specific token grants for free trials, (2) per-scenario token purchases for individual access, (3) full subscription for unlimited access to all scenarios including debate mode. Must accommodate different workflows, pipelines, and tools with proper rate limiting and feature gating based on user's plan/tokens.

## #15: Win Every Argument Score Calibration
The "Win Every Argument" score is currently too generous, sometimes giving 11/10 scores. Calibrate the scoring rubric to be more accurate. Check if scores are being doubled somewhere in the calculation. Review the rubric logic to ensure proper evaluation.

## #16: Opponent Intelligence Position Flip Investigation
The opponent intelligence section feels like the pro/con argument positions are flipped. This could be due to leftover code/logic from previous versions. Investigate and fix the position assignments.

## #17: MAJOR - Prompt Engineering Review & Calibration
Manually review and organize all LLM prompts to understand what each model receives at each point in the generation pipeline. Review the full prompt chains for research generation, strategy generation, opening statements, receipts, zingers, etc. Calibrate all prompts against common sense and the book's methodology. All prompts can likely be improved, with strategy generation individual prompts needing particular attention and refinement.

---

## LONG TERM

### Skill-Specific Practice Drills
Add the ability for users to set what specific skill they want to improve and practice it through targeted drills or get specific analysis. This enables conscious practice on individual debate elements. Start by creating a single drill from the book, monitor usage, then expand based on user engagement.

### Internationalization (i18next)
Translate all pages to multiple languages using i18next or alternative. Implement slowly and steadily. Create a bug tracker so users can report grammar or language-related bugs. Show a warning when users use non-English languages that their help will be needed for quality assurance.

### Story Mode
Create a narrative-driven debate training experience that includes homework assignments for real life, drills from the book, and automatic sorting of practice activities. This mode guides users through structured learning with real-world application.

### Legal Mode
Implement a specialized debate mode that follows the rules and procedures of Jamaican court. This includes proper legal debate format, objection handling, and courtroom-specific argumentation techniques.

### Podcast Mode
Add a conversational debate format focused on back-and-forth communication about topics rather than competitive debate. This mode emphasizes discussion and exploration of ideas in a podcast-style format.

### Interview Mode
Create an interview-style practice mode where users can practice handling questions and presenting their positions in an interview format rather than formal debate structure.

### Multiplayer Mode
Build a feature allowing users to challenge others to debates, either friends via direct links or random opponents from the platform. The system includes a debate coach that listens in, follows a set debate structure, and generates sharable links so friends or the public can vote on the winner. This mode should be designed to appeal to streamers and influencers who want to showcase their debate skills.

---
