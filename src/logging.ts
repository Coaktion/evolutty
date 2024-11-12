import { Logger, createLogger, format, transports } from 'winston';

export class LoggerService {
  private logger: Logger;

  constructor() {
    const level = process.env.LOG_LEVEL || 'info';
    const filename = process.env.LOG_OUTPUT_FILE || 'evolutty.log';
    const logTransports = process.env.LOG_TRANSPORTS
      ? process.env.LOG_TRANSPORTS.split(',')
      : ['console'];

    const customFormat = format.printf(
      ({ timestamp, level, message, data, stack }) => {
        const context = this.constructor.name;
        if (process.env.LOG_FORMAT === 'json') {
          return JSON.stringify({
            timestamp,
            level,
            message,
            context,
            stack
          });
        }
        return `${timestamp} ${level.toUpperCase()}: ${context} - ${message} ${
          data ? JSON.stringify(data) : ''
        } ${stack || ''}`;
      }
    );

    this.logger = createLogger({
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
  }

  log(
    level: string,
    message: string,
    context?: string,
    data?: any,
    stack?: string
  ) {
    this.logger.log({ level, message, context, data, stack });
  }

  info(message: string, data?: any) {
    this.logger.info({ message, data });
  }

  error(message: string, data?: any, stack?: string) {
    this.logger.error({ message, data, stack });
  }

  warn(message: string, data?: any) {
    this.logger.warn({ message, data });
  }
}
