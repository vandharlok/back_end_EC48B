/*

 */

// 1. Importações
const express = require('express');
const session = require('express-session');
const path = require('path');

// 2. Importação dos Models

const { Usuario, ValidationError } = require('./models/Usuario');
const { Foto } = require('./models/Foto');
const { Album } = require('./models/Album');
const ErrorHandler = require('./models/ErrorHandler');

// 3. Inicialização
const app = express();
const port = 3000;
const errorHandler = new ErrorHandler();

// 4. Configuração dos Middlewares
// Habilita o EJS (template engine)
app.set('view engine', 'ejs');
// Define o diretório 'views'
app.set('views', path.join(__dirname, 'views'));
// Habilita o 'public' para arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public')));
// Habilita o parser para ler dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Configura as Sessões (Requisito de Login)
app.use(session({
  secret: 'seu-segredo-super-secreto-para-o-p2', // Mude isso!
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora de sessão
}));

// Middleware customizado: torna o 'user' da sessão disponível para todos os templates EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Middleware de "Guarda de Rota": protege rotas que exigem login
function requireLogin(req, res, next) {
  if (!req.session.user) {
    // Se não estiver logado, redireciona para a página de login
    res.redirect('/login');
  } else {
    // Se estiver logado, continua
    next();
  }
}

// 5. ROTAS (A alma do Express)

// --- Rotas Públicas (Não exigem login) ---

// GET / (Homepage)
app.get('/', (req, res) => {
  if (req.session.user) {
    // Se já está logado, vai direto para o dashboard
    return res.redirect('/dashboard');
  }
  // Se não, mostra a página inicial com links de login/registro
  res.render('index', { titulo: 'Página Inicial' });
});

// GET /login (Página de Login)
app.get('/login', (req, res) => {
  res.render('login', { titulo: 'Login', message: null });
});

// POST /login (Processar o Login)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  // Tenta encontrar o usuário no nosso "banco de dados"
  const user = Usuario.findByEmailAndPassword(email, senha);

  if (user) {
    // SUCESSO! Salva o usuário na sessão
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    // FALHA! Mostra mensagem de erro (Requisito do PDF)
    res.render('login', {
      titulo: 'Login',
      message: { type: 'error', text: 'Email ou senha inválidos.' }
    });
  }
});

// GET /register (Página de Registro)
app.get('/register', (req, res) => {
  res.render('register', { titulo: 'Registrar', message: null });
});

// POST /register (Processar o Registro)
app.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;
  
  try {
    // 1. Validação: O email já existe?
    if (Usuario.findByEmail(email)) {
      return res.render('register', {
        titulo: 'Registrar',
        message: { type: 'error', text: 'Este email já está em uso.' }
      });
    }
    
    // 2. Tenta criar o usuário (aqui a validação do P1 é acionada)
    const novoUsuario = Usuario.create({ nome, email, senha });

    // 3. Sucesso: Loga o usuário automaticamente
    req.session.user = novoUsuario;
    res.redirect('/dashboard');

  } catch (error) {
    // 4. Falha: Captura erros de validação ou outros
    if (error.name === 'ValidationError') {
      // Erro de validação (ex: senha curta, email vazio) (Requisito do PDF)
      res.render('register', {
        titulo: 'Registrar',
        message: { type: 'error', text: error.message }
      });
    } else {
      // Erro inesperado (logamos no .txt)
      errorHandler.logError(error);
      res.render('register', {
        titulo: 'Registrar',
        message: { type: 'error', text: 'Ocorreu um erro inesperado. Tente novamente.' }
      });
    }
  }
});

// GET /logout (Sair da conta)
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

// --- Rotas Privadas (Exigem login) ---
// Usamos o middleware 'requireLogin' para proteger todas abaixo

// GET /dashboard (Página principal do app)
app.get('/dashboard', requireLogin, (req, res) => {
  const user = req.session.user;

  // Busca APENAS os dados do usuário logado
  const fotos = Foto.findAllByUserId(user.id);
  const albuns = Album.findAllByUserId(user.id);

  res.render('dashboard', {
    titulo: 'Meu Dashboard',
    user: user,
    fotos: fotos,
    albuns: albuns,
    message: null
  });
});

// POST /fotos (Criar nova foto)
app.post('/fotos', requireLogin, (req, res) => {
  const user = req.session.user;
  const { url, descricao } = req.body;

  try {
    // Tenta criar a foto
    Foto.create({ idUsuario: user.id, url, descricao });
    // Redireciona de volta para o dashboard
    res.redirect('/dashboard'); // (Idealmente com uma msg de sucesso)

  } catch (error) {
    // Se falhar (ex: URL inválida), recarrega o dashboard com a msg de erro
    const fotos = Foto.findAllByUserId(user.id);
    const albuns = Album.findAllByUserId(user.id);
    
    res.render('dashboard', {
      titulo: 'Meu Dashboard',
      user: user,
      fotos: fotos,
      albuns: albuns,
      message: { type: 'error', text: error.message }
    });
  }
});

// 6. Inicialização do Servidor
app.listen(port, () => {
  console.log(`Servidor do Projeto 2 rodando!`);
  console.log(`Acesse em: http://localhost:${port}`);
});
