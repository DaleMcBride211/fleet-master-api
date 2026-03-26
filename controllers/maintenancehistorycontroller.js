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

const createMaintenanceHistory = async (req, res) => {
    /* #swagger.tags = ['Maintenance History']
        #swagger.description = 'Create a new maintenance history record.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Maintenance history information',
            required: true,
            schema: {
                assetId: '60d0fe4f5311236168a109ca',
                serviceDate: '2024-02-20T00:00:00Z',
                description: 'Replaced propellers and updated firmware.',
                cost: 150,
                performedBy: 'John Doe',
                nextServiceDue: '2024-08-20T00:00:00Z'
            }
    } */
    try {
        if (!req.body.assetId || !req.body.description) {
            return res.status(400).json({ message: "Asset ID and description are required" });
        }
        const newRecord = new maintenanceHistory(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMaintenanceHistory = async (req, res) => {
    // #swagger.tags = ['Maintenance History']
    // #swagger.description = 'Update an existing maintenance history record by its MongoDB ID.'
    /* #swagger.parameters['id'] = { description: 'Maintenance history record ID' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated maintenance history information',
            required: true,
            schema: {
                description: 'Updated description of maintenance performed.',
                cost: 200
            }
    } */
    try {
        const updatedRecord = await maintenanceHistory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(updatedRecord);
    } catch (err) {
        res.status(500).json({ message: "Error updating maintenance history record", error: err.message });
    }
};


module.exports = {
    getAllMaintenanceHistory,
    getSingleMaintenanceHistory,
    createMaintenanceHistory,
    updateMaintenanceHistory
};