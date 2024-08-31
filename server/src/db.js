const { Pool } = require("pg");

// Crie uma instância da Pool com a configuração de conexão do PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_list",
  password: "root",
  port: 5432,
});

module.exports = pool;
