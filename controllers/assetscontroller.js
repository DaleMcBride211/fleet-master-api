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
    
module.exports = {
    getAllAssets,
    getSingleAsset
};