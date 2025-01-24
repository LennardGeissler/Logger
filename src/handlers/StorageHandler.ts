import { BaseHandler } from "./BaseHandler";
import { LogMessage } from "../types/LogMessage";

/**
 * A concrete implementation of the BaseHandler class.
 * It logs log messages to a storage (localStorage or sessionStorage).
 */
export class StorageHandler extends BaseHandler {
    private storage: Storage;
    private key: string;

    /**
     * Constructs a StorageHandler with a specified storage type and key.
     *
     * @param {boolean} useSessionStorage - Whether to use sessionStorage or localStorage.
     * @param {string} key - The key to use for storing log messages.
     * @default false - Use localStorage.
     * @default "logs" - The default key for storing log messages.
     */
    constructor(useSessionStorage: boolean = false, key: string = "logs") {
        super();
        this.storage = useSessionStorage ? sessionStorage : localStorage;
        this.key = key;
    }

    /**
     * Handles a log message by appending it to the storage.
     *
     * @param {LogMessage} log - The log message to handle.
     * @returns {void}
     */
    handle(log: LogMessage): void {
        const existingLogs = this.storage.getItem(this.key);
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(this.formatter.format(log));
        this.storage.setItem(this.key, JSON.stringify(logs));
    }
}