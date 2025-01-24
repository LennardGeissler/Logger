import { BaseFormatter } from "./BaseFormatter";
import { LogMessage } from "../types/LogMessage";

/**
 * A concrete implementation of the BaseFormatter class.
 * It formats log messages as JSON strings for structured logging.
 */
export class JsonFormatter extends BaseFormatter {
    /**
     * Formats a log message into a JSON string.
     *
     * @param {LogMessage} log - The log message to format.
     * @returns {string} The formatted log message as a JSON string.
     */
    format(log: LogMessage): string {
        return JSON.stringify({
            timestamp: log.timestamp,
            level: log.level,
            message: log.message,
            context: log.context || {}
        });
    }
}