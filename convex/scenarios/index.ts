/**
 * Scenario Registry
 *
 * Central registry of all available practice scenarios.
 * Import this to get scenario configs by ID.
 */

import { ScenarioConfig, ScenarioRegistry } from "./types";
import { DebateScenario } from "./debate";
import { SalesScenarios } from "./sales";
import { EntrepreneurScenarios } from "./entrepreneur";

/**
 * All available scenarios indexed by ID.
 *
 * To add a new scenario:
 * 1. Create config in appropriate file (or new file for new category)
 * 2. Add entry here
 */
export const SCENARIOS: ScenarioRegistry = {
  // Debate
  debate: DebateScenario,

  // Sales variations
  "sales-cold-prospect": SalesScenarios["cold-prospect"],
  "sales-demo-followup": SalesScenarios["demo-followup"],

  // Entrepreneur variations
  "entrepreneur-pitch": EntrepreneurScenarios["pitch"],
};

/**
 * Get scenario by ID. Returns undefined if not found.
 */
export function getScenario(id: string): ScenarioConfig | undefined {
  return SCENARIOS[id];
}

/**
 * Get all scenarios as array for UI dropdowns.
 */
export function getAllScenarios(): ScenarioConfig[] {
  return Object.values(SCENARIOS);
}

/**
 * Get scenarios grouped by category for organized display.
 */
export function getScenariosByCategory(): Record<string, ScenarioConfig[]> {
  const grouped: Record<string, ScenarioConfig[]> = {};

  for (const scenario of Object.values(SCENARIOS)) {
    if (!grouped[scenario.category]) {
      grouped[scenario.category] = [];
    }
    grouped[scenario.category].push(scenario);
  }

  return grouped;
}

/**
 * Default scenario ID for new opponents.
 */
export const DEFAULT_SCENARIO_ID = "debate";

// Re-export types
export type { ScenarioConfig, ScenarioRegistry } from "./types";
