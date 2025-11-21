require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MySQL usando variáveis do .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("❌ Erro ao conectar ao banco:", err.message);
        return;
    }
    console.log("✅ Conexão bem-sucedida com o MySQL!");
});

// Rota para salvar login (ESSA É A SUA ORIGINAL)
app.post("/salvar-login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.json({ ok: false, mensagem: "Email e senha são obrigatórios." });
    }

    const sql = "INSERT INTO logins (email, senha) VALUES (?, ?)";
    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log("❌ Erro ao salvar:", err.message);
            return res.json({ ok: false, mensagem: "Erro ao salvar login." });
        }

        return res.json({ ok: true, mensagem: "Login salvo com sucesso!" });
    });
});

// Rota para listar logins salvos
app.get("/logins", (req, res) => {
    const sql = "SELECT * FROM logins";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("❌ Erro ao buscar logins:", err.message);
            return res.json({ ok: false, mensagem: "Erro ao buscar logins." });
        }

        return res.json({ ok: true, logins: results });
    });
});

// Inicializando servidor
app.listen(3000, () => {
    console.log("🚀 API rodando em http://localhost:3000");
});
