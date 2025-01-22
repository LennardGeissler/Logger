import { FileHandler } from '../handlers/FileHandler';
import { LogMessage } from '../types/LogMessage';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('FileHandler', () => {
    let handler: FileHandler;
    const testLogPath = 'test.log';

    beforeEach(() => {
        handler = new FileHandler(testLogPath);
        (fs.appendFileSync as jest.Mock).mockClear();
    });

    it('should write log message to file', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message'
        };

        handler.handle(log);

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            path.resolve(testLogPath),
            expect.any(String),
            'utf-8'
        );
    });

    it('should append newline to log message', () => {
        const log: LogMessage = {
            timestamp: '2024-01-01T00:00:00.000Z',
            level: 'info',
            message: 'test message'
        };

        handler.handle(log);

        const calledWith = (fs.appendFileSync as jest.Mock).mock.calls[0][1];
        expect(calledWith.endsWith('\n')).toBeTruthy();
    });
});