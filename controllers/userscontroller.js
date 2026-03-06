const Users = require('../models/users');

const getAll = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Retrieve all users from the database.'
    /* #swagger.responses[200] = { 
            description: 'Array of users retrieved successfully.',
            schema: [{
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Operator',
                oAuthId: 'google-oauth2|12345',
                lastLogin: '2026-03-06T10:50:00Z'
            }] 
    } */
    try {
        const records = await Users.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get a single user by their MongoDB ID.'
    /* #swagger.parameters['id'] = { description: 'User ID' } */
    try {
        const record = await Users.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    /* #swagger.tags = ['Users']
        #swagger.description = 'Create a new user profile.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: {
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Operator',
                oAuthId: 'google-oauth2|12345'
            }
        }
    */
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }

        const newUser = new Users(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: "Error creating record", error: err.message });
    }
};

const updateUser = async (req, res) => {
    /* #swagger.tags = ['Users']
        #swagger.description = 'Update an existing user by ID.'
        #swagger.parameters['id'] = { description: 'User ID' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated user data',
            required: true,
            schema: {
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Admin'
            }
        }
    */
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "Record not found" });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: "Error updating record", error: err.message });
    }
};

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Delete a user from the system.'
    /* #swagger.parameters['id'] = { description: 'User ID' } */
    try {
        const deleted = await Users.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};