const { db } = require('../db');

const insertTask = db.prepare('INSERT INTO tasks (user_id, title, completed, created_at) VALUES (?, ?, 0, ?)');
const getTasksByUser = db.prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC');
const getTaskById = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?');
const updateTaskStmt = db.prepare('UPDATE tasks SET title = ?, completed = ?, updated_at = ? WHERE id = ? AND user_id = ?');
const deleteTaskStmt = db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?');

function createTask(userId, title) {
  const createdAt = new Date().toISOString();
  const info = insertTask.run(userId, title, createdAt);
  return { id: info.lastInsertRowid, user_id: userId, title, completed: false, created_at: createdAt };
}

function listTasks(userId) {
  const tasks = getTasksByUser.all(userId);
  return tasks.map(task => ({
    ...task,
    completed: !!task.completed
  }));
}

function getTask(userId, id) {
  const task = getTaskById.get(id, userId);
  if (!task) return null;
  return {
    ...task,
    completed: !!task.completed
  };
}

function updateTask(userId, id, updates) {
  const now = new Date().toISOString();
  const current = getTask(userId, id);
  if (!current) return null;
  
  const title = updates.title ?? current.title;
  // Convert boolean to integer for database, handling both current (boolean) and updates
  const currentCompletedInt = current.completed ? 1 : 0;
  const completed = updates.completed != null ? (updates.completed ? 1 : 0) : currentCompletedInt;
  
  console.log('UpdateTask debug:', { userId, id, updates, current, title, completed });
  
  const info = updateTaskStmt.run(title, completed, now, id, userId);
  console.log('UpdateTask SQL result:', info);
  
  if (info.changes === 0) return null;
  return { ...current, title, completed: !!completed, updated_at: now };
}

function deleteTask(userId, id) {
  const info = deleteTaskStmt.run(id, userId);
  return info.changes > 0;
}

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
