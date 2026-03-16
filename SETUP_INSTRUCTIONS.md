# Complete Setup Instructions

## Step-by-Step Guide to Get Your Vanigan WhatsApp Bot Running

### 1. Install Prerequisites

#### Install Node.js
- Download from https://nodejs.org (v16 or higher)
- Verify installation:
```bash
node --version
npm --version
```

#### Install MongoDB
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. WhatsApp Business API Setup

#### Create Meta Developer Account
1. Go to https://developers.facebook.com
2. Create a developer account
3. Create a new app (Business type)

#### Setup WhatsApp Business API
1. Add WhatsApp product to your app
2. Go to WhatsApp > Getting Started
3. Note down:
   - Phone Number ID
   - Access Token (temporary)
4. Generate permanent access token:
   - Go to System Users in Business Settings
   - Create system user
   - Generate token with whatsapp_business_messaging permission

#### Configure Webhook
1. Go to WhatsApp > Configuration
2. Click "Edit" on Webhook
3. Enter:
   - Callback URL: `https://your-domain.com/webhook`
   - Verify Token: Create a random string (save this)
4. Subscribe to webhook fields: messages

### 3. Project Setup

#### Clone/Download Project
```bash
cd vanigan-whatsapp-bot
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vanigan
WHATSAPP_TOKEN=your_permanent_access_token
WHATSAPP_PHONE_ID=your_phone_number_id
VERIFY_TOKEN=your_random_verify_token
```

### 4. Database Setup

#### Start MongoDB (Local)
```bash
mongod
```

#### Seed Sample Data
```bash
npm run seed
```

This creates sample:
- Businesses (3)
- Organizers (3)
- Members (2)
- News (3)

### 5. Expose Local Server (Development)

#### Install ngrok
```bash
npm install -g ngrok
```

#### Start ngrok
```bash
ngrok http 3000
```

Copy the HTTPS URL (e.g., https://abc123.ngrok.io)

### 6. Configure Webhook in Meta

1. Go to WhatsApp > Configuration
2. Edit Webhook
3. Enter ngrok URL: `https://abc123.ngrok.io/webhook`
4. Enter your verify token
5. Click "Verify and Save"
6. Subscribe to "messages" field

### 7. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 8. Test the Bot

1. Send "Hi" to your WhatsApp test number
2. Bot should respond with language selection
3. Follow the conversation flow

### 9. Production Deployment

See DEPLOYMENT.md for detailed production deployment instructions.

## Quick Test Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] .env file configured
- [ ] Dependencies installed
- [ ] Sample data seeded
- [ ] Server running
- [ ] ngrok exposing server
- [ ] Webhook configured in Meta
- [ ] Test message sent to bot
- [ ] Bot responds correctly

## Common Issues

### Webhook Verification Failed
- Check verify token matches in .env and Meta Console
- Ensure ngrok URL is correct
- Verify server is running

### Bot Not Responding
- Check server logs for errors
- Verify WhatsApp token is valid
- Check MongoDB connection
- Ensure webhook is subscribed to messages

### Database Connection Error
- Verify MongoDB is running
- Check MONGODB_URI in .env
- Ensure database permissions

### Invalid Phone Number
- Use format: 919876543210 (country code + number)
- No spaces or special characters

## Support

For issues:
1. Check server logs
2. Review API_DOCUMENTATION.md
3. See TESTING.md for test scenarios
4. Check Meta Developer Console for webhook logs
