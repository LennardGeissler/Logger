import { LogMessage } from "../types/LogMessage";

export abstract class BaseFormatter {
    abstract format(log: LogMessage): string;
}