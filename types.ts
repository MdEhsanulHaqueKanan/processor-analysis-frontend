// types.ts (Final Corrected Version)

export type View = 'recommender' | 'analyzer';

/**
 * Defines the structure of a single processor object.
 * This is used by the Recommendation Engine's processor cards.
 * The property names (e.g., releaseYear) match the camelCase names
 * sent by the Flask API.
 */
export interface Processor {
  id: number;
  name: string;
  designer: string;
  releaseYear: number;
  cores: number;
  has5g: boolean;
  hasWifi6: boolean;
  benchmarkScore: number;
}

/**
 * Defines the structure of the filters used by the Recommendation Engine.
 * These are the values controlled by the sliders and dropdowns in the UI.
 */
export interface FilterCriteria {
  designer: string;
  releaseYearRange: [number, number];
  minCores: number;
  has5g: boolean | null;
  hasWifi6: boolean | null;
}

/**
 * THIS IS THE CORRECTED TYPE for the Processor Analyzer form.
 * It now has the exact fields that our Flask backend's prediction
 * model requires.
 */
export interface AnalysisInput {
  designer: string; // Corrected typo and added this field
  yearReleased: number;
  numCores: number;
  featureSize: number;
  hasPerformanceCores: boolean;
  has5g: boolean;
}

/**
 * Defines the structure of the result from the Processor Analyzer API call.
 * The wirelessCapabilities is an array of strings.
 */
export interface AnalysisResult {
  primaryFunction: string;
  wirelessCapabilities: string[];
}