const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  district: { type: String, required: true },
  assembly: { type: String, required: true },
  area: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organizer', organizerSchema);
