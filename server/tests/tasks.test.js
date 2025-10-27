const request = require('supertest');
process.env.JWT_SECRET = 'test-secret';
const app = require('../app');
const { db, migrate } = require('../db');

async function registerAndLogin(email='u@u.com') {
  await request(app).post('/auth/register').send({ email, password: 'password123' });
  const { body } = await request(app).post('/auth/login').send({ email, password: 'password123' });
  return body.token;
}

describe('Tasks CRUD + permissions', () => {
  beforeEach(() => {
    db.exec('DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS users;');
    migrate();
  });

  test('CRUD flow', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    const created = await request(app).post('/tasks').set(auth).send({ title: 'Task 1' }).expect(201);
    const id = created.body.id;

    const list1 = await request(app).get('/tasks').set(auth).expect(200);
    expect(list1.body.length).toBe(1);

    const one = await request(app).get(`/tasks/${id}`).set(auth).expect(200);
    expect(one.body.title).toBe('Task 1');

    const updated = await request(app).put(`/tasks/${id}`).set(auth).send({ completed: true }).expect(200);
    expect(updated.body.completed).toBe(1);

    await request(app).delete(`/tasks/${id}`).set(auth).expect(204);

    const list2 = await request(app).get('/tasks').set(auth).expect(200);
    expect(list2.body.length).toBe(0);
  });

  test('permission: cannot access others\' tasks', async () => {
    const t1 = await registerAndLogin('a1@a.com');
    const t2 = await registerAndLogin('a2@a.com');

    const { body } = await request(app).post('/tasks').set({ Authorization: `Bearer ${t1}` }).send({ title: 'Mine' });
    const id = body.id;

    await request(app).get(`/tasks/${id}`).set({ Authorization: `Bearer ${t2}` }).expect(404);
  });

  test('tasks require authentication', async () => {
    // Test without token
    await request(app).get('/tasks').expect(401);
    await request(app).post('/tasks').send({ title: 'Test' }).expect(401);
    await request(app).put('/tasks/1').send({ title: 'Test' }).expect(401);
    await request(app).delete('/tasks/1').expect(401);
  });

  test('task validation', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    // Test empty title
    await request(app).post('/tasks').set(auth).send({ title: '' }).expect(400);
    await request(app).post('/tasks').set(auth).send({ title: '   ' }).expect(400);
    await request(app).post('/tasks').set(auth).send({}).expect(400);
  });

  test('update task title and completion', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    // Create task
    const created = await request(app).post('/tasks').set(auth).send({ title: 'Original Title' }).expect(201);
    const id = created.body.id;

    // Update title only
    const updated1 = await request(app).put(`/tasks/${id}`).set(auth).send({ title: 'New Title' }).expect(200);
    expect(updated1.body.title).toBe('New Title');
    expect(updated1.body.completed).toBe(0);

    // Update completion only
    const updated2 = await request(app).put(`/tasks/${id}`).set(auth).send({ completed: true }).expect(200);
    expect(updated2.body.title).toBe('New Title');
    expect(updated2.body.completed).toBe(1);

    // Update both
    const updated3 = await request(app).put(`/tasks/${id}`).set(auth).send({ title: 'Final Title', completed: false }).expect(200);
    expect(updated3.body.title).toBe('Final Title');
    expect(updated3.body.completed).toBe(0);
  });

  test('delete non-existent task', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    await request(app).delete('/tasks/999').set(auth).expect(404);
  });

  test('update non-existent task', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    await request(app).put('/tasks/999').set(auth).send({ title: 'Test' }).expect(404);
  });

  test('get non-existent task', async () => {
    const token = await registerAndLogin();
    const auth = { Authorization: `Bearer ${token}` };

    await request(app).get('/tasks/999').set(auth).expect(404);
  });
});
