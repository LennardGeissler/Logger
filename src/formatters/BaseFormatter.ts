import { LogMessage } from "../types/LogMessage";

/**
 * BaseFormatter is an abstract class that defines the structure for log message formatters.
 * Subclasses should implement the `format` method to specify how log messages are formatted.
 *
 * @abstract
 */
export abstract class BaseFormatter {
    /**
     * Formats a log message into a string.
     *
     * @abstract
     * @param {LogMessage} log - The log message to format.
     * @returns {string} The formatted log message as a string.
     */
    abstract format(log: LogMessage): string;
}