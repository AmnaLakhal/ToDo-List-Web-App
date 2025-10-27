const request = require('supertest');
process.env.JWT_SECRET = 'test-secret';
const app = require('../app');
const { db, migrate } = require('../db');
const jwt = require('jsonwebtoken');

describe('Authentication Middleware', () => {
  beforeEach(() => {
    db.exec('DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS users;');
    migrate();
  });

  test('missing authorization header', async () => {
    const res = await request(app).get('/tasks').expect(401);
    expect(res.body.error).toBe('Missing token');
  });

  test('invalid authorization format', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', 'InvalidFormat token123')
      .expect(401);
    expect(res.body.error).toBe('Missing token');
  });

  test('invalid JWT token', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', 'Bearer invalid.jwt.token')
      .expect(401);
    expect(res.body.error).toBe('Invalid token');
  });

  test('expired JWT token', async () => {
    // Create an expired token
    const expiredToken = jwt.sign(
      { email: 'test@test.com' },
      process.env.JWT_SECRET,
      { subject: '1', expiresIn: '-1h' } // Expired 1 hour ago
    );

    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401);
    expect(res.body.error).toBe('Invalid token');
  });

  test('valid token but user not found', async () => {
    // Create a token for a non-existent user
    const fakeToken = jwt.sign(
      { email: 'nonexistent@test.com' },
      process.env.JWT_SECRET,
      { subject: '999', expiresIn: '1h' }
    );

    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(401);
    expect(res.body.error).toBe('Invalid token');
  });

  test('valid token and existing user', async () => {
    // Register a user first
    await request(app)
      .post('/auth/register')
      .send({ email: 'valid@test.com', password: 'password123' })
      .expect(201);

    // Login to get a valid token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'valid@test.com', password: 'password123' })
      .expect(200);

    // Use the token to access protected route
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .expect(200);
    
    expect(Array.isArray(res.body)).toBe(true);
  });
});