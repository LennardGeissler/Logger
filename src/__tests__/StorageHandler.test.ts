import { StorageHandler } from '../handlers/StorageHandler';
import { LogMessage } from '../types/LogMessage';

describe('StorageHandler', () => {
    let handler: StorageHandler;
    let mockStorage: { [key: string]: string };

    beforeEach(() => {
        mockStorage = {};
        global.localStorage = {
            getItem: (key: string) => mockStorage[key] || null,
            setItem: (key: string, value: string) => { mockStorage[key] = value },
            removeItem: (key: string) => delete mockStorage[key],
            clear: () => { mockStorage = {} },
            length: 0,
            key: (index: number) => ''
        };

        handler = new StorageHandler(false, 'test-logs');
    });

    it('should store log messages in localStorage', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message'
        };

        handler.handle(log);

        const stored = JSON.parse(mockStorage['test-logs']);
        expect(stored).toHaveLength(1);
        expect(stored[0]).toContain('test message');
    });

    it('should append to existing logs', () => {
        const log1: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'first message'
        };

        const log2: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'second message'
        };

        handler.handle(log1);
        handler.handle(log2);

        const stored = JSON.parse(mockStorage['test-logs']);
        expect(stored).toHaveLength(2);
    });
});