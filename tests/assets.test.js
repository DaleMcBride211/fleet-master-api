process.env.NODE_ENV = 'test';

const request = require('supertest');

// Mock DB
jest.mock('../config/db', () => jest.fn());

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

const app = require('../server');

describe('Assets API Tests', () => {
    
    test ('Type must be Drone, Vehicle, or Equip when Creating an Asset', async () => {
        const res = await request(app)
            .post('/assets')
            .send({
                type: 'InvalidType',
                model: 'Test Model',
                serialNumber: '12345'
            });
        expect(res.statusCode).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].msg).toBe('Type must be Drone, Vehicle, or Equip');
    });

    test('Model is required when Creating an Asset', async () => {
        const res = await request(app)
            .post('/assets')
            .send({
                type: 'Drone',
                serialNumber: '12345'
            });
        expect(res.statusCode).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].msg).toBe('Model is required');
    });


    test('Serial Number is required when Updating an Asset', async () => {
        const res = await request(app)
            .put('/assets/123')
            .send({
                type: 'Drone',
                model: 'Test Model'
            });
        expect(res.statusCode).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].msg).toBe('Serial Number is required');
    });

    test ('Status must be Active, Maintenance, or Deployed when Updating an Asset', async () => {
        const res = await request(app)
            .put('/assets/123')
            .send({
                type: 'Drone',
                model: 'Test Model',
                serialNumber: '12345',
                status: 'InvalidStatus'
            });
        expect(res.statusCode).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].msg).toBe('Status must be Active, Maintenance, or Deployed');
    });
    
});

