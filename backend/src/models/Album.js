// src/models/Album.js
const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverUrl: { type: String }, // thumbnail
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
