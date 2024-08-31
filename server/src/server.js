const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Importar as rotas de tarefas
const taskRoutes = require("./routes/tasks");

// Configurar as rotas
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
