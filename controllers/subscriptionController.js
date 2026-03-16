const Subscription = require('../models/Subscription');

exports.getPlans = (req, res) => {
  const plans = [
    { id: 'monthly', name: 'Monthly Plan', price: 199, duration: '30 days' },
    { id: 'yearly', name: 'Yearly Plan', price: 1999, duration: '365 days' },
    { id: 'lifetime', name: 'Lifetime Plan', price: 4999, duration: 'Lifetime' }
  ];
  res.json(plans);
};

exports.createSubscription = async (req, res) => {
  try {
    const { phoneNumber, plan } = req.body;
    
    const prices = { monthly: 199, yearly: 1999, lifetime: 4999 };
    const price = prices[plan];

    if (!price) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const subscription = new Subscription({
      phoneNumber,
      plan,
      price,
      status: 'pending'
    });

    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      phoneNumber: req.params.phoneNumber,
      status: 'active'
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentId } = req.body;

    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    subscription.status = status;
    if (paymentId) subscription.paymentId = paymentId;

    if (status === 'active') {
      subscription.startDate = new Date();
      
      if (subscription.plan === 'monthly') {
        subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else if (subscription.plan === 'yearly') {
        subscription.endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      }
    }

    await subscription.save();
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
