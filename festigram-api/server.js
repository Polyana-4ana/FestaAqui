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
        console.log("❌ Erro ao conectar ao banco:", err);
        return;
    }
    console.log("✅ Banco conectado!");
});

// Rota para salvar login
app.post("/salvar-login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    const sql = "INSERT INTO logins (email, senha) VALUES (?, ?)";

    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log("❌ Erro ao salvar:", err);
            return res.status(500).send("Erro ao salvar login.");
        }

        res.send("Login salvo com sucesso!");
    });
});

// Inicializando servidor
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});
