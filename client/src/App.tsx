import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const updateTask = async (id: number, completed: boolean) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      completed: !completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        To-Do List
      </Typography>
      <TextField
        label="Nova Tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        fullWidth
      />
      <Button onClick={addTask} variant="contained" color="primary">
        Adicionar
      </Button>
      <List>
        {tasks.map((task: any) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => updateTask(task.id, task.completed)}
            />
            {task.title}
            <IconButton onClick={() => deleteTask(task.id)} edge="end">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
