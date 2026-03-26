const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetscontroller')
const {assetValidationRules} = require('../middleware/validation');

// Routes for assets
router.get('/', ...assetValidationRules.getallAssets, assetsController.getAllAssets);
    
router.get('/:id', ...assetValidationRules.getAssetById, assetsController.getSingleAsset);

router.post('/', ...assetValidationRules.createAsset, assetsController.createAsset);

router.put('/:id', ...assetValidationRules.UpdateAsset, assetsController.updateAsset);

router.delete('/:id', ...assetValidationRules.deleteAsset, assetsController.deleteAsset);

module.exports = router;