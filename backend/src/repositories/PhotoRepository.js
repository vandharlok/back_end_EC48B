// src/repositories/PhotoRepository.js
const Photo = require('../models/Photo');
const logger = require('../logger');

class PhotoRepository {
  async create(data) {
    try {
      const photo = new Photo(data);
      return await photo.save();
    } catch (err) {
      logger.error('PhotoRepository.create error', { message: err.message, stack: err.stack, data });
      throw err;
    }
  }

  async findById(id) {
    try {
      return await Photo.findById(id).populate('album').exec();
    } catch (err) {
      logger.error('PhotoRepository.findById error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }

  async find(query = {}) {
    try {
      return await Photo.find(query).populate('album').exec();
    } catch (err) {
      logger.error('PhotoRepository.find error', { message: err.message, stack: err.stack, query });
      throw err;
    }
  }

  async update(id, payload) {
    try {
      return await Photo.findByIdAndUpdate(id, payload, { new: true }).exec();
    } catch (err) {
      logger.error('PhotoRepository.update error', { message: err.message, stack: err.stack, id, payload });
      throw err;
    }
  }

  async delete(id) {
    try {
      return await Photo.findByIdAndDelete(id).exec();
    } catch (err) {
      logger.error('PhotoRepository.delete error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }
}

module.exports = new PhotoRepository();
