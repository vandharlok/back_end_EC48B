// Campo de pesquisa de álbuns
const searchInput = document.getElementById('searchInput');
const albumContainer = document.getElementById('albumContainer');
const albums = albumContainer.getElementsByClassName('album');

// Filtrar álbuns
searchInput.addEventListener('input', () => {
  const filtro = searchInput.value.toLowerCase();
  Array.from(albums).forEach(album => {
    const nome = album.textContent.toLowerCase();
    album.style.display = nome.includes(filtro) ? 'flex' : 'none';
  });
});

// Botões
const btnAlbuns = document.getElementById('btnAlbuns');
const btnFotos = document.getElementById('btnFotos');

btnAlbuns.addEventListener('click', () => {
  alert('Exibindo todos os álbuns');
});

btnFotos.addEventListener('click', () => {
  alert('Exibindo todas as fotos de todos os álbuns');
});
