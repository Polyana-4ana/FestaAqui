/* ----------- FUNÇÃO PARA TROCAR ENTRE TELAS ----------- */
function mostrarFeed(id) {
    document.querySelectorAll('.feed')
        .forEach(f => f.style.display = "none");

    document.getElementById(id).style.display = "block";

    if (id === "feed-localizacao") {
        setTimeout(() => {
            mapa.invalidateSize();
        }, 200);
    }
}

/* ----------- MAPA ----------- */

let mapa = L.map("mapa").setView([-30.0346, -51.2177], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
}).addTo(mapa);

/* BANCO DE FESTAS FAKE */
   const festasFake = [
    { cidade: "porto alegre", nome: "Poaclub", lat: -30.035, lng: -51.22 },
    { cidade: "porto alegre", nome: "Galpão Neon", lat: -30.04, lng: -51.215 },
    { cidade: "porto alegre", nome: "Clube Sunset", lat: -30.038, lng: -51.21 },
    { cidade: "porto alegre", nome: "Espaço Celebration", lat: -30.032, lng: -51.225 },
    { cidade: "porto alegre", nome: "Neon party", lat: -30.036, lng: -51.218 },
    { cidade: "canoas", nome: "Cenografia Golden", lat: -29.92, lng: -51.18 },
    { cidade: "canoas", nome: "Espaço Fantasy", lat: -29.91, lng: -51.20 },
    { cidade: "canoas", nome: "Clube Rio Grande", lat: -29.915, lng: -51.19 },
    { cidade: "gramado", nome: "Festa Alpina", lat: -29.37, lng: -50.88 },
    { cidade: "gramado", nome: "Casa do Lago", lat: -29.37, lng: -50.87 },
    { cidade: "porto alegre", nome: "Noite Dourada", lat: -30.033, lng: -51.22 }
];

/* ----------- USAR LOCALIZAÇÃO ----------- */
function usarLocalizacao() {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        mapa.setView([lat, lon], 15);

        L.marker([lat, lon])
            .addTo(mapa)
            .bindPopup("📍 Você está aqui!")
            .openPopup();
    });
}

/* ----------- BUSCAR FESTAS POR CIDADE ----------- */
function buscarFestas() {
    const cidadeDigitada = document.getElementById("cidadeInput").value.trim().toLowerCase();

    if (cidadeDigitada === "") {
        alert("Digite uma cidade para buscar!");
        return;
    }

    const resultados = festasFake.filter(f => f.cidade === cidadeDigitada);

    mapa.eachLayer(layer => {
        if (layer instanceof L.Marker) mapa.removeLayer(layer);
    });

    if (resultados.length === 0) {
        alert("Nenhuma festa encontrada nessa cidade.");
        return;
    }

    resultados.forEach(festa => {
        L.marker([festa.lat, festa.lng])
            .addTo(mapa)
            .bindPopup(`🎉 ${festa.nome}`);
    });

    mapa.setView([resultados[0].lat, resultados[0].lng], 14);
}

/* ----------- DEIXAR FUNÇÕES DISPONÍVEIS PARA O HTML ----------- */
window.mostrarFeed = mostrarFeed;
window.usarLocalizacao = usarLocalizacao;
window.buscarFestas = buscarFestas;
