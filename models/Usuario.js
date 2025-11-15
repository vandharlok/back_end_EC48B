/*
 * ========================================
 * ARQUIVO: models/Usuario.js
 * ========================================
 *
 * Salve este código exatamente em:
 * [Sua Pasta do Projeto]/models/Usuario.js
 */

// Importa o banco de dados
const db = require('./database');

// Define nossa classe de erro personalizada
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class Usuario {
  
  /**
   * Valida os dados de um novo usuário
   */
  static _validar(data) {
    if (!data.nome || data.nome.trim() === "") {
      throw new ValidationError("O campo 'nome' é obrigatório.");
    }
    if (!data.email || data.email.trim() === "") {
      throw new ValidationError("O campo 'email' é obrigatório.");
    }
    if (!data.email.includes('@')) {
       throw new ValidationError("O campo 'email' parece ser inválido.");
    }
    // Validação de Senha (NOVO PARA O P2)
    if (!data.senha || data.senha.length < 4) {
      throw new ValidationError("A 'senha' é obrigatória e deve ter no mínimo 4 caracteres.");
    }
  }

  /**
   * CREATE: Cria um novo usuário
   */
  static create(data) {
    this._validar(data); // Validação inclui a senha agora

    const novoUsuario = {
      id: db.usuarios.length + 1,
      nome: data.nome,
      email: data.email,
      senha: data.senha // (Em um projeto real, faríamos HASH da senha)
    };
    db.usuarios.push(novoUsuario);
    return novoUsuario;
  }
  
  // --- MÉTODOS NOVOS PARA O P2 (Login) ---
  
  /**
   * Encontra um usuário pelo email (para checar se já existe no registro)
   */
  static findByEmail(email) {
    return db.usuarios.find(user => user.email === email);
  }

  /**
   * Encontra um usuário por email E senha (para o login)
   */
  static findByEmailAndPassword(email, senha) {
    return db.usuarios.find(user => user.email === email && user.senha === senha);
  }

  // --- Métodos antigos do P1 (sem mudanças) ---

  static findAll() {
    return db.usuarios;
  }

  static findById(id) {
    return db.usuarios.find(usuario => usuario.id === id);
  }

  /**
   * UPDATE: Atualiza um usuário (código do P1)
   */
  static update(id, data) {
    const usuario = this.findById(id);
    if (!usuario) return null;
    if (data.nome) usuario.nome = data.nome;
    if (data.email) usuario.email = data.email;
    if (data.senha) usuario.senha = data.senha;
    return usuario;
  }

  /**
   * DELETE: Deleta um usuário (código do P1)
   */
  static delete(id) {
    const index = db.usuarios.findIndex(usuario => usuario.id === id);
    if (index === -1) return false;
    db.usuarios.splice(index, 1);
    return true;
  }
}

// Exporta a classe e o erro
module.exports = { Usuario, ValidationError };