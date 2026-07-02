import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css';

const API_URL = 'http://localhost:4000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      setError('Unable to load todos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);
      setTodos((prev) => [...prev, response.data]);
      setEditingTodo(null);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create todo.';
      throw new Error(message);
    }
  };

  const handleUpdate = async (id, todoData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, todoData);
      setTodos((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      setEditingTodo(null);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update todo.';
      throw new Error(message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError('Unable to delete todo.');
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const response = await axios.put(`${API_URL}/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((item) => (item.id === todo.id ? response.data : item)));
    } catch (err) {
      setError('Unable to update todo status.');
    }
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <header>
          <h1>EasyPlug Todo</h1>
          <p>Track tasks with a clean todo list and sync with the backend.</p>
        </header>

        <main>
          <section className="todo-form-section">
            <TodoForm
              key={editingTodo?.id || 'new'}
              todo={editingTodo}
              onSave={editingTodo ? handleUpdate : handleCreate}
              onCancel={() => setEditingTodo(null)}
            />
          </section>

          <section className="todo-list-section">
            {loading ? (
              <div className="status-message">Loading todos…</div>
            ) : error ? (
              <div className="status-message error">{error}</div>
            ) : todos.length === 0 ? (
              <div className="status-message">No todos yet. Add one to get started.</div>
            ) : (
              <TodoList
                todos={todos}
                onEdit={setEditingTodo}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
