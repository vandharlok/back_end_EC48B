/*
 * Arquivo da Classe 3 de 3 (Album) - Tema Google Fotos
 *
 * Requisito: Ter CRUD (Create, Read, Update, Delete) e validação de campos obrigatórios.
 * Um Album vai relacionar um Usuário a uma ou mais Fotos.
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

class Album {

  /**
   * Método interno para validar os dados de um album.
   * @param {object} data - Os dados do album (ex: { idUsuario: 1, titulo: "Férias 2025" })
   */
  static _validar(data) {
    if (!data.idUsuario) {
      throw new ValidationError("O campo 'idUsuario' (do album) é obrigatório.");
    }
    if (!data.titulo || data.titulo.trim() === "") {
      throw new ValidationError("O campo 'titulo' (do album) é obrigatório.");
    }
  }

  /**
   * CREATE (Criar)
   * Adiciona um novo album ao banco de dados.
   */
  static create(data) {
    this._validar(data); // Chama a validação

    const novoAlbum = {
      id: db.albuns.length + 1, // Usando o array 'db.albuns'
      idUsuario: data.idUsuario,
      titulo: data.titulo,
      idsDeFotos: data.idsDeFotos || [] // Inicia com um array de IDs de fotos (opcional)
    };

    db.albuns.push(novoAlbum); // Salvando em 'db.albuns'
    return novoAlbum;
  }

  /**
   * READ (Ler Todos)
   * Retorna todos os albuns do banco de dados.
   */
  static findAll() {
    return db.albuns; // Lendo de 'db.albuns'
  }

  /**
   * READ (Ler por ID)
   * Retorna um album específico pelo seu ID.
   */
  static findById(id) {
    return db.albuns.find(album => album.id === id); // Lendo de 'db.albuns'
  }

  /**
   * UPDATE (Atualizar)
   * Atualiza os dados de um album existente (ex: adicionar uma foto)
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
   * Remove um album do banco de dados.
   */
  static delete(id) {
    const index = db.albuns.findIndex(album => album.id === id); // Lendo de 'db.albuns'
    if (index === -1) {
      return false; // Album não encontrado
    }

    db.albuns.splice(index, 1);
    return true; // Sucesso
  }
}

// Exportamos a classe principal e nosso erro personalizado
module.exports = { Album, ValidationError };

