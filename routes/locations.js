const { body } = require("express-validator");

const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locationscontroller');

router.get('/', locationsController.getAll);

router.get('/:id', locationsController.getSingle);

router.post('/',
    body('name').exists({ checkFalsy: true }).withMessage('Name is required'),
    body('coordinates').isObject().withMessage('Coordinates must be an object'),
    locationsController.createLocation
);

router.put('/:id', locationsController.updateLocation);

router.delete('/:id', locationsController.deleteLocation);

module.exports = router;