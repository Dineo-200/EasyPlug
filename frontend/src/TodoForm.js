import React, { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  completed: false,
};

function TodoForm({ todo, onSave, onCancel }) {
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (todo) {
      setFormState(todo);
      setError('');
    } else {
      setFormState(initialState);
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.title.trim()) {
      setError('Please enter a title.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(todo?.id, formState);
      setFormState(initialState);
    } catch (err) {
      setError(err.message || 'Unable to save todo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="todo-form-card">
      <h2>{todo ? 'Edit todo' : 'Add a new todo'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Enter task title"
            autoComplete="off"
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Optional details"
          />
        </label>
        {todo && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="completed"
              checked={formState.completed}
              onChange={handleChange}
            />
            Mark as completed
          </label>
        )}
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : todo ? 'Update todo' : 'Create todo'}
          </button>
          {todo && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
