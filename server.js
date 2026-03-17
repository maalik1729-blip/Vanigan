require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes that always work
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vanigan WhatsApp Bot Backend Running',
    version: '1.0.0',
    status: 'Server is running successfully'
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/webhook/test', (req, res) => {
  res.json({
    success: true,
    message: 'Webhook endpoint is accessible',
    timestamp: new Date().toISOString(),
    verifyToken: process.env.VERIFY_TOKEN ? 'Set' : 'Not set'
  });
});

app.get('/status', (req, res) => {
  res.json({
    success: true,
    server: 'running',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Load routes safely
const loadRoutes = () => {
  try {
    const { errorHandler, notFound } = require('./middleware/errorHandler');
    const { apiLimiter } = require('./middleware/rateLimiter');
    
    // Rate limiting for API routes
    app.use('/api', apiLimiter);
    
    // Load route files safely
    try {
      const whatsappRoutes = require('./routes/whatsapp');
      app.use('/webhook', whatsappRoutes);
      console.log('WhatsApp routes loaded');
    } catch (err) {
      console.error('Failed to load WhatsApp routes:', err.message);
    }
    
    try {
      const businessRoutes = require('./routes/business');
      app.use('/api/business', businessRoutes);
      console.log('Business routes loaded');
    } catch (err) {
      console.error('Failed to load business routes:', err.message);
    }
    
    try {
      const organizerRoutes = require('./routes/organizer');
      app.use('/api/organizer', organizerRoutes);
      console.log('Organizer routes loaded');
    } catch (err) {
      console.error('Failed to load organizer routes:', err.message);
    }
    
    try {
      const memberRoutes = require('./routes/member');
      app.use('/api/member', memberRoutes);
      console.log('Member routes loaded');
    } catch (err) {
      console.error('Failed to load member routes:', err.message);
    }
    
    try {
      const newsRoutes = require('./routes/news');
      app.use('/api/news', newsRoutes);
      console.log('News routes loaded');
    } catch (err) {
      console.error('Failed to load news routes:', err.message);
    }
    
    try {
      const subscriptionRoutes = require('./routes/subscription');
      app.use('/api/subscription', subscriptionRoutes);
      console.log('Subscription routes loaded');
    } catch (err) {
      console.error('Failed to load subscription routes:', err.message);
    }
    
    // Error handling (must be last)
    app.use(notFound);
    app.use(errorHandler);
    
  } catch (err) {
    console.error('Failed to load middleware or routes:', err.message);
    // Add basic error handling as fallback
    app.use((req, res) => {
      res.status(404).json({ success: false, message: 'Route not found' });
    });
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
  }
};

// Initialize database connection
const initializeDatabase = async () => {
  try {
    const connectDB = require('./config/database');
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Continue without database
  }
};

// Load everything safely
loadRoutes();
initializeDatabase();

const PORT = process.env.PORT || 3000;

// Handle uncaught exceptions - don't exit
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // Don't exit the process
});

// Handle unhandled promise rejections - don't exit
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  // Don't exit the process
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server started successfully');
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err.message);
});
