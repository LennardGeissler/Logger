import React, { ReactNode } from 'react';
import { Logger } from '../core/Logger';
import { LoggerContext } from '../context/LoggerContext';
import { ConsoleHandler } from '../handlers/ConsoleHandler';

interface LoggerProviderProps {
    children: ReactNode;
    logger?: Logger;
    handlers?: Array<any>;
}

export function LoggerProvider({
    children,
    logger = Logger.getInstance(),
    handlers = [new ConsoleHandler()]
}: LoggerProviderProps) {
    // Initialize logger with handlers if provided
    React.useEffect(() => {
        logger.clearHandlers();
        handlers.forEach(handler => logger.addHandler(handler));
    }, [logger, handlers]);

    return (
        <LoggerContext.Provider value={logger}>
            {children}
        </LoggerContext.Provider>
    );
}