import { createLogger, format, transports } from 'winston';

const level = process.env.LOG_LEVEL || 'info';

const filename = process.env.LOG_OUTPUT_FILE || 'evolutty.log';

const logTransports = process.env.LOG_TRANSPORTS
  ? process.env.LOG_TRANSPORTS.split(',')
  : ['console'];

const customFormat = format.printf(
  ({ timestamp, level, message, context, data, stack }) => {
    return `${timestamp} ${level.toUpperCase()}: ${context} - ${message} ${
      data ? JSON.stringify(data) : ''
    } ${stack || ''}`;
  }
);

const logging = createLogger({
  level,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    customFormat
  ),
  transports: logTransports.map((transport: string) => {
    switch (transport.trim()) {
      case 'file':
        return new transports.File({
          filename,
          level
        });
      case 'console':
        return new transports.Console({ level });
      default:
        return new transports.Console({ level });
    }
  })
});

export default logging;
