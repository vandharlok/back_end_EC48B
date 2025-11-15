/*
 * ========================================
 * ARQUIVO: models/database.js
 * ========================================
 */

// 1. Define os arrays que vão guardar nossos dados
const usuarios = [];
const fotos = [];
const albuns = [];

// 2. Exporta os arrays para que as outras classes (Usuario, Foto, Album)
//    possam usá-los.
module.exports = {
  usuarios,
  fotos,
  albuns
};

