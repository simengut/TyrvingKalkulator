/**
 * Tyrving 2014-tabell Calculator Types
 */

export type Direction = "lowerIsBetter" | "higherIsBetter";
export type MultType = "single" | "threeInterval";
export type TimingType = "automatic" | "manual";
export type EventKind = "time" | "field_cm";
export type Gender = "gutter" | "jenter";

export interface EventDef {
  id: string;
  displayName: string;
  gender: Gender;
  direction: Direction;
  kind: EventKind;

  // Time-specific
  timeStep?: 0.01 | 0.1;
  manualAddSeconds?: number;

  multType: MultType;

  // Multipliers:
  // single: use mult[0]
  // threeInterval: [over1000, between1000and80, below80]
  mult: number[];

  // Age-specific multipliers (e.g., gutter_2000_m has different mult for age 19)
  // If present, use multByAge[age] instead of mult
  multByAge?: Record<number, number[]>;

  // Thresholds by age (10-19)
  // For time: p1000 is "1000 points time" in seconds
  // For field_cm: p1000 is "1000 points result" in cm
  p1000ByAge: Record<number, number>;

  // Only for threeInterval (throws/pole vault):
  // p80 threshold - from table or calculated as 0.8 * p1000
  p80ByAge?: Record<number, number>;

  // Optional sanity-check (can also be calculated)
  pointsAt80ByAge?: Record<number, number>;
}

export interface CalculationInput {
  eventId: string;
  age: number;
  result: string | number;
  timing?: TimingType;
}

export interface CalculationResult {
  success: true;
  points: number;
  rawPoints: number;
  eventName: string;
  gender: Gender;
  age: number;
  parsedResult: number;
  unit: string;
}

export interface CalculationError {
  success: false;
  error: string;
  code: "INVALID_EVENT" | "INVALID_AGE" | "INVALID_RESULT" | "AGE_NOT_SUPPORTED";
}

export type CalculationOutput = CalculationResult | CalculationError;

// Configuration
export interface CalculatorConfig {
  allowNegativePoints: boolean;
}

export const DEFAULT_CONFIG: CalculatorConfig = {
  allowNegativePoints: true,
};
