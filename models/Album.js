/*
 * ========================================
 * ARQUIVO: models/Album.js
 * ========================================
 */

const db = require('./database');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Album {

  static _validar(data) {
    if (!data.idUsuario) {
      throw new ValidationError("O campo 'idUsuario' (do album) é obrigatório.");
    }
    if (!data.titulo || data.titulo.trim() === "") {
      throw new ValidationError("O campo 'titulo' (do album) é obrigatório.");
    }
  }

  static create(data) {
    this._validar(data);
    const novoAlbum = {
      id: db.albuns.length + 1,
      idUsuario: data.idUsuario,
      titulo: data.titulo,
      idsDeFotos: data.idsDeFotos || []
    };
    db.albuns.push(novoAlbum);
    return novoAlbum;
  }

  /**
   * NOVO PARA O P2: Encontra todos os álbuns de um usuário específico
   */
  static findAllByUserId(idUsuario) {
    return db.albuns.filter(album => album.idUsuario === idUsuario);
  }

  // --- Métodos antigos do P1 (sem mudanças) ---

  static findAll() {
    return db.albuns;
  }

  static findById(id) {
    return db.albuns.find(album => album.id === id);
  }

  /**
   * UPDATE (Atualizar)
   */
  static update(id, data) {
    const album = this.findById(id);
    if (!album) {
      return null;
    }

    // Atualizar título
    if (data.titulo) {
      album.titulo = data.titulo;
    }
    
    // Adicionar uma nova foto ao album (exemplo de lógica de update)
    if (data.adicionarFotoId) {
      if (typeof data.adicionarFotoId !== 'number') {
        throw new ValidationError("O ID da foto para adicionar deve ser um número.");
      }
      if (!album.idsDeFotos.includes(data.adicionarFotoId)) {
        album.idsDeFotos.push(data.adicionarFotoId);
      }
    }
    
    return album;
  }

  /**
   * DELETE (Deletar)
   */
  static delete(id) {
    const index = db.albuns.findIndex(album => album.id === id);
    if (index === -1) {
      return false; // Album não encontrado
    }

    db.albuns.splice(index, 1);
    return true; // Sucesso
  }

} // <-- O erro provavelmente era um '}' faltando aqui

module.exports = { Album, ValidationError };