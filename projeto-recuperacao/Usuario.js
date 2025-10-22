/*
 * Arquivo da Classe 1 de 3 (Usuário)
 *
 * Requisito: Ter CRUD (Create, Read, Update, Delete) e validação de campos obrigatórios.
 */

// Importa nosso "banco de dados" fake
const db = require('./database');

// Vamos definir uma classe de erro personalizada para validação
// Isso helpsa o ErrorHandler a saber que tipo de erro é
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Usuario {

  /**
   * Método interno e estático (_validar) para validar os dados.
   * Requisito: Validação de campos obrigatórios.
   * @param {object} data - Os dados do usuário (ex: { nome: "Teste", email: "teste@teste.com" })
   */
  static _validar(data) {
    // Validação de 'nome'
    if (!data.nome || data.nome.trim() === "") {
      // Se o nome não for fornecido ou estiver vazio, lançamos um erro.
      throw new ValidationError("O campo 'nome' (do usuário) é obrigatório.");
    }
    
    // Validação de 'email'
    if (!data.email || data.email.trim() === "") {
      throw new ValidationError("O campo 'email' (do usuário) é obrigatório.");
    }

    // Simulação de validação de formato de email
    if (!data.email.includes('@')) {
       throw new ValidationError("O campo 'email' (do usuário) parece ser inválido.");
    }
  }

  /**
   * CREATE (Criar)
   * Adiciona um novo usuário ao banco de dados.
   */
  static create(data) {
    this._validar(data); // Chama a validação primeiro

    const novoUsuario = {
      id: db.usuarios.length + 1, // ID simples e incremental
      nome: data.nome,
      email: data.email
    };

    db.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  /**
   * READ (Ler Todos)
   * Retorna todos os usuários do banco de dados.
   */
  static findAll() {
    return db.usuarios;
  }

  /**
   * READ (Ler por ID)
   * Retorna um usuário específico pelo seu ID.
   */
  static findById(id) {
    // Usamos o método 'find' do array
    return db.usuarios.find(usuario => usuario.id === id);
  }

  /**
   * UPDATE (Atualizar)
   * Atualiza os dados de um usuário existente.
   */
  static update(id, data) {
    const usuario = this.findById(id);
    if (!usuario) {
      return null; // Ou podemos lançar um erro "Não encontrado"
    }

    // Atualiza apenas os campos que foram fornecidos
    if (data.nome) {
      usuario.nome = data.nome;
    }
    if (data.email) {
      // Re-valida o email se ele for alterado
       if (!data.email.includes('@')) {
         throw new ValidationError("O campo 'email' (do usuário) parece ser inválido.");
      }
      usuario.email = data.email;
    }
    
    return usuario;
  }

  /**
   * DELETE (Deletar)
   * Remove um usuário do banco de dados.
   */
  static delete(id) {
    // Encontramos o índice do usuário no array
    const index = db.usuarios.findIndex(usuario => usuario.id === id);
    if (index === -1) {
      return false; // Usuário não encontrado
    }

    // Remove 1 elemento a partir do índice encontrado
    db.usuarios.splice(index, 1);
    return true; // Sucesso
  }
}

// Exportamos a classe principal e nosso erro personalizado
module.exports = { Usuario, ValidationError };

