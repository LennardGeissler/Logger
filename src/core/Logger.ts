import { LogLevel } from "../types/LogLevel";
import { LogMessage } from "../types/LogMessage";
import { getTimestamp } from "../utils/getTimestamp";
import { BaseHandler } from "../handlers/BaseHandler";

export class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = "info";
    private handlers: BaseHandler[] = [];

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    addHandler(handler: BaseHandler): void {
        this.handlers.push(handler);
    }

    removeHandler(handler: BaseHandler): void {
        const index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    clearHandlers(): void {
        this.handlers = [];
    }

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ["debug", "info", "warn", "error", "fatal"];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    private createLogMessage(level: LogLevel, message: string, context?: Record<string, any> | null): LogMessage {
        return {
            timestamp: getTimestamp(),
            level,
            message,
            context
        };
    }

    private log(level: LogLevel, message: string, context?: Record<string, any> | null): void {
        if (!this.shouldLog(level)) return;

        const logMessage = this.createLogMessage(level, message, context);
        
        // If no handlers are registered, use console as fallback
        if (this.handlers.length === 0) {
            console.warn('No handlers registered for logger, using console as fallback');
            console.log(`${logMessage.timestamp} [${level.toUpperCase()}]: ${message}`);
            if (context) console.log('Context:', context);
            return;
        }

        // Dispatch to all handlers
        this.handlers.forEach(handler => {
            try {
                handler.handle(logMessage);
            } catch (error) {
                console.error('Error in log handler:', error);
            }
        });
    }

    debug(message: string, context?: Record<string, any> | null): void {
        this.log("debug", message, context);
    }

    info(message: string, context?: Record<string, any> | null): void {
        this.log("info", message, context);
    }

    warn(message: string, context?: Record<string, any> | null): void {
        this.log("warn", message, context);
    }

    error(message: string, context?: Record<string, any> | null): void {
        this.log("error", message, context);
    }

    fatal(message: string, context?: Record<string, any> | null): void {
        this.log("fatal", message, context);
    }
}