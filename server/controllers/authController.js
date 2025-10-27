const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

function validateEmail(email) {
  return /.+@.+\..+/.test(email);
}

async function register(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!validateEmail(email)) return res.status(400).json({ error: 'Invalid email' });
    if (!password || password.length < 8) return res.status(400).json({ error: 'Password min 8' });
    const existing = getUserByEmail.get(email);
    if (existing) return res.status(409).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = createUser(email, hash);
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    const user = getUserByEmail.get(email || '');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password || '', user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfigured: missing JWT_SECRET' });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { subject: String(user.id), expiresIn: '7d' });
    return res.json({ 
      token: token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

module.exports = { register, login };
