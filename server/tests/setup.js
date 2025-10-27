// Global test setup
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-jest-tests';

// Increase timeout for integration tests
jest.setTimeout(10000);

// Global test utilities
global.testUtils = {
  validEmail: 'test@example.com',
  validPassword: 'password123',
  invalidEmail: 'invalid-email',
  shortPassword: 'short',
  
  // Helper to create test user data
  createUserData: (overrides = {}) => ({
    email: 'test@example.com',
    password: 'password123',
    ...overrides
  }),
  
  // Helper to create test task data
  createTaskData: (overrides = {}) => ({
    title: 'Test Task',
    completed: false,
    ...overrides
  })
};

// Suppress console.error during tests unless explicitly needed
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (args[0]?.includes?.('FATAL') || args[0]?.includes?.('Register error') || args[0]?.includes?.('Login error')) {
      // Allow these specific errors to be logged
      originalError(...args);
    }
    // Suppress other console.error calls during tests
  };
});

afterAll(() => {
  console.error = originalError;
});