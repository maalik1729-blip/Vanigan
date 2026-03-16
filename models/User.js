const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  language: { type: String, default: 'english' },
  currentState: { type: String, default: 'LANGUAGE_SELECT' },
  stateData: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
