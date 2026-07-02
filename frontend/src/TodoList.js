import React from 'react';

function TodoList({ todos, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className="todo-list-card">
      <div className="todo-list-header">
        <h2>Your todos</h2>
        <span>{todos.length} item{todos.length !== 1 ? 's' : ''}</span>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'todo-item completed' : 'todo-item'}>
            <div className="todo-main">
              <button className="todo-toggle" onClick={() => onToggleComplete(todo)}>
                {todo.completed ? '☑' : '☐'}
              </button>
              <div>
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
              </div>
            </div>
            <div className="todo-actions">
              <button className="small" onClick={() => onEdit(todo)}>
                Edit
              </button>
              <button className="small danger" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
