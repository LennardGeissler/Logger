import React, { JSX, ReactNode } from 'react';
import { Logger } from '../core/Logger';
import { LoggerContext } from '../context/LoggerContext';
import { ConsoleHandler } from '../handlers/ConsoleHandler';

interface LoggerProviderProps {
    children: ReactNode;
    logger?: Logger;
    handlers?: Array<any>;
}

/**
 * A React component that provides a logging context to its child components.
 * It initializes a logger instance and configures it with specified handlers.
 *
 * @param {LoggerProviderProps} props - The props for the LoggerProvider component.
 * @param {ReactNode} props.children - The child components that will have access to the logger context.
 * @param {Logger} [props.logger] - An optional custom logger instance. If not provided, the default singleton Logger is used.
 * @param {Array<any>} [props.handlers] - An optional array of handlers to configure the logger. Defaults to a single ConsoleHandler.
 *
 * @returns {JSX.Element} A context provider wrapping the child components.
 */
export function LoggerProvider({
    children,
    logger = Logger.getInstance(),
    handlers = [new ConsoleHandler()]
}: LoggerProviderProps): JSX.Element {
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