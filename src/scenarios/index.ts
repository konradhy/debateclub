/**
 * Scenario System Registry
 *
 * Central registry of all available scenarios.
 * Import from here to get scenario configurations.
 */

import { DebateScenario } from "./debate";
import {
  SalesScenarios,
  ColdProspectScenario,
  DemoFollowupScenario,
} from "./sales";
import { EntrepreneurScenarios, InvestorPitchScenario } from "./entrepreneur";
import type {
  ScenarioConfig,
  PipelineConfig,
  AnalysisConfig,
  VoiceConfig,
  InputFieldConfig,
  ScoreCategory,
} from "./types";

/**
 * Registry of all available scenarios.
 * Key is the scenario ID, value is the full config.
 */
export const SCENARIOS: Record<string, ScenarioConfig> = {
  debate: DebateScenario,
  "sales-cold-prospect": ColdProspectScenario,
  "sales-demo-followup": DemoFollowupScenario,
  "entrepreneur-pitch": InvestorPitchScenario,
};

/**
 * Default scenario ID when none is selected.
 */
export const DEFAULT_SCENARIO_ID = "debate";

/**
 * Get all scenarios grouped by category.
 */
export function getScenariosByCategory(): Record<string, ScenarioConfig[]> {
  const grouped: Record<string, ScenarioConfig[]> = {};

  for (const scenario of Object.values(SCENARIOS)) {
    const category = scenario.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(scenario);
  }

  return grouped;
}

/**
 * Get a scenario by ID.
 */
export function getScenario(id: string): ScenarioConfig | undefined {
  return SCENARIOS[id];
}

/**
 * Get list of scenario options for UI dropdowns.
 */
export function getScenarioOptions(): Array<{ value: string; label: string }> {
  return Object.values(SCENARIOS).map((scenario) => ({
    value: scenario.id,
    label: scenario.name,
  }));
}

// Re-export types
export type {
  ScenarioConfig,
  PipelineConfig,
  AnalysisConfig,
  VoiceConfig,
  InputFieldConfig,
  ScoreCategory,
};

// Re-export individual scenarios for direct import
export { DebateScenario } from "./debate";
export {
  SalesScenarios,
  ColdProspectScenario,
  DemoFollowupScenario,
} from "./sales";
export { EntrepreneurScenarios, InvestorPitchScenario } from "./entrepreneur";
