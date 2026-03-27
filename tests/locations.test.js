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

// Mock assets route
jest.mock('../routes/assets', () => {
    const express = require('express');
    return express.Router();
});

// Mock locations model (IMPORTANT: plural)
jest.mock('../models/locations', () => {
    return jest.fn().mockImplementation(() => {
        return {
            save: jest.fn().mockResolvedValue({
                _id: '123',
                name: 'Test Location',
                coordinates: { lat: 40, lng: -111 }
            })
        };
    });
});

const app = require('../server');

describe('Locations API Tests', () => {

    test('Should allow missing name (current behavior)', async () => {
        const res = await request(app)
            .post('/locations')
            .send({
                coordinates: { lat: 40, lng: -111 }
            });

        expect(res.statusCode).toBe(201);
    });

    test('Should allow missing coordinates (current behavior)', async () => {
        const res = await request(app)
            .post('/locations')
            .send({
                name: 'Test Location'
            });

        expect(res.statusCode).toBe(201);
    });

    test('Should succeed with valid data', async () => {
        const res = await request(app)
            .post('/locations')
            .send({
                name: 'Test Location',
                coordinates: { lat: 40, lng: -111 }
            });

        expect(res.statusCode).toBe(201);
    });

});