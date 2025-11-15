/*
 * ========================================
 * ARQUIVO: models/Foto.js
 * ========================================
 */

const db = require('./database');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Foto {
  
  static _validar(data) {
    if (!data.idUsuario) {
      throw new ValidationError("O campo 'idUsuario' (da foto) é obrigatório.");
    }
    if (!data.url || data.url.trim() === "") {
      throw new ValidationError("O campo 'url' (da foto) é obrigatório.");
    }
    if (!data.url.startsWith('http://') && !data.url.startsWith('https://')) {
      throw new ValidationError("O campo 'url' deve ser um link válido (iniciar com http:// ou https://).");
    }
  }

  static create(data) {
    this._validar(data);
    const novaFoto = {
      id: db.fotos.length + 1,
      idUsuario: data.idUsuario,
      url: data.url,
      descricao: data.descricao || "",
      dataUpload: new Date()
    };
    db.fotos.push(novaFoto);
    return novaFoto;
  }
  
  /**
   * NOVO PARA O P2: Encontra todas as fotos de um usuário específico
   */
  static findAllByUserId(idUsuario) {
    return db.fotos.filter(foto => foto.idUsuario === idUsuario);
  }

  // --- Métodos antigos do P1 (sem mudanças) ---

  static findAll() {
    return db.fotos;
  }

  static findById(id) {
    return db.fotos.find(foto => foto.id === id);
  }

  /**
   * UPDATE (Atualizar)
   */
  static update(id, data) {
    const foto = this.findById(id);
    if (!foto) {
      return null; 
    }
    // A única coisa atualizável será a 'descricao'
    if (data.descricao !== undefined) {
      foto.descricao = data.descricao;
    }
    return foto;
  }

  /**
   * DELETE (Deletar)
   */
  static delete(id) {
    const index = db.fotos.findIndex(foto => foto.id === id);
    if (index === -1) {
      return false;
    }
    db.fotos.splice(index, 1);
    return true;
  }
  
} // <-- O erro provavelmente era um '}' faltando aqui

module.exports = { Foto, ValidationError };