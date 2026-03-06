const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  address: { type: String },
  capacity: { type: Number },
  managerContact: { type: String }
});

module.exports = mongoose.model('Location', LocationSchema);