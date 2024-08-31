const pool = require("../db"); // Verifique o caminho correto

// Obter todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Atualizar uma tarefa existente
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updates = [];
  const values = [];

  if (title !== undefined) {
    updates.push(`title = $${updates.length + 1}`);
    values.push(title);
  }

  if (completed !== undefined) {
    updates.push(`completed = $${updates.length + 1}`);
    values.push(completed);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  values.push(id);

  try {
    const query = `UPDATE tasks SET ${updates.join(
      ", "
    )}, updated_at = CURRENT_TIMESTAMP WHERE id = $${
      values.length
    } RETURNING *`;
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
