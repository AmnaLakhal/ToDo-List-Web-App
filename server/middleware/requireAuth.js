const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists in database
    const user = getUserById.get(payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = { id: user.id, email: user.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
