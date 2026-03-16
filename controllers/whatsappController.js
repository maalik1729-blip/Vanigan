const axios = require('axios');
const User = require('../models/User');
const botService = require('../services/botService');
const logger = require('../utils/logger');
const { userMessageLimiter } = require('../middleware/rateLimiter');

// Webhook verification
exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    logger.info('Webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    logger.warn('Webhook verification failed', { mode, token });
    res.sendStatus(403);
  }
};

// Handle incoming messages
exports.handleMessage = async (req, res) => {
  try {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry[0];
      const changes = entry.changes[0];
      const value = changes.value;

      if (value.messages && value.messages[0]) {
        const message = value.messages[0];
        const from = message.from;
        const messageType = message.type;

        // Rate limiting per user
        if (!userMessageLimiter(from)) {
          logger.warn('Rate limit exceeded for user', { from });
          return res.sendStatus(429);
        }

        let userMessage = '';
        let location = null;

        if (messageType === 'text') {
          userMessage = message.text.body;
        } else if (messageType === 'interactive') {
          userMessage = message.interactive.button_reply?.id || 
                       message.interactive.list_reply?.id || '';
        } else if (messageType === 'location') {
          location = {
            latitude: message.location.latitude,
            longitude: message.location.longitude
          };
          userMessage = 'LOCATION_SHARED';
        } else if (messageType === 'image') {
          userMessage = 'IMAGE_UPLOADED';
        }

        logger.info('Message received', { from, messageType, userMessage });

        // Process message through bot service
        await botService.processMessage(from, userMessage, location, message);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    logger.error('Error handling message', { error: error.message, stack: error.stack });
    res.sendStatus(500);
  }
};
