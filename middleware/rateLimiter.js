const rateLimit = require('express-rate-limit');

// Rate limiter for API endpoints
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for webhook (more permissive)
exports.webhookLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'Too many webhook requests',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for user messages (per phone number)
const userMessageStore = new Map();

exports.userMessageLimiter = (phoneNumber) => {
  const now = Date.now();
  const userKey = phoneNumber;
  
  if (!userMessageStore.has(userKey)) {
    userMessageStore.set(userKey, { count: 1, resetTime: now + 60000 });
    return true;
  }
  
  const userData = userMessageStore.get(userKey);
  
  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + 60000;
    return true;
  }
  
  if (userData.count >= 20) {
    return false; // Rate limit exceeded
  }
  
  userData.count++;
  return true;
};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of userMessageStore.entries()) {
    if (now > value.resetTime) {
      userMessageStore.delete(key);
    }
  }
}, 5 * 60 * 1000);
