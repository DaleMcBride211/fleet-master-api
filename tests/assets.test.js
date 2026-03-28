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

const app = require('../server');

