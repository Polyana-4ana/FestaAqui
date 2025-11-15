function mostrarFeed(id) {
    document.querySelectorAll('.feed')
        .forEach(f => f.style.display = "none");

    document.getElementById(id).style.display = "block";
}

/* MAPA */
let mapa = L.map('mapa').setView([-30.0346, -51.2177], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(mapa);

let marcador;

function usarLocalizacao() {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        if (marcador) marcador.remove();

        marcador = L.marker([lat, lon]).addTo(mapa);

        mapa.setView([lat, lon], 14);
    });
}

function buscarFestas() {
    alert("A busca por cidades será conectada com sua API Node.");
}
