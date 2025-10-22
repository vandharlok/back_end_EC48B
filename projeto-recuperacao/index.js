/*
 * Arquivo Principal (index.js ou app.js)
 *
 * Requisito: Testar seus métodos de CRUD.
 * Versão atualizada para o tema "Google Fotos"
 */

// Importa as classes e o Erro
const { Usuario, ValidationError } = require('./Usuario');
const { Foto } = require('./Foto');   // Importa a nova classe Foto
const { Album } = require('./Album'); // Importa a nova classe Album
const ErrorHandler = require('./ErrorHandler');

// Cria uma instância do nosso gerenciador de erros
const errorHandler = new ErrorHandler();

// Função principal para executar os testes
function rodarTestes() {

  // Usamos um bloco try...catch para capturar qualquer erro que ocorra
  // (especialmente os erros de validação)
  try {
    
    // --- TESTES DE USUÁRIO ---
    console.log("--- INICIANDO TESTES DE CRUD (USUÁRIO) ---");
    
    // 1. Teste CREATE (Sucesso)
    console.log("\n[TESTE] Criando usuários válidos...");
    const user1 = Usuario.create({ nome: "Alice", email: "alice@teste.com" });
    const user2 = Usuario.create({ nome: "Bob", email: "bob@teste.com" });
    console.log("Usuário 1 criado:", user1);
    console.log("Usuário 2 criado:", user2);

    // 2. Teste READ (Find All)
    console.log("\n[TESTE] Buscando todos os usuários...");
    console.log("Todos os usuários:", Usuario.findAll());

    // 3. Teste READ (Find By Id)
    console.log("\n[TESTE] Buscando usuário com ID 1...");
    console.log("Usuário encontrado:", Usuario.findById(1));

    // 4. Teste UPDATE
    console.log("\n[TESTE] Atualizando usuário com ID 1...");
    const userAtualizado = Usuario.update(1, { nome: "Alice Silva" });
    console.log("Usuário atualizado:", userAtualizado);

    // 5. Teste DELETE
    console.log("\n[TESTE] Deletando usuário com ID 2...");
    console.log("Deleção (ID 2) bem-sucedida:", Usuario.delete(2));
    console.log("Estado atual (Usuários):", Usuario.findAll());


    // --- TESTES DE FOTO ---
    console.log("\n\n--- INICIANDO TESTES DE CRUD (FOTO) ---");
    
    // 1. Teste CREATE (Sucesso)
    console.log("\n[TESTE] Criando fotos válidas...");
    const foto1 = Foto.create({ idUsuario: user1.id, url: "https://exemplo.com/foto1.png", descricao: "Pôr do sol" });
    const foto2 = Foto.create({ idUsuario: user1.id, url: "https://exemplo.com/foto2.jpg" });
    console.log("Foto 1 criada:", foto1);
    console.log("Foto 2 criada:", foto2);

    // 2. Teste READ (Find All)
    console.log("\n[TESTE] Buscando todas as fotos...");
    console.log("Todos as fotos:", Foto.findAll());

    // 3. Teste UPDATE
    console.log("\n[TESTE] Atualizando descrição da foto 2...");
    const fotoAtualizada = Foto.update(2, { descricao: "Selfie na praia" });
    console.log("Foto atualizada:", fotoAtualizada);

    // 4. Teste DELETE
    console.log("\n[TESTE] Deletando foto com ID 1...");
    console.log("Deleção (ID 1) bem-sucedida:", Foto.delete(1));
    console.log("Estado atual (Fotos):", Foto.findAll());


    // --- TESTES DE ALBUM ---
    console.log("\n\n--- INICIANDO TESTES DE CRUD (ALBUM) ---");
    
    // 1. Teste CREATE (Sucesso)
    console.log("\n[TESTE] Criando albuns válidos...");
    // Lembre-se: user1 tem ID 1, foto2 tem ID 2
    const album1 = Album.create({ idUsuario: user1.id, titulo: "Férias na Praia" }); 
    console.log("Album 1 criado:", album1);

    // 2. Teste READ (Find All)
    console.log("\n[TESTE] Buscando todos os albuns...");
    console.log("Todos os albuns:", Album.findAll());

    // 3. Teste UPDATE (Adicionando foto)
    console.log("\n[TESTE] Adicionando foto (ID 2) ao album 1...");
    const albumAtualizado = Album.update(1, { adicionarFotoId: foto2.id });
    console.log("Album atualizado:", albumAtualizado);
    console.log("Estado atual (Albuns):", Album.findAll());

    
    // --- TESTES DE ERRO ---

    // 6. Teste de ERRO (Usuário)
    console.log("\n\n[TESTE ERRO] Tentando criar usuário inválido (sem email)...");
    try {
      Usuario.create({ nome: "Charlie" });
    } catch (error) {
      console.error(`Erro capturado (Usuário): ${error.message}`);
      errorHandler.logError(error); // Loga o erro
    }
    
    // 7. Teste de ERRO (Foto)
    console.log("\n[TESTE ERRO] Tentando criar foto inválida (URL mal formatada)...");
    try {
      Foto.create({ idUsuario: 1, url: "url_invalida.com" });
    } catch (error) {
      console.error(`Erro capturado (Foto): ${error.message}`);
      errorHandler.logError(error); // Loga o erro
    }

    // 8. Teste de ERRO (Album)
    console.log("\n[TESTE ERRO] Tentando criar album inválido (sem título)...");
    try {
      Album.create({ idUsuario: 1 });
    } catch (error) {
      console.error(`Erro capturado (Album): ${error.message}`);
      errorHandler.logError(error); // Loga o erro
    }


  } catch (error) {
    // --- CAPTURA DE ERRO GERAL (inesperado) ---
    console.error(`\n--- !!! ERRO GERAL CAPTURADO !!! ---`);
    console.error(`Tipo de Erro: ${error.name}`);
    console.error(`Mensagem: ${error.message}`);
    
    // Aqui usamos a classe de erro para registrar o erro no arquivo .txt
    errorHandler.logError(error);

  } finally {
    // O 'finally' sempre executa, mesmo se der erro
    console.log("\n--- TESTES FINALIZADOS ---");
    console.log("Verifique o arquivo 'errors.log.txt' se erros foram capturados.");
  }
}

// Executa a função de testes
rodarTestes();

