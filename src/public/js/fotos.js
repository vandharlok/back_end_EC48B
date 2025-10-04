const fotoContainer = document.getElementById('fotoContainer');
const tituloAlbum = document.getElementById('tituloAlbum');
const searchInput = document.getElementById('searchInput');
const btnVoltar = document.getElementById('btnVoltar');

// Pega álbum selecionado
const albumName = localStorage.getItem('albumAtual');
tituloAlbum.textContent = albumName || 'Álbum';

// Carrega fotos do localStorage
const dados = JSON.parse(localStorage.getItem('albuns')) || {};
const fotos = dados[albumName] || [];

// Renderizar fotos
function renderFotos(lista) {
  fotoContainer.innerHTML = '';
  lista.forEach((url, index) => {
    const div = document.createElement('div');
    div.classList.add('album'); // mantém estilo do grid

    const img = document.createElement('img');
    img.src = url;
    img.alt = `Foto ${index+1}`;

    div.appendChild(img);
    fotoContainer.appendChild(div);
  });
}

renderFotos(fotos);

// Filtrar fotos
searchInput.addEventListener('input', () => {
  const filtro = searchInput.value.toLowerCase();
  Array.from(fotoContainer.getElementsByTagName('img')).forEach(img => {
    img.parentElement.style.display = img.alt.toLowerCase().includes(filtro) ? 'flex' : 'none';
  });
});

// Voltar
btnVoltar.addEventListener('click', () => window.history.back());
