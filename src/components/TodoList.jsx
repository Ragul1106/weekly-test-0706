import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('todo-data'));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [taskText, setTaskText] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('todo-data', JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (msg) => {
    setToastMsg(msg);
    // Optional haptic feedback
    if (navigator.vibrate) navigator.vibrate(80);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const addTask = () => {
    if (taskText.trim() === '') return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, text: taskText } : task
      ));
      showToast('✅ Task updated');
      setEditId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        text: taskText,
        completed: false
      }]);
      showToast('📝 Task added');
    }

    setTaskText('');
  };

  const toggleComplete = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    showToast('✅ Status toggled');
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
    showToast('🗑 Task deleted');
  };

  const startEdit = task => {
    setEditId(task.id);
    setTaskText(task.text);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return true;
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <motion.div
      className="todo-container container mt-5 p-4 rounded shadow bg-white mb-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-center mb-4">To-Do List</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={addTask}>
              {editId ? 'Update' : 'Add'}
            </button>
          </div>

          <div className="btn-group w-100 d-flex justify-content-between">
            {['All', 'Active', 'Completed'].map(type => (
              <button
                key={type}
                className={`btn btn-outline-dark flex-fill mx-1 ${filter === type ? 'active' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="list-group">
        <AnimatePresence>
          {filteredTasks.length === 0 && (
            <motion.li
              className="list-group-item text-center text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No tasks found.
            </motion.li>
          )}
          {filteredTasks.map(task => (
            <motion.li
              layout
              key={task.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded ${
                task.completed ? 'bg-success bg-opacity-10' : ''
              }`}
            >
              <span
                className="task-text"
                onClick={() => toggleComplete(task.id)}
                style={{
                  cursor: 'pointer',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  fontWeight: '500'
                }}
              >
                {task.text}
              </span>

              <div>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => startEdit(task)}>✏ Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeTask(task.id)}>🗑 Delete</button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            className="position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
