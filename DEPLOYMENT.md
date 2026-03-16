# Deployment Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- WhatsApp Business API account
- Domain with HTTPS (required for webhook)

## Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`

5. Start MongoDB:
```bash
mongod
```

6. Seed sample data (optional):
```bash
npm run seed
```

7. Start the server:
```bash
npm run dev
```

## Production Deployment

### Option 1: Heroku

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create app:
```bash
heroku create vanigan-bot
```

4. Add MongoDB addon:
```bash
heroku addons:create mongolab:sandbox
```

5. Set environment variables:
```bash
heroku config:set WHATSAPP_TOKEN=your_token
heroku config:set WHATSAPP_PHONE_ID=your_phone_id
heroku config:set VERIFY_TOKEN=your_verify_token
```

6. Deploy:
```bash
git push heroku main
```

7. Configure webhook URL in Meta Developer Console:
```
https://your-app.herokuapp.com/webhook
```

### Option 2: Railway

1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Option 3: DigitalOcean/AWS/VPS

1. SSH into server
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name vanigan-bot
pm2 startup
pm2 save
```

6. Configure Nginx as reverse proxy
7. Setup SSL with Let's Encrypt

## WhatsApp Configuration

1. Go to Meta Developer Console
2. Create WhatsApp Business App
3. Get Phone Number ID and Access Token
4. Configure webhook:
   - URL: `https://your-domain.com/webhook`
   - Verify Token: (same as in .env)
   - Subscribe to: messages

5. Test webhook verification

## MongoDB Setup

### Local MongoDB
```bash
mongod --dbpath /path/to/data
```

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Add to MONGODB_URI in .env

## Environment Variables

Required variables:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `WHATSAPP_TOKEN`: WhatsApp API access token
- `WHATSAPP_PHONE_ID`: WhatsApp phone number ID
- `VERIFY_TOKEN`: Webhook verification token
- `CLOUDINARY_CLOUD_NAME`: (optional) For image uploads
- `CLOUDINARY_API_KEY`: (optional)
- `CLOUDINARY_API_SECRET`: (optional)

## Testing

Test webhook locally with ngrok:
```bash
ngrok http 3000
```

Use ngrok URL as webhook URL in Meta Console.

## Monitoring

Use PM2 for monitoring:
```bash
pm2 monit
pm2 logs vanigan-bot
```

## Troubleshooting

- Check logs for errors
- Verify webhook is accessible via HTTPS
- Ensure MongoDB is running
- Verify WhatsApp API credentials
- Check firewall settings
