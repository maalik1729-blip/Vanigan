# Vanigan WhatsApp Bot Backend

Complete backend system for Vanigan Business Network WhatsApp bot.

## Features

- Multi-language support (English, Tamil, Hindi)
- Business directory with categories and subcategories
- Organizer and member listings by district/assembly
- Business registration with photo upload and location
- Subscription plans (Monthly, Yearly, Lifetime)
- Local news by district/assembly
- State machine-based conversation flow

## Prerequisites

Before you begin, you need:

1. **Node.js** (v16 or higher)
   - Download from https://nodejs.org/
   - See [INSTALL_NODEJS.md](INSTALL_NODEJS.md) for detailed instructions

2. **MongoDB**
   - Local: https://www.mongodb.com/try/download/community
   - Cloud: https://www.mongodb.com/cloud/atlas (easier for beginners)

3. **WhatsApp Business API**
   - Create account at https://developers.facebook.com
   - See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for details

## Quick Start (Windows)

See [QUICK_START_WINDOWS.md](QUICK_START_WINDOWS.md) for complete step-by-step guide.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
copy .env.example .env
```
Edit `.env` with your settings.

### 3. Seed Database (Optional)
```bash
npm run seed
```

### 4. Start Server
```bash
npm start
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables:
- `MONGODB_URI`: MongoDB connection string
- `WHATSAPP_TOKEN`: WhatsApp Cloud API access token
- `WHATSAPP_PHONE_ID`: WhatsApp phone number ID
- `VERIFY_TOKEN`: Webhook verification token
- `CLOUDINARY_*`: Image upload credentials (optional)

4. Start MongoDB:
```bash
mongod
```

5. Run the server:
```bash
npm start
```

## WhatsApp Cloud API Setup

1. Create a Meta Business account
2. Set up WhatsApp Business API
3. Get access token and phone number ID
4. Configure webhook URL: `https://your-domain.com/webhook`
5. Set verify token in webhook settings

## Project Structure

```
├── models/           # MongoDB schemas
├── controllers/      # Request handlers
├── services/         # Business logic
├── routes/           # API routes
├── config/           # Constants and configuration
└── server.js         # Entry point
```

## API Endpoints

- `GET /webhook` - Webhook verification
- `POST /webhook` - Receive WhatsApp messages
- `GET /api/business/categories` - Get business categories
- `GET /api/business/list` - Get businesses
- `POST /api/business/add` - Add new business

## Conversation Flow

1. Language selection
2. Main menu (6 options)
3. State-based navigation
4. Global commands: MENU, BACK

## Database Models

- User: Phone number, language, conversation state
- Business: Name, category, location, photos
- Organizer: Name, district, assembly
- Member: Name, business, location
- News: Title, description, district
- Subscription: Plan, status, payment

## Development

```bash
npm run dev
```

## Deployment

Deploy to any Node.js hosting platform (Heroku, Railway, DigitalOcean, AWS, etc.)

Ensure webhook URL is publicly accessible with HTTPS.
