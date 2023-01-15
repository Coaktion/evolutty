import { createLogger, format, transports } from 'winston';

const logging = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'info.log', level: 'info' }),
    new transports.File({ filename: 'debug.log', level: 'debug' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logging.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

export default logging;
