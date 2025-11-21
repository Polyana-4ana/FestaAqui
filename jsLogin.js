let email = document.getElementById('email');
let senha = document.getElementById('senha');
let mensagem = document.querySelector('.mensagem');
let BtEntrar = document.querySelector('.BtEntrar');

async function login() {
    if (!email.value || !senha.value) {
        mensagem.classList.remove('escondido');
        mensagem.textContent = "Preencha email e senha!";
        return;
    }

    const dados = {
        email: email.value,
        senha: senha.value
    };

    try {
        const resposta = await fetch("http://127.0.0.1:3000/salvar-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        mensagem.classList.remove('escondido');

        if (resultado.ok === true) {
            mensagem.textContent = "Login salvo no banco!";
            BtEntrar.classList.remove('escondido');
            email.value = "";
            senha.value = "";
        } else {
            mensagem.textContent = resultado.mensagem || "Erro ao salvar.";
        }

    } catch (error) {
        mensagem.classList.remove('escondido');
        mensagem.textContent = "Erro ao conectar ao servidor.";
        console.error(error);
    }
}
