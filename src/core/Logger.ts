import { LogLevel } from "../types/LogLevel";
import { LogMessage } from "../types/LogMessage";
import { getTimestamp } from "../utils/getTimestamp";
import { BaseHandler } from "../handlers/BaseHandler";

/**
 * A singleton class for managing application logging.
 * It supports multiple log levels, custom handlers, and centralized logging configuration.
 */
export class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = "info";
    private handlers: BaseHandler[] = [];

    /**
     * Private constructor to prevent direct instantiation.
     * Use `Logger.getInstance()` to obtain the singleton instance.
     * @private
     */
    private constructor() { }

    /**
     * Retrieves the singleton instance of the Logger.
     *
     * @returns {Logger} The singleton Logger instance.
     */
    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Adds a handler to the Logger.
     *
     * @param {BaseHandler} handler - The handler to add.
     * @returns {void}
     */
    addHandler(handler: BaseHandler): void {
        this.handlers.push(handler);
    }

    /**
     * Removes a handler from the Logger.
     *
     * @param {BaseHandler} handler - The handler to remove.
     * @returns {void}
     */
    removeHandler(handler: BaseHandler): void {
        const index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    /**
     * Clears all handlers from the Logger.
     *
     * @returns {void}
     */
    clearHandlers(): void {
        this.handlers = [];
    }

    /**
     * Sets the log level of the Logger. Messages below this level are ignored.
     *
     * @param {LogLevel} level - The log level to set.
     * @returns {void}
     */
    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    /**
     * Determines whether a message at the specified log level should be logged.
     *
     * @private
     * @param {LogLevel} level - The log level of the message.
     * @returns {boolean} `true` if the message should be logged; otherwise, `false`.
     */
    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ["debug", "info", "warn", "error", "fatal"];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    /**
     * Creates a structured log message object.
     *
     * @private
     * @param {LogLevel} level - The log level of the message.
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {LogMessage} A structured log message object.
     */
    private createLogMessage(level: LogLevel, message: string, context?: Record<string, any> | null): LogMessage {
        return {
            timestamp: getTimestamp(),
            level,
            message,
            context
        };
    }

    /**
     * Logs a message at the specified level, dispatching it to the registered handlers.
     *
     * @private
     * @param {LogLevel} level - The log level of the message.
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    private log(level: LogLevel, message: string, context?: Record<string, any> | null): void {
        if (!this.shouldLog(level)) return;

        const logMessage = this.createLogMessage(level, message, context);

        // If no handlers are registered, use console as fallback
        if (this.handlers.length === 0) {
            console.warn('No handlers registered for logger, using console as fallback');
            console.log(`${logMessage.timestamp} [${level.toUpperCase()}]: ${message}`);
            if (context) console.log('Context:', context);
            return;
        }

        // Dispatch to all handlers
        this.handlers.forEach(handler => {
            try {
                handler.handle(logMessage);
            } catch (error) {
                console.error('Error in log handler:', error);
            }
        });
    }

    /**
     * Logs a debug message.
     *
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    debug(message: string, context?: Record<string, any> | null): void {
        this.log("debug", message, context);
    }

    /**
     * Logs an informational message.
     *
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    info(message: string, context?: Record<string, any> | null): void {
        this.log("info", message, context);
    }

    /**
     * Logs a warning message.
     *
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    warn(message: string, context?: Record<string, any> | null): void {
        this.log("warn", message, context);
    }

    /**
     * Logs an error message.
     *
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    error(message: string, context?: Record<string, any> | null): void {
        this.log("error", message, context);
    }

    /**
     * Logs a fatal error message.
     *
     * @param {string} message - The message to log.
     * @param {Record<string, any> | null} [context] - Additional context for the log message.
     * @returns {void}
     */
    fatal(message: string, context?: Record<string, any> | null): void {
        this.log("fatal", message, context);
    }
}