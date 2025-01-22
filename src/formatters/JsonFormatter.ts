import { BaseFormatter } from "./BaseFormatter";
import { LogMessage } from "../types/LogMessage";

export class JsonFormatter extends BaseFormatter {
    format(log: LogMessage): string {
        return JSON.stringify({
            timestamp: log.timestamp,
            level: log.level,
            message: log.message,
            context: log.context || {}
        });
    }
}