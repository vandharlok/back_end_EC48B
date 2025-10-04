// src/logger.js
const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '..', 'logs', 'errors.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '..', 'logs', 'combined.log') })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
