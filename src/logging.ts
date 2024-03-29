import { createLogger, format, transports } from 'winston';

const level = process.env.LOG_LEVEL || 'info';

const filename = process.env.LOG_OUTPUT_FILE || 'evolutty.log';

const logTransports = process.env.LOG_TRANSPORTS
  ? process.env.LOG_TRANSPORTS.split(',')
  : ['console'];

const logging = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    process.env.LOG_FORMAT ? format[process.env.LOG_FORMAT]() : format.json()
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
