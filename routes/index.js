const router = require('express').Router();

router.get('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/assets', require('./assets'));
// router.use('/maintenancehistory', require('./maintenancehistory'));
router.use('/locations', require('./locations'));

module.exports = router;