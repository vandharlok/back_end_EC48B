// src/controllers/albumController.js
const AlbumRepo = require('../repositories/AlbumRepository');
const PhotoRepo = require('../repositories/PhotoRepository');

/**
 * Expected payload when creating an album:
 * {
 *   name: string (required),
 *   owner: userId (required),
 *   coverUrl: string (optional),
 *   initialPhotos: [ "https://..." ] (optional)
 * }
 */

async function createAlbum(req, res, next) {
  try {
    const { name, owner, coverUrl, initialPhotos } = req.body;
    if (!name || !owner) {
      const err = new Error('Campos obrigatórios faltando: name e owner');
      err.statusCode = 400;
      throw err;
    }

    const album = await AlbumRepo.create({ name, owner, coverUrl });

    // if initial photos provided, create Photo entries referencing this album
    if (Array.isArray(initialPhotos) && initialPhotos.length) {
      for (const url of initialPhotos) {
        await PhotoRepo.create({ album: album._id, url });
      }
    }

    res.status(201).json({ success: true, data: album });
  } catch (err) {
    next(err);
  }
}

async function listAlbums(req, res, next) {
  try {
    const q = {};
    if (req.query.owner) q.owner = req.query.owner;
    const albums = await AlbumRepo.find(q);
    res.json({ success: true, data: albums });
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req, res, next) {
  try {
    const album = await AlbumRepo.findById(req.params.id);
    if (!album) {
      const err = new Error('Álbum não encontrado');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: album });
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const album = await AlbumRepo.delete(req.params.id);
    if (!album) {
      const err = new Error('Álbum não encontrado');
      err.statusCode = 404;
      throw err;
    }
    // Optionally remove photos of the album
    await PhotoRepo.deleteMany?.({ album: req.params.id }); // safe call if implemented
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAlbum, listAlbums, getAlbum, deleteAlbum };
