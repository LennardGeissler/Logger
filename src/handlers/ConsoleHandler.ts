import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";
import { getLogLevelColor } from "../utils/getLogLevelColor";

/**
 * A concrete implementation of the BaseHandler class.
 * It logs log messages to the console with color-coded levels.
 */
export class ConsoleHandler extends BaseHandler {
    /**
     * Handles a log message by logging it to the console with color-coded levels.
     *
     * @param {LogMessage} log - The log message to handle.
     * @returns {void}
     */
    handle(log: LogMessage): void {
        const formattedLog = this.formatter.format(log);

        if (typeof window !== 'undefined') {
            // Browser environment
            console.log(
                `%c${formattedLog}`,
                getLogLevelColor(log.level)
            );
        } else {
            // Node.js environment
            console.log(formattedLog);
        }
    }
}