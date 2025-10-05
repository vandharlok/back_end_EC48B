// src/models/Photo.js
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: [true, 'Album é obrigatório'] },
  url: { type: String, required: [true, 'URL da foto é obrigatória'] },
  title: { type: String, trim: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', PhotoSchema);
