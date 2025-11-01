import React, { useState, useRef, useEffect } from 'react'
import '/src/Css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaPenToSquare } from 'react-icons/fa6'
import axios from 'axios'
import api from "../api";
import Navbar from "/src/Components/Navbar";



const Home = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [user, setUser] = useState(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setItems(res.data);
    } catch (err) {
      console.error('Fetch tasks failed', err);
      // if 401 -> redirect to login
      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get('/user');
      console.log("Fetched User:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed", err);
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };


  const handleAdd = async () => {
    if (!newItem.trim()) return;
    try {
      const res = await api.post('/tasks', { title: newItem });
      setItems(prev => [res.data, ...prev]);
      setNewItem('');
    } catch (err) {
      console.error('Failed to add task', err);
      if (err.response?.status === 401) window.location.href = '/login';
    }
  };

  const handleCheckbox = async (id) => {
    const task = items.find(t => t.id === id);
    if (!task) return;
    try {
      const res = await api.put(`/tasks/${id}`, { completed: !task.completed });
      setItems(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/tasks/${id}`, { title: editingText });
      setItems(prev => prev.map(t => t.id === id ? res.data : t));
      setEditingId(null);
      setEditingText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setItems(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
    <Navbar user={user}/>
    <div className="main-container">
      <div className="description">
        <h1>Stay organized every day!</h1>
        <p>Create tasks, track progress, and boost your productivity with our smart To-Do List app.</p>
      </div>
      <div className="inner-container">
        <h2>{user?.name}'s To-Do List </h2>

        <div className="add-bar">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter a Task"
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ul id="taskList">
          {items.map((item) => (
            <li key={item.id} className="list-container">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheckbox(item.id)}
              />

              {editingId === item.id ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <label
                  style={{
                    textDecoration: item.completed ? "line-through" : "",
                  }}
                >
                  {item.title}
                </label>
              )}

              {editingId === item.id ? (
                <button className="save-btn" onClick={() => saveEdit(item.id)}>
                  Save
                </button>
              ) : (
                <button className="edit-btn" onClick={() => startEdit(item)}>
                  <FaPenToSquare />
                </button>
              )}

              <button
                onClick={() => handleDelete(item.id)}
                className="delete-btn"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Home
