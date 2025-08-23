const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;

let todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a server with Express' },
    { id: 3, text: 'Connect frontend and backend' },
    ];

app.use(cors());
app.use(express.json());

app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todoText = req.body.text;
  console.log("todoText = " + todoText);

  const ids = todos.map(todo => todo.id);
  const largestId = Math.max(...ids);

  const newTodo = { id: largestId + 1, text: todoText };

  todos.push(newTodo);

  res.json(todos);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id != id);

  res.json(todos);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
