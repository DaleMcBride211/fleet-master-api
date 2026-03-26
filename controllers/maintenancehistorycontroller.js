const maintenanceHistory = require('../models/maintenancehistory');

const getAllMaintenanceHistory = async (req, res) => {
    // #swagger.tags = ['Maintenance History']
    // #swagger.description = 'Retrieve all maintenance history records from the database.'
        /* #swagger.responses[200] = {
            description: 'Array of maintenance history records retrieved successfully.',
            schema: [{
                assetId: '60d0fe4f5311236168a109ca',
                serviceDate: '2024-02-20T00:00:00Z',
                description: 'Replaced propellers and updated firmware.',
                cost: 150,
                performedBy: 'John Doe',
                nextServiceDue: '2024-08-20T00:00:00Z'
            }]
    } */
    try {
        const history = await maintenanceHistory.find();
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleMaintenanceHistory = async (req, res) => {
    // #swagger.tags = ['Maintenance History']
    // #swagger.description = 'Get a single maintenance history record by its MongoDB ID.'
    /* #swagger.parameters['id'] = { description: 'Maintenance history record ID' } */
    try {
        const record = await maintenanceHistory.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } 
};

module.exports = {
    getAllMaintenanceHistory,
    getSingleMaintenanceHistory
};