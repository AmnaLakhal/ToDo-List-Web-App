const request = require('supertest');
process.env.JWT_SECRET = 'test-secret';
const app = require('../app');
const { db, migrate } = require('../db');

describe('Auth', () => {
  beforeEach(() => {
    // reset tables for in-memory DB
    db.exec('DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS users;');
    migrate();
  });

  test('register + login success', async () => {
    const email = 'a@b.com';
    const password = 'password123';
    await request(app).post('/auth/register').send({ email, password }).expect(201);
    const res = await request(app).post('/auth/login').send({ email, password }).expect(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
  });

  test('login invalid', async () => {
    await request(app).post('/auth/register').send({ email: 'x@y.com', password: 'password123' }).expect(201);
    await request(app).post('/auth/login').send({ email: 'x@y.com', password: 'wrong' }).expect(401);
  });

  test('register validation', async () => {
    // Test invalid email
    await request(app).post('/auth/register').send({ email: 'invalid', password: 'password123' }).expect(400);
    
    // Test short password
    await request(app).post('/auth/register').send({ email: 'test@test.com', password: 'short' }).expect(400);
    
    // Test duplicate email
    await request(app).post('/auth/register').send({ email: 'dup@test.com', password: 'password123' }).expect(201);
    await request(app).post('/auth/register').send({ email: 'dup@test.com', password: 'password123' }).expect(409);
  });

  test('login without registration', async () => {
    await request(app).post('/auth/login').send({ email: 'notexist@test.com', password: 'password123' }).expect(401);
  });
});
