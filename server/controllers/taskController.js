const { createTask, listTasks, getTask, updateTask, deleteTask } = require('../models/taskModel');

function getAll(req, res) {
  const items = listTasks(req.user.id);
  res.json(items);
}

function getOne(req, res) {
  const item = getTask(req.user.id, Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

function create(req, res) {
  const title = (req.body && req.body.title ? String(req.body.title).trim() : '');
  if (!title) return res.status(400).json({ error: 'Title required' });
  const item = createTask(req.user.id, title);
  res.status(201).json(item);
}

function update(req, res) {
  const id = Number(req.params.id);
  const payload = {};
  if (typeof req.body?.title === 'string') payload.title = req.body.title;
  if (typeof req.body?.completed !== 'undefined') payload.completed = req.body.completed;
  
  console.log('Backend update task:', { id, userId: req.user.id, payload, body: req.body });
  
  const item = updateTask(req.user.id, id, payload);
  console.log('Backend update result:', item);
  
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const ok = deleteTask(req.user.id, id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
