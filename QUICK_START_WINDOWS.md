# Quick Start Guide for Windows

## Prerequisites Installation

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the LTS version (Windows Installer)
3. Run the installer
4. **Important**: Close and reopen your terminal after installation

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install MongoDB

**Option A: MongoDB Community Server (Local)**

1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer
4. Choose "Complete" installation
5. Install as a Windows Service (recommended)
6. Install MongoDB Compass (GUI tool) - optional but helpful

**Option B: MongoDB Atlas (Cloud - Easier)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster (M0)
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for testing)
6. Get connection string

## Project Setup

### Step 1: Install Dependencies

Open PowerShell in your project folder:
```bash
cd D:\vani
npm install
```

Wait for installation to complete (2-5 minutes).

### Step 2: Configure Environment

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` file with your settings:

**For Local MongoDB:**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vanigan
WHATSAPP_TOKEN=your_token_here
WHATSAPP_PHONE_ID=your_phone_id_here
VERIFY_TOKEN=my_secret_verify_token_123
```

**For MongoDB Atlas:**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vanigan
WHATSAPP_TOKEN=your_token_here
WHATSAPP_PHONE_ID=your_phone_id_here
VERIFY_TOKEN=my_secret_verify_token_123
```

### Step 3: Start MongoDB (if using local)

Open a new PowerShell window:
```bash
mongod
```

Keep this window open.

### Step 4: Seed Sample Data

In your project folder:
```bash
npm run seed
```

This creates sample businesses, organizers, members, and news.

### Step 5: Start the Server

```bash
npm start
```

You should see:
```
Server running on port 3000
MongoDB Connected: localhost
```

## WhatsApp Setup (For Testing)

### Step 1: Get WhatsApp API Access

1. Go to https://developers.facebook.com
2. Create a developer account
3. Create a new app (Business type)
4. Add WhatsApp product
5. Get your:
   - Phone Number ID
   - Access Token
   - Create a Verify Token (any random string)

### Step 2: Expose Local Server

Install ngrok:
```bash
npm install -g ngrok
```

Run ngrok in a new terminal:
```bash
ngrok http 3000
```

Copy the HTTPS URL (e.g., https://abc123.ngrok.io)

### Step 3: Configure Webhook

1. In Meta Developer Console
2. Go to WhatsApp > Configuration
3. Edit Webhook
4. Enter:
   - Callback URL: `https://abc123.ngrok.io/webhook`
   - Verify Token: (same as in your .env file)
5. Subscribe to "messages"

### Step 4: Test

Send "Hi" to your WhatsApp test number!

## Common Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Seed database
npm run seed

# Check Node.js version
node --version

# Check npm version
npm --version
```

## Folder Structure After Setup

```
D:\vani\
├── node_modules/        (created after npm install)
├── logs/                (created when server runs)
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── scripts/
├── services/
├── utils/
├── .env                 (you create this)
├── .env.example
├── package.json
└── server.js
```

## Troubleshooting

### "npm is not recognized"
- Install Node.js from nodejs.org
- Close and reopen terminal

### "Cannot connect to MongoDB"
- Make sure MongoDB is running (mongod command)
- Or use MongoDB Atlas cloud database

### "Port 3000 already in use"
- Change PORT in .env to 3001 or another number
- Or stop the process using port 3000

### Webhook verification failed
- Check VERIFY_TOKEN matches in .env and Meta Console
- Ensure ngrok is running
- Verify server is running

## Next Steps

1. Test the bot by sending messages
2. Check logs in `logs/app.log`
3. View data in MongoDB Compass
4. Read API_DOCUMENTATION.md for API endpoints
5. See DEPLOYMENT.md for production deployment

## Support

If you encounter issues:
1. Check the error message in terminal
2. Check logs/app.log
3. Verify all prerequisites are installed
4. Ensure .env is configured correctly
