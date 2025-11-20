let email = document.getElementById('email')
let senha = document.getElementById('senha')
let mensagem = document.querySelector('.mensagem')
let BtEntrar = document.querySelector('.BtEntrar')

mensagem.classList.add('escondido')
BtEntrar.classList.add('escondido')

async function login() {
    const dados = {
        email: email.value,
        senha: senha.value
    };

    try {
        const resposta = await fetch("http://localhost:3000/salvar-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.ok) {
            mensagem.classList.remove('escondido')
            mensagem.textContent = "Login salvo no banco!"
            BtEntrar.classList.remove('escondido')
        } else {
            mensagem.classList.remove('escondido')
            mensagem.textContent = resultado.mensagem || "Erro ao salvar."
        }

    } catch (error) {
        mensagem.classList.remove('escondido')
        mensagem.textContent = "Erro ao conectar ao servidor."
        console.error(error)
    }
}
