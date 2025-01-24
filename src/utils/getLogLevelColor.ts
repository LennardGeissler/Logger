import { LogLevel } from "../types/LogLevel";

/**
 * Get the color for a log level.
 * @param {LogLevel} level - The log level.
 * @returns {string} The color for the log level.
 */
export function getLogLevelColor(level: LogLevel): string {
    switch (level) {
        case "debug":
            return "color: gray;";
        case "info":
            return "color: blue;";
        case "warn":
            return "color: orange;";
        case "error":
            return "color: red;";
        case "fatal":
            return "color: darkred; font-weight: bold;";
        default:
            return "color: black;";
    }
}