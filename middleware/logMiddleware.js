import logger from '../src/utils/log.js'

const logs = (req, res, next) => {
    const start = new Date()

    res.on('finish', () => {
        const ms = new Date() - start
        logger.info('request', {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: ms,
        date: new Date().toISOString()
        })
    })

    next();
}

export default logs;
