/**
 * Get the current timestamp in ISO format.
 * @returns {string} The current timestamp in ISO format.
 */
export function getTimestamp(): string {
    return new Date().toISOString();
}