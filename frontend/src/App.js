import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api/todos';

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: false }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...todoToUpdate, 
          completed: !todoToUpdate.completed 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const updatedTodo = await response.json();
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Todo List</h1>
        
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        <AddTodoForm handleAddTodo={handleAddTodo} />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList 
            todos={todos} 
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        )}

        <div className="stats">
          <p>
            Total: {todos.length} | 
            Completed: {todos.filter(todo => todo.completed).length} | 
            Remaining: {todos.filter(todo => !todo.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;