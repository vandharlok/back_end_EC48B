const logger = require('../logger');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Log completo do erro
  logger.error('Erro capturado pelo middleware', {
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  res.status(statusCode).json({
    success: false,
    error: err.message
  });
}

module.exports = errorHandler;
