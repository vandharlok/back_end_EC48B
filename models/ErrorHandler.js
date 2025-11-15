/*
 * ========================================
 * ARQUIVO: models/ErrorHandler.js
 * ========================================

*/

const fs = require('fs/promises');
const path = require('path');

class ErrorHandler {
  
  constructor() {
    // O path agora aponta para fora da pasta 'models', para a raiz do projeto
    this.logFilePath = path.join(__dirname, '..', 'errors.log.txt');
  }

  /**
   * Método principal para registrar um erro.
   * @param {Error} error - O objeto de erro capturado
   */
  async logError(error) {
    // Formata a mensagem de log
    const timestamp = new Date().toISOString();
    const logMessage = `
----------------------------------------
Timestamp: ${timestamp}
Tipo de Erro: ${error.name}
Mensagem: ${error.message}
Stack Trace: ${error.stack || 'Não disponível'}
----------------------------------------\n`;

    try {
      // 'appendFile' cria o arquivo se não existir, ou adiciona ao final se existir.
      await fs.appendFile(this.logFilePath, logMessage, 'utf8');
      console.log(`(Erro registrado com sucesso em ${this.logFilePath})`);
    } catch (writeError) {
      // Se falhar a gravação do log (ex: permissão negada)
      console.error("--- FALHA CRÍTICA AO GRAVAR O LOG DE ERRO ---");
      console.error(writeError);
    }
  }
}

// Exportamos a classe para ser usada no index.js
module.exports = ErrorHandler;