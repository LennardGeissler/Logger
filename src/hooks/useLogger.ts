import { useContext } from 'react';
import { LoggerContext } from '../context/LoggerContext';

export function useLogger() {
    const logger = useContext(LoggerContext);
    if (!logger) {
        throw new Error('useLogger must be used within a LoggerProvider');
    }
    return logger;
}