const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nome é obrigatório'] },
  email: { type: String, required: [true, 'Email é obrigatório'], unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
