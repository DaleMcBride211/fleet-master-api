const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  serviceDate: { type: Date, default: Date.now },
  description: { type: String, required: true },
  cost: { type: Number, min: 0 },
  performedBy: { type: String }, // Can also be a ref to User if technicians are in system
  nextServiceDue: { type: Date }
});

module.exports = mongoose.model('MaintenanceHistory', MaintenanceSchema);