const { validationResult } = require("express-validator");
const Locations = require('../models/locations');

const getAll = async (req, res) => {
    try {
        const records = await Locations.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingle = async (req, res) => {
    try {
        const record = await Locations.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createLocation = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }

        const newLocation = new Locations(req.body);
        const savedLocation = await newLocation.save();

        return res.status(201).json(savedLocation);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        return res.status(500).json({ message: err.message });
    }
};

const updateLocation = async (req, res) => {
    try {
        const updatedLocation = await Locations.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLocation) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(updatedLocation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Locations.findByIdAndDelete(req.params.id);
        if (!deletedLocation) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAll, getSingle, createLocation, updateLocation, deleteLocation };