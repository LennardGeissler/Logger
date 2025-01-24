# @lennardgeissler/logger

A flexible, extensible TypeScript logging library that works in both browser and Node.js environments. Supports multiple handlers, formatters, and log levels.

## 🚀 Features

- 🌟 Works in both browser and Node.js environments
- 🎨 Customizable formatters (Text, JSON)
- 📝 Multiple handlers (Console, File, Storage)
- 🔍 Log levels (debug, info, warn, error, fatal)
- 🎯 TypeScript support
- 🧪 Well tested
- 🔄 Singleton pattern for consistent logging
- 💾 Browser storage support (localStorage/sessionStorage)

## 🔧 Installation

```bash
npm install @lennardgeissler/logger
```

## 📖 Usage

```ts
import { Logger, ConsoleHandler, TextFormatter } from '@lennardgeissler/logger';
// Get logger instance
const logger = Logger.getInstance();
// Add handler with custom formatter
const handler = new ConsoleHandler();
handler.setFormatter(new TextFormatter('[{timestamp}] [{level}] {message}'));
logger.addHandler(handler);
// Start logging!
logger.info('Application started', { version: '1.0.1' });
logger.debug('Debug message');
logger.warn('Warning message', { details: 'Something went wrong' });
logger.error('Error occurred', { error: new Error('Failed to process') });
```

## 📝 Handlers

### ConsoleHandler

Outputs logs to the console with color support in browsers.

```ts
import { ConsoleHandler } from '@lennardgeissler/logger';
const handler = new ConsoleHandler();
logger.addHandler(handler);
```

### FileHandler

Outputs logs to a file (Node.js environment).

```ts
import { FileHandler } from '@lennardgeissler/logger';
const handler = new FileHandler('app.log');
logger.addHandler(handler);
```

### StorageHandler

Stores logs in browser's localStorage or sessionStorage.

```ts
import { StorageHandler } from '@lennardgeissler/logger';
const handler = new StorageHandler(false, 'app-logs');
logger.addHandler(handler);
```

## 🎨 Formatters

### TextFormatter

Formats logs as plain text using a customizable template.

```ts
import { TextFormatter } from '@lennardgeissler/logger';
const formatter = new TextFormatter('[{timestamp}] [{level}] {message}');
handler.setFormatter(formatter);
```

### JSONFormatter

Formats logs as JSON strings.

```ts
import { JsonFormatter } from '@lennardgeissler/logger';
const formatter = new JsonFormatter();
handler.setFormatter(formatter);
```

## 📝 Log Levels

Available log levels in order of severity:

- debug
- info
- warn
- error
- fatal

Set minimum log level:

```ts
logger.setLevel('warn'); // Only warn, error, and fatal will be logged
```

## 🧰 Custom Handlers

Create custom handlers by extending BaseHandler:

```ts
import { BaseHandler, LogMessage } from '@lennardgeissler/logger';
class CustomHandler extends BaseHandler {
    handle(log: LogMessage): void {
    // Your custom logging logic here
    const formattedLog = this.formatter.format(log);
    // ... handle the formatted log
    }
}
```

## 🎨 Custom Formatters

Create custom formatters by extending BaseFormatter:

```ts
import { BaseFormatter, LogMessage } from '@lennardgeissler/logger';
class CustomFormatter extends BaseFormatter {
    format(log: LogMessage): string {
        // Your custom formatting logic here
        return `Custom format: ${log.message}`;
    }
}
```

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## 🤝 Contributing

Contributions are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch: `git checkout -b feature/my-new-feature`.
4. Make your changes and commit them: `git commit -am 'Add new feature'`.
5. Push your branch to your fork: `git push origin feature/my-new-feature`.
6. Open a pull request to merge your changes into the main repository.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- Lennard Geissler (@LennardGeissler)
