process.env.JWT_SECRET = 'test-secret';
const { db, migrate } = require('../db');
const { createUser, getUserByEmail, getUserById } = require('../models/userModel');
const { createTask, listTasks, getTask, updateTask, deleteTask } = require('../models/taskModel');

describe('User Model', () => {
  beforeEach(() => {
    db.exec('DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS users;');
    migrate();
  });

  test('createUser', () => {
    const user = createUser('test@test.com', 'hashedpassword');
    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@test.com');
    expect(user.created_at).toBeDefined();
  });

  test('getUserByEmail', () => {
    createUser('find@test.com', 'hashedpassword');
    const user = getUserByEmail.get('find@test.com');
    expect(user.email).toBe('find@test.com');
    expect(user.password_hash).toBe('hashedpassword');
  });

  test('getUserById', () => {
    const created = createUser('findid@test.com', 'hashedpassword');
    const user = getUserById.get(created.id);
    expect(user.email).toBe('findid@test.com');
    expect(user.id).toBe(created.id);
  });

  test('getUserByEmail returns undefined for non-existent user', () => {
    const user = getUserByEmail.get('nonexistent@test.com');
    expect(user).toBeUndefined();
  });
});

describe('Task Model', () => {
  let userId;

  beforeEach(() => {
    db.exec('DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS users;');
    migrate();
    const user = createUser('taskuser@test.com', 'hashedpassword');
    userId = user.id;
  });

  test('createTask', () => {
    const task = createTask(userId, 'Test Task');
    expect(task.id).toBeDefined();
    expect(task.user_id).toBe(userId);
    expect(task.title).toBe('Test Task');
    expect(task.completed).toBe(0);
    expect(task.created_at).toBeDefined();
  });

  test('listTasks', () => {
    createTask(userId, 'Task 1');
    createTask(userId, 'Task 2');
    
    const tasks = listTasks(userId);
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Task 2'); // Should be ordered by id DESC
    expect(tasks[1].title).toBe('Task 1');
  });

  test('getTask', () => {
    const created = createTask(userId, 'Get This Task');
    const task = getTask(userId, created.id);
    expect(task.title).toBe('Get This Task');
    expect(task.user_id).toBe(userId);
  });

  test('updateTask', () => {
    const created = createTask(userId, 'Original Title');
    
    // Update title
    const updated1 = updateTask(userId, created.id, { title: 'New Title' });
    expect(updated1.title).toBe('New Title');
    expect(updated1.completed).toBe(0);
    expect(updated1.updated_at).toBeDefined();

    // Update completion
    const updated2 = updateTask(userId, created.id, { completed: true });
    expect(updated2.title).toBe('New Title');
    expect(updated2.completed).toBe(1);

    // Update both
    const updated3 = updateTask(userId, created.id, { title: 'Final Title', completed: false });
    expect(updated3.title).toBe('Final Title');
    expect(updated3.completed).toBe(0);
  });

  test('deleteTask', () => {
    const created = createTask(userId, 'Delete Me');
    
    const deleted = deleteTask(userId, created.id);
    expect(deleted).toBe(true);

    const task = getTask(userId, created.id);
    expect(task).toBeUndefined();
  });

  test('task operations with wrong user', () => {
    const user2 = createUser('user2@test.com', 'hashedpassword');
    const task = createTask(userId, 'User 1 Task');

    // User 2 cannot access User 1's task
    const retrieved = getTask(user2.id, task.id);
    expect(retrieved).toBeUndefined();

    const updated = updateTask(user2.id, task.id, { title: 'Hacked' });
    expect(updated).toBeNull();

    const deleted = deleteTask(user2.id, task.id);
    expect(deleted).toBe(false);
  });

  test('listTasks returns empty array for user with no tasks', () => {
    const user2 = createUser('notasks@test.com', 'hashedpassword');
    const tasks = listTasks(user2.id);
    expect(tasks).toEqual([]);
  });

  test('updateTask with non-existent task', () => {
    const updated = updateTask(userId, 999, { title: 'Does not exist' });
    expect(updated).toBeNull();
  });

  test('deleteTask with non-existent task', () => {
    const deleted = deleteTask(userId, 999);
    expect(deleted).toBe(false);
  });
});