const express = require('express');
const router = express.Router();
const maintenanceHistoryController = require('../controllers/maintenancehistorycontroller')

// Routes for maintenance history

router.get('/', maintenanceHistoryController.getAllMaintenanceHistory);
    
router.get('/:id', maintenanceHistoryController.getSingleMaintenanceHistory);

router.post('/', maintenanceHistoryController.createMaintenanceHistory);

//router.put('/:id', maintenanceHistoryController.updateMaintenanceHistory);

//router.delete('/:id', maintenanceHistoryController.deleteMaintenanceHistory);

module.exports = router;