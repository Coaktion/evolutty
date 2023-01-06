import winston from 'winston';

const logging = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logging.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logging;
