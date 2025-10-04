const searchInput = document.getElementById('searchInput');
const albumContainer = document.getElementById('albumContainer');
const btnAdicionarFoto = document.getElementById('btnAdicionarFoto');

// Carrega os álbuns do localStorage
function carregarAlbuns() {
  albumContainer.innerHTML = '';
  const dados = JSON.parse(localStorage.getItem('albuns')) || {};
  Object.keys(dados).forEach(nome => {
    criarAlbum(nome, dados[nome][0]); // mostra a primeira foto como thumbnail
  });
}

// Filtrar álbuns
function filtrarAlbuns() {
  const filtro = searchInput.value.toLowerCase();
  const albums = albumContainer.getElementsByClassName('album');
  Array.from(albums).forEach(album => {
    const nome = album.querySelector('span').textContent.toLowerCase();
    album.style.display = nome.includes(filtro) ? 'flex' : 'none';
  });
}
searchInput.addEventListener('input', filtrarAlbuns);

// Botões laterais
document.getElementById('btnAlbuns').addEventListener('click', () => carregarAlbuns());
document.getElementById('btnFotos').addEventListener('click', () => alert('Clique em um álbum para ver as fotos'));

// Criar álbum
function criarAlbum(nome, urlFoto) {
  const albumDiv = document.createElement('div');
  albumDiv.classList.add('album');
  albumDiv.dataset.album = nome;

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('album-img-container');

  const img = document.createElement('img');
  img.src = urlFoto;
  img.alt = nome;

  // Botão menu
  const menuBtn = document.createElement('button');
  menuBtn.classList.add('menu-btn');
  menuBtn.textContent = '⋮';

  const albumMenu = document.createElement('div');
  albumMenu.classList.add('album-menu');

  const btnEditar = document.createElement('button');
  btnEditar.classList.add('editar');
  btnEditar.textContent = 'Editar';

  const btnRemover = document.createElement('button');
  btnRemover.classList.add('remover');
  btnRemover.textContent = 'Remover';

  albumMenu.appendChild(btnEditar);
  albumMenu.appendChild(btnRemover);

  imgContainer.appendChild(img);
  imgContainer.appendChild(menuBtn);
  imgContainer.appendChild(albumMenu);

  const span = document.createElement('span');
  span.textContent = nome;

  albumDiv.appendChild(imgContainer);
  albumDiv.appendChild(span);
  albumContainer.appendChild(albumDiv);

  // Clique no álbum abre fotos.html
  img.addEventListener('click', () => {
    localStorage.setItem('albumAtual', nome);
    window.location.href = 'fotos.html';
  });

  // Menu editar/remover
  menuBtn.addEventListener('click', () => {
    albumMenu.style.display = albumMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  btnEditar.addEventListener('click', () => {
    const novoNome = prompt('Editar nome do álbum:', span.textContent);
    if (!novoNome) return;
    const dados = JSON.parse(localStorage.getItem('albuns')) || {};
    dados[novoNome] = dados[span.textContent];
    delete dados[span.textContent];
    localStorage.setItem('albuns', JSON.stringify(dados));
    span.textContent = novoNome;
    albumDiv.dataset.album = novoNome;
    albumMenu.style.display = 'none';
    filtrarAlbuns();
  });

  btnRemover.addEventListener('click', () => {
    const dados = JSON.parse(localStorage.getItem('albuns')) || {};
    delete dados[nome];
    localStorage.setItem('albuns', JSON.stringify(dados));
    albumDiv.remove();
  });
}

// Botão adicionar álbum
btnAdicionarFoto.addEventListener('click', () => {
  const nome = prompt('Nome do álbum:');
  if (!nome) return;
  const url = prompt('URL da foto do álbum:');
  if (!url) return;
  const dados = JSON.parse(localStorage.getItem('albuns')) || {};
  dados[nome] = [url];
  localStorage.setItem('albuns', JSON.stringify(dados));
  criarAlbum(nome, url);
});

carregarAlbuns(); // carrega ao iniciar
