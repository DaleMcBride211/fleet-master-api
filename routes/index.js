const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authentication');

router.use('/auth', require('./auth'));

router.use('/users', isAuthenticated, require('./users'));
router.use('/assets', isAuthenticated, require('./assets'));
router.use('/maintenancehistory', isAuthenticated, require('./maintenancehistory'));
router.use('/locations', isAuthenticated, require('./locations'));


module.exports = router;