import { TextFormatter } from '../formatters/TextFormatter';
import { LogMessage } from '../types/LogMessage';

describe('TextFormatter', () => {
    let formatter: TextFormatter;

    beforeEach(() => {
        formatter = new TextFormatter();
    });

    it('should format log message with default template', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message',
            context: { key: 'value' }
        };

        const formatted = formatter.format(log);
        expect(formatted).toContain('2024-01-01T00:00:00.000Z');
        expect(formatted).toContain('INFO');
        expect(formatted).toContain('test message');
        expect(formatted).toContain('{"key":"value"}');
    });

    it('should format log message with custom template', () => {
        formatter = new TextFormatter('{message} - {level}');
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'error',
            message: 'test message'
        };

        const formatted = formatter.format(log);
        expect(formatted).toBe('test message - ERROR');
    });

    it('should handle missing context', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message'
        };

        const formatted = formatter.format(log);
        expect(formatted).not.toContain('undefined');
    });
});