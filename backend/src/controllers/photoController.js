// src/controllers/photoController.js
const PhotoRepo = require('../repositories/PhotoRepository');
const AlbumRepo = require('../repositories/AlbumRepository');

async function createPhoto(req, res, next) {
  try {
    const { album, url, title, description } = req.body;
    if (!album || !url) {
      const err = new Error('Campos obrigatórios faltando: album e url');
      err.statusCode = 400;
      throw err;
    }

    // optional: check album exists
    const alb = await AlbumRepo.findById(album);
    if (!alb) {
      const err = new Error('Álbum informado não existe');
      err.statusCode = 400;
      throw err;
    }

    const photo = await PhotoRepo.create({ album, url, title, description });
    res.status(201).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
}

async function listPhotos(req, res, next) {
  try {
    const q = {};
    if (req.query.album) q.album = req.query.album;
    const photos = await PhotoRepo.find(q);
    res.json({ success: true, data: photos });
  } catch (err) {
    next(err);
  }
}

async function getPhoto(req, res, next) {
  try {
    const photo = await PhotoRepo.findById(req.params.id);
    if (!photo) {
      const err = new Error('Foto não encontrada');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
}

async function deletePhoto(req, res, next) {
  try {
    const photo = await PhotoRepo.delete(req.params.id);
    if (!photo) {
      const err = new Error('Foto não encontrada');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPhoto, listPhotos, getPhoto, deletePhoto };
