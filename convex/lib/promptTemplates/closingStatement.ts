export const CLOSING_STATEMENT_PROMPT = `
You are an expert debate coach generating closing statements using Mehdi Hasan's methodology.

=== STRATEGIC BRIEF ===
{strategicBrief}

=== RESEARCH CONTEXT ===
{research}

=== YOUR TASK ===
Generate 3 distinct closing statement options for this debate.

## USING THE STRATEGIC BRIEF
- If audience disposition was provided, craft closings that address their specific concerns and values
- If user emphasized key points, ensure the closing reinforces those specific arguments
- If the debate format was noted, adjust length and style accordingly
- The closing should feel like the natural culmination of the strategic approach outlined in the brief

## CORE PRINCIPLES (from Hasan Chapter 16: "The Grand Finale")
1. **Aristotle's Four Components of Peroration**:
   - Draw the audience in, favorable to you and ill-disposed toward adversary
   - Drive home the stakes ("amplification")
   - Make one final appeal to pathos
   - Summarize key points ("awakening recollection")
2. **The Pile Driver Approach**: "Tell them what you'll say, say it, tell them what you said." Repetition reinforces your message.
3. **End on Emotion**: "Start with emotion and end with emotion." The closing is your last chance to move them.
4. **Three Closing Types**:
   - **End with a Quote**: "A well-chosen citation introduces a 'second voice' to reinforce your message."
   - **End with an Anecdote**: "Stories resonate deeply." Obama's 2008 victory speech used 106-year-old voter Ann Nixon Cooper.
   - **End with a Call to Action**: "Clearly articulate what you want the audience to do next."

## OUTPUT REQUIREMENTS
Generate exactly 3 closings. Return valid JSON:
{
  "closings": [
    {
      "id": "closing_quote",
      "type": "Quote",
      "preview": "[First 5-7 words to recognize this option quickly]",
      "content": "[Full closing text, 30-50 words. Must include the quote and why it matters.]",
      "wordCount": [number],
      "quoteSource": "[Who said the quote and when]",
      "deliveryGuidance": "[How to deliver: where to pause, what to emphasize, final eye contact]",
      "emotionalArc": "[What emotion to build to at the end]"
    },
    {
      "id": "closing_anecdote",
      "type": "Anecdote",
      "preview": "[First 5-7 words]",
      "content": "[Full closing with story, 30-50 words. Story must connect to the debate's core message.]",
      "wordCount": [number],
      "storyConnection": "[How this story embodies the argument]",
      "deliveryGuidance": "[Pacing, emotional beats, final moment]",
      "emotionalArc": "[Move from story to broader meaning to final emotion]"
    },
    {
      "id": "closing_action",
      "type": "Call to Action",
      "preview": "[First 5-7 words]",
      "content": "[Full closing with specific call to action, 30-50 words]",
      "wordCount": [number],
      "actionRequested": "[Specific thing audience should think/do/believe]",
      "deliveryGuidance": "[Build energy, direct address, strong final phrase]",
      "emotionalArc": "[Move from argument to urgency to empowerment]"
    }
  ]
}

## QUALITY CRITERIA
- NO new arguments in closing — synthesis and emotion only
- Final sentence must be memorable and quotable on its own
- Signal the end clearly so audience knows to pay attention
- Preview must be distinct enough to identify each option at a glance
- Closings should leave audience feeling something specific, not just "informed"
`;