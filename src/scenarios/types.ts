/**
 * Vapi Speech Plan Configurations
 *
 * Defines startSpeakingPlan and stopSpeakingPlan for each interruption mode.
 * These control how quickly the AI responds and how easy it is to interrupt.
 */

import type { InterruptionMode } from "@/lib/vapi/speechPlans";

/**
 * Voice configuration for Vapi assistant.
 */
export interface VoiceConfig {
  provider: "11labs" | "cartesia" | "deepgram";
  voiceId: string;
  stability?: number;
  similarityBoost?: number;
}

/**
 * Assistant configuration for Vapi during practice sessions.
 */
export interface AssistantConfig {
  /** Opening message(s). If array, one is randomly selected per session. */
  firstMessage: string | string[];

  /** System prompt with placeholders like {{TOPIC}}, {{OPPONENT_DESC}} */
  systemPrompt: string;

  /** Voice settings */
  voice?: VoiceConfig;

  /** LLM temperature (0-1). Higher = more creative. */
  temperature?: number;
}

/**
 * Input field configuration for the opponent creation form.
 */
export interface InputFieldConfig {
  /** Label displayed above the field */
  label: string;

  /** Placeholder text inside the field */
  placeholder: string;

  /** Helper text below the field */
  helperText?: string;

  /** Whether field is required */
  required?: boolean;

  /** Whether to hide this field for this scenario */
  hidden?: boolean;

  /** Field type (defaults to textarea) */
  type?: "text" | "textarea" | "select";

  /** Number of rows for textarea */
  rows?: number;

  /** Options for select fields */
  options?: Array<{ value: string; label: string }>;
}

/**
 * A section groups related fields together in the UI.
 * Sections can be nested (e.g., "Deep Intel" inside "Opponent Profile")
 */
export interface FormSection {
  /** Unique section identifier */
  id: string;

  /** Display title */
  title: string;

  /** Subtitle/description */
  description?: string;

  /** Lucide icon name (e.g., 'User', 'Target') */
  icon?: string;

  /** Shows "optional" badge, defaults collapsed */
  optional?: boolean;

  /** Override collapse state */
  defaultOpen?: boolean;

  /** Field keys from inputs (order matters) */
  fields: string[];

  /** Nested sections (for Deep Intel pattern) */
  subsections?: FormSection[];
}

/**
 * Core fields configuration - fields that are ALWAYS visible (not in accordions)
 */
export interface CoreFieldsConfig {
  /** Field keys always visible at top */
  fields: string[];

  /** Show AI style/difficulty selectors (debate only) */
  showStyleDifficulty?: boolean;
}

/**
 * Complete form layout configuration
 */
export interface FormLayoutConfig {
  /** Always-visible fields */
  core: CoreFieldsConfig;

  /** Collapsible accordion sections */
  sections: FormSection[];
}

/**
 * Score category for analysis.
 * Each scenario defines its own categories.
 */
export interface ScoreCategory {
  /** Display name (e.g., "Discovery", "Clarity") */
  name: string;

  /** Description of what this category measures */
  description: string;
}

/**
 * Analysis configuration for post-practice feedback.
 */
export interface AnalysisConfig {
  /** Framework identifier (e.g., "debate", "sales", "entrepreneur") */
  framework: string;

  /** Score categories specific to this scenario */
  scoreCategories: ScoreCategory[];

  /** System prompt for analysis generation with {{TRANSCRIPT}} placeholder */
  systemPrompt: string;
}

/**
 * Pipeline configuration controlling what runs when opponent is created.
 */
export interface PipelineConfig {
  /** Whether to run research phase (Firecrawl/Gemini) */
  research: boolean;

  /** Whether to show prep page */
  prep: boolean;

  /** Which prep page type to use */
  prepType: "debate" | "generic";
}

/**
 * Complete scenario configuration.
 * One file per category, can have multiple variations.
 */
export interface ScenarioConfig {
  /** Unique identifier (e.g., "debate", "sales-cold-prospect") */
  id: string;

  /** Display name (e.g., "Sales - Cold Prospect") */
  name: string;

  /** Category grouping (e.g., "sales", "entrepreneur") */
  category: string;

  /** Default interruption mode for this scenario */
  defaultInterruptionMode: InterruptionMode;

  /** Pipeline configuration */
  pipeline: PipelineConfig;

  /** Input field configurations (overrides default labels/placeholders) */
  inputs: {
    topic: InputFieldConfig;
    position?: InputFieldConfig;
    opponentDescription?: InputFieldConfig;
    talkingPoints?: InputFieldConfig;
    [key: string]: InputFieldConfig | undefined;
  };

  /** Form layout configuration (optional, for new accordion-based UI) */
  formLayout?: FormLayoutConfig;

  /** Assistant (Vapi) configuration */
  assistant: AssistantConfig;

  /** Analysis configuration */
  analysis: AnalysisConfig;
}

/**
 * Registry of all available scenarios.
 */
export type ScenarioRegistry = Record<string, ScenarioConfig>;
