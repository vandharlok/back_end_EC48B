/*
 * Arquivo da Classe de Erro
 *
 * Requisito: Capturar erros e gravar num arquivo .txt.
 * Para isso, usaremos o módulo 'fs' (File System) nativo do Node.js.
 */

const fs = require('fs');
const path = require('path');

class ErrorHandler {
  constructor() {
    // Define o caminho do arquivo de log. __dirname é o diretório atual.
    this.logFilePath = path.join(__dirname, 'errors.log.txt');
  }

  /**
   * Método para registrar (logar) um erro no arquivo de texto.
   * @param {Error} error - O objeto de erro capturado.
   */
  logError(error) {
    const timestamp = new Date().toISOString();
    
    // Formata a mensagem de erro que será salva no arquivo
    const errorMessage = `${timestamp} - ERRO: ${error.message}\nStack Trace: ${error.stack}\n\n`;

    try {
      // 'a' significa 'append' (adicionar ao final do arquivo).
      // Se o arquivo não existir, ele será criado.
      fs.appendFileSync(this.logFilePath, errorMessage, 'utf8');
      
      console.error(`[ErrorHandler] Erro registrado com sucesso em: ${this.logFilePath}`);
    } catch (writeError) {
      // Se falhar até para escrever o log, apenas mostramos no console.
      console.error('[ErrorHandler] FALHA CRÍTICA: Não foi possível escrever no arquivo de log.', writeError);
    }
  }
}

// Exporta a classe para ser usada em outros arquivos
module.exports = ErrorHandler;
