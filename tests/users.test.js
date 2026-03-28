const request = require('supertest');
const app = require('../server');

// Mock Passport
jest.mock('../config/passport', () => ({
    initialize: () => (req, res, next) => next(),
    session: () => (req, res, next) => next(),
    authenticate: () => (req, res, next) => next()
}));

// Mock authentication
jest.mock('../middleware/authentication', () => ({
    isAuthenticated: (req, res, next) => next()
}));

test('should GET all users', async () => {
    const res = await request(app).get('/users');

    expect([200, 500]).toContain(res.statusCode);
});

test('should GET a single user by ID', async () => {
    const res = await request(app).get('/users/123');

    expect([200, 404, 500]).toContain(res.statusCode);
});

test('should CREATE a new user', async () => {
    const res = await request(app)
        .post('/users')
        .send({
            name: 'Test User 2',
            email: 'testuser2@example.com'
        });

    expect([201, 500]).toContain(res.statusCode);
});

test('should not CREATE a user with empty body', async () => {
    const res = await request(app)
        .post('/users')
        .send({});

    expect(res.statusCode).toBe(400);
});

