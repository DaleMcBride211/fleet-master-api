const Assets = require('../models/assets');
const { getAllAssets, getSingleAsset, createAsset, updateAsset, deleteAsset } = require('../controllers/assetscontroller');


// Mocking to test the AssetsController without "touching" the database.
jest.mock('../models/assets', () => ({
    find: jest.fn(),
    findById: jest.fn()
}));

// This function creates a mock response object for testing. 
const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};



