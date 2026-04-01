const {body, param, validationResult} = require('express-validator');

//Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

// Assets Validation Rules

const assetValidationRules = {

    getallAssets: [
        handleValidationErrors
    ],

    getAssetById: [
        param('id').isInt().withMessage('ID must be an integer'),
        handleValidationErrors
    ],
    createAsset: [
        body('type').isIn(['Drone', 'Vehicle', 'Equip']).withMessage('Type must be Drone, Vehicle, or Equip'),
        body('model').notEmpty().withMessage('Model is required'),
        body('serialNumber').notEmpty().withMessage('Serial Number is required'),
        body('status').optional().isIn(['Active', 'Maintenance', 'Deployed']).withMessage('Status must be Active, Maintenance, or Deployed'),
        body('purchaseDate').optional().isISO8601().toDate().withMessage('Purchase Date must be a valid date'),
        body('assignedTo').optional().isMongoId().withMessage('Assigned To must be a valid user ID'),
        body('currentLocationId').optional().isMongoId().withMessage('Current Location ID must be a valid location ID'),
        body('specs').optional().isObject().withMessage('Specs must be an object'),
        body('specs.weight').optional().isNumeric().withMessage('Specs weight must be a number'),
        body('specs.dimensions').optional().isString().withMessage('Specs dimensions must be a string'),
        body('specs.batteryCapacity').optional().isString().withMessage('Specs battery capacity must be a string'),
        body('specs.powerSource').optional().isString().withMessage('Specs power source must be a string'),
        handleValidationErrors
    ],

    UpdateAsset: [
        param('id').isInt().withMessage('ID must be an integer'),
        body('type').optional().isIn(['Drone', 'Vehicle', 'Equip']).withMessage('Type must be Drone, Vehicle, or Equip'),
        body('model').optional().notEmpty().withMessage('Model is required'),
        body('serialNumber').notEmpty().withMessage('Serial Number is required'),
        body('status').optional().isIn(['Active', 'Maintenance', 'Deployed']).withMessage('Status must be Active, Maintenance, or Deployed'),
        body('purchaseDate').optional().isISO8601().toDate().withMessage('Purchase Date must be a valid date'),
        body('assignedTo').optional().isMongoId().withMessage('Assigned To must be a valid user ID'),
        body('currentLocationId').optional().isMongoId().withMessage('Current Location ID must be a valid location ID'),
        body('specs').optional().isObject().withMessage('Specs must be an object'),
        body('specs.weight').optional().isNumeric().withMessage('Specs weight must be a number'),
        body('specs.dimensions').optional().isString().withMessage('Specs dimensions must be a string'),
        body('specs.batteryCapacity').optional().isString().withMessage('Specs battery capacity must be a string'),
        body('specs.powerSource').optional().isString().withMessage('Specs power source must be a string'),
        handleValidationErrors
    ],
    deleteAsset: [
        param('id').isInt().withMessage('ID must be an integer'),
        handleValidationErrors
    ]

};

const userValidationRules = {
    getAllUsers: [
        handleValidationErrors
    ],
    getSingleUser: [
        param('id').isMongoId().withMessage('Invalid User ID format (must be a MongoID)'),
        handleValidationErrors
    ],
    createUser: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('role').optional().isIn(['Admin', 'Operator', 'Viewer']).withMessage('Invalid role'),
        body('oAuthId').notEmpty().withMessage('oAuthId is required'),
        handleValidationErrors
    ],
    updateUser: [
        param('id').isMongoId().withMessage('Invalid User ID format'),
        body('email').optional().isEmail().normalizeEmail(),
        handleValidationErrors
    ],
    deleteUser: [
        param('id').isMongoId().withMessage('Invalid User ID format'),
        handleValidationErrors
    ]
};

module.exports = {
    assetValidationRules,
    userValidationRules
}

// Locations Validation Rules

const locationValidationRules = {

    getAllLocations: [
        handleValidationErrors
    ],

    getLocationById: [
        param('id').isMongoId().withMessage('ID must be a valid Mongo ID'),
        handleValidationErrors
    ],

    createLocation: [
        body('name').notEmpty().withMessage('Name is required'),

        body('coordinates').notEmpty().withMessage('Coordinates are required'),
        body('coordinates.lat').isNumeric().withMessage('Latitude must be a number'),
        body('coordinates.lng').isNumeric().withMessage('Longitude must be a number'),

        body('address').optional().isString().withMessage('Address must be a string'),
        body('capacity').optional().isNumeric().withMessage('Capacity must be a number'),
        body('managerContact').optional().isString().withMessage('Manager Contact must be a string'),

        handleValidationErrors
    ],

    updateLocation: [
        param('id').isMongoId().withMessage('ID must be a valid Mongo ID'),

        body('name').optional().notEmpty().withMessage('Name cannot be empty'),

        body('coordinates.lat').optional().isNumeric().withMessage('Latitude must be a number'),
        body('coordinates.lng').optional().isNumeric().withMessage('Longitude must be a number'),

        body('address').optional().isString().withMessage('Address must be a string'),
        body('capacity').optional().isNumeric().withMessage('Capacity must be a number'),
        body('managerContact').optional().isString().withMessage('Manager Contact must be a string'),

        handleValidationErrors
    ],

    deleteLocation: [
        param('id').isMongoId().withMessage('ID must be a valid Mongo ID'),
        handleValidationErrors
    ]

};

module.exports = {
    locationValidationRules
};