import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";
import { getLogLevelColor } from "../utils/getLogLevelColor";

export class ConsoleHandler extends BaseHandler {
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