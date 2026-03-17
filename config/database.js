const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    // Skip connection if MONGODB_URI is not set or is the default local value in production
    if (!process.env.MONGODB_URI || 
        (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI.includes('localhost'))) {
      logger.warn('MongoDB URI not configured for production, skipping connection');
      console.log('⚠️  MongoDB not configured - bot features will be limited');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error', { error: err.message });
      console.error('MongoDB error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      console.log('⚠️  MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    logger.error('MongoDB connection failed', { error: error.message });
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Server will run without database - bot features will be limited');
    // Don't exit process, throw error to be handled by caller
    throw error;
  }
};

module.exports = connectDB;
