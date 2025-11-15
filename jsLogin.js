let email = document.getElementById('email')
let senha = document.getElementById('senha')
let mensagem = document.querySelector('.mensagem')
let BtEntrar = document.querySelector('.BtEntrar')
mensagem.classList.add('escondido')
BtEntrar.classList.add('escondido')

let emailCorreto = "email"
let senhaCorreta = "senha"

const ce = ["@polyaha", "@vinicius", "@arthur", "@ana laura"]

function login() {
    if (email.value in ce ) {
        BtEntrar.classList.remove('escondido')
    } else {
        mensagem.textContent = "Verifique os campos de Email e Senha"
       // BtEntrar.classList.remove('escondido')
    }
}


// || senha.value == ''
// || senha.value == ''