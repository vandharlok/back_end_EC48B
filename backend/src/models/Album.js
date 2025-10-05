// src/models/Album.js
const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nome do álbum é obrigatório'], trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Owner é obrigatório'] },
  coverUrl: { type: String }, // thumbnail opcional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
