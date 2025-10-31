import React, { useState, useRef, useEffect } from 'react'
import '/src/Css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaPenToSquare } from 'react-icons/fa6'
import axios from 'axios'

const API_URL = "http://localhost:8000/tasks";

const Home = () => {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")
  const editInputRef = useRef(null)

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) =>setItems(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingId])

  const handleAdd = () => {
    if (!newItem.trim()) return

    axios.post(API_URL, { title: newItem })
      .then(res => {
        setItems(prev => [res.data, ...prev])
        setNewItem("")
      })
      .catch(err => console.error('Failed to add task:', err))
  }

  const handleCheckbox = (id) => {
    const task = items.find(item => item.id === id)
    if (!task) return

    axios.put(`${API_URL}/${id}`, { completed: !task.completed })
      .then(res => {
        setItems(prev =>
          prev.map(item =>
            item.id === id ? res.data : item
          )
        )
      })
      .catch(err => console.error('Failed to update task:', err))
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setEditingText(item.title)
  }

  const saveEdit = (id) => {
    if (!editingText.trim()) return

    axios.put(`${API_URL}/${id}`, { title: editingText })
      .then(res => {
        setItems(prev =>
          prev.map(item =>
            item.id === id ? res.data : item
          )
        )
        setEditingId(null)
        setEditingText("")
      })
      .catch(err => console.error('Failed to edit task:', err))
  }

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(prev => prev.filter(item => item.id !== id))
      })
      .catch(err => console.error('Failed to delete task:', err))
  }

  return (
    <div className="main-container">
      <div className="description">
        <h1>Stay organized every day!</h1>
        <p>Create tasks, track progress, and boost your productivity with our smart To-Do List app.</p>
      </div>
      <div className="inner-container">
        <h1>TO-DO LIST</h1>

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
  )
}

export default Home
