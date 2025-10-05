const express = require('express');
const router = express.Router();
const albumCtrl = require('../controllers/albumController');
const photoCtrl = require('../controllers/photoController');
const userCtrl = require('../controllers/userController');

router.post('/users', userCtrl.createUser);

router.post('/albums', albumCtrl.createAlbum);
router.get('/albums', albumCtrl.listAlbums);
router.get('/albums/:id', albumCtrl.getAlbum);
router.delete('/albums/:id', albumCtrl.deleteAlbum);

router.post('/photos', photoCtrl.createPhoto);
router.get('/photos', photoCtrl.listPhotos);
router.get('/photos/:id', photoCtrl.getPhoto);
router.delete('/photos/:id', photoCtrl.deletePhoto);

module.exports = router;
