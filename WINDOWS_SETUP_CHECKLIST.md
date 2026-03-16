# Windows Setup Checklist

Use this checklist to ensure everything is properly installed and configured.

## Installation Checklist

### Node.js Installation
- [ ] Downloaded Node.js LTS from nodejs.org
- [ ] Ran the installer
- [ ] Closed and reopened terminal
- [ ] Verified with `node --version`
- [ ] Verified with `npm --version`

### MongoDB Installation
Choose one:

**Option A: Local MongoDB**
- [ ] Downloaded MongoDB Community Server
- [ ] Installed as Windows Service
- [ ] MongoDB is running (check Services or run `mongod`)

**Option B: MongoDB Atlas (Cloud)**
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Created database user
- [ ] Whitelisted IP address
- [ ] Copied connection string

### Project Setup
- [ ] Navigated to project folder: `cd D:\vani`
- [ ] Ran `npm install` successfully
- [ ] Created `.env` file from `.env.example`
- [ ] Configured all environment variables in `.env`
- [ ] Ran `npm run seed` to add sample data

### WhatsApp API Setup
- [ ] Created Meta Developer account
- [ ] Created WhatsApp Business app
- [ ] Got Phone Number ID
- [ ] Got Access Token
- [ ] Created Verify Token
- [ ] Added tokens to `.env` file

### Testing Setup (Optional)
- [ ] Installed ngrok: `npm install -g ngrok`
- [ ] Started ngrok: `ngrok http 3000`
- [ ] Configured webhook in Meta Console
- [ ] Subscribed to "messages" webhook

### Server Start
- [ ] Started server: `npm start`
- [ ] Server running on port 3000
- [ ] MongoDB connected successfully
- [ ] No errors in console

### Testing
- [ ] Sent "Hi" to WhatsApp test number
- [ ] Bot responded with language selection
- [ ] Tested main menu navigation
- [ ] Tested business list flow
- [ ] Checked logs in `logs/app.log`

## Verification Commands

Run these to verify everything is working:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check if MongoDB is running (local)
mongosh

# Check project dependencies
npm list --depth=0

# Check server
npm start
```

## Expected Output

When you run `npm start`, you should see:

```
Server running on port 3000
MongoDB Connected: localhost (or your Atlas cluster)
```

## Troubleshooting

### ❌ "npm is not recognized"
**Solution**: Install Node.js and restart terminal

### ❌ "Cannot connect to MongoDB"
**Solution**: 
- Local: Run `mongod` in separate terminal
- Atlas: Check connection string in .env

### ❌ "Port 3000 already in use"
**Solution**: Change PORT in .env to 3001

### ❌ "Module not found"
**Solution**: Run `npm install` again

### ❌ Webhook verification failed
**Solution**: 
- Check VERIFY_TOKEN matches in .env and Meta Console
- Ensure ngrok is running
- Verify server is running

## File Checklist

After setup, you should have:

```
D:\vani\
├── node_modules/           ✓ (created by npm install)
├── logs/                   ✓ (created when server runs)
│   └── app.log
├── .env                    ✓ (you created this)
├── package-lock.json       ✓ (created by npm install)
└── [all other project files]
```

## Environment Variables Checklist

Your `.env` file should have:

```env
PORT=3000                                    ✓
NODE_ENV=development                         ✓
MONGODB_URI=mongodb://...                    ✓
WHATSAPP_TOKEN=EAAxxxxx...                   ✓
WHATSAPP_PHONE_ID=123456789                  ✓
VERIFY_TOKEN=your_secret_token               ✓
```

## Success Indicators

You're ready when:
- ✅ Server starts without errors
- ✅ MongoDB connection successful
- ✅ WhatsApp bot responds to messages
- ✅ Logs are being written to logs/app.log
- ✅ Sample data visible in database

## Next Steps

Once everything is checked:
1. Test all bot features
2. Review API_DOCUMENTATION.md
3. Customize categories/districts in config/constants.js
4. Add your own business data
5. Plan production deployment

## Getting Help

If stuck:
1. Check error messages carefully
2. Review logs/app.log
3. Verify each checklist item
4. See TROUBLESHOOTING section in QUICK_START_WINDOWS.md
