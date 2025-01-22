import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";

export class StorageHandler extends BaseHandler {
    private storage: Storage;
    private key: string;

    constructor(useSessionStorage: boolean = false, key: string = "logs") {
        super();
        this.storage = useSessionStorage ? sessionStorage : localStorage;
        this.key = key;
    }

    handle(log: LogMessage): void {
        const existingLogs = this.storage.getItem(this.key);
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(this.formatter.format(log));
        this.storage.setItem(this.key, JSON.stringify(logs));
    }
}