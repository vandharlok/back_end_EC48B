const AlbumRepo = require('../repositories/AlbumRepository');
const PhotoRepo = require('../repositories/PhotoRepository');

async function createAlbum(req, res, next) {
  try {
    const { name, owner, coverUrl, initialPhotos } = req.body;

    if (!name || !owner) {
      const err = new Error('Campos obrigatórios faltando: name e owner');
      err.statusCode = 400;
      throw err;
    }

    const album = await AlbumRepo.create({ name, owner, coverUrl });

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
    const query = {};
    if (req.query.owner) query.owner = req.query.owner;

    const albums = await AlbumRepo.find(query);
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

    // Remover fotos do álbum, se houver método
    await PhotoRepo.deleteMany?.({ album: req.params.id });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAlbum, listAlbums, getAlbum, deleteAlbum };
