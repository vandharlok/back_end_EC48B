/*
 * Arquivo da Classe 2 de 3 (Foto) - Tema Google Fotos
 *
 * Requisito: Ter CRUD (Create, Read, Update, Delete) e validação de campos obrigatórios.
 */

// Importa nosso "banco de dados" fake
const db = require('./database');

// Vamos redefinir a classe de erro personalizada para este módulo
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Foto {

  /**
   * Método interno para validar os dados de uma foto.
   * @param {object} data - Os dados da foto (ex: { idUsuario: 1, url: "http://...", descricao: "..." })
   */
  static _validar(data) {
    if (!data.idUsuario) {
      throw new ValidationError("O campo 'idUsuario' (da foto) é obrigatório.");
    }
    if (!data.url || data.url.trim() === "") {
      throw new ValidationError("O campo 'url' (da foto) é obrigatório.");
    }
    // Uma validação simples de URL
    if (!data.url.startsWith('http://') && !data.url.startsWith('https://')) {
      throw new ValidationError("O campo 'url' (da foto) deve ser um link válido (iniciar com http:// ou https://).");
    }
  }

  /**
   * CREATE (Criar)
   * Adiciona uma nova foto ao banco de dados.
   */
  static create(data) {
    this._validar(data); // Chama a validação

    const novaFoto = {
      id: db.fotos.length + 1, // Usando o array 'db.fotos'
      idUsuario: data.idUsuario,
      url: data.url,
      descricao: data.descricao || "", // Descrição é opcional
      dataUpload: new Date()
    };

    db.fotos.push(novaFoto); // Salvando em 'db.fotos'
    
    return novaFoto;
  }

  /**
   * READ (Ler Todos)
   * Retorna todas as fotos do banco de dados.
   */
  static findAll() {
    return db.fotos; // Lendo de 'db.fotos'
  }

  /**
   * READ (Ler por ID)
   * Retorna uma foto específica pelo seu ID.
   */
  static findById(id) {
    return db.fotos.find(foto => foto.id === id); // Lendo de 'db.fotos'
  }

  /**
   * UPDATE (Atualizar)
   * Atualiza os dados de uma foto existente (ex: a descrição).
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
   * Remove uma foto do banco de dados.
   */
  static delete(id) {
    const index = db.fotos.findIndex(foto => foto.id === id); // Lendo de 'db.fotos'
    if (index === -1) {
      return false; // Foto não encontrada
    }

    db.fotos.splice(index, 1);
    return true; // Sucesso
  }
}

// Exportamos a classe principal e nosso erro personalizado
module.exports = { Foto, ValidationError };

