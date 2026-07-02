const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const yup = require('yup');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'todos.json');

app.use(cors());
app.use(express.json());

const readTodos = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    return [];
  }
};

const writeTodos = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

const todoSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  completed: yup.boolean().default(false),
});

app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find((item) => item.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

app.post('/api/todos', async (req, res) => {
  try {
    const validated = await todoSchema.validate(req.body, { abortEarly: false });
    const todos = readTodos();
    const newTodo = {
      id: uuidv4(),
      title: validated.title,
      description: validated.description || '',
      completed: validated.completed || false,
      created_at: new Date().toISOString(),
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', errors: error.errors });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const validated = await todoSchema.validate(req.body, { abortEarly: false });
    const updatedTodo = {
      ...todos[index],
      title: validated.title,
      description: validated.description || '',
      completed: validated.completed || false,
    };
    todos[index] = updatedTodo;
    writeTodos(todos);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', errors: error.errors });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todos.splice(index, 1);
  writeTodos(todos);
  res.json({ message: 'Todo deleted' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`EasyPlug backend running on http://localhost:${PORT}`);
});
