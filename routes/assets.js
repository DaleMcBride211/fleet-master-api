const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetscontroller')

// Routes for assets
router.get('/', assetsController.getAllAssets);
    
router.get('/:id', assetsController.getSingleAsset);

router.post('/', assetsController.createAsset);

router.put('/:id', assetsController.updateAsset);

router.delete('/:id', assetsController.deleteAsset);

module.exports = router;