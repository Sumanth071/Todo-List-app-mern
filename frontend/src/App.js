import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

// ✅ Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(API_URL, { text });
      setTodos([...todos, res.data]);
      setText('');
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await axios.put(`${API_URL}/${todo._id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === res.data._id ? res.data : t)));
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>📝 Advanced To-Do List</h1>
        <div className="input-area">
          <input
            type="text"
            placeholder="Add your task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleComplete(todo)}>{todo.text}</span>
              <button className="delete" onClick={() => deleteTodo(todo._id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
