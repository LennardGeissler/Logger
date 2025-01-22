import { JsonFormatter } from '../formatters/JsonFormatter';
import { LogMessage } from '../types/LogMessage';

describe('JsonFormatter', () => {
    let formatter: JsonFormatter;

    beforeEach(() => {
        formatter = new JsonFormatter();
    });

    it('should format log message as JSON', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message',
            context: { key: 'value' }
        };

        const formatted = formatter.format(log);
        const parsed = JSON.parse(formatted);

        expect(parsed).toEqual({
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message',
            context: { key: 'value' }
        });
    });

    it('should handle missing context', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message'
        };

        const formatted = formatter.format(log);
        const parsed = JSON.parse(formatted);

        expect(parsed.context).toEqual({});
    });
});