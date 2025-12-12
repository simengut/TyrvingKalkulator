/**
 * Tyrving 2014-tabell Calculator
 *
 * A fast, client-side calculator for Norwegian athletics youth points.
 * Supports 125 event variants for ages 10-19, both gutter (boys) and jenter (girls).
 *
 * @example
 * import { calculatePoints, findEvents } from 'tyrving-calculator';
 *
 * // Find the event ID
 * const events = findEvents('100 m', 'gutter');
 * console.log(events[0].id); // 'gutter_100_m'
 *
 * // Calculate points
 * const result = calculatePoints({
 *   eventId: 'gutter_100_m',
 *   age: 15,
 *   result: '12.35',    // or '12,35' Norwegian format
 *   timing: 'automatic' // or 'manual'
 * });
 *
 * if (result.success) {
 *   console.log(`Points: ${result.points}`);
 * } else {
 *   console.error(result.error);
 * }
 */

// Types
export type {
  Direction,
  MultType,
  TimingType,
  EventKind,
  Gender,
  EventDef,
  CalculationInput,
  CalculationResult,
  CalculationError,
  CalculationOutput,
  CalculatorConfig,
} from "./types";

export { DEFAULT_CONFIG } from "./types";

// Parsers
export {
  parseTimeToSeconds,
  truncateToTenth,
  parseFieldToCm,
  formatTime,
  formatCmToMeters,
} from "./parsers";

// Calculator
export {
  calculatePoints,
  calculatePointsBatch,
  getAvailableEvents,
  getEvent,
  getSupportedAges,
  findEvents,
  getEventsForAgeAndGender,
} from "./calculator";

// Events data
export { EVENTS, getEventsByGender, getUniqueEventNames } from "./events";
