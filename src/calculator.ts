/**
 * Tyrving 2014-tabell Calculator
 * Core calculation logic
 */

import type {
  EventDef,
  CalculationInput,
  CalculationOutput,
  CalculatorConfig,
} from "./types";
import { parseTimeToSeconds, truncateToTenth, parseFieldToCm } from "./parsers";
import { EVENTS } from "./events";

/**
 * Get the multiplier array for an event at a specific age.
 * Uses multByAge[age] if available, otherwise falls back to mult.
 */
function getMultipliers(event: EventDef, age: number): number[] {
  if (event.multByAge && event.multByAge[age]) {
    return event.multByAge[age];
  }
  return event.mult;
}

/**
 * Calculate points for a given event, age, and result
 */
export function calculatePoints(
  input: CalculationInput,
  config: CalculatorConfig = { allowNegativePoints: true }
): CalculationOutput {
  const { eventId, age, result, timing = "automatic" } = input;

  // Validate event
  const event = EVENTS[eventId];
  if (!event) {
    return {
      success: false,
      error: `Unknown event: ${eventId}`,
      code: "INVALID_EVENT",
    };
  }

  // Validate age range
  if (age < 10 || age > 19) {
    return {
      success: false,
      error: `Age must be between 10 and 19, got: ${age}`,
      code: "INVALID_AGE",
    };
  }

  // Check if age is supported for this event
  const p1000 = event.p1000ByAge[age];
  if (p1000 === undefined || p1000 === null) {
    return {
      success: false,
      error: `Event "${event.displayName}" is not supported for age ${age}`,
      code: "AGE_NOT_SUPPORTED",
    };
  }

  try {
    let points: number;
    let parsedResult: number;
    let unit: string;

    if (event.kind === "time") {
      // Time-based event
      parsedResult = parseTimeToSeconds(result);
      unit = "seconds";

      // Apply manual timing adjustment
      if (timing === "manual" && event.manualAddSeconds) {
        parsedResult += event.manualAddSeconds;
      }

      // Truncate hundredths for longer distances (timeStep = 0.1)
      if (event.timeStep === 0.1) {
        parsedResult = truncateToTenth(parsedResult);
      }

      points = calculateTimePoints(event, age, parsedResult);
    } else {
      // Field event (cm-based)
      parsedResult = parseFieldToCm(result);
      unit = "cm";

      if (event.multType === "threeInterval") {
        points = calculateThreeIntervalPoints(event, age, parsedResult);
      } else {
        points = calculateFieldPoints(event, age, parsedResult);
      }
    }

    // Apply floor at the end
    const rawPoints = points;
    points = Math.floor(points);

    // Optionally clamp to 0
    if (!config.allowNegativePoints && points < 0) {
      points = 0;
    }

    return {
      success: true,
      points,
      rawPoints,
      eventName: event.displayName,
      gender: event.gender,
      age,
      parsedResult,
      unit,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      code: "INVALID_RESULT",
    };
  }
}

/**
 * Calculate points for time-based events (single multiplier)
 * Lower time = better (lowerIsBetter)
 */
function calculateTimePoints(event: EventDef, age: number, seconds: number): number {
  const ref = event.p1000ByAge[age];
  const timeStep = event.timeStep ?? 0.01;
  const mult = getMultipliers(event, age)[0];

  // deltaSteps = (actual - reference) / step
  // points = 1000 - deltaSteps * multiplier
  const deltaSteps = (seconds - ref) / timeStep;
  return 1000 - deltaSteps * mult;
}

/**
 * Calculate points for field events with single multiplier
 * Higher distance = better (higherIsBetter)
 */
function calculateFieldPoints(event: EventDef, age: number, cm: number): number {
  const ref = event.p1000ByAge[age];
  const mult = getMultipliers(event, age)[0];

  // deltaCm = actual - reference
  // points = 1000 + deltaCm * multiplier
  const deltaCm = cm - ref;
  return 1000 + deltaCm * mult;
}

/**
 * Calculate points for three-interval field events (throws, pole vault)
 * Uses different multipliers for:
 * - Over 1000 points: mult[0]
 * - Between 1000 and 80%: mult[1]
 * - Below 80%: mult[2]
 */
function calculateThreeIntervalPoints(event: EventDef, age: number, cm: number): number {
  const P1000 = event.p1000ByAge[age];
  const mults = getMultipliers(event, age);
  const m1 = mults[0]; // Over 1000
  const m2 = mults[1]; // 1000 to 80%
  const m3 = mults[2]; // Below 80%

  // P80: threshold for 80% - either from table or calculated
  const P80 = event.p80ByAge?.[age] ?? P1000 * 0.8;

  // Points at 80% threshold
  const pts80 = 1000 - (P1000 - P80) * m2;

  if (cm >= P1000) {
    // Over 1000 points
    return 1000 + (cm - P1000) * m1;
  } else if (cm >= P80) {
    // Between 1000 and 80%
    return 1000 - (P1000 - cm) * m2;
  } else {
    // Below 80%
    return pts80 - (P80 - cm) * m3;
  }
}

/**
 * Get all available events
 */
export function getAvailableEvents(): EventDef[] {
  return Object.values(EVENTS);
}

/**
 * Get event by ID
 */
export function getEvent(eventId: string): EventDef | undefined {
  return EVENTS[eventId];
}

/**
 * Get supported ages for an event
 */
export function getSupportedAges(eventId: string): number[] {
  const event = EVENTS[eventId];
  if (!event) return [];

  return Object.entries(event.p1000ByAge)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([age]) => parseInt(age, 10))
    .sort((a, b) => a - b);
}

/**
 * Batch calculate points for multiple inputs
 */
export function calculatePointsBatch(
  inputs: CalculationInput[],
  config?: CalculatorConfig
): CalculationOutput[] {
  return inputs.map((input) => calculatePoints(input, config));
}

/**
 * Find events by display name and optionally gender
 */
export function findEvents(
  displayName: string,
  gender?: "gutter" | "jenter"
): EventDef[] {
  const normalizedName = displayName.toLowerCase();
  return Object.values(EVENTS).filter((e) => {
    const nameMatch = e.displayName.toLowerCase().includes(normalizedName);
    const genderMatch = !gender || e.gender === gender;
    return nameMatch && genderMatch;
  });
}

/**
 * Get events available for a specific age and gender
 */
export function getEventsForAgeAndGender(
  age: number,
  gender: "gutter" | "jenter"
): EventDef[] {
  return Object.values(EVENTS).filter((e) => {
    return e.gender === gender && e.p1000ByAge[age] !== undefined;
  });
}
