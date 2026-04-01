const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontroller');
const { userValidationRules } = require('../middleware/validation');

// Routes for users
router.get('/', ...userValidationRules.getAllUsers, usersController.getAll);

router.get('/:id', ...userValidationRules.getSingleUser, usersController.getSingle);

router.post('/', ...userValidationRules.createUser, usersController.createUser);

router.put('/:id', ...userValidationRules.updateUser, usersController.updateUser);

router.delete('/:id', ...userValidationRules.deleteUser, usersController.deleteUser);

module.exports = router;