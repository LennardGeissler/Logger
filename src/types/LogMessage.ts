import { LogLevel } from "./LogLevel";

/**
 * An interface representing a log message.
 * @interface
 * @property {string} timestamp - The timestamp of the log message.
 * @property {LogLevel} level - The log level of the message.
 * @property {string} message - The log message.
 * @property {Record<string, any> | null} context - Optional context data for the log message.
 */
export interface LogMessage {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, any> | null;
}