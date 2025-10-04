// src/repositories/UserRepository.js
const User = require('../models/User');
const logger = require('../logger');

class UserRepository {
  async create(data) {
    try {
      const user = new User(data);
      return await user.save();
    } catch (err) {
      logger.error('UserRepository.create error', { message: err.message, stack: err.stack, data });
      throw err;
    }
  }

  async findById(id) {
    try {
      return await User.findById(id).exec();
    } catch (err) {
      logger.error('UserRepository.findById error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email }).exec();
    } catch (err) {
      logger.error('UserRepository.findByEmail error', { message: err.message, stack: err.stack, email });
      throw err;
    }
  }

  async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id).exec();
    } catch (err) {
      logger.error('UserRepository.deleteById error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }
}

module.exports = new UserRepository();
