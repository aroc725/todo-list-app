const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;

// let todos = [
//     { id: 1, text: 'Learn React' },
//     { id: 2, text: 'Build a server with Express' },
//     { id: 3, text: 'Connect frontend and backend' },
//     ];
let todos = [];

app.use(cors());
app.use(express.json());

app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todoText = req.body.text;

  let largestId = 0;
  let ids = [];
  if (todos.length > 0) {
    ids = todos.map(todo => todo.id);
  }
  if (ids.length > 0) {
    largestId = Math.max(...ids);
    if (!largestId || largestId == null) {
      largestId = 0;
    }
  }

  const newTodo = { id: largestId + 1, text: todoText, completed: false };
  todos.push(newTodo);

  res.json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos = todos.filter(todo => todo.id != todoId);

  res.json(todos);
});

app.put("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { completed } = req.body;
  
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.completed = completed;
  res.json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
