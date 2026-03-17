require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const whatsappRoutes = require('./routes/whatsapp');
const businessRoutes = require('./routes/business');
const organizerRoutes = require('./routes/organizer');
const memberRoutes = require('./routes/member');
const newsRoutes = require('./routes/news');
const subscriptionRoutes = require('./routes/subscription');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for API routes
app.use('/api', apiLimiter);

// Connect to MongoDB
const connectDB = require('./config/database');
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vanigan WhatsApp Bot Backend Running',
    version: '1.0.0',
    endpoints: {
      webhook: '/webhook',
      business: '/api/business',
      organizer: '/api/organizer',
      member: '/api/member',
      news: '/api/news',
      subscription: '/api/subscription'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/webhook', whatsappRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/organizer', organizerRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
