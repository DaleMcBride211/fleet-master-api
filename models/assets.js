const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  type: { type: String, enum: ['Drone', 'Vehicle', 'Equip'], required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['Active', 'Maintenance', 'Deployed'], 
    default: 'Active' 
  },
  purchaseDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentLocationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  specs: {
    weight: Number,
    dimensions: String,
    batteryCapacity: String, // Dynamic fields for drones/vehicles
    powerSource: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Asset', AssetSchema);