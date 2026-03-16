const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/plans', subscriptionController.getPlans);
router.post('/create', subscriptionController.createSubscription);
router.get('/:phoneNumber', subscriptionController.getSubscription);
router.put('/:id/status', subscriptionController.updateSubscriptionStatus);

module.exports = router;
