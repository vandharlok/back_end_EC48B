const Album = require('../models/Album');
const logger = require('../logger');

class AlbumRepository {
  async create(data) {
    try {
      const album = new Album(data);
      return await album.save();
    } catch (err) {
      logger.error('AlbumRepository.create error', { message: err.message, stack: err.stack, data });
      throw err;
    }
  }

  async findById(id) {
    try {
      return await Album.findById(id).populate('owner').exec();
    } catch (err) {
      logger.error('AlbumRepository.findById error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }

  async find(query = {}) {
    try {
      return await Album.find(query).populate('owner').exec();
    } catch (err) {
      logger.error('AlbumRepository.find error', { message: err.message, stack: err.stack, query });
      throw err;
    }
  }

  async update(id, payload) {
    try {
      return await Album.findByIdAndUpdate(id, payload, { new: true }).exec();
    } catch (err) {
      logger.error('AlbumRepository.update error', { message: err.message, stack: err.stack, id, payload });
      throw err;
    }
  }

  async delete(id) {
    try {
      return await Album.findByIdAndDelete(id).exec();
    } catch (err) {
      logger.error('AlbumRepository.delete error', { message: err.message, stack: err.stack, id });
      throw err;
    }
  }
}

module.exports = new AlbumRepository();
