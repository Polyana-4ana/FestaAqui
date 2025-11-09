const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Conexão com o banco MySQL
async function conectarBanco() {
  try {
    const pool = await mysql.createPool({
      host: "localhost",
      user: "root",
      password: "sua_senha", // substitua
      database: "postgram"
    });

    console.log("✅ Conexão bem-sucedida com o MySQL!");

    // 🎉 Rotas
    app.get("/eventos", async (req, res) => {
      try {
        const [eventos] = await pool.query(`
          SELECT e.id, e.foto_postagem, e.horario_evento, e.curtidas,
                 es.nome AS nome_estabelecimento, es.descricao
          FROM Eventos_Postagens e
          JOIN Estabelecimentos es ON e.id_estabelecimento = es.id
          ORDER BY e.horario_evento DESC
        `);
        res.json(eventos);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).json({ error: "Erro ao buscar eventos." });
      }
    });

    app.get("/eventos/:nome", async (req, res) => {
      const nome = req.params.nome;
      try {
        const [eventos] = await pool.query(`
          SELECT e.id, e.foto_postagem, e.horario_evento, e.curtidas,
                 es.nome AS nome_estabelecimento, es.descricao
          FROM Eventos_Postagens e
          JOIN Estabelecimentos es ON e.id_estabelecimento = es.id
          WHERE LOWER(es.nome) LIKE LOWER(?)
        `, [`%${nome}%`]);
        res.json(eventos);
      } catch (error) {
        console.error("Erro ao buscar eventos por nome:", error);
        res.status(500).json({ error: "Erro ao buscar eventos." });
      }
    });

    const PORT = 3000;
    app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}`));

  } catch (err) {
    console.error("❌ Erro na conexão com o banco:", err);
  }
}

conectarBanco();
