// src/db.js
const mongoose = require('mongoose');
const logger = require('./logger');

async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error', { message: err.message, stack: err.stack });
    throw err;
  }
}

module.exports = { connectDB };
