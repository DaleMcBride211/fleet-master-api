const Assets = require('../models/assets');
const { getAllAssets, getSingleAsset, createAsset, updateAsset, deleteAsset } = require('../controllers/assetscontroller');


// Mocking to test the AssetsController without "touching" the database
jest.mock('../models/assets', () => ({
    find: jest.fn(),
    findById: jest.fn()
}));
