import { LogLevel } from "../types/LogLevel";

export function getLogLevelColor(level: LogLevel): string {
    switch (level) {
        case "debug":
            return "color: gray;";
        case "info":
            return "color: blue;";
        case "warn":
            return "color: orange;";
        case "error":
            return "color: red;";
        case "fatal":
            return "color: darkred; font-weight: bold;";
        default:
            return "color: black;";
    }
}