const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  address: { type: String, required: true },
  district: { type: String },
  assembly: { type: String },
  location: {
    latitude: Number,
    longitude: Number
  },
  photos: [String],
  verified: { type: Boolean, default: false },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
