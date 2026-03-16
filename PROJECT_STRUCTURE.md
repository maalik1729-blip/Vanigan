# Project Structure

```
vanigan-whatsapp-bot/
│
├── config/
│   ├── constants.js          # App constants (states, categories, districts)
│   └── database.js            # MongoDB connection configuration
│
├── controllers/
│   ├── businessController.js  # Business CRUD operations
│   ├── memberController.js    # Member management
│   ├── newsController.js      # News management
│   ├── organizerController.js # Organizer management
│   ├── subscriptionController.js # Subscription handling
│   └── whatsappController.js  # WhatsApp webhook handler
│
├── middleware/
│   ├── errorHandler.js        # Global error handling
│   └── rateLimiter.js         # Rate limiting middleware
│
├── models/
│   ├── Business.js            # Business schema
│   ├── Member.js              # Member schema
│   ├── News.js                # News schema
│   ├── Organizer.js           # Organizer schema
│   ├── Subscription.js        # Subscription schema
│   └── User.js                # User conversation state schema
│
├── routes/
│   ├── business.js            # Business API routes
│   ├── member.js              # Member API routes
│   ├── news.js                # News API routes
│   ├── organizer.js           # Organizer API routes
│   ├── subscription.js        # Subscription API routes
│   └── whatsapp.js            # WhatsApp webhook routes
│
├── scripts/
│   └── seedData.js            # Database seeding script
│
├── services/
│   ├── botService.js          # Core bot logic & state machine
│   └── whatsappService.js     # WhatsApp API integration
│
├── utils/
│   ├── logger.js              # Logging utility
│   └── validators.js          # Input validation helpers
│
├── logs/                      # Application logs (auto-created)
│
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── API_DOCUMENTATION.md       # API endpoint documentation
├── DEPLOYMENT.md              # Deployment guide
├── FEATURES.md                # Feature list
├── package.json               # NPM dependencies
├── PROJECT_STRUCTURE.md       # This file
├── README.md                  # Main documentation
├── server.js                  # Application entry point
├── SETUP_INSTRUCTIONS.md      # Setup guide
└── TESTING.md                 # Testing guide
```

## File Descriptions

### Core Files

- **server.js**: Express server setup, middleware configuration, route mounting
- **package.json**: Project metadata, dependencies, scripts

### Configuration

- **config/constants.js**: Conversation states, business categories, districts/assemblies
- **config/database.js**: MongoDB connection with error handling and graceful shutdown

### Controllers

Handle HTTP requests and responses:
- Business operations (CRUD)
- Organizer/Member management
- News management
- Subscription handling
- WhatsApp webhook processing

### Middleware

- **errorHandler.js**: Centralized error handling
- **rateLimiter.js**: API and user-level rate limiting

### Models

MongoDB schemas using Mongoose:
- User: Phone number, language, conversation state
- Business: Listings with location and photos
- Organizer/Member: Network directory
- News: Local updates
- Subscription: Plan management

### Routes

Express route definitions for:
- RESTful API endpoints
- WhatsApp webhook endpoints

### Services

Business logic layer:
- **botService.js**: State machine, conversation flow, message processing
- **whatsappService.js**: WhatsApp API calls (send messages, images)

### Utils

Helper functions:
- **logger.js**: File and console logging
- **validators.js**: Input validation and sanitization

### Scripts

- **seedData.js**: Populate database with sample data

### Documentation

- **README.md**: Overview and quick start
- **SETUP_INSTRUCTIONS.md**: Detailed setup guide
- **API_DOCUMENTATION.md**: API reference
- **DEPLOYMENT.md**: Production deployment
- **TESTING.md**: Testing strategies
- **FEATURES.md**: Feature list and roadmap

## Data Flow

```
WhatsApp User
    ↓
WhatsApp Cloud API
    ↓
Webhook (POST /webhook)
    ↓
whatsappController.handleMessage()
    ↓
botService.processMessage()
    ↓
State Machine Logic
    ↓
Database Operations (Models)
    ↓
whatsappService.sendMessage()
    ↓
WhatsApp Cloud API
    ↓
WhatsApp User
```

## Key Design Patterns

1. **MVC Architecture**: Models, Controllers, Routes separation
2. **State Machine**: User conversation state management
3. **Middleware Chain**: Request processing pipeline
4. **Service Layer**: Business logic abstraction
5. **Repository Pattern**: Database access through models
6. **Error Handling**: Centralized error middleware
7. **Configuration Management**: Environment variables

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: WhatsApp Cloud API
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Custom logger with file output
- **Validation**: Custom validators
