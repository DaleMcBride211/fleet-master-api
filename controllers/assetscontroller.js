const Users = require('../models/users');


const getAllAssets = async (req, res, next) => {
    try {
        const assets = await Users.find();
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
    
module.exports = {
    getAllAssets
};