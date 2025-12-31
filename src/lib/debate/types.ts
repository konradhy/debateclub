/**
 * Debate-specific type definitions
 */

/**
 * Debate style options that determine AI opponent personality and approach
 */
export type DebateStyle =
  | "friendly"
  | "aggressive"
  | "academic"
  | "emotional"
  | "socratic"
  | "gish gallop";

/**
 * Difficulty levels that control argument sophistication
 */
export type DifficultyLevel = "easy" | "medium" | "hard";
