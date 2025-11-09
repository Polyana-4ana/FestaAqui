// Variável global para o mapa
let mapaLeaflet = null;

/**
 * Alterna entre os feeds (principal, localização, configurações)
 */
function mostrarFeed(feedId) {
  // Esconde todos os feeds
  document.querySelectorAll('.feed').forEach(feed => {
    feed.style.display = 'none';
  });

  // Mostra o feed selecionado
  const feedSelecionado = document.getElementById(feedId);

  // Se for o mapa
  if (feedId === 'feed-localizacao') {
    feedSelecionado.style.display = 'flex';
    if (!mapaLeaflet) {
      inicializarMapa();
    } else {
      mapaLeaflet.invalidateSize();
    }
  }

  // Se for o feed principal
  else if (feedId === 'feed-principal') {
    feedSelecionado.style.display = 'grid';
  }

  // Se for o feed de configuração
  else {
    feedSelecionado.style.display = 'block';
  }
}

/**
 * Inicializa o mapa Leaflet
 */
function inicializarMapa() {
  const lat = -30.033;
  const lon = -51.23;

  mapaLeaflet = L.map('mapa', {
    center: [lat, lon],
    zoom: 13,
    zoomControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapaLeaflet);

  L.control.zoom({ position: 'topleft' }).addTo(mapaLeaflet);

  mapaLeaflet.invalidateSize();

  // Exemplo de marcador inicial
  L.marker([lat, lon])
    .addTo(mapaLeaflet)
    .bindPopup("<b>FestiGram</b><br>Porto Alegre 🎉");
}

/**
 * Busca festas da API e adiciona no mapa
 */
async function buscarFestas() {
  try {
    const resposta = await fetch("http://localhost:3000/eventos");
    const festas = await resposta.json();

    console.log(festas);

    // Remove marcadores antigos
    mapaLeaflet.eachLayer(layer => {
      if (layer instanceof L.Marker) mapaLeaflet.removeLayer(layer);
    });

    festas.forEach(festa => {
      const lat = -30.033; // ajuste depois com dados reais
      const lon = -51.23;

      L.marker([lat, lon]).addTo(mapaLeaflet)
        .bindPopup(`
          <b>${festa.nome_estabelecimento}</b><br>
          ${festa.descricao || "Evento sem descrição"}<br>
          ❤️ ${festa.curtidas || 0} curtidas
        `);
    });
  } catch (erro) {
    console.error("Erro ao buscar festas:", erro);
    alert("Não foi possível carregar as festas 😢");
  }
}

/**
 * Placeholder da localização do usuário
 */
function usarLocalizacao() {
  alert("Função de localização ainda será adicionada 🌍");
}

// Ao carregar a página, mostra o feed principal
document.addEventListener("DOMContentLoaded", () => {
  mostrarFeed("feed-principal");
});
