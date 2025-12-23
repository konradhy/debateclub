# Gemini Models Reference

A comprehensive guide to Google's AI models for OratorPrep integration.

*Last Updated: December 21, 2025*

---

## Quick Reference Table

### Language Models

**Use Gemini 3 series. Older models listed for reference only.**

| Model | Context | Speed | Reasoning | Best For | OpenRouter ID |
|-------|---------|-------|-----------|----------|---------------|
| **Gemini 3 Pro** ⭐ | 1M | Medium | ⭐⭐⭐⭐⭐ | Complex reasoning, multimodal | `google/gemini-3-pro` |
| **Gemini 3 DeepThink** ⭐ | 1M | Slow | ⭐⭐⭐⭐⭐ | Strategic planning, deep research | `google/gemini-3-pro-deepthink` |
| **Gemini 3 Flash** ⭐ | 1M | 207 tok/s | ⭐⭐⭐⭐ | Real-time, chat, fast tasks | `google/gemini-3-flash` |
| ~~Gemini 2.5 Pro~~ | 1M | Medium | ⭐⭐⭐⭐ | *Use 3 Pro instead* | `google/gemini-2.5-pro` |
| ~~Gemini 2.5 Flash~~ | 1M | Fast | ⭐⭐⭐ | *Use 3 Flash instead* | `google/gemini-2.5-flash` |
| ~~Gemini 2.5 Flash-Lite~~ | 1M | Very Fast | ⭐⭐ | *Use 3 Flash instead* | `google/gemini-2.5-flash-lite` |
| ~~Gemini 2.0 Flash~~ | 1M | Fast | ⭐⭐⭐ | *Use 3 Flash instead* | `google/gemini-2.0-flash` |
| **Gemini 1.5 Pro** | **2M** | Medium | ⭐⭐⭐⭐ | **Only if you need 2M context** | `google/gemini-pro-1.5` |
| ~~Gemini 1.5 Flash~~ | 1M | Fast | ⭐⭐⭐ | *Use 3 Flash instead* | `google/gemini-flash-1.5` |

### Image Generation Models

| Model | Resolution | Speed | Quality | Best For | API ID |
|-------|------------|-------|---------|----------|--------|
| **Nano Banana Pro** | Up to 4K | Medium | ⭐⭐⭐⭐⭐ | Professional assets, accurate text | `gemini-3-pro-image-preview` |
| **Nano Banana** | Up to 1024px | Fast | ⭐⭐⭐⭐ | Quick image gen, high volume | `gemini-2.5-flash-image` |
| **Imagen 3** | Up to 4K | Medium | ⭐⭐⭐⭐⭐ | Photorealistic images | `imagen-3` |

### Video Generation Models

| Model | Max Length | Resolution | Best For | API ID |
|-------|------------|------------|----------|--------|
| **Veo 3** | 2+ min | 4K | Cinematic video, audio | `veo-3` |
| **Veo 2** | 2 min | 4K | High-quality video | `veo-2` |
| **Veo Flow** | 30 sec | 1080p | Fast video gen | `veo-flow` |

### Audio & Speech Models

| Model | Type | Best For | API ID |
|-------|------|----------|--------|
| **Lyria 2** | Music | AI music generation | `lyria-2` |
| **Chirp 3** | Speech | TTS, voice synthesis | `chirp-3` |

### On-Device Models

| Model | Parameters | Best For | Availability |
|-------|------------|----------|--------------|
| **Gemini Nano 2** | ~3.25B | On-device AI, mobile | Pixel 9, Samsung Galaxy |
| **Gemma 3** | 1B-27B | Self-hosted, fine-tuning | Open source |

---

## Gemini 3 Series (Latest - Q4 2025)

### Gemini 3 Pro

**Released:** November 18, 2025

**Specifications:**
- Context Window: 1 million tokens
- Multimodal: Text, code, images, audio, video
- Benchmarks:
  - 41% on Humanity's Last Exam (beats GPT-5 Pro's 31.64%)
  - 96% on AIME '25 (matches GPT-5.1 Codex)
  - 91% on GPQA Diamond (science tasks)
  - 90% on MMMU-Pro (vision + text)

**When to Use:**
- Complex multi-step reasoning
- Tasks requiring high accuracy across modalities
- Strategic analysis and planning
- Code generation with complex logic

**OratorPrep Integration Points:**
- `PREP_GENERATION` - High-quality opening/closing statement generation
- `POST_DEBATE_ANALYSIS` - Comprehensive post-debate feedback
- Strategic brief generation where accuracy is critical

---

### Gemini 3 DeepThink

**Released:** December 5, 2025

**Specifications:**
- Context Window: 1 million tokens
- Enhanced "thinking" mode with extended reasoning chains
- Optimized for complex problem-solving

**When to Use:**
- Tasks requiring step-by-step reasoning
- Strategic decision-making
- Scientific research synthesis
- Complex counter-argument planning

**OratorPrep Integration Points:**
- Deep Research Agent (see `hackathon/GEMINI_FEATURES.md`)
- Strategic brief generation with thinking traces
- Complex opponent analysis requiring multi-factor reasoning
- Counter-argument selection weighing multiple strategies

**Note:** Slower than other models due to extended reasoning. Best for "prep the night before" not real-time.

---

### Gemini 3 Flash

**Released:** December 17, 2025

**Specifications:**
- Context Window: 1 million tokens
- Speed: 207 tokens/second (fastest in class)
- Optimized for low latency

**When to Use:**
- Real-time applications
- Interactive chat
- High-volume processing
- Live debate coaching

**OratorPrep Integration Points:**
- `TECHNIQUE_DETECTION` - Real-time analysis during debates
- `PREP_CHAT` - Fast chatbot responses
- Live fact-checking (Google Search grounding)
- Any latency-sensitive feature

---

## Gemini 2.5 Series (Q2-Q3 2025) — DEPRECATED

> ⚠️ **Deprecated for OratorPrep.** Use Gemini 3 series instead. These are documented for reference only.

### Gemini 2.5 Pro

**Released:** June 17, 2025

**Status:** ❌ **Use Gemini 3 Pro instead** — better reasoning, same context window.

**Specifications:**
- Context Window: 1 million tokens
- Strong coding and reasoning benchmarks
- Native audio output support

---

### Gemini 2.5 Flash

**Released:** June 17, 2025

**Status:** ❌ **Use Gemini 3 Flash instead** — faster (207 tok/s) and better quality.

**Specifications:**
- Context Window: 1 million tokens
- Fast inference with good quality balance
- Cost-efficient

---

### Gemini 2.5 Flash-Lite

**Released:** June 17, 2025

**Status:** ❌ **Use Gemini 3 Flash instead** — 3 Flash is fast enough and higher quality.

**Specifications:**
- Context Window: 1 million tokens  
- Optimized for maximum speed and minimum cost
- Good for simple tasks

---

## Gemini 2.0 Series (Q1 2025) — DEPRECATED

> ⚠️ **Deprecated for OratorPrep.** Use Gemini 3 series instead.

### Gemini 2.0 Flash

**Status:** ❌ **Use Gemini 3 Flash instead.**

---

### Gemini 2.0 Pro

**Status:** ❌ **Use Gemini 3 Pro instead.**

---

### Gemini 2.0 Flash Thinking (Experimental)

**Status:** ❌ **Use Gemini 3 DeepThink instead** — production-ready thinking model.

---

## Gemini 1.5 Series (2024) — USE ONLY FOR 2M CONTEXT

> ⚠️ **Only use Gemini 1.5 Pro if you need the 2M token context window.** Otherwise use Gemini 3 series.

### Gemini 1.5 Pro

**Released:** Early 2024

**Status:** ✅ **Use ONLY if you need 2M context window** (the only model with this capability)

**Specifications:**
- Context Window: **2 million tokens** (largest available — unique feature)
- 93.4% on MMLU benchmark
- Proven stability

**When to Use:**
- Very long document analysis (only if >1M tokens)
- Processing multiple full research papers at once
- Full debate transcript + all prep materials in single context

---

### Gemini 1.5 Flash

**Released:** Early 2024

**Status:** ❌ **Use Gemini 3 Flash instead** — 3 Flash is faster and better quality.

---

## Image Generation Models

### Nano Banana Pro (Gemini 3 Pro Image)

**Released:** November 2025

**Specifications:**
- Built on Gemini 3 Pro
- Resolution: Up to 4K
- Features:
  - Studio-quality controls (focus, lighting, color grading, camera angles)
  - Accurate text rendering in 20+ languages
  - Real-world grounding via Google Search
  - Default "Thinking" process for composition refinement
  - Multi-image fusion and subject consistency

**When to Use:**
- Professional asset production
- Marketing materials requiring accurate text
- Complex infographics and diagrams
- High-fidelity product mockups
- Contextually-rich visuals needing real-world data

**Pricing:** ~$0.05 per image

**OratorPrep Integration Points:**
- Generating debate visual aids
- Creating infographics from research data
- Social media assets for debate promotion

---

### Nano Banana (Gemini 2.5 Flash Image)

**Released:** August 2025

**Specifications:**
- Built on Gemini 2.5 Flash
- Resolution: Up to 1024px
- Features:
  - Fast image generation optimized for high-volume
  - Natural language prompts for creation/editing
  - Basic text rendering
  - Image-to-image editing
  - "3D figurine" photorealistic style

**When to Use:**
- Quick prototyping and concept visualization
- High-volume image generation
- Real-time content creation
- Simple image edits and enhancements
- Speed prioritized over advanced features

**Pricing:** ~$0.039 per image ($30 per 1M output tokens, ~1,290 tokens/image)

**OratorPrep Integration Points:**
- Quick mockups during prep
- User avatar generation
- Dynamic content previews

---

### Imagen 3

**Released:** 2024 (updated 2025)

**Specifications:**
- Google's flagship text-to-image model
- Resolution: Up to 4K
- Features:
  - Photorealistic image generation
  - Strong prompt adherence
  - Style control and customization
  - SynthID watermarking

**When to Use:**
- Photorealistic images
- When highest image quality is needed
- Marketing and creative content

---

## Video Generation Models

### Veo 3

**Released:** Q4 2025

**Specifications:**
- Length: 2+ minutes
- Resolution: 4K
- Features:
  - Native audio generation (dialogue, sound effects, ambient)
  - Cinematic quality
  - Advanced physics understanding
  - Human motion and expressions

**When to Use:**
- Cinematic video content
- Videos requiring synchronized audio
- Professional video production
- Training and educational videos

**OratorPrep Integration Points:**
- Generating debate training videos
- Creating opponent simulation content
- Visual debate tutorials

---

### Veo 2

**Released:** 2024

**Specifications:**
- Length: Up to 2 minutes
- Resolution: 4K
- Features:
  - High-quality video generation
  - Consistent physics
  - Good motion understanding

**When to Use:**
- Standard video generation tasks
- When Veo 3 is overkill
- Cost-conscious video projects

---

### Veo Flow

**Released:** 2025

**Specifications:**
- Length: Up to 30 seconds
- Resolution: 1080p
- Features:
  - Fast generation optimized for speed
  - Lower cost per video
  - Good for iterative prototyping

**When to Use:**
- Quick video previews
- High-volume video generation
- Prototype/concept videos

---

## Audio & Speech Models

### Lyria 2

**Released:** 2025

**Specifications:**
- Full music generation from text
- Multiple genres and styles
- Instrument and vocal synthesis
- Up to several minutes of audio

**When to Use:**
- Background music generation
- Audio branding
- Creative audio content

---

### Chirp 3

**Released:** 2025

**Specifications:**
- Text-to-speech synthesis
- Multiple voices and languages
- Emotional expression control
- Low latency for real-time

**When to Use:**
- Voice synthesis
- Podcast/audio content generation
- Accessibility features

**OratorPrep Integration Points:**
- Text-to-speech for prep materials
- AI opponent voice synthesis
- Audio playback of debate scripts

---

## On-Device & Open Source Models

### Gemini Nano 2

**Released:** 2025

**Specifications:**
- Parameters: ~3.25 billion
- On-device inference (no cloud required)
- Multimodal: Text, images, audio
- Available on:
  - Google Pixel 9 series
  - Samsung Galaxy S24/S25
  - Select Android devices

**When to Use:**
- Privacy-sensitive applications
- Offline functionality
- Mobile-first experiences
- Edge computing scenarios

**Features:**
- Smart Reply and summarization
- Image understanding
- Real-time translation
- Voice commands

---

### Gemma 3 (Open Source)

**Released:** March 12, 2025

**Specifications:**
- Parameter sizes: 1B, 4B, 12B, 27B
- Multimodal: Text and images
- 140+ languages
- Can run on-device
- Apache 2.0 license

**When to Use:**
- On-device deployment
- Privacy-sensitive applications
- Custom fine-tuning needed
- Self-hosted scenarios
- Research and experimentation

---

### Gemini Embedding

**Released:** March 10, 2025

**Specifications:**
- High-quality text embeddings
- Multi-language support
- Optimized for similarity/clustering
- 768-dimensional vectors

**When to Use:**
- RAG (Retrieval Augmented Generation)
- Semantic search
- Document clustering
- Research material organization

**OratorPrep Integration Points:**
- Research chat RAG embeddings
- Finding similar arguments across sources
- Semantic search in prep materials

---

## Recommended Model Configuration for OratorPrep

**Principle: Always use Gemini 3 series. Never use 2.5/2.0/1.5 unless you need the 2M context window (1.5 Pro only).**

Based on the current codebase (`convex/lib/aiConfig.ts`), here's the recommended Gemini migration:

```typescript
export const AI_MODELS = {
  // HIGH QUALITY - Use Gemini 3 Pro
  PREP_GENERATION: "google/gemini-3-pro",
  POST_DEBATE_ANALYSIS: "google/gemini-3-pro",
  RESEARCH_PROCESSING: "google/gemini-3-pro",
  PREP_CHAT: "google/gemini-3-pro",
  
  // FAST RESPONSE - Use Gemini 3 Flash (207 tok/s, fastest available)
  TECHNIQUE_DETECTION: "google/gemini-3-flash",
  ARTICLE_SUMMARIZATION: "google/gemini-3-flash",  // Fast + cheap, no need for Pro
  
  // DEEP REASONING - Use Gemini 3 DeepThink (extended reasoning chains)
  STRATEGIC_RESEARCH: "google/gemini-3-pro-deepthink",
  OPPONENT_ANALYSIS: "google/gemini-3-pro-deepthink",  // Complex multi-factor reasoning
} as const;

// Image generation (requires Google AI SDK, not OpenRouter)
export const IMAGE_MODELS = {
  HIGH_QUALITY: "gemini-3-pro-image-preview",  // Nano Banana Pro
  FAST: "gemini-2.5-flash-image",              // Nano Banana
} as const;

// Video generation (requires Google AI SDK)
export const VIDEO_MODELS = {
  CINEMATIC: "veo-3",
  STANDARD: "veo-2",
  QUICK: "veo-flow",
} as const;
```

---

## Feature-Specific Model Recommendations

### For Google Search Grounding (Real-time Fact Checking)

**Model:** Gemini 3 Flash
- Fastest available (207 tok/s)
- Grounding is a Gemini-specific feature

```typescript
// Example usage with grounding
const response = await gemini.generateContent({
  contents: [{ text: userClaim }],
  tools: [{ googleSearch: {} }],
});
// Response includes groundingMetadata with sources
```

### For Thinking Mode (Extended Reasoning)

**Model:** Gemini 3 DeepThink
- Production-ready thinking model
- Shows reasoning process
- Better for strategic decisions

### For Video Analysis (Self-Recording)

**Model:** Gemini 3 Pro
- Multimodal video processing
- Needs quality for nuanced feedback

### For Deep Research Agent

**Model:** `deep-research-pro-preview-12-2025` (Interactions API)
- This is an agent, not a model — only one option available
- Multi-step autonomous research
- Cross-references and synthesizes

### For Image Generation

**Model:** Nano Banana Pro for quality, Nano Banana for speed
- Use Pro for marketing materials with accurate text
- Use standard for quick mockups and prototypes

```typescript
// Example: Generate debate infographic
const image = await gemini.generateImages({
  model: "gemini-3-pro-image-preview",
  prompt: "Infographic showing climate change debate statistics",
  aspectRatio: "16:9",
  outputFormat: "png"
});
```

### For Video Content

**Model:** Veo 3 for full production, Veo Flow for quick previews
- Veo 3 includes native audio generation
- Use for training videos and tutorials

---

## Pricing Estimates

### Language Models (via OpenRouter)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| Gemini 3 Pro | ~$2.50 | ~$10.00 |
| Gemini 3 DeepThink | ~$3.00 | ~$12.00 |
| Gemini 3 Flash | ~$0.075 | ~$0.30 |
| Gemini 2.5 Pro | ~$1.25 | ~$5.00 |
| Gemini 2.5 Flash | ~$0.075 | ~$0.30 |
| Gemini 2.5 Flash-Lite | ~$0.05 | ~$0.20 |
| Gemini 1.5 Pro | ~$1.25 | ~$5.00 |
| Gemini 1.5 Flash | ~$0.075 | ~$0.30 |

### Image Models (via Google AI)

| Model | Pricing |
|-------|---------|
| Nano Banana Pro | ~$0.05 per image |
| Nano Banana | ~$0.039 per image |
| Imagen 3 | ~$0.04 per image |

### Video Models (via Google AI)

| Model | Pricing |
|-------|---------|
| Veo 3 | ~$0.35 per second of video |
| Veo 2 | ~$0.25 per second of video |
| Veo Flow | ~$0.10 per second of video |

### Audio Models (via Google AI)

| Model | Pricing |
|-------|---------|
| Lyria 2 | ~$0.05 per second of audio |
| Chirp 3 (TTS) | ~$0.01 per 1K characters |

*Note: Prices subject to change. Check OpenRouter/Google AI for current rates.*

---

## Migration Notes

### Current Setup
All AI calls go through OpenRouter (`convex/lib/openrouter.ts`). Model strings can be changed in `convex/lib/aiConfig.ts`.

### To Switch to Gemini

1. Update `AI_MODELS` in `convex/lib/aiConfig.ts`
2. Replace OpenAI/Anthropic model strings with Gemini equivalents
3. For Gemini-specific features (grounding, thinking), may need native Google AI SDK

### Gemini-Specific Features Requiring SDK

These features require direct Gemini API, not just model swap:
- **Google Search Grounding** - Real-time fact checking
- **Thinking Mode** - Extended reasoning traces
- **Deep Research** - Autonomous research agent
- **Live API** - Real-time voice/video streaming
- **Nano Banana / Nano Banana Pro** - Image generation
- **Veo 2/3** - Video generation
- **Lyria 2** - Music generation

See `hackathon/GEMINI_FEATURES.md` for implementation details.

---

## Experimental & Preview Models

These models are available for testing but may change:

| Model | Status | API ID | Notes |
|-------|--------|--------|-------|
| Gemini 2.0 Flash Thinking | Experimental | `gemini-2.0-flash-thinking-exp` | Shows reasoning steps |
| Gemini 2.5 Pro Experimental | Preview | `gemini-2.5-pro-exp-03-25` | Pre-release features |
| Gemini exp-1206 | Experimental | `gemini-exp-1206` | December 2025 experiment |

**Note:** Experimental models may have rate limits, unexpected behavior, or be deprecated without notice.

---

## Files to Reference

| Topic | File |
|-------|------|
| Current AI config | `convex/lib/aiConfig.ts` |
| OpenRouter helper | `convex/lib/openrouter.ts` |
| Gemini features roadmap | `hackathon/GEMINI_FEATURES.md` |
| Research implementation | `convex/actions/research.ts` |
| Prep generation | `convex/actions/prepGeneration.ts` |
| Analysis | `convex/analysis.ts` |
| Prep chat | `convex/prepChat.ts` |

