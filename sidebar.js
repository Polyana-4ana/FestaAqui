// Carregar sidebar automaticamente em todas as páginas
async function carregarSidebar() {
    try {
        const resposta = await fetch("../components/sidebar.html");
        const texto = await resposta.text();
        document.getElementById("sidebar-container").innerHTML = texto;
    } catch (err) {
        console.error("Erro ao carregar sidebar:", err);
    }
}

// Navegar entre páginas
function navegar(pagina) {
    window.location.href = pagina;
}
