const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  plan: { type: String, enum: ['monthly', 'yearly', 'lifetime'], required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'active', 'expired'], default: 'pending' },
  startDate: { type: Date },
  endDate: { type: Date },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
