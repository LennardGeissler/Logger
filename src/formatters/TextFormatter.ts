import { BaseFormatter } from "./BaseFormatter";
import { LogMessage } from "../types/LogMessage";

/**
 * A concrete implementation of the BaseFormatter class.
 * It formats log messages into a customizable plain text format.
 */
export class TextFormatter extends BaseFormatter {
    private template: string;

    /**
     * Constructs a TextFormatter with a customizable template.
     *
     * @param {string} [template] - The template string for formatting log messages.
     * @default '[{timestamp}] [{level}] {message} {context}' - The default template.
     */
    constructor(template: string = '[{timestamp}] [{level}] {message} {context}') {
        super();
        this.template = template;
    }

    /**
     * Formats a log message into a string using the configured template.
     *
     * @param {LogMessage} log - The log message to format.
     * @returns {string} The formatted log message as a string.
     */
    format(log: LogMessage): string {
        return this.template
            .replace('{timestamp}', log.timestamp)
            .replace('{level}', log.level.toUpperCase())
            .replace('{message}', log.message)
            .replace('{context}', log.context ? JSON.stringify(log.context) : '');
    }
}