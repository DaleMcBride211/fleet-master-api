const Users = require('../models/users');


const getAllAssets = async (req, res, next) => {
    // #swagger.tags = ['Assets']
    // #swagger.description = 'Retrieve all assets from the database.'
    /* #swagger.responses[200] = {
            description: 'Array of assets retrieved successfully.',
            schema: [{
                type: 'Drone',
                model: 'DJI Mavic Air 2',
                serialNumber: 'SN123456789',
                status: 'Active',
                purchaseDate: '2024-01-15T00:00:00Z',
                assignedTo: '60d0fe4f5311236168a109ca',
                currentLocationId: '60d0fe4f5311236168a109cb',
                specs: {
                    weight: 570,
                    dimensions: '183x253x77 mm',
                    batteryCapacity: '3500 mAh',
                    powerSource: 'LiPo'
                }
            }]
    } */
    try {
        const assets = await Users.find();
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleAsset = async (req, res) => {
    // #swagger.tags = ['Assets']
    // #swagger.description = 'Get a single asset by its MongoDB ID.'
    /* #swagger.parameters['id'] = { description: 'Asset ID' } */
    try {
        const asset = await Users.findById(req.params.id);
        if (!asset) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(asset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createAsset = async (req, res) => {
    /* #swagger.tags = ['Assets']
        #swagger.description = 'Create a new asset.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Asset information',
            required: true,
            schema: {
                type: 'Drone',
                model: 'DJI Mavic Air 2',
                serialNumber: 'SN123456789',
                status: 'Active',
                purchaseDate: '2024-01-15T00:00:00Z',
                assignedTo: '60d0fe4f5311236168a109ca',
                currentLocationId: '60d0fe4f5311236168a109cb',
                specs: {
                    weight: 570,
                    dimensions: '183x253x77 mm',
                    batteryCapacity: '3500 mAh',
                    powerSource: 'LiPo'
                }
            }
        }
    */
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }
        const newAsset = new Users(req.body);
        const savedAsset = await newAsset.save();
        res.status(201).json(savedAsset);
    } catch (err) {
        res.status(400).json({ message: "Error creating record", error: err.message });
    }
};

const updateAsset = async (req, res) => {
    /* #swagger.tags = ['Assets']
        #swagger.description = 'Update an existing asset by ID.'
        #swagger.parameters['id'] = { description: 'Asset ID' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated asset data',
            required: true,
            schema: {
                status: 'Maintenance'
            }
        }
    */
    try {
        const updatedAsset = await Users.findByIdAndUpdate(req.params
.id, req.body, { new: true, runValidators: true });
        if (!updatedAsset) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(updatedAsset);
    } catch (err) {
        res.status(400).json({ message: "Error updating record", error: err.message });
    }
};

const deleteAsset = async (req, res) => {
    /* #swagger.tags = ['Assets']
        #swagger.description = 'Delete an asset by ID.'
        #swagger.parameters['id'] = { description: 'Asset ID' }
    */
    try {
        const deleted = await Users.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record deleted successfully" });
    }
    catch (err) {        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAssets,
    getSingleAsset,
    createAsset,
    updateAsset,
    deleteAsset
};