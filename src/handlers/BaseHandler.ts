import { LogMessage } from "../types/LogMessage";
import { BaseFormatter } from "../formatters/BaseFormatter";
import { TextFormatter } from "../formatters/TextFormatter";

export abstract class BaseHandler {
    protected formatter: BaseFormatter;

    constructor(formatter?: BaseFormatter) {
        this.formatter = formatter || new TextFormatter();
    }

    setFormatter(formatter: BaseFormatter): void {
        this.formatter = formatter;
    }

    abstract handle(log: LogMessage): void;
}