import { useContext } from 'react';
import { LoggerContext } from '../context/LoggerContext';
import { Logger } from '../core/Logger';

/**
 * Custom hook to access the Logger instance from the LoggerContext.
 *
 * @returns {Logger} The Logger instance.
 * @throws {Error} If used outside of a LoggerProvider.
 */
export function useLogger(): Logger {
    const logger = useContext(LoggerContext);
    if (!logger) {
        throw new Error('useLogger must be used within a LoggerProvider');
    }
    return logger;
}