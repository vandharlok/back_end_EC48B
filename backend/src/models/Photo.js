// src/models/Photo.js
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  url: { type: String, required: true },
  title: { type: String, trim: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', PhotoSchema);
