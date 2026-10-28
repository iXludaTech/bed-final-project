import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { Service: 'events-api' },
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            format: winston.format.json()
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.printf(info => {
                const parts = [
                    info.method && `${info.method} ${info.url}`,
                    info.status && `Status: ${info.status}`,
                    info.duration !== undefined && `Duration: ${info.duration}ms`,
                    info.message && `Message: ${info.message}`,
                    `Date: ${new Date().toISOString()}`,
                ]

                return parts.filter(Boolean).join(' | ')
            })
        })
    );
}

export default logger;
