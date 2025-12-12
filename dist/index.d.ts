/**
 * Tyrving 2014-tabell Calculator Types
 */
type Direction = "lowerIsBetter" | "higherIsBetter";
type MultType = "single" | "threeInterval";
type TimingType = "automatic" | "manual";
type EventKind = "time" | "field_cm";
type Gender = "gutter" | "jenter";
interface EventDef {
    id: string;
    displayName: string;
    gender: Gender;
    direction: Direction;
    kind: EventKind;
    timeStep?: 0.01 | 0.1;
    manualAddSeconds?: number;
    multType: MultType;
    mult: number[];
    multByAge?: Record<number, number[]>;
    p1000ByAge: Record<number, number>;
    p80ByAge?: Record<number, number>;
    pointsAt80ByAge?: Record<number, number>;
}
interface CalculationInput {
    eventId: string;
    age: number;
    result: string | number;
    timing?: TimingType;
}
interface CalculationResult {
    success: true;
    points: number;
    rawPoints: number;
    eventName: string;
    gender: Gender;
    age: number;
    parsedResult: number;
    unit: string;
}
interface CalculationError {
    success: false;
    error: string;
    code: "INVALID_EVENT" | "INVALID_AGE" | "INVALID_RESULT" | "AGE_NOT_SUPPORTED";
}
type CalculationOutput = CalculationResult | CalculationError;
interface CalculatorConfig {
    allowNegativePoints: boolean;
}
declare const DEFAULT_CONFIG: CalculatorConfig;

/**
 * Input parsing and normalization functions
 */
/**
 * Parse time input to seconds
 * Supports:
 * - ss.hh (e.g., 12.35)
 * - m:ss.hh (e.g., 1:28.54)
 * - Norwegian comma: 12,35 -> converted to 12.35
 */
declare function parseTimeToSeconds(input: string | number): number;
/**
 * Truncate time to tenths (drop hundredths without rounding)
 * Used for distances > 500m where timeStep = 0.1
 */
declare function truncateToTenth(seconds: number): number;
/**
 * Parse field result to centimeters
 * Supports:
 * - 4.55 (meters)
 * - 4,55 (Norwegian format)
 */
declare function parseFieldToCm(input: string | number): number;
/**
 * Format seconds to display string
 */
declare function formatTime(seconds: number): string;
/**
 * Format centimeters to meters display string
 */
declare function formatCmToMeters(cm: number): string;

/**
 * Tyrving 2014-tabell Calculator
 * Core calculation logic
 */

/**
 * Calculate points for a given event, age, and result
 */
declare function calculatePoints(input: CalculationInput, config?: CalculatorConfig): CalculationOutput;
/**
 * Get all available events
 */
declare function getAvailableEvents(): EventDef[];
/**
 * Get event by ID
 */
declare function getEvent(eventId: string): EventDef | undefined;
/**
 * Get supported ages for an event
 */
declare function getSupportedAges(eventId: string): number[];
/**
 * Batch calculate points for multiple inputs
 */
declare function calculatePointsBatch(inputs: CalculationInput[], config?: CalculatorConfig): CalculationOutput[];
/**
 * Find events by display name and optionally gender
 */
declare function findEvents(displayName: string, gender?: "gutter" | "jenter"): EventDef[];
/**
 * Get events available for a specific age and gender
 */
declare function getEventsForAgeAndGender(age: number, gender: "gutter" | "jenter"): EventDef[];

/**
 * Tyrving 2014-tabell Event Definitions
 * Auto-generated from poengtabell-tyrvingtabellen.xls
 */

declare const EVENTS: Record<string, EventDef>;
/**
 * Get events filtered by gender
 */
declare function getEventsByGender(gender: "gutter" | "jenter"): EventDef[];
/**
 * Get all unique event display names (without gender prefix)
 */
declare function getUniqueEventNames(): string[];

export { type CalculationError, type CalculationInput, type CalculationOutput, type CalculationResult, type CalculatorConfig, DEFAULT_CONFIG, type Direction, EVENTS, type EventDef, type EventKind, type Gender, type MultType, type TimingType, calculatePoints, calculatePointsBatch, findEvents, formatCmToMeters, formatTime, getAvailableEvents, getEvent, getEventsByGender, getEventsForAgeAndGender, getSupportedAges, getUniqueEventNames, parseFieldToCm, parseTimeToSeconds, truncateToTenth };
