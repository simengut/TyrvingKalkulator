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
export function parseTimeToSeconds(input: string | number): number {
  if (typeof input === "number") {
    return input;
  }

  // Normalize: replace Norwegian comma with dot
  let normalized = input.trim().replace(",", ".");

  // Check for m:ss.hh format
  if (normalized.includes(":")) {
    const parts = normalized.split(":");
    if (parts.length !== 2) {
      throw new Error(`Invalid time format: ${input}. Expected ss.hh or m:ss.hh`);
    }
    const minutes = parseFloat(parts[0]);
    const seconds = parseFloat(parts[1]);
    if (isNaN(minutes) || isNaN(seconds)) {
      throw new Error(`Invalid time format: ${input}. Could not parse minutes or seconds`);
    }
    return minutes * 60 + seconds;
  }

  // Simple ss.hh format
  const seconds = parseFloat(normalized);
  if (isNaN(seconds)) {
    throw new Error(`Invalid time format: ${input}. Expected a number`);
  }
  return seconds;
}

/**
 * Truncate time to tenths (drop hundredths without rounding)
 * Used for distances > 500m where timeStep = 0.1
 */
export function truncateToTenth(seconds: number): number {
  return Math.floor(seconds * 10) / 10;
}

/**
 * Parse field result to centimeters
 * Supports:
 * - 4.55 (meters)
 * - 4,55 (Norwegian format)
 */
export function parseFieldToCm(input: string | number): number {
  if (typeof input === "number") {
    return input * 100;
  }

  // Normalize: replace Norwegian comma with dot
  const normalized = input.trim().replace(",", ".");
  const meters = parseFloat(normalized);

  if (isNaN(meters)) {
    throw new Error(`Invalid field result: ${input}. Expected meters (e.g., 4.55 or 4,55)`);
  }

  return meters * 100;
}

/**
 * Format seconds to display string
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(2);
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(2).padStart(5, "0")}`;
}

/**
 * Format centimeters to meters display string
 */
export function formatCmToMeters(cm: number): string {
  return (cm / 100).toFixed(2);
}
