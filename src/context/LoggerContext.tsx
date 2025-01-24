import { createContext } from 'react';
import { Logger } from '../core/Logger';

/**
 * A React context for providing a Logger instance to components within the application.
 * It allows child components to access and use a shared Logger instance for logging purposes.
 *
 * @type {React.Context<Logger | null>}
 * @defaultValue null - The default value is `null`, indicating that no Logger instance is provided by default.
 */
export const LoggerContext: React.Context<Logger | null> = createContext<Logger | null>(null);