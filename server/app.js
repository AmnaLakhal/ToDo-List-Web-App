require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { migrate } = require('./db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

migrate();

if (process.env.NODE_ENV !== 'test') {
  if (!process.env.JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is missing. Create a .env file (see .env.example) and restart.');
    process.exit(1);
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}

module.exports = app;
