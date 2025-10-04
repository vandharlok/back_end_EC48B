// src/middleware/errorHandler.js
const logger = require('../logger');

function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    body: req.body
  });

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
