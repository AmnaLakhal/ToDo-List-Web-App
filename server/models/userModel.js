const { db } = require('../db');

const insertUser = db.prepare('INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)');
const getUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?');
const getUserById = db.prepare('SELECT * FROM users WHERE id = ?');

function createUser(email, passwordHash) {
  const createdAt = new Date().toISOString();
  const info = insertUser.run(email, passwordHash, createdAt);
  return { id: info.lastInsertRowid, email, created_at: createdAt };
}

module.exports = { createUser, getUserByEmail, getUserById };
