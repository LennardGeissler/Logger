import { BaseFormatter } from "./BaseFormatter";
import { LogMessage } from "../types/LogMessage";

export class TextFormatter extends BaseFormatter {
    private template: string;

    constructor(template: string = '[{timestamp}] [{level}] {message} {context}') {
        super();
        this.template = template;
    }

    format(log: LogMessage): string {
        return this.template
            .replace('{timestamp}', log.timestamp)
            .replace('{level}', log.level.toUpperCase())
            .replace('{message}', log.message)
            .replace('{context}', log.context ? JSON.stringify(log.context) : '');
    }
}