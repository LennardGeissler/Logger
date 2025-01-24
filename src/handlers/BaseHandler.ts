import { LogMessage } from "../types/LogMessage";
import { BaseFormatter } from "../formatters/BaseFormatter";
import { TextFormatter } from "../formatters/TextFormatter";

/**
 * An abstract class that defines the structure for log handlers.
 * Log handlers are responsible for processing log messages, such as sending them
 * to a destination (e.g., console, file, or remote server).
 */
export abstract class BaseHandler {
    protected formatter: BaseFormatter;

    /**
     * Constructs a BaseHandler with an optional formatter.
     *
     * @param {BaseFormatter} [formatter] - The formatter to use for this handler.
     * @default new TextFormatter() - The default formatter.
     */
    constructor(formatter?: BaseFormatter) {
        this.formatter = formatter || new TextFormatter();
    }

    /**
     * Sets the formatter for this handler.
     *
     * @param {BaseFormatter} formatter - The formatter to use for this handler.
     * @returns {void}
     */
    setFormatter(formatter: BaseFormatter): void {
        this.formatter = formatter;
    }

    /**
     * Handles a log message. This method must be implemented by subclasses
     * to define the specific behavior of the handler.
     *
     * @abstract
     * @param {LogMessage} log - The log message to handle.
     * @returns {void}
     */
    abstract handle(log: LogMessage): void;
}