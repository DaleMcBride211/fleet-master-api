process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');

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

// Mock the Mongoose model
jest.mock('../models/maintenancehistory');
const MaintenanceHistory = require('../models/maintenancehistory');

const app = require('../server');

describe('Maintenance History API Tests', () => {

    beforeEach(() => {
        // Clear all mock data before each test runs
        jest.clearAllMocks();
    });

    // Clean up connections after all tests finish
    afterAll(async () => {
        // If your server connects to mongoose, this helps prevent the open handle warning
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    });

    // --- CREATE TESTS ---
    test('Asset ID is required when Creating a Maintenance Record', async () => {
        const res = await request(app)
            .post('/maintenancehistory')
            .send({
                description: 'Replaced propellers and updated firmware.',
                cost: 150
            });
            
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Asset ID and description are required');
    });

    test('Description is required when Creating a Maintenance Record', async () => {
        const res = await request(app)
            .post('/maintenancehistory')
            .send({
                assetId: '60d0fe4f5311236168a109ca',
                cost: 150
            });
            
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Asset ID and description are required');
    });

    test('Creates a Maintenance Record successfully', async () => {
        // Mock the Mongoose save function
        const mockSave = jest.fn().mockResolvedValue({
            assetId: '60d0fe4f5311236168a109ca',
            description: 'Replaced propellers and updated firmware.',
            _id: 'mocked_id_123'
        });
        MaintenanceHistory.mockImplementation(() => ({ save: mockSave }));

        const res = await request(app)
            .post('/maintenancehistory')
            .send({
                assetId: '60d0fe4f5311236168a109ca',
                description: 'Replaced propellers and updated firmware.'
            });
            
        expect(res.statusCode).toBe(201);
        expect(res.body.assetId).toBe('60d0fe4f5311236168a109ca');
    });

    // --- GET ALL TESTS ---
    test('Get all maintenance history records returns 200 and an array', async () => {
        MaintenanceHistory.find.mockResolvedValue([
            { assetId: '60d0fe4f5311236168a109ca', description: 'Test 1' },
            { assetId: '60d0fe4f5311236168a109cb', description: 'Test 2' }
        ]);

        const res = await request(app).get('/maintenancehistory');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    // --- GET SINGLE TESTS ---
    test('Get single maintenance history returns 404 if record not found', async () => {
        MaintenanceHistory.findById.mockResolvedValue(null);

        const res = await request(app).get('/maintenancehistory/60d0fe4f5311236168a109ca');
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Record not found');
    });

    test('Get single maintenance history returns 200 if found', async () => {
        MaintenanceHistory.findById.mockResolvedValue({
            _id: '60d0fe4f5311236168a109ca',
            description: 'Oil change'
        });

        const res = await request(app).get('/maintenancehistory/60d0fe4f5311236168a109ca');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.description).toBe('Oil change');
    });

    // --- UPDATE TESTS ---
    test('Update maintenance history returns 404 if record not found', async () => {
        MaintenanceHistory.findByIdAndUpdate.mockResolvedValue(null);

        const res = await request(app)
            .put('/maintenancehistory/60d0fe4f5311236168a109ca')
            .send({ cost: 200 });
            
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Record not found');
    });

    test('Update maintenance history returns 200 on successful update', async () => {
        MaintenanceHistory.findByIdAndUpdate.mockResolvedValue({
            _id: '60d0fe4f5311236168a109ca',
            cost: 200
        });

        const res = await request(app)
            .put('/maintenancehistory/60d0fe4f5311236168a109ca')
            .send({ cost: 200 });
            
        expect(res.statusCode).toBe(200);
        expect(res.body.cost).toBe(200);
    });

    // --- DELETE TESTS ---
    test('Delete maintenance history returns 404 if record not found', async () => {
        MaintenanceHistory.findByIdAndDelete.mockResolvedValue(null);

        const res = await request(app).delete('/maintenancehistory/60d0fe4f5311236168a109ca');
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Record not found');
    });

    test('Delete maintenance history returns 200 on successful deletion', async () => {
        MaintenanceHistory.findByIdAndDelete.mockResolvedValue({ _id: '60d0fe4f5311236168a109ca' });

        const res = await request(app).delete('/maintenancehistory/60d0fe4f5311236168a109ca');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Record deleted successfully');
    });

});