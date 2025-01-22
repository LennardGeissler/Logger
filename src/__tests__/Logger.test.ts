import { Logger } from '../core/Logger';
import { BaseHandler } from '../handlers/BaseHandler';
import { LogMessage } from '../types/LogMessage';
import { BaseFormatter } from '../formatters/BaseFormatter';

// Mock handler for testing
class MockHandler extends BaseHandler {
    public logs: LogMessage[] = [];

    constructor() {
        super(new MockFormatter());
    }

    handle(log: LogMessage): void {
        this.logs.push({ ...log }); // Create a copy of the log
    }

    clear(): void {
        this.logs = [];
    }
}

// Mock formatter for testing
class MockFormatter extends BaseFormatter {
    format(log: LogMessage): string {
        return `${log.timestamp} [${log.level}] ${log.message}`;
    }
}

describe('Logger', () => {
    let logger: Logger;
    let mockHandler: MockHandler;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        // Reset the Logger instance
        (Logger as any).instance = undefined;

        logger = Logger.getInstance();
        mockHandler = new MockHandler();

        // Clear and add handler
        logger.clearHandlers();
        logger.addHandler(mockHandler);

        // Reset log level
        logger.setLogLevel('debug');

        // Clear mock handler logs
        mockHandler.clear();

        // Setup console spies
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    it('should be a singleton', () => {
        const logger1 = Logger.getInstance();
        const logger2 = Logger.getInstance();
        expect(logger1).toBe(logger2);
    });

    it('should respect log levels', () => {
        logger.setLogLevel('warn');

        logger.debug('debug message');
        logger.info('info message');
        logger.warn('warn message');
        logger.error('error message');

        expect(mockHandler.logs).toHaveLength(2);
        expect(mockHandler.logs[0].level).toBe('warn');
        expect(mockHandler.logs[1].level).toBe('error');
    });

    it('should include context in log messages', () => {
        const context = { userId: 123 };
        logger.info('test message', context);

        expect(mockHandler.logs).toHaveLength(1);
        expect(mockHandler.logs[0]).toBeDefined();
        expect(mockHandler.logs[0].message).toBe('test message');
        expect(mockHandler.logs[0].context).toEqual(context);
    });

    it('should handle multiple handlers', () => {
        const secondMockHandler = new MockHandler();
        logger.addHandler(secondMockHandler);

        logger.info('test message');

        expect(mockHandler.logs).toHaveLength(1);
        expect(secondMockHandler.logs).toHaveLength(1);
    });

    it('should remove handlers correctly and use console fallback', () => {
        logger.removeHandler(mockHandler);
        logger.info('test message');

        expect(mockHandler.logs).toHaveLength(0);
        expect(consoleWarnSpy).toHaveBeenCalledWith('No handlers registered for logger, using console as fallback');
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO]: test message'));
    });

    it('should not use console fallback when handlers exist', () => {
        logger.info('test message');

        expect(consoleWarnSpy).not.toHaveBeenCalled();
        expect(mockHandler.logs).toHaveLength(1);
    });

    it('should include timestamp in log messages', () => {
        logger.info('test message');

        expect(mockHandler.logs).toHaveLength(1);
        expect(mockHandler.logs[0].timestamp).toBeDefined();
        const timestamp = new Date(mockHandler.logs[0].timestamp).getTime();
        expect(timestamp).not.toBeNaN();
    });

    // Add more test cases
    it('should handle undefined context', () => {
        logger.info('test message');
        expect(mockHandler.logs[0].context).toBeUndefined();
    });

    it('should handle null context', () => {
        logger.info('test message', null);
        expect(mockHandler.logs[0].context).toBeNull();
    });

    it('should handle empty context', () => {
        logger.info('test message', {});
        expect(mockHandler.logs[0].context).toEqual({});
    });
});