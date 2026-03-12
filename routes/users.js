const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontroller')

// Routes for users
router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;