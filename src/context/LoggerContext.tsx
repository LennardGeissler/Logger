import { createContext } from 'react';
import { Logger } from '../core/Logger';

export const LoggerContext = createContext<Logger | null>(null);