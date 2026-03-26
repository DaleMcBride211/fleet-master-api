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