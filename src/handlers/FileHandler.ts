import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";
import fs from "fs";
import path from "path";

export class FileHandler extends BaseHandler {
    private filePath: string;

    constructor(filePath: string = "logs.txt") {
        super();
        this.filePath = path.resolve(filePath);
    }

    handle(log: LogMessage): void {
        const formattedLog = this.formatter.format(log) + '\n';
        fs.appendFileSync(this.filePath, formattedLog, "utf-8");
    }
}