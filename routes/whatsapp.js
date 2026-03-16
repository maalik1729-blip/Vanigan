const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Webhook verification
router.get('/', whatsappController.verifyWebhook);

// Receive messages
router.post('/', whatsappController.handleMessage);

module.exports = router;
