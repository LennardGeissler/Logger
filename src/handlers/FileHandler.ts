import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";
import fs from "fs";
import path from "path";

/**
 * A concrete implementation of the BaseHandler class.
 * It logs log messages to a file.
 */
export class FileHandler extends BaseHandler {
    private filePath: string;

    /**
     * Constructs a FileHandler with a specified file path.
     *
     * @param {string} [filePath] - The path to the log file.
     * @default "logs.txt" - The default file path.
     */
    constructor(filePath: string = "logs.txt") {
        super();
        this.filePath = path.resolve(filePath);
    }

    /**
     * Handles a log message by appending it to the file.
     *
     * @param {LogMessage} log - The log message to handle.
     * @returns {void}
     */
    handle(log: LogMessage): void {
        const formattedLog = this.formatter.format(log) + '\n';
        fs.appendFileSync(this.filePath, formattedLog, "utf-8");
    }
}